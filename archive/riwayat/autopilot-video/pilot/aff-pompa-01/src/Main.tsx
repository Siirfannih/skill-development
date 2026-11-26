import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {B1, B2, B3, B4, B5, B6, B7} from './beats';

const beats = [
  {from: 0, duration: 137, component: B1},
  {from: 137, duration: 210, component: B2},
  {from: 347, duration: 141, component: B3},
  {from: 488, duration: 186, component: B4},
  {from: 674, duration: 127, component: B5},
  {from: 801, duration: 234, component: B6},
  {from: 1035, duration: 165, component: B7},
] as const;

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#101010'}}>
      {beats.map(({from, duration, component: Beat}, index) => (
        <Sequence key={index} from={from} durationInFrames={duration} premountFor={15}>
          <Beat />
        </Sequence>
      ))}
      <Audio src={staticFile('audio/vo_tight.wav')} />
      <Audio
        src={staticFile('audio/music.mp3')}
        volume={(frame) =>
          interpolate(frame, [1170, 1200], [0.12, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />
    </AbsoluteFill>
  );
};
