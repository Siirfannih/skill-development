import React from 'react';
import {useVideoConfig} from 'remotion';
import {BarisKata} from './BarisKata';
import {Fonts} from './Fonts';
import {HURUF, NETRAL, TEKS} from './tema';
import type {Kata} from './waktu';

export type KataKecilProps = {kata: readonly Kata[]; diFootage?: boolean};

export const KataKecil: React.FC<KataKecilProps> = ({kata, diFootage = false}) => {
  const {width} = useVideoConfig();
  return (
    <Fonts>
      <BarisKata kata={kata} ukuran={HURUF.ukuran.narasi} bobot={HURUF.bobot.narasi}
        warna={diFootage ? NETRAL.putih : NETRAL.tinta}
        celah={(diFootage ? TEKS.celahFootage : TEKS.celahKanvas) * width} goyang />
    </Fonts>
  );
};
