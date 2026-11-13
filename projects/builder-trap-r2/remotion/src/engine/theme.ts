import { Easing } from 'remotion';
// Token warna, ukuran frame, dan konversi waktu. Sumber: handoff/BRIEF.md §Terkunci.
export const FPS = 30;
export const W = 1920;
export const H = 1080;
export const TOTAL = 2849;

export const C = {
  paper: '#F6F5F1',
  white: '#FFFFFF',
  linen: '#E9E7E1',
  ink: '#282723',
  inkNew: '#A8A69F', // kata terbaru, lalu menghitam
  accent: '#1A3AD0', // <= 15 % area
  accentSoft: '#DCE4FF',
  dark0: '#0B0D0F',
  dark1: '#13245E',
  inkDark: '#F4F5F7',
  accentDark: '#6F8DFF',
};

// Safe frame (BRIEF): x 165–1755, y 140–935
export const SAFE = { x0: 165, x1: 1755, y0: 140, y1: 935 };

export const FONT = {
  sf: '"SFPro", sans-serif',
  playfair: '"PlayfairDisplay", serif',
  caveat: '"Caveat", cursive',
  inter: '"InterUI", sans-serif',
};

/** detik -> frame (dibulatkan) */
export const fr = (t: number) => Math.round(t * FPS);

/** Easing standar proyek (references/typography.md §11): masuk 0.16,1,0.3,1 · keluar 0.7,0,0.84,0 */
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
/** progres 0..1 antara frame a dan b dengan easing */
export const prog = (f: number, a: number, b: number, ease: EaseName = 'out') =>
  EASE[ease](clamp01((f - a) / Math.max(1e-6, b - a)));

/** acak deterministik */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
