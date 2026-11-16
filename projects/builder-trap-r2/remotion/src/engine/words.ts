// Kata v6 memakai waktu program; pencarian adegan tetap memakai waktu naskah lama.
import RAW from '../data/words_v6.json';
const FPS = 30; // sengaja tidak mengimpor theme.ts (yang memuat remotion) supaya pengecek kata bisa jalan di node

import OLD from '../data/words_final.json';

export type Word = { w: string; s: number; e: number };
export const WORDS: Word[] = RAW as Word[];
/** `afterT` pada adegan ditulis dalam detik lama. Indeks kata v6 tetap sejajar dengan naskah tanpa tiga "tuh". */
const OLD_S: number[] = (OLD as Word[]).filter((w) => w.w !== 'tuh').map((w) => w.s);
if (OLD_S.length !== WORDS.length) throw new Error('words_v6 tidak sejajar dengan words_final tanpa "tuh"');

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Cari indeks kata berurutan yang cocok dengan `phrase` (dipisah spasi), mulai dari `afterT` detik.
 * Contoh: seq('Memasuki usia 20 -an') -> [26, 27, 28, 29]. Melempar galat bila tidak ketemu,
 * sehingga teks layar tidak bisa berisi kata yang tidak diucapkan.
 */
export function seq(phrase: string, afterT = 0): number[] {
  const toks = phrase.split(/\s+/).filter(Boolean).map(norm);
  for (let i = 0; i < WORDS.length; i++) {
    if (OLD_S[i] < afterT - 1e-6) continue; // r5: afterT = detik timeline lama
    let ok = true;
    for (let k = 0; k < toks.length; k++) {
      if (!WORDS[i + k] || norm(WORDS[i + k].w) !== toks[k]) { ok = false; break; }
    }
    if (ok) return toks.map((_, k) => i + k);
  }
  throw new Error(`seq: "${phrase}" tidak ada di words_v6.json setelah ${afterT}s (waktu lama)`);
}

/** frame saat kata mulai diucapkan (+1 f, typography T19) */
export const wordIn = (i: number) => Math.round(WORDS[i].s * FPS) + 1;
/** frame saat kata selesai diucapkan */
export const wordOut = (i: number) => Math.round(WORDS[i].e * FPS);
