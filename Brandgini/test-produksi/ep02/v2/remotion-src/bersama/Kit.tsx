import React from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {HURUF, MEREK, NETRAL, TURUNAN, RADIUS, ZONA} from './tema';
import {CURVE, move, drift, exitDur} from '../lib/curves';

export const FPS = 30;
export const W = 1080, H = 1920;
const FONT = HURUF.keluarga.judul;

/** Memuat font dari file (Lantai A7): render gagal bila file tidak ada. */
export const useFont = () => {
  const [h] = React.useState(() => delayRender('font'));
  React.useEffect(() => {
    const a = new FontFace(FONT, `url(${staticFile('font/PJS.ttf')})`, {weight: '200 800'});
    const b = new FontFace(FONT, `url(${staticFile('font/PJS-Italic.ttf')})`, {weight: '200 800', style: 'italic'});
    Promise.all([a.load(), b.load()]).then((fs) => { fs.forEach((f) => (document.fonts as any).add(f)); continueRender(h); }).catch((e) => { throw e; });
  }, [h]);
};

/** Kanvas gaya A: Kabut datar + jaring halus tinta opacity .06 (bukan gradien). */
export const Kanvas: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: MEREK.latar}}>
    <svg width={W} height={H} style={{position: 'absolute'}}>
      {Array.from({length: 28}).map((_, i) => <line key={'v' + i} x1={i * 40} y1={0} x2={i * 40} y2={H} stroke={NETRAL.tinta} strokeOpacity={0.06} strokeWidth={2} />)}
      {Array.from({length: 49}).map((_, i) => <line key={'h' + i} x1={0} y1={i * 40} x2={W} y2={i * 40} stroke={NETRAL.tinta} strokeOpacity={0.06} strokeWidth={2} />)}
    </svg>
  </AbsoluteFill>
);

/** Kamera: push pelan dari a ke b sepanjang adegan (CURVE.heavy), titik fokus (ox, oy). Semua yang di dalam ikut bergerak (Lantai B12). */
export const Cam: React.FC<{a?: number; b?: number; frames: number; ox?: number; oy?: number; kurva?: 'heavy' | 'drift' | 'whip'; children: React.ReactNode}> = ({a = 1, b = 1.06, frames, ox = W / 2, oy = 760, kurva = 'heavy', children}) => {
  const f = useCurrentFrame();
  const s = a + (b - a) * move(f, 0, frames, kurva);
  return <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: `${ox}px ${oy}px`}}>{children}</AbsoluteFill>;
};

/** Hidup saat hold: drift berbiji. */
export const Hidup: React.FC<{amp?: number; seed?: number; children: React.ReactNode}> = ({amp = 5, seed = 1, children}) => {
  const f = useCurrentFrame(); const d = drift(f, FPS, amp, seed);
  return <g transform={`translate(${d.x} ${d.y})`}>{children}</g>;
};

/** Transisi khas Soalnya Gini (K-05): push-in + potongan melintang. Adegan baru membuka dari celah horizontal di tengah sambil mendorong masuk. */
export const Masuk: React.FC<{frames: number; children: React.ReactNode}> = ({frames, children}) => {
  const f = useCurrentFrame();
  if (frames <= 0) return <AbsoluteFill>{children}</AbsoluteFill>;
  const p = move(f, 0, frames, 'whip');
  const slit = (1 - p) * 50, sc = 1.16 - 0.16 * move(f, 0, frames + 4, 'land');
  return (
    <AbsoluteFill style={{clipPath: `inset(${slit}% 0 ${slit}% 0)`, transform: `scale(${sc})`, transformOrigin: '50% 40%'}}>{children}</AbsoluteFill>
  );
};

type KTProps = {teks: string; mode: string; masuk: number; keluar: number; x: number; y: number; garis?: {x: number; y: number}};
/** Teks kinetik 1–3 kata dari ucapan. mode = T01 rise · T04 settle · T19 pop · T23 diegetik · T28 flip · T30 spin. Frame lokal adegan. */
export const KT: React.FC<KTProps> = ({teks, mode, masuk, keluar, x, y, garis}) => {
  const f = useCurrentFrame();
  const kata = teks.replace('…', '…').split(' ');
  const n = kata.join('').length + kata.length - 1;
  const tumpuk = kata.length === 2 && n > 14;
  const ukuran = mode === 'settle' && kata.length === 1 ? HURUF.ukuran.hero : kata.length === 3 ? HURUF.ukuran.narasi : HURUF.ukuran.kunci;
  const baris = tumpuk ? kata.map((k) => [k]) : [kata];
  const lf = f - masuk;
  if (lf < 0 || f > keluar + exitDur(8)) return null;
  const out = f > keluar ? move(f, keluar, exitDur(8), 'leave') : 0;
  const span = (w: string, i: number, bi: number) => {
    const d = 3 * (bi * baris[0].length + i);
    const p = move(lf, d, mode === 'settle' ? 9 : 12, mode === 'rise' ? 'reveal' : 'land');
    let tf = '', op = 1;
    if (mode === 'rise') { tf = `translateY(${(1 - p) * 40}px)`; }
    else if (mode === 'settle') { tf = `scale(${1 + (1 - p) * 0.6})`; op = Math.min(1, p * 3); }
    else if (mode === 'pop') { tf = `translateY(${(1 - p) * 20}px) scale(${0.9 + 0.1 * p})`; op = Math.min(1, p * 2.5); }
    else if (mode === 'flip') { tf = `rotateX(${(1 - p) * 90}deg)`; op = Math.min(1, p * 3); }
    else if (mode === 'spin') { tf = `rotate(${(1 - p) * -22}deg) scale(${0.9 + 0.1 * p})`; op = Math.min(1, p * 3); }
    else { tf = `translateY(${(1 - p) * 16}px)`; op = Math.min(1, p * 3); }
    return <span key={i} style={{display: 'inline-block', transform: `${tf} translateY(${-out * 30}px)`, opacity: op * (1 - out), transformOrigin: '50% 100%', marginRight: i < baris[bi].length - 1 ? '0.28em' : 0}}>{w}</span>;
  };
  const gp = garis ? move(lf, 4, 10, 'reveal') : 0;
  return (
    <>
      {garis && <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, opacity: 1 - out}}>
        <line x1={x} y1={y + 62} x2={x + (garis.x - x) * gp} y2={y + 62 + (garis.y - y - 62) * gp} stroke={NETRAL.tinta} strokeWidth={4} strokeLinecap="round" />
        <circle cx={x + (garis.x - x) * gp} cy={y + 62 + (garis.y - y - 62) * gp} r={9 * gp} fill={MEREK.merek} />
      </svg>}
      <div style={{position: 'absolute', left: x - 470, top: y - 56, width: 940, textAlign: 'center', fontFamily: FONT, fontWeight: HURUF.bobot.kunci, fontSize: ukuran, lineHeight: 1.02, color: NETRAL.tinta, perspective: 900, letterSpacing: '-0.01em', WebkitTextStroke: '14px rgba(255,255,255,0.92)', paintOrder: 'stroke fill'} as React.CSSProperties}>
        {baris.map((b, bi) => <div key={bi}>{b.map((w, i) => span(w, i, bi))}</div>)}
      </div>
    </>
  );
};

export type Kata = {w: string; s: number; e: number};
/** Caption kata per kata di pelat putih membulat pada pita y 1250–1450; kata aktif #1F4FCC (K-05, Irfan 25 Nov 2026). */
export const Caption: React.FC<{chunks: {s: number; e: number; kata: Kata[]}[]}> = ({chunks}) => {
  const f = useCurrentFrame(); const t = f / FPS;
  const c = chunks.find((k) => t >= k.s - 0.04 && t < k.e);
  if (!c) return null;
  const pin = move(f, Math.round((c.s - 0.04) * FPS), 5, 'land');
  let aktif = 0; c.kata.forEach((k, i) => { if (t >= k.s - 0.02) aktif = i; });
  return (
    <div style={{position: 'absolute', left: ZONA.samping, width: W - 2 * ZONA.samping, top: 1250, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - pin) * 14}px)`, opacity: Math.min(1, pin * 2)}}>
      <div style={{backgroundColor: NETRAL.putih, borderRadius: RADIUS.pelat * 2, padding: '12px 36px', textAlign: 'center', fontFamily: FONT, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.narasi, lineHeight: 1.08, color: NETRAL.tinta, boxShadow: `0 8px 22px rgba(27,35,48,.18)`, maxWidth: '100%'}}>
        {c.kata.map((k, i) => <span key={i} style={{color: i === aktif ? TURUNAN.primer.tekan : NETRAL.tinta}}>{k.w}{i < c.kata.length - 1 ? ' ' : ''}</span>)}
      </div>
    </div>
  );
};
export {interpolate};
