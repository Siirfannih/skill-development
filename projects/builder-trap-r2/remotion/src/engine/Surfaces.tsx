// Material latar per babak (RESEP §Warna & tekstur): kertas putih, linen terang, gelap gradient linear.
// Tanpa radial, tanpa vignette gelap di latar terang. Tekstur = noise SVG (feTurbulence) sebagai tile.
import React from 'react';
import { C, W, H } from './theme';

const grain = (opacity: number, freq = 0.85) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.15  0 0 0 0 0.13  0 0 0 ${opacity} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  )}")`;

/** Ukuran default 3× frame supaya tepi tidak terlihat saat kamera bergerak. */
const big = (s = 3) => ({ left: (W - W * s) / 2, top: (H - H * s) / 2, width: W * s, height: H * s });

export const Paper: React.FC<{ color?: string; scale?: number }> = ({ color = C.paper, scale = 3 }) => (
  <div style={{ position: 'absolute', ...big(scale), backgroundColor: color, backgroundImage: grain(0.07) }} />
);

/** Linen: serat halus (noise memanjang) + cahaya linear lembut dari kiri atas (bukan vignette). */
export const Linen: React.FC<{ color?: string; scale?: number }> = ({ color = C.linen, scale = 3 }) => (
  <div
    style={{
      position: 'absolute', ...big(scale), backgroundColor: color,
      backgroundImage: [grain(0.11, 0.62), 'linear-gradient(125deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)'].join(','),
    }}
  />
);

/** Babak 3: #0B0D0F → navy #13245E, gradien LINEAR (BRIEF). */
export const DarkWall: React.FC<{ angle?: number; scale?: number }> = ({ angle = 160, scale = 3 }) => (
  <div style={{ position: 'absolute', ...big(scale), backgroundImage: `${grain(0.12)}, linear-gradient(${angle}deg, ${C.dark0} 0%, ${C.dark0} 35%, ${C.dark1} 100%)` }} />
);
