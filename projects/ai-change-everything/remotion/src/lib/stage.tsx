import React, {createContext, useContext} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Key, Pose, useCamTrack} from './camera';
import {W, H} from './theme';

const CamCtx = createContext<Pose>({x: 0, y: 0, s: 1, r: 0});
export const useCam = () => useContext(CamCtx);

/**
 * Panggung 2.5D: kamera yang bergerak, objek diam di dunia.
 * keys memakai frame LOKAL (frame di dalam Sequence).
 */
export const Stage: React.FC<{keys: Key[]; len: number; bg: string; children: React.ReactNode}> = ({keys, len, bg, children}) => {
  const f = useCurrentFrame();
  const track = useCamTrack(keys, len);
  const pose = track[Math.max(0, Math.min(len - 1, f))];
  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
      <CamCtx.Provider value={pose}>{children}</CamCtx.Provider>
    </AbsoluteFill>
  );
};

/** Kedalaman: BG 0.55 · MID 1 · TXT 1.3 */
export const DEPTH = {BG: 0.55, MID: 1, TXT: 1.3} as const;

export const Layer: React.FC<{depth: number; children: React.ReactNode; perspective?: number; style?: React.CSSProperties}> = ({
  depth,
  children,
  perspective,
  style,
}) => {
  const p = useCam();
  const s = Math.pow(p.s, depth);
  return (
    <AbsoluteFill style={{perspective: perspective ? `${perspective}px` : undefined, ...style}}>
      <div
        style={{
          position: 'absolute',
          left: W / 2,
          top: H / 2,
          width: 0,
          height: 0,
          transform: `rotate(${(p.r ?? 0) * depth}deg) scale(${s}) translate(${-p.x * depth}px, ${-p.y * depth}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

/** Menaruh elemen di koordinat dunia (pusat = 0,0), berpusat di titik itu. */
export const At: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  anchor?: 'center' | 'left';
}> = ({x = 0, y = 0, w, h, style, children, anchor = 'center'}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      transform: anchor === 'center' ? 'translate(-50%,-50%)' : 'translate(0,-50%)',
      transformStyle: 'preserve-3d',
      ...style,
    }}
  >
    {children}
  </div>
);
