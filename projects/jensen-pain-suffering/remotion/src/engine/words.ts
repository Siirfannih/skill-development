// Teks layar hanya dari ucapan: setiap token dicocokkan ke audio/words.json (salinan di src/data). Tidak ketemu = galat.
import RAW from '../data/words.json';
export type Word = { w: string; s: number; e: number };
export const WORDS: Word[] = RAW as Word[];
export const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** indeks kata berurutan yang cocok dengan token, mulai dari kata yang onset-nya >= after (detik) */
export function match(tokens: string[], after: number): number[] {
  const t = tokens.map(norm);
  for (let i = 0; i < WORDS.length; i++) {
    if (WORDS[i].s < after - 1e-6) continue;
    let ok = true;
    for (let k = 0; k < t.length; k++) if (!WORDS[i + k] || norm(WORDS[i + k].w) !== t[k]) { ok = false; break; }
    if (ok) return t.map((_, k) => i + k);
  }
  throw new Error(`teks "${tokens.join(' ')}" tidak ada di words.json setelah ${after}s`);
}
/** frame kata mulai tampil: onset + 1 f (typography T19) */
export const wordIn = (i: number) => Math.round(WORDS[i].s * 30) + 1;
