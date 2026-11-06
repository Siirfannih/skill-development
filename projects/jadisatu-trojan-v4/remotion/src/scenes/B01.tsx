// Beat 1 · Hook: pertanyaan dibangun kata per kata (BK01, gaya 09), emoji di sekelilingnya, bubble chat "ayang" → "jual 12 risol 60rb".
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { WORDS, beat, clean, fr, wf } from '../lib/time';
import { EASE, clamp, eo, pop, mix } from '../lib/anim';
import { Brand, Emoji, IE, MBlur, WA } from '../ui/common';
import { Bubble } from '../ui/wa';

const W = WORDS.filter((w) => w.b === 'b01');
const LINES = [[0, 6], [6, 10], [10, 12]]; // "Gimana … itu" · "semudah … ayang" · "di WhatsApp?"

export const B01: React.FC = () => {
  const f = useCurrentFrame();
  const end = beat('b02').s;
  if (f >= end + 2) return null;
  const tAyang = wf('b01', 'ayang'), tWA = wf('b01', 'WhatsApp'), tSem = wf('b01', 'semudah'), tDi = wf('b01', 'di');
  // exit: whip ke kiri dengan blur (cut on motion ke beat 2)
  const xo = interpolate(f, [end - 7, end + 1], [0, -2100], { ...clamp, easing: (t) => t * t * t });
  const vx = Math.abs(interpolate(f + 0.5, [end - 7, end + 1], [0, -2100], { ...clamp, easing: (t) => t * t * t }) - xo) * 0.35;
  const li = LINES.findIndex(([a, b]) => { const s0 = fr(W[a].s) - 3; const s1 = b < W.length ? fr(W[b].s) - 3 : 9999; return f >= s0 && f < s1; });
  // BK01: grup naik saat bubble masuk
  const lift = eo(f, tAyang - 2, 12);
  return (
    <AbsoluteFill>
      <MBlur x={vx} style={{ position: 'absolute', inset: 0, transform: `translateX(${xo}px)` }}>
        {/* kalimat: satu baris per momen */}
        {li >= 0 && (() => {
          const [a, b] = LINES[li];
          const words = W.slice(a, b);
          const big = li === 2 ? 1.12 : 1;
          return (
            <div style={{ position: 'absolute', left: 0, right: 0, top: mix(470, 300, lift), display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, transform: `scale(${mix(1, 0.86, lift) * big})` }}>
              {words.map((w, i) => {
                const s = fr(w.s) - 2; const p = eo(f, s, 8);
                const isWA = clean(w.w).startsWith('WhatsApp');
                const accent = clean(w.w) === 'ayang';
                return (
                  <MBlur key={i} y={(1 - p) * 8} style={{ opacity: p, transform: `translateY(${(1 - p) * 34}px)` }}>
                    <span style={{ fontSize: 92, fontWeight: 800, letterSpacing: '-0.03em', color: accent ? '#2563EB' : '#0F172A', display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                      {isWA && <span style={{ transform: `scale(${pop(f, s)})`, display: 'inline-flex' }}><Brand icon={WA} size={84} /></span>}
                      {clean(w.w)}
                    </span>
                  </MBlur>
                );
              })}
            </div>
          );
        })()}
        {/* emoji melayang di sekitar kalimat (09) */}
        {[
          { n: 'ledger', x: 330, y: 250, t: wf('b01', 'nyatet'), s: 150, r: -12 },
          { n: 'money_bag', x: 1480, y: 230, t: wf('b01', 'keuangan'), s: 160, r: 10 },
          { n: 'speech_balloon', x: 420, y: 690, t: 0, s: 140, r: -6 },
          { n: 'smiling_face_with_hearts', x: 1430, y: 650, t: tAyang, s: 150, r: 8 },
          { n: 'red_heart', x: 1600, y: 470, t: tAyang + 4, s: 90, r: 14 },
        ].map((e, i) => {
          const p = pop(f, e.t);
          const bob = Math.sin((f + i * 20) / 18) * 10;
          return <div key={e.n} style={{ position: 'absolute', left: e.x, top: e.y + bob, transform: `translate(-50%,-50%) scale(${p}) rotate(${e.r + Math.sin((f + i * 9) / 25) * 4}deg)` }}><Emoji n={e.n} size={e.s} /></div>;
        })}
        {/* bubble chat */}
        <div style={{ position: 'absolute', left: 660, width: 600, top: 470 }}>
          <div style={{ transform: 'scale(1.55)', transformOrigin: '50% 0' }}>
            <Bubble m={{ id: 'a', side: 'in', time: '19.02', a: pop(f, tAyang + 2, 30, 14, 200), body: <>udah makan belum? <IE n="pleading_face" /></> }} />
            {(() => {
              const t0 = tWA + 4; const a = pop(f, t0, 30, 14, 200);
              const morph = eo(f, t0 + 8, 10);
              return <Bubble m={{ id: 'b', side: 'out', time: '19.03', a, body: (
                <span style={{ position: 'relative', display: 'inline-block', minWidth: 170 }}>
                  <span style={{ opacity: 1 - morph, filter: `blur(${morph * 6}px)`, position: morph > 0.5 ? 'absolute' : 'relative' }}>udah dong <IE n="face_savoring_food" /></span>
                  <span style={{ opacity: morph, filter: `blur(${(1 - morph) * 6}px)`, position: morph > 0.5 ? 'relative' : 'absolute', left: 0, top: 0, fontWeight: 600 }}>jual 12 risol 60rb</span>
                </span>) }} />;
            })()}
          </div>
        </div>
      </MBlur>
    </AbsoluteFill>
  );
};
