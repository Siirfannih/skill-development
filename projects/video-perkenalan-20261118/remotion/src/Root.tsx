import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import {FPS, H, TOTAL, W} from './tema';

export const Root: React.FC = () => (
  <Composition id="Perkenalan" component={Main} durationInFrames={TOTAL} fps={FPS} width={W} height={H}/>
);
