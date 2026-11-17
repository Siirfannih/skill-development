import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {UjiMaskot} from './UjiMaskot';

const Root: React.FC = () => <Composition id="UjiK12" component={UjiMaskot}
  width={1920} height={1080} fps={30000 / 1001} durationInFrames={210}
  defaultProps={{latar: 'gemini'}} />;

registerRoot(Root);
