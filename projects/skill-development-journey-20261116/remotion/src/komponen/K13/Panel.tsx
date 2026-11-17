import React from 'react';
import {move} from '../../lib/curves';
import {SimpulOpenAI} from '../PixelTokoh2D';
import {ketik, masuk} from './gerak';

const ink = '#1F2328';
const muted = '#6B6F76';
const panel: React.CSSProperties = {position: 'absolute', top: 110, height: 468,
  background: '#FFFFFF', border: '1.5px solid #E4E2DA', borderRadius: 18, padding: 34,
  boxSizing: 'border-box', color: ink, fontFamily: 'K13Inter', fontSize: 26, lineHeight: 1.48};

const Tool: React.FC<{f: number; at: number; children: React.ReactNode}> = ({f, at, children}) =>
  <div style={{...masuk(f, at), color: muted, fontSize: 23, marginTop: 17}}>{children} <span style={{marginLeft: 7}}>›</span></div>;

export const PanelClaude: React.FC<{f: number; at: number; fps: number}> = ({f, at, fps}) => {
  const elapsed = 57 + Math.max(0, Math.floor((f - at - 46) / fps));
  return <div style={{...panel, left: 104, width: 815, ...masuk(f, at + 2)}}>
    <div style={{minHeight: 145}}>
      {ketik('Ada Codex kedua untuk maskot', f, at + 8, 14)}{' '}
      <code style={{fontFamily: 'K13Mono', fontSize: 23, background: '#F1F0EC', borderRadius: 5,
        padding: '3px 7px', opacity: move(f, at + 21, 7, 'reveal')}}>(TASK-K12-r1)</code>{' '}
      {ketik('yang ditulis atas nama "Sutradara claude1". Saya telusuri asal prosesnya.', f, at + 23, 23)}
    </div>
    <Tool f={f} at={at + 28}>Ran 2 commands</Tool>
    <Tool f={f} at={at + 40}>Traced parent processes of the second mascot Codex</Tool>
    <Tool f={f} at={at + 52}>Kill orphan codex, look for chat-bubble/character references <span style={{marginLeft: 14}}>Blocked</span></Tool>
    <div style={{...masuk(f, at + 64), display: 'flex', gap: 13, alignItems: 'center', marginTop: 22, color: muted, fontSize: 23}}>
      <span style={{display: 'flex', gap: 4, flexShrink: 0}}>
        {[0, 5, 11].map((offset) => {
          const phase = Math.max(0, f - at - 64 - offset) % 30;
          const p = move(phase, 0, 10, 'heavy') - move(phase, 14, 16, 'leave');
          return <span key={offset} style={{width: 6, height: 6, borderRadius: '50%', background: '#D97757',
            opacity: .35 + .65 * p, transform: `translateY(${-3 * p}px)`}} />;
        })}
      </span>
      <span>Finding where the orphan Codex logs <span style={{fontVariantNumeric: 'tabular-nums'}}>{elapsed}s</span> ›</span>
    </div>
  </div>;
};

export const PanelChatGPT: React.FC<{f: number; at: number}> = ({f, at}) => {
  const shimmer = move(Math.max(0, f - at - 28) % 72, 0, 72, 'drift');
  return <div style={{...panel, left: 971, width: 845, ...masuk(f, at)}}>
    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, color: muted, fontSize: 23}}>
      <SimpulOpenAI size={25} />Sent by ChatGPT from another chat
    </div>
    <div style={{...masuk(f, at + 6), background: '#0D0D0D', color: '#FFFFFF', borderRadius: 30,
      padding: '23px 27px', marginTop: 14, fontSize: 27, lineHeight: 1.5}}>
      Koordinasi ruang PC sesuai instruksi Irfan agar sesi aktif aman. Saya mengerjakan Builder Trap v6, QA sudah lengkap…
      <div style={{marginTop: 12}}>Show more ⌄</div>
    </div>
    <div style={{...masuk(f, at + 19), marginTop: 27}}>Sisa pengujian dan cache paket yang tidak terpakai mulai dibersihkan.</div>
    <div style={{...masuk(f, at + 28), marginTop: 19, color: 'transparent',
      backgroundImage: 'linear-gradient(100deg, #6B6F76 30%, #34383D 48%, #6B6F76 64%)',
      backgroundSize: '230% 100%', backgroundPosition: `${140 - 180 * shimmer}% 0`, backgroundClip: 'text'}}>
      Checking pnpm store hardlinks
    </div>
  </div>;
};
