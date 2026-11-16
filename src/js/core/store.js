// Minimal reactive store (replaces Vue's useState). key -> value with subscribers.
const values = new Map();
const subs = new Map();

export function get(key, init) {
  if (!values.has(key)) values.set(key, typeof init === 'function' ? init() : init);
  return values.get(key);
}
export function set(key, val) {
  const prev = values.get(key);
  values.set(key, val);
  if (prev !== val) (subs.get(key) || []).forEach((fn) => fn(val, prev));
}
export function on(key, fn) {
  if (!subs.has(key)) subs.set(key, []);
  subs.get(key).push(fn);
  return () => subs.set(key, subs.get(key).filter((f) => f !== fn));
}
