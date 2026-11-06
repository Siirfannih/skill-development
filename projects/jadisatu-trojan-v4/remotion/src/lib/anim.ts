import { Easing, interpolate, spring } from 'remotion';
export const EASE = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 0.75, 0.2);
export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
/** 0→1 ease-out mulai di frame a selama d frame */
export const eo = (f: number, a: number, d = 12) => interpolate(f, [a, a + d], [0, 1], { ...clamp, easing: EASE });
export const ei = (f: number, a: number, d = 10) => interpolate(f, [a, a + d], [0, 1], { ...clamp, easing: EASE_IN });
export const lin = (f: number, a: number, b: number, x0 = 0, x1 = 1) => interpolate(f, [a, b], [x0, x1], clamp);
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** pop dengan overshoot (spring) */
export const pop = (f: number, a: number, fps = 30, damping = 12, stiffness = 180) =>
  f < a ? 0 : spring({ frame: f - a, fps, config: { damping, stiffness, mass: 0.8 } });
export const sp = (f: number, a: number, damping = 20, stiffness = 170) =>
  f < a ? 0 : spring({ frame: f - a, fps: 30, config: { damping, stiffness } });
/** kecepatan untuk blur arah: |d/df| dari fungsi posisi */
export const vel = (fn: (f: number) => number, f: number) => Math.abs(fn(f + 0.5) - fn(f - 0.5));
