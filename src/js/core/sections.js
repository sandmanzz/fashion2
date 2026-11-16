// Port of the original `v-observer` directive + useSections():
// every section gets a scroll progress 0..1 (enter bottom -> leave top) and an active flag.
import { scroll } from './scroll.js';
import { set as storeSet } from './store.js';

const sections = [];
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

export function getSection(label) { return sections.find((s) => s.label === label); }
export function onSectionsChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export const allSections = () => sections;
if (import.meta.env?.DEV) window.__sections = sections;

/** Section closest to its midpoint among the given labels (navigation highlighting). */
export function activeAmong(labels) {
  let best = null, d = Infinity;
  for (const s of sections) {
    if (!s.active || !labels.includes(s.label)) continue;
    const v = Math.abs(s.progress - 0.5);
    if (v < d) { d = v; best = s; }
  }
  return best;
}

/** Register an element. Returns the live section record ({progress, active}). */
export function observe(el, label, { pin = false } = {}) {
  el.id = el.id || label;
  el.dataset.section = label;
  let rec = getSection(label);
  if (!rec) { rec = { label, el, progress: 0, active: false }; sections.push(rec); }
  let h = el.offsetHeight;
  let top = el.getBoundingClientRect().top + window.scrollY;
  let vh = window.innerHeight;
  let vw = window.innerWidth;
  let active = false;
  let lastScroll = window.scrollY;
  const zoomed = () => (window.visualViewport?.scale ?? 1) > 1.05;
  window.addEventListener('resize', () => {
    if (!zoomed() && window.innerWidth !== vw) { vw = window.innerWidth; vh = window.innerHeight; }
  }, { passive: true });
  const io = new IntersectionObserver(([e]) => {
    if (zoomed()) return;
    h = e.boundingClientRect.height;
    top = e.boundingClientRect.top + lastScroll;
  }, { threshold: 0 });
  io.observe(el);
  const onScroll = ({ scroll: y }) => {
    lastScroll = y;
    const t = top - y;
    const n = (vh - t) / (vh + h);
    const inView = n > 0 && n < 1;
    const raw = pin ? (inView ? 0.5 : n) : (vh - t) / (vh + h);
    const p = Math.min(1, Math.max(0, raw));
    if (inView !== active) { active = inView; rec.active = active; rec.progress = p; notify(); }
    if (active) { rec.progress = p; notify(); }
  };
  scroll.watch(onScroll);
  return rec;
}

export { storeSet };
