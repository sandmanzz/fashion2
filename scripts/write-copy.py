"""Writes ONDO's real brand copy (EN + KO) into src/js/content.js.

Every text field becomes {"en": ..., "ko": ...}; src/js/i18n.js resolves it at runtime.
Run once after structural edits:  python3 scripts/write-copy.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(ROOT, 'src/js/content.js')
s = open(P).read()
i = s.index('export default ')
d = json.loads(s[i + 15:].rstrip().rstrip(';'))
B = lambda en, ko: {'en': en, 'ko': ko}
PP = '/product.html?p='

# ---------------------------------------------------------------- global
d['seo'] = {'title': B('ONDO 온도 — Daily & work wear from Seoul', 'ONDO 온도 — 서울의 데일리 & 워크웨어'),
            'description': B('Western workwear, reworked in Seoul. Clothes made to be worn every day and repaired for life.',
                             '서울에서 다시 만든 서양의 워크웨어. 매일 입고, 평생 고쳐 입는 옷.')}
d['tagline'] = B('Warmth in everyday wear', '매일의 온기')
d['navigation']['ctas'] = [{'url': PP + 'on-cropped-cardigan', 'label': B('Shop\nWomen', '여성\n쇼핑')},
                           {'url': PP + 'gyeol-chore-jacket', 'label': B('Shop\nMen', '남성\n쇼핑')}]
d['footer'] = [{'url': '#', 'text': B('Care & repair', '수선 서비스')},
               {'url': '#', 'text': B('Stores', '매장 안내')},
               {'url': '#', 'text': B('Legal notice', '법적 고지')}]

# ------------------------------------------------------------------ hero
h = d['hero']
h['intro']['ctaPrimary'] = B('Enter', '들어가기')
h['scroll']['text'] = B(
    'ONDO means temperature. Not the heat of a trend, but the quiet warmth of the clothes you return to every morning: '
    'Western workwear, re-cut and softened in Seoul for the way we actually live and work.',
    '온도(ONDO)는 온기를 뜻합니다. 유행의 열기가 아닌, 매일 아침 다시 손이 가는 옷의 조용한 따뜻함. '
    '서양의 워크웨어를 서울에서 다시 재단하고 부드럽게 다듬어, 우리가 실제로 살고 일하는 방식에 맞췄습니다.')
h['scroll']['label'] = B('Scroll', '스크롤')

# ---------------------------------------------------------------- products reveal
d['shirts']['label'] = B('Products', '제품')
d['shirts']['title'] = B('More than a uniform, a quiet way of being.', '유니폼을 넘어, 조용한 태도로.')

# ----------------------------------------------------------------- story
d['story']['label'] = B('Story', '이야기')
people = [
    (B('Park Minjun', '박민준'), B('Pattern maker\nONDO studio, Seongsu', '패턴 메이커\n온도 성수 스튜디오'), 'gyeol-chore-jacket', B('Gyeol Chore Jacket', '결 초어 재킷')),
    (B('Kim Seoyeon', '김서연'), B('Ceramicist\nYeonhui-dong', '도예가\n연희동'), 'bit-oxford-shirt', B('Bit Oxford Shirt', '빛 옥스퍼드 셔츠')),
    (B('Lee Hayoon', '이하윤'), B('Architect\nEuljiro', '건축가\n을지로'), 'jul-pleated-trouser', B('Jul Pleated Trouser', '줄 플리츠 트라우저')),
    (B('Choi Doyun', '최도윤'), B('Chef\nMangwon-dong', '셰프\n망원동'), 'on-cropped-cardigan', B('On Cropped Cardigan', '온 크롭 카디건')),
    (B('Jung Yuna', '정유나'), B('Florist\nHannam-dong', '플로리스트\n한남동'), 'bit-oxford-shirt', B('Bit Oxford Shirt', '빛 옥스퍼드 셔츠')),
]
chapters = [
    {'label': B('Chapter I', '제1장'), 'title': B('Morning', '아침'), 'korean': '아침', 'keyword': 'Morning',
     'subtitle': B('The first hour of the day', '하루의 첫 시간'),
     'texts': [
         (B('The first hour', '첫 한 시간'), B(
             'Before the city wakes, there is a short, quiet hour that belongs only to you. ONDO begins here: with the shirt you button without thinking and the jacket that already knows your shoulders.',
             '도시가 깨어나기 전, 오롯이 나만의 조용한 한 시간이 있습니다. 온도는 그곳에서 시작합니다. 생각 없이 단추를 채우는 셔츠, 이미 어깨를 기억하는 재킷과 함께.')),
         (B('Made to be repeated', '반복을 위한 옷'), B(
             'We design for the second wear, and the hundredth. Heavy twill that softens, oxford that fades evenly, seams reinforced where life pulls hardest.',
             '우리는 두 번째, 그리고 백 번째 착용을 위해 디자인합니다. 부드러워지는 두꺼운 트윌, 고르게 바래는 옥스퍼드, 가장 많이 당겨지는 곳을 보강한 솔기.')),
         (B('Western roots, Seoul hands', '서양의 뿌리, 서울의 손'), B(
             'The chore coat of French farmers, the oxford of American campuses, reworked in our Seongsu studio with Korean proportions and one quiet detail on every piece.',
             '프랑스 농부의 초어 코트, 미국 캠퍼스의 옥스퍼드 셔츠. 성수동 스튜디오에서 한국적인 비율과 단 하나의 조용한 디테일로 다시 만들었습니다.')),
         (None, None),
     ],
     'full': (B('Warmth is a habit.', '온기는 습관입니다.'), B(
         'It is the coat you reach for without deciding, the shirt that still feels right at nine at night. That is the temperature we chase: not loud, just constant.',
         '고민 없이 손이 가는 코트, 밤 아홉 시에도 여전히 편안한 셔츠. 우리가 좇는 온도는 요란하지 않고, 그저 한결같습니다.'))},
    {'label': B('Chapter II', '제2장'), 'title': B('Atelier', '작업실'), 'korean': '작업', 'keyword': 'Atelier',
     'subtitle': B('How every piece is made', '옷이 만들어지는 곳'),
     'texts': [
         (B('Inside the workroom', '작업실 안에서'), B(
             'Every ONDO piece starts on paper in our Seongsu atelier: patterns drafted by hand, sampled in small runs, and worn by the team for a month before it is ever made.',
             '온도의 모든 옷은 성수동 작업실의 종이 위에서 시작됩니다. 손으로 그린 패턴, 소량의 샘플, 그리고 출시 전 한 달 동안 팀이 직접 입어봅니다.')),
         (B('The single detail', '단 하나의 디테일'), B(
             'A line of piping, a brass adjuster, a contrast stitch. We allow each garment one gesture: enough to recognise it, never enough to shout.',
             '한 줄의 파이핑, 황동 버클, 대비되는 스티치. 우리는 각 옷에 단 하나의 제스처만 허락합니다. 알아볼 만큼, 결코 외치지 않을 만큼.')),
         (B('Cloth with memory', '기억을 가진 원단'), B(
             'We source twills, flannels and knits from mills in Daegu and Japan that have woven for decades, chosen for how they will look in five years, not on the first day.',
             '수십 년간 원단을 짜온 대구와 일본의 공장에서 트윌, 플란넬, 니트를 고릅니다. 첫날이 아닌, 오 년 뒤의 모습을 기준으로.')),
     ],
     'full': (B('Slow is a decision.', '느림은 선택입니다.'), B(
         'Small batches, honest prices, no seasonal sales. We would rather make fewer clothes that stay than many that leave.',
         '소량 생산, 정직한 가격, 시즌 세일 없음. 많이 만들고 사라지는 옷보다, 적게 만들고 남는 옷을 택합니다.'))},
    {'label': B('Chapter III', '제3장'), 'title': B('Together', '함께'), 'korean': '함께', 'keyword': 'Together',
     'subtitle': B('The people who wear it', '옷을 입는 사람들'),
     'texts': [
         (B('Worn by the city', '도시가 입는 옷'), B(
             'Designers, cooks, teachers, students: the people of Seoul are our real lookbook. ONDO is cut for long days that move between desk, street and table.',
             '디자이너, 요리사, 선생님, 학생. 서울의 사람들이 우리의 진짜 룩북입니다. 책상과 거리, 식탁을 오가는 긴 하루를 위해 재단했습니다.')),
         (B('Shared, not seasonal', '시즌이 아닌, 나눔'), B(
             'Our pieces are made to be swapped between partners and passed between friends: generous fits, honest sizing, colours that live well together.',
             '연인과 바꿔 입고, 친구에게 물려줄 수 있도록 만듭니다. 여유로운 핏, 정직한 사이즈, 서로 잘 어울리는 색.')),
         (None, None),
         (B('The Saturday table', '토요일의 식탁'), B(
             'Once a month we open the studio for a long lunch with our community: mending sessions, new samples, and too much coffee.',
             '매달 한 번, 스튜디오를 열어 커뮤니티와 긴 점심을 나눕니다. 수선 모임, 새로운 샘플, 그리고 넉넉한 커피.')),
         (None, None),
         (B('Made to be mended', '고쳐 입는 옷'), B(
             'Every ONDO garment comes with free repairs for life. A loose button or a torn pocket is not the end of a piece; it is the start of its story.',
             '모든 온도의 옷은 평생 무료 수선을 제공합니다. 떨어진 단추나 찢어진 주머니는 끝이 아닌, 이야기의 시작입니다.')),
         (None, None),
     ],
     'full': (B('Warmth, together.', '함께, 온기.'), B(
         'Clothes are the closest thing we carry. When they are made with care, that care is felt by everyone around us.',
         '옷은 우리가 지니는 가장 가까운 것입니다. 정성으로 만든 옷의 온기는 곁에 있는 모든 이에게 전해집니다.'))},
]
pi = 0
for arc, c in zip(d['story']['archs'], chapters):
    ch = arc['chapter']
    for k in ('label', 'title', 'korean', 'keyword', 'subtitle'):
        ch[k] = c[k]
    items = [it for pnl in ch['panels'] if pnl['type'] == 'normal' for it in pnl['items']]
    for it, (tt, tx) in zip(items, c['texts']):
        if it.get('title') is not None or tt:
            it['title'], it['text'] = tt, tx
        if it.get('cursor'):
            name, role, slug, prod = people[pi % len(people)]
            pi += 1
            it['cursor'] = {'label1': name, 'label2': B('Wearing ONDO', '온도 착용')}
            it['modal'] = {'title': name, 'text': role,
                           'cta': {'url': PP + slug, 'label1': B('Shop', '구매'), 'label2': B('the look', '이 룩'), 'icon': 'IconCart'},
                           'st': False, 'list': [{'label': B('Wearing', '착용'), 'text': prod}]}
        if it.get('image') and it['image'].get('alt') is not None:
            it['image']['alt'] = B('ONDO campaign', '온도 캠페인')
    full = [pnl for pnl in ch['panels'] if pnl['type'] == 'fullscreen']
    if full:
        full[0]['item']['title'], full[0]['item']['text'] = c['full']

# ------------------------------------------------------------------ film
v = d['video']
v['label'] = B('Film', '필름')
v['cursorLabel1'] = v['cursorLabel2'] = B('Watch the film', '필름 보기')

# ------------------------------------------------------------ collection
c = d['collection']
c['label'] = B('Collection', '컬렉션')
c['title1'] = B('Discover', '모든')
c['title2'] = B('the full collection', '컬렉션 보기')
c['text1'] = B('On Cropped\nCardigan', '온\n크롭 카디건')
c['text2'] = B('Gyeol Chore\nJacket', '결\n초어 재킷')
for k in ('cta1', 'cta2'):
    c[k]['label1'] = B('View', '보기')
    c[k]['label2'] = B('the product', '제품')
c['ctaShopTFC']['label'] = B('Shop women', '여성 쇼핑')
c['ctaShopST']['label'] = B('Shop men', '남성 쇼핑')
for g in c['gallery']:
    if g.get('alt') is not None:
        g['alt'] = B('ONDO lookbook', '온도 룩북')

# ---------------------------------------------------- events (was tickets)
w = d['weekend']
w['label'] = B('Events', '이벤트')
w['isOver'] = False
w['title1'] = B('Meet us', '성수에서')
w['title2'] = B('in Seongsu', '만나요')
w['caption'] = B('The Saturday\ntable', '토요일의\n식탁')
w['ticket1'] = {'date': '2026-12-12 11:00:00', 'teams': [{'name': B('Studio Open Day', '스튜디오 오픈 데이'), 'logo': 'mark'}, {'name': B('Seongsu-dong, Seoul', '서울 성수동'), 'logo': 'seal'}],
                'cta': {'url': '#', 'label': B('Reserve a seat', '자리 예약하기')}}
w['ticket2'] = {'date': '2027-01-09 13:00:00', 'teams': [{'name': B('Mending Saturday', '수선의 토요일'), 'logo': 'mark'}, {'name': B('Free repairs, all day', '종일 무료 수선'), 'logo': 'seal'}],
                'cta': {'url': '#', 'label': B('Book a repair', '수선 예약하기')}}

# ---------------------------------------------------------------- journal
m = d['medias']
m['label'] = B('Journal', '저널')
m['catchphrase'] = B('Journal', 'Journal')
m['items'] = m['items'][:15]           # shorter wall (was 33)
quotes = [
    (B('"We wanted clothes that feel like the first warm room you walk into on a winter morning. Nothing more, nothing less."', '"겨울 아침 처음 들어서는 따뜻한 방 같은 옷을 만들고 싶었습니다. 그 이상도, 그 이하도 아닌."'),
     B('Han Jiwoo', '한지우'), B('Founder & creative director, ONDO', '온도 창립자 & 크리에이티브 디렉터')),
    (B('"Our patterns come from workwear archives, but the proportions come from the way people in Seoul move: on the subway, on bikes, around small tables."', '"패턴은 워크웨어 아카이브에서 왔지만, 비율은 서울 사람들이 움직이는 방식에서 왔습니다. 지하철에서, 자전거 위에서, 작은 식탁 주변에서."'),
     B('Park Minjun', '박민준'), B('Head of pattern, ONDO studio', '온도 스튜디오 패턴 총괄')),
]
qi = 0
for it in m['items']:
    if it.get('modal'):
        qt, name, role = quotes[qi % len(quotes)]
        qi += 1
        it['modal'] = {'quote': qt, 'title': name, 'subtitle': role, 'cta': None}
    if it.get('alt') is not None:
        it['alt'] = B('ONDO journal', '온도 저널')

# ------------------------------------------------------------------ shops
sh = d['shops']
sh['label'] = B('Shops', '매장')
sh['title1'] = B('Warmth in', '매일의')
sh['title2'] = B('everyday wear', '온기')
sh['subtitle1'] = B('Seoul\nWomen', '서울\n여성')
sh['subtitle2'] = B('Seoul\nMen', '서울\n남성')
sh['image']['alt'] = B('The ONDO team in the Seongsu studio', '성수 스튜디오의 온도 팀')
for k, en, ko in (('shopTFC', 'Women', '여성'), ('shopST', 'Men', '남성')):
    x = sh[k]
    x['title'] = B(en, ko)
    x['cta']['label'] = B(f'Discover {en.lower()}', f'{ko} 컬렉션 보기')
    if x.get('link'): x['link']['label'] = B('Stores', '매장 안내')
    if x.get('website'): x['website']['label'] = B('Journal', '저널')
    if x.get('socials'): x['socials']['label'] = B('Follow ONDO', '온도 팔로우')
    if x['image'].get('alt') is not None: x['image']['alt'] = B('ONDO', '온도')

open(P, 'w').write(s[:i] + 'export default ' + json.dumps(d, ensure_ascii=False, indent=2) + ';\n')
print('copy written')
