import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {move, react} from '../lib/curves';
import {Karakter2D, type Model} from './karakter2d/Karakter2D';
import {EASE, seg, turn} from './karakter2d/gerak';
import {Character2D} from './Karakter';
import {Relay} from './Relay';
import {WORKFLOW_FRAMES, WorkflowScene} from './WorkflowScene';
import {box, C, Fonts, Plate, shadow, Slab} from './kit';

// Opus finishing (16 Nov): base = r1 (handoff/henti1/sanding.jpg), RESEP §6–§7.
export const PANELS = ['B1b', 'B2', 'B3-A', 'B3-C', 'B4', 'B5', 'B6'] as const;
export type PanelID = typeof PANELS[number];
export const DURASI: Partial<Record<PanelID, number>> = {'B3-C': WORKFLOW_FRAMES};
const poppins: React.CSSProperties = {fontFamily: 'PapanPoppins', fontWeight: 700};
const inter: React.CSSProperties = {fontFamily: 'PapanInter'};
const mono: React.CSSProperties = {fontFamily: 'PapanMono'};

// K1 ring at slab scale: the words ride a wide ellipse around the head; the matte puts the head in front of them.
const Ring: React.FC = () => {
  const f = useCurrentFrame();
  const spin = 1.4 * move(f, 0, 150, 'drift');
  return <svg width="1920" height="1080" style={box(0, 0)}>
    <defs>
      <path id="head-ring" d="M150 1010 C40 390 430 195 900 195 C1370 195 1800 390 1690 1010"/>
      <filter id="ring-soft" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity=".42"/></filter>
    </defs>
    {(['workflow', 'model', 'decision'] as const).map((word, i) => {
      const on = move(f, 2 + react(i, 30, 1.6), 14, 'reveal');
      return <text key={word} fill={i === 2 ? '#FFE3C2' : '#FAF8EC'} fontSize={i === 1 ? 146 : 160} fontFamily="PapanPoppins" fontWeight="800"
        letterSpacing={-4} filter="url(#ring-soft)" opacity={on}>
        <textPath href="#head-ring" startOffset={`${[6.5, 41, 62.5][i] + spin - 3 * (1 - on)}%`}>{word}</textPath>
      </text>;
    })}
  </svg>;
};

// Tiga tokoh 2D (gaya ClaudeAnimationBase) masuk tepat di namanya (ChatGPT → Claude → Gemini), lalu menoleh ke Irfan di "decision".
const Panggil: React.FC<{model: Model; id: string; x: number; y: number; u: number; dipanggil: number; arah: 1 | -1; seed: number}> = ({model, id, x, y, u, dipanggil, arah, seed}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  if (t < dipanggil - .02) return null;
  const pop = EASE.back(seg(t, dipanggil, dipanggil + .36));
  const tengok = turn(t, 2.15, 2.5, 0, arah * .125);
  return <Karakter2D model={model} id={id} x={x} y={y} u={u} t={t} seed={seed} kamar lantai={model === 'claude'}
    sudut={arah * .125 * EASE.soft(seg(t, 2.15, 2.5))}
    smear={tengok.smear}
    emosi={[[0, 'neutral'], [dipanggil + .04, 'excited'], [dipanggil + 1.1, 'neutral'], [2.3, 'happy']]}
    ekstra={{scale: pop, dy: -1.6 * (1 - Math.min(1, pop))}}/>;
};

const B1b: React.FC = () => <AbsoluteFill>
  <Plate name="B1b"/>
  <Ring/>
  <Plate name="B1b" matte/>
  <Panggil model="claude" id="b1b-claude" x={330} y={1072} u={33} dipanggil={.75} arah={1} seed={1}/>
  <Panggil model="codex" id="b1b-codex" x={1612} y={1085} u={31} dipanggil={0} arah={-1} seed={2}/>
  <Panggil model="gemini" id="b1b-gemini" x={1735} y={385} u={24} dipanggil={1.25} arah={-1} seed={3}/>
</AbsoluteFill>;

const BrokenTimeline: React.FC = () => {
  const f = useCurrentFrame();
  const landed = move(f, 13, 23, 'heavy');
  return <div style={{...box(135,680,890,320), transform:`perspective(1400px) translateY(${260*(1-landed)}px) rotateY(12deg) rotateZ(5deg)`, transformOrigin:'50% 50%', opacity:landed}}>
    <div style={{position:'absolute',inset:0,background:'#A9A9AE',borderRadius:25,transform:'translate(5px,12px)'}}/>
    <div style={{position:'absolute',inset:0,background:'#F9F9F6',borderRadius:25,padding:27,boxShadow:shadow}}>
      <div style={{display:'flex',gap:9,alignItems:'center',height:24}}>{[1,2,3].map(i=><span key={i} style={{width:12,height:12,borderRadius:'50%',background:'#B6B9C1'}}/>)}</div>
      <svg width="835" height="230" viewBox="0 0 835 230">
        {Array.from({length:19},(_,i)=><path key={i} d={`M${i*46} 23v${i%3===0?17:9}`} stroke="#B0B5C1" strokeWidth="2"/>)}
        <path d="M10 85H810 M10 167H810" stroke="#E3E4EA" strokeWidth="2"/>
        <rect x="13" y="64" width="270" height="83" rx="10" fill={C.coral}/>
        <path d="M310 65L333 85 316 108 338 128 326 147H530V65Z" fill={C.coral}/>
        <path d="M580 65H810V147H581L595 127 574 107 594 85Z" fill="#DB625E"/>
        <rect x="13" y="164" width="345" height="37" rx="7" fill="#D5DBE8"/>
        <rect x="411" y="164" width="400" height="37" rx="7" fill="#D5DBE8"/>
        <path d="M37 183l8-8 8 17 8-13 8 7 8-12 8 17 8-9 8 4 8-11 8 16 8-11 8 8 8-13 8 14 8-7" fill="none" stroke="#8A96AC" strokeWidth="2"/>
        <path d="M558 40V215" stroke="#E54342" strokeWidth="3"/><path d="M547 39h22l-11 14Z" fill="#E54342"/>
        <text x="47" y="124" fill="#542226" fontFamily="PapanPoppins" fontWeight="800" fontSize="57">putus</text>
        <text x="353" y="124" fill="#542226" fontFamily="PapanPoppins" fontWeight="800" fontSize="57">putus</text>
      </svg>
    </div>
  </div>;
};

const B2: React.FC = () => <AbsoluteFill>
  <Plate name="B2" dim={.84} zoom={1.07}/>
  <Slab text="AI SLOP" x={120} y={55} width={1680} size={560} color={C.coral} angle={-2}/>
  <Plate name="B2" matte zoom={1.07}/>
  <BrokenTimeline/>
</AbsoluteFill>;

// B3-A · "ini bukan sebuah template": Claude Code prompt, "/" typed, the template menu dissolves → nothing is called.
const SLASH = [{cmd: '/storytelling', on: 0}, {cmd: '/apple-style', on: 1}, {cmd: '/cinematic', on: 2}];
const PromptUI: React.FC = () => {
  const f = useCurrentFrame();
  const enter = move(f, 0, 16, 'land');
  const typed = f >= 12;
  const caret = Math.floor(f / 16) % 2 === 0 || f < 70;
  const collapse = move(f, 70, 14, 'heavy');
  const menuH = 340 * (1 - collapse);
  return <div style={{...box(70, 300 + 170 * collapse, 810, 640 - 340 * collapse), opacity: enter, transform: `translateY(${60 * (1 - enter)}px) scale(${.96 + .04 * enter})`, transformOrigin: '30% 50%'}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: 'linear-gradient(160deg,rgba(38,37,41,.86),rgba(20,20,23,.9))',
      backdropFilter: 'blur(18px)', boxShadow: '0 40px 80px rgba(0,0,0,.45), 0 10px 22px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.10)'}}/>
    <div style={{...box(42, 36), display: 'flex', alignItems: 'center', gap: 16, ...inter, fontWeight: 600, fontSize: 40, color: '#EDE9E3'}}>
      <span style={{color: '#D97757', fontSize: 50, lineHeight: 1}}>✻</span>Claude Code
    </div>
    <div style={{...box(36, 122, 738, 136), borderRadius: 22, border: '2px solid rgba(255,255,255,.28)', boxSizing: 'border-box',
      display: 'flex', alignItems: 'center', padding: '0 34px', gap: 24, ...mono, fontSize: 80, color: '#F4F2EE'}}>
      <span style={{color: '#8E8A85'}}>&gt;</span>
      <span>{typed ? '/' : ''}</span>
      <span style={{width: 40, height: 86, background: '#F4F2EE', opacity: caret ? .9 : 0, marginLeft: -16}}/>
    </div>
    <div style={{...box(36, 284, 738, menuH), overflow: 'hidden'}}>
      {SLASH.map((s, i) => {
        const pop = move(f, 16 + react(i, 30, 1.4), 10, 'land');
        const leave = move(f, 60 + react(i, 30), 12, 'leave');
        return <div key={s.cmd} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 30px', borderRadius: 16,
          background: i === 0 ? 'rgba(177,185,249,.14)' : undefined, opacity: pop * (1 - leave),
          transform: `translateY(${18 * (1 - pop) - 30 * leave}px)`, filter: leave > .02 ? `blur(${8 * leave}px)` : undefined, ...mono, fontSize: 60}}>
          <span style={{color: i === 0 ? '#B1B9F9' : '#E9E6E1'}}>{s.cmd}</span>
          <span style={{...inter, fontWeight: 500, fontSize: 38, color: '#8E8A85'}}>template</span>
        </div>;
      })}
    </div>
  </div>;
};

const B3A: React.FC = () => <AbsoluteFill>
  <Plate name="B3" zoom={1.24} shift={165}/>
  <PromptUI/>
</AbsoluteFill>;

const PackageCard: React.FC<{x: number; y: number; claude?: boolean; start: number}> = ({x,y,claude=false,start}) => {
  const f=useCurrentFrame();const a=move(f,start,24,'heavy');
  return <div style={{...box(x,y,405,375),transform:`perspective(1400px) translateY(${370*(1-a)}px) rotateY(${claude?-10:13}deg) rotateZ(${claude?6:-7}deg)`,opacity:a}}>
    <div style={{position:'absolute',inset:0,borderRadius:30,background:claude?'#DFBAA6':'#C7D0D8',transform:'translate(7px,13px)'}}/>
    <div style={{position:'absolute',inset:0,borderRadius:30,background:claude?'#FFF3E9':'#FBFBF8',boxShadow:shadow,padding:'36px 34px',color:C.ink,...inter}}>
      <div style={{display:'flex',alignItems:'center',gap:17,height:57}}><Character2D id={claude?'pkg-cl':'pkg-cg'} model={claude?'claude':'chatgpt'} size={60}/><span style={{fontSize:35,fontWeight:700}}>{claude?'Claude Max':'ChatGPT Pro'}</span></div>
      <div style={{fontSize:168,fontWeight:700,lineHeight:1.2,letterSpacing:-9,marginTop:22,color:claude?'#9A412C':'#1F2328'}}>{claude?'5':'20'}<span style={{fontSize:110,letterSpacing:-4}}>×</span></div>
    </div>
  </div>;
};

const B4: React.FC = () => <AbsoluteFill>
  <Plate name="B4" dim={.86} zoom={1.08} shift={50}/>
  <Slab text="BALIK MODAL" x={110} y={103} width={1690} size={465}/>
  <Plate name="B4" matte zoom={1.08} shift={50}/>
  <PackageCard x={145} y={465} start={15}/><PackageCard x={420} y={635} claude start={30}/>
</AbsoluteFill>;

// B6 · the two questions arrive as chat bubbles (same pop as B5), not tags.
const Typing: React.FC<{color?: string}> = ({color = '#8A8F98'}) => {
  const f = useCurrentFrame();
  return <span style={{display: 'inline-flex', gap: 12, alignItems: 'center', height: 70}}>
    {[0, 1, 2].map(i => <span key={i} style={{width: 16, height: 16, borderRadius: 8, background: color,
      transform: `translateY(${-5 * Math.sin(f * .3 - i * .9)}px)`, opacity: .55 + .45 * Math.sin(f * .3 - i * .9)}}/>)}
  </span>;
};

const Bubble: React.FC<{x: number; y: number; start: number; side: 'left' | 'right'; text: string; size: number}> = ({x, y, start, side, text, size}) => {
  const f = useCurrentFrame();
  const enter = move(f, start, 12, 'land');
  const rebound = move(f, start + 5, 7, 'heavy') - move(f, start + 12, 11, 'heavy');
  const typing = f < start + 16;
  const left = side === 'left';
  return <div style={{...box(x, y), opacity: enter, transformOrigin: left ? '0 100%' : '100% 100%',
    transform: `translateY(${40 * (1 - enter)}px) scale(${.86 + .14 * enter + .02 * rebound},${.86 + .14 * enter - .016 * rebound})`}}>
    <div style={{position: 'relative', padding: typing ? '22px 40px' : '24px 44px', borderRadius: 52, background: '#FFFFFF', color: C.ink,
      ...poppins, fontSize: size, letterSpacing: -1.5, lineHeight: 1.15, whiteSpace: 'nowrap',
      boxShadow: '0 30px 60px rgba(0,0,0,.30), 0 8px 16px rgba(0,0,0,.16), inset 0 -3px 0 rgba(31,35,40,.06)'}}>
      {typing ? <Typing/> : text}
      <svg width="46" height="40" viewBox="0 0 46 40" style={{position: 'absolute', bottom: -2, [left ? 'left' : 'right']: -12, transform: left ? undefined : 'scaleX(-1)'}}>
        <path d="M30 0C30 18 22 32 0 40C24 40 40 34 46 22Z" fill="#FFFFFF"/>
      </svg>
    </div>
  </div>;
};

const B6: React.FC = () => <AbsoluteFill>
  <Plate name="B6" dim={.86}/>
  <Slab text="100% FULL AI" x={110} y={110} width={1700} size={463}/>
  <Plate name="B6" matte/>
  <Bubble x={120} y={650} start={14} side="left" text="profesional?" size={72}/>
  <Bubble x={1160} y={735} start={34} side="right" text="masih kerasa AI?" size={60}/>
</AbsoluteFill>;

const SCENES: Record<PanelID, React.FC> = {'B1b': B1b, 'B2': B2, 'B3-A': B3A, 'B3-C': WorkflowScene, 'B4': B4, 'B5': Relay, 'B6': B6};
export const Papan: React.FC<{panel: PanelID}> = ({panel}) => {
  const Scene = SCENES[panel];
  return <AbsoluteFill style={{background: C.paper, overflow: 'hidden'}}><Fonts/><Scene/></AbsoluteFill>;
};
