// Tampilan WhatsApp (iOS) dibangun ulang per elemen: status bar, header, wallpaper, bubble + ekor, centang, composer.
import React from 'react';
import { ChevronLeft, Video, Phone, Plus, Camera, Mic, CheckCheck, SendHorizontal } from 'lucide-react';
import { Logo } from './common';

export type Msg = { id: string; side: 'in' | 'out'; time: string; a: number; body: React.ReactNode; w?: number };
const WALL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23d6cdbf' stroke-width='1.6' opacity='.55'%3E%3Ccircle cx='20' cy='22' r='7'/%3E%3Cpath d='M70 15 l10 0 l-5 9z'/%3E%3Crect x='88' y='60' width='14' height='10' rx='3'/%3E%3Cpath d='M18 80 q8 -10 16 0 t16 0'/%3E%3Cpath d='M60 95 l6 6 l10 -12'/%3E%3C/g%3E%3C/svg%3E")`;

export function Bubble({ m }: { m: Msg }) {
  const out = m.side === 'out';
  const a = Math.max(0, Math.min(1, m.a));
  return (
    <div style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start', padding: '0 14px', marginTop: 6, opacity: Math.min(1, a * 1.6),
      transform: `translateY(${(1 - a) * 22}px) scale(${0.86 + 0.14 * a})`, transformOrigin: out ? '100% 100%' : '0% 100%' }}>
      <div style={{ position: 'relative', maxWidth: m.w ?? 300, background: out ? '#D9FDD3' : '#fff', borderRadius: 16, borderBottomRightRadius: out ? 4 : 16, borderBottomLeftRadius: out ? 16 : 4,
        padding: '8px 11px 6px', boxShadow: '0 1px 1px rgba(11,20,26,.13)', fontSize: 17, lineHeight: 1.32, color: '#111B21' }}>
        {m.body}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3, fontSize: 11.5, color: '#667781', marginTop: 2 }}>
          {m.time}{out && <CheckCheck size={15} color="#53BDEB" />}
        </div>
      </div>
    </div>
  );
}

export function WAPhone({ msgs, typed = '', caret = false, clock = '09.41', scrollY = 0, sendPress = 0, children }: {
  msgs: Msg[]; typed?: string; caret?: boolean; clock?: string; scrollY?: number; sendPress?: number; children?: React.ReactNode;
}) {
  return (
    <div style={{ width: 430, height: 880, borderRadius: 58, background: '#0E0F12', padding: 12, boxShadow: '0 50px 90px rgba(30,50,110,.28), 0 10px 24px rgba(30,50,110,.16)' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 46, overflow: 'hidden', background: '#EFEAE2', fontFamily: '"Plus Jakarta Sans", system-ui' }}>
        {/* status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, background: '#F6F6F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 30px 0', fontWeight: 700, fontSize: 16, zIndex: 3 }}>
          <span className="tabular">{clock}</span>
          <div style={{ position: 'absolute', left: '50%', top: 10, width: 120, height: 32, marginLeft: -60, borderRadius: 20, background: '#0E0F12' }} />
          <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>{[5, 8, 11, 14].map((h) => <i key={h} style={{ width: 3.5, height: h, background: '#111', borderRadius: 1 }} />)}</span>
            <span style={{ width: 26, height: 13, border: '1.6px solid #111', borderRadius: 4, padding: 1.5 }}><i style={{ display: 'block', width: '78%', height: '100%', background: '#111', borderRadius: 2 }} /></span>
          </span>
        </div>
        {/* header */}
        <div style={{ position: 'absolute', top: 50, left: 0, right: 0, height: 64, background: '#F6F6F6', borderBottom: '1px solid #DDD', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', zIndex: 3 }}>
          <ChevronLeft size={28} color="#007AFF" />
          <div style={{ width: 40, height: 40, borderRadius: 99, background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontFamily: 'Poppins' }}>J<span style={{ color: '#F97066' }}>.</span></div>
          <div style={{ flex: 1, lineHeight: 1.15 }}>
            <div style={{ fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', gap: 4 }}>Jadisatu
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#25D366" d="M12 1l2.6 2.1 3.3-.4 1.1 3.2 3 1.6-.9 3.2.9 3.2-3 1.6-1.1 3.2-3.3-.4L12 23l-2.6-2.1-3.3.4-1.1-3.2-3-1.6.9-3.2-.9-3.2 3-1.6 1.1-3.2 3.3.4z" /><path d="M7.5 12.3l3 3 6-6.3" stroke="#fff" strokeWidth="2.2" fill="none" /></svg>
            </div>
            <div style={{ fontSize: 12.5, color: '#667781' }}>Akun Bisnis</div>
          </div>
          <Video size={24} color="#007AFF" /><Phone size={21} color="#007AFF" style={{ marginLeft: 14 }} />
        </div>
        {/* thread */}
        <div style={{ position: 'absolute', top: 114, bottom: 84, left: 0, right: 0, backgroundImage: WALL, backgroundColor: '#EFEAE2', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 10 - scrollY }}>
            {msgs.filter((m) => m.a > 0).map((m) => <Bubble key={m.id} m={m} />)}
          </div>
        </div>
        {/* composer */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 84, background: '#F6F6F6', borderTop: '1px solid #DDD', display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px' }}>
          <Plus size={28} color="#007AFF" style={{ marginTop: 5 }} />
          <div style={{ flex: 1, minHeight: 38, borderRadius: 20, background: '#fff', border: '1px solid #DDD', padding: '7px 14px', fontSize: 17, color: typed ? '#111B21' : '#999', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {typed}{caret && <span style={{ display: 'inline-block', width: 2, height: 20, background: '#007AFF', verticalAlign: 'middle', marginLeft: 1 }} />}
          </div>
          {typed ? (
            <div style={{ width: 38, height: 38, borderRadius: 99, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - 0.15 * sendPress})` }}><SendHorizontal size={20} color="#fff" /></div>
          ) : (<><Camera size={25} color="#007AFF" style={{ marginTop: 6 }} /><Mic size={25} color="#007AFF" style={{ marginTop: 6 }} /></>)}
        </div>
        {children}
      </div>
    </div>
  );
}
