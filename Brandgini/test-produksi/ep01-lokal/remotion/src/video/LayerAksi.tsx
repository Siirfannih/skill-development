// LayerAksi.tsx · LAYER 2 (tengah), v3: dunia yang bertahan (pantai POV samping; pojok gang dari atas). Hanya yang wajar bergerak yang bergerak.
// Dekor depan (k = 1,35): isi pasir bawah dengan benda diam (jejak kaki, kerang, batu, kayu apung, handuk, sandal, istana pasir, bola) = kedalaman.
import React from 'react';
import { ASLI } from './bersama/warnaAsli';
import { Dunia } from './Dunia';
import { Gang } from './Gang';
import { kam, tfLayer, adaGang, G } from './kamera';

const Jejak: React.FC<{ x: number; y: number; n: number }> = ({ x, y, n }) => (
  <g>{Array.from({ length: n }).map((_, i) => <ellipse key={i} cx={x + i * 70} cy={y + (i % 2 ? 16 : -16)} rx={12} ry={22} fill={ASLI.pasirTua} fillOpacity={0.55} transform={`rotate(${i % 2 ? 12 : -8} ${x + i * 70} ${y})`} />)}</g>
);
const Kerang: React.FC<{ x: number; y: number; k?: number }> = ({ x, y, k = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}><path d="M-22 6 Q0 -34 22 6 Z" fill={ASLI.krem} stroke={ASLI.pasirTua} strokeWidth={3} /><path d="M-12 4 L0 -18 L12 4 M0 4 L0 -22" stroke={ASLI.pasirTua} strokeWidth={2} fill="none" /></g>
);
const Batu: React.FC<{ x: number; y: number; k?: number }> = ({ x, y, k = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}><ellipse cx={0} cy={8} rx={48} ry={9} fill={ASLI.tinta} fillOpacity={0.18} /><path d="M-44 6 Q-40 -34 -4 -36 Q40 -34 44 6 Z" fill={ASLI.roda} /><path d="M-30 -8 Q-20 -30 0 -30 Q-18 -22 -26 -8 Z" fill={ASLI.rodaTepi} fillOpacity={0.5} /></g>
);

const DepanPantai: React.FC = () => (
  <g>
    <Jejak x={120} y={G + 190} n={9} /><Jejak x={1500} y={G + 260} n={11} /><Jejak x={2400} y={G + 170} n={6} />
    <Kerang x={300} y={G + 300} /><Kerang x={780} y={G + 240} k={1.2} /><Kerang x={1820} y={G + 330} /><Kerang x={2550} y={G + 280} k={1.3} />
    <Batu x={600} y={G + 380} /><Batu x={1250} y={G + 330} k={1.3} /><Batu x={2100} y={G + 420} k={0.9} />
    {/* kayu apung */}
    <g transform={`translate(980 ${G + 470})`}><ellipse cx={0} cy={20} rx={130} ry={12} fill={ASLI.tinta} fillOpacity={0.18} /><rect x={-120} y={-14} width={240} height={32} rx={14} fill={ASLI.kayu} stroke={ASLI.kayuTua} strokeWidth={4} /><circle cx={-120} cy={2} r={14} fill={ASLI.krem} stroke={ASLI.kayuTua} strokeWidth={3} /></g>
    {/* handuk pantai + sandal */}
    <g transform={`translate(1700 ${G + 520})`}><ellipse cx={4} cy={44} rx={190} ry={14} fill={ASLI.tinta} fillOpacity={0.16} /><rect x={-170} y={-34} width={340} height={76} rx={6} fill={ASLI.merah} /><rect x={-170} y={-12} width={340} height={16} fill={ASLI.putih} /><rect x={-170} y={14} width={340} height={16} fill={ASLI.putih} /></g>
    <g transform={`translate(1990 ${G + 560})`}><ellipse cx={0} cy={14} rx={46} ry={8} fill={ASLI.tinta} fillOpacity={0.16} /><path d="M-40 6 Q-44 -14 -20 -16 L30 -10 Q44 0 34 12 Z" fill={ASLI.oranye} /></g>
    {/* istana pasir kecil */}
    <g transform={`translate(380 ${G + 560})`}><ellipse cx={0} cy={22} rx={100} ry={12} fill={ASLI.tinta} fillOpacity={0.16} /><rect x={-70} y={-40} width={140} height={64} fill={ASLI.pasirTua} /><rect x={-70} y={-62} width={30} height={26} fill={ASLI.pasirTua} /><rect x={-15} y={-62} width={30} height={26} fill={ASLI.pasirTua} /><rect x={40} y={-62} width={30} height={26} fill={ASLI.pasirTua} /><path d="M0 -62 L0 -110 L34 -98 L0 -86" fill={ASLI.merah} /></g>
    {/* bola pantai */}
    <g transform={`translate(2300 ${G + 460})`}><ellipse cx={0} cy={44} rx={50} ry={9} fill={ASLI.tinta} fillOpacity={0.18} /><circle r={44} fill={ASLI.putih} /><path d="M0 -44 A44 44 0 0 1 38 -22 L0 0 Z" fill={ASLI.merah} /><path d="M0 44 A44 44 0 0 1 -38 22 L0 0 Z" fill={ASLI.kuning} /><path d="M-38 -22 A44 44 0 0 1 0 -44 L0 0 Z" fill={ASLI.teal} /></g>
    {/* rumput pantai */}
    {[200, 1100, 1950, 2650].map((x) => <g key={x} transform={`translate(${x} ${G + 620})`}>{[-18, -6, 8, 20].map((d, i) => <path key={i} d={`M${d} 0 Q${d + (i % 2 ? 14 : -14)} -40 ${d + (i % 2 ? 26 : -26)} -72`} stroke={ASLI.pohon} strokeWidth={7} fill="none" strokeLinecap="round" />)}</g>)}
  </g>
);
const DepanGang: React.FC = () => (
  <g>{[[-260, 1500, 150], [1300, 1480, 190], [-120, 330, 120], [1240, 300, 140]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={ASLI.rumputTua} fillOpacity={0.7} />)}</g>
);

export const LayerAksi: React.FC<{ t: number; f: number }> = ({ t, f }) => {
  const c = kam(t);
  const gang = adaGang(t);
  const W = tfLayer(c, 1, gang), D = tfLayer(c, 1.35, gang);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
      <g transform={W.str}>{gang ? <Gang t={t} /> : <Dunia t={t} f={f} />}</g>
      <g transform={D.str}>{gang ? <DepanGang /> : <DepanPantai />}</g>
    </svg>
  );
};
