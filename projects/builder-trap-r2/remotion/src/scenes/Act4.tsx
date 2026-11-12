// Babak 4 · Sadar & janji (B23–B26), Editor C (TASK r2c). PLAN.json + BRIEF.md; kiblat 55 (kembali terang, wajah paling
// bersih, janji konkret), kartu 63 (UI asli sebagai tokoh: Threads terang, kursor mengklik Post).
// Termasuk wipe linear gelap→terang B22→B23 (75,2–75,6) sebagai adegan over.
import React from 'react';
import { AbsoluteFill, Freeze, spring, useCurrentFrame } from 'remotion';
import { Stage, Layer, Place } from '../engine/Stage';
import { camPath } from '../engine/camera';
import { TextBlocks, tokIn } from '../engine/TextLayer';
import { wordOut } from '../engine/words';
import type { HBlock } from '../text/types';
import { Face } from '../engine/Face';
import { Paper } from '../engine/Surfaces';
import { Cursor } from '../engine/Cursor';
import { WipeLinear } from '../engine/Transitions';
import { Wall, WALL, wallPin, RepoCard, OpenBotWindow } from '../engine/Wall';
import { C, FONT, prog, lerp, clamp01 } from '../engine/theme';
import type { SceneEntry } from '../engine/scenes';
import { ThreadsWindow, ThComposer, ThPost, ThProfile } from '../ui/Threads';
import { ACT3 } from './Act3';
import {
  TEXT_ACT4, F_B23, F_B24, F_B24_FACE, F_B25, F_B25_CUT, F_B26, F_WIPE,
} from './Act4.text';

const txt = (...ids: string[]) => TEXT_ACT4.filter((b) => ids.includes(b.id));
const AVATAR = 'ui/avatar_siirfannih.jpg';

// ============================================================================================
// B23 · "Sampai akhirnya aku sadar." Wajah F4 paling bersih, ruang kosong kanan untuk K4; push 1 → 1,05.
// Crop digeser ke kanan sumber (cx 1182, skala 1,3) supaya wajah di sepertiga kiri dan dinding kanan lega.
// ============================================================================================
const FACE_RIGHT_SPACE = { s: 1.3, cx: 1182, cy: 565 };
const b23Cam = camPath([{ f: F_WIPE[0], zoom: 1 }, { f: F_B23[1], zoom: 1.05, ease: 'smooth' }], { sigma: 0 });
const B23: React.FC = () => (
  <Stage pose={b23Cam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F4" crop={FACE_RIGHT_SPACE} grade="bersih" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B23-K4')} />
    </Layer>
  </Stage>
);

// Wipe linear gelap → terang dari bawah (PLAN B22 keluar, B23 lulus_bila). B22 milik Editor B dipakai apa adanya;
// setelah beat B22 berakhir (f2262) frame terakhirnya ditahan di bawah wipe sampai tertutup (f2268).
// REVIEW r2c F-r2c-01: teks B22 (y ±250–334) tidak boleh tembus pita feather di atas wajah. Pita mencapai teks di
// ±f2262,2 dan menutupnya penuh di ±f2264, jadi frame tahan = f2262 (blok teks B22 sudah keluar, kamera sama)
// dan teks dari frame f2261 hanya ditumpuk di pita atas sambil memudar habis f2262→f2264.
const S_B22 = ACT3.find((s) => s.id === 'S-B22')?.Comp;
const TEXT_BAND = 'linear-gradient(to bottom, black 0px, black 380px, transparent 440px)';
const WipeB22B23: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, F_WIPE[0], F_WIPE[1], 'inOut');
  const textOp = 1 - prog(f, F_B23[0] - 1, F_B23[0] + 2, 'out');
  return (
    <AbsoluteFill>
      {f >= F_B23[0] && S_B22 ? (
        <>
          <Freeze frame={F_B23[0]}>
            <S_B22 />
          </Freeze>
          {textOp > 0.01 ? (
            <AbsoluteFill style={{ opacity: textOp, WebkitMaskImage: TEXT_BAND, maskImage: TEXT_BAND }}>
              <Freeze frame={F_B23[0] - 1}>
                <S_B22 />
              </Freeze>
            </AbsoluteFill>
          ) : null}
        </>
      ) : null}
      <WipeLinear progress={p} dir="up" feather={240}>
        <B23 />
      </WipeLinear>
    </AbsoluteFill>
  );
};

// ============================================================================================
// B24 · dinding bukti terang lagi. Kamera whip pan mundur (kanan-bawah → kiri-atas) dengan motion blur sementara
// benang tergulung mundur, melambat menyusuri cetakan baris pertama, lalu push ke cetakan pertama (repo Jadisatu,
// Nov 2025) yang dilingkari spidol "titik awal". Sisipan wajah F2 81,38–83,30. Kembali: "gak sekedar membangun."
// ============================================================================================
// panjang benang sampai pin ke-k (geometri sama dengan threadPath di engine/Wall.tsx), untuk menggulung benang
const bez = (pts: number[][], t: number) => {
  let p = pts;
  while (p.length > 1) p = p.slice(1).map((q, k) => [lerp(p[k][0], q[0], t), lerp(p[k][1], q[1], t)]);
  return p[0];
};
const segLen = (pts: number[][]) => {
  let L = 0, prev = pts[0];
  for (let k = 1; k <= 40; k++) { const q = bez(pts, k / 40); L += Math.hypot(q[0] - prev[0], q[1] - prev[1]); prev = q; }
  return L;
};
const CUM = (() => {
  const out = [0];
  for (let i = 1; i < WALL.length; i++) {
    const p = wallPin(i), q = wallPin(i - 1);
    const sameRow = Math.abs(p.y - q.y) < 200;
    let pts: number[][];
    if (sameRow) pts = [[q.x, q.y], [(p.x + q.x) / 2, Math.max(p.y, q.y) + 70], [p.x, p.y]];
    else {
      const side = p.x > 1500 ? 1 : -1;
      const ox = (side > 0 ? Math.max(p.x, q.x) : Math.min(p.x, q.x)) + side * 260;
      pts = [[q.x, q.y], [ox, q.y], [ox, p.y - 60], [p.x, p.y]];
    }
    out.push(out[i - 1] + segLen(pts));
  }
  return out.map((v) => v / out[out.length - 1]);
})();

const P0 = WALL[0];
const b24Cam = camPath([
  { f: F_B24[0], x: 2080, y: 1235, zoom: 1.0 },
  { f: F_B24[0] + 4, x: 2062, y: 1218, zoom: 0.98, ease: 'smooth' },
  { f: 2352, x: 1180, y: 420, zoom: 1.02, ease: 'inOut' }, // whip: ±1300 px dunia dalam 0,67 dtk
  { f: 2414, x: 760, y: 400, zoom: 1.08, ease: 'smooth' }, // menyusuri baris pertama
  { f: F_B24_FACE[0], x: 420, y: 290, zoom: 1.25, ease: 'inOut' }, // push ke cetakan pertama
]);
const b24bCam = camPath(
  [
    { f: F_B24_FACE[1], x: 420, y: 310, zoom: 1.24 },
    { f: F_B24[1], x: 425, y: 310, zoom: 1.18, ease: 'smooth' }, // mundur pelan memberi ruang "gak sekedar membangun."
  ],
  { sigma: 0 },
);

/** lingkaran spidol tangan di sekitar cetakan pertama: sedikit lebih dari satu putaran, jari-jari bergelombang */
const CIRCLE = (() => {
  const cx = P0.x - 6, cy = P0.y + 6, rx = 328, ry = 214;
  const pts: string[] = [];
  const n = 90;
  for (let k = 0; k <= n; k++) {
    const t = 2.5 + (k / n) * (Math.PI * 2 + 0.5); // mulai kiri atas, ujung tumpang di kiri atas
    const wob = 1 + 0.018 * Math.sin(t * 3 + 0.7) + 0.03 * (k / n);
    pts.push(`${(cx + rx * wob * Math.cos(t)).toFixed(1)} ${(cy + ry * wob * Math.sin(t)).toFixed(1)}`);
  }
  return 'M ' + pts.join(' L ');
})();
const CIRCLE_F: [number, number] = [2423, 2441]; // "titik awal" diucapkan 80,72–81,38

/**
 * Renderer lokal untuk blok H "titik awal" (data tetap di Act4.text.ts untuk pengecek kata). Sama dengan HView mesin,
 * tetapi kotak potong diberi ruang kanan/atas: ekor huruf "l" Caveat yang miring terpotong di HView (Q-C01).
 */
const HLabel: React.FC<{ b: HBlock }> = ({ b }) => {
  const f = useCurrentFrame();
  const a = tokIn(b.toks[0]);
  if (f < a - 2 || f >= b.until) return null;
  const z = Math.max(a + 10, wordOut(Math.max(...b.toks.flatMap((t) => t.i))));
  const p = prog(f, a, z, 'smooth');
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, transform: `rotate(${b.rot ?? -4}deg)`, transformOrigin: 'left center' }}>
      <div
        style={{
          fontFamily: FONT.caveat, fontWeight: 700, fontSize: b.size, lineHeight: 1, color: b.ink ?? C.accent, whiteSpace: 'nowrap',
          padding: '0.15em 0.2em 0.1em 0', margin: '-0.15em 0 0 0',
          clipPath: `inset(-10% ${(1 - p) * 100}% -10% -5%)`,
        }}
      >
        {b.toks.map((t) => t.t).join(' ')}
      </div>
    </div>
  );
};

const WallB24: React.FC<{ pose: typeof b24Cam }> = ({ pose }) => {
  const f = useCurrentFrame();
  // benang tergulung: penuh → pin cetakan ke-2 (selesai whip) → pin cetakan pertama
  const thread =
    f < 2352 ? lerp(1, CUM[2], prog(f, F_B24[0] + 2, 2352, 'inOut'))
      : lerp(CUM[2], 0, prog(f, 2352, 2418, 'smooth'));
  const circ = prog(f, CIRCLE_F[0], CIRCLE_F[1], 'smooth');
  const focus = [{ i: 0, k: prog(f, 2416, 2440, 'out') }];
  return (
    <Stage pose={pose} bg={C.linen}>
      <Layer z={0} name="L1-L2">
        <Wall mode="terang" thread={thread} focus={focus} />
      </Layer>
      <Layer z={30} name="L3">
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width={1} height={1}>
          <path d={CIRCLE} fill="none" stroke={C.accent} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round"
            pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - circ} opacity={circ > 0 ? 0.92 : 0} />
        </svg>
        <TextBlocks blocks={txt('B24-N1', 'B24-N3')} />
        <HLabel b={txt('B24-H')[0] as HBlock} />
      </Layer>
    </Stage>
  );
};
const B24a: React.FC = () => <WallB24 pose={b24Cam} />;
const B24c: React.FC = () => <WallB24 pose={b24bCam} />;

// sisipan wajah F2 (mulut + tangan) dengan "Dimana mungkin / aku harusnya" di dinding kanan atas
const b24FaceCam = camPath([{ f: F_B24_FACE[0], zoom: 1 }, { f: F_B24_FACE[1], zoom: 1.04, ease: 'smooth' }], { sigma: 0 });
const B24b: React.FC = () => (
  <Stage pose={b24FaceCam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F2" crop={{ s: 1.5, cx: 1060, cy: 700 }} grade="bersih" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B24-N2')} />
    </Layer>
  </Stage>
);

// ============================================================================================
// B25 · "Tapi juga nge-share" di wajah F3, lalu Threads terang: composer "New thread" dengan tiga cetakan dari
// dinding ditarik masuk sebagai lampiran, kursor MENGKLIK Post, tiga post terbit berurutan (spring dari bawah),
// tiap frasa menempel di kanan post-nya; kamera ikut kursor ke Post lalu turun mengikuti post.
// ============================================================================================
const b25FaceCam = camPath([{ f: F_B25[0], zoom: 1 }, { f: F_B25_CUT, zoom: 1.03, ease: 'smooth' }], { sigma: 0 });
const B25a: React.FC = () => (
  <Stage pose={b25FaceCam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F3" grade="bersih" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B25-N1')} />
    </Layer>
  </Stage>
);

// Tata letak dunia Threads (px dunia). Jendela lebar supaya ruang kanan kolom menampung frasa.
const TH_UI = 1.25;
const WIN = { x: 0, y: 40, w: 2300, h: 2400 };
const COL_W = 820;
const COL_X = WIN.x + 250 * TH_UI + (WIN.w - 250 * TH_UI - COL_W) / 2 - 250 * TH_UI * 0.25; // ±818
const MODAL = { x: WIN.x + WIN.w / 2 - (785 * TH_UI) / 2, y: 330 };
const MEDIA = { w: 700, h: 415 };
const POST_F = [2590, 2616, 2674]; // terbit: setelah klik · "Apa" 87,20 · "Apa" 89,14
const CLICK: [number, number] = [2584, 2590];
const POST_BTN = { x: 1548, y: 948 }; // pusat tombol Post di composer (dicek di still)

const Rounded: React.FC<{ w: number; h: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, children, style }) => (
  <div style={{ position: 'relative', width: w, height: h, borderRadius: 12, overflow: 'hidden', border: '1px solid #E5E5E5', background: '#F2F2F2', ...style }}>
    {children}
  </div>
);
/** konten berukuran asli (nw × nh) diskalakan pas ke kotak w × h */
const Fit: React.FC<{ w: number; h: number; nw: number; nh: number; children: React.ReactNode }> = ({ w, h, nw, nh, children }) => {
  const s = Math.max(w / nw, h / nh);
  return (
    <div style={{ position: 'absolute', left: (w - nw * s) / 2, top: (h - nh * s) / 2, width: nw, height: nh, transform: `scale(${s})`, transformOrigin: '0 0' }}>
      {children}
    </div>
  );
};
const PhotoIrfan: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <Face w={w} h={h} preset="F4" crop={{ s: 1.15, cx: 950, cy: 560 }} grade="bersih" />
);
const RepoShot: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <Fit w={w} h={h} nw={442} nh={Math.round((442 * h) / w)}>
    <RepoCard name="Jadisatu" vis="Public" date="2025-11-25" w={442} h={Math.round((442 * h) / w)} />
  </Fit>
);
const OpenBotShot: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <Fit w={w} h={h} nw={442} nh={Math.round((442 * h) / w)}>
    <OpenBotWindow w={442} h={Math.round((442 * h) / w)} />
  </Fit>
);
/** dinding benang mini (Wall terang utuh, diskalakan) */
const WallShot: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const s = Math.min(w / 2950, h / 1520);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.linen, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: (w - 2950 * s) / 2 - 100 * s, top: (h - 1520 * s) / 2 - 110 * s, width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: '0 0' }}>
        <Wall mode="terang" thread={1} />
      </div>
    </div>
  );
};

const ATT = { w: 268, h: 250, gap: 12 };
const ATTACH = [PhotoIrfan, RepoShot, OpenBotShot];

const b25Cam = camPath(
  [
    { f: F_B25_CUT, x: 1300, y: 680, zoom: 1.04 },
    { f: CLICK[1], x: 1360, y: 700, zoom: 1.08, ease: 'out' }, // ikut kursor ke Post
    { f: 2606, x: 1509, y: 740, zoom: 1.15, ease: 'inOut' }, // post 1 + frasa
    { f: 2614, x: 1509, y: 745, zoom: 1.15, ease: 'smooth' },
    { f: 2636, x: 1509, y: 1270, zoom: 1.15, ease: 'inOut' }, // turun ke post 2
    { f: 2670, x: 1509, y: 1278, zoom: 1.15, ease: 'smooth' },
    { f: 2694, x: 1509, y: 1800, zoom: 1.15, ease: 'inOut' }, // turun ke post 3
    { f: F_B25[1], x: 1509, y: 1795, zoom: 1.17, ease: 'smooth' },
  ],
  { sigma: 3 },
);

const B25b: React.FC = () => {
  const f = useCurrentFrame();
  const close = prog(f, CLICK[1], CLICK[1] + 8, 'in'); // modal menutup setelah klik
  const scrim = 1 - prog(f, CLICK[1], CLICK[1] + 10, 'out');
  const press = clamp01((f - CLICK[0]) / (CLICK[1] - CLICK[0]));
  const hover = prog(f, CLICK[0] - 5, CLICK[0], 'out');
  // kursor: dari lampiran ke tombol Post
  const cp = prog(f, F_B25_CUT - 4, CLICK[0] - 1, 'inOut');
  const cur = { x: lerp(1180, POST_BTN.x - 8, cp), y: lerp(860, POST_BTN.y - 6, cp) };
  const curOp = 1 - prog(f, CLICK[1] + 4, CLICK[1] + 10, 'out');
  const appear = (k: number) => (f < POST_F[k] ? 0 : spring({ frame: f - POST_F[k], fps: 30, config: { damping: 13, stiffness: 140, mass: 0.9 } }));
  const medias: React.ReactNode[] = [
    <Rounded key="m1" w={MEDIA.w} h={MEDIA.h}><PhotoIrfan w={MEDIA.w} h={MEDIA.h} /></Rounded>,
    <div key="m2" style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[['Jadisatu', 'Public', '2025-11-25'], ['jadisatu.cloud', 'Public', '2026-06-17']].map(([n, v, d]) => (
          <Rounded key={n} w={(MEDIA.w - 12) / 2} h={(MEDIA.h - 12) / 2}>
            <Fit w={(MEDIA.w - 12) / 2} h={(MEDIA.h - 12) / 2} nw={442} nh={258}><RepoCard name={n} vis={v} date={d} w={442} h={258} /></Fit>
          </Rounded>
        ))}
      </div>
      <Rounded w={(MEDIA.w - 12) / 2} h={MEDIA.h} style={{ background: '#161618' }}><OpenBotShot w={(MEDIA.w - 12) / 2} h={MEDIA.h} /></Rounded>
    </div>,
    <Rounded key="m3" w={MEDIA.w} h={MEDIA.h}><WallShot w={MEDIA.w} h={MEDIA.h} /></Rounded>,
  ];
  const posts = (
    <div>
      {medias.map((m, k) => (
        <ThPost key={k} mode="light" ui={TH_UI} w={COL_W} user="siirfannih" avatar={AVATAR} media={m} appear={appear(k)} />
      ))}
    </div>
  );
  const attachments = (
    <div style={{ display: 'flex', gap: ATT.gap }}>
      {ATTACH.map((A, k) => {
        const s = spring({ frame: f - (F_B25_CUT - 6 + k * 3), fps: 30, config: { damping: 15, stiffness: 160 } });
        return (
          <div key={k} style={{ transform: `translate(${(1 - s) * (-520 - k * 120)}px, ${(1 - s) * 160}px) rotate(${(1 - s) * (-10 + k * 3)}deg)`, opacity: clamp01(s * 2) }}>
            <Rounded w={ATT.w} h={ATT.h} style={{ background: k === 2 ? '#161618' : '#F2F2F2', boxShadow: s < 0.98 ? '0 18px 30px rgba(0,0,0,0.18)' : undefined }}>
              <A w={ATT.w} h={ATT.h} />
            </Rounded>
          </div>
        );
      })}
    </div>
  );
  return (
    <Stage pose={b25Cam} bg={C.paper}>
      <Layer z={-300} name="L1">
        <Paper scale={4} />
      </Layer>
      <Layer z={0} name="L2">
        <div style={{ position: 'absolute', left: WIN.x, top: WIN.y }}>
          <ThreadsWindow
            mode="light" ui={TH_UI} w={WIN.w} h={WIN.h} colW={COL_W} header="Profile" active="profile"
            overlay={scrim > 0 ? <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${0.36 * scrim})` }} /> : null}
          >
            <ThProfile mode="light" ui={TH_UI} w={COL_W} name="I Gede Irfan" handle="siirfannih" avatar={AVATAR} posts={posts} />
          </ThreadsWindow>
        </div>
        {close < 1 ? (
          <Place x={MODAL.x} y={MODAL.y} scale={1 - 0.05 * close} origin="50% 40%" style={{ opacity: 1 - close }}>
            <ThComposer mode="light" ui={TH_UI} user="siirfannih" avatar={AVATAR} attachments={attachments} postPress={press} postHover={hover} />
          </Place>
        ) : null}
        {curOp > 0 ? <Cursor x={cur.x} y={cur.y} size={66} click={press} opacity={curOp} /> : null}
      </Layer>
      <Layer z={30} name="L3">
        <TextBlocks blocks={txt('B25-P1', 'B25-P2', 'B25-P3')} />
      </Layer>
    </Stage>
  );
};

// ============================================================================================
// B26 · penutup: wajah F4 hangat, "share." lalu "ngebagiin apa yang / belum sempurna." di tempat yang sama;
// push terus sampai frame terakhir (2848), tanpa fade ke hitam.
// ============================================================================================
const b26Cam = camPath([{ f: F_B26[0], zoom: 1 }, { f: F_B26[1] - 1, zoom: 1.06, ease: 'linear' }], { sigma: 0 });
const B26: React.FC = () => (
  <Stage pose={b26Cam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F4" crop={FACE_RIGHT_SPACE} grade="bersih" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B26-K4a', 'B26-K4b')} />
    </Layer>
  </Stage>
);

export const ACT4: SceneEntry[] = [
  { id: 'S-B23', beats: 'B23', from: F_B23[0], to: F_B23[1], Comp: B23 },
  { id: 'S-B24a', beats: 'B24', from: F_B24[0], to: F_B24_FACE[0], Comp: B24a },
  { id: 'S-B24b', beats: 'B24', from: F_B24_FACE[0], to: F_B24_FACE[1], Comp: B24b },
  { id: 'S-B24c', beats: 'B24', from: F_B24_FACE[1], to: F_B24[1], Comp: B24c },
  { id: 'S-B25a', beats: 'B25', from: F_B25[0], to: F_B25_CUT, Comp: B25a },
  { id: 'S-B25b', beats: 'B25', from: F_B25_CUT, to: F_B25[1], Comp: B25b },
  { id: 'S-B26', beats: 'B26', from: F_B26[0], to: F_B26[1], Comp: B26 },
  // wipe linear gelap→terang dari bawah di atas B22/B23 (75,2–75,6)
  { id: 'X-wipe-22-23', beats: 'B22→B23', from: F_WIPE[0], to: F_WIPE[1], Comp: WipeB22B23, over: true },
];
