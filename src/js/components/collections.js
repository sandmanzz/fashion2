// "Collections" index on the home page: 8 cards that open with the same
// clip/scale grow-in as the rest of the site, with the circular cursor on hover.
import gsap from 'gsap';
import collections from '../collections.js';
import { observe } from '../core/sections.js';
import { range, esc } from '../core/utils.js';
import { t } from '../i18n.js';
import { bgMarble, initMarble, mouseFollower, initMouseFollower } from './common.js';

export function colCard(c, i) {
  const media = `<div class="col-card__media"><img src="${esc(c.cover)}" alt="${esc(c.name)}" loading="lazy" decoding="async"></div>`;
  return `<a class="col-card" href="/collection.html?c=${c.slug}">
    ${mouseFollower({ content: media, label1: t('explore'), label2: c.name, icon: 'IconPlus', blend: true, cls: 'col-card__follower' })}
    <div class="col-card__meta">
      <span class="col-card__num">${String(i + 1).padStart(2, '0')}</span>
      <span class="col-card__ko">${esc(c.korean)}</span>
      <span class="col-card__name">${esc(c.name)}</span>
      <span class="col-card__line">${esc(c.line)}</span>
      <span class="col-card__season">${esc(c.season)}</span>
    </div>
  </a>`;
}

export function collectionsHTML(d) {
  return `<section class="block-cols">
    ${bgMarble({ bgColor: 'light-gold' })}
    <div class="block-cols__head">
      <span class="block-cols__lines"></span>
      <h2 class="block-cols__title">${esc(d.title)}</h2>
      <p class="block-cols__intro body-s-style">${esc(d.intro)}</p>
      <span class="block-cols__lines"></span>
    </div>
    <div class="block-cols__grid">${collections.map(colCard).join('')}</div>
  </section>`;
}

/** Reusable scroll-driven grow-in for a list of card elements. */
export function growCards(cards) {
  cards.forEach((c) => { gsap.set(c.querySelector('.col-card__media'), { clipPath: 'inset(14% 14% 14% 14%)' }); gsap.set(c.querySelector('img'), { scale: 1.4 }); });
  const tick = () => {
    const vh = window.innerHeight;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const tt = range(vh - r.top - (i % 4) * 40, 0, vh * 0.6);
      const e = 1 - Math.pow(1 - tt, 3), inset = 14 * (1 - e);
      c.querySelector('.col-card__media').style.clipPath = `inset(${inset}% ${inset}% ${inset}% ${inset}%)`;
      c.querySelector('img').style.transform = `scale(${1.4 - 0.4 * e})`;
      c.querySelector('.col-card__meta').style.opacity = String(range(tt, 0.4, 1));
    });
  };
  gsap.ticker.add(tick);
  cards.forEach((c) => initMouseFollower(c.querySelector('.mouse-follower'), { reveal: true }));
}

export function initCollections(root, d) {
  observe(root, d.label);
  root.querySelectorAll(':scope > .bg-marble').forEach((m) => initMarble(m));
  growCards([...root.querySelectorAll('.col-card')]);
}
