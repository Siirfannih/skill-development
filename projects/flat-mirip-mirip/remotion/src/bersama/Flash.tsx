import React from 'react';
import {AbsoluteFill} from 'remotion';
import {NETRAL} from './tema';
import {useFrameKomposisi} from './useFrameKomposisi';

export type FlashProps = {mulai: number};

export const Flash: React.FC<FlashProps> = ({mulai}) => {
  const frame = useFrameKomposisi();
  if (!Number.isInteger(mulai) || mulai < 0) throw new Error('Flash.mulai harus frame integer ≥ 0.');
  if (frame < mulai || frame >= mulai + 2) return null;
  return <AbsoluteFill data-flash style={{backgroundColor: NETRAL.putih, pointerEvents: 'none', zIndex: 1}} />;
};
