// Kamera 2D: (x, y) = titik dunia di tengah layar, zoom = skala. Semua anak (video, cetakan, TEKS) ada di dunia yang sama,
// jadi kamera melewati teks (Lantai B12). Motion blur: bila kecepatan layar > blurAbove px/f, dunia digambar `samples`
// kali pada subframe dalam rana 200° (smooth-motion.md §1, §6).
import React from 'react';
import { AbsoluteFill, getInputProps, useCurrentFrame } from 'remotion';
import { W, H } from './theme';
import { Pose, Key, camPath, screenSpeed } from './camera';
import { FilmLook, FilmLevel } from './Film';

const INPUT = getInputProps() as { mbSamples?: number };

/** pose yang menahan titik dunia (fx, fy) di posisi layarnya sendiri saat zoom z (push ke objek). */
export const zoomAt = (fx: number, fy: number, z: number) => ({ x: fx - (fx - W / 2) / z, y: fy - (fy - H / 2) / z, zoom: z });

export const path = (keys: Key[], opts?: { sigma?: number; cuts?: number[] }) => camPath(keys, opts);

/** titik layar (sx, sy) pada pose p -> titik dunia */
export const toWorld = (p: Pose, sx: number, sy: number) => ({ x: p.x + (sx - W / 2) / p.zoom, y: p.y + (sy - H / 2) / p.zoom });

const tf = (p: Pose) => `translate(${W / 2}px, ${H / 2}px) scale(${p.zoom}) translate(${-p.x}px, ${-p.y}px)`;

export const Cam: React.FC<{
  pose: (f: number) => Pose; bg?: string; blurAbove?: number; samples?: number; style?: React.CSSProperties;
  film?: FilmLevel; // r5: lapisan film di atas footage
  text?: React.ReactNode; // r5: teks digambar di atas lapisan film, di dunia kamera yang sama
  children: React.ReactNode;
}> = ({ pose, bg, blurAbove = 7, samples, style, film, text, children }) => {
  const f = useCurrentFrame();
  const speed = screenSpeed(pose, f);
  const n = speed > blurAbove ? Math.max(2, samples ?? INPUT.mbSamples ?? 8) : 1;
  const span = 200 / 360;
  const worlds = (content: React.ReactNode, key: string) => {
    const out = [];
    for (let k = 0; k < n; k++) {
      const t = n === 1 ? f : f - span / 2 + (span * k) / (n - 1);
      out.push(
        <div key={key + k} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transformOrigin: '0 0', transform: tf(pose(t)), opacity: 1 / (k + 1) }}>
          {content}
        </div>,
      );
    }
    return out;
  };
  const foot = <AbsoluteFill style={{ backgroundColor: bg }}>{worlds(children, 'w')}</AbsoluteFill>;
  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: 'hidden', ...style }}>
      {film ? <FilmLook level={film}>{foot}</FilmLook> : foot}
      {text ? worlds(text, 't') : null}
    </AbsoluteFill>
  );
};
