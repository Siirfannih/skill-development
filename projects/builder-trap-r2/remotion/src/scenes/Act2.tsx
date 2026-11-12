// Babak 2 · Siapa aku (Editor A: B06–B08, B10–B14). Kiblat 55 k4/k5/k6 + kartu 63 (UI sebagai tokoh, punch prompt).
import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { Stage, Layer } from '../engine/Stage';
import { camPath, withShake, Pose } from '../engine/camera';
import { TextBlocks, TextBlockView } from '../engine/TextLayer';
import { Face } from '../engine/Face';
import { Print, Pin } from '../engine/Print';
import { Linen } from '../engine/Surfaces';
import { Cursor } from '../engine/Cursor';
import { Logo } from '../engine/Logo';
import { PixelMosaic } from '../engine/Transitions';
import { Wall, WALL, pulse } from '../engine/Wall';
import { Browser, BAR_H } from '../ui/Browser';
import { ChatGPTUI, GPT_W, GPT_H, GPT_PROMPT, GPT_SIDEBAR } from '../ui/ChatGPT';
import { YouTubeResults, YT_W, YT_H, ytThumb } from '../ui/YouTube';
import { C, prog, lerp, rand, clamp01 } from '../engine/theme';
import type { SceneEntry } from '../engine/scenes';
import type { TextBlock } from '../text/types';
import {
  TEXT_ACT2, F_B06, F_B07, F_B08, F_B10, F_B10_YT, F_B11, F_B12, F_B13, F_B13_GPT, F_B14, F_SEND,
} from './Act2.text';

const IN_PHOTO = ['B06-H'];
const txt = (beat: string, f?: (b: TextBlock) => boolean) => TEXT_ACT2.filter((b) => b.beat === beat && !IN_PHOTO.includes(b.id) && b.code !== 'UI' && (!f || f(b)));
const byId = (id: string) => TEXT_ACT2.find((b) => b.id === id)!;

// ======================= B06 · foto cetak di alas linen =======================
// REVIEW-r1 F-r1-01: foto ≥ 30 % lebar × 65 % tinggi sejak frame pertama; kamera 1,15 → 1,5.
const PHOTO = { x: 400, y: 195, w: 520, h: 650, border: 18, rot: -2 };
const b06Cam = camPath([
  { f: F_B06[0], x: 945, y: 520, zoom: 1.15 },
  { f: F_B06[1], x: 960, y: 520, zoom: 1.5, ease: 'inOut' },
]);
const B06: React.FC = () => {
  const f = useCurrentFrame();
  const d = prog(f, F_B06[0], F_B06[0] + 10, 'out'); // jatuh lalu dipin (C10), di bawah mosaik yang pecah
  const inner = { w: PHOTO.w - 2 * PHOTO.border, h: PHOTO.h - 2 * PHOTO.border };
  return (
    <Stage pose={b06Cam} bg={C.linen}>
      <Layer z={-300} name="L1"><Linen /></Layer>
      <Layer z={0} name="L2">
        <Print x={PHOTO.x} y={PHOTO.y} w={PHOTO.w} h={PHOTO.h} border={PHOTO.border}
          style={{ transform: `rotate(${lerp(-4.5, PHOTO.rot, d)}deg) scale(${lerp(1.07, 1, d)})` }}>
          <Face w={inner.w} h={inner.h} preset="F4" crop={{ s: 1.15, cx: 1120, cy: 560 }} grade="terang" />
          <TextBlockView block={byId('B06-H')} />
        </Print>
      </Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt('B06')} /></Layer>
    </Stage>
  );
};

// ======================= sisipan wajah (B07, B10a, B11, B13a) =======================
const faceScene = (preset: 'F1' | 'F2' | 'F3' | 'F4', crop: { s?: number; cx?: number; cy?: number }, pose: (f: number) => Pose, beat: string, filter?: (b: TextBlock) => boolean) => {
  const S: React.FC = () => (
    <Stage pose={pose} bg="#000">
      <Layer z={0} name="L1-L2"><Face preset={preset} crop={crop} grade="terang" /></Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt(beat, filter)} /></Layer>
    </Stage>
  );
  return S;
};
// F1: pusat digeser ke kanan supaya wajah di kiri dan K4 punya dinding di kanan
const B07 = faceScene('F1', { cx: 1100 }, camPath([{ f: F_B07[0], zoom: 1 }, { f: F_B07[1], zoom: 1.04, ease: 'smooth' }], { sigma: 0 }), 'B07');
const B10a = faceScene('F3', { cx: 1250 }, camPath([{ f: F_B10[0], zoom: 1 }, { f: F_B10_YT, zoom: 1.06, ease: 'smooth' }], { sigma: 0 }), 'B10', (b) => b.id === 'B10-N1');
// B11: punch 1 → 1,08 tepat di "FOMO." (30,48 dtk = f914), berpusat di awal teks (x 1120) supaya baris kecil
// tetap di safe frame; lalu drift.
const B11_ANCHOR = { x: 1120, y: 540 };
const b11Zoom = camPath([
  { f: F_B11[0], zoom: 1 }, { f: 912, zoom: 1.015, ease: 'smooth' }, { f: 919, zoom: 1.08, ease: 'out' }, { f: F_B11[1], zoom: 1.09, ease: 'smooth' },
], { sigma: 0 });
const b11Cam = withShake((f: number): Pose => {
  const z = b11Zoom(f).zoom;
  return { x: B11_ANCHOR.x - (B11_ANCHOR.x - 960) / z, y: B11_ANCHOR.y - (B11_ANCHOR.y - 540) / z, zoom: z, rx: 0, ry: 0, rz: 0 };
}, [{ f: 914, amp: 9, dur: 8 }]);
const B11 = faceScene('F1', { s: 1.9, cx: 1100 }, b11Cam, 'B11');
const B13a = faceScene('F2', {}, camPath([{ f: F_B13[0], zoom: 1 }, { f: F_B13_GPT, zoom: 1.05, ease: 'smooth' }], { sigma: 0 }), 'B13', (b) => b.id === 'B13-N1');

// ======================= B08 · Irfan di antara cetakan serupa =======================
const THUMBS = ['kXZYpA2Ur5o', 'jdH8pgLDtho', 'mXluYosHxX4', '8Lz530r09WU', 'pe9tFLbdSAA', 'id-946PmzcY', 'KBPsHcsl1aY', 'dePCXPtZydE', 'yhC8RcAr9RY', 'u4I3EJOikjE', 'dQ-KQm51FMQ', 'Di_KJpu3NhE'];
const TCOLS = [200, 560, 1360, 1720];
const TROWS = [230, 540, 850];
const TW = 380, TH = 236;
// kolom kanan (2,3) disingkirkan dulu untuk membuka ruang teks; kolom kiri saat "gak orang lain punya"
const thumbs = THUMBS.map((id, i) => {
  const c = i % 4, r = Math.floor(i / 4);
  const fallAt = c >= 2 ? 479 + (3 - c) * 3 + r * 3 + Math.round(rand(i) * 2) : 499 + r * 5 + c * 4 + Math.round(rand(i + 3) * 4);
  return { id, x: TCOLS[c] + (rand(i + 1) - 0.5) * 24, y: TROWS[r] + (rand(i + 2) - 0.5) * 22, rot: (rand(i + 9) - 0.5) * 5, fallAt, dur: c >= 2 ? 9 : 16, spin: (rand(i + 17) - 0.5) * 50 };
});
const b08Cam = camPath([
  { f: F_B08[0], x: 960, y: 540, zoom: 1.35 },
  { f: 506, x: 1000, y: 540, zoom: 0.8, ease: 'inOut' }, // pull −40 %
  { f: F_B08[1], x: 1100, y: 545, zoom: 1.05, ease: 'inOut' }, // dorong ke foto + teks (satu-satunya fokus)
]);
const IRFAN8 = { x: 760, y: 290, w: 400, h: 500 };
const B08: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Stage pose={b08Cam} bg={C.linen}>
      <Layer z={-300} name="L1"><Linen /></Layer>
      <Layer z={0} name="L2">
        {thumbs.map((t) => {
          const p = prog(f, t.fallAt, t.fallAt + t.dur, 'in');
          const lift = prog(f, t.fallAt - 3, t.fallAt, 'out') * (1 - p);
          if (p >= 1) return null;
          // cetakan lepas dari pin dan jatuh keluar frame bersama pinnya
          return (
            <Print key={t.id} x={t.x - TW / 2} y={t.y - TH / 2} w={TW} h={TH} border={12} pin
              style={{ transform: `translate(${p * t.spin * 3}px, ${-10 * lift + p * 1300}px) rotate(${t.rot + p * t.spin}deg)` }}>
              <Img src={staticFile(`yt/${t.id}.jpg`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Print>
          );
        })}
        <Print x={IRFAN8.x} y={IRFAN8.y} w={IRFAN8.w} h={IRFAN8.h} border={16} rot={-2}>
          <Face w={IRFAN8.w - 32} h={IRFAN8.h - 32} preset="F4" crop={{ s: 1.15, cx: 1000, cy: 580 }} grade="terang" />
        </Print>
      </Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt('B08')} /></Layer>
    </Stage>
  );
};

// ======================= B10b · hasil pencarian YouTube =======================
// REVIEW-r2a F-r2a-02: kamera dekat (skala total ≥ 1,5) sehingga 1–2 hasil mengisi frame dan judul ≥ 2,5 % tinggi.
// Jendela skala 1: koordinat dunia = px desain halaman (bilah browser di y −40).
const b10Cam = camPath([
  { f: F_B10_YT, x: 900, y: 330, zoom: 1.5, ry: 4 },
  { f: F_B10[1], x: 915, y: 470, zoom: 1.56, ry: 1, ease: 'inOut' }, // pan diagonal pelan menyusuri hasil
]);
const B10b: React.FC = () => {
  const f = useCurrentFrame();
  // kursor menyusuri thumbnail 0 → 1 (hover membesar sedikit, tidak pernah klik)
  const stops = [{ f: 808, i: 0 }, { f: 846, i: 1 }];
  let hover = -1, hoverP = 0;
  stops.forEach((s, k) => { const nxt = stops[k + 1]?.f ?? 9999; if (f >= s.f && f < nxt) { hover = s.i; hoverP = prog(f, s.f, s.f + 8, 'out'); } });
  const tgt = (i: number) => { const t = ytThumb(i); return { x: t.x + t.w * 0.66, y: t.y + t.h * 0.58 }; };
  let cx = 1150, cy = 760;
  const k = stops.findIndex((s, j) => f < (stops[j + 1]?.f ?? 9999));
  const s0 = stops[Math.max(0, k)];
  const from = k <= 0 ? { x: 1150, y: 760 } : tgt(stops[k - 1].i);
  const to = tgt(s0.i);
  const m = prog(f, s0.f - 9, s0.f + 1, 'inOut');
  cx = lerp(from.x, to.x, m); cy = lerp(from.y, to.y, m);
  return (
    <Stage pose={b10Cam} bg={C.linen}>
      <Layer z={-300} name="L1"><Linen /></Layer>
      <Layer z={0} name="L2">
        <Browser w={YT_W} h={YT_H} url="youtube.com/results?search_query=cara+dapat+uang+dari+AI+2026" style={{ left: 0, top: -BAR_H }}>
          <YouTubeResults hover={hover} hoverP={hoverP} />
        </Browser>
      </Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt('B10', (b) => b.id.startsWith('B10-N2'))} /></Layer>
      <Layer z={60} name="L4"><Cursor x={cx} y={cy} size={64} /></Layer>
    </Stage>
  );
};

// ======================= B12 · ChatGPT, riwayat bertambah, logo dicap =======================
// REVIEW-r2a F-r2a-01: jendela skala 1 (≥ 80 % lebar), kamera 1,22 mengikuti kolom riwayat yang bertambah,
// lalu mundur ke tengah untuk cap logo di "AI." (f1045).
const G12 = { x: 160, y: 200 };
const STAMP = 1045; // "AI." 34,82 dtk
const b12Cam = withShake(camPath([
  // zoom 1,22: judul "Where should we begin?" tetap utuh di frame (C16), riwayat 15 px desain → ±18 px layar
  { f: F_B12[0], x: 680, y: 560, zoom: 1.22, ry: -6 },
  { f: 1016, x: 680, y: 680, zoom: 1.22, ry: -3, ease: 'inOut' },
  { f: 1036, x: 680, y: 760, zoom: 1.22, ry: -1, ease: 'inOut' },
  { f: 1046, x: 960, y: 720, zoom: 0.98, ry: 0, ease: 'inOut' },
  { f: F_B12[1], x: 960, y: 720, zoom: 1.0, ry: 0, ease: 'smooth' },
], { cuts: [1036] }), [{ f: STAMP, amp: 10, dur: 9 }]);
const B12: React.FC = () => {
  const f = useCurrentFrame();
  const hist = Math.floor(20 * Math.pow(prog(f, 936, 1040, 'linear'), 1.6)); // bertambah makin cepat
  const c = { x: G12.x + GPT_SIDEBAR + (GPT_W - GPT_SIDEBAR) / 2, y: G12.y + BAR_H + GPT_PROMPT.y - 40 };
  const head = { x: G12.x + 29, y: G12.y + BAR_H + 26 };
  const st = prog(f, STAMP, STAMP + 4, 'out');
  const mv = prog(f, STAMP + 8, STAMP + 16, 'inOut');
  const size = lerp(lerp(560, 230, st), 22, mv);
  const lx = lerp(c.x, head.x, mv), ly = lerp(c.y, head.y, mv);
  return (
    <Stage pose={b12Cam} bg={C.linen}>
      <Layer z={-300} name="L1"><Linen /></Layer>
      <Layer z={0} name="L2">
        <Browser w={GPT_W} h={GPT_H} url="chatgpt.com" style={{ left: G12.x, top: G12.y }}>
          <ChatGPTUI history={hist} headerLogo={mv >= 1 ? 1 : 0} />
        </Browser>
        {f >= STAMP && mv < 1 ? (
          <div style={{ position: 'absolute', left: lx - size / 2, top: ly - size / 2, opacity: Math.min(1, st * 3) }}>
            <Logo name="openai" size={size} color="#0D0D0D" />
          </div>
        ) : null}
      </Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt('B12')} /></Layer>
    </Stage>
  );
};

// ======================= B13b · punch ke prompt, "build something" diketik =======================
const G13 = { s: 1.7 };
// prompt (px desain) dipetakan ke dunia (960, 600)
const P13 = { x: 960, y: 600 };
const G13_ORIGIN = { x: P13.x - GPT_PROMPT.x * G13.s, y: P13.y - (BAR_H + GPT_PROMPT.y) * G13.s };
const typedStart = 399; // x dunia awal teks prompt
const b13Cam = camPath([
  // REVIEW-r2a F-r2a-03: judul "Where should we begin?" di luar frame penuh; chip utuh lalu di luar frame saat punch
  { f: F_B13_GPT, x: 650, y: 768, zoom: 1.9 },
  { f: 1132, x: 660, y: 770, zoom: 2.0, ease: 'smooth' },
  { f: 1146, x: 525, y: 653, zoom: 3.2, ease: 'out' }, // punch-in 1,6×: teks prompt ±10 % tinggi frame
  { f: 1163, x: 530, y: 653, zoom: 3.22, ease: 'smooth' }, // ikut caret
  { f: F_B13[1], x: 532, y: 653, zoom: 3.23, ease: 'smooth' },
], { cuts: [1146] });
const TYPE = 'build something';
const B13b: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.min(TYPE.length, Math.floor((f - 1137) * (TYPE.length / 24)) + 1)); // 37,88 → 38,7 dtk
  const typed = f >= 1137 ? TYPE.slice(0, n) : '';
  const sent = prog(f, F_SEND, F_SEND + 4, 'out');
  return (
    <Stage pose={b13Cam} bg={C.linen}>
      <Layer z={-300} name="L1"><Linen /></Layer>
      <Layer z={0} name="L2">
        <Browser w={GPT_W} h={GPT_H} url="chatgpt.com" scale={G13.s} style={{ left: G13_ORIGIN.x, top: G13_ORIGIN.y }}>
          <ChatGPTUI history={20} headerLogo={1} typed={typed} caret={f >= 1110 && f < F_SEND && Math.floor(f / 8) % 2 === 0} send={sent} />
        </Browser>
      </Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt('B13', (b) => b.id === 'B13-N2')} /></Layer>
    </Stage>
  );
};

// ======================= B14 · dinding bukti, satu gerak 7 dtk =======================
export const b14Cam = camPath([
  { f: F_B14[0], x: 600, y: 470, zoom: 1.3 },
  { f: 1240, x: 900, y: 490, zoom: 1.18, ease: 'inOut' },
  { f: 1300, x: 1300, y: 540, zoom: 1.02, ease: 'inOut' },
  { f: 1345, x: 1608, y: 875, zoom: 0.545, ease: 'inOut' },
  { f: F_B14[1], x: 1608, y: 875, zoom: 0.535, ease: 'smooth' }, // melambat lalu tahan
]);
const B14: React.FC = () => {
  const f = useCurrentFrame();
  const thread = prog(f, F_B14[0], 1345, 'smooth');
  const focus = [{ i: 0, k: pulse(f, 1190, 30) }, { i: 1, k: pulse(f, 1228, 30) }, { i: 2, k: pulse(f, 1270, 30) }, { i: 3, k: pulse(f, 1305, 25) }, { i: WALL.length - 1, k: pulse(f, 1352, 40) }];
  return (
    <Stage pose={b14Cam} bg={C.linen}>
      <Layer z={0} name="L1-L2"><Wall mode="terang" thread={thread} focus={focus} /></Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt('B14')} /></Layer>
    </Stage>
  );
};

export const ACT2: SceneEntry[] = [
  { id: 'S-B06', beats: 'B06', from: F_B06[0], to: F_B06[1], Comp: B06 },
  { id: 'S-B07', beats: 'B07', from: F_B07[0], to: F_B07[1], Comp: B07 },
  { id: 'S-B08', beats: 'B08', from: F_B08[0], to: F_B08[1], Comp: B08 },
  { id: 'S-B10a', beats: 'B10', from: F_B10[0], to: F_B10_YT, Comp: B10a },
  { id: 'S-B10b', beats: 'B10', from: F_B10_YT, to: F_B10[1], Comp: B10b },
  { id: 'S-B11', beats: 'B11', from: F_B11[0], to: F_B11[1], Comp: B11 },
  { id: 'S-B12', beats: 'B12', from: F_B12[0], to: F_B12[1], Comp: B12 },
  { id: 'S-B13a', beats: 'B13', from: F_B13[0], to: F_B13_GPT, Comp: B13a },
  { id: 'S-B13b', beats: 'B13', from: F_B13_GPT, to: F_B13[1], Comp: B13b },
  { id: 'S-B14', beats: 'B14', from: F_B14[0], to: F_B14[1], Comp: B14 },
  // mosaik piksel: prompt terkirim → dinding bukti (38,8–39,2)
  { id: 'X-mosaik-13-14', beats: 'B13→B14', from: F_SEND, to: F_B14[0] + 8, over: true, Comp: () => <PixelMosaic build={[F_SEND, F_B14[0]]} brk={[F_B14[0], F_B14[0] + 8]} from="left" /> },
];
