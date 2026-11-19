import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BubbleSapa, type BubbleProps} from '../BubbleSapa';
import {KarakterLayer, type KarakterProps, kotak} from '../KarakterLayer';
import {NETRAL} from '../tema';

export type AppuiFrame = {x: number; y: number; s: number; mask?: number; bahu?: {sudut: number; lebar: number}};
export type TokohR7Props = {
  jenis: 'tokoh' | 'bubble'; w: number; h: number; durasi: number;
  frames: AppuiFrame[]; karakter?: KarakterProps; bubble?: BubbleProps;
};

export const TokohR7: React.FC<TokohR7Props> = (p) => {
  const f = useCurrentFrame();
  const a = p.frames[Math.min(f, p.frames.length - 1)];
  const kp = p.karakter;
  const box = kp ? kotak(kp.u) : {w: 0, h: 0};
  return <AbsoluteFill style={{background: 'transparent', clipPath: a.mask === undefined ? undefined : `inset(0 0 0 ${a.mask}px)`}}>
    {kp && <>
      <div style={{position: 'absolute', left: a.x, top: a.y, transformOrigin: '0 0', transform: `rotate(${a.bahu?.sudut ?? 0}deg)`}}>
      <div style={{position: 'absolute', left: a.bahu ? -a.bahu.lebar / 2 : (kp.tumpuX ?? 0) * kp.u * a.s - kp.u * 1.3 * a.s, top: -2 * a.s,
        width: a.bahu?.lebar ?? kp.u * 2.6 * a.s, height: a.bahu ? 7 * a.s : 5 * a.s, borderRadius: '50%', background: NETRAL.hitam,
        opacity: 0.32, filter: a.bahu ? 'blur(3px)' : 'blur(1px)'}}/>
      <div style={{position: 'absolute', left: -box.w * a.s / 2, top: -(17 * kp.u + 40) * a.s,
        width: box.w, height: box.h, transformOrigin: '0 0', transform: `scale(${a.s})`}}>
        <KarakterLayer {...kp} tumpuX={a.bahu ? 0 : kp.tumpuX}/>
      </div>
      </div>
    </>}
    {p.bubble && <div style={{position: 'absolute', left: a.x, top: a.y, width: p.bubble.w, height: p.bubble.h,
      transformOrigin: '0 0', transform: `scale(${a.s})`}}><BubbleSapa {...p.bubble}/></div>}
  </AbsoluteFill>;
};
