import React from 'react';
import {KT83} from '../tema';
import {lebarKata} from './common';
import {GelombangKata} from './GelombangKata';
import type {Blok, Kepala} from './types';

export const Narasi: React.FC<{blok: Blok; kepala: Kepala; f: number}> = ({blok, kepala: k, f}) => {
  const n = blok.narasi;
  const end = blok.kata[blok.kata.length - 1].akhir;
  if (!n || f < blok.kata[0].masuk || f >= end) return null;
  const size = n.ukuran * k.z;
  const gap = size * 0.26;
  const cursors: Record<number, number> = {};
  return <div style={{position: 'absolute', left: 960 + (n.x - 960) * k.z,
    top: 486 + (n.y - 486) * k.z, fontFamily: KT83.huruf, fontSize: size,
    lineHeight: 1.05, color: KT83.teks, textShadow: KT83.bayang, whiteSpace: 'nowrap'}}>
    {blok.kata.map((w, i) => {
      const wordSize = w.ukuran ? w.ukuran * k.z : size;
      const row = n.baris[i];
      const x = cursors[row] ?? 0;
      cursors[row] = x + lebarKata(w.teks, wordSize, w.bobot ?? 700) + gap;
      if (f < w.masuk) return null;
      return <div key={i} style={{position: 'absolute', left: x, top: row * size * 1.05,
        fontWeight: w.bobot ?? 700, fontSize: wordSize}}>
        <GelombangKata teks={w.teks} size={wordSize} weight={w.bobot ?? 700}
          age={f - w.masuk} available={end - w.masuk} id={`narasi-${blok.id}-${i}`} lineHeight={1.05}/>
      </div>;
    })}
  </div>;
};
