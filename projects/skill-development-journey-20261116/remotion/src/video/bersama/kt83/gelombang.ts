import {CURVE} from '../../../lib/curves';
import {KT83} from '../tema';

const ukuranCache = new Map<string, {lebar: number; pusat: number; huruf: string}[]>();

export const hurufKata = (teks: string, size: number, weight = 700) => {
  const key = `${teks}:${size}:${weight}`;
  const cached = ukuranCache.get(key);
  if (cached) return cached;
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) throw new Error('KT83: canvas pengukur huruf tidak tersedia');
  ctx.font = `${weight} ${size}px ${KT83.huruf}`;
  const letters = Array.from(teks);
  const result = letters.map((huruf, i) => {
    const end = ctx.measureText(letters.slice(0, i + 1).join('')).width;
    const lebar = ctx.measureText(huruf).width;
    return {huruf, lebar, pusat: end - lebar / 2 - i * size * 0.02};
  });
  ukuranCache.set(key, result);
  return result;
};

export const gelombang = (age: number, i: number, count: number, available: number, tinggi: number) => {
  // Short words must finish inside their existing cue, including its last frame.
  const total = Math.max(1, Math.min(10, available - 1));
  const land = Math.min(6, Math.max(1, total - Math.min(count - 1, total * 0.4)));
  const delay = count > 1 ? Math.min(1, (total - land) / (count - 1)) : 0;
  const local = age - i * delay;
  const rise = (t: number) => 0.85 * tinggi * (1 - CURVE.land(Math.max(0, Math.min(1, t / land))));
  const turun = rise(local);
  const velocity = local >= 0 && local < land ? Math.abs(rise(local + 0.5) - rise(Math.max(0, local - 0.5))) : 0;
  return {terlihat: local >= 0, turun, blur: velocity * 0.6,
    renggang: 1 + 0.25 * (1 - CURVE.land(Math.max(0, Math.min(1, age / total)))),
    total, land, delay};
};
