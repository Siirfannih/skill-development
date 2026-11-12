import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { FPS, W, H, TOTAL } from './engine/theme';
import { loadFonts } from './engine/fonts';

loadFonts();

export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
);
