// Beat 7 · Gratis: slider harga ala 09 "− Rp … +" digeser ke Rp0 → kartu "Gratis" (aksen hangat satu-satunya). Lapak dari beat 3 kembali (BK10).
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Minus, Plus, Lock } from 'lucide-react';
import { beat, wf } from '../lib/time';
import { clamp, EASE, eo, pop, mix } from '../lib/anim';
import { Cursor, Emoji, MBlur } from '../ui/common';
import { whip } from '../ui/trans';

export const B07: React.FC = () => {
  const f = useCurrentFrame();
  const { s } = beat('b07'); const e = beat('b08').s;
  if (f < s - 9 || f > e + 2) return null;
  const tMul = wf('b07', 'mulai'), tKec = wf('b07', 'kecil'), tCob = wf('b07', 'cobain'), tGra = wf('b07', 'gratis');
  const w = whip(f, s + 1, e + 1, 2000, 9);
  // slider: nilai digeser ke 0
  const slide = interpolate(f, [tCob - 6, tGra - 4], [0, 1], { ...clamp, easing: EASE });
  const vSlide = Math.abs(interpolate(f + 0.5, [tCob - 6, tGra - 4], [0, 1], { ...clamp, easing: EASE }) - slide) * 300;
  const free = pop(f, tGra - 2, 30, 11, 170);
  const cardA = pop(f, s - 2, 30, 16, 180);
  const knobX = mix(560, 0, slide);
  const warm = eo(f, tGra - 2, 8);
  return (
    <AbsoluteFill>
      <MBlur x={w.v * 0.35} style={{ position: 'absolute', inset: 0, transform: `translateX(${w.off}px)` }}>
        {/* lapak kecil (aset sama dengan beat 3) */}
        <div style={{ position: 'absolute', left: 300, top: 330, transform: `scale(${pop(f, tKec - 4)}) rotate(-8deg)` }}><Emoji n="shopping_cart" size={190} /></div>
        <div style={{ position: 'absolute', left: 1450, top: 260, transform: `scale(${pop(f, tMul - 2) * (1 - 0.0 * warm)}) rotate(10deg)` }}><Emoji n={warm > 0.5 ? 'party_popper' : 'sparkles'} size={170} /></div>
        {/* kartu slider */}
        <div style={{ position: 'absolute', left: 960 - 380, top: 240, width: 760, height: 420, borderRadius: 48, transform: `scale(${cardA})`,
          background: warm > 0 ? `linear-gradient(160deg, rgba(255,255,255,${1 - warm}) 0%, rgba(255,255,255,${1 - warm}) 100%), linear-gradient(160deg,#FFB4A8,#F97066)` : '#fff',
          boxShadow: `0 50px 110px ${warm > 0.5 ? 'rgba(249,112,102,.35)' : 'rgba(37,99,235,.22)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {free < 0.5 ? (
            <>
              <div style={{ fontSize: 34, fontWeight: 600, color: '#5B6475' }}>Workspace</div>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 26, background: '#2563EB', borderRadius: 32, padding: '22px 34px', color: '#fff', boxShadow: '0 20px 40px rgba(37,99,235,.35)' }}>
                <Minus size={52} strokeWidth={3} />
                <div style={{ position: 'relative', width: 330, height: 120, overflow: 'hidden' }}>
                  {(() => { const r = interpolate(f, [tGra - 12, tGra - 5], [0, 1], { ...clamp, easing: EASE }); const st: React.CSSProperties = { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 96, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: '120px' }; return (<>
                    <MBlur y={vSlide * 0.12 + r * 6} style={{ ...st, top: -r * 120 }}><span className="tabular">Rp …</span></MBlur>
                    <MBlur y={(1 - r) * 6} style={{ ...st, top: (1 - r) * 120 }}><span className="tabular">Rp0</span></MBlur>
                  </>); })()}
                </div>
                <Plus size={52} strokeWidth={3} />
              </div>
              <div style={{ marginTop: 34, width: 560, height: 10, borderRadius: 9, background: '#E6E8EC', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: knobX, borderRadius: 9, background: '#2563EB' }} />
                <div style={{ position: 'absolute', left: knobX - 20, top: -15, width: 40, height: 40, borderRadius: 99, background: '#fff', boxShadow: '0 4px 12px rgba(15,23,42,.25)' }} />
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', transform: `scale(${free})` }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 30, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,.22)', borderRadius: 99, padding: '8px 20px' }}><Lock size={26} />Rp0</div>
              <div style={{ marginTop: 10, fontSize: 150, fontWeight: 800, letterSpacing: '-0.045em', color: '#fff', textShadow: '0 8px 30px rgba(180,35,24,.25)' }}>Gratis</div>
            </div>
          )}
        </div>
        {f >= tCob - 14 && f < tGra && <Cursor x={960 - 280 + knobX + 4} y={240 + 210 + 128 + 6 + interpolate(f, [tCob - 14, tCob - 6], [120, 0], clamp)} press={f >= tCob - 6 ? 1 : 0} scale={1.6} />}
      </MBlur>
    </AbsoluteFill>
  );
};
