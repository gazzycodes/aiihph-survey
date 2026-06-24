/**
 * renderer.js — Dynamic form builder from SURVEY_DATA question objects
 * Renders cards for each question based on type, handles conditionals,
 * and fires onChange callbacks for autosave.
 */

import { SURVEY_DATA } from './data.js';

let currentLang = 'all'; // 'all' | 'en' | 'hi' | 'bn'
let onChangeCallback = null;
let currentResponses = {};

export function setLanguage(lang) {
  currentLang = lang;
}

export function setOnChange(fn) {
  onChangeCallback = fn;
}

function t(obj) {
  if (!obj) return '';
  if (currentLang === 'all') {
    return `<span class="lang-en">${obj.en || ''}</span>${obj.hi ? `<span class="lang-hi">${obj.hi}</span>` : ''}${obj.bn ? `<span class="lang-bn">${obj.bn}</span>` : ''}`;
  }
  return obj[currentLang] || obj.en || '';
}

function tPlain(obj, lang) {
  if (!obj) return '';
  const l = lang || currentLang;
  if (l === 'all') return obj.en || '';
  return obj[l] || obj.en || '';
}

function getVal(id) {
  return currentResponses[id] ?? '';
}

function setVal(id, val) {
  currentResponses[id] = val;
  if (onChangeCallback) onChangeCallback(id, val, currentResponses);
}

function isVisible(q) {
  if (!q.conditional) return true;
  const { field, value } = q.conditional;
  const actual = getVal(field);
  if (Array.isArray(value)) return value.includes(actual);
  return String(actual) === String(value);
}

// ---- Field Renderers ----

function renderText(q) {
  const val = getVal(q.id);
  return `<input type="text" id="f_${q.id}" class="field-input" value="${escHtml(val)}" placeholder="${escHtml(tPlain(q.placeholder, 'en'))}" data-field="${q.id}">`;
}

function renderNumber(q) {
  const val = getVal(q.id);
  return `<input type="number" id="f_${q.id}" class="field-input" value="${escHtml(String(val))}" placeholder="0" data-field="${q.id}" inputmode="numeric">`;
}

function renderDate(q) {
  const val = getVal(q.id);
  return `<input type="date" id="f_${q.id}" class="field-input" value="${escHtml(val)}" data-field="${q.id}">`;
}

function renderTextarea(q) {
  const val = getVal(q.id);
  return `<textarea id="f_${q.id}" class="field-textarea" rows="3" data-field="${q.id}" placeholder="${escHtml(tPlain(q.placeholder, 'en') || 'Write here...')}">${escHtml(val)}</textarea>`;
}

function renderRadio(q) {
  const val = getVal(q.id);
  const opts = (q.options || []).map(o => {
    const selected = val === o.value;
    return `<button type="button" class="pill-btn ${selected ? 'selected' : ''}" data-field="${q.id}" data-value="${escHtml(o.value)}">
      ${t(o.label)}
    </button>`;
  }).join('');
  return `<div class="pill-group" id="f_${q.id}">${opts}</div>`;
}

function renderSelect(q) {
  const val = getVal(q.id);
  const opts = (q.options || []).map(o =>
    `<option value="${escHtml(o.value)}" ${val === o.value ? 'selected' : ''}>${escHtml(tPlain(o.label))}</option>`
  ).join('');
  return `<select id="f_${q.id}" class="field-select" data-field="${q.id}">
    <option value="">-- Select --</option>
    ${opts}
  </select>`;
}

function renderMultiselect(q) {
  const vals = Array.isArray(getVal(q.id)) ? getVal(q.id) : [];
  const opts = (q.options || []).map(o => {
    const selected = vals.includes(o.value);
    return `<button type="button" class="pill-btn multi ${selected ? 'selected' : ''}" data-field="${q.id}" data-value="${escHtml(o.value)}" data-multi="true">
      ${t(o.label)}
    </button>`;
  }).join('');
  return `<div class="pill-group" id="f_${q.id}">${opts}</div>`;
}

function renderTable(q) {
  const rows = Array.isArray(getVal(q.id)) ? getVal(q.id) : [];
  const cols = q.columns || [];
  const addLabel = tPlain(q.addRowLabel) || '+ Add Row';

  // Desktop view header cells
  const headerCells = cols.map(c => `<th>${t(c.label)}</th>`).join('') + '<th></th>';

  const renderDesktopRow = (row, idx) => {
    const cells = cols.map(c => {
      const cellVal = row[c.key] ?? '';
      let input;
      if (c.type === 'select') {
        const copts = (c.options || []).map(o =>
          `<option value="${escHtml(o.value)}" ${cellVal === o.value ? 'selected' : ''}>${escHtml(tPlain(o.label))}</option>`
        ).join('');
        input = `<select class="table-cell-input" data-table="${q.id}" data-row="${idx}" data-col="${c.key}"><option value="">-</option>${copts}</select>`;
      } else if (c.type === 'number') {
        input = `<input type="number" class="table-cell-input" data-table="${q.id}" data-row="${idx}" data-col="${c.key}" value="${escHtml(String(cellVal))}" inputmode="numeric">`;
      } else {
        input = `<input type="text" class="table-cell-input" data-table="${q.id}" data-row="${idx}" data-col="${c.key}" value="${escHtml(cellVal)}">`;
      }
      return `<td>${input}</td>`;
    }).join('');
    return `<tr data-row-idx="${idx}">${cells}<td><button type="button" class="table-del-btn" data-table="${q.id}" data-row="${idx}" title="Remove row">✕</button></td></tr>`;
  };

  const renderMobileCard = (row, idx) => {
    const fields = cols.map(c => {
      const cellVal = row[c.key] ?? '';
      let input;
      if (c.type === 'select') {
        const copts = (c.options || []).map(o =>
          `<option value="${escHtml(o.value)}" ${cellVal === o.value ? 'selected' : ''}>${escHtml(tPlain(o.label))}</option>`
        ).join('');
        input = `<select class="table-cell-input" data-table="${q.id}" data-row="${idx}" data-col="${c.key}"><option value="">-- Select --</option>${copts}</select>`;
      } else if (c.type === 'number') {
        input = `<input type="number" class="table-cell-input" data-table="${q.id}" data-row="${idx}" data-col="${c.key}" value="${escHtml(String(cellVal))}" inputmode="numeric" placeholder="0">`;
      } else {
        input = `<input type="text" class="table-cell-input" data-table="${q.id}" data-row="${idx}" data-col="${c.key}" value="${escHtml(cellVal)}" placeholder="Type here...">`;
      }
      return `<div class="table-card-field">
        <label class="table-card-field-label">${t(c.label)}</label>
        <div class="table-card-field-input-wrapper">${input}</div>
      </div>`;
    }).join('');

    return `<div class="table-row-card" data-row-idx="${idx}">
      <div class="table-row-card-header">
        <span class="table-row-card-title">Entry #${idx + 1}</span>
        <button type="button" class="table-row-card-del-btn" data-table="${q.id}" data-row="${idx}" title="Remove entry">✕ Remove</button>
      </div>
      <div class="table-row-card-body">
        ${fields}
      </div>
    </div>`;
  };

  const desktopRows = rows.map((row, i) => renderDesktopRow(row, i)).join('');
  const mobileCards = rows.map((row, i) => renderMobileCard(row, i)).join('');

  return `<div class="table-section-wrapper" id="f_${q.id}">
    <!-- Desktop Table View -->
    <div class="table-desktop-view">
      <table class="survey-table">
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${desktopRows}</tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <div class="table-mobile-view">
      ${mobileCards}
    </div>

    <button type="button" class="add-row-btn" data-table="${q.id}" data-columns='${JSON.stringify(cols.map(c=>c.key))}'>
      + ${addLabel}
    </button>
  </div>`;
}

// ---- Card Builder ----

function buildCard(q) {
  if (!isVisible(q)) return '';

  const labelHtml = t(q.label);
  let inputHtml = '';

  switch (q.type) {
    case 'heading':
      return `<div class="section-heading" id="f_${q.id}"><h3>${labelHtml}</h3></div>`;
    case 'separator':
      return `<hr class="section-sep">`;
    case 'text': inputHtml = renderText(q); break;
    case 'number': inputHtml = renderNumber(q); break;
    case 'date': inputHtml = renderDate(q); break;
    case 'textarea': inputHtml = renderTextarea(q); break;
    case 'radio': inputHtml = renderRadio(q); break;
    case 'select': inputHtml = renderSelect(q); break;
    case 'multiselect': inputHtml = renderMultiselect(q); break;
    case 'table': inputHtml = renderTable(q); break;
    default: inputHtml = renderText(q);
  }

  return `<div class="question-card" data-field-id="${q.id}" data-type="${q.type}">
    <label class="question-label" for="f_${q.id}">${labelHtml}</label>
    ${inputHtml}
  </div>`;
}

// ---- Main render function ----

export function renderDeck(deckId, containerId, responses) {
  currentResponses = responses || {};
  const container = document.getElementById(containerId);
  if (!container) return;

  const questions = SURVEY_DATA.filter(q => String(q.deck) === String(deckId));
  container.innerHTML = questions.map(buildCard).join('');

  // Attach events
  attachEvents(container, questions);
}

export function rerenderConditionals(containerId, deckId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const questions = SURVEY_DATA.filter(q => String(q.deck) === String(deckId));
  questions.forEach(q => {
    if (!q.conditional) return;
    const el = container.querySelector(`[data-field-id="${q.id}"]`);
    if (!el) return;
    const show = isVisible(q);
    el.style.display = show ? '' : 'none';
  });
}

function attachEvents(container, questions) {
  // Text / number / date / textarea
  container.querySelectorAll('input[data-field], textarea[data-field], select[data-field]').forEach(el => {
    el.addEventListener('input', () => {
      setVal(el.dataset.field, el.value);
      rerenderConditionals(container.id, questions[0]?.deck);
    });
    el.addEventListener('change', () => {
      setVal(el.dataset.field, el.value);
      rerenderConditionals(container.id, questions[0]?.deck);
    });
  });

  // Pills (radio / multiselect)
  container.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const field = btn.dataset.field;
      const val = btn.dataset.value;
      const isMulti = btn.dataset.multi === 'true';

      if (isMulti) {
        let vals = Array.isArray(getVal(field)) ? [...getVal(field)] : [];
        if (vals.includes(val)) vals = vals.filter(v => v !== val);
        else vals.push(val);
        setVal(field, vals);
        // Toggle UI
        container.querySelectorAll(`.pill-btn[data-field="${field}"]`).forEach(b => {
          b.classList.toggle('selected', vals.includes(b.dataset.value));
        });
      } else {
        setVal(field, val);
        container.querySelectorAll(`.pill-btn[data-field="${field}"]`).forEach(b => {
          b.classList.toggle('selected', b.dataset.value === val);
        });
      }
      rerenderConditionals(container.id, questions[0]?.deck);
    });
  });

  // Table cell inputs
  container.querySelectorAll('.table-cell-input').forEach(inp => {
    inp.addEventListener('input', () => {
      updateTableCell(inp.dataset.table, +inp.dataset.row, inp.dataset.col, inp.value);
    });
  });

  // Table add row
  container.querySelectorAll('.add-row-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tableId = btn.dataset.table;
      const cols = JSON.parse(btn.dataset.columns || '[]');
      const rows = Array.isArray(getVal(tableId)) ? [...getVal(tableId)] : [];
      const newRow = {};
      cols.forEach(c => { newRow[c] = ''; });
      rows.push(newRow);
      setVal(tableId, rows);
      // Re-render table body
      rerenderTable(container, tableId, rows, questions.find(q => q.id === tableId));
    });
  });

  // Table delete row
  container.addEventListener('click', e => {
    const btn = e.target.closest('.table-del-btn') || e.target.closest('.table-row-card-del-btn');
    if (!btn) return;
    const tableId = btn.dataset.table;
    const rowIdx = +btn.dataset.row;
    const rows = Array.isArray(getVal(tableId)) ? [...getVal(tableId)] : [];
    rows.splice(rowIdx, 1);
    setVal(tableId, rows);
    const q = questions.find(q => q.id === tableId);
    rerenderTable(container, tableId, rows, q);
  });
}

function updateTableCell(tableId, rowIdx, colKey, value) {
  const rows = Array.isArray(getVal(tableId)) ? JSON.parse(JSON.stringify(getVal(tableId))) : [];
  if (!rows[rowIdx]) rows[rowIdx] = {};
  rows[rowIdx][colKey] = value;
  setVal(tableId, rows);
}

function rerenderTable(container, tableId, rows, q) {
  const wrapper = container.querySelector(`#f_${tableId}`);
  if (!wrapper) return;
  const cols = q?.columns || [];

  // Update desktop table body
  const tbody = wrapper.querySelector('.table-desktop-view tbody');
  if (tbody) {
    tbody.innerHTML = rows.map((row, idx) => {
      const cells = cols.map(c => {
        const cellVal = row[c.key] ?? '';
        let input;
        if (c.type === 'select') {
          const copts = (c.options || []).map(o =>
            `<option value="${escHtml(o.value)}" ${cellVal === o.value ? 'selected' : ''}>${escHtml(tPlain(o.label))}</option>`
          ).join('');
          input = `<select class="table-cell-input" data-table="${tableId}" data-row="${idx}" data-col="${c.key}"><option value="">-</option>${copts}</select>`;
        } else if (c.type === 'number') {
          input = `<input type="number" class="table-cell-input" data-table="${tableId}" data-row="${idx}" data-col="${c.key}" value="${escHtml(String(cellVal))}" inputmode="numeric">`;
        } else {
          input = `<input type="text" class="table-cell-input" data-table="${tableId}" data-row="${idx}" data-col="${c.key}" value="${escHtml(cellVal)}">`;
        }
        return `<td>${input}</td>`;
      }).join('');
      return `<tr data-row-idx="${idx}">${cells}<td><button type="button" class="table-del-btn" data-table="${tableId}" data-row="${idx}" title="Remove row">✕</button></td></tr>`;
    }).join('');
  }

  // Update mobile cards view
  const mobileView = wrapper.querySelector('.table-mobile-view');
  if (mobileView) {
    mobileView.innerHTML = rows.map((row, idx) => {
      const fields = cols.map(c => {
        const cellVal = row[c.key] ?? '';
        let input;
        if (c.type === 'select') {
          const copts = (c.options || []).map(o =>
            `<option value="${escHtml(o.value)}" ${cellVal === o.value ? 'selected' : ''}>${escHtml(tPlain(o.label))}</option>`
          ).join('');
          input = `<select class="table-cell-input" data-table="${tableId}" data-row="${idx}" data-col="${c.key}"><option value="">-- Select --</option>${copts}</select>`;
        } else if (c.type === 'number') {
          input = `<input type="number" class="table-cell-input" data-table="${tableId}" data-row="${idx}" data-col="${c.key}" value="${escHtml(String(cellVal))}" inputmode="numeric" placeholder="0">`;
        } else {
          input = `<input type="text" class="table-cell-input" data-table="${tableId}" data-row="${idx}" data-col="${c.key}" value="${escHtml(cellVal)}" placeholder="Type here...">`;
        }
        return `<div class="table-card-field">
          <label class="table-card-field-label">${t(c.label)}</label>
          <div class="table-card-field-input-wrapper">${input}</div>
        </div>`;
      }).join('');

      return `<div class="table-row-card" data-row-idx="${idx}">
        <div class="table-row-card-header">
          <span class="table-row-card-title">Entry #${idx + 1}</span>
          <button type="button" class="table-row-card-del-btn" data-table="${tableId}" data-row="${idx}" title="Remove entry">✕ Remove</button>
        </div>
        <div class="table-row-card-body">
          ${fields}
        </div>
      </div>`;
    }).join('');
  }

  // Reattach cell events for both views
  wrapper.querySelectorAll('.table-cell-input').forEach(inp => {
    inp.addEventListener('input', () => {
      updateTableCell(inp.dataset.table, +inp.dataset.row, inp.dataset.col, inp.value);
    });
  });
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

export function getResponses() {
  return currentResponses;
}

export function loadResponses(responses) {
  currentResponses = responses || {};
}
