// Babak 1 · Tesis (B01–B05). PLAN.json + BRIEF.md; kiblat 55 k1/k2/k3/k4.
import React from 'react';
import { OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Stage, Layer } from '../engine/Stage';
import { camPath, Pose, REST } from '../engine/camera';
import { TextBlocks } from '../engine/TextLayer';
import { Face } from '../engine/Face';
import { Paper } from '../engine/Surfaces';
import { Cursor } from '../engine/Cursor';
import { PixelMosaic } from '../engine/Transitions';
import { C, prog, lerp, W, EASE } from '../engine/theme';
import type { SceneEntry } from '../engine/scenes';
import { TEXT_ACT1, F_ARCH, F_B04, F_B05 } from './Act1.text';

const txt = (...beats: string[]) => TEXT_ACT1.filter((b) => beats.includes(b.beat));

// ---------- B01–B03: arsip berbingkai putih + triad K3 ----------
// Cut di suku kata (detik ucapan): orang 0,74 · membangun 1,26 · (B02) 1,88 · orang 2,34 · membuat 2,86 · (B03) 3,38 · tuh 4,24
// fit: s = skala isi, ox/oy = geser (% isi) supaya wajah tokoh di atas label teks.
type Clip = { src: string; from: number; to: number; s?: number; ox?: number; oy?: number; origin?: string };
const CLIPS: Clip[] = [
  { src: 'jensen_a', from: 0, to: 22, s: 1.36, origin: '100% 46%' }, // nama lower third terpotong supaya tidak setengah tertutup label
  { src: 'replit_a', from: 22, to: 38, s: 1.2, ox: -4, oy: -8 },
  { src: 'karpathy', from: 38, to: 56, s: 1.3, oy: 2 },
  { src: 'teen', from: 56, to: 70, s: 1.12, oy: -5 },
  { src: 'suarez', from: 70, to: 86, s: 1.15, oy: -6 },
  { src: 'replit_ui', from: 86, to: 101, s: 1.5, origin: '72% 28%' },
  { src: 'dohmke', from: 101, to: 127, s: 1.12, oy: -5 },
  { src: 'jensen_b', from: 127, to: 164, s: 1.14, oy: -6 },
];

/** geser dijepit supaya tidak membuka tepi hitam: |o| <= (s-1)/(2s) */
const fit = (s = 1, o = 0) => Math.max(-((s - 1) / (2 * s)) * 100, Math.min(((s - 1) / (2 * s)) * 100, o));

// Kamera: push pelan 1 → 1,05 yang berpusat di jangkar kiri label K3, sehingga kepala kalimat diam di layar
// (PLAN B02: ≤ 2 px) sementara dunia (kertas + bingkai) tetap terdorong (Lantai B10). Lalu zoom-through 5,17–5,47.
const ANCHOR = { x: 220, y: 622 };
const BY = 535; // pusat y bingkai
const archCam = (f: number): Pose => {
  const z = lerp(1, 1.05, EASE.smooth(Math.min(1, Math.max(0, f / 155))));
  const hold: Pose = { ...REST, zoom: z, x: ANCHOR.x - (ANCHOR.x - 960) / z, y: ANCHOR.y - (ANCHOR.y - 540) / z };
  if (f <= 155) return hold;
  const t = EASE.in(Math.min(1, (f - 155) / 9));
  return { ...hold, x: lerp(hold.x, 960, t), y: lerp(hold.y, BY, t), zoom: Math.exp(lerp(Math.log(hold.zoom), Math.log(1.8), t)) };
};

const Archive: React.FC = () => {
  const f = useCurrentFrame();
  // bingkai tumbuh terus 62 → 68,5 % lebar; bersama push kamera 1,05 tampil 62 → ±72 % (k1 ±5 %/dtk), rotasi 0 → −1°.
  // (74 % penuh di PLAN = tinggi 800 px, melewati safe frame y 140–935; dibatasi ±72 %)
  const wPct = lerp(0.62, 0.685, Math.min(1, f / 156));
  const bw = W * wPct, bh = (bw * 9) / 16;
  const rot = -1 * prog(f, 0, 56, 'inOut');
  const border = 14;
  return (
    <Stage pose={archCam} bg={C.paper}>
      <Layer z={-260} name="L1">
        <Paper color={C.paper} />
      </Layer>
      <Layer z={0} name="L2">
        <div
          style={{
            position: 'absolute', left: 960 - bw / 2, top: BY - bh / 2, width: bw, height: bh,
            background: C.white, transform: `rotate(${rot}deg)`,
            boxShadow: '0 26px 50px rgba(40,39,35,0.20), 0 6px 14px rgba(40,39,35,0.14)',
          }}
        >
          <div style={{ position: 'absolute', left: border, top: border, right: border, bottom: border, overflow: 'hidden', background: '#111' }}>
            {CLIPS.map((c) =>
              f >= c.from && f < c.to ? (
                <Sequence key={c.src} from={c.from} durationInFrames={c.to - c.from} layout="none">
                  <OffthreadVideo
                    src={staticFile(`footage/${c.src}.mp4`)}
                    muted
                    style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                      transform: `scale(${c.s ?? 1}) translate(${fit(c.s, c.ox)}%, ${fit(c.s, c.oy)}%)`, transformOrigin: c.origin ?? 'center',
                    }}
                  />
                </Sequence>
              ) : null,
            )}
          </div>
        </div>
      </Layer>
      <Layer z={30} name="L3">
        <TextBlocks blocks={txt('B01')} />
      </Layer>
    </Stage>
  );
};

// ---------- B04: wajah F3 (pembuka wajah) + K4 ----------
const b04Cam = camPath([{ f: F_B04[0], zoom: 1 }, { f: F_B04[1], zoom: 1.05, ease: 'smooth' }], { sigma: 0 });
const B04: React.FC = () => (
  <Stage pose={b04Cam} bg="#000">
    <Layer z={0} name="L1-L2">
      {/* pusat digeser ke kanan dari preset (1150 -> 1250) supaya wajah tetap di sepertiga kiri saat kepala bergerak */}
      <Face preset="F3" crop={{ cx: 1250 }} grade="terang" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B04')} />
    </Layer>
  </Stage>
);

// ---------- B05: kartu judul J + kursor ragu ----------
const b05Cam = camPath([{ f: F_B05[0], zoom: 1 }, { f: F_B05[1], zoom: 1.04, ease: 'smooth' }], { sigma: 0 });
const B05: React.FC = () => {
  const f = useCurrentFrame();
  // kursor: masuk 8,33 dtk dari kanan bawah, berhenti di atas kata, ragu, mundur tanpa klik saat "buat." (8,92)
  const pIn = prog(f, 250, 264, 'out');
  const pOut = prog(f, 270, 292, 'inOut');
  const hoverX = 1190, hoverY = 498;
  const wob = f >= 262 && f < 272 ? Math.sin((f - 262) * 1.9) * 2 : 0;
  const cx = lerp(lerp(1900, hoverX, pIn), 1530, pOut) + wob;
  const cy = lerp(lerp(1110, hoverY, pIn), 840, pOut) + (f >= 262 && f < 272 ? Math.cos((f - 262) * 2.3) * 1.5 : 0);
  return (
    <Stage pose={b05Cam} bg={C.paper}>
      <Layer z={-260} name="L1">
        <Paper color={C.paper} />
      </Layer>
      <Layer z={30} name="L3">
        <TextBlocks blocks={txt('B05')} />
      </Layer>
      <Layer z={80} name="L4">
        {f >= 250 ? <Cursor x={cx} y={cy} size={112} /> : null}
      </Layer>
    </Stage>
  );
};

export const ACT1: SceneEntry[] = [
  { id: 'S-arsip', beats: 'B01–B03', from: F_ARCH[0], to: F_ARCH[1], Comp: Archive },
  { id: 'S-B04', beats: 'B04', from: F_B04[0], to: F_B04[1], Comp: B04 },
  { id: 'S-B05', beats: 'B05', from: F_B05[0], to: F_B05[1], Comp: B05 },
  // mosaik piksel aksen biru membangun babak 2 (9,4–9,95), pecah di awal B06
  { id: 'X-mosaik-1-2', beats: 'B05→B06', from: 282, to: 307, over: true, Comp: () => <PixelMosaic build={[282, 299]} brk={[299, 307]} from="right" /> },
];
