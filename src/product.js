// Product detail page — same motion language as the home page:
// Lenis smooth scroll, marble backgrounds, letter-rise titles, grow-in media,
// circular mouse-follower cursors, script marquee driven by scroll.
import './styles/main.css';
import './styles/overrides.css';
import './styles/product.css';
import './styles/v2.css';
import './styles/collections.css';
import { mountSwitcher } from './js/ui-version.js';
import gsap from 'gsap';
import content from './js/site.js';
import products, { formatPrice } from './js/products.js';
import { scroll, setVh } from './js/core/scroll.js';
import { set } from './js/core/store.js';
import { navHTML, initNav, initScrollThumb } from './js/components/shell.js';
import {
  bgMarble, initMarble, buttonPrimary, mouseFollower, initMouseFollower,
  chapterTitle, initChapterTitle,
} from './js/components/common.js';
import { footerHTML, createModal } from './js/components/blocks.js';
import { esc, range, isTablet } from './js/core/utils.js';
import { icon } from './js/icons.js';
import { t } from './js/i18n.js';

const slug = new URLSearchParams(location.search).get('p') || products[0].slug;
const product = products.find((p) => p.slug === slug) || products[0];
const others = products.filter((p) => p !== product);
document.title = `${product.name} — ONDO 온도`;
setVh();

const letters = (txt, cls) => txt.split(' ').map((w) => `<span class="pdp__title__word">${[...w].map((c) => `<span class="${cls}"><span>${esc(c)}</span></span>`).join('')}</span>`).join(' ');

const app = document.getElementById('app');
app.innerHTML = `
  <div class="scroll-thumb"></div>
  ${navHTML(content)}
  <div class="pdp-bag-pill" aria-live="polite"><span>${t('bag')}</span><b>0</b></div>
  <main class="pdp">
    ${bgMarble({ bgColor: 'light-gold' })}
    <section class="pdp__main">
      <div class="pdp__gallery">
        ${product.images.map((im, i) => `<figure class="pdp__figure pdp__figure--${i === 0 ? 'packshot' : 'look'}"><div class="pdp__figure__clip"><img src="${esc(im.src)}" alt="${esc(im.alt)}" decoding="async" ${i < 2 ? 'loading="eager"' : 'loading="lazy"'}></div></figure>`).join('')}
      </div>
      <aside class="pdp__info">
        <div class="pdp__info__inner">
          <nav class="pdp__crumbs pdp-reveal"><a href="/">ONDO</a><span>/</span><a href="/#collection">${esc(product.category)}</a></nav>
          <div class="pdp__korean pdp-reveal">${esc(product.korean)}<small>${esc(product.meaning)}</small></div>
          <h1 class="pdp__title">${letters(product.name, 'pdp__title__char')}</h1>
          <p class="pdp__price pdp-reveal">${formatPrice(product.price)}</p>
          <span class="pdp__rule pdp-reveal"></span>
          <p class="pdp__desc body-s-style pdp-reveal">${esc(product.description)}</p>
          <div class="pdp__opt pdp-reveal">
            <div class="pdp__opt__label">${t('colour')} <b class="pdp__color-name">${esc(product.colors[0].name)}</b></div>
            <div class="pdp__swatches">${product.colors.map((c, i) => `<button class="pdp__swatch${i === 0 ? ' is-active' : ''}" style="--sw:${c.hex}" data-name="${esc(c.name)}" aria-label="${esc(c.name)}"></button>`).join('')}</div>
          </div>
          <div class="pdp__opt pdp-reveal">
            <div class="pdp__opt__label">${t('size')} <button class="pdp__guide" type="button">${t('sizeGuide')}</button></div>
            <div class="pdp__sizes">${product.sizes.map((s) => `<button class="pdp__size" type="button">${esc(s)}</button>`).join('')}</div>
          </div>
          <div class="pdp__cta pdp-reveal">${buttonPrimary({ label: t('addToBag'), variant: 'cta-gray', tag: 'button' })}<p class="pdp__hint">${t('selectSize')}</p></div>
          <div class="pdp__acc pdp-reveal">
            ${[[t('details'), `<ul>${product.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>`], [t('care'), `<p>${esc(product.care)}</p>`], [t('shipping'), `<p>${t('shippingText')}</p>`]]
              .map(([t, b], i) => `<div class="pdp__acc__item${i === 0 ? ' is-open' : ''}"><button class="pdp__acc__head" type="button">${t}<span class="pdp__acc__icon">${icon.plus()}</span></button><div class="pdp__acc__body"><div class="pdp__acc__content">${b}</div></div></div>`).join('')}
          </div>
        </div>
      </aside>
    </section>

    <section class="pdp__marquee">${chapterTitle(`${product.name.split(' ')[0]} ${product.korean}`)}</section>

    <section class="pdp__related">
      <div class="pdp__related__head"><span class="pdp__related__line"></span><h2>${t('wornWith')}</h2><span class="pdp__related__line"></span></div>
      <div class="pdp__related__grid">
        ${others.map((p) => `<a class="pdp__card" href="/product.html?p=${p.slug}">${mouseFollower({ content: `<div class="pdp__card__media"><img src="${esc(p.images[1].src)}" alt="${esc(p.name)}" loading="lazy"></div>`, label1: t('view'), label2: t('theProduct'), icon: 'IconPlus', blend: true })}<div class="pdp__card__meta"><span>${esc(p.name)} <i>${esc(p.korean)}</i></span><span>${formatPrice(p.price)}</span></div></a>`).join('')}
      </div>
    </section>
    ${footerHTML(content.footer)}
  </main>`;

/* ------------------------------------------------------------ shell */
scroll.init();
set('hero-text-open', true);
initScrollThumb(app.querySelector('.scroll-thumb'));
initNav(app, [['story', content.story.label], ['collections', t('collections')], ['collection', content.collection.label], ['weekend', content.weekend.label], ['medias', content.medias.label], ['shops', content.shops.label]].map(([id, label]) => ({ id, label })), { external: true });
app.querySelectorAll('.bg-marble').forEach((m) => initMarble(m));

/* ------------------------------------------------------- intro motion */
const titleChars = [...app.querySelectorAll('.pdp__title__char > span')];
gsap.set(titleChars, { yPercent: 110 });
gsap.set('.pdp-reveal', { opacity: 0, y: 15 });
gsap.set('.pdp__figure__clip', { clipPath: 'inset(12% 12% 12% 12%)' });
gsap.set('.pdp__figure img', { scale: 1.35 });
const intro = gsap.timeline({ delay: 0.15 });
intro.to(titleChars, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.03 });
intro.to('.pdp-reveal', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06 }, '<0.2');

/* ------------------------------------------- gallery grow-in on scroll */
const figs = [...app.querySelectorAll('.pdp__figure')];
const growFig = () => {
  const vh = window.innerHeight;
  figs.forEach((f, i) => {
    const r = f.getBoundingClientRect();
    // 0 when the figure's top hits the bottom of the viewport, 1 once it is 55% up the screen
    const t = i === 0 ? Math.max(range(vh - r.top, 0, vh * 0.25), intro.progress()) : range(vh - r.top, 0, vh * 0.55);
    const e = 1 - Math.pow(1 - t, 3);
    const inset = 12 * (1 - e);
    f.firstElementChild.style.clipPath = `inset(${inset}% ${inset}% ${inset}% ${inset}%)`;
    f.querySelector('img').style.transform = `scale(${1.35 - 0.35 * e})`;
  });
};
gsap.ticker.add(growFig);

/* --------------------------------------------------------- options */
const colorName = app.querySelector('.pdp__color-name');
app.querySelectorAll('.pdp__swatch').forEach((b) => b.addEventListener('click', () => {
  app.querySelectorAll('.pdp__swatch').forEach((x) => x.classList.toggle('is-active', x === b));
  gsap.to(colorName, { opacity: 0, y: -6, duration: 0.2, ease: 'power2.in', onComplete: () => { colorName.textContent = b.dataset.name; gsap.fromTo(colorName, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }); } });
}));
let size = null;
const hint = app.querySelector('.pdp__hint');
app.querySelectorAll('.pdp__size').forEach((b) => b.addEventListener('click', () => {
  size = b.textContent;
  app.querySelectorAll('.pdp__size').forEach((x) => x.classList.toggle('is-active', x === b));
  hint.textContent = t('sizeSelected', { s: size });
  hint.classList.remove('is-error');
}));
app.querySelectorAll('.pdp__acc__head').forEach((h) => h.addEventListener('click', () => {
  const item = h.parentElement, body = item.querySelector('.pdp__acc__body');
  const open = !item.classList.contains('is-open');
  item.classList.toggle('is-open', open);
  gsap.to(body, { height: open ? 'auto' : 0, duration: 0.5, ease: 'power3.inOut', onComplete: () => scroll.resize() });
}));
app.querySelectorAll('.pdp__acc__item:not(.is-open) .pdp__acc__body').forEach((b) => gsap.set(b, { height: 0 }));

/* ------------------------------------------------------------ bag */
const pill = app.querySelector('.pdp-bag-pill');
const bagModal = createModal({ align: 'right' });
let bag = [];
try { bag = JSON.parse(localStorage.getItem('ondo-bag') || '[]'); } catch { bag = []; }
const renderPill = () => { pill.querySelector('b').textContent = String(bag.length); pill.classList.toggle('is-visible', bag.length > 0); };
renderPill();
const bagHTML = () => `<div class="pdp-bag"><span class="h4-style">${t('yourBag')}</span>${bag.length ? bag.map((b) => `<div class="pdp-bag__row"><img src="${esc(b.img)}" alt=""><div><b>${esc(b.name)}</b><span>${esc(b.color)} · ${esc(b.size)}</span><span>${formatPrice(b.price)}</span></div></div>`).join('') + `<div class="pdp-bag__total"><span>${t('total')}</span><b>${formatPrice(bag.reduce((a, b) => a + b.price, 0))}</b></div>${buttonPrimary({ label: t('checkout'), variant: 'cta-gray', tag: 'button' })}` : `<p class="body-s-style">${t('empty')}</p>`}</div>`;
pill.addEventListener('click', () => bagModal.open(true, bagHTML()));
app.querySelector('.pdp__cta .btn-primary').addEventListener('click', () => {
  if (!size) {
    hint.textContent = t('pleaseSelect');
    hint.classList.add('is-error');
    gsap.fromTo('.pdp__sizes', { x: -6 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    return;
  }
  bag.push({ slug: product.slug, name: product.name, size, color: colorName.textContent, price: product.price, img: product.images[0].src });
  try { localStorage.setItem('ondo-bag', JSON.stringify(bag)); } catch { /* storage unavailable */ }
  renderPill();
  gsap.fromTo(pill, { scale: 0.85 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  bagModal.open(true, bagHTML());
});

/* ------------------------------------------------ related + marquee */
app.querySelectorAll('.pdp__card .mouse-follower').forEach((m) => initMouseFollower(m, { reveal: true }));
const marquee = app.querySelector('.pdp__marquee');
const title = initChapterTitle(marquee.querySelector('.chapter-title'), `${product.name.split(' ')[0]} ${product.korean}`, 0.6);
scroll.watch(() => {
  const r = marquee.getBoundingClientRect(), vh = window.innerHeight;
  const p = range(vh - r.top, 0, vh + r.height);
  p < 0.35 ? title.reveal(p / 0.35) : title.setScrollX((p - 0.35) / 0.65);
});
title.reveal(0);

// ImageOptimized behaviour shared with the home page
document.querySelectorAll('picture img').forEach((im) => {
  const done = () => im.classList.add('is-loaded');
  im.complete && im.naturalWidth ? done() : im.addEventListener('load', done, { once: true });
});
void isTablet;

mountSwitcher();
