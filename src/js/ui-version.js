// UI version switcher — lets the team compare design directions side by side.
//   V1 = reference layout (arches, script titles)
//   V2 = ONDO direction (hanok windows, editorial Korean headers, outline titles)
// Choice is read from ?ui=v1|v2, then localStorage, and applied as <html data-ui="…">.
import { LANG, setLang } from './i18n.js';

const KEY = 'ondo-ui';
const VERSIONS = [
  { id: 'v1', label: 'V1', hint: 'Reference' },
  { id: 'v2', label: 'V2', hint: 'ONDO' },
];

function read() {
  const q = new URLSearchParams(location.search).get('ui');
  if (q && VERSIONS.some((v) => v.id === q)) return q;
  try { return localStorage.getItem(KEY) || 'v1'; } catch { return 'v1'; }
}

export const UI = read();
document.documentElement.dataset.ui = UI;
export const isV2 = UI === 'v2';

export function mountSwitcher() {
  const el = document.createElement('div');
  el.className = 'ui-switcher';
  el.innerHTML = `<span class="ui-switcher__label">UI</span>${VERSIONS.map((v) => `<button type="button" data-v="${v.id}" class="${v.id === UI ? 'is-active' : ''}" title="${v.hint}">${v.label}<small>${v.hint}</small></button>`).join('')}<span class="ui-switcher__sep"></span>${[['en', 'EN', 'English'], ['ko', '한', '한국어']].map(([id, l, h]) => `<button type="button" data-lang="${id}" class="${id === LANG ? 'is-active' : ''}" title="${h}">${l}<small>${h}</small></button>`).join('')}`;
  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b?.dataset.lang) { if (b.dataset.lang !== LANG) setLang(b.dataset.lang); return; }
    if (!b || b.dataset.v === UI) return;
    try { localStorage.setItem(KEY, b.dataset.v); } catch { /* ignore */ }
    const url = new URL(location.href);
    url.searchParams.set('ui', b.dataset.v);
    url.hash = '';
    location.href = url.toString();
  });
  document.body.appendChild(el);
}
