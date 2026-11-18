import React from 'react';
import {Composition, Sequence} from 'remotion';
import {NASKAH} from '../data/naskah';
import {P01} from './P01';
import {P02} from './P02';
import {P03} from './P03';
import {P13} from './P13';
import {P15} from './P15';
import {durasiW1} from './w1-waktu';

const DalamSequence: React.FC = () => <>
  <Sequence from={Math.round(NASKAH.P01.mulai * 30)} durationInFrames={durasiW1('P01', 30)}><P01/></Sequence>
  <Sequence from={Math.round(NASKAH.P02.mulai * 30)} durationInFrames={durasiW1('P02', 30)}><P02/></Sequence>
  <Sequence from={Math.round(NASKAH.P03.mulai * 30)} durationInFrames={durasiW1('P03', 30)}><P03/></Sequence>
  <Sequence from={Math.round(NASKAH.P13.mulai * 30)} durationInFrames={durasiW1('P13', 30)}><P13/></Sequence>
  <Sequence from={Math.round(NASKAH.P15.mulai * 30)} durationInFrames={durasiW1('P15', 30)}><P15/></Sequence>
</>;

export const UjiRoot: React.FC = () => <>
  <Composition id="P01" component={P01} fps={30} width={1920} height={1080} durationInFrames={durasiW1('P01', 30)}/>
  <Composition id="P02" component={P02} fps={30} width={1920} height={1080} durationInFrames={durasiW1('P02', 30)}/>
  <Composition id="P03" component={P03} fps={30} width={1920} height={1080} durationInFrames={durasiW1('P03', 30)}/>
  <Composition id="P13" component={P13} fps={30} width={1920} height={1080} durationInFrames={durasiW1('P13', 30)}/>
  <Composition id="P15" component={P15} fps={30} width={1920} height={1080} durationInFrames={durasiW1('P15', 30)}/>
  <Composition id="W1Sequence" component={DalamSequence} fps={30} width={1920} height={1080}
    durationInFrames={Math.round(NASKAH.P15.selesai * 30)}/>
</>;
