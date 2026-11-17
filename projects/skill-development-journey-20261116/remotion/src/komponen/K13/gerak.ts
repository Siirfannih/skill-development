import {move} from '../../lib/curves';

export const masuk = (f: number, start: number) => {
  const p = move(f, start, 16, 'land');
  return {opacity: p, transform: `translateY(${24 * (1 - p)}px) scale(${.92 + .08 * p})`};
};

export const ketik = (text: string, f: number, start: number, frames: number) => {
  const words = text.split(' ');
  return words.slice(0, Math.floor(words.length * move(f, start, frames, 'drift'))).join(' ');
};

export const denyut = (f: number, start: number) =>
  move(f, start, 4, 'heavy') - move(f, start + 4, 7, 'leave');

export const blurCepat = (f: number, start: number) =>
  move(f, start, 1, 'heavy') - move(f, start + 1, 2, 'leave');

export const TOKOH_X = [430, 780, 1130, 1480] as const;
export const loopPath = `M${TOKOH_X[0]} 630 H${TOKOH_X[3]} V1022 H${TOKOH_X[0]} V630`;
const loopPoints = [[430, 630], [780, 630], [1130, 630], [1480, 630], [1480, 1022], [430, 1022], [430, 630]];
export const LOOP_TIMES = [0, 5, 10, 15, 18, 23, 26] as const;
export const LOOP_CHECKS = [26, 5, 10, 15] as const;

export const sinyalLoop = (f: number, start: number) => {
  const end = LOOP_TIMES.findIndex((time, i) => i > 0 && f <= start + time);
  const segment = end < 0 ? 5 : end - 1;
  const t = move(f, start + LOOP_TIMES[segment], LOOP_TIMES[segment + 1] - LOOP_TIMES[segment], 'heavy');
  return {x: loopPoints[segment][0] + (loopPoints[segment + 1][0] - loopPoints[segment][0]) * t,
    y: loopPoints[segment][1] + (loopPoints[segment + 1][1] - loopPoints[segment][1]) * t};
};

type Jangkar = {mulai: number; durasi: number; kKayak: number; kChatgptKeClaude: number;
  kSebaliknya: number; kSessionBeda: number; kLoop: number};
type Kamera = {at: number; frames: number; x: number; y: number; scale: number};

export const kameraK13 = (f: number, p: Jangkar) => {
  const shots: Kamera[] = [
    {at: p.kKayak, frames: 24, x: 511, y: 350, scale: 1.8},
    {at: p.kChatgptKeClaude, frames: 20, x: 1394, y: 350, scale: 1.8},
    {at: p.kChatgptKeClaude + 20, frames: 20, x: 955, y: 790, scale: 1.5},
    {at: p.kSebaliknya + 26, frames: 24, x: 790, y: 820, scale: 1.5},
    {at: p.kSessionBeda, frames: 24, x: 1305, y: 790, scale: 1.5},
    {at: p.kLoop - 28, frames: 28, x: 960, y: 540, scale: 1},
  ];
  let camera = {x: 960, y: 540, scale: 1};
  let blur = 0;
  shots.forEach((shot, i) => {
    const t = move(f, shot.at, shot.frames, 'heavy');
    camera = {x: camera.x + (shot.x - camera.x) * t, y: camera.y + (shot.y - camera.y) * t,
      scale: camera.scale + (shot.scale - camera.scale) * t};
    const next = shots[i + 1]?.at ?? p.mulai + p.durasi;
    // Drift belongs to this hold; its endpoint is carried into the next pan.
    const breath = move(f, shot.at + shot.frames, Math.max(1, next - shot.at - shot.frames), 'drift');
    camera.scale += (i === shots.length - 1 ? .012 : .018) * breath;
    blur += blurCepat(f, shot.at + Math.round(shot.frames / 2));
  });
  return {...camera, blur: 2 * blur};
};
