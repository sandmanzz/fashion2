// App shell: loader, scroll thumb, top navigation, mobile-landscape guard.
import gsap from 'gsap';
import { scroll } from '../core/scroll.js';
import { get, set, on } from '../core/store.js';
import { allSections, activeAmong, onSectionsChange } from '../core/sections.js';
import { icon } from '../icons.js';
import { bgMarble, buttonPrimary } from './common.js';
import { esc } from '../core/utils.js';

/* ------------------------------------------------------------------ Loader */
let required = 1, ready = 0, timerDone = false, resolveReady = null;
const readyPromise = new Promise((r) => (resolveReady = r));
const check = () => { if (ready >= required && timerDone && resolveReady) { resolveReady(); resolveReady = null; } };
export const loading = {
  isLoaded: false,
  listeners: [],
  requireVideos(n) { required = n; },
  onVideoReady() { ready++; check(); },
  onLoaded(fn) { this.isLoaded ? fn() : this.listeners.push(fn); },
};

export function loaderHTML() {
  return `<div class="loader"><div class="loader__bar"><div class="loader__bar__fill"></div></div></div>`;
}

export function initLoader(el) {
  scroll.stop();
  const hash = !!location.hash;
  setTimeout(() => { timerDone = true; check(); }, hash ? 300 : 1200);
  setTimeout(() => { ready = required; timerDone = true; check(); }, 3000);
  const fill = el.querySelector('.loader__bar__fill');
  gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: hash ? 0.3 : 1.2, ease: 'power1.inOut', transformOrigin: 'left center', onComplete: () => loading.onVideoReady() });
  (async () => {
    await readyPromise;
    const id = location.hash.slice(1);
    if (id) {
      const target = document.getElementById(decodeURIComponent(id));
      if (target) scroll.scrollTo(target, { immediate: true, force: true });
    } else window.scrollTo(0, 0);
    await gsap.to(fill, { opacity: 0, duration: 0.3, ease: 'power2.in' });
    await gsap.to(el, { opacity: 0, duration: 0.6, ease: 'power2.inOut' });
    el.remove();
    if (id) scroll.start();
    loading.isLoaded = true;
    loading.listeners.forEach((fn) => fn());
  })();
}

/* ------------------------------------------------------------ Scroll thumb */
export function initScrollThumb(el) {
  let max = 0;
  const measure = () => { max = window.innerHeight - el.offsetHeight; };
  measure();
  window.addEventListener('resize', measure, { passive: true });
  scroll.watch(({ progress }) => gsap.to(el, { y: progress * max, duration: 0.6, ease: 'power3.out', overwrite: true }));
}

/* -------------------------------------------------------------- Navigation */
export function navHTML(content) {
  const ctas = (content.navigation?.ctas || []).map((c, i) => buttonPrimary({ label: c.label, url: c.url, variant: 'cta-gray', team: i === 0 ? 'tfc' : 'st' })).join('');
  return `<div class="nav__trigger" style="display:none"></div>
<nav class="nav nav--hidden">
  <div class="nav__overlay"></div>
  <div class="nav__header"><div class="nav__header__inner">
    <a href="/" class="nav__header__logo" aria-label="Home">${icon.logoA()}</a>
    <button class="nav__header__toggle" aria-label="Open menu" aria-expanded="false">${icon.burger()}</button>
    <a href="/" class="nav__header__logo" aria-label="Home">${icon.logoB()}</a>
  </div></div>
  <nav class="nav__inner">${bgMarble({ bgColor: 'light-gold', parallax: false })}
    <div class="nav__inner__list"><div class="nav__follower">${icon.ornament()}${icon.ornament()}</div><ul></ul></div>
    <div class="nav__inner__ctas">${ctas}</div>
  </nav>
</nav>`;
}

/** labels: section labels shown in the menu (displayInNavigation). */
export function initNav(root, labels, { onHome, external = false } = {}) {
  const slugify = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const nav = root.querySelector('nav.nav');
  const trigger = root.querySelector('.nav__trigger');
  const toggle = nav.querySelector('.nav__header__toggle');
  const ul = nav.querySelector('.nav__inner__list ul');
  const follower = nav.querySelector('.nav__follower');
  const ctas = nav.querySelector('.nav__inner__ctas');
  ul.innerHTML = labels.map((l) => `<li class="nav__item"><button aria-label="${esc(l)}">${esc(l)}</button></li>`).join('');
  const buttons = [...ul.querySelectorAll('button')];
  let open = false, hiddenByScroll = false, hovering = 0, dir = 0, forced = null, lastTop = null;

  const heroOpen = () => get('hero-text-open', false);
  const refresh = () => {
    const hidden = !heroOpen() || (hiddenByScroll && !open);
    nav.className = `nav ${open ? 'nav--open' : ''} ${hidden ? 'nav--hidden' : ''}`;
    trigger.style.display = heroOpen() ? '' : 'none';
    toggle.innerHTML = icon.burger(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  const moveFollower = (i) => {
    const b = buttons[i];
    if (!b) return;
    const top = b.offsetTop;
    const svgs = follower.querySelectorAll('svg');
    if (svgs.length >= 2 && lastTop !== null && top !== lastTop) {
      const down = top > lastTop;
      const snap = (e) => gsap.set(e, { rotation: 180 * Math.round(gsap.getProperty(e, 'rotation') / 180) });
      gsap.to(svgs[0], { rotation: down ? '+=180' : '-=180', duration: 0.4, ease: 'power2.out', onComplete: () => snap(svgs[0]) });
      gsap.to(svgs[1], { rotation: down ? '-=180' : '+=180', duration: 0.4, ease: 'power2.out', onComplete: () => snap(svgs[1]) });
    }
    lastTop = top;
    follower.style.opacity = '1';
    follower.style.transform = `translate(-50%, ${top}px)`;
    follower.style.height = `${b.offsetHeight}px`;
  };
  const current = () => forced ?? activeAmong(labels)?.label ?? null;
  const syncActive = () => {
    const a = activeAmong(labels);
    if (forced && a && a.progress >= 0.1) forced = null;
    const c = current();
    buttons.forEach((b, i) => b.classList.toggle('active', labels[i] === c));
    const idx = labels.indexOf(c);
    if (idx < 0) follower.style.opacity = '0'; else moveFollower(idx);
  };
  onSectionsChange(syncActive);

  const animItems = () => [...buttons, ...(ctas ? [...ctas.children] : [])];
  gsap.set(animItems(), { opacity: 0, y: 12 });
  const setOpen = (v) => {
    if (v === open) return;
    open = v;
    set('nav-open', v);
    v ? scroll.stop() : scroll.start();
    const items = animItems();
    gsap.killTweensOf(items);
    v ? gsap.fromTo(items, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06, overwrite: true })
      : gsap.to(items, { opacity: 0, y: 15, duration: 0.3, ease: 'power2.in', stagger: 0.03, overwrite: true });
    refresh();
  };
  on('nav-open', (v) => { if (v !== open) setOpen(v); });
  toggle.addEventListener('click', () => setOpen(!open));
  nav.querySelector('.nav__overlay').addEventListener('click', () => setOpen(false));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  ul.addEventListener('mouseleave', syncActive);
  buttons.forEach((b, i) => {
    b.addEventListener('mouseenter', () => moveFollower(i));
    b.addEventListener('click', () => {
      if (external) { location.href = '/#' + slugify(labels[i]); return; }
      forced = labels[i];
      moveFollower(i);
      setOpen(false);
      gsap.to('main', { opacity: 0, duration: 0.4, ease: 'ease', onComplete: () => {
        const s = allSections().find((x) => x.label === labels[i]);
        if (s) scroll.scrollTo(s.el, { immediate: true });
        gsap.to('main', { opacity: 1, duration: 0.4, ease: 'ease' });
      } });
    });
  });
  nav.querySelectorAll('.nav__header__logo').forEach((a) => a.addEventListener('click', (e) => {
    if (external) return;
    e.preventDefault();
    setOpen(false);
    gsap.to('main', { opacity: 0, duration: 0.4, ease: 'ease', onComplete: () => {
      scroll.scrollTo(0, { immediate: true });
      onHome?.();
      gsap.to('main', { opacity: 1, duration: 0.4, ease: 'ease' });
    } });
  }));
  const enter = () => { hovering++; if (dir === 1) { hiddenByScroll = false; refresh(); } };
  const leave = () => { hovering--; if (hovering <= 0) { hovering = 0; if (dir === 1) { hiddenByScroll = true; refresh(); } } };
  [trigger, nav.querySelector('.nav__header')].forEach((n) => { n.addEventListener('mouseenter', enter); n.addEventListener('mouseleave', leave); });
  scroll.watch(({ direction, scroll: y }) => {
    if (hovering > 0 || open) return;
    if (direction !== 0) dir = direction;
    const prev = hiddenByScroll;
    if (direction === 1 && y > 100) hiddenByScroll = true;
    else if (direction === -1) hiddenByScroll = false;
    if (prev !== hiddenByScroll) refresh();
  });
  on('hero-text-open', refresh);
  refresh();
}

/* ------------------------------------------------------- Mobile landscape */
export function initMobileLandscape(root) {
  let shown = false, saved = 0;
  const check = () => {
    if (get('video-modal-open', false)) return;
    const touch = navigator.maxTouchPoints > 0 || matchMedia('(pointer: coarse)').matches;
    const v = touch && matchMedia('(max-width: 1024px)').matches && matchMedia('(orientation: landscape)').matches;
    if (v === shown) return;
    shown = v;
    root.innerHTML = v ? `<div class="mobile-landscape"><span class="mobile-landscape__text">Please rotate<br>your phone</span>${icon.rotate()}</div>` : '';
    if (!get('hero-entered', false)) return;
    if (v) { saved = window.scrollY; scroll.scrollTo(0, { immediate: true }); scroll.stop(); }
    else setTimeout(() => { window.scrollTo({ top: saved, behavior: 'instant' }); scroll.start(); requestAnimationFrame(() => scroll.scrollTo(saved, { immediate: true })); }, 350);
  };
  check();
  window.addEventListener('resize', check);
  window.addEventListener('orientationchange', check);
}
