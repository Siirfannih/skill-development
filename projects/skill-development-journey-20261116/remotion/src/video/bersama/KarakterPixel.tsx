// KarakterPixel — Codex (awan `>_`) dan Gemini (bintang empat sudut) sebagai pixel/blok datar, SEKELUARGA dengan Claude crab (REVISI-2 R2-1).
// Aturan keluarga: grid sel 1u (sama dengan kotak badan/kaki/mata Claude), tepi lurus bertangga, tingkat warna datar (tanpa gradien halus),
// mata kotak gelap 1x2 sel, TANPA mulut lengkung (ekspresi lewat mata/pose/emote seperti Claude). Pose, kedip, take, smear, lompat memakai gerak.ts yang sama.
// Props = Karakter2DProps; Claude tetap digambar Karakter2D (papan/karakter2d, tidak diubah).
import React from 'react';
import {blinking, emotions, onTwos, spinView, squashScale, type View} from '../../papan/karakter2d/gerak';
import {Karakter2D, type Karakter2DProps, WAJAH, type Wajah} from '../../papan/karakter2d/Karakter2D';

const INK = '#241913';
type Pose = ReturnType<typeof emotions> & {blink: boolean};
type Peta = {grid: string[]; ton: (x: number, y: number, n: number, m: number) => number; warna: string[]; mata: [number, number][]; mataGap: number; mataY: number};

// awan Codex 11x8 (+ dua kaki 1x1,5), bintang Gemini 11x11
const AWAN = ['..XXX.XXX..', '.XXXXXXXXX.', 'XXXXXXXXXXX', 'XXXXXXXXXXX', 'XXXXXXXXXXX', 'XXXXXXXXXXX', '.XXXXXXXXX.', '..XXXXXXX..'];
const BINTANG = ['......X......', '.....XXX.....', '.....XXX.....', '....XXXXX....', '..XXXXXXXXX..', '..XXXXXXXXX..', 'XXXXXXXXXXXXX', '..XXXXXXXXX..', '..XXXXXXXXX..', '....XXXXX....', '.....XXX.....', '.....XXX.....', '......X......'];
const PETA: Record<'codex' | 'gemini', Peta> = {
  // biru brand #3E6BFF -> #8FB2FF, tiga tingkat datar (terang kiri-atas, gelap kanan-bawah)
  codex: {grid: AWAN, warna: ['#8FB2FF', '#6A92FF', '#3E6BFF'], ton: (x, y) => { const k = x / 11 * 0.45 + y / 8 * 0.55; return k < 0.3 ? 0 : k < 0.62 ? 1 : 2; }, mata: [[3, 2], [7, 2]], mataGap: 2, mataY: 2},
  // biru #4285F4 -> ungu #9B72CB, tiga tingkat datar
  gemini: {grid: BINTANG, warna: ['#4285F4', '#6F7FDD', '#9B72CB'], ton: (x, y) => { const k = (x + y) / 24; return k < 0.4 ? 0 : k < 0.62 ? 1 : 2; }, mata: [[4, 5], [8, 5]], mataGap: 2, mataY: 5},
};
const VIEWS_PX: Record<View, {w: number; strip: number; face: {cx: number; fw: number; sides: number[]} | null}> = {
  front: {w: 1, strip: 0, face: {cx: 0, fw: 1, sides: [-1, 1]}}, q: {w: .86, strip: -1, face: {cx: 1.3, fw: .74, sides: [-1, 1]}},
  side: {w: .5, strip: 0, face: {cx: 1.7, fw: .5, sides: [1]}}, qback: {w: .86, strip: 1, face: null}, back: {w: 1, strip: 0, face: null},
};

const Tepi: React.FC<{id: string; boil: number}> = ({id, boil}) => <defs>
  <filter id={`${id}-tepi`} x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed={boil} result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale=".1" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id={`${id}-lembut`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation=".45"/></filter>
  <filter id={`${id}-bayang`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation=".55"/></filter>
</defs>;

/** garis tepi bertangga: sisi sel terisi yang bertetangga dengan sel kosong */
const tepiD = (grid: string[]) => {
  const on = (x: number, y: number) => y >= 0 && y < grid.length && x >= 0 && x < grid[y].length && grid[y][x] === 'X';
  let d = '';
  grid.forEach((row, y) => [...row].forEach((c, x) => {
    if (c !== 'X') return;
    if (!on(x, y - 1)) d += `M${x} ${y}h1`;
    if (!on(x, y + 1)) d += `M${x} ${y + 1}h1`;
    if (!on(x - 1, y)) d += `M${x} ${y}v1`;
    if (!on(x + 1, y)) d += `M${x + 1} ${y}v1`;
  }));
  return d;
};

const Mata: React.FC<{cx: number; fw: number; sides: number[]; y: number; gap: number; p: Pose; wajah: Wajah}> = ({cx, fw, sides, y, gap, p, wajah}) => {
  const lx = .5 * (p.lookX ?? 0), ly = .4 * (p.lookY ?? 0);
  return <>{sides.map((s) => {
    const ex = cx + s * gap * fw + lx;
    if (wajah === 'happy' && p.squint < .5) {      // ^ pixel: tiga sel
      const w = Math.max(.5, fw);
      return <g key={s} fill={INK}>{[[-1, 1], [0, 0], [1, 1]].map(([i, j], n) => <rect key={n} x={ex + i * w - .5 * w} y={y + .5 + j - .5 + ly} width={w} height={1}/>)}</g>;
    }
    const tinggi = (wajah === 'surprised' ? 3 : 2) * (p.blink ? .14 : 1 - .8 * p.squint);
    return <rect key={s} x={ex - .5 * fw} y={y + ly + (wajah === 'surprised' ? -.5 : 0) + (2 - tinggi) / 2} width={fw} height={tinggi} fill={INK}/>;
  })}</>;
};

const Emote: React.FC<{wajah: Wajah; k: number}> = ({wajah, k}) => {
  if (k <= .01) return null;
  const pop = .6 + .4 * Math.min(1, k * 1.4);
  if (wajah === 'surprised') return <g transform={`scale(${pop})`} opacity={k}><rect x="-.3" y="-2.6" width=".6" height="1.7" fill="#F5C443" stroke={INK} strokeWidth=".16"/><rect x="-.3" y="-.55" width=".6" height=".6" fill="#F5C443" stroke={INK} strokeWidth=".16"/></g>;
  if (wajah === 'thinking') return <g transform={`scale(${pop})`} opacity={k}>{[0, 1, 2].map((i) => <rect key={i} x={i * .8 - 1.1} y="-.9" width=".55" height=".55" fill={INK}/>)}</g>;
  if (wajah === 'happy') return <g transform={`scale(${pop})`} opacity={k}><path d="M0 -2.1H.6V-1.5H1.2V-.9H.6V-.3H0V-.9H-.6V-1.5H0Z" fill="#FFF3C4" stroke={INK} strokeWidth=".13"/></g>;
  return null;
};

const Badan: React.FC<{id: string; model: 'codex' | 'gemini'; view: View; p: Pose; wajah: Wajah; shadow: boolean; flip: boolean}> = ({id, model, view, p, wajah, shadow, flip}) => {
  const m = PETA[model], v = VIEWS_PX[view];
  const n = m.grid[0].length, h = m.grid.length;
  const kaki = model === 'codex' ? 1.5 : 0;
  const y0 = -(h + kaki), x0 = -n / 2;
  const fill = (x: number, y: number) => shadow ? '#000' : m.warna[m.ton(x, y, n, h)];
  const sel: React.ReactNode[] = [];
  m.grid.forEach((row, y) => [...row].forEach((c, x) => c === 'X' && sel.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill(x, y)}/>)));
  const fw = v.face?.fw ?? 1;
  const lengan = model === 'codex' && view !== 'side' ? [-1, 1].map((s) => {
    const raise = (s < 0 ? p.aL : p.aR) ?? .2;
    return <g key={s} transform={`translate(${s * (n / 2 * v.w + .05)} ${h * .55}) rotate(${-s * raise * 40})`}>
      <rect x={s < 0 ? -1.4 : 0} y={-.5} width={1.4} height={1} fill={shadow ? '#000' : m.warna[1]} stroke={shadow ? 'none' : INK} strokeWidth=".22"/></g>;
  }) : null;
  const kakiEl = kaki ? [3, 7].map((cx) => <rect key={cx} x={(cx - n / 2 + .1) * v.w} y={h - .1} width={Math.max(.5, v.w)} height={kaki + .1} fill={shadow ? '#000' : m.warna[2]} stroke={shadow ? 'none' : INK} strokeWidth=".22"/>) : null;
  return <g filter={shadow ? undefined : `url(#${id}-tepi)`} transform={`translate(0 ${y0})`}>
    {lengan}{kakiEl}
    <g transform={`scale(${v.w} 1) translate(${x0} 0)`}>
      {sel}
      {!shadow && v.strip !== 0 && m.grid.map((row, y) => [...row].map((c, x) => c === 'X' && (v.strip < 0 ? x < 3 : x > n - 4)
        ? <rect key={`s${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill="#0B1240" opacity=".2"/> : null))}
      {!shadow && view === 'back' && <rect x={0} y={0} width={n} height={h} fill="#0B1240" opacity={0} />}
      <path d={tepiD(m.grid)} fill="none" stroke={shadow ? 'none' : INK} strokeWidth=".26" strokeLinecap="square"/>
    </g>
    {!shadow && v.face && <g transform={`translate(${v.face.cx} 0)`}>
      <Mata cx={0} fw={fw} sides={v.face.sides} y={m.mataY} gap={m.mataGap} p={p} wajah={wajah}/>
      {model === 'codex' && <g transform={`translate(0 4.5) scale(${(flip ? -1 : 1) * fw} 1)`} fill="#FFFFFF">
        {/* `>_` pixel putih, grid setengah sel: chevron 2x2,5 + garis bawah 1,5x0,5 */}
        {[[0, 0], [.5, .5], [1, 1], [.5, 1.5], [0, 2]].map(([x, y], i) => <rect key={i} x={-2 + x} y={y} width={1} height={.5}/>)}
        <rect x={.5} y={2} width={1.5} height={.5}/>
      </g>}
    </g>}
  </g>;
};

export const KarakterPixel: React.FC<Karakter2DProps & {model: 'codex' | 'gemini'}> = ({model, id, x, y, u, t, sudut = 'front', smear = 0, emosi = [[0, 'neutral']], ekstra = {}, seed = 0, kamar = false, lantai = true}) => {
  const e = emotions(t, emosi);
  const p: Pose = {...e, blink: blinking(t, seed)};
  const wajah = WAJAH[e.emo] ?? 'neutral';
  const {view, flip} = typeof sudut === 'number' ? spinView(sudut) : {view: sudut, flip: false};
  const sq = (p.sq ?? 0) + (ekstra.sq ?? 0), dx = (p.dx ?? 0) + (ekstra.dx ?? 0), dy = (p.dy ?? 0) + (ekstra.dy ?? 0);
  const rot = ((p.rot ?? 0) + (ekstra.rot ?? 0)) * 180 / Math.PI;
  const {sx, sy} = squashScale(sq, smear);
  const sc = ekstra.scale ?? 1;
  const boil = Math.floor(onTwos(t) * 12) % 5 + 1 + seed * 7;
  const lift = model === 'gemini' ? 1.4 : 0;
  const W = 22, H = 20;
  const rig = `translate(${dx} ${dy - lift}) rotate(${rot}) scale(${(flip ? -1 : 1) * sx * sc} ${sy * sc})`;
  const ground = Math.max(.35, 1 + dy / 6 - lift * .08);
  const tinggi = model === 'codex' ? 9.5 : 13;
  return <svg width={W * u} height={H * u} viewBox={`${-W / 2} ${-H + 3} ${W} ${H}`} data-karakter={model}
    style={{position: 'absolute', left: x - W * u / 2, top: y - (H - 3) * u, overflow: 'visible', pointerEvents: 'none'}}>
    <Tepi id={id} boil={boil}/>
    {lantai && <ellipse cx={dx * .5} cy={.15} rx={(model === 'codex' ? 5 : 4) * ground} ry={.55 * ground} fill={INK} opacity={kamar ? .2 : .14} filter={`url(#${id}-lembut)`}/>}
    {kamar && <g transform={`translate(1.1 .7) ${rig}`} opacity=".34" filter={`url(#${id}-bayang)`}><Badan id={id} model={model} view={view} p={p} wajah={wajah} shadow flip={flip}/></g>}
    <g transform={rig}><Badan id={id} model={model} view={view} p={p} wajah={wajah} shadow={false} flip={flip}/></g>
    <g transform={`translate(${dx + (flip ? -1 : 1) * 3.8} ${dy - lift - tinggi - .6})`}><Emote wajah={wajah} k={e.emoteK}/></g>
  </svg>;
};

/** Pintu tunggal: Claude -> Karakter2D (tidak diubah), Codex/Gemini -> pixel sekeluarga */
export const KarakterX: React.FC<Karakter2DProps> = (p) => p.model === 'claude' ? <Karakter2D {...p}/> : <KarakterPixel {...p} model={p.model}/>;
