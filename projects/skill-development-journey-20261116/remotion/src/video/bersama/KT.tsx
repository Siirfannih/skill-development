// KT.tsx — satu blok teks KT (lapisan lego ber-alpha). Gerak dipilih dari `kode` di teks.json (typography.md §8a), bukan fade bawaan.
// R1 T19 narasi · R2 T03 kata kunci · R3 T25 kacau · R4 T09 pilihan/bubble · R6 T04 hero (slab, kata raksasa, kata di busur).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CURVE, exitDur, move, react} from '../../lib/curves';
import {Fonts} from './Fonts';
import {getar, hash, useFitSize} from './fit';
import {BAYANG_TEKS, CORAL, FONT, HERO, INK} from './tema';

export type KTProps = {
  teks: string; kode: string; gaya: string; w: number; h: number; durasi: number;
  size?: number; warna?: string; gelap?: boolean; seed?: number;
  /** detik (relatif lapisan) kapan elemen mulai keluar; bila kosong keluar di akhir durasi */
  keluarAt?: number;
  /** detik relatif: guncangan / pembekuan */
  getarAt?: number; bekuAt?: number;
  /** busur (hero cincin) */
  busur?: {d: string; mulai: number; geser: number};
  sisi?: 'kiri' | 'kanan';
  sapu?: boolean;
  /** jarak huruf hero (em, negatif = rapat); FINALLY -0,03 supaya tinggi 20 % muat di ruang kiri */
  spasi?: number;
};

const useKeluar = (durasi: number, keluarAt?: number, banyak = 6) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const total = Math.round(durasi * fps);
  const mulai = keluarAt !== undefined ? Math.round(keluarAt * fps) : total - banyak;
  return {f, fps, total, out: move(f, mulai, banyak, 'leave'), mulai};
};

const shell: React.CSSProperties = {display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent'};

// ---------- R1 · T19 word-pop ikut VO ----------
const R1: React.FC<KTProps> = (p) => {
  const {f, fps, out} = useKeluar(p.durasi, p.keluarAt, 5);
  const size = p.size ?? 66;
  const words = p.teks.split(/\s+/).filter(Boolean);
  const warna = p.warna ?? (p.gelap ? INK : HERO);
  return <AbsoluteFill style={{...shell, clipPath: `inset(0 0 ${out * 100}% 0)`, transform: `translateY(${-out * 0.35 * size}px)`}}>
    <div style={{fontFamily: FONT.poppins, fontWeight: 700, fontSize: size, color: warna, lineHeight: 1, letterSpacing: '-0.02em',
      textShadow: p.gelap ? 'none' : BAYANG_TEKS, whiteSpace: 'pre'}}>
      {words.map((w, i) => {
        const q = move(f, react(i, fps, 0.55), 4, 'land');
        return <span key={i} style={{display: 'inline-block', opacity: q > 0.02 ? 1 : 0,
          transform: `translateY(${(1 - q) * 0.36 * size}px) scale(${0.85 + 0.15 * q})`}}>{w + (i < words.length - 1 ? ' ' : '')}</span>;
      })}
    </div>
  </AbsoluteFill>;
};

// ---------- R2 · T03 slam kecil (2,0 → 1,3 → 1,06 → 1,0 dalam 3 frame) ----------
const R2: React.FC<KTProps> = (p) => {
  const {f, out} = useKeluar(p.durasi, p.keluarAt, 5);
  const size = p.size ?? 88;
  const s = interpolate(f, [0, 1, 2, 3], [2.0, 1.3, 1.06, 1.0], {extrapolateRight: 'clamp', easing: CURVE.heavy});
  const cepat = f < 3;
  const g = getar(f, 3, 6, size * 0.05, p.seed ?? 3);
  return <AbsoluteFill style={{...shell, clipPath: `inset(0 0 ${out * 100}% 0)`}}>
    <div style={{fontFamily: FONT.poppins, fontWeight: 800, fontSize: size, color: p.warna ?? (p.gelap ? INK : HERO), lineHeight: 1, letterSpacing: '-0.025em',
      textShadow: p.gelap ? 'none' : BAYANG_TEKS, whiteSpace: 'pre',
      transform: `translate(${g.x}px, ${g.y - out * 0.3 * size}px) scale(${s})`,
      filter: cepat ? `blur(${(3 - f) * 2.2}px)` : undefined /* motion-ok: gerak cepat T03 */}}>{p.teks}</div>
  </AbsoluteFill>;
};

// ---------- R3 · T25 kacau: huruf lompat tak rata lalu mendarat (kacau/frustrasi/viral) ----------
const R3: React.FC<KTProps> = (p) => {
  const {f, out} = useKeluar(p.durasi, p.keluarAt, 6);
  const size = p.size ?? 96;
  const bekuF = p.bekuAt !== undefined ? Math.round(p.bekuAt * 30) : 1e9;
  const ff = Math.min(f, bekuF);
  const chars = Array.from(p.teks);
  const viral = p.gaya === 'viral';
  const settle = move(f, 10, 8, 'land');
  return <AbsoluteFill style={{...shell, clipPath: `inset(0 0 ${out * 100}% 0)`}}>
    <div style={{fontFamily: FONT.poppins, fontWeight: 800, fontSize: size, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'pre',
      transform: `rotate(${viral ? -5 : 0}deg)`, textAlign: 'center'}}>
      {chars.map((c, i) => {
        const tick = Math.floor(ff / 2);
        const k = 1 - Math.min(1, settle);
        const keep = viral ? 0.25 : 0;
        const jx = (hash(tick * 7 + i) - 0.5) * size * 0.3 * (k + keep);
        const jy = (hash(tick * 11 + i + 4) - 0.5) * size * 0.34 * (k + keep);
        const jr = (hash(tick * 13 + i + 8) - 0.5) * 24 * (k + keep);
        const pop = move(f, react(i % 6, 30, 0.4), 5, 'land');
        const warna = viral ? undefined : (p.warna ?? (p.gelap ? INK : HERO));
        const sty: React.CSSProperties = viral
          ? {backgroundImage: 'linear-gradient(180deg,#FF4FD8,#8E3BFF)', WebkitBackgroundClip: 'text', color: 'transparent',
            filter: 'drop-shadow(0 7px 0 #2A0A5E) drop-shadow(0 14px 0 #FFD400) drop-shadow(0 0 22px rgba(255,80,220,.9))'}
          : {color: warna, textShadow: p.gelap ? 'none' : BAYANG_TEKS};
        return <span key={i} style={{display: 'inline-block', opacity: pop > 0.02 ? 1 : 0, ...sty,
          transform: `translate(${jx}px, ${jy + (1 - pop) * size * 0.4}px) rotate(${jr}deg) scale(${0.6 + 0.4 * pop})`}}>{c}</span>;
      })}
    </div>
  </AbsoluteFill>;
};

// ---------- putus-putus (R3): suku kata muncul terputus satu per satu, jeda tak rata ----------
const Putus: React.FC<KTProps> = (p) => {
  const {f, out} = useKeluar(p.durasi, p.keluarAt, 6);
  const size = p.size ?? 124;
  const parts = ['pu', 'tus', '-pu', 'tus'];
  const at = [0, 5, 11, 15];
  return <AbsoluteFill style={{...shell, clipPath: `inset(0 0 ${out * 100}% 0)`}}>
    <div style={{display: 'flex', alignItems: 'baseline', fontFamily: FONT.poppins, fontWeight: 800, fontSize: size, color: p.warna ?? CORAL, lineHeight: 1,
      letterSpacing: '-0.02em', textShadow: BAYANG_TEKS}}>
      {parts.map((s, i) => {
        const q = move(f, at[i], 3, 'land');
        const patah = Math.floor(f / 4) % 2;
        return <span key={i} style={{display: 'inline-block', opacity: q > 0.02 ? 1 : 0, marginLeft: i === 2 ? size * 0.16 : 0,
          transform: `translate(${(i % 2 ? 1 : -1) * (1 - q) * size * 0.5}px, ${(patah ? 1 : -1) * size * 0.02}px) rotate(${(i - 1.5) * 2.2 * q}deg)`}}>{s}</span>;
      })}
    </div>
  </AbsoluteFill>;
};

// ---------- R4 · T09 bubble chat pop-up (B6b); indikator mengetik dulu, lalu teks ----------
const Bubble: React.FC<KTProps> = (p) => {
  const {f, out} = useKeluar(p.durasi, p.keluarAt, 8);
  const size = p.size ?? 66;
  const kiri = p.sisi !== 'kanan';
  const enter = move(f, 0, 12, 'land');
  const rebound = move(f, 5, 7, 'heavy') - move(f, 12, 11, 'heavy');
  const typing = f < 14;
  return <AbsoluteFill style={{...shell, alignItems: 'flex-end', justifyContent: kiri ? 'flex-start' : 'flex-end', padding: 40}}>
    <div style={{opacity: enter > 0.02 ? 1 : 0, transformOrigin: kiri ? '0 100%' : '100% 100%',
      transform: `translateY(${40 * (1 - enter) + 80 * out}px) rotate(${(kiri ? -1 : 1) * 4 * (1 - enter)}deg) scale(${0.82 + 0.18 * enter + 0.02 * rebound},${0.82 + 0.18 * enter - 0.016 * rebound})`}}>
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 22, padding: typing ? '22px 44px' : '24px 46px 24px 34px', borderRadius: 56, background: '#FFFFFF',
        color: INK, fontFamily: FONT.poppins, fontWeight: 700, fontSize: size, letterSpacing: -1.5, lineHeight: 1.15, whiteSpace: 'nowrap',
        boxShadow: '0 30px 60px rgba(0,0,0,.30), 0 8px 16px rgba(0,0,0,.16)'}}>
        {typing ? <Titik f={f}/> : <>
          <span style={{width: size * 0.5, height: size * 0.5, borderRadius: '50%', border: `${Math.round(size * 0.07)}px solid #B8BEC8`, flexShrink: 0}}/>
          {p.teks}</>}
        <svg width="46" height="40" viewBox="0 0 46 40" style={{position: 'absolute', bottom: -2, [kiri ? 'left' : 'right']: -12, transform: kiri ? undefined : 'scaleX(-1)'}}>
          <path d="M30 0C30 18 22 32 0 40C24 40 40 34 46 22Z" fill="#FFFFFF"/>
        </svg>
      </div>
    </div>
  </AbsoluteFill>;
};
export const Titik: React.FC<{f: number; warna?: string}> = ({f, warna = '#8A8F98'}) => (
  <span style={{display: 'inline-flex', gap: 12, alignItems: 'center', height: 70}}>
    {[0, 1, 2].map((i) => <span key={i} style={{width: 16, height: 16, borderRadius: 8, background: warna,
      transform: `translateY(${-6 * Math.sin(f * 0.34 - i * 0.9)}px)`, opacity: 0.55 + 0.45 * Math.sin(f * 0.34 - i * 0.9)}}/>)}
  </span>
);

// ---------- R6 · T04 hero: kata raksasa menyusut dan mendarat (finally / slab / busur) ----------
const Hero: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slab = p.gaya === 'slab';
  const lebar = p.w - (slab ? 0 : 0);
  const spasi = p.spasi ?? 0;
  const fs = useFitSize(p.teks, FONT.anton, 400, lebar, spasi);
  const keluarF = p.keluarAt !== undefined ? Math.round(p.keluarAt * fps) : Math.round(p.durasi * fps) - 12;
  const enter = move(f, 0, slab ? 19 : 8, 'heavy');
  const tenang = 1 - move(f, 18, 72, 'drift');
  const out = move(f, keluarF, 12, 'leave');
  const g = p.getarAt !== undefined ? getar(f, Math.round(p.getarAt * fps), 6, 12, p.seed ?? 2) : {x: 0, y: 0};
  const warna = p.warna ?? HERO;
  const chars = Array.from(p.teks);
  const kilat = p.sapu ? move(f, 14, 20, 'whip') : 0;
  return <AbsoluteFill style={{background: 'transparent', overflow: 'hidden'}}>
    <svg width={p.w} height={p.h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible',
      transform: `translate(${g.x}px, ${g.y + (1 - enter) * p.h * 0.55 + out * p.h * 0.7}px) rotate(${(slab ? -2 : -5) * enter}deg) scaleY(${0.9 + 0.1 * enter})`,
      opacity: enter > 0.01 ? 1 : 0, clipPath: out > 0 ? `inset(0 0 ${out * 60}% 0)` : undefined}}>
      <defs>
        <linearGradient id="kilat" gradientUnits="userSpaceOnUse" x1={`${-30 + 140 * kilat}%`} y1="0" x2={`${-10 + 140 * kilat}%`} y2="0">
          <stop offset="0" stopColor={warna}/><stop offset=".5" stopColor="#FFFFFF"/><stop offset="1" stopColor={warna}/>
        </linearGradient>
      </defs>
      <text x="0" y={fs * 0.98} letterSpacing={spasi * fs} fill={p.sapu && kilat > 0 && kilat < 1 ? 'url(#kilat)' : warna} fontFamily={FONT.anton} fontSize={fs}
        style={{textShadow: '0 12px 22px rgba(0,0,0,.28)'}}>
        {chars.map((c, i) => <tspan key={i} dy={i === 0 ? 0 : Math.sin(i * 0.84 + f * 0.09) * fs * 0.035 * tenang}>{c}</tspan>)}
      </text>
    </svg>
  </AbsoluteFill>;
};

// ---------- R6 pada busur: kata cincin besar mengikuti lengkung di sekitar kepala ----------
const Busur: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = p.busur!;
  const q = move(f, 0, 10, 'heavy');
  const keluarF = p.keluarAt !== undefined ? Math.round(p.keluarAt * fps) : Math.round(p.durasi * fps) - 10;
  const out = move(f, keluarF, 10, 'leave');
  const geser = b.mulai + b.geser * move(f, 0, Math.round(p.durasi * fps), 'drift');
  const size = (p.size ?? 150) * (1 + 1.5 * (1 - q));
  return <AbsoluteFill style={{background: 'transparent'}}>
    <svg width={p.w} height={p.h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity: q > 0.01 ? 1 : 0}}>
      <defs><path id={`arch-${p.seed ?? 0}`} d={b.d}/>
        <filter id="lunak" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity=".42"/></filter></defs>
      <text fill={p.warna ?? HERO} fontSize={size} fontFamily={FONT.poppins} fontWeight={800} letterSpacing={-4} filter="url(#lunak)"
        style={{transform: `translateY(${out * 220}px)`}}>
        <textPath href={`#arch-${p.seed ?? 0}`} startOffset={`${geser - 3 * (1 - q)}%`}>{p.teks}</textPath>
      </text>
    </svg>
  </AbsoluteFill>;
};

export const KT: React.FC<KTProps> = (p) => {
  const body = (() => {
    switch (p.gaya) {
      case 'r1': return <R1 {...p}/>;
      case 'r2': return <R2 {...p}/>;
      case 'r3': case 'viral': return <R3 {...p}/>;
      case 'putus': return <Putus {...p}/>;
      case 'bubble': return <Bubble {...p}/>;
      case 'busur': return <Busur {...p}/>;
      case 'finally': case 'slab': return <Hero {...p}/>;
      default: throw new Error(`KT: gaya ${p.gaya} belum diimplementasikan (kode ${p.kode})`);
    }
  })();
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>{body}</AbsoluteFill>;
};
