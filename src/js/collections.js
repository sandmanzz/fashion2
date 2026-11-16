// ---------------------------------------------------------------------------
// ONDO — 8 collections. Each is named by one Korean word.
// cover: /public/images/collections/<slug>.webp · products: slugs from products.js
// ---------------------------------------------------------------------------
import { localize } from './i18n.js';

const C = '/images/collections';
const collections = [
  {
    slug: 'achim', korean: '아침', name: { en: 'Morning Uniform', ko: '아침의 유니폼' },
    line: { en: 'Oxford shirts and chore jackets for the first hour of the day.', ko: '하루의 첫 시간을 위한 옥스퍼드 셔츠와 초어 재킷.' },
    story: { en: 'The pieces you reach for before you are fully awake. Achim is the core of ONDO: an oxford that fades evenly, a twill jacket that already knows your shoulders, built to be worn five days a week for years.', ko: '잠이 다 깨기 전에 손이 가는 옷. 아침은 온도의 중심입니다. 고르게 바래는 옥스퍼드, 이미 어깨를 기억하는 트윌 재킷. 몇 년이고 일주일에 다섯 번 입도록 만들었습니다.' },
    season: { en: 'Permanent', ko: '상시' }, cover: `${C}/achim.webp`,
  },
  {
    slug: 'jageop', korean: '작업', name: { en: 'Workroom', ko: '작업실' },
    line: { en: 'Canvas overshirts and utility trousers for hands-on days.', ko: '손을 쓰는 날을 위한 캔버스 오버셔츠와 유틸리티 팬츠.' },
    story: { en: 'Inspired by the aprons and work jackets of Seongsu’s old shoe factories. Reinforced pockets, tool loops, heavy canvas that breaks in rather than wears out.', ko: '성수동 옛 구두 공장의 앞치마와 작업복에서 영감을 받았습니다. 보강된 포켓, 공구 고리, 닳기보다 길들여지는 두꺼운 캔버스.' },
    season: { en: 'Permanent', ko: '상시' }, cover: `${C}/jageop.webp`,
  },
  {
    slug: 'gyeol', korean: '결', name: { en: 'Texture', ko: '결' },
    line: { en: 'Bouclé, tweed and brushed wool you want to touch.', ko: '손끝으로 느끼고 싶은 부클레, 트위드, 기모 울.' },
    story: { en: 'Gyeol is the grain of wood, the weave of cloth, the texture of a life. A capsule of knits and tweeds made in small runs with mills in Daegu.', ko: '결은 나무의 결, 원단의 짜임, 삶의 질감입니다. 대구의 공장과 함께 소량 생산하는 니트와 트위드 캡슐.' },
    season: { en: 'Autumn / Winter', ko: '가을 / 겨울' }, cover: `${C}/gyeol.webp`,
  },
  {
    slug: 'hanji', korean: '한지', name: { en: 'Paper', ko: '한지' },
    line: { en: 'Crisp poplin in white and ecru, folded like paper.', ko: '종이처럼 접힌 화이트와 에크루의 빳빳한 포플린.' },
    story: { en: 'Hanji lets light through without letting the world in. These are our lightest pieces: crisp cotton poplin, sharp folds and a translucent calm for warm days.', ko: '한지는 빛은 들이되 세상은 막아줍니다. 가장 가벼운 옷들. 빳빳한 코튼 포플린, 날렵한 주름, 더운 날을 위한 은은한 고요.' },
    season: { en: 'Spring / Summer', ko: '봄 / 여름' }, cover: `${C}/hanji.webp`,
  },
  {
    slug: 'jangma', korean: '장마', name: { en: 'Monsoon', ko: '장마' },
    line: { en: 'Waxed cotton coats and rain layers for the wet season.', ko: '장마철을 위한 왁스 코튼 코트와 레인 레이어.' },
    story: { en: 'Every July, Seoul turns to rain. Jangma is outerwear that welcomes it: waxed cotton that beads water, generous hoods, and linings that dry overnight.', ko: '매년 7월, 서울은 비가 됩니다. 장마는 비를 반기는 아우터입니다. 물방울이 맺히는 왁스 코튼, 넉넉한 후드, 하룻밤이면 마르는 안감.' },
    season: { en: 'Summer', ko: '여름' }, cover: `${C}/jangma.webp`,
  },
  {
    slug: 'dancheong', korean: '단청', name: { en: 'Muted Colour', ko: '단청' },
    line: { en: 'Celadon, cinnabar and indigo, softened from palace eaves.', ko: '궁궐 처마에서 빌려와 차분하게 누른 청자, 주홍, 쪽빛.' },
    story: { en: 'Dancheong is the painted colour of Korea’s palaces. We borrowed its palette and faded it by half, so colour sits quietly next to the neutrals you already own.', ko: '단청은 한국 궁궐의 채색입니다. 그 팔레트를 빌려 절반쯤 바래게 했습니다. 이미 가진 무채색 옷 옆에 조용히 어울리도록.' },
    season: { en: 'Limited', ko: '한정' }, cover: `${C}/dancheong.webp`,
  },
  {
    slug: 'gyeoul', korean: '겨울', name: { en: 'Winter', ko: '겨울' },
    line: { en: 'Wool coats and quilted liners for long, cold walks.', ko: '길고 추운 산책을 위한 울 코트와 퀼팅 라이너.' },
    story: { en: 'Seoul winters are dry and bright and very cold. Gyeoul is cut long and layered: double-faced wool coats, quilted liners that button in, trousers in heavy flannel.', ko: '서울의 겨울은 건조하고 맑고 아주 춥습니다. 겨울은 길고 겹겹이 재단했습니다. 더블 페이스 울 코트, 단추로 다는 퀼팅 라이너, 두꺼운 플란넬 팬츠.' },
    season: { en: 'Winter', ko: '겨울' }, cover: `${C}/gyeoul.webp`,
  },
  {
    slug: 'swim', korean: '쉼', name: { en: 'Rest', ko: '쉼' },
    line: { en: 'Soft jersey and open cardigans for the weekend.', ko: '주말을 위한 부드러운 저지와 오픈 카디건.' },
    story: { en: 'Swim means rest, the pause between weeks. Brushed jersey, loose cardigans and wide trousers for slow Sundays on a warm wooden floor.', ko: '쉼은 일주일과 일주일 사이의 멈춤입니다. 따뜻한 마룻바닥 위의 느린 일요일을 위한 기모 저지, 헐렁한 카디건, 와이드 팬츠.' },
    season: { en: 'Permanent', ko: '상시' }, cover: `${C}/swim.webp`,
  },
];

export default localize(collections);
