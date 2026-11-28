// Gang.tsx · pojok gang dari atas: jalan beraspal, sekolah, rumah beratap, dua minimarket generik (tanpa logo), mobil, pembeli. Warna wajar (ADDENDUM-3).
import React from 'react';
import { ASLI } from './bersama/warnaAsli';
import { kf, mv } from './waktu';
import { Orang } from './Orang';

const Rumah: React.FC<{ x: number; atap: string }> = ({ x, atap }) => (
  <g transform={`translate(${x} 640)`}>
    <ellipse cx={0} cy={4} rx={72} ry={9} fill={ASLI.tinta} fillOpacity={0.18} />
    <rect x={-48} y={-70} width={96} height={70} fill={ASLI.dinding} stroke={ASLI.kayuTua} strokeWidth={3} />
    <path d="M-62 -70 L0 -124 L62 -70 Z" fill={atap} />
    <rect x={-12} y={-38} width={24} height={38} fill={ASLI.pintu} />
    <rect x={20} y={-58} width={20} height={20} fill={ASLI.kaca} stroke={ASLI.kayuTua} strokeWidth={3} />
  </g>
);

const Mini: React.FC<{ x: number; dy: number; tenda: [string, string] }> = ({ x, dy, tenda }) => (
  <g transform={`translate(${x} ${1040 + dy})`}>
    <ellipse cx={0} cy={6} rx={104} ry={12} fill={ASLI.tinta} fillOpacity={0.2} />
    <rect x={-85} y={-130} width={170} height={130} fill={ASLI.dinding} stroke={ASLI.kayuTua} strokeWidth={3} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${-85 + i * 34} -130 L${-85 + i * 34 + 34} -130 L${-85 + i * 34 + 38} -92 L${-85 + i * 34 - 4} -92 Z`} fill={i % 2 ? tenda[1] : tenda[0]} />)}
    <rect x={-70} y={-82} width={40} height={40} fill={ASLI.kaca} stroke={ASLI.kayuTua} strokeWidth={3} />
    <rect x={30} y={-82} width={40} height={40} fill={ASLI.kaca} stroke={ASLI.kayuTua} strokeWidth={3} />
    <rect x={-22} y={-76} width={44} height={76} fill={ASLI.kaca} stroke={ASLI.kayuTua} strokeWidth={4} />
    <line x1={0} y1={-76} x2={0} y2={0} stroke={ASLI.kayuTua} strokeWidth={3} />
  </g>
);

const Cincin: React.FC<{ cx: number; cy: number; r: number; t: number; t0: number }> = ({ cx, cy, r, t, t0 }) => {
  if (t < t0) return null;
  const k = 0.9 + 0.1 * mv(t, t0, 0.3, 'land');
  return <circle cx={cx} cy={cy} r={r * k} fill={ASLI.kuning} fillOpacity={0.22} stroke={ASLI.oranye} strokeWidth={8} strokeDasharray="14 12" />;
};

export const Gang: React.FC<{ t: number }> = ({ t }) => {
  const m1 = kf(t, [[0, 330], [46.7, 330], [48.0, 454, 'heavy']]);
  const m2 = kf(t, [[0, 750], [46.7, 750], [48.0, 626, 'heavy']]);
  const drop1 = (1 - mv(t, 40.3, 0.4, 'land')) * -520;
  const drop2 = (1 - mv(t, 40.65, 0.4, 'land')) * -520;
  const jalan = mv(t, 49.85, 2.7, 'reveal');
  const orangX = kf(t, [[49.6, 985], [53.0, 900]]);
  return (
    <g>
      {t >= 42.7 && (
        <g>
          <clipPath id="klipJalan"><rect x={-400} y={700} width={2000 * mv(t, 42.7, 0.5, 'reveal')} height={240} /></clipPath>
          <g clipPath="url(#klipJalan)">
            <rect x={-400} y={705} width={2000} height={30} fill={ASLI.trotoar} />
            <rect x={-400} y={735} width={2000} height={170} fill={ASLI.aspal} />
            <rect x={-400} y={905} width={2000} height={30} fill={ASLI.trotoar} />
            <line x1={-400} y1={820} x2={1600} y2={820} stroke={ASLI.putih} strokeWidth={7} strokeDasharray="40 30" />
          </g>
        </g>
      )}
      {t >= 43.7 && (
        <g transform={`translate(110 ${440 + (1 - mv(t, 43.7, 0.4, 'land')) * 260})`}>
          <ellipse cx={130} cy={196} rx={150} ry={12} fill={ASLI.tinta} fillOpacity={0.18} />
          <rect width={260} height={190} fill={ASLI.sekolah} stroke={ASLI.kayuTua} strokeWidth={3} />
          <path d="M-14 0 L130 -52 L274 0 Z" fill={ASLI.atapMerah} />
          {[24, 188].map((x) => <rect key={x} x={x} y={44} width={48} height={48} fill={ASLI.kaca} stroke={ASLI.kayuTua} strokeWidth={3} />)}
          <rect x={104} y={96} width={52} height={94} fill={ASLI.pintu} />
          <line x1={130} y1={-52} x2={130} y2={-112} stroke={ASLI.kayuTua} strokeWidth={5} />
          <path d="M130 -112 L190 -94 L130 -76 Z" fill={ASLI.merah} />
        </g>
      )}
      {t >= 44.3 && [[620, ASLI.atapMerah], [770, ASLI.atapCokelat], [920, ASLI.atapMerah]].map(([x, atap], i) => (
        <g key={String(x)} transform={`translate(0 ${(1 - mv(t, 44.3 + i * 0.12, 0.4, 'land')) * 260})`}><Rumah x={x as number} atap={atap as string} /></g>
      ))}
      <Cincin cx={540} cy={820} r={120} t={t} t0={43.0} />
      <Cincin cx={240} cy={540} r={190} t={t} t0={43.9} />
      <Cincin cx={770} cy={560} r={230} t={t} t0={44.5} />
      {t >= 42.7 && [0, 1].map((i) => {
        const x = ((t * (i ? -150 : 130) + i * 520) % 1500 + 1500) % 1500 - 200;
        const y = i ? 860 : 780;
        const warna = i ? ASLI.mobilBiru : ASLI.mobilMerah;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cx={0} cy={26} rx={60} ry={8} fill={ASLI.tinta} fillOpacity={0.25} />
            <rect x={-56} y={-26} width={112} height={44} rx={12} fill={warna} />
            <rect x={-30} y={-48} width={62} height={30} rx={9} fill={warna} />
            <rect x={-22} y={-42} width={20} height={20} rx={4} fill={ASLI.kaca} /><rect x={4} y={-42} width={20} height={20} rx={4} fill={ASLI.kaca} />
            <circle cx={-32} cy={20} r={12} fill={ASLI.roda} /><circle cx={32} cy={20} r={12} fill={ASLI.roda} />
          </g>
        );
      })}
      {t >= 40.3 && <Mini x={m1} dy={drop1} tenda={[ASLI.teal, ASLI.putih]} />}
      {t >= 40.65 && <Mini x={m2} dy={drop2} tenda={[ASLI.oranye, ASLI.putih]} />}
      {t >= 49.6 && (
        <g>
          <line x1={orangX - 10} y1={1118} x2={orangX - 10 - (orangX - 720) * jalan} y2={1118} stroke={ASLI.oranye} strokeWidth={8} strokeDasharray="4 18" strokeLinecap="round" />
          <line x1={720} y1={1100} x2={720} y2={1136} stroke={ASLI.kayuTua} strokeWidth={6} strokeLinecap="round" />
          <Orang x={orangX} y={1130} langkah={t * 7} kaos={ASLI.mobilBiru} />
        </g>
      )}
    </g>
  );
};
