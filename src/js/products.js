// ---------------------------------------------------------------------------
// PRODUCT CATALOGUE — drives /product.html?p=<slug>
// Each name carries a short Korean word: 결 (grain), 빛 (light), 줄 (line), 온 (warm).
// Images live in /public/images/products/<slug>/. Text fields are { en, ko }.
// ---------------------------------------------------------------------------
import { localize } from './i18n.js';

const P = '/images/products';


// compact builder for catalogue entries: mk(slug, name, korean, [meaningEn, meaningKo], collections, price, [catEn, catKo], colors, sizes, [descEn, descKo], details, [careEn, careKo], imageNames)
const L = ([en, ko]) => ({ en, ko });
function mk(slug, name, korean, meaning, collections, price, category, colors, sizes, description, details, care, shots) {
  return {
    slug, name, korean, meaning: L(meaning), collections, price, category: L(category),
    colors: colors.map(([en, ko, hex]) => ({ name: { en, ko }, hex })), sizes,
    description: L(description), details: { en: details.map((d) => d[0]), ko: details.map((d) => d[1]) }, care: L(care),
    images: shots.map((n) => ({ src: `${P}/${slug}/${n}.webp`, alt: `${name} — ${n.replace('-', ' ')}` })),
  };
}

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
  // ---- Added for V3: wider catalogue (images generated to match the house style)
  mk('maru-work-shirt', 'Maru Work Shirt', '마루', ['grain floor — where the work happens', '마루 — 일이 이루어지는 바닥'], ['jageop', 'jangma'], 1290000, ['Shirts', '셔츠'],
    [['Indigo', '인디고', '#3c4a66'], ['Ecru', '에크루', '#e6dcc6']], ['XS', 'S', 'M', 'L', 'XL'],
    ['A heavy chambray work shirt with two flap pockets and ecru contrast stitching. Starts deep indigo, fades to the shape of your week.', '두 개의 플랩 포켓과 에크루 대비 스티치의 헤비 샴브레이 워크 셔츠. 진한 인디고에서 시작해 당신의 일주일 모양으로 바랩니다.'],
    [['8oz slub chambray', '8oz 슬럽 샴브레이'], ['Flap chest pockets', '플랩 가슴 포켓'], ['Ecru contrast topstitch', '에크루 대비 스티치'], ['Corozo buttons', '코로조 단추']],
    ['Wash cold, inside out, with darks.', '어두운 색과 함께 뒤집어 찬물 세탁.'], ['packshot', 'model-front', 'model-side', 'detail']),
  mk('sum-linen-trouser', 'Sum Linen Trouser', '숨', ['breath — cloth that lets air through', '숨 — 바람이 통하는 옷'], ['swim', 'hanji'], 1190000, ['Trousers', '팬츠'],
    [['Ecru', '에크루', '#e3d8c3'], ['Stone', '스톤', '#bdb3a0']], ['XS', 'S', 'M', 'L'],
    ['Washed linen in a wide, easy leg with a cotton drawstring. The trouser for long summer evenings and slow Sundays.', '코튼 드로스트링의 넉넉한 와이드 레그 워시드 린넨. 긴 여름 저녁과 느린 일요일을 위한 팬츠.'],
    [['Washed European linen', '워시드 유러피안 린넨'], ['Drawstring waist', '드로스트링 허리'], ['Deep side pockets', '깊은 사이드 포켓']],
    ['Machine wash 30°C. Line dry, wear creased.', '30°C 세탁, 그늘 건조. 구김 그대로 입으세요.'], ['packshot', 'model-front', 'model-walk', 'detail']),
  mk('dol-wool-overcoat', 'Dol Wool Overcoat', '돌', ['stone — heavy, quiet, lasting', '돌 — 무겁고, 조용하고, 오래가는'], ['gyeoul', 'gyeol'], 4890000, ['Outerwear', '아우터'],
    [['Charcoal', '차콜', '#3e3d3f'], ['Camel', '카멜', '#a88763']], ['XS', 'S', 'M', 'L', 'XL'],
    ['A long single-breasted coat in Daegu-milled melton wool, finished with hand pick-stitching and horn buttons. Built for twenty winters.', '대구에서 짠 멜톤 울로 만든 롱 싱글 코트. 손바느질 픽 스티치와 혼 단추. 스무 번의 겨울을 위해.'],
    [['Melton wool, 680g', '멜톤 울 680g'], ['Hand pick-stitched lapel', '핸드 픽 스티치 라펠'], ['Horn buttons', '혼 단추'], ['Centre back vent', '센터 백 벤트']],
    ['Dry clean only. Brush after wear.', '드라이클리닝 전용. 착용 후 브러싱.'], ['packshot', 'model-front', 'model-back', 'detail']),
  mk('bi-field-coat', 'Bi Field Coat', '비', ['rain — welcomed, not avoided', '비 — 피하지 않고 반기는'], ['jangma', 'jageop'], 3290000, ['Outerwear', '아우터'],
    [['Olive', '올리브', '#4f5537'], ['Tobacco', '토바코', '#6e5236']], ['XS', 'S', 'M', 'L', 'XL'],
    ['Waxed cotton field coat with a corduroy collar and four bellows pockets. Re-wax every year and it lasts forever.', '코듀로이 칼라와 네 개의 벨로즈 포켓의 왁스 코튼 필드 코트. 매년 다시 왁싱하면 평생 갑니다.'],
    [['Waxed cotton, 6oz', '왁스 코튼 6oz'], ['Corduroy collar', '코듀로이 칼라'], ['Brass snaps', '황동 스냅'], ['Free re-waxing at the atelier', '아틀리에 무료 리왁싱']],
    ['Do not wash. Sponge clean, re-wax yearly.', '세탁 금지. 스펀지로 닦고 매년 리왁싱.'], ['packshot', 'model-front', 'model-side', 'detail']),
  mk('nun-quilted-vest', 'Nun Quilted Vest', '눈', ['snow — the first layer of winter', '눈 — 겨울의 첫 레이어'], ['gyeoul', 'achim'], 1490000, ['Outerwear', '아우터'],
    [['Oat', '오트', '#cbb894'], ['Navy', '네이비', '#323a4c']], ['S', 'M', 'L', 'XL'],
    ['A diamond-quilted liner vest that buttons into our coats or goes out alone over a shirt.', '코트 안에 단추로 달거나 셔츠 위에 단독으로 입는 다이아몬드 퀼팅 라이너 베스트.'],
    [['Recycled poly fill', '재생 폴리 충전재'], ['Diamond quilting', '다이아몬드 퀼팅'], ['Snap front', '스냅 여밈'], ['Fits under Dol & Bi coats', '돌·비 코트 안에 착용 가능']],
    ['Machine wash cold, tumble low.', '찬물 세탁, 저온 건조.'], ['packshot', 'model-front', 'model-layered', 'detail']),
  mk('hwal-carpenter-trouser', 'Hwal Carpenter Trouser', '활', ['bow — strength held in a curve', '활 — 곡선에 담긴 힘'], ['jageop', 'achim'], 1690000, ['Trousers', '팬츠'],
    [['Duck Brown', '덕 브라운', '#7a5634'], ['Black', '블랙', '#2b2b2b']], ['26', '28', '30', '32', '34', '36'],
    ['12oz duck canvas with double knees, a hammer loop and bartacked stress points. Stiff on day one, yours by month three.', '더블 니, 해머 루프, 바택 보강의 12oz 덕 캔버스. 첫날은 뻣뻣하고, 세 달이면 당신의 것.'],
    [['12oz duck canvas', '12oz 덕 캔버스'], ['Double knees', '더블 니'], ['Hammer loop & tool pocket', '해머 루프 & 툴 포켓'], ['Bartacked', '바택 보강']],
    ['Wash cold, rarely.', '찬물 세탁, 가끔만.'], ['packshot', 'model-front', 'model-atelier', 'detail']),
  mk('saek-knit-polo', 'Saek Knit Polo', '색', ['colour — borrowed from palace eaves', '색 — 궁궐 처마에서 빌린'], ['dancheong', 'swim'], 990000, ['Knitwear', '니트웨어'],
    [['Cinnabar', '주홍', '#9a3b2c'], ['Celadon', '청자', '#9fb3a2']], ['XS', 'S', 'M', 'L'],
    ['A fine-gauge cotton knit polo in faded dancheong cinnabar. Three mother-of-pearl buttons, a soft rib collar.', '바랜 단청 주홍의 하이게이지 코튼 니트 폴로. 세 개의 자개 단추와 부드러운 리브 칼라.'],
    [['Fine 14-gauge cotton', '14게이지 코튼'], ['Mother-of-pearl buttons', '자개 단추'], ['Rib collar', '리브 칼라']],
    ['Hand wash cold, dry flat.', '찬물 손세탁, 뉘어서 건조.'], ['packshot', 'model-front', 'model-seated', 'detail']),
  mk('ji-paper-overshirt', 'Ji Paper Overshirt', '지', ['paper — light that passes through', '지 — 빛이 통과하는 종이'], ['hanji', 'achim'], 1590000, ['Shirts', '셔츠'],
    [['Ecru', '에크루', '#ece3d0'], ['Ink', '먹', '#2f3034']], ['XS', 'S', 'M', 'L', 'XL'],
    ['A crisp paper-cotton overshirt with a band collar and hidden-snap pockets. Crinkles like hanji, softens like linen.', '밴드 칼라와 히든 스냅 포켓의 빳빳한 페이퍼 코튼 오버셔츠. 한지처럼 구겨지고 린넨처럼 부드러워집니다.'],
    [['Paper-touch cotton', '페이퍼 터치 코튼'], ['Band collar', '밴드 칼라'], ['Hidden-snap pockets', '히든 스냅 포켓']],
    ['Wash cold. Do not iron — the crinkle is the point.', '찬물 세탁. 다림질하지 마세요 — 구김이 포인트입니다.'], ['packshot', 'model-front', 'model-window', 'detail']),
];

export default localize(products);

export const formatPrice = (v) => '₩' + v.toLocaleString('ko-KR');
