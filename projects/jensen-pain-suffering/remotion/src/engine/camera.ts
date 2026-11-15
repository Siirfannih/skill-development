// Jalur kamera: keyframe -> pose per frame -> (opsional) gaussian σ per segmen (references/smooth-motion.md §4).
import { EASE, EaseName, lerp, clamp01, W, H } from './theme';

/** Pose kamera. (x, y) = titik dunia yang tampil di tengah layar; zoom = skala bidang z=0 di layar;
 *  rx/ry/rz derajat (pitch, yaw, roll) mengorbit titik itu. */
export type Pose = { x: number; y: number; zoom: number; rx: number; ry: number; rz: number };
export const REST: Pose = { x: W / 2, y: H / 2, zoom: 1, rx: 0, ry: 0, rz: 0 };

/** Keyframe: frame absolut + nilai yang berubah. `ease` = easing MENUJU kunci ini. */
export type Key = { f: number; ease?: EaseName } & Partial<Pose>;

function rawPath(keys: Key[]) {
  const full: (Pose & { f: number; ease: EaseName })[] = [];
  let prev: Pose = { ...REST };
  for (const k of keys) {
    const p = { ...prev, ...k, ease: k.ease ?? 'inOut' } as Pose & { f: number; ease: EaseName };
    full.push(p);
    prev = p;
  }
  return (f: number): Pose => {
    if (f <= full[0].f) return full[0];
    const last = full[full.length - 1];
    if (f >= last.f) return last;
    let i = 0;
    while (f > full[i + 1].f) i++;
    const a = full[i], b = full[i + 1];
    const t = EASE[b.ease](clamp01((f - a.f) / (b.f - a.f)));
    return {
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      zoom: Math.exp(lerp(Math.log(a.zoom), Math.log(b.zoom), t)), // zoom di ruang log
      rx: lerp(a.rx, b.rx, t),
      ry: lerp(a.ry, b.ry, t),
      rz: lerp(a.rz, b.rz, t),
    };
  };
}

const cache = new Map<string, (f: number) => Pose>();

/**
 * Bangun fungsi pose per frame (boleh pecahan, untuk motion blur).
 * opts.sigma: σ gaussian dalam frame (default 3.6 = 0,12 dtk); 0 = tanpa penghalusan.
 * opts.cuts: frame tempat penghalusan tidak boleh menyeberang (cut / HOLD keras).
 */
export function camPath(keys: Key[], opts: { sigma?: number; cuts?: number[] } = {}): (f: number) => Pose {
  const id = JSON.stringify([keys, opts]);
  const hit = cache.get(id);
  if (hit) return hit;
  const raw = rawPath(keys);
  const sigma = opts.sigma ?? 3.6;
  if (sigma <= 0) { cache.set(id, raw); return raw; }
  const f0 = Math.floor(keys[0].f), f1 = Math.ceil(keys[keys.length - 1].f);
  const cuts = [f0, ...(opts.cuts ?? []).filter((c) => c > f0 && c < f1), f1 + 1];
  const n = f1 - f0 + 1;
  const samples: Pose[] = [];
  for (let i = 0; i < n; i++) samples.push(raw(f0 + i));
  const rad = Math.ceil(sigma * 3);
  const wts = Array.from({ length: 2 * rad + 1 }, (_, k) => Math.exp(-((k - rad) ** 2) / (2 * sigma * sigma)));
  const sm: Pose[] = samples.map((_, i) => {
    const fAbs = f0 + i;
    let segA = f0, segB = f1;
    for (let c = 0; c < cuts.length - 1; c++) if (fAbs >= cuts[c] && fAbs < cuts[c + 1]) { segA = cuts[c]; segB = cuts[c + 1] - 1; }
    const acc = { x: 0, y: 0, lz: 0, rx: 0, ry: 0, rz: 0 };
    let ws = 0;
    for (let k = -rad; k <= rad; k++) {
      const j = Math.min(segB, Math.max(segA, fAbs + k)) - f0; // tepi segmen ditahan (edge pad)
      const p = samples[j], w = wts[k + rad];
      acc.x += p.x * w; acc.y += p.y * w; acc.lz += Math.log(p.zoom) * w;
      acc.rx += p.rx * w; acc.ry += p.ry * w; acc.rz += p.rz * w; ws += w;
    }
    return { x: acc.x / ws, y: acc.y / ws, zoom: Math.exp(acc.lz / ws), rx: acc.rx / ws, ry: acc.ry / ws, rz: acc.rz / ws };
  });
  const fn = (f: number): Pose => {
    if (f <= f0) return sm[0];
    if (f >= f1) return sm[n - 1];
    const i = Math.floor(f - f0), t = f - f0 - i;
    const a = sm[i], b = sm[Math.min(n - 1, i + 1)];
    return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), zoom: Math.exp(lerp(Math.log(a.zoom), Math.log(b.zoom), t)), rx: lerp(a.rx, b.rx, t), ry: lerp(a.ry, b.ry, t), rz: lerp(a.rz, b.rz, t) };
  };
  cache.set(id, fn);
  return fn;
}

/** Proyeksi 2D kasar titik dunia (bidang z=0) ke layar; dipakai untuk mengukur kecepatan kamera. */
export function project(p: Pose, wx: number, wy: number) {
  const a = (p.rz * Math.PI) / 180;
  const dx = (wx - p.x) * p.zoom, dy = (wy - p.y) * p.zoom;
  return { x: W / 2 + dx * Math.cos(a) - dy * Math.sin(a), y: H / 2 + dx * Math.sin(a) + dy * Math.cos(a) };
}

/** Kecepatan layar maksimum (px/frame) di 5 titik frame antara f-1 dan f. */
export function screenSpeed(pose: (f: number) => Pose, f: number) {
  const a = pose(f - 1), b = pose(f);
  let m = 0;
  for (const [sx, sy] of [[0, 0], [W, 0], [0, H], [W, H], [W / 2, H / 2]]) {
    // titik layar sx,sy pada pose b -> dunia -> layar pada pose a
    const ang = (-b.rz * Math.PI) / 180;
    const dx = (sx - W / 2) / b.zoom, dy = (sy - H / 2) / b.zoom;
    const wx = b.x + dx * Math.cos(ang) - dy * Math.sin(ang), wy = b.y + dx * Math.sin(ang) + dy * Math.cos(ang);
    const pa = project(a, wx, wy);
    m = Math.max(m, Math.hypot(pa.x - sx, pa.y - sy));
  }
  return m;
}

/** Guncang benturan (C14): offset px layar yang meluruh exp(−10·d) mulai frame f0. Tambahkan ke pose.x/y (÷ zoom). */
export function shake(f: number, f0: number, amp = 10, dur = 9) {
  if (f < f0 || f > f0 + dur) return { dx: 0, dy: 0 };
  const d = (f - f0) / 30;
  const k = amp * Math.exp(-10 * d);
  return { dx: k * Math.sin((f - f0) * 2.7), dy: k * Math.cos((f - f0) * 3.3) };
}

/** Tambahkan guncang ke fungsi pose. */
export const withShake = (pose: (f: number) => Pose, hits: { f: number; amp?: number; dur?: number }[]) => (f: number): Pose => {
  const p = pose(f);
  let dx = 0, dy = 0;
  for (const h of hits) { const s = shake(f, h.f, h.amp, h.dur); dx += s.dx; dy += s.dy; }
  return { ...p, x: p.x + dx / p.zoom, y: p.y + dy / p.zoom };
};
