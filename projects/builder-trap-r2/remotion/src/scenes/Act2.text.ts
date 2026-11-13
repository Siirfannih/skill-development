// Teks layar babak 2 milik Editor A: B06–B08, B10–B14 (B09 ada di Act2b.text.ts milik Editor B).
import { T, joinTok, type TextBlock } from '../text/types';
import { beatF } from '../engine/scenes';

export const F_B06 = beatF('B06'); // 299–448
export const F_B07 = beatF('B07'); // 448–478
export const F_B08 = beatF('B08'); // 478–552
export const F_B10 = beatF('B10'); // 732–873
export const F_B10_YT = 797; // cut wajah → YouTube di suku kata "hal" (26,58 dtk), lihat Q-A01
export const F_B11 = beatF('B11'); // 873–930
export const F_B12 = beatF('B12'); // 930–1062
export const F_B13 = beatF('B13'); // 1062–1169
export const F_B13_GPT = 1098; // wajah F2 35,4–36,6 lalu ChatGPT
export const F_B14 = beatF('B14'); // 1169–1389
export const F_SEND = 1164; // 38,8 dtk tombol kirim

export const TEXT_ACT2: TextBlock[] = [
  // ---------- B06 · foto cetak di alas ----------
  { id: 'B06-N1', beat: 'B06', code: 'N', size: 40, x: 946, y: 452, lines: [T('Memasuki usia', 9.9)], until: 347 },
  {
    // label tulisan tangan di dalam foto (dirender di dalam <Print>, koordinat = isi foto)
    id: 'B06-H', beat: 'B06', code: 'H', size: 92, x: 252, y: 104, rot: -6, ink: '#FFFFFF',
    toks: [joinTok(T('20 -an.', 10.5), '20-an')],
    arrow: { d: 'M -4 60 C -24 72 -36 92 -40 122 M -40 122 L -53 101 M -40 122 L -20 109', box: [0, 0, 1, 1] },
    until: F_B06[1], exit: 'cut',
  },
  {
    id: 'B06-N2', beat: 'B06', code: 'N', size: 36, x: 946, y: 590,
    lines: [T('Aku merasa aku perlu untuk', 11.3), T('melakukan sesuatu yang berbeda.', 12.8)],
    until: F_B06[1], exit: 'cut', note: 'kalimat selesai 14,92 tepat di cut ke B07 (PLAN, Q-10)',
  },
  // ---------- B07 · wajah F1 + K4 ----------
  {
    id: 'B07-K4', beat: 'B07', code: 'K4', order: 'small-big', bigSize: 170, ratio: 2.6, tone: 'dark',
    x: 1150, y: 360, small: T('Sesuatu yang', 14.9, 'sesuatu yang'), big: T('unik.', 15.4),
    until: F_B07[1], exit: 'cut', note: 'kalimat selesai 15,94 = cut ke B08',
  },
  // ---------- B08 · cetakan lain disingkirkan ----------
  {
    id: 'B08-N', beat: 'B08', code: 'N', size: 64, x: 1185, y: 440,
    lines: [T('Sesuatu yang gak', 15.9), T('orang lain punya.', 17.0)],
    until: F_B08[1], exit: 'cut', note: 'kalimat selesai 18,40 = cut ke B09',
  },
  // ---------- B10 · wajah F3 lalu YouTube ----------
  {
    id: 'B10-N1', beat: 'B10', code: 'N', size: 60, x: 1010, y: 360, tone: 'dark',
    lines: [T('Karena itu aku', 24.5), T('gak mau mencoba', 25.6)],
    until: F_B10_YT, exit: 'cut', note: '"mencoba" selesai 26,58 = cut (kalimat lanjut di YouTube)',
  },
  {
    // frasa 1 menempel hasil pertama (koordinat dunia = px desain halaman YouTube, jendela skala 1)
    id: 'B10-N2a', beat: 'B10', code: 'N', size: 34, x: 811, y: 246,
    lines: [[joinTok(T('hal -hal', 26.5), 'hal-hal'), ...T('yang kelihatannya', 27.3)]],
    until: 854,
  },
  {
    id: 'B10-N2b', beat: 'B10', code: 'N', size: 34, x: 811, y: 543,
    lines: [T('banyak orang coba.', 28.2)],
    until: F_B10[1], exit: 'cut', note: '"coba." selesai 29,10 = cut ke B11',
  },
  // ---------- B11 · wajah F1 + K4 FOMO ----------
  {
    id: 'B11-K4', beat: 'B11', code: 'K4', order: 'small-big', bigSize: 156, ratio: 3.7, tone: 'dark',
    x: 1120, y: 380, small: T('Aku gak mau jadi orang yang', 29.1, 'aku gak mau jadi orang yang'), big: T('FOMO.', 30.4),
    until: F_B11[1], exit: 'cut', note: 'kalimat selesai 30,98 = cut ke B12',
  },
  // ---------- B12 · ChatGPT ----------
  {
    // frasa 1 di samping kolom riwayat (koordinat dunia; jendela ChatGPT skala 1 di (160,200))
    id: 'B12-Na', beat: 'B12', code: 'N', size: 34, x: 452, y: 470,
    lines: [T('Dan akhirnya aku melakukan banyak', 31.0)], until: 1019,
  },
  {
    id: 'B12-Nb', beat: 'B12', code: 'N', size: 34, x: 452, y: 900,
    lines: [T('investasi waktu pada AI.', 33.7)], until: F_B12[1], exit: 'cut',
  },
  // ---------- B13 · wajah F2 lalu prompt ----------
  {
    id: 'B13-N1', beat: 'B13', code: 'N', size: 64, x: 1300, y: 420, tone: 'dark',
    lines: [T('Untuk belajar.', 35.4)], until: F_B13_GPT, exit: 'cut',
  },
  {
    // koordinat dunia adegan ChatGPT-dekat (lihat Act2.tsx GPT13)
    id: 'B13-N2', beat: 'B13', code: 'N', size: 30, x: 312, y: 672,
    lines: [T('Untuk melakukan sesuatu.', 36.5)], until: 1142,
  },
  {
    id: 'B13-UI', beat: 'B13', code: 'UI', x: 0, y: 0, toks: T('Build something.', 37.8, 'build something'), at: [1137, 1148],
    until: F_B13[1], exit: 'cut',
  },
  // ---------- B14 · dinding bukti ----------
  { id: 'B14-Na', beat: 'B14', code: 'N', size: 46, x: 430, y: 506, lines: [T('Selama', 39.0)], until: 1279 },
  {
    id: 'B14-H', beat: 'B14', code: 'H', size: 72, x: 612, y: 488, rot: -4, ink: '#1A3AD0',
    toks: [joinTok(T('satu tahun', 39.5), 'satu tahun')], until: 1279,
  },
  { id: 'B14-Nb', beat: 'B14', code: 'N', size: 46, x: 430, y: 570, lines: [T('aku mencoba untuk belajar.', 40.0)], until: 1279 },
  {
    id: 'B14-N2', beat: 'B14', code: 'N', size: 50, x: 1060, y: 512,
    lines: [T('Untuk memahami seperti', 42.3), T('apa industri ini.', 43.3)], until: 1339,
  },
  {
    id: 'B14-N3', beat: 'B14', code: 'N', size: 84, x: 2440, y: 1185,
    lines: [T('Dan apa yang', 44.4), T('sudah aku buat.', 45.0)], until: F_B14[1], exit: 'cut',
    note: 'kalimat selesai 45,70; tahan sampai 46,30 (cut ke B15)',
  },
];
