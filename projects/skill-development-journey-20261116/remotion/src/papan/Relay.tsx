import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {arc, move} from '../lib/curves';
import {Character2D} from './Karakter';
import {Karakter2D} from './karakter2d/Karakter2D';
import {jump} from './karakter2d/gerak';
import {box, C, Canvas07, Check, shadow} from './kit';

// B5 · r1 composition kept (Irfan 16 Nov: "jendela + tokoh + loop" = benar). No title, no connector line.
// Real exchange (PAHAM-SKILL-DEV §D adegan 1): Codex asks → Claude 2 answers → Codex reports. Messages pop in order; the envelope carries each one.
const inter: React.CSSProperties = {fontFamily: 'PapanInter'};
const T = {codex1: 6, fly1: 22, claude: 50, fly2: 70, codex2: 98, loop: 112};

const Message: React.FC<{start: number; children: React.ReactNode; claude?: boolean}> = ({start, children, claude = false}) => {
  const f = useCurrentFrame();
  const enter = move(f, start, 12, 'land');
  const rebound = move(f, start + 5, 7, 'heavy') - move(f, start + 12, 11, 'heavy');
  const typing = f < start + 10;
  return <div style={{opacity: enter, transformOrigin: '0 0', marginTop: 22,
    transform: `translateY(${26 * (1 - enter)}px) scale(${.92 + .08 * enter + .015 * rebound})`,
    display: 'flex', gap: 16, alignItems: 'flex-start', fontSize: 39, lineHeight: 1.34, letterSpacing: -.4, color: C.ink, fontWeight: 500}}>
    {claude && <span style={{color: '#D97757', fontSize: 34, lineHeight: 1.3}}>✳</span>}
    <span>{typing ? <span style={{color: '#8C9099', letterSpacing: 6}}>•••</span> : children}</span>
  </div>;
};

const AgentWindow: React.FC<{claude?: boolean; children: React.ReactNode}> = ({claude = false, children}) =>
  <div style={{...box(claude ? 140 : 985, claude ? 205 : 160, 805, 560), background: '#FFFFFF', borderRadius: 28,
    boxShadow: '0 40px 80px rgba(15,35,115,.30), 0 10px 20px rgba(15,35,115,.14), inset 0 1px 0 rgba(255,255,255,.9)', overflow: 'hidden',
    transform: `perspective(1800px) rotateY(${claude ? 9 : -10}deg) rotateZ(${claude ? -4 : 4}deg)`}}>
    <div style={{height: 76, display: 'flex', alignItems: 'center', padding: '0 30px', gap: 14, background: '#F6F6F3',
      borderBottom: '1px solid #ECECE8', ...inter, color: C.ink, fontWeight: 600, fontSize: 29}}>
      <Character2D model={claude ? 'claude' : 'chatgpt'} size={42} id={claude ? 'wc' : 'wg'}/>
      {claude ? 'Claude Code' : 'ChatGPT'}
      <span style={{fontWeight: 500, color: '#8C9099', fontSize: 25}}>{claude ? 'Claude 2 · Sutradara' : 'Codex'}</span>
    </div>
    <div style={{padding: '8px 40px', ...inter}}>{children}</div>
  </div>;

const Envelope: React.FC<{start: number; from: {x: number; y: number}; to: {x: number; y: number}}> = ({start, from, to}) => {
  const f = useCurrentFrame();
  const p = arc(f, start, 26, from, to);
  const lift = move(f, start, 13, 'land') - move(f, start + 13, 13, 'heavy');
  const t = move(f, start, 26, 'heavy');
  const on = move(f, start, 4, 'reveal') * (1 - move(f, start + 24, 5, 'leave'));
  const dir = to.x > from.x ? 1 : -1;
  return <div style={{...box(p.x - 78, p.y - 55 - 120 * lift, 155, 110), opacity: on,
    transform: `rotate(${dir * (-12 + 24 * t)}deg) scale(${.9 + .1 * on})`, filter: 'drop-shadow(0 18px 18px rgba(20,40,120,.3))'}}>
    <svg width="155" height="110" viewBox="0 0 155 110">
      <rect x="2" y="2" width="151" height="106" rx="18" fill="#FFFFFF"/>
      <path d="M8 12L77 65 147 12M7 100L53 60M148 100L102 60" fill="none" stroke="#D0DAF5" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  </div>;
};

export const Relay: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const at = (frame: number) => frame / fps;
  // Kirim = lompat dengan antisipasi jongkok (gerak.jump); terima = take lewat perubahan emosi.
  const crabJump = jump(t, at(T.fly2 - 2), at(T.fly2 + 9), 1.4);
  const flowerJump = jump(t, at(T.fly1 - 2), at(T.fly1 + 9), 1.2);
  const loop = move(f, T.loop, 16, 'land');
  const crab = {x: 470, y: 860};
  const flower = {x: 1450, y: 870};
  return <Canvas07>
    <AgentWindow claude>
      <Message start={T.claude} claude>Sudah kujalankan <span style={{whiteSpace: 'nowrap'}}>doctor --fix</span>. Jangan bertanya, langsung kerjakan TASK.</Message>
    </AgentWindow>
    <AgentWindow>
      <Message start={T.codex1}>doctor.sh gagal: 8 skill berupa salinan, bukan symlink. Boleh menjalankan <span style={{whiteSpace: 'nowrap'}}>--fix?</span></Message>
      <Message start={T.codex2}>Revisi kamera selesai; lima still tersedia.</Message>
    </AgentWindow>
    <Karakter2D model="claude" id="relay-claude" x={470} y={1012} u={27} t={t} sudut={.125} seed={1}
      emosi={[[0, 'neutral'], [at(T.fly1 + 25), 'surprised'], [at(T.claude + 2), 'thinking'], [at(T.loop), 'happy']]} ekstra={crabJump}/>
    <Karakter2D model="codex" id="relay-codex" x={1448} y={1080} u={29} t={t} sudut={-.125} seed={2}
      emosi={[[0, 'thinking'], [at(T.fly2 + 25), 'surprised'], [at(T.codex2 + 4), 'happy']]} ekstra={flowerJump}/>
    <Envelope start={T.fly1} from={flower} to={crab}/>
    <Envelope start={T.fly2} from={crab} to={flower}/>
    <div style={{...box(827, 879, 270, 110), background: '#FFFFFF', borderRadius: 30, boxShadow: shadow, display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: 20, color: C.ink, ...inter, fontSize: 30, fontWeight: 600, opacity: loop,
      transform: `translateY(${40 * (1 - loop)}px) scale(${.85 + .15 * loop})`}}><Check size={72}/>loop</div>
  </Canvas07>;
};
