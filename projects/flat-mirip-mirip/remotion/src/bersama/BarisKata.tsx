import React from 'react';
import {AbsoluteFill, random, useVideoConfig} from 'remotion';
import {move} from '../lib/curves';
import {HURUF, TEKS} from './tema';
import {frameDariDetik, kelompokPadaFrame, type Kata} from './waktu';
import {useFrameKomposisi} from './useFrameKomposisi';

export const ukurTeks = (t: string, ukuran: number, bobot: number) => {
  const konteks = document.createElement('canvas').getContext('2d');
  if (!konteks) throw new Error('Canvas measureText tidak tersedia.');
  konteks.font = `${bobot} ${ukuran}px "${HURUF.keluarga.isi}"`;
  return konteks.measureText(t);
};

type BarisKataProps = {
  kata: readonly Kata[];
  ukuran: number;
  bobot: number;
  warna: string;
  celah: number;
  goyang?: boolean;
};

export const BarisKata: React.FC<BarisKataProps> = ({kata, ukuran, bobot, warna, celah, goyang = false}) => {
  const frame = useFrameKomposisi();
  const {fps, height} = useVideoConfig();
  const kelompok = kelompokPadaFrame(kata, frame, fps);
  if (!kelompok.length) return null;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        data-baris-kata
        style={{
          position: 'absolute', left: '50%', top: height * TEKS.garisY,
          transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center',
          columnGap: celah, whiteSpace: 'pre', fontFamily: HURUF.keluarga.isi,
          fontWeight: bobot, fontSize: ukuran, lineHeight: 1, color: warna, fontSynthesis: 'none',
        }}
      >
        {kelompok.map((item) => {
          const mulai = frameDariDetik(item.mulai, fps);
          const masuk = 3 + (item.indeks % 2);
          const p = move(frame, mulai - 1, masuk, 'reveal');
          const offset = goyang ? (random(`kata-y-${item.indeks}`) * 2 - 1) * TEKS.goyangY * height : 0;
          return (
            <span key={item.indeks} style={{display: 'block', transform: `translateY(${offset}px)`}}>
              <span
                data-kata={item.t}
                style={{
                  display: 'block', width: ukurTeks(item.t, ukuran, bobot).width,
                  visibility: frame < mulai ? 'hidden' : 'visible',
                  clipPath: `inset(${(1 - p) * 100}% 0 0 0)`,
                  transform: `translateY(${(1 - p) * TEKS.goyangY * height}px)`,
                }}
              >{item.t}</span>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
