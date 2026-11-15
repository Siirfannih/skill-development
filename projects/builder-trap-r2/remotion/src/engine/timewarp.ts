// r5 · peta waktu potongan suara v3 (TASK-r5). Murni data (tanpa React) supaya bisa dipakai pengecek kata di node.
// knots_v3.json: [t_baru, t_lama] detik, interpolasi linear; pasangan berselisih 0,0001 dtk = lompatan (rentang dibuang).
import K from '../data/knots_v3.json';

const FPS = 30;
const KN = (K as unknown as { knots: [number, number][] }).knots;
const NEW = KN.map((k) => k[0]);
const OLD = KN.map((k) => k[1]);
/** durasi timeline baru (frame) */
export const DUR_V3: number = (K as unknown as { dur_frames: number }).dur_frames;

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
