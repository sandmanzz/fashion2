// ---------------------------------------------------------------------------
// PRODUCT CATALOGUE — drives /product.html?p=<slug>
// Each name carries a short Korean word: 결 (grain), 빛 (light), 줄 (line), 온 (warm).
// Images live in /public/images/products/<slug>/. Text fields are { en, ko }.
// ---------------------------------------------------------------------------
import { localize } from './i18n.js';

const P = '/images/products';

const products = [
  {
    slug: 'gyeol-chore-jacket',
    name: 'Gyeol Chore Jacket',
    korean: '결',
    meaning: { en: 'grain — the texture that gives cloth its character', ko: '결 — 옷에 성격을 부여하는 원단의 결' },
    collections: ['achim', 'jageop'],
    price: 2890000,
    category: { en: 'Outerwear', ko: '아우터' },
    colors: [{ name: { en: 'Oat', ko: '오트' }, hex: '#c8b08a' }, { name: { en: 'Faded Navy', ko: '페이디드 네이비' }, hex: '#3f4a5c' }, { name: { en: 'Charcoal', ko: '차콜' }, hex: '#4a4a4b' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: { en: 'A boxy French-workwear chore jacket cut in heavy cotton twill. Three patch pockets, corozo buttons and a dark brown contrast topstitch that traces every seam — built to soften and fade with each wear.', ko: '두꺼운 코튼 트윌로 재단한 박시한 프렌치 워크웨어 초어 재킷. 세 개의 패치 포켓, 코로조 단추, 모든 솔기를 따라가는 다크 브라운 스티치. 입을수록 부드러워지고 자연스럽게 바래도록 만들었습니다.' },
    details: { en: ['Heavy 12oz cotton twill', 'Contrast brown topstitching', 'Three patch pockets', 'Corozo nut buttons', 'Relaxed boxy fit — take your usual size'], ko: ['12oz 헤비 코튼 트윌', '브라운 대비 스티치', '패치 포켓 3개', '코로조 너트 단추', '여유로운 박시 핏 — 평소 사이즈 추천'] },
    care: { en: 'Machine wash cold, inside out. Line dry. Expect a gentle fade over time.', ko: '뒤집어서 찬물 세탁, 그늘 건조. 시간이 지나며 자연스럽게 바랩니다.' },
    images: [
      { src: `${P}/gyeol-chore-jacket/packshot.webp`, alt: 'Gyeol Chore Jacket in oat, front' },
      { src: `${P}/gyeol-chore-jacket/model-front.webp`, alt: 'Model wearing the Gyeol Chore Jacket' },
      { src: `${P}/gyeol-chore-jacket/model-back.webp`, alt: 'Gyeol Chore Jacket, back view' },
      { src: `${P}/gyeol-chore-jacket/detail.webp`, alt: 'Pocket and topstitch detail' },
    ],
  },
  {
    slug: 'bit-oxford-shirt',
    name: 'Bit Oxford Shirt',
    korean: '빛',
    meaning: { en: 'light — the first thing you put on in the morning', ko: '빛 — 아침에 가장 먼저 입는 옷' },
    collections: ['achim', 'hanji'],
    price: 1390000,
    category: { en: 'Shirts', ko: '셔츠' },
    colors: [{ name: { en: 'Cream', ko: '크림' }, hex: '#efe6d2' }, { name: { en: 'Pale Blue', ko: '페일 블루' }, hex: '#c9d4dc' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: { en: 'An everyday oxford shirt with one quiet signature: a fine black piping line running down the placket and around the cuffs. Relaxed through the body, crisp at the collar — office on Monday, weekends after.', ko: '하나의 조용한 시그니처를 가진 데일리 옥스퍼드 셔츠. 플라켓과 커프스를 따라 흐르는 가는 블랙 파이핑. 몸판은 여유롭고 칼라는 단정하게 — 월요일엔 사무실, 주말엔 그 후에.' },
    details: { en: ['Brushed cotton oxford', 'Black piping on placket and cuffs', 'Mother-of-pearl effect buttons', 'Chest patch pocket', 'Relaxed fit'], ko: ['기모 코튼 옥스퍼드', '플라켓과 커프스의 블랙 파이핑', '자개 느낌 단추', '가슴 패치 포켓', '릴랙스드 핏'] },
    care: { en: 'Machine wash 30°C. Iron on medium while slightly damp.', ko: '30°C 세탁. 살짝 젖은 상태에서 중온 다림질.' },
    images: [
      { src: `${P}/bit-oxford-shirt/packshot.webp`, alt: 'Bit Oxford Shirt in cream, flat' },
      { src: `${P}/bit-oxford-shirt/model-front.webp`, alt: 'Model wearing the Bit Oxford Shirt' },
      { src: `${P}/bit-oxford-shirt/model-side.webp`, alt: 'Bit Oxford Shirt, side view' },
      { src: `${P}/bit-oxford-shirt/detail.webp`, alt: 'Collar and piping detail' },
    ],
  },
  {
    slug: 'jul-pleated-trouser',
    name: 'Jul Pleated Trouser',
    korean: '줄',
    meaning: { en: 'line — a pressed crease that holds all day', ko: '줄 — 하루 종일 유지되는 반듯한 주름' },
    collections: ['jageop', 'gyeoul'],
    price: 1990000,
    category: { en: 'Trousers', ko: '팬츠' },
    colors: [{ name: { en: 'Charcoal', ko: '차콜' }, hex: '#4a4a4b' }, { name: { en: 'Olive', ko: '올리브' }, hex: '#6b6a4a' }, { name: { en: 'Ecru', ko: '에크루' }, hex: '#e6dcc6' }],
    sizes: ['24', '26', '28', '30', '32', '34'],
    description: { en: 'A high-waisted, wide-leg trouser in soft wool flannel with deep double pleats and brass side adjusters — no belt needed. The kind of tailoring that looks considered without trying.', ko: '부드러운 울 플란넬로 만든 하이웨이스트 와이드 팬츠. 깊은 더블 플리츠와 황동 사이드 버클로 벨트가 필요 없습니다. 애쓰지 않아도 정돈되어 보이는 테일러링.' },
    details: { en: ['Wool flannel blend', 'Double forward pleats', 'Brass side adjusters', 'Pressed centre crease', 'High rise, wide leg'], ko: ['울 플란넬 혼방', '더블 포워드 플리츠', '황동 사이드 버클', '센터 프레스 주름', '하이 라이즈, 와이드 레그'] },
    care: { en: 'Dry clean recommended. Steam between wears.', ko: '드라이클리닝 권장. 착용 사이 스팀으로 관리하세요.' },
    images: [
      { src: `${P}/jul-pleated-trouser/packshot.webp`, alt: 'Jul Pleated Trouser in charcoal, flat' },
      { src: `${P}/jul-pleated-trouser/model-front.webp`, alt: 'Model wearing the Jul Pleated Trouser' },
      { src: `${P}/jul-pleated-trouser/model-walk.webp`, alt: 'Jul Pleated Trouser in motion' },
      { src: `${P}/jul-pleated-trouser/detail.webp`, alt: 'Side adjuster detail' },
    ],
  },
  {
    slug: 'on-cropped-cardigan',
    name: 'On Cropped Cardigan',
    korean: '온',
    meaning: { en: 'warm — the layer you reach for without thinking', ko: '온 — 생각 없이 손이 가는 따뜻한 레이어' },
    collections: ['gyeol', 'swim'],
    price: 1590000,
    category: { en: 'Knitwear', ko: '니트웨어' },
    colors: [{ name: { en: 'Ecru', ko: '에크루' }, hex: '#e8dec9' }, { name: { en: 'Oatmeal', ko: '오트밀' }, hex: '#cdbb9b' }, { name: { en: 'Charcoal', ko: '차콜' }, hex: '#4a4a4b' }],
    sizes: ['XS', 'S', 'M', 'L'],
    description: { en: 'A cropped cotton-wool cardigan with fine rib trims and small mother-of-pearl buttons. Worn buttoned as a top or open over a shirt — the softest layer in the collection.', ko: '가는 리브 트림과 작은 자개 단추의 코튼-울 크롭 카디건. 단추를 채워 상의로, 혹은 셔츠 위에 열어서 — 컬렉션에서 가장 부드러운 레이어.' },
    details: { en: ['Cotton-wool blend, 7 gauge', 'Fine rib trims', 'Mother-of-pearl buttons', 'Cropped, slightly boxy fit'], ko: ['코튼-울 혼방, 7게이지', '가는 리브 트림', '자개 단추', '크롭, 살짝 박시한 핏'] },
    care: { en: 'Hand wash cold. Dry flat.', ko: '찬물 손세탁. 뉘어서 건조.' },
    images: [
      { src: `${P}/on-cropped-cardigan/packshot.webp`, alt: 'On Cropped Cardigan in ecru' },
      { src: `${P}/on-cropped-cardigan/model-front.webp`, alt: 'Model wearing the On Cropped Cardigan' },
      { src: `${P}/on-cropped-cardigan/model-open.webp`, alt: 'On Cropped Cardigan worn open' },
      { src: `${P}/on-cropped-cardigan/detail.webp`, alt: 'Button and rib detail' },
    ],
  },
];

export default localize(products);

export const formatPrice = (v) => '₩' + v.toLocaleString('ko-KR');
