// Waktu absolut video = audio master v11 (timeline.json dari assemble11.py, beats.json dari beats.py).
import timeline from "../timeline.json";
import beats from "../beats.json";

export const FPS = 30;
export type Word = { w: string; s: number; e: number; src: string };
export const WORDS: Word[] = (timeline as any).words;
export const BLOCKS: any[] = (timeline as any).blocks;
export const TOTAL_S: number = (timeline as any).total;
export const PANELS: { panel: string; t: number; dur: number }[] = (beats as any).panels;

export const f = (s: number) => Math.round(s * FPS);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]/g, "");

/** Kata ke-n (1-based) dengan teks `word` dari sumber `src` (s1..s6, jensen, altman, news_*). */
export const word = (w: string, src: string, n = 1): Word => {
  let k = 0;
  for (const x of WORDS) {
    if (x.src === src && norm(x.w) === norm(w)) {
      k++;
      if (k === n) return x;
    }
  }
  throw new Error(`kata tidak ketemu: ${w} ${src} ${n}`);
};
export const wordsOf = (src: string) => WORDS.filter((x) => x.src === src);
export const block = (name: string) => BLOCKS.find((b) => b.name === name);

/** Rentang panel storyboard dalam detik absolut. */
export const panel = (code: string) => {
  const p = PANELS.find((x) => x.panel === code);
  if (!p) throw new Error("panel " + code);
  return { start: p.t, end: p.t + p.dur, dur: p.dur };
};
