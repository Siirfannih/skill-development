import React from 'react';
import {Composition, Sequence} from 'remotion';
import {NASKAH} from '../data/naskah';
import {P04} from './P04';
import {P05} from './P05';
import {P06} from './P06';

const panjang = (id: string) => Math.round((NASKAH[id].selesai - NASKAH[id].mulai) * 30);
const mulai = (id: string) => Math.round(NASKAH[id].mulai * 30);
const UjiSequenceW2: React.FC = () => <>
  <Sequence from={mulai('P04')} durationInFrames={panjang('P04')}><P04/></Sequence>
  <Sequence from={mulai('P05')} durationInFrames={panjang('P05')}><P05/></Sequence>
  <Sequence from={mulai('P06')} durationInFrames={panjang('P06')}><P06/></Sequence>
</>;

export const UjiRoot: React.FC = () => <>
  <Composition id="P04" component={P04} durationInFrames={panjang('P04')} fps={30} width={1920} height={1080}/>
  <Composition id="P05" component={P05} durationInFrames={panjang('P05')} fps={30} width={1920} height={1080}/>
  <Composition id="P06" component={P06} durationInFrames={panjang('P06')} fps={30} width={1920} height={1080}/>
  <Composition id="W2-sequence" component={UjiSequenceW2} durationInFrames={mulai('P06') + panjang('P06')} fps={30} width={1920} height={1080}/>
</>;
