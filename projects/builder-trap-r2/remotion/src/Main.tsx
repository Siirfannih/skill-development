// Merangkai adegan per beat dari waktu PLAN. Babak baru: buat src/scenes/ActN.tsx (+ ActN.text.ts),
// lalu tambahkan SATU baris di ACTS di bawah. Adegan tidak memakai <Sequence>: useCurrentFrame() = frame absolut.
import React from 'react';
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion';
import { C } from './engine/theme';
import type { SceneEntry } from './engine/scenes';
import { ACT1 } from './scenes/Act1';
import { ACT2 } from './scenes/Act2';
import { ACT2B } from './scenes/Act2b';
import { ACT3A } from './scenes/Act3a';
import { ACT3 } from './scenes/Act3';
import { ACT4 } from './scenes/Act4';

const ACTS: SceneEntry[] = [
  ...ACT1,
  ...ACT2,
  ...ACT2B,
  ...ACT3A,
  ...ACT3,
  ...ACT4,
];

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const active = ACTS.filter((s) => f >= s.from && f < s.to);
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      {active.filter((s) => !s.over).map((s) => <s.Comp key={s.id} />)}
      {active.filter((s) => s.over).map((s) => <s.Comp key={s.id} />)}
      {/* suara terkunci: sumber tunggal face_edit.mp4 */}
      <Audio src={staticFile('face_edit.mp4')} />
    </AbsoluteFill>
  );
};
