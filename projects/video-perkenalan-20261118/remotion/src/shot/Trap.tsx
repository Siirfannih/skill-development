// Trap.tsx · #9 builder trap, #10 penyakit founder, #11 Blue Void bar cahaya (anxiety/overthinking), #12 titik balik (RISIKO, PALSU sobek).
import React from 'react';
import {Sequence} from 'remotion';
import {ease, track} from '../anim';
import {Blok, Hero, kata, useG, Narasi} from '../kt/KT';
import {Busur, Orbit} from '../kt/Orbit';
import {Cam, Kamera, TH, GRADE_TITIK, keLayar} from '../Plate';
import {BlueVoid, Orang} from './Studio';
import {kp} from '../data/kepala';
import {C, F, GLOW} from '../tema';

// ---------- #9 · f540–595 · close 1,25 → punch 1,40 (f573) → break wide 1,00 (f585) ----------
export const S9: React.FC = () => {
  const k = kp('s9');
  const cam: Cam = {s: [[540, 1.25], [572, 1.27, 'drift'], [573, 1.4, 'hold'], [584, 1.42, 'drift'], [585, 1, 'hold'], [595, 1.02, 'drift']], ox: k.cx, oy: 930};
  return (
    <TH a={540} b={595} cam={cam}
      belakang={<>
        <Hero t="BUILDER" x={540} y={k.top - 120} size={200} mulai={570} darat={575} mode="slam" warna={C.merah} belakang/>
        <Hero t="TRAP" x={540} y={k.top + 110} size={300} mulai={581} darat={585} mode="slam" warna={C.merah} belakang/>
      </>}
      atas={<Narasi items={[{k: kata([68, 69])}, {k: kata([70], 'R2', [70])}]} slots={[{x: 80, y: 1360}, {x: 80, y: 1450}]}/>}
    />
  );
};

// ---------- #10 · f595–640 · jump cut crop 1,15, aku mendekat ke kamera ----------
export const S10: React.FC = () => {
  const k = kp('s10');
  const cam: Cam = {s: [[595, 1.15], [640, 1.17, 'drift']], ox: k.cx, oy: k.top};
  return (
    <TH a={595} b={640} cam={cam}
      belakang={<Hero t="PENYAKIT" x={540} y={k.top - 115} size={175} mulai={606} darat={611} warna={C.merah} belakang/>}
      atas={<Narasi items={[{k: kata([73])}, {k: kata([74, 75])}, {k: kata([77, 78])}]}
        slots={[{x: 70, y: 1420}, {x: 1010, y: 1510, al: 'r'}, {x: 540, y: 1610, al: 'c'}]}/>}
    />
  );
};

// ---------- #11 · f640–772 · Blue Void, bar cahaya meredup selama bicara ----------
export const S11: React.FC = () => {
  const g = useG();
  const k = kp('s11');
  const s = 0.72, ox = k.cx, oy = 700, px = 540, dy = 120;
  const top = oy + (k.top - oy) * s + dy, fw = k.fw * s;
  const hcx = px, hcy = top + fw * 0.62;
  const terang = track(g, [[640, 1], [670, 1], [760, 0.25, 'drift'], [768, 0, 'leave']]);
  const cam: Cam = {s: [[640, 1], [713, 1.08, 'drift'], [722, 1.18, 'heavy'], [772, 1.2, 'drift']], ox: 540, oy: hcy};
  const gelap = ease(g, 764, 771, 'leave');
  const tunduk = ease(g, 752, 766, 'heavy');
  return (
    <Sequence from={640} durationInFrames={132} layout="none">
      <Kamera cam={cam}>
        <BlueVoid bar={{y: hcy - 30, w: 900, terang}}/>
        <Busur t="ANXIETY" cx={hcx} cy={hcy} r={fw * 0.62 * 1.35 + 30} a0={-160} a1={-20} fs={150} mulai={671} darat={676} belakang/>
        <Orang dari={640} x={px - ox} y={dy + tunduk * 14} s={s} ox={ox} oy={oy} siluet={0.55 + 0.35 * (1 - terang)}/>
        {g < 753 ? <Busur t="OVERTHINKING" cx={hcx} cy={hcy} r={470} a0={160} a1={20} fs={130} mulai={692} darat={697} blur={3} luar={false}/> : null}
        <Hero t="BELUM" x={hcx} y={hcy + 250} size={200} mulai={754} darat={759} mode="slam" warna={C.merah}/>
        <Hero t="LAYAK" x={hcx} y={hcy + 430} size={200} mulai={761} darat={766} mode="slam" warna={C.merah}/>
      </Kamera>
      <Narasi items={[{k: kata([79, 80, 81])}, {k: kata([84, 85])}, {k: kata([86, 87, 88])}]} slots={[{x: 80, y: 1530}, {x: 1000, y: 1630, al: 'r'}]}/>
      <div style={{position: 'absolute', inset: 0, background: '#000', opacity: gelap}}/>
    </Sequence>
  );
};

// ---------- #12 · f772–914 · titik balik: grade lebih terang & hangat ----------
export const S12: React.FC = () => {
  const g = useG();
  const k = kp('s12b');
  const cam: Cam = {s: [[772, 1.12], [773, 1.12], [785, 1, 'heavy'], [786, 1.15, 'hold'], [845, 1.17, 'drift'], [846, 1, 'hold'], [914, 1.03, 'drift']], ox: k.cx, oy: 900};
  const sob = g >= 909 ? ease(g, 909, 913, 'leave') : 0;
  const py = k.top - 210;
  const orb = {t: 'RISIKO', cx: k.cx, cy: k.chin - 40, rx: 400, ry: 72, mulai: 803, darat: 813, lineX: k.cx, lineY: 1200, fs: 200, sobek: 846};
  const kiri = keLayar(g, cam, k.cx - k.fw * 0.95, k.top + 160);
  return (
    <TH a={772} b={914} cam={cam} grade={GRADE_TITIK}
      belakang={<>
        <Orbit {...orb} lapis="belakang"/>
        {g < 909 ? <Hero t="PALSU" x={k.cx} y={py} size={330} mulai={899} darat={904} mode="slam" belakang/> : (
          <>
            {[0, 1].map((h) => (
              <div key={h} style={{position: 'absolute', left: k.cx, top: py, transform: `translate(-50%,-50%) translate(${(h ? 1 : -1) * sob * 220}px, ${sob * sob * 260}px) rotate(${(h ? 1 : -1) * sob * 18}deg)`,
                fontFamily: F.anton, fontSize: 330, lineHeight: 0.92, color: C.putih, textShadow: GLOW, whiteSpace: 'nowrap', opacity: 1 - sob * 0.6,
                clipPath: h ? 'polygon(52% 0, 100% 0, 100% 100%, 47% 100%, 53% 78%, 46% 55%, 54% 32%, 48% 12%)' : 'polygon(0 0, 52% 0, 48% 12%, 54% 32%, 46% 55%, 53% 78%, 47% 100%, 0 100%)'}}>PALSU</div>
            ))}
          </>
        )}
      </>}
      depan={<Orbit {...orb} lapis="depan"/>}
      atas={<>
        <Blok k={kata([91], 'R2')} x={Math.max(60, kiri.x - 260)} y={kiri.y} al="l" keluar={790}/>
        <Narasi items={[{k: kata([92, 93])}, {k: kata([95, 96])}, {k: kata([97, 98], 'R2')}, {k: kata([99])}, {k: kata([100], 'R2', [100])}, {k: kata([101, 102])}, {k: kata([103])}]}
          slots={[{x: 70, y: 1480}, {x: 1010, y: 1570, al: 'r'}]}/>
      </>}
    />
  );
};
