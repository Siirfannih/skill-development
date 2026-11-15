import React from 'react';
import { Easing, interpolate, staticFile } from 'remotion';

// v6: tiga komponen gaya baru (Irfan 13 Nov, ref tujuhlangit): label bab statis pojok kanan atas,
// penanda "player tag" di atas kepala, kata penekanan raksasa dua warna (oranye logo -> putih) yang bisa tertutup badan.
export const ORANGE = '#F7922E';
export const FONT_FACE = `@font-face{font-family:'SFDisplay';src:url('${staticFile('fonts/SFPRODISPLAYBOLD.OTF')}') format('opentype');font-weight:700;}
@font-face{font-family:'SFDisplay';src:url('${staticFile('fonts/SFPRODISPLAYMEDIUM.OTF')}') format('opentype');font-weight:500;}`;

const ease = (t: number) => interpolate(t, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

// Label bab ala Netflix: garis oranye vertikal + dua baris teks, statis; hanya fade masuk/keluar.
export const ChapterBar: React.FC<{ t: number; dur: number; kicker?: string; title: string }> = ({ t, dur, kicker, title }) => {
  const o = Math.min(ease(t / 0.35), 1 - ease((t - (dur - 0.3)) / 0.3));
  return (
    <div style={{ position: 'absolute', top: 58, right: 64, display: 'flex', alignItems: 'stretch', gap: 16, opacity: o,
      fontFamily: 'SFDisplay', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.5), 0 2px 12px rgba(0,0,0,.45)' }}>
      <div style={{ width: 6, background: ORANGE, borderRadius: 2, boxShadow: '0 1px 6px rgba(0,0,0,.35)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        {kicker && <div style={{ fontWeight: 500, fontSize: 22, letterSpacing: '0.12em', opacity: 0.85 }}>{kicker}</div>}
        <div style={{ fontWeight: 700, fontSize: 36, letterSpacing: '0.02em' }}>{title}</div>
      </div>
    </div>
  );
};

// Penanda pemain (game): pil + segitiga penunjuk, melayang di atas kepala (hx, hy, r dari pelacak kepala).
// Bila ruang di atas kepala tidak cukup (close-up), pindah ke sisi kepala yang berseberangan dengan frasa, penunjuk ke arah kepala.
export const PlayerTag: React.FC<{ t: number; dur: number; head: number[]; label: string; sub?: string; side?: string; pos?: number[] }> = ({ t, dur, head, label, sub, side, pos }) => {
  const [hx, hy, r] = head;
  const p = ease(t / 0.3), q = 1 - ease((t - (dur - 0.25)) / 0.25);
  const bob = Math.sin(t * 2.4) * 4;
  const TAGH = 92, TAGW = 22 * label.length + 60;
  let x = hx, y = hy - r * 1.45 - 26 + bob, mode: 'top' | 'side' = 'top';
  if (y - TAGH < 70) {                                                  // tidak ada ruang di atas kepala
    mode = 'side'; const goLeft = side === 'R';
    x = goLeft ? hx - r * 1.3 - 40 - TAGW / 2 : hx + r * 1.3 + 40 + TAGW / 2; y = hy - r * 0.55 + bob;
  }
  x = Math.min(Math.max(x, 96 + TAGW / 2), 1920 - 96 - TAGW / 2);
  if (mode === 'top' && x + TAGW / 2 > 1380 && y - TAGH < 170) y = 170 + TAGH;   // jangan menabrak label bab
  if (pos) { x = pos[0]; y = pos[1]; mode = 'side'; }                     // v8g: posisi statis per adegan (tanpa bob, tanpa penunjuk)
  const pointer = mode === 'top'
    ? <div style={{ width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderTop: `13px solid ${ORANGE}`, marginTop: -1 }} />
    : null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -100%) scale(${0.85 + 0.15 * p})`,
      transformOrigin: '50% 100%', opacity: p * q, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'SFDisplay' }}>
      <div style={{ background: 'rgba(12,18,52,0.82)', border: `2px solid ${ORANGE}`, borderRadius: 999, padding: '8px 22px 9px',
        color: '#fff', whiteSpace: 'nowrap', textAlign: 'center', boxShadow: '0 4px 18px rgba(0,0,0,.35)' }}>
        {sub && <div style={{ fontWeight: 500, fontSize: 18, letterSpacing: '0.08em', color: ORANGE, lineHeight: 1.1 }}>{sub}</div>}
        <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15 }}>{label}</div>
      </div>
      {pointer}
    </div>
  );
};

// Kata penekanan: tampil SENDIRIAN (frasa kecil sudah hilang), warna padat (oranye logo / putih sesuai kontras latar),
// masuk pegas berat tanpa overshoot + blur gerak singkat (typography.md 7.5 G3, guide/teks "dua blok berbobot sama? pilih satu").
export const BigWord: React.FC<{ t: number; dur: number; text: string; x: number; y: number; size?: number; color?: string }> = ({ t, dur, text, x, y, size = 180, color = '#FFFFFF' }) => {
  const p = ease(t / 0.3), q = 1 - ease((t - (dur - 0.2)) / 0.2);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) translateY(${(1 - p) * 40}px)`,
      opacity: p * q, filter: `blur(${(1 - p) * 8 + (1 - q) * 6}px)`, fontFamily: 'SFDisplay', fontWeight: 700, fontSize: size, lineHeight: 1,
      letterSpacing: '-0.025em', whiteSpace: 'nowrap', color,
      textShadow: '0 2px 4px rgba(0,0,0,0.35), 0 8px 40px rgba(0,0,0,0.45)' }}>
      {text}
    </div>
  );
};
