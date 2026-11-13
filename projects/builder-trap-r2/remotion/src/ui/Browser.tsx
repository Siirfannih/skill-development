// Bingkai jendela browser macOS terang/gelap untuk UI asli yang dibangun ulang (kartu 63: UI sebagai tokoh).
// Ukuran dalam px desain; skala ke dunia lewat prop `scale` (transform), jadi isi tetap tajam saat kamera zoom.
import React from 'react';
import { FONT } from '../engine/theme';

export const BAR_H = 40;

export const Browser: React.FC<{
  w: number; h: number; url: string; dark?: boolean; scale?: number;
  children: React.ReactNode; style?: React.CSSProperties;
}> = ({ w, h, url, dark = false, scale = 1, children, style }) => (
  <div
    style={{
      position: 'absolute', width: w, height: h + BAR_H, transform: `scale(${scale})`, transformOrigin: '0 0',
      borderRadius: 14, overflow: 'hidden', background: dark ? '#101010' : '#FFFFFF',
      boxShadow: '0 40px 80px rgba(40,39,35,0.22), 0 10px 24px rgba(40,39,35,0.14), 0 0 0 1px rgba(40,39,35,0.10)',
      ...style,
    }}
  >
    <div style={{ height: BAR_H, background: dark ? '#1E1E1E' : '#EDEBE8', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, borderBottom: dark ? '1px solid #2A2A2A' : '1px solid #DAD7D2' }}>
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
        <div key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
      ))}
      <div
        style={{
          marginLeft: 90, flex: 1, maxWidth: 520, height: 26, borderRadius: 7, background: dark ? '#2B2B2B' : '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.inter, fontSize: 13, color: dark ? '#C8C8C8' : '#5F5E5A',
        }}
      >
        {url}
      </div>
    </div>
    <div style={{ position: 'relative', width: w, height: h, overflow: 'hidden' }}>{children}</div>
  </div>
);
