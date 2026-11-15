import React from 'react';
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from 'remotion';
import kt from './kt.json';
import heads from './heads.json';

// Kinetic typography v3: satu lapisan teks editorial, tiap kata masuk saat diucapkan.
// Posisi selalu menempel di samping kepala tokoh utama shot (dilacak per frame, heads.json), sisi yang lebih lega.
const FPS = 30;
const W = 1920, H = 1080;
const SIZE = 64;
const LINE = SIZE * 1.1;
const ORANGE = '#F7922E';
const fontFace = `@font-face{font-family:'SFDisplay';src:url('${staticFile('fonts/SFPRODISPLAYBOLD.OTF')}') format('opentype');font-weight:700;}`;

type W_ = { w: string; t: number; k: boolean };
type Chunk = { start: number; end: number; lines: W_[][]; bw: number };
type Track = { v0: number; v1: number; t: number[][] };
const tracks = Object.values(heads as Record<string, Track>);

const headAt = (fr: number): number[] | null => {
  const tr = tracks.find((s) => fr >= Math.round(s.v0 * FPS) && fr < Math.round(s.v1 * FPS));
  if (!tr) return null;
  const i = Math.min(tr.t.length - 1, Math.max(0, fr - Math.round(tr.v0 * FPS)));
  return tr.t[i];
};

// posisi blok teks untuk satu frame: samping kepala, sisi yang muat, tidak di pita bawah
const target = (fr: number, bw: number, bh: number) => {
  const h = headAt(fr);
  if (!h) return null;
  const [hx, hy, r] = h;
  const gap = r * 1.35 + 40;
  const rightX = hx + gap, leftX = hx - gap - bw;
  const fitsR = rightX + bw <= W - 56, fitsL = leftX >= 56;
  const preferRight = hx < W / 2;
  let side: 'R' | 'L' = preferRight ? (fitsR || !fitsL ? 'R' : 'L') : (fitsL || !fitsR ? 'L' : 'R');
  if (!fitsR && !fitsL) side = W - 56 - (hx + gap) > hx - gap - 56 ? 'R' : 'L';  // close-up: sisi paling lega
  let x = side === 'R' ? rightX : leftX;
  x = Math.min(Math.max(x, 56), W - 56 - bw);
  let y = hy - bh * 0.55;
  y = Math.min(Math.max(y, 54), H * 0.8 - bh);
  return { x, y, side };
};

const Word: React.FC<{ w: W_; fr: number }> = ({ w, fr }) => {
  const s = Math.round(w.t * FPS) - 1;
  const p = interpolate(fr, [s, s + 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <span style={{ display: 'inline-block', marginRight: '0.24em', color: w.k ? ORANGE : '#FFFFFF', opacity: p,
      transform: `translateY(${(1 - p) * 26}px) scale(${1.1 - 0.1 * p})`, transformOrigin: '0% 100%', filter: `blur(${(1 - p) * 8}px)` }}>
      {w.w}
    </span>
  );
};

export const Kinetic: React.FC = () => {
  const fr = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <style>{fontFace}</style>
      {(kt as Chunk[]).map((c, i) => {
        const a = Math.round(c.start * FPS), b = Math.round(c.end * FPS);
        if (fr < a || fr > b) return null;
        const bw = c.bw, bh = c.lines.length * LINE;
        const x = (c as any).x as number, y = (c as any).y as number;  // posisi terkunci per tampilan (layout4.py)
        const q = interpolate(fr, [b - 6, b], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: y, width: bw, textAlign: 'left',
            fontFamily: 'SFDisplay', fontWeight: 700, fontSize: SIZE, lineHeight: 1.1, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
            opacity: q, filter: `blur(${(1 - q) * 6}px)`, transform: `translateY(${-(1 - q) * 10}px)`,
            textShadow: '0 1px 2px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.5), 0 6px 32px rgba(0,0,0,0.65)' }}>
            {c.lines.map((ln, j) => (
              <div key={j}>{ln.map((w, k) => <Word key={k} w={w} fr={fr} />)}</div>
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
