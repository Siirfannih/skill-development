import React from 'react';
import {
  AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame,
  interpolate, spring, Easing, random,
} from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadOutfit } from '@remotion/google-fonts/Outfit';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { loadFont as loadSerif } from '@remotion/google-fonts/InstrumentSerif';
import { SwingY, SpinPop, StackPair, BlurScatter, Counter, ColorFlash, Slam, ScaleSettle, SlotSwap, Converge, Chaotic, Label } from './Type';
import CAPS from './captions.json';
import REPOS from '../public/data/repos.json';
import { AgentsWorld, Agent } from './Agents';
import { Stage, Layer, PERSP as PERSP_ } from './Stage';
import { World, Stand, Seat, C as FC } from './Flat';
import { ThreadsWeb, ThreadsModal, ThreadPostData, InstagramPhone, OpenBotWindow, OB_ROWS, CalendarCard, MiniMonth, Repo, monthKey, DeskScene, NightBG } from './Ui';
import type { AgentId } from './Agents';

export const FPS = 30;
export const TOTAL = 96.0;

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
const WIPES = [15.68, 87.6]; // mosaic kept for 2 moments only; other joins use whip / push-through (rule 42)
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
        if (rnd < 0.18 || (r + 1) * bh > 840) return null;
        const off = (c / (cols - 1) - 0.5) * 0.26 + (random(`o${at}-${i}`) - 0.5) * 0.12;
        const o = interpolate(Math.abs(t - at - off), [0, 0.22], [1, 0], { extrapolateRight: 'clamp' });
        if (o <= 0) return null;
        const wide = 1 + Math.floor(random(`s${at}-${i}`) * 3);
        return <div key={i} style={{ position: 'absolute', left: c * bw, top: r * bh, width: bw * wide, height: bh, background: grads[Math.floor(rnd * 4)], opacity: o, filter: 'blur(3px)' }} />;
      })}
    </AbsoluteFill>
  );
};

// spatial transitions (rule 42): whip = topic change, push = into the next idea
const Join: React.FC<{ from: number; to: number; inM?: 'whip' | 'push'; outM?: 'whip' | 'push'; children: React.ReactNode }> = ({ from, to, inM, outM, children }) => {
  const t = useT() + from;
  const ki = inM ? lerp(t, from, from + 0.22, 1, 0, Easing.out(Easing.cubic)) : 0;
  const ko = outM ? lerp(t, to - 0.22, to, 0, 1, Easing.in(Easing.cubic)) : 0;
  const x = (inM === 'whip' ? ki * 760 : 0) - (outM === 'whip' ? ko * 760 : 0);
  const sc = (inM === 'push' ? 1 + ki * 0.3 : 1) * (outM === 'push' ? 1 + ko * 0.6 : 1);
  const b = (ki + ko) * 26;
  return <AbsoluteFill style={{ transform: `translateX(${x}px) scale(${sc})`, filter: b > 0.5 ? `blur(${b}px)` : undefined }}>{children}</AbsoluteFill>;
};

// the last post settles, then the frame breathes out to the page colour (review r4: hard last frame)
const EndFade: React.FC = () => { const t = useT(); const o = lerp(t, 95.35, 95.95, 0, 1, Easing.in(Easing.quad)); return o > 0 ? <AbsoluteFill style={{ background: T.bg, opacity: o }} /> : null; };

// ---------- captions (inside the safe frame) ----------
const HIDE: [number, number][] = [[21.5, 25.75]];
// emphasis windows: caption steps back while the big word carries the line
const EMPH: [number, number][] = [[67.6, 71.1], [0, 1.6], [1.6, 6.4], [8.45, 10.9], [11.9, 15.4], [16.78, 19.68], [31.86, 32.7], [59.9, 62.3], [63.2, 67.5], [72.88, 73.62], [75.86, 77.4]];
// words already on screen as an emphasis or diegetic text are dropped from the subtitle (decision-guide §1: text and visual never say the same thing)
const SUPP: [number, number, string[]][] = [
  [0.5, 1.62, ['terobsesi']], [1.6, 6.4, ['sama', 'kesempurnaan']], [8.4, 10.9, ['siapa', 'pun', 'siapa pun']], [11.85, 15.4, ['20-an']],
  [16.7, 19.68, ['unik']], [31.8, 32.7, ['fomo']], [39.3, 40.2, ['build', 'something']], [40.6, 44.3, ['satu', 'hal', 'yang', 'aku', 'lewatkan', 'adalah', 'menjual']], [87.6, 89.6, ['nggak', 'sekadar', 'membangun']], [59.85, 62.3, ['sadar']],
  [63.2, 67.5, ['semua', 'orang', 'tuh', 'bisa', 'membangun', 'membuat', 'bikin', 'software']], [67.45, 71.1, ['nggak', 'semua', 'orang']],
  [72.8, 73.62, ['belum', 'sempurna']], [75.8, 77.4, ['kecanduan']], [85.0, 87.6, ['titik', 'awal']],
];
const norm = (w: string) => w.toLowerCase().replace(/[.,?!]/g, '');
// once a word has been carried by the emphasis text it stays out of its caption phrase (no word popping back in after the big word leaves)
const shown = (t: number, ws: number, w: string) => !SUPP.some(([a, b, list]) => t >= a && ws >= a - 1.2 && ws < b && list.includes(norm(w)));
// ---- one kinetic text layer (Lantai A1/A2, kiblat 55 k1/k8): each phrase sits where the shot leaves room ----
// [from, to, x, y(top), align, maxWidth, tone (k = ink on light, w = white on dark), box only if contrast fails (A9)]
type Slot = [number, number, number, number, 'l' | 'c', number, 'k' | 'w', boolean?];
const SLOTS: Slot[] = [
  [0, 15.68, 200, 560, 'l', 620, 'w'],          // confession: empty wall left of the face
  [15.68, 19.68, 200, 150, 'l', 760, 'k'],      // above the crowd, opposite "unik."
  [19.68, 25.8, 200, 430, 'l', 470, 'k'],       // beside the phone
  [25.8, 32.66, 960, 640, 'c', 640, 'k', true], // inside the tunnel's clear core, under the figure
  [32.66, 35.9, 200, 380, 'l', 560, 'w'],       // night wall, left of the desk
  [35.9, 40.18, 960, 740, 'c', 900, 'k'],       // under the prompt box
  [40.18, 44.8, 960, 150, 'c', 1100, 'w', true], // camera on the modal text: line sits on the dimmed page above (dark plate, A9)
  [44.8, 48.26, 960, 850, 'c', 1100, 'w', true],  // camera moves to Post/Cancel at the top: line drops below
  [48.26, 51.9, 960, 850, 'c', 1200, 'k'],      // under the calendar
  [51.9, 56.45, 760, 600, 'l', 820, 'w'],       // empty chat pane of OpenBot
  [56.45, 58.58, 960, 880, 'c', 1100, 'k'],     // page space under the contribution graph
  [58.58, 62.4, 200, 560, 'l', 620, 'w'],       // the wall again, left of the face
  [62.4, 71.0, 960, 345, 'c', 1200, 'k'],       // under the headline, above the builders
  [71.0, 73.64, 960, 845, 'c', 1200, 'k'],      // logos take the centre: the line drops onto the veiled floor
  [73.64, 82.4, 200, 740, 'l', 820, 'k'],       // under the repo form
  [82.4, 87.6, 960, 830, 'c', 1200, 'k'],      // under the calendar
  [87.6, 96.1, 190, 470, 'l', 330, 'k'],        // the empty left column of Threads
];
const STACK: Slot[] = [
  [0.1, 1.62, 1213, 545, 'l', 560, 'w'],     // above "terobsesi"
  [1.62, 6.4, 1150, 520, 'l', 560, 'w'],     // under "sama / kesempurnaan."
  [8.4, 10.9, 1240, 570, 'l', 520, 'w'],     // above "siapa pun."
  [11.85, 15.4, 1200, 470, 'l', 520, 'w'],   // under "20-an"
  [16.7, 19.68, 1180, 290, 'l', 560, 'k'],   // under "unik." (two lines would hit the word from above)
  [31.8, 32.66, 960, 770, 'c', 1100, 'k'],   // under the FOMO title card
  [59.85, 62.3, 1240, 560, 'l', 480, 'w'],   // under "sadar."
  [67.5, 71.0, 560, 330, 'l', 900, 'k'],     // under "nggak semua orang."
  [72.85, 73.64, 960, 330, 'c', 1100, 'k'],  // under "belum sempurna."
  [75.8, 77.4, 1200, 580, 'l', 520, 'k'],    // under "kecanduan."
];
// key words keep the line's size and take the accent colour (kiblat 55: emphasis = colour, not size)
const KEY = new Set(['menjual', 'mempublikasikan', 'mendokumentasikan', 'publish', 'selesai', 'nge-share', 'belajar', 'ai', 'membangun', 'ngebangun']);
const Captions: React.FC = () => {
  const t = useT();
  if (HIDE.some(([a, b]) => t >= a && t < b)) return null;
  const c = (CAPS as any).caps.find((x: any) => t >= x.s - 0.05 && t < x.e);
  if (!c) return null;
  const words = c.words.filter(([ws, w]: [number, string]) => shown(t, ws, w));
  if (!words.length) return null;
  const sl = STACK.find(([a, b]) => t >= a && t < b) ?? SLOTS.find(([a, b]) => t >= a && t < b) ?? SLOTS[SLOTS.length - 1];
  const [, , x, y, al, mw, tone, box] = sl;
  const ink = tone === 'w' ? '#FFFFFF' : T.ink;
  const fresh = tone === 'w' ? 'rgba(255,255,255,0.5)' : '#A3A19A'; // newest word grey, then full (kiblat 55)
  const k = lerp(t, c.s - 0.05, c.s + 0.18, 0, 1, Easing.out(Easing.cubic));
  return (
    <div style={{ position: 'absolute', left: al === 'c' ? x - mw / 2 : x, top: y, width: mw, display: 'flex', justifyContent: al === 'c' ? 'center' : 'flex-start', transform: `translateY(${(1 - k) * 18}px)`, opacity: k }}>
      <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 52, lineHeight: 1.16, letterSpacing: '-0.02em', textAlign: al === 'c' ? 'center' : 'left',
        textShadow: tone === 'w' ? '0 2px 18px rgba(0,0,0,0.55)' : 'none', ...(box ? { background: tone === 'w' ? 'rgba(12,14,24,0.78)' : 'rgba(246,245,241,0.92)', borderRadius: 14, padding: '6px 18px' } : {}) }}>
        {words.filter(([ws]: [number, string]) => !box || t >= ws - 0.06).map(([ws, w]: [number, string], i: number) => (
          <span key={i} style={{ opacity: lerp(t, ws - 0.06, ws + 0.04, 0, 1), color: t < ws + 0.3 ? fresh : KEY.has(norm(w)) ? (tone === 'w' ? '#9DB2FF' : T.acc) : ink, marginRight: 13, display: 'inline-block' }}>{w}</span>
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
          <OffthreadVideo src={staticFile('face.mp4')} muted style={{ width: 1920, height: 1080, filter: 'contrast(1.08) saturate(0.88) brightness(1.14)' }} />
        </AbsoluteFill>
      </Layer>
      <Layer z={-120}>
        <SpinPop t={t} at={0.56} out={1.62} x={1213} y={630} text="terobsesi" size={84} shadow fonts={FONTS()} />
        <StackPair t={t} at={1.66} out={6.4} x={1150} y={380} small="sama" big="kesempurnaan." size={78} shadow fonts={FONTS()} />
        <BlurScatter t={t} at={8.45} out={10.75} x={1240} y={700} text="siapa pun." size={96} shadow fonts={FONTS()} />
        <SwingY t={t} at={11.9} out={15.4} x={1200} y={300} text="20-an" size={150} shadow fonts={FONTS()} />
      </Layer>
    </Stage>
  );
};

// ---------- fish-eye ring (Irfan 11 Nov) ----------
// Many pages wrap AROUND the focus like a fisheye lens: the centre stays clear for the word, cards grow,
// come closer (z) and tilt toward the edges, and orbit slowly — they frame the text instead of competing with it.
type FEItem = { x: number; y: number; z: number; ry: number; rx: number; s: number; a: number; rn: number };
const fishEye = (n: number, t: number, o: { clear?: number; spin?: number; rx?: number; ry?: number; bulge?: number; phase?: number } = {}): FEItem[] => {
  const { clear = 0.42, spin = 0.06, rx = 1250, ry = 760, bulge = 1.2, phase = 0 } = o;
  return Array.from({ length: n }).map((_, i) => {
    const rn = clear + (1 - clear) * Math.sqrt((i + 0.5) / n);
    const a = i * 2.39996 + phase + t * spin;
    const R = Math.pow(rn, 0.85);
    return { x: 960 + Math.cos(a) * R * rx, y: 540 + Math.sin(a) * R * ry, z: (rn - 0.55) * 700, ry: -Math.cos(a) * 58 * rn, rx: Math.sin(a) * 46 * rn, s: 0.5 + bulge * rn * rn, a, rn };
  });
};
const FECard: React.FC<{ p: FEItem; w: number; h: number; pop?: number; children: React.ReactNode }> = ({ p, w, h, pop = 1, children }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transformStyle: 'preserve-3d',
    transform: `translate3d(${p.x - w / 2}px, ${p.y - h / 2}px, ${p.z}px) rotateY(${p.ry}deg) rotateX(${p.rx}deg) scale(${p.s * pop})`, opacity: Math.min(1, pop * 1.5) }}>
    {children}
  </div>
);
const TrendCard: React.FC<{ i: number }> = ({ i }) => (
  <div style={{ width: 230, height: 150, borderRadius: 12, background: '#FFFFFF', border: '1px solid rgba(40,39,35,0.08)', boxShadow: '0 10px 26px rgba(40,39,35,0.10)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 10, top: 10, right: 10, height: 96, borderRadius: 8, background: `linear-gradient(180deg, ${T.soft}, #FFFFFF)` }}>
      <svg width="210" height="96" viewBox="0 0 210 96"><circle cx="105" cy="40" r="16" fill={T.navy} /><path d="M73 96 C73 64 137 64 137 96 Z" fill={T.navy} /></svg>
      <div style={{ position: 'absolute', left: 8, top: 8 }}><Logo name={['instagram', 'tiktok', 'youtube', 'threads'][i % 4]} size={18} color={T.ink} /></div>
    </div>
    <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', alignItems: 'center', gap: 6, fontFamily: inter, fontSize: 14, fontWeight: 600, color: T.ink }}><Icon d="M8 5v14l11-7z" s={16} c={T.ink} />Trending</div>
    <div style={{ position: 'absolute', right: 10, bottom: 10 }}><Icon d="M3 17l6-6 4 4 8-8M15 7h6v6" s={20} c={T.acc} /></div>
  </div>
);
const AppCard: React.FC<{ i: number; lit?: number; fly?: number }> = ({ i, lit = 0, fly = 0 }) => (
  <div style={{ width: 220, height: 140, borderRadius: 12, background: '#FFFFFF', border: `1px solid ${lit > 0.5 ? T.acc : 'rgba(40,39,35,0.10)'}`, boxShadow: lit > 0.5 ? '0 14px 30px rgba(26,58,208,0.30)' : '0 8px 20px rgba(40,39,35,0.08)', position: 'relative', overflow: 'visible' }}>
    <div style={{ height: 22, borderBottom: '1px solid rgba(40,39,35,0.08)', display: 'flex', gap: 5, alignItems: 'center', paddingLeft: 10 }}>{['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 7, height: 7, borderRadius: 4, background: c }} />)}</div>
    {[[16, 34, 0.55], [26, 50, 0.7], [16, 66, 0.45], [26, 82, 0.6], [16, 98, 0.35]].map(([x, y, w], k) => <div key={k} style={{ position: 'absolute', left: x, top: y, width: `${(w as number) * 100 * (0.7 + random(`ac${i}${k}`) * 0.5)}px`, height: 7, borderRadius: 4, background: k % 3 === 0 ? 'rgba(26,58,208,0.6)' : 'rgba(40,39,35,0.22)' }} />)}
    {lit > 0.01 && <>
      <div style={{ position: 'absolute', right: 10, bottom: 10, fontFamily: inter, fontWeight: 600, fontSize: 15, color: '#fff', background: T.acc, borderRadius: 14, padding: '4px 12px', transform: `scale(${0.6 + lit * 0.4})` }}>Post</div>
      <svg viewBox="0 0 24 24" width="38" height="38" style={{ position: 'absolute', right: 30, bottom: 40, transform: `translate(${fly * 220}px, ${fly * -260}px) rotate(${fly * -15}deg)`, opacity: lit * (1 - fly * 0.85) }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" fill="none" stroke={T.acc} strokeWidth="2.2" strokeLinejoin="round" /></svg>
    </>}
  </div>
);

// ---------- S2 unik (15.68 – 19.68) · L2 people · L3 word · L4 photo ----------
const Person: React.FC<{ dim: number }> = ({ dim }) => (
  <div style={{ width: 150, height: 190, background: T.card, borderRadius: 10, position: 'relative', overflow: 'hidden', border: `1px solid rgba(40,39,35,0.08)`, opacity: dim }}>
    <svg width="150" height="190" viewBox="0 0 150 190" style={{ position: 'absolute' }}>
      <circle cx="75" cy="80" r="26" fill="rgba(40,39,35,0.12)" />
      <path d="M26 190 C26 138 124 138 124 190 Z" fill="rgba(40,39,35,0.12)" />
    </svg>
  </div>
);
// Dreamina plate (L2): crop 10 % from the bottom-right anchor so the generator's corner label never shows
// shared flat world (Irfan 11 Nov: no AI plates; flat 2D characters in a 2.5D space)
const FLOOR_Y = 880;
const Floor: React.FC<{ tone?: string }> = ({ tone = '#ECEAE3' }) => (
  <div style={{ position: 'absolute', left: -3000, top: FLOOR_Y, width: 7920, height: 8000, background: tone, transformOrigin: '50% 0%', transform: 'translateZ(1200px) rotateX(-90deg)' }} />
);
const CROWD = (() => {
  const out: { x: number; z: number; id: string; me?: boolean }[] = [];
  for (let r = 0; r < 10; r++) {
    const z = -2900 + r * 330;
    for (let k = 0; k < 16; k++) {
      const x = -380 + k * 175 + (r % 2) * 88 + (random(`cx${r}-${k}`) - 0.5) * 50;
      if (z > -1760 && Math.abs(x - 960) < 230) continue; // the aisle the camera travels down
      out.push({ x, z: z + (random(`cz${r}-${k}`) - 0.5) * 80, id: `${r}-${k}` });
    }
  }
  out.push({ x: 960, z: -1600, id: 'me', me: true });
  return out;
})();
const Unik: React.FC = () => {
  const t = useT() + 15.68;
  const lit = lerp(t, 16.72, 17.05, 0, 1, Easing.out(Easing.cubic));
  const camz = lerp(t, 15.68, 19.68, 0, 1880, Easing.bezier(0.3, 0, 0.25, 1));
  return (
    <>
    <Stage cam={{ z: camz, rx: -7, y: lerp(t, 15.68, 19.68, -40, 60, Easing.linear), ry: lerp(t, 15.68, 19.68, -2.5, 1.5, Easing.linear) }}>
      <Layer z={-7000}><BackPlate grid={false} /></Layer>
      {/* light pool under him: a flat shape, not a glow */}
      <div style={{ position: 'absolute', left: 960 - 170, top: FLOOR_Y - 60, width: 340, height: 120, borderRadius: '50%', background: FC.soft, opacity: lit, transform: 'translateZ(-1600px) rotateX(80deg)' }} />
      {CROWD.map((p) => (
        <World key={p.id} x={p.x} y={FLOOR_Y} z={p.z} w={120} h={300}>
          <Stand id={p.id} t={t} lit={p.me ? lit : 0} tone={p.me ? 0 : random('tn' + p.id)} />
        </World>
      ))}
    </Stage>
    <Stage cam={{}}><Layer z={60}><ColorFlash t={t} at={16.78} out={19.7} x={1180} y={150} text="unik." size={130} color={T.ink} accent={T.acc} fonts={FONTS()} /></Layer></Stage>
    </>
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
  const cam = { z: lerp(t, 19.68, 21.0, 0, 330, ease) + lerp(t, 21.0, 25.8, 0, 90, Easing.linear), ry: lerp(t, 19.68, 25.8, 3, -3, Easing.linear) };
  return (
    <Stage cam={cam}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={-150}><div style={{ transform: `translate(${out * -900}px, ${out * 120}px) rotate(${out * -8}deg)`, filter: `blur(${out * 6}px)` }}><div style={{ transform: 'scale(1.0)', transformOrigin: '960px 110px' }}><InstagramPhone font={inter} scroll={scroll} x={766} y={130} /></div></div></Layer>
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
// FOMO tunnel (Irfan ref gambar 2): trend screens line a tunnel and orbit; he stands still at the far end
const TR = 860, RINGS = 10, PER = 10;
const Fomo: React.FC = () => {
  const t = useT() + 25.8;
  const slam = sp(t, 31.86, { damping: 11, stiffness: 220 });
  const spinUp = lerp(t, 30.4, 31.86, 0, 1, Easing.in(Easing.quad));
  const orbit = (t - 25.8) * 0.16 + spinUp * 1.4;
  const camz = lerp(t, 25.8, 31.8, 0, 1700, Easing.bezier(0.25, 0, 0.3, 1)) + slam * 80;
  const away = lerp(t, 31.6, 31.86, 0, 1, Easing.in(Easing.cubic));
  return (
    <>
    <Stage cam={{ z: camz, rz: lerp(t, 25.8, 31.8, -4, 6, Easing.linear) + spinUp * 10, x: shake(t, 31.86, 14) }} mb={spinUp * 3 * (1 - lerp(t, 31.9, 32.2, 0, 1))}>
      <Layer z={-7000}><BackPlate grid={false} /></Layer>
      {Array.from({ length: RINGS }).map((_, r) => {
        const z = -300 - r * 600;
        const depthOp = Math.max(0, Math.min(1, (z + camz + 5200) / 2600));
        const near = PERSP_ - (z + camz);
        const op = depthOp * (near < 160 ? 0 : near < 700 ? (near - 160) / 540 : 1);
        if (op <= 0) return null;
        return Array.from({ length: PER }).map((__, k) => {
          const a = (k / PER) * Math.PI * 2 + r * 0.27 + orbit * (r % 2 ? 1 : -0.6);
          const pop = sp(t, 25.85 + r * 0.06 + k * 0.012);
          return (
            <div key={`${r}-${k}`} style={{ position: 'absolute', left: 960 + Math.cos(a) * TR - 170, top: 540 + Math.sin(a) * TR - 260, width: 340, height: 520, opacity: op * Math.min(1, pop * 1.5),
              transform: `translateZ(${z}px) rotateZ(${a}rad) rotateY(-90deg) scale(${0.6 + pop * 0.4})` }}>
              <div style={{ position: 'absolute', left: 170 - 259, top: 260 - 169, transform: 'rotate(-90deg) scale(2.25)', transformOrigin: '50% 50%', width: 230, height: 150, marginLeft: 0 }}><div style={{ transform: 'translate(-0px,0)' }}><TrendCard i={r * PER + k} /></div></div>
            </div>
          );
        });
      })}
      {away < 1 && (
        <World x={960} y={700} z={-3400} w={120} h={300} style={{ transform: `translate3d(${960 - 60}px, ${430 + away * 900}px, -3400px)` }}>
          <Stand id="fomo-me" t={t} lit={1} />
        </World>
      )}
    </Stage>
    {/* the word lives off the travelling camera (it was flying past the lens) */}
    {t >= 31.86 && t < 32.7 && (() => {
      const fr = (t - 31.86) * 30, sc = fr < 1 ? 1.6 : fr < 2 ? 1.15 : 1;
      const ex = lerp(t, 32.45, 32.7, 0, 1, Easing.in(Easing.cubic));
      return (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translate(${shake(t, 31.86, 14)}px, ${-40 - ex * 60}px) scale(${sc})`, filter: fr < 2 || ex > 0.05 ? `blur(${fr < 2 ? 3 : ex * 10}px)` : undefined, opacity: 1 - ex }}>
          <div style={{ fontFamily: outfit, fontWeight: 800, fontSize: 470, lineHeight: 1, letterSpacing: '-0.02em', color: T.ink, whiteSpace: 'nowrap' }}>
            F<span style={{ position: 'relative', display: 'inline-block' }}>O<div style={{ position: 'absolute', left: '50%', top: '53%', width: 120, height: 300, transform: 'translate(-50%, -50%) scale(0.62)' }}><Stand id="fomo-o" t={t} lit={1} /></div></span>MO
          </div>
        </AbsoluteFill>
      );
    })()}
    </>
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
  return (
    <AbsoluteFill>
      <NightBG />
      <Stage cam={cam} mb={dive * 6}>
        <Layer z={0}>
          <DeskScene t={t} screenA={lerp(t, 34.6, 35.6, 0, 1)} />
          <svg width="1920" height="1080" style={{ position: 'absolute' }}>
            <g transform="translate(1130 470) scale(1.7) translate(-1130 -470)"><circle cx="1130" cy="470" r="44" fill="#0B0E1E" stroke="#DCE4FF" strokeWidth="3" />
            {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={1130 + Math.cos(i * Math.PI / 6) * 36} y1={470 + Math.sin(i * Math.PI / 6) * 36} x2={1130 + Math.cos(i * Math.PI / 6) * 40} y2={470 + Math.sin(i * Math.PI / 6) * 40} stroke="#DCE4FF" strokeWidth="2" />)}
            <line x1="1130" y1="470" x2={1130 + Math.sin((t - 32.66) * 12.6) * 34} y2={470 - Math.cos((t - 32.66) * 12.6) * 34} stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="1130" y1="470" x2={1130 + Math.sin((t - 32.66) * 1.05) * 22} y2={470 - Math.cos((t - 32.66) * 1.05) * 22} stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" /></g>
          </svg>
          <div style={{ position: 'absolute', left: 908, top: 598, width: 154, height: 96, overflow: 'hidden', borderRadius: 3, background: T.bg, opacity: lerp(t, 34.4, 34.9, 0, 1) }}>
            <div style={{ width: 1920, height: 1080, transform: 'scale(0.0802)', transformOrigin: '0 0', position: 'relative', background: T.bg }}><ChatWindow t={36.4} /></div>
          </div>
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
// ChatGPT, arriving out of the monitor (35.9 – 40.18)
const Chat: React.FC = () => {
  const t = useT() + 35.9;
  const arrive = lerp(t, 35.9, 36.6, 0, 1, ease);
  const dolly = lerp(t, 37.55, 39.3, 0, 1, Easing.bezier(0.25, 0.6, 0.3, 1));
  const logo = sp(t, 36.2, { damping: 14 });
  const logoOut = lerp(t, 37.3, 37.75, 1, 0, Easing.in(Easing.cubic));
  const cam = { z: 520 * (1 - arrive) + dolly * 760, x: dolly * 110, y: dolly * 20 };
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
  { user: 'kreator.ai', tag: 'AI Threads', time: '11h', text: 'Semua orang tuh bisa bikin software.', media: 2 },
  { user: 'zyx.creator', tag: 'YouTube Creators', time: '13h', text: 'Melakukan sesuatu yang berbeda.', media: 1 },
];
const Turn: React.FC = () => {
  const t = useT() + 40.18;
  const L1 = 'Satu hal yang aku lewatkan adalah…';
  const L2 = 'menjual';
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
  const zoom = 0 + 600 * k(40.5, 41.2) - 120 * k(44.8, 45.3) + 40 * k(46.5, 46.9) - 520 * k(47.5, 48.1);
  const cxCam = -90 * k(40.5, 41.2) + 380 * k(44.8, 45.3) - 600 * k(46.5, 46.9) + 310 * k(46.98, 47.3) + 0;
  const cyCam = -100 * k(40.5, 41.2) + 220 * k(44.8, 45.3) - 280 * k(46.5, 46.9) + 120 * k(46.98, 47.3) + 40 * k(47.5, 48.1);
  const text = <>{L1.slice(0, n1)}{n2 > 0 && t < 44.3 && <><br /><span style={{ background: sel ? 'rgba(26,58,208,0.25)' : 'transparent' }}>{L2.slice(0, n2)}</span></>}</>;
  return (
    <Stage cam={{ z: zoom, x: cxCam, y: cyCam + shake(t, 40.18, 6) }}>
      <Layer z={0}>
        <div style={{ position: 'absolute', left: -900, top: -700, width: 3720, height: 2480, background: '#FAFAFA' }} />
        <ThreadsWeb font={inter} feed={BASE_FEED} />
        <div style={{ position: 'absolute', left: -900, top: -700, width: 3720, height: 2480, background: `rgba(0,0,0,${0.5 * modal})` }} />
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
    <div style={{ position: 'absolute', left: 560, top: 112, transformOrigin: '50% 0%', transform: `perspective(1600px) rotateX(${dir * flip * -70}deg) scale(0.95)`, opacity: 1 - flip * 0.6 }}>
      <CalendarCard y={mo.y} m={mo.m} repos={mo.repos} font={inter} tileA={(i) => (full ? 1 : lerp(local, 0.08 + i * 0.05, 0.22 + i * 0.05, 0, 1))} hiName={hi} />
    </div>
  );
};
const Year: React.FC = () => {
  const t = useT() + 48.26;
  const idx = Math.min(PAGES.length - 1, Math.floor(Math.max(0, t - 48.4)));
  const local = t - 48.4 - idx;
  return (
    <Stage cam={{ z: lerp(t, 48.26, 51.9, 120, 300, Easing.linear), ry: lerp(t, 48.26, 51.9, -5, 4, Easing.linear), rx: 3 }}>
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
  const cam = { z: 600 - 90 * k(53.2, 53.8) - 210 * k(55.3, 56.3), x: -380 + 620 * k(53.2, 53.8) - 240 * k(55.3, 56.3), y: -30 + 30 * k(55.3, 56.3), ry: lerp(t, 51.9, 56.45, 5, -4, Easing.linear) };
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
const CONTRIB = (() => {
  // 53 weeks ending Nov 2026; a day is filled only if a repo was pushed that day (real pushed_at data, nothing invented)
  const end = Date.UTC(2026, 10, 14), start = end - 53 * 7 * 864e5;
  const days = new Set((REPOS as Repo[]).map((r) => r[2]));
  const cnt: Record<string, number> = {};
  (REPOS as Repo[]).forEach((r) => { cnt[r[2]] = (cnt[r[2]] || 0) + 1; });
  return Array.from({ length: 53 * 7 }).map((_, i) => { const d = new Date(start + i * 864e5).toISOString().slice(0, 10); return days.has(d) ? cnt[d] : 0; });
})();
const Reveal: React.FC = () => {
  const t = useT() + 56.45;
  const k = lerp(t, 56.45, 57.5, 0, 1, io);
  const GL = ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'];
  return (
    <Stage cam={{ z: 420 * (1 - k) + 240 * k, x: 120 * (1 - k) + 40 * k, y: -60 * (1 - k) + 40 * k, rx: 3 }}>
      <Layer z={-900}><BackPlate /></Layer>
      <Layer z={0}>
        <div style={{ position: 'absolute', left: 220, top: 140, width: 1480, height: 790, background: '#FFFFFF', border: '1px solid #D1D9E0', borderRadius: 14, boxShadow: '0 30px 80px rgba(40,39,35,0.12)', fontFamily: inter, color: '#1F2328', overflow: 'hidden' }}>
          <div style={{ height: 58, background: '#F6F8FA', borderBottom: '1px solid #D1D9E0', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14 }}><Logo name="github" size={32} color="#1F2328" /><span style={{ fontWeight: 600, fontSize: 18 }}>Siirfannih</span></div>
          <div style={{ display: 'flex', gap: 34, padding: '0 300px', borderBottom: '1px solid #D1D9E0', fontSize: 17 }}>
            {['Overview', 'Repositories', 'Projects', 'Packages', 'Stars'].map((x) => <div key={x} style={{ padding: '16px 0', fontWeight: x === 'Repositories' ? 600 : 400, borderBottom: x === 'Repositories' ? '2px solid #FD8C73' : '2px solid transparent' }}>{x}{x === 'Repositories' && <span style={{ marginLeft: 8, background: '#E6EAEF', borderRadius: 12, padding: '1px 9px', fontSize: 14 }}>{(REPOS as Repo[]).length}</span>}</div>)}
          </div>
          <div style={{ display: 'flex', padding: '26px 34px', gap: 36 }}>
            <div style={{ width: 230 }}>
              <Img src={staticFile('shots/face_end.jpg')} style={{ width: 230, height: 230, borderRadius: 115, objectFit: 'cover', objectPosition: '53% 30%', border: '1px solid #D1D9E0' }} />
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 14 }}>Siirfannih</div>
              <div style={{ display: 'flex', marginTop: 16 }}>{AGENT_ROW.map((id, i) => <div key={id} style={{ marginRight: -6, transform: `scale(${sp(t, 57.0 + i * 0.06)})` }}><Agent id={id} size={46} t={t} seed={i} /></div>)}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, marginBottom: 10 }}>Pinned</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {[29, 26, 27, 21, 13, 0].map((ri, i) => <div key={ri} style={{ transform: `translateY(${(1 - sp(t, 56.6 + i * 0.05)) * 30}px)` }}><RepoCard r={(REPOS as any)[ri]} w={340} style={{ boxShadow: 'none' }} /></div>)}
              </div>
              <div style={{ fontSize: 17, margin: '22px 0 10px' }}>Contribution activity</div>
              <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 14px)', gridAutoFlow: 'column', gap: 4, border: '1px solid #D1D9E0', borderRadius: 8, padding: 14, width: 'fit-content' }}>
                {CONTRIB.map((v, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: GL[Math.min(4, v === 0 ? 0 : v + 1)], transform: v ? `scale(${sp(t, 56.7 + (i / CONTRIB.length) * 0.8)})` : undefined }} />)}
              </div>
            </div>
          </div>
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
      <Layer z={-150}><AbsoluteFill style={{ transform: 'scale(1.08)' }}><OffthreadVideo src={staticFile('face2.mp4')} muted style={{ width: 1920, height: 1080, filter: 'contrast(1.08) saturate(0.88) brightness(1.14)' }} /></AbsoluteFill></Layer>
      <Layer z={-120}><ScaleSettle t={t} at={59.9} out={62.3} x={1240} y={420} text="sadar." size={120} shadow fonts={FONTS()} /></Layer>
    </Stage>
  );
};

// ---------- S9+S10 sea of builders (62.4 – 73.64) ----------
const LIT_IDX = [1, 4, 7, 11, 15, 18];
// everyone builds: rows of flat builders light up on each verb; then only a few raise "Post"
const BUILDERS = (() => {
  const out: { x: number; z: number; id: string; row: number }[] = [];
  for (let r = 0; r < 7; r++) {
    const z = -2700 + r * 420;
    for (let k = 0; k < 10; k++) out.push({ x: -420 + k * 300 + (r % 2) * 150 + (random(`bx${r}-${k}`) - 0.5) * 60, z, id: `b${r}-${k}`, row: r });
  }
  return out;
})();
const SEA_RX = -8;
const POSTERS = ['b6-3', 'b5-4', 'b6-6', 'b4-2', 'b5-6', 'b4-7'];
const Sea: React.FC = () => {
  const t = useT() + 62.4;
  const logoOut = lerp(t, 72.55, 72.85, 1, 0, io);
  const dimNot = lerp(t, 67.55, 67.95, 0, 1);
  const veil = lerp(t, 71.0, 71.4, 0, 0.62);
  const camz = lerp(t, 62.4, 67.4, 900, -250, Easing.bezier(0.3, 0, 0.2, 1)) + lerp(t, 67.5, 70.2, 0, 900, io);
  return (
    <>
    <Stage cam={{ z: camz, rx: SEA_RX, y: lerp(t, 62.4, 73.64, -60, -120, Easing.linear), ry: lerp(t, 62.4, 73.64, 3, -3, Easing.linear) }}>
      <Layer z={-7000}><BackPlate grid={false} /></Layer>
      {BUILDERS.map((b) => {
        const wave = b.row >= 5 ? 63.34 : b.row >= 3 ? 64.92 : 66.82; // membangun · membuat · bikin software
        const on = lerp(t, wave + (b.x % 7) * 0.02, wave + 0.25 + (b.x % 7) * 0.02, 0, 1);
        const app = sp(t, wave + 0.18 + random('ap' + b.id) * 0.25);
        const pi = POSTERS.indexOf(b.id);
        const post = pi >= 0 ? lerp(t, 69.4 + pi * 0.08, 69.75 + pi * 0.08, 0, 1, Easing.out(Easing.back(1.6))) : 0;
        const fly = pi >= 0 ? lerp(t, 69.95 + pi * 0.09, 71.0 + pi * 0.09, 0, 1, Easing.in(Easing.cubic)) : 0;
        return (
          <World key={b.id} x={b.x} y={FLOOR_Y} z={b.z} w={260} h={230} style={{ filter: b.z + camz > -150 ? `blur(${Math.min(6, (b.z + camz + 150) / 70)}px)` : undefined }}>
            <Seat id={b.id} t={t} on={on} app={app} post={post} fly={fly} dim={pi >= 0 ? 0 : dimNot} />
          </World>
        );
      })}
      <AbsoluteFill style={{ background: T.bg, opacity: veil, transform: 'translateZ(600px) scale(0.7)' }} />
    </Stage>
    <Stage cam={{}}>
      <Layer z={170}>
        <SlotSwap t={t} lead="semua orang tuh bisa" words={[['membangun.', 63.34], ['membuat.', 64.92], ['bikin software.', 66.82]]} end={67.5} x={960} y={170} size={120} color={T.ink} fonts={FONTS()} />
        <ColorFlash t={t} at={67.6} out={71.1} x={560} y={190} text="nggak semua orang." size={115} color={T.ink} accent={T.acc} fonts={FONTS()} />
        <Converge t={t} at={72.88} out={73.62} x={960} y={200} text="belum sempurna." size={112} color={T.ink} fonts={FONTS()} />
      </Layer>
      <Layer z={320}>
        {['instagram', 'youtube', 'tiktok', 'threads', 'x', 'linkedin'].map((n, i) => {
          const a = sp(t, 71.24 + i * 0.07) * logoOut;
          if (t < 71.2 || a <= 0.001) return null;
          const ang = (-150 + i * 60) * (Math.PI / 180);
          return (
            <div key={n} style={{ position: 'absolute', left: 960 + Math.cos(ang) * 330 - 52, top: 520 + Math.sin(ang) * 210 - 52, width: 104, height: 104, borderRadius: 52, background: '#FFFFFF', border: '1px solid rgba(40,39,35,0.1)', boxShadow: '0 10px 30px rgba(40,39,35,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: a, transform: `scale(${0.5 + a * 0.5})` }}>
              <Logo name={n} size={48} color={T.ink} />
            </div>
          );
        })}
      </Layer>
    </Stage>
    </>
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
    <>
    <Stage cam={{ z: lerp(t, 73.64, 81.0, 170, 330, Easing.linear) + shake(t, stop, 10), x: -130, y: 30, ry: lerp(t, 73.64, 81.0, 5, -3, Easing.linear), rx: 4 }}>
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
    <Stage cam={{}}><Layer z={90}><Chaotic t={t} at={75.86} out={77.4} x={1200} y={460} text="kecanduan." size={100} color={T.ink} accent={T.acc} fonts={FONTS()} /></Layer></Stage>
    </>
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
      <Stage cam={{ z: lerp(t, 82.4, 85.2, 0, 220, Easing.bezier(0.7, 0, 0.2, 1)) + lerp(t, 85.2, 87.6, 0, 260, Easing.linear), x: lerp(t, 85.2, 87.6, 0, -40, ease), ry: lerp(t, 82.4, 85.2, 8, 0, ease) }}>
        <Layer z={-900}><BackPlate /></Layer>
        <Layer z={0}><CalFlip t={t} idx={idx} local={local} dir={-1} full hi={t > 85.0 ? 'Jadisatu' : undefined} /></Layer>
        <Layer z={60}><Label t={t} at={85.12} out={87.6} x={560} y={760} tx={745} ty={655} text="TITIK AWAL" fonts={FONTS()} /></Layer>
        <Layer z={160}>{ring > 0 && <div style={{ position: 'absolute', left: 960 - 300, top: 540 - 300, width: 600, height: 600, borderRadius: 300, border: `3px solid ${T.acc}`, transform: `scale(${0.5 + ring * 0.7})`, opacity: 1 - ring }} />}</Layer>
      </Stage>
    );
  }
  // Threads again: this time the post goes out, then more posts follow
  const L = 'Nggak sekadar membangun.';
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
      <Stage cam={{ z: lerp(t, 87.6, 88.4, 0, 260, ease) + lerp(t, 88.4, 93.9, 0, 80, Easing.linear) + lerp(t, 93.9, 96.0, 0, 420, Easing.inOut(Easing.cubic)), x: 5, y: lerp(t, 87.6, 88.4, 0, -60, ease) + lerp(t, 93.9, 96.0, 0, -250, Easing.inOut(Easing.cubic)), ry: lerp(t, 87.6, 96, -3, 2, Easing.linear) }}>
        <Layer z={0}>
          <div style={{ position: 'absolute', left: -900, top: -700, width: 3720, height: 2480, background: '#FAFAFA' }} />
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
    <Sequence {...S(35.9, 40.18)}><Join from={35.9} to={40.18} outM="whip"><Chat /></Join></Sequence>
    <Sequence {...S(40.18, 48.26)}><Join from={40.18} to={48.26} inM="whip" outM="push"><Turn /></Join></Sequence>
    <Sequence {...S(48.26, 51.9)}><Join from={48.26} to={51.9} inM="push" outM="whip"><Year /></Join></Sequence>
    <Sequence {...S(51.9, 56.45)}><Join from={51.9} to={56.45} inM="whip"><AgentsScene /></Join></Sequence>
    <Sequence {...S(56.45, 58.58)}><Join from={56.45} to={58.58} outM="push"><Reveal /></Join></Sequence>
    <Sequence {...S(58.58, 62.4)}><Join from={58.58} to={62.4} inM="push" outM="whip"><Sadar /></Join></Sequence>
    <Sequence {...S(62.4, 73.64)}><Join from={62.4} to={73.64} inM="whip"><Sea /></Join></Sequence>
    <Sequence {...S(73.64, 82.4)}><Join from={73.64} to={82.4} outM="push"><Addiction /></Join></Sequence>
    <Sequence {...S(82.4, TOTAL)}><Join from={82.4} to={TOTAL} inM="push"><Decision /></Join></Sequence>
    <BlockWipe />
    <Captions />
    <EndFade />
    <Grain />
  </AbsoluteFill>
);
