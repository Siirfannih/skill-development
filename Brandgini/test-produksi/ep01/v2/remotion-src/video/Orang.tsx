// Orang.tsx · pembeli: kepala warna kulit, kaos berwarna, celana, langkah bergantian (digambar dengan kode).
import React from 'react';
import { ASLI } from './bersama/warnaAsli';

export const Orang: React.FC<{ x: number; y: number; langkah: number; skala?: number; kaos?: string }> = ({ x, y, langkah, skala = 1, kaos = ASLI.kaosAbu }) => {
  const s = Math.sin(langkah);
  return (
    <g transform={`translate(${x} ${y}) scale(${skala})`} strokeLinecap="round">
      <ellipse cx={0} cy={2} rx={26} ry={6} fill={ASLI.tinta} fillOpacity={0.18} />
      <g stroke={ASLI.celana} strokeWidth={13}><line x1={-6} y1={-34} x2={-6 - 14 * s} y2={-2} /><line x1={6} y1={-34} x2={6 + 14 * s} y2={-2} /></g>
      <g stroke={kaos} strokeWidth={11}><line x1={-18} y1={-72} x2={-18 + 14 * s} y2={-44} /><line x1={18} y1={-72} x2={18 - 14 * s} y2={-44} /></g>
      <rect x={-20} y={-84} width={40} height={54} rx={14} fill={kaos} />
      <circle cx={0} cy={-102} r={17} fill={ASLI.kulit} />
      <path d="M-17 -105 Q0 -128 17 -105 Q4 -112 -17 -105 Z" fill={ASLI.rambut} />
    </g>
  );
};
