// Karakter2D — Clawd (Claude crab), Codex (bunga `>_`), Gemini (bintang) dalam bahasa gambar ClaudeAnimationBase:
// 2D datar bertekstur kuas, garis tinta satu goresan bergetar, putar badan = 5 gambar sudut kunci + smear (bukan rotasi 3D).
// Rig, tabel VIEWS, urutan lapis, dan angka pose diturunkan dari ClaudeAnimationBase
// (MIT License, Copyright (c) 2026 John Heibel — https://github.com/JohnHeibel/ClaudeAnimationBase, lisensi: ./LICENSE-ClaudeAnimationBase).
// Gambar ditulis ulang sebagai SVG + filter prosedural (tanpa raster); bentuk dan warna mengikuti ikon asli di sumber/ref/.
import React from 'react';
import {blinking, emotions, type Key, onTwos, spinView, squashScale, type View} from './gerak';

export type Model = 'claude' | 'codex' | 'gemini';
export type Wajah = 'neutral' | 'happy' | 'surprised' | 'thinking';
export const WAJAH: Record<string, Wajah> = {neutral: 'neutral', happy: 'happy', excited: 'happy', proud: 'happy', love: 'happy',
  surprised: 'surprised', idea: 'surprised', scared: 'surprised', thinking: 'thinking', sad: 'neutral', sleepy: 'neutral', bored: 'neutral', angry: 'neutral'};
export const VIEWS: View[] = ['front', 'q', 'side', 'qback', 'back'];

export type Karakter2DProps = {
  model: Model; id: string;
  /** Kaki/dasar tokoh, px di kanvas induk. */
  x: number; y: number;
  /** Satuan rig (px). Clawd tinggi ±8,2u; bunga/bintang ±10u. */
  u: number;
  /** Detik. */
  t: number;
  /** Sudut kunci, atau heading dalam putaran (0 depan, .25 kanan, .5 belakang) yang dibulatkan ke 1/8. */
  sudut?: View | number;
  smear?: number;
  /** Kunci emosi [detik, nama]; perubahan selalu diaktingkan lewat emotions(). */
  emosi?: Key[];
  /** Gerak tambahan dari adegan (lompat, take, masuk). */
  ekstra?: {dx?: number; dy?: number; sq?: number; rot?: number; scale?: number};
  seed?: number;
  /** Integrasi kamar (B1b): bayangan lembut ke dinding + warna cahaya kamar. */
  kamar?: boolean;
  /** Bayangan kontak di bawah dasar. */
  lantai?: boolean;
  /** Emote terjadwal [detik, jenis, lama, skala]: pop 3 f, tahan, keluar 3 f; menggantikan emote otomatis selama tampil. */
  emote?: EmoteJadwal[];
};
export type EmoteKind = 'seru' | 'bintang' | 'tanya' | 'centang' | 'nada';
export type EmoteJadwal = [number, EmoteKind, number?, number?];

const INK = '#241913';
type ViewDef = {L: number; R: number; strip?: [number, number]; face: {cx: number; fw: number; sides: number[]} | null;
  legs: [number, number][]; arms: [number, number, 'L' | 'R', number][]; back?: boolean};
// clawd.js:20-31 (tabel VIEWS asli, satuan u).
const CLAWD: Record<View, ViewDef> = {
  front: {L: -5, R: 5, face: {cx: 0, fw: 1, sides: [-1, 1]}, legs: [[-4, 0], [-2, 0], [1, 0], [3, 0]], arms: [[-4.9, -1, 'L', 0], [4.9, 1, 'R', 0]]},
  q: {L: -5, R: 5.1, strip: [-5, -2.3], face: {cx: 1.5, fw: .74, sides: [-1, 1]}, legs: [[-4.3, 1], [-1.8, 0], [.8, 0], [3.3, 0]], arms: [[5, 1, 'R', 2], [-4.7, -1, 'L', 1]]},
  side: {L: -3.1, R: 3.1, face: {cx: 1.35, fw: .55, sides: [1]}, legs: [[-2.1, 1], [1.3, 1], [-2.6, 0], [.9, 0]], arms: [[1.6, 0, 'L', 1]]},
  qback: {L: -5.1, R: 5, strip: [2.3, 5], face: null, legs: [[3.3, 1], [.8, 0], [-1.8, 0], [-4.3, 0]], arms: [[-5, -1, 'R', 2], [4.7, 1, 'L', 1]]},
  back: {L: -5, R: 5, face: null, back: true, legs: [[-4, 0], [-2, 0], [1, 0], [3, 0]], arms: [[-4.9, -1, 'R', 0], [4.9, 1, 'L', 0]]},
};
// Bunga & bintang: sudut kunci = lebar silhuet + sisi gelap + posisi wajah (bahasa yang sama dengan Clawd).
const ROUND: Record<View, {w: number; strip: number; face: {cx: number; fw: number} | null}> = {
  front: {w: 1, strip: 0, face: {cx: 0, fw: 1}}, q: {w: .84, strip: -1, face: {cx: 1.15, fw: .78}},
  side: {w: .4, strip: 0, face: {cx: 1.1, fw: .42}}, qback: {w: .84, strip: 1, face: null}, back: {w: 1, strip: 0, face: null},
};

const FLOWER = 'M50 8 C65 1 78 12 80 25 C97 30 99 48 88 59 C94 77 78 93 62 89 C48 102 29 94 24 85 C5 85 0 67 8 55 C-3 40 7 23 22 22 C25 10 38 4 50 8 Z';
const STAR = 'M50 2C53 26 72 46 98 50C72 54 53 74 50 98C47 74 28 54 2 50C28 46 47 26 50 2Z';

const Kuas: React.FC<{id: string; boil: number; shadow?: boolean}> = ({id, boil, shadow}) => <defs>
  {/* tepi goresan tangan: garis & isi bergetar ±.07u, ganti gambar 12×/dtk */}
  <filter id={`${id}-tepi`} x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed={boil} result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale=".14" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  {/* wash cat air: bercak gelap-terang di dalam bentuk + butir kertas */}
  <filter id={`${id}-wash`} x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".2" numOctaves="2" seed={7 + boil % 3} result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 1.45" result="spot"/>
    <feComposite in="spot" in2="SourceAlpha" operator="in" result="spotIn"/>
    <feComponentTransfer in="spotIn" result="dark"><feFuncA type="linear" slope=".22"/></feComponentTransfer>
    <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="3" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.6 .9" result="grainA"/>
    <feComposite in="grainA" in2="SourceAlpha" operator="in" result="grainIn"/>
    <feComponentTransfer in="grainIn" result="grain"><feFuncA type="linear" slope=".05"/></feComponentTransfer>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="dark"/><feMergeNode in="grain"/></feMerge>
  </filter>
  {shadow && <filter id={`${id}-bayang`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation=".55"/></filter>}
  <filter id={`${id}-lembut`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation=".45"/></filter>
</defs>;

type Pose = ReturnType<typeof emotions> & {blink: boolean};

const Eyes: React.FC<{cx: number; fw: number; sides: number[]; y: number; gap: number; w: number; h: number; p: Pose; wajah: Wajah; light?: string}> = ({cx, fw, sides, y, gap, w, h, p, wajah, light}) => {
  const lx = .32 * (p.lookX ?? 0), ly = .3 * (p.lookY ?? 0);
  return <>{sides.map(s => {
    const ex = cx + s * gap * fw + lx;
    if (wajah === 'happy' && p.squint < .5) return <path key={s} d={`M${ex - .62 * fw} ${y + .3}L${ex} ${y - .55}L${ex + .62 * fw} ${y + .3}`} fill="none" stroke={INK} strokeWidth=".34" strokeLinecap="round" strokeLinejoin="round"/>;
    const big = wajah === 'surprised' ? 1.25 : 1;
    const closed = p.blink ? .14 : 1 - .82 * p.squint;
    const hh = h * big * closed;
    return <g key={s}>
      <rect x={ex - w * big * fw / 2} y={y - hh / 2 + ly} width={w * big * fw} height={hh} rx={.12} fill={INK}/>
      {light && closed > .6 && <circle cx={ex + .1 * fw} cy={y - hh / 2 + ly + .3} r={.13} fill={light} opacity=".9"/>}
    </g>;
  })}</>;
};


/** Emote terjadwal (D-401): pop 3 f (skala .5 -> 1,15 -> 1), tahan, keluar 3 f. Satuan u; dasar emote di (0,0), tinggi ±2,6u. */
export const EmoteX: React.FC<{kind: EmoteKind; a: number; lama: number; skala?: number}> = ({kind, a, lama, skala = 1}) => {
  const fpsE = 30, pin = Math.min(1, a * fpsE / 3), pout = Math.min(1, Math.max(0, (lama - a) * fpsE / 3));
  const k = Math.min(pin, pout);
  const pop = (0.5 + 0.65 * Math.min(1, pin * 1.3) - 0.15 * Math.max(0, pin * 1.3 - 1)) * (0.4 + 0.6 * pout) * skala;
  const A = '#F5C443', tipis = {stroke: INK, strokeWidth: .16, strokeLinejoin: 'round' as const};
  const isi = kind === 'seru' ? <g><path d="M-.45 -2.6L.45 -2.6L.25 -.8L-.25 -.8Z" fill={A} {...tipis}/><circle cx="0" cy="-.3" r=".38" fill={A} {...tipis}/></g>
    : kind === 'bintang' ? <path d="M0 -2.8C.14 -1.7 .4 -1.45 1.5 -1.4C.4 -1.3 .14 -1.05 0 .1C-.14 -1.05 -.4 -1.3 -1.5 -1.4C-.4 -1.45 -.14 -1.7 0 -2.8Z" fill="#FFF3C4" {...tipis}/>
    : kind === 'tanya' ? <g><rect x="-1.7" y="-2.5" width="3.4" height="1.9" rx=".5" fill="#FFFFFF" {...tipis}/><path d="M-.5 -.62L-.9 -.1L.1 -.62Z" fill="#FFFFFF" {...tipis}/>{[-.85, 0, .85].map((x) => <circle key={x} cx={x} cy="-1.55" r=".27" fill={INK}/>)}</g>
    : kind === 'centang' ? <g><circle cx="0" cy="-1.3" r="1.25" fill="#2FB457" {...tipis}/><path d="M-.65 -1.25L-.15 -.7L.75 -1.95" fill="none" stroke="#FFFFFF" strokeWidth=".34" strokeLinecap="round" strokeLinejoin="round"/></g>
    : <g><ellipse cx="-.45" cy="-.45" rx=".6" ry=".42" fill={INK}/><path d="M.1 -.5L.1 -2.5Q.9 -2.3 1.1 -1.6" fill="none" stroke={INK} strokeWidth=".24" strokeLinecap="round"/></g>;
  return k > 0.01 ? <g transform={`scale(${pop})`} opacity={Math.min(1, k * 1.6)}>{isi}</g> : null;
};
/** emote terjadwal yang sedang aktif pada waktu t (atau null) */
export const emoteAktif = (t: number, daftar?: EmoteJadwal[]) => {
  for (const [t0, kind, lama = 0.4, skala = 1] of daftar ?? []) if (t >= t0 && t <= t0 + lama) return {kind, a: t - t0, lama, skala};
  return null;
};

const Mouth: React.FC<{x: number; y: number; wajah: Wajah; s?: number}> = ({x, y, wajah, s = 1}) => wajah === 'happy'
  ? <path d={`M${x - .7 * s} ${y}Q${x} ${y + .75 * s} ${x + .7 * s} ${y}`} fill="none" stroke={INK} strokeWidth=".3" strokeLinecap="round"/>
  : wajah === 'surprised' ? <ellipse cx={x} cy={y + .25} rx={.45 * s} ry={.6 * s} fill={INK}/>
  : wajah === 'thinking' ? <path d={`M${x - .45 * s} ${y + .2}H${x + .4 * s}`} stroke={INK} strokeWidth=".26" strokeLinecap="round"/> : null;

const Emote: React.FC<{wajah: Wajah; k: number; x: number; y: number}> = ({wajah, k, x, y}) => {
  if (k <= .01) return null;
  const pop = .6 + .4 * Math.min(1, k * 1.4);
  if (wajah === 'surprised') return <g transform={`translate(${x} ${y}) scale(${pop})`} opacity={k}>
    <path d="M-.35 -2.6L.35 -2.6L.18 -.75L-.18 -.75Z" fill="#F5C443" stroke={INK} strokeWidth=".16" strokeLinejoin="round"/>
    <circle cx="0" cy="-.15" r=".3" fill="#F5C443" stroke={INK} strokeWidth=".16"/></g>;
  if (wajah === 'thinking') return <g transform={`translate(${x} ${y}) scale(${pop})`} opacity={k}>
    {[0, 1, 2].map(i => <circle key={i} cx={i * .75 - .75} cy="-.6" r=".26" fill={INK}/>)}</g>;
  if (wajah === 'happy') return <g transform={`translate(${x} ${y}) scale(${pop})`} opacity={k}>
    <path d="M0 -2.1C.12 -1.1 .3 -.92 1 -.8C.3 -.68 .12 -.5 0 .5C-.12 -.5 -.3 -.68 -1 -.8C-.3 -.92 -.12 -1.1 0 -2.1Z" fill="#FFF3C4" stroke={INK} strokeWidth=".13" strokeLinejoin="round"/></g>;
  return null;
};

const ClawdBody: React.FC<{id: string; v: ViewDef; p: Pose; wajah: Wajah; color: string; shadow: boolean; kamar: boolean; flip: boolean}> = ({id, v, p, wajah, color, shadow, kamar, flip}) => {
  const fill = shadow ? '#000' : color;
  const stroke = shadow ? 'none' : INK;
  const arm = (a: ViewDef['arms'][number], i: number) => {
    const [ax, dir, side] = a;
    const raise = (side === 'L' ? p.aL : p.aR) ?? .2;
    const ang = -dir * raise * 40;
    return <g key={`a${i}`} transform={`translate(${ax} -4.5) rotate(${flip ? -ang : ang})`}>
      <rect x={dir < 0 ? -2.2 : 0} y={-.5} width={2.2} height={1} rx={.14} fill={fill} stroke={stroke} strokeWidth=".2"/>
    </g>;
  };
  const leg = (l: [number, number], i: number) => <rect key={`l${i}`} x={l[0]} y={-2.1} width={1} height={2.25} rx={.1}
    fill={shadow ? fill : l[1] ? shade(color, -.18) : color} stroke={stroke} strokeWidth=".2"/>;
  return <g filter={shadow ? undefined : `url(#${id}-tepi)`}>
    {v.arms.filter(a => a[3] < 2).map(arm)}
    {v.legs.filter(l => l[1]).map(leg)}{v.legs.filter(l => !l[1]).map(leg)}
    <g filter={shadow ? undefined : `url(#${id}-wash)`}>
      <rect x={v.L} y={-8} width={v.R - v.L} height={6} rx={.16} fill={fill}/>
      {!shadow && v.strip && <rect x={v.strip[0]} y={-8} width={v.strip[1] - v.strip[0]} height={6} fill="#000" opacity=".16"/>}
      {!shadow && v.back && <rect x={v.L} y={-8} width={v.R - v.L} height={6} fill="#000" opacity=".06"/>}
    </g>
    {!shadow && <g clipPath={`url(#${id}-clip)`}>
      <ellipse cx={v.L + 3.2} cy={-7.1} rx={3.4} ry={1.2} fill="#FFFFFF" opacity=".16" filter={`url(#${id}-lembut)`}/>
      <rect x={v.L} y={-3.3} width={v.R - v.L} height={1.3} fill="#4A1A0C" opacity=".14"/>
      {kamar && <rect x={v.L} y={-8} width={v.R - v.L} height={6} fill={`url(#${id}-kamar)`}/>}
    </g>}
    <rect x={v.L} y={-8} width={v.R - v.L} height={6} rx={.16} fill="none" stroke={stroke} strokeWidth=".24"/>
    {!shadow && v.strip && <path d={`M${v.strip[0] === v.L ? v.strip[1] : v.strip[0]} -8V-2`} stroke={INK} strokeWidth=".16" opacity=".8"/>}
    {!shadow && v.face && <>
      <Eyes cx={v.face.cx} fw={v.face.fw} sides={v.face.sides} y={-6} gap={2.5} w={1} h={2} p={p} wajah={wajah}/>
      <Mouth x={v.face.cx + .2 * (p.lookX ?? 0)} y={-4.3} wajah={wajah} s={v.face.fw}/>
    </>}
    {v.arms.filter(a => a[3] === 2).map(arm)}
  </g>;
};

const shade = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k));
  return `rgb(${c.join(',')})`;
};

const RoundBody: React.FC<{id: string; model: 'codex' | 'gemini'; view: View; p: Pose; wajah: Wajah; shadow: boolean; kamar: boolean; flip: boolean}> = ({id, model, view, p, wajah, shadow, kamar, flip}) => {
  const r = ROUND[view];
  const shape = model === 'codex' ? FLOWER : STAR;
  const size = model === 'codex' ? 9.4 : 10.4;
  const cy = model === 'codex' ? -6.4 : -6.6;
  const tf = `translate(0 ${cy}) scale(${r.w} 1) translate(${-size / 2} ${-size / 2}) scale(${size / 100})`;
  const back = view === 'back' || view === 'qback';
  const armColor = model === 'codex' ? '#4656E6' : '#6C7BE8';
  const arms = model === 'codex' && view !== 'side' ? [-1, 1].map(s => {
    const raise = (s < 0 ? p.aL : p.aR) ?? .2;
    return <g key={s} transform={`translate(${s * 4.3 * r.w} ${cy + 1}) rotate(${-s * raise * 40})`}>
      <rect x={s < 0 ? -1.7 : 0} y={-.45} width={1.7} height={.9} rx={.42} fill={shadow ? '#000' : armColor} stroke={shadow ? 'none' : INK} strokeWidth=".2"/>
    </g>;
  }) : null;
  const face = r.face;
  return <g filter={shadow ? undefined : `url(#${id}-tepi)`}>
    {arms}
    <g filter={shadow ? undefined : `url(#${id}-wash)`}>
      <path d={shape} transform={tf} fill={shadow ? '#000' : `url(#${id}-${model})`}/>
      {!shadow && back && <path d={shape} transform={tf} fill="#1A1F5A" opacity=".16"/>}
    </g>
    {!shadow && <g clipPath={`url(#${id}-clip)`}>
      {r.strip !== 0 && <rect x={r.strip < 0 ? -size / 2 : size * r.w / 2 - 2.6 * r.w} y={cy - size / 2} width={2.6 * r.w + (r.strip < 0 ? size / 2 - size * r.w / 2 : 0)} height={size} fill="#0E1450" opacity=".2"/>}
      {!back && <ellipse cx={-2.3 * r.w} cy={cy - 2.4} rx={2.3 * r.w} ry={1.6} fill="#FFFFFF" opacity={model === 'codex' ? .55 : .3} filter={`url(#${id}-lembut)`}/>}
      {kamar && <rect x={-size / 2} y={cy - size / 2} width={size} height={size} fill={`url(#${id}-kamar)`}/>}
    </g>}
    <path d={shape} transform={tf} fill="none" stroke={shadow ? 'none' : INK} strokeWidth={.24 * 100 / size} vectorEffect="none"/>
    {!shadow && face && model === 'codex' && <g transform={`translate(${face.cx} 0)`}>
      {/* `>_` = identitas ikon asli: putih tebal, ≥18 % tinggi tokoh, tetap menghadap kamera */}
      {/* rig dicerminkan saat menghadap kiri; simbolnya tidak (tetap `>_`, bukan `_<`) */}
      <g transform={`translate(0 ${cy + .9}) scale(${(flip ? -1 : 1) * face.fw} 1)`}>
        <path d="M-2.2 -1.15L-.95 0L-2.2 1.15M.15 1.15H2.15" fill="none" stroke="#FFFFFF" strokeWidth=".66" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <Eyes cx={0} fw={face.fw} sides={[-1, 1]} y={cy - 1.75} gap={1.25} w={.62} h={1.15} p={p} wajah={wajah} light="#C9D3FF"/>
    </g>}
    {!shadow && face && model === 'gemini' && <g transform={`translate(${face.cx} 0)`}>
      <Eyes cx={0} fw={face.fw} sides={[-1, 1]} y={cy - .5} gap={1.05} w={.6} h={1.25} p={p} wajah={wajah} light="#E4E9FF"/>
      <Mouth x={.15 * (p.lookX ?? 0)} y={cy + 1.1} wajah={wajah === 'neutral' ? 'happy' : wajah} s={.62 * face.fw}/>
    </g>}
  </g>;
};

export const Karakter2D: React.FC<Karakter2DProps> = ({model, id, x, y, u, t, sudut = 'front', smear = 0, emosi = [[0, 'neutral']], ekstra = {}, seed = 0, kamar = false, lantai = true, emote}) => {
  const e = emotions(t, emosi);
  const p: Pose = {...e, blink: blinking(t, seed)};
  const wajah = WAJAH[e.emo] ?? 'neutral';
  const {view, flip} = typeof sudut === 'number' ? spinView(sudut) : {view: sudut, flip: false};
  const sq = (p.sq ?? 0) + (ekstra.sq ?? 0);
  const dx = (p.dx ?? 0) + (ekstra.dx ?? 0);
  const dy = (p.dy ?? 0) + (ekstra.dy ?? 0);
  const rot = ((p.rot ?? 0) + (ekstra.rot ?? 0)) * 180 / Math.PI;
  const {sx, sy} = squashScale(sq, smear);
  const sc = ekstra.scale ?? 1;
  const boil = Math.floor(onTwos(t) * 12) % 5 + 1 + seed * 7;
  const floats = model !== 'claude';
  const lift = floats ? 1.2 : 0;
  const color = model === 'claude' ? '#EE6A4C' : '#5E71F6';
  const W = 22, H = 20;
  const body = (shadow: boolean) => model === 'claude'
    ? <ClawdBody id={id} v={CLAWD[view]} p={p} wajah={wajah} color={color} shadow={shadow} kamar={kamar} flip={flip}/>
    : <RoundBody id={id} model={model} view={view} p={p} wajah={wajah} shadow={shadow} kamar={kamar} flip={flip}/>;
  const clipShape = model === 'claude' ? <rect x={CLAWD[view].L} y={-8} width={CLAWD[view].R - CLAWD[view].L} height={6} rx={.16}/>
    : <path d={model === 'codex' ? FLOWER : STAR} transform={`translate(0 ${model === 'codex' ? -6.4 : -6.6}) scale(${ROUND[view].w} 1) translate(${-(model === 'codex' ? 9.4 : 10.4) / 2} ${-(model === 'codex' ? 9.4 : 10.4) / 2}) scale(${(model === 'codex' ? 9.4 : 10.4) / 100})`}/>;
  const rig = `translate(${dx} ${dy - lift}) rotate(${rot}) scale(${(flip ? -1 : 1) * sx * sc} ${sy * sc})`;
  const ground = Math.max(.35, 1 + dy / 6 - lift * .08);
  return <svg width={W * u} height={H * u} viewBox={`${-W / 2} ${-H + 3} ${W} ${H}`} data-karakter={model}
    style={{position: 'absolute', left: x - W * u / 2, top: y - (H - 3) * u, overflow: 'visible', pointerEvents: 'none'}}>
    <Kuas id={id} boil={boil} shadow={kamar}/>
    <defs>
      <clipPath id={`${id}-clip`}>{clipShape}</clipPath>
      <linearGradient id={`${id}-codex`} x1=".2" y1="0" x2=".7" y2="1"><stop stopColor="#9AAEFF"/><stop offset=".45" stopColor="#5E71F6"/><stop offset="1" stopColor="#3B47DF"/></linearGradient>
      <linearGradient id={`${id}-gemini`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1BA1E3"/><stop offset=".45" stopColor="#5684D1"/><stop offset="1" stopColor="#9168C0"/></linearGradient>
      {/* cahaya kamar: hangat dari kiri-atas (jendela), sisi kanan-bawah dingin seperti dinding */}
      <linearGradient id={`${id}-kamar`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#FFF1DC" stopOpacity=".16"/><stop offset=".5" stopColor="#FFFFFF" stopOpacity="0"/><stop offset="1" stopColor="#40525C" stopOpacity=".26"/>
      </linearGradient>
    </defs>
    {lantai && <ellipse cx={dx * .5} cy={.15} rx={(model === 'claude' ? 5.4 : 4.2) * ground} ry={.55 * ground} fill={INK} opacity={kamar ? .2 : .14} filter={`url(#${id}-lembut)`}/>}
    {kamar && <g transform={`translate(1.1 .7) ${rig}`} opacity=".34" filter={`url(#${id}-bayang)`}>{body(true)}</g>}
    <g transform={rig}>{body(false)}</g>
    <g transform={`translate(${dx + (flip ? -1 : 1) * (model === 'claude' ? 4.4 : 3.6)} ${dy - lift - (model === 'claude' ? 8.6 : 11)})`}>
      {emoteAktif(t, emote) ? <EmoteX kind={emoteAktif(t, emote)!.kind} a={emoteAktif(t, emote)!.a} lama={emoteAktif(t, emote)!.lama} skala={emoteAktif(t, emote)!.skala}/> : emote?.length ? null : <Emote wajah={wajah} k={e.emoteK} x={0} y={0}/>}
    </g>
  </svg>;
};
