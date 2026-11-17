import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {move} from '../lib/curves';
import {box, Check} from './kit';
import {Character2D} from './Karakter';

const ink = '#202D4D';
const elevation = '0 22px 45px rgba(40,71,122,.13), 0 3px 8px rgba(40,71,122,.05)';

const Avatar: React.FC<{claude?: boolean}> = ({claude = false}) => <div
  style={{width: 112, height: 112, filter: 'drop-shadow(0 8px 8px rgba(40,71,122,.12))'}}>
  {claude ? <Character2D model="claude" size={112} id="chat-claude"/> : <svg width="112" height="112" viewBox="0 0 100 100" aria-label="Codex">
    <defs><linearGradient id="chat-codex-blue" x1="0" y1="1" x2=".3" y2="0">
      <stop stopColor="#3E6BFF"/><stop offset="1" stopColor="#8FB2FF"/>
    </linearGradient></defs>
    <path d="M50 8C65 1 78 12 80 25C97 30 99 48 88 59C94 77 78 93 62 89C48 102 29 94 24 85C5 85 0 67 8 55C-3 40 7 23 22 22C25 10 38 4 50 8Z" fill="url(#chat-codex-blue)"/>
    <path d="M26 23L28 29 34 31 28 33 26 39 24 33 18 31 24 29Z" fill="white"/>
    <path d="M32 39L43 51 32 63M53 63H69" fill="none" stroke="white" strokeWidth="6.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>}
</div>;

const Typing: React.FC = () => {
  const f = useCurrentFrame();
  return <span aria-label="mengetik" style={{display: 'inline-flex', gap: 11, alignItems: 'center', height: 38}}>
    {[0, 1, 2].map(i => <span key={i} style={{fontSize: 35, lineHeight: 1,
      color: '#687B9E', transform: `translateY(${-4 * Math.sin(f * .22 - i * .85)}px)`}}>•</span>)}
  </span>;
};

type BubbleProps = {
  x: number; y: number; width: number; height: number; start: number;
  sender: string; children: React.ReactNode; claude?: boolean; blue?: boolean;
};

const Bubble: React.FC<BubbleProps> = ({x, y, width, height, start, sender, children, claude, blue}) => {
  const f = useCurrentFrame();
  const enter = move(f, start, 12, 'land');
  const rebound = move(f, start + 5, 7, 'heavy') - move(f, start + 12, 11, 'heavy');
  return <div data-chat-bubble={sender} style={{...box(x, y, width, height), opacity: enter,
    transformOrigin: claude ? '100% 90%' : '0 90%',
    transform: `translateY(${38 * (1 - enter)}px) scale(${.9 + .1 * enter + .017 * rebound},${.9 + .1 * enter - .014 * rebound})`}}>
    <div style={{...box(claude ? width + 32 : -142, 25, 112, 112)}}><Avatar claude={claude}/></div>
    <div style={{position: 'absolute', top: -40, left: claude ? undefined : 25, right: claude ? 25 : undefined,
      fontSize: 25, fontWeight: 600, color: '#536581'}}>{sender}</div>
    <div style={{height: '100%', boxSizing: 'border-box', padding: '27px 37px',
      background: claude ? '#FFE0D6' : blue ? '#2E5BFF' : '#FFFFFF',
      color: blue ? '#FFFFFF' : ink, borderRadius: claude ? '43px 43px 12px 43px' : '43px 43px 43px 12px',
      boxShadow: elevation, fontSize: 44, lineHeight: 1.28, letterSpacing: -.8}}>{children}</div>
  </div>;
};

export const ChatScene: React.FC = () => {
  const f = useCurrentFrame();
  const camera = 1 + .009 * move(f, 20, 120, 'drift');
  const record = move(f, 89, 12, 'reveal');
  const system = move(f, 68, 12, 'land');
  const loop = move(f, 101, 13, 'heavy');
  return <AbsoluteFill style={{background: 'linear-gradient(135deg,#FCFAF4 0%,#F5F7F5 44%,#DFEDFF 100%)',
    color: ink, fontFamily: 'PapanInter', overflow: 'hidden'}}>
    <AbsoluteFill style={{transform: `scale(${camera})`}}>
      <svg width="1920" height="1080" style={box(0, 0)}>
        <rect x="-740" y="340" width="1050" height="1250" rx="270" fill="#B6CCFF" transform="rotate(-24 -215 965)"/>
        <rect x="1640" y="-530" width="950" height="1050" rx="300" fill="#91B1FF" transform="rotate(28 2115 -5)"/>
        <path d="M915 966H280C180 966 155 925 155 840V390C155 333 204 310 285 310H335" fill="none"
          stroke="#5473C6" strokeWidth="5" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - loop}/>
        <path d="M315 294L338 310 315 326" fill="none" stroke="#5473C6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity={loop}/>
      </svg>
      <div style={{...box(0, 48, 1920), textAlign: 'center', fontFamily: 'PapanPoppins',
        fontWeight: 800, fontSize: 112, lineHeight: 1.1, letterSpacing: -5}}>koordinasi</div>
      <Bubble x={355} y={246} width={1125} height={170} start={4} sender="Codex">
        doctor.sh gagal: 8 skill berupa salinan, bukan symlink. Boleh menjalankan --fix?
      </Bubble>
      <Bubble x={590} y={501} width={1070} height={170} start={26} sender="Claude 2 (Sutradara)" claude>
        {f < 40 ? <Typing/> : 'Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK.'}
      </Bubble>
      <Bubble x={355} y={754} width={1125} height={112} start={48} sender="Codex" blue>
        {f < 60 ? <Typing/> : 'Revisi kamera selesai; lima still tersedia.'}
      </Bubble>
      <div data-chat-bubble="Sistem" style={{...box(775, 910, 810, 82), opacity: system,
        transform: `translateY(${24 * (1 - system)}px) scale(${.94 + .06 * system})`, transformOrigin: '0 100%'}}>
        <div style={{...box(24, -31), fontSize: 22, color: '#536581'}}>Sistem</div>
        <div style={{position: 'relative', height: '100%', display: 'flex', alignItems: 'center', padding: '0 30px',
          boxSizing: 'border-box', background: '#FFFFFF', borderRadius: 30, boxShadow: elevation, fontSize: 31, color: '#354665'}}>
          {f < 89 ? <Typing/> : <span style={{opacity: record}}>Dicatat: … supaya tidak terulang</span>}
        </div>
        <div style={{...box(748, 58, 61, 48), background: 'white', borderRadius: 22, display: 'flex',
          justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(40,71,122,.12)', opacity: loop}}>
          <Check size={35}/>
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>;
};
