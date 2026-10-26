import React from "react";
import { OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Abs, C, Cam, MB, Rise, eIn, eIO, eOut, k, kk, rnd, wf, Vignette } from "./lib";
import { CH, Dot, Tag, X, Y, areaOf, kemampuan, pathOf, selera } from "./Chart";
import { ChatGPTApp, RMsg } from "./RealUI";
import { DESIGNS, Fit, KopiLanding } from "./Designs";

const TILE_ORDER = ["landing", "poster", "app", "deck", "ig", "store", "reel", "plan", "cv"];
export const Tile: React.FC<{ i: number; w: number; h: number }> = ({ i, w, h }) => {
  const d = DESIGNS.find((x) => x.id === TILE_ORDER[i % TILE_ORDER.length])!;
  return (
    <Fit w={w} h={h} nw={d.nw} nh={d.nh} radius={16} shadow>
      <d.C />
    </Fit>
  );
};

// S2 v7 — text and visual take turns (Irfan 26 Okt):
//  A  chart, camera tracks the works along the time axis (visual leads, no headline)
//  B  full-bleed footage + one anchor word "kecewa" (Emotion ref), then white beat "tanda taste-mu sedang bekerja."
//  C1 AI chat: prompt typed → workflow steps → result in "3 detik" → results multiply (apapun)
//  C2 black chart: taste grows, then stops dead (berhenti)
export const S2_START = () => wf("c02", "Bertahun");
export const S2_END = () => wf("c04", "Faktanya");

const WORKS = [0.14, 0.24, 0.34, 0.45, 0.56, 0.68, 0.8];

export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const fB = wf("c02", "Bertahun");
  const fKarya = wf("c02", "karyamu");
  const fMeng = wf("c02", "mengecewakan");
  const fDan = wf("c02", "Dan");
  const fSek = wf("c03", "Sekarang");
  const fDan2 = wf("c03", "Dan");

  if (f < fDan) return <PartA f={f} fB={fB} fKarya={fKarya} fMeng={fMeng} fDan={fDan} />;
  if (f < fSek) return <Grid />;
  if (f < fDan2) return <Chat f={f} />;
  return <TasteStops f={f} />;
};

const PartA: React.FC<{ f: number; fB: number; fKarya: number; fMeng: number; fDan: number }> = ({ f, fB, fKarya, fMeng, fDan }) => {
  // camera follows the newest work along the time axis, then pulls back to show every gap
  const worksTo = fMeng + 6;
  const idx = k(f, [fKarya, worksTo], [0, WORKS.length - 1], (t) => t);
  const tFocus = WORKS[0] + (WORKS[WORKS.length - 1] - WORKS[0]) * (idx / (WORKS.length - 1));
  const pull = k(f, [fMeng + 8, fDan - 4], [0, 1], eIO);
  const s = 1.7 - 0.7 * pull;
  const fx = X(tFocus) * (1 - pull) + 960 * pull;
  const fy = Y((kemampuan(tFocus) + selera(tFocus)) / 2) * (1 - pull) + 560 * pull;
  const land = k(f, [fB, fB + 10], [1, 0], eOut);
  return (
    <Cam bg={C.black} x={(960 - fx) * (s - 1) + 1400 * land} y={(540 - fy) * (s - 1)} s={s}>
      <Vignette dark />
      <MB id="s2a" vx={1400 * (land - k(f - 1, [fB, fB + 10], [1, 0], eOut))} max={14}>
        <div style={{ position: "absolute", inset: 0 }}>
          <ChartBase f={f} worksFrom={fKarya} worksTo={worksTo} flashAt={fMeng + 4} labels={pull > 0.6} />
          {pull > 0.6 && <Tag x={CH.x1} y={CH.yb + 30} text="BERTAHUN-TAHUN →" at={fMeng + 14} align="r" dy={0} color={C.dim} />}
        </div>
      </MB>
    </Cam>
  );
};

const Chat: React.FC<{ f: number }> = ({ f }) => {
  // Real ChatGPT UI (Irfan 14:06): prompt typed in the real composer, "Thought for 3s", landing page appears.
  const fSek = wf("c03", "Sekarang");
  const fMenutup = wf("c03", "menutup");
  const fTiga = wf("c03", "tiga");
  const fDetik = wf("c03", "detik");
  const fKamu = wf("c03", "Kamu");
  const fBangun = wf("c03", "bangun");
  const fDan2 = wf("c03", "Dan");
  const prompt = "buatkan landing page untuk kedai kopiku";
  const sendAt = fMenutup + 2;
  const thinkEnd = fTiga - 12;
  const msgs: RMsg[] = [
    { role: "user", text: prompt, at: sendAt },
    { role: "ai", text: "Siap. Ini landing page untuk Kopi Senja: hero, menu, dan tombol pesan.", at: sendAt + 3, think: thinkEnd - sendAt - 3, cps: 5, note: "Berpikir selama 3 detik", noteAt: thinkEnd, attach: <Fit w={560} h={350} nw={1440} nh={900} radius={14} shadow><KopiLanding /></Fit>, attachAt: fTiga },
  ];
  const APP_S = 1.12;
  const scr = (nx: number, ny: number) => [960 + (nx - 720) * APP_S, 540 + (ny - 450) * APP_S];
  const KF: [number, number, number, number][] = [
    [fSek, ...scr(850, 440), 2.1] as [number, number, number, number],
    [sendAt - 1, ...scr(850, 455), 2.1] as [number, number, number, number],
    [sendAt, ...scr(850, 650), 1.75] as [number, number, number, number],
    [fTiga - 2, ...scr(850, 640), 1.75] as [number, number, number, number],
    [fDetik + 2, ...scr(820, 600), 1.65] as [number, number, number, number],
    [fKamu, ...scr(820, 610), 1.7] as [number, number, number, number],
    [fKamu + 16, 960, 540, 0.62],
    [fDan2, 960, 540, 0.58],
  ];
  const cam = (ff: number) => {
    const fx = kk(ff, KF.map((q) => [q[0], q[1]] as [number, number]), eIO);
    const fy = kk(ff, KF.map((q) => [q[0], q[2]] as [number, number]), eIO);
    const sc = kk(ff, KF.map((q) => [q[0], q[3]] as [number, number]), eIO);
    const land = k(ff, [fSek, fSek + 10], [1, 0], eOut);
    return { x: (960 - fx) * sc + 1700 * land, y: (540 - fy) * sc, s: sc };
  };
  const c0 = cam(f);
  const c1 = cam(f - 1);
  const grid = f >= fBangun - 2;
  return (
    <Cam bg={C.g4} x={c0.x} y={c0.y} s={c0.s}>
      <MB id="chat" vx={(c0.x - c1.x) / c0.s} vy={(c0.y - c1.y) / c0.s} max={14}>
        <div style={{ position: "absolute", inset: 0 }}>
          {grid &&
            Array.from({ length: 28 }, (_, i) => {
              const col = i % 7;
              const row = Math.floor(i / 7);
              if (row >= 1 && row <= 2 && col >= 2 && col <= 4) return null;
              const at = fBangun + Math.floor(rnd(i) * 26);
              const x = 960 + (col - 3) * 440 - 170;
              const y = 540 + (row - 1.5) * 330 - 125;
              return (
                <Abs key={i} style={{ left: x, top: y, opacity: k(f, [at, at + 8], [0, 1]), scale: String(k(f, [at, at + 12], [0.9, 1], eOut)), filter: `blur(${col === 0 || col === 6 ? 7 : row === 0 || row === 3 ? 3 : 0}px)` }}>
                  <Tile i={i} w={340} h={250} />
                </Abs>
              );
            })}
          <Abs style={{ left: 960, top: 540, translate: "-50% -50%", scale: String(APP_S) }}>
            <ChatGPTApp f={f} msgs={msgs} typing={{ text: prompt, from: fSek + 3, to: fMenutup - 3, sendAt }} />
          </Abs>
        </div>
      </MB>
    </Cam>
  );
};

const TasteStops: React.FC<{ f: number }> = ({ f }) => {
  const fDan2 = wf("c03", "Dan");
  const fTastemu = wf("c03", "taste");
  const fBerhenti = wf("c03", "berhenti");
  const fEnd = S2_END();
  const taste = (t: number) => 0.06 + 0.82 * (1 - Math.exp(-t * 1.6)) / (1 - Math.exp(-1.6));
  const tS = 0.62;
  const LX = (t: number) => 420 + 1000 * t;
  const LY = (v: number) => 860 - 600 * v;
  const lpath = (fn: (t: number) => number, a: number, b2: number, n: number) => Array.from({ length: n + 1 }, (_, i) => { const t = a + ((b2 - a) * i) / n; return `${i ? "L" : "M"}${LX(t).toFixed(1)},${LY(fn(t)).toFixed(1)}`; }).join(" ");
  const grow = k(f, [fDan2, fBerhenti], [0, tS], (t) => t);
  const stopped = f >= fBerhenti;
  const flatTo = stopped ? tS + (1 - tS) * k(f, [fBerhenti, fBerhenti + 16], [0, 1], eOut) : grow;
  const expectT = tS + (1 - tS) * k(f, [fBerhenti + 4, fBerhenti + 22], [0, 1], eIO);
  const headX = LX(stopped ? flatTo : grow);
  const headY = LY(taste(Math.min(grow, tS)));
  // Irfan 15:49: close on the moving dot + label while taste grows; the negative hit on "berhenti" is a hard cut
  // back to the wide view, so the stop lands as a break.
  const close = f < fBerhenti;
  const sW = 1 + 0.08 * k(f, [fBerhenti, fEnd], [0, 1], eIO);
  const s = close ? 2.5 : sW;
  const fxC = headX + 90;
  const fyC = headY;
  const camX = close ? (960 - fxC) * s : (960 - LX(tS)) * (s - 1);
  const camY = close ? (540 - fyC) * s : (540 - LY(taste(tS))) * (s - 1);
  return (
    <Cam bg={C.black} s={s} x={camX} y={camY}>
      <Vignette dark />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <line x1={LX(0)} y1={LY(0)} x2={LX(1) + 60} y2={LY(0)} stroke={C.faint} strokeWidth={2} />
        <line x1={LX(0)} y1={LY(0)} x2={LX(0)} y2={LY(1)} stroke={C.faint} strokeWidth={2} />
        {stopped && <path d={lpath(taste, tS, expectT, 30)} fill="none" stroke={C.dim} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />}
        <path d={lpath(taste, 0, Math.max(0.001, Math.min(grow, tS)), 60)} fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" />
        {stopped && <line x1={LX(tS)} x2={LX(flatTo)} y1={LY(taste(tS))} y2={LY(taste(tS))} stroke={C.white} strokeWidth={5} strokeLinecap="round" />}
        <Dot x={headX} y={headY} s={stopped ? k(f, [fBerhenti, fBerhenti + 6], [1.8, 1], eOut) : 1} />
      </svg>
      <Tag x={headX + 30} y={headY} text="TASTE" at={fTastemu} dy={-26} size={44} />
    </Cam>
  );
};

/** selera + kemampuan + works (each work = a dot on kemampuan with a dashed drop up to selera = kecewa) */
const ChartBase: React.FC<{ f: number; worksFrom: number; worksTo: number; flashAt: number; dimWorks?: boolean; labels?: boolean }> = ({ f, worksFrom, worksTo, flashAt, dimWorks, labels = true }) => {
  const flash = flashAt > 0 ? k(f, [flashAt, flashAt + 4], [0, 1]) - k(f, [flashAt + 4, flashAt + 16], [0, 1]) : 0;
  return (
    <>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <defs>
          <pattern id="hatch2" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="#FFFFFF" strokeWidth="2" opacity="0.13" />
          </pattern>
        </defs>
        <line x1={CH.x0} y1={CH.yb} x2={CH.x1 + 80} y2={CH.yb} stroke={C.faint} strokeWidth={2} />
        <line x1={CH.x0} y1={CH.yb} x2={CH.x0} y2={CH.yt - 60} stroke={C.faint} strokeWidth={2} />
        <path d={areaOf(selera, kemampuan, 0.04, 1)} fill="url(#hatch2)" />
        <path d={pathOf(selera, 0, 1)} fill="none" stroke={C.white} strokeWidth={4} strokeLinecap="round" />
        <path d={pathOf(kemampuan, 0, 1)} fill="none" stroke={C.dim} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
        <Dot x={X(1)} y={Y(selera(1))} />
        {WORKS.map((t, i) => {
          const at = dimWorks ? -100 : worksFrom + Math.round(((worksTo - worksFrom) * i) / (WORKS.length - 1));
          const p = k(f, [at, at + 6], [0, 1], eOut);
          if (f < at) return null;
          const y0 = Y(kemampuan(t));
          const y1 = Y(selera(t));
          return (
            <g key={i}>
              <line x1={X(t)} x2={X(t)} y1={y0 - 12} y2={y0 - 12 + (y1 - y0 + 24) * p} stroke="#FFFFFF" strokeWidth={2} strokeDasharray="3 8" opacity={dimWorks ? 0 : 0.55 + 0.45 * flash} />
              <circle cx={X(t)} cy={y0} r={9 * (0.4 + 0.6 * p)} fill={C.white} opacity={dimWorks ? 0.6 : 1} />
            </g>
          );
        })}
      </svg>
      {labels && <Tag x={X(1) + 6} y={Y(selera(1))} text="SELERA" at={-20} align="r" />}
      {labels && <Tag x={X(1) + 6} y={Y(kemampuan(1))} text="KEMAMPUAN" at={-20} align="r" color={C.dim} />}
    </>
  );
};

// ---- part B: word grid + human footage (white)
const Clip: React.FC<{ src: string; at: number; w?: number; h?: number }> = ({ src, at, w = 400, h = 260 }) => {
  const f = useCurrentFrame();
  const pop = k(f, [at, at + 10], [0, 1], eOut);
  const soft = k(f, [wf("c02", "bekerja") + 8, wf("c02", "bekerja") + 18], [0, 1], eIO);
  return (
    <div data-subject="1" style={{ width: w, height: h, borderRadius: 32, overflow: "hidden", background: C.g4, scale: String(0.85 + 0.15 * pop), opacity: pop > 0 ? 1 - 0.4 * soft : 0, filter: soft > 0 ? `blur(${4 * soft}px)` : undefined, flexShrink: 0 }}>
      <Sequence from={at} layout="none">
        <OffthreadVideo src={staticFile(src)} muted style={{ width: w, height: h, objectFit: "cover" }} />
      </Sequence>
    </div>
  );
};

const Grid: React.FC = () => {
  const f = useCurrentFrame();
  const fDan = wf("c02", "Dan");
  const fRasa = wf("c02", "rasa");
  const fKec = wf("c02", "kecewa");
  const fItu = wf("c02", "itu");
  const fTanda = wf("c02", "tanda");
  const fTaste = wf("c02", "taste");
  const fSedang = wf("c02", "sedang");
  const fBekerja = wf("c02", "bekerja");
  const fSek = wf("c03", "Sekarang");
  const S = 100;
  const W = (t: string, at: number, color: string = C.ink) => <Rise text={t} at={at} size={S} weight={600} color={color} letterSpacing="-0.04em" />;
  const row = (y: number, kids: React.ReactNode) => (
    <Abs style={{ left: 0, width: 1920, top: y, display: "flex", justifyContent: "center", alignItems: "center", gap: 34 }}>{kids}</Abs>
  );
  // Irfan 14:06: start close on "Dan", slide along "rasa · kecewa · itu · tanda", then pull out to the whole sentence.
  const cam = (ff: number) => {
    // v11: camera arrives on each word at its VO onset and HOLDS until the next word is spoken (never leaves early)
    const KF: [number, number, number, number][] = [
      // frame, focusX, focusY, scale
      [fDan - 1, 470, 262, 2.5],
      [fRasa - 5, 470, 262, 2.5],
      [fRasa + 1, 700, 262, 2.3],
      [fKec - 5, 700, 262, 2.3],
      [fKec + 2, 1330, 262, 2.0],
      [fItu - 6, 1330, 262, 2.0],
      [fItu + 1, 450, 540, 2.1],
      [fTanda - 6, 450, 540, 2.1],
      [fTanda + 1, 1042, 540, 1.95],
      [fTaste - 6, 1060, 540, 1.95],
      [fTaste + 1, 520, 815, 1.75],
      [fSedang - 6, 540, 815, 1.75],
      [fSedang + 2, 1200, 805, 1.58],
      [fBekerja + 8, 1210, 805, 1.58],
      [fBekerja + 20, 960, 540, 1.0],
      [fSek, 960, 540, 1.03],
    ];
    const fx = kk(ff, KF.map((q) => [q[0], q[1]] as [number, number]), eIO);
    const fy = kk(ff, KF.map((q) => [q[0], q[2]] as [number, number]), eIO);
    const sc = kk(ff, KF.map((q) => [q[0], q[3]] as [number, number]), eIO);
    const out = k(ff, [fSek - 9, fSek], [0, 1], eIn);
    return { x: (960 - fx) * sc, y: (540 - fy) * sc - 1100 * out, s: sc };
  };
  const c0 = cam(f);
  const c1 = cam(f - 1);
  return (
    <Cam bg={C.white} x={c0.x} y={c0.y} s={c0.s}>
      <MB id="grid" vx={(c0.x - c1.x) / c0.s} vy={(c0.y - c1.y) / c0.s} max={1.2}>
        <div style={{ position: "absolute", inset: 0 }}>
          {row(160, <>{W("Dan", fDan)}{W("rasa", fRasa)}<Clip src="assets/clip_a.mp4" at={fDan + 2} w={330} h={210} />{W("kecewa", fKec)}</>)}
          {row(435, <>{W("itu", fItu)}<Clip src="assets/clip_b.mp4" at={fItu - 2} w={330} h={210} />{W("tanda", fTanda)}<Clip src="assets/clip_c.mp4" at={fTanda + 4} w={330} h={210} /></>)}
          {row(710, <><div style={{ display: "inline-flex", padding: "0 30px", borderRadius: 999, background: C.blue }}><Rise text="taste-mu" at={fTaste} size={S} weight={600} color={C.white} letterSpacing="-0.04em" /></div><Clip src="assets/clip_d.mp4" at={fTaste + 4} w={330} h={210} />{W("sedang", fSedang)}{W("bekerja.", fBekerja)}</>)}
        </div>
      </MB>
    </Cam>
  );
};
