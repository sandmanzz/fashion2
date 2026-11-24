// ===========================================================================
// ONDO V3 — "Atelier" homepage.
// The page follows one garment through the workroom: cloth → cut → sewn →
// worn → repaired. Native scroll (no scroll-jacking, no pinned horizontal
// tracks); each station has its own interaction instead of one repeated
// grow-in effect. Signature: a stitch line that is sewn as you scroll.
// ===========================================================================
const font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=IBM+Plex+Mono:wght@400;500&display=swap';
document.head.appendChild(font);
import { LANG } from '../js/i18n.js';
import { mountSwitcher } from '../js/ui-version.js';
import products, { formatPrice } from '../js/products.js';
import collections from '../js/collections.js';
import { esc } from '../js/core/utils.js';
import { scroll, setVh } from '../js/core/scroll.js';

const T = (en, ko) => (LANG === 'ko' ? ko : en);
const ko = LANG === 'ko';

const STATIONS = [
  { id: 'cloth', n: '01', k: '원단', en: 'Cloth', ko: '원단' },
  { id: 'cut', n: '02', k: '재단', en: 'Cut', ko: '재단' },
  { id: 'sewn', n: '03', k: '봉제', en: 'Sewn', ko: '봉제' },
  { id: 'worn', n: '04', k: '착용', en: 'Worn', ko: '착용' },
  { id: 'repair', n: '05', k: '수선', en: 'Repaired', ko: '수선' },
];

const SWATCHES = [
  ['twill', '12oz cotton twill', '12oz 코튼 트윌', 'Gyeol Chore Jacket'],
  ['oxford', 'Brushed oxford', '기모 옥스퍼드', 'Bit Oxford Shirt'],
  ['topstitch', 'Brown topstitch, 8 spi', '브라운 스티치, 8 spi', 'Every seam'],
  ['corozo', 'Corozo nut buttons', '코로조 너트 단추', 'From tagua palms'],
  ['piping', 'Black piping', '블랙 파이핑', 'Placket & cuffs'],
  ['bartack', 'Bartack, 42 stitches', '바택, 42땀', 'Stress points'],
];

const LOOKS = ['01-hero-street', '03-woman-office', '04-man-hanok', '08-man-stairs', '07-woman-gallery', '10-rooftop', '02-store-entrance', '09-group'];

const stationHead = (s, title, lead) => `
  <header class="st-head">
    <div class="st-head__no"><span>${s.n}</span><i></i><b lang="ko">${s.k}</b></div>
    <h2 class="st-head__title">${title}</h2>
    <p class="st-head__lead">${lead}</p>
  </header>`;

const cats = [...new Set(products.map((p) => p.category))];

const html = `
<div class="v3">
  <svg class="v3-thread" aria-hidden="true"><path class="v3-thread__path" /></svg>

  <header class="v3-bar">
    <a class="v3-bar__logo" href="?ui=v3"><img src="/brand/ondo-logo.svg" alt="ONDO 온도"></a>
    <nav class="v3-bar__nav">${STATIONS.map((s) => `<a href="#${s.id}" data-st="${s.id}"><span>${s.n}</span>${ko ? s.ko : s.en}</a>`).join('')}</nav>
    <a class="v3-bar__bag" href="/product.html?p=${products[0].slug}">${T('Bag', '장바구니')} <b class="v3-bag-count">0</b></a>
  </header>

  <aside class="v3-ruler" aria-hidden="true"><div class="v3-ruler__ticks"></div><div class="v3-ruler__cursor"><span>0</span>cm</div></aside>

  <section class="v3-hero">
    <div class="v3-hero__text">
      <p class="v3-eyebrow">${T('Workroom · Seongsu, Seoul', '작업실 · 서울 성수')}</p>
      <h1 class="v3-hero__title">
        <span class="line">${T('Cut in Seoul.', '서울에서 재단하고,')}</span>
        <span class="line">${T('Worn for years.', '오래 입고,')}</span>
        <span class="line em">${T('Repaired for life.', '평생 고쳐 입습니다.')}</span>
      </h1>
      <p class="v3-hero__sub">${T('Follow one garment through our atelier — from a bolt of cloth to its third repair.', '원단 한 필에서 세 번째 수선까지, 한 벌의 옷이 작업실을 지나는 길을 따라가 보세요.')}</p>
      <a class="v3-btn" href="#cloth">${T('Start at the cutting table', '재단대에서 시작하기')} ↓</a>
    </div>
    <figure class="v3-hero__media" data-speed="-0.12">
      <img src="/images/brand/06-atelier.webp" alt="${T('The ONDO atelier', '온도 작업실')}">
      <figcaption class="v3-tag v3-tag--pinned">
        <span class="v3-tag__hole"></span>
        <b>No. 0001</b><span>${T('Gyeol Chore Jacket', '결 초어 재킷')}</span><span>${T('Cut 03.11 · Sewn by J. Park', '재단 03.11 · 봉제 박지')}</span>
      </figcaption>
    </figure>
  </section>

  <section id="cloth" class="v3-st v3-cloth" data-station="cloth">
    ${stationHead(STATIONS[0], T('Start with cloth you can feel.', '손끝으로 느껴지는 원단에서 시작합니다.'), T('Every piece begins on this board. We pick heavy, honest materials that soften instead of wearing out.', '모든 옷은 이 보드에서 시작합니다. 닳기보다 부드러워지는, 무겁고 정직한 소재를 고릅니다.'))}
    <div class="swatch-board" data-drift>
      ${SWATCHES.map(([img, en, k, note], i) => `
        <figure class="swatch" style="--r:${[-2.5, 1.5, -1, 2.2, -1.8, 1][i]}deg">
          <span class="swatch__pin"></span>
          <div class="swatch__img"><img src="/images/materials/${img}.webp" alt="${esc(T(en, k))}" loading="lazy"></div>
          <figcaption><b>${esc(T(en, k))}</b><span>${esc(note)}</span></figcaption>
        </figure>`).join('')}
    </div>
  </section>

  <section id="cut" class="v3-st v3-cut" data-station="cut">
    ${stationHead(STATIONS[1], T('Eight patterns, one for every kind of day.', '여덟 개의 패턴, 하루하루를 위한.'), T('Our collections are cut like pattern pieces — each named by a single Korean word.', '컬렉션은 패턴 조각처럼 재단됩니다. 각각 하나의 한국어 단어로 이름 붙였습니다.'))}
    <div class="pattern-table">
      ${collections.map((c, i) => `
        <a class="pattern" href="/collection.html?c=${c.slug}" style="--i:${i}">
          <svg class="pattern__cut" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="98" rx="1" /></svg>
          <span class="pattern__no">${String(i + 1).padStart(2, '0')} / 08</span>
          <div class="pattern__img"><img data-inner src="${c.cover}" alt="" loading="lazy"></div>
          <div class="pattern__txt">
            <b lang="ko">${c.korean}</b>
            <span class="pattern__name">${esc(c.name)}</span>
            <span class="pattern__season">${esc(c.season)} · ${products.filter((p) => p.collections.includes(c.slug)).length} ${T('pieces', '피스')}</span>
          </div>
          <span class="pattern__scissors" aria-hidden="true">✂</span>
        </a>`).join('')}
    </div>
  </section>

  <section id="sewn" class="v3-st v3-sewn" data-station="sewn">
    ${stationHead(STATIONS[2], T('Off the machine, onto the rail.', '재봉틀에서 내려와 행거로.'), T(`${products.length} pieces, each with a name, a word and a maker. Drag the rail.`, `${products.length}개의 피스, 각각의 이름과 단어와 만든 이. 행거를 끌어보세요.`))}
    <div class="rail-filters" role="tablist">
      <button class="is-on" data-cat="*">${T('All', '전체')} <small>${products.length}</small></button>
      ${cats.map((c) => `<button data-cat="${esc(c)}">${esc(c)} <small>${products.filter((p) => p.category === c).length}</small></button>`).join('')}
    </div>
    <div class="rail">
      <div class="rail__bar"></div>
      <div class="rail__track">
        ${products.map((p, i) => `
          <a class="hanger" href="/product.html?p=${p.slug}" data-cat="${esc(p.category)}" style="--d:${(i % 5) * 0.4}s">
            <svg class="hanger__hook" viewBox="0 0 60 40" aria-hidden="true"><path d="M30 2c5 0 7 6 2 9-2 1-2 3-2 5M30 16L4 36h52z"/></svg>
            <div class="hanger__img"><img src="${p.images[0].src}" alt="${esc(p.images[0].alt)}" loading="lazy"><img class="alt" src="${p.images[1].src}" alt="" loading="lazy"></div>
            <div class="hanger__tag">
              <span class="hanger__k" lang="ko">${p.korean}</span>
              <b>${esc(p.name)}</b>
              <span>${esc(p.category)} · ${p.colors.length} ${T('colours', '컬러')}</span>
              <span class="hanger__price">${formatPrice(p.price)}</span>
            </div>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <section id="worn" class="v3-st v3-worn" data-station="worn">
    ${stationHead(STATIONS[3], T('Then it leaves the room.', '그리고 작업실을 떠납니다.'), T('Contact sheet from a week in Seoul. Click a frame.', '서울에서의 일주일, 밀착 인화지. 프레임을 눌러보세요.'))}
    <div class="contact" data-slide>
      <div class="contact__strip">${'<i></i>'.repeat(24)}</div>
      <div class="contact__grid">
        ${LOOKS.map((l, i) => `<button class="frame" style="--t:${[-1, 0.6, -0.4, 1.1, -0.8, 0.3, 0.9, -0.5][i]}deg"><img src="/images/brand/${l}.webp" alt="" loading="lazy"><span>${String(i + 12).padStart(2, '0')}A</span></button>`).join('')}
      </div>
      <div class="contact__strip">${'<i></i>'.repeat(24)}</div>
    </div>
  </section>

  <section id="repair" class="v3-st v3-repair" data-station="repair">
    ${stationHead(STATIONS[4], T('And it comes back. We fix it.', '그리고 돌아옵니다. 우리가 고칩니다.'), T('Every ONDO piece carries a lifetime repair promise. Drag to see five years of wear — and one afternoon at the bench.', '모든 온도의 옷에는 평생 수선 약속이 있습니다. 끌어서 5년의 시간과 작업대에서의 한나절을 비교해 보세요.'))}
    <div class="repair">
      <div class="compare" style="--x:50%">
        <img class="compare__a" src="/images/materials/jacket.webp" alt="${T('Jacket after five years of wear', '5년 착용 후의 재킷')}">
        <div class="compare__b"><img src="/images/materials/jacket.webp" alt="${T('The same jacket after repair', '수선 후의 같은 재킷')}"></div>
        <div class="compare__patch" aria-hidden="true"></div>
        <span class="compare__label compare__label--a">${T('Year 5 · worn', '5년차 · 착용')}</span>
        <span class="compare__label compare__label--b">${T('Repaired · 2h 40m', '수선 · 2시간 40분')}</span>
        <input class="compare__range" type="range" min="0" max="100" value="50" aria-label="${T('Compare worn and repaired', '착용과 수선 비교')}">
        <span class="compare__handle" aria-hidden="true">⇆</span>
      </div>
      <div class="repair__side">
        <ul class="counters">
          <li><b data-to="3812">0</b><span>${T('garments repaired since 2021', '2021년부터 수선한 옷')}</span></li>
          <li><b data-to="96">0</b><span>${T('% returned to their owner within 10 days', '% 10일 이내 주인에게 돌아감')}</span></li>
          <li><b data-to="0">0</b><span>${T('won — repairs are free, for life', '원 — 수선은 평생 무료')}</span></li>
        </ul>
        <form class="ticket">
          <div class="ticket__head"><b>${T('Repair ticket', '수선 접수증')}</b><span>No. <i class="ticket__no">—</i></span></div>
          <label>${T('Piece', '제품')}<select name="p">${products.map((p) => `<option>${esc(p.name)}</option>`).join('')}</select></label>
          <label>${T('What happened?', '어떤 문제인가요?')}<select name="w"><option>${T('Hole / tear', '구멍 / 찢어짐')}</option><option>${T('Lost button', '단추 분실')}</option><option>${T('Broken seam', '솔기 터짐')}</option><option>${T('Re-wax', '리왁싱')}</option></select></label>
          <button class="v3-btn" type="submit">${T('Book a repair', '수선 예약하기')}</button>
          <p class="ticket__ok" hidden>${T('Ticket issued. Bring it to the atelier, or post it with your piece.', '접수증이 발급되었습니다. 작업실로 가져오시거나 옷과 함께 보내주세요.')}</p>
        </form>
      </div>
    </div>
  </section>

  <footer class="v3-foot">
    <div class="care-label">
      <img src="/brand/ondo-logo.svg" alt="ONDO">
      <p>${T('Made in Seoul · Repaired for life', '서울 제작 · 평생 수선')}</p>
      <ul class="care-label__icons" aria-label="${T('Care symbols', '세탁 기호')}"><li>30°</li><li>△</li><li>▢</li><li>⊘</li><li>◯</li></ul>
      <p class="small">${T('ONDO Atelier · 12 Yeonmujang-gil, Seongdong-gu, Seoul · Tue–Sun 11–19', '온도 아틀리에 · 서울 성동구 연무장길 12 · 화–일 11–19시')}</p>
    </div>
  </footer>

  <dialog class="v3-lightbox"><img alt=""><button type="button">${T('Close', '닫기')}</button></dialog>
</div>`;

document.title = 'ONDO 온도 — Atelier';
document.getElementById('app').innerHTML = html;
const root = document.querySelector('.v3');
const $ = (s, el = root) => el.querySelector(s);
const $$ = (s, el = root) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- bag count (shared with product page)
try { $('.v3-bag-count').textContent = JSON.parse(localStorage.getItem('ondo-bag') || '[]').reduce((n, i) => n + (i.qty || 1), 0); } catch { /* ignore */ }

// ---- reveal on enter
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.18 });
$$('.st-head, .swatch, .pattern, .hanger, .frame, .repair, .v3-hero, .care-label').forEach((el) => io.observe(el));

// ---- active station in the bar
const stIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) $$('.v3-bar__nav a').forEach((a) => a.classList.toggle('is-on', a.dataset.st === e.target.dataset.station));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('[data-station]').forEach((s) => stIO.observe(s));

// ---- tailor's ruler: scroll progress in cm
const ticks = $('.v3-ruler__ticks');
ticks.innerHTML = Array.from({ length: 101 }, (_, i) => `<i class="${i % 10 === 0 ? 'l' : i % 5 === 0 ? 'm' : ''}">${i % 10 === 0 ? `<em>${i}</em>` : ''}</i>`).join('');
const cursor = $('.v3-ruler__cursor');

// ---- the thread: a stitch line that is sewn down the page as you scroll
const svg = $('.v3-thread');
const path = $('.v3-thread__path');
let len = 0; let samples = [];
function drawThread() {
  const h = root.scrollHeight; const w = innerWidth;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.style.height = `${h}px`;
  const anchors = [$('.v3-hero'), ...$$('[data-station]'), $('.v3-foot')];
  let d = `M ${w * 0.08} 0`;
  const top0 = root.getBoundingClientRect().top;
  const ys = anchors.map((el) => el.getBoundingClientRect().top - top0 + 40);
  anchors.forEach((el, i) => {
    const y = ys[i]; const x = i % 2 ? w * 0.94 : w * 0.06;
    const prevY = i ? ys[i - 1] : 0;
    const mid = (prevY + y) / 2;
    d += ` C ${i % 2 ? w * 0.06 : w * 0.94} ${mid}, ${x} ${mid}, ${x} ${y}`;
  });
  path.setAttribute('d', d);
  len = path.getTotalLength();
  path.style.strokeDasharray = `${len} ${len}`;
  samples = Array.from({ length: 401 }, (_, i) => { const l = (len * i) / 400; return [l, path.getPointAtLength(l).y]; });
  onScroll();
}

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? scrollY / max : 0;
  // the needle sits ~65% down the viewport: draw the thread up to that height
  const target = scrollY + innerHeight * 0.65;
  const hit = samples.find(([, y]) => y >= target);
  const drawn = hit ? hit[0] : len;
  path.style.strokeDashoffset = String(len - drawn);
  cursor.style.top = `${p * 100}%`;
  cursor.firstElementChild.textContent = Math.round(p * 100);
  root.style.setProperty('--p', p.toFixed(3));
}
addEventListener('scroll', onScroll, { passive: true });
// ---- scrollcraft: Lenis smooth scroll (same feel as V1/V2) drives everything
setVh();
scroll.init();
scroll.watch(onScroll);
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
  const el = document.querySelector(a.getAttribute('href'));
  if (!el) return;
  e.preventDefault();
  scroll.scrollTo(el, { offset: -60, duration: 1.6 });
}));

const speedEls = $$('[data-speed]');
const innerImgs = $$('[data-inner]');
const swatches = $$('[data-drift] .swatch');
const contact = $('[data-slide]');
const heroLines = $$('.v3-hero__title .line');
function parallax() {
  const vh = innerHeight;
  speedEls.forEach((el) => {
    const r = el.getBoundingClientRect();
    const c = r.top + r.height / 2 - vh / 2;
    el.style.transform = `translate3d(0, ${(c * +el.dataset.speed).toFixed(1)}px, 0)`;
  });
  // hero headline slides away line by line as you leave the hero
  const hp = Math.min(1, Math.max(0, scrollY / vh));
  heroLines.forEach((l, i) => { l.style.transform = `translate3d(${(-hp * 60 * (i + 1)).toFixed(1)}px, 0, 0)`; l.style.opacity = String(1 - hp * 0.8); });
  // swatches float at different rates (pinned on the board, not glued)
  swatches.forEach((sw, i) => {
    const r = sw.getBoundingClientRect();
    const c = (r.top + r.height / 2 - vh / 2) / vh;
    sw.style.translate = `0 ${(c * [30, -20, 45, -35, 25, -15][i % 6]).toFixed(1)}px`;
  });
  // pattern photos slide inside their cut lines
  innerImgs.forEach((im) => {
    const r = im.parentElement.getBoundingClientRect();
    const c = (r.top + r.height / 2 - vh / 2) / vh;
    im.style.transform = `scale(1.15) translate3d(0, ${(c * -8).toFixed(2)}%, 0)`;
  });
  // the contact sheet is pulled across the light table
  if (contact) {
    const r = contact.getBoundingClientRect();
    const c = (r.top + r.height / 2 - vh / 2) / vh;
    contact.style.transform = `translate3d(${(c * 80).toFixed(1)}px, 0, 0) rotate(${(-0.4 + c * 1.2).toFixed(2)}deg)`;
  }
}
scroll.watch(parallax);
addEventListener('scroll', parallax, { passive: true });
parallax();
addEventListener('resize', () => { setVh(); drawThread(); scroll.resize(); });
addEventListener('load', drawThread);
drawThread();

// ---- rail: drag to scroll, filters
const track = $('.rail__track');
let down = null;
track.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = { x: e.clientX, s: track.scrollLeft, moved: false }; track.classList.add('is-drag'); });
addEventListener('pointermove', (e) => {
  if (!down) return;
  const dx = e.clientX - down.x;
  if (Math.abs(dx) > 4) down.moved = true;
  track.scrollLeft = down.s - dx;
});
addEventListener('pointerup', () => { if (down) setTimeout(() => { down = null; }, 0); track.classList.remove('is-drag'); });
track.addEventListener('click', (e) => { if (down?.moved) e.preventDefault(); }, true);
track.addEventListener('dragstart', (e) => e.preventDefault());
$$('.rail-filters button').forEach((b) => b.addEventListener('click', () => {
  $$('.rail-filters button').forEach((x) => x.classList.toggle('is-on', x === b));
  $$('.hanger').forEach((h) => { h.hidden = b.dataset.cat !== '*' && h.dataset.cat !== b.dataset.cat; });
  track.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
}));

// ---- contact sheet lightbox
const lb = $('.v3-lightbox');
$$('.frame').forEach((f) => f.addEventListener('click', () => { $('img', lb).src = $('img', f).src; lb.showModal(); }));
lb.addEventListener('click', (e) => { if (e.target === lb || e.target.tagName === 'BUTTON') lb.close(); });

// ---- before / after
const cmp = $('.compare');
$('.compare__range').addEventListener('input', (e) => cmp.style.setProperty('--x', `${e.target.value}%`));

// ---- counters
const cIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  cIO.unobserve(e.target);
  const to = +e.target.dataset.to; const t0 = performance.now();
  const step = (t) => { const k = Math.min(1, (t - t0) / 1400); e.target.textContent = Math.round(to * (1 - (1 - k) ** 3)).toLocaleString(); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), { threshold: 0.6 });
$$('.counters b').forEach((b) => cIO.observe(b));

// ---- repair ticket (front-end only)
$('.ticket').addEventListener('submit', (e) => {
  e.preventDefault();
  $('.ticket__no').textContent = `R-${String(Date.now()).slice(-5)}`;
  $('.ticket__ok').hidden = false;
  e.target.classList.add('is-issued');
});

mountSwitcher();
