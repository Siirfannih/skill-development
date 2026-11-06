import { interpolate } from 'remotion';
import { clamp } from '../lib/anim';
const cubicIn = (t: number) => t * t * t;
const cubicOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** posisi masuk/keluar (whip): kembalikan offset dan kecepatan (px/frame) untuk blur arah */
export function whip(f: number, inF: number, outF: number, dist = 2100, dur = 8, inFrom = 1, outTo = -1) {
  const pin = (x: number) => interpolate(x, [inF - dur, inF], [dist * inFrom, 0], { ...clamp, easing: cubicOut });
  const pout = (x: number) => interpolate(x, [outF - dur, outF], [0, dist * outTo], { ...clamp, easing: cubicIn });
  const p = (x: number) => pin(x) + pout(x);
  return { off: p(f), v: Math.abs(p(f + 0.5) - p(f - 0.5)) };
}
