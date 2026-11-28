import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Cam, Hidup, KT, FPS, W, H} from '../bersama/Kit';
import {Klik} from '../bersama/Maskot';
import {Mobil, Jalan, Kepala, KepalaPotong, Rongga, Otak, Mata, Telinga, HP, Sinyal, Tanya, Setir, Pedal, Centang, Meter, Spiral, Kursi, Tikungan} from '../bersama/Objek';
import {MEREK, NETRAL, TURUNAN} from '../bersama/tema';
import {move} from '../lib/curves';

export type Beat = {beat_id: number; start_sec: number; end_sec: number; kt: {teks: string; mode: string; mulai_sec: number; akhir_sec: number}[]};
type S = {b: Beat};
const SV: React.CSSProperties = {position: 'absolute', left: 0, top: 0};
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={W} height={H} style={SV}>{children}</svg>;
const mv = (f: number, sec: number, fr = 12, c: 'land' | 'heavy' | 'whip' | 'reveal' | 'drift' = 'land') => move(f, Math.round(sec * FPS), fr, c);

/** Semua KT beat ini, posisi per indeks (x,y,garis). Waktu dari mulai_sec/akhir_sec yang dihitung dari words.json. */
const KTs: React.FC<S & {pos: {x: number; y: number; garis?: {x: number; y: number}}[]}> = ({b, pos}) => (
  <>{b.kt.map((k, i) => <KT key={i} teks={k.teks} mode={k.mode} x={pos[i].x} y={pos[i].y} garis={pos[i].garis}
    masuk={Math.round((k.mulai_sec - b.start_sec) * FPS)} keluar={Math.round((Math.max(k.akhir_sec, k.mulai_sec + 1.5) - b.start_sec) * FPS)} />)}</>
);
const LEN = (b: Beat) => Math.round((b.end_sec - b.start_sec) * FPS) + 10;
const PUCAT = 'pucat' as const;

// 1 · cap pembuka: mobil di tikungan, penumpang pucat, sopir tenang
export const A1: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const tilt = -6 * mv(f, 0.2, 30, 'heavy'); const sp = mv(f, 1.3, 14);
  return <Cam frames={LEN(b)} b={1.05} oy={800}>
    <Svg><Tikungan x={60} y={1010} w={960} p={mv(f, 0, 20, 'reveal')} /><Hidup amp={4}><Jalan y={930} geser={f * 3} /><Mobil x={540} y={800} s={0.95} tilt={tilt} penumpang={PUCAT} />
      <g opacity={sp}><Spiral x={760} y={560 - (1 - sp) * 20} s={1.2} rot={f * 9} /></g></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 430}]} />
  </Cam>;
};
// 2 · tiga kondisi sama: mobil, jalan, tikungan
export const A2: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const p = [mv(f, 0.1), mv(f, 1.0), mv(f, 2.0)];
  return <Cam frames={LEN(b)} b={1.06} oy={700}>
    <Svg><Hidup amp={3}>
      <g opacity={p[0]} transform={`translate(0 ${(1 - p[0]) * 40})`}><Mobil x={190} y={780} s={0.4} penumpang={PUCAT} /></g>
      <g opacity={p[1]} transform={`translate(0 ${(1 - p[1]) * 40})`}><rect x={410} y={690} width={260} height={110} rx={14} fill={NETRAL.tinta} /><line x1={430} y1={745} x2={650} y2={745} stroke={NETRAL.putih} strokeWidth={8} strokeDasharray="36 28" /></g>
      <g opacity={p[2]} transform={`translate(0 ${(1 - p[2]) * 40})`}><Tikungan x={730} y={800} w={280} p={mv(f, 2.0, 18, 'reveal')} /></g>
    </Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1010}]} />
  </Cam>;
};
// 3 · tanda tangan: KLIK membuka, potongan kepala keluar
export const A3: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const open = mv(f, 0.5, 14, 'whip'); const cut = mv(f, 0.9, 16, 'heavy');
  const r = 560 * cut;
  return <Cam frames={LEN(b)} b={1.05} ox={400} oy={800}>
    <Svg>
      <clipPath id="buka"><circle cx={300} cy={820} r={r} /></clipPath>
      <g clipPath="url(#buka)"><KepalaPotong x={680} y={760} s={1.05} cairan={0.55} /></g>
    </Svg>
    <div style={{position: 'absolute', left: 120, top: 700}}><Klik width={340} opt={{eyes: open > 0.5 ? 'happy' : 'wide', brow: -8, arms: [20 + 150 * open, 20 + 150 * open], tilt: -4 * open}} /></div>
    <KTs b={b} pos={[{x: 540, y: 1110}]} />
  </Cam>;
};
// 4 · ke dalam telinga: rongga berisi cairan
export const A4: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const z = mv(f, 0.1, 45, 'heavy');
  return <Cam frames={LEN(b)} a={1} b={1.12} ox={600} oy={780}>
    <Svg><Hidup amp={4}>
      <g opacity={1 - z * 0.7}><KepalaPotong x={540} y={640} s={1.25} cairan={0.55} sorot={false} /></g>
      <Rongga x={570} y={680} r={150 + 90 * z} cairan={0.55} miring={Math.sin(f / 9) * 4} sorot />
    </Hidup></Svg>
    <KTs b={b} pos={[{x: 250, y: 500, garis: {x: 420, y: 640}}, {x: 800, y: 1130, garis: {x: 640, y: 880}}]} />
  </Cam>;
};
// 5 · mobil belok, cairan goyang
export const A5: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const turn = mv(f, 1.2, 14, 'heavy'); const sway = Math.sin(((f - 36) / 30) * 6.5) * 22 * turn * (1 - mv(f, 2.5, 12));
  return <Cam frames={LEN(b)} b={1.05} oy={800}>
    <Svg><Hidup amp={3}>
      <Jalan y={590} geser={f * 4} /><Mobil x={540} y={470} s={0.6} tilt={-7 * turn} penumpang={PUCAT} />
      <Sinyal d="M540 700 V760" p={turn} len={60} />
      <Rongga x={540} y={920} r={150} cairan={0.55} miring={-28 * turn + sway} sorot />
    </Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1150}]} />
  </Cam>;
};
// 6 · telinga lapor gerak ke otak
export const A6: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.06} oy={760}>
    <Svg><Hidup amp={4}><Telinga x={250} y={720} s={1.35} />
      <Sinyal d="M340 700 Q540 560 690 700" p={mv(f, 0.5, 18, 'reveal')} len={500} />
      <Otak x={780} y={720} s={1.1} sorot={mv(f, 1.0) > 0.5} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 780, y: 1020}]} />
  </Cam>;
};
// 7 · mata lihat HP yang diam
export const A7: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.06} oy={760}>
    <Svg><Hidup amp={4}><HP x={270} y={560} s={1.05} /><Mata x={270} y={900} s={1.1} />
      <Sinyal d="M370 900 Q560 980 700 800" p={mv(f, 0.8, 18, 'reveal')} len={500} />
      <Otak x={800} y={740} s={1.1} sorot={mv(f, 1.3) > 0.5} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 800, y: 1010}]} />
  </Cam>;
};
// 8 · dua laporan bertabrakan
export const A8: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const t = mv(f, 0.2, 14);
  return <Cam frames={LEN(b)} b={1.07} oy={760}>
    <Svg><Hidup amp={4}><Otak x={540} y={760} s={1.6} />
      <Sinyal d="M80 760 H380" p={t} len={320} /><Sinyal d="M1000 760 H700" p={t} len={320} />
      <Tanya x={540} y={470} s={mv(f, 1.0, 10) * 0.1 + 0.9} o={mv(f, 1.0, 10)} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1090}]} />
  </Cam>;
};
// 9a · telinga bilang gerak
export const A9a: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.06} oy={760}>
    <Svg><Hidup amp={4}><Telinga x={400} y={700} s={1.8} /><Sinyal d="M560 640 H800" p={mv(f, 0.3, 12)} len={260} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1040}]} />
  </Cam>;
};
// 9b · mata bilang diam
export const A9b: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.06} oy={760}>
    <Svg><Hidup amp={4}><Mata x={680} y={700} s={1.6} /><Sinyal d="M500 640 H260" p={mv(f, 0.3, 12)} len={260} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1040}]} />
  </Cam>;
};
// 10 · nama teorinya: konflik sensorik
export const A10: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const t = mv(f, 0.4, 12); const shake = Math.sin(f * 1.3) * 3 * mv(f, 1.1, 6);
  return <Cam frames={LEN(b)} b={1.06} oy={700}>
    <Svg><Hidup amp={3}><Otak x={540} y={620} s={1.5} sorot />
      <Sinyal d="M120 560 L420 620" p={t} len={330} /><Sinyal d="M960 560 L660 620" p={t} len={330} />
      <g transform={`translate(${shake} 0)`}><path d="M540 390 L540 330 M440 410 L400 365 M640 410 L680 365" stroke={NETRAL.tinta} strokeWidth={10} strokeLinecap="round" opacity={mv(f, 0.9, 8)} /></g></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 960}]} />
  </Cam>;
};
// 11 · otak membalas dengan pusing dan mual
export const A11: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const p = mv(f, 0.2, 14);
  return <Cam frames={LEN(b)} b={1.06} oy={700}>
    <Svg><Hidup amp={4}><Kepala x={540} y={700} r={190} mood="pucat" rot={Math.sin(f / 10) * 4} />
      <g opacity={p}><Spiral x={500} y={420} s={1.6} rot={f * 10} /><Spiral x={720} y={470} s={1.1} rot={-f * 12} /></g></Hidup></Svg>
    <KTs b={b} pos={[{x: 270, y: 1010}, {x: 800, y: 1070}]} />
  </Cam>;
};
// 12 · sopir memegang setir dan pedal
export const A12: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const t = mv(f, 1.2, 10);
  return <Cam frames={LEN(b)} b={1.06} oy={760}>
    <Svg><Hidup amp={3}><Kepala x={540} y={400} r={95} mood="tenang" /><rect x={470} y={500} width={140} height={130} rx={40} fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth={6} /><Setir x={320} y={800} s={1.1} rot={Math.sin(f / 12) * 6} /><Pedal x={800} y={810} tekan={t} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 800, y: 1040}]} />
  </Cam>;
};
// 13 · sopir tahu kapan mobil belok (garis tebakan muncul sebelum mobil)
export const A13: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const g = mv(f, 0.4, 20, 'reveal'); const car = mv(f, 1.0, 40, 'heavy');
  return <Cam frames={LEN(b)} b={1.06} oy={780}>
    <Svg><Hidup amp={3}><Jalan y={880} geser={f * 3} /><Tikungan x={420} y={955} w={560} p={g} />
      <g transform={`translate(${-150 + 330 * car} 0)`}><Mobil x={300} y={740} s={0.7} penumpang={null} /></g></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1135}]} />
  </Cam>;
};
// 14 · otak sopir menebak duluan
export const A14: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.06} oy={760}>
    <Svg><Hidup amp={4}><Otak x={330} y={680} s={1.7} sorot />
      <path d="M470 660 Q620 520 800 640" fill="none" stroke={MEREK.merek} strokeWidth={10} strokeLinecap="round" strokeDasharray="24 22" opacity={mv(f, 0.5, 10)} />
      <g opacity={mv(f, 1.0, 12)}><Mobil x={800} y={900} s={0.45} tilt={-6} penumpang={null} /></g></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1040}]} />
  </Cam>;
};
// 15 · tebakan hampir selalu pas: tiga centang berurutan
export const A15: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const p = [mv(f, 0.2, 10), mv(f, 0.6, 10), mv(f, 1.0, 10)];
  return <Cam frames={LEN(b)} b={1.05} oy={760}>
    <Svg><Hidup amp={3}>{[190, 540, 890].map((x, i) => <Centang key={i} x={x} y={740} s={1.25 + 0.1 * p[i]} p={p[i]} o={Math.min(1, p[i] * 3)} />)}</Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1010}]} />
  </Cam>;
};
// 16 · penumpang belakang main HP, tidak bisa menebak
export const A16: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.06} oy={760}>
    <Svg><Hidup amp={4}><Kursi x={380} y={940} s={1.2} /><Kepala x={380} y={640} r={125} mood={PUCAT} rot={8 + Math.sin(f / 14) * 3} /><HP x={700} y={800} s={1.15} rot={-12} />
      <path d="M470 700 L590 770" stroke={NETRAL.tinta} strokeWidth={8} strokeLinecap="round" opacity={mv(f, 1.0, 8)} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1100}]} />
  </Cam>;
};
// 17 · rem mendadak = kejutan
export const A17: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const hit = mv(f, 1.0, 6, 'whip'); const settle = mv(f, 1.2, 14);
  return <Cam frames={LEN(b)} a={1} b={1.08} oy={780} kurva="whip">
    <Svg><Hidup amp={2}><Jalan y={880} geser={f * 2} /><Mobil x={540} y={760} s={0.85} tilt={9 * hit * (1 - settle)} penumpang={PUCAT} />
      <g opacity={hit * (1 - settle)} stroke={NETRAL.tinta} strokeWidth={10} strokeLinecap="round"><path d="M215 600 L150 560 M200 680 L120 680 M215 760 L150 800" /></g></Hidup></Svg>
    <KTs b={b} pos={[{x: 540, y: 1125}]} />
  </Cam>;
};
// 18a · meter meleset naik
export const A18a: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.05} oy={760}>
    <Svg><Hidup amp={2}><Meter x={140} y={760} w={800} isi={0.08 + 0.85 * mv(f, 0.6, 40, 'heavy')} /><Meter x={140} y={960} w={800} isi={0.05} sorot={false} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 300, y: 670}]} />
  </Cam>;
};
// 18b · meter mual ikut naik
export const A18b: React.FC<S> = ({b}) => {
  const f = useCurrentFrame();
  return <Cam frames={LEN(b)} b={1.04} oy={760}>
    <Svg><Hidup amp={2}><Meter x={140} y={760} w={800} isi={0.93} /><Meter x={140} y={960} w={800} isi={0.05 + 0.88 * mv(f, 0.1, 26, 'heavy')} sorot={false} /></Hidup></Svg>
    <KTs b={b} pos={[{x: 270, y: 870}]} />
  </Cam>;
};
// 19 · penumpang pindah ke depan, lihat jalan; KLIK "oh gitu"
export const A19: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const mvp = mv(f, 0.5, 20, 'heavy'); const oh = mv(f, 1.2, 8);
  return <Cam frames={LEN(b)} b={1.06} oy={780}>
    <Svg><Hidup amp={3}><Jalan y={920} geser={f * 5} /><Mobil x={540} y={780} s={0.95} penumpang={null} />
      <g transform={`translate(540 780) scale(0.95) translate(${-20 + 205 * mvp} -150)`}><Kepala x={0} y={0} r={42} mood={mvp > 0.6 ? 'oh' : PUCAT} /></g></Hidup></Svg>
    <div style={{position: 'absolute', left: 740, top: 930, transform: `translateY(${(1 - oh) * 30}px)`, opacity: Math.min(1, oh * 2)}}><Klik width={300} opt={{eyes: 'happy', arms: [150, 150], flip: true, tilt: 3}} /></div>
    <KTs b={b} pos={[{x: 380, y: 1165}]} />
  </Cam>;
};
// 20 · kembali ke tikungan frame 1; KLIK menutup
export const A20: React.FC<S> = ({b}) => {
  const f = useCurrentFrame(); const tilt = -6 * mv(f, 0.0, 20, 'heavy'); const wave = Math.sin(f / 4) * 18 * mv(f, 2.2, 10);
  return <Cam frames={LEN(b)} a={1.06} b={1.0} oy={800}>
    <Svg><Hidup amp={4}><Tikungan x={60} y={1010} w={960} p={1} /><Jalan y={930} geser={f * 3} /><Mobil x={540} y={800} s={0.95} tilt={tilt} penumpang={PUCAT} /></Hidup></Svg>
    <div style={{position: 'absolute', left: 700, top: 960, opacity: mv(f, 1.0, 10)}}><Klik width={280} opt={{eyes: 'dot', arms: [40 + wave, 20], flip: true}} /></div>
    <KTs b={b} pos={[{x: 540, y: 430}, {x: 540, y: 430}]} />
  </Cam>;
};
export const ADEGAN: Record<string, React.FC<S>> = {A1, A2, A3, A4, A5, A6, A7, A8, A9a, A9b, A10, A11, A12, A13, A14, A15, A16, A17, A18a, A18b, A19, A20};
void TURUNAN; void AbsoluteFill;
