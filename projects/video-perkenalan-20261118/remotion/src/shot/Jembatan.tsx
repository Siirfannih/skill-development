// Jembatan.tsx · #13 kardus dibuka (produk keluar), #14 repo skill-development + sesi Claude, #15 White Studio 100%, #16 dock: CapCut/Premiere/AE batal.
import React from 'react';
import {Img, Sequence, staticFile} from 'remotion';
import {ease, lerp, track} from '../anim';
import {Blok, Hero, kata, useG, Narasi} from '../kt/KT';
import {Cam, camStyle, Kamera} from '../Plate';
import {Orang, WhiteStudio} from './Studio';
import {Desktop, JendelaProduk, KARDUS_POS, ProdukId} from './Produk';
import {Jendela} from '../ui/UI';
import {Kardus} from '../ui/Kardus';
import {MB} from '../fx/FX';
import {kp} from '../data/kepala';
import {C, F} from '../tema';

const vel = (g: number, keys: Parameters<typeof track>[1]) => track(g + 0.5, keys) - track(g - 0.5, keys);

// ---------- #13 · f914–985 · kardus tersegel dibuka di "jadi", lima jendela naik ----------
const J13: {id: ProdukId; x: number; y: number; w: number; r: number}[] = [
  {id: 'workspace', x: 270, y: 300, w: 380, r: -4},
  {id: 'canvas', x: 810, y: 300, w: 340, r: 3},
  {id: 'greatstock', x: 175, y: 560, w: 290, r: 5},
  {id: 'tuntunly', x: 905, y: 560, w: 290, r: -5},
  {id: 'github', x: 540, y: 470, w: 340, r: 0},
];
export const S13: React.FC = () => {
  const g = useG();
  const camXk: Parameters<typeof track>[1] = [[914, -620], [921, 0, 'whip']];
  const camX = track(g, camXk);
  const camS = track(g, [[914, 1.08], [921, 1, 'whip'], [962, 1.02, 'drift'], [984, 1.1, 'heavy']]);
  const buka = ease(g, 922, 928, 'whip');
  const sobek = ease(g, 922, 925, 'whip');
  const geser = ease(g, 965, 980, 'heavy');
  const jendela = (depan: boolean) => J13.map((j, i) => {
    const naik = ease(g, 922 + i * 0.6, 934 + i * 0.6, 'heavy');
    if (naik <= 0) return null;
    if ((g >= 932) !== depan) return null;
    const bentuk = ease(g, 941, 955, 'drift');
    const gh = j.id === 'github';
    let x = lerp(KARDUS_POS.x, j.x, naik), y = lerp(KARDUS_POS.y - 120, j.y, naik) + Math.sin((g + i * 9) / 11) * 6 * bentuk;
    let w = lerp(j.w * 0.3, j.w, naik), r = j.r * naik * (1 - 0.5 * bentuk), terang = 1;
    if (gh) { x = lerp(x, 540, geser); y = lerp(y, 700, geser); w = lerp(w, 920, geser); }
    else { x += (j.x < 540 ? -1 : 1) * 300 * geser; terang = 1 - 0.55 * geser; }
    return (
      <div key={j.id} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${r}deg) scale(${w / 900})`, filter: terang < 1 ? `brightness(${terang})` : undefined, zIndex: gh ? 2 : 1}}>
        <JendelaProduk id={j.id} w={900} glow={0}/>
      </div>
    );
  });
  return (
    <Sequence from={914} durationInFrames={71} layout="none">
      <div style={{position: 'absolute', inset: 0, background: C.krem}}>
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,255,255,.6) 0%, rgba(255,255,255,0) 70%)'}}/>
        <MB id="s13" dx={vel(g, camXk) * 1.2}>
          <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 700px', transform: `translateX(${camX}px) scale(${camS})`}}>
            {jendela(false)}
            <Kardus x={KARDUS_POS.x} y={KARDUS_POS.y} w={KARDUS_POS.w} tutup={1 - buka} selotip={1} sobek={sobek} stempel={1} stempel2={1}/>
            {jendela(true)}
          </div>
        </MB>
      </div>
      <Narasi tema="terang" items={[{k: kata([105])}, {k: kata([106, 107])}, {k: kata([108, 109], 'R2'), baris: [1, 1]}, {k: kata([110, 111])}, {k: kata([112])}]}
        slots={[{x: 80, y: 1330}, {x: 1000, y: 1500, al: 'r'}]}/>
    </Sequence>
  );
};

// ---------- #14 · f985–1076 · push-through ke repo, punch ke judul; f1028 jendela sesi Claude ----------
const GH = {x: 540, y: 600, w: 1000};
const JUDUL = {x: GH.x - GH.w / 2 + 170, y: GH.y - 338 + 192}; // judul repo di tangkapan GitHub (px dunia)
export const S14: React.FC = () => {
  const g = useG();
  const sK: Parameters<typeof track>[1] = [[985, 0.92], [990, 1, 'whip'], [998, 1.8, 'heavy'], [1022, 1.86, 'drift'], [1033, 1, 'heavy'], [1076, 1.1, 'drift']];
  const cam: Cam = {
    s: sK,
    x: [[985, 0], [990, 0], [998, 540 - JUDUL.x, 'heavy'], [1022, 540 - JUDUL.x], [1033, 0, 'heavy']],
    y: [[985, 0], [990, 0], [998, 600 - JUDUL.y, 'heavy'], [1022, 600 - JUDUL.y], [1033, -250, 'heavy'], [1076, -270, 'drift']],
    ox: JUDUL.x, oy: JUDUL.y,
  };
  const cl = ease(g, 1026, 1033, 'land');
  const v = vel(g, sK);
  return (
    <Sequence from={985} durationInFrames={91} layout="none">
      <Desktop>
        <MB id="s14" dy={v * 40} dx={v * 25}>
          <div style={camStyle(g, cam)}>
            <div style={{position: 'absolute', left: GH.x, top: GH.y, transform: 'translate(-50%,-50%)'}}>
              <JendelaProduk id="github" w={GH.w} glow={0.5}/>
            </div>
            {g >= 1026 ? (
              <div style={{position: 'absolute', left: 90, top: 960, transform: `translateY(${(1 - cl) * 260}px) scale(${0.8 + 0.2 * cl})`, transformOrigin: '50% 0', opacity: cl > 0 ? 1 : 0}}>
                <Jendela src="ui/claude_code.png" srcW={2000} srcH={1228} crop={{x: 0, y: 60, w: 2000, h: 1168}} w={900} h={900 * 0.584 + 50} glow={0.7} tahap={ease(g, 1028, 1038, 'heavy')}/>
              </div>
            ) : null}
          </div>
        </MB>
      </Desktop>
      <Narasi items={[{k: kata([115, 116])}, {k: kata([117, 118, 119])}, {k: kata([120, 121])}, {k: kata([122], 'R2')}, {k: kata([123, 124])}]}
        slots={[{x: 80, y: 1600}, {x: 1000, y: 1690, al: 'r'}]}/>
    </Sequence>
  );
};

// ---------- #15 · f1076–1190 · White Studio, 100% slam di dinding, laptop tertutup di lantai ----------
export const LAPTOP15 = {x: 40, y: 1440, w: 400};
/** Laptop tertutup tergeletak (tutup aluminium, perspektif). */
const Laptop: React.FC<{x: number; y: number; w: number}> = ({x, y, w}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: w * 0.7, perspective: 900}}>
    <div style={{position: 'absolute', left: -w * 0.06, top: w * 0.42, width: w * 1.12, height: w * 0.2, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(40,40,50,.35) 0%, rgba(40,40,50,0) 70%)'}}/>
    <div style={{position: 'absolute', left: 0, top: 0, width: w, height: w * 0.68, transformOrigin: '50% 100%', transform: 'rotateX(62deg) rotateZ(-8deg)',
      borderRadius: w * 0.03, background: 'linear-gradient(135deg,#E9EAEC 0%,#C9CBCF 55%,#B4B6BA 100%)', boxShadow: `0 ${w * 0.02}px 0 #8E9094, 0 ${w * 0.035}px 0 #6E7074`}}>
      <div style={{position: 'absolute', left: '44%', top: '40%', width: '12%', height: '17%', borderRadius: '45%', background: 'rgba(255,255,255,.55)'}}/>
    </div>
  </div>
);
export const S15: React.FC = () => {
  const k = kp('s15');
  const s = 0.82, px = 660, dy = 120, oy = 900;
  const top = oy + (k.top - oy) * s + dy;
  const cam: Cam = {s: [[1076, 1], [1125, 1.06, 'drift'], [1126, 1.16, 'hold'], [1190, 1.19, 'drift']], ox: px, oy: top + 300};
  return (
    <Sequence from={1076} durationInFrames={114} layout="none">
      <Kamera cam={cam}>
        <WhiteStudio horizon={1500}/>
        <Hero t="100%" x={560} y={top - 170} size={340} mulai={1101} darat={1106} mode="slam" tema="terang" warna={C.hitam} glow={false}/>
        <Orang dari={1076} x={px - k.cx} y={dy} s={s} ox={k.cx} oy={oy}/>
        <Laptop {...LAPTOP15}/>
      </Kamera>
      <Narasi tema="terang" items={[{k: kata([125])}, {k: kata([126], 'R2')}, {k: kata([129, 130])}, {k: kata([131, 132], 'R2'), baris: [1, 1]}, {k: kata([135, 136])}]}
        slots={[{x: 50, y: 720}, {x: 50, y: 830}]}/>
      <Blok k={kata([133, 134], 'R2')} x={LAPTOP15.x + 10} y={LAPTOP15.y - 120} tema="terang"/>
    </Sequence>
  );
};

// ---------- #16 · f1190–1305 · laptop terbuka → dock; ikon asli memantul lalu batal ----------
const APP = [
  {ikon: 'ikon/capcut.svg', nama: 'CapCut', pantul: 1207, batal: 1219, kt: [137, 138, 139]},
  {ikon: 'ikon/premiere.svg', nama: 'Adobe Premiere Pro', pantul: 1236, batal: 1257, kt: [141, 142, 143]},
  {ikon: 'ikon/aftereffects.svg', nama: 'Adobe After Effects', pantul: 1284, batal: 1302, kt: [147, 148, 149]},
];
const DOCK = {y: 1180, ik: 170, gap: 56};
const ikonX = (i: number) => 540 + (i - 1) * (DOCK.ik + DOCK.gap);
export const S16: React.FC = () => {
  const g = useG();
  const buka = ease(g, 1190, 1199, 'whip');
  const xK: Parameters<typeof track>[1] = [[1190, 0], [1200, 540 - ikonX(0), 'heavy'], [1226, 540 - ikonX(0)], [1234, 540 - ikonX(1), 'heavy'], [1272, 540 - ikonX(1)], [1281, 540 - ikonX(2), 'heavy'], [1305, 540 - ikonX(2) - 10, 'drift']];
  const cam: Cam = {s: [[1190, 0.35], [1199, 1, 'whip'], [1204, 1.3, 'heavy'], [1305, 1.34, 'drift']], x: xK, ox: 540, oy: DOCK.y};
  return (
    <Sequence from={1190} durationInFrames={115} layout="none">
      <div style={{position: 'absolute', inset: 0, background: buka < 1 ? '#E6E5E1' : C.void}}/>
      <MB id="s16" dx={vel(g, xK) * 1.1} dy={(1 - buka) * 30}>
        <div style={{...camStyle(g, cam), borderRadius: (1 - buka) * 60, overflow: 'hidden'}}>
          <Desktop>
            {/* dock kaca */}
            <div style={{position: 'absolute', left: ikonX(0) - DOCK.ik / 2 - 34, top: DOCK.y - DOCK.ik / 2 - 24, width: DOCK.ik * 3 + DOCK.gap * 2 + 68, height: DOCK.ik + 48, borderRadius: 44,
              background: 'rgba(255,255,255,.14)', border: '1.5px solid rgba(255,255,255,.22)', boxShadow: '0 20px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.25)', backdropFilter: 'blur(20px)'}}/>
            {APP.map((a, i) => {
              const t = g - a.pantul;
              const loncat = t >= 0 && g < a.batal ? Math.abs(Math.sin(t * 0.42)) * 70 * Math.exp(-t * 0.05) : 0;
              const batal = ease(g, a.batal, a.batal + 7, 'leave');
              const tip = g >= a.pantul - 2 && g < a.batal ? ease(g, a.pantul - 2, a.pantul + 3, 'land') : 0;
              return (
                <React.Fragment key={a.nama}>
                  <Img src={staticFile(a.ikon)} style={{position: 'absolute', left: ikonX(i) - DOCK.ik / 2, top: DOCK.y - DOCK.ik / 2 - loncat + batal * 22, width: DOCK.ik, height: DOCK.ik,
                    filter: batal > 0 ? `grayscale(${batal}) brightness(${1 - 0.55 * batal})` : 'drop-shadow(0 8px 14px rgba(0,0,0,.4))'}}/>
                  {tip > 0 ? (
                    <div style={{position: 'absolute', left: ikonX(i), top: DOCK.y - DOCK.ik / 2 - 110, transform: `translate(-50%, ${(1 - tip) * 10}px)`, opacity: tip,
                      background: 'rgba(30,31,35,.92)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 10, padding: '8px 18px', fontFamily: F.inter, fontWeight: 500, fontSize: 28, color: '#F2F2F2', whiteSpace: 'nowrap'}}>{a.nama}</div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </Desktop>
        </div>
      </MB>
      {APP.map((a, i) => {
        const nx = APP[i + 1];
        const ks = [...kata([a.kt[0]]), ...kata([a.kt[1]], 'R2'), ...kata([a.kt[2]])];
        return <Blok key={i} k={ks} x={540} y={1440} al="c" keluar={nx ? nx.kt[0] && kata([nx.kt[0]])[0].f - 1 : undefined}/>;
      })}
    </Sequence>
  );
};
