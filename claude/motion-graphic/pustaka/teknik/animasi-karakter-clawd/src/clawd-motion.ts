// clawd-motion.ts: port TypeScript dari matematika gerak ClaudeAnimationBase (MIT, (c) 2026 John Heibel,
// https://github.com/JohnHeibel/ClaudeAnimationBase, commit 0ac8bf2; lisensi di ../LICENSE; sumber asli di motion-excerpt.js).
// Hanya gerak, tanpa gambar: hasilnya adalah medan pose yang kamu terapkan ke rig apa pun (grup three.js, SVG, sprite).
// Semua fungsi MURNI dari t (detik = frame / fps), jadi aman di-scrub dan dirender paralel di Remotion.
// Satuan: dx, dy dalam u (tinggi/lebar satu unit tubuh; dy negatif = naik, seperti aslinya). sq = squash (negatif = regang).
// Di proyek: ganti isi EASE dengan CURVE dari scripts/remotion/curves.ts (soft -> drift, out -> land, in -> leave);
// overshoot `back` dan pegas `spring` tidak ada di curves.ts dan dipakai untuk settle/follow-through.

export const TAU = Math.PI * 2;
export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const frac = (x: number) => x - Math.floor(x);
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));

export const EASE = {
  soft: (x: number) => { x = clamp(x); return x * x * (3 - 2 * x); },          // core.js:14
  out: (x: number) => 1 - Math.pow(1 - clamp(x), 3),                           // core.js:15
  in: (x: number) => Math.pow(clamp(x), 3),                                    // core.js:35
  back: (x: number) => { x = clamp(x); const s = 1.9; return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); }, // core.js:16
};

/** Keyframe: kf(t, [[t0, v0], [t1, v1]], EASE.soft). Nilai boleh angka atau larik angka. */
export function kf(t: number, keys: [number, number | number[]][], e: (x: number) => number = EASE.soft): number | number[] {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t < keys[i][0]) {
      const [a, va] = keys[i - 1], [b, vb] = keys[i], k = e((t - a) / (b - a));
      return Array.isArray(va) ? va.map((v, j) => lerp(v, (vb as number[])[j], k)) : lerp(va, vb as number, k);
    }
  }
  return keys[keys.length - 1][1];
}

/** Pegas teredam yang ditendang di t0: settle dan follow-through (topi, kelopak, ekor). core.js:59 */
export const spring = (t: number, t0: number, k = 6, w = 18) => (t < t0 ? 0 : Math.exp(-k * (t - t0)) * Math.sin(w * (t - t0)));
export const ring = (t: number, evs: number[], k = 6, w = 18) => evs.reduce((s, e) => s + spring(t, e, k, w), 0);
export const arcPt = (p0: number[], p1: number[], h: number, k: number) => [lerp(p0[0], p1[0], k), lerp(p0[1], p1[1], k) - h * 4 * k * (1 - k)];
/** Tahan tiap gambar dua frame @12 gambar/dtk (rasa gambar tangan). core.js:62 */
export const onTwos = (t: number) => Math.floor(t * 12 + 1e-6) / 12;

export type Sq = { sq: number; dy: number };
/** Lompat: jongkok 0,12 dtk (sq .18), regang saat naik (sq -.16), mendarat gepeng (sq .22, e^-8a cos 20a). core.js:67 */
export function jump(t: number, t0: number, t1: number, h = 3): Sq {
  if (t < t0 - 0.12) return { dy: 0, sq: 0 };
  if (t < t0) return { dy: 0, sq: 0.18 * EASE.soft(seg(t, t0 - 0.12, t0)) };
  if (t < t1) { const k = (t - t0) / (t1 - t0); return { dy: -h * 4 * k * (1 - k), sq: -0.16 * Math.abs(1 - 2 * k) }; }
  const a = t - t1; return { dy: 0, sq: 0.22 * Math.exp(-8 * a) * Math.cos(20 * a) };
}
/** Kaget ("take") memuncak di t0: gepeng 0,1 dtk sebelum, lalu regang tinggi yang memantul balik. core.js:74 */
export function take(t: number, t0: number, amt = 1): Sq {
  if (t < t0 - 0.1) return { sq: 0, dy: 0 };
  if (t < t0) return { sq: 0.12 * amt * EASE.soft(seg(t, t0 - 0.1, t0)), dy: 0 };
  const a = t - t0;
  return { sq: -0.26 * amt * Math.exp(-6 * a) * Math.cos(16 * a), dy: -1.2 * amt * Math.exp(-7 * a) * Math.max(0, Math.cos(9 * a)) };
}
/** Jalan x0->x1 (px) antara t0 dan t1, ease masuk-keluar; fase kaki = jarak / (4u). core.js:81 */
export function stroll(t: number, t0: number, t1: number, x0: number, x1: number, u: number) {
  const x = lerp(x0, x1, EASE.soft(seg(t, t0, t1))), d = Math.abs(x - x0) / (4 * u), moving = t > t0 && t < t1;
  return { x, walk: d, view: moving ? "q" : "front", flip: x1 < x0, dy: moving ? -Math.abs(Math.sin(d * Math.PI)) * 0.5 : 0 };
}
/** Skala rig dari squash, pivot di KAKI/dasar: lebar tumbuh 0,6x squash, tinggi turun 1x. clawd.js:84 */
export const squashScale = (sq: number, smear = 0) => ({ sx: (1 + sq * 0.6) * (1 + smear * 0.35), sy: 1 - sq });
/** Kedip: tiap 3,67 dtk (= 3,3/0,9), mata tertutup 0,133 dtk; seed menggeser fase tiap tokoh. clawd.js:248 */
export const blinking = (t: number, seed = 0) => (t * 0.9 + seed * 1.7) % 3.3 < 0.12;

// ---------- tampilan kunci (clawd.js:32-43) ----------
export type View = "front" | "q" | "side" | "qback" | "back";
const K: [View, number][] = [["front", 0], ["q", 0], ["side", 0], ["qback", 0], ["back", 0], ["qback", 1], ["side", 1], ["q", 1]];
/** Heading dalam putaran (0 depan, .25 kanan, .5 belakang, .75 kiri) -> tampilan kunci terdekat (kelipatan 1/8). */
export function spinView(a: number) { const [view, f] = K[((Math.round(a * 8) % 8) + 8) % 8]; return { view, flip: !!f }; }
/** Putar a0->a1 di t0..t1 melewati tampilan kunci; smear .55*sin(k*pi) di gambar antara. */
export function turn(t: number, t0: number, t1: number, a0: number, a1: number) {
  const k = EASE.soft(seg(t, t0, t1));
  return { ...spinView(lerp(a0, a1, k)), smear: t > t0 && t < t1 ? 0.55 * Math.sin(k * Math.PI) : 0 };
}

// ---------- emosi (clawd.js:541-573; angka asli) ----------
export type Pose = { dx?: number; dy?: number; sq?: number; rot?: number; aL?: number; aR?: number; lookX?: number; lookY?: number };
export type Beat = ReturnType<typeof beat>;
export const beat = (t: number, bpm = 120, off = 0) => {
  const bp = (t - off) / (60 / bpm), s1 = Math.sin(bp * Math.PI), f = frac(bp);
  return { bp, s1, ab: Math.abs(s1), hit: Math.exp(-f * 6), hit2: Math.exp(-frac(bp * 2) * 6), s2: Math.sin(bp * TAU), f, n: Math.floor(bp) };
};
export type Emo = { take: number; fade?: boolean; tint?: string; tintK?: number; blush?: number; gloom?: number; body: (t: number, b: Beat) => Pose };
const S = Math.sin;
export const EMO: Record<string, Emo> = {
  neutral:   { take: .3, body: (t, b) => ({ dy: -.25 * b.ab, sq: .03 * b.hit, aL: .15 + .05 * b.s1, aR: .15 - .05 * b.s1 }) },
  happy:     { take: .6, blush: .3, body: (t, b) => ({ dy: -1.2 * b.ab, sq: .1 * b.hit, aL: .4 + .4 * b.s1, aR: .4 - .4 * b.s1 }) },
  excited:   { take: 1, body: (t, b) => { const h = Math.abs(b.s2); return { dy: -2.4 * h, sq: .16 * b.hit2 - .06 * h, aL: 1 + .5 * S(b.bp * TAU * 2), aR: 1 - .5 * S(b.bp * TAU * 2) }; } },
  love:      { take: .7, blush: .8, tint: "rosy", tintK: .5, body: (t, b) => { const s = S(b.bp * Math.PI / 2); return { rot: .08 * s, dx: .5 * s, dy: -.6 * b.ab, sq: .05 * b.hit, aL: -.1 + .15 * b.s1, aR: -.1 - .15 * b.s1 }; } },
  proud:     { take: .5, tint: "gold", tintK: .3, body: (t, b) => ({ sq: -.1 - .03 * b.ab, dy: -.3 * b.hit, aL: -.9, aR: -.9, rot: .02 * b.s1 }) },
  sad:       { take: .3, tint: "blue", tintK: .35, gloom: .35, body: (t, b) => { const s = S(b.bp * Math.PI / 4); return { sq: .08 + .02 * s, rot: .03 * s, aL: -.75, aR: -.75, lookY: .5 }; } },
  angry:     { take: .8, tint: "flush", tintK: .45, body: (t, b) => ({ dx: .1 * S(t * TAU * 18), sq: .12 * b.hit, aL: -.3 + .1 * b.hit, aR: -.3 + .1 * b.hit }) },
  scared:    { take: 1.1, tint: "pale", tintK: .6, body: (t) => ({ dx: .1 * S(t * TAU * 22), sq: -.06, aL: 1 + .08 * S(t * TAU * 17), aR: 1 + .08 * S(t * TAU * 19), lookX: .6 * Math.sign(S(t * 2.3)) }) },
  surprised: { take: 1.3, fade: true, body: (t, b) => ({ sq: -.12, dy: -.3 - .15 * b.ab, aL: 1.1 + .05 * b.s2, aR: 1.1 - .05 * b.s2 }) },
  thinking:  { take: .4, body: (t, b) => ({ lookX: .5, lookY: -.8, rot: .05, aR: .9, aL: -.3 + .25 * S(b.f * Math.PI), dy: -.1 * b.ab }) },
  idea:      { take: 1.1, body: (t, b) => ({ dy: -1 * b.ab, sq: -.05 + .1 * b.hit, aR: 1.55 + .1 * b.s2, aL: .2 + .2 * b.s1 }) },
  sleepy:    { take: .2, body: (t) => { const br = S(t * TAU * .3); return { sq: .05 + .05 * br, rot: .06 * S(t * .8), aL: -.6, aR: -.6 }; } },
  bored:     { take: .2, body: (t, b) => { const f = frac(b.bp / 4), sigh = f < .3 ? EASE.soft(f / .3) : 1 - EASE.soft((f - .3) / .7); return { lookX: -.3, lookY: .4, sq: .08 - .14 * sigh, rot: -.04, aL: -.85 + .05 * S(t * 2), aR: -.85 - .05 * S(t * 2) }; } },
};
export const feel = (name: string, t: number, bpm = 120, off = 0, over: Pose = {}): Pose & { emo: string } => {
  const E = EMO[name] ?? EMO.neutral;
  return { emo: name, ...E.body(t, beat(t, bpm, off)), ...over };
};

export type Key = [number, string, Pose?];
const BASE = { dy: 0, sq: 0, aL: 0.2, aR: 0.2, rot: 0, dx: 0, lookX: 0, lookY: 0 } as const;
/** Perubahan emosi yang DIAKTINGKAN (clawd.js:589-617): sipit 0,1 dtk sebelum ganti, sipit 0,14 dtk sesudah, pose menyeberang
 *  dengan overshoot backOut 0,4 dtk, warna ease 0,3 dtk, lalu take sebesar E.take. Kembalikan pose + squint + colorMix + emoteK. */
export function emotions(t: number, keys: Key[], bpm = 120, off = 0, takeScale = 1) {
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const [tc, name, over] = keys[i], age = t - tc, E = EMO[name] ?? EMO.neutral;
  const cur: Required<Pose> & Record<string, number> = { ...BASE, ...feel(name, t, bpm, off, over ?? {}) } as never;
  const tn = i + 1 < keys.length ? keys[i + 1][0] : Infinity;
  let squint = 0;
  if (tn - t < 0.1) squint = Math.max(squint, 1 - (tn - t) / 0.1);
  if (i > 0 && age < 0.14) squint = Math.max(squint, 1 - age / 0.14);
  let colorMix = 1;
  if (i > 0 && age < 0.5) {
    const prev = feel(keys[i - 1][1], t, bpm, off, keys[i - 1][2] ?? {}), k = EASE.back(seg(age, 0, 0.4));
    colorMix = EASE.soft(seg(age, 0, 0.3));
    for (const f of Object.keys(BASE) as (keyof typeof BASE)[]) cur[f] = lerp(prev[f] ?? BASE[f], cur[f] ?? BASE[f], k);
  }
  const t1 = i > 0 ? take(t, tc, E.take * takeScale) : { sq: 0, dy: 0 };
  const En = i + 1 < keys.length ? EMO[keys[i + 1][1]] ?? EMO.neutral : null;
  const t2 = En ? take(t, tn, En.take * takeScale) : { sq: 0, dy: 0 };
  cur.sq += t1.sq + t2.sq; cur.dy += t1.dy + t2.dy;
  const emoteK = seg(age, 0.06, 0.32) * (E.fade ? 1 - seg(age, 1.4, 1.8) : 1);
  return { ...cur, emo: name, prevEmo: i > 0 ? keys[i - 1][1] : name, squint, colorMix, emoteK, emoteAge: age };
}
