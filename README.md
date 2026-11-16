# fashion2 — front-end template

A front-end-only rebuild of the scroll-driven storytelling site, with every image,
video, logo and text replaced by **placeholders**. Layout, motion and interactions
mirror the reference site: Lenis smooth scroll + GSAP/ScrollTrigger, same easing,
timings and scroll ranges.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Where to put your content

| What | Where |
|---|---|
| All text, image paths, video paths, links | `src/js/content.js` |
| Image placeholders | `public/placeholders/img-XX.svg` (labelled with the expected size) |
| Video placeholders | set `video` / `videoMobile` paths in `content.js`; files go in `public/videos/` — until then the labelled poster is shown |
| Wordmark, ornament, emblem | `src/js/svg-brand.js` |
| Logo A / Logo B / partner / team logos / icons | `src/js/icons.js` |
| Marble background texture | `public/images/marble.svg` |
| Fonts | `index.html` (Google Fonts) + `--font-script / --font-display / --font-serif` in `src/styles/main.css` |
| Page block order | `blocks` array in `src/main.js` |

## Sections and motion

1. **Loader** – progress bar, then fade.
2. **Hero** – looping intro video + branding reveal (logos slide, wordmark letters rise, tagline letters), *Enter* → scroll-scrubbed video that shrinks while the paragraph fills with colour letter by letter.
3. **Products** – headline with two products on pedestals rising (parallax).
4. **Story** – pinned horizontal chapters: row of arches drawn on canvas (video clipped in each arch), centre arch zooms to fullscreen while a script title rises and marquees, panels slide horizontally with vertical stagger; chapter navigator; player cards behind a circular text cursor. Mobile uses a vertical variant.
5. **Film** – video grows from 44% to full, circular "watch" cursor opens a fullscreen player.
6. **Collection** – two images grow open, gallery drifts sideways, emblem rotates.
7. **Event** – scrubbed video grows to fullscreen, tickets scroll over it.
8. **Press wall** – horizontal wall moving in a wave pattern + script marquee, modal on click.
9. **Shops** – image grows, two shop cards.
10. **Footer**.

Code: `src/js/core/` (scroll, section progress, store, utils), `src/js/components/` (one module per block), `src/styles/main.css` (ported stylesheet).
