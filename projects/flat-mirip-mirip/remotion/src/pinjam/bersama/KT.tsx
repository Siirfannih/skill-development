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
  /** detik (relatif lapisan) saat TIAP kata tampil = onset kata di words.json + 2 f; kosong = semua kata muncul bersama blok */
  wt?: number[];
  /** hero 3D: sisi kiri menjauh ke dalam (menghilang di belakang kepala), sisi kanan mendekat ke kanan (LINTAS AGENT, REVISI-2 R2-4c) */
  persp?: boolean;
  /** hero di DEPAN (SELESAI, DECISION): masuk mendarat di tempat (skala), keluar menyusut — tidak meluncur dari tepi kotak (REVISI-2 f/g: tidak ada KT terpotong) */
  depan?: boolean;
  /** lebar isi teks persp (kotak lapisan selebar frame supaya AGENT yang mendekat tidak terpotong) */
  lebarIsi?: number;
  /** tinggi kotak teks hero; kotak lapisan (h) diperpanjang sampai tepi bawah frame supaya hero naik dari bawah frame (Irfan 17 Nov) */
  hTeks?: number;
  /** detik relatif: warna teks berpindah putih -> tinta (teks lahir di atas footage, lalu dunia terang menutup) */
  gelapAt?: number;
  v?: number;
};

/** masuk r1 per kata (kartu 83): 3 f, naik <= 0,15 x ukuran, skala 0,92 -> 1, opacity penuh di f2, blur <= 3 px hanya f0-f1. lf = frame sejak onset kata. */
const gayaMasuk = (lf: number, size: number): React.CSSProperties => {
  if (lf < 0) return {visibility: 'hidden'};
  const q = CURVE.land(Math.min(1, lf / 3));
  return {opacity: lf >= 2 ? 1 : 0.45 + 0.28 * lf, transform: `translateY(${(1 - q) * 0.15 * size}px) scale(${0.92 + 0.08 * q})`, filter: lf < 2 ? `blur(${lf < 1 ? 3 : 1.5}px)` : undefined};
};
/** keluar hero = MASK di tempat 5 f (kartu 83): tanpa opacity/blur/skala; huruf tidak bergeser */
export const MASK_F = 6;
/** sapuan keluar bersih satu arah (kiri -> kanan): frame ke-i dari keluarF -> (i+1)/(MASK_F-1); frame terakhir lapisan tidak tampil (eof overlay), frame terlihat terakhir = tersapu penuh */
const sapu = (f: number, keluarF: number) => Math.min(1, Math.max(0, (f - keluarF + 1) / (MASK_F - 1)));      // linear: tiap frame menyapu 1/5 lebar, tepi lurus vertikal, terbaca 4 frame sebagian + 1 frame hilang
const maskKeluar = (out: number, arah: 'bawah' | 'samping'): React.CSSProperties => out <= 0.001 ? {} : {clipPath: arah === 'bawah' ? `inset(${(out * 100).toFixed(2)}% 0 0 0)` : `inset(-300px 0 -300px ${(out * 100).toFixed(2)}%)`};
const campur = (a: string, b: string, k: number) => {
  const h = (c: string, i: number) => parseInt(c.slice(1 + 2 * i, 3 + 2 * i), 16);
  return '#' + [0, 1, 2].map((i) => Math.round(h(a, i) + (h(b, i) - h(a, i)) * k).toString(16).padStart(2, '0')).join('');
};

/** frame onset kata ke-i (relatif lapisan); tanpa wt jatuh ke `cadangan` */
const onsetF = (p: KTProps, i: number, fps: number, cadangan = 0) => (p.wt && p.wt[Math.min(i, p.wt.length - 1)] !== undefined ? Math.round(p.wt[Math.min(i, p.wt.length - 1)] * fps) : cadangan);

const useKeluar = (durasi: number, keluarAt?: number, banyak = 7, kurva: 'leave' | 'reveal' = 'leave') => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const total = Math.round(durasi * fps);
  const mulai = keluarAt !== undefined ? Math.round(keluarAt * fps) : total - banyak;
  return {f, fps, total, out: move(f, mulai, banyak, kurva), mulai};
};

const shell: React.CSSProperties = {display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent'};

// ---------- R1 · T19 word-pop ikut VO ----------
const R1: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const size = p.size ?? 66;
  const words = p.teks.split(/\s+/).filter(Boolean);
  const g = p.gelapAt !== undefined ? move(f, Math.round(p.gelapAt * fps), 6, 'drift') : (p.gelap ? 1 : 0);
  const warna = p.warna ?? (p.gelapAt !== undefined ? campur(HERO, INK, g) : p.gelap ? INK : HERO);
  return <AbsoluteFill style={shell}>
    <div style={{fontFamily: FONT.poppins, fontWeight: 700, fontSize: size, color: warna, lineHeight: 1, letterSpacing: '-0.02em',
      textShadow: g > 0.5 ? 'none' : BAYANG_TEKS, whiteSpace: 'pre'}}>
      {words.map((w, i) => {
        const lf = f - onsetF(p, i, fps, react(i, fps, 0.55));
        return <span key={i} style={{display: 'inline-block', ...gayaMasuk(lf, size)}}>{w + (i < words.length - 1 ? ' ' : '')}</span>;
      })}
    </div>
  </AbsoluteFill>;
};

// ---------- R2 · T03 slam kecil (2,0 → 1,3 → 1,06 → 1,0 dalam 3 frame) ----------
const R2: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const size = p.size ?? 88;
  const words = p.teks.split(/\s+/).filter(Boolean);
  return <AbsoluteFill style={shell}>
    <div style={{fontFamily: FONT.poppins, fontWeight: 800, fontSize: size, color: p.warna ?? (p.gelap ? INK : HERO), lineHeight: 1, letterSpacing: '-0.025em',
      textShadow: p.gelap ? 'none' : BAYANG_TEKS, whiteSpace: 'pre'}}>
      {words.map((w, i) => {
        const lf = f - onsetF(p, i, fps, 0);       // slam per kata, mulai di onset kata itu
        const s = interpolate(Math.max(0, lf), [0, 1, 2, 3], i === 0 ? [2.0, 1.3, 1.06, 1.0] : [1.3, 1.16, 1.05, 1.0], {extrapolateRight: 'clamp', easing: CURVE.heavy});   // kata ke-2+ berjangkar kiri: skala awal kecil supaya tepi kanan tetap dalam safe area (ronde 9 X2)
        const g = getar(Math.max(0, lf), 3, 6, size * 0.05, (p.seed ?? 3) + i);
        return <span key={i} style={{display: 'inline-block', transformOrigin: i === 0 ? '50% 50%' : '0% 50%', visibility: lf >= 0 ? 'visible' : 'hidden', opacity: Math.min(1, 0.45 + 0.55 * Math.max(0, lf) / 2), transform: `translate(${g.x}px, ${g.y}px) scale(${s})`,
          filter: lf >= 0 && lf < 3 ? `blur(${(3 - lf) * 2.2}px)` : undefined /* motion-ok: gerak cepat T03 */}}>{w + (i < words.length - 1 ? ' ' : '')}</span>;
      })}
    </div>
  </AbsoluteFill>;
};

// ---------- R3 · T25 kacau: huruf lompat tak rata lalu mendarat (kacau/frustrasi/viral) ----------
const R3: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const size = p.size ?? 96;
  const {fps} = useVideoConfig();
  const out = p.gaya === 'viral' && p.keluarAt !== undefined ? sapu(f, Math.round(p.keluarAt * fps)) : 0;
  const bekuF = p.bekuAt !== undefined ? Math.round(p.bekuAt * fps) : 1e9;
  const ff = Math.min(f, bekuF);
  const chars = Array.from(p.teks);
  const viral = p.gaya === 'viral';
  // kata ke berapa tiap huruf (onset per kata)
  const kataKe = chars.reduce<number[]>((a, c, i) => { a.push(i === 0 ? 0 : a[i - 1] + (chars[i - 1] === ' ' ? 1 : 0)); return a; }, []);
  return <AbsoluteFill style={{...shell, ...maskKeluar(out, 'samping')}}>
    <div style={{fontFamily: FONT.poppins, fontWeight: 800, fontSize: size, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'pre',
      transform: `rotate(${viral ? -5 : 0}deg)`, textAlign: 'center'}}>
      {chars.map((c, i) => {
        const tick = Math.floor(ff / 2);
        const o0 = onsetF(p, kataKe[i], fps, 0);
        // D-433: selain parodi 'viral', semua huruf tampil bersama ≤ 3 f dan guncang reda ≤ 6 f setelah onset (kata utuh saat diucapkan)
        const settle = viral ? move(f, o0 + 10, 8, 'land') : move(f, o0 + 2, 4, 'land');
        const k = 1 - Math.min(1, settle);
        const keep = viral ? 0.25 : 0;
        if (c === ' ') return null;                       // jarak antar-kata lewat margin (audit V6: "habis banget" tidak boleh rapat)
        const jx = (hash(tick * 7 + i) - 0.5) * size * 0.16 * (k + keep);
        const jy = (hash(tick * 11 + i + 4) - 0.5) * size * 0.34 * (k + keep);
        const jr = (hash(tick * 13 + i + 8) - 0.5) * 24 * (k + keep);
        const pop = viral ? move(f, o0 + react(i % 6, fps, 0.25), 4, 'land') : move(f, o0, 3, 'land');
        const warna = viral ? undefined : (p.warna ?? (p.gelap ? INK : HERO));
        const sty: React.CSSProperties = viral
          ? {backgroundImage: 'linear-gradient(180deg,#FF4FD8,#8E3BFF)', WebkitBackgroundClip: 'text', color: 'transparent',
            filter: 'drop-shadow(0 7px 0 #2A0A5E) drop-shadow(0 14px 0 #FFD400) drop-shadow(0 0 22px rgba(255,80,220,.9))'}
          : {color: warna, textShadow: p.gelap ? 'none' : BAYANG_TEKS};
        return <span key={i} style={{display: 'inline-block', marginLeft: i > 0 && chars[i - 1] === ' ' ? size * 0.34 : 0, opacity: Math.min(1, pop * 1.4), ...sty,
          transform: `translate(${jx}px, ${jy + (1 - pop) * size * 0.4}px) rotate(${jr}deg) scale(${0.6 + 0.4 * pop})`}}>{c}</span>;
      })}
    </div>
  </AbsoluteFill>;
};

// ---------- putus-putus (R3): suku kata muncul terputus satu per satu, jeda tak rata ----------
const Putus: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const size = p.size ?? 124;
  const parts = ['pu', 'tus', '-pu', 'tus'];
  const at = [0, 5, 11, 15];
  return <AbsoluteFill style={shell}>
    <div style={{display: 'flex', alignItems: 'baseline', fontFamily: FONT.poppins, fontWeight: 800, fontSize: size, color: p.warna ?? CORAL, lineHeight: 1,
      letterSpacing: '-0.02em', textShadow: BAYANG_TEKS}}>
      {parts.map((s, i) => {
        const q = move(f, at[i], 3, 'land');
        const patah = Math.floor(f / 4) % 2;
        return <span key={i} style={{display: 'inline-block', opacity: Math.min(1, q * 1.5), marginLeft: i === 2 ? size * 0.16 : 0,
          transform: `translate(${(i % 2 ? 1 : -1) * (1 - q) * size * 0.5}px, ${(patah ? 1 : -1) * size * 0.02}px) rotate(${(i - 1.5) * 2.2 * q}deg)`}}>{s}</span>;
      })}
    </div>
  </AbsoluteFill>;
};

// ---------- R4 · T09 bubble chat pop-up (B6b); indikator mengetik dulu, lalu teks ----------
const Bubble: React.FC<KTProps> = (p) => {
  const {f, fps, out} = useKeluar(p.durasi, p.keluarAt, 8);
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
          {p.teks.split(/\s+/).filter(Boolean).map((w, i, arr) => <span key={i} style={{visibility: f >= onsetF(p, i, fps, 0) ? 'visible' : 'hidden'}}>{w + (i < arr.length - 1 ? ' ' : '')}</span>)}</>}
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

/** gelombang huruf slab: offset posisi per huruf (bukan jeda waktu) */
const gelombang = (i: number, f: number, fs: number, tenang: number) => Math.sin(i * 0.84 + f * 0.09) * fs * 0.035 * tenang; // motion-ok: offset spasial per huruf

// ---------- R6 · T04 hero: kata raksasa menyusut dan mendarat (finally / slab / busur) ----------
const Hero: React.FC<KTProps> = (p) => {
  if (p.persp) return <HeroPersp {...p}/>;
  return <HeroDatar {...p}/>;
};
const HeroDatar: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slab = p.gaya === 'slab';
  const lebar = p.w - (slab ? 0 : 0);
  const spasi = p.spasi ?? 0;
  const fs = useFitSize(p.teks, FONT.anton, 400, lebar, spasi);
  const keluarF = p.keluarAt !== undefined ? Math.round(p.keluarAt * fps) : Math.round(p.durasi * fps) - 12;
  const depan = !!p.depan;
  const fin = p.gaya === 'finally';
  const enter = depan ? move(f, 0, 10, 'land') : fin ? move(f, 0, 5, 'land') : move(f, 0, 16, 'land');
  const tenang = 1 - move(f, 18, 72, 'drift');
  const out = sapu(f, keluarF);
  const ht = p.hTeks ?? p.h;
  const turun = p.h;                                    // dari/ke tepi bawah frame: kotak lapisan berakhir di tepi bawah frame
  const g = p.getarAt !== undefined ? getar(f, Math.round(p.getarAt * fps), 6, 12, p.seed ?? 2) : {x: 0, y: 0};
  const warna = p.warna ?? HERO;
  const chars = Array.from(p.teks);
  const kataKe = chars.reduce<number[]>((a, c, i) => { a.push(i === 0 ? 0 : a[i - 1] + (chars[i - 1] === ' ' ? 1 : 0)); return a; }, []);
  const kilat = p.sapu ? move(f, 14, 20, 'whip') : 0;
  return <AbsoluteFill style={{background: 'transparent', overflow: 'hidden'}}>
    <svg width={p.w} height={ht} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible',
      transformOrigin: '50% 60%',
      transform: depan || fin
        ? `translate(${g.x}px, ${g.y}px) rotate(${-2 * enter}deg) scale(${0.8 + 0.2 * enter})`
        : `translate(${g.x}px, ${g.y + (1 - enter) * turun}px) rotate(${(slab ? -2 : -5) * enter}deg)`,
      opacity: depan || fin ? enter : 1,
      ...maskKeluar(out, 'samping'),
      filter: depan || fin ? (enter < 0.99 ? `blur(${((1 - enter) * 10).toFixed(2)}px)` : undefined) : (enter < 0.97 ? `blur(${((1 - enter) * 3).toFixed(2)}px)` : undefined) /* motion-ok: masuk hero yang sudah disetujui (D-405: hanya cara keluar yang berubah) */}}>
      <defs>
        <linearGradient id="kilat" gradientUnits="userSpaceOnUse" x1={`${-30 + 140 * kilat}%`} y1="0" x2={`${-10 + 140 * kilat}%`} y2="0">
          <stop offset="0" stopColor={warna}/><stop offset=".5" stopColor="#FFFFFF"/><stop offset="1" stopColor={warna}/>
        </linearGradient>
      </defs>
      <text x="0" y={fs * 0.98} letterSpacing={spasi * fs} fill={p.sapu && kilat > 0 && kilat < 1 ? 'url(#kilat)' : warna} fontFamily={FONT.anton} fontSize={fs}
        style={{textShadow: '0 12px 22px rgba(0,0,0,.28)'}}>
        {chars.map((c, i) => <tspan key={i} fillOpacity={f >= onsetF(p, kataKe[i], fps, 0) ? 1 : 0} dy={i === 0 ? 0 : gelombang(i, f, fs, tenang)}>{c}</tspan>)}
      </text>
    </svg>
  </AbsoluteFill>;
};


/** LINTAS AGENT 3D (REVISI-2 R2-4c): dua bidang berengsel di kepala. LINTAS (kiri) berputar menjauh ke dalam dan terus mundur menuju belakang kepala;
 * AGENT (kanan) lahir dari kedalaman lalu keluar mendekat ke kanan. Kotak lapisan selebar frame supaya ujung AGENT yang membesar tidak terpotong. */
const HeroPersp: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fs = useFitSize(p.teks, FONT.anton, 400, p.lebarIsi ?? 1500, 0);
  const keluarF = p.keluarAt !== undefined ? Math.round(p.keluarAt * fps) : Math.round(p.durasi * fps) - 12;
  const out = sapu(f, keluarF);
  const [w1, w2] = p.teks.split(' ');
  const o1 = onsetF(p, 0, fps, 0), o2 = onsetF(p, 1, fps, 6);
  const a1 = move(f, o1, 16, 'heavy'), a2 = move(f, o2, 14, 'land');
  const tahan1 = move(f, o1 + 16, Math.max(1, keluarF - o1 - 16), 'drift'), tahan2 = move(f, o2 + 14, Math.max(1, keluarF - o2 - 14), 'drift');
  const huruf: React.CSSProperties = {display: 'inline-block', fontFamily: FONT.anton, fontSize: fs, lineHeight: 1, color: p.warna ?? HERO, textShadow: '0 12px 22px rgba(0,0,0,.28)', whiteSpace: 'pre'};
  // LINTAS: engsel di ujung luar (kiri), ujung dalam (dekat kepala) menjauh
  const t1 = `translateX(${-40 * a1}px) translateZ(${-140 * a1 - 160 * tahan1}px) rotateY(${34 * a1 + 4 * tahan1}deg) scale(${0.9 + 0.1 * a1})`;
  // AGENT: engsel di ujung luar (kanan), ujung dalam menjauh; seluruh kata maju mendekat & bergeser ke kanan
  const t2 = `translateX(${30 * a2 + 36 * tahan2}px) translateZ(${-520 * (1 - a2) + 60 * tahan2}px) rotateY(${-30 * a2 - 4 * tahan2}deg)`;
  return <AbsoluteFill style={{background: 'transparent', ...maskKeluar(out, 'samping')}}><AbsoluteFill style={{background: 'transparent', perspective: 1300, perspectiveOrigin: `${p.w / 2}px ${p.h / 2}px`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{display: 'flex', gap: fs * 0.22, alignItems: 'center', transformStyle: 'preserve-3d'}}>
      <span style={{...huruf, transformOrigin: '0% 50%', opacity: f >= o1 ? Math.min(1, a1 * 1.6) : 0, filter: a1 < 0.6 ? `blur(${((0.6 - a1) * 14).toFixed(2)}px)` : undefined, transform: t1}}>{w1}</span>
      <span style={{...huruf, transformOrigin: '100% 50%', opacity: f >= o2 ? Math.min(1, a2 * 1.6) : 0, filter: a2 < 0.6 ? `blur(${((0.6 - a2) * 14).toFixed(2)}px)` : undefined, transform: t2}}>{w2}</span>
    </div>
  </AbsoluteFill></AbsoluteFill>;
};

// ---------- R6 pada busur: kata cincin besar mengikuti lengkung di sekitar kepala ----------
const Busur: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = p.busur!;
  const q = move(f, 0, 10, 'heavy');
  const keluarF = p.keluarAt !== undefined ? Math.round(p.keluarAt * fps) : Math.round(p.durasi * fps) - 10;
  const out = sapu(f, keluarF);
  const geser = b.mulai + b.geser * move(f, 0, Math.round(p.durasi * fps), 'drift');
  const size = (p.size ?? 150) * (1 + 1.5 * (1 - q));
  return <AbsoluteFill style={{background: 'transparent'}}>
    <svg width={p.w} height={p.h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity: Math.min(1, q * 1.5), ...maskKeluar(out, 'samping')}}>
      <defs><path id={`arch-${p.seed ?? 0}`} d={b.d}/>
        <filter id="lunak" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity=".42"/></filter></defs>
      <text fill={p.warna ?? HERO} fontSize={size} fontFamily={FONT.poppins} fontWeight={800} letterSpacing={-4} filter="url(#lunak)"
>
        <textPath href={`#arch-${p.seed ?? 0}`} startOffset={`${geser - 3 * (1 - q)}%`}>{p.teks.split(' ').map((w, i, arr) => <tspan key={i} fillOpacity={f >= onsetF(p, i, fps, 0) ? 1 : 0}>{w + (i < arr.length - 1 ? ' ' : '')}</tspan>)}</textPath>
      </text>
    </svg>
  </AbsoluteFill>;
};


// ---------- label pengantar hero (R6b-1): kata pengantar kecil di sudut atas-kiri blok kata besar; masuk bersama hero (3 f), keluar bersama mask hero ----------
const Label: React.FC<KTProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const size = p.size ?? 52;
  const keluarF = p.keluarAt !== undefined ? Math.round(p.keluarAt * fps) : 1e9;
  const out = sapu(f, keluarF);
  return <AbsoluteFill style={{...shell, justifyContent: 'flex-start', ...maskKeluar(out, 'samping')}}>
    <div style={{paddingLeft: 70, fontFamily: FONT.poppins, fontWeight: 700, fontSize: size, color: HERO, lineHeight: 1.15, letterSpacing: '-0.02em', textShadow: BAYANG_TEKS, whiteSpace: 'pre', ...gayaMasuk(f, size)}}>{p.teks}</div>
  </AbsoluteFill>;
};

export const KT: React.FC<KTProps> = (p) => {
  const body = (() => {
    switch (p.gaya) {
      case 'r1': return <R1 {...p}/>;
      case 'r2': return <R2 {...p}/>;
      case 'r3': case 'viral': return <R3 {...p}/>;
      case 'putus': return <Putus {...p}/>;
      case 'label': return <Label {...p}/>;
      case 'bubble': return <Bubble {...p}/>;
      case 'busur': return <Busur {...p}/>;
      case 'finally': case 'slab': return <Hero {...p}/>;
      default: throw new Error(`KT: gaya ${p.gaya} belum diimplementasikan (kode ${p.kode})`);
    }
  })();
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>{body}</AbsoluteFill>;
};
