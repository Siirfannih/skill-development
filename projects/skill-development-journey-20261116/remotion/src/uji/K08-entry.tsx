import React from 'react';
import {AbsoluteFill, Composition, registerRoot} from 'remotion';
import {K08KartuPaket, K08Props} from '../komponen/K08-KartuPaket';

const Uji: React.FC<K08Props> = (p) => (
  <AbsoluteFill style={{background: '#6C787C'}}>
    <K08KartuPaket {...p} />
  </AbsoluteFill>
);

const Root: React.FC = () => (
  <Composition id="UjiK08" component={Uji} width={1920} height={1080} fps={30000 / 1001} durationInFrames={300}
    defaultProps={{mulai: 0, kBalik: 20, kChatgpt: 120, kClaude: 180}} />
);
registerRoot(Root);
