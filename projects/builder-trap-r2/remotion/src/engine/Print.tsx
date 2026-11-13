// Cetakan fisik: bingkai putih, bayangan jatuh, pin, rotasi kecil, aberasi kromatik tipis di tepi (RESEP §Warna).
import React from 'react';
import { C } from './theme';

/** campur warna hex dengan putih (t>0) atau hitam (t<0) */
const shade = (hex: string, t: number) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(t >= 0 ? v + (255 - v) * t : v * (1 + t)));
  return `rgb(${ch.join(',')})`;
};

/** Pin: gradien diturunkan dari `color` (r3a: tidak lagi biru tetap #6F8DFF/#102480, jadi pin netral bisa dipakai di gelap). */
export const Pin: React.FC<{ x: number; y: number; size?: number; color?: string }> = ({ x, y, size = 30, color = C.accent }) => (
  <div style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size }}>
    {/* bayangan pin di kertas */}
    <div style={{ position: 'absolute', left: size * 0.35, top: size * 0.55, width: size * 0.9, height: size * 0.5, borderRadius: '50%', background: 'rgba(30,28,24,0.28)', filter: `blur(${size * 0.12}px)` }} />
    <div
      style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: `linear-gradient(145deg, ${shade(color, 0.38)} 0%, ${color} 45%, ${shade(color, -0.4)} 100%)`,
        boxShadow: `inset 0 -${size * 0.08}px ${size * 0.12}px rgba(0,0,0,0.25)`,
      }}
    />
    <div style={{ position: 'absolute', left: size * 0.22, top: size * 0.16, width: size * 0.3, height: size * 0.2, borderRadius: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0))' }} />
  </div>
);

export const Print: React.FC<{
  x: number; y: number; w: number; h: number; rot?: number;
  border?: number; pin?: boolean; aberration?: boolean;
  children?: React.ReactNode; style?: React.CSSProperties;
}> = ({ x, y, w, h, rot = 0, border = 16, pin = true, aberration = true, children, style }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: `rotate(${rot}deg)`, ...style }}>
    <div
      style={{
        position: 'absolute', inset: 0, background: '#FDFDFB', borderRadius: 3,
        boxShadow: '0 22px 38px rgba(40,39,35,0.24), 0 6px 12px rgba(40,39,35,0.16), 0 1px 2px rgba(40,39,35,0.2)',
      }}
    />
    <div style={{ position: 'absolute', left: border, top: border, width: w - 2 * border, height: h - 2 * border, overflow: 'hidden', background: '#222' }}>
      {children}
      {/* kilap kertas foto: gradien linear tipis */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)' }} />
    </div>
    {aberration ? (
      <>
        <div style={{ position: 'absolute', left: border - 1.5, top: border, width: w - 2 * border, height: h - 2 * border, boxShadow: 'inset 2px 0 0 rgba(255,40,60,0.22), inset 0 2px 0 rgba(255,40,60,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: border + 1.5, top: border, width: w - 2 * border, height: h - 2 * border, boxShadow: 'inset -2px 0 0 rgba(0,190,255,0.22), inset 0 -2px 0 rgba(0,190,255,0.12)', pointerEvents: 'none' }} />
      </>
    ) : null}
    {pin ? <Pin x={w / 2} y={border * 0.9} /> : null}
  </div>
);
