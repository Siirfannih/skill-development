// Teks layar babak 2 milik Editor A: B06–B08, B10–B14 (B09 ada di Act2b.text.ts milik Editor B).
import { T, at, nb, joinTok, type TextBlock, type Tok } from '../text/types';
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

/**
 * r7 (Revisi Irfan 15 Nov, TASK-r7 R2): B12 dan B13b tanpa KT — satu-satunya teks = teks UI yang diketik di prompt
 * (kartu 63: "Tidak ada caption/subtitle"). Kata yang diucapkan di sana sengaja tidak tampil; cekkata membaca daftar ini
 * sebagai pengecualian HILANG (bukan blok teks: tanpa `code`, jadi renderer mengabaikannya).
 */
export const KATA_TANPA_TEKS: { beat: string; toks: Tok[]; alasan: string }[] = [
  { beat: 'B12', toks: T('Dan akhirnya aku melakukan banyak investasi waktu pada AI.', 31.0), alasan: 'R2: desktop ChatGPT tanpa KT' },
  { beat: 'B13', toks: T('Untuk melakukan sesuatu.', 36.5), alasan: 'R2: desktop ChatGPT tanpa KT (B13b)' },
];

export const TEXT_ACT2: TextBlock[] = [
  // ---------- B06 · foto cetak di alas ----------
  // r3a (F-v1-05): menempel tepi kanan foto (celah 26 px dunia), sejajar kepala; ukuran ≥ 56 px layar
  { id: 'B06-N1', beat: 'B06', code: 'N', size: 50, x: 946, y: 330, lines: [T('Memasuki usia', 9.9)], until: nb(347) },
  {
    // label tulisan tangan di dalam foto (dirender di dalam <Print>, koordinat = isi foto)
    id: 'B06-H', beat: 'B06', code: 'H', size: 92, x: 252, y: 104, rot: -6, ink: '#FFFFFF',
    toks: [joinTok(T('20 -an.', 10.5), '20-an')],
    arrow: { d: 'M -4 60 C -24 72 -36 92 -40 122 M -40 122 L -53 101 M -40 122 L -20 109', box: [0, 0, 1, 1] },
    until: nb(F_B06[1]), exit: 'cut',
  },
  // r4 (KT-2): kalimat dipecah 1–3 kata per tampil, frasa diganti utuh di tempat yang sama di samping foto; dua tampil
  // terakhir = blok seimbang (KT-4: mode berganti).
  {
    id: 'B06-N2a', beat: 'B06', code: 'N', size: 50, x: 946, y: 450,
    lines: [T('Aku merasa aku', 11.3, 'aku merasa aku')], until: at('perlu', 12.4),
  },
  {
    id: 'B06-N2b', beat: 'B06', code: 'N', size: 50, x: 946, y: 450,
    lines: [T('perlu untuk', 12.4)], until: at('melakukan', 13.3),
  },
  {
    id: 'B06-N2c', beat: 'B06', code: 'N', size: 50, x: 946, y: 450, even: true,
    lines: [T('melakukan', 13.3), T('sesuatu', 13.7)], until: at('yang', 14.1),
  },
  {
    // pengecualian KT-1: "yang" = satu kata sambung 1 suku di atas kata hero
    id: 'B06-K4', beat: 'B06', code: 'K4', order: 'small-big', bigSize: 110, ratio: 2.1, free: true, x: 946, y: 450,
    small: T('yang', 14.1), big: T('berbeda.', 14.2),
    until: nb(F_B06[1]), exit: 'cut', note: 'kalimat selesai 14,92 tepat di cut ke B07 (PLAN, Q-10)',
  },
  // ---------- B07 · wajah M + K4 seimbang ----------
  {
    // r4 (KT-5 I-01): "unik." diskalakan sampai lebarnya ≥ lebar "sesuatu yang", ujung kanan sejajar
    id: 'B07-K4', beat: 'B07', code: 'K4', order: 'small-big', bigSize: 170, ratio: 2.6, tone: 'dark',
    x: 1110, y: 380, small: T('Sesuatu yang', 14.9, 'sesuatu yang'), big: T('unik.', 15.4),
    until: nb(F_B07[1]), exit: 'cut', note: 'kalimat selesai 15,94 = cut ke B08',
  },
  // ---------- B08 · cetakan lain disingkirkan ----------
  {
    id: 'B08-N', beat: 'B08', code: 'N', size: 64, x: 1185, y: 440,
    lines: [T('Sesuatu yang gak', 15.9, 'sesuatu yang gak')], until: at('orang lain', 17.3),
  },
  {
    id: 'B08-K4', beat: 'B08', code: 'K4', order: 'small-big', bigSize: 130, ratio: 2.3, x: 1185, y: 440,
    small: T('orang lain', 17.3), big: T('punya.', 18.0),
    until: nb(F_B08[1]), exit: 'cut', note: 'kalimat selesai 18,40 = cut ke B09',
  },
  // ---------- B10 · wajah M lalu YouTube ----------
  {
    // r4: pita BAWAH kanan; frasa pendek lalu blok seimbang di tempat yang sama
    id: 'B10-N1', beat: 'B10', code: 'N', size: 60, x: 1200, y: 640, tone: 'dark',
    lines: [T('Karena itu aku', 24.5, 'karena itu aku')], until: at('gak mau', 25.6),
  },
  {
    id: 'B10-N1b', beat: 'B10', code: 'N', size: 60, x: 1200, y: 640, tone: 'dark', even: true,
    lines: [T('gak mau', 25.6), T('mencoba', 26.1)],
    until: nb(F_B10_YT), exit: 'cut', note: '"mencoba" selesai 26,58 = cut (kalimat lanjut di YouTube)',
  },
  {
    // frasa 1 menempel hasil pertama (koordinat dunia = px desain halaman YouTube, jendela skala 1)
    id: 'B10-N2a', beat: 'B10', code: 'N', size: 34, x: 811, y: 246,
    lines: [[joinTok(T('hal -hal', 26.5), 'hal-hal'), ...T('yang kelihatannya', 27.3)]],
    until: nb(854),
  },
  {
    id: 'B10-N2b', beat: 'B10', code: 'N', size: 34, x: 811, y: 543,
    lines: [T('banyak orang coba.', 28.2)],
    until: nb(F_B10[1]), exit: 'cut', note: '"coba." selesai 29,10 = cut ke B11',
  },
  // ---------- B11 · wajah P + K4 FOMO ----------
  {
    id: 'B11-N', beat: 'B11', code: 'N', size: 56, x: 1000, y: 300, tone: 'dark',
    lines: [T('Aku gak mau', 29.1, 'aku gak mau')], until: at('jadi orang', 29.7),
  },
  {
    // r4 (KT-5 I-02): baris kecil dipecah (≤ 3 kata), ujung kanan "FOMO." sejajar ujung baris kecil
    id: 'B11-K4', beat: 'B11', code: 'K4', order: 'small-big', bigSize: 130, ratio: 2.32, tone: 'dark',
    x: 1000, y: 300, small: T('jadi orang yang', 29.7), big: T('FOMO.', 30.4),
    until: nb(F_B11[1]), exit: 'cut', note: 'kalimat selesai 30,98 = cut ke B12',
  },
  // ---------- B13 · wajah T lalu prompt ----------
  {
    id: 'B13-N1', beat: 'B13', code: 'N', size: 64, x: 1060, y: 200, tone: 'dark',
    lines: [T('Untuk belajar.', 35.4, 'untuk belajar.')], until: nb(F_B13_GPT), exit: 'cut',
  },
  {
    // r7c: diketik huruf demi huruf 12/dtk di kotak prompt jendela mulai f1121 lama ("b"), "something" = huruf ke-7 (f1136 lama)
    id: 'B13-UI', beat: 'B13', code: 'UI', x: 0, y: 0, toks: T('Build something.', 37.8, 'build something'), at: [nb(1121), nb(1136)],
    until: nb(F_B13[1]), exit: 'cut',
  },
  // ---------- B14 · dinding bukti ----------
  { id: 'B14-Na', beat: 'B14', code: 'N', size: 46, x: 430, y: 506, lines: [T('Selama', 39.0)], until: nb(1279) },
  {
    id: 'B14-H', beat: 'B14', code: 'H', size: 72, x: 612, y: 488, rot: -4, ink: '#1A3AD0',
    toks: [joinTok(T('satu tahun', 39.5), 'satu tahun')], until: nb(1279),
  },
  { id: 'B14-Nb', beat: 'B14', code: 'N', size: 46, x: 430, y: 570, lines: [T('aku mencoba', 40.0)], until: at('untuk belajar.', 41.5) },
  { id: 'B14-Nb2', beat: 'B14', code: 'N', size: 46, x: 430, y: 570, lines: [T('untuk belajar.', 41.5)], until: nb(1279) },
  { id: 'B14-N2', beat: 'B14', code: 'N', size: 50, x: 1060, y: 512, lines: [T('Untuk memahami', 42.3, 'untuk memahami')], until: at('seperti apa', 43.1) },
  { id: 'B14-N2b', beat: 'B14', code: 'N', size: 50, x: 1060, y: 512, lines: [T('seperti apa', 43.1)], until: at('industri', 43.6) },
  {
    // KT-4: tampil ketiga di tempat yang sama = mode hero (bukan frasa ketiga berturut)
    id: 'B14-N2c', beat: 'B14', code: 'K4', order: 'small-big', bigSize: 96, small: [], x: 1060, y: 500,
    big: T('industri ini.', 43.6), until: nb(1339),
  },
  {
    id: 'B14-N3', beat: 'B14', code: 'N', size: 84, x: 2362, y: 1185,
    lines: [T('Dan apa yang', 44.4, 'dan apa yang')], until: at('sudah aku buat.', 45.0),
  },
  {
    // r5 (Q-r4-07): K4 "sudah aku / buat." — yang dibesarkan kata bermakna ("buat."), bukan "sudah"
    id: 'B14-N3b', beat: 'B14', x: 2362, y: 1185, code: 'K4', order: 'small-big', bigSize: 84, small: T('sudah aku', 45.0), big: T('buat.', 45.4), until: nb(F_B14[1]), exit: 'cut',
    note: 'kalimat selesai 45,70; tahan sampai 46,30 (cut ke B15)',
  },
];
