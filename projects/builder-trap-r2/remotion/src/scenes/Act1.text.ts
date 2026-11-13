// Teks layar babak 1 (B01–B05). Hanya kata dari words_final.json; tampilan huruf kecil mengikuti PLAN.
import { T, merge, type TextBlock } from '../text/types';

const head = merge(
  T('Semua orang tuh bisa', 0, 'semua orang tuh bisa'),
  T('Semua orang tuh bisa', 1.9, 'semua orang tuh bisa'),
  T('Semua orang tuh bisa', 3.4, 'semua orang tuh bisa'),
);

export const F_ARCH: [number, number] = [0, 164]; // B01–B03, satu shot bingkai
export const F_B04: [number, number] = [164, 227]; // cut di suku kata "mempublikasikan" (7,56 dtk)
export const F_B05: [number, number] = [227, 299];

export const TEXT_ACT1: TextBlock[] = [
  {
    // r3a: 96 px (lantai kunci); kunci turun ke baris 2 otomatis bila tidak muat
    id: 'B01-K3', beat: 'B01', code: 'K3', size: 96, label: true,
    x: 220, y: 600, until: F_ARCH[1], exit: 'cut',
    head,
    keys: [
      T('membangun', 0, 'membangun', true),
      T('membuat', 1.9, 'membuat', true),
      T('bikin software.', 3.4, 'bikin software.', true),
    ],
    note: 'kalimat B03 selesai 5,40; cut zoom-through 5,47',
  },
  {
    // r3a: crop P longgar (wajah sepertiga kiri), teks di pita TENGAH dinding kanan
    id: 'B04-N', beat: 'B04', code: 'N', size: 56, x: 912, y: 330, tone: 'dark',
    lines: [T('Tapi', 5.4)],
    until: 220, // keluar saat "bisa" masuk supaya maks 2 baris per tampil (A4)
    note: 'frasa berlanjut ke "bisa"; keluar di 7,30 agar tumpukan tetap 2 baris',
  },
  {
    id: 'B04-K4', beat: 'B04', code: 'K4', order: 'big-small', bigSize: 112, ratio: 2.0,
    x: 912, y: 398, tone: 'dark', big: T('gak semua orang', 5.4), small: T('bisa', 7.0),
    until: F_B04[1], exit: 'cut',
    note: 'kalimat lanjut di B05 (cut di "mempublikasikan" sesuai PLAN)',
  },
  {
    id: 'B05-J', beat: 'B05', code: 'J', size: 178, x: 960, y: 372,
    toks: T('mempublikasikan', 7.4),
    until: F_B05[1], exit: 'cut',
  },
  {
    id: 'B05-N', beat: 'B05', code: 'N', size: 56, x: 222, y: 598,
    lines: [T('apa yang mereka buat.', 8.0)],
    until: F_B05[1], exit: 'cut',
  },
];
