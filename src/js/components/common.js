// Shared UI pieces: primary button, marble background, branding lock-up,
// circular text cursor + mouse follower, chapter title marquee, chapter header.
import gsap from 'gsap';
import { icon } from '../icons.js';
import { scroll } from '../core/scroll.js';
import { get as storeGet } from '../core/store.js';
import { esc, nl2br, isTablet, charAnim, nextTick } from '../core/utils.js';

/* ------------------------------------------------------------------ Button */
export function buttonPrimary({ label, url, variant = 'transparent', gtm, team, tag }) {
  const inner = `<div class="btn-primary__inner"><div class="btn-primary__icon">${icon.ornament()}</div><span class="btn-primary__placeholder">${nl2br(label)}</span><span class="btn-primary__text">${nl2br(label)}</span><div class="btn-primary__icon">${icon.ornament()}</div></div>`;
  const attrs = `class="btn-primary btn-primary--${variant}"${gtm ? ` data-gtm="${gtm}"` : ''}${team ? ` team="${team}"` : ''}`;
  if (url && tag !== 'button') return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" ${attrs}>${inner}</a>`;
  return `<button type="button" ${attrs}>${inner}</button>`;
}

export function buttonSecondary({ label, url }) {
  return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="btn-secondary"><span>${esc(label)}</span></a>`;
}

/* ------------------------------------------------------------------ Marble */
export function bgMarble({ bgColor = 'dark-gray', parallax = true, fixed = false, style = '' } = {}) {
  return `<div class="bg-marble bg-marble--${bgColor}${parallax ? ' bg-marble--parallax' : ''}${fixed ? ' bg-marble--fixed' : ''}"${style ? ` style="${style}"` : ''} data-marble data-parallax="${parallax ? 1 : 0}" data-fixed="${fixed ? 1 : 0}"><picture class="bg-marble__media" aria-hidden="true"><img src="/images/marble.svg" alt=""></picture></div>`;
}

const MARBLE_RANGE = 100;
/**
 * BgMarble parallax. `progressRef` (optional) = { value } coming from a parent
 * section ("sectionScrollProgress" provide/inject in the original).
 */
export function initMarble(root, progressRef = null) {
  const img = root.querySelector('.bg-marble__media');
  const parallax = root.dataset.parallax === '1';
  const fixed = root.dataset.fixed === '1';
  let top = 0, height = 0, vh = 0, y = 0, paused = false;
  const apply = () => { img.style.transform = `translateY(${y}px)`; };
  const onScroll = ({ scroll: s } = { scroll: window.scrollY }) => {
    if (paused || storeGet('marble-parallax-paused', false)) return;
    if (progressRef && progressRef.value >= 0) {
      const v = (progressRef.value - 0.5) * MARBLE_RANGE * 2;
      if (v === y) return;
      y = v; apply(); return;
    }
    const n = top - s;
    const b = n + height;
    if (n <= 0 && b > vh) { if (y !== 0) { y = 0; apply(); } return; }
    let p = n > 0 ? (Math.min(1, Math.max(0, 1 - n / vh)) - 1) * MARBLE_RANGE : Math.min(1, Math.max(0, 1 - b / vh)) * MARBLE_RANGE;
    p = Math.min(MARBLE_RANGE, Math.max(-100, p));
    if (p !== y) { y = p; apply(); }
  };
  const api = { setPaused(v) { paused = v; } };
  if (fixed) {
    // Fixed marble inside horizontally-scrolled chapters: counter the track offset.
    requestAnimationFrame(() => {
      const panel = root.closest('.panel--normal');
      const chapter = root.closest('.chapter');
      const follow = () => {
        const a = parseFloat(panel?.style.getPropertyValue('--panel-offset-left') || '0');
        const b = parseFloat(chapter?.style.getPropertyValue('--track-x') || '0');
        root.style.left = -(a + b) + 'px';
      };
      follow();
      scroll.watch(follow);
      api.follow = follow;
    });
    if (parallax && !isTablet() && progressRef) scroll.watch(onScroll);
    return api;
  }
  if (!parallax || isTablet()) return api;
  const host = root.parentElement?.closest('section, [data-section]') ?? root;
  new IntersectionObserver((entries) => {
    const e = entries[0];
    top = e.boundingClientRect.top + window.scrollY;
    height = e.boundingClientRect.height;
    vh = window.innerHeight;
    if (e.isIntersecting) { onScroll(); scroll.watch(onScroll); } else scroll.unwatch(onScroll);
  }, { threshold: 0 }).observe(host);
  return api;
}

/* ---------------------------------------------------------------- Branding */
export function branding({ tagline, small = false, title }) {
  return `<div class="branding${small ? ' branding--small' : ''}">${title ? `<h1 class="sr-only">${esc(title)}</h1>` : ''}<div class="branding__logos"><span class="branding__logos__tfc-wrap">${icon.logoA('branding__logos__tfc')}</span><span class="branding__logos__st-wrap">${icon.logoB('branding__logos__st')}</span></div>${icon.wordmark('branding__capitolium')}<p class="branding__tagline">${esc(tagline)}</p><span class="branding__logos__nike-wrap">${icon.partner('branding__logos__nike')}</span></div>`;
}

export function initBranding(root, { small = false } = {}) {
  const a = root.querySelector('.branding__logos__tfc');
  const b = root.querySelector('.branding__logos__st');
  const p = root.querySelector('.branding__logos__nike');
  const word = root.querySelector('.branding__capitolium');
  const tag = root.querySelector('.branding__tagline');
  const tagText = tag?.textContent || '';
  const paths = () => (word ? [...word.querySelectorAll('path')] : []);
  function reset() {
    gsap.killTweensOf([a, b, p, ...paths()]);
    gsap.set(a, { y: '110%' });
    gsap.set(b, { y: '-110%' });
    gsap.set(p, { x: '110%' });
    gsap.set(paths(), { y: 40, opacity: 0 });
    tag && gsap.set(tag, { visibility: 'hidden' });
  }
  function play() {
    reset();
    const letters = [];
    if (tag) {
      tag.innerHTML = '';
      const words = tagText.split(' ');
      words.forEach((w, i) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.whiteSpace = 'nowrap';
        [...w].forEach((c) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.textContent = c; span.appendChild(s); letters.push(s); });
        tag.appendChild(span);
        if (i < words.length - 1) { const sp = document.createElement('span'); sp.style.display = 'inline'; sp.textContent = ' '; tag.appendChild(sp); }
      });
      gsap.set(tag, { visibility: 'visible' });
    }
    gsap.set(letters, { y: 10, opacity: 0 });
    const k = small ? 0.65 : 1;
    const tl = gsap.timeline({ delay: small ? 0.2 : 0 });
    tl.to(a, { y: '0%', duration: 0.8 * k, ease: 'power4.inOut' });
    tl.to(b, { y: '0%', duration: 0.8 * k, ease: 'power4.inOut' }, '<');
    paths().length && tl.fromTo(paths(), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 * k, ease: 'power4.out', stagger: 0.04 * k }, '<' + 0.2 * k);
    letters.length && tl.to(letters, { y: 0, opacity: 1, duration: 0.6 * k, ease: 'power4.out', stagger: 0.02 * k }, '<' + 0.3 * k);
    tl.to(p, { x: '0%', duration: 0.8 * k, ease: 'power4.inOut' }, '<-' + 0.2 * k);
    return tl;
  }
  return { play, reset };
}

/* ----------------------------------------------------------- Button cursor */
let uid = 0;
const iconFor = (name) => ({ IconClose: icon.close, iconPlay: icon.play, IconPlay: icon.play, IconCart: icon.cart, IconArrow: icon.arrow, IconPlus: icon.plus }[name] || icon.plus)();

function ringText(label, center, id, cls) {
  const arr = [...(label || '')];
  const span = 3 * (arr.length - 1);
  return arr.map((c, i) => `<text class="${cls}"><textPath href="#${id}-circle" startOffset="${center - span / 2 + 3 * i}%" text-anchor="middle">${esc(c)}</textPath></text>`).join('');
}

export function buttonCursor({ label1, label2, icon: ic, url, tag = 'div', blend = false, cls = '' }) {
  const id = `bc${++uid}`;
  const t = url ? 'a' : tag;
  const attrs = url ? ` href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc([label1, label2].filter(Boolean).join(' ') || 'Link')}"` : t === 'button' ? ' type="button"' : '';
  const svg = label1 || label2 ? `<svg class="btn-cursor__svg" viewBox="0 0 100 100"><defs><path id="${id}-circle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"/></defs><g class="btn-cursor__l1">${ringText(label1, 25, id, 'c1')}</g><g class="btn-cursor__l2">${ringText(label2, 75, id, 'c2')}</g></svg>` : '';
  return `<${t} class="btn-cursor${blend ? ' btn-cursor--blend' : ''} ${cls}" data-cid="${id}"${attrs}>${svg}<span class="btn-cursor__border"></span><div class="btn-cursor__icon">${iconFor(ic)}</div></${t}>`;
}

/** Behaviour for a .btn-cursor element: reveal + label swaps (char stagger). */
export function initButtonCursor(el, { reveal = true, revealDelay = 0.3 } = {}) {
  const g1 = () => [...el.querySelectorAll('text.c1')];
  const g2 = () => [...el.querySelectorAll('text.c2')];
  const a1 = charAnim({ getEls: g1, durationIn: 0.3, durationOut: 0.3 });
  const a2 = charAnim({ getEls: g2, durationIn: 0.3, durationOut: 0.3 });
  let timer = null;
  let labels = [null, null];
  const id = el.dataset.cid;
  const api = {
    setReveal(v) {
      if (v) { timer = setTimeout(async () => { await nextTick(); a1.animateIn(); a2.animateIn(); }, 1000 * revealDelay); }
      else { if (timer) { clearTimeout(timer); timer = null; } a1.animateOut(); a2.animateOut(); }
    },
    async setLabels(l1, l2, ic) {
      const ch1 = l1 !== labels[0], ch2 = l2 !== labels[1];
      if (!ch1 && !ch2) { if (ic !== undefined) el.querySelector('.btn-cursor__icon').innerHTML = iconFor(ic); return; }
      await Promise.all([ch1 ? a1.animateOut() : null, ch2 ? a2.animateOut() : null]);
      if (ch1) el.querySelector('.btn-cursor__l1').innerHTML = ringText(l1, 25, id, 'c1');
      if (ch2) el.querySelector('.btn-cursor__l2').innerHTML = ringText(l2, 75, id, 'c2');
      if (ic !== undefined) el.querySelector('.btn-cursor__icon').innerHTML = iconFor(ic);
      labels = [l1, l2];
      await nextTick();
      if (ch1) a1.animateIn();
      if (ch2) a2.animateIn();
    },
  };
  const svg = el.querySelector('.btn-cursor__svg');
  labels = [null, null];
  // remember initial labels
  labels[0] = g1().map((t) => t.textContent).join('') || null;
  labels[1] = g2().map((t) => t.textContent).join('') || null;
  if (!reveal) { gsap.set([...g1(), ...g2()], { opacity: 0, y: -6 }); }
  api.svg = svg;
  return api;
}

/* ---------------------------------------------------------- Mouse follower */
export function mouseFollower({ content, label1, label2, icon: ic, url, reveal = true, blend = false, centered = false, gtm, cls = '' }) {
  return `<div class="mouse-follower${reveal === false ? ' mouse-follower--hidden' : ''}${centered ? ' mouse-follower--centered' : ''} ${cls}"${gtm ? ` data-gtm="${gtm}"` : ''}>${content}${buttonCursor({ label1, label2, icon: ic, url, blend, cls: 'mouse-follower__cursor' })}</div>`;
}

const EASE = 0.08;
/**
 * Elastic cursor that follows the pointer inside its container (±20px),
 * rotating its circular label. Port of MouseFollower.vue.
 */
export function initMouseFollower(root, { onClick, reveal = true, revealDelay, centered = false } = {}) {
  const cursorEl = root.querySelector('.mouse-follower__cursor');
  const btn = initButtonCursor(cursorEl, { reveal, revealDelay });
  let x = 0, y = 0, tx = 0, ty = 0, rot = 0, k = EASE, raf = 0, running = false, half = 0;
  let inside = false, moving = false, overModal = false, frozen = false, modalHeight;
  let revealed = reveal;
  let stopTimer = null;
  const render = () => {
    if (isTablet()) {
      cursorEl.style.transform = frozen && modalHeight ? `translateY(${-modalHeight}px)` : '';
    } else {
      cursorEl.style.transform = centered ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` : `translate(${x}px, ${y}px)`;
    }
    if (btn.svg) btn.svg.style.transform = `rotate(${rot}deg)`;
    cursorEl.classList.toggle('btn-cursor--moving', inside && (frozen ? !overModal : moving));
  };
  const tick = () => {
    x += (tx - x) * k;
    y += (ty - y) * k;
    if (half) rot = (x / half) * 90;
    render();
    if (!inside && Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) running = false;
    else raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
  const modalOffset = () => (modalHeight !== undefined ? -modalHeight : 0);
  root.addEventListener('mousemove', (e) => {
    if (frozen) return;
    overModal = false;
    const r = root.getBoundingClientRect();
    half = root.offsetWidth / 2;
    const sx = r.width / root.offsetWidth, sy = r.height / root.offsetHeight;
    const nx = (e.clientX - r.left) / sx / root.offsetWidth - 0.5;
    const ny = (e.clientY - r.top) / sy / root.offsetHeight - 0.5;
    tx = Math.max(-20, Math.min(20, 40 * nx));
    ty = Math.max(-20, Math.min(20, 40 * ny));
    k = EASE; inside = true; moving = true; kick();
    clearTimeout(stopTimer);
    stopTimer = setTimeout(() => { moving = false; render(); }, 500);
  });
  root.addEventListener('mouseleave', () => {
    if (!frozen) { k = EASE; tx = 0; ty = 0; }
    moving = false; inside = false; overModal = false; kick(); render();
  });
  root.addEventListener('mouseenter', (e) => { if (!e.relatedTarget?.closest?.('.player-modal')) inside = true; });
  root.addEventListener('mouseover', (e) => { overModal = !!e.target.closest('.player-modal'); render(); });
  root.addEventListener('click', (e) => { if (!revealed) return; if (e.target.closest('.player-modal')) return; onClick?.(e); });
  render();
  return {
    btn,
    setFrozen(v) { frozen = v; k = 0.2; if (v) { tx = 0; ty = modalOffset(); moving = false; } else { tx = 0; ty = 0; } kick(); render(); },
    setModalHeight(h) { modalHeight = h; if (frozen) { ty = modalOffset(); kick(); } render(); },
    setReveal(v) { revealed = v; root.classList.toggle('mouse-follower--hidden', !v); btn.setReveal(v); },
  };
}

/* ----------------------------------------------------------- Chapter title */
export function chapterTitle(title) {
  const chars = [...title].map((c) => `<span class="chapter-title__char${c === ' ' ? ' chapter-title__char--space' : ''}">${c === ' ' ? ' ' : esc(c)}</span>`).join('');
  const copy = `<span class="chapter-title__copy">${chars}<span class="chapter-title__sep">·</span></span>`;
  return `<div class="chapter-title" aria-hidden="true"><div class="chapter-title__track">${copy}${copy}</div></div>`;
}

/** Big script marquee: letters rise in, then horizontal scroll. Port of ChapterTitle.vue */
export function initChapterTitle(root, title, scrollSpeed = 1) {
  const track = root.querySelector('.chapter-title__track');
  const len = [...title].length;
  const speed = scrollSpeed !== 1 ? scrollSpeed : Math.max(2, 2 + 0.08 * len);
  let copyW = 0, vw = window.innerWidth, chars = null;
  const measure = () => { copyW = root.querySelector('.chapter-title__copy')?.offsetWidth ?? 0; };
  const ease = (t) => 1 - Math.pow(1 - t, 5);
  requestAnimationFrame(() => { measure(); vw = window.innerWidth; chars = null; });
  window.addEventListener('resize', () => { vw = window.innerWidth; measure(); chars = null; }, { passive: true });
  return {
    reveal(t) {
      if (!chars) chars = [...track.querySelectorAll('.chapter-title__char, .chapter-title__sep')];
      const n = len + 1;
      for (let i = 0; i < chars.length; i++) {
        const delay = n > 1 ? ((i % n) / (n - 1)) * 0.4 : 0;
        const v = ease(Math.min(1, Math.max(0, (t - delay) / 1.5)));
        chars[i].style.transform = `translateY(${100 * (1 - v)}%)`;
      }
      if (!copyW) measure();
      const from = vw / 4, to = -0.02 * copyW, e = ease(t);
      track.style.transform = `translateX(${from + e * (to - from)}px)`;
    },
    setScrollX(t) {
      if (!copyW) measure();
      track.style.transform = `translateX(${-(0.02 * copyW + t * copyW * speed)}px)`;
    },
  };
}

/* ---------------------------------------------------------- Chapter header */
export function chapterHeader(chapter, variant) {
  const onArch = variant === 'on-arch';
  const light = chapter.bgColor === 'light-gold';
  const vars = onArch
    ? '--color-bg:var(--color-dark-gray);--color-logo:var(--color-light-gold);--color:var(--color-light-gold);'
    : `--color-bg:${light ? 'var(--color-light-gold)' : 'var(--color-dark-gray)'};--color-logo:${light ? 'var(--color-dark-gold)' : 'var(--color-light-gold)'};--color:${light ? 'var(--color-dark-gray)' : 'var(--color-dark-gold)'};`;
  const tag = onArch ? 'span' : 'h2';
  return `<div class="chapter-header${onArch ? ' chapter-header--on-arch' : ''}" style="${vars}"${onArch ? ' aria-hidden="true"' : ''}><span class="chapter-header__line"></span><div class="chapter-header__top"><span>${esc(chapter.title)}</span>${icon.wordmark()}<span>${esc(chapter.title)}</span></div><div class="chapter-header__bottom">${icon.ornament()}<${tag} class="chapter-header__bottom__tag">${esc(chapter.label)}</${tag}>${icon.ornament()}</div></div>`;
}

/* ------------------------------------------------------------- Media tags */
export function img({ src, alt = '', width, height, cls = '', loading = 'eager' }) {
  return `<img src="${esc(src)}" alt="${esc(alt || '')}"${width ? ` width="${width}"` : ''}${height ? ` height="${height}"` : ''} loading="${loading}" decoding="async" class="${cls}">`;
}
export function picture({ src, alt = '', width, height, cls = '' }) {
  return `<picture${cls ? ` class="${cls}"` : ''}>${img({ src, alt, width, height })}</picture>`;
}
/** <video> with optional src; when no src is set, a poster placeholder is shown. */
export function video({ src, mobileSrc, poster, cls = '', autoplay = false, loop = false, preload = 'auto', attrs = '' }) {
  const s = isTablet() && mobileSrc ? mobileSrc : src;
  return `<video class="${cls}"${autoplay ? ' autoplay' : ''}${loop ? ' loop' : ''} muted playsinline preload="${preload}"${poster ? ` poster="${esc(poster)}"` : ''} ${attrs}>${s ? `<source src="${esc(s)}" type="video/${s.endsWith('.webm') ? 'webm' : 'mp4'}">` : ''}</video>`;
}
