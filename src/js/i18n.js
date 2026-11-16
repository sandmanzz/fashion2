// Bilingual layer (EN / 한국어).
// Any value written as { en, ko } in content.js / products.js / collections.js is resolved
// to the active language. Pick via ?lang=en|ko, persisted in localStorage.
const KEY = 'ondo-lang';
function read() {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'ko') return q;
  try { return localStorage.getItem(KEY) || 'en'; } catch { return 'en'; }
}
export const LANG = read();
document.documentElement.lang = LANG;

const isPair = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'en' in v && 'ko' in v && Object.keys(v).length === 2;
export function localize(v) {
  if (isPair(v)) return v[LANG] ?? v.en;
  if (Array.isArray(v)) return v.map(localize);
  if (v && typeof v === 'object') { const o = {}; for (const k in v) o[k] = localize(v[k]); return o; }
  return v;
}

export function setLang(l) {
  try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  const url = new URL(location.href);
  url.searchParams.set('lang', l);
  url.hash = '';
  location.href = url.toString();
}

// Interface strings that are not part of the CMS-style content.
const UI = {
  close: { en: 'Close', ko: '닫기' },
  read: { en: 'Read', ko: '읽어' },
  more: { en: 'more', ko: '보기' },
  rotate: { en: 'Please rotate<br>your phone', ko: '휴대폰을<br>세로로 돌려주세요' },
  menu: { en: 'Menu', ko: '메뉴' },
  colour: { en: 'Colour', ko: '색상' },
  size: { en: 'Size', ko: '사이즈' },
  sizeGuide: { en: 'Size guide', ko: '사이즈 가이드' },
  addToBag: { en: 'Add to bag', ko: '장바구니 담기' },
  selectSize: { en: 'Select a size', ko: '사이즈를 선택하세요' },
  pleaseSelect: { en: 'Please select a size', ko: '사이즈를 먼저 선택해 주세요' },
  sizeSelected: { en: 'Size {s} selected', ko: '{s} 사이즈 선택됨' },
  details: { en: 'Details', ko: '디테일' },
  care: { en: 'Fabric & care', ko: '소재 및 관리' },
  shipping: { en: 'Shipping & returns', ko: '배송 및 반품' },
  shippingText: { en: 'Free shipping in Korea on orders over ₩150,000. Free returns within 14 days. Free repairs for life.', ko: '15만 원 이상 국내 무료 배송, 14일 이내 무료 반품, 평생 무료 수선.' },
  wornWith: { en: 'Worn with', ko: '함께 입기' },
  bag: { en: 'Bag', ko: '장바구니' },
  yourBag: { en: 'Your bag', ko: '장바구니' },
  empty: { en: 'Your bag is empty.', ko: '장바구니가 비어 있습니다.' },
  total: { en: 'Total', ko: '합계' },
  checkout: { en: 'Checkout', ko: '결제하기' },
  view: { en: 'View', ko: '보기' },
  theProduct: { en: 'the product', ko: '제품' },
  collection: { en: 'Collection', ko: '컬렉션' },
  collections: { en: 'Collections', ko: '컬렉션' },
  pieces: { en: 'Pieces in this collection', ko: '이 컬렉션의 제품' },
  otherCollections: { en: 'Other collections', ko: '다른 컬렉션' },
  explore: { en: 'Explore', ko: '살펴보기' },
  comingSoon: { en: 'More pieces arriving soon', ko: '새로운 제품이 곧 입고됩니다' },
};
export const t = (k, vars = {}) => {
  let s = UI[k] ? (UI[k][LANG] ?? UI[k].en) : k;
  for (const v in vars) s = s.replace(`{${v}}`, vars[v]);
  return s;
};
