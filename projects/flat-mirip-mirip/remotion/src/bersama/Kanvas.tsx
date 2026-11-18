import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {move} from '../lib/curves';
import {Fonts} from './Fonts';
import {MEREK} from './tema';

export type KanvasProps = {children?: React.ReactNode; drift?: number};

export const Kanvas: React.FC<KanvasProps> = ({children, drift = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  if (!Number.isFinite(drift) || drift < 0 || drift > 1) {
    throw new Error('Kanvas.drift harus berada di antara 0 dan 1.');
  }
  const skala = 1 + 0.02 * drift * move(frame, 0, Math.max(1, durationInFrames - 1), 'drift');

  return (
    <AbsoluteFill style={{backgroundColor: MEREK.latar, overflow: 'hidden'}}>
      <Fonts>
        <AbsoluteFill style={{transform: `scale(${skala})`}}>{children}</AbsoluteFill>
      </Fonts>
    </AbsoluteFill>
  );
};
