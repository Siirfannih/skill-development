import React from 'react';
import {BarisKata} from './BarisKata';
import {Fonts} from './Fonts';
import {HURUF, MEREK, NETRAL} from './tema';
import type {Kata} from './waktu';

export type KataTekanProps = {kata: Kata; warna?: 'tinta' | 'primer'};

export const KataTekan: React.FC<KataTekanProps> = ({kata, warna = 'tinta'}) => (
  <Fonts>
    <BarisKata kata={[kata]} ukuran={HURUF.ukuran.tekan} bobot={HURUF.bobot.tekan}
      warna={warna === 'primer' ? MEREK.primer : NETRAL.tinta} celah={0} />
  </Fonts>
);
