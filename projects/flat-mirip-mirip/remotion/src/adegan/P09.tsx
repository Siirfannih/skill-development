import React from 'react';
import {Kanvas} from '../bersama/Kanvas';
import {DuniaGridW3} from './w3-grid';
import {TeksW3, useWaktuW3} from './w3-waktu';

export const P09: React.FC = () => {
  const {frame, pada} = useWaktuW3('P09');
  return <Kanvas>
    <DuniaGridW3 frame={frame} bukaPada={pada('brand,')}>
      <TeksW3 id="P09" tekanKelompok={4}/>
    </DuniaGridW3>
  </Kanvas>;
};
