// Smooth scroll (Lenis) driven by the GSAP ticker + a tiny scroll-callback bus.
// Mirrors the original "useScroll" composable 1:1 (same options/easing).
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const state = { lenis: null, prevent: false, callbacks: new Map(), values: null };

function emit({ scroll, limit, velocity, direction, progress }) {
  const v = { scroll, limit, velocity, direction, progress };
  state.values = v;
  state.callbacks.forEach((cb) => cb(v));
}
const raf = (t) => state.lenis?.raf(t * 1000);

export const scroll = {
  get lenis() { return state.lenis; },
  get values() { return state.values; },
  init() {
    if (state.lenis) return;
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    state.lenis = new Lenis({
      duration: safari ? 1.8 : 1.2,
      easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: safari ? 0.5 : 1,
      infinite: false,
    });
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    state.lenis.on('scroll', ScrollTrigger.update);
    state.lenis.on('scroll', emit);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  },
  watch(cb) { state.callbacks.set(cb, cb); },
  unwatch(cb) { state.callbacks.delete(cb); },
  start() { state.lenis?.start(); state.prevent = false; },
  stop() { state.lenis?.stop(); state.prevent = true; },
  scrollTo(to, opts = {}) { state.lenis?.scrollTo(to, opts); },
  resize() { state.lenis?.resize(); },
};

export function setVh() {
  if ((window.visualViewport?.scale ?? 1) > 1.05) return;
  document.documentElement.style.setProperty('--vh', 0.01 * window.innerHeight + 'px');
}
