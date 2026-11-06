// Beat 5→6 · Dasbor UI asli lahir bertahap dari link laporan (BK07) → fokus "Perlu restock" (BK08) → kalender stok habis + saran belanja
// → "+ Tambah cabang": cabang muncul berderet di satu akun.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Plus, ShoppingCart, Users } from 'lucide-react';
import { beat, wf } from '../lib/time';
import { clamp, EASE, eo, pop, mix } from '../lib/anim';
import { Cursor, Emoji, MBlur } from '../ui/common';
import { Ringkasan, StatusChip, Switcher } from '../ui/portal';
import { TAP } from './B04';
import { whip } from '../ui/trans';

const DAYS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const DOW = ['Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min', 'Sen'];

export const B06: React.FC = () => {
  const f = useCurrentFrame();
  const t0 = TAP() + 4;
  const tKap = wf('b06', 'kapan'), tHab = wf('b06', 'habis'), tBer = wf('b06', 'berapa'), tDib = wf('b06', 'dibeli'), tKal = wf('b06', 'kalau');
  const tCab = wf('b06', 'cabang', 1), tTam = wf('b06', 'tambahin'), tCab2 = wf('b06', 'cabangnya'), tSat = wf('b06', 'satu'), tAkun = wf('b06', 'akun');
  const end = beat('b07').s;
  if (f < t0 - 2 || f > end + 2) return null;
  // ---- dasbor ----
  const st = (k: string) => {
    const m: Record<string, [number, number]> = { frame: [0, 4], side: [1, 9], head: [3, 8], k1: [6, 9], k2: [8, 9], k3: [10, 9], k4: [12, 9], chart: [13, 16], list: [17, 12] };
    const [a, d] = m[k]; return eo(f, t0 + a, d);
  };
  const born = interpolate(f, [t0, t0 + 14], [0, 1], { ...clamp, easing: EASE });
  // BK08: dorong ke kartu "Perlu restock"
  const focus = interpolate(f, [tKap - 10, tKap + 4], [0, 1], { ...clamp, easing: (t) => t * t });
  const dashOn = f < tKap + 5;
  // ---- kalender ----
  const calA = eo(f, tKap + 2, 10) * (1 - eo(f, tKal + 2, 8));
  const calX = interpolate(f, [tKap + 2, tHab + 4], [600, 0], { ...clamp, easing: EASE });
  const sel = eo(f, tHab - 2, 8);
  const sug = pop(f, tDib - 4, 30, 15, 190);
  // ---- cabang ----
  const w = whip(f, tKal + 10, end + 1, 1300, 9, 0, -1);
  const cabIn = interpolate(f, [tKal + 2, tKal + 12], [1100, 0], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const vCab = Math.abs(interpolate(f + 0.5, [tKal + 2, tKal + 12], [1100, 0], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) }) - cabIn) * 0.35;
  const cabOn = f >= tKal + 2;
  const curX = interpolate(f, [tCab - 4, tTam - 4], [1500, 1353], { ...clamp, easing: EASE });
  const curY = interpolate(f, [tCab - 4, tTam - 4], [860, 479], { ...clamp, easing: EASE });
  const press = f >= tTam - 1 && f < tTam + 6 ? 1 - Math.abs(f - tTam - 1) / 5 : 0;
  const chips = [{ n: 'Cabang 1', t: tKal + 8 }, { n: 'Cabang 2', t: tCab2 - 2 }, { n: 'Cabang 3', t: tCab2 + 8 }];
  const one = eo(f, tSat - 2, 10);
  return (
    <AbsoluteFill>
      {dashOn && (() => {
        const S = 1.13 * (1 + 1.8 * focus) * mix(0.16, 1, born);
        const o = [538, -147]; // pusat kartu "Perlu restock" relatif ke pusat dasbor (px logis)
        const tx = -focus * S * o[0], ty = mix(240, 0, born) - focus * S * o[1];
        return (
          <div style={{ position: 'absolute', left: 960 - 700, top: 452 - 320, width: 1400, height: 640, borderRadius: 24, overflow: 'hidden', boxShadow: '0 50px 100px rgba(30,50,110,.22)',
            transform: `translate(${tx}px, ${ty}px) scale(${S})`, transformOrigin: '50% 50%', opacity: Math.min(1, born * 3) * (1 - eo(f, tKap + 1, 4)) }}>
            <Ringkasan stage={st} />
            <div style={{ position: 'absolute', left: 1102, top: 101, width: 272, height: 144, borderRadius: 20, border: `3px solid rgba(180,35,24,${eo(f, tKap - 24, 8)})` }} />
          </div>
        );
      })()}
      {calA > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: calA, transform: `scale(${mix(1.25, 1.0, sug)})`, transformOrigin: '960px 330px' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 56, textAlign: 'center' }}>
            <span className="font-display" style={{ fontSize: 34, fontWeight: 600, color: '#5B6475' }}>November</span>
          </div>
          {/* minggu sebelum/sesudah: redup + blur untuk kedalaman (09) */}
          {[-1, 1].map((r) => (
            <div key={r} style={{ position: 'absolute', left: 0, right: 0, top: 262 + r * 140, display: 'flex', justifyContent: 'center', gap: 18, transform: `translateX(${calX * 0.7 - 2 * 118}px) scale(0.92)`, filter: 'blur(3px)', opacity: 0.35 }}>
              {DAYS.map((d) => <div key={d} className="tabular" style={{ width: 100, textAlign: 'center', fontSize: 44, fontWeight: 800, color: '#94A3B8' }}>{r < 0 ? d - 7 : d + 7 > 30 ? d + 7 - 30 : d + 7}</div>)}
            </div>
          ))}
          <MBlur x={Math.abs(interpolate(f + 0.5, [tKap + 2, tHab + 4], [600, 0], { ...clamp, easing: EASE }) - calX) * 0.4} style={{ position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', gap: 18, transform: `translateX(${calX - 2 * 118}px)` }}>
            {DAYS.map((d, i) => {
              const isSel = d === 19; const isToday = d === 13;
              return (
                <div key={d} style={{ width: 100, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, color: '#5B6475', fontWeight: 600 }}>{DOW[i]}</div>
                  <div className="tabular" style={{ marginTop: 10, width: 100, height: 100, borderRadius: 99, display: 'grid', placeItems: 'center', fontSize: 44, fontWeight: 800,
                    background: isSel ? `rgba(180,35,24,${sel})` : isToday ? '#0F172A' : 'transparent', color: isSel && sel > 0.5 ? '#fff' : isToday ? '#fff' : i > 3 && i < 9 ? '#0F172A' : '#94A3B8', transform: `scale(${isSel ? 1 + 0.12 * sel : 1})` }}>{d}</div>
                </div>
              );
            })}
          </MBlur>
          {/* label habis di atas tanggal 19 */}
          <div style={{ position: 'absolute', left: 1019 + calX - 52, top: 392, transform: `scale(${pop(f, tHab + 4)})`, transformOrigin: '50% 0' }}>
            <StatusChip tone="bad"><span style={{ fontSize: 24, padding: '4px 8px', fontWeight: 700 }}>habis</span></StatusChip>
          </div>
          {/* kartu saran belanja (Stok.tsx) */}
          <div className="card" style={{ position: 'absolute', left: 560, top: 520, width: 800, padding: 30, boxShadow: '0 40px 80px rgba(30,50,110,.16)', transform: `scale(${sug})`, opacity: Math.min(1, sug) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><ShoppingCart className="text-accent" size={30} /><span className="font-display" style={{ fontSize: 30, fontWeight: 600 }}>Saran belanja</span><span style={{ marginLeft: 'auto' }}><StatusChip tone="bad"><span style={{ fontSize: 18 }}>Perlu dipesan</span></StatusChip></span></div>
            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', fontSize: 18, color: '#5B6475', fontWeight: 500 }}><span>Produk</span><span>Cukup untuk</span><span style={{ textAlign: 'right' }}>Pesan</span></div>
            <div style={{ marginTop: 10, paddingTop: 14, borderTop: '1px solid #E6E8EC', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', alignItems: 'center', fontSize: 28 }}>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}><Emoji n="dumpling" size={44} />Kulit risol</span><span className="tabular">6 hari</span><span className="tabular" style={{ textAlign: 'right', fontWeight: 800 }}>{Math.round(interpolate(f, [tDib - 2, tDib + 14], [0, 40], clamp))} lembar</span>
            </div>
          </div>
        </div>
      )}
      {cabOn && (
        <MBlur x={vCab + w.v * 0.35} style={{ position: 'absolute', inset: 0, transform: `translateX(${cabIn + w.off}px)` }}>
          <div className="card" style={{ position: 'absolute', left: 470, top: 250, width: 980, padding: 40, transform: 'scale(1.3)', transformOrigin: '50% 40%', boxShadow: '0 50px 100px rgba(30,50,110,.16)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 84, height: 84, borderRadius: 24, background: '#0F172A', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 34, fontWeight: 700 }} className="font-display">BS</div>
              <div><div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>Risol Bu Sari</div><div style={{ fontSize: 22, color: '#5B6475', display: 'flex', alignItems: 'center', gap: 8 }}><Users size={22} />{`satu akun · ${chips.filter((c) => f >= c.t).length} cabang`}</div></div>
              <div style={{ marginLeft: 'auto', opacity: one, transform: `scale(${0.9 + 0.1 * one})` }}><StatusChip tone="info"><span style={{ fontSize: 20, padding: '4px 6px' }}>dipantau dari satu akun</span></StatusChip></div>
            </div>
            <div style={{ marginTop: 34, display: 'flex', gap: 18, alignItems: 'center' }}>
              {chips.map((c, i) => { const p = pop(f, c.t, 30, 12, 200); return (
                <div key={c.n} style={{ transform: `scale(${p})`, opacity: Math.min(1, p), padding: '18px 28px', borderRadius: 18, background: i === 0 ? '#EFF4FF' : '#fff', border: `2px solid ${i === 0 ? '#BFD2FF' : '#E6E8EC'}`, fontSize: 28, fontWeight: 700, color: i === 0 ? '#2563EB' : '#0F172A', boxShadow: one > 0 ? `0 0 0 ${one * 4}px rgba(37,99,235,.12)` : undefined }}>{c.n}</div>); })}
              <div style={{ marginLeft: 'auto', padding: '16px 24px', borderRadius: 16, border: '2px dashed #C9D3E5', fontSize: 24, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, background: press > 0 ? `rgba(244,245,247,${press})` : '#fff', transform: `scale(${1 - 0.05 * press})` }}><Plus size={24} />Tambah cabang</div>
            </div>
          </div>
          <Cursor x={curX} y={curY} press={press} scale={1.6} />
        </MBlur>
      )}
    </AbsoluteFill>
  );
};
