import React from 'react';
import {AbsoluteFill, Composition, registerRoot} from 'remotion';
import {K05TimelinePutus} from '../komponen/K05-TimelinePutus';

const Uji: React.FC = () => (
  <AbsoluteFill style={{background: '#6C787C'}}>
    <K05TimelinePutus mulai={6} kSlop={110} kPutus={220} />
  </AbsoluteFill>
);

const Root: React.FC = () => (
  <Composition id="UjiK05" component={Uji} width={1920} height={1080} fps={30000 / 1001} durationInFrames={300} />
);

registerRoot(Root);
