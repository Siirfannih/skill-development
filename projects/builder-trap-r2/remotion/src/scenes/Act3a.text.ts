// Teks layar B15 (belokan: dinding yang sama menggelap). Milik Editor A.
import { T, type TextBlock } from '../text/types';
import { beatF } from '../engine/scenes';

export const F_B15 = beatF('B15'); // 1389–1468/1469

export const TEXT_ACT3A: TextBlock[] = [
  {
    // koordinat dunia dinding (WALL); tampil tengah-kiri layar saat kamera mendorong
    id: 'B15-N', beat: 'B15', code: 'N', size: 84, x: 360, y: 497, tone: 'dark',
    lines: [T('Tapi satu hal yang aku', 46.3), T('lewatkan adalah.', 48.0, 'lewatkan adalah')],
    until: F_B15[1], exit: 'cut', note: 'kalimat selesai 48,95 = cut ke B16 (wajah)',
  },
];
