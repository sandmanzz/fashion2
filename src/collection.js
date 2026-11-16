// Collection page: hero (Korean word over a growing cover), story, the pieces,
// and the other seven collections. Same motion language as home + PDP.
import './styles/main.css';
import './styles/overrides.css';
import './styles/product.css';
import './styles/v2.css';
import './styles/collections.css';
import gsap from 'gsap';
import content from './js/site.js';
import collections from './js/collections.js';
import products, { formatPrice } from './js/products.js';
import { scroll, setVh } from './js/core/scroll.js';
import { set } from './js/core/store.js';
import { navHTML, initNav, initScrollThumb } from './js/components/shell.js';
import { bgMarble, initMarble, mouseFollower, initMouseFollower, chapterTitle, initChapterTitle } from './js/components/common.js';
import { footerHTML } from './js/components/blocks.js';
import { colCard, growCards } from './js/components/collections.js';
import { esc, range } from './js/core/utils.js';
import { t } from './js/i18n.js';
import { mountSwitcher } from './js/ui-version.js';

const slug = new URLSearchParams(location.search).get('c') || collections[0].slug;
const idx = Math.max(0, collections.findIndex((c) => c.slug === slug));
const col = collections[idx];
const pieces = products.filter((p) => p.collections.includes(col.slug));
const others = collections.filter((c) => c !== col);
document.title = `${col.korean} ${col.name} — ONDO 온도`;
setVh();

const app = document.getElementById('app');
app.innerHTML = `
  <div class="scroll-thumb"></div>
  ${navHTML(content)}
  <main class="pdp colp">
    ${bgMarble({ bgColor: 'light-gold' })}
    <section class="colp__hero">
      <div class="colp__hero__media"><img src="${esc(col.cover)}" alt="${esc(col.name)}"></div>
      <div class="colp__hero__text">
        <span class="colp__eyebrow">${t('collection')} ${String(idx + 1).padStart(2, '0')} / 08 · ${esc(col.season)}</span>
        <h1 class="colp__ko">${[...col.korean].map((ch) => `<span><span>${esc(ch)}</span></span>`).join('')}</h1>
        <p class="colp__name">${esc(col.name)}</p>
      </div>
    </section>
    <section class="colp__story">
      <span class="pdp__rule"></span>
      <p class="colp__line">${esc(col.line)}</p>
      <p class="colp__body body-s-style">${esc(col.story)}</p>
    </section>
    <section class="pdp__related">
      <div class="pdp__related__head"><span class="pdp__related__line"></span><h2>${t('pieces')}</h2><span class="pdp__related__line"></span></div>
      <div class="pdp__related__grid">
        ${pieces.map((p) => `<a class="pdp__card" href="/product.html?p=${p.slug}">${mouseFollower({ content: `<div class="pdp__card__media"><img src="${esc(p.images[1].src)}" alt="${esc(p.name)}" loading="lazy"></div>`, label1: t('view'), label2: t('theProduct'), icon: 'IconPlus', blend: true })}<div class="pdp__card__meta"><span>${esc(p.name)} <i>${esc(p.korean)}</i></span><span>${formatPrice(p.price)}</span></div></a>`).join('')}
        <div class="colp__soon"><span>${esc(col.korean)}</span><p>${t('comingSoon')}</p></div>
      </div>
    </section>
    <section class="pdp__marquee">${chapterTitle(`${col.korean} ${col.name}`)}</section>
    <section class="colp__others">
      <div class="pdp__related__head"><span class="pdp__related__line"></span><h2>${t('otherCollections')}</h2><span class="pdp__related__line"></span></div>
      <div class="block-cols__grid block-cols__grid--strip">${others.map((c) => colCard(c, collections.indexOf(c))).join('')}</div>
    </section>
    ${footerHTML(content.footer)}
  </main>`;

scroll.init();
set('hero-text-open', true);
initScrollThumb(app.querySelector('.scroll-thumb'));
initNav(app, [['story', content.story.label], ['collections', content.collections.label], ['collection', content.collection.label], ['weekend', content.weekend.label], ['medias', content.medias.label], ['shops', content.shops.label]].map(([id, label]) => ({ id, label })), { external: true });
app.querySelectorAll('.bg-marble').forEach((m) => initMarble(m));

// intro: Korean word rises, cover opens
const chars = [...app.querySelectorAll('.colp__ko > span > span')];
gsap.set(chars, { yPercent: 110 });
gsap.set('.colp__eyebrow, .colp__name, .colp__story > *', { opacity: 0, y: 15 });
const media = app.querySelector('.colp__hero__media');
gsap.set(media, { clipPath: 'inset(18% 30% 18% 30%)' });
gsap.set(media.querySelector('img'), { scale: 1.3 });
const tl = gsap.timeline({ delay: 0.1 });
tl.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' });
tl.to(media.querySelector('img'), { scale: 1, duration: 1.6, ease: 'power3.out' }, '<');
tl.to(chars, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.08 }, '<0.5');
tl.to('.colp__eyebrow, .colp__name, .colp__story > *', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06 }, '<0.3');
// hero parallax: text drifts up as you leave
scroll.watch(({ scroll: y }) => {
  const p = range(y, 0, window.innerHeight);
  gsap.set('.colp__hero__text', { y: -p * 120 });
  gsap.set(media.querySelector('img'), { yPercent: p * 12 });
});

app.querySelectorAll('.pdp__card .mouse-follower').forEach((m) => initMouseFollower(m, { reveal: true }));
growCards([...app.querySelectorAll('.col-card')]);
const marquee = app.querySelector('.pdp__marquee');
const title = initChapterTitle(marquee.querySelector('.chapter-title'), `${col.korean} ${col.name}`, 0.6);
scroll.watch(() => {
  const r = marquee.getBoundingClientRect(), vh = window.innerHeight;
  const p = range(vh - r.top, 0, vh + r.height);
  p < 0.35 ? title.reveal(p / 0.35) : title.setScrollX((p - 0.35) / 0.65);
});
title.reveal(0);
mountSwitcher();
