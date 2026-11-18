import React from 'react';
import {KT83} from '../tema';
import {aktif, pop} from './common';
import type {Blok, Kepala} from './types';

export const KataDada: React.FC<{blok: Blok; kepala: Kepala; f: number}> = ({blok, kepala: k, f}) => {
  const kata = blok.kata.find((w) => aktif(w, f));
  if (!kata) return null;
  const y = (blok.bawahDecision ? 902 : k.atas + k.tinggi + 100 * k.z) + (blok.tata?.dy ?? 0) * k.z;
  return <div style={{position: 'absolute', left: k.cx + (blok.tata?.dx ?? 0) * k.z, top: y, transform: 'translate(-50%, -50%)'}}>
    <div style={{fontFamily: KT83.huruf, fontWeight: 700, fontSize: (blok.tata?.ukuran ?? KT83.ukuran) * k.z, lineHeight: 1.05,
      letterSpacing: '-0.02em', whiteSpace: 'nowrap', color: KT83.teks, textShadow: KT83.bayang,
      transform: `scale(${pop(f, kata.masuk)})`}}>{kata.teks}</div>
  </div>;
};
