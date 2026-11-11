import React, { createContext, useContext } from 'react';
import { AbsoluteFill } from 'remotion';

// 2.5D stage: a real perspective camera moving through flat layers at different depths.
// Layer order (Irfan 11 Nov): L1 background (far) · L2 footage/world · L3 text · L4 visual objects (near).
// Content inside a Layer is authored in screen px: the layer is pre-scaled so it reads 1:1 when the
// camera is at z = 0. Moving the camera then gives true parallax; near layers can pass the lens.
export const PERSP = 1600;
export type Cam = { x?: number; y?: number; z?: number; rx?: number; ry?: number; rz?: number };
const CamCtx = createContext<Required<Cam>>({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 });
export const useCam = () => useContext(CamCtx);

export const Stage: React.FC<{ cam: Cam; children: React.ReactNode }> = ({ cam, children }) => {
  const c = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, ...cam };
  return (
    <CamCtx.Provider value={c}>
      <AbsoluteFill style={{ perspective: PERSP, perspectiveOrigin: '50% 50%', overflow: 'hidden' }}>
        <AbsoluteFill style={{
          transformStyle: 'preserve-3d',
          transform: `translateZ(${c.z}px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) rotateZ(${c.rz}deg) translate3d(${-c.x}px, ${-c.y}px, 0)`,
        }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </CamCtx.Provider>
  );
};

// depth-of-field: blur grows with distance from the focus plane; layers fade as they reach the lens
export const Layer: React.FC<{ z: number; children: React.ReactNode; focus?: number; dof?: number; style?: React.CSSProperties; name?: string }> = ({ z, children, focus, dof = 0, style }) => {
  const cam = useCam();
  const s = (PERSP - z) / PERSP;
  const eff = z + cam.z; // distance travelled toward the lens
  const near = PERSP - eff; // remaining distance to the lens
  const op = near < 120 ? 0 : near < 520 ? (near - 120) / 400 : 1;
  const blur = dof && focus !== undefined ? Math.min(14, Math.abs(eff - focus) * dof) : 0;
  if (op <= 0) return null;
  return (
    <AbsoluteFill style={{ transformStyle: 'preserve-3d', transform: `translateZ(${z}px) scale(${s})`, opacity: op, filter: blur > 0.3 ? `blur(${blur}px)` : undefined, ...style }}>
      {children}
    </AbsoluteFill>
  );
};
