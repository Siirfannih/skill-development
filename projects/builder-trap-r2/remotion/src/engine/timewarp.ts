// Peta v6: [detik program, detik adegan lama]. Media wajah memakai frame program langsung.
import K from '../data/knots_v6.json';

const FPS = 30;
const KN = (K as unknown as { knots: [number, number][] }).knots;
const NEW = KN.map((k) => k[0]);
const OLD = KN.map((k) => k[1]);
/** durasi timeline baru (frame) */
export const DUR_V6: number = (K as unknown as { dur_frames: number }).dur_frames;
// Act4 masih mengimpor nama lama; durasinya tetap berasal dari peta v6.
export const DUR_V5: number = DUR_V6;

function interp(x: number, xs: number[], ys: number[]): number {
  if (x <= xs[0]) return ys[0] + (x - xs[0]);
  const n = xs.length - 1;
  if (x >= xs[n]) return ys[n] + (x - xs[n]);
  let lo = 0, hi = n;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (xs[m] <= x) lo = m; else hi = m; }
  const t = (x - xs[lo]) / Math.max(1e-9, xs[hi] - xs[lo]);
  return ys[lo] + (ys[hi] - ys[lo]) * t;
}

/** detik baru → detik lama */
export const Wsec = (tNew: number) => interp(tNew, NEW, OLD);
/** detik lama → detik baru (rentang lama yang dibuang jatuh ke titik lompatan) */
export const keBaruSec = (tOld: number) => interp(tOld, OLD, NEW);
/** W(fBaru) → fLama (frame timeline lama tempat adegan ditulis) */
export const W = (fNew: number) => Math.round(Wsec(fNew / FPS) * FPS);
/** fLama → fBaru: konversi konstanta frame lama (F_*, until angka) ke timeline baru */
export const keBaru = (fOld: number) => Math.round(keBaruSec(fOld / FPS) * FPS);
