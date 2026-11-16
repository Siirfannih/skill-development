// Media dan material: klip video (frame lokal dijepit, tahan frame terakhir), wajah tersinkron, cetakan foto,
// meja kertas gelap, grain, vignette (BRIEF: vignette di b-roll boleh; dibuat dengan inset shadow, bukan gradien radial).
import React from 'react';
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { C, W, H } from './theme';

/** Klip dari public/v. `start` = frame komposisi saat klip frame 0; sebelum itu tahan frame 0, sesudah habis tahan akhir. */
export const Clip: React.FC<{ src: string; start: number; dur: number; style?: React.CSSProperties; filter?: string }> = ({ src, start, dur, style, filter }) => {
  const f = useCurrentFrame();
  const local = Math.max(0, Math.min(f - start, Math.floor(dur * 30) - 3));
  return (
    <Sequence from={f - local} layout="none">
      <OffthreadVideo src={staticFile('v/' + src)} muted style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover', filter, maxWidth: 'none', ...style }} />
    </Sequence>
  );
};

/** Crop wajah (koordinat sumber ternormal): left/top = pojok kiri atas jendela, cw = lebar jendela (rasio 16:9 tetap). */
export type Crop = { left: number; top: number; cw: number };
export const GRADE_WAJAH = 'contrast(1.12) saturate(0.92) sepia(0.10) brightness(0.86)';
export const Wajah: React.FC<{ crop: Crop; filter?: string }> = ({ crop, filter = GRADE_WAJAH }) => {
  const w = W / crop.cw, h = H / crop.cw;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden' }}>
      <Clip src="wajah.mp4" start={0} dur={46.1} filter={filter} style={{ left: -crop.left * w, top: -crop.top * h, width: w, height: h, objectFit: 'fill' }} />
    </div>
  );
};

/** Grain monokrom per frame (seed = frame). */
export const Grain: React.FC<{ opacity?: number; freq?: number }> = ({ opacity = 0.16, freq = 0.85 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
      <svg width={W} height={H}>
        <filter id={`g${f}`}>
          <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={f % 97} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={W} height={H} filter={`url(#g${f})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Vignette: inset shadow (sudut ±0,6× terang tengah). */
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.6 }) => (
  <AbsoluteFill style={{ boxShadow: `inset 0 0 ${H * 0.42}px ${H * 0.12}px rgba(8,7,6,${strength})`, pointerEvents: 'none' }} />
);

/** Scrim gelap lokal linear (bukan kotak): sudut/arah CSS, kekuatan 0..1, sampai berapa % memudar. */
export const Scrim: React.FC<{ dir: string; a?: number; to?: number }> = ({ dir, a = 0.7, to = 60 }) => (
  <AbsoluteFill style={{ background: `linear-gradient(${dir}, rgba(14,13,12,${a}) 0%, rgba(14,13,12,${a * 0.6}) ${to * 0.5}%, rgba(14,13,12,0) ${to}%)`, pointerEvents: 'none' }} />
);

/** Canvas hitam rata; statis di dunia kamera. */
export const Paper: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: C.hitam }} />
);

/** Cetakan foto fisik: bingkai putih #F4F1EA, bayangan jatuh di meja gelap, kilap tipis. Anak = isi foto (video). */
export const Print: React.FC<{ cx: number; cy: number; w: number; h: number; rot?: number; border?: number; children: React.ReactNode }> = ({
  cx, cy, w, h, rot = 0, border = 20, children,
}) => (
  <div style={{ position: 'absolute', left: cx - w / 2 - border, top: cy - h / 2 - border, width: w + 2 * border, height: h + 2 * border, transform: `rotate(${rot}deg)` }}>
    <div style={{ position: 'absolute', inset: 0, background: C.putih, borderRadius: 2, boxShadow: '18px 30px 46px rgba(0,0,0,0.78), 4px 8px 12px rgba(0,0,0,0.6)' }} />
    <div style={{ position: 'absolute', left: border, top: border, width: w, height: h, overflow: 'hidden', background: '#111' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `scale(${w / W})`, transformOrigin: '0 0' }}>{children}</div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.05) 100%)' }} />
    </div>
  </div>
);
