// "The Pieces" — the full product catalogue on the V1/V2 home page.
// Reuses the collection cards' scroll grow-in + circular cursor; hover swaps
// the packshot for the model shot; category chips filter the grid.
import products, { formatPrice } from '../products.js';
import { observe } from '../core/sections.js';
import { esc } from '../core/utils.js';
import { t, LANG } from '../i18n.js';
import { bgMarble, initMarble, mouseFollower } from './common.js';
import { growCards } from './collections.js';

const all = LANG === 'ko' ? '전체' : 'All';

function card(p, i) {
  const media = `<div class="col-card__media piece__media"><img src="${esc(p.images[0].src)}" alt="${esc(p.images[0].alt)}" loading="lazy" decoding="async"><img class="piece__alt" src="${esc(p.images[1].src)}" alt="" loading="lazy" decoding="async"></div>`;
  return `<a class="col-card piece" href="/product.html?p=${p.slug}" data-cat="${esc(p.category)}">
    ${mouseFollower({ content: media, label1: t('explore'), label2: p.name, icon: 'IconPlus', blend: true, cls: 'col-card__follower' })}
    <div class="col-card__meta">
      <span class="col-card__num">${String(i + 1).padStart(2, '0')}</span>
      <span class="col-card__ko">${esc(p.korean)}</span>
      <span class="col-card__name">${esc(p.name)}</span>
      <span class="col-card__line">${esc(p.category)} · ${p.colors.length} ${LANG === 'ko' ? '컬러' : 'colours'}</span>
      <span class="col-card__season">${formatPrice(p.price)}</span>
    </div>
  </a>`;
}

export function piecesHTML(d) {
  const cats = [...new Set(products.map((p) => p.category))];
  return `<section class="block-cols block-pieces">
    ${bgMarble({ bgColor: 'light-gold' })}
    <div class="block-cols__head">
      <span class="block-cols__lines"></span>
      <h2 class="block-cols__title">${esc(d.title)}</h2>
      <p class="block-cols__intro body-s-style">${esc(d.intro)}</p>
      <div class="pieces__filters">${[['*', all, products.length], ...cats.map((c) => [c, c, products.filter((p) => p.category === c).length])].map(([v, l, n], i) => `<button type="button" data-cat="${esc(v)}" class="${i ? '' : 'is-on'}">${esc(l)}<sup>${n}</sup></button>`).join('')}</div>
      <span class="block-cols__lines"></span>
    </div>
    <div class="block-cols__grid">${products.map(card).join('')}</div>
  </section>`;
}

export function initPieces(root, d) {
  observe(root, d.label);
  root.querySelectorAll(':scope > .bg-marble').forEach((m) => initMarble(m));
  const cards = [...root.querySelectorAll('.piece')];
  growCards(cards);
  root.querySelectorAll('.pieces__filters button').forEach((b) => b.addEventListener('click', () => {
    root.querySelectorAll('.pieces__filters button').forEach((x) => x.classList.toggle('is-on', x === b));
    cards.forEach((c) => { c.hidden = b.dataset.cat !== '*' && c.dataset.cat !== b.dataset.cat; });
    window.dispatchEvent(new Event('resize'));
  }));
}
