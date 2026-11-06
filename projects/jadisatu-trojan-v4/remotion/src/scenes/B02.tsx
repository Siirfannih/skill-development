// Beat 2 · Realita: orbit ikon ala 09 mengelilingi pill "ribet"; di "nggak cocok" angka catatan vs laci beda warna + bergetar.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { beat, wf } from '../lib/time';
import { clamp, eo, pop, mix } from '../lib/anim';
import { Emoji, MBlur } from '../ui/common';
import { whip } from '../ui/trans';

const Sheet: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.22, background: 'linear-gradient(160deg,#34C77B,#139A55)', boxShadow: '0 18px 24px rgba(30,50,110,.18), inset 0 2px 0 rgba(255,255,255,.35)', display: 'grid', placeItems: 'center' }}>
    <div style={{ width: size * 0.56, height: size * 0.56, borderRadius: 6, background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(4,1fr)', gap: 2, padding: 3 }}>
      {Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ background: i < 3 ? '#B7EBCF' : '#E8F7EF', borderRadius: 1.5 }} />)}
    </div>
  </div>
);
const Drawer: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size * 1.2, height: size * 0.95, position: 'relative' }}>
    <div style={{ position: 'absolute', left: '22%', top: 0, transform: 'rotate(-14deg)' }}><Emoji n="dollar_banknote" size={size * 0.7} /></div>
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: size * 0.55, borderRadius: size * 0.12, background: 'linear-gradient(180deg,#4B5568,#2B3242)', boxShadow: '0 18px 24px rgba(30,50,110,.22), inset 0 2px 0 rgba(255,255,255,.18)' }}>
      <div style={{ position: 'absolute', left: '36%', right: '36%', top: '40%', height: size * 0.07, borderRadius: 9, background: '#9AA3B5' }} />
    </div>
  </div>
);

export const B02: React.FC = () => {
  const f = useCurrentFrame();
  const { s } = beat('b02'); const e = beat('b03').s;
  if (f < s - 9 || f > e + 2) return null;
  const tBuku = wf('b02', 'buku'), tEx = wf('b02', 'Excel'), tLaci = wf('b02', 'laci'), tRib = wf('b02', 'ribet'), tNg = wf('b02', 'nggak'), tCo = wf('b02', 'cocok');
  const w = whip(f, s + 1, 9999);
  // keluar: tarik ke atas (push vertikal ke beat 3)
  const yo = interpolate(f, [e - 8, e + 1], [0, -1300], { ...clamp, easing: (t) => t * t * t });
  const vy = Math.abs(interpolate(f + 0.5, [e - 8, e + 1], [0, -1300], { ...clamp, easing: (t) => t * t * t }) - yo) * 0.35;
  const ang = (f - s) * 0.55; // derajat
  const mism = eo(f, tNg - 3, 10);
  const items = [
    { k: 'buku', t: tBuku, el: (z: number) => <Emoji n="ledger" size={z} />, main: true },
    { k: 'memo', t: s - 4, el: (z: number) => <Emoji n="memo" size={z} /> },
    { k: 'Excel', t: tEx, el: (z: number) => <Sheet size={z * 0.92} />, main: true },
    { k: 'receipt', t: s - 1, el: (z: number) => <Emoji n="receipt" size={z} /> },
    { k: 'laci', t: tLaci, el: (z: number) => <Drawer size={z * 0.92} />, main: true },
    { k: 'abacus', t: s + 5, el: (z: number) => <Emoji n="abacus" size={z} /> },
    { k: 'clip', t: s - 2, el: (z: number) => <Emoji n="clipboard" size={z} /> },
    { k: 'pencil', t: s + 2, el: (z: number) => <Emoji n="pencil" size={z} /> },
  ];
  const shake = f >= tCo && f < tCo + 14 ? Math.sin((f - tCo) * 2.6) * 10 * (1 - (f - tCo) / 14) : 0;
  return (
    <AbsoluteFill>
      <MBlur x={w.v * 0.35} y={vy} style={{ position: 'absolute', inset: 0, transform: `translate(${w.off}px, ${yo}px)` }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 1 - 0.85 * mism, filter: `blur(${mism * 8}px)`, transform: `scale(${1 - 0.08 * mism})` }}>
          {items.map((it, i) => {
            const a = ((i / items.length) * 360 + ang) * Math.PI / 180;
            const x = 960 + Math.cos(a) * 520, y = 470 + Math.sin(a) * 270;
            const depth = (Math.sin(a) + 1) / 2; // depan = bawah
            const p = pop(f, it.t);
            const z = (it.main ? 170 : 104) * (0.82 + 0.3 * depth);
            const blur = it.main ? 0 : (1 - depth) * 2.5;
            return (
              <div key={it.k} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${p})`, zIndex: Math.round(depth * 10), filter: blur > 0.3 ? `blur(${blur}px)` : undefined, textAlign: 'center' }}>
                {it.el(z)}
                {it.main && <div style={{ marginTop: 8, fontSize: 26, fontWeight: 700, color: '#334155', opacity: eo(f, it.t + 2, 8) }}>{it.k}</div>}
              </div>
            );
          })}
          {/* pill pusat */}
          {(() => { const p = pop(f, tRib - 1, 30, 13, 190); return (
            <div style={{ position: 'absolute', left: 960, top: 470, transform: `translate(-50%,-50%) scale(${p})`, background: '#0F172A', color: '#fff', borderRadius: 999, padding: '16px 40px', fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', boxShadow: '0 20px 40px rgba(15,23,42,.25)', zIndex: 5 }}>ribet</div>); })()}
        </div>
        {/* catatan vs laci */}
        {mism > 0 && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 290, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 46, transform: `translateX(${shake}px)` }}>
            {[{ t: 'catatan', v: 'Rp850.000', c: '#2563EB', icon: 'ledger', d: 0 }, null, { t: 'laci', v: 'Rp720.000', c: '#B42318', icon: 'dollar_banknote', d: 3 }].map((c, i) => {
              if (!c) { const p = pop(f, tCo); return <div key={i} style={{ fontSize: 110, fontWeight: 800, color: '#B42318', transform: `scale(${p})` }}>≠</div>; }
              const p = pop(f, tNg - 3 + c.d, 30, 15, 190);
              const glow = eo(f, tCo, 6);
              return (
                <div key={i} className="card" style={{ width: 430, padding: '30px 34px', transform: `scale(${p})`, boxShadow: `0 30px 60px rgba(30,50,110,.16), 0 0 0 ${glow * 4}px ${c.c}22` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, fontWeight: 600, color: '#5B6475' }}><Emoji n={c.icon} size={52} />{c.t}</div>
                  <div className="tabular" style={{ marginTop: 18, fontSize: 64, fontWeight: 800, letterSpacing: '-0.02em', color: mix(0, 1, glow) > 0.5 ? c.c : '#0F172A' }}>{c.v}</div>
                </div>
              );
            })}
          </div>
        )}
      </MBlur>
    </AbsoluteFill>
  );
};
