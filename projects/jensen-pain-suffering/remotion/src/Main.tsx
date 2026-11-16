// Merangkai shot per beat (PLAN.json). Hanya suara terkunci; SFX/musik disusun Sutradara (PLAN audio_rencana).
import React from 'react';
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion';
import { C } from './engine/theme';
import { B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12 } from './shots';

const SHOTS: [number, number, React.FC][] = [
  [0, 104, B1], [104, 182, B2], [182, 271, B3], [271, 458, B4], [458, 561, B5], [561, 709, B6],
  [709, 813, B7], [813, 967, B8], [967, 1053, B9], [1053, 1170, B10], [1170, 1330, B11], [1330, 1428, B12],
];

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const act = SHOTS.find(([a, b]) => f >= a && f < b);
  const S = act ? act[2] : null;
  return (
    <AbsoluteFill style={{ backgroundColor: C.hitam }}>
      {S ? <S /> : null}
      <Audio src={staticFile('suara.wav')} />
    </AbsoluteFill>
  );
};
