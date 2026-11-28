// Benda tambahan: jalan/mobil dari atas, meter, interior mobil, setir + pedal. Warna wajar, digambar dengan kode.
import React from 'react';
import {C} from './Benda';

type P = [number, number];
const bez = (a: P, b: P, c: P, d: P, t: number): P => {
  const u = 1 - t; return [u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]];
};
const dbez = (a: P, b: P, c: P, d: P, t: number): P => {
  const u = 1 - t; return [3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]), 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1])];
};
// Jalan berkelok: dua segmen bezier (masuk dari kiri bawah, tikungan ke kanan, naik ke atas).
export const RUTE: P[][] = [[[-150, 1560], [330, 1560], [760, 1520], [800, 1180]], [[800, 1180], [840, 860], [420, 800], [300, 380]]];
export const JALAN_D = 'M-150 1560 C330 1560 760 1520 800 1180 C840 860 420 800 300 380 L260 -200';
export const posRute = (u: number): {x: number; y: number; rot: number} => {
  const seg = u < 0.5 ? 0 : 1, t = seg === 0 ? u * 2 : (u - 0.5) * 2, [a, b, c, d] = RUTE[seg];
  const [x, y] = bez(a, b, c, d, Math.min(1, Math.max(0, t))), [dx, dy] = dbez(a, b, c, d, Math.min(1, Math.max(0, t)));
  return {x, y, rot: (Math.atan2(dy, dx) * 180) / Math.PI};
};

export const LatarAtas: React.FC = () => (
  <g>
    <rect x={-500} y={-500} width={2080} height={2920} fill={C.rumput} />
    {[[120, 300], [900, 220], [980, 700], [90, 1000], [160, 1500], [940, 1650], [500, 120], [640, 1450]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y + 8} r={52} fill={C.bayangan} /><circle cx={x} cy={y} r={50} fill={C.daun} /><circle cx={x - 14} cy={y - 14} r={26} fill={C.rumputGelap} opacity={0.8} /></g>)}
    <rect x={-100} y={60} width={300} height={190} fill="#C9B66B" opacity={0.7} /><rect x={760} y={1380} width={260} height={150} fill="#D8C77E" opacity={0.7} />
  </g>
);
export const JalanAtas: React.FC<{tebal?: number}> = ({tebal = 190}) => (
  <g>
    <path d={JALAN_D} fill="none" stroke="#D2C7A8" strokeWidth={tebal + 26} strokeLinecap="butt" />
    <path d={JALAN_D} fill="none" stroke={C.aspal} strokeWidth={tebal} />
    <path d={JALAN_D} fill="none" stroke={C.garis} strokeWidth={8} strokeDasharray="46 36" />
  </g>
);
/** Mobil dari atas, menghadap kanan (sebelum rot). L = panjang. */
export const MobilAtas: React.FC<{x: number; y: number; rot: number; L?: number}> = ({x, y, rot, L = 190}) => {
  const k = L / 190;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
      <rect x={-92} y={-44} width={190} height={92} rx={22} fill={C.bayangan} transform="translate(5 8)" />
      {[[-58, -48], [-58, 40], [52, -48], [52, 40]].map(([wx, wy], i) => <rect key={i} x={wx - 17} y={wy - 4} width={34} height={12} rx={4} fill={C.ban} />)}
      <rect x={-95} y={-40} width={190} height={80} rx={22} fill={C.mobil} />
      <path d="M-30 -33 H18 L38 -26 V26 L18 33 H-30 Z" fill={C.kaca} stroke={C.mobilGelap} strokeWidth={3} /><path d="M-30 -33 H-62 L-70 -24 V24 L-62 33 H-30 Z" fill={C.kaca} opacity={0.8} stroke={C.mobilGelap} strokeWidth={3} />
      <rect x={-24} y={-30} width={40} height={60} rx={8} fill={C.mobilGelap} opacity={0.35} />
      <rect x={84} y={-30} width={9} height={16} rx={3} fill={C.kuning} /><rect x={84} y={14} width={9} height={16} rx={3} fill={C.kuning} />
    </g>
  );
};

/** Meter setengah lingkaran (jarum). isi 0..1. */
export const Meter: React.FC<{x: number; y: number; r: number; isi: number}> = ({x, y, r, isi}) => {
  const ang = -180 + 180 * isi;
  const arc = (a0: number, a1: number, col: string) => {
    const p = (a: number): P => [Math.cos((a * Math.PI) / 180) * r * 0.82, Math.sin((a * Math.PI) / 180) * r * 0.82];
    const s = p(a0), e = p(a1); return <path d={`M${s[0]} ${s[1]} A${r * 0.82} ${r * 0.82} 0 0 1 ${e[0]} ${e[1]}`} fill="none" stroke={col} strokeWidth={r * 0.17} />;
  };
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={r * 0.12} rx={r * 1.08} ry={r * 0.12} fill={C.bayangan} />
      <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z`} fill="#FFFFFF" stroke={C.setir} strokeWidth={r * 0.07} strokeLinejoin="round" />
      {arc(-180, -120, C.hijau)}{arc(-120, -60, C.kuning)}{arc(-60, 0, C.merah)}
      {Array.from({length: 11}).map((_, i) => { const a = ((-180 + i * 18) * Math.PI) / 180; return <path key={i} d={`M${Math.cos(a) * r * 0.66} ${Math.sin(a) * r * 0.66} L${Math.cos(a) * r * 0.58} ${Math.sin(a) * r * 0.58}`} stroke={C.setir} strokeWidth={4} />; })}
      <g transform={`rotate(${ang})`}><path d={`M${-r * 0.06} ${-r * 0.03} L${r * 0.62} 0 L${-r * 0.06} ${r * 0.03} Z`} fill={C.merah} stroke={C.setir} strokeWidth={2} /></g>
      <circle r={r * 0.07} fill={C.setir} />
    </g>
  );
};

/** Bingkai jendela mobil (pintu + atap) dengan lubang jendela; memperlihatkan pemandangan di belakang. */
export const JendelaMobil: React.FC = () => (
  <g>
    <path fillRule="evenodd" d="M-400 -400 H1480 V2320 H-400 Z M120 420 H940 Q1000 420 1000 480 V1000 H80 V480 Q80 420 120 420 Z" fill="#3A3D44" />
    <rect x={60} y={980} width={960} height={420} fill="#4A4D56" /><rect x={60} y={980} width={960} height={26} fill="#2A2C31" />
    <rect x={60} y={1050} width={400} height={20} rx={10} fill="#2A2C31" />
  </g>
);

/** Setir dilihat dari kursi pengemudi + dua tangan menggenggam. putar = derajat. */
export const SetirTangan: React.FC<{x: number; y: number; putar: number}> = ({x, y, putar}) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={250} rx={260} ry={26} fill={C.bayangan} />
    <g transform={`rotate(${putar})`}>
      <ellipse rx={260} ry={220} fill="none" stroke={C.setir} strokeWidth={46} />
      <ellipse rx={260} ry={220} fill="none" stroke="#3A3C42" strokeWidth={10} />
      <path d="M-230 20 L-60 40 L0 -10 L60 40 L230 20" fill="none" stroke={C.setir} strokeWidth={34} strokeLinejoin="round" /><path d="M0 -10 L0 190" stroke={C.setir} strokeWidth={34} />
      <circle cx={0} cy={20} r={52} fill="#2E3036" stroke={C.logam} strokeWidth={5} />
      {/* tangan kiri dan kanan di posisi jam 9 dan jam 3 */}
      <g transform="translate(-242 -16)"><rect x={-26} y={-44} width={64} height={92} rx={28} fill={C.kulit} stroke={C.kulitGelap} strokeWidth={3} /><path d="M-26 -10 h64 M-26 12 h64" stroke={C.kulitGelap} strokeWidth={3} /></g>
      <g transform="translate(242 -16)"><rect x={-38} y={-44} width={64} height={92} rx={28} fill={C.kulit} stroke={C.kulitGelap} strokeWidth={3} /><path d="M-38 -10 h64 M-38 12 h64" stroke={C.kulitGelap} strokeWidth={3} /></g>
    </g>
  </g>
);

/** Kaki bersepatu menginjak pedal, dari samping. tekan 0..1. */
export const KakiPedal: React.FC<{x: number; y: number; tekan: number}> = ({x, y, tekan}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={110} width={620} height={30} fill="#2A2C31" />
    <g transform={`rotate(${-6 + tekan * 10} 90 60)`}>
      <path d="M90 -10 L130 100 L-60 100 L-70 40 Q-70 0 -30 0 Z" fill={C.karet} stroke={C.setir} strokeWidth={4} />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${-10 + i * 28} ${14 + i * 18} L${44 + i * 28} ${30 + i * 18}`} stroke="#6A6D74" strokeWidth={4} strokeLinecap="round" />)}
    </g>
    <path d="M-140 -90 Q-90 -100 -60 -40 L-20 0 Q20 -10 110 0 Q190 10 200 60 Q205 95 170 100 L-120 100 Q-190 100 -190 50 Q-190 -40 -140 -90 Z" fill="#35363C" transform={`rotate(${tekan * -4} 0 60) translate(${-60 + tekan * 0} -50)`} opacity={0} />
    <path d="M-170 -150 L-90 -150 L-70 0 L-90 50 Q-20 50 40 20 Q120 -10 200 30 Q240 60 210 82 L-100 82 Q-150 82 -160 30 Z" fill="#2F3035" stroke="#18191C" strokeWidth={4} transform={`translate(${-10 + tekan * 8} ${-40 + tekan * 16})`} />
    <path d="M-170 -150 L-90 -150 L-82 -90 L-166 -90 Z" fill={C.kulit} transform={`translate(${-10 + tekan * 8} ${-40 + tekan * 16})`} /><rect x={-165} y={-290} width={72} height={150} fill="#4C5766" transform={`translate(${-10 + tekan * 8} ${-40 + tekan * 16})`} />
  </g>
);
