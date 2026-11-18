import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Fonts} from '../bersama/Fonts';
import {FONT, NETRAL} from '../bersama/tema';
import {move} from '../../lib/curves';
import {active, Phrase, type Cue} from './UIWords';
import {deskTransform} from './BlenderPlane';

export type SurfaceProps = {durasi: number; t0: number; cues: Cue[]; kind: 'face' | 'blender' | 'intro';
  camera?: {start: number; end: number; zoom: [number, number]; center: [number, number]}[];
  slab?: {x: number; y: number; size: number; scaleX?: number};
  blender?: {start: number; end: number}};

export const SurfaceText: React.FC<SurfaceProps> = p => {
  const f = useCurrentFrame(), {fps} = useVideoConfig(), t = p.t0 + f / fps;
  const cue = p.cues.find(x => active(x, t));
  let transform = '', left = 960, top = 800;
  let transitionTag = false;
  if (p.kind === 'face' || p.kind === 'intro') {
    const c = p.camera?.find(x => t >= x.start && t < x.end);
    const z = c ? c.zoom[0] + (c.zoom[1] - c.zoom[0]) * (t - c.start) / (c.end - c.start) : 1;
    const cx = c?.center[0] ?? .5, cy = c?.center[1] ?? .45;
    left = 960 * z + 1920 * (1 - z) * cx;
    top = 750 * z + 1080 * (1 - z) * cy;
    transform = `translateX(-50%) scale(${z})`;
    if (p.kind === 'face' && t >= 34.38954 && t < 35.19354) {
      const grow = move((t - 23.59354) * fps, 10.796 * fps, 14, 'heavy');
      const pCircle = 1 - grow;
      const radius = Math.hypot(960, 540) * grow + 190 * pCircle;
      const zFace = 1.0001 + (1.0376 - 1.0001) * grow;
      const cxp = 960 + 690 * pCircle, cyp = 540 + 310 * pCircle;
      const tx = (950 * zFace + 960 * (1 - zFace)) * grow + 1650 * pCircle;
      const ty = (430 * zFace + 540 * (1 - zFace)) * grow + 850 * pCircle;
      const need = Math.max((tx - Math.max(0, cxp - radius)) / 950,
        (Math.min(1920, cxp + radius) - tx) / 970,
        (ty - Math.max(0, cyp - radius)) / 430,
        (Math.min(1080, cyp + radius) - ty) / 650);
      const sc = Math.max(zFace + (.62 - zFace) * pCircle, need * 1.01);
      left = tx + 10 * sc - 300 * pCircle;
      top = (750 * zFace + 540 * (1 - zFace)) * grow + 950 * pCircle;
      transform = `translateX(-50%) scale(${.95 + .05 * grow})`;
      transitionTag = pCircle > .02;
    }
    if (p.kind === 'intro' && t >= 1.53821) {
      const shrink = move((t - 1.53821) * fps, 0, 18, 'heavy');
      left = 960 + 690 * shrink;
      top = 790 * (1 - shrink) + 950 * shrink;
      transform = 'translateX(-50%)';
    }
  }
  if (p.kind === 'blender') {
    // The saved Blender camera moves linearly on its viewing axis (1.15 → 1.30).
    // A plane through its target projects with this same scale and fixed vanishing point.
    const a = p.blender?.start ?? 72.07534, b = p.blender?.end ?? 76.40967;
    const u = Math.max(0, Math.min(1, (t - a) / (b - a)));
    const z = (1 / 1.15) / ((1 - u) / 1.15 + u / 1.30);
    if (cue?.id === 'T081') {
      left = p.slab?.x ?? 285; top = p.slab?.y ?? 398;
      transform = `translate(${(left - 960) * (z - 1)}px,${(top - 540) * (z - 1)}px) scale(${z * (p.slab?.scaleX ?? 1)},${z})`;
    } else {
      left = 0; top = 0;
      transform = deskTransform(u);
    }
  }
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    {cue && <div style={{position: 'absolute', left, top, transform, transformOrigin: p.kind === 'blender' ? '0 0' : '50% 50%',
      background: transitionTag ? 'rgba(8,6,8,.76)' : undefined, borderRadius: transitionTag ? 15 : undefined,
      padding: transitionTag ? '6px 14px' : undefined, backdropFilter: transitionTag ? 'blur(18px)' : undefined,
      textShadow: p.kind === 'face' || p.kind === 'intro' ? '0 2px 3px rgba(8,6,8,.9)' : undefined}}>
      <Phrase cue={cue} t={t} single={cue.id !== 'T081'}
        size={cue.id === 'T081' ? (p.slab?.size ?? 110) : 64}
        color={NETRAL.hangat} font={cue.id === 'T081' ? FONT.anton : p.kind === 'blender' ? FONT.sf : FONT.poppins}/>
    </div>}
  </AbsoluteFill>;
};
