// B1 · "akhirnya proyek ini selesai": dunia baru = halaman repo GitHub asli (data git K01) dimiringkan seperti lantai,
// di atasnya panel timeline editor tempat Clawd mengedit: membawa klip terakhir ke celah, menekan, playhead jalan,
// baris commit teratas jadi centang hijau. Lapisan penuh opaque (DESAIN §B1).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {Icon} from '../../komponen/K01/icons';
import {REPO} from '../../komponen/K01/data';
import {CURVE, move} from '../../lib/curves';
import {Karakter2D} from '../../papan/karakter2d/Karakter2D';
import {jump, stroll} from '../../papan/karakter2d/gerak';
import {Fonts} from '../bersama/Fonts';
import {FONT, MEREK, NETRAL} from '../bersama/tema';
import {INK, MUTED} from './TemaR4';
import {active, Phrase, type Cue} from './UIWords';
const HIJAU = MEREK.hijauMerek;
import {Jendela} from './JendelaR4';

export type DuniaRepoProps = {durasi: number; t0: number; cues: Cue[]; /** detik relatif: waktu kunci dari words.json */ kunci: {lift: number; geser: number; tekan: number; selesai: number; keluar: number}};

const C = {line: '#D0D7DE', soft: '#F6F8FA', blue: '#0969DA'};
const flex: React.CSSProperties = {display: 'flex', alignItems: 'center'};
const ell: React.CSSProperties = {overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'};

// ---- panel timeline (koordinat halaman) ----
const PANEL = {x: 275, y: 290, w: 1140, h: 640};
const V1 = [{x: 24, w: 150}, {x: 184, w: 220}, {x: 414, w: 130}, {x: 554, w: 190}, {x: 754, w: 150}];
const CORAL_K = ['#FFB5AE', '#FFC7C1', '#FFA79F', '#FFD0CB', '#FFB5AE'];
const CELAH = {x: 914, w: 160};
const VY = 112, KH = 56, VH = KH;
const GROUND = PANEL.y + 596;          // kaki Clawd (halaman)

const Klip: React.FC<{x: number; y: number; w: number; h: number; c: string; c2: string; kunci?: number; rot?: number}> = ({x, y, w, h, c, c2, kunci = 0, rot = 0}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 14, background: c,
    boxShadow: '0 6px 12px rgba(30,50,120,.14)', transform: `rotate(${rot}deg) scale(${1 + 0.05 * kunci})`, overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg,rgba(255,255,255,.22) 0 2px,transparent 2px 26px)'}}/>
    <div style={{position: 'absolute', left: 12, top: 12, width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,.7)'}}/>
  </div>
);

const Gelombang: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={56} viewBox={`0 0 ${w} 56`} style={{display: 'block'}}>
    {Array.from({length: Math.floor(w / 9)}, (_, i) => {
      const h = 8 + 34 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31 + 1));
      return <rect key={i} x={i * 9 + 3} y={28 - h / 2} width={5} height={h} rx={2.5} fill="#7E8BA6"/>;
    })}
  </svg>
);

const Panel: React.FC<{tw: number; K: DuniaRepoProps['kunci']}> = ({tw, K}) => {
  const f = Math.round(tw * 30);
  const lock = move(f, Math.round(K.tekan * 30), 8, 'land');
  const ring = move(f, Math.round(K.tekan * 30), 12, 'land');
  const play = move(f, Math.round((K.tekan + 0.04) * 30), Math.round((K.selesai - K.tekan - 0.04) * 30), 'drift');
  const px = 24 + play * (CELAH.x + CELAH.w - 24);
  const slide = move(f, Math.round((K.tekan - 0.07) * 30), 3, 'land');
  const jam = Math.min(24, Math.floor(play * 24));
  const track = (y: number, c: string, xs: {x: number; w: number}[]) => <>
    <div style={{position: 'absolute', left: 0, right: 0, top: y - 8, height: KH + 16, background: '#F3F5FA'}}/>
    {xs.map((k, i) => <Klip key={i} x={k.x} y={y} w={k.w} h={KH} c={c} c2={c}/>)}</>;
  return <Jendela x={PANEL.x} y={PANEL.y} w={PANEL.w} h={PANEL.h} bar="#F4F5F8" judul={<span style={{marginLeft: 'auto', fontFamily: FONT.mono, fontWeight: 700, fontSize: 17, color: MUTED}}>00:00:{String(jam).padStart(2, '0')}:00</span>}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 40, borderBottom: '1px solid #EEF0F5'}}>
      {Array.from({length: 56}, (_, i) => <div key={i} style={{position: 'absolute', left: 24 + i * 20, top: i % 5 === 0 ? 12 : 22, width: 2, height: i % 5 === 0 ? 22 : 12, background: '#C5CBD8'}}/>)}
    </div>
    {/* tiga track warna lembut (merah / kuning / teal) + playhead tipis; klip bertinggi ±3 % frame */}
    {track(VY - 28, '#FFE08A', [{x: 120, w: 180}, {x: 330, w: 240}, {x: 640, w: 200}, {x: 880, w: 130}])}
    <div style={{position: 'absolute', left: 0, right: 0, top: VY - 8 + 20, height: KH + 16, background: '#F3F5FA'}}>
      {V1.map((k, i) => <Klip key={i} x={k.x} y={8} w={k.w} h={KH} c={CORAL_K[i]} c2={CORAL_K[i]}/>)}
      <div style={{position: 'absolute', left: CELAH.x, top: 8, width: CELAH.w, height: KH, borderRadius: 12, border: '3px dashed #B9C2D6', opacity: 1 - lock, boxSizing: 'border-box'}}/>
      <div style={{position: 'absolute', left: CELAH.x - 10, top: -2, width: CELAH.w + 20, height: KH + 20, borderRadius: 18, border: `3px solid ${HIJAU}`,
        opacity: (1 - ring) * ring * 4, transform: `scale(${1 + 0.12 * ring})`}}/>
      {slide > 0.01 && <Klip x={CELAH.x} y={8 + (1 - slide) * 200} w={CELAH.w} h={KH} c={CORAL_K[4]} c2={CORAL_K[4]} kunci={lock * (1 - ring)}/>}
    </div>
    {track(VY + 76, '#9ADFD2', [{x: 24, w: 330}, {x: 364, w: 250}, {x: 640, w: 210}, {x: 860, w: 214}])}
    <div style={{position: 'absolute', left: px - 1.5, top: 34, width: 3, height: 250, background: '#E5484D', opacity: f >= Math.round(K.tekan * 30) ? 1 : 0.9}}>
      <div style={{position: 'absolute', left: -8, top: -2, width: 19, height: 15, background: '#E5484D', borderRadius: '4px 4px 10px 10px'}}/>
    </div>
  </Jendela>;
};

const CommitStatus: React.FC<{f: number; k: number}> = ({f, k}) => {
  const change = move(f, k - 1, 1, 'whip');
  const ring = move(f, k, 10, 'land');
  const scale = 0.72 + 0.31 * move(f, k, 7, 'land') - 0.03 * move(f, k + 7, 7, 'heavy');
  return <div style={{position: 'relative', width: 34, height: 34, flexShrink: 0}}>
    <div style={{position: 'absolute', inset: 4, border: `2px solid ${MUTED}`, borderRadius: '50%', opacity: 1 - change}}/>
    <div style={{position: 'absolute', inset: 0, border: `2px solid ${HIJAU}`, borderRadius: '50%', opacity: change * (1 - ring), transform: `scale(${1 + 1.2 * ring})`}}/>
    <div style={{...flex, justifyContent: 'center', position: 'absolute', inset: 0, background: HIJAU, color: NETRAL.hitam, borderRadius: '50%', opacity: change, transform: `scale(${scale})`}}><Icon name="check" size={26}/></div>
  </div>;
};

const Halaman: React.FC<{f: number; kSelesai: number; t: number; cues: Cue[]}> = ({f, kSelesai, t, cues}) => {
  const c3 = cues.find(x => x.id === 'T003'), c5 = cues.find(x => x.id === 'T005');
  const done = move(f, kSelesai - 1, 1, 'whip');
  const sorot = move(f, kSelesai + 10, 22, 'leave');
  const latest = REPO.commits[0];
  const tabs = [['Code', 'code'], ['Issues', 'issue'], ['Pull requests', 'pull'], ['Actions', 'clock'], ['Projects'], ['Security'], ['Insights']] as [string, any?][];
  return <AbsoluteFill style={{background: '#FFFFFF', color: INK, fontFamily: FONT.inter}}>
    <div style={{position: 'absolute', inset: '0 0 auto', height: 160, background: C.soft, borderBottom: `1px solid ${C.line}`}}>
      <div style={{...flex, height: 70, padding: '0 46px', gap: 28}}>
        <Icon name="github" size={42}/><span style={{fontSize: 22}}>{REPO.owner}</span><span style={{color: MUTED, fontSize: 26}}>/</span><strong style={{fontSize: 22}}>{REPO.name}</strong>
        <div style={{...flex, marginLeft: 'auto', gap: 14, height: 44, width: 370, border: `1px solid ${C.line}`, padding: '0 16px', borderRadius: 7, color: MUTED, fontSize: 20}}><Icon name="search" size={21}/>Type / to search</div>
      </div>
      <div style={{...flex, height: 90, padding: '0 96px', gap: 14}}>
        <Icon name="repo" size={28} color={MUTED}/>
        <span style={{fontSize: 32, color: C.blue}}>{REPO.owner}<span style={{color: MUTED, padding: '0 13px'}}>/</span><strong>{REPO.name}</strong></span>
      </div>
      {false && <div style={{...flex, height: 78, padding: '0 84px', gap: 14}}>{tabs.map(([label, icon], i) => <div key={label} style={{...flex, position: 'relative', height: '100%', padding: '0 16px', gap: 12, fontSize: 23, fontWeight: i === 0 ? 600 : 400}}>
        {icon && <Icon name={icon} color={MUTED} size={23}/>}<span>{label}</span>
        {i === 0 && <div style={{position: 'absolute', bottom: 0, height: 4, left: 0, right: 0, background: '#FD8C73', borderRadius: 4}}/>}</div>)}</div>}
    </div>
    <div style={{position: 'absolute', left: 96, top: 182, width: 1278}}>
      <div style={{border: `1px solid ${C.line}`, borderRadius: 8, overflow: 'hidden'}}>
        <div style={{...flex, gap: 14, height: 76, padding: '0 21px', borderBottom: `1px solid ${C.line}`,
          background: `rgb(${246 + (200 - 246) * done * (1 - sorot * 0.64)},${248 + (230 - 248) * done * (1 - sorot * 0.64)},${250 + (74 - 250) * done * (1 - sorot * 0.64)})`}}>
          <div style={{...flex, justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', background: '#E4E8EC', fontSize: 14, fontWeight: 600}}>SI</div>
          <strong style={{fontSize: 21}}>{REPO.owner}</strong><span style={{...ell, fontSize: 21, flex: 1}}>{active(c3, t) ? <span style={{marginLeft: 170}}><Phrase cue={c3} t={t} size={60}/></span> : active(c5, t) ? <Phrase cue={c5} t={t} size={60}/> : latest.subject}</span>
          <span style={{fontSize: 20, color: MUTED}}>{latest.hash}</span><CommitStatus f={f} k={kSelesai}/>
          <span style={{...flex, gap: 8, fontSize: 20}}><Icon name="clock" size={24}/><strong>{REPO.commitCount}</strong> commits</span>
        </div>
        {REPO.rows.map((row, i) => <div key={row.name} style={{...flex, height: 36, padding: '0 22px', gap: 14, borderBottom: i === REPO.rows.length - 1 ? undefined : '1px solid #E8EBEF'}}>
          <Icon name={row.kind === 'folder' ? 'folder' : 'file'} color={row.kind === 'folder' ? '#54AEFF' : MUTED} size={24}/>
          <span style={{width: 254, flexShrink: 0, fontSize: 22, color: C.blue}}>{row.name}</span>
          <span style={{...ell, flex: 1, fontSize: 21, color: MUTED}}>{row.subject}</span><span style={{width: 167, textAlign: 'right', fontSize: 20, color: MUTED}}>{row.relative}</span>
        </div>)}
      </div>
    </div>
    <aside style={{position: 'absolute', left: 1458, top: 207, width: 344}}>
      <div style={{fontSize: 25, fontWeight: 600, paddingBottom: 20, borderBottom: `1px solid ${C.line}`}}>About</div>
      {REPO.commits.slice(0, 4).map((c) => <div key={c.hash} style={{padding: '14px 0', borderBottom: `1px solid #E8EBEF`}}>
        <div style={{...ell, fontSize: 20}}>{c.subject}</div><div style={{fontSize: 18, color: MUTED, marginTop: 4}}>{c.hash} · {c.relative}</div></div>)}
    </aside>
  </AbsoluteFill>;
};

const U = 20;
/** kamera dunia: kunci (skala, titik fokus halaman) di tiap waktu; antar kunci memakai kurva heavy/drift */
const kamera = (tw: number, K: DuniaRepoProps['kunci']) => {
  // pull 5 % saat dunia terbentuk, lalu push heavy ke Clawd, lalu ke centang (MG63 §3 B1)
  const keys: [number, number, number, number][] = [[0, 1.05, 960, 540], [0.55, 1.0, 960, 540], [K.lift, 1.02, 900, 580], [K.tekan - 0.1, 1.06, 900, 600],
    [K.selesai - 0.3, 1.06, 900, 600], [K.selesai + 0.35, 1.1, 940, 560], [K.keluar, 1.12, 940, 560]];
  let i = 0; while (i + 1 < keys.length && tw >= keys[i + 1][0]) i++;
  if (i + 1 >= keys.length) return {s: keys[i][1], x: keys[i][2], y: keys[i][3]};
  const [a, s0, x0, y0] = keys[i], [b, s1, x1, y1] = keys[i + 1];
  const k = (i === 0 || i === 3 ? CURVE.drift : CURVE.heavy)(Math.min(1, Math.max(0, (tw - a) / (b - a))));
  return {s: s0 + (s1 - s0) * k, x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k};
};

const Isi: React.FC<DuniaRepoProps & {f: number}> = ({kunci: K, f, durasi, t0, cues}) => {
  const {fps} = useVideoConfig();
  const t = f / fps;
  const cam = kamera(t, K);
  const masuk = move(f, 0, 16, 'heavy');                 // dorong menembus: dunia datang dari skala 1,55
  const keluar = move(f, Math.round(K.keluar * fps), Math.round((durasi - K.keluar) * fps), 'heavy');
  const sc = cam.s * (1 + 0.55 * (1 - masuk) + 0.5 * keluar);
  const sel = Math.round(K.selesai * fps);
  // Clawd: mendarat (0,35), mengangkat klip, berjalan ke kanan membawa klip, melompat menekan, lalu melompat senang
  const mulaiX = PANEL.x + 700, akhirX = PANEL.x + CELAH.x + CELAH.w / 2 + 4;
  const walk = stroll(t, K.geser, K.tekan - 0.12, mulaiX, akhirX, U);
  const drop = move(f, 6, 14, 'heavy');
  const tekan = jump(t, K.tekan - 0.12, K.tekan - 0.02, 2.2);
  const senang = jump(t, K.selesai + 0.04, K.selesai + 0.4, 3.2);
  const emo: [number, string][] = [[0, 'neutral'], [K.lift - 0.05, 'idea'], [K.tekan - 0.02, 'excited'], [K.selesai + 0.02, 'happy']];
  const bawa = t >= K.lift && t < K.tekan - 0.02;
  const carryY = GROUND - U * 8.4 - 20 - KH;
  // klip terakhir: di lantai -> diangkat -> dibawa di atas kepala -> naik ke celah
  const naik = move(f, Math.round(K.lift * fps), 8, 'land');
  const k5y = bawa || t >= K.lift ? (GROUND - KH) + (carryY - (GROUND - KH)) * naik : GROUND - KH;
  const k5x = bawa ? walk.x - CELAH.w / 2 : t < K.lift ? mulaiX + 150 : PANEL.x + CELAH.x;
  return <AbsoluteFill style={{background: '#EEF1F6', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${960 - cam.x * sc}px, ${540 - cam.y * sc}px) scale(${sc})`}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '50% 100%', transform: 'perspective(3000px) rotateX(6deg) scale(1.03)'}}>
        <Halaman f={f} kSelesai={sel} t={t0 + t} cues={cues}/>
        <Panel tw={t} K={K}/>
        {active(cues.find(x => x.id === 'T004'), t0 + t) && <div style={{position: 'absolute', left: PANEL.x + 110, top: PANEL.y + 325,
          background: HIJAU, borderRadius: 28, padding: '10px 30px 18px', transformOrigin: '50% 80%',
          transform: `scale(${.9 + .1 * move(f, ((cues.find(x => x.id === 'T004')?.start ?? 0) - t0) * fps, 4, 'heavy')})`}}>
          <span style={{fontFamily: FONT.anton, fontSize: 188, lineHeight: 1.1, letterSpacing: -2, color: NETRAL.hitam}}>SELESAI</span>
        </div>}
        {t < K.tekan - 0.07 && <Klip x={k5x} y={k5y} w={CELAH.w} h={KH} c={CORAL_K[4]} c2={CORAL_K[4]} rot={bawa ? -2 + 4 * Math.sin(t * 9) * 0.25 : 0}/>}
        {false && t >= 0.2 && <div style={{position: 'absolute', inset: 0, filter: 'drop-shadow(8px 22px 16px rgba(20,30,60,.30))'}}><Karakter2D model="claude" id="b1-clawd" x={walk.x} y={GROUND} u={U} t={t} seed={1} lantai sudut={walk.walk > 0 && t < K.tekan ? 0.125 : 0.125}
          emosi={emo.map(([a, n]) => [a, n] as [number, string])}
          ekstra={{sq: tekan.sq + senang.sq, dy: tekan.dy + senang.dy + (walk.dy ?? 0) - 12 * (1 - drop)}}/></div>}
      </div>
    </div>
  </AbsoluteFill>;
};

export const DuniaRepoUI: React.FC<DuniaRepoProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const blur = f < 18 || f >= Math.round(p.kunci.keluar * fps) - 2;
  return <AbsoluteFill><Fonts/>{blur ? <CameraMotionBlur shutterAngle={220} samples={8}><Isi {...p} f={f}/></CameraMotionBlur> : <Isi {...p} f={f}/>}</AbsoluteFill>;
};
