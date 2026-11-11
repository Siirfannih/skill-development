import React from 'react';
import { interpolate, Easing, random } from 'remotion';

// Kinetic type library for this video, mapped to typography.md §8 codes.
// Roles move differently (R1 narasi, R2 kata kunci, R3 klaim, R4 label, R6 hero); exits move, never fade alone.
const C = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const IN = Easing.bezier(0.16, 1, 0.3, 1), OUT = Easing.bezier(0.7, 0, 0.84, 0);
const f = (n: number) => n / 30;
export type Fonts = { display: string; text: string; serif: string; mono: string };
type Base = { t: number; at: number; out: number; x: number; y: number; color?: string; fonts: Fonts; shadow?: boolean };
const sh = (on?: boolean) => (on ? '0 4px 24px rgba(0,0,0,0.35)' : 'none');
// T15 smear exit: scale X 100→160 + directional blur, 5 f
const smear = (t: number, out: number) => {
  const k = interpolate(t, [out - f(5), out], [0, 1], { ...C, easing: OUT });
  return { transform: `scaleX(${1 + k * 0.6}) translateX(${k * 60}px)`, filter: `blur(${k * 10}px)`, opacity: 1 - k * k };
};
const live = (t: number, at: number, out: number) => t >= at - f(1) && t <= out;

// T30 spin Z + scale (hook word)
export const SpinPop: React.FC<Base & { text: string; size: number; weight?: number }> = ({ t, at, out, x, y, text, size, color = '#fff', fonts, shadow, weight = 800 }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(9)], [0, 1], { ...C, easing: IN });
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, transformOrigin: '0% 60%', transform: `rotate(${(1 - k) * -28}deg) scale(${0.6 + k * 0.4})` }}>
    <div style={{ fontFamily: fonts.display, fontWeight: weight, fontSize: size, color, letterSpacing: '-0.04em', lineHeight: 1, textShadow: sh(shadow), whiteSpace: 'nowrap', ...s }}>{text}</div>
  </div>;
};

// Stack pair (ref pedro P-T3) + T01 word rise behind a baseline mask
export const StackPair: React.FC<Base & { small: string; big: string; size: number }> = ({ t, at, out, x, y, small, big, size, color = '#fff', fonts, shadow }) => {
  if (!live(t, at - f(6), out)) return null;
  const k1 = interpolate(t, [at - f(6), at + f(4)], [0, 1], { ...C, easing: IN });
  const k2 = interpolate(t, [at, at + f(12)], [0, 1], { ...C, easing: IN });
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, ...s }}>
    <div style={{ overflow: 'hidden', height: size * 0.5 }}><div style={{ fontFamily: fonts.text, fontWeight: 500, fontSize: size * 0.42, color, opacity: 0.85, transform: `translateY(${(1 - k1) * 140}%)`, textShadow: sh(shadow) }}>{small}</div></div>
    <div style={{ overflow: 'hidden', height: size * 1.12 }}><div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: size, lineHeight: 1.05, color, letterSpacing: '-0.035em', transform: `translateY(${(1 - k2) * 140}%)`, textShadow: sh(shadow), whiteSpace: 'nowrap' }}>{big}</div></div>
  </div>;
};

// T02 blur-to-focus in, T14 letter scatter out (serif italic, reflective)
export const BlurScatter: React.FC<Base & { text: string; size: number }> = ({ t, at, out, x, y, text, size, color = '#fff', fonts, shadow }) => {
  if (!live(t, at, out + f(14))) return null;
  const k = interpolate(t, [at, at + f(10)], [0, 1], { ...C, easing: IN });
  const g = interpolate(t, [out - f(4), out + f(14)], [0, 1], { ...C, easing: Easing.in(Easing.quad) });
  return <div style={{ position: 'absolute', left: x, top: y, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: size, color, whiteSpace: 'nowrap', filter: `blur(${(1 - k) * 12}px)`, opacity: k, textShadow: sh(shadow) }}>
    {text.split('').map((ch, i) => {
      const r = random(text + i);
      return <span key={i} style={{ display: 'inline-block', transform: `translate(${g * (r - 0.5) * 120}px, ${g * g * (160 + r * 220)}px) rotate(${g * (r - 0.5) * 140}deg)`, opacity: 1 - g * g }}>{ch === ' ' ? ' ' : ch}</span>;
    })}
  </div>;
};

// T16 counter roll then suffix
export const Counter: React.FC<Base & { to: number; suffix: string; size: number }> = ({ t, at, out, x, y, to, suffix, size, color = '#fff', fonts, shadow }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(20)], [0, 1], { ...C, easing: Easing.out(Easing.exp) });
  const val = Math.round(k * to);
  const suf = interpolate(t, [at + f(16), at + f(24)], [0, 1], { ...C, easing: IN });
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'baseline', fontFamily: fonts.display, fontWeight: 800, fontSize: size, color, letterSpacing: '-0.04em', lineHeight: 1, textShadow: sh(shadow), ...s }}>
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{val}</span>
    <span style={{ display: 'inline-block', overflow: 'hidden' }}><span style={{ display: 'inline-block', transform: `translateY(${(1 - suf) * 110}%)` }}>{suffix}</span></span>
  </div>;
};

// G4 / T20 color flash: fill in accent with travel + blur, settle to ink
export const ColorFlash: React.FC<Base & { text: string; size: number; accent: string }> = ({ t, at, out, x, y, text, size, color = '#000', accent, fonts }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(8)], [0, 1], { ...C, easing: IN });
  const settle = interpolate(t, [at + f(10), at + f(18)], [0, 1], C);
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, fontFamily: fonts.display, fontWeight: 800, fontSize: size, letterSpacing: '-0.035em', lineHeight: 1, color: settle > 0.5 ? color : accent, transform: `translateX(${(1 - k) * 110}px)`, filter: `blur(${(1 - k) * 8}px)`, whiteSpace: 'nowrap', ...s }}>{text}</div>;
};

// T03 slam + C14 shake (claim)
export const Slam: React.FC<Base & { text: string; size: number }> = ({ t, at, out, x, y, text, size, color = '#000', fonts }) => {
  if (!live(t, at, out)) return null;
  const fr = (t - at) * 30;
  const sc = fr < 1 ? 2.0 : fr < 2 ? 1.3 : 1.0;
  const ry = fr < 1 ? 15 : fr < 2 ? 6 : 0;
  const shk = fr < 9 ? Math.sin(fr * 2.4) * (9 - fr) * 1.2 : 0;
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, width: 0, display: 'flex', justifyContent: 'center' }}>
    <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: size, color, letterSpacing: '0.02em', lineHeight: 1, whiteSpace: 'nowrap', transform: `perspective(900px) rotateY(${ry}deg) scale(${sc}) translateX(${shk}px)`, filter: fr < 2 ? 'blur(3px)' : undefined, ...s }}>{text}</div>
  </div>;
};

// T04 scale-down settle (hero, max 2 per video)
export const ScaleSettle: React.FC<Base & { text: string; size: number }> = ({ t, at, out, x, y, text, size, color = '#fff', fonts, shadow }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(10)], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, transformOrigin: '0% 80%', transform: `scale(${3 - k * 2})`, opacity: Math.min(1, k * 3) }}>
    <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: size, color, letterSpacing: '-0.04em', lineHeight: 1, textShadow: sh(shadow), whiteSpace: 'nowrap', filter: `blur(${(1 - k) * 6}px)`, ...s }}>{text}</div>
  </div>;
};

// T07 slot swap: words replace each other in one slot, faster each time; small lead line stays (stack pair)
export const SlotSwap: React.FC<{ t: number; lead: string; words: [string, number][]; end: number; x: number; y: number; size: number; color?: string; fonts: Fonts }> = ({ t, lead, words, end, x, y, size, color = '#000', fonts }) => {
  if (t < words[0][1] - f(6) || t > end) return null;
  const lk = interpolate(t, [words[0][1] - f(6), words[0][1] + f(4)], [0, 1], { ...C, easing: IN });
  const ex = interpolate(t, [end - f(5), end], [0, 1], { ...C, easing: OUT });
  return <div style={{ position: 'absolute', left: x, top: y, width: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${ex * -40}px)`, filter: `blur(${ex * 8}px)`, opacity: 1 - ex }}>
    <div style={{ fontFamily: fonts.text, fontWeight: 500, fontSize: size * 0.4, color, whiteSpace: 'nowrap', transform: `translateY(${(1 - lk) * 30}px)`, opacity: lk }}>{lead}</div>
    <div style={{ position: 'relative', height: size * 1.15, overflow: 'hidden', width: 1600, marginTop: 6 }}>
      {words.map(([w, a], i) => {
        const next = words[i + 1]?.[1] ?? 1e9;
        const kin = interpolate(t, [a, a + f(4)], [0, 1], { ...C, easing: IN });
        const kout = interpolate(t, [next - f(3), next], [0, 1], { ...C, easing: OUT });
        if (t < a - f(1) || t > next) return null;
        return <div key={w} style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: fonts.display, fontWeight: 800, fontSize: size, lineHeight: 1.1, letterSpacing: '-0.035em', color, transform: `translateY(${(1 - kin) * 100 - kout * 100}%)` }}>{w}</div>;
      })}
    </div>
  </div>;
};

// T13 tracking converge, serif italic (callback to "kesempurnaan")
export const Converge: React.FC<Base & { text: string; size: number }> = ({ t, at, out, x, y, text, size, color = '#000', fonts }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(15)], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, width: 0, display: 'flex', justifyContent: 'center' }}>
    <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: size, color, whiteSpace: 'nowrap', letterSpacing: `${(1 - k) * 0.4}em`, opacity: Math.min(1, k * 2.5), ...s }}>{text}</div>
  </div>;
};

// T25 chaotic: jitter 8 Hz, 3 layered ghosts, ≤ 1.5 s (frustration / addiction)
export const Chaotic: React.FC<Base & { text: string; size: number; accent: string }> = ({ t, at, out, x, y, text, size, color = '#000', accent, fonts }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(6)], [0, 1], { ...C, easing: IN });
  const s = smear(t, out);
  const j = (seed: number, amp: number) => [Math.sin(t * 50 + seed) * amp, Math.cos(t * 43 + seed * 2) * amp];
  return <div style={{ position: 'absolute', left: x, top: y, ...s }}>
    {[[accent, 0.35, 7, 1], [accent, 0.2, 12, 2], [color, 1, 3, 0]].map(([c, o, amp, sd], i) => {
      const [dx, dy] = j(sd as number, (amp as number) * k);
      return <div key={i} style={{ position: i < 2 ? 'absolute' : 'relative', left: 0, top: 0, fontFamily: fonts.display, fontWeight: 800, fontSize: size, color: c as string, opacity: (o as number) * k, letterSpacing: '-0.035em', lineHeight: 1, whiteSpace: 'nowrap', transform: `translate(${dx}px, ${dy}px) scale(${0.9 + k * 0.1})` }}>{text}</div>;
    })}
  </div>;
};

// T23 diegetic label: mono pill + leader line to the object
export const Label: React.FC<Base & { text: string; tx: number; ty: number }> = ({ t, at, out, x, y, text, tx, ty, color = '#1A3AD0', fonts }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(10)], [0, 1], { ...C, easing: IN });
  const len = Math.hypot(tx - x, ty - y);
  const ang = Math.atan2(ty - y, tx - x) * 180 / Math.PI;
  return <>
    <div style={{ position: 'absolute', left: x, top: y, width: len * k, height: 2, background: color, transformOrigin: '0 50%', transform: `rotate(${ang}deg)` }} />
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-100%, -50%) translateX(-12px) scale(${0.8 + k * 0.2})`, transformOrigin: '100% 50%', opacity: k, fontFamily: fonts.mono, fontWeight: 500, fontSize: 26, letterSpacing: '0.14em', color: '#fff', background: color, borderRadius: 30, padding: '8px 18px', whiteSpace: 'nowrap' }}>{text}</div>
  </>;
};

// T29 swing Y from the left edge (10–14 f), exit smear
export const SwingY: React.FC<Base & { text: string; size: number }> = ({ t, at, out, x, y, text, size, color = '#fff', fonts, shadow }) => {
  if (!live(t, at, out)) return null;
  const k = interpolate(t, [at, at + f(12)], [0, 1], { ...C, easing: IN });
  const s = smear(t, out);
  return <div style={{ position: 'absolute', left: x, top: y, transformOrigin: '0% 50%', transform: `perspective(900px) rotateY(${(1 - k) * 72}deg)`, opacity: Math.min(1, k * 3) }}>
    <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: size, color, letterSpacing: '-0.04em', lineHeight: 1, textShadow: sh(shadow), whiteSpace: 'nowrap', ...s }}>{text}</div>
  </div>;
};
