import React from 'react';
import {Composition} from 'remotion';
import {UjiMaskot} from './uji/UjiMaskot';

export const RemotionRoot: React.FC = () => <>
  <Composition id="Uji-CGPT" component={UjiMaskot} width={1920} height={1080}
    fps={30} durationInFrames={160} defaultProps={{latar: 'cgpt'}} />
  <Composition id="Uji-Claude" component={UjiMaskot} width={1920} height={1080}
    fps={30} durationInFrames={160} defaultProps={{latar: 'claude'}} />
  <Composition id="Uji-Gemini" component={UjiMaskot} width={1920} height={1080}
    fps={30} durationInFrames={160} defaultProps={{latar: 'gemini'}} />
</>;
