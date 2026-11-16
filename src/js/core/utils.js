import gsap from 'gsap';

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const range = (v, a, b) => clamp01((v - a) / (b - a));
export const zoomed = () => (window.visualViewport?.scale ?? 1) > 1.05;
export const nextTick = () => new Promise((r) => requestAnimationFrame(() => r()));

const tabletMq = window.matchMedia('(max-width: 960px)');
export const isTablet = () => tabletMq.matches;
export const onTabletChange = (fn) => tabletMq.addEventListener('change', fn);

export const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const nl2br = (s = '') => esc(s).replace(/\n/g, '<br>');

export function html(str) {
  const t = document.createElement('template');
  t.innerHTML = str.trim();
  return t.content.firstElementChild;
}

/** Vue-style <Transition name> helper (enter/leave class sequence). */
export function transition(el, name, show, { onAfterLeave } = {}) {
  const cls = (s) => `${name}-${s}`;
  el.classList.remove(cls('enter-from'), cls('enter-active'), cls('enter-to'), cls('leave-from'), cls('leave-active'), cls('leave-to'));
  const done = (fn) => {
    let called = false;
    const end = (e) => { if (e && e.target !== el) return; if (called) return; called = true; el.removeEventListener('transitionend', end); el.removeEventListener('animationend', end); fn(); };
    el.addEventListener('transitionend', end);
    el.addEventListener('animationend', end);
    const dur = Math.max(...getComputedStyle(el).transitionDuration.split(',').map((d) => parseFloat(d) * (d.includes('ms') ? 1 : 1000) || 0),
      ...[...el.querySelectorAll('*')].slice(0, 30).map((c) => Math.max(...getComputedStyle(c).transitionDuration.split(',').map((d) => parseFloat(d) * 1000 || 0)) + Math.max(...getComputedStyle(c).transitionDelay.split(',').map((d) => parseFloat(d) * 1000 || 0))));
    setTimeout(() => end(), dur + 50);
  };
  if (show) {
    el.style.display = '';
    el.classList.add(cls('enter-from'), cls('enter-active'));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.remove(cls('enter-from'));
      el.classList.add(cls('enter-to'));
      done(() => el.classList.remove(cls('enter-active'), cls('enter-to')));
    }));
  } else {
    el.classList.add(cls('leave-from'), cls('leave-active'));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.remove(cls('leave-from'));
      el.classList.add(cls('leave-to'));
      done(() => { el.classList.remove(cls('leave-active'), cls('leave-to')); el.style.display = 'none'; onAfterLeave?.(); });
    }));
  }
}

/** Port of the original char animation composable (stagger in/out of letter spans). */
export function charAnim({ stagger = 0.02, durationIn = 0.25, durationOut = 0.2, yOffset = 6, getEls }) {
  const out = () => {
    const e = getEls().filter(Boolean);
    return e.length ? gsap.to(e, { opacity: 0, y: -yOffset, duration: durationOut, ease: 'power4.in', stagger }) : Promise.resolve();
  };
  const inn = () => {
    const e = getEls().filter(Boolean);
    return e.length ? gsap.fromTo(e, { opacity: 0, y: yOffset }, { opacity: 1, y: 0, duration: durationIn, ease: 'power4.out', stagger }) : Promise.resolve();
  };
  return { animateIn: inn, animateOut: out };
}

export const chars = (text, cls) => [...(text || '')].map((c) => `<span class="${cls}">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');
