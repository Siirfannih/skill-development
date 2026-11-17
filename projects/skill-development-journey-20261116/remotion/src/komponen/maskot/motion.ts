import {dur, move, react} from '../../lib/curves';

export type ModelAI = 'chatgpt' | 'claude' | 'gemini';
export type LihatKe = 'irfan' | 'kamera';

export const KARAKTER = {
  chatgpt: {seed: 17, bob: 2.37, breath: 3.12, blink: 3.17, firstBlink: 2.83, phase: 0.13},
  claude: {seed: 43, bob: 2.83, breath: 3.67, blink: 3.63, firstBlink: 2.63, phase: 0.67},
  gemini: {seed: 79, bob: 2.61, breath: 2.93, blink: 2.91, firstBlink: 2.43, phase: 0.39},
} as const;

const wave = (frame: number, fps: number, seconds: number, phase: number) => {
  const p = ((frame / fps / seconds + phase) % 1 + 1) % 1;
  return p < 0.5
    ? -1 + 2 * move(p, 0, 0.5, 'drift')
    : 1 - 2 * move(p, 0.5, 0.5, 'drift');
};

export const poseMaskot = (
  frame: number, fps: number, model: ModelAI, tinggiPx: number, lihatKe: LihatKe,
  arahIrfan = -1, menolehFrames: readonly number[] = [],
) => {
  const c = KARAKTER[model];
  const entranceFrames = Math.max(Math.round(fps * 0.4), Math.min(Math.round(fps * 0.6), dur(tinggiPx, fps)));
  const pop = 0.92 + 0.08 * move(frame, 0, entranceFrames, 'land');
  const alive = move(frame, 0, entranceFrames, 'land');
  const glance = Math.min(1, menolehFrames.reduce((sum, at) => sum
    + move(frame, at, fps * 0.23, 'whip') - move(frame, at + fps * 0.88, fps * 0.4, 'drift'), 0));
  const yaw = {claude: 24, chatgpt: 27, gemini: 29}[model];
  const idleYaw = yaw + 6 * wave(frame, fps, c.breath * 1.2, c.phase + 0.19);
  const facing = lihatKe === 'irfan' ? arahIrfan : -arahIrfan;
  const targetYaw = facing * idleYaw * (1 - glance) + arahIrfan * 34 * glance;
  const entryPulse = 4 * alive * (1 - alive);
  const sweepPhase = ((frame / fps / 2.6) % 1 + 1) % 1;
  const firstBlink = Math.round(c.firstBlink * fps);
  const cycle = Math.floor(Math.max(0, frame - firstBlink) / (c.blink * fps));
  const blink = [cycle - 1, cycle, cycle + 1].filter(i => i >= 0).reduce((open, i) => {
    const jitter = i ? ((c.seed * 37 + i * 53) % 11 - 5) / 30 : 0;
    const blinkAge = frame - firstBlink - Math.round((i * c.blink + jitter) * fps);
    return open - 0.92 * move(blinkAge, 0, fps / 30, 'whip')
      + 0.92 * move(blinkAge, fps / 15, fps / 30, 'whip');
  }, 1);
  return {
    pop,
    squash: model === 'chatgpt' ? 1 - 0.17 * entryPulse : 1,
    stretch: model === 'chatgpt' ? 1 + 0.13 * entryPulse : 1,
    sweep: -8 + 16 * move(sweepPhase, 0.12, 0.5, 'drift'),
    sparkle: 0.2 + 0.8 * (1 + wave(frame, fps, 2.1, 0.22)) / 2,
    x: 6 * wave(frame, fps, c.breath * 1.7, c.phase + 0.41) * alive,
    y: (10 * wave(frame, fps, c.bob, c.phase)
      + 3.6 * wave(frame, fps, c.breath * 1.6, c.phase)) * alive + 24 * (1 - alive),
    breath: 1 + 0.015 * wave(frame, fps, c.breath, c.phase + 0.23) * alive,
    rx: (4 + wave(frame, fps, c.breath, c.phase) - 2 * glance) * Math.PI / 180,
    ry: (facing * 70 * (1 - alive) + targetYaw * alive) * Math.PI / 180,
    rz: -0.07 * (1 - alive)
      + (model === 'gemini' ? 0.13 : 0.012) * wave(frame, fps, c.bob * 1.8, c.phase + 0.3),
    blink,
    eyesX: arahIrfan * (0.09 + 0.14 * glance),
    feet: [0, 1, 2, 3].map(i => 0.065 * wave(
      frame - react(i, fps, 0.7), fps, c.bob * 0.79, c.phase,
    ) * alive),
  };
};
