/**
 * app.js — Main application controller
 * Manages routing, family lifecycle, autosave, save indicator, and UI orchestration
 */

import Storage from './storage.js';
import Exporter from './export.js';
import { SURVEY_DATA } from './data.js';
import { DECK_META } from './data.js';
import { renderDeck, setLanguage, setOnChange, loadResponses, getResponses } from './renderer.js';

// ─── State ───────────────────────────────────────────
let currentFamily = null;
let currentDeckIdx = 0;
let allFamilies = [];
let saveTimeout = null;
let lang = 'all';

const DECK_ORDER = ['1','2','3','4','5','6','7','7a','7b','8'];

// ─── DOM refs ─────────────────────────────────────────
const $ = id => document.getElementById(id);

// ─── Save Indicator ───────────────────────────────────
function setSaveStatus(status, text) {
  const el = $('save-indicator');
  if (!el) return;
  el.className = `save-indicator ${status}`;
  el.innerHTML = `<span class="dot"></span>${text}`;
}

// ─── Autosave ─────────────────────────────────────────
let isSaving = false;

async function autoSave() {
  if (!currentFamily) return;
  setSaveStatus('saving', 'Saving…');
  try {
    currentFamily.responses = getResponses();
    currentFamily.lastModified = new Date().toISOString();
    await Storage.save(currentFamily);
    setSaveStatus('saved', `Saved ${new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'})}`);
  } catch(e) {
    console.error('Save failed', e);
    setSaveStatus('error', 'Save failed!');
    showToast('Save failed! Please export now.', 'error');
  }
}

function scheduleAutoSave() {
  clearTimeout(saveTimeout);
  setSaveStatus('saving', 'Saving…');
  saveTimeout = setTimeout(() => autoSave(), 600);
}

// ─── Toast ─────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const container = $('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ─── Navigation / Routing ─────────────────────────────
let currentScreen = 'families';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = $(id);
  if (screen) screen.classList.add('active');
  currentScreen = id;

  const deckNav = $('deck-nav');
  if (deckNav) deckNav.classList.toggle('hidden', id !== 'screen-survey');
}

// ─── Family Manager ────────────────────────────────────
async function loadFamilies() {
  allFamilies = await Storage.loadAll();
  renderFamilyList();
}

function renderFamilyList() {
  const list = $('family-list');
  if (!list) return;

  if (allFamilies.length === 0) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">👨‍👩‍👧‍👦</div>
      <div class="empty-state-text">No families yet.<br>Add one to begin the survey.</div>
    </div>`;
    return;
  }

  list.innerHTML = allFamilies.map(fam => {
    const modTime = fam.lastModified
      ? new Date(fam.lastModified).toLocaleString('en-IN', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})
      : 'Never saved';
    const pct = computeCompletion(fam);
    return `<div class="family-card" data-fam-id="${fam.id}">
      <div class="family-card-icon">👨‍👩‍👧‍👦</div>
      <div class="family-card-info">
        <div class="family-card-name">${escHtml(fam.familyName || 'Unnamed Family')}</div>
        <div class="family-card-meta">Last saved: ${modTime} &nbsp;·&nbsp; ${pct}% complete</div>
      </div>
      <div class="family-card-actions">
        <button class="del-family-btn" data-fam-id="${fam.id}" title="Delete family">🗑️</button>
      </div>
    </div>`;
  }).join('');

  list.querySelectorAll('.family-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.del-family-btn')) return; // handled separately
      openFamily(card.dataset.famId);
    });
  });

  list.querySelectorAll('.del-family-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      confirmDeleteFamily(btn.dataset.famId);
    });
  });
}

function computeCompletion(fam) {
  if (!fam.responses || !SURVEY_DATA) return 0;
  const total = SURVEY_DATA.filter(q => !['heading','separator'].includes(q.type)).length;
  if (total === 0) return 0;
  const filled = Object.values(fam.responses).filter(v =>
    v !== null && v !== undefined && v !== '' &&
    !(Array.isArray(v) && v.length === 0)
  ).length;
  return Math.min(100, Math.round((filled / total) * 100));
}

async function openFamily(id) {
  currentFamily = await Storage.load(id);
  if (!currentFamily) { showToast('Family not found', 'error'); return; }
  loadResponses(currentFamily.responses || {});
  currentDeckIdx = 0;
  updateDeckHeader();
  renderCurrentDeck();
  showScreen('screen-decks');
  renderDeckGrid();
  updateHeaderTitle(currentFamily.familyName);
  setSaveStatus('saved', 'All saved');
}

async function createFamily(name) {
  const id = `fam_${Date.now()}`;
  currentFamily = {
    id,
    familyName: name.trim() || 'New Family',
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    responses: {}
  };
  loadResponses({});
  await Storage.save(currentFamily);
  allFamilies = await Storage.loadAll();
  renderFamilyList();
  currentDeckIdx = 0;
  showScreen('screen-decks');
  renderDeckGrid();
  updateHeaderTitle(currentFamily.familyName);
  setSaveStatus('saved', 'Created');
  showToast(`Family "${currentFamily.familyName}" created!`, 'success');
}

function confirmDeleteFamily(id) {
  const fam = allFamilies.find(f => f.id === id);
  showConfirm(
    `Delete "${fam?.familyName || 'this family'}"?`,
    'All survey data for this family will be permanently deleted.',
    async () => {
      await Storage.delete(id);
      allFamilies = await Storage.loadAll();
      renderFamilyList();
      showToast('Family deleted', 'info');
    }
  );
}

// ─── Deck Selector Screen ──────────────────────────────
function renderDeckGrid() {
  const grid = $('deck-grid');
  if (!grid) return;

  grid.innerHTML = DECK_META.map((deck, i) => {
    const responses = currentFamily?.responses || {};
    const deckQuestions = SURVEY_DATA.filter(q =>
      String(q.deck) === String(deck.id) && !['heading','separator'].includes(q.type)
    );
    const total = deckQuestions.length;
    const filled = deckQuestions.filter(q => {
      const v = responses[q.id];
      return v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);
    }).length;
    const pct = total ? Math.round((filled / total) * 100) : 0;

    return `<div class="deck-card" data-deck-idx="${i}" style="--deck-color:${deck.color}">
      <div class="deck-badge" style="background:${deck.color}">${deck.icon}</div>
      <div class="deck-title-en">${deck.title.en}</div>
      <div class="deck-title-native">${deck.title.hi} · ${deck.title.bn}</div>
      <div class="deck-progress">
        <div class="deck-progress-bar"><div class="deck-progress-fill" style="width:${pct}%;background:${deck.color}"></div></div>
        <div class="deck-progress-text">${filled}/${total} fields</div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.deck-card').forEach(card => {
    card.addEventListener('click', () => {
      currentDeckIdx = +card.dataset.deckIdx;
      openDeck(currentDeckIdx);
    });
  });
}

function openDeck(idx) {
  currentDeckIdx = idx;
  renderCurrentDeck();
  showScreen('screen-survey');
  updateDeckHeader();
  updateDeckNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Survey Form Screen ────────────────────────────────
function renderCurrentDeck() {
  const deckId = DECK_ORDER[currentDeckIdx];
  renderDeck(deckId, 'survey-form-container', currentFamily?.responses || {});
  updateDeckHeader();
  updateDeckNav();
}

function updateDeckHeader() {
  const meta = DECK_META[currentDeckIdx];
  if (!meta) return;

  const badge = $('deck-header-badge');
  const titleEl = $('deck-header-title');
  const subEl = $('deck-header-subtitle');

  if (badge) {
    badge.textContent = meta.icon;
    badge.style.background = meta.color;
    badge.style.color = '#0d1117';
  }
  if (titleEl) titleEl.textContent = meta.title.en;
  if (subEl) subEl.textContent = `${meta.title.hi}  ·  ${meta.title.bn}`;
}

function updateDeckNav() {
  const prevBtn = $('nav-prev');
  const nextBtn = $('nav-next');
  const progressText = $('nav-progress-text');
  const dotsContainer = $('nav-dots');

  if (prevBtn) prevBtn.disabled = currentDeckIdx <= 0;
  if (nextBtn) nextBtn.disabled = currentDeckIdx >= DECK_ORDER.length - 1;
  if (progressText) progressText.textContent = `Deck ${currentDeckIdx + 1} of ${DECK_ORDER.length}`;

  if (dotsContainer) {
    dotsContainer.innerHTML = DECK_ORDER.map((_, i) => {
      const cls = i === currentDeckIdx ? 'active' : i < currentDeckIdx ? 'visited' : '';
      return `<span class="nav-dot ${cls}"></span>`;
    }).join('');
  }
}

function updateHeaderTitle(name) {
  const el = $('header-title');
  if (el) el.textContent = name || 'Vishu Health Survey';
}

// ─── Modal (Export) ────────────────────────────────────
function openExportModal() {
  $('export-modal-overlay').classList.add('open');
}
function closeExportModal() {
  $('export-modal-overlay').classList.remove('open');
}

// ─── Confirm Dialog ────────────────────────────────────
let confirmCallback = null;
function showConfirm(title, desc, onConfirm) {
  $('confirm-title').textContent = title;
  $('confirm-desc').textContent = desc;
  confirmCallback = onConfirm;
  $('confirm-overlay').classList.add('open');
}
function closeConfirm() {
  $('confirm-overlay').classList.remove('open');
  confirmCallback = null;
}

// ─── New Family Modal ──────────────────────────────────
function openNewFamilyModal() {
  $('new-family-name').value = '';
  $('new-family-modal-overlay').classList.add('open');
  setTimeout(() => $('new-family-name').focus(), 300);
}
function closeNewFamilyModal() {
  $('new-family-modal-overlay').classList.remove('open');
}

// ─── Language Switching ────────────────────────────────
function switchLang(l) {
  lang = l;
  setLanguage(l);
  document.body.className = l === 'all' ? '' : `lang-${l}`;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === l);
  });
  // Re-render current deck if on survey screen
  if (currentScreen === 'screen-survey') {
    renderCurrentDeck();
  }
}

// ─── Init ──────────────────────────────────────────────
async function init() {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.warn);
  }

  // Warn on close if there's unsaved data
  window.addEventListener('beforeunload', e => {
    if (currentFamily && saveTimeout) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
  });

  // Wire onChange for autosave
  setOnChange(() => scheduleAutoSave());

  // Load families from storage
  await loadFamilies();

  // Show initial screen
  showScreen('screen-families');
  setSaveStatus('saved', 'Ready');

  // ── Button wiring ──

  // New family
  $('btn-new-family')?.addEventListener('click', openNewFamilyModal);
  $('btn-new-family-modal')?.addEventListener('click', openNewFamilyModal);
  $('confirm-new-family')?.addEventListener('click', async () => {
    const name = $('new-family-name').value.trim();
    if (!name) { $('new-family-name').focus(); return; }
    closeNewFamilyModal();
    await createFamily(name);
  });
  $('new-family-name')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') $('confirm-new-family')?.click();
  });
  $('cancel-new-family')?.addEventListener('click', closeNewFamilyModal);
  $('new-family-modal-overlay')?.addEventListener('click', e => {
    if (e.target === $('new-family-modal-overlay')) closeNewFamilyModal();
  });

  // Back to families
  $('btn-back-families')?.addEventListener('click', async () => {
    await autoSave();
    allFamilies = await Storage.loadAll();
    renderFamilyList();
    showScreen('screen-families');
    updateHeaderTitle('Vishu Health Survey');
  });

  // Back to decks from survey
  $('btn-back-decks')?.addEventListener('click', () => {
    showScreen('screen-decks');
    renderDeckGrid();
  });

  // Deck selector: back to families
  $('btn-decks-back')?.addEventListener('click', async () => {
    await autoSave();
    allFamilies = await Storage.loadAll();
    renderFamilyList();
    showScreen('screen-families');
    updateHeaderTitle('Vishu Health Survey');
  });

  // Deck nav
  $('nav-prev')?.addEventListener('click', () => {
    if (currentDeckIdx > 0) { currentDeckIdx--; renderCurrentDeck(); window.scrollTo({top:0,behavior:'smooth'}); }
  });
  $('nav-next')?.addEventListener('click', () => {
    if (currentDeckIdx < DECK_ORDER.length - 1) { currentDeckIdx++; renderCurrentDeck(); window.scrollTo({top:0,behavior:'smooth'}); }
  });
  $('nav-deck-selector')?.addEventListener('click', () => {
    showScreen('screen-decks');
    renderDeckGrid();
  });

  // Export FAB
  $('fab-export')?.addEventListener('click', openExportModal);
  $('close-export-modal')?.addEventListener('click', closeExportModal);
  $('export-modal-overlay')?.addEventListener('click', e => {
    if (e.target === $('export-modal-overlay')) closeExportModal();
  });

  // Export buttons
  $('btn-export-json')?.addEventListener('click', async () => {
    await autoSave();
    if (currentFamily) Exporter.exportFamilyJSON(currentFamily);
    closeExportModal();
    showToast('JSON downloaded!', 'success');
  });
  $('btn-export-csv')?.addEventListener('click', async () => {
    await autoSave();
    if (currentFamily) Exporter.exportFamilyCSV(currentFamily);
    closeExportModal();
    showToast('CSV downloaded!', 'success');
  });
  $('btn-export-html')?.addEventListener('click', async () => {
    await autoSave();
    if (currentFamily) Exporter.exportFamilyHTML(currentFamily);
    closeExportModal();
    showToast('HTML Report downloaded!', 'success');
  });
  $('btn-export-all-json')?.addEventListener('click', async () => {
    await autoSave();
    const all = await Storage.loadAll();
    Exporter.exportAllJSON(all);
    closeExportModal();
    showToast('All families JSON downloaded!', 'success');
  });
  $('btn-export-all-csv')?.addEventListener('click', async () => {
    await autoSave();
    const all = await Storage.loadAll();
    Exporter.exportAllCSV(all);
    closeExportModal();
    showToast('All families CSV downloaded!', 'success');
  });
  $('btn-export-all-html')?.addEventListener('click', async () => {
    await autoSave();
    const all = await Storage.loadAll();
    Exporter.exportAllHTML(all);
    closeExportModal();
    showToast('All HTML Reports downloaded!', 'success');
  });

  // Manual save
  $('btn-manual-save')?.addEventListener('click', async () => {
    await autoSave();
    showToast('Saved!', 'success');
  });

  // Confirm dialog
  $('confirm-yes')?.addEventListener('click', async () => {
    closeConfirm();
    if (confirmCallback) await confirmCallback();
  });
  $('confirm-no')?.addEventListener('click', closeConfirm);
  $('confirm-overlay')?.addEventListener('click', e => {
    if (e.target === $('confirm-overlay')) closeConfirm();
  });

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });

  // Keyboard shortcut: Ctrl+S
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      autoSave();
      showToast('Saved!', 'success');
    }
  });
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('DOMContentLoaded', init);
