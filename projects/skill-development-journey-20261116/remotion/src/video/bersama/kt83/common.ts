import {CURVE, dur, react} from '../../../lib/curves';
import {KT83} from '../tema';
import type {Kata} from './types';

export const aktif = (kata: Kata, f: number) => f >= kata.masuk && f < kata.akhir;
export const pop = (f: number, masuk: number) => {
  const n = Math.min(4, dur(KT83.ukuran * 0.12, 30, 0.48));
  return 0.9 + 0.1 * CURVE.land(Math.min(1, Math.max(0, (f - masuk) / n)));
};

// react changes the travel of each tag, never the onset of a spoken word.
export const reaksi = (i: number) => 1 + react(i, 30) / 24;

export const lebarKata = (teks: string, size: number, weight = 700) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('KT83: canvas pengukur huruf tidak tersedia');
  ctx.font = `${weight} ${size}px ${KT83.huruf}`;
  return ctx.measureText(teks).width - Math.max(0, teks.length - 1) * size * 0.02;
};
