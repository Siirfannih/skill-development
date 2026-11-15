import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { FPS, W, H } from './engine/theme';
import { DUR_V3 } from './engine/timewarp';
import { loadFonts } from './engine/fonts';

loadFonts();

export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={DUR_V3} fps={FPS} width={W} height={H} />
);
