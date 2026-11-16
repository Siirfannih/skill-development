// Merangkai adegan per beat dari waktu PLAN. Babak baru: buat src/scenes/ActN.tsx (+ ActN.text.ts),
// lalu tambahkan SATU baris di ACTS di bawah. Adegan tidak memakai <Sequence>: useCurrentFrame() = frame absolut.
import React from 'react';
import { AbsoluteFill, Audio, Freeze, Sequence, staticFile, useCurrentFrame, getInputProps } from 'remotion';
import { W, DUR_V6 } from './engine/timewarp';
import { RealFrameProvider } from './engine/realframe';
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

// r5: timeline baru (potongan suara v5, 2739 frame). Adegan ditulis di frame lama → dirender di <Freeze frame={W(f)}>
// sehingga animasi, kamera, dan transisi lama ikut peta waktu tanpa mengubah kode adegan. Teks dan wajah membaca frame
// nyata dari RealFrame (useRealFrame).
const DBG = !!(getInputProps() as { fitDebug?: boolean }).fitDebug;
export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const fo = W(f);
  const active = ACTS.filter((s) => fo >= s.from && fo < s.to);
  const K = Math.max(0, fo - (DUR_V6 - 1));
  const scenes = (
    <>
      {active.filter((s) => !s.over).map((s) => <s.Comp key={s.id} />)}
      {active.filter((s) => s.over).map((s) => <s.Comp key={s.id} />)}
    </>
  );
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <RealFrameProvider frame={f}>
        {/* useCurrentFrame() dijepit ke durasi komposisi − 1 (2738); frame lama > 2738 dibekukan K frame lebih awal lalu
            digeser balik dengan <Sequence from={-K}> sehingga adegan tetap membaca frame lama yang benar */}
        <Freeze frame={fo - K}>
          {K > 0 ? <Sequence from={-K} layout="none">{scenes}</Sequence> : scenes}
        </Freeze>
      </RealFrameProvider>
      {DBG ? <div style={{ position: 'absolute', left: 20, top: 1030, fontSize: 30, fontFamily: 'monospace', color: '#FF00AA', background: '#000' }}>{`f${f} lama${fo} ${active.map((x) => x.id).join(',')}`}</div> : null}
      {/* audio-bus: pinned kandidat mix v6 (suara + SFX + musik) */}
      <Audio src={staticFile('v6/sfx/snapshot-v6/mix.wav')} />
    </AbsoluteFill>
  );
};
