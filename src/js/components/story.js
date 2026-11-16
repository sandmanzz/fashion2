// The "story": pinned horizontal chapters. Each chapter opens with a row of
// arches (canvas-clipped video/image), the centre arch zooms to full screen
// while a script title rises, then panels scroll horizontally.
// Desktop = Chapter (ScrollTrigger scrub). Tablet/mobile = ChapterMobile.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scroll } from '../core/scroll.js';
import { observe, allSections } from '../core/sections.js';
import { get, set, on } from '../core/store.js';
import { isTablet, esc, nl2br, zoomed, charAnim, nextTick, transition } from '../core/utils.js';
import { icon } from '../icons.js';
import {
  bgMarble, initMarble, chapterHeader, chapterTitle, initChapterTitle,
  mouseFollower, initMouseFollower, branding, initBranding, img,
} from './common.js';

const ARCH_RATIO = 318 / 223;
const Q = 1 / 4;
const easeIO = (t) => (t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1);

/* ============================================================ Panels */
function buttonCircular({ label1, label2, url, icon: ic = 'IconCart' }) {
  const id = `bcirc${Math.random().toString(36).slice(2, 8)}`;
  const ico = { IconCart: icon.cart, IconArrow: icon.arrow }[ic] || icon.plus;
  return `<a class="btn-circular" href="${esc(url || '#')}"${(url || '').startsWith('/') ? '' : ' target="_blank" rel="noopener noreferrer"'} aria-label="${esc([label1, label2].filter(Boolean).join(' '))}"><svg class="btn-circular__svg" viewBox="0 0 100 100"><defs><path id="${id}-circle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"/></defs>${label1 ? `<text><textPath href="#${id}-circle" startOffset="25%" text-anchor="middle">${esc(label1)}</textPath></text>` : ''}${label2 ? `<text><textPath href="#${id}-circle" startOffset="75%" text-anchor="middle">${esc(label2)}</textPath></text>` : ''}</svg><div class="btn-circular__icon">${ico()}</div></a>`;
}
export { buttonCircular };

function playerModalHTML(m) {
  return `<div class="player-modal" style="display:none"><div class="player-modal__inner">
    <div class="player-modal__inner__header">
      <div class="player-modal__title">${m.title ? `<span class="h4-style">${esc(m.title)}</span>` : ''}${m.text ? `<p class="body-s-style">${nl2br(m.text)}</p>` : ''}</div>
      ${m.cta ? `<div class="player-modal__cta">${buttonCircular({ ...m.cta, icon: 'IconCart' })}</div>` : ''}
      <div class="player-modal__badge">${m.st ? icon.logoB() : icon.logoA()}</div>
    </div>
    ${m.list?.length ? `<ul class="player-modal__list">${m.list.map((l) => `<li class="player-modal__list__item">${l.label ? `<div class="player-modal__list__item__label"><span>${esc(l.label)}</span></div>` : ''}<div>${l.text ? `<span class="player-modal__list__item__text">${esc(l.text)}</span>` : ''}</div></li>`).join('')}</ul>` : ''}
  </div></div>`;
}

function panelContentHTML(item, bgColor, panelIndex, i) {
  const ar = item.image?.width && item.image?.height ? ` style="aspect-ratio:${item.image.width} / ${item.image.height};"` : '';
  const pic = item.image ? `<picture>${img({ ...item.image, alt: '' })}</picture>` : '';
  const media = item.cursor
    ? `<div class="panel-content__media panel-content__media--interactive"${ar}>${mouseFollower({ content: pic, label1: item.cursor.label1, label2: item.cursor.label2, blend: true, gtm: 'ouverture-popin-joueur', cls: 'panel-content__media__inner' })}${item.modal ? playerModalHTML(item.modal) : ''}</div>`
    : `<div class="panel-content__media"${ar}>${pic}</div>`;
  const inner = item.title || item.text ? `<div class="panel-content__inner">${item.title ? `<h3 class="panel-content__inner__title">${esc(item.title)}</h3>` : ''}${item.text ? `<p class="body-s-style">${nl2br(item.text)}</p>` : ''}</div>` : '';
  return `<div class="panel-content panel-content--${item.alignment} panel-content--${bgColor}" data-panel="${panelIndex}" data-content="${i}" data-panel-type="normal" data-panel-bg="${bgColor}">${media}${inner}</div>`;
}

function panelHTML(p, idx) {
  if (p.type === 'normal') {
    const marble = p.bgColor === 'light-gold' || p.bgColor === 'dark-gray' ? bgMarble({ bgColor: p.bgColor, fixed: true }) : '';
    return `<div class="panel panel--normal${p.bgColor ? ` panel--${p.bgColor}` : ''}">${marble}${p.items.map((it, i) => panelContentHTML(it, p.bgColor, idx, i)).join('')}</div>`;
  }
  const it = p.item;
  return `<div class="panel-content-fullscreen panel-content-fullscreen--${it.alignment}">
    ${it.image ? `<picture class="panel-content-fullscreen__media">${img({ src: it.image.src, alt: it.image.alt || '' })}</picture>` : ''}
    ${bgMarble({ bgColor: p.bgColor || 'dark-gray', style: isTablet() ? '' : 'display:none;' })}
    ${it.title || it.text ? `<div class="panel-content-fullscreen__inner">${it.title ? `<h3 class="panel-content-fullscreen__inner__title">${esc(it.title)}</h3>` : ''}${it.text ? `<p class="body-s-style">${nl2br(it.text)}</p>` : ''}</div>` : ''}
  </div>`;
}

/** Interactive panel image: follower cursor toggles the player card. */
function initPanelContents(root) {
  root.querySelectorAll('.panel-content__media--interactive').forEach((media) => {
    const follower = media.querySelector('.mouse-follower');
    const modal = media.querySelector('.player-modal');
    const l1 = follower.querySelector('text.c1') ? [...follower.querySelectorAll('text.c1')].map((t) => t.textContent).join('') : undefined;
    const l2 = follower.querySelector('text.c2') ? [...follower.querySelectorAll('text.c2')].map((t) => t.textContent).join('') : undefined;
    let open = false, ro = null;
    const mf = initMouseFollower(follower, {
      reveal: true,
      onClick: () => setOpen(!open),
    });
    const measure = () => mf.setModalHeight(modal.offsetHeight);
    async function setOpen(v) {
      open = v;
      mf.btn.setLabels(v ? 'Close' : l1, v ? 'Close' : l2, v ? 'IconClose' : undefined);
      if (!v) follower.querySelector('.btn-cursor__icon').innerHTML = icon.plus();
      mf.setFrozen(v);
      if (!modal) return;
      if (v) {
        transition(modal, 'player-modal', true);
        await nextTick(); await nextTick();
        measure();
        ro = new ResizeObserver(measure); ro.observe(modal);
      } else {
        ro?.disconnect(); ro = null;
        mf.setModalHeight(undefined);
        transition(modal, 'player-modal', false);
      }
    }
    modal?.addEventListener('click', (e) => e.stopPropagation());
  });
}

/* ======================================================= Chapter arches */
function archSourceHTML(arc) {
  const src = isTablet() && arc.videoMobile ? arc.videoMobile : arc.video;
  if (src) return `<video loop muted playsinline preload="auto"><source src="${esc(src)}" type="video/mp4"></video>`;
  return `<img src="${esc(arc.poster)}" alt="">`;
}

function chapterArchsHTML(arc) {
  const ch = arc.chapter;
  return `<div class="chapter-archs">
    ${chapterHeader(ch)}
    <div class="chapter-archs__header-clip" aria-hidden="true">${chapterHeader(ch, 'on-arch')}</div>
    <canvas class="chapter-archs__canvas" aria-hidden="true"></canvas>
    <div class="chapter-archs__sources" aria-hidden="true">${archSourceHTML(arc)}</div>
    ${chapterTitle(ch.title)}
    <div class="chapter-archs__title-clip" aria-hidden="true">${chapterTitle(ch.title)}</div>
  </div>`;
}

/** Port of ChapterArchs.vue: draws N arches into a canvas, each clipping the source media. */
function initChapterArchs(root, { title, cols = 5, panSteps = 0 }) {
  const mid = Math.floor(cols / 2);
  const headerBase = root.querySelector(':scope > .chapter-header');
  const headerClip = root.querySelector('.chapter-archs__header-clip');
  const titleClipWrap = root.querySelector('.chapter-archs__title-clip');
  const canvas = root.querySelector('.chapter-archs__canvas');
  const videoEl = root.querySelector('.chapter-archs__sources video');
  const imgEl = root.querySelector('.chapter-archs__sources img');
  const titleA = initChapterTitle(root.querySelector(':scope > .chapter-title'), title);
  const titleB = initChapterTitle(titleClipWrap.querySelector('.chapter-title'), title);
  const paths = [], arches = [];
  let clip = '', stroke = '#c3a677', aW = 313, aH = 446, gap = 80, vw = 0, vh = 0, centers = [], cy = 0, raf = 0;

  const panOffset = () => panSteps * (aW + gap);
  const applyClip = () => {
    const d = paths.filter(Boolean).join(' ');
    const v = d ? `path('${d}')` : '';
    if (v !== clip) { clip = v; headerClip.style.clipPath = v; titleClipWrap.style.clipPath = v; }
  };
  const archPath = (x, y, w, h) => {
    const p = new Path2D(), r = w / 2;
    p.moveTo(x, y + r);
    p.ellipse(x + r, y + r, r, r, 0, Math.PI, 0, false);
    p.lineTo(x + w, y + h); p.lineTo(x, y + h); p.closePath();
    return p;
  };
  const setArch = (i, x, y, w, on, opacity = 0.08) => {
    if (!on) { paths[i] = ''; arches[i] = null; return; }
    const h = w * ARCH_RATIO, r = w / 2;
    paths[i] = [`M ${x} ${y + r}`, `A ${w / 2} ${r} 0 0 1 ${x + w} ${y + r}`, `V ${y + h}`, `H ${x}`, 'Z'].join(' ');
    arches[i] = { x, y, w, h, opacity };
  };
  const source = () => {
    if (videoEl && videoEl.readyState >= 2) return videoEl;
    if (imgEl?.complete && imgEl.naturalWidth > 0) return imgEl;
    return null;
  };
  const draw = () => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const src = source();
    ctx.clearRect(0, 0, vw, vh);
    for (let i = 0; i < cols; i++) {
      const a = arches[i];
      if (!a) continue;
      const p = archPath(a.x, a.y, a.w, a.h);
      if (src) { ctx.save(); ctx.clip(p); ctx.drawImage(src, 0, 0, vw, vh); ctx.restore(); }
      ctx.save(); ctx.globalAlpha = a.opacity; ctx.fillStyle = '#000'; ctx.fill(p); ctx.restore();
      ctx.save(); ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(p); ctx.restore();
    }
  };
  const loop = () => { draw(); raf = videoEl && !videoEl.paused ? requestAnimationFrame(loop) : 0; };
  const startLoop = () => { if (!raf && videoEl) raf = requestAnimationFrame(loop); };
  const stopLoop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
  imgEl?.addEventListener('load', draw);
  videoEl?.addEventListener('play', startLoop);

  function computeRects() {
    vw = document.documentElement.clientWidth;
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh'));
    vh = v ? 100 * v : window.innerHeight;
    aW = vw <= 1440 ? Math.round(Math.max(Math.min(223 + (117 / 1050) * (vw - 390), 340), 223)) : Math.round(Math.min(340 + (140 / 480) * (vw - 1440), 480));
    aH = Math.round(aW * ARCH_RATIO);
    gap = Math.max(8, Math.round(26 + (54 / 1050) * (vw - 390)));
    const x0 = (vw - (cols * aW + (cols - 1) * gap)) / 2;
    const hh = headerBase ? headerBase.offsetHeight || headerBase.getBoundingClientRect().height : 0;
    const top = hh + (vh - hh - aH) / 2 - 5 - 20;
    centers = Array.from({ length: cols }, (_, i) => x0 + i * (aW + gap) + aW / 2);
    cy = top + aH / 2;
    stopLoop();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = vw * dpr; canvas.height = vh * dpr;
    canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { vW: vw, vH: vh };
  }
  const ensure = () => { if (vw === 0 || centers.length === 0) computeRects(); };
  function applyBase() {
    ensure();
    const o = panOffset();
    for (let i = 0; i < cols; i++) setArch(i, centers[i] + o - aW / 2, cy - aH / 2, aW, true, 0.08);
    applyClip(); draw(); startLoop();
  }
  stroke = getComputedStyle(document.documentElement).getPropertyValue('--color-dark-gold').trim() || '#c3a677';
  computeRects();
  applyBase();
  return {
    computeRects,
    applyBase,
    applyHidden() { for (let i = 0; i < cols; i++) setArch(i, 0, 0, 0, false); applyClip(); stopLoop(); draw(); },
    applyPan(t) {
      ensure();
      const o = panOffset() * (1 - t);
      for (let i = 0; i < cols; i++) setArch(i, centers[i] + o - aW / 2, cy - aH / 2, aW, true, 0.08);
      applyClip(); draw();
    },
    applyZoom(t) {
      ensure();
      const full = 1.3 * Math.max(vw, vh / ARCH_RATIO);
      const w = aW + t * (full - aW);
      const x = centers[mid] + t * (vw / 2 - centers[mid]) - w / 2;
      const y = cy + t * (vh / 2 - cy) - (w * ARCH_RATIO) / 2;
      for (let i = 0; i < cols; i++) {
        if (i === mid) setArch(i, x, y, w, true, 0.08 + 0.4 * t);
        else setArch(i, centers[i] + (i < mid ? -vw : vw) * t - aW / 2, cy - aH / 2, aW, t < 0.5, 0.08);
      }
      applyClip(); draw(); titleA.reveal(t); titleB.reveal(t);
    },
    applyZoomFull(t = 0) {
      ensure();
      const full = 1.3 * Math.max(vw, vh / ARCH_RATIO);
      for (let i = 0; i < cols; i++) i === mid ? setArch(i, (vw - full) / 2, (vh - full * ARCH_RATIO) / 2, full, true, 0.48) : setArch(i, 0, 0, 0, false);
      applyClip(); draw(); startLoop();
      titleA.reveal(1); titleA.setScrollX(t); titleB.reveal(1); titleB.setScrollX(t);
    },
    getVideos: () => (videoEl ? [videoEl] : []),
  };
}

/* ============================================================ Chapter (desktop) */
function chapterHTML(arc, i, n) {
  const ch = arc.chapter;
  return `<div class="chapter" style="background-color:var(--color-${ch.bgColor});z-index:${n - i};">
    <div class="chapter__track">
      <div class="chapter__parallax">${bgMarble({ bgColor: ch.bgColor, fixed: true })}${chapterArchsHTML(arc)}</div>
      <div class="chapter__panels">${ch.panels.map(panelHTML).join('')}</div>
    </div>
  </div>`;
}

function initChapter(el, arc, { index, isLast, label }) {
  observe(el, label);
  const track = el.querySelector('.chapter__track');
  const parallax = el.querySelector('.chapter__parallax');
  const panelsWrap = el.querySelector('.chapter__panels');
  const sectionProgress = { value: -1 };
  el.querySelectorAll('.bg-marble').forEach((m) => initMarble(m, sectionProgress));
  const archs = initChapterArchs(el.querySelector('.chapter-archs'), { title: arc.chapter.title, cols: 5, panSteps: 0 });
  initPanelContents(el);
  let vw = 0, vh = 0, panelW = 0, state = null, last = -1, slides = [];

  const slideContents = (t) => {
    for (const { el: c, enterP, centerP, leaveP, isFirst, isLast: last2 } of slides) {
      let y;
      if (t <= centerP) y = isFirst ? 0 : (1 - Math.min(1, Math.max(0, centerP - enterP === 0 ? 1 : (t - enterP) / (centerP - enterP)))) * vh;
      else y = last2 ? 0 : -Math.min(1, Math.max(0, leaveP - centerP === 0 ? 1 : (t - centerP) / (leaveP - centerP))) * vh;
      c.style.transform = `translateY(${y}px)`;
    }
  };
  const resetContents = () => { for (const { el: c, isFirst } of slides) c.style.transform = `translateY(${isFirst ? 0 : vh}px)`; };
  const setTrack = (x) => { track.style.transform = `translate3d(${x}px,0,0)`; el.style.setProperty('--track-x', `${x}px`); };
  const play = () => archs.getVideos().forEach((v) => v.play().catch(() => {}));
  const stop = () => archs.getVideos().forEach((v) => { v.pause(); v.currentTime = 0; });

  function applyProgress(p) {
    last = p;
    if (p < -0.25) {
      if (state !== 'before') { state = 'before'; archs.applyHidden(); el.style.transform = ''; setTrack(0); parallax.style.transform = ''; resetContents(); stop(); }
    } else if (p < 0) {
      if (state !== 'pre') play();
      state = 'pre';
      archs.applyBase(); el.style.transform = ''; setTrack(0);
      parallax.style.transform = index > 0 ? `translateX(${(1 - (p + Q) / Q) * vw * 0.3}px)` : '';
      resetContents();
    } else if (p >= 1) {
      if (state !== 'after') {
        state = 'after';
        if (isLast) { archs.applyZoomFull(1); el.style.transform = ''; play(); }
        else { archs.applyHidden(); el.style.transform = `translateX(${-vw}px)`; stop(); }
      }
    } else {
      if (state !== 'active' && state !== 'pre') play();
      state = 'active';
      if (p <= Q) {
        el.style.transform = ''; setTrack(0); parallax.style.transform = ''; slideContents(0);
        archs.applyZoom(easeIO(p / Q));
      } else if (p <= 0.75) {
        el.style.transform = '';
        const t = (p - Q) / 0.5, x = -t * panelW;
        archs.applyZoomFull(t); setTrack(x); parallax.style.transform = `translateX(${-0.7 * x}px)`; slideContents(t);
      } else {
        const x = -panelW;
        archs.applyZoomFull(1); setTrack(x); parallax.style.transform = `translateX(${-0.7 * x}px)`; slideContents(1);
        el.style.transform = isLast ? '' : `translateX(${-((p - 0.75) / 0.25) * vw}px)`;
      }
    }
    sectionProgress.value = -1;
  }

  function init() {
    track.style.transform = 'translate3d(0,0,0)'; el.style.transform = ''; el.style.removeProperty('--track-x');
    const r = archs.computeRects();
    vw = r.vW; vh = r.vH; panelW = panelsWrap.scrollWidth;
    const contents = [...panelsWrap.querySelectorAll(".panel-content[data-panel-bg='light-gold']")];
    const rects = contents.map((c) => c.getBoundingClientRect());
    document.documentElement.style.setProperty('--vw', vw / 100 + 'px');
    slides = panelW && contents.length ? contents.map((c, i) => {
      const b = rects[i];
      const prevIsContent = c.previousElementSibling?.classList.contains('panel-content');
      const nextIsContent = c.nextElementSibling?.classList.contains('panel-content');
      return { el: c, enterP: (b.left - vw) / panelW, centerP: (b.left + b.width / 2 - vw / 2) / panelW, leaveP: (b.left + b.width) / panelW, isFirst: i === 0 || !prevIsContent, isLast: i === contents.length - 1 || !nextIsContent };
    }) : [];
    requestAnimationFrame(() => panelsWrap.querySelectorAll('.panel--normal').forEach((p) => p.style.setProperty('--panel-offset-left', `${p.getBoundingClientRect().left}px`)));
    let pending = false;
    new ResizeObserver(() => {
      if (pending || zoomed()) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; const w = panelsWrap.scrollWidth; if (w !== panelW) panelW = w; });
    }).observe(panelsWrap);
    state = null;
    applyProgress(last);
  }
  if (document.readyState !== 'complete') window.addEventListener('load', () => { const w = panelsWrap.scrollWidth; if (w !== panelW) panelW = w; }, { once: true });
  return { el, init, applyProgress, getPanelScrollW: () => panelW };
}

/* ============================================================ Chapter (mobile) */
function chapterMobileHTML(arc, i, panSteps) {
  const ch = arc.chapter;
  return `<section class="chapter-mobile" style="background-color:var(--color-${ch.bgColor})">
    <div class="chapter-mobile__zoom-area" style="--zoom-area-height: calc(var(--vh, 1vh) * ${200 + 50 * panSteps})">
      <div class="chapter-mobile__sticky">${bgMarble({ bgColor: ch.bgColor })}${chapterArchsHTML(arc)}</div>
    </div>
    ${ch.panels.map(panelHTML).join('')}
  </section>`;
}

function initChapterMobile(el, arc, { index, blockLabel, label, panSteps }) {
  observe(el, label);
  el.querySelectorAll('.bg-marble').forEach((m) => initMarble(m));
  const archs = initChapterArchs(el.querySelector('.chapter-archs'), { title: arc.chapter.title, cols: 3, panSteps });
  initPanelContents(el);
  let vh = 0, top = 0, state = null, contents = [], centers = [], vw = 0;
  const onScroll = ({ scroll: y }) => {
    top = el.getBoundingClientRect().top + y;
    const t = y - top, pan = panSteps * vh * 0.5, zoom = vh;
    if (t < 0) { if (state !== 'before') { state = 'before'; archs.applyBase(); } }
    else {
      set(`story-active-${blockLabel}`, index);
      if (pan > 0 && t <= pan) { state = 'active'; archs.applyPan(easeIO(t / pan)); }
      else {
        const e = t - pan, r = easeIO(Math.min(1, Math.max(0, e / zoom)));
        if (r >= 1) { state = 'after'; archs.applyZoomFull(Math.max(0, (e - zoom) / (6 * vh))); }
        else { state = 'active'; archs.applyZoom(r); }
      }
    }
    slide({ scroll: y });
  };
  const measure = () => { const r = archs.computeRects(); vh = r.vH; top = el.getBoundingClientRect().top + window.scrollY; state = null; archs.applyBase(); };
  const collect = () => {
    vw = window.innerWidth;
    contents = [...el.querySelectorAll('.panel-content')];
    centers = contents.map((c) => c.getBoundingClientRect().top + c.offsetHeight / 2 + window.scrollY);
    contents.forEach((c) => gsap.set(c, { x: c.classList.contains('panel-content--bottom') ? vw : -vw }));
  };
  const slide = ({ scroll: y }) => contents.forEach((c, i) => {
    const bottom = c.classList.contains('panel-content--bottom');
    const r = Math.min(1, Math.max(0, -(centers[i] - y - 1.5 * vh) / 300));
    gsap.to(c, { x: (bottom ? vw : -vw) * (1 - r), duration: 0.6, ease: 'power3.out', overwrite: true });
  });
  requestAnimationFrame(() => {
    measure(); collect(); slide({ scroll: window.scrollY }); scroll.watch(onScroll);
    requestAnimationFrame(() => { measure(); collect(); });
  });
  new IntersectionObserver(([e]) => {
    top = e.boundingClientRect.top + window.scrollY;
    const v = archs.getVideos();
    e.isIntersecting ? v.forEach((x) => x.play().catch(() => {})) : v.forEach((x) => { x.pause(); x.currentTime = 0; });
  }, { threshold: 0 }).observe(el);
  let lastW = window.innerWidth, t1 = null;
  window.addEventListener('resize', () => { if (window.innerWidth === lastW) return; clearTimeout(t1); t1 = setTimeout(() => { lastW = window.innerWidth; measure(); collect(); }, 200); }, { passive: true });
  if (document.readyState !== 'complete') window.addEventListener('load', measure, { once: true });
}

/* ============================================================ Story navigation */
function navStoryHTML(chapters, tagline) {
  const label = chapters[0]?.label || '';
  const toggle = (inv) => `<button class="nav-story__toggle${inv ? ' nav-story__toggle--inverted' : ''}" aria-label="${esc(label)}"><div class="nav-story__toggle__inner"><div class="nav-story__toggle__inner__icon">${icon.burger()}</div><span class="nav-story__toggle__inner__label">${[...label].map((c) => `<span class="nav-story__toggle__inner__label__char">${c === ' ' ? ' ' : esc(c)}</span>`).join('')}</span><div class="nav-story__toggle__inner__icon">${icon.burger()}</div></div></button>`;
  return `<div class="nav-story">
    ${toggle(false)}
    <div class="nav-story__toggle-clip" aria-hidden="true">${toggle(true)}</div>
    <div class="nav-story__panel">
      ${branding({ tagline, small: true })}
      <div class="nav-story__list"><div class="nav-story__follower">${icon.ornament()}${icon.ornament()}</div>
        <ul>${chapters.map((c, i) => `<li class="nav-story__item"><button class="${i === 0 ? 'active' : ''}"><span class="nav-story__item__label">${esc(c.label)}</span><span class="nav-story__item__title">${esc(c.title)}</span></button></li>`).join('')}</ul>
      </div>
      ${bgMarble({ bgColor: 'dark-gray' })}
    </div>
  </div>`;
}

function initNavStory(root, chapters, blockLabel, blockSection) {
  const brand = initBranding(root.querySelector('.branding'), { small: true });
  root.querySelectorAll('.bg-marble').forEach((m) => initMarble(m));
  const items = [...root.querySelectorAll('.nav-story__item button')];
  const follower = root.querySelector('.nav-story__follower');
  const toggles = [...root.querySelectorAll('.nav-story__toggle')];
  const labelsEls = () => [...root.querySelectorAll('.nav-story__toggle__inner__label')];
  const ca = charAnim({ getEls: () => labelsEls().flatMap((l) => [...l.children]) });
  let open = false, forced = null, skipAnim = false, lastTop = null, currentLabel = chapters[0]?.label;
  const activeIdx = () => forced ?? get(`story-chapter-${blockLabel}`, 0);
  gsap.set(items, { opacity: 0, y: 12 });

  const moveFollower = (i) => {
    const b = items[i];
    if (!b) return;
    const top = b.offsetTop, svgs = follower.querySelectorAll('svg');
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
  const sync = async () => {
    const i = activeIdx();
    items.forEach((b, k) => b.classList.toggle('active', k === i));
    const lbl = chapters[i]?.label ?? '';
    if (lbl !== currentLabel) {
      currentLabel = lbl;
      await ca.animateOut();
      labelsEls().forEach((l) => (l.innerHTML = [...lbl].map((c) => `<span class="nav-story__toggle__inner__label__char">${c === ' ' ? ' ' : esc(c)}</span>`).join('')));
      toggles.forEach((t) => t.setAttribute('aria-label', lbl));
      await nextTick();
      ca.animateIn();
    }
    if (open) moveFollower(i);
  };
  on(`story-chapter-${blockLabel}`, (v) => { if (forced !== null && v === forced) forced = null; sync(); });

  const setOpen = (v) => {
    if (v === open) return;
    open = v;
    root.classList.toggle('nav-story--open', v);
    toggles.forEach((t) => (t.querySelectorAll('.icon-burger').forEach((b) => b.classList.toggle('icon-burger--open', v))));
    if (skipAnim) { skipAnim = false; return; }
    gsap.killTweensOf(items);
    if (v) {
      set('nav-open', false);
      scroll.stop();
      requestAnimationFrame(() => { brand.play(); moveFollower(activeIdx()); });
      gsap.fromTo(items, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06, delay: 0.2, overwrite: true });
    } else {
      scroll.start();
      gsap.to(items, { opacity: 0, y: 15, duration: 0.3, ease: 'power2.in', stagger: 0.03, overwrite: true });
    }
  };
  toggles.forEach((t) => t.addEventListener('click', () => setOpen(!open)));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  root.querySelector('.nav-story__list').addEventListener('mouseleave', () => moveFollower(activeIdx()));
  items.forEach((b, i) => {
    b.addEventListener('mouseenter', () => moveFollower(i));
    b.addEventListener('click', () => {
      forced = i;
      gsap.killTweensOf(items);
      gsap.set(items, { opacity: 0, y: 15 });
      skipAnim = true;
      setOpen(false);
      scroll.start();
      const offs = get(`story-offsets-${blockLabel}`, []);
      if (offs[i] !== undefined && !isTablet()) { scroll.scrollTo(offs[i], { immediate: true }); sync(); return; }
      const s = allSections().find((x) => x.label === `${blockLabel}-${i}`);
      if (s) { scroll.scrollTo(s.el.getBoundingClientRect().top + window.scrollY, { immediate: true }); sync(); return; }
      scroll.scrollTo(blockSection.el.getBoundingClientRect().top + window.scrollY, { immediate: true });
    });
  });
  // visible only while the story block is active
  const vis = () => { root.classList.toggle('nav-story--visible', blockSection.active); if (!blockSection.active) setOpen(false); };
  scroll.watch(vis);
  vis();
}

/* ============================================================ BlockStory */
export function storyHTML(d, tagline) {
  const n = d.archs.length;
  const chapters = d.archs.map((a) => a.chapter);
  if (isTablet()) return `<div class="block-story">${d.archs.map((a, i) => chapterMobileHTML(a, i, 0)).join('')}${navStoryHTML(chapters, tagline)}</div>`;
  return `<div class="block-story"><div class="block-story__pin"><div class="block-story__track">${d.archs.map((a, i) => chapterHTML(a, i, n)).join('')}</div></div>${navStoryHTML(chapters, tagline)}</div>`;
}

export function initStory(root, d) {
  const label = d.label;
  const sec = observe(root, label);
  const chapters = d.archs.map((a) => a.chapter);
  initNavStory(root.querySelector('.nav-story'), chapters, label, sec);
  if (isTablet()) {
    root.querySelectorAll('.chapter-mobile').forEach((el, i) => initChapterMobile(el, d.archs[i], { index: i, blockLabel: label, label: `${label}-${i}`, panSteps: 0 }));
    on(`story-active-${label}`, (v) => set(`story-chapter-${label}`, v));
    return;
  }
  const pin = root.querySelector('.block-story__pin');
  const els = [...root.querySelectorAll('.chapter')];
  const chs = [];
  let st = null, current = -1, inited = false;
  function build() {
    if (isTablet()) return;
    st?.kill();
    const vw = document.documentElement.clientWidth;
    const n = chs.length;
    if (!n) return;
    const maxPanel = Math.max(0, ...chs.map((c) => c.getPanelScrollW()));
    const step = Math.max(3 * vw, 2 * maxPanel + vw);
    const total = (n - 1) * step + step * (3 / 4);
    root.style.height = `${total + vw}px`;
    requestAnimationFrame(() => { scroll.resize(); ScrollTrigger.refresh(); });
    const top = root.getBoundingClientRect().top + window.scrollY;
    set(`story-offsets-${label}`, Array.from({ length: n }, (_, i) => top + i * step));
    const span = n - 1 + 3 / 4;
    st = ScrollTrigger.create({
      trigger: root, start: 'top top', end: `+=${total}`, scrub: true,
      onUpdate: (e) => {
        const p = e.progress * span;
        const a = Math.min(n - 1, p | 0), lo = Math.max(0, a - 1), hi = Math.min(n - 1, a + 1);
        for (let i = lo; i <= hi; i++) chs[i]?.applyProgress(p - i);
        if (a !== current) {
          if (current >= 0) {
            for (let i = Math.max(0, current - 1); i <= Math.min(n - 1, current + 1); i++) if (i < lo || i > hi) chs[i]?.applyProgress(p - i);
          }
          current = a;
          set(`story-chapter-${label}`, a);
          set('storyActiveChapter', a);
        }
      },
    });
  }
  const io = new IntersectionObserver(async ([e]) => {
    if (!e.isIntersecting || inited) return;
    io.disconnect();
    inited = true;
    await nextTick(); await nextTick();
    els.forEach((el, i) => chs.push(initChapter(el, d.archs[i], { index: i, isLast: i === els.length - 1, label: `${label}-${i}` })));
    chs.forEach((c) => c.init());
    chs[0]?.applyProgress(0);
    build();
    requestAnimationFrame(() => chs[0]?.init());
  }, { rootMargin: '100% 0px' });
  io.observe(root);
  let lw = window.innerWidth, t = null;
  window.addEventListener('resize', () => {
    if (zoomed() || window.innerWidth === lw) return;
    lw = window.innerWidth;
    clearTimeout(t);
    t = setTimeout(() => { if (!isTablet() && inited) { chs.forEach((c) => c.init()); build(); } }, 200);
  }, { passive: true });
  void pin;
}
