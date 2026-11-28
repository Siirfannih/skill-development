import React from 'react';
import { Composition } from 'remotion';
import { Main } from './video/Main';
import { DURASI_F } from './video/waktu';

export const Root: React.FC = () => (
  <Composition id="SgMain" component={Main} durationInFrames={DURASI_F} fps={30} width={1080} height={1920} />
);
