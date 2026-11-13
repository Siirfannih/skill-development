// Teks layar babak 4 (B23–B26), Editor C (TASK r2c). Hanya kata dari words_final.json (T()).
// Koordinat = dunia adegannya. Dinding B24: cetakan pertama (repo Jadisatu) berpusat di (406, 314), 470 × 290;
// cetakan kedua (ChatGPT "Dot") di (988, 322) — dihitung dari engine/Wall.tsx (WALL[0], WALL[1]).
import { T, joinTok, type TextBlock } from '../text/types';

export const F_B23: [number, number] = [2262, 2328];
export const F_B24: [number, number] = [2328, 2542];
/** cut wajah F2 (sisipan B24): masuk di "Dimana" 81,38; keluar di "gak" 83,30 (PLAN 82,8, lihat Q-C02) */
export const F_B24_FACE: [number, number] = [2441, 2500];
export const F_B25: [number, number] = [2542, 2736];
/** cut wajah F3 → Threads tepat sebelum "apa" terlihat terlambat (85,83 dtk; PLAN 85,9, lihat Q-C03) */
export const F_B25_CUT = 2575;
export const F_B26: [number, number] = [2736, 2849];
/** wipe linear gelap→terang dari bawah, 75,2–75,6 dtk (PLAN B22 keluar) */
export const F_WIPE: [number, number] = [2256, 2268];

/** posisi teks yang menempel post Threads (B25), dipakai Act4.tsx untuk kamera */
export const B25_TEXT_X = 1680;

export const TEXT_ACT4: TextBlock[] = [
  // ---------- B23 · sadar ----------
  {
    id: 'B23-K4', beat: 'B23', code: 'K4', order: 'small-big', bigSize: 150, ratio: 2.3, x: 1000, y: 372, tone: 'dark',
    small: T('Sampai akhirnya aku', 75.4, 'sampai akhirnya aku'), big: T('sadar.', 76.7),
    until: F_B23[1], exit: 'cut',
  },
  // ---------- B24 · kembali ke titik awal ----------
  {
    id: 'B24-N1', beat: 'B24', code: 'N', size: 50, x: 760, y: 500,
    lines: [T('Dan sekarang aku memutuskan', 77.8), T('untuk kembali ke', 79.8)],
    until: 2431,
  },
  {
    id: 'B24-H', beat: 'B24', code: 'H', size: 96, x: 150, y: -12, rot: -5, ink: '#1A3AD0',
    toks: T('titik awal.', 80.7, 'titik awal'),
    until: F_B24[1], exit: 'cut', note: 'tulisan di dinding; sisipan wajah 81,38–83,30 memotong ke luar dinding lalu kembali',
  },
  {
    id: 'B24-N2', beat: 'B24', code: 'N', size: 54, x: 1190, y: 200, tone: 'dark',
    lines: [T('Dimana mungkin', 81.3), T('aku harusnya', 82.6)],
    until: F_B24_FACE[1], exit: 'cut', note: '"harusnya" selesai 83,30 = cut ke dinding di "gak" (Q-C02)',
  },
  {
    id: 'B24-N3', beat: 'B24', code: 'N', size: 56, x: 186, y: 548,
    lines: [T('gak sekedar membangun.', 83.3)],
    until: F_B24[1], exit: 'cut', note: '"membangun." selesai 84,70; cut PLAN 84,72 (Q-10 r1: ikut cut PLAN)',
  },
  // ---------- B25 · share ----------
  {
    id: 'B25-N1', beat: 'B25', code: 'N', size: 66, x: 1000, y: 430, tone: 'dark',
    lines: [[...T('Tapi juga', 84.7), joinTok(T('nge -share', 85.2), 'nge-share')]],
    until: F_B25_CUT, exit: 'cut', note: '"-share" selesai 85,72; cut 85,83 sebelum "apa" (Q-C03)',
  },
  {
    id: 'B25-P1', beat: 'B25', code: 'N', size: 58, x: B25_TEXT_X, y: 470,
    lines: [T('apa yang aku alami.', 85.7)],
    until: F_B25[1], exit: 'cut',
  },
  {
    id: 'B25-P2', beat: 'B25', code: 'N', size: 58, x: B25_TEXT_X, y: 1000,
    lines: [T('Apa yang aku buat.', 87.1, 'apa yang aku buat.')],
    until: F_B25[1], exit: 'cut',
  },
  {
    id: 'B25-P3', beat: 'B25', code: 'N', size: 58, x: B25_TEXT_X, y: 1530,
    lines: [T('Apa pengalaman', 89.1, 'apa pengalaman'), T('yang aku dapatkan.', 89.9)],
    until: F_B25[1], exit: 'cut', note: 'kalimat selesai 91,02; cut PLAN 91,2',
  },
  // ---------- B26 · share, belum sempurna ----------
  {
    id: 'B26-K4a', beat: 'B26', code: 'K4', order: 'small-big', bigSize: 130, ratio: 2.3, x: 970, y: 430, tone: 'dark',
    small: [], big: T('Share.', 91.2, 'share.'),
    until: 2764, note: 'keluar naik saat "ngebagiin" masuk di tempat yang sama (PLAN)',
  },
  {
    id: 'B26-K4b', beat: 'B26', code: 'K4', order: 'small-big', bigSize: 92, ratio: 2.3, x: 970, y: 409, tone: 'dark',
    small: T('Ngebagiin. Apa yang', 92.0, 'ngebagiin apa yang'), big: T('belum sempurna.', 93.0),
    until: F_B26[1] + 1, exit: 'cut',
  },
];
