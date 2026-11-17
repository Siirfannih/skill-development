import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {CurveName, move} from '../lib/curves';
import {box} from './kit';

// B3-C · "aku ngebalik … mempelajari workflow-nya" — kiblat 28 (Cursor & Desktop).
// One subject (the B3 clip) travels BRIEF → kiblat → Mode A → juri → DECISIONS.md; the camera follows it.
export const WORKFLOW_FRAMES = 294;

const K = {canvas: '#F1F2EA', dot: '#D3D5CB', ink: '#111318', soft: '#6E7178', blue: '#2E5BFF', green: '#1A7F37', line: '#C9CBC2'};
const inter = (weight: number, size: number): React.CSSProperties => ({fontFamily: 'PapanInter', fontWeight: weight, fontSize: size});
const lift = '0 40px 80px rgba(28,32,52,.16), 0 12px 24px rgba(28,32,52,.08), inset 0 1px 0 rgba(255,255,255,.9)';

type V = {x: number; y: number; z: number};
type Key = [frame: number, value: V, curve: CurveName];
const track = (f: number, keys: Key[]): V => keys.slice(1).reduce((v, [at, to, curve], i) => {
  const from = keys[i][0];
  const t = move(f, from, at - from, curve);
  return {x: v.x + (to.x - v.x) * t, y: v.y + (to.y - v.y) * t, z: v.z + (to.z - v.z) * t};
}, keys[0][1]);

// Camera: morph out of the face (z 2.4 = card fills frame), truck with the clip, push on each decision, pull to the whole trail.
const CAM: Key[] = [
  [0, {x: 0, y: 0, z: 2.4}, 'heavy'], [26, {x: 0, y: 0, z: 1}, 'heavy'], [44, {x: 0, y: 0, z: 1}, 'drift'],
  [76, {x: 1520, y: 10, z: 1}, 'heavy'], [96, {x: 1540, y: 10, z: 1.06}, 'heavy'],
  [122, {x: 3040, y: -20, z: .95}, 'heavy'], [168, {x: 3060, y: -20, z: .97}, 'drift'],
  [194, {x: 4700, y: -120, z: 1.08}, 'heavy'], [234, {x: 4720, y: -120, z: 1.1}, 'drift'],
  [266, {x: 2600, y: -430, z: .33}, 'heavy'], [294, {x: 2600, y: -430, z: .328}, 'drift'],
];
// The subject (clip card centre, world px).
const CLIP: Key[] = [
  [0, {x: 0, y: 0, z: 1}, 'land'], [44, {x: 0, y: 0, z: 1}, 'land'], [74, {x: 1200, y: 20, z: 1}, 'heavy'],
  [100, {x: 1200, y: 20, z: 1}, 'land'], [124, {x: 2670, y: 0, z: 1}, 'heavy'],
  [164, {x: 2670, y: 0, z: 1}, 'land'], [192, {x: 4460, y: -80, z: 1}, 'heavy'],
];
const CW = 800, CH = 450;
const STATION = {kiblat: {x: 1890, y: 40}, a: {x: 3420, y: -170}, b: {x: 3420, y: 190}, note: {x: 5200, y: 170}};
const TRAIL = [{x: 0, y: 0}, {x: 1200, y: 20}, {x: 2670, y: 0}, {x: 3420, y: -170}, {x: 4460, y: -80}, {x: 5200, y: 170}];

const toScreen = (p: {x: number; y: number}, cam: V) => ({x: 960 + (p.x - cam.x) * cam.z, y: 540 + (p.y - cam.y) * cam.z});

// Soft glowing dot trail (style borrowed from the Effort reference: light, not decoration — it is the path walked).
const Trail: React.FC<{f: number}> = ({f}) => {
  const big = 1 + move(f, 240, 24, 'heavy');
  const dots: {x: number; y: number; at: number}[] = [];
  const times = [44, 74, 124, 150, 192, 236];
  TRAIL.slice(1).forEach((b, i) => {
    const a = TRAIL[i];
    const n = Math.max(2, Math.round(Math.hypot(b.x - a.x, b.y - a.y) / 70));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const e = t * t * (3 - 2 * t);
      dots.push({x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * e, at: times[i] + (times[i + 1] - times[i]) * t});
    }
  });
  return <svg style={{...box(-1000, -1000, 8000, 3000), overflow: 'visible'}} viewBox="-1000 -1000 8000 3000">
    <defs><filter id="wf-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="9"/></filter></defs>
    {dots.map((d, i) => {
      const on = move(f, d.at, 10, 'reveal');
      return <g key={i} opacity={on}>
        <circle cx={d.x} cy={d.y} r={15 * big} fill={K.blue} opacity={.28} filter="url(#wf-glow)"/>
        <circle cx={d.x} cy={d.y} r={6.5 * big} fill={K.blue} opacity={.85}/>
      </g>;
    })}
  </svg>;
};

const Tab: React.FC<{f: number}> = ({f}) => {
  const steps = [{at: 0, text: 'BRIEF', color: K.ink}, {at: 96, text: 'kiblat 83', color: K.blue},
    {at: 142, text: 'Mode A', color: K.blue}, {at: 222, text: 'LULUS', color: K.green}];
  const step = [...steps].reverse().find(s => f >= s.at)!;
  const swap = step.at ? move(f, step.at, 8, 'whip') : 1;
  return <div style={{...box(0, -74), height: 56, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 13, borderRadius: 28,
    background: 'rgba(255,255,255,.92)', boxShadow: '0 10px 24px rgba(28,32,52,.10)', ...inter(600, 28), color: step.color,
    opacity: move(f, 22, 10, 'reveal')}}>
    <span style={{width: 13, height: 13, borderRadius: 7, background: step.color}}/>
    <span style={{filter: `blur(${6 * (1 - swap)}px)`, opacity: .3 + .7 * swap}}>{step.text}</span>
  </div>;
};

// The subject: the same frame as B3-A (zoom 1.24, shift 165) shrunk into a clip card, so the cut is a morph.
const Clip: React.FC<{f: number; cam: V}> = ({f, cam}) => {
  const p = track(f, CLIP);
  const scan = move(f, 196, 22, 'heavy');
  const radius = 36;
  return <div style={{...box(p.x - CW / 2, p.y - CH / 2, CW, CH)}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden', boxShadow: cam.z > 2 ? undefined : lift, background: '#222'}}>
      <div style={{...box(0, 0, 1920, 1080), transform: `scale(${CW / 1920})`, transformOrigin: '0 0'}}>
        <Img src={staticFile('papan/B3-footage.jpg')} style={{...box(0, 0, 1920, 1080), transform: 'translateX(165px) scale(1.24)'}}/>
      </div>
      {scan > 0 && scan < 1 && <div style={{...box(-260 + (CW + 320) * scan, -40, 180, CH + 80), transform: 'rotate(8deg)',
        background: 'linear-gradient(90deg,rgba(255,255,255,0),rgba(220,232,255,.55) 45%,rgba(255,255,255,.8) 50%,rgba(220,232,255,.55) 55%,rgba(255,255,255,0))'}}/>}
      <div style={{position: 'absolute', inset: 0, borderRadius: radius, boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,.55)'}}/>
    </div>
    <Tab f={f}/>
    <Verdict f={f}/>
  </div>;
};

const Verdict: React.FC<{f: number}> = ({f}) => {
  const pop = move(f, 214, 12, 'land');
  const settle = move(f, 220, 10, 'heavy') - move(f, 226, 12, 'drift');
  return <div style={{...box(CW - 70, -44, 120, 120), opacity: pop, transform: `scale(${(.6 + .4 * pop) * (1 + .06 * settle)})`}}>
    <svg width="120" height="120" viewBox="0 0 120 120" style={{filter: 'drop-shadow(0 14px 18px rgba(26,127,55,.28))'}}>
      <defs><linearGradient id="wf-check" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#2FA557"/><stop offset="1" stopColor="#1A7F37"/></linearGradient></defs>
      <circle cx="60" cy="60" r="54" fill="url(#wf-check)"/><circle cx="60" cy="60" r="53" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2"/>
      <path d="M36 61L52 77 85 43" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - move(f, 219, 10, 'reveal')}/>
    </svg>
  </div>;
};

const Pictogram: React.FC<{kind: '83' | '28' | '30'}> = ({kind}) => <svg width="200" height="150" viewBox="0 0 200 150">
  {kind === '83' ? <>
    <ellipse cx="100" cy="78" rx="82" ry="34" fill="none" stroke={K.blue} strokeWidth="7" strokeDasharray="34 14"/>
    <circle cx="100" cy="62" r="30" fill={K.ink}/><path d="M48 150C52 112 74 98 100 98S148 112 152 150Z" fill={K.ink}/>
  </> : kind === '28' ? <path d="M70 28L142 76 108 84 92 118Z" fill={K.blue} stroke="white" strokeWidth="6" strokeLinejoin="round"/>
    : <><defs><radialGradient id="wf-30"><stop stopColor="#EF4C6C"/><stop offset=".6" stopColor="#CC56C2"/><stop offset="1" stopColor="#CC56C2" stopOpacity="0"/></radialGradient></defs>
      <circle cx="100" cy="75" r="70" fill="url(#wf-30)"/></>}
</svg>;

const KiblatCard: React.FC<{kind: '83' | '28' | '30'; name: string; x: number; y: number; scale: number; blur: number; rotate: number; glow?: number}> = ({kind, name, x, y, scale, blur, rotate, glow = 0}) =>
  <div style={{...box(x - 160, y - 210, 320, 420), transform: `rotate(${rotate}deg) scale(${scale})`, filter: blur > .05 ? `blur(${blur}px)` : undefined,
    borderRadius: 34, background: 'white', boxShadow: `${lift}, 0 0 0 ${4 * glow}px rgba(46,91,255,${.9 * glow})`, padding: '34px 34px', boxSizing: 'border-box', color: K.ink}}>
    <div style={{...inter(700, 92), letterSpacing: -4, lineHeight: 1}}>{kind}</div>
    <div style={{...inter(500, 28), color: K.soft, marginTop: 10}}>{name}</div>
    <div style={{...box(60, 236)}}><Pictogram kind={kind}/></div>
  </div>;

const Kiblat: React.FC<{f: number}> = ({f}) => {
  const pick = move(f, 64, 20, 'heavy');
  const s = STATION.kiblat;
  const thread = move(f, 86, 14, 'reveal');
  return <>
    <KiblatCard kind="30" name="gradient" x={s.x + 330} y={s.y - 40} scale={.8} blur={7} rotate={6}/>
    <KiblatCard kind="28" name="apple style" x={s.x + 170} y={s.y - 90} scale={.84} blur={5} rotate={-4}/>
    <svg style={{...box(0, 0, 1, 1), overflow: 'visible'}}>
      <path d={`M${s.x - 160} ${s.y + 40}C${s.x - 230} ${s.y + 40} ${1600 + 60} ${40} ${1600} ${40}`} fill="none" stroke={K.blue} strokeWidth="5"
        strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - thread} opacity={thread > 0 ? 1 : 0}/>
    </svg>
    <KiblatCard kind="83" name="talking head" x={s.x + 60 * (1 - pick)} y={s.y - 40 * (1 - pick)} scale={.84 + .2 * pick} blur={6 * (1 - pick)} rotate={-2 * (1 - pick)} glow={pick}/>
  </>;
};

const ModeTile: React.FC<{f: number; mode: 'A' | 'B'}> = ({f, mode}) => {
  const s = mode === 'A' ? STATION.a : STATION.b;
  const enter = move(f, mode === 'A' ? 104 : 108, 16, 'land');
  const chosen = move(f, 136, 12, 'whip');
  const press = move(f, 132, 4, 'whip') - move(f, 136, 8, 'heavy');
  const isA = mode === 'A';
  const fill = isA ? chosen : 0;
  const fade = isA ? 0 : chosen;
  return <div style={{...box(s.x - 180, s.y - 80, 360, 160), borderRadius: 32, opacity: enter * (1 - .55 * fade),
    transform: `translateX(${80 * (1 - enter)}px) scale(${(1 - .06 * fade) * (1 - .04 * (isA ? press : 0))})`, filter: fade > .02 ? `blur(${3.5 * fade}px)` : undefined,
    background: fill > .5 ? K.blue : 'white', boxShadow: lift, display: 'flex', alignItems: 'center', gap: 24, padding: '0 34px', boxSizing: 'border-box'}}>
    <svg width="64" height="64" viewBox="0 0 64 64">
      {isA ? <><circle cx="32" cy="24" r="13" fill={fill > .5 ? 'white' : K.ink}/><path d="M9 62C11 45 20 39 32 39S53 45 55 62Z" fill={fill > .5 ? 'white' : K.ink}/></>
        : <><rect x="6" y="10" width="52" height="40" rx="8" fill="none" stroke={K.ink} strokeWidth="5"/><circle cx="24" cy="30" r="8" fill={K.ink}/><path d="M36 38L45 26 53 38Z" fill={K.ink}/></>}
    </svg>
    <div>
      <div style={{...inter(700, 40), letterSpacing: -1.2, color: fill > .5 ? 'white' : K.ink}}>Mode {mode}</div>
      <div style={{...inter(500, 26), color: fill > .5 ? 'rgba(255,255,255,.8)' : K.soft}}>{isA ? 'wajah' : 'visual'}</div>
    </div>
  </div>;
};

const Fork: React.FC<{f: number}> = ({f}) => {
  const grow = move(f, 104, 18, 'reveal');
  const lit = move(f, 138, 16, 'reveal');
  const from = {x: 2670 + CW / 2, y: 0};
  const path = (to: {x: number; y: number}) => `M${from.x} ${from.y}C${from.x + 110} ${from.y} ${to.x - 300} ${to.y} ${to.x - 180} ${to.y}`;
  return <>
    <svg style={{...box(0, 0, 1, 1), overflow: 'visible'}}>
      {[STATION.a, STATION.b].map((to, i) => <path key={i} d={path(to)} fill="none" stroke={K.line} strokeWidth="5" strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - grow}/>)}
      <path d={path(STATION.a)} fill="none" stroke={K.blue} strokeWidth="6" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - lit}/>
    </svg>
    <ModeTile f={f} mode="A"/><ModeTile f={f} mode="B"/>
  </>;
};

const Note: React.FC<{f: number}> = ({f}) => {
  const s = STATION.note;
  const enter = move(f, 222, 16, 'land');
  const line = 'bila…, pilih…, karena…';
  const typed = Math.round(line.length * move(f, 232, 18, 'drift'));
  return <div style={{...box(s.x - 250, s.y - 105, 500, 210), borderRadius: 30, background: 'white', boxShadow: lift, opacity: enter,
    transform: `translateY(${70 * (1 - enter)}px)`, padding: '30px 34px', boxSizing: 'border-box'}}>
    <div style={{...inter(600, 26), color: K.soft, display: 'flex', alignItems: 'center', gap: 12}}>
      <svg width="26" height="30" viewBox="0 0 26 30"><path d="M3 2H17L23 8V28H3Z" fill="none" stroke={K.soft} strokeWidth="2.6" strokeLinejoin="round"/></svg>
      DECISIONS.md
    </div>
    <div style={{...inter(600, 34), color: K.ink, marginTop: 26, letterSpacing: -.6, whiteSpace: 'nowrap'}}>
      {line.slice(0, typed)}<span style={{display: 'inline-block', width: 3, height: 36, background: K.blue, marginLeft: 3, verticalAlign: -6, opacity: f < 256 ? 1 : 0}}/>
    </div>
  </div>;
};

const Labels: React.FC<{f: number}> = ({f}) => {
  const on = move(f, 254, 14, 'reveal');
  const items = [{x: 0, y: 110, t: 'BRIEF'}, {x: 1890, y: 290, t: 'pustaka'}, {x: 3420, y: -420, t: 'Mode A'}, {x: 4460, y: 230, t: 'juri'}];
  return <>{items.map(i => <div key={i.t} style={{...box(i.x - 450, i.y, 900), textAlign: 'center', ...inter(600, 132), color: K.soft, opacity: on}}>{i.t}</div>)}</>;
};

const Cursor: React.FC<{x: number; y: number; press: number; size: number}> = ({x, y, press, size}) =>
  <svg width={size} height={size} viewBox="0 0 100 100" style={{...box(x - size * .18, y - size * .1), overflow: 'visible',
    transform: `scale(${1 - .12 * press})`, transformOrigin: '18% 10%', filter: 'drop-shadow(0 10px 12px rgba(20,40,120,.28)) drop-shadow(0 2px 3px rgba(20,40,120,.2))'}}>
    <defs><linearGradient id="wf-cursor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5C86FF"/><stop offset=".55" stopColor="#2E5BFF"/><stop offset="1" stopColor="#1F45D8"/></linearGradient></defs>
    <path d="M18 10L86 52 54 60 40 92Z" fill="url(#wf-cursor)" stroke="white" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M24 20L74 51" stroke="rgba(255,255,255,.45)" strokeWidth="3" strokeLinecap="round"/>
  </svg>;

export const WorkflowScene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = track(f, CAM);
  const clip = track(f, CLIP);
  const corner = (p: {x: number; y: number}) => toScreen({x: p.x + CW / 2 - 40, y: p.y + CH / 2 - 30}, cam);
  // Cursor waypoints, re-projected through the live camera so it stays glued to what it touches.
  const legs: {at: number; frames: number; curve: CurveName; to: () => {x: number; y: number}}[] = [
    {at: 26, frames: 16, curve: 'land', to: () => corner(clip)},
    {at: 74, frames: 16, curve: 'heavy', to: () => toScreen({x: STATION.kiblat.x + 40, y: STATION.kiblat.y + 110}, cam)},
    {at: 98, frames: 12, curve: 'heavy', to: () => corner(clip)},
    {at: 114, frames: 18, curve: 'heavy', to: () => toScreen({x: STATION.a.x + 40, y: STATION.a.y + 30}, cam)},
    {at: 150, frames: 14, curve: 'heavy', to: () => corner(clip)},
    {at: 240, frames: 22, curve: 'heavy', to: () => ({x: 1490, y: 150})},
  ];
  const start = {x: 2150, y: 1250};
  const cur = legs.reduce((p, l) => {
    const t = move(f, l.at, l.frames, l.curve);
    const q = l.to();
    return {x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t};
  }, start);
  const press = move(f, 84, 4, 'whip') - move(f, 88, 8, 'heavy') + move(f, 132, 4, 'whip') - move(f, 136, 8, 'heavy');
  const word = move(f, 248, 18, 'reveal');
  const g = 34 * cam.z;
  return <AbsoluteFill style={{background: K.canvas, overflow: 'hidden'}}>
    <svg width="1920" height="1080" style={box(0, 0)}>
      <defs><pattern id="wf-grid" width={g} height={g} patternUnits="userSpaceOnUse"
        patternTransform={`translate(${(960 - cam.x * cam.z) % g} ${(540 - cam.y * cam.z) % g})`}>
        <circle cx={g / 2} cy={g / 2} r={Math.max(.9, 1.7 * Math.sqrt(cam.z))} fill={K.dot}/></pattern></defs>
      <rect width="1920" height="1080" fill="url(#wf-grid)" opacity={move(f, 8, 18, 'reveal')}/>
    </svg>
    <div style={{...box(0, 0), transform: `translate(${960 - cam.x * cam.z}px,${540 - cam.y * cam.z}px) scale(${cam.z})`, transformOrigin: '0 0'}}>
      <Trail f={f}/>
      <Kiblat f={f}/>
      <Fork f={f}/>
      <Note f={f}/>
      <Labels f={f}/>
      <Clip f={f} cam={cam}/>
    </div>
    <div style={{...box(0, 140, 1920), textAlign: 'center', ...inter(700, 290), letterSpacing: -14, lineHeight: 1, color: K.ink,
      opacity: word, transform: `translateY(${60 * (1 - word)}px)`, filter: `blur(${10 * (1 - word)}px)`}}>workflow</div>
    {f >= 26 && <Cursor x={cur.x} y={cur.y} press={press} size={104}/>}
  </AbsoluteFill>;
};
