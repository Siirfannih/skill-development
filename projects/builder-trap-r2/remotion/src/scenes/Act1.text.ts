// Teks layar babak 1 (B01–B05). Hanya kata dari words_final.json; tampilan huruf kecil mengikuti PLAN.
import { T, at, nb, merge, type TextBlock } from '../text/types';

// r5: "tuh" dibuang di potongan suara v3 → kepala = "semua orang bisa"
const h3 = [
  T('Semua orang bisa', 0, 'semua orang bisa'),
  T('Semua orang bisa', 1.9, 'semua orang bisa'),
  T('Semua orang bisa', 3.4, 'semua orang bisa'),
];

export const F_ARCH: [number, number] = [0, 164]; // B01–B03, satu shot bingkai
export const F_B04: [number, number] = [164, 227]; // cut di suku kata "mempublikasikan" (7,56 dtk)
export const F_B05: [number, number] = [227, 299];

export const TEXT_ACT1: TextBlock[] = [
  // r4 (arahan Irfan 15 Nov, pengecualian KT-3 untuk B01–B03): kepala triad dipecah jadi kartu kertas per kata yang
  // menempel tepi kiri-atas bingkai ("semua" | "orang" | "bisa"; "tuh" tidak tampil, dibuang di recut suara) dan tetap
  // selama B01–B03; kunci di kartu kiri-bawah berganti di tempat yang sama (aksen biru). Kartu = dunia (ikut push).
  {
    id: 'B01-C1', beat: 'B01', code: 'N', size: 56, card: true, x: 240, y: 180,
    lines: [merge(...h3.map((h) => [h[0]]))], until: nb(F_ARCH[1]), exit: 'cut',
  },
  {
    id: 'B01-C2', beat: 'B01', code: 'N', size: 56, card: true, x: 460, y: 180,
    lines: [merge(...h3.map((h) => [h[1]]))], until: nb(F_ARCH[1]), exit: 'cut',
  },
  {
    id: 'B01-C3', beat: 'B01', code: 'N', size: 56, card: true, x: 656, y: 180,
    lines: [merge(...h3.map((h) => [h[2]]))], until: nb(F_ARCH[1]), exit: 'cut',
  },
  {
    // r5 (butir 7): kartu kunci di KANAN BAWAH bingkai (diagonal dengan kartu kepala kiri atas), x = tepi kanan kartu
    id: 'B01-K3', beat: 'B01', code: 'K3', size: 96, label: true, alignRight: true,
    x: 1699, y: 760, until: nb(F_ARCH[1]), exit: 'cut',
    head: [],
    keys: [
      T('membangun', 0, 'membangun', true),
      T('membuat', 1.9, 'membuat', true),
      T('bikin software.', 3.4, 'bikin software.', true),
    ],
    note: 'kalimat B03 selesai 5,40; cut zoom-through 5,47',
  },
  // r5 (jawaban Q-r4-07): penekanan pada "gak semua orang" (besar); "tapi" kecil pengantar lalu diganti di tempat yang
  // sama oleh blok besar "gak semua orang" + "bisa" kecil di bawahnya (free: bukan penyeimbangan lebar).
  {
    id: 'B04-N', beat: 'B04', code: 'N', size: 56, x: 912, y: 330, tone: 'dark',
    lines: [T('Tapi', 5.4, 'tapi')],
    until: at('gak semua', 5.9), note: 'pengantar diganti utuh saat "gak" masuk (r5)',
  },
  {
    id: 'B04-K4', beat: 'B04', code: 'K4', order: 'big-small', bigSize: 112, ratio: 2.0, free: true,
    x: 912, y: 330, tone: 'dark', big: T('gak semua orang', 5.9), small: T('bisa', 7.0),
    until: nb(F_B04[1]), exit: 'cut',
    note: 'kalimat lanjut di B05 (cut di "mempublikasikan" sesuai PLAN)',
  },
  {
    id: 'B05-J', beat: 'B05', code: 'J', size: 178, x: 960, y: 372,
    toks: T('mempublikasikan', 7.4),
    until: nb(F_B05[1]), exit: 'cut',
  },
  {
    // r4 (KT-1): baris kedua blok judul, lebar ±90 % kata judul, rata tengah di bawahnya (Medium, lebih ringan dari judul)
    id: 'B05-N', beat: 'B05', code: 'N', size: 142, weight: 500, x: 960, y: 600, align: 'center',
    lines: [T('apa yang mereka buat.', 8.0)],
    until: nb(F_B05[1]), exit: 'cut',
  },
];
