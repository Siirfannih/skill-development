import React, { useId } from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { siWhatsapp, siInstagram, siGoogle } from 'simple-icons';
import { WORDS, clean, fr } from '../lib/time';
import { eo, clamp } from '../lib/anim';
import { interpolate } from 'remotion';

/** Latar gradien biru lembut (jadisatu-terang + portal). Glow pelan bergerak supaya tidak mati. */
export const Bg: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const f = useCurrentFrame();
  if (dark) return <AbsoluteFill style={{ background: 'radial-gradient(120% 90% at 50% 40%, #17181C 0%, #0B0D0F 70%)' }} />;
  const a = Math.sin(f / 90) * 60, b = Math.cos(f / 110) * 50;
  return (
    <AbsoluteFill style={{ background: '#F1F5FB' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(900px 700px at ${18 + a / 20}% ${12 + b / 20}%, #DCE4FF 0%, rgba(220,228,255,0) 70%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(1000px 800px at ${86 - a / 25}% ${92 - b / 25}%, #CFDDFB 0%, rgba(207,221,251,0) 70%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1200px 900px at 50% 50%, rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 70%)' }} />
    </AbsoluteFill>
  );
};

/** Blur arah (motion blur) lewat filter SVG: x/y dalam px. */
export const MBlur: React.FC<{ x?: number; y?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ x = 0, y = 0, style, children }) => {
  const id = useId().replace(/:/g, '');
  const bx = Math.min(40, Math.round(x * 10) / 10), by = Math.min(40, Math.round(y * 10) / 10);
  const on = bx > 0.3 || by > 0.3;
  return (
    <>
      {on && <svg width="0" height="0" style={{ position: 'absolute' }}><filter id={id} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={`${bx} ${by}`} /></filter></svg>}
      <div style={{ ...style, filter: on ? `url(#${id})` : undefined }}>{children}</div>
    </>
  );
};

export const Emoji: React.FC<{ n: string; size: number; style?: React.CSSProperties }> = ({ n, size, style }) => (
  <Img src={staticFile(`emoji/${n}.png`)} style={{ width: size, height: size, objectFit: 'contain', filter: 'drop-shadow(0 18px 24px rgba(30,50,110,.18))', ...style }} />
);

type SI = { title: string; hex: string; path: string };
export const Brand: React.FC<{ icon: SI; size?: number; color?: string }> = ({ icon, size = 24, color }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color ?? `#${icon.hex}`}><path d={icon.path} /></svg>
);
export const WA = siWhatsapp, IG = siInstagram, GOOGLE = siGoogle;

/** Logo Jadisatu (disalin dari portal components/ui.tsx), bisa diskalakan. */
export const Logo: React.FC<{ scale?: number; dark?: boolean }> = ({ scale = 1, dark }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 * scale }}>
    <span style={{ width: 32 * scale, height: 32 * scale, fontSize: 14 * scale, borderRadius: 8 * scale, background: dark ? '#fff' : '#0F172A', color: dark ? '#0F172A' : '#fff' }}
      className="font-display font-bold flex items-center justify-center">J<span style={{ color: '#F97066' }}>.</span></span>
    <span className="font-display font-bold" style={{ fontSize: 17 * scale, letterSpacing: '-0.01em', color: dark ? '#fff' : '#0F172A' }}>Jadisatu</span>
  </span>
);

/** Kursor/jari: panah macOS halus. */
export const Cursor: React.FC<{ x: number; y: number; press?: number; scale?: number }> = ({ x, y, press = 0, scale = 1 }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${scale * (1 - 0.12 * press)})`, transformOrigin: '4px 4px', zIndex: 50 }}>
    {press > 0.01 && <div style={{ position: 'absolute', left: -22, top: -22, width: 52, height: 52, borderRadius: 99, background: `rgba(37,99,235,${0.22 * press})` }} />}
    <svg width="34" height="40" viewBox="0 0 34 40"><path d="M3 2 L3 31 L10.5 24.5 L15.5 36 L21 33.6 L16 22.4 L26 22 Z" fill="#0F172A" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.25))' }} /></svg>
  </div>
);

/** Caption: frasa ≤ 6 kata dari VO, satu baris, muncul di onset kata pertama; kata menebal di onsetnya. */
type Phrase = { words: { t: string; s: number }[]; s: number; e: number };
const PHRASES: Phrase[] = (() => {
  const out: Phrase[] = []; let cur: { t: string; s: number }[] = []; let b = '';
  const flush = () => { if (cur.length) out.push({ words: cur, s: cur[0].s, e: 0 }); cur = []; };
  for (const w of WORDS) {
    if (w.b !== b) { flush(); b = w.b; }
    const t = clean(w.w);
    cur.push({ t, s: w.s });
    if (/[,.?!]$/.test(t) || cur.length >= 6) flush();
  }
  flush();
  for (let i = 0; i < out.length; i++) {
    const last = out[i].words[out[i].words.length - 1];
    const lw = WORDS.find((w) => w.s === last.s)!;
    out[i].e = Math.min(lw.e + 0.35, i + 1 < out.length ? out[i + 1].s - 0.03 : 999);
  }
  return out;
})();
export const PHRASE_LIST = PHRASES;

export const Captions: React.FC<{ hide: (f: number) => boolean; light?: (f: number) => boolean; split?: Record<string, number> }> = ({ hide }) => {
  const f = useCurrentFrame();
  if (hide(f)) return null;
  const p = PHRASES.find((x) => f >= fr(x.s) - 2 && f < fr(x.e));
  if (!p) return null;
  const a = eo(f, fr(p.s) - 2, 7);
  const out = interpolate(f, [fr(p.e) - 4, fr(p.e)], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 64, pointerEvents: 'none' }}>
      <MBlur y={(1 - a) * 6}>
        <div style={{ opacity: a * out, transform: `translateY(${(1 - a) * 14}px)`, whiteSpace: 'nowrap', fontSize: 46, fontWeight: 700, letterSpacing: '-0.015em',
          textShadow: '0 0 18px rgba(241,245,251,.9)' }}>
          {p.words.map((w, i) => {
            const on = interpolate(f, [fr(w.s) - 1, fr(w.s) + 3], [0, 1], clamp);
            return <span key={i} style={{ color: `rgba(15,23,42,${0.32 + 0.68 * on})` }}>{w.t}{i < p.words.length - 1 ? ' ' : ''}</span>;
          })}
        </div>
      </MBlur>
    </AbsoluteFill>
  );
};

/** Emoji inline di dalam teks/bubble (gambar Fluent, bukan font emoji sistem). */
export const IE: React.FC<{ n: string; size?: number }> = ({ n, size = 20 }) => (
  <Img src={staticFile(`emoji/${n}.png`)} style={{ width: size, height: size, display: 'inline-block', verticalAlign: '-0.22em', margin: '0 1px' }} />
);
