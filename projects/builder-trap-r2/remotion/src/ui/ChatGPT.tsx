// ChatGPT web terang dibangun ulang dari acuan assets/ref_ui/chatgpt.png (2000 px → desain 1600×1000, skala 0,8).
// Ikon: lucide (ikon jadi). Logo: OpenAI asli (engine/Logo).
import React from 'react';
import { SquarePen, Search, Images, PanelLeft, ChevronDown, Plus, Mic, AudioLines, ArrowUp, Telescope } from 'lucide-react';
import { FONT, rand } from '../engine/theme';
import { Logo } from '../engine/Logo';

export const GPT_W = 1600;
export const GPT_H = 1000;
export const GPT_SIDEBAR = 259;
/** pusat kotak prompt (px desain) */
export const GPT_PROMPT = { x: GPT_SIDEBAR + (GPT_W - GPT_SIDEBAR) / 2, y: 500, w: 768, h: 54 };

const ink = '#0D0D0D';
const sub = '#5D5D5D';

const Item: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 11, height: 36, padding: '0 10px', margin: '0 8px', borderRadius: 9, background: active ? '#ECECEC' : undefined, fontSize: 15, color: ink }}>
    {icon}
    <span>{label}</span>
  </div>
);

export const ChatGPTUI: React.FC<{
  /** jumlah baris riwayat di bagian "Chats" (teks abu tak terbaca) */
  history?: number;
  /** item tambahan di bawah "New chat" (mis. ['Dot']) */
  extra?: string[];
  activeExtra?: number;
  /** teks yang sudah diketik di prompt */
  typed?: string;
  caret?: boolean;
  /** 0..1 tombol kirim ditekan */
  send?: number;
  /** logo OpenAI tampil di kepala sidebar (setelah dicap) */
  headerLogo?: number;
}> = ({ history = 0, extra = [], activeExtra, typed = '', caret = false, send = 0, headerLogo = 0 }) => {
  const ic = { size: 19, strokeWidth: 1.7, color: ink };
  const rows = [];
  for (let k = 0; k < history; k++) {
    const w = 110 + rand(k * 3.1 + 7) * 105;
    rows.push(<div key={k} style={{ height: 34, display: 'flex', alignItems: 'center', padding: '0 18px' }}><div style={{ width: w, height: 11, borderRadius: 6, background: '#D6D6D6' }} /></div>);
  }
  const hasText = typed.length > 0;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: GPT_W, height: GPT_H, background: '#FFFFFF', fontFamily: FONT.inter, color: ink }}>
      {/* sidebar */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: GPT_SIDEBAR, height: GPT_H, background: '#F9F9F9', borderRight: '1px solid #E6E6E6', overflow: 'hidden' }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 6 }}>
          {headerLogo > 0 ? (
            <div style={{ width: 22 * headerLogo, overflow: 'hidden', display: 'flex' }}>
              <Logo name="openai" size={22} color={ink} />
            </div>
          ) : null}
          <span style={{ fontWeight: 600, fontSize: 18, marginLeft: headerLogo > 0 ? 6 : 0 }}>ChatGPT</span>
          <ChevronDown size={16} strokeWidth={2} color={sub} />
          <div style={{ flex: 1 }} />
          <PanelLeft size={20} strokeWidth={1.6} color={sub} />
        </div>
        <div style={{ height: 10 }} />
        <Item icon={<SquarePen {...ic} />} label="New chat" />
        {extra.map((e, k) => (
          <Item key={e} active={activeExtra === k} label={e} icon={<div style={{ width: 19, height: 19, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 9, height: 9, borderRadius: 5, background: ink }} /></div>} />
        ))}
        <Item icon={<Search {...ic} />} label="Search chats" />
        <Item icon={<Images {...ic} />} label="Images" />
        <Item icon={<Telescope {...ic} />} label="Deep research" />
        <div style={{ padding: '22px 18px 6px', fontSize: 14, color: '#8F8F8F' }}>Chats</div>
        {rows}
      </div>
      {/* utama */}
      <div style={{ position: 'absolute', left: GPT_SIDEBAR, top: 0, right: 0, height: GPT_H }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', fontSize: 30, lineHeight: '36px', fontWeight: 400, letterSpacing: '-0.01em' }}>
          Where should
          <br />
          we begin?
        </div>
        <div
          style={{
            position: 'absolute', left: (GPT_W - GPT_SIDEBAR) / 2 - GPT_PROMPT.w / 2, top: GPT_PROMPT.y - GPT_PROMPT.h / 2, width: GPT_PROMPT.w, height: GPT_PROMPT.h,
            borderRadius: 28, border: '1px solid #E3E3E3', background: '#FFFFFF', boxShadow: '0 6px 22px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', padding: '0 12px 0 18px', gap: 14,
          }}
        >
          <Plus size={22} strokeWidth={1.6} color={ink} />
          <div style={{ flex: 1, fontSize: 18, color: hasText ? ink : '#8F8F8F', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {hasText ? typed : 'Ask ChatGPT'}
            {caret ? <span style={{ display: 'inline-block', width: 2, height: 22, background: ink, marginLeft: 2, verticalAlign: 'middle' }} /> : null}
          </div>
          <Mic size={21} strokeWidth={1.6} color={ink} />
          <div
            style={{
              width: 38, height: 38, borderRadius: 19, background: hasText ? ink : '#2F6BEF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${1 - 0.14 * Math.sin(Math.PI * Math.min(1, send))})`,
            }}
          >
            {hasText ? <ArrowUp size={20} strokeWidth={2.2} color="#FFF" /> : <AudioLines size={20} strokeWidth={2} color="#FFF" />}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: GPT_PROMPT.y + 44, display: 'flex', justifyContent: 'center' }}>
          <div style={{ border: '1px solid #DADADA', borderRadius: 22, padding: '10px 16px', fontSize: 15, fontWeight: 600 }}>What can you do?</div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontSize: 12, color: sub }}>
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
};
