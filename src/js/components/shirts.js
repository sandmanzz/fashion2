// Product reveal: two products on pedestals rising through the headline (parallax).
import gsap from 'gsap';
import { scroll } from '../core/scroll.js';
import { observe } from '../core/sections.js';
import { isTablet, esc, zoomed } from '../core/utils.js';
import { icon } from '../icons.js';
import { bgMarble, initMarble, video } from './common.js';

export function shirtsHTML(d) {
  const items = d.shirts.map((s) => `<div class="block-shirts__media__wrapper__item">
      ${s.video ? video({ src: s.video, poster: s.image, cls: 'shirt', autoplay: true, loop: true }) : `<picture class="shirt"><img src="${esc(s.image)}" width="1500" height="1500" loading="eager" decoding="async" alt=""></picture>`}
      <picture class="column"><img src="${esc(s.column)}" width="735" height="1371" alt="" loading="eager" decoding="async"></picture>
    </div>`).join('');
  return `<section class="block-shirts">
  <div class="block-shirts__wrapper">
    <div class="block-shirts__inner">
      <div class="block-shirts__inner__logo">${icon.logoA()}</div>
      <h2 class="block-shirts__inner__title">${esc(d.title)}</h2>
      <div class="block-shirts__inner__logo">${icon.logoB()}</div>
    </div>
    ${bgMarble({ bgColor: 'dark-gray' })}
    <div class="block-shirts__scroll"><div class="block-shirts__media"><div class="block-shirts__media__wrapper">${items}</div></div></div>
  </div>
</section>`;
}

export function initShirts(root, d) {
  const sec = observe(root, d.label);
  const wrapper = root.querySelector('.block-shirts__wrapper');
  const media = root.querySelector('.block-shirts__media__wrapper');
  initMarble(root.querySelector('.bg-marble'));
  let vh = window.innerHeight, vw = window.innerWidth;
  const qMedia = gsap.quickTo(media, 'y', { duration: 0.6, ease: 'power3.out' });
  const qWrap = gsap.quickTo(wrapper, 'y', { duration: 0.3, ease: 'power3.out' });
  const update = () => {
    if (!sec.active) return;
    const p = sec.progress;
    const k = isTablet() ? 0.25 : 0.6;
    const y = (0.5 - Math.pow(p, 0.4)) * vh * k;
    isTablet() ? gsap.set(media, { y }) : qMedia(y);
    if (!isTablet()) qWrap(Math.min(1, Math.max(0, (p - 0.5) / 0.5)) * vh * 0.66);
  };
  scroll.watch(update);
  window.addEventListener('resize', () => {
    if (zoomed() || window.innerWidth === vw) return;
    vw = window.innerWidth; vh = window.innerHeight;
    if (isTablet()) gsap.set(wrapper, { y: 0 });
    update();
  }, { passive: true });
  const vids = () => [...wrapper.querySelectorAll('video')];
  new IntersectionObserver(([e]) => (e.isIntersecting ? vids().forEach((v) => v.play().catch(() => {})) : vids().forEach((v) => v.pause())), { threshold: 0.1 }).observe(wrapper);
}
