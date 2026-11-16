import './styles/main.css';
import './styles/overrides.css';
import './styles/v2.css';
import './styles/collections.css';
import { mountSwitcher } from './js/ui-version.js';
import content from './js/site.js';
import { scroll, setVh } from './js/core/scroll.js';
import { set } from './js/core/store.js';
import { loaderHTML, initLoader, initScrollThumb, navHTML, initNav, initMobileLandscape } from './js/components/shell.js';
import { heroHTML, initHero } from './js/components/hero.js';
import { shirtsHTML, initShirts } from './js/components/shirts.js';
import { storyHTML, initStory } from './js/components/story.js';
import {
  filmHTML, initFilm, collectionHTML, initCollection, weekendHTML, initWeekend,
  mediasHTML, initMedias, shopsHTML, initShops, footerHTML,
} from './js/components/blocks.js';
import { esc } from './js/core/utils.js';
import { collectionsHTML, initCollections } from './js/components/collections.js';

const slug = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Page composition — reorder / remove blocks here.
const blocks = [
  { key: 'shirts', html: shirtsHTML, init: initShirts, nav: false },
  { key: 'story', html: (d) => storyHTML(d, content.tagline), init: initStory, nav: true },
  { key: 'video', html: filmHTML, init: initFilm, nav: false },
  { key: 'collection', html: collectionHTML, init: initCollection, nav: true },
  { key: 'collections', html: collectionsHTML, init: initCollections, nav: true },
  { key: 'weekend', html: weekendHTML, init: initWeekend, nav: true },
  { key: 'medias', html: mediasHTML, init: initMedias, nav: true },
  { key: 'shops', html: shopsHTML, init: initShops, nav: true },
];

setVh();
document.title = content.seo.title;
const app = document.getElementById('app');
app.innerHTML = `
  <div class="mobile-landscape-root"></div>
  ${loaderHTML()}
  <div class="scroll-thumb"></div>
  ${navHTML(content)}
  <main>
    <h1 class="sr-only">${esc(content.seo.title)}</h1>
    ${heroHTML(content, content.tagline)}
    ${blocks.map((b) => `<div id="${b.key}" data-block="${b.key}">${b.html(content[b.key])}</div>`).join('')}
    ${footerHTML(content.footer)}
  </main>`;

scroll.init();
window.addEventListener('orientationchange', () => setTimeout(setVh, 300), { passive: true });
if (!/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) window.addEventListener('resize', setVh, { passive: true });
document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false, capture: true });

initMobileLandscape(app.querySelector('.mobile-landscape-root'));
initLoader(app.querySelector('.loader'));
initScrollThumb(app.querySelector('.scroll-thumb'));
initHero(app.querySelector('.hero'), content);
blocks.forEach((b) => {
  const wrap = app.querySelector(`[data-block="${b.key}"]`);
  b.init(wrap.firstElementChild, content[b.key]);
});
initNav(app, blocks.filter((b) => b.nav).map((b) => ({ label: content[b.key].label, id: b.key })), { onHome: () => set('hero-reset', Date.now()) });

// ImageOptimized behaviour: pictures fade in once their image has loaded.
document.querySelectorAll('picture img').forEach((im) => {
  const done = () => im.classList.add('is-loaded');
  im.complete && im.naturalWidth ? done() : im.addEventListener('load', done, { once: true });
});

mountSwitcher();
