import React from 'react';
import {Composition} from 'remotion';
import {SgMain} from './video/SgMain';
import data from './data/ep03.json';

export const Root: React.FC = () => (
  <Composition id="SgMain" component={SgMain} durationInFrames={Math.round(data.durasi * data.fps)} fps={data.fps} width={data.lebar} height={data.tinggi} />
);
