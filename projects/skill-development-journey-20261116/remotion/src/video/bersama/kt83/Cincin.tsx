import React from 'react';
import {KT83} from '../tema';
import {aktif, lebarKata} from './common';
import {gelombang, hurufKata} from './gelombang';
import type {Blok, Kepala} from './types';

export const Cincin: React.FC<{blok: Blok; kepala: Kepala; f: number}> = ({blok, kepala: k, f}) => {
  if (f < (blok.tampilMulai ?? 0)) return null;
  if (!blok.kata.some((w) => aktif(w, f))) return null;
  const size = (blok.tata?.ukuran ?? KT83.ukuran) * k.z;
  const cap = size * 0.71;
  const cx = k.cx;
  const rx = Math.min(k.lebar * 1.55, cx - 96 - cap - 12, 1824 - cx - cap - 12);
  const top = Math.max(k.atas + cap * 0.55, 54 + cap + 8);
  const ry = Math.min(k.tinggi * 1.55, 1026 - top - size * 0.4);
  const cy = top + ry;
  const points = Array.from({length: 241}, (_, i) => {
    const a = -Math.PI + i / 240 * Math.PI;
    return {a, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), s: 0};
  });
  points.forEach((p, i) => {if (i) p.s = points[i - 1].s + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y);});
  const length = points[points.length - 1].s;
  const widths = blok.kata.map((w) => lebarKata(w.teks, size));
  const gap = size * 0.34;
  const total = widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
  const end = blok.kata[blok.kata.length - 1].akhir;
  const sample = (s: number) => {
    const next = points.findIndex((p) => p.s >= s);
    const i = Math.max(1, next < 0 ? points.length - 1 : next);
    const a = points[i - 1], b = points[i];
    const q = Math.max(0, Math.min(1, (s - a.s) / (b.s - a.s)));
    const angle = a.a + (b.a - a.a) * q;
    const tangent = Math.atan2(ry * Math.cos(angle), -rx * Math.sin(angle));
    return {x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle), tangent};
  };
  let offset = (length - total) / 2;
  return <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
    <defs><clipPath id={`safe-${blok.id}`}><rect x={96} y={54} width={1728} height={972}/></clipPath></defs>
    <g clipPath={`url(#safe-${blok.id})`}>
      {blok.kata.map((word, w) => {
        const start = offset;
        offset += widths[w] + gap;
        if (f < word.masuk) return null;
        const letters = hurufKata(word.teks, size);
        return <g key={w} fill={KT83.teks} stroke={KT83.encreCincin} strokeWidth={KT83.traitCincin}
          paintOrder="stroke" fontFamily={KT83.huruf} fontSize={size} fontWeight={700}
          style={{filter: KT83.bayangCincin}}>
          {letters.map((letter, i) => {
            const wave = gelombang(f - word.masuk, i, letters.length, end - word.masuk, cap);
            if (!wave.terlihat) return null;
            const s = start + widths[w] / 2 + (letter.pusat - widths[w] / 2) * wave.renggang;
            if (s < 0 || s > length) return null;
            const p = sample(s);
            const id = `ring-${blok.id}-${w}-${i}`;
            return <g key={i} transform={`translate(${p.x},${p.y}) rotate(${p.tangent * 180 / Math.PI})`}>
              <defs><filter id={id} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation={`0 ${wave.blur}`}/>
              </filter></defs>
              <text x={-letter.lebar / 2} y={wave.turun} filter={wave.blur > 0 ? `url(#${id})` : undefined}>{letter.huruf}</text>
            </g>;
          })}
        </g>;
      })}
    </g>
  </svg>;
};
