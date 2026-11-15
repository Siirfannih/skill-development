// Teks layar B15 (belokan: dinding yang sama menggelap). Milik Editor A.
import { T, at, nb, type TextBlock } from '../text/types';
import { beatF } from '../engine/scenes';

export const F_B15 = beatF('B15'); // 1389–1468/1469

export const TEXT_ACT3A: TextBlock[] = [
  {
    // r4 (KT-2): koordinat dunia dinding (WALL); frasa diganti utuh di tempat yang sama saat kamera mendorong
    id: 'B15-N', beat: 'B15', code: 'N', size: 84, x: 360, y: 497, tone: 'dark',
    lines: [T('Tapi satu hal', 46.3, 'tapi satu hal')], until: at('yang aku lewatkan', 47.9) + 1, // r8: +1 f, kata lama (pudar+blur) masih di frame masuk blok baru (f1280)
  },
  {
    id: 'B15-N2', beat: 'B15', code: 'N', size: 84, x: 360, y: 497, tone: 'dark',
    lines: [T('yang aku lewatkan adalah.', 47.9, 'yang aku lewatkan adalah')],
    until: nb(F_B15[1]), exit: 'cut', note: 'kalimat selesai 48,95 = cut ke B16 (wajah); 4 kata (pecah lagi = "adalah" 9 f)',
  },
];
