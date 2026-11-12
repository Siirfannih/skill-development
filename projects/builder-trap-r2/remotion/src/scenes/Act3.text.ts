// Teks layar babak 3 (B16–B22), Editor B (TASK r2b). Hanya kata dari words_final.json.
import { T, merge, joinTok, type TextBlock, type K3Block, type NBlock } from '../text/types';

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

// K3 triad B16–B18: kepala "aku tidak … apapun." tetap; B18 kata pertama berganti "aku"→"dan" sesuai ucapan
// (token "dan" = blok B18-K3dan, dirender oleh K3Triad di Act3.tsx di slot kata pertama).
const head = merge(T('Aku tidak', 49.0, 'aku tidak'), T('Aku tidak', 50.7, 'aku tidak'));
head[1] = { ...head[1], i: [...head[1].i, ...T('tidak', 52.55)[0].i] };
export const K3_POS = { x: 236, y: 152, size: 84 };
export const B16_K3: K3Block = {
  id: 'B16-K3', beat: 'B16', code: 'K3', size: K3_POS.size, x: K3_POS.x, y: K3_POS.y, tone: 'dark',
  head,
  keys: [T('menjual', 49.5, 'menjual', true), T('mempublikasikan', 51.0, 'mempublikasikan', true), T('mendokumentasikan', 52.7, 'mendokumentasikan', true)],
  tail: merge(T('apapun.', 50.3), T('apapun.', 52.0), T('apapun.', 53.6)),
  until: 1627, exit: 'cut',
  note: 'bertahan B16–B18 melewati cut; hilang bersama cut ke form B19 (kalimat selesai 54,20 = cut PLAN 54,24)',
};
export const B18_DAN: NBlock = {
  id: 'B18-K3dan', beat: 'B18', code: 'N', size: K3_POS.size, x: K3_POS.x, y: K3_POS.y, tone: 'dark',
  lines: [T('Dan', 52.4, 'dan')], until: 1627, exit: 'cut',
  note: 'kata pertama kepala K3 B18 (dirender K3Triad)',
};

export const TEXT_ACT3: TextBlock[] = [
  B16_K3,
  B18_DAN,
  // B19
  {
    id: 'B19-N1', beat: 'B19', code: 'N', size: 42, x: 1362, y: 405, tone: 'dark',
    lines: [T('Dan ngebangun', 54.2)],
    until: 1677, note: 'di samping field nama; kamera pindah ke tombol Create saat "itu" (55,82)',
  },
  {
    id: 'B19-N2', beat: 'B19', code: 'N', size: 42, x: 1000, y: 1125, tone: 'dark',
    lines: [T('itu bikin kita', 55.8)],
    until: F_B19_CUT, exit: 'cut', note: 'di samping tombol Create; frasa lanjut "jadi adiktif." di wajah (cut PLAN 56,5)',
  },
  {
    id: 'B19-K4', beat: 'B19', code: 'K4', order: 'small-big', bigSize: 118, ratio: 2.3, x: 228, y: 380, tone: 'dark',
    small: T('jadi', 56.4), big: T('adiktif.', 56.6), bigAccent: false,
    until: F_B19[1], exit: 'cut', note: 'kata selesai 57,80 tepat di cut ke B20 (PLAN)',
  },
  // B20
  {
    id: 'B20-K4', beat: 'B20', code: 'K4', order: 'small-big', bigSize: 92, ratio: 2.3, x: 290, y: 250, tone: 'dark',
    small: T('Atau', 57.8, 'atau'), big: T('kecanduan.', 58.1),
    until: 1774,
  },
  {
    id: 'B20-N1', beat: 'B20', code: 'N', size: 52, x: 250, y: 520, tone: 'dark',
    lines: [T('Untuk membangun', 59.1), T('sesuatu.', 60.0)],
    until: 1821, note: 'berganti per frasa di tempat yang sama (PLAN): keluar naik saat "Yang" (60,52) masuk',
  },
  {
    id: 'B20-N2', beat: 'B20', code: 'N', size: 52, x: 240, y: 560, tone: 'dark',
    lines: [T('Yang pada akhirnya', 60.5), T('gak pernah kita publish.', 61.5)],
    until: 1885,
  },
  {
    id: 'B20-N3', beat: 'B20', code: 'N', size: 74, x: 1363, y: 955, tone: 'dark', align: 'center',
    lines: [T('Dan gak pernah selesai.', 62.5)],
    until: F_B20[1], exit: 'cut', note: 'kalimat selesai 63,52 tepat di cut ke wajah B21 (PLAN 63,6)',
  },
  // B21
  {
    id: 'B21-K4a', beat: 'B21', code: 'K4', order: 'small-big', bigSize: 100, ratio: 2.3, x: 990, y: 392, tone: 'dark',
    small: T('Aku terobsesi sama', 64.3, 'aku terobsesi sama'), big: T('kesempurnaan.', 65.7),
    until: F_B21_CUT, exit: 'cut', note: 'kata selesai 67,00; cut 67,07 sebelum "Dan"',
  },
  {
    id: 'B21-K4b', beat: 'B21', code: 'K4', order: 'small-big', bigSize: 96, ratio: 2.3, x: 252, y: 178, tone: 'dark',
    small: T('Dan aku merasa pengen sekali menjadi seorang', 67.0, 'dan aku merasa pengen sekali menjadi seorang'), big: T('autentik.', 69.6),
    until: F_B21[1], exit: 'cut', note: 'kata selesai 70,26 tepat di cut ke B22 (PLAN 70,28)',
  },
  // B22
  {
    id: 'B22-N1', beat: 'B22', code: 'N', size: 38, x: 668, y: 100, tone: 'dark',
    lines: [T('Sampai akhirnya aku', 70.28), T('gak menjadi siapapun.', 71.7)],
    until: 2196,
  },
  {
    id: 'B22-N2', beat: 'B22', code: 'N', size: 100, x: 960, y: -200, tone: 'dark', align: 'center',
    lines: [T('Dan aku gak melangkah', 72.8), [...T('jauh', 73.8), joinTok(T('kemana -mana.', 74.2), 'kemana-mana.')]],
    until: F_B22[1], exit: 'cut', note: 'kalimat selesai 74,80; beat berakhir 75,4 (wipe ke B23 milik babak 4)',
  },
];
