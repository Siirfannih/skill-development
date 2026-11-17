import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {CONTOH_K13, K13RelayAgen} from '../komponen/K13-RelayAgen';

const Root: React.FC = () => <Composition id="UjiK13" component={K13RelayAgen}
  width={1920} height={1080} fps={30000 / 1001} durationInFrames={420} defaultProps={CONTOH_K13} />;

registerRoot(Root);
