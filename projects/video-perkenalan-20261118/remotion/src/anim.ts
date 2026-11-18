// anim.ts · keyframe + easing. Tidak ada linear/crossfade: semua lewat kurva bernama (curves.ts).
import {interpolate} from 'remotion';
import {CURVE, CurveName} from './curves';

export type Key = [number, number, (CurveName | 'hold')?];

/** Nilai pada `f` dari daftar keyframe [frame, nilai, kurva-menuju-titik-ini]. 'hold' = loncat (cut/crop). */
export const track = (f: number, keys: Key[]): number => {
  if (keys.length === 0) return 0;
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [f1, v1, c] = keys[i];
    const [f0, v0] = keys[i - 1];
    if (f < f1) {
      if (c === 'hold') return v0;
      return interpolate(f, [f0, f1], [v0, v1], {easing: CURVE[(c ?? 'heavy') as CurveName], extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    }
    if (f === f1) return v1;
  }
  return keys[keys.length - 1][1];
};

/** Kecepatan (turunan per frame) sebuah track, untuk motion blur berbasis kecepatan. */
export const vel = (f: number, keys: Key[]) => track(f + 0.5, keys) - track(f - 0.5, keys);

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (f: number, a: number, b: number, c: CurveName = 'land') =>
  interpolate(f, [a, b], [0, 1], {easing: CURVE[c], extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
