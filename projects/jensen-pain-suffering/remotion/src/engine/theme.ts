import { Easing } from 'remotion';
// Token (handoff/BRIEF.md §Keputusan terkunci, PLAN.json token).
export const FPS = 30;
export const W = 1920;
export const H = 1080;
export const TOTAL = 1428; // 47,6 dtk

export const C = {
  hitam: '#0E0D0C',
  putih: '#F4F1EA',
  amber: '#E8A33D',
};

// Safe frame 5 % (BRIEF): x 96–1824, y 54–1026
export const SAFE = { x0: 96, x1: 1824, y0: 54, y1: 1026 };

export const FONT = '"Poppins", sans-serif';

export const fr = (t: number) => Math.round(t * FPS);

export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  smooth: Easing.bezier(0.45, 0, 0.55, 1),
  linear: (t: number) => t,
};
export type EaseName = keyof typeof EASE;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const prog = (f: number, a: number, b: number, ease: EaseName = 'out') =>
  EASE[ease](clamp01((f - a) / Math.max(1e-6, b - a)));
