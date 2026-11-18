// B7 · desktop agen (D-418, D-419, D-426; kartu 63 invideo k4–k7 + kartu 07 adegan UI): latar hitam + glow merek (keluarga gelap-glow, sama dengan B1/B3),
// tiga jendela app ASLI dengan logo asli: ChatGPT "session A" (kiri), Claude (tengah), ChatGPT "session B" (masuk belakangan dari kanan, mendorong yang lain).
// Papan skill-development = panel dok di bawah (tab LANTAI, kartu kiblat, RESEP, orkestrasi, DESAIN, lalu "Dicatat" mendarat).
// 3 lapis: jendela aktif di depan dan tajam; jendela lain mundur (kecil, sedikit buram, redup). Kamera tak pernah diam: push pelan, geser lateral mengikuti pesan,
// mundur di babak baru. Tanpa panah goresan (D-419): penunjuk arah = pesan yang meluncur dan cincin jalur di akhir.
// Avatar tiap jendela = tokoh pixel kecil dengan emosi (Claude bete -> lega, ChatGPT senang).
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {siClaude} from 'simple-icons';
import {CURVE, arc, drift, move} from '../lib/curves';
import {Fonts} from './bersama/Fonts';
import {KarakterX} from './bersama/KarakterPixel';
import {type EmoteJadwal} from '../papan/karakter2d/Karakter2D';
import {LogoChatGPT} from './bersama/LogoChatGPT';
import {Titik} from './bersama/Jendela';
import {WajahDorong} from './bersama/WajahDorong';
import {FONT, HIJAU} from './bersama/tema';

export type DesktopProps = {
  durasi: number;
  pre: number; post: number; preT0: number; postT0: number; zPre: number;
  /** detik relatif dunia: ketik1 (ChatGPT mulai mengetik), kirim1, tiba1 (di Claude), ketik2, kirim2, tiba2 (di ChatGPT), masukB (session B), ketikN (catatan), kirimN, tibaN (di dok), loop (kamera mundur), ok (centang), keluar */
  kunci: {ketik1: number; kirim1: number; tiba1: number; ketik2: number; kirim2: number; tiba2: number; masukB: number; ketikN: number; kirimN: number; tibaN: number; loop: number; ok: number; keluar: number};
};

const LAV = '#C9B6F2';
const ORG = '#D97757';
const MSG1 = 'Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK.';
const MSG2 = 'Revisi kamera selesai, lima still tersedia.';
const MSGN = 'Dicatat: jangan menyalin, pakai tautan supaya tidak terulang';
const WW = 540, WH = 540, WY = 150, HEAD = 44;
const BUB = {w: 440, h: 84, s1: 214, s2: 310};
const INPUT = {y: 408, h: 72};
const SLOT = {A0: 670, C0: 1250, A1: 380, C1: 960, B1: 1540};
const DOCK = {x: 110, y: 722, w: 1700, h: 120};
const TABS = ['LANTAI', 'kartu kiblat', 'RESEP', 'orkestrasi', 'DESAIN', 'Dicatat'];
const tabX = (i: number) => 410 + i * 228;
const RING = {x0: 70, y0: 108, x1: 1850, y1: 880, r: 40};
const tx = (s: number, w = 400, c = '#ECECEC'): React.CSSProperties => ({fontFamily: FONT.inter, fontSize: s, fontWeight: w, color: c, letterSpacing: -0.2});
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** titik pada cincin (persegi bulat) menurut u 0..1, mulai di tengah atas, searah jarum jam */
const ringPt = (u: number) => {
  const {x0, y0, x1, y1, r} = RING;
  const q = Math.PI * r / 2, top = (x1 - x0) / 2 - r, vert = y1 - y0 - 2 * r, bot = x1 - x0 - 2 * r;
  const segs: [number, (s: number) => [number, number]][] = [
    [top, (s) => [(x0 + x1) / 2 + s, y0]],
    [q, (s) => [x1 - r + r * Math.sin(s / r), y0 + r - r * Math.cos(s / r)]],
    [vert, (s) => [x1, y0 + r + s]],
    [q, (s) => [x1 - r + r * Math.cos(s / r), y1 - r + r * Math.sin(s / r)]],
    [bot, (s) => [x1 - r - s, y1]],
    [q, (s) => [x0 + r - r * Math.sin(s / r), y1 - r + r * Math.cos(s / r)]],
    [vert, (s) => [x0, y1 - r - s]],
    [q, (s) => [x0 + r - r * Math.cos(s / r), y0 + r - r * Math.sin(s / r)]],
    [top, (s) => [x0 + r + s, y0]],
  ];
  const total = segs.reduce((a, s) => a + s[0], 0);
  let d = ((u % 1) + 1) % 1 * total;
  for (const [len, fn] of segs) { if (d <= len) return fn(d); d -= len; }
  return fn0();
  function fn0(): [number, number] { return [(x0 + x1) / 2, y0]; }
};
const RING_D = `M960 ${RING.y0} H${RING.x1 - RING.r} A${RING.r} ${RING.r} 0 0 1 ${RING.x1} ${RING.y0 + RING.r} V${RING.y1 - RING.r} A${RING.r} ${RING.r} 0 0 1 ${RING.x1 - RING.r} ${RING.y1} H${RING.x0 + RING.r} A${RING.r} ${RING.r} 0 0 1 ${RING.x0} ${RING.y1 - RING.r} V${RING.y0 + RING.r} A${RING.r} ${RING.r} 0 0 1 ${RING.x0 + RING.r} ${RING.y0} H960`;

const Spark: React.FC<{s: number}> = ({s}) => <svg width={s} height={s} viewBox="0 0 24 24" style={{display: 'block'}}><path d={siClaude.path} fill={ORG}/></svg>;

type Brand = 'chatgpt' | 'claude';
type WinProps = {f: number; fps: number; cx: number; act: number; brand: Brand; judul: string; sub: string; z: number; children: React.ReactNode};
/** jendela app gelap: aktif = depan, tajam, skala 1; lain = mundur (skala .93, buram 3 px, redup). Glow merek di belakang. */
const Win: React.FC<WinProps> = ({cx, act, brand, judul, sub, z, children}) => {
  const s = 0.93 + 0.07 * act;
  const glow = brand === 'claude' ? '228,85,15' : '150,240,205';
  const bg = brand === 'claude' ? '#262624' : '#212121';
  const bar = brand === 'claude' ? '#2D2C2A' : '#2A2A2A';
  return <div style={{position: 'absolute', left: cx - WW / 2, top: WY, width: WW, height: WH, zIndex: z, transform: `scale(${s})`, transformOrigin: '50% 50%',
    filter: `blur(${2 * (1 - act)}px) brightness(${0.68 + 0.32 * act})`}}>{/* motion-ok: kedalaman 3 lapis (jendela yang mundur), bukan blur masuk */}
    <div style={{position: 'absolute', left: -170, top: -150, width: WW + 340, height: WH + 300, background: `radial-gradient(closest-side, rgba(${glow},${0.2 + 0.42 * act}), rgba(${glow},0))`}}/>
    <div style={{position: 'absolute', inset: 0, borderRadius: 18, background: bg, overflow: 'hidden', boxShadow: `0 0 0 1px rgba(255,255,255,.08), 0 24px 60px rgba(0,0,0,.6)`}}>
      <div style={{height: HEAD, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', background: bar, borderBottom: '1px solid rgba(255,255,255,.06)'}}>
        <Titik/>
        <div style={{margin: '0 auto', paddingRight: 52, display: 'flex', alignItems: 'center', gap: 9, ...tx(18, 600, '#EDEDED')}}>
          {brand === 'claude' ? <Spark s={20}/> : <LogoChatGPT size={19} warna="#F2F2F2"/>}{judul}<span style={{...tx(15, 400, '#8E8E8E')}}>{sub}</span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, top: HEAD, width: WW, height: WH - HEAD}}>{children}</div>
    </div>
  </div>;
};

const Bub: React.FC<{x: number; y: number; teks: string; masuk: number; kirim?: boolean; label?: string}> = ({x, y, teks, masuk, kirim, label}) => masuk < 0.02 ? null :
  <div style={{position: 'absolute', left: x, top: y, width: BUB.w, height: BUB.h, boxSizing: 'border-box', padding: '10px 16px', borderRadius: 18, background: kirim ? '#3A3A3A' : '#2E2D2B', border: '1px solid rgba(255,255,255,.1)',
    transform: `scale(${0.9 + 0.1 * masuk})`, transformOrigin: kirim ? '100% 100%' : '0 100%', ...tx(20, 400, '#F0F0F0'), lineHeight: 1.28, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
    {label && <div style={{...tx(13, 600, '#9A9A9A'), marginBottom: 2}}>{label}</div>}{teks}
  </div>;

const Input: React.FC<{teks: string; caret: boolean; tekan: number; brand: Brand}> = ({teks, caret, tekan, brand}) => (
  <div style={{position: 'absolute', left: 22, top: INPUT.y, width: WW - 44, height: INPUT.h, boxSizing: 'border-box', borderRadius: 22, background: '#2F2F2F', border: '1px solid rgba(255,255,255,.1)', padding: '10px 70px 10px 18px', ...tx(19, 400, '#F0F0F0'), lineHeight: 1.28, overflow: 'hidden'}}>
    {teks === '' && !caret ? null : <>{teks}{caret && <span style={{display: 'inline-block', width: 2, height: 20, background: brand === 'claude' ? ORG : '#FFFFFF', marginLeft: 2, verticalAlign: 'text-bottom'}}/>}</>}
    <div style={{position: 'absolute', right: 12, top: 14, width: 44, height: 44, borderRadius: 22, background: brand === 'claude' ? ORG : '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - 0.14 * tekan})`}}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={brand === 'claude' ? '#FFFFFF' : '#212121'} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </div>
  </div>
);

const Avatar: React.FC<{model: 'claude' | 'codex'; id: string; seed: number; t: number; sudut: number; emosi: [number, string][]; emote: EmoteJadwal[]; ket: string}> = ({model, id, seed, t, sudut, emosi, emote, ket}) => <>
  <KarakterX model={model} id={id} seed={seed} x={WW / 2} y={172} u={model === 'claude' ? 8.6 : 9} t={t} sudut={sudut} emosi={emosi} emote={emote}/>
  <div style={{position: 'absolute', left: 0, width: WW, top: 182, textAlign: 'center', ...tx(15, 500, '#8E8E8E')}}>{ket}</div>
</>;

const Berhasil: React.FC<{s: number}> = ({s}) => s < 0.02 ? null : <svg width="96" height="96" viewBox="0 0 100 100" style={{position: 'absolute', left: 960 - 48, top: RING.y0 - 48, transform: `scale(${s})`, filter: 'drop-shadow(0 0 18px rgba(26,127,55,.7))'}}>
  <circle cx="50" cy="50" r="46" fill={HIJAU}/><path d="M27 51L44 68 75 33" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const kamera = (t: number, K: DesktopProps['kunci']) => {
  const keys: [number, number, number, number, 'heavy' | 'drift'][] = [
    [0, 1.0, 960, 560, 'drift'], [K.ketik1 - 0.3, 1.05, 800, 560, 'drift'], [K.kirim1 - 0.1, 1.11, 700, 580, 'drift'], [K.kirim1 + 0.25, 1.08, 1010, 580, 'heavy'],
    [K.tiba1 + 0.2, 1.12, 1250, 580, 'drift'], [K.kirim2 - 0.1, 1.15, 1262, 580, 'drift'], [K.kirim2 + 0.25, 1.1, 1000, 580, 'heavy'], [K.tiba2 + 0.1, 1.07, 800, 570, 'drift'],
    [K.masukB - 0.05, 1.0, 960, 540, 'heavy'], [K.masukB + 1.2, 1.1, 1440, 580, 'drift'], [K.kirimN - 0.1, 1.14, 1480, 600, 'drift'], [K.kirimN + 0.3, 1.08, 1380, 640, 'heavy'],
    [K.tibaN + 0.1, 1.1, 1330, 640, 'drift'], [K.loop - 0.05, 1.1, 1330, 640, 'heavy'], [K.loop + 0.9, 0.93, 960, 525, 'drift'], [K.keluar, 0.96, 960, 525, 'drift']];
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  if (i + 1 >= keys.length) return {s: keys[i][1], x: keys[i][2], y: keys[i][3]};
  const [a, s0, x0, y0, kv] = keys[i], [b, s1, x1, y1] = keys[i + 1];
  const k = CURVE[kv](clamp((t - a) / Math.max(0.01, b - a)));
  return {s: s0 + (s1 - s0) * k, x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k};
};

const Isi: React.FC<DesktopProps & {f: number; durasiDunia: number}> = ({kunci: K, f, durasiDunia}) => {
  const {fps} = useVideoConfig();
  const t = f / fps;
  const F = (s: number) => Math.round(s * fps);
  const cam = kamera(t, K);
  const masuk = move(f, 0, 16, 'heavy');
  const keluar = move(f, F(durasiDunia - 0.5), F(0.5), 'drift');
  const sc = cam.s * (1 + 0.1 * (1 - masuk) + 0.12 * keluar);
  const dd = drift(f, fps, 3, 2);
  // posisi: pasangan A + Claude; session B masuk dari kanan dan mendorong keduanya ke kiri
  const ps = move(f, F(K.masukB), 24, 'heavy');
  const cxA = SLOT.A0 + (SLOT.A1 - SLOT.A0) * ps, cxC = SLOT.C0 + (SLOT.C1 - SLOT.C0) * ps;
  const cxB = 2420 + (SLOT.B1 - 2420) * move(f, F(K.masukB), 24, 'land');
  // jendela aktif (0..1): ChatGPT A -> Claude -> A -> B -> semua saat loop
  const tr = (s: number) => move(f, F(s) - 4, 12, 'heavy');
  const wide = move(f, F(K.loop), 16, 'drift');
  const aktA = clamp(Math.max(1 - tr(K.tiba1) + tr(K.tiba2) * (1 - tr(K.masukB)), wide));
  const aktC = clamp(Math.max(tr(K.tiba1) * (1 - tr(K.tiba2)), wide));
  const aktB = clamp(Math.max(tr(K.masukB), wide));
  // ketik
  const ketik = (a: number, b: number, s: string) => t < a ? 0 : t >= b ? -1 : Math.floor(clamp((t - a) / (b - a)) * s.length);
  const n1 = ketik(K.ketik1, K.kirim1, MSG1), n2 = ketik(K.ketik2, K.kirim2, MSG2), nN = ketik(K.ketikN, K.kirimN, MSGN);
  const cap = (n: number, s: string, on: boolean) => ({teks: n < 0 ? '' : s.slice(0, n), caret: on && n >= 0 && Math.floor(f / 8) % 2 === 0});
  const iA = cap(n1, MSG1, t >= K.ketik1 - 0.4 && t < K.kirim1), iC = cap(n2, MSG2, t >= K.ketik2 - 0.3 && t < K.kirim2), iB = cap(nN, MSGN, t >= K.ketikN - 0.3 && t < K.kirimN);
  const tekan = (s: number) => move(f, F(s), 3, 'land') - move(f, F(s) + 3, 6, 'heavy');
  // pesan meluncur (busur land/heavy 18-24 f) antar jendela
  const FL = 18;
  const bx = (cx: number, sisiKirim: boolean) => cx - WW / 2 + (sisiKirim ? 78 : 22);
  const by = (slot: number) => WY + HEAD + slot;
  const f1 = {x: bx(SLOT.A0, true) + BUB.w / 2, y: WY + HEAD + INPUT.y + INPUT.h / 2};
  const d1 = {x: bx(SLOT.C0, false) + BUB.w / 2, y: by(BUB.s1) + BUB.h / 2};
  const f2 = {x: bx(SLOT.C0, true) + BUB.w / 2, y: WY + HEAD + INPUT.y + INPUT.h / 2};
  const d2 = {x: bx(SLOT.A0, false) + BUB.w / 2, y: by(BUB.s2) + BUB.h / 2};
  const fN = {x: bx(SLOT.B1, true) + BUB.w / 2, y: WY + HEAD + INPUT.y + INPUT.h / 2};
  const dN = {x: tabX(5) + 107, y: DOCK.y + 76};
  const FLN = 24;
  const a1 = arc(f, F(K.kirim1), FL, f1, d1), a2 = arc(f, F(K.kirim2), FL, f2, d2), aN = arc(f, F(K.kirimN), FLN, fN, dN);
  const terbang1 = f >= F(K.kirim1) && f < F(K.kirim1) + FL, terbang2 = f >= F(K.kirim2) && f < F(K.kirim2) + FL, terbangN = f >= F(K.kirimN) && f < F(K.kirimN) + FLN;
  const mk = (s: number) => move(f, F(s), 6, 'land');
  const adaA1 = f >= F(K.kirim1) ? 1 : 0, adaC1 = mk(K.kirim1 + FL / fps), adaC2 = f >= F(K.kirim2) ? 1 : 0, adaA2 = mk(K.kirim2 + FL / fps), adaB1 = f >= F(K.kirimN) ? 1 : 0;
  // emosi + emote (alasan: gerak pembawa)
  const emA: [number, string][] = [[0, 'neutral'], [K.ketik1 - 0.3, 'happy'], [K.tiba2, 'surprised'], [K.tiba2 + 0.7, 'happy'], [K.ok, 'excited']];
  const emC: [number, string][] = [[0, 'neutral'], [K.tiba1, 'bored'], [K.ketik2 - 0.1, 'thinking'], [K.kirim2 - 0.1, 'proud'], [K.ok, 'happy']];
  const emB: [number, string][] = [[0, 'neutral'], [K.masukB + 0.4, 'thinking'], [K.kirimN, 'proud'], [K.ok, 'excited']];
  const eA: EmoteJadwal[] = [[K.tiba2 + 0.05, 'seru', 0.9, 1.25], [K.ok + 0.05, 'centang', 1.2, 1.2]];
  const eC: EmoteJadwal[] = [[K.tiba1 + 0.05, 'seru', 1.0, 1.25], [K.kirim2 + 0.05, 'bintang', 0.9, 1.2]];
  const eB: EmoteJadwal[] = [[K.kirimN + 0.05, 'bintang', 0.9, 1.2], [K.ok + 0.08, 'nada', 1.0, 1.2]];
  // dok
  const nyalaTab = (i: number) => i === 5 ? move(f, F(K.tibaN), 8, 'land') * (1 - 0.35 * move(f, F(K.tibaN) + 12, 20, 'drift')) : 0;
  // cincin jalur
  const cinc = move(f, F(K.loop + 0.25), F(1.3), 'drift');
  const jalan = clamp((t - (K.loop + 0.5)) / 1.6);
  const ok = move(f, F(K.ok), 8, 'land');
  // mosaik glitch masuk (kartu 63 k3)
  const mos = f < 18 ? Array.from({length: 30 * 27}, (_, n) => { const cx = n % 30, cy = Math.floor(n / 30); const hh = ((cx * 7919 + cy * 104729 + 13) % 97) / 97; const off = 3 + Math.floor(hh * 13);
    return f < off ? <div key={n} style={{position: 'absolute', left: cx * 64, top: cy * 40, width: 64, height: 40, background: hh > 0.8 ? '#E4550F' : hh > 0.55 ? '#1A1D26' : '#0B0D12'}}/> : null; }) : null;
  return <AbsoluteFill style={{background: '#05060A', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 18% 112%, rgba(228,85,15,.6), rgba(228,85,15,0) 58%), radial-gradient(circle at 90% -8%, rgba(150,240,205,.16), rgba(150,240,205,0) 50%)'}}/>
    <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${960 - cam.x * sc + dd.x}px, ${540 - cam.y * sc + dd.y}px) scale(${sc})`}}>
      {/* cincin jalur: pesan menyambung jadi satu lingkaran (titik berjalan) */}
      <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', zIndex: 1}}>
        <defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={ORG}/><stop offset=".5" stopColor="#FFFFFF"/><stop offset="1" stopColor="#96F0CD"/></linearGradient></defs>
        {cinc > 0.01 && <>
          <path d={RING_D} fill="none" stroke="url(#gr)" strokeWidth="14" strokeLinecap="round" pathLength={1} strokeDasharray={`${cinc} 1`} opacity={0.22} style={{filter: 'blur(6px)'}}/>
          <path d={RING_D} fill="none" stroke="url(#gr)" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray={`${cinc} 1`}/>
        </>}
        {jalan > 0 && [0, 0.5].map((o, i) => [0, 0.018, 0.036].map((d, j) => { const p = ringPt(jalan * 1.5 + o - d); return <circle key={`${i}-${j}`} cx={p[0]} cy={p[1]} r={9 - j * 2.4} fill="#FFFFFF" opacity={(0.95 - j * 0.25) * clamp(cinc * 3)} style={{filter: 'drop-shadow(0 0 8px rgba(255,255,255,.9))'}}/>; }))}
      </svg>
      {/* panel dok: skill-development (lapis belakang) */}
      <div style={{position: 'absolute', left: DOCK.x, top: DOCK.y, width: DOCK.w, height: DOCK.h, zIndex: 2, borderRadius: 26, background: 'linear-gradient(rgba(36,32,52,.82), rgba(22,19,34,.9))', border: '1.5px solid rgba(201,182,242,.28)', boxShadow: '0 20px 60px rgba(0,0,0,.55), 0 0 60px rgba(201,182,242,.12)'}}>
        <div style={{position: 'absolute', left: 30, top: 0, height: DOCK.h, display: 'flex', alignItems: 'center', gap: 12, ...tx(25, 600, LAV)}}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={LAV} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3h14v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M7 3v10M7 20h6"/></svg>skill-development
        </div>
        {TABS.map((nm, i) => {
          const baru = i === 5, n = nyalaTab(i);
          if (baru && f < F(K.tibaN) - 1) return <div key={nm} style={{position: 'absolute', left: tabX(i) - DOCK.x, top: 30, width: 214, height: 60, boxSizing: 'border-box', borderRadius: 14, border: '2px dashed rgba(201,182,242,.3)'}}/>;
          return <div key={nm} style={{position: 'absolute', left: tabX(i) - DOCK.x, top: 30 - 6 * n, width: 214, height: 60, boxSizing: 'border-box', borderRadius: 14, background: '#2C2742', border: `1.5px solid ${n > 0.05 ? LAV : 'rgba(201,182,242,.3)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', ...tx(23, 600, '#E6DDFF'), transform: `scale(${1 + 0.06 * n})`, boxShadow: n > 0.05 ? `0 0 ${34 * n}px rgba(201,182,242,${0.7 * n})` : '0 6px 14px rgba(0,0,0,.4)'}}>{nm}</div>;
        })}
      </div>
      <Win f={f} fps={fps} cx={cxA} act={aktA} brand="chatgpt" judul="ChatGPT" sub="session A" z={Math.round(10 + aktA * 10)}>
        <Avatar model="codex" id="b7-a" seed={2} t={t} sudut={0.125} emosi={emA} emote={eA} ket="ChatGPT · session A"/>
        <Bub x={78} y={BUB.s1} teks={MSG1} masuk={adaA1} kirim/>
        <Bub x={22} y={BUB.s2} teks={MSG2} masuk={adaA2} label="Claude"/>
        <Input teks={iA.teks} caret={iA.caret} tekan={tekan(K.kirim1)} brand="chatgpt"/>
      </Win>
      <Win f={f} fps={fps} cx={cxC} act={aktC} brand="claude" judul="Claude" sub="Claude Code" z={Math.round(10 + aktC * 10)}>
        <Avatar model="claude" id="b7-c" seed={1} t={t} sudut={0} emosi={emC} emote={eC} ket="Claude · sesi utama"/>
        <Bub x={22} y={BUB.s1} teks={MSG1} masuk={adaC1} label="Dari ChatGPT"/>
        <Bub x={78} y={BUB.s2} teks={MSG2} masuk={adaC2} kirim/>
        <Input teks={iC.teks} caret={iC.caret} tekan={tekan(K.kirim2)} brand="claude"/>
      </Win>
      <Win f={f} fps={fps} cx={cxB} act={aktB} brand="chatgpt" judul="ChatGPT" sub="session B" z={Math.round(10 + aktB * 10)}>
        <Avatar model="codex" id="b7-b" seed={4} t={t} sudut={-0.125} emosi={emB} emote={eB} ket="ChatGPT · session B"/>
        <Bub x={78} y={BUB.s1} teks={MSGN} masuk={adaB1} kirim/>
        <Input teks={iB.teks} caret={iB.caret} tekan={tekan(K.kirimN)} brand="chatgpt"/>
      </Win>
      {/* pesan yang meluncur */}
      {[[terbang1, a1, MSG1, 'chatgpt', f1], [terbang2, a2, MSG2, 'claude', f2], [terbangN, aN, MSGN, 'chatgpt', fN]].map(([on, p, s, b], i) => on ? <div key={i} style={{position: 'absolute', zIndex: 60, left: (p as {x: number}).x - BUB.w / 2, top: (p as {y: number}).y - BUB.h / 2, width: BUB.w, height: BUB.h, boxSizing: 'border-box', padding: '10px 16px', borderRadius: 18,
        background: '#3A3A3A', border: `1.5px solid ${b === 'claude' ? ORG : 'rgba(150,240,205,.8)'}`, boxShadow: `0 16px 40px rgba(0,0,0,.55), 0 0 30px ${b === 'claude' ? 'rgba(228,85,15,.5)' : 'rgba(150,240,205,.4)'}`, ...tx(20, 400, '#F0F0F0'), lineHeight: 1.28, overflow: 'hidden'}}>{s as string}</div> : null)}
      <div style={{zIndex: 70, position: 'absolute', inset: 0}}><Berhasil s={ok}/></div>
    </div>
    {mos}
  </AbsoluteFill>;
};

export const DesktopAgen: React.FC<DesktopProps> = (p) => {
  const fAll = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dunia = Math.round(p.durasi * fps) - p.pre - p.post;
  if (fAll < p.pre) return <AbsoluteFill><Fonts/><WajahDorong f={fAll} t0={p.preT0} dari={p.zPre} ke={1.7} frames={p.pre}/></AbsoluteFill>;
  const f = fAll - p.pre;
  if (f >= dunia) return <AbsoluteFill><Fonts/><WajahDorong f={f - dunia} t0={p.postT0} dari={1.7} ke={1.0} frames={p.post}/></AbsoluteFill>;
  const blur = f < 18 || f >= Math.round((dunia / fps - 0.5) * fps) - 2;
  return <AbsoluteFill><Fonts/>{blur ? <CameraMotionBlur shutterAngle={220} samples={8}><Isi {...p} durasiDunia={dunia / fps} f={f}/></CameraMotionBlur> : <Isi {...p} durasiDunia={dunia / fps} f={f}/>}</AbsoluteFill>;
};
