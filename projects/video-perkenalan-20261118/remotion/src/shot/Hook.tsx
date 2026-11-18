// Hook.tsx · H1, H2 (Blue Void + cutout), #3 arsip IG (MG), #4, #5 (TH).
import React from 'react';
import {Img, Sequence, staticFile} from 'remotion';
import {ease, lerp, track} from '../anim';
import {Blok, Hero, kata, useG, Narasi} from '../kt/KT';
import {Orbit} from '../kt/Orbit';
import {Cam, Kamera, TH, keLayar} from '../Plate';
import {BlueVoid, Orang} from './Studio';
import {IGPost, TILE} from '../ui/UI';
import {MB} from '../fx/FX';
import {kp} from '../data/kepala';
import {C, F} from '../tema';

// ---------- H1 · f0–32 · Blue Void, kepala di depan lingkaran cyan, ULANGI di belakang kepala ----------
export const H1: React.FC = () => {
  const k = kp('h1');
  const s = 0.8, ox = k.cx, oy = 900;
  const cy = 760; // pusat lingkaran
  const dx = 540 - ox, dy = cy + 60 - (oy + ((k.top + k.chin) / 2 - oy) * s);
  const top = oy + (k.top - oy) * s + dy;
  const cam: Cam = {s: [[0, 1], [32, 1.06, 'heavy']], ox: 540, oy: 820};
  return (
    <Sequence from={0} durationInFrames={32} layout="none">
      <Kamera cam={cam}>
        <BlueVoid lingkaran={{cx: 540, cy, r: 440}}/>
        <Hero t="ULANGI" x={540} y={top - 40} size={333} mulai={13} darat={18} mode="slam" belakang/>
        <Orang dari={0} x={dx} y={dy} s={s} ox={ox} oy={oy} siluet={0.8}/>
      </Kamera>
      <Blok k={kata([0])} x={120} y={1300}/>
      <Blok k={kata([1])} x={120} y={1380}/>
      <Blok k={kata([3])} x={960} y={1380} al="r"/>
    </Sequence>
  );
};

// ---------- H2 · f32–78 · Blue Void, IRFAN mengorbit dari belakang badan ----------
export const H2_IRFAN = {x: 470, y: 1330, fs: 250};
export const H2: React.FC = () => {
  const g = useG();
  const k = kp('h2');
  const s = 0.78, ox = k.cx, oy = 900;
  const hx = 470, dx = hx - ox + track(g, [[32, -14], [78, 14, 'drift']]), dy = 80;
  const top = oy + (k.top - oy) * s + dy, chin = oy + (k.chin - oy) * s + dy, fw = k.fw * s;
  const cam: Cam = {s: [[32, 1], [78, 1.04, 'drift']], x: [[32, 0], [78, -20, 'drift']], ox: 540, oy: 900};
  const orb = {t: 'IRFAN', cx: hx, cy: chin + 30, rx: 380, ry: 68, mulai: 60, darat: 70, lineX: H2_IRFAN.x, lineY: H2_IRFAN.y, fs: H2_IRFAN.fs};
  return (
    <Sequence from={32} durationInFrames={46} layout="none">
      <Kamera cam={cam}>
        <BlueVoid lingkaran={{cx: 640, cy: 720, r: 420, putih: true}} lantai/>
        <Orbit {...orb} lapis="belakang"/>
        <Orang dari={32} x={dx} y={dy} s={s} ox={ox} oy={oy} siluet={0.85}/>
        <Orbit {...orb} lapis="depan"/>
      </Kamera>
      <Narasi items={[{k: kata([4])}, {k: kata([5])}, {k: kata([6, 7])}]}
        slots={[{x: 1000, y: top - 10, al: 'r'}, {x: 1000, y: top + 70, al: 'r'}]}/>
      {void fw}
    </Sequence>
  );
};

// ---------- #3 · f78–192 · arsip postingan IG (MG) ----------
const KARTU = [
  {src: TILE.iniIrfan, f: 90, x: 150, y: 420, r: -5, dari: {x: -700, y: 160}},
  {src: TILE.lifeStudent, f: 100, x: 330, y: 380, r: 3.5, dari: {x: 900, y: -200}},
  {src: TILE.lebihBaik, f: 109, x: 470, y: 440, r: -2, dari: {x: 300, y: 1400}},
];
export const S3: React.FC = () => {
  const g = useG();
  const W = 500;
  const camX = track(g, [[78, 160], [92, 160], [100, 60, 'heavy'], [110, -20, 'heavy'], [150, -40, 'drift'], [186, -50, 'drift']]);
  const camS = track(g, [[78, 0.94], [110, 1, 'heavy'], [150, 1.0, 'drift'], [154, 1.06, 'heavy'], [186, 1.1, 'drift']]);
  const runtuh = ease(g, 186, 192, 'leave');
  const pc = ease(g, 78, 88, 'whip');
  const k1 = KARTU[0];
  const namaX = k1.x + 150 + camX, namaY = k1.y + 38;
  return (
    <Sequence from={78} durationInFrames={114} layout="none">
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 45%, #0A1A2A 0%, ${C.void} 70%)`}}/>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 820px', transform: `translateX(${camX}px) scale(${camS})`}}>
        {KARTU.map((c, i) => {
          if (g < c.f - 6) return null;
          const e = (ff: number) => ease(ff, c.f - 6, c.f, 'land');
          const p = e(g);
          const x = lerp(c.x + c.dari.x, c.x, p), y = lerp(c.y + c.dari.y, c.y, p) + runtuh * (900 + i * 120);
          const vx = -c.dari.x * (e(g + 0.5) - e(g - 0.5)), vy = -c.dari.y * (e(g + 0.5) - e(g - 0.5));
          return (
            <MB key={i} id={`k3-${i}`} dx={vx} dy={vy + runtuh * 80}>
              <div style={{position: 'absolute', left: x, top: y, transform: `rotate(${c.r + runtuh * (i - 1) * 12}deg)`}}>
                <IGPost src={c.src} w={W} namaOpacity={i === 0 ? (g >= 88 ? 1 : 0) : 1}/>
              </div>
            </MB>
          );
        })}
      </div>
      <Hero t="KONSISTEN" x={540} y={1540} size={230} mulai={168} darat={173}/>
      {/* carry IRFAN → nama akun kartu 1 */}
      {g < 89 ? (
        <div style={{position: 'absolute', left: lerp(H2_IRFAN.x - 20, namaX, pc), top: lerp(H2_IRFAN.y, namaY, pc), transform: `translate(-50%,-50%) scale(${lerp(1, 0.12, pc)})`,
          fontFamily: F.anton, fontSize: H2_IRFAN.fs, color: C.putih, filter: `blur(${(Math.sin(pc * Math.PI) * 6).toFixed(1)}px)`, whiteSpace: 'nowrap'}}>IRFAN</div>
      ) : null}
      {/* kilasan tile 2 f (glitch piksel) */}
      {[{f: 118, src: TILE.jualMimpi}, {f: 141, src: TILE.chatgpt}].map((t) => g >= t.f && g < t.f + 2 ? (
        <div key={t.f} style={{position: 'absolute', inset: 0, background: C.void}}>
          <Img src={staticFile(t.src)} style={{position: 'absolute', left: 140, top: 380, width: 800, height: 1070, filter: 'contrast(1.4) saturate(1.3)', transform: `translateX(${g - t.f ? 24 : -18}px)`}}/>
          <Img src={staticFile(t.src)} style={{position: 'absolute', left: 140, top: 380, width: 800, height: 1070, mixBlendMode: 'screen', opacity: 0.6, filter: 'hue-rotate(160deg)', transform: `translateX(${g - t.f ? -16 : 22}px)`}}/>
          {[0, 1, 2, 3, 4, 5].map((r) => <div key={r} style={{position: 'absolute', left: 0, right: 0, top: 420 + r * 170 + (g % 2) * 40, height: 26, background: 'rgba(56,189,248,.35)', transform: `translateX(${(r % 2 ? 40 : -40)}px)`}}/>)}
        </div>
      ) : null)}
      {g >= 169 && g < 172 ? <div style={{position: 'absolute', inset: 0, background: C.cyan, transform: 'skewY(-4deg) scale(1.2)'}}/> : null}
      <Narasi items={[{k: kata([9])}, {k: kata([10, 11], 'R2'), baris: [1, 1]}, {k: kata([12])}, {k: kata([13, 14, 15])}, {k: kata([16, 17])}, {k: kata([18, 19, 20])}]}
        slots={[{x: 80, y: 170}, {x: 80, y: 1345}]}/>
      <Blok k={kata([22])} x={540} y={1610} al="c"/>
    </Sequence>
  );
};

// ---------- #4 · f192–221 · TH · tapi gak jadi-jadi ----------
export const S4: React.FC = () => {
  const g = useG();
  const k = kp('s4');
  const cam: Cam = {s: [[192, 1], [202, 1], [208, 1.12, 'heavy']], ox: k.cx, oy: (k.top + k.chin) / 2};
  const bahu = keLayar(g, cam, k.cx - k.fw * 0.9, k.chin + 60);
  return (
    <TH a={192} b={221} cam={cam}
      belakang={<>
        <Hero t="GAK" x={540} y={k.top - 300} size={250} mulai={198} darat={203} warna={C.merah} belakang/>
        <Hero t="JADI-JADI" x={540} y={k.top - 90} size={200} mulai={205} darat={210} warna={C.merah} belakang/>
      </>}
      atas={<Blok k={kata([23])} x={Math.max(70, bahu.x)} y={Math.min(1400, bahu.y)}/>}
    />
  );
};

// ---------- #5 · f221–286 · TH · bukan karena aku gak punya ide ----------
export const S5: React.FC = () => {
  const k = kp('s5');
  const cam: Cam = {s: [[221, 1.25], [259, 1.25], [259.01, 1, 'hold'], [286, 1.03, 'drift']], ox: k.cx, oy: (k.top + k.chin) / 2};
  return (
    <TH a={221} b={286} cam={cam}
      belakang={<>
        <Hero t="BUKAN" x={k.cx} y={k.top - 120} size={330} mulai={221} darat={224} warna={C.merah} belakang keluar={256}/>
        <Hero t="IDE" x={k.cx} y={k.top - 140} size={400} mulai={275} darat={280} belakang/>
      </>}
      atas={<Narasi items={[{k: kata([28, 29])}, {k: [...kata([30, 31]), ...kata([32], 'R2')], baris: [2, 1]}, {k: kata([33])}, {k: kata([34])}]}
        slots={[{x: 80, y: 1330}, {x: 1000, y: 1250, al: 'r'}]}/>}
    />
  );
};
