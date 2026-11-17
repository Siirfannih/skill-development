// B5b · REVISI-1 B11 (diganti): desktop Mac (bilah menu macOS + wallpaper hutan) dengan SATU jendela gelap berisi jaringan agen (gaya openbot.run, hanya gaya).
// Pusat = node "skill-development"; agen = karakter 2D kita + lencana logo asli (Claude, ChatGPT, Gemini), garis titik-titik ke pusat.
// Pesan ASLI (handoff/PAHAM-SKILL-DEV.md §D) di gelembung gelap kecil di samping agen pengirim; satu gelembung aktif per saat, kamera pindah antar-gelembung (heavy).
// "session berbeda" -> node ChatGPT kedua "session B"; "loop pembelajaran" -> garis menutup jadi loop + kartu "Dicatat…" + centang; lalu node merapat jadi bingkai workspace.
// Tata letak dijaga supaya pita KT bawah (y > 940 layar) selalu kosong.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {siApple, siClaude, siGooglegemini} from 'simple-icons';
import {CURVE, drift, move} from '../lib/curves';
import {Karakter2D} from '../papan/karakter2d/Karakter2D';
import {Fonts} from './bersama/Fonts';
import {LogoChatGPT} from './bersama/LogoChatGPT';
import {Titik} from './bersama/Jendela';
import {FONT, HIJAU} from './bersama/tema';
import {WajahDorong} from './bersama/WajahDorong';

export type RelayProps = {
  /** total frame lapisan = pre + dunia + post; durasi (detik) = total */
  durasi: number;
  pre: number; post: number; preT0: number; postT0: number; zPre: number;
  kunci: {ketik1: number; pesan1: number; amplop1: number; ketik2: number; pesan2: number; amplop2: number; pesan3: number; catat: number; loop: number; selesai: number; keluar: number};
};

type Pt = {x: number; y: number};
const WIN = {x: 150, y: 64, w: 1620, h: 880};             // jendela gelap (koordinat layar 1920x1080 sebelum kamera)
const BAR = 40;
// kaki karakter / pusat node, koordinat layar
const C0: Pt = {x: 960, y: 520};
const A0: Pt = {x: 450, y: 700}, B0: Pt = {x: 1470, y: 700}, D0: Pt = {x: 450, y: 330}, G0: Pt = {x: 1490, y: 300};
// posisi rapat (workspace)
const A1: Pt = {x: 700, y: 660}, B1: Pt = {x: 1220, y: 660}, D1: Pt = {x: 700, y: 400}, G1: Pt = {x: 1220, y: 400}, C1: Pt = {x: 960, y: 520};
const tx = (s: number, w = 400, c = '#ECECEC'): React.CSSProperties => ({fontFamily: FONT.inter, fontSize: s, fontWeight: w, color: c, letterSpacing: -0.2});

const Badge: React.FC<{jenis: 'claude' | 'chatgpt' | 'gemini'; s?: number}> = ({jenis, s = 40}) => (
  <div style={{width: s, height: s, borderRadius: s / 2, background: '#232323', border: '1.5px solid #3C3C3C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,.4)'}}>
    {jenis === 'claude' ? <svg width={s * 0.58} height={s * 0.58} viewBox="0 0 24 24"><path d={siClaude.path} fill="#D97757"/></svg>
      : jenis === 'gemini' ? <svg width={s * 0.6} height={s * 0.6} viewBox="0 0 24 24"><path d={siGooglegemini.path} fill="#8AB4F8"/></svg>
      : <LogoChatGPT size={s * 0.6} warna="#F2F2F2"/>}
  </div>
);

const Label: React.FC<{p: Pt; dy: number; children: React.ReactNode; o?: number}> = ({p, dy, children, o = 1}) => (
  <div style={{position: 'absolute', left: p.x - 200, top: p.y + dy, width: 400, textAlign: 'center', opacity: o, ...tx(25, 500, '#D6D6D6')}}>{children}</div>
);

/** gelembung gelap kecil (openbot): muncul dari sisi agen, keluar ke atas; satu aktif per saat */
const Gelembung: React.FC<{f: number; mulai: number; selesai: number; x: number; y: number; lebar: number; asal: 'bawah' | 'kiri'; label?: boolean; children: React.ReactNode}> =
  ({f, mulai, selesai, x, y, lebar, asal, label = true, children}) => {
    if (f < mulai - 1 || f >= selesai + 8) return null;
    const e = move(f, mulai, 9, 'reveal'), k = move(f, selesai, 7, 'leave');
    const o = asal === 'bawah' ? '30% 100%' : '0% 70%';
    return <div style={{position: 'absolute', left: x, top: y, width: lebar, opacity: e > 0.02 && k < 0.98 ? 1 : 0, filter: `blur(${(1 - e) * 8 + k * 6}px)`, transformOrigin: o, // motion-ok: MG63 §2 masuk blur→tajam ±6–9 f (reveal)
      transform: `translate(${asal === 'kiri' ? -18 * (1 - e) : 0}px, ${(asal === 'bawah' ? 16 * (1 - e) : 0) - 14 * k}px) scale(${0.9 + 0.1 * e})`}}>
      {label && <div style={{display: 'flex', alignItems: 'center', gap: 8, ...tx(19, 400, '#8E8E8E'), marginBottom: 8, paddingLeft: 4}}><LogoChatGPT size={18} warna="#8E8E8E"/>Sent by ChatGPT from another chat</div>}
      <div style={{padding: '16px 22px', borderRadius: 18, background: '#1E1E1E', border: '1.5px solid #333333', ...tx(31), lineHeight: 1.32, boxShadow: '0 14px 34px rgba(0,0,0,.45)'}}>{children}</div>
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

/** garis titik-titik + aliran titik terang (pesan berjalan) */
const Garis: React.FC<{a: Pt; b: Pt; p: number; aliran?: number}> = ({a, b, p, aliran}) => {
  const L = Math.hypot(b.x - a.x, b.y - a.y);
  const d = `M${a.x} ${a.y} L${a.x + (b.x - a.x) * p} ${a.y + (b.y - a.y) * p}`;
  return <>
    {p > 0.01 && <path d={d} fill="none" stroke="#585858" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 13"/>}
    {aliran !== undefined && aliran > 0 && aliran < 1 && [0, 0.07, 0.14].map((o, i) => {
      const q = Math.min(1, Math.max(0, aliran - o));
      return <circle key={i} cx={a.x + (b.x - a.x) * q} cy={a.y + (b.y - a.y) * q} r={7 - i * 1.6} fill="#FFFFFF" opacity={q > 0 && q < 1 ? 0.95 - i * 0.25 : 0}/>;
    })}
    <desc>{L}</desc>
  </>;
};

/** kurva tertutup halus melewati titik-titik (Catmull-Rom -> Bezier) */
const loopD = (ps: Pt[]) => {
  const n = ps.length; let d = `M${ps[0].x} ${ps[0].y}`;
  for (let i = 0; i < n; i++) {
    const p0 = ps[(i - 1 + n) % n], p1 = ps[i], p2 = ps[(i + 1) % n], p3 = ps[(i + 2) % n];
    d += ` C${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6} ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6} ${p2.x} ${p2.y}`;
  }
  return d + 'Z';
};

/** kamera [detik, skala, pusat x, pusat y]; skala 1,45 menjaga tepi wallpaper (pusat x 662–1258, y 372–708) */
const kamera = (tw: number, K: RelayProps['kunci']) => {
  const keys: [number, number, number, number, 'heavy' | 'drift'][] = [
    [0, 1.0, 960, 540, 'drift'], [K.ketik1 - 0.25, 1.02, 960, 540, 'heavy'], [K.ketik1 + 0.25, 1.45, 680, 540, 'drift'], [K.amplop1 - 0.05, 1.47, 690, 540, 'heavy'],
    [K.amplop1 + 0.55, 1.18, 960, 560, 'drift'], [K.ketik2 - 0.05, 1.18, 960, 560, 'heavy'], [K.ketik2 + 0.4, 1.45, 1240, 540, 'drift'], [K.pesan3 - 0.55, 1.47, 1230, 540, 'heavy'],
    [K.pesan3 - 0.05, 1.45, 790, 390, 'drift'], [K.catat - 0.45, 1.47, 800, 395, 'heavy'], [K.catat + 0.1, 1.08, 960, 530, 'drift'], [K.loop - 0.1, 1.1, 960, 530, 'heavy'],
    [K.selesai + 0.5, 1.0, 960, 540, 'drift'], [K.keluar, 1.04, 960, 540, 'drift']];   // loop + workspace: kembali ke desktop utuh (bilah menu + wallpaper terlihat)
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

const Isi: React.FC<RelayProps & {f: number; durasiDunia: number}> = ({kunci: K, f, durasiDunia}) => {
  const {fps} = useVideoConfig();
  const t = f / fps;
  const F = (s: number) => Math.round(s * fps);
  const cam = kamera(t, K);
  const masuk = move(f, 0, 16, 'heavy');
  const keluar = move(f, F(K.keluar), F(durasiDunia - K.keluar), 'heavy');
  const sc = cam.s * (1 + 0.10 * (1 - masuk) + 0.12 * keluar);
  const dd = drift(f, fps, 3, 2);
  const rapat = move(f, F(K.selesai + 0.25), 22, 'heavy');
  const mix = (a: Pt, b: Pt): Pt => ({x: a.x + (b.x - a.x) * rapat, y: a.y + (b.y - a.y) * rapat});
  const A = mix(A0, A1), B = mix(B0, B1), D = mix(D0, D1), G = mix(G0, G1), C = mix(C0, C1);
  // garis ke pusat (dari tengah badan, bukan kaki)
  const badan = (p: Pt, h: number): Pt => ({x: p.x, y: p.y - h});
  const gA = move(f, 6, 14, 'land'), gB = move(f, 10, 14, 'land'), gG = move(f, 14, 14, 'land');
  const dMuncul = move(f, F(K.pesan3 - 0.55), 12, 'land');
  const gD = move(f, F(K.pesan3 - 0.4), 12, 'land');
  const al1 = (t - K.amplop1) / 0.75, al2 = (t - K.amplop2) / 0.75;      // Codex -> pusat -> Claude, lalu balik
  const loopP = move(f, F(K.loop), 26, 'land');
  const chk = move(f, F(K.selesai), 8, 'land');
  const catat = move(f, F(K.catat), 12, 'reveal');
  const bingkai = move(f, F(K.selesai + 0.45), 16, 'land');
  const luar = (p: Pt, h: number): Pt => {const q = badan(p, h); return {x: q.x + (q.x - C.x) * 0.16, y: q.y + (q.y - C.y) * 0.16};};
  const loopPts = [luar(A, 70), luar(D, 70), luar(G, 60), luar(B, 60)];
  const terbit = (d: number) => move(f, d, 12, 'land');
  const mask = (p: number): React.CSSProperties => ({opacity: p > 0.02 ? 1 : 0, transform: `scale(${0.8 + 0.2 * p})`});
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
      {/* isi jaringan (koordinat layar; jendela tidak memotong karena semua di dalam batasnya) */}
      <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <Garis a={badan(A, 70)} b={C} p={gA} aliran={al1 < 0.5 ? al1 * 2 : al2 > 0.5 ? (al2 - 0.5) * 2 : undefined}/>
        <Garis a={C} b={badan(B, 60)} p={gB} aliran={al1 >= 0.5 ? (al1 - 0.5) * 2 : al2 < 0.5 ? al2 * 2 : undefined}/>
        <Garis a={badan(G, 60)} b={C} p={gG}/>
        <Garis a={badan(D, 70)} b={C} p={gD}/>
        {loopP > 0 && <path d={loopD(loopPts)} fill="none" stroke="#7A7A7A" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray={`${loopP} 1`} opacity={0.9}/>}
        {loopP > 0 && <path d={loopD(loopPts)} fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" pathLength={1} strokeDasharray="0.05 0.95" strokeDashoffset={-((t - K.loop) * 0.45) % 1} opacity={loopP * 0.9}/>}
        {bingkai > 0.01 && <rect x={C1.x - 400} y={C1.y - 312} width={800} height={567} rx={28} fill="none" stroke="#6E6E6E" strokeWidth="2.5" opacity={bingkai}
          transform={`translate(${C1.x} ${C1.y}) scale(${1.08 - 0.08 * bingkai}) translate(${-C1.x} ${-C1.y})`}/>}
      </svg>
      {bingkai > 0.01 && <div style={{position: 'absolute', left: C1.x - 392, top: C1.y + 266, opacity: bingkai, ...tx(22, 500, '#9A9A9A')}}>workspace</div>}
      {/* node pusat */}
      <div style={{position: 'absolute', left: C.x - 52, top: C.y - 52, width: 104, height: 104, borderRadius: 24, background: '#C9B6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', ...mask(terbit(0))}}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3h14v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M7 3v10M7 20h6"/></svg></div>
      <Label p={C} dy={66}>skill-development</Label>
      {/* agen */}
      <Karakter2D model="codex" id="b5-codex" x={A.x} y={A.y} u={15} t={t} sudut={0.125} seed={2} emosi={[[0, 'thinking'], [K.pesan1 - 0.1, 'neutral'], [K.pesan2, 'surprised'], [K.pesan2 + 0.6, 'happy'], [K.selesai, 'excited']]}/>
      <div style={{position: 'absolute', left: A.x + 44, top: A.y - 168}}><Badge jenis="chatgpt"/></div>
      <Label p={A} dy={-12}>ChatGPT</Label>
      <Karakter2D model="claude" id="b5-claude" x={B.x} y={B.y} u={17} t={t} sudut={-0.125} seed={1} emosi={[[0, 'neutral'], [K.amplop1 + 0.4, 'surprised'], [K.ketik2, 'thinking'], [K.pesan2 + 0.2, 'neutral'], [K.selesai, 'happy']]}/>
      <div style={{position: 'absolute', left: B.x + 58, top: B.y - 158}}><Badge jenis="claude"/></div>
      <Label p={B} dy={6}>Claude</Label>
      <div style={mask(terbit(8))}>
        <Karakter2D model="gemini" id="b5-gemini" x={G.x} y={G.y} u={12} t={t} sudut={-0.125} seed={3} emosi={[[0, 'neutral'], [K.selesai, 'happy']]}/>
        <div style={{position: 'absolute', left: G.x + 40, top: G.y - 140}}><Badge jenis="gemini"/></div>
        <Label p={G} dy={-8}>Gemini</Label>
      </div>
      {dMuncul > 0.02 && <div style={{opacity: dMuncul > 0.02 ? 1 : 0, transform: `scale(${0.7 + 0.3 * dMuncul})`, transformOrigin: `${D.x}px ${D.y - 70}px`}}>
        <Karakter2D model="codex" id="b5-codex-b" x={D.x} y={D.y} u={15} t={t} sudut={0.125} seed={4} emosi={[[0, 'neutral'], [K.pesan3 + 0.1, 'happy']]}/>
        <div style={{position: 'absolute', left: D.x + 44, top: D.y - 168}}><Badge jenis="chatgpt"/></div>
        <Label p={D} dy={-12}>session B</Label></div>}
      {/* pesan asli: satu aktif per saat, di samping pengirim */}
      <Ketik f={f} mulai={F(K.ketik1)} selesai={F(K.pesan1)} x={A0.x - 230} y={A0.y - 270}/>
      <Gelembung f={f} mulai={F(K.pesan1)} selesai={F(K.ketik2 - 0.1)} x={A0.x - 240} y={A0.y - 395} lebar={560} asal="bawah">doctor.sh gagal: 8 skill berupa salinan, bukan symlink. Boleh menjalankan --fix?</Gelembung>
      <Ketik f={f} mulai={F(K.ketik2)} selesai={F(K.pesan2)} x={B0.x - 300} y={B0.y - 270}/>
      <Gelembung f={f} mulai={F(K.pesan2)} selesai={F(K.pesan3 - 0.6)} x={B0.x - 310} y={B0.y - 360} lebar={560} asal="bawah" label={false}>Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK.</Gelembung>
      <Gelembung f={f} mulai={F(K.pesan3)} selesai={F(K.catat - 0.45)} x={D0.x + 110} y={D0.y - 175} lebar={540} asal="kiri">Revisi kamera selesai; lima still tersedia.</Gelembung>
      {f >= F(K.catat) && <div style={{position: 'absolute', left: 960 - 390, top: 96, width: 780, opacity: catat > 0.02 ? 1 : 0, filter: `blur(${(1 - catat) * 8}px)`, transform: `translateY(${-16 * (1 - catat)}px)`, // motion-ok: MG63 §2 masuk blur→tajam (reveal)
        display: 'flex', alignItems: 'center', gap: 18, padding: '16px 24px', borderRadius: 18, background: '#1E1E1E', border: '1.5px solid #333333', boxShadow: '0 14px 34px rgba(0,0,0,.45)', ...tx(28, 500)}}>
        <div style={{width: 44, height: 44, flexShrink: 0, position: 'relative'}}>
          <svg width="44" height="44" viewBox="0 0 100 100" style={{position: 'absolute', transform: `scale(${chk})`}}><circle cx="50" cy="50" r="46" fill={HIJAU}/><path d="M27 51L44 68 75 33" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <svg width="44" height="44" viewBox="0 0 100 100" style={{position: 'absolute', opacity: 1 - chk}}><circle cx="50" cy="50" r="44" fill="none" stroke="#555" strokeWidth="5"/></svg>
        </div>
        <span>Dicatat: jangan menyalin, pakai tautan supaya tidak terulang</span></div>}
    </div>
  </AbsoluteFill>;
};

export const RelayDunia: React.FC<RelayProps> = (p) => {
  const fAll = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dunia = Math.round(p.durasi * fps) - p.pre - p.post;
  if (fAll < p.pre) return <AbsoluteFill><Fonts/><WajahDorong f={fAll} t0={p.preT0} dari={p.zPre} ke={1.7} frames={p.pre}/></AbsoluteFill>;
  const f = fAll - p.pre;
  if (f >= dunia) return <AbsoluteFill><Fonts/><WajahDorong f={f - dunia} t0={p.postT0} dari={1.7} ke={1.0} frames={p.post}/></AbsoluteFill>;
  const blur = f < 18 || f >= Math.round(p.kunci.keluar * fps) - 2;
  return <AbsoluteFill><Fonts/>{blur ? <CameraMotionBlur shutterAngle={220} samples={8}><Isi {...p} durasiDunia={dunia / fps} f={f}/></CameraMotionBlur> : <Isi {...p} durasiDunia={dunia / fps} f={f}/>}</AbsoluteFill>;
};
