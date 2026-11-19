// V7.tsx · video perkenalan v7: talking head penuh, tanpa ganti latar dan tanpa b-roll (D-001, Irfan 19 Nov).
// Kiblat kartu 87 (Zache, file kiriman Irfan): teks hidup di ruang yang sama dengan wajah, dua lapis (belakang kepala lewat matte,
// depan badan), kamera dorong/tarik ber-ease mengikuti blok, flash light-leak menutup potongan.
// Lapis: footage → teks belakang → cutout (matte RVM, hanya saat ada teks belakang) → teks depan; semuanya di dalam kamera (Lantai B12).
import React from 'react';
import {AbsoluteFill, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Fonts} from '../Fonts';
import {GF} from '../kt/KT';
import {Cutout} from '../Plate';
import {FilmBurn, Grain} from '../fx/FX';
import {CURVE} from '../curves';
import {C, F} from '../tema';
import RENCANA from './rencana.json';

type Kt = {t: string; f: number};
type Baris = {teks: string; gaya: 'r1' | 'r2' | 'r3' | 'r3n' | 'r6'; lapis: 'b' | 'd'; size: number; kata: Kt[]};
type Letak = {x: number; y: number; align: 'center' | 'left' | 'right'; ty: string};
type Blok = {id: number; a: number; b: number; peran: string; zona: string; kepala: number[]; lay: {b?: Letak; d?: Letak}; baris: Baris[]};
const RC = RENCANA as unknown as {blok: Blok[]; cam: number[][]; seg: number[]};
export const V7_DUR = RC.cam.length;
const FG_END = 1800;
const KARTU = 1843; // #23 take 38 hanya suara → kartu teks gelap (D-008)
const KUNING = '#FCFD0C';
const EMAS = '#F6DA0C';
const KELUAR = 5;

const e = (g: number, a: number, n: number, c: keyof typeof CURVE = 'land') =>
  interpolate(g, [a, a + n], [0, 1], {easing: CURVE[c], extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// Ukuran dan posisi tiap baris dihitung di alat/v7_rencana.py dari lebar glyph asli + transform kamera per frame
// (tetap di dalam margin 5 % layar pada zoom maksimum blok; kapital belakang kepala tidak terpotong tepi atas).

/** Keluar semua peran: mundur ke belakang (skala .85, naik, blur), 5 f, makin cepat (Zache recede + Lantai: tanpa fade polos). */
const keluarStyle = (g: number, b: number, dasar: string): React.CSSProperties => {
  const x = e(g, b - KELUAR, KELUAR, 'leave');
  if (x <= 0) return {transform: dasar};
  return {transform: `${dasar} translateY(${-40 * x}px) scale(${1 - 0.15 * x})`, filter: `blur(${8 * x}px)`, opacity: 1 - x};
};

/** R1 · T19 word-pop ikut VO: tiap kata muncul onset +2 f, 4 f, naik ½ cap + skala .85→1 + blur gerak. */
const R1: React.FC<{b: Baris; g: number; size: number}> = ({b, g, size}) => (
  <span style={{fontFamily: F.poppins, fontWeight: 600, fontSize: size, color: C.putih, letterSpacing: '-0.02em', whiteSpace: 'nowrap',
    textShadow: '0 2px 3px rgba(0,0,0,.6), 0 0 18px rgba(0,0,0,.75), 0 0 40px rgba(0,0,0,.45)'}}>
    {b.kata.map((k, i) => {
      const t = e(g, k.f + 2, 4, 'reveal');
      return <span key={i} style={{display: 'inline-block', marginRight: '0.26em', opacity: g < k.f + 2 ? 0 : 1,
        transform: `translateY(${(1 - t) * size * 0.45}px) scale(${0.85 + 0.15 * t})`, filter: t < 1 ? `blur(${(1 - t) * 5}px)` : undefined}}>{k.t}</span>; // motion-ok: blur gerak pada naik cepat 4 f (kartu 87 T2: masuk per kata/huruf + blur gerak), bukan blur-in bawaan
    })}
  </span>
);

/** R2 · T30 ayun per huruf (Zache "changed/the Travel"): huruf muncul 0,75 f bergiliran, naik + membesar .6→1 + blur→tajam;
 *  kata berayun ±30° → 0 berporos di huruf pertama dengan overshoot kecil. Kuning lemon + glow amber dua lapis. */
const R2: React.FC<{b: Baris; g: number; size: number; arah: number}> = ({b, g, size, arah}) => {
  const f0 = b.kata[0].f;
  const u = Math.max(0, g - f0);
  const rot = arah * 30 * Math.exp(-u / 3.2) * Math.cos(u / 2.6);
  let n = 0;
  return (
    <span style={{display: 'inline-block', transformOrigin: '0% 100%', transform: `rotate(${rot}deg)`, whiteSpace: 'nowrap',
      fontFamily: F.inter, fontWeight: 800, fontSize: size, letterSpacing: '-0.04em', color: KUNING, lineHeight: 0.9,
      filter: 'drop-shadow(0 0 10px rgba(255,214,0,.8)) drop-shadow(0 0 40px rgba(255,150,0,.45))'}}>
      {b.kata.map((k, wi) => (
        <span key={wi} style={{display: 'inline-block', marginRight: wi < b.kata.length - 1 ? '0.22em' : 0}}>
          {[...k.t].map((ch) => {
            const s = Math.max(f0, k.f) + 0.75 * n++;
            const t = e(g, s, 5, 'reveal');
            return <span key={n} style={{display: 'inline-block', opacity: g < s ? 0 : 1,
              transform: `translateY(${(1 - t) * size * 0.7}px) scale(${0.6 + 0.4 * t})`, filter: t < 1 ? `blur(${(1 - t) * 6}px)` : undefined}}>{ch}</span>; // motion-ok: blur gerak per huruf 5 f (kartu 87 T2, KT-ZACHE arc swing)
          })}
        </span>
      ))}
    </span>
  );
};

/** R3 · T03 slam + getar: kapital Anton di belakang kepala. 1,45× → 1,12× → 1,0× dalam 3 f, lalu getar 3 px 8 Hz selama 8 f.
 *  r3n (kata negatif): putih + bayangan merah #C40004 bergeser (merah tidak dipakai sebagai isi huruf di atas footage gelap). */
const R3: React.FC<{b: Baris; g: number; size: number}> = ({b, g, size}) => {
  const f0 = b.kata[0].f - 3;
  const u = g - f0;
  const s = u <= 0 ? 1.45 : u === 1 ? 1.12 : 1; // dari 1,45× (bukan 2×): kata lebar tidak keluar frame saat slam (audit c04 f900)
  const gt = u >= 2 && u < 10 ? 3 * Math.sin(u * 2 * Math.PI * 8 / 30) : 0;
  const neg = b.gaya === 'r3n';
  return (
    <span style={{display: 'inline-block', transform: `translateX(${gt}px) scale(${s})`, filter: u < 2 ? `blur(${(2 - Math.max(0, u)) * 4}px)` : undefined,
      fontFamily: F.anton, fontSize: size, lineHeight: 0.9, letterSpacing: '0.005em', whiteSpace: 'nowrap', opacity: g < f0 ? 0 : 1,
      color: neg ? C.putih : EMAS, textShadow: neg ? `10px 8px 0 ${C.merah}` : '0 6px 24px rgba(0,0,0,.35)'}}>{b.teks.toUpperCase()}</span>
  );
};

/** R6 · T31 depth push: datang dari jauh (skala .55, blur 14) ke bidang fokus di belakang kepala, 11 f heavy, sambil turun 60 px. */
const R6: React.FC<{b: Baris; g: number; size: number}> = ({b, g, size}) => {
  const f0 = b.kata[0].f - 8;
  const t = e(g, f0, 11, 'heavy');
  return (
    <span style={{display: 'inline-block', transform: `translateY(${(1 - t) * -60}px) scale(${0.55 + 0.45 * t})`, filter: t < 1 ? `blur(${(1 - t) * 14}px)` : undefined, // motion-ok: depth push dari jauh, blur = jarak fokus (kartu 87 T3 rack-focus)
      opacity: g < f0 ? 0 : Math.min(1, 0.25 + t), fontFamily: F.anton, fontSize: size, lineHeight: 0.9, color: C.putih, whiteSpace: 'nowrap',
      textShadow: '0 0 30px rgba(255,255,255,.35), 0 8px 30px rgba(0,0,0,.35)'}}>{b.teks.toUpperCase()}</span>
  );
};

const Baris1: React.FC<{b: Baris; g: number; arah: number}> = ({b, g, arah}) => {
  const size = b.size;
  if (b.gaya === 'r1') return <R1 b={b} g={g} size={size}/>;
  if (b.gaya === 'r2') return <R2 b={b} g={g} size={size} arah={arah}/>;
  if (b.gaya === 'r6') return <R6 b={b} g={g} size={size}/>;
  return <R3 b={b} g={g} size={size}/>;
};

/** Satu lapis (belakang/depan) satu blok. Baris belakang: tengah di sumbu wajah, kaki baris terakhir 20 % di belakang rambut (puncak rambut dari matte).
 *  Baris depan: di zona hasil rencana (dada / bawah dagu / bawah mulut saat close-up / samping kepala). */
const Lapis: React.FC<{bl: Blok; g: number; lapis: 'b' | 'd'}> = ({bl, g, lapis}) => {
  const rows = bl.baris.filter((r) => r.lapis === lapis);
  if (!rows.length || g < bl.a - 10 || g >= bl.b) return null;
  const L = bl.lay[lapis];
  if (!L) return null;
  const arah = bl.id % 2 ? 1 : -1;
  const tx = L.align === 'center' ? '-50%' : L.align === 'right' ? '-100%' : '0%';
  return (
    <div style={{position: 'absolute', left: L.x, top: L.y, textAlign: L.align, ...keluarStyle(g, bl.b, `translate(${tx}, ${L.ty})`)}}>
      {rows.map((r, i) => <div key={i} style={{lineHeight: 1}}><Baris1 b={r} g={g} arah={arah}/></div>)}
    </div>
  );
};

/** Light-leak Zache di potongan: oranye-kuning menyapu, puncak putih 1–2 f, sisa bocoran di awal shot baru. */
const FLASH = [0, 308, 399, 595, 772, 914, 1072, 1305, 1485, 1574, 1790, KARTU];

/** Kartu #23: hitam hangat, sisa light-leak amber di atas yang bergeser pelan (drift) supaya kartu tidak mati. */
const Kartu: React.FC<{g: number}> = ({g}) => {
  const u = (g - KARTU) / 163;
  const gx = 50 + 14 * Math.sin(u * Math.PI * 0.9), gy = 18 + 6 * u;
  return (
    <AbsoluteFill style={{background: '#0C0B09'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 70% 38% at ${gx}% ${gy}%, rgba(255,150,40,.20), rgba(255,120,20,.06) 55%, transparent 75%)`}}/>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 55%, rgba(0,0,0,.55))'}}/>
    </AbsoluteFill>
  );
};

export const V7: React.FC = () => {
  const g = useCurrentFrame();
  const [s, cx, cy, tx] = RC.cam[Math.min(g, RC.cam.length - 1)]; // tx: geser wajah ke tengah saat zoom (dibatasi agar gambar menutup frame)
  const aktif = RC.blok.filter((bl) => g >= bl.a - 10 && g < bl.b);
  const blkBelakang = RC.blok.filter((bl) => bl.baris.some((r) => r.lapis === 'b'));
  return (
    <GF.Provider value={g}>
      <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
        <Fonts/>
        <div style={{position: 'absolute', inset: 0, transformOrigin: `${cx}px ${cy}px`, transform: `translateX(${tx}px) scale(${s})`}}>
          {g < KARTU ? (
            <OffthreadVideo src={staticFile('footage.mp4')} muted style={{position: 'absolute', inset: 0, width: 1080, height: 1920, filter: 'contrast(1.05) saturate(1.03)'}}/>
          ) : <Kartu g={g}/>}
          {aktif.map((bl) => <Lapis key={`b${bl.id}`} bl={bl} g={g} lapis="b"/>)}
          {blkBelakang.map((bl) => bl.a < FG_END ? (
            <Sequence key={`c${bl.id}`} from={bl.a - 10} durationInFrames={Math.min(bl.b, FG_END) - (bl.a - 10)} layout="none">
              <Cutout dari={bl.a - 10} style={{filter: 'contrast(1.05) saturate(1.03)'}}/>
            </Sequence>
          ) : null)}
          {aktif.map((bl) => <Lapis key={`d${bl.id}`} bl={bl} g={g} lapis="d"/>)}
        </div>
        {FLASH.map((f, i) => <FilmBurn key={f} mulai={f - 3} puncak={f} selesai={f + 4} seed={i + 1}/>)}
        <Grain kuat={0.035}/>
      </AbsoluteFill>
    </GF.Provider>
  );
};
