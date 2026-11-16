// Remaining page blocks: film, collection, event/tickets, press wall, shops, footer
// (+ the generic Modal and the fullscreen video player).
import gsap from 'gsap';
import Lenis from 'lenis';
import { scroll } from '../core/scroll.js';
import { observe } from '../core/sections.js';
import { set } from '../core/store.js';
import { range, isTablet, esc, nl2br, zoomed, transition } from '../core/utils.js';
import { icon } from '../icons.js';
import {
  bgMarble, initMarble, buttonPrimary, buttonSecondary, mouseFollower, initMouseFollower,
  buttonCursor, initButtonCursor, chapterTitle, initChapterTitle, picture, img, video,
} from './common.js';
import { buttonCircular } from './story.js';
import { t, LANG } from '../i18n.js';
import { ondoMark } from '../svg-logo.js';

/* ================================================================ Modal */
export function createModal({ align = 'right' } = {}) {
  const el = document.createElement('div');
  el.className = `modal-overlay modal-overlay--${align}`;
  el.style.display = 'none';
  el.innerHTML = `<button class="modal__close modal__close--${align}" aria-label="Close">${icon.close()}</button><div class="modal"><div class="modal__inner"><div class="modal__content"></div></div></div>`;
  document.body.appendChild(el);
  const inner = el.querySelector('.modal__inner');
  const content = el.querySelector('.modal__content');
  let lenis = null, tick = null, isOpen = false;
  const close = () => api.open(false);
  el.addEventListener('click', close);
  el.querySelector('.modal__close').addEventListener('click', (e) => { e.stopPropagation(); close(); });
  inner.addEventListener('click', (e) => e.stopPropagation());
  const onKey = (e) => e.key === 'Escape' && close();
  const api = {
    content,
    open(v, html) {
      if (html !== undefined) content.innerHTML = html;
      if (v === isOpen) return;
      isOpen = v;
      if (v) {
        scroll.stop();
        document.body.classList.add('modal-open');
        window.addEventListener('keydown', onKey);
        transition(el, 'modal', true);
        requestAnimationFrame(() => {
          lenis = new Lenis({ wrapper: inner, content, duration: 1.2, easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)), orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, touchMultiplier: 2, infinite: false });
          lenis.start();
          tick = (t) => lenis?.raf(1000 * t);
          gsap.ticker.add(tick);
        });
      } else {
        scroll.start();
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', onKey);
        lenis?.destroy(); lenis = null;
        tick && gsap.ticker.remove(tick); tick = null;
        transition(el, 'modal', false);
      }
    },
  };
  return api;
}

/* ============================================================ Video modal */
const svgPath = (d) => `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${d}"/></svg>`;
const P = {
  pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z', play: 'M8 5v14l11-7z',
  muted: 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
  sound: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
  full: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
};
export function createVideoModal({ src, mobileSrc, poster }) {
  const el = document.createElement('div');
  el.className = 'modal-video-overlay modal-video-overlay--hidden';
  el.style.cssText = 'opacity:0;pointer-events:none;';
  const s = isTablet() && mobileSrc ? mobileSrc : src;
  el.innerHTML = `<video class="modal-video__video" style="pointer-events:none;" preload="auto" playsinline muted${poster ? ` poster="${esc(poster)}"` : ''}>${s ? `<source src="${esc(s)}" type="video/mp4">` : ''}</video>
  <div class="modal-video__player" style="display:none">
    <button class="modal-video__close" aria-label="Close">${icon.close()}</button>
    <div class="modal-video__tap-zone"></div>
    <div class="modal-video__controls">
      <button class="modal-video__toggle" aria-label="Play">${svgPath(P.play)}</button>
      <span class="modal-video__time">0:00 / 0:00</span>
      <div class="modal-video__progress"><div class="modal-video__progress__track"><div class="modal-video__progress__fill" style="width:0%"></div></div></div>
      <button class="modal-video__btn modal-video__mute" aria-label="Sound">${svgPath(P.sound)}</button>
      <button class="modal-video__btn modal-video__full" aria-label="Fullscreen">${svgPath(P.full)}</button>
    </div>
  </div>`;
  document.body.prepend(el);
  const v = el.querySelector('video');
  const player = el.querySelector('.modal-video__player');
  const controls = el.querySelector('.modal-video__controls');
  const toggleBtn = el.querySelector('.modal-video__toggle');
  const muteBtn = el.querySelector('.modal-video__mute');
  const time = el.querySelector('.modal-video__time');
  const progress = el.querySelector('.modal-video__progress');
  const fill = el.querySelector('.modal-video__progress__fill');
  let open = false, playing = false, saved = 0, hideT = null;
  const fmt = (t) => (!t || isNaN(t) ? '0:00' : `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`);
  const ui = () => {
    toggleBtn.innerHTML = svgPath(playing ? P.pause : P.play);
    muteBtn.innerHTML = svgPath(v.muted ? P.muted : P.sound);
    time.textContent = `${fmt(v.currentTime)} / ${fmt(v.duration)}`;
    fill.style.width = `${v.duration ? (v.currentTime / v.duration) * 100 : 0}%`;
  };
  const wake = () => { controls.classList.remove('modal-video__controls--hidden'); clearTimeout(hideT); hideT = setTimeout(() => controls.classList.add('modal-video__controls--hidden'), 3000); };
  const toggle = () => { if (playing) { v.pause(); playing = false; } else { v.play().catch(() => {}); playing = true; } ui(); };
  const seek = (x) => { const r = progress.getBoundingClientRect(); if (!v.duration) return; v.currentTime = Math.min(1, Math.max(0, (x - r.left) / r.width)) * v.duration; ui(); };
  v.addEventListener('timeupdate', ui); v.addEventListener('loadedmetadata', ui); v.addEventListener('ended', () => { playing = false; ui(); });
  el.addEventListener('click', (e) => e.target === el && api.close());
  el.addEventListener('mousemove', wake);
  el.querySelector('.modal-video__close').addEventListener('click', () => api.close());
  el.querySelector('.modal-video__tap-zone').addEventListener('click', toggle);
  toggleBtn.addEventListener('click', toggle);
  muteBtn.addEventListener('click', () => { v.muted = !v.muted; ui(); });
  el.querySelector('.modal-video__full').addEventListener('click', async () => { saved = window.scrollY; if (document.fullscreenElement) document.exitFullscreen?.(); else { try { await el.requestFullscreen?.(); } catch {} } });
  progress.addEventListener('mousedown', (e) => { seek(e.clientX); const mv = (ev) => seek(ev.clientX); const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); }; window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up); });
  progress.addEventListener('touchmove', (e) => { e.preventDefault(); seek(e.touches[0].clientX); }, { passive: false });
  const onKey = (e) => { if (e.key === 'Escape') api.close(); if (e.key === ' ') { e.preventDefault(); toggle(); } if (e.key === 'm') { v.muted = !v.muted; ui(); } };
  const api = {
    openModal() {
      if (open) return;
      open = true; saved = window.scrollY;
      set('video-modal-open', true);
      scroll.stop();
      window.addEventListener('keydown', onKey);
      el.classList.remove('modal-video-overlay--hidden'); el.style.cssText = ''; v.style.pointerEvents = '';
      transition(player, 'modal-video-ui', true);
      wake();
      v.currentTime = 0; v.muted = true;
      v.play().then(() => { playing = true; v.muted = false; ui(); }).catch(() => ui());
    },
    close() {
      if (!open) return;
      open = false; v.pause(); v.currentTime = 0; playing = false;
      set('video-modal-open', false);
      document.fullscreenElement && document.exitFullscreen?.();
      el.classList.add('modal-video-overlay--hidden'); el.style.cssText = 'opacity:0;pointer-events:none;'; v.style.pointerEvents = 'none';
      transition(player, 'modal-video-ui', false);
      window.scrollTo({ top: saved, behavior: 'instant' });
      scroll.start();
      requestAnimationFrame(() => scroll.scrollTo(saved, { immediate: true, force: true }));
      window.removeEventListener('keydown', onKey);
    },
  };
  return api;
}

/* ================================================================ Film */
export function filmHTML(d) {
  const media = video({ src: d.teaser || d.video, mobileSrc: d.videoMobile, poster: d.poster, cls: 'block-video__video__media', autoplay: true, loop: !!d.teaser, preload: 'metadata' });
  const inner = isTablet()
    ? `${media}<div class="block-video__video__overlay"></div><div class="block-video__video__cursor" style="opacity: 0">${buttonCursor({ label1: d.cursorLabel1, label2: d.cursorLabel2, icon: 'iconPlay', tag: 'button' })}</div>`
    : mouseFollower({ content: `${media}<div class="block-video__video__overlay"></div>`, label1: d.cursorLabel1, label2: d.cursorLabel2, icon: 'iconPlay', reveal: false, centered: true, gtm: 'play-video' });
  return `<section class="block-video"><div class="block-video__anims"><div class="block-video__sticky"><div class="block-video__video">${inner}</div></div></div></section>`;
}

export function initFilm(root, d) {
  const sec = observe(root, d.label);
  const anims = root.querySelector('.block-video__anims');
  const box = root.querySelector('.block-video__video');
  const media = root.querySelector('.block-video__video__media');
  const overlay = root.querySelector('.block-video__video__overlay');
  const modal = createVideoModal({ src: d.video, mobileSrc: d.videoMobile, poster: d.poster });
  let ready = false, modalOpen = false;
  const openModal = () => modal.openModal();
  let follower = null, cursorBtn = null;
  if (isTablet()) {
    const c = root.querySelector('.block-video__video__cursor');
    cursorBtn = initButtonCursor(c.querySelector('.btn-cursor'), { reveal: false });
    c.querySelector('.btn-cursor').addEventListener('click', openModal);
  } else follower = initMouseFollower(root.querySelector('.mouse-follower'), { reveal: false, centered: true, onClick: openModal });
  const setReady = (v) => {
    if (v === ready) return;
    ready = v;
    if (follower) follower.setReveal(v);
    if (cursorBtn) { cursorBtn.setReveal(v); root.querySelector('.block-video__video__cursor').style.opacity = v ? '1' : '0'; }
  };
  media.addEventListener('timeupdate', () => { if (!modalOpen && !d.teaser && media.currentTime >= 10) media.currentTime = 0; });
  let vh = window.innerHeight, vw = window.innerWidth;
  const grow = () => {
    const o = range(sec.progress, 0.25, 0.5);
    setReady(o >= 1);
    gsap.set(box, { scale: 0.44 + 0.56 * o });
    gsap.set(media, { scale: 2 - o });
    gsap.set(overlay, { opacity: 0.48 * o });
  };
  const fall = () => { if (!isTablet()) gsap.set(anims, { y: range(sec.progress, 0.75, 1) * vh * 0.75 }); };
  gsap.set(overlay, { opacity: 0 });
  grow(); fall();
  scroll.watch(() => { if (sec.active) { grow(); fall(); } });
  window.addEventListener('resize', () => { if (window.innerWidth === vw) return; vw = window.innerWidth; vh = window.innerHeight; if (isTablet()) gsap.set(anims, { y: 0 }); grow(); fall(); }, { passive: true });
}

/* ============================================================ Collection */
export function collectionHTML(d) {
  const gallery = d.gallery.map((g, i) => `<div class="block-collection__gallery__item--${i % 2 === 0 ? 'left' : 'right'} block-collection__gallery__item">${picture({ src: g.src, alt: g.alt })}</div>`).join('');
  const ctas = `<div class="block-collection__ctas">${buttonPrimary({ label: d.ctaShopTFC.label, url: d.ctaShopTFC.url, variant: 'cta-gray', team: 'tfc' })}${buttonPrimary({ label: d.ctaShopST.label, url: d.ctaShopST.url, variant: 'cta-gray', team: 'st' })}</div>`;
  const phase2 = `<div class="block-collection__phase2"><div class="block-collection__logo"><div class="block-collection__logo__svg">${icon.emblem()}</div></div><div class="block-collection__gallery">${gallery}</div>${ctas}</div>`;
  if (isTablet()) {
    const item = (cta, image, text) => `<div class="block-collection__mobile__images__item">${mouseFollower({ content: picture({ src: image.src, alt: image.alt }), label1: cta.label1, label2: cta.label2, icon: 'IconPlus', url: cta.url, gtm: 'acheter-maillot-collection' })}<p>${nl2br(text)}</p></div>`;
    return `<section class="block-collection">${bgMarble({ bgColor: 'light-gold' })}<div>
      <div class="block-collection__mobile__wrapper"><div class="block-collection__mobile__sticky"><div class="block-collection__mobile__sticky__inner">
        <div class="block-collection__lines block-collection__lines--top"></div>
        <div class="block-collection__mobile__title"><h2>${esc(d.title1)}</h2></div>
        <div class="block-collection__mobile__image">${picture({ src: (d.imageMobile || d.image1).src, alt: (d.imageMobile || d.image1).alt })}</div>
        <div class="block-collection__mobile__title block-collection__mobile__title--bottom"><h2>${esc(d.title2)}</h2></div>
        <div class="block-collection__lines block-collection__lines--bottom"></div>
      </div></div></div>
      <div class="block-collection__mobile__images">${item(d.cta1, d.image1, d.text1)}${item(d.cta2, d.image2, d.text2)}</div>
    </div>${phase2}</section>`;
  }
  const imgItem = (cta, image, side) => mouseFollower({ content: picture({ src: image.src, alt: image.alt }), label1: cta.label1, label2: cta.label2, icon: 'IconPlus', reveal: false, blend: true, gtm: 'acheter-maillot-collection', cls: `block-collection__images__item block-collection__images__item--${side}` });
  return `<section class="block-collection">${bgMarble({ bgColor: 'light-gold' })}<div>
    <div class="block-collection__phase1">
      <div class="block-collection__sticky"><div class="block-collection__sticky__inner">
        <div class="block-collection__lines block-collection__lines--top"></div>
        <div class="block-collection__title"><h2>${esc(d.title1)}</h2></div>
        <div class="block-collection__images">${imgItem(d.cta1, d.image1, 'left')}${imgItem(d.cta2, d.image2, 'right')}</div>
        <div class="block-collection__title block-collection__title--bottom"><h2>${esc(d.title2)}</h2></div>
        <div class="block-collection__lines block-collection__lines--bottom"></div>
      </div></div>
    </div>
    <div class="block-collection__captions"><p class="block-collection__captions__text">${nl2br(d.text1)}</p><p class="block-collection__captions__text">${nl2br(d.text2)}</p></div>
  </div>${phase2}</section>`;
}

export function initCollection(root, d) {
  const sec = observe(root, d.label);
  initMarble(root.querySelector(':scope > .bg-marble'));
  const imagesWrap = root.querySelector('.block-collection__images');
  const mobileMedia = root.querySelector('.block-collection__mobile__image');
  const logo = root.querySelector('.block-collection__logo');
  const rotating = root.querySelector('.logo-palladia__rotating');
  const items = [...root.querySelectorAll('.block-collection__gallery__item')];
  const offsets = [];
  const followers = [];
  root.querySelectorAll('.block-collection__images .mouse-follower').forEach((m, i) => {
    const cta = i === 0 ? d.cta1 : d.cta2;
    const f = initMouseFollower(m, { reveal: false, onClick: () => (cta.url.startsWith('/') ? (location.href = cta.url) : window.open(cta.url, '_blank')) });
    f.setFrozen(true);
    followers.push(f);
  });
  root.querySelectorAll('.block-collection__mobile__images .mouse-follower').forEach((m) => initMouseFollower(m, { reveal: true }));
  let G = { s: 0, e: 1 }, vh = 0, vw = 0, logoH = 0, revealed = false;
  const centers = [];
  const measureGrow = () => { vh = window.innerHeight; vw = window.innerWidth; const h = root.offsetHeight; G = { s: vh / (vh + h), e: (2 * vh) / (vh + h) }; };
  const measureItems = () => {
    const y = window.scrollY;
    logoH = logo?.offsetHeight ?? 0;
    items.forEach((el, i) => { const t = el.style.transform; el.style.transform = 'none'; const r = el.getBoundingClientRect(); el.style.transform = t; centers[i] = r.top + el.offsetHeight / 2 + y; });
  };
  const grow = (el, props, pic, t) => { gsap.set(el, { ...props }); if (pic) gsap.set(pic, { scale: 2 - t }); };
  function update({ scroll: y }) {
    if (!sec.active) return;
    const t = range(sec.progress, G.s, G.e);
    if (!isTablet() && imagesWrap) {
      grow(imagesWrap, { height: t * vh }, null, t);
      [...imagesWrap.children].forEach((c) => grow(c, { width: 50 * t + '%' }, c.querySelector('picture'), t));
      const r = t >= 1;
      if (r !== revealed) { revealed = r; followers.forEach((f) => { f.setReveal(r); f.setFrozen(!r); }); }
    }
    if (isTablet() && mobileMedia) grow(mobileMedia, { height: (66 * t) / (283 / 404) + 'vw', width: 66 * t + 'vw' }, mobileMedia.querySelector('picture'), t);
    const off = logoH + (isTablet() ? 50 : 0.25 * vh), dist = isTablet() ? 80 : 120;
    items.forEach((el, i) => {
      const n = Math.min(1, Math.max(0, -((centers[i] ?? 0) - y - off) / dist));
      const x = isTablet() ? n * (i % 2 === 0 ? -68 : 68) : (n * (offsets[i] ?? 0) * vw) / 100;
      gsap.to(el, { x, duration: 0.6, ease: 'power3.out', overwrite: true });
    });
    if (rotating && items.length) {
      const a = centers[0] ?? 0, b = centers[items.length - 1] ?? 0;
      const s = Math.min(Math.max(0, (y - (a - off)) / (b - (off - 120) - (a - off) + 0.5 * vh)), 1);
      gsap.to(rotating, { transformOrigin: '50% 50%', rotate: 180 * s, duration: 0.6, ease: 'power3.out', overwrite: true });
    }
  }
  measureGrow();
  new ResizeObserver(() => { if (!zoomed()) measureGrow(); }).observe(root);
  if (isTablet()) { if (mobileMedia) { gsap.set(mobileMedia, { height: 0, width: 0 }); gsap.set(mobileMedia.querySelector('picture'), { scale: 2 }); } }
  else if (imagesWrap) { gsap.set(imagesWrap, { height: 0 }); [...imagesWrap.children].forEach((c) => { gsap.set(c, { width: 0 }); gsap.set(c.querySelector('picture'), { scale: 2 }); }); }
  items.forEach((_, i) => { const pool = isTablet() ? [7, 14, 21] : [10, 20, 25]; const o = pool[Math.floor(Math.random() * pool.length)]; offsets[i] = i % 2 === 0 ? -o : o; });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    measureItems();
    if (isTablet()) items.forEach((el) => gsap.set(el, { x: 0 }));
    update({ scroll: window.scrollY });
    const ro = new ResizeObserver(() => { if (!zoomed()) { measureItems(); update({ scroll: window.scrollY }); } });
    items.forEach((el) => ro.observe(el));
  }));
  let wasActive = false;
  scroll.watch((v) => { if (sec.active && !wasActive) measureItems(); wasActive = sec.active; update(v); });
  window.addEventListener('resize', () => { if (window.innerWidth === vw || zoomed()) return; measureGrow(); measureItems(); items.forEach((el) => gsap.set(el, { x: 0 })); update({ scroll: window.scrollY }); }, { passive: true });
}

/* =============================================================== Event */
function ticketHTML(t, over) {
  const [a, b] = t.teams;
  const loc = LANG === 'ko' ? 'ko-KR' : 'en-GB';
  const date = (s) => new Date(s.replace(' ', 'T')).toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  const hour = (s) => new Date(s.replace(' ', 'T')).toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' });
  const logo = (k) => (k === 'mark' ? ondoMark() : k === 'seal' ? icon.logoB() : icon.team(k));
  const desk = `<div class="ticket__inner"${isTablet() ? ' style="display:none;"' : ''}>
      <div class="ticket__inner__row"><div class="ticket__inner__row__logos">${logo(a.logo)}</div><div class="ticket__inner__row__name"><span>${esc(a.name)}</span>${over ? `<span>${t.scoreToulouse ?? '–'}</span>` : ''}</div>${!over && t.date ? `<div class="ticket__inner__row__date"><span>${date(t.date)}</span><span>${hour(t.date)}</span></div>` : ''}</div>
      <div class="ticket__inner__row"><div class="ticket__inner__row__logos">${logo(b.logo)}</div><div class="ticket__inner__row__name"><span>${esc(b.name)}</span>${over ? `<span>${t.scoreOpponent ?? '–'}</span>` : ''}</div></div>
      ${!over && t.cta ? `<div class="ticket__inner__row">${buttonPrimary({ label: t.cta.label, url: t.cta.url, variant: 'cta-gray' })}</div>` : ''}
    </div>`;
  const mob = `<div class="ticket__inner"${isTablet() ? '' : ' style="display:none;"'}>
      <div class="ticket__inner__row"><div class="ticket__inner__row__logos">${logo(a.logo)}${logo(b.logo)}</div><div class="ticket__inner__row__name"><span>${esc(a.name)}</span></div><div class="ticket__inner__row__name light"><span>${esc(b.name)}</span></div>${over ? `<div class="ticket__inner__row__score"><span>${t.scoreToulouse ?? '–'} : ${t.scoreOpponent ?? '–'}</span></div>` : ''}</div>
    </div>`;
  return `<div class="ticket ${over ? 'ticket--over' : ''}"><span class="ticket__lines"></span>${desk}${mob}<span class="ticket__lines"></span></div>`;
}

export function weekendHTML(d) {
  const cap = nl2br(d.caption);
  return `<section class="block-weekend"><div class="block-weekend__wrapper">
    <div class="block-weekend__sticky"><div class="block-weekend__sticky__inner">
      <div class="block-weekend__lines block-weekend__lines--top"></div>
      <div class="block-weekend__title"><span>${cap}</span><h2>${esc(d.title1)}</h2><span aria-hidden="true"${isTablet() ? ' style="display:none;"' : ''}>${cap}</span></div>
      <div class="block-weekend__video">${video({ src: d.video, poster: d.poster, cls: 'block-weekend__video__media' })}<div class="block-weekend__video__overlay"></div></div>
      <div class="block-weekend__title block-weekend__title--bottom"><h2>${esc(d.title2)}</h2><span aria-hidden="true"${isTablet() ? '' : ' style="display:none;"'}>${cap}</span></div>
      <div class="block-weekend__lines block-weekend__lines--bottom"></div>
    </div></div>
    <div class="block-weekend__tickets">${ticketHTML(d.ticket1, d.isOver)}${ticketHTML(d.ticket2, d.isOver)}</div>
  </div><div class="block-weekend__cover"></div></section>`;
}

export function initWeekend(root, d) {
  const sec = observe(root, d.label);
  const wrapper = root.querySelector('.block-weekend__wrapper');
  const tickets = root.querySelector('.block-weekend__tickets');
  const box = root.querySelector('.block-weekend__video');
  const v = box.querySelector('video');
  const overlay = root.querySelector('.block-weekend__video__overlay');
  let vh = window.innerHeight, vw = window.innerWidth, G = { s: 0, e: 1 };
  const layout = () => {
    wrapper.style.height = `${2 * vh + tickets.offsetHeight}px`;
    vh = window.innerHeight; vw = window.innerWidth;
    const h = root.offsetHeight;
    G = { s: vh / (vh + h), e: (2 * vh) / (vh + h) };
  };
  const scrub = () => {
    if (!v.duration || sec.progress < G.s || sec.progress > 1) return;
    v.currentTime = range(sec.progress, G.s, 1) * v.duration;
  };
  const update = () => {
    if (!sec.active) return;
    const t = range(sec.progress, G.s, G.e);
    gsap.set(box, { height: t * vh, width: t * vw });
    gsap.to(overlay, { opacity: 0.48 * t, duration: 0, ease: 'power2.out', overwrite: true });
    scrub();
  };
  layout();
  new ResizeObserver(layout).observe(tickets);
  gsap.set(box, { height: 0, width: 0 });
  gsap.set(overlay, { opacity: 0 });
  if (d.video) {
    let primed = false;
    const prime = () => { if (primed) return; primed = true; v.play().then(() => { v.pause(); v.currentTime = 0; scrub(); }).catch(scrub); };
    const go = () => (v.duration ? prime() : (v.addEventListener('loadedmetadata', prime, { once: true }), v.load()));
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); go(); } }, { rootMargin: '100% 0px' });
    io.observe(root);
    window.addEventListener('touchstart', go, { once: true, passive: true });
  }
  update();
  scroll.watch(update);
  window.addEventListener('resize', () => { if (window.innerWidth === vw) return; layout(); update(); }, { passive: true });
}

/* ============================================================ Press wall */
const GRID = [
  { x: 16, y: 16, w: 354 }, { x: 517, y: 315, w: 231 }, { x: 757, y: 780, w: 231 }, { x: 1009, y: 76, w: 219 }, { x: 1248, y: 700, w: 354 },
  { x: 1861, y: 438, w: 354 }, { x: 2234, y: 16, w: 219 }, { x: 2574, y: 550, w: 231 }, { x: 2914, y: 204, w: 231 }, { x: 3292, y: 16, w: 354 },
];
const GRID_W = Math.max(...GRID.map((g) => g.x + g.w));

export function mediasHTML(d) {
  const item = (it, i) => {
    const clickable = it.modal;
    const media = it.type === 'video' ? video({ src: it.src, cls: 'block-medias__item__video', loop: true }) : picture({ src: it.src, alt: it.alt, width: it.width, height: it.height, cls: 'block-medias__item__image' });
    return clickable ? mouseFollower({ content: media, label1: t('read'), label2: t('more'), blend: true, centered: true }) : media;
  };
  if (isTablet()) {
    return `<section class="block-medias"><h2 class="sr-only">${esc(d.label)}</h2><div class="block-medias__mobile">
      <div class="block-medias__mobile__sticky">${bgMarble({ bgColor: 'dark-gray' })}${chapterTitle(d.catchphrase)}</div>
      <div class="block-medias__mobile__items">${d.items.map((it, i) => `<div class="block-medias__mobile__item${it.modal ? ' block-medias__mobile__item--clickable' : ''} block-medias__mobile__item--${i % 2 === 0 ? 'left' : 'right'}" data-i="${i}">${picture({ src: it.src, alt: it.alt, width: it.width, height: it.height })}</div>`).join('')}</div>
    </div><div class="block-medias__cover"></div></section>`;
  }
  return `<section class="block-medias"><h2 class="sr-only">${esc(d.label)}</h2><div class="block-medias__sticky">
    ${bgMarble({ bgColor: 'dark-gray' })}${chapterTitle(d.catchphrase)}
    <div class="block-medias__grid">${d.items.map((it, i) => `<div class="block-medias__item${it.modal ? ' block-medias__item--clickable' : ''}" data-i="${i}">${item(it, i)}</div>`).join('')}</div>
  </div><div class="block-medias__cover"></div></section>`;
}

export function initMedias(root, d) {
  observe(root, d.label);
  root.querySelectorAll('.bg-marble').forEach((m) => initMarble(m));
  const modal = createModal({ align: 'left' });
  const openItem = (it) => {
    const m = it.modal;
    if (!m) return;
    modal.open(true, `<div class="block-medias__modal__icon">${icon.ornament()}</div>${m.quote ? `<p class="block-medias__modal__quote">${nl2br(m.quote)}</p>` : ''}${m.title ? `<span class="block-medias__modal__title">${esc(m.title)}</span>` : ''}${m.subtitle ? `<span class="block-medias__modal__subtitle">${esc(m.subtitle)}</span>` : ''}${m.cta ? `<div class="block-medias__modal__cta">${buttonCircular({ ...m.cta, icon: 'IconArrow' })}</div>` : ''}`);
  };
  const title = initChapterTitle(root.querySelector('.chapter-title'), d.catchphrase, isTablet() ? 0.6 : 0.5);
  if (isTablet()) {
    title.reveal(1);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-visible', e.isIntersecting)), { threshold: 0.1 });
    root.querySelectorAll('.block-medias__mobile__item').forEach((el) => { io.observe(el); el.addEventListener('click', () => openItem(d.items[+el.dataset.i])); });
    return;
  }
  root.querySelectorAll('.block-medias__item--clickable .mouse-follower').forEach((m) => {
    const i = +m.closest('.block-medias__item').dataset.i;
    initMouseFollower(m, { reveal: true, centered: true, onClick: () => openItem(d.items[i]) });
  });
  const grid = root.querySelector('.block-medias__grid');
  const els = [...grid.children];
  let vh = 0, vw = 0, sx = 1, sy = 1, total = 0, start = 0, dist = 0, stops = [];
  const measure = () => { vh = window.innerHeight; vw = window.innerWidth; sx = vw / 1512; sy = vh / 947; };
  const place = () => {
    let max = 0;
    els.forEach((el, i) => {
      const g = GRID[i % 10], page = Math.floor(i / 10);
      const x = (g.x + page * GRID_W) * sx + 150 * page, y = g.y * sy, w = g.w * sx;
      max = Math.max(max, x + w);
      el.dataset.baseX = String(x); el.style.width = `${w}px`; el.style.left = '0'; el.style.top = '0';
      gsap.set(el, { x, y });
    });
    const pages = Math.ceil(els.length / 10);
    total = Math.max(max, pages * GRID_W * sx + 150 * (pages - 1));
    grid.style.width = `${total}px`; grid.style.height = `${2 * vh}px`;
    dist = Math.max(0, total - vw + 32);
  };
  const sectionHeight = () => root.style.setProperty('--v0b062ccd', String(100 + (Math.max(0, total - vw + 32) / vh) * 100));
  const computeStops = () => {
    stops = [];
    if (!els.length || !dist) return;
    const pages = Math.ceil(els.length / 10), n = 10 * pages;
    for (let i = 4; i < n; i += 5) {
      let x, w;
      if (i < els.length) { x = parseFloat(els[i].dataset.baseX); w = parseFloat(els[i].style.width); }
      else { const g = GRID[i % 10], p = Math.floor(i / 10); x = (g.x + p * GRID_W) * sx + 150 * p; w = g.w * sx; }
      stops.push({ p: Math.min(1, Math.max(0, (x + w / 2 - 0.7 * vw) / dist)), flat: 0 });
    }
    for (let o = 0; o < pages - 1; o++) {
      const a = Math.min(10 * (o + 1) - 1, els.length - 1);
      const b = els[10 * (o + 1)];
      if (!b) continue;
      const mid = (parseFloat(els[a].dataset.baseX) + parseFloat(els[a].style.width) + parseFloat(b.dataset.baseX)) / 2 - vw / 2;
      stops.push({ p: Math.min(1, Math.max(0, mid / dist)), flat: vw / dist });
    }
    stops.sort((x, y) => x.p - y.p);
  };
  const yFor = (p) => {
    if (!stops.length) return 0;
    const up = 0.5 * vh, down = 0.5 * vh, segs = [];
    let cur = 0, mi = 0;
    for (const s of stops) {
      const h = s.flat / 2, a = Math.max(cur, s.p - h), b = Math.min(1, s.p + h);
      if (a > cur) segs.push({ start: cur, end: a, kind: 'move', mi: mi++ });
      if (s.flat > 0) { segs.push({ start: a, end: b, kind: 'flat', mi: mi - 1 }); cur = b; } else cur = a;
    }
    if (cur < 1) segs.push({ start: cur, end: 1, kind: 'move', mi });
    const seg = segs.find((s) => p <= s.end) ?? segs[segs.length - 1];
    const len = seg.end - seg.start, c = len > 0 ? Math.min(1, (p - seg.start) / len) : 1, e = c < 0.5 ? 2 * c * c : (4 - 2 * c) * c - 1;
    if (seg.kind === 'flat') return seg.mi % 2 === 0 ? -up : -up + down;
    return seg.mi % 2 === 0 ? -e * up : e * down - up;
  };
  const apply = (y, instant = false) => {
    const t = y - start, p = t <= 0 || !dist ? 0 : Math.min(1, t / dist);
    const x = p * dist, yy = yFor(p);
    instant ? gsap.set(grid, { x: -x, y: yy }) : gsap.to(grid, { x: -x, y: yy, duration: 0.6, ease: 'power3.out', overwrite: true });
    p < 0.1 ? title.reveal(p / 0.1) : title.setScrollX((p - 0.1) / 0.9);
  };
  const refresh = () => { measure(); place(); computeStops(); sectionHeight(); start = root.getBoundingClientRect().top + window.scrollY; apply(window.scrollY, true); };
  requestAnimationFrame(refresh);
  new IntersectionObserver(([e]) => { start = e.boundingClientRect.top + window.scrollY; if (e.isIntersecting) refresh(); }, { threshold: 0, rootMargin: '200% 0px' }).observe(root);
  scroll.watch(({ scroll: y }) => apply(y));
  let lw = window.innerWidth, t = null;
  window.addEventListener('resize', () => { if (window.innerWidth === lw) return; clearTimeout(t); t = setTimeout(() => { lw = window.innerWidth; refresh(); }, 100); }, { passive: true });
}

/* ================================================================ Shops */
function shopHTML(s, a) {
  const logo = a ? icon.logoA() : icon.logoB();
  const sep = '<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0L5 4L2.5 8L0 4Z" fill="currentColor"/></svg>';
  const links = `<div class="shop__links">${[s.link, s.website].filter(Boolean).map((l) => buttonSecondary(l) + sep).join('')}</div>`;
  const socials = s.socials ? `<div class="shop__socials"><span>${esc(s.socials.label)}</span><div class="shop__socials__icons">${s.socials.list.map((x) => `<a href="${esc(x.url)}" aria-label="${esc(x.type)}" target="_blank" rel="noopener noreferrer">${icon.social(x.type)}</a>`).join('')}</div></div>` : '';
  const tab = isTablet();
  return `<div class="shop"><div class="shop__header">${picture({ src: (tab && s.imageMobile ? s.imageMobile : s.image).src, alt: s.image.alt })}
    <div class="shop__header__inner"${tab ? ' style="display:none;"' : ''}><div class="shop__header__inner__brand"><div class="shop__header__inner__brand__logo">${logo}</div><h3 class="shop__header__inner__brand__title"><span>${esc(s.title)}</span></h3><div class="shop__header__inner__brand__logo">${logo}</div></div>${buttonPrimary({ label: s.cta.label, url: s.cta.url, variant: 'cta-gray', team: a ? 'tfc' : 'st' })}</div>
    <div class="shop__header__mobile"${tab ? '' : ' style="display:none;"'}><div class="shop__header__mobile__inner"><div class="shop__header__mobile__inner__logo">${logo}</div><h3 class="sr-only">${esc(s.title)}</h3>${links}${socials}${buttonPrimary({ label: s.cta.label, url: s.cta.url, variant: 'cta-gray', team: a ? 'tfc' : 'st' })}</div></div>
  </div><div class="shop__content"${tab ? ' style="display:none;"' : ''}>${links}${socials}</div></div>`;
}

export function shopsHTML(d) {
  const tab = isTablet();
  return `<section class="block-shops"><div class="block-shops__wrapper"><div class="block-shops__sticky"><div class="block-shops__sticky__inner">
    <div class="block-shops__lines block-shops__lines--top"></div>
    <div class="block-shops__title"><span>${nl2br(d.subtitle1)}</span><h2>${esc(d.title1)}</h2><span${tab ? ' style="display:none;"' : ''}>${nl2br(d.subtitle2)}</span></div>
    <div class="block-shops__image">${picture({ src: d.image.src, alt: d.image.alt })}</div>
    <div class="block-shops__title block-shops__title--bottom"><h2>${esc(d.title2)}</h2><span${tab ? '' : ' style="display:none;"'}>${nl2br(d.subtitle2)}</span></div>
    <div class="block-shops__lines block-shops__lines--bottom"></div>
  </div></div></div><div class="block-shops__shops">${shopHTML(d.shopTFC, true)}${shopHTML(d.shopST, false)}</div>${tab ? bgMarble({ bgColor: 'light-gold' }) : ''}</section>`;
}

export function initShops(root, d) {
  const sec = observe(root, d.label);
  const progressRef = { get value() { return sec.progress; } };
  root.querySelectorAll('.bg-marble').forEach((m) => initMarble(m, progressRef));
  const box = root.querySelector('.block-shops__image');
  const pic = box.querySelector('picture');
  let vh = 0, vw = 0, G = { s: 0, e: 1 };
  const measure = () => { vh = window.innerHeight; vw = window.innerWidth; const h = root.offsetHeight; G = { s: vh / (vh + h), e: (2 * vh) / (vh + h) }; };
  const update = () => {
    if (!sec.active) return;
    const t = range(sec.progress, G.s, G.e), w = t * vw;
    gsap.set(box, { height: isTablet() ? w * (9 / 16) : t * vh, width: 100 * t + '%' });
    gsap.set(pic, { scale: 2 - t });
  };
  measure();
  new ResizeObserver(() => { if (!zoomed()) measure(); }).observe(root);
  gsap.set(box, { height: 0, width: 0 });
  gsap.set(pic, { scale: 2 });
  update();
  scroll.watch(update);
  window.addEventListener('resize', () => { if (window.innerWidth === vw) return; measure(); update(); }, { passive: true });
}

/* ================================================================ Footer */
export function footerHTML(links) {
  return `<footer class="footer"><div class="footer__inner">${icon.ornament('footer__inner__occitania')}${icon.wordmark('footer__inner__capitolium')}<nav class="footer__inner__links">${links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.text)}</a>`).join('')}</nav>${bgMarble({ bgColor: 'dark-gray', parallax: false })}</div></footer>`;
}
