// ---------------------------------------------------------------------------
// PRODUCT CATALOGUE — drives /product.html?p=<slug>
// Each name carries a short Korean word: 결 (grain), 빛 (light), 줄 (line), 온 (warm).
// Images live in /public/images/products/<slug>/.
// ---------------------------------------------------------------------------
const P = '/images/products';

export default [
  {
    slug: 'gyeol-chore-jacket',
    name: 'Gyeol Chore Jacket',
    korean: '결',
    meaning: 'grain — the texture that gives cloth its character',
    price: 2890000,
    category: 'Outerwear',
    colors: [{ name: 'Oat', hex: '#c8b08a' }, { name: 'Faded Navy', hex: '#3f4a5c' }, { name: 'Charcoal', hex: '#4a4a4b' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A boxy French-workwear chore jacket cut in heavy cotton twill. Three patch pockets, corozo buttons and a dark brown contrast topstitch that traces every seam — built to soften and fade with each wear.',
    details: ['Heavy 12oz cotton twill', 'Contrast brown topstitching', 'Three patch pockets', 'Corozo nut buttons', 'Relaxed boxy fit — take your usual size'],
    care: 'Machine wash cold, inside out. Line dry. Expect a gentle fade over time.',
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
    meaning: 'light — the first thing you put on in the morning',
    price: 1390000,
    category: 'Shirts',
    colors: [{ name: 'Cream', hex: '#efe6d2' }, { name: 'Pale Blue', hex: '#c9d4dc' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An everyday oxford shirt with one quiet signature: a fine black piping line running down the placket and around the cuffs. Relaxed through the body, crisp at the collar — office on Monday, weekends after.',
    details: ['Brushed cotton oxford', 'Black piping on placket and cuffs', 'Mother-of-pearl effect buttons', 'Chest patch pocket', 'Relaxed fit'],
    care: 'Machine wash 30°C. Iron on medium while slightly damp.',
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
    meaning: 'line — a pressed crease that holds all day',
    price: 1990000,
    category: 'Trousers',
    colors: [{ name: 'Charcoal', hex: '#4a4a4b' }, { name: 'Olive', hex: '#6b6a4a' }, { name: 'Ecru', hex: '#e6dcc6' }],
    sizes: ['24', '26', '28', '30', '32', '34'],
    description: 'A high-waisted, wide-leg trouser in soft wool flannel with deep double pleats and brass side adjusters — no belt needed. The kind of tailoring that looks considered without trying.',
    details: ['Wool flannel blend', 'Double forward pleats', 'Brass side adjusters', 'Pressed centre crease', 'High rise, wide leg'],
    care: 'Dry clean recommended. Steam between wears.',
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
    meaning: 'warm — the layer you reach for without thinking',
    price: 1590000,
    category: 'Knitwear',
    colors: [{ name: 'Ecru', hex: '#e8dec9' }, { name: 'Oatmeal', hex: '#cdbb9b' }, { name: 'Charcoal', hex: '#4a4a4b' }],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A cropped cotton-wool cardigan with fine rib trims and small mother-of-pearl buttons. Worn buttoned as a top or open over a shirt — the softest layer in the collection.',
    details: ['Cotton-wool blend, 7 gauge', 'Fine rib trims', 'Mother-of-pearl buttons', 'Cropped, slightly boxy fit'],
    care: 'Hand wash cold. Dry flat.',
    images: [
      { src: `${P}/on-cropped-cardigan/packshot.webp`, alt: 'On Cropped Cardigan in ecru' },
      { src: `${P}/on-cropped-cardigan/model-front.webp`, alt: 'Model wearing the On Cropped Cardigan' },
      { src: `${P}/on-cropped-cardigan/model-open.webp`, alt: 'On Cropped Cardigan worn open' },
      { src: `${P}/on-cropped-cardigan/detail.webp`, alt: 'Button and rib detail' },
    ],
  },
];

export const formatPrice = (v) => '₩' + v.toLocaleString('ko-KR');
