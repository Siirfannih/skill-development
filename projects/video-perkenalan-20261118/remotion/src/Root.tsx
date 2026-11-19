import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import {V7, V7_DUR} from './v7/V7';
import {FPS, H, TOTAL, W} from './tema';

export const Root: React.FC = () => (
  <>
    <Composition id="Perkenalan" component={Main} durationInFrames={TOTAL} fps={FPS} width={W} height={H}/>
    <Composition id="V7" component={V7} durationInFrames={V7_DUR} fps={FPS} width={W} height={H}/>
  </>
);
