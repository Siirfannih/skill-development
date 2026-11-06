import React from 'react';
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion';
import { Bg, Captions } from './ui/common';
import { beat } from './lib/time';
import { B01 } from './scenes/B01';
import { B02 } from './scenes/B02';
import { B03 } from './scenes/B03';
import { B04 } from './scenes/B04';
import { B06 } from './scenes/B06';
import { B07 } from './scenes/B07';
import { B08 } from './scenes/B08';
import { B09 } from './scenes/B09';
import { B10 } from './scenes/B10';

export const Main: React.FC<{ audio: boolean }> = ({ audio }) => {
  const f = useCurrentFrame();
  const dark = f >= beat('b10').s - 3;
  return (
    <AbsoluteFill style={{ fontFamily: '"Plus Jakarta Sans", system-ui' }}>
      <Bg dark={dark} />
      <B01 /><B02 /><B03 /><B04 /><B06 /><B07 /><B08 /><B09 /><B10 />
      <Captions hide={(x) => x < beat('b02').s - 2 || x >= beat('b10').s - 3} />
      {audio && <Audio src={staticFile('mix.wav')} />}
    </AbsoluteFill>
  );
};
