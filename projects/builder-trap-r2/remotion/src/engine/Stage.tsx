// Stage: kamera perspektif sungguhan + 4 lapisan kedalaman (BRIEF §Kamera dan dunia).
//   <Stage pose={camPath([...])} bg={C.paper}>
//     <Layer z={-300}>  L1 latar   </Layer>
//     <Layer z={0}>     L2 dunia   </Layer>
//     <Layer z={30}>    L3 teks    </Layer>
//     <Layer z={260} blur={4}> L4 objek depan </Layer>
//   </Stage>
// Semua anak memakai koordinat dunia 1920×1080 (pojok kiri atas = 0,0). Lapisan dikompensasi skalanya
// sehingga pada pose diam (zoom 1, tengah 960,540) tampil 1:1; paralaks muncul saat kamera bergerak.
// Motion blur: saat kecepatan layar kamera > `blurAbove` px/f, dunia dirender `samples` kali pada
// subframe dalam rana 200° (references/smooth-motion.md §1) dan ditumpuk dengan bobot sama.
import React, { createContext, useContext } from 'react';
import { AbsoluteFill, useCurrentFrame, getInputProps } from 'remotion';
import { W, H } from './theme';
import { Pose, REST, screenSpeed } from './camera';

const StageCtx = createContext({ P: 1500 });

const INPUT = getInputProps() as { mbSamples?: number };

export const Stage: React.FC<{
  pose?: (f: number) => Pose;
  fov?: number; // derajat vertikal
  bg?: string;
  blurAbove?: number;
  samples?: number;
  shutter?: number; // derajat
  overlay?: React.ReactNode; // terkunci layar (hanya untuk transisi, bukan teks)
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ pose, fov = 32, bg, blurAbove = 9, samples, shutter = 200, overlay, children, style }) => {
  const f = useCurrentFrame();
  const P = H / 2 / Math.tan(((fov / 2) * Math.PI) / 180);
  const fn = pose ?? (() => REST);
  const speed = pose ? screenSpeed(fn, f) : 0;
  const n = speed > blurAbove ? Math.max(2, samples ?? INPUT.mbSamples ?? 10) : 1;
  const span = shutter / 360;
  const worlds = [];
  for (let k = 0; k < n; k++) {
    // subframe dari f - span/2 .. f + span/2 (fase −angle/2)
    const t = n === 1 ? f : f - span / 2 + (span * k) / (n - 1);
    const p = fn(t);
    const dz = P * (1 - 1 / p.zoom);
    worlds.push(
      <div key={k} style={{ position: 'absolute', inset: 0, perspective: P, perspectiveOrigin: '50% 50%', opacity: 1 / (k + 1) }}>
        <div
          style={{
            position: 'absolute', left: 0, top: 0, width: W, height: H,
            transformStyle: 'preserve-3d', transformOrigin: `${W / 2}px ${H / 2}px`,
            transform: `translateZ(${dz}px) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg) translate(${W / 2 - p.x}px, ${H / 2 - p.y}px)`,
          }}
        >
          {children}
        </div>
      </div>,
    );
  }
  return (
    <StageCtx.Provider value={{ P }}>
      <AbsoluteFill style={{ backgroundColor: bg, overflow: 'hidden', ...style }}>
        {worlds}
        {overlay}
      </AbsoluteFill>
    </StageCtx.Provider>
  );
};

/** Satu lapisan kedalaman. z > 0 = lebih dekat ke lensa. */
export const Layer: React.FC<{ z?: number; blur?: number; children: React.ReactNode; style?: React.CSSProperties; name?: string }> = ({
  z = 0, blur, children, style, name,
}) => {
  const { P } = useContext(StageCtx);
  const k = (P - z) / P; // kompensasi supaya tampil 1:1 pada pose diam
  return (
    <div
      data-layer={name}
      style={{
        position: 'absolute', left: 0, top: 0, width: W, height: H,
        transformStyle: blur ? undefined : 'preserve-3d',
        transformOrigin: `${W / 2}px ${H / 2}px`,
        transform: `translateZ(${z}px) scale(${k})`,
        filter: blur ? `blur(${blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Penempatan absolut di koordinat dunia; rotasi dan pusat opsional. */
export const Place: React.FC<{
  x: number; y: number; w?: number; h?: number; rot?: number; scale?: number; origin?: string;
  children: React.ReactNode; style?: React.CSSProperties; z?: number;
}> = ({ x, y, w, h, rot = 0, scale = 1, origin = 'center', children, style, z = 0 }) => (
  <div
    style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
      transform: `translateZ(${z}px) rotate(${rot}deg) scale(${scale})`, transformOrigin: origin, ...style,
    }}
  >
    {children}
  </div>
);
