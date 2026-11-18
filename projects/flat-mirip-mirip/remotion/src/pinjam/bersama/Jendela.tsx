// Jendela — bingkai macOS (MG63-ADENDUM §1): radius ±16 px, tiga titik lampu kiri, bayangan lembut tiga lapis (blur 40–60 px, offset-y ±10 px,
// opasitas .25–.35), tanpa stroke tebal. Arah cahaya sama di semua dunia: dari atas sedikit kiri.
import React from 'react';

export const BAYANG_JENDELA = '0 3px 8px rgba(20,30,60,.10), 0 14px 30px rgba(20,30,60,.16), 6px 44px 60px rgba(20,30,60,.30)';

export const Titik: React.FC<{gap?: number; d?: number}> = ({gap = 8, d = 12}) => (
  <div style={{display: 'flex', gap}}>{['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{width: d, height: d, borderRadius: d / 2, background: c}}/>)}</div>
);

export const Jendela: React.FC<{x: number; y: number; w: number; h: number; judul?: React.ReactNode; bar?: string; style?: React.CSSProperties; children: React.ReactNode}> = ({x, y, w, h, judul, bar = '#F4F4F1', style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 16, background: '#FFFFFF', boxShadow: BAYANG_JENDELA, overflow: 'hidden', ...style}}>
    <div style={{height: 28, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 14, background: bar}}><Titik/>{judul}</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 28, bottom: 0}}>{children}</div>
  </div>
);
