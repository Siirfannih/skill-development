// Produk.tsx · #6 White Studio meja, #7 desktop Baikov (timeline 6 bulan + jendela UI asli), #8 kardus BELUM DI-LAUNCHING.
import React from 'react';
import {Img, Sequence, staticFile} from 'remotion';
import {ease, lerp, track} from '../anim';
import {Blok, Hero, kata, useG, Narasi} from '../kt/KT';
import {Kamera} from '../Plate';
import {Orang, WhiteStudio} from './Studio';
import {Jendela} from '../ui/UI';
import {Kardus} from '../ui/Kardus';
import {MB} from '../fx/FX';
import {kp} from '../data/kepala';
import {C, F} from '../tema';

// Desktop dark-glow cyan (dunia Baikov)
export const Desktop: React.FC<{children?: React.ReactNode; terang?: number}> = ({children, terang = 1}) => (
  <div style={{position: 'absolute', inset: 0, background: C.void, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -300, top: 300, width: 1700, height: 1300, borderRadius: '50%', background: `radial-gradient(ellipse, rgba(56,189,248,${0.28 * terang}) 0%, rgba(37,99,235,${0.12 * terang}) 35%, rgba(5,6,10,0) 70%)`}}/>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(56,189,248,.10) 0%, rgba(0,0,0,0) 70%)'}}/>
    {children}
  </div>
);

// Jendela produk asli (tangkapan 19 Nov). crop = area isi yang ditampilkan.
export const PRODUK = {
  workspace: {src: 'ui/jadisatu.png', url: 'workspace.jadisatu.cloud', crop: {x: 1000, y: 820, w: 1880, h: 980}},
  canvas: {src: 'ui/canvas.png', url: 'canvas.jadisatu.cloud', crop: {x: 0, y: 0, w: 1440, h: 900}, srcW: 1440, srcH: 1000},
  greatstock: {src: 'ui/greatstock.png', url: 'greatstock.jadisatu.cloud', crop: {x: 0, y: 0, w: 2880, h: 1800}},
  tuntunly: {src: 'ui/tuntunly.png', url: 'tuntunly.com', crop: {x: 0, y: 0, w: 2880, h: 1800}},
  github: {src: 'ui/github_skilldev.png', url: 'github.com/Siirfannih/skill-development', crop: {x: 0, y: 0, w: 2880, h: 1800}},
} as const;
export type ProdukId = keyof typeof PRODUK;

export const JendelaProduk: React.FC<{id: ProdukId; w: number; tahap?: number; glow?: number; style?: React.CSSProperties}> = ({id, w, tahap = 1, glow = 0.6, style}) => {
  const p = PRODUK[id] as {src: string; url: string; crop: {x: number; y: number; w: number; h: number}; srcW?: number; srcH?: number};
  const h = w * (p.crop.h / p.crop.w) + w * 0.075 * (p.crop.h / p.crop.w) * 1.1;
  return <Jendela src={p.src} url={p.url} crop={p.crop} srcW={p.srcW} srcH={p.srcH} w={w} h={h} tahap={tahap} glow={glow} style={style}/>;
};

// ---------- #6 · f286–386 · White Studio, meja putih + monitor ----------
const MON = {x: 40, y: 900, w: 430, h: 300}; // layar monitor (dunia)
export const S6: React.FC = () => {
  const g = useG();
  const k = kp('s6');
  const s = 0.86, px = 760, ox = k.cx, oy = 900;
  const muka = {x: px, y: oy + ((k.top + k.chin) / 2 - oy) * s};
  // push-in → punch f344 → push-through ke layar monitor f378–386
  const camS = track(g, [[286, 1], [344, 1.08, 'drift'], [349, 1.18, 'heavy'], [378, 1.2, 'drift'], [386, 4.2, 'whip']]);
  const camOx = track(g, [[286, muka.x], [378, muka.x], [386, MON.x + MON.w / 2, 'whip']]);
  const camOy = track(g, [[286, muka.y], [378, muka.y], [386, MON.y + MON.h / 2, 'whip']]);
  const v = track(g + 0.5, [[378, 1.2], [386, 4.2, 'whip']]) - track(g - 0.5, [[378, 1.2], [386, 4.2, 'whip']]);
  const meja = 1330;
  return (
    <Sequence from={286} durationInFrames={100} layout="none">
      <MB id="s6" dx={v * 60} dy={v * 30}>
        <div style={{position: 'absolute', inset: 0, transformOrigin: `${camOx}px ${camOy}px`, transform: `scale(${camS})`}}>
          <WhiteStudio horizon={1250}/>
          {/* lemari abu di belakang kanan */}
          <div style={{position: 'absolute', left: 900, top: 980, width: 200, height: 360, background: 'linear-gradient(90deg,#B9BABD,#A9AAAD)', borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,.12)'}}>
            {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 20, right: 20, top: 30 + i * 110, height: 80, borderRadius: 4, background: '#C4C5C8', boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.08)'}}/>)}
          </div>
          <Hero t="FOKUS" x={600} y={560} size={380} mulai={357} darat={362} tema="terang" glow={false} warna="#CFCDC6"/>
          <Orang dari={286} x={px - ox} y={0} s={s} ox={ox} oy={oy}/>
          {/* meja putih trestle */}
          <div style={{position: 'absolute', left: -40, top: meja, width: 1160, height: 34, background: 'linear-gradient(180deg,#FFFFFF,#ECECEA)', borderRadius: 4, boxShadow: '0 14px 30px rgba(0,0,0,.14)'}}/>
          <div style={{position: 'absolute', left: -40, top: meja + 34, width: 1160, height: 600, background: 'linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,0) 30%)'}}/>
          {[90, 380, 700, 990].map((x, i) => <div key={i} style={{position: 'absolute', left: x, top: meja + 34, width: 16, height: 560, background: '#3A3B3E', transform: `skewX(${i % 2 ? 8 : -8}deg)`}}/>)}
          {/* PRODUK rebah di permukaan meja */}
          <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, perspective: 900}}>
            <div style={{position: 'absolute', left: 0, top: meja - 150, width: 1080, height: 300, transformOrigin: '50% 100%', transform: 'rotateX(68deg)'}}>
              <Hero t="PRODUK" x={600} y={150} size={300} mulai={332} darat={337} tema="terang" glow={false}/>
            </div>
          </div>
          {/* monitor all-in-one di tepi kiri meja, layar menghadap kamera */}
          <div style={{position: 'absolute', left: MON.x + MON.w / 2 - 40, top: MON.y + MON.h + 20, width: 80, height: meja - (MON.y + MON.h + 20), background: 'linear-gradient(90deg,#E4E4E2,#FFFFFF,#E4E4E2)'}}/>
          <div style={{position: 'absolute', left: MON.x - 18, top: MON.y - 18, width: MON.w + 36, height: MON.h + 70, borderRadius: 18, background: '#F7F7F5', boxShadow: '0 30px 60px rgba(0,0,0,.18)'}}/>
          <div style={{position: 'absolute', left: MON.x, top: MON.y, width: MON.w, height: MON.h, borderRadius: 6, overflow: 'hidden'}}>
            <Desktop>
              <div style={{position: 'absolute', left: 30, top: 60, transform: 'scale(.34)', transformOrigin: '0 0'}}>
                <JendelaProduk id="workspace" w={1100}/>
              </div>
            </Desktop>
          </div>
          {/* sticky note kuning, map, tanaman */}
          {[{x: MON.x - 30, y: MON.y + 30, r: -8}, {x: MON.x + MON.w - 20, y: MON.y - 10, r: 6}, {x: MON.x + MON.w - 10, y: MON.y + 120, r: -4}].map((n, i) => (
            <div key={i} style={{position: 'absolute', left: n.x, top: n.y, width: 64, height: 64, background: '#FFE27A', transform: `rotate(${n.r}deg)`, boxShadow: '0 4px 8px rgba(0,0,0,.12)'}}/>
          ))}
          <div style={{position: 'absolute', left: 540, top: meja - 70, width: 170, height: 70, background: 'linear-gradient(180deg,#D7DCE3,#C3C9D2)', borderRadius: 4, transform: 'rotate(-2deg)'}}/>
          <div style={{position: 'absolute', left: 960, top: meja - 180, width: 80, height: 180}}>
            <div style={{position: 'absolute', bottom: 0, left: 10, width: 60, height: 70, background: '#EDEDEB', borderRadius: '6px 6px 14px 14px'}}/>
            {[-30, -5, 20, 40].map((r, i) => <div key={i} style={{position: 'absolute', bottom: 60, left: 36, width: 14, height: 120, borderRadius: 10, background: '#4C8B4A', transformOrigin: 'bottom', transform: `rotate(${r}deg)`}}/>)}
          </div>
        </div>
      </MB>
      {/* KT hitam: dinding kiri atas (slot bergantian) */}
      <Narasi tema="terang" items={[{k: kata([36, 37])}, {k: kata([38, 39])}, {k: kata([40], 'R2')}, {k: kata([41])}, {k: kata([43, 44, 45])}, {k: kata([47, 48])}]}
        slots={[{x: 60, y: 170}, {x: 60, y: 270}]}/>
    </Sequence>
  );
};

// ---------- #7 · f386–478 · desktop, timeline 6 bulan → jendela UI asli ----------
const J7: {id: ProdukId; f: number; x: number; y: number; w: number}[] = [
  {id: 'workspace', f: 445, x: 540, y: 820, w: 760},
  {id: 'canvas', f: 452, x: 250, y: 1230, w: 430},
  {id: 'greatstock', f: 458, x: 830, y: 1210, w: 420},
  {id: 'tuntunly', f: 458, x: 300, y: 520, w: 380},
  {id: 'github', f: 470, x: 880, y: 560, w: 300},
];
export const S7: React.FC = () => {
  const g = useG();
  // kamera: dekat di timeline → mundur memperlihatkan jendela → push ke dasbor Workspace
  const camS = track(g, [[386, 2.6], [390, 2.2, 'whip'], [432, 1.85, 'drift'], [446, 1.0, 'heavy'], [470, 1.0, 'drift'], [478, 1.35, 'heavy']]);
  const camOy = track(g, [[386, 1000], [432, 1000], [446, 900, 'heavy'], [478, 820, 'heavy']]);
  const play = ease(g, 390, 432, 'heavy');
  const TL = {x0: 170, x1: 910, y: 1000};
  return (
    <Sequence from={386} durationInFrames={92} layout="none">
      <Desktop>
        <div style={{position: 'absolute', inset: 0, transformOrigin: `540px ${camOy}px`, transform: `scale(${camS})`}}>
          {/* timeline tipis 6 tanda, tanpa label bulan */}
          <div style={{position: 'absolute', left: TL.x0, top: TL.y, width: TL.x1 - TL.x0, height: 3, background: 'rgba(250,248,236,.25)', borderRadius: 2}}/>
          <div style={{position: 'absolute', left: TL.x0, top: TL.y, width: (TL.x1 - TL.x0) * play, height: 3, background: C.cyan, boxShadow: `0 0 14px ${C.cyan}`}}/>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = TL.x0 + ((TL.x1 - TL.x0) * i) / 5; const lit = play * 5 >= i - 0.01;
            return <div key={i} style={{position: 'absolute', left: x - 7, top: TL.y - 6, width: 14, height: 14, borderRadius: 7, background: lit ? C.cyan : '#2A3442', boxShadow: lit ? `0 0 12px ${C.cyan}` : undefined}}/>;
          })}
          <div style={{position: 'absolute', left: TL.x0 + (TL.x1 - TL.x0) * play - 2, top: TL.y - 34, width: 4, height: 70, background: C.putih, borderRadius: 2, boxShadow: '0 0 10px rgba(255,255,255,.8)'}}/>
          <Hero t="6 BULAN" x={540} y={TL.y + 120} size={170} mulai={403} darat={408} keluar={436}/>
          {/* jendela UI asli lahir bertahap: bingkai → sidebar → isi */}
          {J7.map((j) => {
            if (g < j.f - 2) return null;
            const p = ease(g, j.f - 2, j.f + 6, 'land');
            const tahap = ease(g, j.f, j.f + 10, 'heavy');
            return (
              <div key={j.id} style={{position: 'absolute', left: j.x, top: j.y, transform: `translate(-50%,-50%) translateY(${(1 - p) * 120}px) scale(${0.7 + 0.3 * p})`, opacity: p > 0 ? 1 : 0}}>
                <JendelaProduk id={j.id} w={j.w} tahap={tahap}/>
              </div>
            );
          })}
        </div>
      </Desktop>
      <Narasi items={[{k: kata([49, 50])}, {k: kata([53, 54])}, {k: [...kata([55, 56]), ...kata([57], 'R2')], baris: [2, 1]}, {k: kata([58, 59])}]}
        slots={[{x: 110, y: 200}, {x: 110, y: 1480}]}/>
    </Sequence>
  );
};

// ---------- #8 · f478–540 · kardus, BELUM DI-LAUNCHING ----------
export const KARDUS_POS = {x: 540, y: 1080, w: 560};
export const S8: React.FC = () => {
  const g = useG();
  const tutup = ease(g, 484, 489, 'whip');
  const turun = ease(g, 478, 489, 'heavy');
  const shake = g >= 504 && g < 508 ? {x: Math.sin(g * 3.1) * 8 * (508 - g) / 4, y: Math.cos(g * 2.3) * 6 * (508 - g) / 4} : {x: 0, y: 0};
  const camS = track(g, [[478, 1], [540, 1.06, 'drift']]);
  return (
    <Sequence from={478} durationInFrames={62} layout="none">
      <div style={{position: 'absolute', inset: 0, background: C.krem}}>
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,255,255,.6) 0%, rgba(255,255,255,0) 70%)'}}/>
        <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 1000px', transform: `translate(${shake.x}px, ${shake.y}px) scale(${camS})`}}>
          <Kardus x={KARDUS_POS.x} y={KARDUS_POS.y - (1 - turun) * 40} w={KARDUS_POS.w} tutup={tutup} selotip={ease(g, 489, 495, 'land')}
            stempel={g >= 499 ? ease(g, 499, 504, 'whip') : 0} stempel2={g >= 507 ? ease(g, 507, 512, 'whip') : 0}>
            {/* lima jendela menyusut dan jatuh ke kardus f478–486 */}
            {(['workspace', 'canvas', 'greatstock', 'tuntunly', 'github'] as ProdukId[]).map((id, i) => {
              const p = ease(g, 478 + i * 1.2, 486 + i * 0.6, 'heavy');
              if (p >= 1) return null;
              const x0 = [280, 60, 360, 80, 360][i], y0 = [-300, -120, -140, -480, -460][i];
              return (
                <div key={id} style={{position: 'absolute', left: lerp(x0, 120 + i * 40, p), bottom: lerp(1000 + -y0, 60, p), transform: `scale(${lerp(0.5, 0.22, p)}) rotate(${(i - 2) * 9 * p}deg)`, transformOrigin: '0 100%'}}>
                  <JendelaProduk id={id} w={900}/>
                </div>
              );
            })}
          </Kardus>
        </div>
      </div>
      <Blok k={kata([60])} x={110} y={330} tema="terang" keluar={490}/>
      <Blok k={kata([61, 62])} x={110} y={330} tema="terang" keluar={520}/>
      <Blok k={kata([66, 67])} x={540} y={1450} al="c" tema="terang"/>
    </Sequence>
  );
};
export {Img, staticFile, F};
