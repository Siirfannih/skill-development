// FX.tsx · aksen Samjhon/Zache: flash naik 1 f turun 2–3 f, film burn, grain halus ±6 %, motion blur arah (SVG).
import React from 'react';
import {interpolate, random} from 'remotion';
import {useG} from '../kt/KT';

/** Flash putih: naik 1 f, turun `turun` f. */
export const Flash: React.FC<{at: number; turun?: number; kuat?: number; warna?: string}> = ({at, turun = 3, kuat = 0.95, warna = '#FFFFFF'}) => {
  const g = useG();
  if (g < at - 1 || g > at + turun) return null;
  const o = g < at ? kuat * 0.55 : interpolate(g, [at, at + turun], [kuat, 0], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', inset: 0, background: warna, opacity: o, pointerEvents: 'none'}}/>;
};

/** Film burn: bocoran cahaya oranye-merah menyapu frame, puncak putih di `puncak`. */
export const FilmBurn: React.FC<{mulai: number; puncak: number; selesai: number; seed?: number}> = ({mulai, puncak, selesai, seed = 1}) => {
  const g = useG();
  if (g < mulai || g > selesai) return null;
  const e = g <= puncak ? interpolate(g, [mulai, puncak], [0, 1]) : interpolate(g, [puncak, selesai], [1, 0]);
  const t = (g - mulai) / Math.max(1, selesai - mulai);
  const bx = 20 + 70 * t + random(`bx${seed}${g}`) * 6;
  const by = 30 + 40 * Math.sin(t * 3 + seed);
  const grad = `radial-gradient(ellipse 70% 55% at ${bx}% ${by}%, rgba(255,250,235,${0.95 * e}) 0%, rgba(255,190,90,${0.85 * e}) 22%, rgba(235,80,20,${0.7 * e}) 45%, rgba(150,20,10,${0.45 * e}) 65%, rgba(0,0,0,0) 85%),
    radial-gradient(ellipse 40% 60% at ${100 - bx}% ${80 - by * 0.5}%, rgba(255,120,40,${0.6 * e}) 0%, rgba(120,10,0,0) 70%)`;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, background: grad, mixBlendMode: 'screen', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', inset: 0, background: '#fff8ea', opacity: Math.max(0, e - 0.55) * 1.6, pointerEvents: 'none'}}/>
    </>
  );
};

/** Grain film halus (±6 %), berubah tiap frame, deterministik. */
export const Grain: React.FC<{kuat?: number}> = ({kuat = 0.06}) => {
  const g = useG();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: kuat * 2.2, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <filter id={`gr${g}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={g % 97} stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter={`url(#gr${g})`}/>
    </svg>
  );
};

/** Bungkus motion blur arah: dx, dy = kecepatan px/f di layar. Shutter 180° → blur ±0,5 × jarak per frame. */
export const MB: React.FC<{dx?: number; dy?: number; id: string; children: React.ReactNode; style?: React.CSSProperties}> = ({dx = 0, dy = 0, id, children, style}) => {
  const sx = Math.min(60, Math.abs(dx) * 0.42), sy = Math.min(60, Math.abs(dy) * 0.42);
  if (sx < 0.6 && sy < 0.6) return <div style={{position: 'absolute', inset: 0, ...style}}>{children}</div>;
  return (
    <div style={{position: 'absolute', inset: 0, filter: `url(#mb-${id})`, ...style}}>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id={`mb-${id}`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={`${sx.toFixed(2)} ${sy.toFixed(2)}`}/></filter>
      </svg>
      {children}
    </div>
  );
};

/** Vinyet lembut untuk menyatukan grade. */
export const Vinyet: React.FC<{kuat?: number}> = ({kuat = 0.35}) => (
  <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,${kuat}) 100%)`, pointerEvents: 'none'}}/>
);
