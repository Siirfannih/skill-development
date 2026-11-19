import React from 'react';
import {AbsoluteFill} from 'remotion';
import {KataKecil} from '../bersama/KataKecil';
import {BAYANGAN, HURUF, JARAK, NETRAL, RADIUS} from '../bersama/tema';
import {frameDariDetik} from '../bersama/waktu';
import {move} from '../lib/curves';
import {JejakOrbit, SUMBU_ORBIT} from './P01';
import {KanvasW1, useAdeganW1} from './w1-waktu';

const KartuKosong: React.FC = () => {
  const {frame, fps, width, height, durasi} = useAdeganW1('P13');
  const sumbu = (SUMBU_ORBIT.sudut + 0.8 * move(frame, 0, durasi - 1, 'drift')) * Math.PI / 180;
  const lebar = width * 0.086;
  // Dua busur menyisakan ruang di kiri-kanan untuk frasa penekanan yang panjang.
  const sudutAwal = [0.98, 1.58, 2.18, 2.66];
  return <AbsoluteFill data-orbit-kosong>
    {Array.from({length: 8}, (_, urutan) => {
      const sudut = sudutAwal[urutan % sudutAwal.length]
        + (urutan >= sudutAwal.length ? Math.PI : 0) + frame / fps * 0.025;
      const x = width * SUMBU_ORBIT.rx * Math.cos(sudut);
      const y = height * SUMBU_ORBIT.ry * Math.sin(sudut);
      return <div key={urutan} data-kartu-kosong={urutan}
        style={{position: 'absolute', left: width * SUMBU_ORBIT.x + x * Math.cos(sumbu) - y * Math.sin(sumbu),
          top: height * SUMBU_ORBIT.y + x * Math.sin(sumbu) + y * Math.cos(sumbu),
          width: lebar, height: lebar * 5 / 4, boxSizing: 'border-box',
          border: `${JARAK.s / 2}px solid ${NETRAL.putih}`, borderRadius: RADIUS.kartu / 2,
          boxShadow: BAYANGAN.kartu,
          transform: `translate(-50%, -50%) rotate(${SUMBU_ORBIT.sudut + 7 * Math.cos(sudut)}deg) scale(${0.8 + 0.08 * Math.sin(sudut)})`}}/>;
    })}
  </AbsoluteFill>;
};

export const P13: React.FC = () => {
  const {frame, fps, durasi, aktif, cari, keKomposisi} = useAdeganW1('P13');
  const mudah = cari('mudah');
  const tekan = frame >= frameDariDetik(mudah.mulai, fps);
  return <KanvasW1 durasi={durasi}>
    <JejakOrbit durasi={durasi}/>
    <KartuKosong/>
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
