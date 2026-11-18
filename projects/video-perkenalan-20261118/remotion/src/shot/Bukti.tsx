// Bukti.tsx · #17 AI orbit + kartu repo/Claude mengorbit badan, #18 BERBEDA + LightSweep, #19 deret produk menunggu,
// #20 kartu produk di samping kepala, #21 Blue Void BUILDER TRAP cincin sobek, #22 selamat datang.
import React from 'react';
import {Sequence} from 'remotion';
import {ease, lerp, track} from '../anim';
import {Blok, Hero, kata, useG, Narasi} from '../kt/KT';
import {Orbit} from '../kt/Orbit';
import {Cam, camStyle, Kamera, TH} from '../Plate';
import {BlueVoid, Orang} from './Studio';
import {Desktop, JendelaProduk, ProdukId} from './Produk';
import {Jendela} from '../ui/UI';
import {MB} from '../fx/FX';
import {kp} from '../data/kepala';
import {C, F} from '../tema';

const vel = (g: number, keys: Parameters<typeof track>[1]) => track(g + 0.5, keys) - track(g - 0.5, keys);

// ---------- #17 · f1305–1426 · pull-back ke wajah; AI orbit; dua kartu UI mengorbit badan ----------
const KartuOrbit: React.FC<{lapis: 'belakang' | 'depan'; cx: number; cy: number}> = ({lapis, cx, cy}) => {
  const g = useG();
  if (g < 1384) return null;
  const muncul = ease(g, 1384, 1392, 'land');
  return (
    <>
      {[0, 1].map((i) => {
        const th = (200 + i * 180 + (g - 1384) * 4.2) * (Math.PI / 180);
        const z = Math.sin(th);
        if ((lapis === 'belakang') !== (z < 0)) return null;
        const x = cx + Math.cos(th) * 330 * muncul, y = cy + z * 95;
        const sc = (0.78 + 0.22 * ((z + 1) / 2)) * (0.4 + 0.6 * muncul);
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${sc})`, filter: z < 0 ? 'brightness(.8)' : undefined}}>
            {i === 0 ? <JendelaProduk id="github" w={300} glow={0.5}/> : <Jendela src="ui/claude_code.png" srcW={2000} srcH={1228} crop={{x: 0, y: 60, w: 2000, h: 1168}} w={300} h={300 * 0.584 + 18} glow={0.5}/>}
          </div>
        );
      })}
    </>
  );
};
export const S17: React.FC = () => {
  const k = kp('s17');
  const cam: Cam = {s: [[1305, 1.25], [1314, 1, 'heavy'], [1370, 1.02, 'drift'], [1371, 1.15, 'hold'], [1426, 1.17, 'drift']], ox: k.cx, oy: 900};
  const orb = {t: 'AI', cx: k.cx, cy: k.chin - 30, rx: 380, ry: 70, mulai: 1353, darat: 1363, lineX: k.cx, lineY: k.top - 130, fs: 280};
  const dada = k.chin + 20;
  return (
    <TH a={1305} b={1426} cam={cam}
      belakang={<><Orbit {...orb} lapis="belakang"/><KartuOrbit lapis="belakang" cx={k.cx} cy={dada}/></>}
      depan={<><Orbit {...orb} lapis="depan"/><KartuOrbit lapis="depan" cx={k.cx} cy={dada}/></>}
      atas={<>
        <Narasi items={[{k: kata([152])}, {k: kata([153, 154], 'R2')}, {k: kata([155])}, {k: kata([157, 158])}, {k: kata([159], 'R2')}]}
          slots={[{x: 70, y: 1530}, {x: 1010, y: 1630, al: 'r'}]}/>
        <Blok k={kata([160, 161], 'R2')} x={540} y={1380} al="c"/>
      </>}
    />
  );
};

// ---------- #18 · f1426–1485 · crop 1,30 → 1,15 (f1458); BERBEDA slam + kilat cahaya ----------
const Sapuan: React.FC<{t: string; x: number; y: number; size: number; a: number; b: number}> = ({t, x, y, size, a, b}) => {
  const g = useG();
  if (g < a || g > b) return null;
  const p = ease(g, a, b, 'heavy');
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', fontFamily: F.anton, fontSize: size, lineHeight: 0.92, letterSpacing: '0.01em', whiteSpace: 'nowrap',
      color: 'transparent', backgroundImage: `linear-gradient(105deg, rgba(255,255,255,0) ${p * 140 - 30}%, rgba(255,255,255,.95) ${p * 140 - 15}%, rgba(127,168,255,.9) ${p * 140 - 10}%, rgba(255,255,255,0) ${p * 140}%)`,
      WebkitBackgroundClip: 'text', backgroundClip: 'text', filter: 'drop-shadow(0 0 18px rgba(200,225,255,.7))'}}>{t}</div>
  );
};
export const S18: React.FC = () => {
  const k = kp('s18b');
  const cam: Cam = {s: [[1426, 1.3], [1457, 1.32, 'drift'], [1458, 1.15, 'hold'], [1485, 1.17, 'drift']], ox: k.cx, oy: 900};
  const y = k.top - 60;
  return (
    <TH a={1426} b={1485} cam={cam}
      belakang={<>
        <Hero t="BERBEDA" x={540} y={y} size={230} mulai={1467} darat={1472} mode="slam" belakang/>
        <Sapuan t="BERBEDA" x={540} y={y} size={230} a={1474} b={1482}/>
      </>}
      atas={<Narasi items={[{k: kata([162, 163])}, {k: kata([164, 165])}, {k: kata([166])}]} slots={[{x: 70, y: 1480}, {x: 1010, y: 1570, al: 'r'}]}/>}
    />
  );
};

// ---------- #19 · f1485–1574 · empat jendela produk berderet redup; kamera menyusuri, tiap jendela menyala ----------
const DERET: ProdukId[] = ['workspace', 'canvas', 'greatstock', 'tuntunly'];
const dX = (i: number) => 540 + i * 780;
export const S19: React.FC = () => {
  const g = useG();
  const xK: Parameters<typeof track>[1] = [[1485, 60], [1492, 0, 'heavy'], [1500, 0], [1512, -780, 'heavy'], [1527, -780], [1539, -1560, 'heavy'], [1552, -1560], [1564, -2340, 'heavy'], [1574, -2370, 'drift']];
  const camX = track(g, xK);
  const camS = track(g, [[1485, 1.12], [1574, 1.18, 'drift']]);
  return (
    <Sequence from={1485} durationInFrames={89} layout="none">
      <Desktop terang={0.7}>
        <MB id="s19" dx={vel(g, xK) * 1.1}>
          <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 820px', transform: `scale(${camS}) translateX(${camX}px)`, perspective: 1600}}>
            {DERET.map((id, i) => {
              const sx = dX(i) + camX;
              const d = Math.min(1, Math.abs(sx - 540) / 520);
              const nyala = 1 - d;
              return (
                <div key={id} style={{position: 'absolute', left: dX(i), top: 820, transform: `translate(-50%,-50%) rotateY(${(sx - 540) / 780 * -18}deg) scale(${0.92 + 0.08 * nyala})`,
                  filter: `brightness(${0.35 + 0.65 * nyala}) saturate(${0.5 + 0.5 * nyala})`}}>
                  <JendelaProduk id={id} w={700} glow={0.9 * nyala}/>
                </div>
              );
            })}
          </div>
        </MB>
      </Desktop>
      <Narasi items={[{k: kata([168])}, {k: kata([169, 170, 171])}, {k: kata([172])}, {k: kata([173, 174], 'R2')}, {k: kata([175, 176], 'R1', [176])}, {k: [...kata([177]), ...kata([178], 'R2')]}]}
        slots={[{x: 80, y: 1320}, {x: 1000, y: 1420, al: 'r'}]}/>
    </Sequence>
  );
};

// ---------- #20 · f1574–1677 · TH; kartu produk melayang di samping kepala ----------
export const S20: React.FC = () => {
  const g = useG();
  const k = kp('s20');
  const cam: Cam = {s: [[1574, 1], [1631, 1.02, 'drift'], [1632, 1.1, 'hold'], [1677, 1.12, 'drift']], ox: k.cx, oy: 900};
  const kx = 915;
  return (
    <TH a={1574} b={1677} cam={cam}
      depan={<>
        {DERET.map((id, i) => {
          const p = ease(g, 1576 + i * 3, 1586 + i * 3, 'land');
          const y = k.top + 20 + i * 180 + Math.sin((g + i * 20) / 18) * 8;
          return (
            <div key={id} style={{position: 'absolute', left: lerp(1300, kx, p), top: y, transform: `translate(-50%,-50%) rotate(${(i % 2 ? 3 : -3) + (1 - p) * 12}deg)`}}>
              <JendelaProduk id={id} w={215} glow={0.4}/>
            </div>
          );
        })}
      </>}
      atas={<>
        <Narasi items={[{k: kata([179, 180, 181])}, {k: kata([182], 'R2')}, {k: kata([183, 184], 'R2')}, {k: kata([185, 186, 187])}, {k: kata([190, 191, 192])}]}
          slots={[{x: 70, y: 1440}, {x: 70, y: 1560}]}/>
        <Blok k={kata([188, 189])} x={1010} y={1290} al="r" keluar={1652}/>
      </>}
    />
  );
};

// ---------- #21 · f1677–1790 · Blue Void, cutout melangkah ke pusat lingkaran; cincin BUILDER TRAP sobek ----------
export const S21: React.FC = () => {
  const g = useG();
  const k = kp('s21');
  const s = 0.76, ox = k.cx, oy = 900;
  const masuk = ease(g, 1677, 1745, 'heavy');
  const dx = lerp(-330, 540 - ox, masuk) + track(g, [[1745, 0], [1790, 30, 'drift']]), dy = 80;
  const chin = oy + (k.chin - oy) * s + dy, hx = ox + dx;
  const cam: Cam = {s: [[1677, 1], [1727, 1.05, 'drift'], [1736, 1.15, 'heavy'], [1790, 1.17, 'drift']], ox: 540, oy: 900};
  const top = oy + (k.top - oy) * s + dy;
  const ring = {t: 'BUILDER TRAP', cx: hx, cy: chin + 60, rx: 420, ry: 90, mulai: 1758, darat: 1778, lineX: 540, lineY: top - 95, fs: 150, warna: C.merah, sapuan: 300, stagger: 0.6, sobek: 1783};
  return (
    <Sequence from={1677} durationInFrames={113} layout="none">
      <Kamera cam={cam}>
        <BlueVoid lingkaran={{cx: 540, cy: 780, r: 430, terang: 0.35 + 0.65 * masuk}} lantai/>
        <Orbit {...ring} lapis="belakang"/>
        <Orang dari={1677} x={dx} y={dy} s={s} ox={ox} oy={oy} siluet={0.8}/>
        <Orbit {...ring} lapis="depan"/>
      </Kamera>
      <Narasi items={[{k: kata([193])}, {k: kata([194, 195, 196])}, {k: kata([197], 'R2')}, {k: kata([198])}, {k: kata([199, 200])}, {k: [...kata([201]), ...kata([202], 'R2')]}, {k: kata([203])}]}
        slots={[{x: 70, y: 1540}, {x: 1010, y: 1630, al: 'r'}]}/>
    </Sequence>
  );
};

// ---------- #22 · f1790–1843 · selamat datang di akunku ----------
export const S22: React.FC = () => {
  const k = kp('s22');
  const cam: Cam = {s: [[1790, 1], [1802, 1.01, 'drift'], [1803, 1.15, 'hold'], [1821, 1.16, 'drift'], [1822, 1, 'hold'], [1843, 1.02, 'drift']], ox: k.cx, oy: 900};
  return (
    <TH a={1790} b={1843} cam={cam}
      atas={<Narasi items={[{k: kata([206])}, {k: kata([207, 208], 'R2')}, {k: kata([209, 210])}]} slots={[{x: 70, y: 1420}, {x: 70, y: 1530}]}/>}
    />
  );
};

export {camStyle};
