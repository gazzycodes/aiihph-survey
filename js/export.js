/**
 * export.js — JSON, CSV, and HTML report export with offline-safe download trigger
 * Generates human-readable CSV headers and beautiful printable HTML reports.
 */

import { SURVEY_DATA } from './data.js';

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
}

// Format date as YYYY-MM-DD
function dateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Convert family name to safe filename
function safeName(name) {
  return (name || 'Family').replace(/[^a-zA-Z0-9\u0900-\u09FF]/g, '_').slice(0, 30);
}

// Flatten a family object into a single-level key:value map for CSV
function flatten(obj, prefix = '') {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v === null || v === undefined) {
      result[key] = '';
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(result, flatten(item, `${key}[${i}]`));
        } else {
          result[`${key}[${i}]`] = String(item);
        }
      });
    } else if (typeof v === 'object') {
      Object.assign(result, flatten(v, key));
    } else {
      result[key] = String(v);
    }
  }
  return result;
}

// Translate flat keys into human-readable English question text
function getQuestionHeader(key) {
  if (key === 'id') return 'Record ID';
  if (key === 'familyName') return 'Family Name';
  if (key === 'createdAt') return 'Created At';
  if (key === 'lastModified') return 'Last Modified';

  if (key.startsWith('responses.')) {
    const field = key.replace('responses.', '');

    // Check if it's a table cell: e.g. table_id[0].col_key
    const tableMatch = field.match(/^([^\[]+)\[(\d+)\]\.(.+)$/);
    if (tableMatch) {
      const [_, tableId, rowIdx, colKey] = tableMatch;
      const q = SURVEY_DATA.find(x => x.id === tableId);
      if (q) {
        const col = (q.columns || []).find(c => c.key === colKey);
        const colLabel = col ? (col.label.en || colKey) : colKey;
        const tableLabel = q.label.en || tableId;
        return `D${q.deck} | ${tableLabel} (Row ${parseInt(rowIdx) + 1}) — ${colLabel}`;
      }
    }

    // Check if it's an array item (multiselect): e.g. field_id[0]
    const arrayMatch = field.match(/^([^\[]+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [_, fieldId, itemIdx] = arrayMatch;
      const q = SURVEY_DATA.find(x => x.id === fieldId);
      if (q) {
        const label = q.label.en || fieldId;
        return `D${q.deck} | ${label} (Item ${parseInt(itemIdx) + 1})`;
      }
    }

    // Standard field
    const q = SURVEY_DATA.find(x => x.id === field);
    if (q) {
      return `D${q.deck} | ${q.label.en || field}`;
    }
  }

  return key;
}

// Convert families list to CSV
function familiesToCSV(families) {
  if (!families.length) return '';

  const flatFams = families.map(f => flatten(f));
  const actualKeys = new Set();
  flatFams.forEach(flat => {
    Object.keys(flat).forEach(k => actualKeys.add(k));
  });

  const orderedKeys = [];

  // Metadata columns first
  const metaKeys = ['id', 'familyName', 'createdAt', 'lastModified'];
  metaKeys.forEach(k => {
    if (actualKeys.has(k)) orderedKeys.push(k);
  });

  // Then survey questions in order of SURVEY_DATA
  SURVEY_DATA.forEach(q => {
    if (['heading', 'separator'].includes(q.type)) return;

    const baseKey = `responses.${q.id}`;

    if (q.type === 'table') {
      const rowIndices = new Set();
      actualKeys.forEach(k => {
        if (k.startsWith(baseKey + '[')) {
          const match = k.match(new RegExp(`^responses\\.${q.id}\\[(\\d+)\\]`));
          if (match) rowIndices.add(parseInt(match[1]));
        }
      });

      const sortedRows = [...rowIndices].sort((a, b) => a - b);
      sortedRows.forEach(r => {
        (q.columns || []).forEach(col => {
          const cellKey = `${baseKey}[${r}].${col.key}`;
          orderedKeys.push(cellKey);
        });
      });
    } else if (q.type === 'multiselect') {
      const itemIndices = new Set();
      actualKeys.forEach(k => {
        if (k.startsWith(baseKey + '[')) {
          const match = k.match(new RegExp(`^responses\\.${q.id}\\[(\\d+)\\]`));
          if (match) itemIndices.add(parseInt(match[1]));
        }
      });
      const sortedItems = [...itemIndices].sort((a, b) => a - b);
      sortedItems.forEach(i => {
        orderedKeys.push(`${baseKey}[${i}]`);
      });
    } else {
      orderedKeys.push(baseKey);
    }
  });

  actualKeys.forEach(k => {
    if (!orderedKeys.includes(k)) orderedKeys.push(k);
  });

  const headerLine = orderedKeys.map(k => `"${getQuestionHeader(k).replace(/"/g, '""')}"`).join(',');
  const rows = flatFams.map(flat =>
    orderedKeys.map(k => `"${(flat[k] || '').replace(/"/g, '""')}"`).join(',')
  );

  return [headerLine, ...rows].join('\n');
}

// ─────────────────────────────────────────
// HTML REPORT EXPORT
// ─────────────────────────────────────────

function getOptionLabelText(q, value) {
  if (!q.options) return value;
  if (Array.isArray(value)) {
    return value.map(v => getOptionLabelText(q, v)).join(', ');
  }
  const opt = q.options.find(o => String(o.value) === String(value));
  if (!opt) return value;
  const en = opt.label.en || opt.value;
  const hi = opt.label.hi ? ` / ${opt.label.hi}` : '';
  const bn = opt.label.bn ? ` / ${opt.label.bn}` : '';
  return `${en}${hi || bn ? ` (${hi.replace(/^\s*\/\s*/, '')}${bn})` : ''}`;
}

function renderSingleFamilyCardHTML(family) {
  const r = family.responses || {};
  const modTime = family.lastModified ? new Date(family.lastModified).toLocaleString('en-IN') : 'Never';
  const creTime = family.createdAt ? new Date(family.createdAt).toLocaleString('en-IN') : 'Never';

  let html = `
  <div class="report-card">
    <h1>🏥 Health Survey Summary: ${family.familyName || 'Unnamed Family'}</h1>
    <div class="meta-grid">
      <div class="meta-item"><strong>Record ID:</strong> ${family.id}</div>
      <div class="meta-item"><strong>Created:</strong> ${creTime}</div>
      <div class="meta-item"><strong>Last Saved:</strong> ${modTime}</div>
    </div>
  `;

  const DECKS_IN_ORDER = ['1', '2', '3', '4', '5', '6', '7', '7a', '7b', '8'];
  const DECK_META_MAP = {
    '1': { title: 'Deck 1: Socio-Demographic Profile', label: { hi: 'सामाजिक-जनसांख्यिकीय प्रोफ़ाइल', bn: 'আর্থ-সামাজিক পরিচয়' } },
    '2': { title: 'Deck 2: Environment & Housing', label: { hi: 'पर्यावरण और आवास', bn: 'পরিবেশ ও বাসস্থান' } },
    '3': { title: 'Deck 3: Knowledge, Attitudes & Practices', label: { hi: 'ज्ञान, दृष्टिकोण और व्यवहार', bn: 'জ্ঞান, মনোভাব ও অনুশীলন' } },
    '4': { title: 'Deck 4: Nutrition & Diet Survey', label: { hi: 'पोषण और आहार सर्वे', bn: 'পুষ্টি ও খাদ্য জরিপ' } },
    '5': { title: 'Deck 5: Under-5 Health Checkup', label: { hi: 'पाँच वर्ष से कम बच्चों का स्वास्थ्य', bn: '৫ বছরের কম শিশুর স্বাস্থ্য' } },
    '6': { title: 'Deck 6: Obstetric History', label: { hi: 'प्रसूति इतिहास', bn: 'প্রসূতি इतिहास' } },
    '7': { title: 'Deck 7: Individual Health Checkup', label: { hi: 'व्यक्तिगत स्वास्थ्य जाँच', bn: 'ব্যক্তিগত স্বাস্থ্য পরীক্ষা' } },
    '7a': { title: 'Deck 7A: Adolescent Health', label: { hi: 'किशोर स्वास्थ्य', bn: 'কিশোর স্বাস্থ্য' } },
    '7b': { title: 'Deck 7B: Geriatric Health', label: { hi: 'वृद्ध स्वास्थ्य', bn: 'বৃদ্ধ স্বাস্থ্য' } },
    '8': { title: 'Deck 8: Actions & Recommendations', label: { hi: 'कार्रवाई और सिफारिशें', bn: 'পদক্ষেপ ও সুপারিশ' } },
  };

  DECKS_IN_ORDER.forEach(deckId => {
    const questions = SURVEY_DATA.filter(q => String(q.deck) === String(deckId));
    if (questions.length === 0) return;

    const meta = DECK_META_MAP[deckId];
    html += `
    <div class="deck-section">
      <div class="deck-header">
        ${meta.title}
        ${meta.label.hi || meta.label.bn ? `<div style="font-size:13px;font-weight:normal;opacity:0.9">${meta.label.hi} · ${meta.label.bn}</div>` : ''}
      </div>
    `;

    questions.forEach(q => {
      if (q.type === 'heading') {
        const en = q.label.en || '';
        const hi = q.label.hi ? ` · ${q.label.hi}` : '';
        const bn = q.label.bn ? ` · ${q.label.bn}` : '';
        html += `<div class="section-heading">${en}${hi}${bn}</div>`;
        return;
      }
      if (q.type === 'separator') {
        html += `<hr class="section-sep">`;
        return;
      }

      // Check if it's conditional and visible based on current answers
      const isVisible = (() => {
        if (!q.conditional) return true;
        const { field, value } = q.conditional;
        const actual = r[field] ?? '';
        if (Array.isArray(value)) return value.includes(actual);
        return String(actual) === String(value);
      })();

      if (!isVisible) return; // skip printing hidden conditional fields

      const enLabel = q.label.en || '';
      const hiLabel = q.label.hi ? `<span class="lang-hi">${q.label.hi}</span>` : '';
      const bnLabel = q.label.bn ? `<span class="lang-bn">${q.label.bn}</span>` : '';

      html += `
      <div class="question-row">
        <div class="question-text">
          <strong>${enLabel}</strong>
          ${hiLabel}
          ${bnLabel}
        </div>
      `;

      const val = r[q.id];

      if (q.type === 'table') {
        const rows = Array.isArray(val) ? val : [];
        if (rows.length === 0) {
          html += `<div class="answer-text empty">No entries added</div>`;
        } else {
          const cols = q.columns || [];
          let tableHtml = `<table class="report-table"><thead><tr>`;
          cols.forEach(c => {
            tableHtml += `<th>${c.label.en || c.key}</th>`;
          });
          tableHtml += `</tr></thead><tbody>`;

          rows.forEach(row => {
            tableHtml += `<tr>`;
            cols.forEach(c => {
              const cellVal = row[c.key] ?? '';
              let formattedVal = cellVal;
              if (c.type === 'select' && c.options) {
                const opt = c.options.find(o => String(o.value) === String(cellVal));
                if (opt) {
                  const oEn = opt.label.en || opt.value;
                  const oHi = opt.label.hi ? ` / ${opt.label.hi}` : '';
                  const oBn = opt.label.bn ? ` / ${opt.label.bn}` : '';
                  formattedVal = `${oEn}${oHi || oBn ? ` (${oHi.replace(/^\s*\/\s*/, '')}${oBn})` : ''}`;
                }
              }
              tableHtml += `<td>${formattedVal || '—'}</td>`;
            });
            tableHtml += `</tr>`;
          });
          tableHtml += `</tbody></table>`;
          html += tableHtml;
        }
      } else {
        // Standard question
        if (val === null || val === undefined || val === '' || (Array.isArray(val) && val.length === 0)) {
          html += `<div class="answer-text empty">— (Not answered)</div>`;
        } else {
          let displayVal = val;
          if (q.type === 'radio' || q.type === 'select' || q.type === 'multiselect') {
            displayVal = getOptionLabelText(q, val);
          }
          html += `<div class="answer-text">${displayVal}</div>`;
        }
      }

      html += `</div>`; // end question-row
    });

    html += `</div>`; // end deck-section
  });

  html += `</div>`; // end report-card
  return html;
}

const HTML_STYLE = `
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    padding: 40px 20px;
    max-width: 900px;
    margin: 0 auto;
    background: #f8fafc;
  }
  .report-card {
    background: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
    border: 1px solid #e2e8f0;
    margin-bottom: 40px;
    page-break-after: always;
  }
  .report-card:last-child {
    page-break-after: avoid;
  }
  h1 {
    font-size: 28px;
    color: #0f172a;
    margin: 0 0 8px 0;
    border-bottom: 2px solid #2dd4bf;
    padding-bottom: 12px;
  }
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin: 20px 0 30px 0;
    font-size: 14px;
    background: #f1f5f9;
    padding: 16px;
    border-radius: 8px;
  }
  .meta-item strong {
    color: #475569;
  }
  .deck-section {
    margin-top: 30px;
  }
  .deck-header {
    background: #2dd4bf;
    color: #0d1117;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .section-heading {
    font-size: 16px;
    color: #0f766e;
    border-bottom: 1px solid #ccfbf1;
    padding-bottom: 4px;
    margin: 24px 0 16px 0;
    font-weight: 600;
  }
  .section-sep {
    border: 0;
    border-top: 1px dashed #cbd5e1;
    margin: 20px 0;
  }
  .question-row {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    border-bottom: 1px solid #f1f5f9;
  }
  .question-text {
    font-size: 14px;
    font-weight: 500;
    color: #334155;
  }
  .lang-hi { color: #64748b; font-size: 13px; display: block; margin-top: 2px; }
  .lang-bn { color: #64748b; font-size: 13px; display: block; margin-top: 2px; }
  .answer-text {
    margin-top: 8px;
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
    background: #f8fafc;
    padding: 8px 12px;
    border-radius: 6px;
    border-left: 3px solid #2dd4bf;
    white-space: pre-wrap;
  }
  .answer-text.empty {
    color: #94a3b8;
    font-weight: 400;
    font-style: italic;
    border-left-color: #e2e8f0;
  }
  .report-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 14px;
  }
  .report-table th, .report-table td {
    border: 1px solid #cbd5e1;
    padding: 10px;
    text-align: left;
  }
  .report-table th {
    background: #f1f5f9;
    color: #475569;
    font-weight: 600;
  }
  @media print {
    body {
      background: #ffffff;
      padding: 0;
    }
    .report-card {
      border: none;
      box-shadow: none;
      padding: 0;
      margin: 0;
    }
    .answer-text {
      background: transparent;
      padding: 4px 0 0 0;
      border-left: none;
    }
  }
`;

function familyToHTML(family) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Survey Report — ${family.familyName || 'Family'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${HTML_STYLE}</style>
</head>
<body>
  ${renderSingleFamilyCardHTML(family)}
</body>
</html>`;
}

function allFamiliesToHTML(families) {
  let cards = '';
  families.forEach(f => {
    cards += renderSingleFamilyCardHTML(f);
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Survey Reports — All Families</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${HTML_STYLE}</style>
</head>
<body>
  ${cards}
</body>
</html>`;
}

const Exporter = {
  exportFamilyJSON(family) {
    const json = JSON.stringify(family, null, 2);
    downloadBlob(json, `${safeName(family.familyName)}_${dateStr()}.json`, 'application/json');
  },

  exportAllJSON(families) {
    const json = JSON.stringify(families, null, 2);
    downloadBlob(json, `all_families_${dateStr()}.json`, 'application/json');
  },

  exportFamilyCSV(family) {
    const csv = familiesToCSV([family]);
    downloadBlob(csv, `${safeName(family.familyName)}_${dateStr()}.csv`, 'text/csv');
  },

  exportAllCSV(families) {
    const csv = familiesToCSV(families);
    downloadBlob(csv, `all_families_${dateStr()}.csv`, 'text/csv');
  },

  exportFamilyHTML(family) {
    const html = familyToHTML(family);
    downloadBlob(html, `${safeName(family.familyName)}_${dateStr()}.html`, 'text/html');
  },

  exportAllHTML(families) {
    const html = allFamiliesToHTML(families);
    downloadBlob(html, `all_families_${dateStr()}.html`, 'text/html');
  }
};

export default Exporter;
