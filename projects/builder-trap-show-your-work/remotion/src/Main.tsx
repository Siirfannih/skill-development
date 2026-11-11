import React from 'react';
import {
  AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame,
  interpolate, spring, Easing, random,
} from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadTight } from '@remotion/google-fonts/InterTight';
import { loadFont as loadSerif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import CAPS from './captions.json';
import REPOS from '../public/data/repos.json';
import { AgentsWorld, Agent } from './Agents';
import { Stage, Layer } from './Stage';

export const FPS = 30;
export const TOTAL = 97.5;

const inter = loadInter('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] }).fontFamily;
const tight = loadTight('normal', { weights: ['700', '800', '900'], subsets: ['latin'] }).fontFamily;
const serif = loadSerif('italic', { weights: ['400'], subsets: ['latin'] }).fontFamily;
const serifUp = loadSerif('normal', { weights: ['400'], subsets: ['latin'] }).fontFamily;
const mono = loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] }).fontFamily;

const C = {
  bg: 'transparent', paper: '#F4F6FF', ink: '#0A2353', red: '#FF4D6D', warm: '#56E1E9',
  mute: 'rgba(244,246,255,0.6)', line: 'rgba(244,246,255,0.07)',
};
// Deep Space palette (Irfan 11 Nov): multi-colour gradient, clear contrast
const P = { deep: '#0A2353', navy: '#112C70', indigo: '#5B58EB', violet: '#BB63FF', cyan: '#56E1E9', electric: '#0133FE', lilac: '#EADDEF', pink: '#FDCBF2', lav: '#A087FD' };
const LIGHT: [number, number][] = [[51.9, 56.45]];
const isLight = (t: number) => LIGHT.some(([a, b]) => t >= a && t < b);

// animated gradient mesh behind every dark scene
const GradBG: React.FC<{ mood?: 'base' | 'turn' }> = ({ mood = 'base' }) => {
  const f = useCurrentFrame() / FPS;
  const b = (x0: number, y0: number, ax: number, ay: number, per: number, ph: number) =>
    [x0 + Math.sin((f / per) * 6.283 + ph) * ax, y0 + Math.cos((f / per) * 6.283 + ph * 1.3) * ay];
  const [x1, y1] = b(22, 28, 8, 6, 17, 0), [x2, y2] = b(78, 72, 7, 8, 21, 1.7), [x3, y3] = b(70, 18, 9, 5, 25, 3.1), [x4, y4] = b(15, 85, 6, 6, 19, 4.4);
  const turn = mood === 'turn';
  return (
    <AbsoluteFill style={{ background: turn ? `linear-gradient(135deg, #070B26 0%, ${P.deep} 55%, #1B0F4A 100%)` : `linear-gradient(135deg, ${P.deep} 0%, ${P.navy} 55%, #161A5E 100%)` }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${x1}% ${y1}%, ${turn ? 'rgba(255,77,109,0.42)' : 'rgba(91,88,235,0.55)'} 0%, rgba(0,0,0,0) 38%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${x2}% ${y2}%, rgba(187,99,255,${turn ? 0.5 : 0.38}) 0%, rgba(0,0,0,0) 36%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${x3}% ${y3}%, rgba(86,225,233,${turn ? 0.12 : 0.28}) 0%, rgba(0,0,0,0) 30%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${x4}% ${y4}%, rgba(1,51,254,0.35) 0%, rgba(0,0,0,0) 34%)` }} />
    </AbsoluteFill>
  );
};

// pixel-block gradient wipe (ref 03): smeared blocks sweep over the cut
const WIPES = [15.68, 40.18, 51.9, 56.45, 82.4, 89.25];
const BlockWipe: React.FC = () => {
  const t = useT();
  const at = WIPES.find((w) => Math.abs(t - w) < 0.5);
  if (at === undefined) return null;
  const cols = 12, rows = 7, bw = 1920 / cols, bh = 1080 / rows;
  const grads = [
    `linear-gradient(90deg, rgba(1,51,254,0) 0%, ${P.electric} 35%, ${P.indigo} 65%, ${P.lilac} 100%)`,
    `linear-gradient(90deg, ${P.lilac} 0%, ${P.lav} 40%, ${P.electric} 100%)`,
    `linear-gradient(90deg, rgba(5,10,40,0) 0%, ${P.deep} 30%, ${P.electric} 100%)`,
    `linear-gradient(90deg, ${P.pink} 0%, ${P.violet} 55%, rgba(187,99,255,0) 100%)`,
  ];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const rnd = random(`w${at}-${i}`);
        if (rnd < 0.18) return null;
        const off = (c / (cols - 1) - 0.5) * 0.26 + (random(`o${at}-${i}`) - 0.5) * 0.12;
        const o = interpolate(Math.abs(t - at - off), [0, 0.22], [1, 0], { extrapolateRight: 'clamp' });
        if (o <= 0) return null;
        const wide = 1 + Math.floor(random(`s${at}-${i}`) * 3);
        return <div key={i} style={{ position: 'absolute', left: c * bw, top: r * bh, width: bw * wide, height: bh, background: grads[Math.floor(rnd * 4)], opacity: o, filter: 'blur(3px)' }} />;
      })}
    </AbsoluteFill>
  );
};

// ---------- helpers ----------
const useT = () => useCurrentFrame() / FPS;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const io = Easing.bezier(0.65, 0, 0.35, 1);
const lerp = (t: number, a: number, b: number, v0: number, v1: number, e = ease) =>
  interpolate(t, [a, b], [v0, v1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });
const sp = (t: number, at: number, cfg: any = {}) =>
  spring({ frame: Math.round((t - at) * FPS), fps: FPS, config: { damping: 16, stiffness: 140, mass: 0.7, ...cfg } });

const S = (from: number, to: number) => ({ from: Math.round(from * FPS), durationInFrames: Math.round((to - from) * FPS) });

// big kinetic word: blur-in, rise
const Big: React.FC<{ t: number; at: number; out?: number; children: React.ReactNode; style?: React.CSSProperties; font?: 'serif' | 'tight' }> = ({ t, at, out = 999, children, style, font = 'serif' }) => {
  const a = lerp(t, at, at + 0.45, 0, 1);
  const o = out < 999 ? lerp(t, out - 0.25, out, 1, 0, io) : 1;
  if (t < at - 0.05 || t > out + 0.05) return null;
  return (
    <div style={{
      position: 'absolute', color: C.paper, opacity: a * o,
      filter: `blur(${(1 - a) * 14 + (1 - o) * 10}px)`,
      transform: `translateY(${(1 - a) * 24 - (1 - o) * 16}px)`,
      fontFamily: font === 'serif' ? serif : tight, fontWeight: font === 'serif' ? 400 : 800,
      lineHeight: 1, letterSpacing: font === 'serif' ? '-0.01em' : '-0.035em', whiteSpace: 'nowrap', ...style,
    }}>{children}</div>
  );
};

// film grain + vignette on top of everything
const Grain: React.FC = () => {
  const f = useCurrentFrame();
  const light = isLight(f / FPS);
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {!light && <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 75% at 50% 48%, rgba(0,0,0,0) 60%, rgba(5,10,40,0.45) 100%)' }} />}
      <svg width="1920" height="1080" style={{ position: 'absolute', opacity: 0.11, mixBlendMode: 'overlay' }}>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={f % 12} stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

// cutting-mat grid board
const Board: React.FC<{ tint?: string; lineCol?: string; drift?: number }> = ({ tint, lineCol = C.line, drift = 0 }) => (
  <AbsoluteFill style={{ background: tint ?? 'transparent' }}>
    {tint === 'turn' && <GradBG mood="turn" />}
    <AbsoluteFill style={{
      backgroundImage: `linear-gradient(${lineCol} 1px, transparent 1px), linear-gradient(90deg, ${lineCol} 1px, transparent 1px)`,
      backgroundSize: '80px 80px', backgroundPosition: `${drift}px ${drift * 0.4}px`,
    }} />
  </AbsoluteFill>
);

// ---------- captions ----------
const HIDE: [number, number][] = [[21.5, 25.75], [43.3, 48.2]];
const Captions: React.FC = () => {
  const t = useT();
  if (HIDE.some(([a, b]) => t >= a && t < b)) return null;
  const c = (CAPS as any).caps.find((x: any) => t >= x.s - 0.05 && t < x.e);
  if (!c) return null;
  const light = isLight(t);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 92, display: 'flex', justifyContent: 'center' }}>
      <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 40, color: light ? P.deep : '#fff', letterSpacing: '-0.005em', textShadow: light ? '0 1px 10px rgba(255,255,255,0.8)' : '0 2px 14px rgba(0,0,0,0.75)' }}>
        {c.words.map(([ws, w]: [number, string], i: number) => {
          const a = lerp(t, ws - 0.06, ws + 0.06, 0.0, 1);
          return <span key={i} style={{ opacity: a, marginRight: 11 }}>{w}</span>;
        })}
      </div>
    </div>
  );
};

// ---------- GitHub repo card (light theme, real data) ----------
const fmtDate = (d: string) => {
  const [y, m, dd] = d.split('-').map(Number);
  const mo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1];
  return `Updated on ${mo} ${dd}${y === 2026 ? '' : ', ' + y}`;
};
const RepoIcon: React.FC<{ s?: number }> = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="#59636e"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" /></svg>
);
const RepoCard: React.FC<{ r: [string, string, string]; w?: number; style?: React.CSSProperties }> = ({ r, w = 250, style }) => (
  <div style={{
    width: w, height: 96, background: '#fff', borderRadius: 8, border: '1px solid #d1d9e0', padding: '14px 16px', boxSizing: 'border-box',
    fontFamily: inter, boxShadow: '0 10px 30px rgba(0,0,0,0.45)', ...style,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <RepoIcon />
      <span style={{ color: '#0969da', fontWeight: 600, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: w - 120 }}>{r[0]}</span>
      <span style={{ marginLeft: 'auto', fontSize: 11, color: '#59636e', border: '1px solid #d1d9e0', borderRadius: 20, padding: '1px 7px', fontWeight: 500 }}>{r[1] === 'public' ? 'Public' : 'Private'}</span>
    </div>
    <div style={{ marginTop: 22, fontSize: 12, color: '#59636e' }}>{fmtDate(r[2])}</div>
  </div>
);

const Logo: React.FC<{ name: string; size: number; color?: string; style?: React.CSSProperties }> = ({ name, size, color = '#fff', style }) => (
  <div style={{
    width: size, height: size, backgroundColor: color, WebkitMaskImage: `url(${staticFile(`logos/${name}.svg`)})`,
    WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', ...style,
  }} />
);

// ---------- people grid used in S2 ----------
const Person: React.FC<{ dim: number }> = ({ dim }) => (
  <div style={{ width: 170, height: 220, background: `rgba(244,246,255,${0.08 * dim})`, borderRadius: 6, position: 'relative', overflow: 'hidden', border: `1px solid rgba(244,246,255,${0.12 * dim})` }}>
    <svg width="170" height="220" viewBox="0 0 170 220" style={{ position: 'absolute' }}>
      <circle cx="85" cy="92" r="30" fill={`rgba(244,246,255,${0.22 * dim})`} />
      <path d="M30 220 C30 160 140 160 140 220 Z" fill={`rgba(244,246,255,${0.22 * dim})`} />
    </svg>
  </div>
);

// ---------- S3 motivasi (19.68 – 25.8) ----------
const FeedCard: React.FC<{ seed: string }> = ({ seed }) => {
  const l = [0.9, 0.7, 0.8, 0.5].map((v, i) => interpolate(random(seed + i), [0, 1], [0.35, 0.95]));
  return (
    <div style={{ width: 300, height: 300, background: random(seed + 'c') > 0.5 ? 'rgba(17,44,112,0.85)' : 'rgba(91,88,235,0.35)', borderRadius: 10, padding: 30, boxSizing: 'border-box', marginBottom: 26 }}>
      <div style={{ fontFamily: serifUp, fontSize: 64, color: 'rgba(244,246,255,0.35)', lineHeight: 0.6 }}>“</div>
      {l.map((w, i) => <div key={i} style={{ height: 14, width: `${w * 100}%`, background: 'rgba(244,246,255,0.22)', borderRadius: 4, margin: '16px auto 0', }} />)}
    </div>
  );
};
// ---------- S5 ChatGPT, rebuilt in code (32.66 – 40.18) ----------
const CgIcon: React.FC<{ d: string; s?: number; c?: string }> = ({ d, s = 20, c = '#cfcfcf' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
// ---------- timeline layout (S7, S12) ----------
const DAY = 12.5;
const T0 = Date.UTC(2025, 10, 1);
const dx = (d: string) => { const [y, m, dd] = d.split('-').map(Number); return 260 + ((Date.UTC(y, m - 1, dd) - T0) / 864e5) * DAY; };
const AXIS = 560, CW = 250, CH = 96;
const LANES = [-1, 1, -2, 2, -3, 3];
const laneY = (l: number) => (l < 0 ? AXIS - 34 - CH - (-l - 1) * (CH + 16) : AXIS + 34 + (l - 1) * (CH + 16));
const LAYOUT = (() => {
  const last: Record<number, number> = {};
  return (REPOS as [string, string, string][]).map((r) => {
    let x = dx(r[2]);
    let lane = LANES.find((l) => (last[l] ?? -1e9) + CW + 14 <= x);
    if (lane === undefined) { lane = LANES.reduce((a, b) => ((last[a] ?? 0) <= (last[b] ?? 0) ? a : b)); x = (last[lane] ?? 0) + CW + 14; }
    last[lane] = x;
    return { r, x, y: laneY(lane), anchor: dx(r[2]) };
  });
})();
const WIDTH = Math.max(...LAYOUT.map((c) => c.x + CW)) + 160;
const MONTHS = Array.from({ length: 13 }).map((_, i) => {
  const y = 2025 + Math.floor((10 + i) / 12), m = (10 + i) % 12;
  return { x: 260 + ((Date.UTC(y, m, 1) - T0) / 864e5) * DAY, label: ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'][m] + (m === 0 || i === 0 ? ` ${y}` : '') };
});

const TimelineWorld: React.FC<{ t: number; camX: number; zoom: number; reveal: (c: typeof LAYOUT[0], i: number) => number; dimAll?: number; focusIdx?: number }> = ({ camX, zoom, reveal, dimAll = 1, focusIdx = -1 }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: 1080, transformOrigin: '0 50%', transform: `translateX(${960}px) scale(${zoom}) translateX(${-camX}px)` }}>
    <div style={{ position: 'absolute', left: 0, top: AXIS, width: WIDTH, height: 2, background: 'rgba(244,246,255,0.35)' }} />
    {MONTHS.map((m) => (
      <div key={m.x} style={{ position: 'absolute', left: m.x, top: AXIS - 10, opacity: dimAll }}>
        <div style={{ width: 2, height: 20, background: 'rgba(244,246,255,0.45)' }} />
        <div style={{ position: 'absolute', top: 30, left: 8, fontFamily: mono, fontSize: 15, color: 'rgba(244,246,255,0.5)', whiteSpace: 'nowrap', letterSpacing: '0.12em' }}>{m.label}</div>
      </div>
    ))}
    {LAYOUT.map((c, i) => {
      const a = reveal(c, i);
      if (a <= 0) return null;
      const f = focusIdx < 0 || focusIdx === i ? 1 : 0.18;
      return (
        <React.Fragment key={c.r[0]}>
          <div style={{ position: 'absolute', left: c.anchor, top: Math.min(AXIS, c.y + CH), width: 1, height: Math.abs(AXIS - (c.y < AXIS ? c.y + CH : c.y)), background: 'rgba(244,246,255,0.25)', opacity: a * dimAll * f }} />
          <div style={{ position: 'absolute', left: c.anchor - 4, top: AXIS - 4, width: 10, height: 10, borderRadius: 5, background: C.paper, opacity: a * f }} />
          <div style={{ position: 'absolute', left: c.x, top: c.y, opacity: Math.min(1, a * 1.5) * dimAll * f, transform: `translateY(${(1 - a) * (c.y < AXIS ? 30 : -30)}px) scale(${0.9 + a * 0.1})` }}>
            <RepoCard r={c.r} w={CW} />
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

const GhHeader: React.FC<{ a: number }> = ({ a }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: a, transform: `translateY(${(1 - a) * -20}px)` }}>
    <Logo name="github" size={46} color={C.paper} />
    <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 34, color: C.paper }}>Siirfannih</div>
    <div style={{ fontFamily: inter, fontSize: 30, color: C.mute }}>·</div>
    <div style={{ fontFamily: inter, fontSize: 30, color: C.paper }}>Repositories</div>
    <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 24, color: C.ink, background: C.paper, borderRadius: 20, padding: '2px 14px' }}>{LAYOUT.length}</div>
  </div>
);


// ================= 2.5D building blocks =================
// L1 back plate: oversized so camera moves never show an edge
const BackPlate: React.FC<{ grid?: boolean; turn?: boolean; w?: number }> = ({ grid = true, turn = false, w = 5120 }) => (
  <div style={{ position: 'absolute', left: -1600, top: -1100, width: w, height: 3280 }}>
    {turn && <AbsoluteFill><GradBG mood="turn" /></AbsoluteFill>}
    {grid && <AbsoluteFill style={{ backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />}
  </div>
);
// L4 depth cue: bokeh dust near the lens
const Dust: React.FC<{ seed: string; n?: number; size?: number; cols?: string[] }> = ({ seed, n = 22, size = 7, cols = [P.cyan, P.violet, '#ffffff', P.lav] }) => {
  const t = useT();
  return <>{Array.from({ length: n }).map((_, i) => {
    const x = (random(seed + 'x' + i) - 0.5) * 2600 + 960, y = (random(seed + 'y' + i) - 0.5) * 1500 + 540;
    const s = size * (0.4 + random(seed + 's' + i) * 1.5), col = cols[Math.floor(random(seed + 'c' + i) * cols.length)];
    return <div key={i} style={{ position: 'absolute', left: x, top: y + Math.sin(t * 0.7 + i) * 14, width: s, height: s, borderRadius: '50%', background: col, opacity: 0.5, boxShadow: `0 0 ${s * 3}px ${col}` }} />;
  })}</>;
};
const shake = (t: number, at: number, amp = 10, dur = 0.35) => (t > at && t < at + dur ? Math.sin((t - at) * 95) * amp * (1 - (t - at) / dur) : 0);

// ---------- S1 face (0 – 15.68) · L2 footage · L3 kinetic text · L4 dust ----------
const Face: React.FC = () => {
  const t = useT();
  const B = t >= 11.07;
  const z = B ? (t < 15.0 ? lerp(t, 11.07, 15.0, 330, 400, Easing.linear) : lerp(t, 15.0, 15.68, 400, 1450, Easing.in(Easing.cubic))) : lerp(t, 0, 11.07, 0, 150, Easing.linear);
  const cam = { z, x: B ? 30 : 0, y: B ? 40 : 0, ry: B ? lerp(t, 11.07, 15.0, 1, -1, Easing.linear) : lerp(t, 0, 11.07, -1.6, 1.6, Easing.linear) };
  return (
    <Stage cam={cam}>
      <Layer z={-150}>
        <AbsoluteFill style={{ transform: 'scale(1.08)' }}>
          <OffthreadVideo src={staticFile('face.mp4')} muted style={{ width: 1920, height: 1080, filter: 'contrast(1.13) saturate(0.8) brightness(0.97)' }} />
          <AbsoluteFill style={{ background: 'linear-gradient(135deg, rgba(91,88,235,0.30), rgba(86,225,233,0.12) 60%, rgba(187,99,255,0.22))', mixBlendMode: 'soft-light' }} />
          <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(10,35,83,0.62) 0%, rgba(10,35,83,0) 40%)' }} />
        </AbsoluteFill>
      </Layer>
      <Layer z={170}>
        <Big t={t} at={1.66} out={6.4} style={{ left: 150, top: 410, fontSize: 132 }}>kesempurnaan.</Big>
        <Big t={t} at={8.45} out={10.9} style={{ left: 150, top: 430, fontSize: 104, color: C.mute }}>siapa pun.</Big>
        <Big t={t} at={11.9} font="tight" style={{ left: 390, top: 340, fontSize: 120 }}>20-an</Big>
      </Layer>
      <Layer z={560} focus={0} dof={0.01}><Dust seed="face" n={14} /></Layer>
    </Stage>
  );
};

// ---------- S2 unik (15.68 – 19.68) · L2 people grid · L3 word · L4 photo ----------
const Unik: React.FC = () => {
  const t = useT() + 15.68;
  const p = lerp(t, 15.68, 16.35, 0, 1, io);
  const dim = lerp(t, 16.7, 17.2, 1, 0.3);
  const push = lerp(t, 17.3, 19.68, 0, 1, io);
  const cols = 9, rows = 4, gw = 200, gh = 250;
  const top0 = 540 - (rows * gh) / 2 + 15;
  const cardW = lerp(p, 0, 1, 1920, 170, Easing.linear), cardH = lerp(p, 0, 1, 1080, 220, Easing.linear);
  const cam = { z: push * 980, x: 0, y: push * -113, ry: lerp(t, 15.68, 19.68, -3, 2, Easing.linear) };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={-350}>
        <div style={{ position: 'absolute', left: 960 - (cols * gw) / 2 + 15, top: top0, opacity: p }}>
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} style={{ display: 'flex', gap: 30, marginBottom: 30 }}>
              {Array.from({ length: cols }).map((__, c) => (
                <div key={c} style={{ opacity: r === 1 && c === 4 ? 0 : 1 }}><Person dim={dim * interpolate(random(`p${r}${c}`), [0, 1], [0.6, 1])} /></div>
              ))}
            </div>
          ))}
        </div>
      </Layer>
      <Layer z={60}><Big t={t} at={16.78} style={{ left: 1110, top: 330, fontSize: 120 }}>unik.</Big></Layer>
      <Layer z={150}>
        <div style={{
          position: 'absolute', left: 960 - cardW / 2, top: lerp(p, 0, 1, 0, top0 + gh), width: cardW, height: cardH, padding: p * 7, background: `rgba(244,246,255,${p})`, boxSizing: 'border-box',
          transform: `rotate(${p * -2.5}deg)`, boxShadow: `0 ${p * 18}px ${p * 40}px rgba(5,10,40,0.6), 0 0 ${lerp(t, 16.7, 17.3, 0, 70)}px rgba(86,225,233,0.45)`,
        }}>
          <Img src={staticFile('shots/face_end.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '53% 30%', filter: 'contrast(1.1) saturate(0.85)' }} />
        </div>
      </Layer>
      <Layer z={520} focus={0} dof={0.012}><Dust seed="unik" n={16} /></Layer>
    </Stage>
  );
};

// ---------- S3 motivasi (19.68 – 25.8) · L2 feed · L3 quote card · L4 quote mark ----------
const Motivasi: React.FC = () => {
  const t = useT() + 19.68;
  const QW = (CAPS as any).words.filter((w: any) => w[0] >= 21.5 && w[0] < 25.5);
  const cin = sp(t, 21.1);
  const cam = { x: lerp(t, 19.68, 25.8, -90, 90, Easing.linear), z: lerp(t, 19.68, 25.8, 0, 200, Easing.linear), ry: lerp(t, 19.68, 25.8, 5, -4, Easing.linear), rx: 2 };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate grid={false} /></Layer>
      <Layer z={-650} focus={0} dof={0.004}>
        <div style={{ opacity: lerp(t, 20.6, 21.4, 1, 0.55) }}>
          {[0, 1, 2, 3, 4, 5, 6].map((c) => (
            <div key={c} style={{ position: 'absolute', left: -120 + c * 330, top: -((t - 19.68) * (260 + c * 30)) + (c % 2) * 160 + 120 }}>
              {Array.from({ length: 9 }).map((_, i) => <FeedCard key={i} seed={`f${c}-${i}`} />)}
            </div>
          ))}
        </div>
      </Layer>
      <Layer z={0}>
        <div style={{
          position: 'absolute', left: 960 - 560, top: 300, width: 1120, padding: '70px 80px', boxSizing: 'border-box', background: C.paper, color: C.ink,
          transform: `translateY(${(1 - cin) * 140}px) rotate(${(1 - cin) * 3 - 1}deg)`, opacity: Math.min(1, cin * 1.5), boxShadow: '0 40px 90px rgba(5,10,40,0.6)',
        }}>
          <div style={{ fontFamily: serif, fontSize: 82, lineHeight: 1.08, paddingLeft: 60 }}>
            {QW.map(([ws, , w]: any, i: number) => (
              <span key={i} style={{ opacity: lerp(t, ws - 0.05, ws + 0.12, 0.12, 1), marginRight: 20, display: 'inline-block' }}>{i === 0 ? 'K' + w.slice(1) : w}{i === QW.length - 1 ? '.' : ''}</span>
            ))}
          </div>
        </div>
      </Layer>
      <Layer z={260}>
        <div style={{ position: 'absolute', left: 300, top: 120, fontFamily: serifUp, fontSize: 380, lineHeight: 1, opacity: Math.min(1, cin * 1.4), backgroundImage: `linear-gradient(135deg, ${P.cyan}, ${P.violet})`, WebkitBackgroundClip: 'text', color: 'transparent', transform: `translateY(${(1 - cin) * 200}px)` }}>“</div>
      </Layer>
      <Layer z={540} focus={0} dof={0.012}><Dust seed="moti" n={14} /></Layer>
    </Stage>
  );
};

// ---------- S4 FOMO (25.8 – 32.66) · L2 trend rows at 5 depths · L4 photo · L3 slam ----------
const Fomo: React.FC = () => {
  const t = useT() + 25.8;
  const slam = sp(t, 31.86, { damping: 11, stiffness: 220 });
  const cam = { x: lerp(t, 25.8, 32.66, 0, -180, Easing.linear) + shake(t, 31.86, 14), z: lerp(t, 25.8, 31.8, 0, 140, Easing.linear) + slam * 60, ry: lerp(t, 25.8, 32.66, -4, 3, Easing.linear) };
  const blur = lerp(t, 31.7, 31.9, 0, 5);
  const ZR = [-1000, -720, -480, -280, -110];
  return (
    <Stage cam={cam}>
      <Layer z={-1100}><BackPlate /></Layer>
      {ZR.map((z, r) => (
        <Layer key={r} z={z} focus={0} dof={0.003}>
          <div style={{ position: 'absolute', top: 40 + r * 205, left: -((t - 25.8) * (380 + r * 70)) % 260 - 900, display: 'flex', gap: 30, filter: `blur(${blur}px)`, opacity: lerp(t, 31.8, 32.0, 1, 0.5) }}>
            {Array.from({ length: 16 }).map((__, i) => (
              <div key={i} style={{ width: 230, height: 150, borderRadius: 8, background: 'rgba(244,246,255,0.07)', border: '1px solid rgba(244,246,255,0.12)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 18, top: 18, right: 18, height: 70, borderRadius: 4, background: `linear-gradient(135deg, rgba(91,88,235,0.35), rgba(86,225,233,0.18))` }} />
                <div style={{ position: 'absolute', left: 18, bottom: 22, width: 120, height: 10, borderRadius: 3, background: 'rgba(244,246,255,0.16)' }} />
                <svg width="22" height="22" viewBox="0 0 24 24" style={{ position: 'absolute', right: 16, bottom: 16 }}><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" fill="rgba(253,203,242,0.55)" /></svg>
              </div>
            ))}
          </div>
        </Layer>
      ))}
      <Layer z={160}>
        <div style={{ position: 'absolute', left: 960 - 105, top: 540 - 135, width: 210, height: 270, padding: 8, background: C.paper, boxSizing: 'border-box', transform: `rotate(-2deg) translateX(${(t - 25.8) * 22}px)`, boxShadow: '0 20px 60px rgba(5,10,40,0.8), 0 0 60px rgba(86,225,233,0.35)', opacity: lerp(t, 31.8, 32.0, 1, 0.35) }}>
          <Img src={staticFile('shots/face_end.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '53% 30%' }} />
        </div>
      </Layer>
      <Layer z={300}>
        {t >= 31.8 && <div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: tight, fontWeight: 900, fontSize: 330, color: C.paper, letterSpacing: '-0.05em', transform: `scale(${1.35 - slam * 0.35})`, opacity: Math.min(1, slam * 2), textShadow: `0 0 60px rgba(187,99,255,0.6)` }}>FOMO</div>}
      </Layer>
    </Stage>
  );
};

// ---------- S5 ChatGPT, rebuilt in code (32.66 – 40.18) · L2 window · L3 logo · L4 chips ----------
const ChatWindow: React.FC<{ t: number }> = ({ t }) => {
  const W = 1500, H = 900;
  const typed = 'build something';
  const n = Math.floor(lerp(t, 39.4, 40.0, 0, typed.length, Easing.linear));
  const side = ['New chat', 'Search chats', 'Library', 'Sora', 'GPTs'];
  const icons = ['M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z', 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.8 5.5 21l2-7.5L2 9h7z', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'];
  const send = t > 39.95;
  return (
    <div style={{ position: 'absolute', left: 960 - W / 2, top: 540 - H / 2 + 20, width: W, height: H, borderRadius: 16, overflow: 'hidden', boxShadow: '0 50px 140px rgba(5,10,40,0.75), 0 0 0 1px rgba(255,255,255,0.08)', background: '#212121', display: 'flex', fontFamily: inter }}>
      <div style={{ width: 300, background: '#181818', padding: '22px 14px', boxSizing: 'border-box' }}>
        <div style={{ padding: '0 10px 22px' }}><Logo name="openai" size={28} /></div>
        {side.map((x, i) => (
          <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 10px', fontSize: 16, color: '#ececec', opacity: lerp(t, 33.4 + i * 0.08, 33.8 + i * 0.08, 0, 1) }}><CgIcon d={icons[i]} />{x}</div>
        ))}
        <div style={{ fontSize: 14, color: '#8f8f8f', padding: '26px 10px 8px' }}>Chats</div>
        {[78, 62, 70, 55, 66].map((w, i) => (
          <div key={i} style={{ padding: '13px 10px', opacity: lerp(t, 33.9 + i * 0.12, 34.3 + i * 0.12, 0, 1) }}><div style={{ height: 9, width: `${w}%`, borderRadius: 5, background: 'rgba(255,255,255,0.14)' }} /></div>
        ))}
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 26, top: 22, display: 'flex', alignItems: 'center', gap: 6, fontSize: 20, color: '#ececec', fontWeight: 500 }}>ChatGPT <CgIcon d="M6 9l6 6 6-6" s={16} c="#9b9b9b" /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontSize: 34, color: '#ececec', fontWeight: 500, opacity: lerp(t, 34.2, 34.8, 0, 1) }}>Where should we begin?</div>
        <div style={{ position: 'absolute', left: 150, right: 150, top: 410, height: 64, borderRadius: 32, background: '#303030', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 14px 0 22px', boxSizing: 'border-box', gap: 14, boxShadow: send ? '0 0 0 2px rgba(255,255,255,0.14)' : 'none' }}>
          <CgIcon d="M12 5v14M5 12h14" s={22} c="#dcdcdc" />
          <div style={{ flex: 1, fontSize: 19, color: n > 0 ? '#ececec' : '#9b9b9b', display: 'flex', alignItems: 'center' }}>
            {n > 0 ? typed.slice(0, n) : 'Ask anything'}
            {t > 39.2 && <span style={{ width: 2, height: 22, background: '#ececec', marginLeft: 2, opacity: Math.floor(t * 3) % 2 ? 1 : 0.15 }} />}
          </div>
          <CgIcon d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 11a7 7 0 0 1-14 0M12 18v4" s={20} c="#dcdcdc" />
          <div style={{ width: 38, height: 38, borderRadius: 19, background: n > 0 ? '#ececec' : '#4a4a4a', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${send ? 0.88 : 1})` }}>
            <CgIcon d={n > 0 ? 'M12 19V5M5 12l7-7 7 7' : 'M6 10v4M10 7v10M14 9v6M18 11v2'} s={20} c={n > 0 ? '#111' : '#ececec'} />
          </div>
        </div>
      </div>
    </div>
  );
};
const Chat: React.FC = () => {
  const t = useT() + 32.66;
  const win = lerp(t, 32.8, 35.9, 0, 1, io);
  const dolly = lerp(t, 37.6, 40.18, 0, 1, Easing.bezier(0.5, 0, 0.75, 0));
  const logo = sp(t, 36.2, { damping: 14 });
  const logoOut = lerp(t, 37.3, 37.75, 1, 0, io);
  const cam = { z: -600 * (1 - win) + dolly * 700, ry: 12 * (1 - win), rx: 9 * (1 - win), x: dolly * 150, y: dolly * 12 };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}><div style={{ opacity: lerp(t, 32.8, 33.5, 0, 1) }}><ChatWindow t={t} /></div></Layer>
      {t > 36.1 && logoOut > 0 && (
        <Layer z={260}>
          <div style={{ position: 'absolute', left: -800, top: -600, width: 3520, height: 2280, background: `radial-gradient(circle at 50% 50%, rgba(10,35,83,${0.85 * logoOut}) 0%, rgba(10,35,83,${0.6 * logoOut}) 40%, rgba(10,35,83,0) 70%)` }} />
          <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ transform: `scale(${0.6 + logo * 0.4})`, opacity: logo * logoOut, display: 'flex', alignItems: 'center', gap: 34 }}>
              <Logo name="openai" size={170} />
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 120, color: '#fff', letterSpacing: '-0.03em' }}>ChatGPT</div>
            </div>
          </AbsoluteFill>
        </Layer>
      )}
      <Layer z={420} focus={0} dof={0.01}>
        {[[180, 240, 'M12 5v14M5 12h14'], [1650, 300, 'M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 11a7 7 0 0 1-14 0M12 18v4'], [1580, 860, 'M12 19V5M5 12l7-7 7 7']].map(([x, y, d], i) => (
          <div key={i} style={{ position: 'absolute', left: x as number, top: (y as number) + Math.sin(t + i) * 12, width: 92, height: 92, borderRadius: 46, background: 'rgba(48,48,48,0.9)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: win }}>
            <CgIcon d={d as string} s={40} c="#ececec" />
          </div>
        ))}
        <Dust seed="chat" n={10} />
      </Layer>
    </Stage>
  );
};

// ---------- S6 the turn (40.18 – 48.26) · L1 turn plate · L3 words · L4 horizon line ----------
const Turn: React.FC = () => {
  const t = useT() + 40.18;
  const words: [string, number, number][] = [['menjual', 43.34, 44.25], ['mempublikasikan', 45.0, 45.95], ['mendokumentasikan', 46.64, 47.6]];
  const cam = { ry: lerp(t, 40.18, 48.26, 8, -5, Easing.linear), z: lerp(t, 40.18, 48.26, 0, 230, Easing.linear), x: lerp(t, 40.18, 48.26, -70, 40, Easing.linear) + shake(t, 40.18, 12) };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate turn /></Layer>
      <Layer z={0}>
        {words.map(([w, at, strike], i) => {
          const a = sp(t, at);
          const s = lerp(t, strike, strike + 0.35, 0, 1, Easing.bezier(0.6, 0, 0.2, 1));
          if (t < at - 0.05) return null;
          return (
            <div key={w} style={{ position: 'absolute', left: 150, top: 225 + i * 205, display: 'flex', alignItems: 'baseline', gap: 28, opacity: Math.min(1, a * 1.4), transform: `translateX(${(1 - a) * -60}px)` }}>
              <div style={{ position: 'relative', fontFamily: tight, fontWeight: 800, fontSize: 150, color: s > 0.5 ? 'rgba(244,246,255,0.5)' : C.paper, letterSpacing: '-0.04em' }}>
                {w}
                <div style={{ position: 'absolute', left: -10, top: '54%', height: 12, width: `calc(${s * 100}% + 20px)`, background: `linear-gradient(90deg, ${C.red}, ${P.violet})`, boxShadow: '0 0 22px rgba(255,77,109,0.6)' }} />
              </div>
              <div style={{ fontFamily: serif, fontSize: 64, color: C.mute }}>apa pun.</div>
            </div>
          );
        })}
      </Layer>
      <Layer z={220}>
        <div style={{ position: 'absolute', left: -400, top: 540, height: 3, width: lerp(t, 40.3, 43.2, 0, 2700, Easing.bezier(0.4, 0, 0.2, 1)), background: `linear-gradient(90deg, rgba(255,77,109,0), ${C.red}, ${P.violet})`, opacity: lerp(t, 43.0, 43.4, 0.95, 0), boxShadow: `0 0 18px ${C.red}` }} />
      </Layer>
      <Layer z={520} focus={0} dof={0.012}><Dust seed="turn" n={14} cols={[C.red, P.violet, P.pink]} /></Layer>
    </Stage>
  );
};

// ---------- timeline scenes ----------
const BigMonths: React.FC<{ camX: number; zoom: number; factor: number; a?: number }> = ({ camX, zoom, factor, a = 1 }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: 1080, transformOrigin: '0 50%', transform: `translateX(960px) scale(${zoom}) translateX(${-camX * factor}px)`, opacity: a }}>
    {MONTHS.filter((_, i) => i % 2 === 0).map((m) => (
      <div key={m.x} style={{ position: 'absolute', left: m.x * factor, top: 880, fontFamily: serif, fontSize: 120, color: 'rgba(244,246,255,0.16)', whiteSpace: 'nowrap' }}>{m.label.toLowerCase()}</div>
    ))}
  </div>
);
// S7 year (48.26 – 51.9): L2 timeline · L3 big month names (faster parallax) · L4 dust
const Year: React.FC = () => {
  const t = useT() + 48.26;
  const cam = lerp(t, 48.4, 51.9, 260, WIDTH - 260, Easing.bezier(0.45, 0, 0.25, 1));
  const stage = { ry: lerp(t, 48.26, 51.9, -7, 5, Easing.linear), z: 60, rx: 4 };
  return (
    <Stage cam={stage}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}><TimelineWorld t={t} camX={cam} zoom={1} reveal={(c) => lerp(cam - c.anchor, -40, 60, 0, 1)} /></Layer>
      <Layer z={240}><BigMonths camX={cam} zoom={1} factor={1.35} /></Layer>
      <Layer z={560} focus={0} dof={0.012}><div style={{ transform: `translateX(${-(cam % 2600) * 0.6}px)` }}><Dust seed="year" n={18} /></div></Layer>
    </Stage>
  );
};
// agents world (51.9 – 56.45)
const AgentsScene: React.FC = () => {
  const t = useT() + 51.9;
  return <AgentsWorld t={t} t0={51.9} font={{ inter, tight, mono }} out={1} />;
};
// reveal (56.45 – 58.58)
const AGENT_ROW: ('fred' | 'malu' | 'cloe' | 'vita' | 'nexo' | 'yoshi')[] = ['fred', 'cloe', 'malu', 'vita', 'nexo', 'yoshi'];
const ZALL = 1920 / (WIDTH + 200);
const Reveal: React.FC = () => {
  const t = useT() + 56.45;
  const out = lerp(t, 56.45, 57.6, 0, 1, io);
  const zoom = 1.6 + (ZALL - 1.6) * out;
  const camX = (WIDTH - 900) + (WIDTH / 2 - (WIDTH - 900)) * out;
  const stage = { rx: lerp(t, 56.45, 58.58, 10, 3, ease), z: lerp(t, 56.45, 58.58, -80, 40, Easing.linear) };
  return (
    <Stage cam={stage}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}><TimelineWorld t={t} camX={camX} zoom={zoom} reveal={() => 1} /></Layer>
      <Layer z={120}><GhHeader a={lerp(t, 56.9, 57.5, 0, 1)} /></Layer>
      <Layer z={220}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 170, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {AGENT_ROW.map((id, i) => {
            const a = sp(t, 57.0 + i * 0.07);
            return <div key={id} style={{ transform: `scale(${a}) translateY(${(1 - a) * 60}px)`, opacity: Math.min(1, a * 1.4) }}><Agent id={id} size={130} t={t} seed={i} /></div>;
          })}
        </div>
      </Layer>
    </Stage>
  );
};
// S8 sadar (58.58 – 62.4)
const Sadar: React.FC = () => {
  const t = useT() + 58.58;
  const d = lerp(t, 58.6, 59.6, 1, 0.12, io);
  const stage = { z: lerp(t, 58.58, 62.4, 0, 260, Easing.linear), rx: 3 };
  return (
    <Stage cam={stage}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={-200}><div style={{ filter: `blur(${lerp(t, 58.6, 59.6, 0, 7)}px)` }}><TimelineWorld t={t} camX={WIDTH / 2} zoom={ZALL} reveal={() => 1} dimAll={d} /></div></Layer>
      <Layer z={140}><Big t={t} at={59.9} out={62.4} style={{ left: 0, right: 0, textAlign: 'center', top: 420, fontSize: 190 }}>sadar.</Big></Layer>
      <Layer z={560} focus={0} dof={0.012}><Dust seed="sadar" n={12} /></Layer>
    </Stage>
  );
};

// ---------- S9 + S10 sea of builders (62.4 – 73.64) · L2 grid · L3 words · L4 lit cells + logos ----------
const LIT = [[7, 3], [22, 9], [41, 5], [13, 14], [33, 12], [52, 15], [28, 2]];
const Sea: React.FC = () => {
  const t = useT() + 62.4;
  const k2 = sp(t, 64.92, { damping: 20 }), k3 = sp(t, 67.16, { damping: 22, stiffness: 90 });
  const cell = 290 * (1 - 0.62 * k2) * (1 - 0.82 * k3);
  const show = lerp(t, 63.2, 63.5, 0, 1);
  const lit = lerp(t, 69.4, 70.0, 0, 1);
  const logoOut = lerp(t, 72.55, 72.85, 1, 0, io);
  const words: [string, number, number][] = [['membangun.', 63.34, 64.85], ['membuat.', 64.92, 66.6], ['bikin software.', 66.82, 67.5]];
  const gridAlpha = 1 - 0.65 * lit;
  const stage = { z: lerp(t, 62.4, 73.64, 0, 200, Easing.linear), ry: lerp(t, 62.4, 73.64, 4, -4, Easing.linear), rx: 6 };
  return (
    <Stage cam={stage}>
      <Layer z={-900}><BackPlate grid={false} /></Layer>
      <Layer z={-250}>
        <svg width="3000" height="2000" style={{ position: 'absolute', left: -540, top: -460, opacity: show }}>
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={P.indigo} stopOpacity={0.35 * gridAlpha} /><stop offset="1" stopColor={P.cyan} stopOpacity={0.15 * gridAlpha} /></linearGradient>
            <pattern id="cells" width={cell} height={cell * 0.62} patternUnits="userSpaceOnUse" x={1500 - cell / 2} y={1000 - cell * 0.31}>
              <rect x={cell * 0.06} y={cell * 0.05} width={cell * 0.88} height={cell * 0.52} rx={cell * 0.03} fill="url(#cg)" stroke={`rgba(244,246,255,${0.18 * gridAlpha})`} strokeWidth={Math.max(0.5, cell * 0.004)} />
              <rect x={cell * 0.12} y={cell * 0.12} width={cell * 0.4} height={cell * 0.05} rx={cell * 0.01} fill={`rgba(244,246,255,${0.3 * gridAlpha})`} />
              <rect x={cell * 0.12} y={cell * 0.4} width={cell * 0.25} height={cell * 0.035} fill={`rgba(244,246,255,${0.16 * gridAlpha})`} />
            </pattern>
          </defs>
          <rect width="3000" height="2000" fill="url(#cells)" />
        </svg>
      </Layer>
      <Layer z={110}>
        {lit > 0 && LIT.map(([cx, cy], i) => {
          const x = 960 - cell / 2 + (cx - 26) * cell + cell * 0.06, y = 540 - cell * 0.31 + (cy - 8) * cell * 0.62 + cell * 0.05;
          const a = lerp(t, 69.4 + i * 0.09, 69.9 + i * 0.09, 0, 1);
          return <div key={i} style={{ position: 'absolute', left: x, top: y - a * 18, width: cell * 0.88, height: cell * 0.52, borderRadius: 3, background: `linear-gradient(135deg, #fff, ${P.lilac})`, opacity: a, transform: `scale(${1 + a * 1.6})`, boxShadow: `0 0 ${34 * a}px rgba(86,225,233,0.9)` }} />;
        })}
      </Layer>
      <Layer z={170}>
        {words.map(([w, a, o]) => <Big key={w} t={t} at={a} out={o} font="tight" style={{ left: 0, right: 0, textAlign: 'center', top: 430, fontSize: 170, textShadow: '0 10px 50px rgba(5,10,40,0.9)' }}>{w}</Big>)}
        <Big t={t} at={72.88} out={73.64} style={{ left: 0, right: 0, textAlign: 'center', top: 430, fontSize: 170, textShadow: '0 10px 50px rgba(5,10,40,0.9)' }}>belum sempurna.</Big>
      </Layer>
      <Layer z={320}>
        {['instagram', 'youtube', 'tiktok', 'threads', 'x', 'linkedin'].map((n, i) => {
          const a = sp(t, 71.24 + i * 0.07) * logoOut;
          if (t < 71.2 || a <= 0.001) return null;
          const ang = (-150 + i * 60) * (Math.PI / 180);
          return (
            <div key={n} style={{ position: 'absolute', left: 960 + Math.cos(ang) * 360 - 55, top: 500 + Math.sin(ang) * 280 - 55, width: 110, height: 110, borderRadius: 55, background: `linear-gradient(135deg, ${P.indigo}, ${P.violet})`, boxShadow: '0 12px 40px rgba(91,88,235,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: a, transform: `scale(${0.5 + a * 0.5})` }}>
              <Logo name={n} size={52} />
            </div>
          );
        })}
      </Layer>
      <Layer z={560} focus={0} dof={0.012}><Dust seed="sea" n={14} /></Layer>
    </Stage>
  );
};

// ---------- S11 loop (73.64 – 82.4) · L2 ring · L3 build bar + word · L4 dust ----------
const Loop: React.FC = () => {
  const t = useT() + 73.64;
  const stop = 81.0;
  const tt = Math.min(t, stop);
  const u = tt - 73.64;
  const phase = 0.6 * u + 0.07 * u * u;
  const prog = t >= stop ? 0.99 : Math.min(0.94, (phase % 1) * 1.08);
  const rot = phase * 360;
  const kec = t >= 75.8 && t < 77.45;
  const blink = t >= stop ? (Math.floor((t - stop) * 4) % 2 ? 1 : 0.35) : 1;
  const pub = sp(t, 80.04);
  const R = 300;
  const col = t >= stop ? C.red : C.paper;
  const stage = { ry: Math.sin(Math.min(t, stop) * 0.9) * 8, rx: 5, z: lerp(t, 73.64, 81.0, 0, 200, Easing.linear) + shake(t, stop, 10) };
  return (
    <Stage cam={stage}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={-60}>
        <svg width="1920" height="1080" style={{ position: 'absolute', opacity: lerp(t, 73.64, 74.1, 0, 1) }}>
          <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={t >= stop ? C.red : P.cyan} /><stop offset="1" stopColor={P.violet} /></linearGradient></defs>
          <g transform={`translate(960 500) rotate(${rot})`}>
            <circle r={R} fill="none" stroke="rgba(244,246,255,0.12)" strokeWidth="2" />
            <path d={`M ${R} 0 A ${R} ${R} 0 1 1 ${R * Math.cos(-0.5)} ${R * Math.sin(-0.5)}`} fill="none" stroke="url(#rg)" strokeWidth="6" strokeLinecap="round" />
            <path d={`M ${R * Math.cos(-0.5)} ${R * Math.sin(-0.5)} l 2 34 m -2 -34 l 32 10`} stroke={t >= stop ? C.red : P.violet} strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </Layer>
      <Layer z={90}>
        {!kec && (
          <div style={{ position: 'absolute', left: 960 - 230, top: 440, width: 460, opacity: lerp(t, 73.8, 74.2, 0, 1) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 22, color: C.mute, marginBottom: 14 }}>
              <span>building…</span><span style={{ color: col, opacity: blink }}>{Math.floor(prog * 100)}%</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: 'rgba(244,246,255,0.12)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${prog * 100}%`, background: t >= stop ? C.red : `linear-gradient(90deg, ${P.cyan}, ${P.violet})`, opacity: blink }} />
            </div>
            {t >= 79.95 && (
              <div style={{ marginTop: 34, display: 'flex', justifyContent: 'center', transform: `scale(${0.8 + pub * 0.2})`, opacity: pub }}>
                <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 24, color: 'rgba(244,246,255,0.35)', border: '1px solid rgba(244,246,255,0.2)', borderRadius: 8, padding: '10px 26px' }}>Publish</div>
              </div>
            )}
          </div>
        )}
        <Big t={t} at={75.86} out={77.45} style={{ left: 0, right: 0, textAlign: 'center', top: 430, fontSize: 150 }}>kecanduan.</Big>
      </Layer>
      <Layer z={540} focus={0} dof={0.012}><Dust seed="loop" n={14} /></Layer>
    </Stage>
  );
};

// ---------- S12 decision (82.4 – 97.5) ----------
const Decision: React.FC = () => {
  const t = useT() + 82.4;
  const first = LAYOUT[0];
  const rw = lerp(t, 82.5, 85.2, 0, 1, Easing.bezier(0.7, 0, 0.2, 1));
  const zoom = ZALL + (1.9 - ZALL) * rw;
  const camX = WIDTH / 2 + (first.x + CW / 2 - WIDTH / 2) * rw;
  const ring = lerp(t, 85.12, 86.2, 0, 1);
  const toGrid = t >= 89.25;
  const posts: { at: number; el: React.ReactNode }[] = [
    { at: 89.66, el: <Img src={staticFile('shots/face_end.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '53% 30%' }} /> },
    { at: 91.1, el: <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${P.lilac}, ${P.pink})`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 18, boxSizing: 'border-box' }}>{(['fred', 'malu', 'cloe'] as const).map((id, k) => <Agent key={id} id={id} size={74} t={t} seed={k} />)}</div> },
    { at: 92.1, el: <div style={{ width: '100%', height: '100%', background: '#212121', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}><Logo name="openai" size={54} /><div style={{ width: '78%', height: 26, borderRadius: 13, background: '#303030', fontFamily: inter, fontSize: 12, color: '#ececec', display: 'flex', alignItems: 'center', paddingLeft: 12, boxSizing: 'border-box' }}>build something</div></div> },
    ...[0, 13, 26, 20, 29, 30].map((ri, k) => ({
      at: 92.45 + k * 0.17,
      el: <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${P.navy}, ${P.indigo})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RepoCard r={(REPOS as any)[ri]} w={230} style={{ transform: 'scale(0.82)' }} /></div>,
    })),
  ];
  const fade = lerp(t, 96.4, 97.5, 1, 0, io);
  if (!toGrid) {
    const stage = { z: lerp(t, 82.4, 85.2, -250, 120, Easing.bezier(0.7, 0, 0.2, 1)) + lerp(t, 85.2, 89.25, 0, 90, Easing.linear), ry: lerp(t, 82.4, 85.2, 10, 0, ease), rx: 4 };
    return (
      <Stage cam={stage}>
        <Layer z={-900}><BackPlate /></Layer>
        <Layer z={0}><div style={{ filter: `blur(${Math.sin(rw * Math.PI) * 5}px)` }}><TimelineWorld t={t} camX={camX} zoom={zoom} reveal={() => 1} focusIdx={t > 84.6 ? 0 : -1} /></div></Layer>
        <Layer z={160}>{ring > 0 && <div style={{ position: 'absolute', left: 960 - 330, top: 540 - 330, width: 660, height: 660, borderRadius: 330, border: `3px solid ${P.cyan}`, transform: `scale(${0.5 + ring * 0.7})`, opacity: 1 - ring, boxShadow: `0 0 40px ${P.cyan}` }} />}</Layer>
        <Layer z={560} focus={0} dof={0.012}><div style={{ transform: `translateX(${rw * 1400}px)` }}><Dust seed="dec" n={16} /></div></Layer>
      </Stage>
    );
  }
  const stage = { z: lerp(t, 89.25, 97.5, -160, 140, Easing.linear), ry: lerp(t, 89.25, 97.5, -5, 3, Easing.linear), rx: 3 };
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Stage cam={stage}>
        <Layer z={-900}><BackPlate /></Layer>
        <Layer z={40}>
          <div style={{ position: 'absolute', left: 960 - 330, top: 70, display: 'flex', alignItems: 'center', gap: 16 }}>
            <Logo name="instagram" size={40} color={C.paper} />
            <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 30, color: C.paper }}>siirfannih</div>
          </div>
        </Layer>
        <Layer z={110}>
          <div style={{ position: 'absolute', left: 960 - 330, top: 136, width: 660, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {Array.from({ length: 9 }).map((_, i) => {
              const p = posts[i];
              const a = p ? sp(t, p.at, { damping: 15 }) : 0;
              return (
                <div key={i} style={{ aspectRatio: '4 / 5', background: 'rgba(244,246,255,0.05)', border: '1px dashed rgba(244,246,255,0.14)', position: 'relative', overflow: 'hidden' }}>
                  {a > 0.001 && <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, a * 1.3), transform: `scale(${1.15 - a * 0.15})` }}>{p.el}</div>}
                </div>
              );
            })}
          </div>
        </Layer>
        <Layer z={560} focus={0} dof={0.012}><Dust seed="grid" n={14} /></Layer>
      </Stage>
    </AbsoluteFill>
  );
};

// ---------- main: HUD (wipes, captions, grain) sits above every stage ----------
export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: P.deep }}>
    <GradBG />
    <Sequence {...S(0, 15.68)}><Face /></Sequence>
    <Sequence {...S(15.68, 19.68)}><Unik /></Sequence>
    <Sequence {...S(19.68, 25.8)}><Motivasi /></Sequence>
    <Sequence {...S(25.8, 32.66)}><Fomo /></Sequence>
    <Sequence {...S(32.66, 40.18)}><Chat /></Sequence>
    <Sequence {...S(40.18, 48.26)}><Turn /></Sequence>
    <Sequence {...S(48.26, 51.9)}><Year /></Sequence>
    <Sequence {...S(51.9, 56.45)}><AgentsScene /></Sequence>
    <Sequence {...S(56.45, 58.58)}><Reveal /></Sequence>
    <Sequence {...S(58.58, 62.4)}><Sadar /></Sequence>
    <Sequence {...S(62.4, 73.64)}><Sea /></Sequence>
    <Sequence {...S(73.64, 82.4)}><Loop /></Sequence>
    <Sequence {...S(82.4, TOTAL)}><Decision /></Sequence>
    <BlockWipe />
    <Captions />
    <Grain />
  </AbsoluteFill>
);
