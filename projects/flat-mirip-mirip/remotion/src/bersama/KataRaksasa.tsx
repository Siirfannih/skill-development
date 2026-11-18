import React from 'react';
import {useVideoConfig} from 'remotion';
import {BarisKata, ukurTeks} from './BarisKata';
import {Fonts} from './Fonts';
import {HURUF, MEREK} from './tema';
import {periksaKata, type Kata} from './waktu';

export type KataRaksasaProps = {kata: readonly Kata[]; lebar?: number};

const Terukur: React.FC<KataRaksasaProps> = ({kata, lebar = 0.75}) => {
  const {width} = useVideoConfig();
  periksaKata(kata);
  if (kata.length < 1 || kata.length > 2) throw new Error('KataRaksasa menerima satu atau dua kata.');
  if (!Number.isFinite(lebar) || lebar <= 0 || lebar > 1) throw new Error('KataRaksasa.lebar harus > 0 dan ≤ 1.');
  const dasar = HURUF.ukuran.raksasa;
  const spasi = ukurTeks(' ', dasar, HURUF.bobot.raksasa).width;
  const panjang = kata.reduce((jumlah, item) => jumlah + ukurTeks(item.t.trim(), dasar, HURUF.bobot.raksasa).width, 0)
    + spasi * (kata.length - 1);
  const skala = lebar * width / panjang;
  return <BarisKata kata={kata} ukuran={dasar * skala} bobot={HURUF.bobot.raksasa}
    warna={MEREK.primer} celah={spasi * skala} />;
};

export const KataRaksasa: React.FC<KataRaksasaProps> = (props) => <Fonts><Terukur {...props} /></Fonts>;
