import React from 'react';
import {Composition, registerRoot} from 'remotion';
import './lib/fonts';
import {FPS, H, W} from './lib/theme';
import {TOTAL} from './lib/timing';
import {Video} from './Video';

const Root: React.FC = () => (
  <>
    <Composition id="Main" component={Video} durationInFrames={TOTAL} fps={FPS} width={W} height={H} defaultProps={{withVo: true}} />
  </>
);
registerRoot(Root);
