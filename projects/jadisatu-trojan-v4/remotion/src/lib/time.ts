import vo from '../vo.json';
export const FPS = 30;
export type Word = { w: string; s: number; e: number; b: string };
export const WORDS: Word[] = (vo as any).words;
export const BEATS: { b: string; s: number; e: number; text: string }[] = (vo as any).beats;
export const TOTAL_S: number = (vo as any).total;
export const fr = (sec: number) => Math.round(sec * FPS);
export const clean = (w: string) => w.replace(/["“”]/g, '');
/** detik onset kata pertama di beat b yang diawali prefix (ke-n). */
export function ws(b: string, prefix: string, n = 1): number {
  let k = 0;
  for (const w of WORDS) {
    if (w.b === b && clean(w.w).toLowerCase().startsWith(prefix.toLowerCase())) { k++; if (k === n) return w.s; }
  }
  throw new Error(`kata tidak ada: ${b} ${prefix} ${n}`);
}
export const wf = (b: string, prefix: string, n = 1) => fr(ws(b, prefix, n));
export const we = (b: string, prefix: string, n = 1) => {
  let k = 0;
  for (const w of WORDS) if (w.b === b && clean(w.w).toLowerCase().startsWith(prefix.toLowerCase())) { k++; if (k === n) return fr(w.e); }
  throw new Error('kata');
};
export const beat = (b: string) => { const x = BEATS.find((y) => y.b === b)!; return { s: fr(x.s), e: fr(x.e) }; };
export const TOTAL_F = Math.ceil(TOTAL_S * FPS);
