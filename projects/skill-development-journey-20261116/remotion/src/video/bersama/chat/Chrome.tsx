import React from 'react';
import {Karakter2D} from '../../../papan/karakter2d/Karakter2D';
import {HURUF, MEREK, NETRAL, RADIUS} from '../tema';
import {Titik} from '../Jendela';
import {Caret, Check, Spinner} from './Conversation';
import {move} from '../../../lib/curves';

export const CHAT_WINDOW = {x: 180, y: 100, width: 1560, height: 880};
export const CHAT_VIEW = {left: 96, top: 90, width: 1368, height: 548};
const label: React.CSSProperties = {fontFamily: HURUF.keluarga.ui, fontSize: HURUF.ukuran.label, fontWeight: 500, color: NETRAL.redup};

export const ChatInput: React.FC<{frame: number; draft?: string; klik?: number}> = ({frame, draft, klik = -1}) => (
  <div style={{position: 'absolute', left: 96, right: 96, bottom: 36, height: 112, borderRadius: RADIUS.input,
    background: NETRAL.input, border: `1px solid ${NETRAL.garis}`, boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: 26, top: 19, fontFamily: HURUF.keluarga.ui, fontSize: HURUF.ukuran.uiKecil,
      color: draft && frame < klik ? NETRAL.teks : NETRAL.redup}}>{draft && frame < klik ? draft : 'Reply to Claude…'}<Caret frame={frame}/></div>
    <div style={{position: 'absolute', bottom: 18, left: 24, width: 26, height: 26}}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={NETRAL.teks} strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
    </div>
    <div style={{position: 'absolute', right: 84, bottom: 21, display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: HURUF.keluarga.ui, fontSize: HURUF.ukuran.uiKecil, color: NETRAL.teks}}>
      <span>Opus 5.5</span><span style={{color: NETRAL.redup}}>· Medium</span>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={NETRAL.redup} strokeWidth="1.5"><path d="m4 6 4 4 4-4"/></svg>
    </div>
    <div style={{position: 'absolute', right: 18, bottom: 14, width: 44, height: 44, borderRadius: 12,
      background: MEREK.primer, transform: `scale(${frame >= klik && frame < klik + 4 ? 0.9 : 1})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={NETRAL.teks} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </div>
  </div>
);

export const Working: React.FC<{frame: number; fps: number; phase: string; doneAt: number}> = ({frame, fps, phase, doneAt}) => {
  const t = frame / fps;
  const done = t >= doneAt;
  const timer = Math.floor(Math.min(t, doneAt));
  return <div data-working-row style={{position: 'absolute', left: 96, right: 96, top: 658, height: 66,
    display: 'flex', alignItems: 'center', gap: 12}}>
    <div style={{position: 'relative', width: 92, height: 66, flexShrink: 0}}>
      <Karakter2D model="claude" id="d-clawd" x={42} y={62} u={6.2} t={t} seed={1} sudut={done ? 'front' : 'q'} lantai={false}
        emosi={[[0, 'thinking'], [doneAt, 'happy']]} emote={[[999, 'centang']]}
        ekstra={{dy: done ? -0.12 * Math.sin(t * 6) : -0.22 * Math.abs(Math.sin(t * 14)),
          sq: done ? 0 : 0.1 * Math.sin(t * 14), rot: done ? 0 : 0.025 * Math.sin(t * 14)}}/>
    </div>
    {done ? <Check/> : <Spinner frame={frame}/>}
    <span style={{fontFamily: HURUF.keluarga.ui, fontSize: HURUF.ukuran.uiKecil, color: NETRAL.redup}}>{phase}</span>
    <span style={{...label, marginLeft: 'auto', fontVariantNumeric: 'tabular-nums'}}>{`0:${String(timer).padStart(2, '0')}`}</span>
  </div>;
};

export const ChatCursor: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <svg width="34" height="44" viewBox="0 0 46 60" style={{position: 'absolute', left: x, top: y, pointerEvents: 'none', transform: `scale(${s})`, transformOrigin: '4px 3px'}}>
    <path d="M4 3L4 46L15 36L22 53L30 49L23 33L38 33Z" fill={NETRAL.teks} stroke={NETRAL.hitam} strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

// Kursor diam di sudut kanan bawah; bila `klik` diberikan, kursor turun ke tombol kirim, menekan di frame `klik`,
// lalu kembali (pemicu gelombang grid, D-449).
const KURSOR_DIAM = {x: CHAT_WINDOW.width - 140, y: CHAT_WINDOW.height - 178};
export const TOMBOL_KIRIM = {x: CHAT_WINDOW.width - 96 - 18 - 22, y: CHAT_WINDOW.height - 36 - 14 - 22};
const kursor = (f: number, klik: number) => {
  if (klik < 0) return {...KURSOR_DIAM, s: 1};
  const tuju = {x: TOMBOL_KIRIM.x - 4, y: TOMBOL_KIRIM.y - 4};
  const k = f < klik ? move(f, 0, klik, 'heavy') : 1 - move(f, klik + 4, 14, 'leave');
  return {x: KURSOR_DIAM.x + (tuju.x - KURSOR_DIAM.x) * k, y: KURSOR_DIAM.y + (tuju.y - KURSOR_DIAM.y) * k,
    s: f >= klik && f < klik + 4 ? 0.86 : 1};
};

export const SessionWindow: React.FC<{children: React.ReactNode; frame: number; fps: number; phase: string; doneAt: number;
  klik?: number; draft?: string}> = ({children, frame, fps, phase, doneAt, klik = -1, draft}) => (
  <div data-session-window style={{position: 'absolute', left: CHAT_WINDOW.x, top: CHAT_WINDOW.y,
    width: CHAT_WINDOW.width, height: CHAT_WINDOW.height, borderRadius: 18, background: NETRAL.panel,
    border: `1px solid ${NETRAL.garis}`, boxSizing: 'border-box', overflow: 'hidden', fontFamily: HURUF.keluarga.ui}}>
    <div style={{height: 56, borderBottom: `1px solid ${NETRAL.garis}`, display: 'flex', alignItems: 'center', padding: '0 22px'}}>
      <Titik/>
      <span style={{...label, margin: '0 auto', paddingRight: 48, color: NETRAL.teks}}>skill-development · Revisi video siirfan</span>
    </div>
    <div data-transcript-viewport style={{position: 'absolute', ...CHAT_VIEW, overflow: 'hidden'}}>{children}</div>
    <Working frame={frame} fps={fps} phase={phase} doneAt={doneAt}/>
    <ChatInput frame={frame} draft={draft} klik={klik}/>
    <ChatCursor {...kursor(frame, klik)}/>
  </div>
);
