import React from 'react';
import {AbsoluteFill} from 'remotion';
import {KataKecil} from '../bersama/KataKecil';
import {HURUF, JARAK} from '../bersama/tema';
import {frameDariDetik} from '../bersama/waktu';
import {JejakOrbit} from './P01';
import {KanvasW1, useAdeganW1} from './w1-waktu';

export const P13: React.FC = () => {
  const {frame, fps, durasi, aktif, cari, keKomposisi} = useAdeganW1('P13');
  const mudah = cari('mudah');
  const tekan = frame >= frameDariDetik(mudah.mulai, fps);
  return <KanvasW1 durasi={durasi}>
    <JejakOrbit durasi={durasi}/>
    {tekan ? <>
      <AbsoluteFill style={{transform: `translateY(-${HURUF.ukuran.tekan / 2 + JARAK.m}px)`}}>
        <KataKecil kata={keKomposisi(aktif.filter((k) => k.t === 'dan'))}/>
      </AbsoluteFill>
      <AbsoluteFill data-w1-mudah>
        <style>{`
          [data-w1-mudah] [data-baris-kata] { font-size: ${HURUF.ukuran.tekan}px !important; font-weight: ${HURUF.bobot.tekan} !important; }
          [data-w1-mudah] [data-kata] { width: auto !important; }
          [data-w1-mudah] [data-baris-kata] > span { transform: none !important; }
        `}</style>
        <KataKecil kata={keKomposisi(aktif.filter((k) => k.t !== 'dan'))}/>
      </AbsoluteFill>
    </> : <KataKecil kata={keKomposisi(aktif)}/>}
  </KanvasW1>;
};
