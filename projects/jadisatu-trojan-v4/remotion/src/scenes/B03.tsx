// Beat 3 · Semua orang: carousel tiga kartu (lapak, titip jualan, toko) ala 09; semua berakhir dengan buku yang sama, lalu tidak dicatat.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { beat, wf } from '../lib/time';
import { clamp, EASE, eo, pop } from '../lib/anim';
import { Emoji, MBlur } from '../ui/common';

const CARDS = [
  { n: 'shopping_cart', label: 'kecil-kecilan' },
  { n: 'package', label: 'jualan' },
  { n: 'convenience_store', label: 'toko' },
];
export const B03: React.FC = () => {
  const f = useCurrentFrame();
  const { s } = beat('b03'); const e = beat('b04').s;
  if (f < s - 9 || f > e + 6) return null;
  const tJual = wf('b03', 'jualan'), tAtau = wf('b03', 'atau'), tToko = wf('b03', 'toko'), tMas = wf('b03', 'masalahnya'), tNg = wf('b03', 'nggak'), tDic = wf('b03', 'dicatat');
  // masuk dari bawah (lanjutan tarikan ke atas di beat 2)
  const yin = interpolate(f, [s - 8, s + 1], [1300, 0], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const vy = Math.abs(interpolate(f + 0.5, [s - 8, s + 1], [1300, 0], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) }) - yin) * 0.35;
  // kamera: geser kiri→kanan, lalu mundur melihat ketiganya
  const GAP = 600;
  const camX = (x: number) => interpolate(x, [s, tAtau - 4, tAtau + 6, tToko - 2, tToko + 8, tMas - 2, tMas + 12], [0, 0, GAP, GAP, 2 * GAP, 2 * GAP, GAP], { ...clamp, easing: EASE });
  const cx = camX(f); const vx = Math.abs(camX(f + 0.5) - camX(f - 0.5)) * 0.5;
  const zoom = interpolate(f, [tMas - 2, tMas + 12], [1, 0.88], { ...clamp, easing: EASE });
  // keluar: push-through ke buku tengah
  const push = interpolate(f, [e - 9, e + 4], [1, 9], { ...clamp, easing: (t) => t * t * t });
  const pushBlur = interpolate(f, [e - 6, e + 4], [0, 14], clamp);
  return (
    <AbsoluteFill style={{ opacity: f >= e ? 0 : 1 }}>
      <MBlur x={vx} y={vy + pushBlur} style={{ position: 'absolute', inset: 0, transform: `translateY(${yin}px) scale(${push})`, transformOrigin: '960px 560px' }}>
        <div style={{ position: 'absolute', left: 960, top: 560, transform: `scale(${zoom}) translateX(${-cx}px)` }}>
          {CARDS.map((c, i) => {
            const tIn = [s - 6, tAtau - 4, tToko - 4][i];
            const p = pop(f, tIn, 30, 16, 170);
            const focus = Math.max(0, 1 - Math.abs(cx - i * GAP) / GAP);
            const bookT = tMas + 2 + i * 5; const bp = pop(f, bookT);
            const xp = pop(f, tDic - 2 + i * 3, 30, 12, 220);
            const dim = eo(f, tNg, 10);
            return (
              <div key={i} style={{ position: 'absolute', left: i * GAP - 230, top: -280, width: 460, transform: `scale(${(0.9 + 0.1 * Math.max(focus, zoom < 0.95 ? 1 : 0)) * p})`, opacity: Math.min(1, p) }}>
                <div className="card" style={{ padding: 18, borderRadius: 28, boxShadow: '0 40px 80px rgba(30,50,110,.14)' }}>
                  <div style={{ height: 380, borderRadius: 20, background: 'linear-gradient(180deg,#F4F7FD,#E8EEFA)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ opacity: 1 - 0.35 * dim }}><Emoji n={c.n} size={230} /></div>
                    {/* buku yang sama di tiap kartu */}
                    <div style={{ position: 'absolute', right: 22, bottom: 18, transform: `scale(${bp}) rotate(${-8 + i * 6}deg)` }}>
                      <Emoji n="ledger" size={110} />
                      <div style={{ position: 'absolute', right: -14, top: -14, transform: `scale(${xp})` }}><Emoji n="cross_mark" size={56} /></div>
                    </div>
                  </div>
                  <div style={{ padding: '18px 8px 6px', fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em' }}>{c.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </MBlur>
    </AbsoluteFill>
  );
};
