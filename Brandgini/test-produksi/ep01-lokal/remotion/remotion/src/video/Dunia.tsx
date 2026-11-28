// Dunia.tsx · adegan pantai (A-kolase, kolase vektor datar): satu dunia, kamera yang bergerak, benda diam di dunianya (Lantai B12).
import React from 'react';
import { MEREK, NETRAL, TURUNAN, HURUF } from './bersama/tema';
import { kf, mv } from './waktu';
import { CURVE } from '../lib/curves';
import { stagger } from '../lib/timing';

export const X0 = 110, X1 = 970, BY = 820, CW = 116;
export const px = (p: number) => X0 + (X1 - X0) * p;

// posisi gerobak (p = 0..1 di pantai 1 km); kurva per segmen.
export const posA = (t: number) =>
  kf(t, [[0, 0.04], [9.1, 0.04], [10.3, 0.25, 'heavy'], [15.7, 0.25], [18.2, 0.34, 'land'], [25.4, 0.34], [28.7, 0.414, 'land'], [52.99, 0.414], [53.0, 0.04]]);
export const posB = (t: number) =>
  kf(t, [[3.3, 0.216], [9.1, 0.216], [10.6, 0.75, 'heavy'], [22.8, 0.75], [24.9, 0.66, 'land'], [27.0, 0.66], [29.3, 0.586, 'land'],
    [30.9, 0.586], [32.1, 0.93, 'heavy'], [33.4, 0.93], [34.6, 0.586, 'land'], [52.99, 0.586]]);

/** Kamera dunia: zoom di ujung kiri (hook), tarik mundur ke garis 0-1 km, dorong ke tengah saat nempel. */
export const kamera = (t: number) => ({
  s: kf(t, [[0, 1.72], [6.3, 1.86], [7.7, 1.0, 'heavy'], [25.2, 1.0], [27.9, 1.42, 'heavy'], [33.9, 1.42], [35.5, 1.0, 'heavy'],
    [52.99, 1.0], [53.0, 2.3], [53.95, 1.76, 'land'], [55.3, 1.8, 'drift']]),
  fx: kf(t, [[0, 300], [6.3, 300], [7.7, 540, 'heavy'], [25.2, 540], [27.9, 540], [52.99, 540], [53.0, 330], [53.95, 300]]),
});

const Gerobak: React.FC<{ x: number; tanda: string; dy?: number }> = ({ x, tanda, dy = 0 }) => (
  <g transform={`translate(${x} ${BY - 8 + dy}) scale(1.25)`}>
    <rect x={-CW / 2} y={-92} width={CW} height={58} rx={10} fill={MEREK.sekunder} stroke={NETRAL.tinta} strokeWidth={6} />
    <rect x={-CW / 2} y={-92} width={CW} height={16} rx={8} fill={TURUNAN.sekunder.kardusGelap} stroke={NETRAL.tinta} strokeWidth={6} />
    <rect x={-CW / 2 + 12} y={-62} width={40} height={20} rx={4} fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth={4} />
    <line x1={CW / 2 - 18} y1={-92} x2={CW / 2 - 18} y2={-142} stroke={NETRAL.tinta} strokeWidth={6} strokeLinecap="round" />
    <path d={`M${CW / 2 - 18} -142 L${CW / 2 + 22} -128 L${CW / 2 - 18} -114 Z`} fill={tanda} stroke={NETRAL.tinta} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-CW / 2 + 24} cy={-26} r={14} fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth={6} />
    <circle cx={CW / 2 - 24} cy={-26} r={14} fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth={6} />
  </g>
);

const N = 21;
export const Dunia: React.FC<{ t: number; f: number }> = ({ t, f }) => {
  const a = posA(t), b = posB(t);
  const mid = (a + b) / 2;
  const awal = t >= 53.0;   // loop: frame akhir = keadaan frame 1 (satu gerobak di ujung kiri, tanpa diagram)
  const bAda = t >= 3.3 && !awal;
  const bDrop = (1 - mv(t, 3.3, 0.42, 'land')) * -420;
  const tampilBar = t >= 9.2 && !awal;
  const barProg = mv(t, 9.2, 0.6, 'reveal');
  const awalMid = 0.5, mid2 = (0.34 + 0.75) / 2;
  const kuning = t >= 19.0 && t < 22.8 && !awal;
  const tagKe = (t0: number) => 1 - mv(t, t0, 0.3, 'reveal');
  const tagOut = (t >= 15.5 ? mv(t, 15.5, 0.25, 'leave') : 0);
  return (
    <g>
      {/* ombak: tiga goresan tipis di atas garis pantai (konteks, bukan hiasan gerak) */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${X0 - 40 + i * 120} ${BY - 330 - i * 70} q40 -26 80 0 t80 0 t80 0`} fill="none" stroke={NETRAL.tinta} strokeOpacity={0.22} strokeWidth={5} strokeLinecap="round" />
      ))}
      <line x1={X0 - 70} y1={BY} x2={X1 + 70} y2={BY} stroke={NETRAL.tinta} strokeWidth={10} strokeLinecap="round" />
      {/* tanda ujung 0 dan 1 km */}
      {t >= 6.5 && !awal && (
        <g opacity={1}>
          {[X0, X1].map((x, i) => (
            <line key={i} x1={x} y1={BY - 18} x2={x} y2={BY + 150} stroke={NETRAL.tinta} strokeWidth={5} strokeLinecap="round" transform={`translate(0 ${(1 - mv(t, 6.6 + i * 0.35, 0.4, 'land')) * 30})`} />
          ))}
          <text x={X0} y={BY + 214} textAnchor="middle" fontFamily={HURUF.keluarga.isi} fontWeight={HURUF.bobot.label} fontSize={HURUF.ukuran.label} fill={NETRAL.tinta} opacity={mv(t, 6.7, 0.3, 'reveal')}>0</text>
          <text x={X1} y={BY + 214} textAnchor="middle" fontFamily={HURUF.keluarga.isi} fontWeight={HURUF.bobot.label} fontSize={HURUF.ukuran.label} fill={NETRAL.tinta} opacity={mv(t, 7.0, 0.3, 'reveal')}>1 km</text>
        </g>
      )}
      {/* stabilo: wilayah rebutan di tengah (18,9-22,8) */}
      {kuning && (
        <rect x={px(awalMid)} y={BY + 8} width={(px(mid2) - px(awalMid)) * mv(t, 19.0, 0.5, 'reveal')} height={64} fill={TURUNAN.primer.stabilo} opacity={0.9} rx={6} />
      )}
      {/* titik pembeli: warna mengikuti gerobak terdekat saat dipasangkan (>= 13,5) */}
      {Array.from({ length: N }).map((_, i) => {
        const p = i / (N - 1);
        const d0 = 6.45 + stagger(i, N, { from: 'center', gap: 2.1, ease: CURVE.reveal, jitter: 1.5, seed: 5 }) / 30;
        const sk = mv(t, d0, 0.28, 'land');
        if (t < d0 || awal) return null;
        const pasang = t >= 13.5 + (Math.abs(p - 0.5) * 0.5);
        const warna = !pasang ? NETRAL.tinta : p < mid ? MEREK.primer : NETRAL.tinta;
        return <circle key={i} cx={px(p)} cy={BY + 38} r={14 * (0.9 + 0.1 * sk)} fill={warna} fillOpacity={pasang ? 1 : 0.55} />;
      })}
      {/* bilah wilayah */}
      {tampilBar && (
        <g>
          <clipPath id="klipBar"><rect x={X0 - 14} y={BY + 90} width={(X1 - X0 + 28) * barProg} height={40} /></clipPath>
          <g clipPath="url(#klipBar)">
            <rect x={X0 - 14} y={BY + 90} width={px(mid) - X0 + 14} height={40} rx={10} fill={MEREK.primer} />
            <rect x={px(mid)} y={BY + 90} width={X1 + 14 - px(mid)} height={40} rx={10} fill={NETRAL.tinta} />
          </g>
        </g>
      )}
      <Gerobak x={px(a)} tanda={MEREK.primer} />
      {bAda && <Gerobak x={px(b)} tanda={NETRAL.tinta} dy={bDrop} />}
      {/* label 1/4 dan 3/4 muncul saat disebut, pergi saat A mulai geser */}
      {t >= 11.5 && t < 15.8 && !awal && (
        <text x={px(0.25)} y={BY - 205 - tagOut * 40} textAnchor="middle" fontFamily={HURUF.keluarga.isi} fontWeight={HURUF.bobot.kunci} fontSize={HURUF.ukuran.kunci} fill={TEKS_K} opacity={1 - tagOut}>¼</text>
      )}
      {t >= 12.9 && t < 15.8 && !awal && (
        <text x={px(0.75)} y={BY - 205 - tagOut * 40} textAnchor="middle" fontFamily={HURUF.keluarga.isi} fontWeight={HURUF.bobot.kunci} fontSize={HURUF.ukuran.kunci} fill={TEKS_K} opacity={1 - tagOut}>¾</text>
      )}
    </g>
  );
};
const TEKS_K = NETRAL.tinta;
