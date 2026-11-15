// r5: lapisan film + glow (ref Irfan siirfannih_DfH6JYPqNjk, ref/BEDAH-FILMGLOW.md). Dipasang di atas footage, DI BAWAH teks.
// Takaran per peran footage (TASK-r5): penuh = b-roll stok pengisi (mundur jadi tekstur), sedang = arsip bermakna,
// ringan = pembicara (wajah tetap tajam), kartu = grain saja.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Grain } from './media';
import { W, H } from './theme';

// Lapisan blur dihitung pada skala 1/4 lalu diperbesar (TASK-r5: blur penuh > 2× lebih lambat).
const LowRes: React.FC<{ filter?: string; k?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ filter, k = 4, style, children }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden', ...style }}>
    <div style={{ position: 'absolute', left: 0, top: 0, width: W / k, height: H / k, transform: `scale(${k})`, transformOrigin: '0 0', willChange: 'transform' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: W / k, height: H / k, overflow: 'hidden', filter }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `scale(${1 / k})`, transformOrigin: '0 0' }}>{children}</div>
      </div>
    </div>
  </div>
);

export type FilmLevel = 'penuh' | 'sedang' | 'ringan' | 'kartu';
type Cfg = { bloom?: [number, number]; hal?: [number, number]; dots?: number; ca?: { shift: number; blur: number; inner: number; outer: number }; lift: boolean; grain: number };
const LV: Record<FilmLevel, Cfg> = {
  penuh: { bloom: [0.48, 24], hal: [0.24, 10], dots: 0.2, ca: { shift: 3, blur: 5, inner: 55, outer: 88 }, lift: true, grain: 0.16 },
  sedang: { bloom: [0.36, 22], hal: [0.18, 10], dots: 0.1, lift: true, grain: 0.13 },
  ringan: { bloom: [0.2, 22], hal: [0.15, 10], ca: { shift: 2, blur: 3, inner: 82, outer: 100 }, lift: true, grain: 0.1 },
  kartu: { lift: false, grain: 0.12 },
};

const Defs: React.FC<{ shift: number }> = ({ shift }) => (
  <svg width={0} height={0} style={{ position: 'absolute' }}>
    <filter id={`ca${shift}`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feOffset in="SourceGraphic" dx={-shift} dy={0} result="r0" />
      <feColorMatrix in="r0" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
      <feOffset in="SourceGraphic" dx={shift} dy={0} result="b0" />
      <feColorMatrix in="b0" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
      <feBlend in="r" in2="g" mode="screen" result="rg" />
      <feBlend in="rg" in2="b" mode="screen" />
    </filter>
  </svg>
);

export const FilmLook: React.FC<{ level: FilmLevel; children: React.ReactNode }> = ({ level, children }) => {
  const c = LV[level];
  const mask = c.ca ? `radial-gradient(ellipse at center, transparent ${c.ca.inner}%, black ${c.ca.outer}%)` : undefined;
  return (
    <AbsoluteFill style={{ isolation: 'isolate', overflow: 'hidden' }}>
      <AbsoluteFill>{children}</AbsoluteFill>
      {c.ca ? (
        <AbsoluteFill style={{ WebkitMaskImage: mask, maskImage: mask }}>
          <Defs shift={c.ca.shift / 2} />
          <LowRes k={2} filter={`url(#ca${c.ca.shift / 2}) blur(${c.ca.blur / 2}px)`}>{children}</LowRes>
        </AbsoluteFill>
      ) : null}
      {c.bloom ? (
        <LowRes filter={`brightness(1.15) contrast(2.2) blur(${c.bloom[1] / 4}px)`} style={{ mixBlendMode: 'screen', opacity: c.bloom[0] }}>{children}</LowRes>
      ) : null}
      {c.hal ? (
        <AbsoluteFill style={{ mixBlendMode: 'screen', opacity: c.hal[0], isolation: 'isolate' }}>
          <LowRes filter={`brightness(1.1) contrast(3) blur(${c.hal[1] / 4}px)`}>{children}</LowRes>
          <AbsoluteFill style={{ background: '#FF5A1F', mixBlendMode: 'multiply' }} />
        </AbsoluteFill>
      ) : null}
      {c.dots ? (
        <AbsoluteFill
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.85) 0, rgba(0,0,0,0.85) 1.3px, rgba(255,255,255,0.35) 2px)',
            backgroundSize: '5px 5px', mixBlendMode: 'soft-light', opacity: c.dots,
          }}
        />
      ) : null}
      {c.lift ? <AbsoluteFill style={{ background: 'rgb(12,10,8)', mixBlendMode: 'screen' }} /> : null}
      <LowRes k={2}><Grain opacity={c.grain} freq={1.3} /></LowRes>
    </AbsoluteFill>
  );
};
