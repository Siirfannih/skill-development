import { CURVE, CurveName } from '../lib/curves';

export const FPS = 30;
export const DURASI_S = 55.3;
export const DURASI_F = Math.round(DURASI_S * FPS);
/** Batas beat (detik, timeline suara terpotong). Sumber: shotlist.json; dipakai kamera dan transisi. */
export const BEAT = [0, 4.7, 6.3, 9.1, 13.5, 15.7, 18.9, 22.8, 25.4, 30.3, 33.9, 35.7, 40.1, 44.3, 46.6, 49.6, 53.0, 55.3];

export type Key = [number, number, CurveName?];
/** Keyframe bersegmen: kurva dipilih per segmen (curves.ts), bukan preset. */
export const kf = (t: number, ks: Key[]): number => {
  if (t <= ks[0][0]) return ks[0][1];
  for (let i = 0; i < ks.length - 1; i++) {
    const [a, va] = ks[i];
    const [b, vb, c] = ks[i + 1];
    if (t < b) return va + (vb - va) * CURVE[c ?? 'land']((t - a) / (b - a));
  }
  return ks[ks.length - 1][1];
};
/** 0..1 dari detik a selama d detik. */
export const mv = (t: number, a: number, d: number, c: CurveName = 'land') =>
  t <= a ? 0 : t >= a + d ? 1 : CURVE[c]((t - a) / d);
