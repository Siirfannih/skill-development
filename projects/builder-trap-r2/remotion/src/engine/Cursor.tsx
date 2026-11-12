// Kursor panah macOS besar. Posisi (x,y) = ujung panah. click 0..1 = tekan (skala 100→85→100).
import React from 'react';

export const Cursor: React.FC<{ x: number; y: number; size?: number; click?: number; rot?: number; opacity?: number }> = ({
  x, y, size = 64, click = 0, rot = 0, opacity = 1,
}) => {
  const s = 1 - 0.15 * Math.sin(Math.PI * Math.min(1, Math.max(0, click)));
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: '0 0', opacity }}>
      <svg viewBox="0 0 28 28" width={size} height={size} style={{ position: 'absolute', left: -size * 0.1, top: -size * 0.05, overflow: 'visible', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.3))' }}>
        {/* bentuk panah macOS: isi hitam, garis putih */}
        <path d="M3.2 1.6 L3.2 22.4 L8.1 17.8 L11.3 25.2 L14.9 23.7 L11.8 16.4 L18.6 16.4 Z" fill="#111" stroke="#fff" strokeWidth={1.7} strokeLinejoin="round" />
      </svg>
    </div>
  );
};
