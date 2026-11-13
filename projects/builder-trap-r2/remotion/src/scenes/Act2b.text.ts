// Teks layar B09 (Editor B, TASK r2b). Hanya kata dari words_final.json.
import { T, joinTok, type TextBlock } from '../text/types';

export const F_B09: [number, number] = [552, 732];
/** cut wajah → Threads tepat sebelum "Kalau" (20,32 dtk); PLAN 20,3 */
export const F_B09_CUT = 610;

/** Kutipan di post Threads (UI): tampil abu sejak jendela muncul, menghitam saat diucapkan. */
export const B09_QUOTE = T('Kalau mau jadi sesuatu harus menjadi sesuatu yang berbeda.', 20.3, 'Kalau mau jadi sesuatu, harus menjadi sesuatu yang berbeda.');

export const TEXT_ACT2B: TextBlock[] = [
  {
    // r3a: crop T (mulut + tangan), pita atas kanan di dinding di atas bahu
    id: 'B09-N', beat: 'B09', code: 'N', size: 56, x: 930, y: 200, tone: 'dark',
    lines: [T('Dan aku termakan', 18.4), [joinTok(T('kata -kata', 19.2), 'kata-kata'), ...T('motivasi.', 19.7)]],
    until: F_B09_CUT, exit: 'cut',
    note: 'frasa selesai 20,30; cut ke Threads 20,33 (PLAN), kalimat berikut langsung jadi isi post',
  },
  {
    id: 'B09-UI', beat: 'B09', code: 'UI', toks: B09_QUOTE, at: B09_QUOTE.map(() => F_B09_CUT),
    x: 0, y: 0, until: F_B09[1], exit: 'cut',
    note: 'isi post Threads; abu sejak 20,33 lalu menghitam per kata saat diucapkan (PLAN B09)',
  },
];
