// Satu sumber kebenaran teks: edit/words_final.json (disalin ke src/data/).
import RAW from '../data/words_final.json';
const FPS = 30; // sengaja tidak mengimpor theme.ts (yang memuat remotion) supaya pengecek kata bisa jalan di node

export type Word = { w: string; s: number; e: number };
export const WORDS: Word[] = RAW as Word[];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Cari indeks kata berurutan yang cocok dengan `phrase` (dipisah spasi), mulai dari `afterT` detik.
 * Contoh: seq('Memasuki usia 20 -an') -> [26, 27, 28, 29]. Melempar galat bila tidak ketemu,
 * sehingga teks layar tidak bisa berisi kata yang tidak diucapkan.
 */
export function seq(phrase: string, afterT = 0): number[] {
  const toks = phrase.split(/\s+/).filter(Boolean).map(norm);
  for (let i = 0; i < WORDS.length; i++) {
    if (WORDS[i].s < afterT - 1e-6) continue;
    let ok = true;
    for (let k = 0; k < toks.length; k++) {
      if (!WORDS[i + k] || norm(WORDS[i + k].w) !== toks[k]) { ok = false; break; }
    }
    if (ok) return toks.map((_, k) => i + k);
  }
  throw new Error(`seq: "${phrase}" tidak ada di words_final.json setelah ${afterT}s`);
}

/** frame saat kata mulai diucapkan (+1 f, typography T19) */
export const wordIn = (i: number) => Math.round(WORDS[i].s * FPS) + 1;
/** frame saat kata selesai diucapkan */
export const wordOut = (i: number) => Math.round(WORDS[i].e * FPS);
