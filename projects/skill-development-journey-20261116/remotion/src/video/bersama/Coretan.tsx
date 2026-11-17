// Coretan.tsx — panah goresan spidol satu tarikan + tulisan tangan miring (D-406). Dipakai lapisan `Coretan` dan di dalam dunia IG (b6.tsx).
// Panah: stroke-dashoffset 9 f lalu kepala dua goresan 3 f. Tulisan: huruf terungkap kiri->kanan mengikuti durasi kata yang diucapkan (mask = ujung pena).
// Garis bergetar 12 gambar/dtk (boil). Keluar = potongan (lapisan berakhir di frame itu).
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {move} from '../../lib/curves';
import {Fonts} from './Fonts';
import {FONT} from './tema';

export type Titik = [number, number];
export type PanahProps = {
  d: string; kepala: {tip: Titik; a: Titik; b: Titik};
  warna?: string; tebal?: number;
  /** detik relatif lapisan/dunia kapan mulai digambar */
  at: number; gambar?: number; headF?: number;
};
export type KataTulis = {t: string; mulai: number; akhir: number};
export type TulisProps = {
  kata: KataTulis[]; x: number; y: number; size: number; warna: string; rot?: number;
  /** garis bawah goresan: path, mulai (detik), frame menggambar */
  garis?: {d: string; at: number; f?: number; tebal?: number; warna?: string};
};

const boilSeed = (f: number) => Math.floor(f / 2.5) % 5 + 1;

export const BoilDefs: React.FC<{id: string; f: number}> = ({id, f}) => <defs>
  <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={boilSeed(f)} result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs>;

export const PanahGoresan: React.FC<PanahProps & {id: string}> = ({id, d, kepala, warna = '#FFFFFF', tebal = 9, at, gambar = 9, headF = 3}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const f0 = Math.round(at * fps);
  const q = move(f, f0, gambar, 'reveal');
  const h = move(f, f0 + gambar, headF, 'land');
  const st = {stroke: warna, strokeWidth: tebal, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none'};
  const garisKepala = (p: Titik, k: number) => <path d={`M${kepala.tip[0] + (p[0] - kepala.tip[0]) * 0} ${kepala.tip[1]} L${kepala.tip[0] + (p[0] - kepala.tip[0]) * k} ${kepala.tip[1] + (p[1] - kepala.tip[1]) * k}`} {...st}/>;
  return <g style={{filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.35))'}}><g filter={`url(#${id})`}>
    {q > 0.001 && <path d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - q} {...st}/>}
    {h > 0.001 && <>{garisKepala(kepala.a, h)}{garisKepala(kepala.b, h)}</>}
  </g></g>;
};

export const TulisTangan: React.FC<TulisProps & {id: string}> = ({id, kata, x, y, size, warna, rot = -3, garis}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const jit = {x: ((f * 7919) % 5 - 2) * 0.35 * (Math.floor(f / 2.5) % 2 ? 1 : -1), y: ((f * 104729) % 5 - 2) * 0.3};
  const gq = garis ? move(f, Math.round(garis.at * fps), garis.f ?? 6, 'reveal') : 0;
  return <div style={{position: 'absolute', left: x, top: y, transform: `translate(${jit.x}px, ${jit.y}px) rotate(${rot}deg)`, transformOrigin: '0 50%', whiteSpace: 'pre',
    fontFamily: FONT.tangan, fontWeight: 700, fontSize: size, lineHeight: 1, color: warna, textShadow: '0 3px 10px rgba(0,0,0,.28)'}}>
    {kata.map((k, i) => {
      const lf = f - Math.round(k.mulai * fps);
      const q = Math.min(1, Math.max(0, lf / Math.max(2, Math.round((k.akhir - k.mulai) * fps))));
      const e = lf < 0 ? 0 : 0.1 + 0.9 * q;           // ujung pena langsung tampak di frame onset
      return <span key={i} style={{display: 'inline-block', clipPath: `inset(-20% ${((1 - e) * 100).toFixed(2)}% -20% 0)`, visibility: lf < 0 ? 'hidden' : 'visible'}}>{k.t + (i < kata.length - 1 ? ' ' : '')}</span>;
    })}
    {garis && <svg width={1} height={1} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      {gq > 0.001 && <path d={garis.d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - gq} stroke={garis.warna ?? warna} strokeWidth={garis.tebal ?? 8} strokeLinecap="round" fill="none"/>}
    </svg>}
  </div>;
};

export type CoretanProps = {w: number; h: number; durasi: number; panah?: PanahProps; tulis?: TulisProps; v?: number};
/** lapisan Coretan: panah dan/atau tulisan tangan di kotak w x h (transparan) */
export const Coretan: React.FC<CoretanProps> = (p) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <svg width={p.w} height={p.h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <BoilDefs id="boil-c" f={f}/>
      {p.panah && <PanahGoresan id="boil-c" {...p.panah}/>}
    </svg>
    {p.tulis && <TulisTangan id="boil-t" {...p.tulis}/>}
  </AbsoluteFill>;
};
