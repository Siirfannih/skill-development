import vo from './vo.json';
import {FPS} from './theme';

type Word = {w: string; s: number; e: number; seg: string};
const words = (vo as any).words as Word[];
const segs = (vo as any).segments as {id: string; s: number; e: number}[];

export const TOTAL = Math.ceil((vo as any).duration * FPS);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** frame onset kata ke-n (0-based) yang cocok di segmen VO. Gagal keras bila tidak ada. */
export const wf = (seg: string, word: string, nth = 0): number => {
  const hits = words.filter((x) => x.seg === seg && norm(x.w).startsWith(norm(word)));
  if (!hits[nth]) throw new Error(`kata tidak ditemukan: ${seg}/${word}#${nth}`);
  return Math.round(hits[nth].s * FPS);
};
/** frame akhir kata */
export const we = (seg: string, word: string, nth = 0): number => {
  const hits = words.filter((x) => x.seg === seg && norm(x.w).startsWith(norm(word)));
  if (!hits[nth]) throw new Error(`kata tidak ditemukan: ${seg}/${word}#${nth}`);
  return Math.round(hits[nth].e * FPS);
};
export const seg = (id: string) => {
  const s = segs.find((x) => x.id === id)!;
  return {s: Math.round(s.s * FPS), e: Math.round(s.e * FPS)};
};
/** semua kata satu segmen, untuk teks ikut ucapan */
export const segWords = (id: string) =>
  words.filter((x) => x.seg === id).map((x) => ({w: x.w, f: Math.round(x.s * FPS), e: Math.round(x.e * FPS)}));
