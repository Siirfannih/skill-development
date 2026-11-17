// K07 · B3 · mode A→C · "template" dibalik jadi "workflow".
// Semua prop = frame absolut di linimasa tuan rumah; `mulai` = frame pertama komponen terlihat.
// Nama fase di rel = nama asli fase dari claude/motion-graphic/SKILL.md §4 tabel "Lima fase" (baris 126–132).
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, dur, exitDur, move, react, drift } from "../lib/curves";
import { BlurArah, lerp, sb, useHuruf } from "./K07/kit";

export type PropsK07 = { mulai: number; kTemplate: number; kBalik: number; kWorkflow: number };

const C = { kanvas: "#F6F5F0", panel: "#FFFFFF", garis: "#E4E2DA", tinta: "#1F2328", tinta2: "#6B6F76", coral: "#D93A3F", biru: "#2E5BFF" };
const FASE = ["Pra-produksi", "Spine suara", "Visual", "Audio", "Finishing"]; // SKILL.md baris 126–132
const LEBAR = [360, 335, 225, 214, 282]; // pil besar: teks 44 px, tinggi 100 px, rel ±86 % lebar frame
const GAP = 62;
const PILL_H = 100;
const RAIL_Y = 626; // ±58 % tinggi frame
const RAIL_TOTAL = LEBAR.reduce((a, b) => a + b, 0) + GAP * (LEBAR.length - 1);
const RAIL_KIRI = (1920 - RAIL_TOTAL) / 2;
const NODE_X0 = LEBAR.map((_, i) => RAIL_KIRI + LEBAR.slice(0, i).reduce((a, b) => a + b, 0) + GAP * i);
const NODE_CX = NODE_X0.map((x, i) => x + LEBAR[i] / 2);
const NODE_T = [16, 25, 35, 46, 58]; // frame masuk node relatif kWorkflow
const KARTU = { w: 640, h: 140, cx: 1380 };
const SHADOW = "0 24px 60px rgba(31,35,40,0.22), 0 6px 14px rgba(31,35,40,0.12)";

/** Hentak kamera: naik cepat (whip), lalu kembali pelan (heavy). */
const hentak = (f: number, t: number, amp: number) =>
  amp * move(f, t, 5, "whip") * (1 - move(f, t + 6, 26, "heavy"));

// Posisi kartu pada frame f (murni dari frame).
type Pose = { x: number; y: number; rot: number; s: number; op: number };
const poseKartu = (f: number, fps: number, i: 0 | 1, p: PropsK07): Pose => {
  const tujuan = i === 0 ? { x: KARTU.cx, y: 350, rot: -3 } : { x: KARTU.cx, y: 590, rot: 2.5 };
  const masuk = p.kTemplate + (i === 0 ? 0 : react(3, fps));
  const dMasuk = dur(300, fps, 1);
  const m = move(f, masuk, dMasuk, "land");
  let x = tujuan.x, y = lerp(tujuan.y - 300, tujuan.y, m), rot = lerp(tujuan.rot + (i === 0 ? -9 : 9), tujuan.rot, m);
  let s = lerp(0.92, 1, m);
  const op = f < masuk ? 0 : Math.min(1, (f - masuk) / 3);
  // lempar: antisipasi `wind` 4 f ke belakang, lalu `leave` ~10 f keluar frame
  const t0 = p.kBalik + react(i, fps);
  const w = move(f, t0, 4, "wind");
  const dl = exitDur(dMasuk + 2);
  const l = move(f, t0 + 4, dl, "leave");
  const arah = i === 0 ? { x: 1150, y: -760, r: -42 } : { x: 1050, y: 700, r: 46 };
  x += -34 * w * (i === 0 ? 1 : 1) + arah.x * l;
  y += (i === 0 ? 20 : -20) * w + arah.y * l;
  rot += (i === 0 ? 6 : -6) * w + arah.r * l;
  s *= 1 - 0.04 * w;
  return { x, y, rot, s, op };
};

const Kartu: React.FC<{ i: 0 | 1; label: string; p: PropsK07 }> = ({ i, label, p }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = poseKartu(f, fps, i, p);
  const b = poseKartu(f - 1, fps, i, p);
  if (a.op <= 0 || a.x > 3000) return null;
  const dx = a.x - b.x, dy = a.y - b.y;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, opacity: a.op }}>
      <div style={{ position: "absolute", left: a.x - KARTU.w / 2, top: a.y - KARTU.h / 2, transform: `rotate(${a.rot}deg) scale(${a.s})` }}>
        <BlurArah id={`k07-kartu-${i}`} dx={sb(dx)} dy={sb(dy)}>
          <div style={{ width: KARTU.w, height: KARTU.h, background: C.panel, borderRadius: 36, boxShadow: SHADOW, display: "flex", alignItems: "center", gap: 28, padding: "0 36px" }}>
            <div style={{ width: 76, height: 76, borderRadius: 20, background: C.kanvas, border: `2px solid ${C.garis}`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, padding: "0 16px", flex: "none" }}>
              <div style={{ height: 8, borderRadius: 4, background: C.tinta2, width: "100%" }} />
              <div style={{ height: 8, borderRadius: 4, background: C.garis, width: "70%" }} />
              <div style={{ height: 8, borderRadius: 4, background: C.garis, width: "85%" }} />
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 44, color: C.tinta, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{label}</div>
          </div>
        </BlurArah>
      </div>
    </div>
  );
};

/** Kata "template" + coretan coral. */
const KataTemplate: React.FC<{ p: PropsK07 }> = ({ p }) => {
  const f = useCurrentFrame();
  const t0 = p.kBalik + 6;
  const posisi = (ff: number) => { const m = move(ff, t0, 14, "land"); return { y: 24 * (1 - m), s: lerp(0.92, 1, m), op: ff < t0 ? 0 : Math.min(1, (ff - t0) / 3) }; };
  const a = posisi(f), b = posisi(f - 1);
  if (a.op <= 0) return null;
  const garis = move(f, p.kBalik + 22, 8, "whip"); // kiri→kanan 8 f, selesai di kBalik+30
  const lebar = 560;
  return (
    <div style={{ position: "absolute", left: KARTU.cx - 330, top: 450, width: 660, opacity: a.op, transform: `translateY(${a.y}px) scale(${a.s})` }}>
      <BlurArah id="k07-template" dx={0} dy={sb(a.y - b.y)}>
        <div style={{ position: "relative", height: 180, background: C.panel, borderRadius: 44, boxShadow: SHADOW, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 112, color: C.tinta, opacity: 1 - 0.3 * garis, letterSpacing: "-0.02em", lineHeight: 1 }}>template</span>
          {garis > 0 && <svg width={660} height={180} style={{ position: "absolute", left: 0, top: 0 }}>
            <line x1={660 / 2 - lebar / 2 - 6} y1={104} x2={660 / 2 - lebar / 2 - 6 + (lebar + 12) * garis} y2={84 + 20 * (1 - garis)} stroke={C.coral} strokeWidth={9} strokeLinecap="round" />
          </svg>}
        </div>
      </BlurArah>
    </div>
  );
};

const Rel: React.FC<{ p: PropsK07; tk: number }> = ({ p, tk }) => {
  const f = useCurrentFrame();
  const mulaiNode = NODE_T.map((n) => p.kWorkflow + n);
  const x0 = NODE_X0;
  return (
    <>
      {FASE.map((nama, i) => {
        const pos = (ff: number) => { const m = move(ff, mulaiNode[i], 12, "land"); return { y: 24 * (1 - m), s: lerp(0.92, 1, m), op: ff < mulaiNode[i] ? 0 : Math.min(1, (ff - mulaiNode[i]) / 3) }; };
        const a = pos(f), b = pos(f - 1);
        if (a.op <= 0) return null;
        return (
          <div key={nama} style={{ position: "absolute", left: x0[i], top: RAIL_Y - PILL_H / 2, width: LEBAR[i], height: PILL_H, opacity: a.op, transform: `translateY(${a.y}px) scale(${a.s})` }}>
            <BlurArah id={`k07-node-${i}`} dx={0} dy={sb(a.y - b.y)}>
              <div style={{ width: LEBAR[i], height: PILL_H, borderRadius: PILL_H / 2, background: C.panel, border: `3px solid ${C.tinta}`, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 10px 24px rgba(31,35,40,0.10)" }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, background: C.biru, flex: "none" }} />
                <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 44, color: C.tinta, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{nama}</span>
              </div>
            </BlurArah>
          </div>
        );
      })}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
        {FASE.slice(0, -1).map((_, i) => {
          const m = move(f, mulaiNode[i] + 8, 10, "heavy");
          if (m <= 0) return null;
          const xa = x0[i] + LEBAR[i] + 6, xb = x0[i + 1] - 6;
          const xe = lerp(xa, xb, m);
          return (
            <g key={i} stroke={C.tinta2} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none">
              <line x1={xa} y1={RAIL_Y} x2={xe} y2={RAIL_Y} />
              <path d={`M ${xe - 16} ${RAIL_Y - 15} L ${xe} ${RAIL_Y} L ${xe - 16} ${RAIL_Y + 15}`} opacity={m} />
            </g>
          );
        })}
      </svg>
      <Hero p={p} tk={tk} />
    </>
  );
};

const Hero: React.FC<{ p: PropsK07; tk: number }> = ({ p, tk }) => {
  const f = useCurrentFrame();
  const t0 = p.kWorkflow + 74;
  const pos = (ff: number) => { const m = move(ff, t0, 16, "land"); return { y: 48 * (1 - m), s: lerp(0.92, 1, m), op: ff < t0 ? 0 : Math.min(1, (ff - t0) / 3) }; };
  const a = pos(f), b = pos(f - 1);
  if (a.op <= 0) return null;
  return (
    <div style={{ position: "absolute", left: RAIL_KIRI - 8, top: 215, transformOrigin: "left center", opacity: a.op, transform: `translateY(${a.y}px) scale(${a.s * (1 + hentak(f, t0, 0.08))})` }}>
      <BlurArah id="k07-hero" dx={0} dy={sb(a.y - b.y)}>
        <span style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 260, color: C.biru, letterSpacing: "-0.035em", lineHeight: 1, display: "inline-block" }}>workflow</span>
      </BlurArah>
    </div>
  );
};

export const K07TemplateKeWorkflow: React.FC<PropsK07> = (p) => {
  useHuruf();
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < p.mulai) return null;

  // kamera lapisan overlay: push pelan + hentak di kata "template" (coretan)
  const tDorong = Math.max(0, f - p.kTemplate) / fps;
  const camO = 1 + 0.03 * tDorong + hentak(f, p.kBalik + 22, 0.12);
  const dO = drift(f, fps, 5, 2);

  // transisi dunia: kanvas masuk dari kanan (whip), tepi kiri bergerak
  const w = move(f, p.kWorkflow, 16, "whip");
  const wPrev = move(f - 1, p.kWorkflow, 16, "whip");
  const tepi = 100 * (1 - w);
  const tk = Math.max(0, f - p.kWorkflow) / fps;
  // kamera rel: truck pelan mengikuti node yang baru masuk (heavy, 1,0→1,12), lalu reveal-out ke seluruh rel saat "workflow" masuk
  const masukK = move(f, p.kWorkflow + 14, 56, "heavy");
  const keluarK = 1 - move(f, p.kWorkflow + 70, 22, "heavy");
  const a = masukK * keluarK;
  const camK = 1 + 0.12 * a;
  let fx = NODE_CX[0];
  for (let i = 1; i < NODE_CX.length; i++) fx += (NODE_CX[i] - NODE_CX[i - 1]) * move(f, p.kWorkflow + NODE_T[i], 12, "heavy");
  const fokusX = 960 + (fx - 960) * a, fokusY = 540 + (RAIL_Y - 540) * a;
  const dK = drift(f, fps, 4, 5);
  const adaKanvas = f >= p.kWorkflow;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {w < 1 && (
        <AbsoluteFill style={{ transform: `translate(${dO.x}px, ${dO.y}px) scale(${camO})`, transformOrigin: `${KARTU.cx}px 480px` }}>
          <Kartu i={0} label="Apple style" p={p} />
          <Kartu i={1} label="cinematic storytelling" p={p} />
          <KataTemplate p={p} />
        </AbsoluteFill>
      )}
      {adaKanvas && (
        <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${tepi}%)` }}>
          <AbsoluteFill style={{ background: C.kanvas }}>
            {/* blur gerak tepi: bayangan lembut di sisi kiri yang sedang bergerak */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60 + Math.abs(wPrev - w) * 900, background: "linear-gradient(90deg, rgba(31,35,40,0.10), rgba(31,35,40,0))", opacity: w < 1 ? 1 : 0 }} />
            <AbsoluteFill style={{ transform: `translate(${dK.x}px, ${dK.y}px) scale(${camK})`, transformOrigin: `${fokusX}px ${fokusY}px` }}>
              <Rel p={p} tk={tk} />
            </AbsoluteFill>
          </AbsoluteFill>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const objekK07 = (p: PropsK07): { nama: string; frame: number; peran: string }[] => {
  const out: { nama: string; frame: number; peran: string }[] = [
    { nama: "Apple style", frame: p.kTemplate, peran: "objek-mendarat" },
    { nama: "cinematic storytelling", frame: p.kTemplate + 7, peran: "objek-mendarat" },
    { nama: "Apple style", frame: p.kBalik + 4, peran: "lempar" },
    { nama: "cinematic storytelling", frame: p.kBalik + 6, peran: "lempar" },
    { nama: "template", frame: p.kBalik + 6, peran: "objek-mendarat" },
    { nama: "template dicoret", frame: p.kBalik + 22, peran: "putus" },
    { nama: "kanvas putih", frame: p.kWorkflow, peran: "transisi-dunia" },
  ];
  NODE_T.forEach((n, i) => out.push({ nama: FASE[i], frame: p.kWorkflow + n, peran: "objek-mendarat" }));
  out.push({ nama: "workflow", frame: p.kWorkflow + 74, peran: "kata-hero" });
  return out;
};
