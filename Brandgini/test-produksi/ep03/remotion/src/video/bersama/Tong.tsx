// Potongan melintang tong es puter DARI SAMPING (keputusan Irfan, ep03 v2). Ruang lokal 800x1000.
// Tong kayu berpita besi dipotong dua: dinding kayu kiri/kanan, dasar, campuran es-garam di sekeliling kaleng baja berisi santan krem.
import React from 'react';
import {C, rnd} from './Objek';

export const TS = 1.05;                                   // skala lokal -> dunia
export const P = (x: number, y: number) => ({x: (x - 400) * TS, y: (y - 500) * TS});
export const KALENG = {kiri: 310, kanan: 490, atas: 170, bawah: 800};   // sisi dalam kaleng (koordinat lokal)

const EsS: React.FC<{x: number; y: number; s: number; rot: number; melt: number}> = ({x, y, s, rot, melt}) => {
  const k = 1 - melt * 0.3; const h = (s / 2) * k; const r = 6 + melt * s * 0.3;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-h} y={-h} width={h * 2} height={h * 2} rx={r} fill={C.es} stroke={C.garisEs} strokeWidth={3.5} />
      <rect x={-h + 6} y={-h + 6} width={h * 2 - 12} height={h * 2 - 12} rx={Math.max(3, r - 5)} fill={C.esTerang} opacity={0.75} />
      <path d={`M${-h * 0.5} ${h * 0.5} L${h * 0.25} ${-h * 0.35}`} stroke={C.putih} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
};

export type TongProps = {garam?: number; melt?: number; beku?: number; putar?: number; kristal?: 'tak' | 'besar' | 'kecil'; kS?: number; pengerok?: number};

export const TongSamping: React.FC<TongProps> = ({garam = 0, melt = 0, beku = 0, putar = 0, kristal = 'tak', kS = 1, pengerok = -1}) => {
  const L = KALENG.kiri; const R = KALENG.kanan;
  const band = beku * 62;                                  // tebal kerak beku dari dinding dalam kaleng
  const cubes: {x: number; y: number; s: number; rot: number; d: number}[] = [];
  for (const [x0, x1, sisi] of [[150, 280, 0], [520, 650, 1]] as [number, number, number][]) {
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 3; c++) {
        const n = r * 3 + c + sisi * 40;
        const x = x0 + 22 + c * ((x1 - x0 - 44) / 2) + (rnd(n) - 0.5) * 14;
        const y = 232 + r * 54 + (rnd(n + 9) - 0.5) * 12;
        const dx = sisi === 0 ? Math.abs(x - L) : Math.abs(x - R);
        cubes.push({x, y, s: 52 + rnd(n + 3) * 8, rot: (rnd(n + 5) - 0.5) * 50, d: dx});
      }
    }
  }
  const grains = Array.from({length: 90}, (_, n) => ({x: 150 + rnd(n + 40) * 500, y: 212 + rnd(n + 50) * 650}))
    .filter((g) => g.x < L - 4 || g.x > R + 4);
  const shards = Array.from({length: 9}, (_, n) => ({y: 200 + n * 62 + (rnd(n) - 0.5) * 14, b: 40 + rnd(n + 3) * 26, l: 26 + rnd(n + 6) * 24}));
  const dots = Array.from({length: 44}, (_, n) => ({y: 190 + n * 14 + (rnd(n) - 0.5) * 6, r: 4 + rnd(n + 2) * 4, o: rnd(n + 7) * 8}));
  const crank = 120 * Math.abs(Math.cos((putar * Math.PI) / 180));
  return (
    <svg width={800 * TS} height={1000 * TS} viewBox="0 0 800 1000" style={{overflow: 'visible'}}>
      {/* sisi dalam belakang tong */}
      <rect x={144} y={130} width={512} height={744} fill={C.kayuGelap} />
      {/* campuran es-garam */}
      <rect x={144} y={205} width={512} height={669} fill={C.es} />
      <path d="M144 205 Q230 195 320 205 T500 205 T656 205" fill="none" stroke={C.garisEs} strokeWidth={4} />
      <rect x={144} y={874 - 70 * melt} width={512} height={70 * melt + 0.01} fill={C.esGelembung} opacity={0.85} />
      {cubes.map((c, n) => <EsS key={n} x={c.x} y={c.y} s={c.s} rot={c.rot} melt={Math.min(0.55, Math.max(0, melt * 1.5 - c.d / 400))} />)}
      {grains.slice(0, Math.round(garam * grains.length)).map((g, n) => <rect key={n} x={g.x} y={g.y} width={11} height={11} fill={C.putih} stroke={C.garamGaris} strokeWidth={2} transform={`rotate(${n * 37} ${g.x} ${g.y})`} />)}
      {/* kaleng baja */}
      <rect x={L - 20} y={110} width={20} height={KALENG.bawah - 100} fill={C.baja} stroke={C.garis} strokeWidth={4} />
      <rect x={R} y={110} width={20} height={KALENG.bawah - 100} fill={C.baja} stroke={C.garis} strokeWidth={4} />
      <rect x={L - 20} y={KALENG.bawah} width={R - L + 40} height={16} fill={C.bajaGelap} stroke={C.garis} strokeWidth={4} />
      <rect x={L} y={KALENG.atas} width={R - L} height={KALENG.bawah - KALENG.atas} fill={C.santan} />
      <rect x={L} y={KALENG.atas} width={R - L} height={10} fill={C.santanTepi} />
      {beku > 0 && (
        <g>
          <rect x={L} y={KALENG.atas} width={band} height={KALENG.bawah - KALENG.atas} fill={C.putih} />
          <rect x={R - band} y={KALENG.atas} width={band} height={KALENG.bawah - KALENG.atas} fill={C.putih} />
          <rect x={L} y={KALENG.bawah - band} width={R - L} height={band} fill={C.putih} />
          <rect x={L + band - 6} y={KALENG.atas} width={6} height={KALENG.bawah - KALENG.atas - band + 6} fill={C.esTerang} opacity={0.9} />
          <rect x={R - band} y={KALENG.atas} width={6} height={KALENG.bawah - KALENG.atas - band + 6} fill={C.esTerang} opacity={0.9} />
        </g>
      )}
      {kristal === 'besar' && shards.map((s, n) => {
        const l = s.l * kS; const ex = L + band;
        return (
          <g key={n}>
            <polygon points={`${ex},${s.y} ${ex + l},${s.y + s.b * 0.5} ${ex},${s.y + s.b}`} fill={C.es} stroke={C.garisEs} strokeWidth={4} strokeLinejoin="round" />
            <polygon points={`${R - band},${s.y + 30} ${R - band - l},${s.y + 30 + s.b * 0.5} ${R - band},${s.y + 30 + s.b}`} fill={C.es} stroke={C.garisEs} strokeWidth={4} strokeLinejoin="round" />
          </g>
        );
      })}
      {kristal === 'kecil' && dots.map((d, n) => (
        <g key={n}>
          <circle cx={L + band + d.r * 0.6 + d.o * 0.3} cy={d.y} r={d.r * kS} fill={C.esTerang} stroke={C.garisEs} strokeWidth={2} />
          <circle cx={R - band - d.r * 0.6 - d.o * 0.3} cy={d.y + 7} r={d.r * kS} fill={C.esTerang} stroke={C.garisEs} strokeWidth={2} />
        </g>
      ))}
      {pengerok >= 0 && (
        <g>
          <rect x={L + band + 8} y={pengerok - 10} width={22} height={200} rx={3} fill={C.baja} stroke={C.garis} strokeWidth={4} />
          <rect x={L + band + 15} y={20} width={9} height={pengerok - 20} fill={C.kayuGelap} stroke={C.kayuGaris} strokeWidth={3} />
          {[0, 1, 2, 3, 4].map((n) => <circle key={n} cx={L + band - 4 - n * 3} cy={pengerok + 190 + n * 26 + (n % 2) * 8} r={4 - n * 0.4} fill={C.esTerang} stroke={C.garisEs} strokeWidth={1.5} />)}
        </g>
      )}
      {/* tutup, tangkai, engkol */}
      <rect x={L - 30} y={82} width={R - L + 60} height={30} rx={6} fill={C.bajaTerang} stroke={C.garis} strokeWidth={4} />
      <rect x={394} y={34} width={12} height={50} fill={C.besi} stroke={C.garis} strokeWidth={3} />
      <rect x={400 - crank} y={20} width={crank * 2 + 0.01} height={16} rx={8} fill={C.kayuTerang} stroke={C.kayuGaris} strokeWidth={4} />
      {/* dinding tong terpotong */}
      <rect x={80} y={130} width={64} height={800} fill={C.kayu} stroke={C.kayuGaris} strokeWidth={6} />
      <rect x={656} y={130} width={64} height={800} fill={C.kayu} stroke={C.kayuGaris} strokeWidth={6} />
      <rect x={80} y={874} width={640} height={56} fill={C.kayu} stroke={C.kayuGaris} strokeWidth={6} />
      {[112, 128].map((x) => <line key={x} x1={x} y1={134} x2={x} y2={870} stroke={C.kayuGaris} strokeWidth={2.5} />)}
      {[672, 688].map((x) => <line key={x} x1={x} y1={134} x2={x} y2={870} stroke={C.kayuGaris} strokeWidth={2.5} />)}
      <rect x={80} y={130} width={64} height={12} fill={C.kayuTerang} /><rect x={656} y={130} width={64} height={12} fill={C.kayuTerang} />
      {[240, 520, 800].map((y) => (
        <g key={y}>
          <rect x={70} y={y} width={84} height={26} rx={4} fill={C.besi} stroke={C.garis} strokeWidth={4} />
          <rect x={646} y={y} width={84} height={26} rx={4} fill={C.besi} stroke={C.garis} strokeWidth={4} />
        </g>
      ))}
    </svg>
  );
};
