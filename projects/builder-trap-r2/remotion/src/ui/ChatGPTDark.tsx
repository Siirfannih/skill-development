// ChatGPT web MODE GELAP dibangun ulang untuk B12–B13b (r7; versi terang ui/ChatGPT.tsx tetap dipakai dinding bukti Wall.tsx)
// (r7, TASK-r7 butir 2): konten #212121, sidebar #171717, teks #ECECEC,
// kotak prompt #303030. Desain 1280×692 (rasio jendela ±1,75 seperti jendela editor kartu 63 k7).
// Ikon: lucide (ikon jadi). Logo: OpenAI asli (engine/Logo).
import React from 'react';
import { SquarePen, Search, Images, PanelLeft, ChevronDown, Plus, Mic, AudioLines, ArrowUp, Telescope } from 'lucide-react';
import { FONT, rand } from '../engine/theme';
import { Logo } from '../engine/Logo';

export const GPTD_W = 1280;
export const GPTD_H = 692;
export const GPTD_SIDEBAR = 230;
/** kotak prompt di dalam jendela (px desain): pusat, lebar, tinggi, ukuran teks */
// r7c: teks prompt 22 px desain (= ChatGPT pada zoom browser ±130 %) supaya punch KAMERA ±3,8–4× memberi glyph ≥ 6 % tinggi
// r7d: tata letak keadaan kosong ChatGPT dengan kotak prompt di BAWAH jendela dan judul di tengah area utama, supaya saat
// punch kamera (±3,8×, kotak di tengah tinggi frame) judul keluar frame seluruhnya di atas (tidak ada kata terpotong)
export const GPTD_PROMPT = { x: GPTD_SIDEBAR + (GPTD_W - GPTD_SIDEBAR) / 2, y: 600, w: 700, h: 60, fs: 22 };
/** judul "Where should we begin?" (px desain, atas) */
export const GPTD_HEAD_Y = 270;
/** pusat logo kepala sidebar (px desain) */
export const GPTD_HEAD_LOGO = { x: 18 + 11, y: 26 };

export const GPT_DARK = { main: '#212121', side: '#171717', ink: '#ECECEC', sub: '#AFAFAF', faint: '#8F8F8F', box: '#303030', row: '#2E2E2E', hover: '#262626' };
const D = GPT_DARK;

/** Kotak prompt ChatGPT gelap di dalam jendela (satu-satunya; r7c: tidak ada panel depan, punch = kamera). */
export const GptComposer: React.FC<{
  w: number; h: number; fs: number; typed?: string; caret?: boolean; send?: number; placeholder?: string;
  style?: React.CSSProperties; shadow?: boolean;
}> = ({ w, h, fs, typed = '', caret = false, send = 0, placeholder = 'Ask anything', style, shadow }) => {
  const hasText = typed.length > 0;
  const btn = h * 0.72;
  return (
    <div
      style={{
        width: w, height: h, borderRadius: h / 2, background: D.box, display: 'flex', alignItems: 'center',
        padding: `0 ${h * 0.14}px 0 ${h * 0.3}px`, gap: fs * 0.45, boxSizing: 'border-box', fontFamily: FONT.inter,
        boxShadow: shadow ? `0 ${h * 0.12}px ${h * 0.4}px rgba(0,0,0,0.45), 0 0 0 ${Math.max(1, fs * 0.06)}px rgba(255,255,255,0.08)` : `0 0 0 1px rgba(255,255,255,0.06)`,
        ...style,
      }}
    >
      <Plus size={fs * 1.25} strokeWidth={1.7} color={D.ink} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, fontSize: fs, lineHeight: 1.2, color: hasText ? D.ink : D.sub, whiteSpace: 'nowrap', overflow: 'hidden', letterSpacing: '-0.01em' }}>
        {/* caret: sebelum placeholder saat kosong (seperti ChatGPT), sesudah teks saat mengetik */}
        {caret && !hasText ? <span style={{ display: 'inline-block', width: Math.max(2, fs * 0.08), height: fs * 1.15, background: D.ink, marginRight: fs * 0.04, verticalAlign: 'middle' }} /> : null}
        {hasText ? typed : placeholder}
        {caret && hasText ? <span style={{ display: 'inline-block', width: Math.max(2, fs * 0.08), height: fs * 1.15, background: D.ink, marginLeft: fs * 0.08, verticalAlign: 'middle' }} /> : null}
      </div>
      <Mic size={fs * 1.2} strokeWidth={1.6} color={D.ink} style={{ flexShrink: 0 }} />
      <div
        style={{
          width: btn, height: btn, flexShrink: 0, borderRadius: btn / 2, background: '#ECECEC', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${1 - 0.14 * Math.sin(Math.PI * Math.min(1, send))})`,
        }}
      >
        {hasText ? <ArrowUp size={btn * 0.52} strokeWidth={2.4} color="#0D0D0D" /> : <AudioLines size={btn * 0.5} strokeWidth={2.2} color="#0D0D0D" />}
      </div>
    </div>
  );
};

const Item: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 11, height: 34, padding: '0 10px', margin: '0 8px', borderRadius: 9, background: active ? D.hover : undefined, fontSize: 14, color: D.ink }}>
    {icon}
    <span>{label}</span>
  </div>
);

export const ChatGPTDarkUI: React.FC<{
  /** jumlah baris riwayat di bagian "Chats" (bar abu tak terbaca) */
  history?: number;
  /** teks yang sudah diketik di prompt */
  typed?: string;
  caret?: boolean;
  /** 0..1 tombol kirim ditekan */
  send?: number;
  /** logo OpenAI tampil di kepala sidebar (setelah dicap) */
  headerLogo?: number;
}> = ({ history = 0, typed = '', caret = false, send = 0, headerLogo = 0 }) => {
  const ic = { size: 18, strokeWidth: 1.7, color: D.ink };
  const rows = [];
  for (let k = 0; k < history; k++) {
    const w = 100 + rand(k * 3.1 + 7) * 90;
    rows.push(<div key={k} style={{ height: 32, display: 'flex', alignItems: 'center', padding: '0 18px' }}><div style={{ width: w, height: 10, borderRadius: 5, background: D.row }} /></div>);
  }
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: GPTD_W, height: GPTD_H, background: D.main, fontFamily: FONT.inter, color: D.ink }}>
      {/* sidebar */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: GPTD_SIDEBAR, height: GPTD_H, background: D.side, overflow: 'hidden' }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 6 }}>
          {headerLogo > 0 ? (
            <div style={{ width: 22 * headerLogo, overflow: 'hidden', display: 'flex' }}>
              <Logo name="openai" size={22} color={D.ink} />
            </div>
          ) : null}
          <span style={{ fontWeight: 600, fontSize: 17, marginLeft: headerLogo > 0 ? 6 : 0 }}>ChatGPT</span>
          <div style={{ flex: 1 }} />
          <PanelLeft size={19} strokeWidth={1.6} color={D.sub} />
        </div>
        <div style={{ height: 8 }} />
        <Item icon={<SquarePen {...ic} />} label="New chat" />
        <Item icon={<Search {...ic} />} label="Search chats" />
        <Item icon={<Images {...ic} />} label="Images" />
        <Item icon={<Telescope {...ic} />} label="Deep research" />
        <div style={{ padding: '20px 18px 6px', fontSize: 13, color: D.faint }}>Chats</div>
        {rows}
      </div>
      {/* utama */}
      <div style={{ position: 'absolute', left: GPTD_SIDEBAR, top: 0, right: 0, height: GPTD_H }}>
        <div style={{ position: 'absolute', left: 16, top: 14, display: 'flex', alignItems: 'center', gap: 4, fontSize: 17, fontWeight: 500 }}>
          ChatGPT <ChevronDown size={15} strokeWidth={2} color={D.sub} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: GPTD_HEAD_Y, textAlign: 'center', fontSize: 27, lineHeight: '34px', fontWeight: 400, letterSpacing: '-0.01em' }}>
          Where should we begin?
        </div>
        <div style={{ position: 'absolute', left: (GPTD_W - GPTD_SIDEBAR) / 2 - GPTD_PROMPT.w / 2, top: GPTD_PROMPT.y - GPTD_PROMPT.h / 2 }}>
          <GptComposer w={GPTD_PROMPT.w} h={GPTD_PROMPT.h} fs={GPTD_PROMPT.fs} typed={typed} caret={caret} send={send} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 12, textAlign: 'center', fontSize: 12, color: D.faint }}>
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
};
