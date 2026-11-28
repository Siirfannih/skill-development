// Kartu.tsx · kartu "Hotelling · 1929": ilustrasi siluet datar (bukan foto), teks diketik per huruf (kartu 95 A3).
import React from 'react';
import { MEREK, NETRAL, TURUNAN, HURUF, BAYANGAN, RADIUS, TEKS } from './bersama/tema';
import { kf, mv } from './waktu';

export const Kartu: React.FC<{ t: number }> = ({ t }) => {
  const t0 = 35.75;
  if (t < t0 || t > 40.2) return null;
  const y = kf(t, [[t0, -640], [t0 + 0.5, 0, 'land']]);
  const rot = kf(t, [[t0, -5], [t0 + 0.5, -2.5, 'land'], [40.0, -2.5]]);
  const out = t >= 39.8 ? mv(t, 39.8, 0.3, 'leave') : 0;
  const huruf = (s: string, mulai: number) => s.slice(0, Math.max(0, Math.min(s.length, Math.floor((t - mulai) * 30))));
  return (
    <g transform={`translate(540 ${520 + y + out * -700}) rotate(${rot})`}>
      <rect x={-340} y={-230} width={680} height={460} rx={RADIUS.polaroid} fill={NETRAL.kertas} style={{ filter: `drop-shadow(${BAYANGAN.kertas})` }} />
      <circle cx={-150} cy={-20} r={104} fill={NETRAL.tinta} />
      <circle cx={-150} cy={-62} r={38} fill={NETRAL.putih} />
      <path d="M-232 70 Q-150 -4 -68 70 L-68 90 L-232 90 Z" fill={NETRAL.putih} />
      <text x={-20} y={-6} fontFamily={HURUF.keluarga.judul} fontWeight={HURUF.bobot.kunci} fontSize={HURUF.ukuran.kunci - 24} fill={NETRAL.tinta}>{huruf('Hotelling', 36.2)}</text>
      <text x={-20} y={96} fontFamily={HURUF.keluarga.judul} fontWeight={HURUF.bobot.kunci} fontSize={HURUF.ukuran.hero} fill={TURUNAN.primer.tekan}>{huruf('1929', 38.4)}</text>
      <rect x={-340} y={196} width={680} height={14} fill={MEREK.primer} />
    </g>
  );
};
export const TEKS_REF = TEKS;
