import React from 'react';
import {Invert} from '../bersama/Invert';
import {KataRaksasa} from '../bersama/KataRaksasa';
import {frameDariDetik} from '../bersama/waktu';
import {KanvasW1, useAdeganW1} from './w1-waktu';

export const P03: React.FC = () => {
  const {fps, durasi, offset, aktif, cari, keKomposisi} = useAdeganW1('P03');
  return <Invert mulai={offset + frameDariDetik(cari('industri').mulai, fps)}>
    <KanvasW1 durasi={durasi}>
      {aktif.length > 0 && <KataRaksasa kata={keKomposisi(aktif)} lebar={0.75}/>}
    </KanvasW1>
  </Invert>;
};
