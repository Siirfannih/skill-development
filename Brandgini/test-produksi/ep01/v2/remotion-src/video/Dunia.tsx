// Dunia.tsx · adegan pantai: gerobak es berpayung, pembeli berkaos, garis pantai (pasir basah). Benda berwarna wajar (ADDENDUM-3).
import React from 'react';
import { NETRAL, HURUF } from './bersama/tema';
import { ASLI, TENDA_A, TENDA_B } from './bersama/warnaAsli';
import { kf, mv } from './waktu';
import { CURVE } from '../lib/curves';
import { stagger } from '../lib/timing';
import { Orang } from './Orang';

export const X0 = 110, X1 = 970, BY = 820, CW = 116;
export const px = (p: number) => X0 + (X1 - X0) * p;

export const posA = (t: number) =>
  kf(t, [[0, 0.04], [9.1, 0.04], [10.3, 0.25, 'heavy'], [15.7, 0.25], [18.2, 0.34, 'land'], [25.4, 0.34], [28.7, 0.414, 'land'], [52.99, 0.414], [53.0, 0.04]]);
export const posB = (t: number) =>
  kf(t, [[3.3, 0.216], [9.1, 0.216], [10.6, 0.75, 'heavy'], [22.8, 0.75], [24.9, 0.66, 'land'], [27.0, 0.66], [29.3, 0.586, 'land'],
    [30.9, 0.586], [32.1, 0.93, 'heavy'], [33.4, 0.93], [34.6, 0.586, 'land'], [52.99, 0.586]]);

/** Gerobak es: rangka kayu, kotak krem, payung belang, roda berjari. */
export const Gerobak: React.FC<{ x: number; tenda: [string, string]; dy?: number }> = ({ x, tenda, dy = 0 }) => (
  <g transform={`translate(${x} ${BY - 8 + dy}) scale(1.25)`}>
    <ellipse cx={0} cy={-4} rx={CW * 0.62} ry={11} fill={ASLI.tinta} fillOpacity={0.2} />
    <line x1={0} y1={-92} x2={0} y2={-168} stroke={ASLI.kayuTua} strokeWidth={6} strokeLinecap="round" />
    <path d="M-78 -150 Q0 -222 78 -150 Z" fill={tenda[0]} />
    <path d="M-52 -164 Q-26 -190 -26 -150 L-52 -150 Z M0 -186 Q26 -178 26 -150 L-26 -150 Q-26 -178 0 -186 Z M26 -150 Q26 -178 52 -164 L52 -150 Z" fill={tenda[1]} fillOpacity={0.95} />
    <rect x={-CW / 2} y={-92} width={CW} height={58} rx={8} fill={ASLI.kayu} stroke={ASLI.kayuTua} strokeWidth={5} />
    <rect x={-CW / 2 + 8} y={-84} width={CW - 16} height={26} rx={5} fill={ASLI.krem} />
    <rect x={-CW / 2 + 14} y={-52} width={CW - 28} height={10} rx={3} fill={ASLI.kayuTua} fillOpacity={0.55} />
    <path d="M30 -108 L42 -88 L18 -88 Z" fill={ASLI.kuning} stroke={ASLI.kayuTua} strokeWidth={3} strokeLinejoin="round" transform="translate(0 4)" />
    <circle cx={34} cy={-122} r={11} fill={ASLI.putih} stroke={ASLI.kayuTua} strokeWidth={3} />
    {[-CW / 2 + 24, CW / 2 - 24].map((cx) => (
      <g key={cx}><circle cx={cx} cy={-26} r={15} fill={ASLI.roda} /><circle cx={cx} cy={-26} r={7} fill={ASLI.rodaTepi} /></g>
    ))}
  </g>
);

const N = 21;
export const Dunia: React.FC<{ t: number; f: number }> = ({ t }) => {
  const a = posA(t), b = posB(t);
  const mid = (a + b) / 2;
  const awal = t >= 53.0;
  const bAda = t >= 3.3 && !awal;
  const bDrop = (1 - mv(t, 3.3, 0.42, 'land')) * -420;
  const tampilBar = t >= 9.2 && !awal;
  const barProg = mv(t, 9.2, 0.6, 'reveal');
  const awalMid = 0.5, mid2 = (0.34 + 0.75) / 2;
  const kuning = t >= 19.0 && t < 22.8 && !awal;
  return (
    <g>
      {/* garis pantai: pasir basah + buih tipis */}
      <line x1={X0 - 70} y1={BY + 6} x2={X1 + 70} y2={BY + 6} stroke={ASLI.pasirBasah} strokeWidth={22} strokeLinecap="round" />
      <line x1={X0 - 70} y1={BY - 6} x2={X1 + 70} y2={BY - 6} stroke={ASLI.putih} strokeWidth={6} strokeLinecap="round" strokeOpacity={0.9} />
      {t >= 6.5 && !awal && (
        <g>
          {[X0, X1].map((x, i) => (
            <line key={i} x1={x} y1={BY + 20} x2={x} y2={BY + 150} stroke={ASLI.kayuTua} strokeWidth={6} strokeLinecap="round" transform={`translate(0 ${(1 - mv(t, 6.6 + i * 0.35, 0.4, 'land')) * 30})`} />
          ))}
          <text x={X0} y={BY + 214} textAnchor="middle" fontFamily={HURUF.keluarga.isi} fontWeight={HURUF.bobot.label} fontSize={HURUF.ukuran.label} fill={NETRAL.tinta} opacity={mv(t, 6.7, 0.3, 'reveal')}>0</text>
          <text x={X1} y={BY + 214} textAnchor="middle" fontFamily={HURUF.keluarga.isi} fontWeight={HURUF.bobot.label} fontSize={HURUF.ukuran.label} fill={NETRAL.tinta} opacity={mv(t, 7.0, 0.3, 'reveal')}>1 km</text>
        </g>
      )}
      {kuning && <rect x={px(awalMid)} y={BY + 14} width={(px(mid2) - px(awalMid)) * mv(t, 19.0, 0.5, 'reveal')} height={76} fill={ASLI.kuning} fillOpacity={0.55} rx={10} />}
      {/* pembeli: orang kecil berkaos; berwarna payung gerobak terdekat setelah memilih (>= 13,5) */}
      {Array.from({ length: N }).map((_, i) => {
        const p = i / (N - 1);
        const d0 = 6.45 + stagger(i, N, { from: 'center', gap: 2.1, ease: CURVE.reveal, jitter: 1.5, seed: 5 }) / 30;
        if (t < d0 || awal) return null;
        const pasang = t >= 13.5 + Math.abs(p - 0.5) * 0.5;
        const kaos = !pasang ? ASLI.kaosAbu : p < mid ? TENDA_A[0] : TENDA_B[0];
        const lompat = pasang && t < 13.5 + Math.abs(p - 0.5) * 0.5 + 0.3 ? -10 * Math.sin(((t - 13.5 - Math.abs(p - 0.5) * 0.5) / 0.3) * Math.PI) : 0;
        return <g key={i} transform={`translate(0 ${lompat})`}><Orang x={px(p)} y={BY + 78} langkah={0} skala={0.5 * (0.9 + 0.1 * mv(t, d0, 0.28, 'land'))} kaos={kaos} /></g>;
      })}
      {tampilBar && (
        <g>
          <clipPath id="klipBar"><rect x={X0 - 14} y={BY + 100} width={(X1 - X0 + 28) * barProg} height={34} /></clipPath>
          <g clipPath="url(#klipBar)">
            <rect x={X0 - 14} y={BY + 100} width={px(mid) - X0 + 14} height={34} rx={10} fill={TENDA_A[0]} />
            <rect x={px(mid)} y={BY + 100} width={X1 + 14 - px(mid)} height={34} rx={10} fill={TENDA_B[0]} />
          </g>
        </g>
      )}
      {(t < 6.3 || awal) && (() => {
        const tt = awal ? t - 53 : t;
        const x = kf(tt, [[0, 560], [4.7, 330, 'drift']]);
        return <g transform={`translate(0 ${BY + 4})`}><Orang x={x} y={0} langkah={tt * 6} skala={1.35} kaos={ASLI.kuning} /></g>;
      })()}
      <Gerobak x={px(a)} tenda={TENDA_A} />
      {bAda && <Gerobak x={px(b)} tenda={TENDA_B} dy={bDrop} />}
    </g>
  );
};
