// B5b · REVISI-2 R2-2/R2-3: dunia agen 2,5D berlapis di desktop Mac (bilah menu macOS + wallpaper hutan, satu jendela gelap).
// Satu PAPAN aktif per saat, SELALU di TENGAH frame (tajam, skala 1, terang); papan lama mundur berlapis ke kiri-atas / kanan-atas (skala 0,86 lalu 0,76,
// blur 8–12 px, opasitas 0,4–0,56, lebih gelap); rak perpustakaan di lapis paling belakang BAWAH (putusan Sutradara REVISI-2: tidak ada sisi kosong sementara sisi lain penuh).
// skill-development = PERPUSTAKAAN (rak kartu: LANTAI, kartu kiblat, RESEP, orkestrasi, DESAIN) di lapis belakang, BUKAN router. Agen berbicara LANGSUNG (garis titik putih);
// agen MEMBACA rak lewat berkas cahaya lavender tipis (gaya garis berbeda). Lahir berurutan mengikuti ucapan: ChatGPT -> Claude -> session B -> kartu "Dicatat…" ditulis ke rak
// -> session berikutnya membaca kartunya -> centang -> kamera mundur, jaringan tumbuh (banyak agen membaca rak yang sama).
// Pesan asli: handoff/PAHAM-SKILL-DEV.md §D. Tata letak menjaga pita KT bawah (layar y > 940) kosong.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {siApple, siClaude, siGooglegemini} from 'simple-icons';
import {CURVE, drift, move, react} from '../lib/curves';
import {Fonts} from './bersama/Fonts';
import {KarakterX} from './bersama/KarakterPixel';
import {type EmoteJadwal} from '../papan/karakter2d/Karakter2D';
import {LogoChatGPT} from './bersama/LogoChatGPT';
import {Titik} from './bersama/Jendela';
import {FONT, HIJAU} from './bersama/tema';
import {WajahDorong} from './bersama/WajahDorong';

export type RelayProps = {
  /** total frame lapisan = pre + dunia + post; durasi (detik) = total */
  durasi: number;
  pre: number; post: number; preT0: number; postT0: number; zPre: number;
  /** skala kamera saat satu papan jadi fokus (1,25 default) */
  zb?: number;
  kunci: {ketik1: number; pesan1: number; amplop1: number; ketik2: number; pesan2: number; amplop2: number; pesan3: number; catat: number; loop: number; selesai: number; keluar: number};
};

type Pt = {x: number; y: number};
const WIN = {x: 150, y: 64, w: 1620, h: 880};             // jendela gelap (koordinat layar 1920x1080 sebelum kamera)
const BAR = 40;
const LAV = '#C9B6F2';                                     // warna perpustakaan (garis baca, kartu menyala)
// papan AKTIF selalu di tengah; koordinat isi papan = koordinat slot aktif
const AK = {x: 730, y: 128, w: 460, h: 500};
const AC: Pt = {x: AK.x + AK.w / 2, y: AK.y + AK.h / 2};
const FY = AK.y + 432;                                     // kaki karakter di papan aktif
// rak perpustakaan: lapis paling belakang, bawah tengah (di atas pita KT y > 940)
const RAK = {x: 430, y: 690, w: 1060, h: 166};
const JUDUL = ['LANTAI', 'kartu kiblat', 'RESEP', 'orkestrasi', 'DESAIN', 'Dicatat'];
const kartuPos = (i: number) => ({x: RAK.x + 26 + i * 170, y: RAK.y + 46, w: 154, h: 104});
const tx = (s: number, w = 400, c = '#ECECEC'): React.CSSProperties => ({fontFamily: FONT.inter, fontSize: s, fontWeight: w, color: c, letterSpacing: -0.2});
const bayang = '0 2px 5px rgba(0,0,0,.5), 0 16px 36px rgba(0,0,0,.42), 0 46px 90px rgba(0,0,0,.45)';

/** posisi kedalaman papan: aktif (tengah) · kiri/kanan atas (satu lapis mundur) · jauh kiri-atas (dua lapis) */
type Slot = {cx: number; cy: number; s: number; blur: number; op: number; br: number};
const SLOT: Record<'akt' | 'kiri' | 'kanan' | 'jauh', Slot> = {
  akt: {cx: AC.x, cy: AC.y, s: 1, blur: 0, op: 1, br: 1},
  kiri: {cx: 478, cy: 318, s: 0.86, blur: 8, op: 0.56, br: 0.8},
  kanan: {cx: 1442, cy: 318, s: 0.86, blur: 8, op: 0.56, br: 0.8},
  jauh: {cx: 960, cy: 196, s: 0.72, blur: 13, op: 0.34, br: 0.66},    // lapis terdalam: tepat di belakang papan aktif (atas tengah) supaya kiri = kanan
};
type Jalur = [number, keyof typeof SLOT][];
/** keadaan papan pada frame f: pindah slot dengan kurva heavy 18 f; saat kamera mundur (angkat) papan lama sedikit terangkat (blur berkurang) */
const keadaan = (f: number, jalur: Jalur, angkat: number): Slot => {
  let s = SLOT[jalur[0][1]];
  for (let i = 1; i < jalur.length; i++) {
    const k = move(f, jalur[i][0], 18, 'heavy');
    if (k <= 0) break;
    const b = SLOT[jalur[i][1]];
    s = {cx: s.cx + (b.cx - s.cx) * k, cy: s.cy + (b.cy - s.cy) * k, s: s.s + (b.s - s.s) * k, blur: s.blur + (b.blur - s.blur) * k, op: s.op + (b.op - s.op) * k, br: s.br + (b.br - s.br) * k};
  }
  const a = move(f, angkat, 24, 'drift');
  return {...s, blur: s.blur * (1 - 0.45 * a), op: s.op + (0.82 - s.op) * 0.55 * a * (s.s < 1 ? 1 : 0), br: s.br + (0.92 - s.br) * 0.5 * a * (s.s < 1 ? 1 : 0)};
};
const pusatDi = (k: Slot): Pt => ({x: k.cx, y: k.cy});

const Badge: React.FC<{jenis: 'claude' | 'chatgpt' | 'gemini'; s?: number}> = ({jenis, s = 40}) => (
  <div style={{width: s, height: s, borderRadius: s / 2, background: '#232323', border: '1.5px solid #3C3C3C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,.4)'}}>
    {jenis === 'claude' ? <svg width={s * 0.58} height={s * 0.58} viewBox="0 0 24 24"><path d={siClaude.path} fill="#D97757"/></svg>
      : jenis === 'gemini' ? <svg width={s * 0.6} height={s * 0.6} viewBox="0 0 24 24"><path d={siGooglegemini.path} fill="#8AB4F8"/></svg>
      : <LogoChatGPT size={s * 0.6} warna="#F2F2F2"/>}
  </div>
);

const Label: React.FC<{x: number; y: number; children: React.ReactNode}> = ({x, y, children}) => (
  <div style={{position: 'absolute', left: x - 200, top: y, width: 400, textAlign: 'center', ...tx(25, 500, '#D6D6D6')}}>{children}</div>
);

/**
 * Satu papan 2,5D. Isi digambar di koordinat slot aktif (AK); papan lahir dengan pop dari titik asal (land 14 f), lalu pindah slot kedalaman (heavy 18 f).
 */
const Papan: React.FC<{f: number; lahir: number; asal: Pt; jalur: Jalur; angkat: number; children: React.ReactNode}> = ({f, lahir, asal, jalur, angkat, children}) => {
  if (f < lahir - 1) return null;
  const e = move(f, lahir, 14, 'land');
  const k = keadaan(f, jalur, angkat);
  return <div style={{position: 'absolute', inset: 0, zIndex: Math.round(k.s * 100), transformOrigin: `${AC.x}px ${AC.y}px`,
    transform: `translate(${k.cx - AC.x}px, ${k.cy - AC.y}px) scale(${k.s})`,
    filter: `blur(${k.blur}px) brightness(${k.br})`, opacity: (e > 0.02 ? 1 : 0) * k.op}}>{/* motion-ok: blur = kedalaman 2,5D (papan mundur), bukan blur masuk */}
    <div style={{position: 'absolute', inset: 0, transformOrigin: `${AC.x}px ${AC.y}px`,
      transform: `translate(${(asal.x - k.cx) / k.s * (1 - e)}px, ${(asal.y - k.cy) / k.s * (1 - e)}px) scale(${0.5 + 0.5 * e})`}}>{children}</div>
  </div>;
};

const Plat: React.FC<{x: number; y: number; w: number; h: number; baca?: number}> = ({x, y, w, h, baca = 0}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 26, background: 'linear-gradient(#232323, #181818)',
    border: `1.5px solid ${baca > 0.05 ? LAV : '#3A3A3A'}`, boxShadow: `${bayang}${baca > 0.05 ? `, 0 0 ${34 * baca}px rgba(201,182,242,${0.5 * baca})` : ''}`}}/>
);

/** gelembung gelap kecil di dalam papan: tetap tampil (papan yang mundur tetap memuat pesannya) */
const Gelembung: React.FC<{f: number; mulai: number; x: number; y: number; lebar: number; label?: boolean; children: React.ReactNode}> = ({f, mulai, x, y, lebar, label = true, children}) => {
  if (f < mulai - 1) return null;
  const e = move(f, mulai, 9, 'reveal');
  return <div style={{position: 'absolute', left: x, top: y, width: lebar, opacity: e > 0.02 ? 1 : 0, filter: `blur(${(1 - e) * 8}px)`, transformOrigin: '30% 100%', // motion-ok: MG63 §2 masuk blur→tajam ±6–9 f (reveal)
    transform: `translateY(${16 * (1 - e)}px) scale(${0.92 + 0.08 * e})`}}>
    {label && <div style={{display: 'flex', alignItems: 'center', gap: 8, ...tx(17, 400, '#8E8E8E'), marginBottom: 8, paddingLeft: 4}}><LogoChatGPT size={17} warna="#8E8E8E"/>Sent by ChatGPT from another chat</div>}
    <div style={{padding: '14px 20px', borderRadius: 18, background: '#1E1E1E', border: '1.5px solid #333333', ...tx(28), lineHeight: 1.32, boxShadow: '0 14px 34px rgba(0,0,0,.45)'}}>{children}</div>
  </div>;
};

/** indikator mengetik 3 titik sebelum gelembung */
const Ketik: React.FC<{f: number; mulai: number; selesai: number; x: number; y: number}> = ({f, mulai, selesai, x, y}) => {
  if (f < mulai || f >= selesai) return null;
  const e = move(f, mulai, 6, 'reveal');
  return <div style={{position: 'absolute', left: x, top: y, padding: '14px 20px', borderRadius: 18, background: '#1E1E1E', border: '1.5px solid #333333', display: 'flex', gap: 8, opacity: e, transform: `scale(${0.85 + 0.15 * e})`, transformOrigin: '0 100%'}}>
    {[0, 1, 2].map((i) => <div key={i} style={{width: 11, height: 11, borderRadius: 6, background: '#9A9A9A', opacity: 0.35 + 0.65 * Math.max(0, Math.sin((f - mulai) * 0.42 - i * 0.9))}}/>)}
  </div>;
};

/** garis pesan LANGSUNG antar-agen: titik-titik putih + aliran titik terang */
const Pesan: React.FC<{a: Pt; b: Pt; p: number; aliran?: number}> = ({a, b, p, aliran}) => (
  <>
    {p > 0.01 && <path d={`M${a.x} ${a.y} L${a.x + (b.x - a.x) * p} ${a.y + (b.y - a.y) * p}`} fill="none" stroke="#6A6A6A" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 13"/>}
    {aliran !== undefined && aliran > 0 && aliran < 1 && [0, 0.07, 0.14].map((o, i) => {
      const q = Math.min(1, Math.max(0, aliran - o));
      return <circle key={i} cx={a.x + (b.x - a.x) * q} cy={a.y + (b.y - a.y) * q} r={7 - i * 1.6} fill="#FFFFFF" opacity={q > 0 && q < 1 ? 0.95 - i * 0.25 : 0}/>;
    })}
  </>
);

/** berkas baca: cahaya lavender tipis dari kartu rak (bawah) naik ke agen (BUKAN garis pesan), titik terang berjalan di atasnya */
type Baca = {kartu: number; t0: number; ke: Pt; dari?: Pt; lama?: number};
const bez = (a: Pt, c1: Pt, c2: Pt, b: Pt, q: number): Pt => {
  const u = 1 - q;
  return {x: u * u * u * a.x + 3 * u * u * q * c1.x + 3 * u * q * q * c2.x + q * q * q * b.x, y: u * u * u * a.y + 3 * u * u * q * c1.y + 3 * u * q * q * c2.y + q * q * q * b.y};
};
const Berkas: React.FC<{f: number; fps: number; b: Baca}> = ({f, fps, b}) => {
  const a = b.dari ?? {x: kartuPos(b.kartu).x + kartuPos(b.kartu).w / 2, y: kartuPos(b.kartu).y};
  const c1 = {x: a.x, y: a.y - 70}, c2 = {x: b.ke.x, y: b.ke.y + 70};
  const p = move(f, b.t0, 12, 'land'), o = 1 - move(f, b.t0 + (b.lama ?? 1) * fps, 10, 'drift');
  if (p < 0.01 || o < 0.01) return null;
  const d = `M${a.x} ${a.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${b.ke.x} ${b.ke.y}`;
  const dot = bez(a, c1, c2, b.ke, p);
  return <g opacity={o}>
    <path d={d} fill="none" stroke={LAV} strokeWidth="9" strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} opacity={0.22} style={{filter: 'blur(4px)'}}/>
    <path d={d} fill="none" stroke={LAV} strokeWidth="2.2" strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`}/>
    <circle cx={dot.x} cy={dot.y} r={5} fill="#F3ECFF" style={{filter: 'drop-shadow(0 0 6px rgba(201,182,242,.95))'}}/>
  </g>;
};
const nyala = (f: number, fps: number, bs: Baca[], i: number) => bs.filter((b) => b.kartu === i).reduce((m, b) => {
  const k = move(f, b.t0 + 6, 8, 'land') * (1 - move(f, b.t0 + (b.lama ?? 1) * fps + 4, 14, 'drift'));
  return Math.max(m, k);
}, 0);

/** kamera [detik, skala, pusat x, pusat y, kurva]: selalu berpusat di papan aktif (tengah), push kecil tiap kelahiran, ikut kartu Dicatat turun ke rak, lalu mundur */
const kamera = (tw: number, K: RelayProps['kunci'], lahir: {A: number; B: number; D: number; C: number; terbang: number}, zb = 1.12) => {
  const kz = (zb - 1) / 0.12;
  const keys: [number, number, number, number, 'heavy' | 'drift'][] = [
    [0, 1.0, 960, 540, 'drift'], [lahir.A + 0.1, 1.02, 960, 530, 'heavy'], [lahir.A + 0.7, 1.09, 960, 515, 'drift'],
    [lahir.B, 1.09, 960, 515, 'heavy'], [lahir.B + 0.55, 1.12, 960, 505, 'drift'], [K.amplop2, 1.11, 960, 510, 'drift'],
    [lahir.D, 1.09, 960, 515, 'heavy'], [lahir.D + 0.55, 1.12, 960, 505, 'drift'],
    [lahir.terbang - 0.1, 1.12, 960, 520, 'heavy'], [lahir.terbang + 0.7, 1.1, 960, 560, 'drift'],
    [lahir.C - 0.1, 1.1, 960, 556, 'heavy'], [lahir.C + 0.5, 1.12, 960, 505, 'drift'],
    [K.selesai - 0.1, 1.13, 960, 505, 'heavy'], [K.selesai + 0.65, 1.0, 960, 540, 'drift'], [K.keluar, 1.02, 960, 540, 'drift']];
  for (const k of keys) { k[1] = 1 + (k[1] - 1) * kz; k[2] = Math.min(1920 - 960 / k[1], Math.max(960 / k[1], k[2])); k[3] = Math.min(1080 - 540 / k[1], Math.max(540 / k[1], k[3])); }
  let i = 0; while (i + 1 < keys.length && tw >= keys[i + 1][0]) i++;
  if (i + 1 >= keys.length) return {s: keys[i][1], x: keys[i][2], y: keys[i][3]};
  const [a, s0, x0, y0, kv] = keys[i], [b, s1, x1, y1] = keys[i + 1];
  const k = CURVE[kv](Math.min(1, Math.max(0, (tw - a) / Math.max(0.01, b - a))));
  return {s: s0 + (s1 - s0) * k, x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k};
};

const Wallpaper: React.FC = () => (
  <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0}}>
    <defs>
      <linearGradient id="wl" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5B7A4C"/><stop offset=".5" stopColor="#2C4026"/><stop offset="1" stopColor="#121C10"/></linearGradient>
      <filter id="wb" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    <rect width="1920" height="1080" fill="url(#wl)"/>
    <g filter="url(#wb)">
      {[[40, 150, '#3A2A1B'], [190, 110, '#24331F'], [1790, 120, '#3A2A1B'], [1660, 90, '#24331F'], [1880, 70, '#2E2216']].map(([x, w, c], i) =>
        <rect key={i} x={x as number} y={-40} width={w as number} height={1200} rx={30} fill={c as string}/>)}
      <ellipse cx="960" cy="0" rx="1000" ry="260" fill="#9DBB78" opacity=".35"/>
    </g>
  </svg>
);

const MenuBar: React.FC = () => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 36, background: 'rgba(18,22,16,.55)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 28, ...tx(19, 500, '#F4F4F4')}}>
    <svg width="18" height="21" viewBox="0 0 24 24"><path d={siApple.path} fill="#F4F4F4"/></svg>
    <span style={{fontWeight: 700}}>Claude</span>{['File', 'Edit', 'View', 'Window', 'Help'].map((m) => <span key={m}>{m}</span>)}
    <span style={{marginLeft: 'auto', display: 'flex', gap: 22, alignItems: 'center'}}>
      <svg width="24" height="18" viewBox="0 0 30 22"><path d="M2 8Q15-4 28 8M7 13Q15 6 23 13M12 18Q15 15 18 18" fill="none" stroke="#F4F4F4" strokeWidth="2.6" strokeLinecap="round"/></svg>
      <svg width="34" height="18" viewBox="0 0 40 22"><rect x="1" y="2" width="34" height="18" rx="5" fill="none" stroke="#F4F4F4" strokeWidth="2"/><rect x="4" y="5" width="20" height="12" rx="3" fill="#F4F4F4"/><rect x="36" y="8" width="3" height="6" rx="1.5" fill="#F4F4F4"/></svg>
      <span>Tue 17 Nov  10.01</span></span>
  </div>
);


/** satu kartu rak */
const KartuRak: React.FC<{i: number; nyala: number; tampil?: number; centang?: number}> = ({i, nyala: n, tampil = 1, centang = 0}) => {
  const p = kartuPos(i);
  return <div style={{position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, boxSizing: 'border-box', borderRadius: 12, background: '#28243A', border: `1.5px solid ${n > 0.05 ? LAV : '#4C4468'}`, opacity: tampil,
    transform: `translateY(${-8 * n}px) scale(${1 + 0.06 * n})`, boxShadow: `0 8px 16px rgba(0,0,0,.45)${n > 0.05 ? `, 0 0 ${30 * n}px rgba(201,182,242,${0.7 * n})` : ''}`, ...tx(20, 700, '#E6DDFF'), padding: '12px 14px'}}>
    {JUDUL[i]}
    {[0, 1, 2].map((k) => <div key={k} style={{height: 7, borderRadius: 4, background: '#3F3A58', marginTop: k ? 9 : 14, width: `${86 - k * 22}%`}}/>)}
    {centang > 0.02 && <svg width="30" height="30" viewBox="0 0 100 100" style={{position: 'absolute', right: 8, bottom: 8, transform: `scale(${centang})`}}><circle cx="50" cy="50" r="46" fill={HIJAU}/><path d="M27 51L44 68 75 33" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/></svg>}
  </div>;
};

// jaringan tumbuh: agen kecil di kiri dan kanan rak (seimbang 4 | 4), lahir bergelombang
const MINI: {m: 'claude' | 'codex' | 'gemini'; s: number; p: Pt}[] = [
  {m: 'claude', s: 5, p: {x: 300, y: 760}}, {m: 'codex', s: 6, p: {x: 1620, y: 760}}, {m: 'gemini', s: 7, p: {x: 180, y: 640}}, {m: 'gemini', s: 8, p: {x: 1740, y: 640}},
  {m: 'codex', s: 9, p: {x: 190, y: 890}}, {m: 'claude', s: 10, p: {x: 1730, y: 890}}, {m: 'claude', s: 11, p: {x: 355, y: 560}}, {m: 'codex', s: 12, p: {x: 1565, y: 560}}];

const Isi: React.FC<RelayProps & {f: number; durasiDunia: number}> = ({kunci: K, f, durasiDunia, zb}) => {
  const {fps} = useVideoConfig();
  const t = f / fps;
  const F = (s: number) => Math.round(s * fps);
  // urutan lahir (detik dunia), semua turunan dari kunci ucapan
  const lahirA = Math.min(0.35, Math.max(0.3, K.ketik1 - 0.5));   // Irfan 17 Nov: dunia masuk di jentikan -> papan ChatGPT lahir segera, dunia tidak kosong
  const lahirB = K.amplop1 + 0.05;
  const lahirD = K.pesan3 - 0.35;
  const terbang = K.catat + 0.55;                         // kartu Dicatat mulai terbang turun ke rak
  const mendarat = terbang + 0.95;
  const lahirC = Math.max(mendarat + 0.35, K.loop - 0.55);
  const tumbuh = K.selesai - 0.1;                          // kamera mundur, jaringan tumbuh
  const cam = kamera(t, K, {A: lahirA, B: lahirB, D: lahirD, C: lahirC, terbang}, zb);
  const masuk = move(f, 0, 16, 'heavy');
  const kMulai = durasiDunia - 0.5;                         // A3 ronde 4: dorongan keluar 0,5 dtk, kurva drift (tanpa percepatan mendadak) sampai frame terakhir dunia
  const keluar = move(f, F(kMulai), F(0.5), 'drift');
  const sc = cam.s * (1 + 0.10 * (1 - masuk) + 0.12 * keluar);
  const dd = drift(f, fps, 3, 2);
  const angkat = F(tumbuh);
  // jalur kedalaman tiap papan: aktif di tengah -> mundur ke kiri/kanan atas -> lebih jauh
  const jA: Jalur = [[0, 'akt'], [F(lahirB + 0.12), 'kiri'], [F(lahirC + 0.1), 'jauh']];
  const jB: Jalur = [[0, 'akt'], [F(lahirD + 0.1), 'kanan']];
  const jD: Jalur = [[0, 'akt'], [F(lahirC + 0.1), 'kiri']];
  const jC: Jalur = [[0, 'akt']];
  const kA = keadaan(f, jA, angkat), kB = keadaan(f, jB, angkat), kD = keadaan(f, jD, angkat);
  const aktBawah: Pt = {x: AC.x, y: AK.y + AK.h};
  // berkas baca: dari kartu rak NAIK ke papan aktif
  const baca: Baca[] = [
    {kartu: 0, t0: F(lahirA + 0.55), ke: aktBawah}, {kartu: 1, t0: F(lahirB + 0.9), ke: aktBawah}, {kartu: 2, t0: F(lahirD + 0.7), ke: aktBawah},
    {kartu: 5, t0: F(K.loop), ke: aktBawah, lama: 1.2},
    ...MINI.map((m, i): Baca => {
      const kiri = m.p.x < 960;
      return {kartu: i % 5, t0: F(tumbuh + 0.15) + react(i, fps), ke: {x: m.p.x + (kiri ? 50 : -50), y: m.p.y - 40}, dari: {x: kiri ? RAK.x : RAK.x + RAK.w, y: RAK.y + 50 + (i % 4) * 26}, lama: 2};
    }),
  ];
  const bacaP = (b: Baca) => move(f, b.t0 + 6, 8, 'land') * (1 - move(f, b.t0 + (b.lama ?? 1) * fps + 4, 14, 'drift'));
  const ln = (kartu: number) => nyala(f, fps, baca, kartu);
  const palA = bacaP(baca[0]), palB = bacaP(baca[1]), palD = bacaP(baca[2]), palC = bacaP(baca[3]);
  // garis pesan LANGSUNG antar-agen, dari pusat papan ke pusat papan (tertutup papan, hanya celahnya terlihat)
  const gAB = move(f, F(K.amplop1 - 0.2), 14, 'land');
  const gDB = move(f, F(K.pesan3 - 0.1), 14, 'land');
  const al1 = (t - K.amplop1) / 0.7, al2 = (t - K.amplop2) / 0.7, al3 = (t - (K.pesan3 + 0.2)) / 0.8;
  // kartu Dicatat: lahir di papan session B (aktif, tengah), terbang TURUN masuk slot rak
  const kRev = move(f, F(K.catat), 10, 'reveal'), kFly = move(f, F(terbang), F(0.95), 'heavy');
  const slot = kartuPos(5);
  const pill = {x: AC.x - 190, y: AK.y + 150, w: 380, h: 88};
  const kx = pill.x + (slot.x - pill.x) * kFly, ky = pill.y + (slot.y - pill.y) * kFly, kw = pill.w + (slot.w - pill.w) * kFly, kh = pill.h + (slot.h - pill.h) * kFly;
  const chk = move(f, F(K.selesai), 8, 'land');
  const chkRak = move(f, F(K.selesai + 0.1), 8, 'land');
  const eMini = (i: number) => move(f, F(tumbuh + 0.1) + react(i, fps), 14, 'land');
  const rakA = move(f, angkat, 24, 'drift');
  const isiPapan = (o: {model: 'claude' | 'codex'; id: string; seed: number; sudut: number; badge: 'claude' | 'chatgpt'; nama: string; emosi: [number, string][]; pal: number}) => <>
    <Plat x={AK.x} y={AK.y} w={AK.w} h={AK.h} baca={o.pal}/>
    <Karakter x={AC.x} model={o.model} id={o.id} seed={o.seed} u={15} t={t} sudut={o.sudut} emosi={o.emosi} selesai={K.selesai}/>
    <div style={{position: 'absolute', left: AK.x + AK.w - 62, top: AK.y + AK.h - 62}}><Badge jenis={o.badge}/></div>
    <Label x={AC.x} y={FY + 8}>{o.nama}</Label>
    {o.pal > 0.05 && <Chip x={AC.x + 84} y={FY - 180} k={o.pal} f={f}/>}
  </>;
  return <AbsoluteFill style={{background: '#121C10', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${960 - cam.x * sc + dd.x}px, ${540 - cam.y * sc + dd.y}px) scale(${sc})`}}>
      <Wallpaper/><MenuBar/>
      <div style={{position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, borderRadius: 16, background: '#161616', overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,.06), 0 6px 14px rgba(0,0,0,.35), 0 30px 70px rgba(0,0,0,.5)'}}>
        <div style={{height: BAR, display: 'flex', alignItems: 'center', padding: '0 16px', background: '#1C1C1C', borderBottom: '1px solid #262626'}}><Titik/></div>
        <svg width={WIN.w} height={WIN.h - BAR} style={{position: 'absolute', left: 0, top: BAR}}>
          <defs><pattern id="dot" width="44" height="44" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#2A2A2A"/></pattern></defs>
          <rect width={WIN.w} height={WIN.h} fill="url(#dot)"/>
        </svg>
      </div>
      {/* lapis paling belakang: rak perpustakaan di bawah tengah (sedikit redup; menyala bila dibaca; terangkat saat kamera mundur) */}
      <div style={{position: 'absolute', inset: 0, zIndex: 10, transformOrigin: `${RAK.x + RAK.w / 2}px ${RAK.y + RAK.h / 2}px`, transform: 'scale(0.96)',
        filter: `blur(${1.4 * (1 - rakA)}px) brightness(${0.86 + 0.14 * rakA})` /* motion-ok: kedalaman rak lapis belakang, bukan blur masuk */}}>
        <div style={{position: 'absolute', left: RAK.x, top: RAK.y, width: RAK.w, height: RAK.h, borderRadius: 22, background: 'linear-gradient(#1F1B2C, #171421)', border: '1.5px solid #3A3550', boxShadow: bayang}}/>
        <div style={{position: 'absolute', left: RAK.x, width: RAK.w, top: RAK.y + 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, ...tx(22, 600, LAV)}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={LAV} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3h14v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M7 3v10M7 20h6"/></svg>skill-development</div>
        {[0, 1, 2, 3, 4].map((i) => <KartuRak key={i} i={i} nyala={ln(i)}/>)}
        <div style={{position: 'absolute', left: slot.x, top: slot.y, width: slot.w, height: slot.h, boxSizing: 'border-box', borderRadius: 12, border: '2px dashed #3F3A58', opacity: kFly > 0.97 ? 0 : 1}}/>
        {kFly > 0.97 && <KartuRak i={5} nyala={Math.max(ln(5), 0.9 * (1 - move(f, F(mendarat + 0.35), 14, 'drift')))} tampil={1} centang={chkRak}/>}
      </div>
      {/* garis pesan langsung + berkas baca (di atas rak, di belakang papan) */}
      <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', zIndex: 20}}>
        <Pesan a={pusatDi(kA)} b={pusatDi(kB)} p={gAB} aliran={al1 > 0 && al1 < 1 ? al1 : al2 > 0 && al2 < 1 ? 1 - al2 : undefined}/>
        {f >= F(lahirD) && <Pesan a={pusatDi(kD)} b={pusatDi(kB)} p={gDB} aliran={al3 > 0 && al3 < 1 ? al3 : undefined}/>}
        {baca.map((b, i) => <Berkas key={i} f={f} fps={fps} b={b}/>)}
      </svg>
      {/* papan ChatGPT: lahir pertama, sendirian di tengah */}
      <Papan f={f} lahir={F(lahirA)} asal={AC} jalur={jA} angkat={angkat}>
        {isiPapan({model: 'codex', id: 'b5-codex', seed: 2, sudut: 0.125, badge: 'chatgpt', nama: 'ChatGPT', pal: palA,
          emosi: [[0, 'thinking'], [K.pesan1 - 0.1, 'neutral'], [K.pesan2, 'surprised'], [K.pesan2 + 0.6, 'happy'], [K.selesai, 'excited']]})}
        <Ketik f={f} mulai={F(K.ketik1)} selesai={F(K.pesan1)} x={AK.x + 20} y={AK.y + 70}/>
        <Gelembung f={f} mulai={F(K.pesan1)} x={AK.x + 20} y={AK.y + 16} lebar={AK.w - 40}>doctor.sh gagal: 8 skill berupa salinan, bukan symlink. Boleh menjalankan --fix?</Gelembung>
      </Papan>
      {/* papan Claude: lahir dari ujung garis pesan (kanan), ChatGPT mundur ke kiri-atas */}
      <Papan f={f} lahir={F(lahirB)} asal={{x: 1500, y: AC.y}} jalur={jB} angkat={angkat}>
        {isiPapan({model: 'claude', id: 'b5-claude', seed: 1, sudut: -0.125, badge: 'claude', nama: 'Claude', pal: palB,
          emosi: [[0, 'neutral'], [K.amplop1 + 0.4, 'surprised'], [K.ketik2, 'thinking'], [K.pesan2 + 0.2, 'neutral'], [K.selesai, 'happy']]})}
        <Ketik f={f} mulai={F(K.ketik2)} selesai={F(K.pesan2)} x={AK.x + 20} y={AK.y + 70}/>
        <Gelembung f={f} mulai={F(K.pesan2)} x={AK.x + 20} y={AK.y + 16} lebar={AK.w - 40} label={false}>Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK.</Gelembung>
      </Papan>
      {/* papan session B (ChatGPT di sesi lain): lahir dari kiri, Claude mundur ke kanan-atas */}
      <Papan f={f} lahir={F(lahirD)} asal={{x: 420, y: AC.y}} jalur={jD} angkat={angkat}>
        {isiPapan({model: 'codex', id: 'b5-codex-b', seed: 4, sudut: 0.125, badge: 'chatgpt', nama: 'session B', pal: palD, emosi: [[0, 'neutral'], [K.pesan3 + 0.1, 'happy']]})}
        <Gelembung f={f} mulai={F(K.pesan3)} x={AK.x + 20} y={AK.y + 16} lebar={AK.w - 40}>Revisi kamera selesai; lima still tersedia.</Gelembung>
      </Papan>
      {/* kartu Dicatat: ditulis di papan session B lalu terbang turun masuk rak */}
      {f >= F(K.catat) && kFly < 0.995 && <div style={{position: 'absolute', zIndex: 200, left: kx, top: ky, width: kw, height: kh, opacity: kRev > 0.02 ? 1 : 0, filter: `blur(${(1 - kRev) * 8}px)`, // motion-ok: MG63 §2 masuk blur→tajam (reveal)
        boxSizing: 'border-box', borderRadius: 18 - 6 * kFly, background: kFly > 0.6 ? '#28243A' : '#1E1E1E', border: `1.5px solid ${LAV}`, boxShadow: `0 14px 34px rgba(0,0,0,.45), 0 0 ${22 + 10 * kFly}px rgba(201,182,242,.5)`,
        display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', overflow: 'hidden', ...tx(kFly > 0.6 ? 20 : 21, 600), lineHeight: 1.25}}>
        {kFly <= 0.6 ? <><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={LAV} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}><path d="M4 3h14v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M7 3v10M7 20h6"/></svg><span>Dicatat: jangan menyalin, pakai tautan supaya tidak terulang</span></>
          : <span style={{color: '#E6DDFF'}}>Dicatat</span>}
      </div>}
      {/* papan session C: naik dari kartu baru di rak ke tengah, membaca kartu -> langsung benar (centang); session B mundur ke kiri-atas, ChatGPT lebih jauh */}
      <Papan f={f} lahir={F(lahirC)} asal={{x: slot.x + slot.w / 2, y: slot.y + slot.h / 2}} jalur={jC} angkat={angkat}>
        {isiPapan({model: 'codex', id: 'b5-codex-c', seed: 6, sudut: -0.125, badge: 'chatgpt', nama: 'session C', pal: palC, emosi: [[0, 'thinking'], [K.loop + 0.4, 'surprised'], [K.selesai, 'happy']]})}
        <Gelembung f={f} mulai={F(K.loop + 0.35)} x={AK.x + 20} y={AK.y + 16} lebar={AK.w - 40} label={false}>Dicatat: jangan menyalin, pakai tautan supaya tidak terulang</Gelembung>
        {chk > 0.02 && <svg width="64" height="64" viewBox="0 0 100 100" style={{position: 'absolute', left: AK.x + AK.w - 150, top: FY - 120, transform: `scale(${chk})`}}><circle cx="50" cy="50" r="46" fill={HIJAU}/><path d="M27 51L44 68 75 33" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </Papan>
      {/* jaringan tumbuh: agen-agen kecil lahir bergelombang di kiri & kanan rak, semua membaca rak yang sama */}
      {MINI.map((m, i) => {
        const e = eMini(i);
        if (e < 0.02) return null;
        const ax = m.p.x < 960 ? RAK.x : RAK.x + RAK.w;
        return <div key={i} style={{position: 'absolute', inset: 0, zIndex: 300, transformOrigin: `${m.p.x}px ${m.p.y - 20}px`, opacity: e,
          transform: `translate(${(ax - m.p.x) * (1 - e) * 0.5}px, ${(RAK.y + 80 - m.p.y) * (1 - e) * 0.5}px) scale(${0.4 + 0.6 * e})`}}>
          <KarakterX model={m.m} id={`b5-mini-${i}`} x={m.p.x} y={m.p.y} u={6.4} t={t} sudut={m.p.x < 960 ? 0.125 : -0.125} seed={m.s} emosi={[[0, 'neutral'], [K.selesai + 0.5 + i * 0.05, 'happy']]}/>
        </div>;
      })}
    </div>
  </AbsoluteFill>;
};

/** kartu kecil lavender yang melayang dekat kepala agen yang sedang membaca */
const Chip: React.FC<{x: number; y: number; k: number; f: number}> = ({x, y, k, f}) => (
  <div style={{position: 'absolute', left: x, top: y - 6 * Math.sin(f * 0.18), width: 34, height: 44, borderRadius: 7, background: '#28243A', border: `2px solid ${LAV}`, opacity: k, transform: `scale(${0.6 + 0.4 * k})`,
    boxShadow: '0 0 16px rgba(201,182,242,.7)'}}>
    {[0, 1, 2].map((i) => <div key={i} style={{height: 4, borderRadius: 2, background: LAV, margin: `${i ? 5 : 9}px 6px 0`, opacity: 0.8}}/>)}
  </div>
);

/** karakter di dalam papan: kaki di (x, fy) koordinat layar */
/** D-401: tiap pergantian emosi tokoh di papan memunculkan emote yang terbaca (!, bubble ..., ✦, ♪, ✓ saat selesai); skala disesuaikan ukuran papan (>= 22 px tinggi) */
const emoteDari = (emosi: [number, string][], selesai: number): EmoteJadwal[] => emosi.slice(1).map(([t, e], i): EmoteJadwal => {
  const nxt = emosi[i + 2] ? emosi[i + 2][0] : Infinity;                       // emote tidak melewati pergantian emosi berikut (satu emote per waktu)
  const lama = (d: number) => Math.max(0.18, Math.min(d, nxt - t - 0.08));
  return Math.abs(t - selesai) < 0.02 ? [t + 0.05, 'centang', lama(1.3), 1.1]
    : e === 'surprised' ? [t + 0.05, 'seru', lama(1.0), 1.25] : e === 'thinking' ? [t + 0.05, 'tanya', lama(1.0), 1.25] : e === 'excited' ? [t + 0.05, 'nada', lama(0.9), 1.2] : [t + 0.05, 'bintang', lama(0.9), 1.15];
});
const Karakter: React.FC<{x: number; fy?: number; model: 'claude' | 'codex' | 'gemini'; id: string; seed: number; u: number; t: number; sudut: number; emosi: [number, string][]; selesai: number}> = ({x, fy = FY, selesai, ...p}) =>
  <KarakterX x={x} y={fy} {...p} emote={emoteDari(p.emosi, selesai)}/>;

export const RelayDunia: React.FC<RelayProps> = (p) => {
  const fAll = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dunia = Math.round(p.durasi * fps) - p.pre - p.post;
  if (fAll < p.pre) return <AbsoluteFill><Fonts/><WajahDorong f={fAll} t0={p.preT0} dari={p.zPre} ke={1.7} frames={p.pre}/></AbsoluteFill>;
  const f = fAll - p.pre;
  if (f >= dunia) return <AbsoluteFill><Fonts/><WajahDorong f={f - dunia} t0={p.postT0} dari={1.7} ke={1.0} frames={p.post}/></AbsoluteFill>;
  const blur = f < 18 || f >= Math.round((dunia / fps - 0.5) * fps) - 2;
  return <AbsoluteFill><Fonts/>{blur ? <CameraMotionBlur shutterAngle={220} samples={8}><Isi {...p} durasiDunia={dunia / fps} f={f}/></CameraMotionBlur> : <Isi {...p} durasiDunia={dunia / fps} f={f}/>}</AbsoluteFill>;
};
