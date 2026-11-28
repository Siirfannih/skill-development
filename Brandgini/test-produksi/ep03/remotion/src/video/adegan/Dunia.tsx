// Satu dunia hero (Addendum 3 / Bang Motion: anti-PPT). Potongan melintang tong es puter = hero; kamera berpindah antar beat.
// Semua gambar dari kode (SVG). Waktu dari data ep03.json; keadaan benda (garam, leleh, beku, putar) fungsi waktu global.
import React from 'react';
import {Es, Baskom, Meja, Kontak, Termometer, Gerobak, Karung, Roti, Cone, Label, BAYANGAN, C} from '../bersama/Objek';
import {TongSamping, TS, P, KALENG} from '../bersama/Tong';
import {move, drift, CURVE} from '../../lib/curves';
import data from '../../data/ep03.json';

type B = {id: string; dari: number; sampai: number; ev: number[]; tr: string};
const beats = data.beats as B[];
const bs = (i: number) => beats[i - 1].dari;
const be = (i: number) => beats[i - 1].sampai;

const HERO_W = 800 * TS; const HERO_H = 1000 * TS;   // panel potongan melintang dari samping (dunia)
const H = {x: -1500, y: -900};                    // gugus pembuka (baskom + kaleng + termometer)
const CART = {x: 0, y: 1330};
const LANTAI_Y = CART.y + 388;                     // roda gerobak menapak di sini
const MEJA_Y = H.y + 324;                          // permukaan meja pembuka (dasar baskom)
const PTOP = P(400, 205);                          // permukaan campuran es-garam di dalam tong (dunia)

// kamera: pusat dunia -> layar (540,700). z0->z1 push saat tahan. d = frame perpindahan (0 = potong). pre = pos awal singkat lalu menyelam.
type K = {cx: number; cy: number; z0: number; z1: number; d: number; pre?: {cx: number; cy: number; z: number; hold: number}};
const KAM: K[] = [
  {cx: H.x - 40, cy: H.y + 100, z0: 1.1, z1: 1.28, d: 0},
  {cx: H.x, cy: H.y + 40, z0: 1.4, z1: 1.7, d: 14},
  {cx: 130, cy: 0, z0: 1.08, z1: 1.08, d: 0, pre: {cx: CART.x - 40, cy: CART.y - 140, z: 1.08, hold: 40}},
  {cx: 40, cy: -450, z0: 1.3, z1: 1.5, d: 18},
  {cx: -210, cy: -240, z0: 3.0, z1: 3.3, d: 20},
  {cx: 560, cy: 40, z0: 1.4, z1: 1.4, d: 18},
  {cx: -190, cy: 20, z0: 2.6, z1: 2.9, d: 18},
  {cx: 0, cy: 0, z0: 1.1, z1: 1.1, d: 20},
  {cx: 0, cy: 80, z0: 2.8, z1: 3.1, d: 18},
  {cx: 0, cy: -40, z0: 1.08, z1: 1.08, d: 18},
  {cx: -60, cy: -40, z0: 3.6, z1: 3.9, d: 18},
  {cx: -60, cy: -40, z0: 3.6, z1: 3.9, d: 8},
  {cx: 0, cy: -300, z0: 1.7, z1: 1.08, d: 18},
  {cx: -140, cy: 560, z0: 1.0, z1: 0.62, d: 22},
  {cx: H.x - 40, cy: H.y + 100, z0: 1.1, z1: 1.24, d: 0},
];
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

const kamera = (f: number) => {
  let i = beats.findIndex((b) => f >= b.dari && f < b.sampai);
  if (i < 0) i = beats.length - 1;
  const b = beats[i]; const k = KAM[i]; const lf = f - b.dari; const n = b.sampai - b.dari;
  const prev = i > 0 ? KAM[i - 1] : k;
  const prevEnd = {cx: prev.cx, cy: prev.cy, z: prev.z1};
  let from = prevEnd; let p = k.d > 0 ? move(lf, 0, k.d, 'heavy') : 1;
  if (k.pre) {
    // pan satu arah dari meja ke gerobak (0..16 f), tahan di gerobak, lalu naik ke panel potongan melintang
    const q = move(lf, 0, 16, 'whip');
    from = {cx: lerp(prevEnd.cx, k.pre.cx, q), cy: lerp(prevEnd.cy, k.pre.cy, q), z: Math.exp(lerp(Math.log(prevEnd.z), Math.log(k.pre.z), q))};
    p = move(lf, k.pre.hold, 24, 'heavy');
  }
  const push = move(lf, 0, n, 'drift');
  const zEnd = lerp(Math.log(k.z0), Math.log(k.z1), push);
  const z = Math.exp(lerp(Math.log(from.z), zEnd, p));
  return {cx: lerp(from.cx, k.cx, p), cy: lerp(from.cy, k.cy, p), z};
};

// keadaan benda sebagai fungsi waktu global
const ramp = (f: number, a: number, b: number) => Math.min(1, Math.max(0, (f - a) / Math.max(1, b - a)));
const keadaan = (f: number) => {
  const garam = ramp(f, bs(4) + 10, bs(4) + 70);
  const melt = 0.45 * ramp(f, bs(5), be(7)) + 0.2 * ramp(f, bs(8), be(8));
  const beku = f < bs(11) ? ramp(f, bs(9) + 6, be(9) - 10) : 1;
  const speed = (f >= bs(10) && f < bs(11) ? 3.2 : 0) + (f >= bs(12) && f < bs(13) ? 2.4 : 0);
  let putar = 0;
  for (let t = bs(10); t < f; t++) putar += (t >= bs(10) && t < bs(11) ? 3.2 : 0) + (t >= bs(12) && t < bs(13) ? 2.4 : 0);
  void speed;
  const kristal = f >= bs(11) && f < bs(12) ? 'besar' : f >= bs(12) && f < bs(13) ? 'kecil' : 'tak';
  const kS = kristal === 'besar' ? move(f, bs(11) + 4, 50, 'heavy') : kristal === 'kecil' ? move(f, bs(12) + 4, 24, 'land') : 0;
  const pengerok = f >= bs(12) && f < bs(13) ? 230 + 230 * (0.5 - 0.5 * Math.cos(((f - bs(12)) / 22) * Math.PI)) : -1;
  return {garam, melt, beku, putar, kristal: kristal as 'tak' | 'besar' | 'kecil', kS, pengerok};
};

const W: React.FC<{x: number; y: number; z?: number; rot?: number; sh?: boolean; children: React.ReactNode}> = ({x, y, z = 1, rot = 0, sh = true, children}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${z})`, filter: sh ? BAYANGAN : undefined}}>{children}</div>
);
const muncul = (f: number, at: number, len = 10, c: 'land' | 'heavy' = 'land') => move(f, at, len, c);

// panah aliran dalam koordinat dunia
const PanahW: React.FC<{d: string; p: number; geser: number; tebal?: number; id: string; warna?: string}> = ({d, p, geser, tebal = 18, id, warna = C.panas}) => (
  <svg width={1} height={1} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
    <defs><marker id={`mk-${id}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill={warna} /></marker><mask id={`mw-${id}`} maskUnits="userSpaceOnUse" x={-3000} y={-3000} width={6000} height={6000}><path d={d} fill="none" stroke={C.putih} strokeWidth={tebal + 10} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} /></mask></defs>
    <g mask={`url(#mw-${id})`}><path d={d} fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" strokeDasharray="44 28" strokeDashoffset={-geser} markerEnd={p > 0.95 ? `url(#mk-${id})` : undefined} /></g>
    {p > 0.97 && <circle cx={0} cy={0} r={0} />}
  </svg>
);

type Cam = {cx: number; cy: number; z: number};
const lay = (cam: Cam, par: number) => ({position: 'absolute' as const, left: 540, top: 700, width: 0, height: 0, transform: `scale(${cam.z * par}) translate(${-cam.cx}px, ${-cam.cy}px)`});

// LAYER 1 · Background: latar penuh frame (dinding + lantai netral), parallax paling lambat (0,8x).
export const LayerBackground: React.FC<{f: number; cam: Cam}> = ({f, cam}) => (
  <div style={lay(cam, 0.8)}>
    <div style={{position: 'absolute', left: -5000, top: -4000, width: 10000, height: LANTAI_Y + 4000, background: C.dinding}} />
    {Array.from({length: 30}, (_, n) => <div key={n} style={{position: 'absolute', left: -3300 + n * 230, top: -3000, width: 4, height: LANTAI_Y + 3000, background: C.dindingGaris}} />)}
    {Array.from({length: 7}, (_, n) => (
       <div key={n} style={{position: 'absolute', left: -2300 + n * 760, top: -1700 + (n % 3) * 900, width: 520, height: 700, background: C.cahaya, borderRadius: 40}} />
    ))}
    <div style={{position: 'absolute', left: -5000, top: LANTAI_Y, width: 10000, height: 4000, background: C.lantai}} />
    <div style={{position: 'absolute', left: -5000, top: LANTAI_Y, width: 10000, height: 14, background: C.lantaiTepi}} />
    {Array.from({length: 24}, (_, n) => <div key={n} style={{position: 'absolute', left: -3400 + n * 300, top: LANTAI_Y + 14, width: 4, height: 3000, background: C.lantaiGaris}} />)}
  </div>
);

// LAYER 2 · Karakter/Aksi: hero dan benda yang beraksi + akresi (parallax 1x).
const LayerAksi: React.FC<{f: number; cam: Cam}> = ({f, cam}) => {
  const s = keadaan(f);
  const e1 = beats[0].ev;
  const jatuh = muncul(f, 0, 9);
  const termo = muncul(f, e1[0] ?? 40, 12);
  const k4 = muncul(f, bs(4), 16);
  const n13 = move(f, bs(13) + (beats[12].ev[0] ?? 40), 16, 'land');
  const g13 = move(f, bs(13), 30, 'land');
  const r15 = muncul(f, bs(15), 14);
  const out15 = move(f, bs(15) + Math.round((be(15) - bs(15)) * 0.62), 10, 'leave');
  const lvTermo = f < bs(6) ? 0.55 : 0.55 - 0.3 * move(f, bs(6) + 18, Math.max(10, be(6) - bs(6) - 30), 'heavy');
  const garamTampil = f >= bs(13) ? 0.35 + 0.65 * g13 : f >= bs(4) ? s.garam : 0;
  const kejatuhan = (n: number) => ((f + n * 7) % 24) / 24;
  return (
    <div style={lay(cam, 1)}>
      <W x={H.x} y={MEJA_Y + 210} sh={false}><Meja w={1400} /></W>
      <div style={{position: 'absolute', left: H.x, top: MEJA_Y - 2}}><Kontak w={600} h={30} /></div>
      <W x={H.x} y={H.y + 190} z={0.9 + 0.1 * jatuh}><Baskom w={640} kaleng termo={0.55} /></W>
      <div style={{position: 'absolute', left: CART.x - 960, top: LANTAI_Y - 1000, width: 44, height: 1000, marginLeft: -22, background: C.beton, border: `5px solid ${C.betonGaris}`}} />
      <div style={{position: 'absolute', left: CART.x - 960, top: LANTAI_Y - 1000, width: 360, height: 28, marginLeft: -180, background: C.beton, border: `5px solid ${C.betonGaris}`}} />
      <svg width={1} height={1} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <path d={`M${CART.x - 1140} ${LANTAI_Y - 985} Q${CART.x - 1500} ${LANTAI_Y - 900} ${CART.x - 1900} ${LANTAI_Y - 1010}`} stroke={C.garis} strokeWidth={5} fill="none" />
        <path d={`M${CART.x - 780} ${LANTAI_Y - 985} Q${CART.x - 400} ${LANTAI_Y - 880} ${CART.x + 100} ${LANTAI_Y - 1000}`} stroke={C.garis} strokeWidth={5} fill="none" />
      </svg>
      <div style={{position: 'absolute', left: CART.x, top: LANTAI_Y - 2}}><Kontak w={1180} h={44} /></div>
      <W x={CART.x} y={CART.y} z={1}><Gerobak w={1300} /></W>
      <svg width={1} height={1} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <circle cx={CART.x - 103} cy={CART.y - 145} r={265} fill="none" stroke={C.garis} strokeWidth={8} strokeDasharray="22 16" />
        <path d={`M${CART.x - 103 - 205} ${CART.y - 145 - 168} L${-HERO_W / 2 - 20} ${HERO_H / 2 + 40}`} stroke={C.garis} strokeWidth={8} strokeDasharray="22 16" fill="none" />
        <path d={`M${CART.x - 103 + 205} ${CART.y - 145 - 168} L${HERO_W / 2 + 20} ${HERO_H / 2 + 40}`} stroke={C.garis} strokeWidth={8} strokeDasharray="22 16" fill="none" />
      </svg>
      <div style={{position: 'absolute', left: 0, top: 0, width: HERO_W + 90, height: HERO_H + 90, marginLeft: -(HERO_W + 90) / 2, marginTop: -(HERO_H + 90) / 2, borderRadius: 44, background: C.cahaya, border: `10px solid ${C.garis}`, filter: BAYANGAN}} />
      <W x={0} y={0} sh={false}><TongSamping garam={garamTampil} melt={s.melt} beku={s.beku} putar={s.putar} kristal={s.kristal} kS={s.kS} pengerok={s.pengerok} /></W>
      <svg width={1} height={1} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}><path d={`M${HERO_W / 2 + 50} 20 L${HERO_W / 2 + 100} 20`} stroke={C.garis} strokeWidth={8} strokeDasharray="22 16" fill="none" /></svg>
      <W x={HERO_W / 2 + 190} y={20}><div style={{width: 170, height: 690, background: C.putih, border: `8px solid ${C.garis}`, borderRadius: 28, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Termometer h={560} level={lvTermo} /></div></W>
      <W x={330 + (1 - k4) * 360} y={-640 - (1 - k4) * 200} rot={-62 + 8 * k4}><Karung w={300} /></W>
      {f >= bs(4) && f < bs(5) && Array.from({length: 9}, (_, n) => {
        const ph = kejatuhan(n); const x = 200 - ph * 40 + (n % 3) * 18; const y = -520 + ph * (PTOP.y + 520);
        return <div key={n} style={{position: 'absolute', left: x, top: y, width: 16, height: 16, background: C.putih, border: `3px solid ${C.garamGaris}`, transform: `rotate(${ph * 300}deg)`}} />;
      })}
      {f >= bs(13) && f < bs(14) && Array.from({length: 7}, (_, n) => {
        const ph = ((f + n * 5) % 20) / 20; const x = (n % 2 ? 1 : -1) * (150 + (n % 3) * 30); const y = -540 + ph * (PTOP.y + 540);
        return <div key={n} style={{position: 'absolute', left: x, top: y, width: 16, height: 16, background: C.putih, border: `3px solid ${C.garamGaris}`, transform: `rotate(${ph * 300}deg)`}} />;
      })}
      <W x={-190} y={Math.min(PTOP.y + 30, -700 + n13 * (PTOP.y + 730))} rot={-12} z={n13 > 0 ? 1 : 0}><Es s={62} /></W>
      <W x={190} y={Math.min(PTOP.y + 30, -700 + n13 * (PTOP.y + 730))} rot={14} z={n13 > 0 ? 1 : 0}><Es s={62} /></W>
      {f >= bs(15) && (
        <>
          <W x={H.x - 440 - (1 - r15) * 500 - out15 * 600} y={MEJA_Y - 90} rot={-3}><Roti w={270} /></W>
          <W x={H.x + 450 + (1 - r15) * 500 + out15 * 600} y={MEJA_Y - 170} rot={2}><Cone w={250} cangkir /></W>
        </>
      )}
    </div>
  );
};

// LAYER 3 · Atas: maskot, panah aliran, label, serpih depan (caption pelat K-05 ada di SgMain di atas layer ini).
const LayerAtas: React.FC<{f: number; cam: Cam}> = ({f, cam}) => {
  const geser = f * 2.2;
  const e1 = beats[0].ev;
  const lb4 = muncul(f, bs(4) + (beats[3].ev[0] ?? 40), 10);
  const pan7 = move(f, bs(7) + 4, 20, 'land');
  const a8 = move(f, bs(8) + 12, 26, 'land');
  const a8b = move(f, bs(8) + (beats[7].ev[0] ?? 50), 26, 'land');
  const a8c = move(f, bs(8) + (beats[7].ev[1] ?? 90), 26, 'land');
  const lb14 = muncul(f, bs(14) + (beats[13].ev[0] ?? 40), 10);
  return (
    <div style={lay(cam, 1)}>
      <W x={290} y={-800 + (1 - lb4) * 40} z={lb4 > 0 ? 1.2 : 0}><Label teks="GARAM" w={250} /></W>
      {f >= bs(7) && f < bs(8) && (
        <g style={{position: 'absolute', left: 0, top: 0}}>
          <PanahW id="p7a" d={`M${P(300, 330).x} ${P(300, 330).y} L${P(222, 330).x} ${P(222, 330).y}`} p={pan7} geser={geser} tebal={16} />
          <PanahW id="p7b" d={`M${P(300, 480).x} ${P(300, 480).y} L${P(222, 480).x} ${P(222, 480).y}`} p={pan7} geser={geser} tebal={16} />
          <PanahW id="p7c" d={`M${P(300, 630).x} ${P(300, 630).y} L${P(222, 630).x} ${P(222, 630).y}`} p={pan7} geser={geser} tebal={16} />
        </g>
      )}
      {f >= bs(8) && f < bs(9) && (
        <g style={{position: 'absolute', left: 0, top: 0}}>
          <PanahW id="p8a" d={`M${P(395, 330).x} ${P(395, 330).y} L${P(215, 330).x} ${P(215, 330).y}`} p={a8} geser={geser} tebal={22} />
          <PanahW id="p8b" d={`M${P(395, 520).x} ${P(395, 520).y} L${P(215, 520).x} ${P(215, 520).y}`} p={a8b} geser={geser} tebal={22} />
          <PanahW id="p8c" d={`M${P(405, 700).x} ${P(405, 700).y} L${P(585, 700).x} ${P(585, 700).y}`} p={a8c} geser={geser} tebal={22} />
          <PanahW id="p8d" d={`M${P(405, 420).x} ${P(405, 420).y} L${P(585, 420).x} ${P(585, 420).y}`} p={a8} geser={geser} tebal={22} />
        </g>
      )}
      {f >= bs(10) && f < bs(11) && (
        <g style={{position: 'absolute', left: 0, top: 0}}>
          <PanahW id="p10a" d={`M${P(300, 20).x} ${P(300, 20).y - 10} Q${P(400, -60).x} ${P(400, -60).y} ${P(500, 20).x} ${P(500, 20).y - 10}`} p={move(f, bs(10) + 4, 20, 'land')} geser={f * 3} tebal={16} warna={C.garis} />
        </g>
      )}
      <W x={CART.x - 520} y={CART.y - 560 + (1 - lb14) * 30} z={lb14 > 0 ? 1.6 : 0}><Label teks="kimia SMA" w={330} /></W>
      <div style={lay(cam, 0.25)} />
    </div>
  );
};

export const Dunia: React.FC<{f: number}> = ({f}) => {
  const cam = kamera(f);
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <LayerBackground f={f} cam={cam} />
      <LayerAksi f={f} cam={cam} />
      <LayerAtas f={f} cam={cam} />
    </div>
  );
};
void CURVE;
