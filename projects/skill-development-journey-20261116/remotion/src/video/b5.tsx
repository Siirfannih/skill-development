// B5b · komposisi papan r1 yang disetujui: latar terang biru-kuning, dua jendela asli (kiri Claude Code, kanan ChatGPT/Codex) berdampingan,
// Clawd di depan jendela kiri, Codex di depan jendela kanan. Pesan ASLI pop-up berurutan sesuai ucapan (handoff/PAHAM-SKILL-DEV.md §D adegan 1),
// didahului indikator mengetik; amplop terbang antar jendela; kartu "Dicatat" lalu loop tipis menutup + centang hijau.
// Kamera mengikuti pesan terbaru (heavy), hold akhir drift. Tanpa judul, tanpa panah/garis biru.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {CURVE, arc, drift, move} from '../lib/curves';
import {Karakter2D} from '../papan/karakter2d/Karakter2D';
import {jump} from '../papan/karakter2d/gerak';
import {Fonts} from './bersama/Fonts';
import {BAYANG_KARTU, BIRU, FONT, HIJAU, INK, KERTAS, KUNING} from './bersama/tema';
import {BAYANG_JENDELA, Titik} from './bersama/Jendela';
import {WajahDorong} from './bersama/WajahDorong';

export type RelayProps = {
  /** total frame lapisan = pre + dunia + post; durasi (detik) = dunia saja */
  durasi: number;
  /** frame wajah sebelum dunia (push masuk) dan sesudah (tarik keluar); t0 = detik absolut wajah.mp4 untuk frame pertama bagian itu */
  pre: number; post: number; preT0: number; postT0: number; zPre: number;
  /** detik relatif dunia */
  kunci: {ketik1: number; pesan1: number; amplop1: number; ketik2: number; pesan2: number; amplop2: number; pesan3: number; catat: number; loop: number; selesai: number; keluar: number};
};

const inter = (s: number, w = 500): React.CSSProperties => ({fontFamily: FONT.inter, fontSize: s, fontWeight: w, color: INK, letterSpacing: -0.4});
const WIN = {claude: {x: 130, y: 170}, chatgpt: {x: 990, y: 170}, w: 800, h: 560};

const Mini: React.FC<{claude: boolean; s: number}> = ({claude, s}) => claude
  ? <svg width={s} height={s} viewBox="0 0 100 100"><g shapeRendering="crispEdges"><path d="M18 22H82V37H97V53H82V85H73V68H64V85H55V68H45V85H36V68H27V85H18V53H3V37H18Z" fill="#F15B45"/><path d="M27 29H35V37H27Z M65 29H73V37H65Z" fill="#171411"/></g></svg>
  : <svg width={s} height={s} viewBox="0 0 100 100"><defs><linearGradient id="mg" x1=".2" y1="0" x2=".7" y2="1"><stop stopColor="#9AAEFF"/><stop offset=".45" stopColor="#5E71F6"/><stop offset="1" stopColor="#3B47DF"/></linearGradient></defs>
    <path d="M50 8 C65 1 78 12 80 25 C97 30 99 48 88 59 C94 77 78 93 62 89 C48 102 29 94 24 85 C5 85 0 67 8 55 C-3 40 7 23 22 22 C25 10 38 4 50 8 Z" fill="url(#mg)"/>
    <path d="M30 39L40 51 30 63 M48 63H67" fill="none" stroke="#FFF" strokeWidth="7.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const Pesan: React.FC<{f: number; ketik: number; muncul: number; claude?: boolean; children: React.ReactNode}> = ({f, ketik, muncul, claude = false, children}) => {
  const typing = f >= ketik && f < muncul;
  const enter = move(f, muncul, 12, 'land');
  const rebound = move(f, muncul + 5, 7, 'heavy') - move(f, muncul + 12, 11, 'heavy');
  const tIn = move(f, ketik, 6, 'land');
  if (f < ketik) return null;
  return <div style={{marginTop: 22, transformOrigin: '0 0', display: 'flex', gap: 16, alignItems: 'flex-start', lineHeight: 1.34, ...inter(41),
    transform: `translateY(${26 * (1 - (typing ? tIn : enter))}px) scale(${0.92 + 0.08 * (typing ? tIn : enter) + 0.015 * rebound})`}}>
    {claude && <span style={{color: '#D97757', fontSize: 34, lineHeight: 1.3}}>✳</span>}
    {typing
      ? <span style={{display: 'inline-flex', gap: 10, alignItems: 'center', height: 54}}>{[0, 1, 2].map((i) => <span key={i} style={{width: 14, height: 14, borderRadius: 7, background: '#8C9099',
        transform: `translateY(${-6 * Math.sin(f * 0.34 - i * 0.9)}px)`, opacity: 0.55 + 0.45 * Math.sin(f * 0.34 - i * 0.9)}}/>)}</span>
      : <span>{children}</span>}
  </div>;
};

const Jendela: React.FC<{claude: boolean; children: React.ReactNode}> = ({claude, children}) => (
  <div style={{position: 'absolute', left: claude ? WIN.claude.x : WIN.chatgpt.x, top: claude ? WIN.claude.y : WIN.chatgpt.y, width: WIN.w, height: WIN.h, background: '#FFFFFF', borderRadius: 16,
    boxShadow: BAYANG_JENDELA, overflow: 'hidden'}}>
    <div style={{height: 44, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14, background: '#F6F6F3', ...inter(22, 600)}}>
      <Titik/><span style={{marginLeft: 8, display: 'flex', alignItems: 'center', gap: 10}}><Mini claude={claude} s={26}/>{claude ? 'Claude Code' : 'ChatGPT'}</span>
      <span style={{fontWeight: 500, color: '#8C9099', fontSize: 18}}>{claude ? 'Claude 2 · Sutradara' : 'Codex'}</span>
    </div>
    <div style={{padding: '8px 40px'}}>{children}</div>
  </div>
);

const Amplop: React.FC<{f: number; mulai: number; dari: {x: number; y: number}; ke: {x: number; y: number}}> = ({f, mulai, dari, ke}) => {
  const p = arc(f, mulai, 26, dari, ke);
  const lift = move(f, mulai, 13, 'land') - move(f, mulai + 13, 13, 'heavy');
  const t = move(f, mulai, 26, 'heavy');
  const on = move(f, mulai, 4, 'reveal') * (1 - move(f, mulai + 24, 5, 'leave'));
  const dir = ke.x > dari.x ? 1 : -1;
  if (f < mulai) return null;
  return <div style={{position: 'absolute', left: p.x - 78, top: p.y - 55 - 120 * lift, width: 155, height: 110, opacity: on,
    transform: `rotate(${dir * (-12 + 24 * t)}deg) scale(${0.9 + 0.1 * on})`, filter: 'drop-shadow(0 18px 18px rgba(20,40,120,.3))'}}>
    <svg width="155" height="110" viewBox="0 0 155 110"><rect x="2" y="2" width="151" height="106" rx="18" fill="#FFFFFF"/>
      <path d="M8 12L77 65 147 12M7 100L53 60M148 100L102 60" fill="none" stroke="#D0DAF5" strokeWidth="5" strokeLinecap="round"/></svg>
  </div>;
};

const kamera = (tw: number, K: RelayProps['kunci']) => {
  // Push 1,62× ke jendela PENERIMA pesan: kedua tepi (kiri-kanan) jendela itu, tepi atas dan bawahnya tetap terlihat (fokus y 413 menjaga
  // jarak ke teks R1 di atas); jendela seberang hanya tampak sebagai potongan lebar di tepi frame. Teks pesan 41 px × 1,62 ≈ 66 px (6,1 %).
  // Fokus y selalu ≤ 500 saat zoom < 1,7: tepi atas jendela tidak pernah naik ke pita teks R1 (y 59–125), juga di tengah pull-back (audit R3).
  const keys: [number, number, number, number][] = [[0, 1.0, 960, 540], [K.pesan1 - 0.25, 1.62, 1390, 413], [K.pesan1 + 0.8, 1.66, 1390, 413], [K.amplop1 + 0.2, 1.04, 960, 500],
    [K.pesan2 - 0.25, 1.62, 530, 413], [K.pesan2 + 0.8, 1.66, 530, 413], [K.amplop2 + 0.2, 1.04, 960, 500],
    [K.pesan3 - 0.25, 1.62, 1390, 413], [K.pesan3 + 1.3, 1.66, 1390, 413], [K.catat - 0.3, 1.06, 960, 500], [K.loop, 1.0, 960, 540], [K.keluar, 1.03, 960, 540]];
  let i = 0; while (i + 1 < keys.length && tw >= keys[i + 1][0]) i++;
  if (i + 1 >= keys.length) return {s: keys[i][1], x: keys[i][2], y: keys[i][3]};
  const [a, s0, x0, y0] = keys[i], [b, s1, x1, y1] = keys[i + 1];
  const k = CURVE.heavy(Math.min(1, Math.max(0, (tw - a) / (b - a))));
  return {s: s0 + (s1 - s0) * k, x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k};
};

const Isi: React.FC<RelayProps & {f: number}> = ({kunci: K, f, durasi}) => {
  const {fps} = useVideoConfig();
  const t = f / fps;
  const F = (s: number) => Math.round(s * fps);
  const cam = kamera(t, K);
  const masuk = move(f, 0, 16, 'heavy');
  const keluar = move(f, F(K.keluar), F(durasi - K.keluar), 'heavy');
  // push-through mendarat di DUA jendela utuh (latar biru terlihat 4 sisi): faktor masuk/keluar kecil (audit V10), dorongan besar dikerjakan WajahDorong
  const sc = cam.s * (1 + 0.10 * (1 - masuk) + 0.12 * keluar);
  const dd = drift(f, fps, 5, 2);
  const clawdJump = jump(t, K.amplop2 - 0.07, K.amplop2 + 0.3, 1.4);
  const codexJump = jump(t, K.amplop1 - 0.07, K.amplop1 + 0.3, 1.2);
  const codexJump2 = jump(t, K.selesai + 0.08, K.selesai + 0.45, 2.4);
  const clawdJump2 = jump(t, K.selesai + 0.2, K.selesai + 0.55, 2.4);
  const crab = {x: 470, y: 860}, flower = {x: 1450, y: 870};
  const loopP = move(f, F(K.loop), 22, 'land');
  const chk = move(f, F(K.selesai), 8, 'land');
  const catat = move(f, F(K.catat), 14, 'land');
  return <AbsoluteFill style={{background: BIRU, overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${960 - cam.x * sc + dd.x}px, ${540 - cam.y * sc + dd.y}px) scale(${sc})`}}>
      <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0}}>
        <defs><linearGradient id="bgs" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#C9D6FF"/><stop offset="1" stopColor="#8CA8FF"/></linearGradient></defs>
        <rect x="-300" y="-500" width="2500" height="2100" fill={BIRU}/>
        <rect x="900" y="-345" width="1050" height="1300" rx="295" transform="rotate(24 1425 300)" fill="#4772FF"/>
        <rect x="-450" y="290" width="1100" height="1100" rx="275" transform="rotate(-27 100 840)" fill="url(#bgs)"/>
        <rect x="-230" y="520" width="660" height="660" rx="170" transform="rotate(-27 100 840)" fill="#7092FF"/>
        <circle cx="1750" cy="1060" r="400" fill={KUNING}/>
      </svg>
      <Jendela claude>
        <Pesan f={f} ketik={F(K.ketik2)} muncul={F(K.pesan2)} claude>Sudah kujalankan <span style={{whiteSpace: 'nowrap'}}>doctor --fix</span>. Jangan bertanya, langsung kerjakan TASK.</Pesan>
      </Jendela>
      <Jendela claude={false}>
        <Pesan f={f} ketik={F(K.ketik1)} muncul={F(K.pesan1)}>doctor.sh gagal: 8 skill berupa salinan, bukan symlink. Boleh menjalankan <span style={{whiteSpace: 'nowrap'}}>--fix?</span></Pesan>
        <Pesan f={f} ketik={F(K.pesan3 - 0.55)} muncul={F(K.pesan3)}>Revisi kamera selesai; lima still tersedia.</Pesan>
      </Jendela>
      {/* tokoh = lapis 3 di depan jendela; bayangan jatuh ke jendela/latar dengan arah cahaya yang sama dengan jendela (atas, sedikit kiri) */}
      <div style={{position: 'absolute', inset: 0, filter: 'drop-shadow(10px 30px 22px rgba(20,30,60,.30))'}}>
      <Karakter2D model="claude" id="b5-claude" x={470} y={1012} u={24} t={t} sudut={0.125} seed={1}
        emosi={[[0, 'neutral'], [K.amplop1 + 0.45, 'surprised'], [K.pesan2 - 0.1, 'thinking'], [K.selesai, 'happy']]} ekstra={{sq: clawdJump.sq + clawdJump2.sq, dy: clawdJump.dy + clawdJump2.dy}}/>
      <Karakter2D model="codex" id="b5-codex" x={1448} y={1078} u={26} t={t} sudut={-0.125} seed={2}
        emosi={[[0, 'thinking'], [K.amplop2 + 0.5, 'surprised'], [K.pesan3, 'happy'], [K.selesai, 'excited']]} ekstra={{sq: codexJump.sq + codexJump2.sq, dy: codexJump.dy + codexJump2.dy}}/>
      </div>
      <Amplop f={f} mulai={F(K.amplop1)} dari={flower} ke={crab}/>
      <Amplop f={f} mulai={F(K.amplop2)} dari={crab} ke={flower}/>
      {/* loop tipis menutup (di bawah kartu), kartu catatan, centang */}
      <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0}}>
        <path d="M820 770 C 760 1090, 1420 1090, 1330 770" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - loopP}/>
      </svg>
      {f >= F(K.catat) && <div style={{position: 'absolute', left: 660, top: 800, width: 600, padding: '26px 34px', borderRadius: 30, background: '#FFFFFF', boxShadow: BAYANG_KARTU, ...inter(33, 600), lineHeight: 1.3,
        opacity: catat > 0.02 ? 1 : 0, transform: `translateY(${40 * (1 - catat)}px) scale(${0.88 + 0.12 * catat})`}}>Dicatat: jangan menyalin, pakai tautan supaya tidak terulang</div>}
      {f >= F(K.selesai) && <div style={{position: 'absolute', left: 1180, top: 790, width: 96, height: 96, borderRadius: 48, background: '#FFFFFF', boxShadow: BAYANG_KARTU, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: `scale(${chk})`}}>
        <svg width="72" height="72" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill={HIJAU}/><path d="M27 51L44 68 75 33" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
    </div>
  </AbsoluteFill>;
};

export const RelayDunia: React.FC<RelayProps> = (p) => {
  const fAll = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dunia = Math.round(p.durasi * fps) - p.pre - p.post;
  if (fAll < p.pre) return <AbsoluteFill><Fonts/><WajahDorong f={fAll} t0={p.preT0} dari={p.zPre} ke={1.7} frames={p.pre}/></AbsoluteFill>;
  const f = fAll - p.pre;
  if (f >= dunia) return <AbsoluteFill><Fonts/><WajahDorong f={f - dunia} t0={p.postT0} dari={1.7} ke={1.0} frames={p.post}/></AbsoluteFill>;
  const blur = f < 18 || f >= Math.round(p.kunci.keluar * fps) - 2;
  return <AbsoluteFill><Fonts/>{blur ? <CameraMotionBlur shutterAngle={220} samples={8}><Isi {...p} durasi={dunia / fps} f={f}/></CameraMotionBlur> : <Isi {...p} durasi={dunia / fps} f={f}/>}</AbsoluteFill>;
};
void KERTAS;
