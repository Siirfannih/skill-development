// KT.tsx · tata bahasa KT (§2.1): R1 rise dari mask, R2 pop, R6 hero terbang/slam, keluar `leave` bersama cut.
import React, {createContext, useContext} from 'react';
import {interpolate} from 'remotion';
import {CURVE} from '../curves';
import {ease} from '../anim';
import {C, F, GLOW, GLOW_SETENGAH, BAYANG_TERANG, UK} from '../tema';
import WORDS from '../data/words.json';

export const GF = createContext(0);
export const useG = () => useContext(GF);

type Wd = {word: string; f_in: number};
export const WD = WORDS as unknown as Wd[];
/** Frame masuk kata ke-i (onset +3 f, §2.1). */
export const at = (i: number, off = 3) => WD[i].f_in + off;

export type Peran = 'R1' | 'R2';
export type Tema = 'gelap' | 'terang';

export type Kata = {t: string; f: number; merah?: boolean; peran?: Peran};

/** Daftar kata dari indeks words_v6 (teks kecil, tanpa tanda baca). */
export const kata = (idx: number[], peran: Peran = 'R1', merah: number[] = []): Kata[] =>
  idx.map((i) => ({t: WD[i].word, f: at(i), peran, merah: merah.includes(i)}));

const warnaTeks = (tema: Tema, merah?: boolean) => (merah ? C.merah : tema === 'gelap' ? C.putih : C.hitam);
const bayang = (tema: Tema, belakang?: boolean) => (tema === 'gelap' ? (belakang ? GLOW_SETENGAH : GLOW) : BAYANG_TERANG);

/** Satu kata R1 (rise dari mask 10–12 f) atau R2 (pop .85→1 + geser 8 px, 6 f). */
const SatuKata: React.FC<{k: Kata; tema: Tema; size?: number; keluar?: number; belakang?: boolean}> = ({k, tema, size, keluar, belakang}) => {
  const g = useG();
  if (g < k.f) return null;
  const peran = k.peran ?? 'R1';
  const fs = size ?? (peran === 'R1' ? UK.r1 : UK.r2);
  const lv = keluar !== undefined ? ease(g, keluar, keluar + 6, 'leave') : 0;
  const style: React.CSSProperties = {
    fontFamily: F.poppins, fontWeight: peran === 'R1' ? 600 : 700, fontSize: fs, lineHeight: 1.04, color: warnaTeks(tema, k.merah),
    textShadow: bayang(tema, belakang), whiteSpace: 'nowrap', letterSpacing: peran === 'R2' ? '-0.02em' : '-0.005em',
  };
  if (peran === 'R1') {
    const p = ease(g, k.f, k.f + 11, 'reveal');
    return (
      <span style={{display: 'inline-block', overflow: 'hidden', padding: '0.06em 0.04em 0.12em', margin: '-0.06em -0.04em -0.12em', verticalAlign: 'top'}}>
        <span style={{...style, display: 'inline-block', transform: `translateY(${(1 - p) * 115 - lv * 120}%)`}}>{k.t}</span>
      </span>
    );
  }
  const p = ease(g, k.f, k.f + 6, 'land');
  const s = 0.85 + 0.15 * p;
  return (
    <span style={{display: 'inline-block', overflow: 'hidden', padding: '0.06em 0.04em 0.12em', margin: '-0.06em -0.04em -0.12em', verticalAlign: 'top'}}>
      <span style={{...style, display: 'inline-block', transform: `translate(${(1 - p) * 8}px, ${-lv * 120}%) scale(${s})`, transformOrigin: 'left bottom'}}>{k.t}</span>
    </span>
  );
};

/** Blok 1–3 kata, maks 2 baris. x,y = titik jangkar; al = perataan. Drift setelah mendarat 1 px/f. */
export const Blok: React.FC<{
  k: Kata[]; x: number; y: number; al?: 'l' | 'c' | 'r'; tema?: Tema; size?: number; tumpuk?: boolean; keluar?: number;
  drift?: number; belakang?: boolean; rot?: number; blur?: number; baris?: number[];
}> = ({k, x, y, al = 'l', tema = 'gelap', size, tumpuk, keluar, drift = 0.6, belakang, rot = 0, blur = 0, baris}) => {
  const g = useG();
  if (k.length === 0 || g < k[0].f) return null;
  if (keluar !== undefined && g > keluar + 7) return null;
  const dx = (g - k[0].f) * drift;
  const tx = al === 'l' ? '0%' : al === 'c' ? '-50%' : '-100%';
  const rows: Kata[][] = tumpuk ? k.map((w) => [w]) : baris ? baris.map((n, i) => k.slice(baris.slice(0, i).reduce((a, b) => a + b, 0), baris.slice(0, i).reduce((a, b) => a + b, 0) + n)) : [k];
  return (
    <div style={{position: 'absolute', left: x + dx, top: y, transform: `translateX(${tx}) rotate(${rot}deg)`, display: 'flex', flexDirection: 'column',
      alignItems: al === 'l' ? 'flex-start' : al === 'c' ? 'center' : 'flex-end', gap: 2, filter: blur ? `blur(${blur}px)` : undefined}}>
      {rows.map((r, i) => (
        <div key={i} style={{display: 'flex', gap: '0.26em', alignItems: 'baseline', fontSize: size ?? UK.r1}}>
          {r.map((w, j) => <SatuKata key={j} k={w} tema={tema} size={size ?? (w.peran === 'R2' ? UK.r2 : UK.r1)} keluar={keluar} belakang={belakang}/>)}
        </div>
      ))}
    </div>
  );
};

export type Slot = {x: number; y: number; al?: 'l' | 'c' | 'r'};
export type ItemNarasi = {k: Kata[]; baris?: number[]; tumpuk?: boolean; slot?: number; size?: number};

/** Narasi berurutan: blok bergantian di slot (A, B, …); blok i keluar saat blok i+2 masuk → maks 2 blok narasi di layar. */
export const Narasi: React.FC<{items: ItemNarasi[]; slots: Slot[]; tema?: Tema; drift?: number; belakang?: boolean; akhir?: number}> = ({items, slots, tema = 'gelap', drift, belakang, akhir}) => (
  <>
    {items.map((it, i) => {
      const s = slots[(it.slot ?? i) % slots.length];
      const nxt = items[i + 2];
      const keluar = nxt ? Math.min(nxt.k[0].f - 1, akhir ?? Infinity) : akhir;
      return <Blok key={i} k={it.k} x={s.x} y={s.y} al={s.al ?? 'l'} tema={tema} baris={it.baris} tumpuk={it.tumpuk} keluar={keluar} drift={drift} size={it.size} belakang={belakang}/>;
    })}
  </>
);

export type HeroMode = 'fly' | 'slam' | 'stamp';

/** Hero R6 Anton. fly: dari jauh (skala .6→1, blur 9→0, 8 f). slam: skala 1,9→1 + guncang. Pusat di (x,y). */
export const Hero: React.FC<{
  t: string; x: number; y: number; size?: number; mulai: number; darat: number; mode?: HeroMode; warna?: string; tema?: Tema;
  keluar?: number; belakang?: boolean; rot?: number; spasi?: number; drift?: number; font?: string; bobot?: number; italic?: boolean;
  glow?: boolean; children?: React.ReactNode; skalaX?: number;
}> = ({t, x, y, size = UK.hero, mulai, darat, mode = 'fly', warna, tema = 'gelap', keluar, belakang, rot = 0, spasi = 0.01, drift = 0.0009,
  font = F.anton, bobot = 400, italic, glow = true, children, skalaX = 1}) => {
  const g = useG();
  if (g < mulai) return null;
  if (keluar !== undefined && g > keluar + 6) return null;
  const n = Math.max(1, darat - mulai);
  let s = 1, blur = 0, dy = 0, dxs = 0, op = 1;
  if (mode === 'fly') {
    const p = ease(g, mulai, darat, 'land');
    s = 0.6 + 0.4 * p; blur = 9 * (1 - p); op = interpolate(g, [mulai, mulai + 2], [0, 1], {extrapolateRight: 'clamp'});
  } else {
    const p = ease(g, mulai, darat, 'whip');
    s = (mode === 'stamp' ? 1.5 : 1.9) - (mode === 'stamp' ? 0.5 : 0.9) * p; blur = 6 * (1 - p);
    if (g >= darat && g < darat + 6) {
      const k = g - darat; const a = (6 - k) / 6;
      dxs = Math.sin(k * 2.7) * 9 * a; dy = Math.cos(k * 3.1) * 7 * a;
    }
  }
  if (g > darat) s *= 1 + (g - darat) * drift;
  const lv = keluar !== undefined ? ease(g, keluar, keluar + 6, 'leave') : 0;
  const col = warna ?? (tema === 'gelap' ? C.putih : C.hitam);
  const sh = !glow ? undefined : tema === 'gelap' ? (belakang ? GLOW_SETENGAH : GLOW) : BAYANG_TERANG;
  return (
    <div style={{position: 'absolute', left: x + dxs, top: y + dy - lv * 140, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${s * (1 - lv * 0.2) * skalaX}, ${s * (1 - lv * 0.2)})`,
      fontFamily: font, fontWeight: bobot, fontStyle: italic ? 'italic' : 'normal', fontSize: size, lineHeight: 0.92, color: col, letterSpacing: `${spasi}em`,
      textShadow: sh, filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined, opacity: op * (1 - lv), whiteSpace: 'nowrap', textAlign: 'center'}}>
      {children ?? t}
    </div>
  );
};

/** Tinggi huruf kapital Anton ≈ 0,72 × font-size. */
export const antonCap = (fs: number) => fs * 0.72;

/** Kurva dipakai ulang di tempat lain. */
export {CURVE};
