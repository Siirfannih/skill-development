// LayerBG.tsx · LAYER 1 (paling bawah): latar penuh frame 1080x1920, kamera sendiri dengan parallax paling lambat (k = 0,25).
// Pantai: langit + awan, laut (isi bidang), buih, pasir. Gang: petak kota. Semua warna dari tema.ts (K-04), tanpa gradien/foto.
import React from 'react';
import { NETRAL, BAYANGAN } from './bersama/tema';
import { ASLI } from './bersama/warnaAsli';
import { kam, tfLayer, adaGang } from './kamera';

const Jaring: React.FC = () => (
  <g>
    {Array.from({ length: 42 }).map((_, i) => <line key={`v${i}`} x1={-800 + i * 60} y1={-600} x2={-800 + i * 60} y2={2800} stroke={NETRAL.tinta} strokeOpacity={0.06} strokeWidth={2} />)}
    {Array.from({ length: 58 }).map((_, i) => <line key={`h${i}`} x1={-800} y1={-600 + i * 60} x2={2200} y2={-600 + i * 60} stroke={NETRAL.tinta} strokeOpacity={0.06} strokeWidth={2} />)}
  </g>
);

const Awan: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`} style={{ filter: `drop-shadow(${BAYANGAN.cutout})` }}>
    <rect x={-120} y={-30} width={240} height={60} rx={30} fill={NETRAL.putih} />
    <circle cx={-40} cy={-40} r={46} fill={NETRAL.putih} />
    <circle cx={30} cy={-52} r={58} fill={NETRAL.putih} />
  </g>
);

const Pantai: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Jaring />
    {/* laut: isi bidang */}
    <rect x={-800} y={330} width={3000} height={490} fill={ASLI.laut} />
    <rect x={-800} y={330} width={3000} height={12} fill={ASLI.lautTua} />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} transform={`translate(${((t * (10 + i * 4)) % 160) - 160} ${420 + i * 82})`} d={`M${-400 + i * 70} 0 ${'q40 -24 80 0 t80 0 '.repeat(24)}`} fill="none" stroke={ASLI.putih} strokeOpacity={0.8} strokeWidth={6} strokeLinecap="round" />
    ))}
    {/* buih dan pasir */}
    <rect x={-800} y={790} width={3000} height={32} fill={NETRAL.putih} fillOpacity={0.95} />
    <rect x={-800} y={822} width={3000} height={2200} fill={ASLI.pasir} />
    <rect x={-800} y={822} width={3000} height={16} fill={ASLI.pasirBasah} />
    {/* awan bergeser pelan + camar */}
    {[0, 1, 2].map((i) => <Awan key={i} x={((-200 + i * 620 + t * (6 + i * 3)) % 1900) - 300} y={90 + i * 96} k={1.1 + (i % 2) * 0.5} />)}
    {[0, 1].map((i) => {
      const x = ((t * (46 + i * 18) + i * 700) % 1900) - 300; const y = 250 + i * 70 + Math.sin(t * 2 + i) * 14;
      return <path key={i} transform={`translate(${x} ${y})`} d="M-34 0 Q-17 -22 0 0 Q17 -22 34 0" fill="none" stroke={ASLI.camar} strokeWidth={7} strokeLinecap="round" />;
    })}
  </g>
);

const Kota: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <rect x={-800} y={-600} width={3000} height={3400} fill={ASLI.rumput} />
    {[[-300, 250, 520, 320], [330, 150, 380, 330], [760, 200, 560, 300], [-300, 640, 480, 240], [1060, 600, 420, 260], [-300, 1180, 620, 360], [420, 1250, 440, 420], [940, 1180, 500, 380], [-300, 1620, 700, 300], [560, 1650, 700, 300]].map(([x, y, w, h], i) => (
      <rect key={i} x={x} y={y} width={w} height={h} rx={30} fill={i % 2 ? ASLI.rumputTua : ASLI.trotoar} fillOpacity={0.55} />
    ))}
    {[[150, 1330], [660, 1500], [1180, 1380], [200, 880], [1250, 900], [840, 480]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y + Math.sin(t * 0.8 + i) * 4})`}>
        <ellipse cx={8} cy={60} rx={60} ry={14} fill={ASLI.tinta} fillOpacity={0.15} />
        <rect x={-8} y={10} width={16} height={50} fill={ASLI.batang} /><circle cx={0} cy={-8} r={54 + (i % 3) * 12} fill={ASLI.pohon} />
      </g>
    ))}
  </g>
);

export const LayerBG: React.FC<{ t: number }> = ({ t }) => {
  const L = tfLayer(kam(t), 0.25);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, background: ASLI.langit }}>
      <g transform={L.str}>{adaGang(t) ? <Kota t={t} /> : <Pantai t={t} />}</g>
    </svg>
  );
};
