// Satu sumber kebenaran teks: words_v3.json (r5, timeline baru; dulu words_final.json).
import RAW from '../data/words_v3.json'; // r5: timeline baru ("tuh" sudah dibuang)
const FPS = 30; // sengaja tidak mengimpor theme.ts (yang memuat remotion) supaya pengecek kata bisa jalan di node

import OLD from '../data/words_final.json';

export type Word = { w: string; s: number; e: number };
export const WORDS: Word[] = RAW as Word[];
/** r5: waktu LAMA (words_final.json) per indeks words_v3 — v3 = daftar lama tanpa "tuh" (urutan kata sama). Data teks
 *  menulis `afterT` dalam detik lama, jadi pencarian frasa memakai waktu lama ini; indeks yang dihasilkan = indeks v3. */
const OLD_S: number[] = (OLD as Word[]).filter((w) => w.w !== 'tuh').map((w) => w.s);
if (OLD_S.length !== WORDS.length) throw new Error('words_v3 tidak sejajar dengan words_final tanpa "tuh"');

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
  throw new Error(`seq: "${phrase}" tidak ada di words_v3.json setelah ${afterT}s (waktu lama)`);
}

/** frame saat kata mulai diucapkan (+1 f, typography T19) */
export const wordIn = (i: number) => Math.round(WORDS[i].s * FPS) + 1;
/** frame saat kata selesai diucapkan */
export const wordOut = (i: number) => Math.round(WORDS[i].e * FPS);
