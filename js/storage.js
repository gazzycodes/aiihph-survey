/**
 * storage.js — Dual-write storage engine
 * Writes to both localStorage AND IndexedDB on every save.
 * On load, picks the most recently modified copy.
 */

const DB_NAME = 'vishu_health_survey';
const DB_VERSION = 1;
const STORE_NAME = 'surveys';
const LS_KEY = 'vhs_data';

let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) { resolve(db); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains(STORE_NAME)) {
        d.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = e => { db = e.target.result; resolve(db); };
    req.onerror = e => { console.warn('IndexedDB open failed:', e); resolve(null); };
  });
}

async function idbSave(data) {
  try {
    const d = await openDB();
    if (!d) return;
    return new Promise((resolve, reject) => {
      const tx = d.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(data);
      tx.oncomplete = resolve;
      tx.onerror = e => { console.warn('IDB save failed:', e); resolve(); };
    });
  } catch (e) { console.warn('IDB save error:', e); }
}

async function idbLoad(id) {
  try {
    const d = await openDB();
    if (!d) return null;
    return new Promise((resolve) => {
      const tx = d.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) { return null; }
}

async function idbLoadAll() {
  try {
    const d = await openDB();
    if (!d) return [];
    return new Promise((resolve) => {
      const tx = d.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (e) { return []; }
}

async function idbDelete(id) {
  try {
    const d = await openDB();
    if (!d) return;
    return new Promise((resolve) => {
      const tx = d.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => resolve();
    });
  } catch (e) {}
}

function lsSave(data) {
  try {
    const all = lsLoadAll();
    const idx = all.findIndex(f => f.id === data.id);
    if (idx >= 0) all[idx] = data; else all.push(data);
    localStorage.setItem(LS_KEY, JSON.stringify(all));
    return true;
  } catch (e) { console.warn('localStorage save failed:', e); return false; }
}

function lsLoadAll() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch { return []; }
}

function lsDelete(id) {
  try {
    const all = lsLoadAll().filter(f => f.id !== id);
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch (e) {}
}

// ---- Public API ----

const Storage = {
  async save(familyData) {
    const ts = new Date().toISOString();
    familyData.lastModified = ts;
    const lsOk = lsSave(familyData);
    await idbSave(familyData);
    return lsOk;
  },

  async loadAll() {
    const lsAll = lsLoadAll();
    const idbAll = await idbLoadAll();

    // Merge: for each family, pick the copy with the latest lastModified
    const map = {};
    [...lsAll, ...idbAll].forEach(f => {
      if (!f || !f.id) return;
      const existing = map[f.id];
      if (!existing || new Date(f.lastModified) > new Date(existing.lastModified)) {
        map[f.id] = f;
      }
    });
    return Object.values(map).sort((a, b) =>
      new Date(b.lastModified) - new Date(a.lastModified)
    );
  },

  async load(id) {
    const lsAll = lsLoadAll();
    const lsItem = lsAll.find(f => f.id === id) || null;
    const idbItem = await idbLoad(id);
    // Pick newer
    if (!lsItem && !idbItem) return null;
    if (!lsItem) return idbItem;
    if (!idbItem) return lsItem;
    return new Date(lsItem.lastModified) >= new Date(idbItem.lastModified) ? lsItem : idbItem;
  },

  async delete(id) {
    lsDelete(id);
    await idbDelete(id);
  },

  // Sync in-memory data to both stores (called on every significant change)
  async sync(familyData) {
    return this.save(familyData);
  }
};

export default Storage;
