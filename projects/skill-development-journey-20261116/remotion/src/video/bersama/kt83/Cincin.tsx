import React from 'react';
import {KT83} from '../tema';
import {aktif, lebarKata} from './common';
import type {Blok, Kepala} from './types';

export const Cincin: React.FC<{blok: Blok; kepala: Kepala; f: number}> = ({blok, kepala: k, f}) => {
  if (!blok.kata.some((w) => aktif(w, f))) return null;
  const size = (blok.tata?.ukuran ?? KT83.ukuran) * k.z;
  const cx = k.cx + (blok.tata?.dx ?? 0) * k.z;
  const id = `cincin-${blok.id}`;
  const widths = blok.kata.map((w) => lebarKata(w.teks, size));
  const gap = size * 0.34;
  const total = widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
  const headRx = k.lebar * 0.91;
  const headRy = k.tinggi * 0.68;
  const headArc = Math.PI * (3 * (headRx + headRy) - Math.sqrt((3 * headRx + headRy) * (headRx + 3 * headRy))) / 2;
  const scale = Math.max(blok.tata?.radius ?? 1, total / (headArc * 0.84));
  const rx = headRx * scale;
  const ry = headRy * scale;
  const cy = Math.max(k.atas + ry + 6 * k.z, ry + 54 + size * 0.82 + 12) + (blok.tata?.dy ?? 0) * k.z;
  const d = `M${cx - rx},${cy} A${rx},${ry} 0 0 1 ${cx + rx},${cy}`;
  const arcLength = headArc * scale;
  const turn = -4 + (f - blok.kata[0].masuk) * 0.055;
  let offset = -total / 2;
  return <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    <defs><path id={id} d={d}/></defs>
    <g transform={`rotate(${turn},${cx},${cy})`}>
      {blok.kata.map((w, i) => {
        const center = offset + widths[i] / 2;
        offset += widths[i] + gap;
        if (f < w.masuk) return null;
        return <text key={i} fill={KT83.teks} stroke={KT83.encreCincin} strokeWidth={KT83.traitCincin}
          paintOrder="stroke" fontFamily={KT83.huruf} fontSize={size} fontWeight={700}
          letterSpacing={-size * 0.02} style={{filter: KT83.bayangCincin}}>
          <textPath href={`#${id}`} startOffset={`${50 + center / arcLength * 100}%`} textAnchor="middle">{w.teks}</textPath>
        </text>;
      })}
    </g>
  </svg>;
};
