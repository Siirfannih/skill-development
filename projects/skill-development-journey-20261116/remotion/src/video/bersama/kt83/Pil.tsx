import React from 'react';
import {KT83} from '../tema';
import {aktif, lebarKata, pop} from './common';
import type {Blok, Kepala} from './types';

export const Pil: React.FC<{blok: Blok; kepala: Kepala; f: number}> = ({blok, kepala: k, f}) => {
  const current = blok.kata.findIndex((w) => aktif(w, f));
  if (current < 0) return null;
  const on = blok.kata[0].masuk;
  const size = (blok.tata?.ukuran ?? KT83.ukuranPil) * k.z;
  const fullWidth = lebarKata(blok.kata.map((w) => w.teks).join(' '), size, 800) + 48;
  return <div style={{position: 'absolute', left: k.cx - fullWidth / 2 + (blok.tata?.dx ?? 0) * k.z,
    top: k.atas + k.tinggi + (100 + (blok.tata?.dy ?? 0)) * k.z,
    transform: `translateY(-50%) rotate(-4deg) scale(${pop(f, on)})`, transformOrigin: '0 50%', borderRadius: KT83.radiusPil,
    background: KT83.biru, padding: '8px 24px', color: KT83.teks, boxShadow: KT83.bayangTag,
    fontFamily: KT83.huruf, fontSize: size, fontWeight: 800, lineHeight: 1.1,
    letterSpacing: '-0.025em', whiteSpace: 'nowrap'}}>
    {blok.kata.slice(0, current + 1).map((w, i) => <span key={i}>{i ? ' ' : ''}{w.teks}</span>)}
  </div>;
};
