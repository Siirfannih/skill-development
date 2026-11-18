// Master video flat-mirip-mirip: merakit adegan P01–P15 berurutan dari waktu NASKAH (hard cut antar adegan).
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {NASKAH} from './data/naskah';
import {MEREK} from './bersama/tema';
import {P01} from './adegan/P01'; import {P02} from './adegan/P02'; import {P03} from './adegan/P03';
import {P04} from './adegan/P04'; import {P05} from './adegan/P05'; import {P06} from './adegan/P06';
import {P07} from './adegan/P07'; import {P08} from './adegan/P08'; import {P09} from './adegan/P09';
import {P10} from './adegan/P10'; import {P11} from './adegan/P11'; import {P12} from './adegan/P12';
import {P13} from './adegan/P13'; import {P14} from './adegan/P14'; import {P15} from './adegan/P15';

const FPS = 30;
const ADEGAN: [string, React.FC][] = [['P01', P01], ['P02', P02], ['P03', P03], ['P04', P04], ['P05', P05], ['P06', P06], ['P07', P07], ['P08', P08], ['P09', P09], ['P10', P10], ['P11', P11], ['P12', P12], ['P13', P13], ['P14', P14], ['P15', P15]];
const f = (dtk: number) => Math.round(dtk * FPS);
export const DURASI_VIDEO = f(NASKAH.P15.selesai);

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: MEREK.latar}}>
    {ADEGAN.map(([id, Komp]) => (
      <Sequence key={id} name={id} from={f(NASKAH[id].mulai)} durationInFrames={f(NASKAH[id].selesai) - f(NASKAH[id].mulai)}>
        <Komp/>
      </Sequence>
    ))}
  </AbsoluteFill>
);
