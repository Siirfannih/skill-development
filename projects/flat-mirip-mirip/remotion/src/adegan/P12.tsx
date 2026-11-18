import React from 'react';
import {Kanvas} from '../bersama/Kanvas';
import {HURUF, JARAK, TEKS} from '../bersama/tema';
import {useVideoConfig} from 'remotion';
import {MontaseW4} from './w4-footage';
import {rencanaW4} from './w4-shots';
import {KataW4, useWaktuW4} from './w4-waktu';

export const P12: React.FC = () => {
  const {frame, fps, durasi, pada, kelompok, aktif} = useWaktuW4('P12');
  const {height} = useVideoConfig();
  const hero = frame >= pada(6) && aktif === 2;
  return <Kanvas>
    <MontaseW4 shots={rencanaW4('P12', fps)} blurDari={pada(7)} blurSampai={durasi - 1} xTeks={0.28}/>
    {aktif === 2 ? <>
      <KataW4 putih kata={kelompok(2).slice(0, 1)} x={hero ? 0.5 : 0.28}
        y={hero ? TEKS.garisY - (HURUF.ukuran.raksasa / 2 + JARAK.m) / height : TEKS.garisY}/>
      <KataW4 putih kata={kelompok(2).slice(1)} ukuran="raksasa" x={0.5} lebar={0.78}/>
    </> : <KataW4 putih kata={kelompok(aktif)} x={aktif === 0 ? 0.5 : 0.28}/>}
  </Kanvas>;
};
