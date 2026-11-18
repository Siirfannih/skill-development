import React from 'react';
import {KataRaksasa} from '../bersama/KataRaksasa';
import {KanvasW1, useAdeganW1} from './w1-waktu';

export const P15: React.FC = () => {
  const {fps, durasi, aktif, keKomposisi} = useAdeganW1('P15');
  return <KanvasW1 durasi={durasi}>
    {aktif.length > 0 && <KataRaksasa kata={keKomposisi(aktif, durasi / fps)} lebar={0.75}/>}
  </KanvasW1>;
};
