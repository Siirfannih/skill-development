// LayerBG.tsx · LAYER 1 (paling bawah), v3: latar STATIS penuh frame, kamera sendiri dengan parallax paling lambat (k = 0,25).
// Pantai = POV samping: langit, awan, cakrawala, laut (ombak halus boleh), buih, pasir basah, pasir kering. Gang = peta dari atas (rumput, petak, pohon).
// Tidak ada awan/camar/pohon yang bergerak (ADDENDUM-4 butir 3). Warna benda wajar (warnaAsli.ts).
import React from 'react';
import { BAYANGAN } from './bersama/tema';
import { ASLI } from './bersama/warnaAsli';
import { kam, tfLayer, adaGang, G } from './kamera';

const Awan: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`} style={{ filter: `drop-shadow(${BAYANGAN.cutout})` }}>
    <rect x={-120} y={-30} width={240} height={60} rx={30} fill={ASLI.putih} />
    <circle cx={-40} cy={-40} r={46} fill={ASLI.putih} />
    <circle cx={30} cy={-52} r={58} fill={ASLI.putih} />
  </g>
);

const Pantai: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <rect x={-2400} y={-1400} width={6400} height={2100} fill={ASLI.langit} />
    {[[200, -60, 1.5], [900, -240, 1.2], [1500, 40, 1.7], [2200, -180, 1.3], [-300, 120, 1.4]].map(([x, y, k], i) => <Awan key={i} x={x} y={y} k={k} />)}
    {/* laut: cakrawala di y=560, laut sampai garis buih y=905 */}
    <rect x={-2400} y={560} width={6400} height={345} fill={ASLI.laut} />
    <rect x={-2400} y={560} width={6400} height={70} fill={ASLI.lautTua} />
    <rect x={-2400} y={556} width={6400} height={6} fill={ASLI.putih} fillOpacity={0.7} />
    {/* perahu layar jauh, diam di cakrawala */}
    <g transform="translate(1900 556)"><path d="M-40 0 L40 0 L28 16 L-28 16 Z" fill={ASLI.kayuTua} /><path d="M0 -4 L0 -70 L34 -8 Z" fill={ASLI.putih} /><path d="M-4 -4 L-4 -52 L-30 -8 Z" fill={ASLI.krem} /></g>
    {/* ombak halus: gerak sangat pelan, amplitudo kecil */}
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} transform={`translate(${Math.sin(t * 0.35 + i) * 14 - 300} ${650 + i * 46})`} d={`M${-600 + i * 60} 0 ${'q40 -9 80 0 t80 0 '.repeat(40)}`} fill="none" stroke={ASLI.putih} strokeOpacity={0.55} strokeWidth={4} strokeLinecap="round" />
    ))}
    {/* buih, pasir basah, pasir kering */}
    <rect x={-2400} y={896} width={6400} height={20} fill={ASLI.putih} />
    <rect x={-2400} y={916} width={6400} height={62} fill={ASLI.pasirBasah} />
    <rect x={-2400} y={978} width={6400} height={3000} fill={ASLI.pasir} />
    <rect x={-2400} y={978} width={6400} height={8} fill={ASLI.pasirTua} fillOpacity={0.6} />
  </g>
);

const Kota: React.FC = () => (
  <g>
    <rect x={-800} y={-600} width={3000} height={3400} fill={ASLI.rumput} />
    {[[-300, 250, 520, 320], [330, 150, 380, 330], [760, 200, 560, 300], [-300, 640, 480, 240], [1060, 600, 420, 260], [-300, 1180, 620, 360], [420, 1250, 440, 420], [940, 1180, 500, 380], [-300, 1620, 700, 300], [560, 1650, 700, 300]].map(([x, y, w, h], i) => (
      <rect key={i} x={x} y={y} width={w} height={h} rx={30} fill={i % 2 ? ASLI.rumputTua : ASLI.trotoar} fillOpacity={0.55} />
    ))}
    {[[150, 1330], [660, 1500], [1180, 1380], [200, 880], [1250, 900], [840, 480]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        <ellipse cx={8} cy={60} rx={60} ry={14} fill={ASLI.tinta} fillOpacity={0.15} />
        <rect x={-8} y={10} width={16} height={50} fill={ASLI.batang} /><circle cx={0} cy={-8} r={54 + (i % 3) * 12} fill={ASLI.pohon} />
      </g>
    ))}
  </g>
);

export const LayerBG: React.FC<{ t: number }> = ({ t }) => {
  const gang = adaGang(t);
  const L = tfLayer(kam(t), 0.25, gang);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, background: gang ? ASLI.rumput : ASLI.pasir }}>
      <g transform={L.str}>{gang ? <Kota /> : <Pantai t={t} />}</g>
    </svg>
  );
};
export const _G = G;
