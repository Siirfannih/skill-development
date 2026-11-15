// Babak 2 · Siapa aku (Editor A: B06–B08, B10–B14). Kiblat 55 k4/k5/k6 + kartu 63 (UI sebagai tokoh, punch prompt).
// r7: B12–B13b dibangun ulang ke DNA kartu 63 + Revisi Irfan #1/#2 (layar macOS sebagai kode, jendela ChatGPT gelap di tengah).
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { Stage, Layer } from '../engine/Stage';
import { camPath, withShake, Pose } from '../engine/camera';
import { TextBlocks, TextBlockView } from '../engine/TextLayer';
import { Face, type FacePreset } from '../engine/Face';
import { keBaru } from '../engine/timewarp';
import { Print, Pin } from '../engine/Print';
import { Linen } from '../engine/Surfaces';
import { Cursor } from '../engine/Cursor';
import { Logo } from '../engine/Logo';
import { MenuBar, DesktopIcons, FlipClock, CalendarWidget, Dock, DOCK_APPS, dockIconAt } from '../ui/MacDesktop';
import { PixelMosaic } from '../engine/Transitions';
import { Wall, WALL, pulse } from '../engine/Wall';
import { Browser, BAR_H } from '../ui/Browser';
import { ChatGPTDarkUI, GPTD_W as GPT_W, GPTD_H as GPT_H, GPTD_PROMPT as GPT_PROMPT, GPTD_HEAD_LOGO as GPT_HEAD_LOGO } from '../ui/ChatGPTDark';
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
// r3a (F-v1-05): kamera berpusat di pasangan foto + teks (x 400–±1390) supaya teks tetap menempel dan dalam safe frame
// sampai push 1,5× (foto ±1,5 × 520 px, tepi kiri layar ±240 px).
// r8 (TASK-r8 butir 7): pusat kamera digeser ke kanan (872 → 925) mengikuti blok teks yang lebih besar, sehingga pasangan
// foto + teks berada di tengah frame (dulu berat kiri, kanan ±60 % kosong)
const b06Cam = camPath([
  { f: F_B06[0], x: 925, y: 520, zoom: 1.15 },
  { f: F_B06[1], x: 930, y: 500, zoom: 1.5, ease: 'inOut' },
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
// r8: `from` = frame lama awal sisipan → punch crop di lompatan video wajah (Face jumpFrom)
const faceScene = (preset: FacePreset, crop: { s?: number; cx?: number; cy?: number }, pose: (f: number) => Pose, beat: string, filter?: (b: TextBlock) => boolean, from?: number) => {
  const S: React.FC = () => (
    <Stage pose={pose} bg="#000">
      <Layer z={0} name="L1-L2"><Face preset={preset} crop={crop} grade="terang" jumpFrom={from === undefined ? undefined : keBaru(from)} /></Layer>
      <Layer z={30} name="L3"><TextBlocks blocks={txt(beat, filter)} /></Layer>
    </Stage>
  );
  return S;
};
// r3a (F-v1-03): urutan crop sisipan babak 1–2 = B04 P · B07 M · B09 T · B10 M · B11 P · B13 T (tidak ada dua berurutan
// sama); pita teks = atas · tengah · atas · bawah · tengah · atas (tidak 3× berturut di pita yang sama).
// B07: mata (M), "unik." di dinding kanan sejajar mata/hidung
const B07 = faceScene('M', {}, camPath([{ f: F_B07[0], zoom: 1 }, { f: F_B07[1], zoom: 1.04, ease: 'smooth' }], { sigma: 0 }), 'B07');
// B10a: mata (M) lagi tetapi setelah sisipan T; teks di pita bawah kanan
const B10a = faceScene('M', {}, camPath([{ f: F_B10[0], zoom: 1 }, { f: F_B10_YT, zoom: 1.06, ease: 'smooth' }], { sigma: 0 }), 'B10', (b) => b.id.startsWith('B10-N1'), F_B10[0]); // r4: N1 + N1b
// B11: sisi (P, s 1,8). Punch 1 → 1,08 tepat di "FOMO." (30,48 dtk = f914), berjangkar di pojok kiri atas K4 sehingga
// teks diam dan wajah membesar menjauh dari teks; lalu drift.
const B11_ANCHOR = { x: 1000, y: 300 };
const b11Zoom = camPath([
  { f: F_B11[0], zoom: 1 }, { f: 912, zoom: 1.015, ease: 'smooth' }, { f: 919, zoom: 1.08, ease: 'out' }, { f: F_B11[1], zoom: 1.09, ease: 'smooth' },
], { sigma: 0 });
const b11Cam = withShake((f: number): Pose => {
  const z = b11Zoom(f).zoom;
  return { x: B11_ANCHOR.x - (B11_ANCHOR.x - 960) / z, y: B11_ANCHOR.y - (B11_ANCHOR.y - 540) / z, zoom: z, rx: 0, ry: 0, rz: 0 };
}, [{ f: 914, amp: 9, dur: 8 }]);
const B11 = faceScene('P', { s: 1.8, cx: 1110 }, b11Cam, 'B11');
// B13a: T dengan pusat lebih rendah (kepala turun di 36 dtk; mata tidak terpotong setengah di tepi atas)
const B13a = faceScene('T', { cy: 840 }, camPath([{ f: F_B13[0], zoom: 1 }, { f: F_B13_GPT, zoom: 1.05, ease: 'smooth' }], { sigma: 0 }), 'B13', (b) => b.id === 'B13-N1', F_B13[0]);

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
// r3a (F-v1-06): tepi atas frame selalu di atas bilah browser (y dunia −110), jadi tidak ada thumbnail terpotong di
// tepi atas; kamera terus bergerak (linear) sampai cut, pan menyamping menyusuri kolom hasil sambil push kecil.
const b10Cam = camPath([
  { f: F_B10_YT, x: 860, y: -110 + 540 / 1.5, zoom: 1.5, ry: 4 },
  { f: F_B10[1], x: 985, y: -110 + 540 / 1.56, zoom: 1.56, ry: 1, ease: 'linear' },
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
  // r3a: halaman bergulir 250 px setelah hover ke-2 (frasa "banyak orang coba." menempel hasil ke-2 dan ikut bergulir),
  // karena kamera kini menahan tepi atas di atas bilah browser.
  const scroll = 250 * prog(f, 842, 866, 'inOut');
  cx = lerp(from.x, to.x, m); cy = lerp(from.y, to.y, m) - (k >= 1 ? scroll : 0);
  return (
    <Stage pose={b10Cam} bg={C.linen}>
      <Layer z={-300} name="L1"><Linen /></Layer>
      <Layer z={0} name="L2">
        <Browser w={YT_W} h={YT_H} url="youtube.com/results?search_query=cara+dapat+uang+dari+AI+2026" style={{ left: 0, top: -BAR_H }}>
          <YouTubeResults hover={hover} hoverP={hoverP} scroll={scroll} />
        </Browser>
      </Layer>
      <Layer z={30} name="L3">
        <div style={{ position: 'absolute', left: 0, top: -scroll, width: 1920, height: 1080 }}>
          <TextBlocks blocks={txt('B10', (b) => b.id.startsWith('B10-N2'))} />
        </div>
      </Layer>
      <Layer z={60} name="L4"><Cursor x={cx} y={cy} size={64} /></Layer>
    </Stage>
  );
};

// ======================= B12–B13b · layar macOS (r7 + Revisi Irfan 15 Nov #1 dan #2) =======================
// TASK-r7 M1–M3 + R1–R4: layar Mac lengkap sebagai kode (ui/MacDesktop.tsx: wallpaper foto padang wall_mac.jpg, menu bar,
// ikon desktop, jam flip, kalender, dock) → kursor klik ikon ChatGPT di dock → ikon memantul → jendela ChatGPT GELAP
// terbuka dari ikon ke TENGAH (utuh 58 % lebar × 59 % tinggi) → riwayat bertambah → punch KAMERA ke kotak prompt di dalam
// jendela (r7c, koreksi Irfan: satu UI, tidak ada elemen yang membesar sendiri; kartu 63 §6, D-026 dolly ke input) →
// cap logo "AI." di dalam jendela → (B13b) ketik → kamera mundur → kirim → mosaik. TANPA KT (R2).
// Semua bagian layar di bidang z=0 (layar Mac datar): dunia = layar pada kamera normal (zoom 1).
// Peta waktu v3b (r8): bekas lompatan lama f958→f970 kini rampa ±1,4× (nyata 848–879); konstanta di bawah dihitung supaya
// durasi NYATA tetap: pantulan 2 × ±0,25 dtk, jendela terbuka 0,38 dtk (nyata 865–876,5).
// (nyata 866–878 = 0,4 dtk) supaya tidak ada gerak yang terpotong lompatan.
const WIN_S = 1114 / GPT_W; // 0,870: 1280 px desain → 1114 px layar (58 % lebar)
const WIN = { x: (1920 - 1114) / 2, y: 200, w: 1114, h: (GPT_H + BAR_H) * WIN_S }; // x 403–1517, y 200–837 (59 %)
const GPT_DOCK = DOCK_APPS.indexOf('chatgpt');
/** pusat kotak prompt di dalam jendela (dunia) */
const PROMPT_W = { x: WIN.x + GPT_PROMPT.x * WIN_S, y: WIN.y + (BAR_H + GPT_PROMPT.y) * WIN_S };
/** jangkar push/pull ringan = tengah frame setinggi kotak prompt */
const PUNCH_A = { x: 960, y: PROMPT_W.y };
/** awal teks prompt (dunia): kiri kotak + padding 0,3h + ikon + 1,25fs + celah 0,45fs (px desain × WIN_S) */
const TEXT_X = PROMPT_W.x + (-GPT_PROMPT.w / 2 + 0.3 * GPT_PROMPT.h + 1.7 * GPT_PROMPT.fs) * WIN_S;
/** tombol kirim (dunia) */
const SEND_W = { x: PROMPT_W.x + (GPT_PROMPT.w / 2 - 0.5 * GPT_PROMPT.h) * WIN_S, y: PROMPT_W.y };
/** pusat ikon "+" di kotak prompt (dunia) */
const PLUS_X = PROMPT_W.x + (-GPT_PROMPT.w / 2 + 0.3 * GPT_PROMPT.h + 0.625 * GPT_PROMPT.fs) * WIN_S;
/** pose punch (r7d): kotak prompt di tengah tinggi frame, "+" di layar x `sx` (±12 %), kotak terpotong di tepi kanan
 *  seperti punch kartu 63 dtk 21; judul berada > setengah tinggi frame di atas kotak → keluar frame seluruhnya */
const punchPose = (zoom: number, sx = 230) => ({ x: PLUS_X + (960 - sx) / zoom, y: PROMPT_W.y, zoom, rx: 0, ry: 0, rz: 0 });
/** pose mundur: awal teks dan tombol kirim di frame, judul utuh di atasnya */
const backPose = (zoom: number) => ({ x: (TEXT_X + SEND_W.x) / 2, y: PROMPT_W.y - 100, zoom, rx: 0, ry: 0, rz: 0 });
const PUNCH_Z = 3.8;
/** jangkar push desktop: dock tetap utuh di frame; menu bar keluar penuh di puncak push (bukan terpotong setengah),
 *  lalu masuk lagi saat pull dan sudah berganti "ChatGPT" */
const DESK_A = { x: 960, y: 800 };
const anch = (A: { x: number; y: number }, zoom: number) => ({ x: A.x - (A.x - 960) / zoom, y: A.y - (A.y - 540) / zoom, zoom, rx: 0, ry: 0, rz: 0 });
/** titik dunia (bidang z=0) → layar */
const toScreen = (p: Pose, wx: number, wy: number) => ({ x: 960 + (wx - p.x) * p.zoom, y: 540 + (wy - p.y) * p.zoom, s: p.zoom });
const clockSec = (f: number) => String(10 + Math.floor((f - F_B12[0]) / 30)).padStart(2, '0');

/** layar Mac di belakang jendela: wallpaper foto tajam (cover, langit di atas), ikon desktop, widget */
const MacBack: React.FC<{ f: number }> = ({ f }) => (
  <>
    {/* wall_mac.jpg 3840×2563 → 2112×1410 (cover 1,1×), dipotong dari atas dan kanan: langit y 0–±520, padang di bawah;
        hutan rapat di tepi kanan foto dipangkas 192 px supaya frame desktop tidak berat kanan (balance_check C17) */}
    <Img src={staticFile('wall_mac.jpg')} style={{ position: 'absolute', left: 0, top: 0, width: 2112, height: 1410 }} />
    <DesktopIcons />
    <FlipClock hh="10" mm="25" ss={clockSec(f)} />
    <CalendarWidget />
  </>
);

/** L2: jendela ChatGPT gelap; open 0..1 = keluar dari ikon ChatGPT di dock ke tengah (skala + gerak, ease-out) */
const GptWindow: React.FC<{ open?: number; ui: React.ComponentProps<typeof ChatGPTDarkUI> }> = ({ open = 1, ui }) => {
  const ic = dockIconAt(GPT_DOCK);
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: `${ic.x}px ${ic.y}px`, transform: `scale(${lerp(0.05, 1, open)})`, opacity: Math.min(1, open * 4) }}>
      <Browser w={GPT_W} h={GPT_H} url="chatgpt.com" dark scale={WIN_S} style={{ left: WIN.x, top: WIN.y, borderRadius: 14 / WIN_S }}
        shadow="0 36px 80px rgba(0,0,0,0.40), 0 10px 26px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.10)">
        <ChatGPTDarkUI {...ui} />
      </Browser>
    </div>
  );
};

// ---------- B12 · desktop → klik ikon ChatGPT → pantul → jendela ke tengah → riwayat → punch "investasi" → cap "AI." ----------
const STAMP = 1045; // "AI." 34,82 dtk (frame lama)
const B12_CLICK = 945; // nyata 850
const B12_BOUNCE: [number, number][] = [[946, 957], [957, 966]]; // 2 pantulan berurutan, nyata 850–858 dan 858–865
const B12_OPEN: [number, number] = [966, 983]; // nyata 865–876,5 (0,38 dtk) di rampa 1,4×
const B12_APP = 968; // menu bar "ChatGPT" + titik app aktif (nyata ±866)
const B12_PUNCH: [number, number] = [1008, 1015]; // "investasi" f1015; masuk 7 f ease-out (motion blur Stage otomatis)
const b12Cam = withShake(camPath([
  { f: F_B12[0], ...anch(DESK_A, 1.0) },
  { f: 960, ...anch(DESK_A, 1.04), ease: 'smooth' }, // push pelan ke desktop (r8: tanpa tahan, rentang lama kini tampil)
  { f: 987, ...anch(PUNCH_A, 1.0), ease: 'inOut' }, // pull kecil saat jendela terbuka
  { f: B12_PUNCH[0], ...anch(PUNCH_A, 1.03), ease: 'smooth' }, // push pelan ke jendela
  { f: B12_PUNCH[1], ...punchPose(PUNCH_Z), ease: 'out' }, // punch kamera 1,03 → 3,8 (3,7×) ke kotak prompt
  { f: 1038, ...punchPose(3.95, 215), ease: 'smooth' }, // push pelan
  { f: 1047, x: 1030, y: 540, zoom: 1.8, ease: 'inOut' }, // mundur di "AI." (logo dicap di dalam jendela)
  { f: F_B12[1], x: 990, y: 540, zoom: 1.45, ease: 'smooth' }, // terus mundur pelan sampai cut
], { cuts: [B12_PUNCH[0]] }), [{ f: STAMP, amp: 10, dur: 9 }]);
const LOGO12 = { x: 1060, y: 395 }; // dunia: di dalam jendela, di atas judul "Where should we begin?"
const HEAD12 = { x: WIN.x + GPT_HEAD_LOGO.x * WIN_S, y: WIN.y + (BAR_H + GPT_HEAD_LOGO.y) * WIN_S };
const bounceAt = (f: number) => B12_BOUNCE.reduce((a, [b0, b1], k) => a + (k === 0 ? 0.5 : 0.22) * Math.sin(Math.PI * clamp01((f - b0) / (b1 - b0))), 0);
const B12: React.FC = () => {
  const f = useCurrentFrame();
  const pose = b12Cam(f);
  const open = prog(f, B12_OPEN[0], B12_OPEN[1], 'out');
  const hist = Math.floor(20 * Math.pow(prog(f, 983, 1040, 'linear'), 1.6)); // bertambah makin cepat
  const st = prog(f, STAMP, STAMP + 4, 'out');
  const mv = prog(f, STAMP + 8, STAMP + 16, 'inOut');
  const size = lerp(lerp(120, 70, st), 22 * WIN_S, mv); // px dunia (ikut kamera)
  const lx = lerp(LOGO12.x, HEAD12.x, mv), ly = lerp(LOGO12.y, HEAD12.y, mv);
  // kursor: dari kanan ke ikon ChatGPT di dock, klik, lalu menyingkir dan memudar setelah jendela terbuka
  const icw = dockIconAt(GPT_DOCK);
  const ic = toScreen(pose, icw.x - 4, icw.y - 6);
  const m1 = prog(f, F_B12[0] + 3, B12_CLICK, 'out');
  const m2 = prog(f, B12_CLICK + 5, 957, 'inOut');
  const cur = { x: lerp(lerp(1390, ic.x, m1), ic.x + 150, m2), y: lerp(lerp(760, ic.y, m1), ic.y - 90, m2) };
  const click = prog(f, B12_CLICK, B12_CLICK + 4, 'linear');
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <Stage pose={b12Cam}>
        <Layer z={0} name="L1-L2">
          <MacBack f={f} />
          <Dock press={click} bounce={bounceAt(f)} chatgptRunning={prog(f, B12_APP, B12_APP + 4, 'out')} />
          {open > 0 ? <GptWindow open={open} ui={{ history: hist, headerLogo: mv >= 1 ? 1 : 0 }} /> : null}
          {f >= STAMP && mv < 1 ? (
            <div style={{ position: 'absolute', left: lx - size / 2, top: ly - size / 2, opacity: Math.min(1, st * 3), filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))' }}>
              <Logo name="openai" size={size} color="#FFFFFF" />
            </div>
          ) : null}
          <MenuBar app={f >= B12_APP ? 'ChatGPT' : 'Finder'} time="10:25 PM" />
        </Layer>
      </Stage>
      {f < 978 ? <Cursor x={cur.x} y={cur.y} size={64} click={click} opacity={1 - prog(f, 968, 978, 'in')} /> : null}
    </AbsoluteFill>
  );
};

// ---------- B13b · set yang sama; klik prompt → punch kamera → ketik "build something" ±12 huruf/dtk → mundur → klik kirim ----------
const B13_CLICK = 1110, TYPE_AT = 1121, TYPE_CPS = 12; // 15 huruf selesai f1156 (lama)
const B13_PUNCH: [number, number] = [1114, 1120]; // R4: punch dulu (6 f ease-out), lalu ketik (huruf pertama f1121)
const B13_BACK: [number, number] = [1158, 1163]; // mundur sebelum kirim/mosaik: awal teks + tombol kirim di frame
const b13Cam = camPath([
  { f: F_B13_GPT, ...anch(DESK_A, 1.04) },
  { f: 1108, ...anch(PUNCH_A, 1.0), ease: 'inOut' }, // pull masuk babak (desktop + menu bar + dock terlihat)
  { f: B13_PUNCH[0], ...anch(PUNCH_A, 1.03), ease: 'smooth' }, // push pelan
  { f: B13_PUNCH[1], ...punchPose(PUNCH_Z), ease: 'out' }, // punch kamera 1,03 → 3,8 (3,7×)
  { f: B13_BACK[0], ...punchPose(4.0, 200), ease: 'smooth' }, // push pelan mengikuti caret
  { f: B13_BACK[1], ...backPose(2.2), ease: 'inOut' }, // mundur
  { f: F_B13[1], ...backPose(2.12), ease: 'smooth' },
], { cuts: [B13_PUNCH[0], B13_BACK[0]] }); // penghalusan tidak menyeberang awal mundur (punch tertahan sampai f1158)
const TYPE = 'build something';
const B13b: React.FC = () => {
  const f = useCurrentFrame();
  const pose = b13Cam(f);
  const n = f < TYPE_AT ? 0 : Math.min(TYPE.length, 1 + Math.floor(((f - TYPE_AT) * TYPE_CPS) / 30));
  const typed = TYPE.slice(0, n);
  const caret = f >= B13_CLICK + 3 && f < F_SEND && (n > 0 && n < TYPE.length ? true : Math.floor(f / 8) % 2 === 0); // berkedip saat diam, tetap saat mengetik
  const sent = prog(f, F_SEND, F_SEND + 4, 'out');
  // kursor (ukuran layar tetap, posisi mengikuti UI lewat kamera): masuk → klik kotak prompt → disembunyikan saat mengetik
  // (seperti macOS) → muncul lagi saat kamera mundur → tombol kirim, klik di F_SEND
  const clickW = { x: TEXT_X + 40, y: PROMPT_W.y + 8 };
  const slot = toScreen(pose, clickW.x, clickW.y);
  const send = toScreen(pose, SEND_W.x + 4, SEND_W.y + 8);
  const a1 = prog(f, F_B13_GPT, B13_CLICK - 1, 'out');
  const a2 = prog(f, B13_BACK[0] + 2, F_SEND - 1, 'inOut');
  const p1 = { x: lerp(1400, slot.x, a1), y: lerp(1010, slot.y, a1) };
  const cur = f < B13_BACK[0] ? p1 : { x: lerp(send.x + 260, send.x, a2), y: lerp(send.y + 160, send.y, a2) };
  const curOp = f < B13_BACK[0] ? 1 - prog(f, B13_CLICK + 4, B13_CLICK + 8, 'in') : prog(f, B13_BACK[0], B13_BACK[0] + 4, 'out');
  const click = f < F_SEND ? prog(f, B13_CLICK, B13_CLICK + 5, 'linear') * (f < B13_CLICK + 6 ? 1 : 0) : prog(f, F_SEND, F_SEND + 5, 'linear');
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <Stage pose={b13Cam}>
        <Layer z={0} name="L1-L2">
          <MacBack f={f} />
          <Dock chatgptRunning={1} />
          <GptWindow ui={{ history: 20, headerLogo: 1, typed, caret, send: sent }} />
          <MenuBar app="ChatGPT" time="10:25 PM" />
        </Layer>
      </Stage>
      {curOp > 0 ? <Cursor x={cur.x} y={cur.y} size={64} click={click} opacity={curOp} /> : null}
    </AbsoluteFill>
  );
};

// ======================= B14 · dinding bukti, satu gerak 7 dtk =======================
export const b14Cam = camPath([
  { f: F_B14[0], x: 600, y: 470, zoom: 1.3 },
  { f: 1240, x: 900, y: 490, zoom: 1.18, ease: 'inOut' },
  // r3a: pull mundur dimulai setelah frasa "…industri ini." (f1315, dulu f1300) supaya narasi B14-N2 tidak perlu
  // lantai 56 px pada zoom ±0,6 (yang membuatnya ±103 px dan keluar safe frame di awal)
  { f: 1315, x: 1300, y: 540, zoom: 1.02, ease: 'inOut' },
  { f: 1358, x: 1608, y: 875, zoom: 0.545, ease: 'inOut' },
  { f: F_B14[1], x: 1608, y: 875, zoom: 0.535, ease: 'smooth' }, // melambat lalu tahan
]);
const B14: React.FC = () => {
  const f = useCurrentFrame();
  const thread = prog(f, F_B14[0], 1358, 'smooth');
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
