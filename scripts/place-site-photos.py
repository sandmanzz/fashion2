"""Place generated photos into the site.

usage: python3 scripts/place-site-photos.py <dir-with-0..58.png> <pdp-dir>

* Site photos 0..58 -> public/images/site/NN.webp and wired into src/js/content.js
* PDP photos         -> public/images/products/<slug>/<shot>.webp
* Cut-outs           -> public/images/products/<slug>/cutout.webp (transparent, used by the product reveal)
"""
import json, os, sys
from PIL import Image

SITE, PDP = sys.argv[1], sys.argv[2]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


def save(src, dst, max_side=1920, q=82):
    im = Image.open(src)
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA') else 'RGB')
    im.thumbnail((max_side, max_side))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, 'WEBP', quality=q, method=6)
    return im.size


# ---- content.js ---------------------------------------------------------
p = 'src/js/content.js'
s = open(p).read()
i = s.index('export default ')
d = json.loads(s[i + 15:].rstrip().rstrip(';'))
story = d['story']['archs']
slots = {
    0: story[0]['chapter']['panels'][0]['items'][3]['image'],
    1: story[0]['chapter']['panels'][1]['item']['image'],
    2: story[1]['chapter']['panels'][0]['items'][1]['image'],
    3: story[1]['chapter']['panels'][1]['items'][0]['image'],
    4: story[1]['chapter']['panels'][2]['item']['image'],
    5: story[2]['chapter']['panels'][0]['items'][0]['image'],
    6: story[2]['chapter']['panels'][0]['items'][1]['image'],
    7: story[2]['chapter']['panels'][0]['items'][2]['image'],
    8: story[2]['chapter']['panels'][1]['items'][0]['image'],
    9: story[2]['chapter']['panels'][1]['items'][1]['image'],
    10: story[2]['chapter']['panels'][2]['items'][0]['image'],
    11: story[2]['chapter']['panels'][2]['items'][1]['image'],
    12: story[2]['chapter']['panels'][3]['item']['image'],
    13: d['collection']['imageMobile'],
    24: d['shops']['shopTFC']['image'],
    25: d['shops']['shopST']['image'],
}
for k in range(10):
    slots[14 + k] = d['collection']['gallery'][k]
for k in range(33):
    slots[26 + k] = d['medias']['items'][k]

for n, slot in slots.items():
    w, h = save(f'{SITE}/{n}.png', f'public/images/site/{n:02d}.webp')
    slot['src'] = f'/images/site/{n:02d}.webp'
    slot['width'], slot['height'] = w, h
    if slot.get('alt'):
        slot['alt'] = 'ONDO campaign photo'

# ---- products -----------------------------------------------------------
shots = {
    'gyeol-chore-jacket': {'packshot': 'gyeol-packshot', 'model-front': 'gyeol-model-front', 'model-back': 'gyeol-model-back', 'detail': 'gyeol-detail', 'cutout': 'gyeol-cut'},
    'bit-oxford-shirt': {'packshot': 'bit-packshot', 'model-front': 'bit-model-front', 'model-side': 'bit-model-side', 'detail': 'bit-detail', 'cutout': 'bit-cut'},
    'jul-pleated-trouser': {'packshot': 'jul-packshot', 'model-front': 'jul-model-front', 'model-walk': 'jul-model-walk', 'detail': 'jul-detail'},
    'on-cropped-cardigan': {'packshot': 'on-packshot', 'model-front': 'on-model-front', 'model-open': 'on-model-open', 'detail': 'on-detail'},
}
for slug, files in shots.items():
    for shot, f in files.items():
        save(f'{PDP}/{f}.png', f'public/images/products/{slug}/{shot}.webp', max_side=1500 if shot == 'cutout' else 1920)

# product reveal block uses the transparent cut-outs
d['shirts']['shirts'][0]['image'] = '/images/products/gyeol-chore-jacket/cutout.webp'
d['shirts']['shirts'][1]['image'] = '/images/products/bit-oxford-shirt/cutout.webp'

open(p, 'w').write(s[:i] + 'export default ' + json.dumps(d, ensure_ascii=False, indent=2) + ';\n')
print('placed', len(slots), 'site photos')
