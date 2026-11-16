import React from 'react';
import { Composition, Sequence, registerRoot } from 'raea';
import { Main } from './src/Main';
import { loadFonts } from './src/engine/fonts';
import { DUR_V5 } from './src/engine/timewarp';
import { FPS, H, W } from './src/engine/theme';

const SMOKE_START = 2439;
const SMOKE_FRAMES = 300;

loadFonts();

const Smoke10s: React.FC = () => (
  <Sequence from={-SMOKE_START} durationInFrames={DUR_V5}>
    <Main />
  </Sequence>
);

registerRoot(() => (
  <>
    <Composition id="Main" component={Main} durationInFrames={DUR_V5} fps={FPS} width={W} height={H} />
    <Composition id="Smoke10s" component={Smoke10s} durationInFrames={SMOKE_FRAMES} fps={FPS} width={W} height={H} />
  </>
));

