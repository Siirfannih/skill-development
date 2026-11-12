// Dinding bukti (B14 terang, B15 gelap, B24 terang digulung mundur). Cetakan berurutan waktu dihubungkan
// benang biru dari pin ke pin. Koordinat dunia; pakai di dalam <Layer z={0}> pada <Stage>.
//
//   <Wall mode="terang" thread={0..1} focus={[i]} faceGrade="terang" />
//   WALL[i]          posisi & ukuran cetakan ke-i (x,y = pusat)   -> kamera menuju cetakan ke-n
//   wallPin(i)       titik pin cetakan ke-i
//   WALL_BOUNDS      kotak seluruh dinding (untuk framing "seluruh dinding")
//   WALL_DATES       tanggal per cetakan (repo: pushed_at dari assets/repos.json)
import React from 'react';
import { Img, staticFile } from 'remotion';
import { C, FONT, rand, lerp } from './theme';
import { Print, Pin } from './Print';
import { Face } from './Face';
import { Logo } from './Logo';
import { ChatGPTUI } from '../ui/ChatGPT';
import { Linen, DarkWall } from './Surfaces';
import { Star, BookMarked } from 'lucide-react';

type Kind = 'repo' | 'chatgpt' | 'openbot' | 'face';
export type WallPrint = { id: string; kind: Kind; x: number; y: number; w: number; h: number; rot: number; name?: string; vis?: 'Public' | 'Private'; date?: string };

const CW = 470, CH = 290; // ukuran cetakan kartu
const COLS = [400, 1000, 1600, 2200, 2800];
const ROWS = [330, 850, 1370];
// 3 baris berkelok (baris 1 kiri→kanan, baris 2 kanan→kiri, baris 3 kiri→kanan) = urutan waktu
const SLOTS: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
  [4, 1], [3, 1], [2, 1], [1, 1], [0, 1],
  [0, 2], [1, 2], [2, 2],
];
const ITEMS: Omit<WallPrint, 'x' | 'y' | 'w' | 'h' | 'rot'>[] = [
  { id: 'Jadisatu', kind: 'repo', name: 'Jadisatu', vis: 'Public', date: '2025-11-25' },
  { id: 'chatgpt-dot', kind: 'chatgpt' },
  { id: 'JadisatuOS-Internal', kind: 'repo', name: 'JadisatuOS-Internal', vis: 'Private', date: '2026-02-19' },
  { id: 'jadisatu-narrative-engine', kind: 'repo', name: 'jadisatu-narrative-engine', vis: 'Private', date: '2026-03-10' },
  { id: 'openclaw', kind: 'repo', name: 'openclaw', vis: 'Public', date: '2026-03-21' },
  { id: 'agent-hq', kind: 'repo', name: 'agent-hq', vis: 'Private', date: '2026-04-10' },
  { id: 'OtonomAgent', kind: 'repo', name: 'OtonomAgent', vis: 'Private', date: '2026-04-11' },
  { id: 'openbot', kind: 'openbot' },
  { id: 'jadisatu.cloud', kind: 'repo', name: 'jadisatu.cloud', vis: 'Public', date: '2026-06-17' },
  { id: 'Pandu', kind: 'repo', name: 'Pandu', vis: 'Private', date: '2026-10-12' },
  { id: 'Dashboard-OS-forAgent', kind: 'repo', name: 'Dashboard-OS-forAgent', vis: 'Public', date: '2026-10-13' },
  { id: 'jadisatu-canvas', kind: 'repo', name: 'jadisatu-canvas', vis: 'Private', date: '2026-11-04' },
  { id: 'skill-development', kind: 'repo', name: 'skill-development', vis: 'Public', date: '2026-11-11' },
];

export const WALL: WallPrint[] = [
  ...ITEMS.map((it, i) => {
    const [c, r] = SLOTS[i];
    return { ...it, x: COLS[c] + (rand(i + 11) - 0.5) * 40, y: ROWS[r] + (rand(i + 29) - 0.5) * 36, w: CW, h: CH, rot: (rand(i + 5) - 0.5) * 4 };
  }),
  // foto Irfan di ujung benang
  { id: 'irfan', kind: 'face', x: 2200, y: 1300, w: 420, h: 540, rot: 1.5 },
];
export const wallPin = (i: number) => ({ x: WALL[i].x, y: WALL[i].y - WALL[i].h / 2 + 9 });
export const WALL_BOUNDS = { x0: 150, y0: 170, x1: 3000, y1: 1590, cx: 1580, cy: 880 };

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ghDate = (d: string) => { const [y, m, dd] = d.split('-').map(Number); return `${MON[m - 1]} ${dd}, ${y}`; };

/** Item daftar repositori GitHub (tab Repositories profil) — terang. */
export const RepoCard: React.FC<{ name: string; vis: string; date: string; w: number; h: number }> = ({ name, vis, date, w, h }) => (
  <div style={{ position: 'absolute', inset: 0, width: w, height: h, background: '#FFFFFF', fontFamily: FONT.inter, color: '#1F2328' }}>
    <div style={{ height: 50, background: '#F6F8FA', borderBottom: '1px solid #D1D9E0', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px' }}>
      <Logo name="github" size={26} color="#1F2328" />
      <span style={{ fontSize: 16, fontWeight: 600 }}>Siirfannih</span>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, borderBottom: '2px solid #FD8C73', height: 50 }}>
        <BookMarked size={16} strokeWidth={1.8} color="#59636E" /> Repositories
      </div>
    </div>
    <div style={{ padding: '26px 22px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: name.length > 20 ? 26 : 30, fontWeight: 600, color: '#0969DA', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{name}</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#59636E', border: '1px solid #D1D9E0', borderRadius: 12, padding: '1px 8px' }}>{vis}</span>
      </div>
      <div style={{ position: 'absolute', right: 20, top: 74, display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, border: '1px solid #D1D9E0', borderRadius: 6, padding: '4px 10px', background: '#F6F8FA' }}>
        <Star size={15} strokeWidth={1.8} color="#59636E" /> Star
      </div>
      <div style={{ marginTop: 40, fontSize: 16, color: '#59636E' }}>Updated on {ghDate(date)}</div>
    </div>
  </div>
);

const AGENTS = [
  { body: 'fred', role: 'Developer' },
  { body: 'cloe', role: 'Creative Pro' },
  { body: 'malu', role: 'Sales Ops' },
  { body: 'nexo', role: 'Content Research' },
];
/** Agent OpenBot asli: badan bulu + dua mata pil. */
export const Agent: React.FC<{ body: string; size: number }> = ({ body, size }) => (
  <div style={{ position: 'relative', width: size, height: size }}>
    <Img src={staticFile(`agents/${body}-corps.webp`)} style={{ position: 'absolute', inset: 0, width: size, height: size }} />
    <Img src={staticFile('agents/eye-left.png')} style={{ position: 'absolute', left: size * 0.37, top: size * 0.36, width: size * 0.1, height: size * 0.15 }} />
    <Img src={staticFile('agents/eye-right.png')} style={{ position: 'absolute', left: size * 0.53, top: size * 0.36, width: size * 0.1, height: size * 0.15 }} />
  </div>
);
/** Jendela app OpenBot (macOS gelap) dengan agent dan nama perannya. */
export const OpenBotWindow: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <div style={{ position: 'absolute', inset: 0, width: w, height: h, background: '#161618', fontFamily: FONT.inter, color: '#EDEDED' }}>
    <div style={{ height: 30, background: '#26262A', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 7, position: 'relative' }}>
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: 6, background: c }} />)}
      <div style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#BDBDBD' }}>OpenBot</div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '22px 10px 0' }}>
      {AGENTS.map((a) => (
        <div key={a.role} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: (w - 20) / 4 }}>
          <Agent body={a.body} size={Math.min(130, (w - 20) / 4)} />
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>{a.role}</div>
        </div>
      ))}
    </div>
  </div>
);

/** Isi cetakan ke-i (tanpa bingkai). */
const Content: React.FC<{ p: WallPrint; w: number; h: number; faceGrade: 'terang' | 'gelap' | 'bersih' }> = ({ p, w, h, faceGrade }) => {
  if (p.kind === 'repo') return <RepoCard name={p.name!} vis={p.vis!} date={p.date!} w={w} h={h} />;
  if (p.kind === 'openbot') return <OpenBotWindow w={w} h={h} />;
  if (p.kind === 'chatgpt')
    return (
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 1000, transform: 'scale(0.95)', transformOrigin: '0 0' }}>
        {/* potongan kiri atas: sidebar dengan "Dot" di bawah "New chat" */}
        <ChatGPTUI history={9} extra={['Dot']} activeExtra={0} headerLogo={1} />
      </div>
    );
  return <Face w={w} h={h} preset="F4" crop={{ s: 1.1, cx: 980, cy: 600 }} grade={faceGrade} />;
};

/** Jalur benang antar-pin: lengkung melendut; peralihan baris lewat sisi luar dinding. */
export function threadPath(n = WALL.length) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const p = wallPin(i);
    if (i === 0) { d += `M ${p.x} ${p.y}`; continue; }
    const q = wallPin(i - 1);
    const sameRow = Math.abs(p.y - q.y) < 200;
    if (sameRow) d += ` Q ${(p.x + q.x) / 2} ${Math.max(p.y, q.y) + 70} ${p.x} ${p.y}`;
    else {
      const side = p.x > 1500 ? 1 : -1; // keluar ke sisi luar
      const ox = (side > 0 ? Math.max(p.x, q.x) : Math.min(p.x, q.x)) + side * 260;
      d += ` C ${ox} ${q.y} ${ox} ${p.y - 60} ${p.x} ${p.y}`;
    }
  }
  return d;
}

export const Wall: React.FC<{
  mode?: 'terang' | 'gelap';
  /** 0..1 panjang benang tergambar (1 = penuh) */
  thread?: number;
  /** indeks cetakan yang sedang disorot (sedikit terangkat) beserta kekuatannya */
  focus?: { i: number; k: number }[];
  faceGrade?: 'terang' | 'gelap' | 'bersih';
  /** latar ikut digambar (false bila adegan memakai latar sendiri) */
  background?: boolean;
}> = ({ mode = 'terang', thread = 1, focus = [], faceGrade, background = true }) => {
  const dark = mode === 'gelap';
  const tc = dark ? C.accentDark : C.accent;
  return (
    <>
      {background ? (dark ? <DarkWall scale={5} /> : <Linen scale={5} />) : null}
      {WALL.map((p, i) => {
        const fk = focus.find((x) => x.i === i)?.k ?? 0;
        return (
          <Print
            key={p.id} x={p.x - p.w / 2} y={p.y - p.h / 2} w={p.w} h={p.h} rot={p.rot} border={14} pin={false}
            style={{
              transform: `rotate(${p.rot}deg) scale(${1 + 0.035 * fk})`,
              filter: dark ? 'grayscale(1) brightness(0.36) contrast(1.1)' : undefined,
              zIndex: fk > 0 ? 2 : 1,
            }}
          >
            <Content p={p} w={p.w - 28} h={p.h - 28} faceGrade={faceGrade ?? (dark ? 'gelap' : 'terang')} />
          </Print>
        );
      })}
      <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', zIndex: 3 }} width={1} height={1}>
        <path d={threadPath()} fill="none" stroke="rgba(20,20,30,0.25)" strokeWidth={6} transform="translate(3 5)"
          pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - thread} strokeLinecap="round" />
        <path d={threadPath()} fill="none" stroke={tc} strokeWidth={4.5}
          pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - thread} strokeLinecap="round" />
      </svg>
      {WALL.map((p, i) => {
        const pin = wallPin(i);
        return (
          <div key={p.id} style={{ position: 'absolute', left: 0, top: 0, zIndex: 4, filter: dark ? 'grayscale(1) brightness(0.6)' : undefined }}>
            <Pin x={pin.x} y={pin.y} size={30} />
          </div>
        );
      })}
    </>
  );
};

/** fokus yang memudar naik-turun di sekitar frame tertentu (untuk sorotan saat kamera lewat) */
export const pulse = (f: number, at: number, len = 40) => Math.max(0, 1 - Math.abs(f - at) / len);
export { lerp };
