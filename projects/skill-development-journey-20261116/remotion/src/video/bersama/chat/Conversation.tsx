import React from 'react';
import {move} from '../../../lib/curves';
import {HURUF, MEREK, NETRAL, PENGECUALIAN, RADIUS} from '../tema';
import {LogoChatGPT} from '../LogoChatGPT';
import {LogoClaude} from '../ui-asli/claude/LogoClaude';

export type ChatItem = {
  id: string;
  type: 'prompt' | 'event' | 'claude' | 'action' | 'terminal' | 'diff';
  at: number;
  until?: number;
  teks: string;
  height: number;
  resultAt?: number;
  result?: string;
};

const textStyle: React.CSSProperties = {
  fontFamily: HURUF.keluarga.ui, fontSize: HURUF.ukuran.ui,
  fontWeight: 500, color: NETRAL.teks, lineHeight: 1.38,
};
const smallStyle: React.CSSProperties = {...textStyle, fontSize: HURUF.ukuran.uiKecil};

export const Check: React.FC<{size?: number}> = ({size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{flexShrink: 0}}>
    <path d="m5 12 4 4L19 6" stroke={PENGECUALIAN.hijauSelesai.warna} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Spinner: React.FC<{frame: number}> = ({frame}) => (
  <svg width="22" height="22" viewBox="0 0 24 24" style={{transform: `rotate(${frame * 13}deg)`, flexShrink: 0}}>
    <circle cx="12" cy="12" r="9" fill="none" stroke={NETRAL.garis} strokeWidth="2.4"/>
    <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke={MEREK.primer} strokeWidth="2.4" strokeLinecap="round"/>
  </svg>
);

export const Caret: React.FC<{frame: number}> = ({frame}) => (
  <span style={{display: 'inline-block', width: 2, height: HURUF.ukuran.uiKecil,
    marginLeft: 4, background: NETRAL.teks, verticalAlign: 'text-bottom',
    visibility: Math.floor(frame / 5) % 2 === 0 ? 'visible' : 'hidden'}}/>
);

export const WordStream: React.FC<{teks: string; frame: number; start: number; end: number}> = ({teks, frame, start, end}) => {
  const words = teks.split(' ');
  const count = Math.max(0, Math.min(words.length, 1 + Math.floor((frame - start) / Math.max(1, end - start) * words.length)));
  return <span data-stream-count={count}>{words.map((word, index) => (
    <span key={index} data-word={index} style={{visibility: index < count ? 'visible' : 'hidden'}}>{word}{index < words.length - 1 ? ' ' : ''}</span>
  ))}</span>;
};

export const ChatRow: React.FC<{item: ChatItem; top: number; scroll: number; frame: number; fps: number}> = ({item, top, scroll, frame, fps}) => {
  const start = Math.round(item.at * fps);
  if (frame < start || top < scroll) return null;
  const end = Math.round((item.until ?? item.at) * fps);
  const done = item.resultAt === undefined || frame >= Math.round(item.resultAt * fps);
  const entering = move(frame, start, 4, 'land');
  let content: React.ReactNode;
  if (item.type === 'prompt') {
    content = <div style={{marginLeft: 'auto', width: 850, padding: '20px 26px', boxSizing: 'border-box',
      borderRadius: RADIUS.bubble, background: NETRAL.input, border: `1px solid ${NETRAL.garis}`, ...textStyle}}>{item.teks}</div>;
  } else if (item.type === 'event') {
    content = <div style={{display: 'flex', alignItems: 'center', gap: 12, ...smallStyle, color: NETRAL.redup}}>
      <LogoChatGPT size={24} warna={NETRAL.redup}/><span>{item.teks}</span>
    </div>;
  } else if (item.type === 'claude') {
    content = <div style={{display: 'flex', alignItems: 'flex-start', gap: 18}}>
      <div style={{paddingTop: 5}}><LogoClaude size={30}/></div>
      <div data-message={item.id} style={{...textStyle, flex: 1, minWidth: 0}}>
        <WordStream teks={item.teks} frame={frame} start={start} end={end}/>
      </div>
    </div>;
  } else if (item.type === 'action') {
    content = <div style={{display: 'flex', alignItems: 'center', gap: 12, marginLeft: 48, ...smallStyle, color: NETRAL.redup}}>
      {done ? <Check size={20}/> : <Spinner frame={frame}/>}
      <span>{item.teks} ›</span>
    </div>;
  } else if (item.type === 'terminal') {
    const typed = item.teks.slice(0, Math.max(0, Math.min(item.teks.length, Math.ceil((frame - start + 1) / Math.max(1, end - start) * item.teks.length))));
    content = <div style={{marginLeft: 48, padding: '14px 22px', borderRadius: RADIUS.kartu,
      background: MEREK.latar, border: `1px solid ${NETRAL.garis}`, ...smallStyle}}>
      <div style={{whiteSpace: 'pre-wrap'}}><span style={{color: NETRAL.redup}}>❯ </span>{typed}{frame < end && <Caret frame={frame}/>}</div>
      <div style={{height: 30, marginTop: 4, display: 'flex', alignItems: 'center', gap: 10}}>
        {done ? <><Check size={20}/><span style={{color: item.result === 'PASS' ? PENGECUALIAN.hijauSelesai.warna : NETRAL.redup,
          fontWeight: item.result === 'PASS' ? 700 : 500}}>{item.result}</span></> : <Caret frame={frame}/>}
      </div>
    </div>;
  } else {
    content = <div style={{marginLeft: 48, padding: '14px 22px', borderRadius: RADIUS.kartu, background: NETRAL.input,
      border: `1px solid ${NETRAL.garis}`, ...smallStyle, fontWeight: 700, color: PENGECUALIAN.hijauSelesai.warna}}>{item.teks}</div>;
  }
  return <div data-chat-row={item.id} data-row-type={item.type} style={{position: 'absolute', top, left: 0, right: 0,
    height: item.height, transform: `translateY(${12 * (1 - entering)}px)`}}>{content}</div>;
};
