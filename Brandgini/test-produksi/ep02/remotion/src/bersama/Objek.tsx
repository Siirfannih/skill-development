// Objek vektor 2D gaya A (duotone tinta/putih, Biru Gini hanya untuk "yang sedang dijelaskan"). Semua warna dari tema.ts.
import React from 'react';
import {MEREK, NETRAL, TURUNAN} from './tema';

const T = NETRAL.tinta, W = NETRAL.putih, B = MEREK.merek, SB = TURUNAN.primer.stabilo, R = NETRAL.redup;
export const tebal = 6;
type G = {x: number; y: number; s?: number; rot?: number; o?: number};
const G_: React.FC<G & {children: React.ReactNode}> = ({x, y, s = 1, rot = 0, o = 1, children}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>{children}</g>
);

export const Kepala: React.FC<{x: number; y: number; r: number; mood: 'pucat' | 'tenang' | 'oh'; rot?: number}> = ({x, y, r, mood, rot = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle r={r} fill={mood === 'pucat' ? SB : W} stroke={T} strokeWidth={tebal} />
    {mood === 'pucat' ? <>
      <path d={`M${-r * .5} ${-r * .12} l${r * .3} ${r * .26} M${-r * .2} ${-r * .12} l${-r * .3} ${r * .26}`} stroke={T} strokeWidth={5} strokeLinecap="round" />
      <path d={`M${r * .2} ${-r * .12} l${r * .3} ${r * .26} M${r * .5} ${-r * .12} l${-r * .3} ${r * .26}`} stroke={T} strokeWidth={5} strokeLinecap="round" />
      <path d={`M${-r * .4} ${r * .5} q${r * .2} ${-r * .25} ${r * .4} 0 t${r * .4} 0`} fill="none" stroke={T} strokeWidth={5} strokeLinecap="round" />
    </> : <>
      <circle cx={-r * .32} cy={-r * .1} r={r * .09} fill={T} /><circle cx={r * .32} cy={-r * .1} r={r * .09} fill={T} />
      <path d={`M${-r * .38} ${r * .35} q${r * .38} ${mood === 'oh' ? r * .5 : r * .32} ${r * .76} 0`} fill="none" stroke={T} strokeWidth={5} strokeLinecap="round" />
    </>}
  </g>
);

/** Mobil tampak samping menghadap kanan. Lebar ±760 di s=1. pose: 0 lurus, >0 ke tikungan (miring), penumpang di jok belakang, sopir di depan. */
export const Mobil: React.FC<G & {tilt?: number; pPoli?: boolean; sopir?: boolean; penumpang?: 'pucat' | 'tenang' | 'oh' | null; sorot?: boolean}> = ({x, y, s = 1, tilt = 0, penumpang = 'pucat', sopir = true, sorot = false, o = 1}) => (
  <G_ x={x} y={y} s={s} rot={tilt} o={o}>
    <path d="M-380 40 L-380 -40 Q-380 -70 -340 -78 L-200 -100 L-120 -200 Q-110 -215 -90 -215 L170 -215 Q195 -215 210 -195 L290 -100 L340 -85 Q380 -75 380 -40 L380 40 Z" fill={W} stroke={T} strokeWidth={tebal} strokeLinejoin="round" />
    <path d="M-100 -190 L170 -190 L255 -100 L-175 -100 Z" fill={sorot ? SB : MEREK.latar} stroke={T} strokeWidth={tebal} strokeLinejoin="round" />
    <path d="M40 -190 L40 -100" stroke={T} strokeWidth={tebal} />
    {penumpang && <Kepala x={-20} y={-150} r={42} mood={penumpang} />}
    {sopir && <Kepala x={110} y={-150} r={42} mood="tenang" />}
    <circle cx={-250} cy={50} r={62} fill={T} /><circle cx={-250} cy={50} r={26} fill={W} />
    <circle cx={250} cy={50} r={62} fill={T} /><circle cx={250} cy={50} r={26} fill={W} />
  </G_>
);

/** Garis jalan melengkung (tikungan) dengan garis putus-putus tengah. */
export const Jalan: React.FC<{y: number; geser?: number}> = ({y, geser = 0}) => (
  <g>
    <rect x={0} y={y} width={1080} height={150} fill={T} opacity={0.92} />
    <line x1={-60 - geser} y1={y + 75} x2={1140} y2={y + 75} stroke={W} strokeWidth={8} strokeDasharray="50 40" />
  </g>
);

/** Potongan kepala (tampak samping) dengan telinga dalam: rongga melingkar berisi cairan. level 0..1 tinggi cairan, miring derajat. */
export const KepalaPotong: React.FC<G & {cairan?: number; miring?: number; sorot?: boolean}> = ({x, y, s = 1, rot = 0, o = 1, cairan = 0.55, miring = 0, sorot = true}) => (
  <G_ x={x} y={y} s={s} rot={rot} o={o}>
    <path d="M-170 220 L-190 -20 Q-200 -200 0 -210 Q200 -200 190 -20 L170 220 Z" fill={W} stroke={T} strokeWidth={tebal} strokeLinejoin="round" />
    <Rongga x={30} y={20} r={86} cairan={cairan} miring={miring} sorot={sorot} />
  </G_>
);

export const Rongga: React.FC<{x: number; y: number; r: number; cairan: number; miring: number; sorot?: boolean}> = ({x, y, r, cairan, miring, sorot}) => {
  const id = `klip-${Math.round(x)}-${Math.round(y)}-${r}`;
  const lvl = r - 2 * r * cairan;
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={id}><circle r={r} /></clipPath>
      <circle r={r} fill={W} />
      <g clipPath={`url(#${id})`}><g transform={`rotate(${miring})`}><rect x={-r * 2} y={lvl} width={r * 4} height={r * 3} fill={sorot ? B : SB} /></g></g>
      <circle r={r} fill="none" stroke={T} strokeWidth={tebal} />
    </g>
  );
};

/** Otak: dua lobus + lipatan, isi putih. */
export const Otak: React.FC<G & {sorot?: boolean}> = ({x, y, s = 1, rot = 0, o = 1, sorot = false}) => (
  <G_ x={x} y={y} s={s} rot={rot} o={o}>
    <path d="M-110 10 Q-140 -60 -70 -90 Q-30 -130 20 -100 Q80 -120 110 -60 Q150 -20 110 40 Q100 90 40 90 Q0 110 -40 90 Q-100 90 -110 10 Z" fill={sorot ? SB : W} stroke={T} strokeWidth={tebal} strokeLinejoin="round" />
    <path d="M-10 -95 Q10 -40 -10 0 Q-20 40 0 85 M-80 -40 Q-50 -30 -40 -5 M60 -60 Q40 -30 55 0 M-70 40 Q-40 30 -20 45" fill="none" stroke={T} strokeWidth={4} strokeLinecap="round" />
  </G_>
);

export const Mata: React.FC<G> = ({x, y, s = 1, o = 1}) => (
  <G_ x={x} y={y} s={s} o={o}>
    <path d="M-110 0 Q0 -90 110 0 Q0 90 -110 0 Z" fill={W} stroke={T} strokeWidth={tebal} strokeLinejoin="round" />
    <circle r={38} fill={SB} stroke={T} strokeWidth={5} /><circle r={16} fill={T} />
  </G_>
);

export const Telinga: React.FC<G> = ({x, y, s = 1, o = 1}) => (
  <G_ x={x} y={y} s={s} o={o}>
    <path d="M-40 -90 Q60 -130 80 -30 Q90 40 20 70 Q-10 90 -20 130 Q-30 160 -70 140" fill="none" stroke={T} strokeWidth={tebal} strokeLinecap="round" />
    <path d="M-10 -50 Q30 -70 40 -20 Q40 20 5 35" fill="none" stroke={T} strokeWidth={5} strokeLinecap="round" />
  </G_>
);

export const HP: React.FC<G> = ({x, y, s = 1, rot = 0, o = 1}) => (
  <G_ x={x} y={y} s={s} rot={rot} o={o}>
    <rect x={-80} y={-140} width={160} height={280} rx={24} fill={W} stroke={T} strokeWidth={tebal} />
    <rect x={-58} y={-112} width={116} height={190} rx={8} fill={SB} />
    <path d="M-40 -80 H40 M-40 -52 H20 M-40 -24 H30" stroke={T} strokeWidth={5} strokeLinecap="round" />
    <circle cx={0} cy={108} r={11} fill="none" stroke={T} strokeWidth={4} />
  </G_>
);

/** Panah sinyal Biru Gini, digambar progresif (0..1) mengikuti path. */
export const Sinyal: React.FC<{d: string; p: number; len?: number; warna?: string; tebalS?: number; kepala?: boolean}> = ({d, p, len = 1000, warna = B, tebalS = 10}) => (
  <path d={d} fill="none" stroke={warna} strokeWidth={tebalS} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
);

export const Tanya: React.FC<G> = ({x, y, s = 1, o = 1}) => (
  <G_ x={x} y={y} s={s} o={o}><circle r={46} fill={W} stroke={T} strokeWidth={tebal} />
    <path d="M-16 -14 Q-16 -30 0 -30 Q18 -30 18 -14 Q18 -2 0 4 V12 M0 26 v4" fill="none" stroke={T} strokeWidth={7} strokeLinecap="round" /></G_>
);

export const Setir: React.FC<G> = ({x, y, s = 1, rot = 0, o = 1}) => (
  <G_ x={x} y={y} s={s} rot={rot} o={o}>
    <circle r={120} fill="none" stroke={T} strokeWidth={18} /><circle r={26} fill={T} />
    <path d="M-120 0 H120 M0 26 V120" stroke={T} strokeWidth={14} />
    <path d="M-120 0 H-60 M120 0 H60" stroke={W} strokeWidth={4} />
  </G_>
);

export const Pedal: React.FC<G & {tekan?: number}> = ({x, y, s = 1, o = 1, tekan = 0}) => (
  <G_ x={x} y={y} s={s} o={o}>
    <rect x={-70} y={-120 + tekan * 24} width={140} height={190} rx={14} fill={W} stroke={T} strokeWidth={tebal} />
    <path d="M-45 -85 H45 M-45 -55 H45 M-45 -25 H45 M-45 5 H45 M-45 35 H45" stroke={T} strokeWidth={5} strokeLinecap="round" transform={`translate(0 ${tekan * 24})`} />
  </G_>
);

export const Centang: React.FC<G & {p: number}> = ({x, y, s = 1, p, o = 1}) => (
  <G_ x={x} y={y} s={s} o={o}><circle r={56} fill={W} stroke={T} strokeWidth={tebal} />
    <path d="M-26 2 L-6 24 L30 -22" fill="none" stroke={B} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={120} strokeDashoffset={120 * (1 - p)} /></G_>
);

/** Meter horizontal: isi 0..1. */
export const Meter: React.FC<{x: number; y: number; w: number; isi: number; sorot?: boolean}> = ({x, y, w, isi, sorot = true}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={52} rx={26} fill={W} stroke={T} strokeWidth={tebal} />
    <clipPath id={`m${x}${y}`}><rect width={w} height={52} rx={26} /></clipPath>
    <g clipPath={`url(#m${x}${y})`}><rect width={w * isi} height={52} fill={sorot ? B : T} /></g>
    <rect width={w} height={52} rx={26} fill="none" stroke={T} strokeWidth={tebal} />
  </g>
);

export const Spiral: React.FC<G & {p?: number}> = ({x, y, s = 1, rot = 0, o = 1}) => (
  <G_ x={x} y={y} s={s} rot={rot} o={o}>
    <path d="M0 0 m0 -6 a6 6 0 1 1 -6 6 a14 14 0 1 1 14 14 a24 24 0 1 1 -24 -24 a36 36 0 1 1 36 36" fill="none" stroke={T} strokeWidth={6} strokeLinecap="round" />
  </G_>
);

export const Kursi: React.FC<G & {w?: number}> = ({x, y, s = 1, o = 1}) => (
  <G_ x={x} y={y} s={s} o={o}><path d="M-60 -160 Q-60 -200 -20 -200 H20 Q60 -200 60 -160 V30 H-120 Q-120 0 -60 0 Z" fill={SB} stroke={T} strokeWidth={tebal} strokeLinejoin="round" /></G_>
);

export const Tikungan: React.FC<{x: number; y: number; w: number; p: number}> = ({x, y, w, p}) => (
  <path d={`M${x} ${y} Q${x + w * .55} ${y} ${x + w * .75} ${y - 110} T${x + w} ${y - 300}`} fill="none" stroke={T} strokeWidth={16} strokeLinecap="round" strokeDasharray={1100} strokeDashoffset={1100 * (1 - p)} />
);
