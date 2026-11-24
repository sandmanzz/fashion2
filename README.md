# ONDO 온도 — Website & Brand Book

> **Warmth in everyday wear · 매일의 온기**
> Western workwear, re-cut in Seoul. Daily & work clothes made to be worn for years and repaired for life.

This repository is the front-end (no backend) of the ONDO brand site: a scroll-driven storytelling homepage, 8 collection pages, product detail pages, bilingual EN / 한국어, with a UI-version switcher (V1 reference / V2 ONDO direction) for design testing.

---

## Contents
1. [Quick start](#1-quick-start)
2. [Brand](#2-brand)
3. [Logo system](#3-logo-system)
4. [Visual identity](#4-visual-identity)
5. [Collections & products](#5-collections--products)
6. [Site map & sections](#6-site-map--sections)
7. [Motion system](#7-motion-system)
8. [UI versions (V1 / V2)](#8-ui-versions-v1--v2)
9. [Bilingual (EN / KO)](#9-bilingual-en--ko)
10. [Technical architecture](#10-technical-architecture)
11. [Content editing guide](#11-content-editing-guide)
12. [Asset production (AI pipeline)](#12-asset-production-ai-pipeline)
13. [Known limitations & next steps](#13-known-limitations--next-steps)
14. [Changelog](#14-changelog)

---

## 1. Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in dist/ (index, product, collection pages)
npm run preview
```

Useful URLs:

| URL | What |
|---|---|
| `/` | Home (storytelling scroll) |
| `/?ui=v2&lang=ko` | Home, V2 design, Korean |
| `/collection.html?c=achim` | Collection page (`achim jageop gyeol hanji jangma dancheong gyeoul swim`) |
| `/product.html?p=gyeol-chore-jacket` | Product page (`gyeol-chore-jacket bit-oxford-shirt jul-pleated-trouser on-cropped-cardigan`) |
| `/#materials`, `/#collections`, … | Deep link to a home block (ids = block keys) |

The floating pill bottom-left switches **UI V1 / V2** and **EN / 한**. Both choices persist in `localStorage`.

Requirements: Node 18+. Stack: Vite 6.3.5, GSAP 3.14.2 (ScrollTrigger), Lenis 1.3.19. No framework, vanilla ES modules.

---

## 2. Brand

### Name
**ONDO · 온도** — "temperature / warmth". Short, pronounceable globally, unmistakably Korean without being kitsch. The brand idea: *not the heat of a trend, but the quiet warmth of clothes you return to every morning.*

### Positioning
- **What:** daily-life and work clothing — casual, vintage-minimalist, with one unique detail per garment.
- **Roots:** Western workwear (French chore coats, American oxfords, tailored trousers) reworked in Seoul with Korean proportions.
- **For whom:** people of Seoul who move between desk, street and table — designers, cooks, teachers, students. Women and men; many pieces are unisex / shareable.
- **Promise:** made in small batches, honest prices, no seasonal sales, **free repairs for life**.

### Brand pillars
| Pillar | Meaning | Expressed as |
|---|---|---|
| 온기 Warmth | Constant, not loud | Warm palette, soft light, calm motion |
| 반복 Repetition | Designed for the 100th wear | Durable materials, material tour |
| 하나의 디테일 One detail | Each garment gets one gesture | Piping, contrast stitch, brass adjuster |
| 함께 Together | Clothes shared and mended | Community events, repair service |

### Voice & tone
- Quiet, precise, warm. Short sentences. No hype words, no exclamation marks.
- Concrete over abstract ("12oz cotton twill, woven in Daegu" > "premium fabric").
- Korean copy is written natively (not translated word-for-word); uses `keep-all` line breaking.
- Taglines: *Warmth in everyday wear · 매일의 온기* / *More than a uniform, a quiet way of being. · 유니폼을 넘어, 조용한 태도로.*

### Story (home "Story" chapters)
| Chapter | Korean | Theme | Descriptor |
|---|---|---|---|
| I | 아침 Morning | The first hour of the day | Getting dressed, clothes made to be repeated |
| II | 작업 Atelier | How every piece is made | Seongsu studio, the single detail, mills in Daegu/Japan |
| III | 함께 Together | The people who wear it | Real Seoul people, Saturday table, made to be mended |

Featured people (fictional, for content): Park Minjun 박민준 (pattern maker), Kim Seoyeon 김서연 (ceramicist), Lee Hayoon 이하윤 (architect), Choi Doyun 최도윤 (chef), Jung Yuna 정유나 (florist), Han Jiwoo 한지우 (founder & creative director).

---

## 3. Logo system

All logo artwork is pure geometry (no font dependency) — files in `public/brand/`, UI versions in `src/js/svg-logo.js`.

| Asset | File | Concept |
|---|---|---|
| **Mark** | `ondo-mark.svg` | A hanok window **창** with its **창살** lattice; the lattice breaks around a circle **ㅇ** — the first letter of 온도 and the morning sun through the window (= warmth). |
| **Hangul logotype** | `ondo-hangul.svg` | 온도 built from straight strokes + one circle, matching the mark's line weight. |
| **Seal 도장** | `ondo-seal.svg` | Brick-red (#9a4b3a) traditional seal, 온 over 도 (top-to-bottom), double frame. For tags, packaging, stamps. A mono outline version is used in the UI. |
| **Lockup** | `ondo-logo.svg` | Mark · ONDO wordmark · 온도. |
| **Wordmark** | `src/js/svg-brand.js` (`wordmark`) | "ONDO", Cinzel-based paths with generous tracking. |

Usage rules
- Clear space = ½ mark width on all sides. Minimum mark size 16px (favicon uses the mark).
- Colours: dark gold on light, light gold on dark gray; seal always red with cream strokes (or mono outline).
- Never place the mark over busy photography without a scrim; never recolour the seal outside red/mono.

---

## 4. Visual identity

### Colour tokens (`:root` in `src/styles/main.css`)
| Token | Hex | Use |
|---|---|---|
| `--color-light-gold` | `#f0e3cf` | Paper / backgrounds / text on dark |
| `--color-dark-gold` | `#c3a677` | Accents, rules, logo |
| `--color-dark-gray` | `#58595b` | Dark sections, body text |
| `--color-cta-gray` | `#3a3a3a` | Buttons, pills |
| `--color-dark` | `#0b090a` | Deep shadow |
| Seal red | `#9a4b3a` | Seal, errors |

Garment palette (photography & product): oat, ecru, cream, charcoal, olive, faded navy; Dancheong capsule adds muted celadon & cinnabar.

### Typography
| Role | Latin | Korean fallback | Variable |
|---|---|---|---|
| Display (titles, labels) | Bebas Neue | Noto Sans KR | `--font-display` |
| Serif (body, captions) | Times New Roman | Noto Serif KR | `--font-serif` |
| Script (V1 marquees, tagline) | Pinyon Script | Noto Serif KR | `--font-script` |
| Korean display words | — | Noto Serif KR 300 | `--font-kr-serif` |

(Original reference used licensed fonts; these are free Google Fonts substitutes — swap the variables to change them.)

### Texture & photography
- **Marble paper** background (`public/images/marble.svg`, generated noise veins, 13–20% opacity with `exclusion` blend).
- Photography direction: vintage minimalist, soft natural light, 35mm film grain, Korean models (women & men), Seoul locations (Seongsu, Euljiro, hanok interiors, Han river). **No text or signage in frame.**

---

## 5. Collections & products

### 8 collections (`src/js/collections.js`)
| # | Slug | Korean | Name | Focus | Season |
|---|---|---|---|---|---|
| 01 | achim | 아침 | Morning Uniform | Oxford shirts, chore jackets | Permanent |
| 02 | jageop | 작업 | Workroom | Canvas overshirts, utility trousers | Permanent |
| 03 | gyeol | 결 | Texture | Bouclé, tweed, brushed wool | AW |
| 04 | hanji | 한지 | Paper | Crisp poplin, white & ecru | SS |
| 05 | jangma | 장마 | Monsoon | Waxed cotton, rain layers | Summer |
| 06 | dancheong | 단청 | Muted Colour | Celadon, cinnabar, indigo | Limited |
| 07 | gyeoul | 겨울 | Winter | Wool coats, quilted liners | Winter |
| 08 | swim | 쉼 | Rest | Jersey, open cardigans | Permanent |

### Products (`src/js/products.js`)
| Slug | Name | Korean | Price | Signature detail | Collections |
|---|---|---|---|---|---|
| gyeol-chore-jacket | Gyeol Chore Jacket | 결 | ₩2,890,000 | Brown contrast topstitch, corozo buttons | achim, jageop |
| bit-oxford-shirt | Bit Oxford Shirt | 빛 | ₩1,390,000 | Black piping on placket & cuffs | achim, hanji |
| jul-pleated-trouser | Jul Pleated Trouser | 줄 | ₩1,990,000 | Brass side adjusters, double pleats | jageop, gyeoul |
| on-cropped-cardigan | On Cropped Cardigan | 온 | ₩1,590,000 | Mother-of-pearl buttons | gyeol, swim |

Each product: packshot, 2 on-model shots (Korean woman + man), 1 macro detail, colours, sizes, details, care — all bilingual. Prices are placeholders.

### Material story (V2 home block "What it's made of")
12oz cotton twill (Daegu) · double contrast topstitch (flat-felled) · corozo nut buttons · bar-tack reinforcement (42 stitches) · brushed oxford (long-staple) · black piping (hand-set).

---

## 6. Site map & sections

### Home (`index.html` → `src/main.js`)
Order is defined in the `blocks` array of `src/main.js`.

| Block id | Component | What it does |
|---|---|---|
| hero | `components/hero.js` | Loader → looping intro video + branding (mark, seal, wordmark, tagline) → *Enter* → scroll-scrubbed video shrinks while the manifesto fills letter by letter |
| materials (V2) / shirts (V1) | `components/materials.js` / `shirts.js` | V2: pinned material tour with 6 hotspots. V1: products rising on plinths |
| story | `components/story.js` | 3 pinned horizontal chapters; arches (V1) / hanok windows (V2) on canvas clip a looping video, centre zooms full-screen, title marquee, panels slide horizontally with vertical hand-off, player cards, chapter navigator |
| video | `components/blocks.js` (film) | Film teaser grows 44%→100%, circular cursor opens a full-screen player with the brand film |
| collection | blocks.js | Two looks grow open, gallery drifts, emblem rotates, shop CTAs |
| collections | `components/collections.js` | Grid of the 8 collections, clip/scale grow-in, cursor "Explore" |
| pieces | `components/pieces.js` | All 12 products: same grow-in + cursor, hover shows the model shot, category filter chips |
| weekend | blocks.js | Events (Open Studio, Mending Day): scrubbed video grows full-screen, tickets scroll over |
| medias | blocks.js | Journal wall: horizontal wave-scroll of 15 images, quote modals |
| shops | blocks.js | Group image grows, Women / Men shop cards |
| footer | blocks.js | Mark, wordmark, links |

### Collection page (`collection.html` → `src/collection.js`)
Hero (Korean word rises over an opening cover), story, pieces in the collection (+ "more pieces arriving soon"), script/outline marquee, strip of the other 7 collections.

### Product page (`product.html` → `src/product.js`)
Sticky info (Korean word & meaning, letter-rise title, price, colour swatches, size selector, Add to bag with validation shake, accordions), grow-in gallery, bag drawer (localStorage), "Worn with" cards, marquee, footer.

---

## 7. Motion system

All motion runs on one clock: Lenis smooth scroll (duration 1.2, expo-out easing, 1.8 on Safari) ticked by the GSAP ticker; ScrollTrigger updates on Lenis scroll.

Core primitives (`src/js/core/`):
- **`sections.js`** — every block registers a section; progress = `(vh − top) / (vh + height)` (0 → 1 from entering bottom to leaving top) + active flag. Drives most effects.
- **Grow-in** — `GROW_START = vh/(vh+h)`, `GROW_END = 2vh/(vh+h)`; media width/height from 0 → full while the image inside scales 2 → 1.
- **Clip reveal** — `clip-path: inset()` + inner scale 1.35 → 1 (PDP, collections, cards).
- **Letter rise** — chars in overflow-hidden spans, `yPercent 110 → 0`, power4.out, stagger 0.03–0.08.
- **Char animation** — labels swap with out (−6px, power4.in) / in (+6px, power4.out) staggers (cursor labels, story navigator).
- **Mouse follower** — elastic 0.08 lerp, ±20px, circular label rotates with x, label swap to "Close".
- **Marquee title** — reveal (rise + slide from ¼ vw), then scroll-linked translateX.
- **Story chapter** — progress per chapter: `<0` pre-pan, `0–¼` zoom (easeInOut), `¼–¾` horizontal track + vertical hand-off of content, `¾–1` exit slide.
- **Material tour** — pinned section height `(100 + steps×70) vh`; step = floor(progress × 6); on change: frame pushes toward hotspot (scale 1.16), line draws, macro opens from a circle, body staggers in.

Video handling (`scripts/process-videos.sh`): scrubbed clips are all-intra (every frame a keyframe) for smooth `currentTime` seeking; loops are ping-pong (forward + reverse) for seamless repeats; one shared colour grade.

---

## 8. UI versions (V1 / V2)

Switch via the pill or `?ui=v1|v2` (`src/js/ui-version.js`, sets `<html data-ui>`). V2 rules live in `src/styles/v2.css` and `isV2` branches.

| Area | V1 (reference) | V2 (ONDO) |
|---|---|---|
| Story frames | Roman arches in a flat row | Hanok windows 창 with 창살 lattice, stepped curve; lattice fades on zoom |
| Chapter header | Mirrored wordmark, double rule, oval tag | Editorial: `01 — 03`, Korean word (아침), "Chapter I — Morning", ONDO 온도, single hairline |
| Chapter title | Script ("Chapter One") | Outline display caps (MORNING), solid inside the window |
| Story navigator | Square double-border | Rounded dark pill; items show label · Korean word, title, descriptor |
| Product block | Products on plinths | Material hotspot tour |
| Top navigation | Logo box (A ≡ B) | Removed; minimal "MENU" pill top-right |
| First chapter item | Starts at left edge | Pushed right & down so it is seen whole before moving |

### V3 — Atelier (`?ui=v3`)
Homepage only (`src/v3/home.js`, `src/v3/v3.css`; entry switch in `src/entry.js`). Sub-pages reuse the V2 look for now.
The page follows one garment through the workroom, on native scroll (no pinned horizontal tracks, no repeated grow-in):

| Station | Interaction |
|---|---|
| Hero | Split editorial headline + atelier photo with a swinging hang tag |
| 01 원단 Cloth | Swatch board: pinned, pinking-shear-edged swatches |
| 02 재단 Cut | 8 collections as dashed pattern pieces; scissors travel along the cut on hover |
| 03 봉제 Sewn | Clothes rail of all products: drag to browse, category filters, hover shows the model shot |
| 04 착용 Worn | Film contact sheet of the campaign, click opens a lightbox |
| 05 수선 Repaired | Worn/repaired before-after slider, counters, front-end repair ticket |
| Footer | Care label |

Scroll runs on the same Lenis clock as V1/V2; parallax: hero photo, floating swatches, photos sliding inside pattern pieces, contact sheet pulled sideways, headline lines leaving the hero.
Signatures: a red stitch line that is sewn down the page as you scroll, a tailor's ruler (cm) as scroll indicator, and a receipt-strip top bar.
Catalogue grew from 4 to 12 products (8 new, 4 images each, AI-generated to match the house style).

---

## 9. Bilingual (EN / KO)

- `src/js/i18n.js`: language from `?lang=en|ko` or `localStorage` (`ondo-lang`), sets `<html lang>`.
- Any `{ en, ko }` value in `content.js`, `products.js`, `collections.js` is resolved by `localize()`; pages import `src/js/site.js` (localized content).
- Interface strings (Add to bag, Close, Size…) live in the `UI` dictionary in `i18n.js` → `t('key')`.
- Korean typography: Noto Sans/Serif KR fallbacks, `word-break: keep-all`, larger line-height.
- Dates in events use `ko-KR` / `en-GB` locales.
- Block anchors use stable ids (block keys), never label slugs, so Korean labels work in navigation.

---

## 10. Technical architecture

```
index.html · product.html · collection.html   # Vite multi-page (vite.config.js)
src/
  main.js · product.js · collection.js         # page entry points
  js/
    content.js        # all home content (bilingual, generated/edited by scripts)
    site.js           # localized content export
    products.js       # product catalogue (bilingual)
    collections.js    # 8 collections (bilingual)
    i18n.js           # language + UI strings
    ui-version.js     # V1/V2 + EN/KO switcher pill
    icons.js · svg-brand.js · svg-logo.js       # icons, wordmark/ornament, ONDO logos
    core/  scroll.js (Lenis+GSAP) · sections.js · store.js · utils.js
    components/  shell (loader, nav, scroll thumb) · hero · shirts · materials ·
                 story · blocks (film, collection, events, journal, shops, footer, modals) ·
                 collections · common (buttons, marble, branding, cursors, titles, media)
  styles/
    main.css          # ported base stylesheet (tokens, all V1 blocks)
    overrides.css · v2.css · collections.css · materials.css · product.css
public/
  brand/              # logo SVGs
  images/             # brand/ site/ products/ collections/ materials/ posters/ marble.svg
  videos/             # hero-intro, hero-scroll, ch1–3, film, film-teaser, event (18 MB)
scripts/
  process-videos.sh   # grade + encode videos
  place-site-photos.py# WebP conversion + wiring into content.js
  write-copy.py       # writes the bilingual brand copy into content.js
```

Performance notes: images are WebP (≈20 MB total), videos 18 MB; story builds lazily when near the viewport; canvas loops only while videos play; scroll listeners share one Lenis event.

Browser support: evergreen Chrome/Safari/Firefox; uses `clip-path: path()`, `Path2D.roundRect`, CSS `aspect-ratio`.

---

## 11. Content editing guide

| To change | Edit |
|---|---|
| Any home text (EN/KO) | `src/js/content.js` (values `{ "en": …, "ko": … }`) — or edit `scripts/write-copy.py` and rerun it |
| Products | `src/js/products.js` + images in `public/images/products/<slug>/` (`packshot`, `model-front`, `model-*`, `detail`) |
| Collections | `src/js/collections.js` + `public/images/collections/<slug>.webp` |
| Material tour hotspots | `content.js → materials.spots` (`x`,`y` in % of the garment image) |
| Block order / remove a block | `blocks` array in `src/main.js` |
| Videos | `public/videos/*` (run `scripts/process-videos.sh <raw-dir>`) and paths in `content.js` |
| Logo | `public/brand/*` and `src/js/svg-logo.js` |
| Colours / fonts | `:root` in `src/styles/main.css`, `collections.css` (Korean font vars) |
| UI strings | `UI` dictionary in `src/js/i18n.js` |

---

## 12. Asset production (AI pipeline)

All imagery and video was generated with Higgsfield and curated with a "roast before generate" review (reject anything with fake text/signage, warped garments or magazine layouts; regenerate).

| Asset | Model | Notes |
|---|---|---|
| Campaign, story, journal, collection photos | Soul 2.0 (≈0.12 cr) | Prompts always end with the brand style + "no text, no signage" |
| Product packshots | Soul 2.0 | Flat lay works better than ghost mannequin for shirts |
| On-model & macro product shots | GPT Image 2.6 medium (0.5 cr) | Uses the packshot as reference → identical garment |
| Clean cut-outs | GPT Image 2.6 `background: transparent` / background remover | Product reveal, material tour |
| Videos | MiniMax H3 Max (hero, film) · Grok Video 1.5 Lite (chapters, event) | One slow camera move, no cuts; graded & encoded by script |

Lessons: the word "cover" triggers magazine typography; Soul reference images override "on-model" instructions; always A/B test video models on one shot before batching.

Approximate spend: ≈ 2 (first photos) + 62.6 (videos) + 19.7 (site + products) + 2.3 (collections, group, logo round) + ≈4 (material tour) credits.

---

## 13. Known limitations & next steps

- No backend: bag is `localStorage`, checkout/newsletter/stores are not wired. Prices are placeholders.
- Only 4 products; 6 collections show "more pieces arriving soon".
- Hero scroll video still shows the AI-made shopfront text on the storefront plaque/curtain (regenerate the store still without text and re-animate, ≈13 cr).
- Event dates/content are illustrative.
- Next: apply V2 language to hero/collection/events/journal; SEO meta per page; image `srcset` sizes; accessibility pass (focus states, reduced-motion mode).

---

## 14. Changelog

| Commit | Summary |
|---|---|
| Template | Front-end rebuild of the reference scroll site with placeholders and identical motion |
| Brand ONDO | First 10 photos, ONDO wordmark, storyboard |
| Videos | 7 site videos + brand film, grading/encoding pipeline |
| Catalogue | All site photos, 4 products, product detail page |
| UI switcher | V1/V2, hanok windows, editorial chapter headers |
| V2 feedback | Logo system, bilingual copy, 8 collections + pages, story naming, journal shortened, nav cleanup |
| Material tour | V2 hotspot "What it's made of" block, first chapter item spacing, this README |
