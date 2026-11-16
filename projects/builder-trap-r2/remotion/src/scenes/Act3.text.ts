// Teks layar babak 3 (B16–B22), Editor B (TASK r2b). Hanya kata dari words_final.json.
import { T, at, nb, joinTok, type TextBlock, type NBlock } from '../text/types';

export const F_B16: [number, number] = [1469, 1522];
export const F_B17: [number, number] = [1522, 1574];
export const F_B18: [number, number] = [1574, 1627];
export const F_B19: [number, number] = [1627, 1735];
/** cut form → wajah di "jadi" (56,48 dtk); PLAN 56,5 */
export const F_B19_CUT = 1695;
export const F_B20: [number, number] = [1735, 1908];
export const F_B21: [number, number] = [1908, 2108];
/** cut F3 → F1 tepat sebelum "Dan" (67,06 dtk); PLAN 67,0 */
export const F_B21_CUT = 2012;
export const F_B22: [number, number] = [2108, 2262];

// r4 (KT-5 I-03, triad B16–B18 satu keluarga): tumpuk kata — satu kata per baris, kata masuk saat diucapkan. Tiap kalimat
// satu blok, diganti utuh di tempat yang sama (terkunci layar, melewati cut).
// r5 (jawaban Q-r4-01/07): dikecualikan dari KT-1. Kata kunci = baris TERBESAR (putih), kepala + "apapun." 72 px abu
// (≥ 56, kunci ≥ 1,3×), rata kiri. Kunci B16 140 px (sisipan wajah, ruang lega); B17/B18 96 px (modal Threads mulai layar
// x 950, jendela GitHub x 1095 → "mendokumentasikan" 96 px berakhir x ±1057).
export const ST_POS = { x: 170, y: 360, head: 72, lh: 1.0 }; // r5 (butir 8): tengah-kiri, bukan pita atas
const stack = (id: string, beat: string, words: [string, number, string?][], key: number, keySize: number, until: number, note?: string, y = ST_POS.y): NBlock => ({
  id, beat, code: 'N', size: ST_POS.head, x: ST_POS.x, y, tone: 'dark', dimHead: true, lh: ST_POS.lh,
  lineSizes: words.map((_, k) => (k === key ? keySize : ST_POS.head)),
  lines: words.map(([w, t, d], k) => T(w, t, d, k === key)), until, exit: 'rise', note,
});
export const TRIAD: NBlock[] = [
  stack('B16-ST', 'B16', [['Aku', 49.0, 'aku'], ['tidak', 49.2], ['menjual', 49.5], ['apapun.', 50.3]], 2, 140, at('Aku tidak mempublikasikan', 50.7) + 1, // r8: +1 f, tanpa frame kosong (f1356)
    'kalimat diganti utuh saat "Aku" kalimat 2 masuk (50,76); keluar naik 5 f'),
  stack('B17-ST', 'B17', [['Aku', 50.7, 'aku'], ['tidak', 50.8], ['mempublikasikan', 51.0], ['apapun.', 51.9]], 2, 96, at('Dan tidak', 52.4),
    'diganti utuh saat "Dan" masuk (52,48); diturunkan supaya kata kunci tidak menimpa composer', 600),
  stack('B18-ST', 'B18', [['Dan', 52.4, 'dan'], ['tidak', 52.55], ['mendokumentasikan', 52.7], ['apapun.', 53.6]], 2, 96, nb(1627),
    'hilang bersama cut ke form B19 (kalimat selesai 54,20 = cut PLAN 54,24)'),
];
TRIAD[2].exit = 'cut';

// TRIAD tidak dimasukkan ke TEXT_ACT3 (cekkata membaca setiap array yang diekspor; dirender sendiri di Act3.tsx)
export const TEXT_ACT3: TextBlock[] = [
  // B19
  {
    id: 'B19-N1', beat: 'B19', code: 'N', size: 42, x: 1362, y: 405, tone: 'dark', dimHead: true, weight: 600,
    lines: [T('Dan ngebangun', 54.2, 'dan ngebangun')],
    until: nb(1677), note: 'di samping field nama; kamera pindah ke tombol Create saat "itu" (55,82)',
  },
  {
    id: 'B19-N2', beat: 'B19', code: 'N', size: 42, x: 1150, y: 1125, tone: 'dark',
    lines: [T('itu bikin kita', 55.8)],
    until: nb(F_B19_CUT), exit: 'cut', note: 'di samping tombol Create; frasa lanjut "jadi adiktif." di wajah (cut PLAN 56,5)',
  },
  {
    // r4 (KT-4): mode hero satu baris (≥ 96 px), bukan K4 kecil+besar ("jadi" 2 suku tidak masuk pengecualian KT-1)
    id: 'B19-K4', beat: 'B19', code: 'N', size: 110, x: 1150, y: 404, tone: 'dark', even: true,
    lines: [[...T('jadi', 56.4), ...T('adiktif.', 56.6, undefined, true)]],
    until: nb(F_B19[1]), exit: 'cut', note: 'kata selesai 57,80 tepat di cut ke B20 (PLAN)',
  },
  // B20 · teks menempel kartu repo terdepan (slot depan: kiri 883, atas 155, 960 × 770 dunia)
  {
    // r4: "atau" frasa pendek lalu hero "kecanduan." di tempat yang sama (satu baris 96 px tidak muat di kiri kartu)
    id: 'B20-K4.a', beat: 'B20', code: 'N', size: 56, x: 200, y: 260, tone: 'dark',
    lines: [T('Atau', 57.8, 'atau')], until: at('kecanduan.', 58.1),
  },
  {
    id: 'B20-K4', beat: 'B20', code: 'K4', order: 'small-big', bigSize: 96, small: [], x: 200, y: 240, tone: 'dark',
    big: T('kecanduan.', 58.1), until: at('Untuk membangun', 59.1),
  },
  {
    id: 'B20-N1', beat: 'B20', code: 'N', size: 56, x: 212, y: 500, tone: 'dark', even: true,
    lines: [T('Untuk membangun', 59.1, 'untuk membangun'), T('sesuatu.', 60.0)],
    until: at('Yang pada', 60.5), note: 'berganti per frasa di tempat yang sama (PLAN)',
  },
  {
    id: 'B20-N2', beat: 'B20', code: 'N', size: 56, x: 212, y: 500, tone: 'dark',
    lines: [T('Yang pada akhirnya', 60.5, 'yang pada akhirnya')],
    until: at('gak pernah', 61.5),
  },
  {
    id: 'B20-N2.b', beat: 'B20', code: 'N', size: 56, x: 212, y: 500, tone: 'dark', even: true,
    lines: [T('gak pernah', 61.5), T('kita publish.', 61.8)],
    until: nb(1885),
  },
  {
    // r4: K4 seimbang di bawah kotak "No releases published" saat punch
    id: 'B20-N3', beat: 'B20', code: 'K4', order: 'small-big', bigSize: 96, x: 1262, y: 730, tone: 'dark',
    small: T('Dan gak pernah', 62.5, 'dan gak pernah'), big: T('selesai.', 63.0),
    until: nb(F_B20[1]), exit: 'cut', note: 'kalimat selesai 63,52 tepat di cut ke wajah B21 (PLAN 63,6)',
  },
  // B21 · bagian 1 crop M, K4 pita bawah kanan; bagian 2 crop P, pita atas KANAN (r6 keseimbangan: wajah di tengah-kiri)
  {
    id: 'B21-K4a', beat: 'B21', code: 'K4', order: 'small-big', bigSize: 96, ratio: 2.3, x: 1062, y: 668, tone: 'dark',
    small: T('Aku terobsesi sama', 64.3, 'aku terobsesi sama'), big: T('kesempurnaan.', 65.7),
    until: nb(F_B21_CUT), exit: 'cut', note: 'kata selesai 67,00; cut 67,07 sebelum "Dan"',
  },
  {
    id: 'B21-K4b.a', beat: 'B21', code: 'N', size: 56, x: 1150, y: 185, tone: 'dark',
    lines: [T('Dan aku merasa', 67.0, 'dan aku merasa')], until: at('pengen', 68.0),
  },
  {
    id: 'B21-K4b.b', beat: 'B21', code: 'N', size: 56, x: 1150, y: 185, tone: 'dark',
    lines: [T('pengen sekali', 68.0)], until: at('menjadi seorang', 68.7),
  },
  {
    id: 'B21-K4b', beat: 'B21', code: 'K4', order: 'small-big', bigSize: 96, ratio: 2.3, x: 1150, y: 185, tone: 'dark',
    small: T('menjadi seorang', 68.7), big: T('autentik.', 69.6),
    until: nb(F_B21[1]), exit: 'cut', note: 'kata selesai 70,26 tepat di cut ke B22 (PLAN 70,28)',
  },
  // B22 · profil → punch ke "No threads yet" → kamera mundur jauh
  {
    id: 'B22-N1a', beat: 'B22', code: 'N', size: 40, x: 1452, y: 300, tone: 'dark',
    lines: [T('Sampai akhirnya aku', 70.28, 'sampai akhirnya aku')],
    until: nb(2156), note: 'frasa berlanjut di B22-N1b (di bawah "No threads yet") saat kamera punch',
  },
  {
    id: 'B22-N1b', beat: 'B22', code: 'N', size: 22, x: 1035, y: 674, tone: 'dark', align: 'center',
    lines: [T('gak menjadi siapapun.', 71.7)],
    until: nb(2185), exit: 'cut', note: '"siapapun." selesai 72,84 (f2185) = whip mundur (f2184–2192) sebelum "Dan" (f2186)',
  },
  {
    id: 'B22-N2', beat: 'B22', code: 'N', size: 100, x: 1035, y: -100, tone: 'dark', align: 'center',
    lines: [T('Dan aku gak', 72.8, 'dan aku gak')], until: at('melangkah', 73.4),
  },
  {
    id: 'B22-N2.b', beat: 'B22', code: 'N', size: 100, x: 1035, y: -100, tone: 'dark', align: 'center',
    lines: [T('melangkah jauh', 73.4)], until: at('kemana', 74.2),
  },
  {
    // KT-4: tampil ketiga di tempat yang sama = hero (≥ 96 px layar)
    // r6 (Q-r5-03): waktu dari frame ADEGAN (keBaru(frame lama)) supaya salinan beku di wipe B22→B23 tetap menampilkannya
    id: 'B22-N2.c', beat: 'B22', code: 'N', size: 100, x: 1035, y: -130, tone: 'dark', align: 'center', even: true, sceneTime: true,
    lines: [[joinTok(T('kemana -mana.', 74.2), 'kemana-mana.', true)]],
    until: nb(F_B22[1]), exit: 'cut', note: 'kalimat selesai 74,80; beat berakhir 75,4 (wipe ke B23 milik babak 4)',
  },
];
