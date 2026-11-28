// LayerAksi.tsx · LAYER 2 (tengah): dunia yang bertahan (pantai, lalu pojok gang), benda dan karakter yang bergerak memerankan VO.
// Kamera sendiri k = 1; dekor depan memakai k = 1,35 (bergeser lebih cepat = kedalaman).
import React from 'react';
import { ASLI } from './bersama/warnaAsli';
import { Dunia } from './Dunia';
import { Gang } from './Gang';
import { kam, tfLayer, adaGang } from './kamera';

const Depan: React.FC<{ gang: boolean }> = ({ gang }) => (
  <g>
    {gang
      ? [[-260, 1500, 150], [1300, 1480, 190], [-120, 330, 120], [1240, 300, 140]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={ASLI.rumputTua} fillOpacity={0.7} />)
      : [[-120, 1330, 170, 46], [320, 1420, 120, 30], [900, 1360, 200, 52], [1250, 1450, 140, 34]].map(([x, y, rx, ry], i) => (
          <g key={i}><ellipse cx={x} cy={y} rx={rx} ry={ry} fill={ASLI.pasirTua} fillOpacity={0.55} /><ellipse cx={x - rx * 0.2} cy={y - ry * 0.35} rx={rx * 0.5} ry={ry * 0.4} fill={ASLI.krem} fillOpacity={0.6} /></g>
        ))}
  </g>
);

export const LayerAksi: React.FC<{ t: number; f: number }> = ({ t, f }) => {
  const c = kam(t);
  const gang = adaGang(t);
  const W = tfLayer(c, 1), D = tfLayer(c, 1.35);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
      <g transform={W.str}>{gang ? <Gang t={t} /> : <Dunia t={t} f={f} />}</g>
      <g transform={D.str}><Depan gang={gang} /></g>
    </svg>
  );
};
