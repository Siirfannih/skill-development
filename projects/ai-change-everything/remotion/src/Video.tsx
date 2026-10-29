import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {C} from './lib/theme';
import {TOTAL, wf} from './lib/timing';
import {S1} from './scenes/S1';
import {S2} from './scenes/S2';
import {S3} from './scenes/S3';
import {S4} from './scenes/S4';
import {S5} from './scenes/S5';

export const Video: React.FC<{withVo?: boolean}> = ({withVo = true}) => {
  const s2 = wf('02_janji', 'Janjinya');
  return (
    <AbsoluteFill style={{background: C.black}}>
      <Sequence from={0} durationInFrames={s2}>
        <S1 />
      </Sequence>
      <Sequence from={s2} durationInFrames={wf('03_kenyataan', 'Tapi') - s2}>
        <S2 start={s2} />
      </Sequence>
      <Sequence from={wf('03_kenyataan', 'Tapi')} durationInFrames={wf('04_visi', 'Teknologi') - 3 - wf('03_kenyataan', 'Tapi')}>
        <S3 start={wf('03_kenyataan', 'Tapi')} />
      </Sequence>
      <Sequence from={wf('04_visi', 'Teknologi') - 3} durationInFrames={wf('05_tidakterlihat', 'Perusahaan') - 8 - (wf('04_visi', 'Teknologi') - 3)}>
        <S4 start={wf('04_visi', 'Teknologi') - 3} end={wf('05_tidakterlihat', 'Perusahaan') - 8} />
      </Sequence>
      <Sequence from={wf('05_tidakterlihat', 'Perusahaan') - 8}>
        <S5 start={wf('05_tidakterlihat', 'Perusahaan') - 8} />
      </Sequence>
      {withVo ? <Audio src={staticFile('audio/vo_temp.wav')} /> : null}
    </AbsoluteFill>
  );
};
export {TOTAL};
