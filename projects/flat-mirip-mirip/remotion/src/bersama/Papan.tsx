import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Flash} from './Flash';
import {Invert} from './Invert';
import {Kanvas} from './Kanvas';
import {KartuSlop, type RasioSlop} from './KartuSlop';
import {KataKecil} from './KataKecil';
import {KataRaksasa} from './KataRaksasa';
import {KataTekan} from './KataTekan';
import {JARAK} from './tema';
import type {Kata} from './waktu';

const narasi: Kata[] = [
  {t: 'kenapa', mulai: 0, selesai: 0.25},
  {t: 'banyak', mulai: 8 / 30, selesai: 0.5},
  {t: 'video', mulai: 16 / 30, selesai: 1.15},
  {t: 'terasa', mulai: 36 / 30, selesai: 1.3},
  {t: 'mirip-mirip?', mulai: 40 / 30, selesai: 1.5},
];
const merah: Kata[] = [
  {t: 'sudah', mulai: 75 / 30, selesai: 82 / 30},
  {t: 'mengubah', mulai: 83 / 30, selesai: 105 / 30},
];
const negatif: Kata[] = [
  {t: 'industri', mulai: 105 / 30, selesai: 111 / 30},
  {t: 'kreatif', mulai: 112 / 30, selesai: 120 / 30},
];

const GridSlop: React.FC = () => {
  const {width, height} = useVideoConfig();
  const kolom = 6;
  const tinggi = (height - JARAK.aman * 2 - JARAK.m) / 2;
  const lebar = (width - JARAK.aman * 2 - JARAK.m * (kolom - 1)) / kolom;
  return (
    <AbsoluteFill style={{padding: JARAK.aman, display: 'grid', gridTemplateColumns: `repeat(${kolom}, 1fr)`, gridTemplateRows: 'repeat(2, 1fr)', gap: JARAK.m}}>
      {Array.from({length: 12}, (_, seed) => {
        const rasio: RasioSlop = seed % 2 === 0 ? '4:5' : '9:16';
        const r = rasio === '4:5' ? 4 / 5 : 9 / 16;
        return <div key={seed} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <KartuSlop seed={seed} rasio={rasio} style={{width: Math.min(lebar, tinggi * r), height: 'auto'}} />
        </div>;
      })}
    </AbsoluteFill>
  );
};

export type PapanProps = {tampilan?: 'urutan' | 'slop'};

export const Papan: React.FC<PapanProps> = ({tampilan = 'urutan'}) => {
  const frame = useCurrentFrame();
  if (tampilan === 'slop') return <Kanvas><GridSlop /></Kanvas>;
  return (
    <Invert mulai={105} selesai={120}>
      <Kanvas>
        {frame >= 120 ? <GridSlop />
          : frame < 45 ? <KataKecil kata={narasi} />
          : frame < 75 ? <KataTekan kata={{t: 'flat', mulai: 45 / 30, selesai: 75 / 30}} />
          : <KataRaksasa kata={frame < 105 ? merah : negatif} lebar={0.75} />}
        <Flash mulai={73} />
      </Kanvas>
    </Invert>
  );
};
