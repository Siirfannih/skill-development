// Babak 3 · Belokan (B16–B22), Editor B (TASK r2b). PLAN.json + BRIEF.md; kiblat 55 (twist monokrom gelap), kartu 63 (UI sebagai tokoh).
// Latar gelap = DarkWall (gradien linear) atau UI gelap asli; teks #F4F5F7, aksen #6F8DFF; tanpa radial/vignette.
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage, Layer, Place } from '../engine/Stage';
import { camPath, Pose } from '../engine/camera';
import { TextBlocks, measure, tokIn } from '../engine/TextLayer';
import { Face } from '../engine/Face';
import { DarkWall } from '../engine/Surfaces';
import { Cursor } from '../engine/Cursor';
import { C, FONT, prog, lerp, clamp01, rand, EASE } from '../engine/theme';
import type { SceneEntry } from '../engine/scenes';
import type { Tok } from '../text/types';
import { ThreadsWindow, ThComposer, ThSaveDraftDialog, ThPost, ThProfile, ThComposeRow } from '../ui/Threads';
import { GhRepoPage, GhNewRepo, GhRepoCard, BrowserBar, GH } from '../ui/GitHub';
import REPOS from '../ui/repos.json'; // salinan assets/repos.json
import {
  TEXT_ACT3, B16_K3, B18_DAN, K3_POS,
  F_B16, F_B17, F_B18, F_B19, F_B19_CUT, F_B20, F_B21, F_B21_CUT, F_B22,
} from './Act3.text';

const txt = (...ids: string[]) => TEXT_ACT3.filter((b) => ids.includes(b.id));
const AVATAR = 'ui/avatar_siirfannih.jpg';
const OWNER = 'Siirfannih';
type Repo = [string, 'public' | 'private', string];
const REPO_LIST = REPOS as unknown as Repo[]; // urut pushed_at Nov 2025 → Nov 2026
const vis = (r: Repo) => (r[1] === 'public' ? 'Public' : 'Private') as 'Public' | 'Private';
/** draft yang tidak pernah diposting (kata dari ucapan B14; tampil sebagai isi UI, bukan lapisan narasi) */
const DRAFT_TEXT = 'Selama satu tahun aku mencoba untuk belajar';

// ============================================================================================
// K3 triad B16–B18: satu baris di pita atas, terkunci layar, bertahan melewati cut (kiblat 55 k3).
// Kepala "aku tidak" tetap; kata kunci di slot (lama naik keluar, baru masuk dari bawah);
// B18 kata pertama berganti "aku"→"dan" sesuai ucapan; "apapun." ikut bergeser mengikuti lebar slot.
// (Mesin K3 belum mendukung kata kepala yang berganti; lihat QUESTIONS Q-B01.)
// ============================================================================================
const DARK = { ink: C.inkDark, fresh: '#B9BEC8', accent: C.accentDark };

const KWord: React.FC<{ t: string; a: number; f: number; accent?: boolean; key3?: boolean; exitAt?: number }> = ({ t, a, f, accent, key3, exitAt }) => {
  const dur = key3 ? 5 : 6;
  const p = prog(f, a, a + dur, 'out');
  const e = exitAt !== undefined ? prog(f, exitAt - 4, exitAt, 'in') : 0;
  if (f < a - 1 || e >= 1) return null;
  const col = accent ? DARK.accent : key3 ? DARK.ink : lerpColor(f, a + 3, a + 11);
  const rise = key3 ? 0.42 * K3_POS.size * (1 - p) : 8 * (1 - p);
  return (
    <span
      style={{
        position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', color: col,
        opacity: Math.min(1, p * 1.6) * (1 - e),
        transform: `translateY(${rise - 0.42 * K3_POS.size * e}px)`,
        filter: (key3 ? 8 : 6) * (1 - p) + 8 * e > 0.05 ? `blur(${(key3 ? 8 : 6) * (1 - p) + 8 * e}px)` : undefined,
      }}
    >
      {t}
    </span>
  );
};
const hex = (h: string) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16));
const lerpColor = (f: number, a: number, b: number) => {
  const t = clamp01((f - a) / (b - a));
  const x = hex(DARK.fresh), y = hex(DARK.ink);
  return `rgb(${x.map((v, k) => Math.round(lerp(v, y[k], t))).join(',')})`;
};

const K3Triad: React.FC = () => {
  const f = useCurrentFrame();
  const b = B16_K3;
  const S = b.size;
  const m = (s: string) => measure(s, S);
  const sp = m(' ');
  const danTok = B18_DAN.lines[0][0];
  const danIn = tokIn(danTok);
  const keyIn = b.keys.map((k) => tokIn(k[0]));
  let cur = -1;
  keyIn.forEach((s, k) => { if (f >= s - 4) cur = k; });
  const kw = (k: number) => (k < 0 ? 0 : m(b.keys[k].map((t) => t.t).join(' ')));
  const slotW = cur < 0 ? 0 : lerp(kw(cur - 1), kw(cur), prog(f, keyIn[cur] - 4, keyIn[cur] + 5, 'out'));
  const w0 = lerp(m('aku'), m('dan'), prog(f, danIn - 4, danIn + 4, 'out'));
  const xTidak = w0 + sp;
  const xSlot = xTidak + m('tidak') + sp;
  const xTail = xSlot + slotW + (slotW > 0 ? sp : 0);
  const tail = b.tail as Tok[];
  const ex = b.exit === 'cut' ? 0 : prog(f, b.until - 5, b.until, 'in');
  if (f < tokIn(b.head[0]) - 2 || f >= b.until) return null;
  return (
    <div
      style={{
        position: 'absolute', left: K3_POS.x, top: K3_POS.y, height: S * 1.22, width: 1600,
        fontFamily: FONT.sf, fontWeight: 700, fontSize: S, lineHeight: 1.22, letterSpacing: '-0.02em',
        transform: `translateY(${-16 * ex}px)`, filter: ex > 0 ? `blur(${6 * ex}px)` : undefined, opacity: 1 - ex,
        textShadow: '0 2px 18px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0 }}>
        <KWord t="aku" a={tokIn(b.head[0])} f={f} exitAt={danIn} />
        <KWord t={danTok.t} a={danIn} f={f} key3 />
      </div>
      <div style={{ position: 'absolute', left: xTidak, top: 0 }}>
        <KWord t="tidak" a={tokIn(b.head[1])} f={f} />
      </div>
      <div style={{ position: 'absolute', left: xSlot, top: 0 }}>
        {b.keys.map((k, idx) => (
          <KWord key={idx} t={k.map((t) => t.t).join(' ')} a={keyIn[idx]} f={f} accent key3 exitAt={keyIn[idx + 1]} />
        ))}
      </div>
      <div style={{ position: 'absolute', left: xTail, top: 0, transition: 'none' }}>
        <KWord t={tail.map((t) => t.t).join(' ')} a={tokIn(tail[0])} f={f} />
      </div>
    </div>
  );
};

// ============================================================================================
// B16: wajah F1 gelap; wajah diturunkan (cy 470) supaya pita atas kosong untuk K3.
// ============================================================================================
const b16Cam = camPath([{ f: F_B16[0], zoom: 1 }, { f: F_B16[1], zoom: 1.04, ease: 'smooth' }], { sigma: 0 });
const B16: React.FC = () => (
  <Stage pose={b16Cam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F1" crop={{ cy: 470 }} grade="gelap" />
    </Layer>
  </Stage>
);

// ============================================================================================
// B17: Threads gelap. Composer berisi draft → kursor di Post (ragu, tidak diklik) → Cancel →
// "Save to drafts?" → Save → modal menyusut ke ikon Drafts di kepala kolom.
// ============================================================================================
const TW = { x: 210, y: 425, w: 1500, h: 900 }; // kepala kolom tersembunyi di balik modal (pita atas untuk K3)
const MODAL = { x: 568, y: 425, w: 785 };
const DIALOG = { x: 783, y: 418 };
const DRAFT_ICON = { x: 1230, y: 457 };
const P_POST = { x: 1292, y: 708 };
const P_CANCEL = { x: 626, y: 462 };
const P_SAVE = { x: 948, y: 594 };
const B17_CANCEL = 1536; // 51,2 dtk
const B17_SAVE = 1557; // 51,9 dtk

const b17Cam = camPath(
  [
    { f: F_B17[0], x: 968, y: 560, zoom: 1.85 },
    { f: 1528, x: 962, y: 560, zoom: 1.86, ease: 'smooth' },
    { f: B17_CANCEL, x: 905, y: 561, zoom: 1.86, ease: 'inOut' },
    { f: 1552, x: 960, y: 562, zoom: 1.85, ease: 'inOut' },
    { f: F_B17[1], x: 1090, y: 520, zoom: 1.36, ease: 'inOut' },
  ],
  { sigma: 1.5 },
);

const feedPosts = (mode: 'dark' | 'light', ui: number, colW: number) => (
  <>
    <ThComposeRow mode={mode} ui={ui} avatar={AVATAR} />
    <ThPost mode={mode} ui={ui} w={colW} user="buildinpublic.id" time="2h" media={<div style={{ height: 300 * ui, borderRadius: 8 * ui, background: '#1F1F1F' }} />} />
    <ThPost mode={mode} ui={ui} w={colW} user="growth.daily" time="5h" media={<div style={{ height: 220 * ui, borderRadius: 8 * ui, background: '#1F1F1F' }} />} />
  </>
);

const B17: React.FC = () => {
  const f = useCurrentFrame();
  // kursor: diam di atas Post (ragu, bergoyang), lalu ke Cancel, klik, lalu ke Save, klik
  const wob = f < 1528 ? Math.sin((f - F_B17[0]) * 1.7) * 2.2 : 0;
  const toCancel = prog(f, 1528, B17_CANCEL - 1, 'inOut');
  const toSave = prog(f, 1543, B17_SAVE - 3, 'inOut');
  const cx = lerp(lerp(P_POST.x + wob, P_CANCEL.x, toCancel), P_SAVE.x, toSave);
  const cy = lerp(lerp(P_POST.y, P_CANCEL.y, toCancel), P_SAVE.y, toSave);
  const clickC = f >= B17_CANCEL - 2 && f <= B17_CANCEL + 4 ? (f - (B17_CANCEL - 2)) / 6 : 0;
  const clickS = f >= B17_SAVE - 2 && f <= B17_SAVE + 4 ? (f - (B17_SAVE - 2)) / 6 : 0;
  const dlgIn = prog(f, B17_CANCEL + 1, B17_CANCEL + 8, 'out');
  const dlgOut = prog(f, B17_SAVE + 3, B17_SAVE + 7, 'in');
  // modal menyusut ke ikon Drafts
  const shrink = prog(f, B17_SAVE + 3, F_B17[1] - 2, 'in');
  const mcx = MODAL.x + MODAL.w / 2, mcy = 588;
  const sx = lerp(mcx, DRAFT_ICON.x, shrink), sy = lerp(mcy, DRAFT_ICON.y, shrink);
  const sc = lerp(1, 0.035, shrink);
  const scrim = 1 - prog(f, B17_SAVE + 6, F_B17[1], 'out');
  const pulse = prog(f, F_B17[1] - 4, F_B17[1], 'out');
  const curOut = prog(f, B17_SAVE + 4, B17_SAVE + 12, 'in');
  return (
    <Stage pose={b17Cam} bg={C.dark0}>
      <Layer z={-300} name="L1">
        <DarkWall />
      </Layer>
      <Layer z={0} name="L2">
        <div style={{ position: 'absolute', left: TW.x, top: TW.y }}>
          <ThreadsWindow
            mode="dark" ui={1} w={TW.w} h={TW.h} colW={640} header="For you"
            overlay={<div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${0.62 * scrim})` }} />}
          >
            {feedPosts('dark', 1, 640)}
          </ThreadsWindow>
        </div>
        {/* denyut di ikon Drafts saat modal mendarat */}
        {pulse > 0 ? (
          <div style={{ position: 'absolute', left: DRAFT_ICON.x - 22, top: DRAFT_ICON.y - 22, width: 44, height: 44, borderRadius: 12, boxShadow: `0 0 0 ${2 + 3 * (1 - pulse)}px rgba(111,141,255,${0.9 * pulse})` }} />
        ) : null}
        <div
          style={{
            position: 'absolute', left: sx - MODAL.w / 2, top: sy - 163, transformOrigin: '50% 50%',
            transform: `scale(${sc})`, opacity: shrink > 0.92 ? 1 - (shrink - 0.92) / 0.08 : 1,
          }}
        >
          <ThComposer
            mode="dark" ui={1} w={MODAL.w} user="siirfannih" avatar={AVATAR} text={DRAFT_TEXT}
            postHover={f < 1529 ? 1 : 0} cancelPress={clickC} dim={dlgIn * (1 - dlgOut)}
          />
        </div>
        {dlgIn > 0 && dlgOut < 1 ? (
          <div style={{ position: 'absolute', left: DIALOG.x, top: DIALOG.y, transform: `scale(${lerp(0.94, 1, dlgIn) * lerp(1, 0.97, dlgOut)})`, opacity: dlgIn * (1 - dlgOut) }}>
            <ThSaveDraftDialog mode="dark" ui={1} savePress={clickS} saveHover={toSave > 0.9 ? 1 : 0} />
          </div>
        ) : null}
        <Place x={0} y={0} z={2}>
          <Cursor x={cx} y={cy} size={40} click={Math.max(clickC, clickS)} opacity={1 - curOut} />
        </Place>
      </Layer>
    </Stage>
  );
};

// ============================================================================================
// B18: halaman repo GitHub gelap (Siirfannih/OtonomAgent) digulir ke kotak "Add a README";
// kursor mendekati tombol hijau lalu menjauh. Kamera push ke kotak README.
// ============================================================================================
const B18_REPO = REPO_LIST.find((r) => r[0] === 'OtonomAgent')!;
const GW = { x: 300, y: 330, w: 1330, h: 486 };
const GH_UI = 1.25;
const GH_SCROLL = 380; // awal; digulir ke GH_SCROLL1 (kotak README naik ke bawah bilah browser)
const GH_SCROLL1 = 603;
const README_BTN = { x: 1072, y: 724 };
const b18Cam = camPath(
  [
    { f: F_B18[0], x: 960, y: 553, zoom: 1.12, ry: 4 },
    { f: F_B18[1], x: 762, y: 486, zoom: 1.6, ry: 0, ease: 'inOut' },
  ],
  { sigma: 0 },
);
const B18: React.FC = () => {
  const f = useCurrentFrame();
  const scroll = lerp(GH_SCROLL, GH_SCROLL1, prog(f, F_B18[0] + 2, 1606, 'inOut'));
  const btnY = README_BTN.y - (scroll - GH_SCROLL);
  const near = prog(f, 1584, 1603, 'out');
  const away = prog(f, 1611, F_B18[1], 'inOut');
  const cx = lerp(lerp(README_BTN.x + 230, README_BTN.x + 10, near), README_BTN.x + 150, away);
  const cy = lerp(lerp(btnY + 210, btnY + 14, near), btnY + 150, away);
  const hover = near > 0.85 && away < 0.3 ? 1 : 0;
  return (
    <Stage pose={b18Cam} bg={C.dark0}>
      <Layer z={-300} name="L1">
        <DarkWall angle={170} />
      </Layer>
      <Layer z={0} name="L2">
        <div style={{ position: 'absolute', left: GW.x, top: GW.y, width: GW.w, height: GW.h, borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 90px rgba(0,0,0,0.6)', background: GH.canvas }}>
          <BrowserBar ui={1.15} w={GW.w} url={`/${OWNER}/${B18_REPO[0]}`} />
          <div style={{ position: 'absolute', left: 0, top: 44 * 1.15, width: GW.w, height: GW.h, overflow: 'hidden' }}>
            <div style={{ transform: `translateY(${-scroll}px)` }}>
              <GhRepoPage
                ui={GH_UI} w={GW.w} h={1400} owner={OWNER} repo={B18_REPO[0]} visibility={vis(B18_REPO)} avatar={AVATAR}
                readme="add" addHover={hover} when="7 months ago"
              />
            </div>
          </div>
        </div>
        <Place x={0} y={0} z={2}>
          <Cursor x={cx} y={cy} size={34} />
        </Place>
      </Layer>
    </Stage>
  );
};

// ============================================================================================
// B19: form "Create a new repository" gelap, nama repo nyata berikutnya (MemoryPC) diketik cepat,
// klik "Create repository"; teks di dinding kiri. Lalu wajah F1 + K4 "jadi / adiktif.".
// ============================================================================================
const B19_REPO = REPO_LIST.find((r) => r[0] === 'MemoryPC')!;
const NW = { x: 400, y: 0, w: 1300, h: 1320 };
const NEW_UI = 1.6;
const TYPE0 = 1638; // 54,6 dtk
const CREATE = 1686; // 56,2 dtk
const CREATE_BTN = { x: 1508, y: 1149 };
const b19Cam = camPath(
  [
    { f: F_B19[0], x: 1236, y: 470, zoom: 1.25, rz: -0.6 },
    { f: 1640, x: 1236, y: 489, zoom: 1.45, rz: 0, ease: 'out' },
    { f: 1666, x: 1240, y: 495, zoom: 1.47, ease: 'smooth' },
    { f: 1679, x: 1236, y: 1089, zoom: 1.45, ease: 'inOut' },
    { f: F_B19_CUT, x: 1238, y: 1095, zoom: 1.5, ease: 'smooth' },
  ],
  { sigma: 0 },
);
const B19Form: React.FC = () => {
  const f = useCurrentFrame();
  const name = B19_REPO[0];
  const n = Math.max(0, Math.min(name.length, Math.floor((f - TYPE0) / 2.2) + 1));
  const typed = f < TYPE0 ? '' : name.slice(0, n);
  const avail = f >= TYPE0 + name.length * 2.2 + 4;
  const cIn = prog(f, 1672, CREATE - 3, 'inOut');
  const cx = lerp(CREATE_BTN.x + 260, CREATE_BTN.x, cIn), cy = lerp(CREATE_BTN.y + 120, CREATE_BTN.y, cIn);
  const press = f >= CREATE - 2 && f <= CREATE + 5 ? (f - (CREATE - 2)) / 7 : 0;
  return (
    <Stage pose={b19Cam} bg={C.dark0}>
      <Layer z={-300} name="L1">
        <DarkWall angle={150} />
      </Layer>
      <Layer z={0} name="L2">
        <div style={{ position: 'absolute', left: NW.x, top: NW.y, width: NW.w, height: NW.h, borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 90px rgba(0,0,0,0.6)' }}>
          <BrowserBar ui={1.15} w={NW.w} url="/new" />
          <GhNewRepo ui={NEW_UI} w={NW.w} h={NW.h} owner={OWNER} name={typed} caret={f >= TYPE0 - 6 && f < CREATE} available={avail} avatar={AVATAR} createHover={cIn > 0.9 ? 1 : 0} createPress={press} />
        </div>
        {f >= 1672 ? (
          <Place x={0} y={0} z={2}>
            <Cursor x={cx} y={cy} size={40} click={press} />
          </Place>
        ) : null}
      </Layer>
      <Layer z={30} name="L3">
        <TextBlocks blocks={txt('B19-N1', 'B19-N2')} />
      </Layer>
    </Stage>
  );
};
const b19FaceCam = camPath([{ f: F_B19_CUT, zoom: 1 }, { f: F_B19[1], zoom: 1.05, ease: 'smooth' }], { sigma: 0 });
const B19Face: React.FC = () => (
  <Stage pose={b19FaceCam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F1" crop={{ cx: 780, cy: 540 }} grade="gelap" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B19-K4')} />
    </Layer>
  </Stage>
);

// ============================================================================================
// B20: halaman repo baru muncul satu per satu (nama nyata urut waktu, 0,5 → 0,13 dtk per repo),
// "No releases published" disorot; kartu lama terdorong ke belakang jadi tumpukan 3D miring.
// "gak pernah selesai" (63,04): semua membeku + guncang kecil. Kamera dolly mundur terus.
// ============================================================================================
const STACK = REPO_LIST.slice(REPO_LIST.findIndex((r) => r[0] === 'MemoryPC') + 1); // 19 repo, JadisatuDashboardnew → ops-report
const FREEZE = 1892; // 63,04 dtk
const ARRIVE: number[] = (() => {
  const n = STACK.length;
  const first = F_B20[0] - 4, last = FREEZE - 4; // kartu pertama sudah meluncur saat cut
  const r = Math.pow(4 / 15, 1 / (n - 2));
  const gaps = Array.from({ length: n - 1 }, (_, k) => 15 * Math.pow(r, k));
  const tot = gaps.reduce((a, b) => a + b, 0);
  const out = [first];
  gaps.forEach((g) => out.push(out[out.length - 1] + (g * (last - first)) / tot));
  return out;
})();
const CARD = { w: 960, h: 770, ui: 1.7, x: 1363, y: 540 }; // pusat slot depan
const STEP = { x: 26, y: -44, z: -56 };

const shakeAt = (f: number) => {
  const t = f - FREEZE;
  if (t < 0 || t > 8) return { x: 0, y: 0 };
  const a = 11 * (1 - t / 8);
  return { x: Math.sin(t * 2.7) * a, y: Math.cos(t * 3.3) * a * 0.6 };
};
const b20Base = camPath(
  [
    { f: F_B20[0], x: 1080, y: 540, zoom: 1.0, ry: -4 },
    { f: FREEZE, x: 1000, y: 608, zoom: 0.9, ry: -8, ease: 'smooth' },
    { f: F_B20[1], x: 1000, y: 609, zoom: 0.899, ry: -8, ease: 'out' },
  ],
  { sigma: 0 },
);
const b20Cam = (f: number): Pose => {
  const p = b20Base(Math.min(f, FREEZE));
  const s = shakeAt(f);
  return { ...p, x: p.x + s.x / p.zoom, y: p.y + s.y / p.zoom };
};

const B20: React.FC = () => {
  const fr0 = useCurrentFrame();
  const f = Math.min(fr0, FREEZE); // membeku
  const cards = STACK.map((r, k) => {
    const a = ARRIVE[k];
    if (f < a - 1) return null;
    const dur = Math.max(3, Math.min(9, (ARRIVE[k + 1] ?? a + 9) - a));
    const pIn = prog(f, a, a + dur, 'out');
    // kedalaman = jumlah kartu yang datang sesudahnya (pecahan saat animasi)
    let d = 0;
    for (let j = k + 1; j < STACK.length; j++) {
      const dj = Math.max(3, Math.min(9, (ARRIVE[j + 1] ?? ARRIVE[j] + 9) - ARRIVE[j]));
      d += prog(f, ARRIVE[j], ARRIVE[j] + dj, 'out');
    }
    const enterY = (1 - pIn) * 520;
    const x = CARD.x + STEP.x * d + (rand(k * 3.1) - 0.5) * 30 * Math.min(1, d);
    const y = CARD.y + STEP.y * d + enterY;
    const z = STEP.z * d + (1 - pIn) * 60;
    const rz = (rand(k * 7.7) - 0.5) * 7 * Math.min(1, d);
    const hi = d < 0.6 ? prog(f, a + 1, a + 4, 'out') : Math.max(0, 1 - d);
    const shade = Math.min(0.72, d * 0.085);
    const blur = (1 - pIn) * 7;
    return (
      <Place key={r[0]} x={x - CARD.w / 2} y={y - CARD.h / 2} w={CARD.w} h={CARD.h} z={z} rot={rz}>
        <div style={{ position: 'relative', width: CARD.w, height: CARD.h, opacity: Math.min(1, pIn * 2) * (d > 15 ? Math.max(0, 1 - (d - 15) / 3) : 1), filter: blur > 0.1 ? `blur(${blur}px)` : undefined, boxShadow: '0 30px 70px rgba(0,0,0,0.55)', borderRadius: 10 * CARD.ui }}>
          <GhRepoCard ui={CARD.ui} w={CARD.w} h={CARD.h} owner={OWNER} repo={r[0]} visibility={vis(r)} avatar={AVATAR} releasesHi={hi} />
          {shade > 0 ? <div style={{ position: 'absolute', inset: 0, borderRadius: 10 * CARD.ui, background: `rgba(5,8,16,${shade})` }} /> : null}
        </div>
      </Place>
    );
  });
  return (
    <Stage pose={b20Cam} bg={C.dark0}>
      <Layer z={-300} name="L1">
        <DarkWall angle={165} scale={4} />
      </Layer>
      <Layer z={0} name="L2">
        {cards}
      </Layer>
      <Layer z={30} name="L3">
        <TextBlocks blocks={txt('B20-K4', 'B20-N1', 'B20-N2', 'B20-N3')} />
      </Layer>
    </Stage>
  );
};

// ============================================================================================
// B21: pengakuan; F3 (wajah kiri, K4 kanan) lalu F1 (wajah bawah, K4 di pita atas). Grade gelap hangat.
// ============================================================================================
const b21aCam = camPath([{ f: F_B21[0], zoom: 1 }, { f: F_B21_CUT, zoom: 1.05, ease: 'smooth' }], { sigma: 0 });
const b21bCam = camPath([{ f: F_B21_CUT, zoom: 1.03 }, { f: F_B21[1], zoom: 1.08, ease: 'smooth' }], { sigma: 0 });
const B21a: React.FC = () => (
  <Stage pose={b21aCam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F3" crop={{ cx: 1250 }} grade="gelapHangat" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B21-K4a')} />
    </Layer>
  </Stage>
);
const B21b: React.FC = () => (
  <Stage pose={b21bCam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="F1" crop={{ s: 1.8, cy: 567, cx: 720 }} grade="gelapHangat" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B21-K4b')} />
    </Layer>
  </Stage>
);

// ============================================================================================
// B22: profil Threads gelap "No threads yet"; kamera mundur jauh, tumpukan draft (dari B17) mengelilingi.
// ============================================================================================
const PW = { x: 180, y: 200, w: 1560, h: 980 };
const P_UI = 1.2;
const b22Cam = camPath(
  [
    { f: F_B22[0], x: 1035, y: 386, zoom: 1.41 },
    { f: 2150, x: 1032, y: 390, zoom: 1.36, ease: 'smooth' },
    { f: 2196, x: 965, y: 470, zoom: 0.54, ease: 'inOut' },
    { f: F_B22[1], x: 955, y: 490, zoom: 0.44, ease: 'out' },
  ],
  { sigma: 3 },
);
// draft yang tak pernah diposting (dari B17) menumpuk jadi dua timbunan di kiri dan kanan profil
const DRAFTS = Array.from({ length: 30 }, (_, k) => {
  const left = k % 2 === 0;
  const n = Math.floor(k / 2);
  const r1 = rand(k * 4.3 + 1), r2 = rand(k * 9.1 + 2), r3 = rand(k * 2.7 + 5);
  const x = (left ? -720 : 1790) + (r1 - 0.5) * 160;
  const y = 980 - n * 46 + (r2 - 0.5) * 50;
  return { x, y, rot: (r3 - 0.5) * 26, z: -80 + n * 14, s: 1.0 };
});
// dua draft dekat lensa (L4, buram) memberi kedalaman saat kamera mundur
const NEAR = [
  { x: -1150, y: -380, rot: -14 },
  { x: 2350, y: 1350, rot: 11 },
];
const B22: React.FC = () => (
  <Stage pose={b22Cam} bg={C.dark0}>
    <Layer z={-400} name="L1">
      <DarkWall angle={160} scale={7} />
    </Layer>
    <Layer z={0} name="L2">
      {DRAFTS.map((d, k) => (
        <Place key={k} x={d.x} y={d.y} z={d.z} rot={d.rot} scale={d.s} origin="0 0">
          <div style={{ opacity: 0.9 }}>
            <ThComposer mode="dark" ui={1} w={785} user="siirfannih" avatar={AVATAR} text={DRAFT_TEXT} dim={0.25} />
          </div>
        </Place>
      ))}
      <div style={{ position: 'absolute', left: PW.x, top: PW.y }}>
        <ThreadsWindow mode="dark" ui={P_UI} w={PW.w} h={PW.h} colW={768} header="Profile" active="profile">
          <ThProfile mode="dark" ui={P_UI} w={768} name="I Gede Irfan" handle="siirfannih" avatar={AVATAR} empty="No threads yet" emptyPad={14} />
        </ThreadsWindow>
      </div>
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B22-N1', 'B22-N2')} />
    </Layer>
    <Layer z={320} blur={5} name="L4">
      {NEAR.map((d, k) => (
        <Place key={k} x={d.x} y={d.y} rot={d.rot} origin="0 0">
          <ThComposer mode="dark" ui={1} w={785} user="siirfannih" avatar={AVATAR} text={DRAFT_TEXT} dim={0.4} />
        </Place>
      ))}
    </Layer>
  </Stage>
);

const K3Over: React.FC = () => <K3Triad />;

export const ACT3: SceneEntry[] = [
  { id: 'S-B16', beats: 'B16', from: F_B16[0], to: F_B16[1], Comp: B16 },
  { id: 'S-B17', beats: 'B17', from: F_B17[0], to: F_B17[1], Comp: B17 },
  { id: 'S-B18', beats: 'B18', from: F_B18[0], to: F_B18[1], Comp: B18 },
  { id: 'S-B19a', beats: 'B19', from: F_B19[0], to: F_B19_CUT, Comp: B19Form },
  { id: 'S-B19b', beats: 'B19', from: F_B19_CUT, to: F_B19[1], Comp: B19Face },
  { id: 'S-B20', beats: 'B20', from: F_B20[0], to: F_B20[1], Comp: B20 },
  { id: 'S-B21a', beats: 'B21', from: F_B21[0], to: F_B21_CUT, Comp: B21a },
  { id: 'S-B21b', beats: 'B21', from: F_B21_CUT, to: F_B21[1], Comp: B21b },
  { id: 'S-B22', beats: 'B22', from: F_B22[0], to: F_B22[1], Comp: B22 },
  // K3 triad terkunci layar, bertahan melewati cut B16→B17→B18 (kiblat 55 k3)
  { id: 'T-B16-18-K3', beats: 'B16–B18', from: F_B16[0], to: B16_K3.until, Comp: K3Over, over: true },
];
