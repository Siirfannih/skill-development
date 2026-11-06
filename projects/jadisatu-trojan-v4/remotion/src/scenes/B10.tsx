// Beat 10 · Kredit ala 08 (MADE BY A HUMAN): layar gelap, kalimat kecil, logo Jadisatu; bubble pembuka kembali kecil di samping logo (BK10).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { WORDS, beat, clean, fr, we } from '../lib/time';
import { eo, pop, mix } from '../lib/anim';
import { IE, Logo, MBlur } from '../ui/common';
import { Bubble } from '../ui/wa';

const W = WORDS.filter((w) => w.b === 'b10');
export const B10: React.FC = () => {
  const f = useCurrentFrame();
  const { s } = beat('b10');
  if (f < s - 3) return null;
  const tEnd = we('b10', 'bikin');
  const up = eo(f, tEnd + 10, 16);
  const logo = pop(f, tEnd + 14, 30, 16, 150);
  const bub = pop(f, tEnd + 26, 30, 14, 190);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: mix(510, 360, up), display: 'flex', justifyContent: 'center', gap: 11, opacity: 1 - 0.45 * up }}>
        {W.map((w, i) => { const p = eo(f, fr(w.s) - 2, 7); return (
          <MBlur key={i} y={(1 - p) * 6} style={{ opacity: p, transform: `translateY(${(1 - p) * 12}px)`, maxWidth: p * 400, marginRight: p < 0.02 ? -11 : 0, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 40, fontWeight: 600, color: '#F4F5F7', letterSpacing: '-0.01em' }}>{clean(w.w)}</span>
          </MBlur>); })}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34 }}>
        <div style={{ transform: `scale(${logo})`, opacity: Math.min(1, logo) }}><Logo scale={3.2} dark /></div>
        <div style={{ width: 360, transform: `scale(${bub * 1.5})`, transformOrigin: '0 50%', opacity: Math.min(1, bub) }}>
          <Bubble m={{ id: 'end', side: 'in', time: '19.02', a: 1, body: <>udah makan belum? <IE n="pleading_face" /></> }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
