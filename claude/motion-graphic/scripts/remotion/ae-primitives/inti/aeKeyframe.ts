// aeKeyframe.ts — interpolasi keyframe gaya Graph Editor After Effects (speed graph), murni dari frame.
//
// Di AE tiap keyframe punya "temporal ease" masuk dan keluar: kecepatan (unit/frame) dan influence (%).
// Segmen antara dua kunci adalah bezier kubik di ruang (waktu, nilai):
//   P0 = (t0, v0)
//   P1 = (t0 + infOut·Δt,  v0 + speedOut·infOut·Δt)
//   P2 = (t1 − infIn·Δt,   v1 − speedIn·infIn·Δt)
//   P3 = (t1, v1)
// speed 0 + influence 33,33 % = "Easy Ease" (F9). Influence besar di sisi datang (mis. 18 / 92) = mendarat panjang.
// Hold = nilai tetap sampai kunci berikutnya (Toggle Hold Keyframe). Overshoot = kunci tambahan melewati target.
//
// Kapan dipakai: saat gerak harus disalin dari angka AE/kartu (influence, kecepatan, hold), atau satu properti
// punya lebih dari dua kunci. Untuk gerak dua kunci biasa cukup `move()` + `CURVE` dari curves.ts.

export type AeEase = {
  /** influence 0..100 (%), panjang pengaruh kunci ke segmen */
  influence?: number;
  /** kecepatan di kunci, unit per frame (0 = berhenti di kunci) */
  speed?: number;
};

export type AeKey = {
  /** frame kunci (relatif ke Sequence) */
  t: number;
  v: number;
  /** ease saat datang ke kunci ini */
  easeIn?: AeEase;
  /** ease saat meninggalkan kunci ini */
  easeOut?: AeEase;
  /** true: nilai ditahan sampai kunci berikutnya (lompat di kunci berikutnya) */
  hold?: boolean;
};

/** Ease bawaan AE "Easy Ease": speed 0, influence 33,33 %. */
export const EASY_EASE: AeEase = { influence: 33.333, speed: 0 };

const bez = (a: number, b: number, c: number, d: number, s: number) => {
  const u = 1 - s;
  return u * u * u * a + 3 * u * u * s * b + 3 * u * s * s * c + s * s * s * d;
};
const bezD = (a: number, b: number, c: number, d: number, s: number) => {
  const u = 1 - s;
  return 3 * u * u * (b - a) + 6 * u * s * (c - b) + 3 * s * s * (d - c);
};

/** Cari parameter s sehingga x(s) = x. Newton lalu biseksi sebagai pengaman (x monoton karena influence ≤ 100 %). */
const cariS = (x0: number, x1: number, x2: number, x3: number, x: number) => {
  let s = (x - x0) / (x3 - x0 || 1);
  for (let i = 0; i < 8; i++) {
    const err = bez(x0, x1, x2, x3, s) - x;
    if (Math.abs(err) < 1e-5) return Math.min(1, Math.max(0, s));
    const d = bezD(x0, x1, x2, x3, s);
    if (Math.abs(d) < 1e-6) break;
    s -= err / d;
  }
  let lo = 0, hi = 1;
  s = 0.5;
  for (let i = 0; i < 40; i++) {
    const v = bez(x0, x1, x2, x3, s);
    if (Math.abs(v - x) < 1e-5) break;
    if (v < x) lo = s; else hi = s;
    s = (lo + hi) / 2;
  }
  return s;
};

const pct = (n: number | undefined, fallback: number) => Math.min(100, Math.max(0.1, n ?? fallback)) / 100;

/** Nilai pada `frame` dari daftar kunci (harus urut menurut t). Di luar rentang: ditahan di kunci ujung. */
export const aeValue = (keys: AeKey[], frame: number): number => {
  if (keys.length === 0) return 0;
  if (frame <= keys[0].t) return keys[0].v;
  const last = keys[keys.length - 1];
  if (frame >= last.t) return last.v;
  let i = 0;
  while (i < keys.length - 2 && frame >= keys[i + 1].t) i++;
  const a = keys[i], b = keys[i + 1];
  if (a.hold) return a.v;
  const dt = b.t - a.t;
  const io = pct(a.easeOut?.influence, 33.333), ii = pct(b.easeIn?.influence, 33.333);
  const so = a.easeOut?.speed ?? 0, si = b.easeIn?.speed ?? 0;
  const x1 = a.t + io * dt, x2 = b.t - ii * dt;
  const y1 = a.v + so * io * dt, y2 = b.v - si * ii * dt;
  const s = cariS(a.t, x1, x2, b.t, frame);
  return bez(a.v, y1, y2, b.v, s);
};

/** Versi vektor: tiap dimensi diinterpolasi terpisah (AE "Separate Dimensions"). */
export type AeKeyN = Omit<AeKey, "v"> & { v: number[] };
export const aeValueN = (keys: AeKeyN[], frame: number): number[] => {
  const n = keys[0]?.v.length ?? 0;
  return Array.from({ length: n }, (_, d) => aeValue(keys.map((k) => ({ ...k, v: k.v[d] })), frame));
};

/**
 * Easing ternormalisasi 0→1 dari influence keluar/masuk (speed 0), untuk dipakai di `interpolate({ easing })`.
 * aeEase(18, 92) = cepat di awal, mendarat sangat pelan (resep teks R1 di smooth-motion.md).
 */
export const aeEase = (influenceOut: number, influenceIn: number) => (x: number) =>
  aeValue([
    { t: 0, v: 0, easeOut: { influence: influenceOut, speed: 0 } },
    { t: 1, v: 1, easeIn: { influence: influenceIn, speed: 0 } },
  ], x);

/**
 * Kunci gerak dengan overshoot: from → (to + lewat) → to. `amount` = proporsi jarak yang dilewati (0,08 = 8 %).
 * Kunci tengah punya speed 0 (titik balik), jadi tidak ada patahan. Hasil dipakai dengan aeValue().
 */
export const overshootKeys = (
  from: number, to: number, start: number, frames: number,
  amount = 0.08, settleFrames = Math.max(2, Math.round(frames * 0.6)),
  inf: { out?: number; mid?: number; settle?: number } = {},
): AeKey[] => [
  { t: start, v: from, easeOut: { influence: inf.out ?? 15, speed: 0 } },
  { t: start + frames, v: to + (to - from) * amount, easeIn: { influence: inf.mid ?? 70, speed: 0 }, easeOut: { influence: 40, speed: 0 } },
  { t: start + frames + settleFrames, v: to, easeIn: { influence: inf.settle ?? 60, speed: 0 } },
];

/** Kecepatan sesaat (unit per frame) dari daftar kunci, diferensi tengah ±0,5 f (sama dengan jendela shutter tengah). */
export const aeVelocity = (keys: AeKey[], frame: number) => aeValue(keys, frame + 0.5) - aeValue(keys, frame - 0.5);
