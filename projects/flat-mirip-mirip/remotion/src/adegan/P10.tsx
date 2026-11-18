import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Kanvas} from '../bersama/Kanvas';
import {NASKAH} from '../data/naskah';
import {move, react} from '../lib/curves';
import {DuniaGridW3} from './w3-grid';
import {TeksW3, useWaktuW3} from './w3-waktu';

export const P10: React.FC = () => {
  const {frame, fps, pada, akhir, durasi} = useWaktuW3('P10');
  const offset = Math.round((NASKAH.P09.selesai - NASKAH.P09.mulai) * fps);
  const mulaiLupa = akhir('biasanya');
  const akhirLupa = akhir('diingat') + Math.round((durasi - akhir('diingat')) * .25);
  const durLupa = Math.max(1, akhirLupa - mulaiLupa - react(4, fps));
  // Fade leave memang diminta untuk makna lupa; tidak dipakai untuk kemunculan atau transisi lain.
  const atas = 1 - move(frame, mulaiLupa, durLupa, 'leave');
  const bawah = 1 - move(frame, mulaiLupa + react(4, fps), durLupa, 'leave');
  const teks = 1 - move(frame, pada('diingat'), Math.max(1, akhir('diingat') - pada('diingat')), 'leave');
  return <Kanvas>
    <DuniaGridW3 frame={offset + frame} opasitasBaris={[atas, bawah]}>
      <AbsoluteFill data-w3-teks-lupa style={{opacity: teks}}><TeksW3 id="P10"/></AbsoluteFill>
    </DuniaGridW3>
  </Kanvas>;
};
