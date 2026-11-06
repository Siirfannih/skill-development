// Beat 9 · CTA: komen "workspace" diketik di kolom komentar, lalu dua chip ala 09 "Akses gratis" · "Paket kreatif", kursor memilih bergantian.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Send, MessageCircle } from 'lucide-react';
import { beat, wf, we } from '../lib/time';
import { clamp, EASE, eo, pop, mix } from '../lib/anim';
import { Cursor, Emoji, MBlur } from '../ui/common';
import { whip } from '../ui/trans';

export const B09: React.FC = () => {
  const f = useCurrentFrame();
  const { s } = beat('b09'); const e = beat('b10').s;
  if (f < s - 9 || f > e + 1) return null;
  const tKom = wf('b09', 'komen'), tWs = wf('b09', 'workspace'), tWsE = we('b09', 'workspace'), tAks = wf('b09', 'akses'), tDM = wf('b09', 'DM'), tPak = wf('b09', 'paket');
  const w = whip(f, s + 1, 99999, 2000, 9);
  const out = eo(f, e - 6, 6);
  const word = 'workspace';
  const typed = word.slice(0, Math.round(interpolate(f, [tWs - 2, tWsE], [0, word.length], clamp)));
  const sent = f >= tWsE + 3;
  const chipsA = eo(f, tAks - 8, 10);
  const sel = f < tPak - 2 ? 0 : 1;
  const selX = interpolate(f, [tPak - 6, tPak + 2], [0, 1], { ...clamp, easing: EASE });
  const curX = mix(760, 1160, selX), curY = 590;
  const pressA = f >= tAks && f < tAks + 6 ? 1 : 0, pressB = f >= tPak && f < tPak + 6 ? 1 : 0;
  return (
    <AbsoluteFill style={{ opacity: 1 - out }}>
      <MBlur x={w.v * 0.35} style={{ position: 'absolute', inset: 0, transform: `translateX(${w.off}px) scale(1.28)`, transformOrigin: '960px 430px' }}>
        {/* kolom komentar */}
        <div style={{ position: 'absolute', left: 960 - 430, top: mix(360, 210, chipsA), width: 860, transform: `scale(${pop(f, s - 2, 30, 16, 180)})` }}>
          {sent && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20, transform: `translateY(${(1 - eo(f, tWsE + 3, 8)) * 30}px)`, opacity: eo(f, tWsE + 3, 8) }}>
              <div style={{ width: 58, height: 58, borderRadius: 99, background: 'linear-gradient(150deg,#E3ECFF,#BFD2FF)', display: 'grid', placeItems: 'center' }}><Emoji n="smiling_face_with_smiling_eyes" size={40} /></div>
              <div style={{ background: '#fff', borderRadius: 22, padding: '10px 22px', boxShadow: '0 12px 30px rgba(30,50,110,.10)', fontSize: 34, fontWeight: 600 }}>workspace</div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 999, padding: '14px 16px 14px 30px', boxShadow: '0 30px 60px rgba(30,50,110,.14)', border: '1px solid #E6E8EC' }}>
            <MessageCircle size={34} color="#5B6475" />
            <span style={{ flex: 1, fontSize: 36, color: sent || !typed ? '#94A3B8' : '#0F172A', fontWeight: 500 }}>{sent ? 'Tambahkan komentar…' : typed || 'Tambahkan komentar…'}{!sent && f >= tKom - 4 && Math.floor(f / 8) % 2 === 0 && <span style={{ display: 'inline-block', width: 3, height: 36, background: '#2563EB', verticalAlign: 'middle', marginLeft: 2 }} />}</span>
            <div style={{ width: 64, height: 64, borderRadius: 99, background: typed && !sent ? '#2563EB' : '#E6E8EC', display: 'grid', placeItems: 'center', transform: `scale(${f >= tWsE && f < tWsE + 4 ? 0.85 : 1})` }}><Send size={30} color="#fff" /></div>
          </div>
        </div>
        {/* dua chip */}
        {chipsA > 0 && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center', opacity: chipsA, transform: `translateY(${(1 - chipsA) * 40}px)` }}>
            <div style={{ position: 'relative', display: 'flex', gap: 10, background: '#0F172A', borderRadius: 999, padding: 12, boxShadow: '0 30px 60px rgba(15,23,42,.25)' }}>
              <div style={{ position: 'absolute', top: 12, bottom: 12, left: 12 + selX * 406, width: 390, borderRadius: 999, background: 'rgba(255,255,255,.16)' }} />
              {['Akses gratis', 'Paket kreatif'].map((t, k) => (
                <div key={t} style={{ position: 'relative', width: 390, height: 92, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 38, fontWeight: 700, color: k === sel ? '#fff' : 'rgba(255,255,255,.55)', transform: `scale(${(k === 0 ? pressA : pressB) ? 0.95 : 1})` }}>
                  <Emoji n={k === 0 ? 'wrapped_gift' : 'envelope'} size={48} />{t}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* DM */}
        <div style={{ position: 'absolute', left: 1440, top: 200, transform: `scale(${pop(f, tDM - 1)}) rotate(8deg)` }}><Emoji n="envelope" size={130} /></div>
        {chipsA > 0.5 && <Cursor x={curX} y={curY} press={pressA || pressB} scale={1.6} />}
      </MBlur>
    </AbsoluteFill>
  );
};
