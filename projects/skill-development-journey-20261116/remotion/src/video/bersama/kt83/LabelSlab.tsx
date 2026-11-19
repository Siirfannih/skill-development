import React from 'react';
import {KT83} from '../tema';
import {pop} from './common';
import type {Blok} from './types';

export const LabelSlab: React.FC<{blok: Blok; f: number}> = ({blok, f}) => {
  const l = blok.label;
  const words = blok.kata.filter((w) => f >= w.masuk);
  if (!l || !words.length) return null;
  const out = Math.min(1, Math.max(0, (f - l.keluar + 1) / 5));
  return <div style={{position: 'absolute', left: l.x, top: l.y, width: l.w, height: l.h,
    display: 'flex', alignItems: 'center', clipPath: `inset(-300px 0 -300px ${out * 100}%)`}}>
    <div style={{paddingLeft: 70, fontFamily: KT83.huruf, fontWeight: 700, fontSize: 52,
      lineHeight: 1.15, letterSpacing: '-0.02em', whiteSpace: 'pre', color: KT83.teks, textShadow: KT83.bayang}}>
      {words.map((w, i) => <span key={i} style={{display: 'inline-block', transform: `scale(${pop(f, w.masuk)})`}}>{i ? ' ' : ''}{w.teks}</span>)}
    </div>
  </div>;
};
