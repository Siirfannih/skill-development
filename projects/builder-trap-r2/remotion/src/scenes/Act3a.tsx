// B15 · twist: dinding bukti yang sama menggelap lewat wipe linear atas→bawah (0,6 dtk), benang tetap biru terang.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Layer } from '../engine/Stage';
import { camPath } from '../engine/camera';
import { TextBlocks } from '../engine/TextLayer';
import { Wall } from '../engine/Wall';
import { WipeLinear } from '../engine/Transitions';
import { C, prog } from '../engine/theme';
import type { SceneEntry } from '../engine/scenes';
import { TEXT_ACT3A, F_B15 } from './Act3a.text';

const b15Cam = camPath(
  [
    { f: F_B15[0], x: 1608, y: 875, zoom: 0.535 }, // sama dengan akhir B14
    { f: F_B15[1], x: 1500, y: 820, zoom: 0.66, ease: 'inOut' }, // push pelan ke tengah dinding
  ],
  { sigma: 0 },
);

const B15: React.FC = () => {
  const f = useCurrentFrame();
  const w = prog(f, F_B15[0], F_B15[0] + 18, 'inOut');
  return (
    <AbsoluteFill>
      {w < 1 ? (
        <Stage pose={b15Cam} bg={C.linen}>
          <Layer z={0} name="L1-L2"><Wall mode="terang" /></Layer>
        </Stage>
      ) : null}
      <WipeLinear progress={w} dir="down" feather={140}>
        <Stage pose={b15Cam} bg={C.dark0}>
          <Layer z={0} name="L1-L2"><Wall mode="gelap" /></Layer>
          <Layer z={30} name="L3"><TextBlocks blocks={TEXT_ACT3A} /></Layer>
        </Stage>
      </WipeLinear>
    </AbsoluteFill>
  );
};

export const ACT3A: SceneEntry[] = [{ id: 'S-B15', beats: 'B15', from: F_B15[0], to: F_B15[1], Comp: B15 }];
