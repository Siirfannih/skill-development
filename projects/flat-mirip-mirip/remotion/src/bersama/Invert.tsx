import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useFrameKomposisi} from './useFrameKomposisi';

export type InvertProps = {children: React.ReactNode; mulai: number; selesai?: number};

export const Invert: React.FC<InvertProps> = ({children, mulai, selesai}) => {
  const frame = useFrameKomposisi();
  if (!Number.isInteger(mulai) || mulai < 0 || (selesai !== undefined && (!Number.isInteger(selesai) || selesai <= mulai))) {
    throw new Error('Invert: mulai/selesai adalah frame integer; selesai harus setelah mulai.');
  }
  const aktif = frame >= mulai && (selesai === undefined || frame < selesai);
  return <AbsoluteFill style={{filter: aktif ? 'invert(1)' : 'none'}}>{children}</AbsoluteFill>;
};
