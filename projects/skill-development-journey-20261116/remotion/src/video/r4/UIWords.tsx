import React from 'react';
import {useVideoConfig} from 'remotion';
import {move} from '../../lib/curves';
import {FONT, NETRAL} from '../bersama/tema';

export type Word = {text: string; on: number; off: number};
export type Cue = {id: string; start: number; end: number; words: Word[]};

export const active = (cue: Cue | undefined, t: number) => Boolean(cue && t >= cue.start && t < cue.end);

export const Phrase: React.FC<{cue?: Cue; t: number; size?: number; color?: string; single?: boolean; font?: string}> =
  ({cue, t, size = 60, color = NETRAL.hitam, single, font = FONT.sf}) => {
    const {fps} = useVideoConfig();
    if (!cue || !active(cue, t)) return null;
    const now = cue.words.filter(w => t >= w.on);
    const shown = single ? now.slice(-1) : now;
    return <span style={{display: 'inline-flex', gap: '.22em', whiteSpace: 'nowrap', fontFamily: font, fontWeight: font === FONT.anton ? 400 : 700,
      fontSize: size, lineHeight: 1.1, letterSpacing: '-.025em', color}}>
      {shown.map(w => {
        const p = move(t * fps, w.on * fps, 3, 'reveal');
        return <span key={w.on} style={{display: 'inline-block', transformOrigin: '50% 85%',
          transform: `translateY(${(1 - p) * 12}px) scale(${.9 + .1 * p})`}}>{w.text}</span>;
      })}
    </span>;
  };

export const Glass: React.FC<{children: React.ReactNode; dark?: boolean; style?: React.CSSProperties}> = ({children, dark, style}) =>
  <div style={{padding: '10px 18px', borderRadius: 20, background: dark ? 'rgba(8,6,8,.76)' : 'rgba(255,255,255,.16)',
    backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,.3)', boxShadow: '0 5px 16px rgba(8,6,8,.12)', ...style}}>{children}</div>;
