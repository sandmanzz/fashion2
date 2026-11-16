// "What it's made of" — scroll-driven material tour (V2).
// The section pins; each scroll step opens the next hotspot on the garment:
// the camera pushes toward it, a line draws to the detail card, and a macro
// photo opens out of a circle. Hotspots are clickable (jump to that step).
import gsap from 'gsap';
import { scroll } from '../core/scroll.js';
import { observe } from '../core/sections.js';
import { esc, isTablet } from '../core/utils.js';
import { bgMarble, initMarble } from './common.js';

const pad = (n) => String(n).padStart(2, '0');

export function materialsHTML(d) {
  const garments = d.garments.map((g, gi) => `
    <figure class="mat__garment" data-g="${gi}">
      <div class="mat__frame">
        <img src="${esc(g.image)}" alt="${esc(g.name)}" decoding="async">
        ${d.spots.map((s, i) => (s.garment === gi ? `<button class="mat__spot" type="button" data-i="${i}" style="left:${s.x}%;top:${s.y}%" aria-label="${esc(s.title)}"><span class="mat__spot__ring"></span><span class="mat__spot__dot">${i + 1}</span></button>` : '')).join('')}
      </div>
      <figcaption class="mat__garment__name"><a href="/product.html?p=${g.slug}">${esc(g.name)} ↗</a></figcaption>
    </figure>`).join('');
  const cards = d.spots.map((s, i) => `
    <article class="mat__card" data-i="${i}">
      <div class="mat__card__media"><img src="${esc(s.image)}" alt="" loading="lazy" decoding="async"></div>
      <div class="mat__card__body">
        <span class="mat__card__num">${pad(i + 1)} <i>/ ${pad(d.spots.length)}</i></span>
        <h3 class="mat__card__title">${esc(s.title)}</h3>
        <ul class="mat__card__specs">${s.specs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <p class="mat__card__text body-s-style">${esc(s.text)}</p>
      </div>
    </article>`).join('');
  return `<section class="block-mat" style="--steps:${d.spots.length}">
    <div class="block-mat__sticky">
      ${bgMarble({ bgColor: 'dark-gray' })}
      <header class="mat__head">
        <span class="mat__eyebrow">${esc(d.eyebrow)}</span>
        <h2 class="mat__title">${esc(d.title)}</h2>
        <span class="mat__hint">${esc(d.hint)}</span>
      </header>
      <div class="mat__stage">${garments}</div>
      <svg class="mat__line" aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0"/><circle r="3"/></svg>
      <div class="mat__cards">${cards}</div>
      <ol class="mat__steps">${d.spots.map((s, i) => `<li><button type="button" data-i="${i}"><span>${pad(i + 1)}</span>${esc(s.title)}</button></li>`).join('')}</ol>
    </div>
  </section>`;
}

export function initMaterials(root, d) {
  observe(root, d.label);
  root.querySelectorAll('.bg-marble').forEach((m) => initMarble(m));
  const n = d.spots.length;
  const garments = [...root.querySelectorAll('.mat__garment')];
  const spots = [...root.querySelectorAll('.mat__spot')];
  const cards = [...root.querySelectorAll('.mat__card')];
  const steps = [...root.querySelectorAll('.mat__steps button')];
  const svg = root.querySelector('.mat__line');
  const line = svg.querySelector('line');
  const dot = svg.querySelector('circle');
  let active = -1, lineTween = null;

  const spotOf = (i) => spots.find((s) => +s.dataset.i === i);
  const zoomTo = (i) => {
    const s = d.spots[i], g = garments[s.garment];
    // push the "camera" toward the hotspot — image and hotspots share one frame, so they stay locked
    gsap.to(g.querySelector('.mat__frame'), { scale: 1.16, xPercent: (50 - s.x) * 0.3, yPercent: (50 - s.y) * 0.3, duration: 1.1, ease: 'power3.inOut', overwrite: true });
  };
  const drawLine = (i, animate = true) => {
    const sp = spotOf(i), card = cards[i];
    if (!sp || !card) return;
    const sr = svg.getBoundingClientRect(), a = sp.getBoundingClientRect(), b = card.querySelector('.mat__card__media').getBoundingClientRect();
    const x1 = a.left + a.width / 2 - sr.left, y1 = a.top + a.height / 2 - sr.top;
    const x2 = b.left - sr.left, y2 = b.top + b.height / 2 - sr.top;
    line.setAttribute('x1', x1); line.setAttribute('y1', y1); line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    dot.setAttribute('cx', x2); dot.setAttribute('cy', y2);
    const len = Math.hypot(x2 - x1, y2 - y1);
    lineTween?.kill();
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: animate ? len : 0 });
    gsap.set(dot, { opacity: animate ? 0 : 1 });
    if (animate) lineTween = gsap.timeline().to(line, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', delay: 0.45 }).to(dot, { opacity: 1, duration: 0.2 });
  };
  const setActive = (i) => {
    if (i === active) return;
    const prev = active;
    active = i;
    const g = d.spots[i].garment;
    // garment switch
    garments.forEach((el, gi) => {
      const on = gi === g;
      if (on && !el.classList.contains('is-on')) gsap.fromTo(el, { autoAlpha: 0, x: prev > i ? -60 : 60 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: 'power3.out' });
      if (!on && el.classList.contains('is-on')) gsap.to(el, { autoAlpha: 0, x: prev > i ? 60 : -60, duration: 0.6, ease: 'power2.in' });
      el.classList.toggle('is-on', on);
    });
    spots.forEach((sp) => {
      const k = +sp.dataset.i;
      sp.classList.toggle('is-active', k === i);
      sp.classList.toggle('is-seen', k < i);
    });
    steps.forEach((b, k) => b.classList.toggle('is-active', k === i));
    // cards: old one slides away, new one opens out of a circle
    cards.forEach((c, k) => {
      const media = c.querySelector('.mat__card__media');
      const body = c.querySelectorAll('.mat__card__body > *');
      if (k === i) {
        c.classList.add('is-on');
        gsap.killTweensOf([c, media, body]);
        gsap.set(c, { autoAlpha: 1, y: 0 });
        gsap.fromTo(media, { clipPath: 'circle(0% at 0% 50%)' }, { clipPath: 'circle(150% at 0% 50%)', duration: 1.1, ease: 'power3.inOut', delay: 0.35 });
        gsap.fromTo(media.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.35 });
        gsap.fromTo(body, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.07, delay: 0.6 });
      } else if (c.classList.contains('is-on')) {
        c.classList.remove('is-on');
        gsap.to(c, { autoAlpha: 0, y: k < i ? -30 : 30, duration: 0.45, ease: 'power2.in' });
      }
    });
    zoomTo(i);
    setTimeout(() => drawLine(i), 0);
    gsap.delayedCall(1.15, () => drawLine(i, false));
  };

  // scroll → step
  let top = 0, height = 0;
  const measure = () => { top = root.getBoundingClientRect().top + window.scrollY; height = root.offsetHeight - window.innerHeight; };
  measure();
  new ResizeObserver(measure).observe(root);
  window.addEventListener('resize', () => { measure(); if (active >= 0) drawLine(active, false); }, { passive: true });
  const onScroll = ({ scroll: y }) => {
    const p = Math.min(0.999, Math.max(0, (y - top) / height));
    setActive(Math.floor(p * n));
  };
  scroll.watch(onScroll);
  // click a hotspot / step → scroll to that step
  const jump = (i) => scroll.scrollTo(top + ((i + 0.5) / n) * height, { duration: 1.2 });
  spots.forEach((s) => s.addEventListener('click', () => jump(+s.dataset.i)));
  steps.forEach((b) => b.addEventListener('click', () => jump(+b.dataset.i)));

  // initial state
  gsap.set(garments, { autoAlpha: 0 });
  gsap.set(cards, { autoAlpha: 0 });
  setActive(0);
  if (isTablet()) root.classList.add('block-mat--compact');
}
