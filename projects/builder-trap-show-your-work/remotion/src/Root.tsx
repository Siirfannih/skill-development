import React from 'react';
import { Composition } from 'remotion';
import { Main, FPS, TOTAL } from './Main';
export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1920} height={1080} />
);
