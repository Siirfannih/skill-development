import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {Kanvas} from '../bersama/Kanvas';
import {JARAK, RADIUS} from '../bersama/tema';
import {KartuArsipW4, LatarW4} from './w4-footage';
import {rencanaW4} from './w4-shots';
import {KataW4, useWaktuW4} from './w4-waktu';

export const P14: React.FC = () => {
  const {frame, fps, pada, kelompok, aktif} = useWaktuW4('P14');
  const {height} = useVideoConfig();
  const atas = JARAK.aman + RADIUS.kartu;
  const tinggi = height * 0.58;
  const awalKartu = [0, pada(1), pada(3)];
  return <Kanvas>
    {rencanaW4('P14', fps).map((shot, n) => <Sequence key={`${shot.id}-${n}`} from={shot.from} durationInFrames={shot.to - shot.from} premountFor={fps}>
      <LatarW4 shot={shot} blur={RADIUS.kartu}/>
      <AbsoluteFill style={{backgroundColor: 'rgba(0,0,0,0.24)'}}/>
      <AbsoluteFill style={{height: atas + tinggi + JARAK.l, overflow: 'hidden'}}>
        <KartuArsipW4 shot={shot} tinggi={tinggi} atas={atas} miring={[-3, 2.5, -2][shot.kartu ?? 0]}
          umur={frame - awalKartu[shot.kartu ?? 0]}/>
      </AbsoluteFill>
    </Sequence>)}
    <KataW4 putih kata={kelompok(aktif)} y={(atas + tinggi + JARAK.l * 2) / height}/>
  </Kanvas>;
};
