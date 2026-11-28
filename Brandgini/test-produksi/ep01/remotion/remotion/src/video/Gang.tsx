// Gang.tsx · pojok Gang Soalnya Gini: peta datar dari atas. Titik ramai (jalan besar, sekolah, perumahan) menyala; dua minimarket generik (tanpa logo).
import React from 'react';
import { MEREK, NETRAL } from './bersama/tema';
import { kf, mv } from './waktu';

const Rumah: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} 640)`}>
    <rect x={-48} y={-70} width={96} height={70} fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth={6} />
    <path d="M-62 -70 L0 -122 L62 -70 Z" fill={NETRAL.tinta} />
    <rect x={-12} y={-38} width={24} height={38} fill={NETRAL.tinta} />
  </g>
);
const Mini: React.FC<{ x: number; dy: number }> = ({ x, dy }) => (
  <g transform={`translate(${x} ${1040 + dy})`}>
    <rect x={-85} y={-130} width={170} height={130} fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth={6} />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={-85 + i * 34} y={-130} width={34} height={36} fill={i % 2 ? NETRAL.putih : NETRAL.tinta} stroke={NETRAL.tinta} strokeWidth={6} />
    ))}
    <rect x={-22} y={-70} width={44} height={70} fill={MEREK.latar} stroke={NETRAL.tinta} strokeWidth={5} />
    <rect x={-70} y={-78} width={36} height={34} fill={MEREK.latar} stroke={NETRAL.tinta} strokeWidth={5} />
    <rect x={34} y={-78} width={36} height={34} fill={MEREK.latar} stroke={NETRAL.tinta} strokeWidth={5} />
  </g>
);
const Cincin: React.FC<{ cx: number; cy: number; r: number; t: number; t0: number }> = ({ cx, cy, r, t, t0 }) => {
  if (t < t0) return null;
  const k = 0.9 + 0.1 * mv(t, t0, 0.3, 'land');
  return <circle cx={cx} cy={cy} r={r * k} fill={MEREK.primer} fillOpacity={0.2} stroke={MEREK.primer} strokeWidth={8} strokeDasharray="14 12" />;
};
const Orang: React.FC<{ x: number; y: number; langkah: number }> = ({ x, y, langkah }) => {
  const s = Math.sin(langkah);
  return (
    <g transform={`translate(${x} ${y})`} stroke={NETRAL.tinta} strokeWidth={8} strokeLinecap="round" fill="none">
      <circle cx={0} cy={-92} r={17} fill={NETRAL.tinta} />
      <line x1={0} y1={-72} x2={0} y2={-26} />
      <line x1={0} y1={-26} x2={-18 * s} y2={0} />
      <line x1={0} y1={-26} x2={18 * s} y2={0} />
      <line x1={0} y1={-62} x2={22 * s} y2={-38} />
      <line x1={0} y1={-62} x2={-22 * s} y2={-38} />
    </g>
  );
};

export const Gang: React.FC<{ t: number }> = ({ t }) => {
  const m1 = kf(t, [[0, 190], [46.7, 190], [48.0, 454, 'heavy']]);
  const m2 = kf(t, [[0, 890], [46.7, 890], [48.0, 626, 'heavy']]);
  const drop1 = (1 - mv(t, 40.3, 0.4, 'land')) * -520;
  const drop2 = (1 - mv(t, 40.65, 0.4, 'land')) * -520;
  const jalan = mv(t, 49.85, 2.7, 'reveal');
  const orangX = kf(t, [[49.6, 985], [53.0, 900]]);
  return (
    <g>
      {t >= 42.7 && (
        <g>
          <clipPath id="klipJalan"><rect x={-40} y={730} width={1160 * mv(t, 42.7, 0.5, 'reveal')} height={190} /></clipPath>
          <g clipPath="url(#klipJalan)">
            <rect x={-40} y={740} width={1160} height={170} fill={NETRAL.tinta} fillOpacity={0.14} />
            <line x1={-40} y1={825} x2={1120} y2={825} stroke={NETRAL.tinta} strokeOpacity={0.4} strokeWidth={6} strokeDasharray="38 30" />
          </g>
        </g>
      )}
      {/* sekolah naik saat disebut */}
      {t >= 43.7 && <g transform={`translate(110 ${440 + (1 - mv(t, 43.7, 0.4, 'land')) * 260})`}>
        <rect width={260} height={190} fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth={6} />
        <rect x={104} y={96} width={52} height={94} fill={NETRAL.tinta} />
        <line x1={130} y1={0} x2={130} y2={-70} stroke={NETRAL.tinta} strokeWidth={6} />
        <path d="M130 -70 L190 -52 L130 -34 Z" fill={MEREK.primer} stroke={NETRAL.tinta} strokeWidth={4} strokeLinejoin="round" />
      </g>}
      {t >= 44.3 && [620, 770, 920].map((x, i) => <g key={x} transform={`translate(0 ${(1 - mv(t, 44.3 + i * 0.12, 0.4, 'land')) * 260})`}><Rumah x={x} /></g>)}
      <Cincin cx={540} cy={825} r={120} t={t} t0={43.0} />
      <Cincin cx={240} cy={540} r={190} t={t} t0={43.9} />
      <Cincin cx={770} cy={560} r={230} t={t} t0={44.5} />
      {t >= 40.3 && <Mini x={m1} dy={drop1} />}
      {t >= 40.65 && <Mini x={m2} dy={drop2} />}
      {t >= 49.6 && (
        <g>
          <line x1={orangX - 10} y1={1118} x2={orangX - 10 - (orangX - 720) * jalan} y2={1118} stroke={MEREK.primer} strokeWidth={8} strokeDasharray="4 18" strokeLinecap="round" />
          <line x1={720} y1={1100} x2={720} y2={1136} stroke={NETRAL.tinta} strokeWidth={6} strokeLinecap="round" />
          <Orang x={orangX} y={1120} langkah={t * 7} />
        </g>
      )}
    </g>
  );
};
