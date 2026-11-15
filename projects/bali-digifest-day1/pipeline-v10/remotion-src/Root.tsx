import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { Proto } from './Proto';

export const Root: React.FC = () => (
  <>
  <Composition id="Proto6" component={Proto} durationInFrames={300} fps={30} width={1920} height={1080} />
  <Composition id="BDF26Day1" component={Main} durationInFrames={3577} fps={30} width={1920} height={1080} />
  </>
);
