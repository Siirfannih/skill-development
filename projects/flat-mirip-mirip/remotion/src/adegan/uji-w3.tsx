import React from 'react';
import {Composition, Sequence, useVideoConfig} from 'remotion';
import {NASKAH} from '../data/naskah';
import {P08} from './P08';
import {P09} from './P09';
import {P10} from './P10';

const panjang = (id: 'P08' | 'P09' | 'P10', fps: number) => Math.round((NASKAH[id].selesai - NASKAH[id].mulai) * fps);
const SambungW3: React.FC = () => {
  const {fps} = useVideoConfig();
  return <>
    <Sequence from={Math.round(NASKAH.P08.mulai * fps)} durationInFrames={panjang('P08', fps)}><P08/></Sequence>
    <Sequence from={Math.round(NASKAH.P09.mulai * fps)} durationInFrames={panjang('P09', fps)}><P09/></Sequence>
    <Sequence from={Math.round(NASKAH.P10.mulai * fps)} durationInFrames={panjang('P10', fps)}><P10/></Sequence>
  </>;
};

export const UjiRoot: React.FC = () => <>
  <Composition id="P08" component={P08} width={1920} height={1080} fps={30} durationInFrames={panjang('P08', 30)}/>
  <Composition id="P09" component={P09} width={1920} height={1080} fps={30} durationInFrames={panjang('P09', 30)}/>
  <Composition id="P10" component={P10} width={1920} height={1080} fps={30} durationInFrames={panjang('P10', 30)}/>
  <Composition id="W3-Sambung" component={SambungW3} width={1920} height={1080} fps={30}
    durationInFrames={Math.round(NASKAH.P10.selesai * 30)}/>
</>;
