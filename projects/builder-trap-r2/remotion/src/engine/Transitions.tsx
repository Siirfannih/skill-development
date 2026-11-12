// Transisi antar-babak: mosaik piksel (kartu 63, kotak ±8 % tinggi) dan wipe linear (tanpa radial).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, W, H, rand, clamp01, EASE } from './theme';

/**
 * Mosaik piksel layar penuh. build: [b0,b1] kotak bermunculan sampai menutup; break: [k0,k1] kotak pecah.
 * Kotak berwarna aksen + putih/kertas; urutan acak tetapi menyapu dari `from` (arah sapuan).
 */
export const PixelMosaic: React.FC<{
  build: [number, number]; brk: [number, number]; cell?: number;
  from?: 'left' | 'right' | 'top' | 'bottom';
  colors?: string[];
}> = ({ build, brk, cell = Math.round(H * 0.08), from = 'right', colors = [C.accent, C.white, C.white, C.white, C.paper, C.accentSoft, C.linen] /* aksen ±1/7 kotak (≤ 15 % area) */ }) => {
  const f = useCurrentFrame();
  if (f < build[0] || f >= brk[1]) return null;
  const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = r * cols + c;
      const dir = from === 'right' ? 1 - c / cols : from === 'left' ? c / cols : from === 'top' ? r / rows : 1 - r / rows;
      const tOn = clamp01(0.55 * dir + 0.45 * rand(id + 3));
      const tOff = clamp01(0.55 * dir + 0.45 * rand(id + 91));
      const pb = EASE.inOut(clamp01((f - build[0]) / (build[1] - build[0])));
      const pk = EASE.inOut(clamp01((f - brk[0]) / (brk[1] - brk[0])));
      const on = pb > tOn && !(f >= brk[0] && pk > tOff);
      if (!on) continue;
      const age = (pb - tOn) * (build[1] - build[0]); // frame sejak muncul
      const pop = Math.min(1, 0.6 + age * 0.2);
      const col = colors[Math.floor(rand(id * 7 + 1) * colors.length)];
      cells.push(
        <div key={id} style={{ position: 'absolute', left: c * cell, top: r * cell, width: cell, height: cell, background: col, transform: `scale(${pop})`, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)' }} />,
      );
    }
  }
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{cells}</AbsoluteFill>;
};

/**
 * Wipe linear: membuka `children` dengan tepi lembut yang bergerak dari `dir` (gradien linear, bukan radial).
 * progress 0 = tertutup, 1 = terbuka penuh.
 */
export const WipeLinear: React.FC<{ progress: number; dir?: 'down' | 'up' | 'left' | 'right'; feather?: number; children: React.ReactNode }> = ({
  progress, dir = 'down', feather = 160, children,
}) => {
  const span = (dir === 'down' || dir === 'up' ? H : W) + feather;
  const edge = -feather + progress * span; // posisi tepi dalam px dari sisi asal
  const to = { down: 'to bottom', up: 'to top', left: 'to left', right: 'to right' }[dir];
  const mask = `linear-gradient(${to}, black 0px, black ${edge}px, transparent ${edge + feather}px)`;
  return <AbsoluteFill style={{ WebkitMaskImage: mask, maskImage: mask }}>{children}</AbsoluteFill>;
};
