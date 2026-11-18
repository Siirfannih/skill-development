import React from 'react';
import {Kanvas} from '../bersama/Kanvas';
import {HURUF, JARAK, TEKS} from '../bersama/tema';
import {useVideoConfig} from 'remotion';
import {MontaseW4} from './w4-footage';
import {rencanaW4} from './w4-shots';
import {KataW4, useWaktuW4} from './w4-waktu';

export const P11: React.FC = () => {
  const {fps, kelompok, aktif} = useWaktuW4('P11');
  const {height} = useVideoConfig();
  return <Kanvas>
    <MontaseW4 shots={rencanaW4('P11', fps)}/>
    {aktif === 0 ? <KataW4 putih kata={kelompok(0)}/> : <>
      <KataW4 putih kata={kelompok(1).slice(0, 1)} y={TEKS.garisY - (HURUF.ukuran.tekan / 2 + JARAK.m) / height}/>
      <KataW4 putih kata={kelompok(1).slice(1)} ukuran="tekan"/>
    </>}
  </Kanvas>;
};
