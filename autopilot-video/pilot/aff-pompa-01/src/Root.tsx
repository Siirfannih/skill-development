import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';

export const Root: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Main}
      durationInFrames={1200}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
