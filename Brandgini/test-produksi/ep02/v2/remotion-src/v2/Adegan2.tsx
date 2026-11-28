import React from 'react';
import {useCurrentFrame} from 'remotion';
import {KT, FPS} from '../bersama/Kit';
import {Dunia, Kam} from '../bersama/Dunia';
import {C, MobilSamping, LatarJalanSamping, LatarNetral, PenumpangDuduk} from '../bersama/Benda';
import {KepalaPotong, SARAF_MATA, SARAF_TELINGA} from '../bersama/Kepala';
import {LatarAtas, JalanAtas, MobilAtas, posRute, Meter, JendelaMobil, SetirTangan, KakiPedal, JALAN_D} from '../bersama/Benda2';
import {Klik} from '../bersama/Maskot';
import {move} from '../lib/curves';
import {NETRAL} from '../bersama/tema';

export type Beat = {beat_id: number; start_sec: number; end_sec: number; kt: {teks: string; mode: string; mulai_sec: number; akhir_sec: number}[]};
type S = {b: Beat};
const LEN = (b: Beat) => Math.round((b.end_sec - b.start_sec) * FPS) + 10;
const mv = (f: number, sec: number, fr = 12, c: 'land' | 'heavy' | 'whip' | 'reveal' | 'drift' = 'land') => move(f, Math.round(sec * FPS), fr, c);
const Pos = {left: 0, top: 0, position: 'absolute'} as React.CSSProperties;

const KTs: React.FC<S & {pos: {x: number; y: number; garis?: {x: number; y: number}}[]}> = ({b, pos}) => (
  <>{b.kt.map((k, i) => <KT key={i} teks={k.teks} mode={k.mode} x={pos[i].x} y={pos[i].y} garis={pos[i].garis}
    masuk={Math.round((k.mulai_sec - b.start_sec) * FPS)} keluar={Math.round((Math.max(k.akhir_sec, k.mulai_sec + 1.5) - b.start_sec) * FPS)} />)}</>
);

// kamera (offset dari tengah frame): titik fokus dunia kepala
const K = {
  awal: {s: 1, x: 0, y: 0}, kepala: {s: 1.1, x: 0, y: 30}, telinga: {s: 2.3, x: 23, y: -80}, telinga2: {s: 2.6, x: 30, y: -80},
  otak: {s: 1.5, x: -12, y: -330}, mata: {s: 2.1, x: 244, y: -260}, otakJauh: {s: 1.6, x: -12, y: -340}, telingaB: {s: 2.4, x: 23, y: -80}, mataB: {s: 2.2, x: 244, y: -260}, otakB: {s: 1.3, x: -12, y: -330},
} as const;

const Kepala: React.FC<{f: number; cut?: number; telinga?: number; mata?: number; aliran?: number; lihat?: number; x?: number; y?: number; s?: number; mood?: 'pucat' | 'tenang'}> = ({f, cut = 1, telinga = 0, mata = 0, aliran = 0, lihat = 0, x = 540, y = 760, s = 1.15, mood = 'tenang'}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><KepalaPotong cut={cut} t={f} telinga={telinga} mata={mata} aliran={aliran} lihat={lihat} mood={mood} /></g>
);
const LNetral = () => <LatarNetral />;
const Jalan = (scroll: number) => <LatarJalanSamping scroll={scroll} jalanY={1100} />;

// 1 · POV samping (mata manusia): dunia nyata, mobil melaju; kamera mendorong ke jendela penumpang yang pucat
export const A1: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.5, x: -116, y: -63}}
    latar={(f) => Jalan(f * 9)} aksi={(f) => <MobilSamping x={540} y={1130} L={880} roda={f * 26} penumpang="pucat" />}
    atas={() => <KTs b={b} pos={[{x: 540, y: 330}]} />} />
);
// 2 · POV atas (peta): jalan berkelok dan posisi mobil
export const A2: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={{s: 1, x: 0, y: 240}} ke={{s: 1.15, x: 0, y: -60}}
    latar={() => <LatarAtas />} aksi={(f) => { const p = posRute(0.08 + 0.42 * mv(f, 0, 90, 'drift')); return <g><JalanAtas /><MobilAtas x={p.x} y={p.y} rot={p.rot} L={220} /></g>; }}
    atas={() => <KTs b={b} pos={[{x: 540, y: 330}]} />} />
);
// 3 · tanda tangan: KLIK membuka potongan kepala (hero dunia kepala mulai di sini)
export const A3: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={K.kepala} latar={LNetral}
    aksi={(f) => <Kepala f={f} cut={mv(f, 0.6, 22, 'heavy')} mood="pucat" />}
    atas={(f) => { const o = mv(f, 0.45, 14, 'whip'); return <>
      <div style={{...Pos, left: 40, top: 960}}><Klik width={330} opt={{eyes: o > 0.5 ? 'happy' : 'wide', brow: -8, arms: [20 + 150 * o, 20 + 150 * o], tilt: -4 * o}} /></div>
      <KTs b={b} pos={[{x: 700, y: 1130}]} /></>; }} />
);
// 4 · POV dekat (potongan): kamera masuk ke telinga dalam
export const A4: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.kepala} ke={K.telinga} latar={LNetral}
    aksi={(f) => <Kepala f={f} aliran={f * 0.4} />}
    atas={() => <KTs b={b} pos={[{x: 330, y: 690, garis: {x: 650, y: 800}}]} />} />
);
// 5 · mobil belok (inset atas) → cairan di saluran setengah lingkaran bergoyang
export const A5: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.telinga} ke={K.telinga2} latar={LNetral}
    aksi={(f) => <Kepala f={f} aliran={f * 1.6} />}
    atas={(f) => { const p = posRute(0.3 + 0.25 * mv(f, 0, 70, 'drift')); return <>
      <svg width={1080} height={1920} style={Pos}>
        <defs><clipPath id="inset"><rect x={150} y={340} width={400} height={340} rx={28} /></clipPath></defs>
        <rect x={142} y={332} width={416} height={356} rx={34} fill={C.putih} />
        <g clipPath="url(#inset)"><g transform={`translate(${150 - 330 * 0.3} ${340 - 330 * 0.3}) scale(0.3)`}><LatarAtas /><JalanAtas /><MobilAtas x={p.x} y={p.y} rot={p.rot} L={260} /></g></g>
      </svg><KTs b={b} pos={[{x: 700, y: 900}]} /></>; }} />
);
// 6 · telinga lapor gerak ke otak: kamera menyusuri saraf ke atas
export const A6: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.telinga2} ke={K.otak} latar={LNetral}
    aksi={(f) => <Kepala f={f} telinga={mv(f, 0.1, 8)} aliran={f * 0.8} />}
    atas={() => <KTs b={b} pos={[{x: 540, y: 400}]} />} />
);
// 7 · mata melihat HP yang diam
export const A7: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.otak} ke={K.mata} latar={LNetral}
    aksi={(f) => <g><Kepala f={f} mata={mv(f, 0.3, 8)} />
      <g transform="translate(985 720) rotate(-14)"><rect x={-70} y={-120} width={140} height={250} rx={22} fill={C.hp} /><rect x={-58} y={-104} width={116} height={200} rx={8} fill={C.layarHp} /><rect x={-58} y={-104} width={116} height={70} rx={8} fill={C.layarHpGelap} /><circle cx={0} cy={112} r={9} fill="none" stroke={C.logam} strokeWidth={3} /></g>
      <path d="M830 700 L915 720" stroke={C.logam} strokeWidth={3} strokeDasharray="8 8" /></g>}
    atas={() => <KTs b={b} pos={[{x: 600, y: 420}]} />} />
);
const Konflik = (f: number) => <g opacity={mv(f, 0.5, 6)} stroke={C.kuning} strokeWidth={9} strokeLinecap="round" fill="none"><path d="M520 470 l22 -34 l-18 -4 l24 -38" /><path d="M600 480 l-22 -34 l18 -4 l-24 -38" /></g>;
// 8 · dua laporan bertemu di otak
export const A8: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.mata} ke={K.otakJauh} latar={LNetral}
    aksi={(f) => <g><Kepala f={f} telinga={1} mata={1} />{Konflik(f)}</g>}
    atas={() => <KTs b={b} pos={[{x: 540, y: 1110}]} />} />
);
// 9a · telinga: gerak
export const A9a: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.otakJauh} ke={K.telingaB} latar={LNetral}
    aksi={(f) => <Kepala f={f} telinga={1} aliran={f * 1.2} />} atas={() => <KTs b={b} pos={[{x: 540, y: 380}]} />} />
);
// 9b · mata: diam
export const A9b: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.telingaB} ke={K.mataB} latar={LNetral}
    aksi={(f) => <Kepala f={f} mata={1} />} atas={() => <KTs b={b} pos={[{x: 600, y: 420}]} />} />
);
// 10 · konflik sensorik di otak
export const A10: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.mataB} ke={K.otakB} latar={LNetral}
    aksi={(f) => <g><Kepala f={f} telinga={1} mata={1} />{Konflik(f)}</g>}
    atas={() => <KTs b={b} pos={[{x: 540, y: 1090}]} />} />
);
// 11 · POV samping dalam mobil: penumpang pusing dan mual
export const A11: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.15, x: 30, y: -100}}
    latar={(f) => Jalan(f * 7)}
    aksi={(f) => <g><JendelaMobil /><PenumpangDuduk x={540} y={1060} s={1.25} mood="pucat" tangan="mulut" kepalaMiring={Math.sin(f / 9) * 4} /></g>}
    atas={(f) => <><svg width={1080} height={1920} style={Pos}><g transform={`translate(590 650) rotate(${f * 9})`} fill="none" stroke={NETRAL.tinta} strokeWidth={7} strokeLinecap="round"><path d="M0 0 m0 -6 a6 6 0 1 1 -6 6 a14 14 0 1 1 14 14 a24 24 0 1 1 -24 -24 a36 36 0 1 1 36 36" /></g></svg><KTs b={b} pos={[{x: 300, y: 380}]} /></>} />
);
// 12 · POV dekat (kursi pengemudi): tangan di setir, kaki di pedal
export const A12: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.12, x: 0, y: -40}}
    latar={(f) => <g>
      <defs><linearGradient id="l12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.langitAtas} /><stop offset="1" stopColor={C.langitBawah} /></linearGradient></defs>
      <rect x={-400} y={-400} width={1880} height={1160} fill="url(#l12)" /><rect x={-400} y={760} width={1880} height={700} fill={C.rumput} />
      <path d="M520 760 L560 760 L1250 1500 L-130 1500 Z" fill={C.aspal} />
      {[0, 1, 2, 3, 4].map((i) => { const u = ((i + f / 30) % 5) / 5; const y = 770 + u * u * 520, w = 3 + u * u * 26; return <rect key={i} x={540 - w / 2} y={y} width={w} height={w * 3.2} fill={C.garis} />; })}
    </g>}
    aksi={(f) => <g><rect x={-400} y={1060} width={1880} height={900} fill={C.dashboard} /><rect x={-400} y={1050} width={1880} height={22} fill={C.dashboardGaris} />
      <g transform="translate(540 1000) scale(1.25) translate(-540 -1040)"><SetirTangan x={540} y={1040} putar={Math.sin(f / 22) * 5} /></g></g>}
    atas={(f) => <>
      <svg width={1080} height={1920} style={Pos}><defs><clipPath id="foot"><circle cx={800} cy={470} r={190} /></clipPath></defs>
        <circle cx={800} cy={470} r={200} fill={C.putih} /><g clipPath="url(#foot)"><rect x={600} y={270} width={400} height={400} fill={C.netral} /><g transform="translate(790 520) scale(0.62)"><KakiPedal x={0} y={0} tekan={mv(f, 1.2, 10)} /></g></g></svg>
      <KTs b={b} pos={[{x: 800, y: 720}]} /></>} />
);
// 13 · POV atas: garis tebakan sopir muncul sebelum mobil sampai di tikungan
export const A13: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={{s: 1, x: 0, y: 320}} ke={{s: 1.2, x: 0, y: -120}}
    latar={() => <LatarAtas />}
    aksi={(f) => { const g = mv(f, 0.2, 40, 'reveal'); const p = posRute(0.06 + 0.5 * mv(f, 0.6, 52, 'drift')); return <g><JalanAtas />
      <mask id="mg"><path d={JALAN_D} fill="none" stroke={C.putih} strokeWidth={60} pathLength={1000} strokeDasharray={`${g * 1000} 3000`} /></mask>
      <path d={JALAN_D} fill="none" stroke={C.tebakan} strokeWidth={14} strokeLinecap="round" strokeDasharray="30 24" mask="url(#mg)" />
      <MobilAtas x={p.x} y={p.y} rot={p.rot} L={220} /></g>; }}
    atas={() => <KTs b={b} pos={[{x: 540, y: 330}]} />} />
);
// 14 · otak sopir menebak: gelembung pikiran berisi jalan di depan
export const A14: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={{s: 1, x: 0, y: 0}} ke={{s: 1.14, x: 60, y: -70}} latar={LNetral}
    aksi={(f) => { const p = posRute(0.5 + 0.2 * mv(f, 0.3, 55, 'drift')); return <g>
      <Kepala f={f} x={330} y={960} s={0.85} />
      {[[470, 640, 16], [520, 560, 24], [590, 470, 34]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={C.putih} stroke={C.tulangGaris} strokeWidth={4} opacity={mv(f, 0.15 + i * 0.12, 8)} />)}
      <g opacity={mv(f, 0.5, 12)}><clipPath id="gel"><ellipse cx={720} cy={380} rx={300} ry={240} /></clipPath><ellipse cx={720} cy={380} rx={308} ry={248} fill={C.putih} stroke={C.tulangGaris} strokeWidth={5} />
        <g clipPath="url(#gel)"><g transform={`translate(${720 - 540 * 0.55} ${380 - 700 * 0.55}) scale(0.55)`}><LatarAtas /><JalanAtas /><MobilAtas x={p.x} y={p.y} rot={p.rot} L={260} /></g></g></g></g>; }}
    atas={() => <KTs b={b} pos={[{x: 540, y: 1240}]} />} />
);
// 15 · tebakan hampir selalu pas: tiga tikungan, garis tebakan = jalur nyata
const Panel: React.FC<{y: number; p: number; d: string}> = ({y, p, d}) => (
  <g>
    <clipPath id={`pn${y}`}><rect x={100} y={y} width={880} height={250} rx={28} /></clipPath>
    <rect x={92} y={y - 8} width={896} height={266} rx={34} fill={C.putih} />
    <g clipPath={`url(#pn${y})`}><rect x={100} y={y} width={880} height={250} fill={C.rumput} /><g transform={`translate(100 ${y})`}>
      <path d={d} fill="none" stroke={C.aspal} strokeWidth={70} /><path d={d} fill="none" stroke={C.garis} strokeWidth={4} strokeDasharray="18 14" />
      <path d={d} fill="none" stroke={C.tebakan} strokeWidth={10} strokeLinecap="round" strokeDasharray="20 16" />
      <path d={d} fill="none" stroke={C.mobil} strokeWidth={26} strokeLinecap="round" pathLength={1} strokeDasharray={`0.07 1`} strokeDashoffset={-p * 0.93} /></g></g>
    <g opacity={Math.min(1, p * 3) * (p > 0.85 ? 1 : 0)}><circle cx={900} cy={y + 125} r={44} fill={C.hijau} /><path d="M878 126 l16 18 l30 -34" transform={`translate(0 ${y})`} fill="none" stroke={C.putih} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" /></g>
  </g>
);
export const A15: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.1, x: 0, y: -40}} latar={LNetral}
    aksi={(f) => <g><Panel y={400} p={mv(f, 0.1, 22, 'heavy')} d="M0 170 C250 170 300 60 520 70 S780 120 880 60" />
      <Panel y={700} p={mv(f, 0.5, 22, 'heavy')} d="M0 60 C260 60 300 190 500 180 S780 90 880 190" />
      <Panel y={1000} p={mv(f, 0.9, 22, 'heavy')} d="M0 190 C200 190 260 70 440 80 C620 90 640 190 880 170" /></g>}
    atas={() => <KTs b={b} pos={[{x: 540, y: 330}]} />} />
);
// 16 · POV samping dalam mobil: penumpang belakang main HP, tidak melihat jalan
export const A16: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.12, x: -30, y: -60}} latar={(f) => Jalan(f * 7)}
    aksi={(f) => <g><JendelaMobil /><PenumpangDuduk x={420} y={1080} s={1.25} mood="pucat" tangan="hp" kepalaMiring={14 + Math.sin(f / 16) * 2} /></g>}
    atas={() => <KTs b={b} pos={[{x: 540, y: 340}]} />} />
);
// 17 · rem mendadak: dunia berhenti menggulung, badan tersentak ke depan
export const A17: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.14, x: 20, y: -70}}
    latar={(f) => Jalan(f <= 30 ? 14 * f : 420 + (14 * 30 * (1 - Math.exp(-((f - 30) / 30) * 6))) / 6)}
    aksi={(f) => <g><JendelaMobil /><PenumpangDuduk x={420} y={1080} s={1.25} mood="pucat" tangan="hp" condong={18 * Math.sin(Math.PI * mv(f, 1.0, 16, 'land'))} kepalaMiring={10} /></g>}
    atas={(f) => <><svg width={1080} height={1920} style={Pos}><g opacity={mv(f, 1.0, 4) * (1 - mv(f, 1.3, 10))} stroke={NETRAL.tinta} strokeWidth={9} strokeLinecap="round"><path d="M610 560 l50 -40 M640 620 l70 -10 M610 680 l50 40" /></g></svg><KTs b={b} pos={[{x: 540, y: 340}]} /></>} />
);
// 18 · meter tebakan meleset, lalu meter mual
const Dual = (a: number, m: number) => (_f: number) => <g><Meter x={540} y={760} r={330} isi={a} /><Meter x={540} y={1180} r={330} isi={m} /></g>;
export const A18a: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.1, x: 0, y: -60}} latar={LNetral}
    aksi={(f) => Dual(0.08 + 0.85 * mv(f, 0.4, 40, 'heavy'), 0.05)(f)} atas={() => <KTs b={b} pos={[{x: 540, y: 330}]} />} />
);
export const A18b: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={{s: 1.1, x: 0, y: -60}} ke={{s: 1.2, x: 0, y: -120}} latar={LNetral}
    aksi={(f) => Dual(0.93, 0.05 + 0.88 * mv(f, 0.1, 26, 'heavy'))(f)} atas={() => <KTs b={b} pos={[{x: 540, y: 330}]} />} />
);
// 19 · penumpang pindah ke jok depan dan menatap jalan; KLIK "oh gitu"
export const A19: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={K.awal} ke={{s: 1.14, x: 40, y: -80}} latar={(f) => Jalan(f * 9)}
    aksi={(f) => { const m = mv(f, 0.4, 30, 'heavy'); return <g><JendelaMobil /><PenumpangDuduk x={300 + 300 * m} y={1080} s={1.25} mood={m > 0.65 ? 'oh' : 'pucat'} tangan={m < 0.2 ? 'hp' : 'pangku'} kepalaMiring={m > 0.65 ? -4 : 12} /></g>; }}
    atas={(f) => { const o = mv(f, 1.3, 8); return <><div style={{...Pos, left: 730, top: 1000, opacity: Math.min(1, o * 2), transform: `translateY(${(1 - o) * 30}px)`}}><Klik width={300} opt={{eyes: 'happy', arms: [150, 150], flip: true, tilt: 3}} /></div><KTs b={b} pos={[{x: 400, y: 360}]} /></>; }} />
);
// 20 · kembali ke tikungan frame 1 (loop); KLIK menutup
export const A20: React.FC<S> = ({b}) => (
  <Dunia frames={LEN(b)} dari={{s: 1.5, x: -116, y: -63}} ke={K.awal}
    latar={(f) => Jalan(f * 9)} aksi={(f) => <MobilSamping x={540} y={1130} L={880} roda={f * 26} penumpang="pucat" />}
    atas={(f) => { const w = Math.sin(f / 4) * 18 * mv(f, 2.2, 10); return <><div style={{...Pos, left: 720, top: 980, opacity: mv(f, 1.0, 10)}}><Klik width={280} opt={{eyes: 'dot', arms: [40 + w, 20], flip: true}} /></div><KTs b={b} pos={[{x: 540, y: 330}]} /></>; }} />
);
export const ADEGAN2: Record<string, React.FC<S>> = {A1, A2, A3, A4, A5, A6, A7, A8, A9a, A9b, A10, A11, A12, A13, A14, A15, A16, A17, A18a, A18b, A19, A20};
void useCurrentFrame; void SARAF_MATA; void SARAF_TELINGA; void (null as unknown as Kam);
