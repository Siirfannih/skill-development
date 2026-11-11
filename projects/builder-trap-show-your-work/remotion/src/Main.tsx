import React from 'react';
import {
  AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame,
  interpolate, spring, Easing, random,
} from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadOutfit } from '@remotion/google-fonts/Outfit';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { loadFont as loadSerif } from '@remotion/google-fonts/InstrumentSerif';
import { SpinPop, StackPair, BlurScatter, Counter, ColorFlash, Slam, ScaleSettle, SlotSwap, Converge, Chaotic, Label } from './Type';
import CAPS from './captions.json';
import REPOS from '../public/data/repos.json';
import { AgentsWorld, Agent } from './Agents';
import { Stage, Layer } from './Stage';
import { ThreadsWeb, ThreadsModal, ThreadPostData, InstagramPhone, OpenBotWindow, OB_ROWS, CalendarCard, MiniMonth, Repo, monthKey, CUBES, Cube, Circuits, DeskScene, NightBG } from './Ui';
import type { AgentId } from './Agents';

export const FPS = 30;
export const TOTAL = 97.5;

const inter = loadInter('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] }).fontFamily;
const outfit = loadOutfit('normal', { weights: ['400', '500', '600', '700', '800'], subsets: ['latin'] }).fontFamily;
const serif = loadSerif('italic', { weights: ['400'], subsets: ['latin'] }).fontFamily;
const mono = loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] }).fontFamily;

// Palette locked from palettes.json: jadisatu-terang (primary, white) + jadisatu-gelap (dark moments only).
// Brand rule (guide/visual, Irfan 7 Nov): white, blue for icons/accents. Gradients are linear and only in
// two moments (the turn = dark, "sadar" = blue). No radial gradients anywhere (Irfan 11 Nov).
const T = { bg: '#F6F5F1', card: '#FFFFFF', ink: '#282723', sub: '#6B6A64', acc: '#1A3AD0', soft: '#DCE4FF', navy: '#0A1A4A', line: 'rgba(40,39,35,0.06)' };
const D = { bg: '#0B0D0F', surf: '#17181C', text: '#F4F5F7', acc: '#2B47FF', accText: '#6F8DFF', navy: '#13245E' };
const GRAD = {
  dark: `linear-gradient(160deg, ${D.bg} 0%, #10162A 55%, ${D.navy} 100%)`,
  blue: `linear-gradient(135deg, ${T.acc} 0%, #12309F 50%, ${T.navy} 100%)`,
};
// moments where captions turn white
const DARK: [number, number][] = [[0, 15.68], [32.66, 35.9], [40.4, 47.6], [51.9, 56.45], [58.58, 62.4]];
const isDark = (t: number) => DARK.some(([a, b]) => t >= a && t < b);
// safe frame (Irfan 11 Nov red zone): objects live inside it unless the camera pushes them out
const FONTS = () => ({ display: outfit, text: inter, serif, mono });
const SAFE = { x0: 165, x1: 1755, y0: 140, y1: 935 };

// ---------- helpers ----------
const useT = () => useCurrentFrame() / FPS;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const io = Easing.bezier(0.65, 0, 0.35, 1);
const lerp = (t: number, a: number, b: number, v0: number, v1: number, e = ease) =>
  interpolate(t, [a, b], [v0, v1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });
const sp = (t: number, at: number, cfg: any = {}) =>
  spring({ frame: Math.round((t - at) * FPS), fps: FPS, config: { damping: 16, stiffness: 140, mass: 0.7, ...cfg } });
const S = (from: number, to: number) => ({ from: Math.round(from * FPS), durationInFrames: Math.round((to - from) * FPS) });
const shake = (t: number, at: number, amp = 10, dur = 0.35) => (t > at && t < at + dur ? Math.sin((t - at) * 95) * amp * (1 - (t - at) / dur) : 0);
const typeN = (t: number, a: number, b: number, n: number) => Math.floor(lerp(t, a, b, 0, n, Easing.linear));

// kinetic word: blur-in, rise
const Big: React.FC<{ t: number; at: number; out?: number; children: React.ReactNode; style?: React.CSSProperties; color?: string; weight?: number }> = ({ t, at, out = 999, children, style, color = T.ink, weight = 700 }) => {
  const a = lerp(t, at, at + 0.45, 0, 1);
  const o = out < 999 ? lerp(t, out - 0.25, out, 1, 0, io) : 1;
  if (t < at - 0.05 || t > out + 0.05) return null;
  return (
    <div style={{
      position: 'absolute', color, opacity: a * o, filter: `blur(${(1 - a) * 12 + (1 - o) * 8}px)`,
      transform: `translateY(${(1 - a) * 24 - (1 - o) * 16}px)`, fontFamily: outfit, fontWeight: weight,
      lineHeight: 1, letterSpacing: '-0.035em', whiteSpace: 'nowrap', ...style,
    }}>{children}</div>
  );
};

// grain only (no vignette)
const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', opacity: 0.06, mixBlendMode: 'overlay' }}>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={f % 12} stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

// L1 back plate (oversized so camera moves never show an edge)
const BackPlate: React.FC<{ mood?: 'light' | 'dark' | 'blue'; grid?: boolean }> = ({ mood = 'light', grid = true }) => (
  <div style={{ position: 'absolute', left: -1600, top: -1100, width: 5120, height: 3280, background: mood === 'light' ? T.bg : mood === 'dark' ? GRAD.dark : GRAD.blue }}>
    {grid && <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${mood === 'light' ? T.line : 'rgba(244,245,247,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${mood === 'light' ? T.line : 'rgba(244,245,247,0.06)'} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />}
  </div>
);

// pixel-block wipe (ref 03), blue family only
const WIPES = [15.68, 40.18, 48.26, 51.9, 62.4, 82.4, 87.6];
const BlockWipe: React.FC = () => {
  const t = useT();
  const at = WIPES.find((w) => Math.abs(t - w) < 0.5);
  if (at === undefined) return null;
  const cols = 12, rows = 7, bw = 1920 / cols, bh = 1080 / rows;
  const grads = [
    `linear-gradient(90deg, rgba(26,58,208,0) 0%, ${T.acc} 40%, ${T.soft} 100%)`,
    `linear-gradient(90deg, #FFFFFF 0%, ${T.soft} 50%, ${T.acc} 100%)`,
    `linear-gradient(90deg, rgba(10,26,74,0) 0%, ${T.navy} 35%, ${T.acc} 100%)`,
    `linear-gradient(90deg, ${T.soft} 0%, #FFFFFF 60%, rgba(255,255,255,0) 100%)`,
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

// ---------- captions (inside the safe frame) ----------
const HIDE: [number, number][] = [[21.5, 25.75]];
// emphasis windows: caption steps back while the big word carries the line
const EMPH: [number, number][] = [[0, 1.6], [1.6, 6.4], [8.45, 10.9], [11.9, 15.4], [16.78, 19.68], [31.86, 32.7], [59.9, 62.3], [63.2, 67.5], [72.88, 73.62], [75.86, 77.4]];
const Captions: React.FC = () => {
  const t = useT();
  if (HIDE.some(([a, b]) => t >= a && t < b)) return null;
  const c = (CAPS as any).caps.find((x: any) => t >= x.s - 0.05 && t < x.e);
  if (!c) return null;
  const dark = isDark(t);
  const back = EMPH.some(([a, b]) => t >= a && t < b) ? 0.38 : 1;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 1080 - SAFE.y1 + 10, display: 'flex', justifyContent: 'center' }}>
      <div style={{ opacity: back, transform: `scale(${0.92 + back * 0.08})`, fontFamily: inter, fontWeight: 600, fontSize: 56, color: dark ? '#FFFFFF' : T.ink, textShadow: dark ? '0 2px 12px rgba(0,0,0,0.7)' : '0 1px 8px rgba(255,255,255,0.9)' }}>
        {c.words.map(([ws, w]: [number, string], i: number) => (
          <span key={i} style={{ opacity: lerp(t, ws - 0.06, ws + 0.06, 0, 1), marginRight: 10 }}>{w}</span>
        ))}
      </div>
    </div>
  );
};

const Icon: React.FC<{ d: string; s?: number; c?: string; w?: number }> = ({ d, s = 20, c = T.ink, w = 1.8 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const Cursor: React.FC<{ x: number; y: number; press?: number; dark?: boolean }> = ({ x, y, press = 0, dark }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" style={{ position: 'absolute', left: x, top: y, transform: `scale(${1 - press * 0.15})`, transformOrigin: '10% 10%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}>
    <path d="M4 2l15 9-6.5 1.6L9.4 19z" fill={dark ? '#FFFFFF' : '#111111'} stroke={dark ? '#111' : '#fff'} strokeWidth="1.2" />
  </svg>
);
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

// ---------- timeline (real repos) ----------
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
const ZALL = 1590 / (WIDTH + 100); // whole year fits the safe width
const MONTHS = Array.from({ length: 13 }).map((_, i) => {
  const y = 2025 + Math.floor((10 + i) / 12), m = (10 + i) % 12;
  return { x: 260 + ((Date.UTC(y, m, 1) - T0) / 864e5) * DAY, label: ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'][m] + (m === 0 || i === 0 ? ` ${y}` : '') };
});
const TimelineWorld: React.FC<{ camX: number; zoom: number; reveal: (c: typeof LAYOUT[0], i: number) => number; dimAll?: number; focusIdx?: number; onDark?: boolean }> = ({ camX, zoom, reveal, dimAll = 1, focusIdx = -1, onDark }) => {
  const lineC = onDark ? 'rgba(244,245,247,0.45)' : 'rgba(40,39,35,0.35)';
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: 1080, transformOrigin: '0 50%', transform: `translateX(960px) scale(${zoom}) translateX(${-camX}px)` }}>
      <div style={{ position: 'absolute', left: 0, top: AXIS, width: WIDTH, height: 2, background: lineC, opacity: dimAll }} />
      {MONTHS.map((m) => (
        <div key={m.x} style={{ position: 'absolute', left: m.x, top: AXIS - 10, opacity: dimAll }}>
          <div style={{ width: 2, height: 20, background: lineC }} />
          <div style={{ position: 'absolute', top: 30, left: 8, fontFamily: mono, fontSize: 15, color: onDark ? 'rgba(244,245,247,0.6)' : T.sub, whiteSpace: 'nowrap', letterSpacing: '0.12em' }}>{m.label}</div>
        </div>
      ))}
      {LAYOUT.map((c, i) => {
        const a = reveal(c, i);
        if (a <= 0) return null;
        const f = focusIdx < 0 || focusIdx === i ? 1 : 0.15;
        return (
          <React.Fragment key={c.r[0]}>
            <div style={{ position: 'absolute', left: c.anchor, top: Math.min(AXIS, c.y + CH), width: 1, height: Math.abs(AXIS - (c.y < AXIS ? c.y + CH : c.y)), background: lineC, opacity: a * dimAll * f * 0.6 }} />
            <div style={{ position: 'absolute', left: c.anchor - 4, top: AXIS - 4, width: 10, height: 10, borderRadius: 5, background: T.acc, opacity: a * f }} />
            <div style={{ position: 'absolute', left: c.x, top: c.y, opacity: Math.min(1, a * 1.5) * dimAll * f, transform: `translateY(${(1 - a) * (c.y < AXIS ? 30 : -30)}px) scale(${0.9 + a * 0.1})` }}>
              <RepoCard r={c.r} w={CW} style={{ boxShadow: '0 8px 24px rgba(40,39,35,0.10)' }} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
const GhHeader: React.FC<{ a: number }> = ({ a }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: SAFE.y0 + 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: a, transform: `translateY(${(1 - a) * -20}px)` }}>
    <Logo name="github" size={44} color={T.ink} />
    <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 32, color: T.ink }}>Siirfannih</div>
    <div style={{ fontFamily: inter, fontSize: 30, color: T.sub }}>·</div>
    <div style={{ fontFamily: inter, fontSize: 30, color: T.ink }}>Repositories</div>
    <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 22, color: T.ink, background: 'rgba(40,39,35,0.08)', borderRadius: 20, padding: '2px 14px' }}>{LAYOUT.length}</div>
  </div>
);

// ---------- S1 face (0 – 15.68) · L2 footage · L3 words in the free wall zones ----------
const Face: React.FC = () => {
  const t = useT();
  const B = t >= 11.07;
  const z = B ? (t < 15.0 ? lerp(t, 11.07, 15.0, 330, 400, Easing.linear) : lerp(t, 15.0, 15.68, 400, 1450, Easing.in(Easing.cubic))) : lerp(t, 0, 11.07, 0, 150, Easing.linear) + lerp(t, 0, 0.4, 70, 0, ease);
  const cam = { z, x: B ? 30 : 0, y: B ? 40 : 0, ry: B ? lerp(t, 11.07, 15.0, 1, -1, Easing.linear) : lerp(t, 0, 11.07, -1.6, 1.6, Easing.linear) };
  return (
    <Stage cam={cam} mb={lerp(t, 15.1, 15.68, 0, 7, Easing.in(Easing.cubic))}>
      <Layer z={-150}>
        <AbsoluteFill style={{ transform: 'scale(1.08)' }}>
          <OffthreadVideo src={staticFile('face.mp4')} muted style={{ width: 1920, height: 1080, filter: 'contrast(1.1) saturate(0.85) brightness(1.02)' }} />
        </AbsoluteFill>
      </Layer>
      <Layer z={-120}>
        <SpinPop t={t} at={-0.2} out={1.62} x={1213} y={630} text="terobsesi" size={84} shadow fonts={FONTS()} />
        <StackPair t={t} at={1.66} out={6.4} x={1213} y={590} small="sama" big="kesempurnaan." size={70} shadow fonts={FONTS()} />
        <BlurScatter t={t} at={8.45} out={10.75} x={1213} y={630} text="siapa pun." size={84} shadow fonts={FONTS()} />
        <Counter t={t} at={11.9} out={15.4} x={1226} y={610} to={20} suffix="-an" size={110} shadow fonts={FONTS()} />
      </Layer>
    </Stage>
  );
};

// ---------- S2 unik (15.68 – 19.68) · L2 people · L3 word · L4 photo ----------
const Person: React.FC<{ dim: number }> = ({ dim }) => (
  <div style={{ width: 150, height: 190, background: T.card, borderRadius: 10, position: 'relative', overflow: 'hidden', border: `1px solid rgba(40,39,35,0.08)`, opacity: dim }}>
    <svg width="150" height="190" viewBox="0 0 150 190" style={{ position: 'absolute' }}>
      <circle cx="75" cy="80" r="26" fill="rgba(40,39,35,0.12)" />
      <path d="M26 190 C26 138 124 138 124 190 Z" fill="rgba(40,39,35,0.12)" />
    </svg>
  </div>
);
const Unik: React.FC = () => {
  const t = useT() + 15.68;
  const p = lerp(t, 15.68, 16.35, 0, 1, io);
  const dim = lerp(t, 16.7, 17.2, 1, 0.45);
  const push = lerp(t, 17.3, 19.68, 0, 1, io);
  const cols = 9, rows = 4, gw = 176, gh = 218;
  const top0 = 540 - (rows * gh) / 2 + 13;
  const cardW = lerp(p, 0, 1, 1920, 150, Easing.linear), cardH = lerp(p, 0, 1, 1080, 190, Easing.linear);
  const cam = { z: push * 980, y: push * -100, ry: lerp(t, 15.68, 19.68, -3, 2, Easing.linear) };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={-300}>
        <div style={{ position: 'absolute', left: 960 - (cols * gw) / 2 + 13, top: top0, opacity: p }}>
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} style={{ display: 'flex', gap: 26, marginBottom: 28 }}>
              {Array.from({ length: cols }).map((__, c) => (
                <div key={c} style={{ opacity: r === 1 && c === 4 ? 0 : 1 }}><Person dim={dim} /></div>
              ))}
            </div>
          ))}
        </div>
      </Layer>
      <Layer z={60}><ColorFlash t={t} at={16.78} out={19.7} x={1100} y={330} text="unik." size={110} color={T.ink} accent={T.acc} fonts={FONTS()} /></Layer>
      <Layer z={150}>
        <div style={{
          position: 'absolute', left: 960 - cardW / 2, top: lerp(p, 0, 1, 0, top0 + gh), width: cardW, height: cardH, padding: p * 6, background: '#FFFFFF', boxSizing: 'border-box', borderRadius: p * 10,
          transform: `rotate(${p * -2.5}deg)`, boxShadow: `0 ${p * 18}px ${p * 40}px rgba(40,39,35,0.22)`, outline: `${lerp(t, 16.7, 17.0, 0, 3)}px solid ${T.acc}`,
        }}>
          <Img src={staticFile('shots/face_end.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '53% 30%', borderRadius: p * 6 }} />
        </div>
      </Layer>
    </Stage>
  );
};

// ---------- S3 motivasi (19.68 – 25.8) · L2 Instagram phone (real layout) · L3 quote card · L4 quote mark ----------
const Motivasi: React.FC = () => {
  const t = useT() + 19.68;
  const QW = (CAPS as any).words.filter((w: any) => w[0] >= 21.5 && w[0] < 25.5);
  const cin = sp(t, 21.1);
  const out = lerp(t, 21.05, 21.6, 0, 1, io);
  // one focus: the feed first (centre), then one post lifts out and becomes the quote while the phone leaves
  const scroll = 2400 * (1 - Math.exp(-(t - 19.68) * 1.1));
  const cam = { z: lerp(t, 19.68, 21.0, 0, 140, ease) + lerp(t, 21.0, 25.8, 0, 90, Easing.linear), ry: lerp(t, 19.68, 25.8, 3, -3, Easing.linear) };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={-150}><div style={{ transform: `translate(${out * -900}px, ${out * 120}px) rotate(${out * -8}deg)`, filter: `blur(${out * 6}px)` }}><InstagramPhone font={inter} scroll={scroll} x={766} y={150} /></div></Layer>
      <Layer z={0}>
        <div style={{
          position: 'absolute', left: 960 - 420, top: 330, width: 840, padding: '52px 60px', boxSizing: 'border-box', background: '#FFFFFF', color: T.ink, borderRadius: 18,
          transform: `translateY(${(1 - cin) * 60}px) scale(${0.43 + cin * 0.57})`, opacity: t < 21.1 ? 0 : 1, boxShadow: '0 30px 80px rgba(40,39,35,0.18)',
        }}>
          <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 60, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {QW.map(([ws, , w]: any, i: number) => (
              <span key={i} style={{ opacity: lerp(t, ws - 0.05, ws + 0.12, 0.15, 1), marginRight: 16, display: 'inline-block' }}>{i === 0 ? 'K' + w.slice(1) : w}{i === QW.length - 1 ? '.' : ''}</span>
            ))}
          </div>
        </div>
      </Layer>
      <Layer z={200}>
        {t >= 21.1 && <div style={{ position: 'absolute', left: 515, top: 215, fontFamily: outfit, fontWeight: 800, fontSize: 220, lineHeight: 1, color: T.acc, transform: `translateY(${(1 - cin) * 160}px) scale(${0.6 + cin * 0.4})` }}>“</div>}
      </Layer>
    </Stage>
  );
};

// ---------- S4 FOMO (25.8 – 32.66) · L2 trend rows at 5 depths · L4 photo · L3 slam ----------
const Fomo: React.FC = () => {
  const t = useT() + 25.8;
  const slam = sp(t, 31.86, { damping: 11, stiffness: 220 });
  const cam = { x: lerp(t, 25.8, 32.66, 0, -160, Easing.linear) + shake(t, 31.86, 14), z: lerp(t, 25.8, 31.8, 0, 140, Easing.linear) + slam * 60, ry: lerp(t, 25.8, 32.66, -4, 3, Easing.linear) };
  const blur = lerp(t, 31.7, 31.9, 0, 4);
  const ZR = [-1000, -720, -480, -280, -110];
  return (
    <Stage cam={cam}>
      <Layer z={-1100}><BackPlate /></Layer>
      {ZR.map((z, r) => (
        <Layer key={r} z={z}>
          <div style={{ position: 'absolute', top: 60 + r * 200, left: -((t - 25.8) * (380 + r * 70)) % 260 - 900, display: 'flex', gap: 30, filter: `blur(${blur}px)`, opacity: lerp(t, 31.8, 32.0, 1, 0.5) }}>
            {Array.from({ length: 16 }).map((__, i) => (
              <div key={i} style={{ width: 230, height: 150, borderRadius: 10, background: '#FFFFFF', border: '1px solid rgba(40,39,35,0.08)', position: 'relative', boxShadow: '0 6px 16px rgba(40,39,35,0.06)' }}>
                <div style={{ position: 'absolute', left: 12, top: 12, right: 12, height: 92, borderRadius: 6, background: `linear-gradient(180deg, ${T.soft}, #FFFFFF)`, overflow: 'hidden' }}>
                  <svg width="206" height="92" viewBox="0 0 206 92"><circle cx="103" cy="38" r="15" fill={T.navy} /><path d="M73 92 C73 62 133 62 133 92 Z" fill={T.navy} /></svg>
                  <div style={{ position: 'absolute', left: 8, top: 8 }}><Logo name={['instagram', 'tiktok', 'youtube', 'threads'][i % 4]} size={18} color={T.ink} /></div>
                </div>
                <div style={{ position: 'absolute', left: 14, bottom: 14, display: 'flex', alignItems: 'center', gap: 6, fontFamily: inter, fontSize: 14, fontWeight: 600, color: T.ink }}><Icon d="M8 5v14l11-7z" s={16} c={T.ink} />Trending</div>
                <div style={{ position: 'absolute', right: 12, bottom: 12 }}><Icon d="M3 17l6-6 4 4 8-8M15 7h6v6" s={20} c={T.acc} /></div>
              </div>
            ))}
          </div>
        </Layer>
      ))}
      <Layer z={160}>
        <div style={{ position: 'absolute', left: 960 - 95, top: 540 - 120, width: 190, height: 240, padding: 7, background: '#FFFFFF', boxSizing: 'border-box', borderRadius: 10, transform: `rotate(-2deg) translateX(${(t - 25.8) * 22}px)`, boxShadow: '0 20px 50px rgba(40,39,35,0.25)', outline: `3px solid ${T.acc}`, opacity: lerp(t, 31.8, 32.0, 1, 0.35) }}>
          <Img src={staticFile('shots/face_end.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '53% 30%', borderRadius: 6 }} />
        </div>
      </Layer>
      <Layer z={300}>
        <Slam t={t} at={31.86} out={32.7} x={960} y={420} text="FOMO" size={230} color={T.ink} fonts={FONTS()} />
      </Layer>
    </Stage>
  );
};

// ---------- S5 ChatGPT, light theme rebuilt in code (32.66 – 40.18) ----------
const ChatWindow: React.FC<{ t: number }> = ({ t }) => {
  const W = 1400, H = 760;
  const typed = 'build something';
  const n = typeN(t, 39.4, 40.0, typed.length);
  const side = ['New chat', 'Search chats', 'Library', 'Sora', 'GPTs'];
  const icons = ['M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z', 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.8 5.5 21l2-7.5L2 9h7z', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'];
  const send = t > 39.95;
  return (
    <div style={{ position: 'absolute', left: 960 - W / 2, top: 540 - H / 2 - 20, width: W, height: H, borderRadius: 16, overflow: 'hidden', boxShadow: '0 40px 100px rgba(40,39,35,0.18), 0 0 0 1px rgba(40,39,35,0.08)', background: '#FFFFFF', display: 'flex', fontFamily: inter }}>
      <div style={{ width: 280, background: '#F9F9F9', padding: '22px 14px', boxSizing: 'border-box', borderRight: '1px solid #ECECEC' }}>
        <div style={{ padding: '0 10px 22px' }}><Logo name="openai" size={28} color="#0D0D0D" /></div>
        {side.map((x, i) => (
          <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 10px', fontSize: 16, color: '#0D0D0D', opacity: lerp(t, 36.0 + i * 0.06, 36.3 + i * 0.06, 0, 1) }}><Icon d={icons[i]} c="#0D0D0D" />{x}</div>
        ))}
        <div style={{ fontSize: 14, color: '#8F8F8F', padding: '26px 10px 8px' }}>Chats</div>
        {['Belajar AI dari nol', 'Build something', 'Bikin software sendiri', 'Agent untuk riset', 'Workflow konten'].map((x, i) => (
          <div key={x} style={{ padding: '9px 10px', fontSize: 15, color: '#0D0D0D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderRadius: 8, background: i === 1 ? '#ECECEC' : 'transparent', opacity: lerp(t, 36.2 + i * 0.08, 36.5 + i * 0.08, 0, 1) }}>{x}</div>
        ))}
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 26, top: 22, display: 'flex', alignItems: 'center', gap: 6, fontSize: 20, color: '#0D0D0D', fontWeight: 500 }}>ChatGPT <Icon d="M6 9l6 6 6-6" s={16} c="#8F8F8F" /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 270, textAlign: 'center', fontSize: 32, color: '#0D0D0D', fontWeight: 500, opacity: lerp(t, 36.0, 36.4, 0, 1) }}>Where should we begin?</div>
        <div style={{ position: 'absolute', left: 140, right: 140, top: 340, height: 64, borderRadius: 32, background: '#FFFFFF', border: '1px solid #E3E3E3', display: 'flex', alignItems: 'center', padding: '0 14px 0 22px', boxSizing: 'border-box', gap: 14, boxShadow: send ? '0 0 0 3px rgba(26,58,208,0.18), 0 6px 20px rgba(0,0,0,0.08)' : '0 6px 20px rgba(0,0,0,0.06)' }}>
          <Icon d="M12 5v14M5 12h14" s={22} c="#0D0D0D" />
          <div style={{ flex: 1, fontSize: 19, color: n > 0 ? '#0D0D0D' : '#8F8F8F', display: 'flex', alignItems: 'center' }}>
            {n > 0 ? typed.slice(0, n) : 'Ask anything'}
            {t > 39.2 && <span style={{ width: 2, height: 22, background: '#0D0D0D', marginLeft: 2, opacity: Math.floor(t * 3) % 2 ? 1 : 0.15 }} />}
          </div>
          <Icon d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 11a7 7 0 0 1-14 0M12 18v4" s={20} c="#0D0D0D" />
          <div style={{ width: 38, height: 38, borderRadius: 19, background: n > 0 ? '#0D0D0D' : '#E3E3E3', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${send ? 0.88 : 1})` }}>
            <Icon d={n > 0 ? 'M12 19V5M5 12l7-7 7 7' : 'M6 10v4M10 7v10M14 9v6M18 11v2'} s={20} c={n > 0 ? '#FFFFFF' : '#0D0D0D'} />
          </div>
        </div>
      </div>
    </div>
  );
};
// night: character at a desk among floating cubes; the camera dives into the monitor (32.66 – 35.9)
const Night: React.FC = () => {
  const t = useT() + 32.66;
  const dive = lerp(t, 34.9, 35.9, 0, 1, Easing.in(Easing.cubic));
  // monitor screen centre ≈ (985, 646)
  const cam = { z: lerp(t, 32.66, 34.9, 0, 260, Easing.linear) + dive * 1250, x: lerp(t, 32.66, 35.9, -80, 25, Easing.linear), y: lerp(t, 32.66, 35.9, 0, 106, ease), ry: lerp(t, 32.66, 34.9, 6, 0, Easing.linear) };
  const near = CUBES.slice(0, 8), mid = CUBES.slice(8, 18), far = CUBES.slice(18);
  return (
    <AbsoluteFill>
      <NightBG />
      <Stage cam={cam} mb={dive * 6}>
        <Layer z={-900}>{far.map((c, i) => <div key={i} style={{ position: 'absolute', left: c.x, top: c.y }}><Cube s={c.s * 1.4} t={t} ph={c.ph} r={c.r} /></div>)}</Layer>
        <Layer z={-450}><Circuits t={t} t0={32.7} />{mid.map((c, i) => <div key={i} style={{ position: 'absolute', left: c.x, top: c.y - 120 }}><Cube s={c.s} t={t} ph={c.ph} r={c.r} /></div>)}</Layer>
        <Layer z={0}>
          <DeskScene t={t} screenA={lerp(t, 34.6, 35.6, 0, 1)} />
          <div style={{ position: 'absolute', left: 908, top: 598, width: 154, height: 96, overflow: 'hidden', borderRadius: 3, background: T.bg, opacity: lerp(t, 34.4, 34.9, 0, 1) }}>
            <div style={{ width: 1920, height: 1080, transform: 'scale(0.0802)', transformOrigin: '0 0', position: 'relative', background: T.bg }}><ChatWindow t={36.4} /></div>
          </div>
        </Layer>
        <Layer z={380}>{near.map((c, i) => <div key={i} style={{ position: 'absolute', left: c.x < 960 ? c.x - 700 : c.x + 500, top: c.y - 200, filter: 'blur(2px)' }}><Cube s={c.s * 0.9} t={t} ph={c.ph} r={c.r} /></div>)}</Layer>
      </Stage>
    </AbsoluteFill>
  );
};
// ChatGPT, arriving out of the monitor (35.9 – 40.18)
const Chat: React.FC = () => {
  const t = useT() + 35.9;
  const arrive = lerp(t, 35.9, 36.6, 0, 1, ease);
  const dolly = lerp(t, 37.6, 40.18, 0, 1, Easing.bezier(0.5, 0, 0.75, 0));
  const logo = sp(t, 36.2, { damping: 14 });
  const logoOut = lerp(t, 37.3, 37.75, 1, 0, Easing.in(Easing.cubic));
  const cam = { z: 520 * (1 - arrive) + dolly * 650, x: dolly * 140, y: dolly * -28 };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}><ChatWindow t={t} /></Layer>
      {t > 36.1 && logoOut > 0 && (
        <Layer z={260}>
          <div style={{ position: 'absolute', left: -800, top: -600, width: 3520, height: 2280, background: 'rgba(246,245,241,0.94)', transform: `translateY(${(1 - logoOut) * -2400}px)` }} />
          <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - logoOut) * -1100}px)` }}>
            <div style={{ transform: `scale(${0.6 + logo * 0.4})`, display: 'flex', alignItems: 'center', gap: 30 }}>
              <Logo name="openai" size={150} color="#0D0D0D" />
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 110, color: '#0D0D0D', letterSpacing: '-0.03em' }}>ChatGPT</div>
            </div>
          </AbsoluteFill>
        </Layer>
      )}
    </Stage>
  );
};

// ---------- S6 the turn: Threads web, typed then saved to drafts (40.18 – 48.26) ----------
const THREAD_USER = 'builder.diam'; // dummy username (lane siirfan rule)
const BASE_FEED: ThreadPostData[] = [
  { user: 'kreator.ai', tag: 'AI Threads', time: '11h', text: 'Fomo lihat akun yang bikin konten pakai AI, akhirnya coba sendiri. Ada yang workflow-nya sampai publish?', media: 2 },
  { user: 'zyx.creator', tag: 'YouTube Creators', time: '13h', text: 'Udah ngikutin topik yang lagi happening tetap aja nggak viral. Saran dong?', media: 1 },
];
const Turn: React.FC = () => {
  const t = useT() + 40.18;
  const L1 = 'Setahun belajar AI. Ini yang sudah aku bangun:';
  const L2 = 'Buka jasa bikin agent AI, DM ya.';
  const n1 = typeN(t, 40.7, 42.4, L1.length);
  const n2 = typeN(t, 43.34, 43.95, L2.length);
  const sel = t > 44.08 && t < 44.3;
  const modal = lerp(t, 40.3, 40.6, 0, 1, ease) * (1 - lerp(t, 47.45, 47.7, 0, 1, io));
  const dialog = t >= 47.0 && t < 47.45 ? sp(t, 47.0, { damping: 14 }) : 0;
  // cursor path in page px: Post ≈ (1274, 652), Cancel ≈ (628, 356), Save ≈ (960, 481)
  const P = [1274, 652], CN = [628, 356], SV = [960, 481];
  const cx = t < 45.0 ? P[0] + 200 : t < 45.9 ? lerp(t, 45.0, 45.6, P[0] + 200, P[0], io) : t < 46.64 ? lerp(t, 45.9, 46.3, P[0], P[0] + 90, io) : t < 47.05 ? lerp(t, 46.64, 46.95, P[0] + 90, CN[0], io) : lerp(t, 47.05, 47.35, CN[0], SV[0], io);
  const cy = t < 45.0 ? P[1] + 160 : t < 45.9 ? lerp(t, 45.0, 45.6, P[1] + 160, P[1], io) : t < 46.64 ? lerp(t, 45.9, 46.3, P[1], P[1] + 80, io) : t < 47.05 ? lerp(t, 46.64, 46.95, P[1] + 80, CN[1], io) : lerp(t, 47.05, 47.35, CN[1], SV[1], io);
  const hover = t > 45.55 && t < 45.95 ? 1 : 0;
  const pressC = t > 46.96 && t < 47.06 ? 1 : 0, pressS = t > 47.36 && t < 47.46 ? 1 : 0;
  // screen-recording zooms: page → modal text → Post → Cancel → dialog → page
  const k = (a: number, b: number) => lerp(t, a, b, 0, 1, io);
  const zoom = 0 + 330 * k(40.5, 41.2) - 60 * k(44.8, 45.3) + 40 * k(46.5, 46.9) - 310 * k(47.5, 48.1);
  const cxCam = -90 * k(40.5, 41.2) + 380 * k(44.8, 45.3) - 600 * k(46.5, 46.9) + 310 * k(46.98, 47.3) + 0;
  const cyCam = -100 * k(40.5, 41.2) + 220 * k(44.8, 45.3) - 280 * k(46.5, 46.9) + 120 * k(46.98, 47.3) + 40 * k(47.5, 48.1);
  const text = <>{L1.slice(0, n1)}{n2 > 0 && t < 44.3 && <><br /><span style={{ background: sel ? 'rgba(26,58,208,0.25)' : 'transparent' }}>{L2.slice(0, n2)}</span></>}</>;
  return (
    <Stage cam={{ z: zoom, x: cxCam, y: cyCam + shake(t, 40.18, 6) }}>
      <Layer z={0}>
        <ThreadsWeb font={inter} feed={BASE_FEED} />
        <AbsoluteFill style={{ background: `rgba(0,0,0,${0.5 * modal})` }} />
        {modal > 0.01 && <div style={{ position: 'absolute', inset: 0, opacity: modal, transform: `scale(${0.96 + modal * 0.04})` }}>
          <ThreadsModal font={inter} user={THREAD_USER} text={n1 > 0 ? text : <span style={{ color: '#999' }}>What's new?</span>} caret={t < 47.0} postHover={hover} cancelPress={pressC} dialog={dialog} savePress={pressS} />
        </div>}
        {t > 44.9 && t < 47.6 && <Cursor x={cx} y={cy} press={pressC || pressS} />}
      </Layer>
    </Stage>
  );
};

// ---------- S7 a year as a calendar of new projects (48.26 – 51.9) ----------
const BY_MONTH: { y: number; m: number; repos: Repo[] }[] = (() => {
  const g: Record<string, Repo[]> = {};
  (REPOS as Repo[]).forEach((r) => { (g[monthKey(r[2])] = g[monthKey(r[2])] || []).push(r); });
  return Object.keys(g).sort().map((k) => ({ y: Number(k.slice(0, 4)), m: Number(k.slice(5, 7)) - 1, repos: g[k] }));
})();
// four pages, one per second (SFX same-file spacing ≥ 1 s): start, the March burst, the October burst, now
const PAGES = BY_MONTH.filter((m) => ['2025-10', '2026-2', '2026-9', '2026-10'].includes(`${m.y}-${m.m}`));
const ALL_MONTHS = Array.from({ length: 13 }).map((_, i) => ({ y: 2025 + Math.floor((10 + i) / 12), m: (10 + i) % 12 }));
const CalFlip: React.FC<{ t: number; idx: number; local: number; dir?: 1 | -1; hi?: string; full?: boolean }> = ({ t, idx, local, dir = 1, hi, full }) => {
  const mo = PAGES[idx];
  const flip = lerp(local, 0, 0.16, 1, 0, ease);
  return (
    <div style={{ position: 'absolute', left: 560, top: 150, transformOrigin: '50% 0%', transform: `perspective(1600px) rotateX(${dir * flip * -70}deg)`, opacity: 1 - flip * 0.6 }}>
      <CalendarCard y={mo.y} m={mo.m} repos={mo.repos} font={inter} tileA={(i) => (full ? 1 : lerp(local, 0.08 + i * 0.05, 0.22 + i * 0.05, 0, 1))} hiName={hi} />
    </div>
  );
};
const Year: React.FC = () => {
  const t = useT() + 48.26;
  const idx = Math.min(PAGES.length - 1, Math.floor(Math.max(0, t - 48.4)));
  const local = t - 48.4 - idx;
  return (
    <Stage cam={{ z: lerp(t, 48.26, 51.9, -40, 120, Easing.linear), ry: lerp(t, 48.26, 51.9, -5, 4, Easing.linear), rx: 3 }}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}><CalFlip t={t} idx={idx} local={local} /></Layer>

    </Stage>
  );
};
// ---------- S8 OpenBot on the Mac: agents at work (51.9 – 56.45) ----------
const POP = [0, 3, 5];
const rowY = (i: number) => 130 + 50 + 16 + 40 + 38 + i * 66 + (i >= 2 ? 26 : 0) + (i >= 5 ? 26 : 0) + 33;
const AgentsScene: React.FC = () => {
  const t = useT() + 51.9;
  const k = (a: number, b: number) => lerp(t, a, b, 0, 1, io);
  const cam = { z: 260 - 60 * k(53.2, 53.8) - 200 * k(55.3, 56.3), x: -330 + 560 * k(53.2, 53.8) - 230 * k(55.3, 56.3), y: -30 + 30 * k(55.3, 56.3), ry: lerp(t, 51.9, 56.45, 5, -4, Easing.linear) };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}><OpenBotWindow t={t} t0={51.9} font={inter} hideAvatars={POP.filter((i) => t >= 51.9 + OB_ROWS[i].at + 0.1)} /></Layer>
      <Layer z={230}>
        {POP.map((i) => {
          const r = OB_ROWS[i]; const a = sp(t, 51.9 + r.at + 0.1, { damping: 13 });
          if (a <= 0.001) return null;
          return (
            <div key={r.id} style={{ position: 'absolute', left: 309 - 60 - a * 150, top: rowY(i) - 60 - a * 40 }}>
              <div style={{ transform: `scale(${0.42 + a * 0.58})`, transformOrigin: '50% 50%' }}><Agent id={r.id} size={120} t={t} seed={i} /></div>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 18, color: T.ink, background: '#FFFFFF', borderRadius: 10, padding: '6px 12px', marginTop: -6, opacity: a, boxShadow: '0 6px 16px rgba(40,39,35,0.12)', whiteSpace: 'nowrap' }}>{r.name} · done</div>
            </div>
          );
        })}
      </Layer>
    </Stage>
  );
};
// ---------- S9 the whole year (56.45 – 58.58) ----------
const AGENT_ROW: AgentId[] = ['fred', 'cloe', 'malu', 'vita', 'nexo', 'yoshi'];
const Reveal: React.FC = () => {
  const t = useT() + 56.45;
  const k = lerp(t, 56.45, 57.4, 0, 1, io);
  // grid 5×3 of 250×~210 mini months, Nov 2026 is index 12 (row 2, col 2)
  const cam = { z: 650 * (1 - k), y: 270 * (1 - k), rx: 4 };
  const g = (cn: string) => (REPOS as Repo[]).filter((r) => monthKey(r[2]) === cn);
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}>
        <div style={{ position: 'absolute', left: 960 - 680, top: 260, width: 1360, display: 'grid', gridTemplateColumns: 'repeat(5, 250px)', gap: 22, justifyContent: 'center' }}>
          {ALL_MONTHS.map((mo, i) => <div key={i} style={{ gridColumn: i >= 10 ? (i - 10) + 2 : undefined }}><MiniMonth y={mo.y} m={mo.m} repos={g(`${mo.y}-${String(mo.m + 1).padStart(2, '0')}`)} font={inter} /></div>)}
        </div>
      </Layer>
      <Layer z={120}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: SAFE.y0 + 14, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: lerp(t, 56.9, 57.4, 0, 1) }}>
          <Logo name="github" size={42} color={T.ink} />
          <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 30, color: T.ink }}>Siirfannih · Repositories</div>
          <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 22, color: T.ink, background: 'rgba(40,39,35,0.08)', borderRadius: 20, padding: '2px 14px' }}>{(REPOS as Repo[]).length}</div>
          <div style={{ display: 'flex', marginLeft: 16 }}>{AGENT_ROW.map((id, i) => <div key={id} style={{ transform: `scale(${sp(t, 57.1 + i * 0.06)})` }}><Agent id={id} size={64} t={t} seed={i} /></div>)}</div>
        </div>
      </Layer>
    </Stage>
  );
};
// ---------- S10 sadar: his face, lip-synced (58.58 – 62.4) ----------
const Sadar: React.FC = () => {
  const t = useT() + 58.58;
  return (
    <Stage cam={{ z: lerp(t, 58.58, 62.4, 120, 260, Easing.linear), x: 30, y: 30, ry: lerp(t, 58.58, 62.4, 1, -1, Easing.linear) }}>
      <Layer z={-150}><AbsoluteFill style={{ transform: 'scale(1.08)' }}><OffthreadVideo src={staticFile('face2.mp4')} muted style={{ width: 1920, height: 1080, filter: 'contrast(1.1) saturate(0.85) brightness(1.02)' }} /></AbsoluteFill></Layer>
      <Layer z={-120}><ScaleSettle t={t} at={59.9} out={62.3} x={1213} y={640} text="sadar." size={86} shadow fonts={FONTS()} /></Layer>
    </Stage>
  );
};

// ---------- S9+S10 sea of builders (62.4 – 73.64) ----------
const LIT = [[7, 3], [22, 9], [41, 5], [13, 14], [33, 12], [52, 15], [28, 2]];
const Sea: React.FC = () => {
  const t = useT() + 62.4;
  const k2 = sp(t, 64.92, { damping: 20 }), k3 = sp(t, 67.16, { damping: 22, stiffness: 90 });
  const cell = 290 * (1 - 0.62 * k2) * (1 - 0.82 * k3);
  const show = lerp(t, 63.2, 63.5, 0, 1);
  const lit = lerp(t, 69.4, 70.0, 0, 1);
  const logoOut = lerp(t, 72.55, 72.85, 1, 0, io);
  const ga = 1 - 0.6 * lit;
  return (
    <Stage cam={{ z: lerp(t, 62.4, 73.64, 0, 200, Easing.linear), ry: lerp(t, 62.4, 73.64, 4, -4, Easing.linear), rx: 6 }}>
      <Layer z={-900}><BackPlate grid={false} /></Layer>
      <Layer z={-250}>
        <svg width="3000" height="2000" style={{ position: 'absolute', left: -540, top: -460, opacity: show }}>
          <defs>
            <pattern id="cells" width={cell} height={cell * 0.62} patternUnits="userSpaceOnUse" x={1500 - cell / 2} y={1000 - cell * 0.31}>
              <rect x={cell * 0.06} y={cell * 0.05} width={cell * 0.88} height={cell * 0.52} rx={cell * 0.03} fill={`rgba(255,255,255,${ga})`} stroke={`rgba(40,39,35,${0.12 * ga})`} strokeWidth={Math.max(0.5, cell * 0.004)} />
              <rect x={cell * 0.06} y={cell * 0.05} width={cell * 0.88} height={cell * 0.08} rx={cell * 0.03} fill={`rgba(40,39,35,${0.06 * ga})`} />
              {[0, 1, 2].map((k) => <circle key={k} cx={cell * (0.1 + k * 0.035)} cy={cell * 0.09} r={cell * 0.011} fill={['#FF5F57', '#FEBC2E', '#28C840'][k]} opacity={ga} />)}
              {[[0.2, 0.22, 0.32], [0.3, 0.27, 0.42], [0.2, 0.32, 0.26], [0.3, 0.37, 0.36], [0.2, 0.42, 0.18], [0.12, 0.47, 0.5]].map(([x, y, w], k) => <rect key={'l' + k} x={cell * x} y={cell * y} width={cell * w} height={cell * 0.022} rx={cell * 0.01} fill={k % 3 === 0 ? `rgba(26,58,208,${0.55 * ga})` : `rgba(40,39,35,${0.25 * ga})`} />)}
            </pattern>
          </defs>
          <rect width="3000" height="2000" fill="url(#cells)" />
        </svg>
      </Layer>
      <Layer z={110}>
        {lit > 0 && LIT.map(([cx, cy], i) => {
          const x = 960 - cell / 2 + (cx - 26) * cell + cell * 0.06, y = 540 - cell * 0.31 + (cy - 8) * cell * 0.62 + cell * 0.05;
          const a = lerp(t, 69.4 + i * 0.09, 69.9 + i * 0.09, 0, 1);
          return <div key={i} style={{ position: 'absolute', left: x, top: y - a * 18, width: cell * 0.88, height: cell * 0.52, borderRadius: 3, background: T.acc, opacity: a, transform: `scale(${1 + a * 1.6})`, boxShadow: `0 ${10 * a}px ${24 * a}px rgba(26,58,208,0.35)` }} />;
        })}
      </Layer>
      <Layer z={170}>
        <SlotSwap t={t} lead="semua orang tuh bisa" words={[['membangun.', 63.34], ['membuat.', 64.92], ['bikin software.', 66.82]]} end={67.5} x={960} y={380} size={150} color={T.ink} fonts={FONTS()} />
        <Converge t={t} at={72.88} out={73.62} x={960} y={430} text="belum sempurna." size={150} color={T.ink} fonts={FONTS()} />
      </Layer>
      <Layer z={320}>
        {['instagram', 'youtube', 'tiktok', 'threads', 'x', 'linkedin'].map((n, i) => {
          const a = sp(t, 71.24 + i * 0.07) * logoOut;
          if (t < 71.2 || a <= 0.001) return null;
          const ang = (-150 + i * 60) * (Math.PI / 180);
          return (
            <div key={n} style={{ position: 'absolute', left: 960 + Math.cos(ang) * 360 - 52, top: 520 + Math.sin(ang) * 250 - 52, width: 104, height: 104, borderRadius: 52, background: '#FFFFFF', border: '1px solid rgba(40,39,35,0.1)', boxShadow: '0 10px 30px rgba(40,39,35,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: a, transform: `scale(${0.5 + a * 0.5})` }}>
              <Logo name={n} size={48} color={T.ink} />
            </div>
          );
        })}
      </Layer>
    </Stage>
  );
};

// ---------- S11 addiction: create repo after repo, none released (73.64 – 82.4) ----------
const LOOP_NAMES = ['agent-hq', 'OtonomAgent', 'MemoryPC', 'mandala-platform', 'agent-config', 'Hermessambung', 'Pandu-UI', 'jadisatu-canvas', 'motion-production-pc', 'desaignn-landing-os', 'jadisatu-partner', 'canvas-skill-library', 'Pandu', 'ops-report'];
const CREATE: number[] = (() => { const a: number[] = []; let x = 73.9, d = 1.3; while (x < 80.0 && a.length < LOOP_NAMES.length) { a.push(x); x += d; d = Math.max(0.15, d * 0.76); } return a; })();
const Addiction: React.FC = () => {
  const t = useT() + 73.64;
  const stop = 81.0;
  const tt = Math.min(t, stop);
  const k = CREATE.filter((c) => c <= tt).length - 1; // current cycle index
  const start = k >= 0 ? CREATE[k] : 73.9;
  const next = CREATE[k + 1] ?? 80.0;
  const dur = next - start;
  const name = k >= 0 ? LOOP_NAMES[k] : '';
  const nT = k >= 0 ? typeN(tt, start, start + dur * 0.55, name.length) : 0;
  const press = k >= 0 && tt > start + dur * 0.7 && tt < start + dur * 0.85;
  const made = CREATE.filter((c, i) => (CREATE[i + 1] ?? 80.0) <= tt + 0.001).length; // repos already on the pile
  const rel = sp(t, 80.04, { damping: 14 });
  const frozen = t >= stop;
  return (
    <Stage cam={{ z: lerp(t, 73.64, 81.0, 0, 180, Easing.linear) + shake(t, stop, 10), ry: lerp(t, 73.64, 81.0, 5, -3, Easing.linear), rx: 4 }}>
      <Layer z={-900}><BackPlate /></Layer>
      {/* L2 the GitHub "new repository" form, rebuilt in code */}
      <Layer z={0}>
        <div style={{ position: 'absolute', left: 230, top: 250, width: 720, background: '#FFFFFF', border: '1px solid #D1D9E0', borderRadius: 12, padding: '30px 34px', boxSizing: 'border-box', fontFamily: inter, color: '#1F2328', boxShadow: '0 20px 60px rgba(40,39,35,0.10)', opacity: lerp(t, 73.64, 74.0, 0, 1) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Logo name="github" size={30} color="#1F2328" /><div style={{ fontSize: 26, fontWeight: 600 }}>Create a new repository</div></div>
          <div style={{ fontSize: 15, color: '#59636E', marginTop: 8, paddingBottom: 18, borderBottom: '1px solid #D1D9E0' }}>A repository contains all project files, including the revision history.</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 20, alignItems: 'flex-end' }}>
            <div><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Owner *</div><div style={{ border: '1px solid #D1D9E0', borderRadius: 6, padding: '8px 12px', fontSize: 15, background: '#F6F8FA' }}>Siirfannih</div></div>
            <div style={{ fontSize: 22, paddingBottom: 6 }}>/</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Repository name *</div>
              <div style={{ border: `1px solid ${T.acc}`, boxShadow: '0 0 0 3px rgba(26,58,208,0.15)', borderRadius: 6, padding: '8px 12px', fontSize: 15, height: 20 }}>{name.slice(0, nT)}<span style={{ display: 'inline-block', width: 1.5, height: 17, background: '#1F2328', marginLeft: 1, verticalAlign: 'middle', opacity: frozen ? 0 : Math.floor(t * 4) % 2 ? 1 : 0.2 }} /></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 22, marginTop: 20, fontSize: 15 }}>
            <span>◉ Public</span><span style={{ color: '#59636E' }}>○ Private</span>
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: press ? '#196C2E' : '#1F883D', color: '#FFFFFF', fontWeight: 600, fontSize: 15, padding: '9px 18px', borderRadius: 6, transform: `scale(${press ? 0.95 : 1})` }}>Create repository</div>
          </div>
        </div>
      </Layer>
      {/* L3 the word */}
      <Layer z={90}><Chaotic t={t} at={75.86} out={77.4} x={1080} y={170} text="kecanduan." size={100} color={T.ink} accent={T.acc} fonts={FONTS()} /></Layer>
      {/* L4 the pile: every repo lands here, none released */}
      <Layer z={150}>
        {LOOP_NAMES.slice(0, made).map((n, i) => {
          const land = sp(t, (CREATE[i + 1] ?? 80.0), { damping: 15 });
          const prog = frozen ? 0.6 + random(n) * 0.35 : Math.min(0.95, 0.15 + random(n) * 0.7 + ((t - (CREATE[i + 1] ?? 80)) * 0.1));
          return (
            <div key={n} style={{ position: 'absolute', left: 1060 + (i % 2) * 16, top: 770 - i * 36, transform: `translate(${(1 - land) * -420}px, ${(1 - land) * -120}px) rotate(${(random(n + 'r') - 0.5) * 6}deg)`, opacity: Math.min(1, land * 1.5) }}>
              <div style={{ width: 300, background: '#FFFFFF', border: '1px solid #D1D9E0', borderRadius: 8, padding: '10px 14px', boxSizing: 'border-box', fontFamily: inter, boxShadow: '0 8px 20px rgba(40,39,35,0.10)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><RepoIcon /><span style={{ color: '#0969DA', fontWeight: 600, fontSize: 14 }}>{n}</span><span style={{ marginLeft: 'auto', fontSize: 11, color: '#59636E', border: '1px solid #D1D9E0', borderRadius: 20, padding: '0 7px' }}>0 releases</span></div>
                <div style={{ marginTop: 8, height: 5, borderRadius: 3, background: '#EEF1F4' }}><div style={{ width: `${prog * 100}%`, height: '100%', borderRadius: 3, background: frozen ? '#9AA3AD' : T.acc }} /></div>
              </div>
            </div>
          );
        })}
        {rel > 0.01 && (
          <div style={{ position: 'absolute', left: 470, top: 590, width: 340, background: '#FFFFFF', border: '1px solid #D1D9E0', borderRadius: 12, padding: '22px 24px', boxSizing: 'border-box', fontFamily: inter, color: '#1F2328', boxShadow: '0 20px 50px rgba(40,39,35,0.14)', transform: `scale(${0.85 + rel * 0.15})`, opacity: Math.min(1, rel * 1.5) }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>Releases</div>
            <div style={{ fontSize: 14, color: '#59636E', margin: '10px 0 16px' }}>There aren’t any releases here</div>
            <div style={{ display: 'inline-block', fontSize: 14, fontWeight: 600, padding: '7px 14px', borderRadius: 6, border: '1px solid #D1D9E0', background: '#F6F8FA', color: frozen ? '#9AA3AD' : '#1F2328' }}>Create a new release</div>
          </div>
        )}
      </Layer>
    </Stage>
  );
};

// ---------- S12 decision (82.4 – 97.5) ----------
const Decision: React.FC = () => {
  const t = useT() + 82.4;
  if (t < 87.6) {
    // calendar flips back to the very first project (titik awal)
    const step = t < 82.5 ? 0 : Math.min(3, 1 + Math.floor((t - 82.5) / 1.0));
    const idx = 3 - step;
    const local = t < 82.5 ? 1 : t - 82.5 - (step - 1);
    const ring = lerp(t, 85.12, 86.2, 0, 1);
    return (
      <Stage cam={{ z: lerp(t, 82.4, 85.2, -150, 60, Easing.bezier(0.7, 0, 0.2, 1)) + lerp(t, 85.2, 87.6, 0, 260, Easing.linear), x: lerp(t, 85.2, 87.6, 0, -40, ease), ry: lerp(t, 82.4, 85.2, 8, 0, ease) }}>
        <Layer z={-900}><BackPlate /></Layer>
        <Layer z={0}><CalFlip t={t} idx={idx} local={local} dir={-1} full hi={t > 85.0 ? 'Jadisatu' : undefined} /></Layer>
        <Layer z={60}><Label t={t} at={85.12} out={87.6} x={560} y={800} tx={750} ty={700} text="TITIK AWAL" fonts={FONTS()} /></Layer>
        <Layer z={160}>{ring > 0 && <div style={{ position: 'absolute', left: 960 - 300, top: 540 - 300, width: 600, height: 600, borderRadius: 300, border: `3px solid ${T.acc}`, transform: `scale(${0.5 + ring * 0.7})`, opacity: 1 - ring }} />}</Layer>
      </Stage>
    );
  }
  // Threads again: this time the post goes out, then more posts follow
  const L = 'Hari pertama. Mulai share prosesnya.';
  const n = typeN(t, 87.9, 89.4, L.length);
  const posted = t >= 89.7;
  const ap = (at: number) => (t >= at ? sp(t, at) : 0);
  const media = {
    face: <Img src={staticFile('shots/face_end.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '53% 35%' }} />,
    agents: <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg, #FFFFFF, ${T.soft})`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>{(['fred', 'malu', 'cloe', 'nexo'] as const).map((id, k) => <Agent key={id} id={id} size={110} t={t} seed={k} />)}</div>,
    repo: <div style={{ width: '100%', height: '100%', background: '#F6F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RepoCard r={(REPOS as any)[0]} w={260} /></div>,
  };
  const mine: [number, ThreadPostData][] = [
    [93.5, { user: THREAD_USER, time: 'now', text: 'Pengalaman yang aku dapatkan.', face: true, mediaEl: media.repo }],
    [92.1, { user: THREAD_USER, time: 'now', text: 'Yang aku buat.', face: true, mediaEl: media.agents }],
    [91.1, { user: THREAD_USER, time: 'now', text: 'Yang aku alami.', face: true, mediaEl: media.face }],
    [89.7, { user: THREAD_USER, time: 'now', text: L, face: true }],
  ];
  const shown = mine.filter(([at]) => t >= at);
  const feed = [...shown.map(([, p]) => p), ...BASE_FEED];
  const feedA = [...shown.map(([at]) => ap(at)), ...BASE_FEED.map(() => 1)];
  return (
    <AbsoluteFill style={{ background: T.bg }}>
      <Stage cam={{ z: lerp(t, 87.6, 88.4, 0, 260, ease) + lerp(t, 88.4, 97.5, 0, 120, Easing.linear), x: 5, y: lerp(t, 87.6, 88.4, 0, -60, ease), ry: lerp(t, 87.6, 97.5, -3, 2, Easing.linear) }}>
        <Layer z={0}>
          <ThreadsWeb font={inter} feed={feed} feedAppear={feedA} composerText={posted ? undefined : L.slice(0, n)} composerPost={t > 89.5 && t < 89.7 ? 1 : 0} />
          {t > 89.0 && t < 89.9 && <Cursor x={lerp(t, 89.0, 89.45, 1200, 1300, io)} y={lerp(t, 89.0, 89.45, 260, 225, io)} press={t > 89.5 && t < 89.65 ? 1 : 0} />}
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};

// ---------- main: HUD (wipes, captions, grain) above every stage ----------
export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: T.bg }}>
    <Sequence {...S(0, 15.68)}><Face /></Sequence>
    <Sequence {...S(15.68, 19.68)}><Unik /></Sequence>
    <Sequence {...S(19.68, 25.8)}><Motivasi /></Sequence>
    <Sequence {...S(25.8, 32.66)}><Fomo /></Sequence>
    <Sequence {...S(32.66, 35.9)}><Night /></Sequence>
    <Sequence {...S(35.9, 40.18)}><Chat /></Sequence>
    <Sequence {...S(40.18, 48.26)}><Turn /></Sequence>
    <Sequence {...S(48.26, 51.9)}><Year /></Sequence>
    <Sequence {...S(51.9, 56.45)}><AgentsScene /></Sequence>
    <Sequence {...S(56.45, 58.58)}><Reveal /></Sequence>
    <Sequence {...S(58.58, 62.4)}><Sadar /></Sequence>
    <Sequence {...S(62.4, 73.64)}><Sea /></Sequence>
    <Sequence {...S(73.64, 82.4)}><Addiction /></Sequence>
    <Sequence {...S(82.4, TOTAL)}><Decision /></Sequence>
    <BlockWipe />
    <Captions />
    <Grain />
  </AbsoluteFill>
);
