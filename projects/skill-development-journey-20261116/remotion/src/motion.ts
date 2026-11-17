import {random} from 'remotion';
import {move} from './lib/curves';

export type ModelAI = 'claude' | 'chatgpt' | 'gemini';
export type SisiTatap = 'kiri' | 'kanan' | 'kamera';

type PoseInput = {
  frame: number;
  fps: number;
  masuk: number;
  model: ModelAI;
  tatap: SisiTatap;
  seed: number;
};

export const entryScale = (frame: number) =>
  1.08 * move(frame, 0, 10, 'land') - 0.08 * move(frame, 10, 6, 'drift');

export const getMaskotPose = ({frame, fps, masuk, model, tatap, seed}: PoseInput) => {
  const f = frame - masuk;
  const sample = (channel: string) => random(`${model}:${seed}:${channel}`);
  const phase = sample('phase') * Math.PI * 2;
  const period = 1.6 + 0.8 * sample('period');
  const seconds = Math.max(0, f) / fps;
  const idle = move(f, 10, 12, 'drift');
  const wave = (offset = 0, multiplier = 1) =>
    Math.sin(seconds / period * Math.PI * 2 * multiplier + phase + offset);

  let blink = 1;
  let nextBlink = (2.5 + 1.5 * sample('blink-first')) * fps;
  for (let i = 0; nextBlink <= f; i++) {
    const sinceBlink = f - nextBlink;
    if (sinceBlink <= 3) {
      blink = 1 - 0.96 * move(sinceBlink, 0, 1.2, 'wind')
        + 0.96 * move(sinceBlink, 1.2, 1.8, 'wind');
      break;
    }
    nextBlink += (2.5 + 1.5 * sample(`blink-gap-${i}`)) * fps;
  }

  const lookPeriod = (3.3 + sample('look-period')) * fps;
  const lookFrame = (Math.max(0, f) + sample('look-phase') * lookPeriod) % lookPeriod;
  const look = move(lookFrame, lookPeriod * 0.12, lookPeriod * 0.22, 'wind')
    - move(lookFrame, lookPeriod * 0.58, lookPeriod * 0.25, 'drift');
  const direction = tatap === 'kiri' ? -1 : tatap === 'kanan' ? 1 : sample('camera-side') > 0.5 ? 1 : -1;
  const turn = (12 + sample('turn') * 8) * Math.PI / 180;

  return {
    visible: f > 0,
    entry: entryScale(f),
    period,
    bob: 2.4 * 0.025 * wave() * idle,
    breath: 1 + 0.007 * wave(0.8, 0.72) * idle,
    yaw: direction * turn * look * move(f, 0, 16, 'drift'),
    roll: 0.014 * wave(1.5, 0.65) * idle,
    blink: Math.max(0.04, Math.min(1, blink)),
    eyeOffset: direction * 0.035 * look,
    arms: [wave(0.5) * 0.055 * idle, wave(2.6, 0.93) * 0.05 * idle],
    legs: [0, 1.7, 3.5, 4.9].map((offset) => wave(offset, 0.82) * 0.065 * idle),
    rise: -0.24 * (1 - move(f, 0, 16, 'land')),
    sparkle: 0.035 * wave(2.2, 0.87) * idle,
  };
};
