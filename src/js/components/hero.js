// Hero: intro (looping video + branding + "Enter"), then a scroll-scrubbed video
// that shrinks while a paragraph fills with colour letter by letter.
import gsap from 'gsap';
import { scroll } from '../core/scroll.js';
import { observe } from '../core/sections.js';
import { set, on } from '../core/store.js';
import { range, isTablet, esc, charAnim } from '../core/utils.js';
import { branding, initBranding, buttonPrimary, video } from './common.js';
import { loading } from './shell.js';

const A = 1 / 3.5, B = 2 / 3.5, O = 2.5 / 3.5;

export function heroHTML(c, tagline) {
  const h = c.hero;
  return `<section class="hero">
  <div class="hero__video-intro">${video({ src: h.intro.video, poster: h.intro.poster, cls: 'hero__video__media', autoplay: true, loop: true, attrs: 'fetchpriority="high"' })}</div>
  <div class="hero__intro">
    <div class="hero__branding">${branding({ tagline })}</div>
    <div class="hero__ctas">${buttonPrimary({ label: h.intro.ctaPrimary, variant: 'transparent', gtm: 'entrer-popin', tag: 'button' })}</div>
  </div>
  <div class="hero__anims">
    <div class="hero__video">${video({ src: h.scroll.video, poster: h.scroll.poster, cls: 'hero__video__media' })}</div>
    <div class="hero__text"><div class="hero__text__sticky">
      <p class="hero__text__content">${esc(h.scroll.text)}</p>
      <div class="hero__text__scroll">${[...h.scroll.label].map((ch) => `<span class="hero__text__scroll__char">${esc(ch)}</span>`).join('')}</div>
    </div></div>
  </div>
</section>`;
}

export function initHero(root, c) {
  const h = c.hero;
  const sec = observe(root, h.label);
  const introVideoWrap = root.querySelector('.hero__video-intro');
  const introVideo = introVideoWrap.querySelector('video');
  const intro = root.querySelector('.hero__intro');
  const ctas = root.querySelector('.hero__ctas');
  const anims = root.querySelector('.hero__anims');
  const videoWrap = root.querySelector('.hero__video');
  const scrubVideo = videoWrap.querySelector('video');
  const textBox = root.querySelector('.hero__text');
  const textEl = root.querySelector('.hero__text__content');
  const labelChars = [...root.querySelectorAll('.hero__text__scroll__char')];
  const brand = initBranding(root.querySelector('.branding'));
  const label = charAnim({ getEls: () => labelChars });
  let open = false;

  // --- split paragraph into colourable chars (useTextColorScroll)
  const from = { r: 240, g: 227, b: 207, a: 0.24 }, to = { r: 240, g: 227, b: 207, a: 1 };
  const text = textEl.textContent;
  textEl.innerHTML = '';
  const words = text.split(' ');
  words.forEach((w, i) => {
    const wrap = document.createElement('span');
    wrap.style.display = 'inline-block'; wrap.style.whiteSpace = 'nowrap';
    [...w].forEach((ch) => { const s = document.createElement('span'); s.style.display = 'inline'; s.style.color = 'rgba(240, 227, 207, 0.24)'; s.style.transition = 'color 0.3s ease'; s.textContent = ch; wrap.appendChild(s); });
    textEl.appendChild(wrap);
    if (i < words.length - 1) { const sp = document.createElement('span'); sp.style.display = 'inline'; sp.textContent = ' '; textEl.appendChild(sp); }
  });
  const textChars = [...textEl.querySelectorAll('span span')];
  let lastP = -1;
  const updateColors = () => {
    const t = range(sec.progress, A, B);
    if (Math.abs(t - lastP) < 0.002) return;
    lastP = t;
    const n = textChars.length;
    textChars.forEach((el, i) => {
      const k = Math.max(0, Math.min(1, t * n - i));
      el.style.color = `rgba(${Math.round(from.r + (to.r - from.r) * k)},${Math.round(from.g + (to.g - from.g) * k)},${Math.round(from.b + (to.b - from.b) * k)},${from.a + (to.a - from.a) * k})`;
    });
  };

  let lastTime = -1, vh = window.innerHeight, vw = window.innerWidth, labelShown = true;
  function update() {
    if (!sec.active) return;
    updateColors();
    // scrub
    if (open && scrubVideo.duration) {
      const t = range(sec.progress, A, O + (1 - O) / 2) * scrubVideo.duration;
      if (Math.abs(t - lastTime) >= 0.001) { lastTime = t; scrubVideo.currentTime = t; }
    }
    // shrink video + fade text
    const e = range(sec.progress, B, O), min = isTablet() ? 0.66 : 0.45;
    if (isTablet()) { gsap.set(videoWrap, { scale: 1 - (1 - min) * e }); gsap.set(textEl, { opacity: 1 - e }); }
    else {
      gsap.to(videoWrap, { scale: 1 - (1 - min) * e, duration: 0.6, ease: 'power3.out', overwrite: true });
      gsap.to(textEl, { opacity: 1 - e, duration: 0.6, ease: 'power3.out', overwrite: true });
    }
    gsap.set(anims, { y: range(sec.progress, O, 1) * vh * 0.75 });
    // "Scroll" label
    const past = sec.progress > A + 0.01;
    if (past && labelShown) { labelShown = false; label.animateOut(); }
    else if (!past && !labelShown) { labelShown = true; label.animateIn(); }
  }

  async function enter() {
    const tl = gsap.timeline();
    tl.to(ctas, { opacity: 0, y: 10, duration: 0.35, ease: 'power2.in' }, 0);
    const b = root.querySelector('.branding');
    const tag = b.querySelector('.branding__tagline');
    const paths = [...b.querySelectorAll('.branding__capitolium path')];
    tag && tl.to(tag, { opacity: 0, y: -8, duration: 0.3, ease: 'power2.in' }, 0);
    paths.length && tl.to(paths, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', stagger: 0.03 }, 0.05);
    tl.to(b.querySelector('.branding__logos__nike'), { x: '100%', duration: 0.5, ease: 'power4.in' }, 0.1);
    tl.to(b.querySelector('.branding__logos__st'), { y: '-100%', duration: 0.6, ease: 'power4.in' }, 0.15);
    tl.to(b.querySelector('.branding__logos__tfc'), { y: '100%', duration: 0.6, ease: 'power4.in' }, 0.15);
    scrubVideo.muted = true;
    scrubVideo.play?.().then(() => { scrubVideo.pause(); scrubVideo.currentTime = 0; }).catch(() => { scrubVideo.currentTime = 0; });
    tl.to(introVideoWrap, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0.3);
    await tl;
    introVideo.pause?.();
    gsap.set(introVideoWrap, { display: 'none' });
    gsap.set(intro, { display: 'none' });
    open = true;
    textBox.classList.add('hero__text--visible');
    set('hero-text-open', true);
    set('hero-entered', true);
    scroll.start();
    requestAnimationFrame(() => label.animateIn());
  }

  ctas.querySelector('button').addEventListener('click', () => enter());
  window.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !open && loading.isLoaded) enter(); });
  window.addEventListener('resize', () => { if (window.innerWidth !== vw) { vw = window.innerWidth; vh = window.innerHeight; update(); } }, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(() => { vw = window.innerWidth; vh = window.innerHeight; update(); }, 350), { passive: true });
  scroll.watch(update);

  on('hero-reset', () => {
    gsap.killTweensOf([videoWrap, scrubVideo, textEl, anims]);
    gsap.set(videoWrap, { clearProps: 'scale' });
    gsap.set(textEl, { clearProps: 'opacity' });
    gsap.set(anims, { clearProps: 'y' });
    textChars.forEach((el) => (el.style.color = 'rgba(240, 227, 207, 0.24)'));
    lastP = -1;
  });

  // Deep link: skip the intro.
  if (location.hash) {
    open = true;
    textBox.classList.add('hero__text--visible');
    introVideoWrap.style.display = 'none';
    intro.style.display = 'none';
    set('hero-text-open', true);
    set('hero-entered', true);
    return;
  }
  const count = (h.intro.video ? 1 : 0) + (h.scroll.video ? 1 : 0);
  loading.requireVideos(Math.max(1, count));
  if (h.intro.video) introVideo.addEventListener('canplaythrough', () => loading.onVideoReady(), { once: true });
  if (h.scroll.video) scrubVideo.addEventListener('canplaythrough', () => loading.onVideoReady(), { once: true });
  gsap.set(labelChars, { opacity: 0, y: 6 });
  brand.play();
  loading.onLoaded(() => {
    ctas.style.pointerEvents = 'all';
    gsap.fromTo(ctas, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  });
}
