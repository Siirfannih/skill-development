import React from 'react';
import {FONT, HERO} from '../tema';
import {useFitSize} from '../fit';
import type {Blok} from './types';

export const Slab: React.FC<{blok: Blok; f: number}> = ({blok, f}) => {
  const s = blok.slab!;
  const size = useFitSize(s.teks, FONT.anton, 400, s.w, 0);
  const end = blok.kata[blok.kata.length - 1].akhir;
  const blur = s.fokus.some(([a, b]) => f >= a && f < b) ? 3 : 0;
  if (f < 0 || f >= end) return null;
  return <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    <g transform={`translate(${s.x + s.w / 2},${s.y + size * 0.66}) rotate(-2) scale(${1 + 0.024 * f / Math.max(1, end - 1)})`}
      style={{filter: blur ? `blur(${blur}px)` : undefined}}>
      <text x={-s.w / 2} y={size * 0.32} fontFamily={FONT.anton} fontSize={size} fill={HERO}
        style={{textShadow: '0 12px 22px rgba(0,0,0,.28)'}}>{s.teks}</text>
    </g>
  </svg>;
};
