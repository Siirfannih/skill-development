// 02c · «AI akan mengambil pekerjaan yang membosankan dan berulang» — tanpa teks layar.
// Kursor berlabel AI (aktor: jalur melengkung, melambat sebelum klik) menyeret kartu tugas teratas ke Trash di dock.
// Tiap kartu masuk Trash tepat di micro_tick mix (26.03 / 27.05 / 28.07). Tumpukan terus terisi ulang dengan tugas
// yang sama (berulang). Kamera C18 mengikuti kursor dengan lag. Keluar X07: cut saat kursor melesat ke kartu berikut.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { EZ, keys, prog, Scene, useT, Grain } from "../lib/anim";
import { panel, word } from "../lib/time";
const W_BERULANG = word("berulang", "s2", 1);
const P02C = panel("02c");
import { C } from "./_b2_shared";
import cues from "../../public/data/cues11.json";

const TICKS = (cues as any[]).filter((c) => c.panel === "02c" && c.role === "micro_tick").map((c) => c.t as number).sort((a, b) => a - b);

// ── tata letak dunia (1920×1080)
const CARD = { w: 680, h: 152, x: 300, y0: 150, gap: 28 };
const slotY = (i: number) => CARD.y0 + i * (CARD.h + CARD.gap);
const DOCK = { x: 1150, y: 800, w: 520, h: 144 };
const TRASH = { x: DOCK.x + DOCK.w - 28 - 104, y: DOCK.y + 20, s: 104 }; // ubin Trash
const TRASH_C = { x: TRASH.x + TRASH.s / 2, y: TRASH.y + TRASH.s / 2 };
const GRAB = { dx: 470, dy: 96 }; // titik pegang di kartu (relatif kiri atas)

type Task = { name: string; icon: "grid" | "mail" | "db" | "doc" };
const TASKS: Task[] = [
  { name: "Rekap penjualan.xlsx", icon: "grid" },
  { name: "Balas email pelanggan", icon: "mail" },
  { name: "Input data pesanan", icon: "db" },
  { name: "Invoice Oktober.pdf", icon: "doc" },
];
const QUEUE = Array.from({ length: 8 }, (_, i) => TASKS[i % TASKS.length]);

// ── jadwal per kartu: kursor menuju kartu → klik → seret → lepas di atas Trash → kartu masuk tepat di tick
const DROP = 0.13; // kartu jatuh ke Trash setelah dilepas
const plan = TICKS.map((tk, i) => {
  const inT = tk; // kartu lenyap ke Trash
  const release = inT - DROP;
  // kartu #1: kursor sudah di kartu saat «AI» terucap, klik di frame pertama yang terlihat
  const grab = i === 0 ? P02C.start + 0.07 : release - 0.42;
  return { grab, release, inT };
});

const Icon: React.FC<{ k: Task["icon"] }> = ({ k }) => (
  <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {k === "grid" && (<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>)}
    {k === "mail" && (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>)}
    {k === "db" && (<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>)}
    {k === "doc" && (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>)}
  </svg>
);

const Card: React.FC<{ task: Task; lift?: number; style?: React.CSSProperties }> = ({ task, lift = 0, style }) => (
  <div
    style={{
      position: "absolute", width: CARD.w, height: CARD.h, display: "flex", alignItems: "center", gap: 28, padding: "0 40px",
      boxSizing: "border-box", borderRadius: 32, background: lift > 0 ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.72)",
      border: "2px solid #fff",
      boxShadow: `0px ${28 + 24 * lift}px ${68 + 32 * lift}px rgba(29,54,235,${0.1 + 0.08 * lift})`,
      fontFamily: "Inter", fontWeight: 600, fontSize: 36, color: C.ink, whiteSpace: "nowrap",
      ...style,
    }}
  >
    <Icon k={task.icon} />
    {task.name}
  </div>
);

/** Kurva kuadrat a→b dengan lengkung tegak lurus (gerak tangan), progres u 0..1. */
const arc = (a: { x: number; y: number }, b: { x: number; y: number }, u: number, bend: number) => {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend, cy = my + (dx / len) * bend;
  const v = 1 - u;
  return { x: v * v * a.x + 2 * v * u * cx + u * u * b.x, y: v * v * a.y + 2 * v * u * cy + u * u * b.y };
};

const grabPt = () => ({ x: CARD.x + GRAB.dx, y: slotY(0) + GRAB.dy });
const overTrash = { x: TRASH_C.x + 6, y: TRASH_C.y - 34 };

/** Posisi kursor (dunia) pada detik t. */
const cursorAt = (t: number, t0: number, tEnd: number) => {
  const g = grabPt();
  // 1) menuju kartu #1
  if (t < plan[0].grab) {
    // mendarat di kartu (sisa gerak pendek dari kanan bawah)
    const u = prog(t, t0 - 0.3, plan[0].grab - 0.02, EZ.inOut);
    return { ...arc({ x: g.x + 140, y: g.y + 90 }, g, u, -30), press: 0 };
  }
  for (let i = 0; i < plan.length; i++) {
    const P = plan[i];
    if (t < P.release) {
      // klik (tekan) lalu seret melengkung, melambat di atas Trash
      const u = prog(t, P.grab + 0.06, P.release - 0.02, EZ.inOut);
      return { ...arc(g, overTrash, u, 150), press: 1 };
    }
    const next = plan[i + 1];
    const backEnd = next ? next.grab - 0.03 : tEnd + 0.25;
    if (!next || t < next.grab) {
      // lepas, lalu kembali ke tumpukan (kartu baru sudah naik ke slot teratas)
      const u = prog(t, P.release + 0.06, backEnd, next ? EZ.inOut : EZ.acc);
      return { ...arc(overTrash, g, u, -160), press: t < P.release + 0.05 ? 1 : 0 };
    }
  }
  return { ...g, press: 0 };
};

export const S02c_TugasKeTrash: React.FC = () => {
  const t = useT();
  const p = panel("02c");
  const cur = cursorAt(t, p.start, p.end);
  const lag = cursorAt(t - 0.14, p.start, p.end);
  // kamera C18: ikut kursor 60 %, dijepit supaya tumpukan dan dock tetap di bingkai
  // C02 push pelan 1,08→1,16 sepanjang tumpukan (tugas makin menumpuk) + C01 di «berulang» (+5 %, 18 f)
  const Z = keys(t, [[p.start, 1.08], [p.end, 1.16]], EZ.inOut) * (1 + 0.05 * prog(t, W_BERULANG.s, W_BERULANG.s + 18 / 30, EZ.out));
  const cl = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const hw = 960 / Z - 40, hh = 540 / Z - 40;
  const tx = cl(960 + (lag.x - 960) * 0.6, DOCK.x + DOCK.w + 20 - hw, CARD.x - 20 + hw);
  const ty = cl(540 + (lag.y - 540) * 0.6, DOCK.y + DOCK.h + 20 - hh, CARD.y0 - 20 + hh);
  // jumlah kartu sudah diambil (pindah slot)
  const taken = plan.filter((P) => t >= P.grab).length;
  // geser naik tumpukan setelah kartu teratas diangkat
  const shift = plan.reduce((acc, P) => acc + prog(t, P.grab + 0.04, P.grab + 0.34, EZ.out), 0);
  // ketukan tekan pada kursor
  const clickPulse = plan.reduce((acc, P) => acc + Math.max(0, 1 - Math.abs(t - (P.grab + 0.03)) / 0.06) + Math.max(0, 1 - Math.abs(t - P.release) / 0.06), 0);
  // bump Trash tepat di tick
  const bump = TICKS.reduce((acc, tk) => acc + keys(t, [[tk, 0], [tk + 0.06, 1], [tk + 0.2, 0]], EZ.out), 0);
  const full = TICKS.filter((tk) => t >= tk).length;

  const stack: React.ReactNode[] = [];
  QUEUE.forEach((task, qi) => {
    if (qi < taken) return; // sedang diseret / sudah dibuang (digambar terpisah)
    const slot = qi - shift;
    if (slot > 3.2) return;
    // kartu baru muncul di slot bawah (naik + fade), menandakan tugas berulang
    const appear = Math.min(1, Math.max(0, 3 - slot));
    if (appear <= 0) return;
    stack.push(
      <Card key={qi} task={task} style={{ left: CARD.x, top: slotY(slot), opacity: Math.min(1, appear * 1.2), transform: `translateY(${(1 - appear) * 30}px)` }} />,
    );
  });

  // kartu yang sedang diseret / jatuh
  const dragged: React.ReactNode[] = [];
  plan.forEach((P, i) => {
    if (t < P.grab || t >= P.inT + 0.02) return;
    const task = QUEUE[i];
    const g = grabPt();
    let x: number, y: number, sc: number, op = 1;
    if (t < P.release) {
      // kartu menempel di titik pegang kursor, mengecil ala macOS saat mendekati dock
      x = cur.x - GRAB.dx;
      y = cur.y - GRAB.dy;
      const d = Math.hypot(cur.x - g.x, cur.y - g.y) / Math.hypot(overTrash.x - g.x, overTrash.y - g.y);
      sc = 1.03 - 0.63 * Math.min(1, d);
    } else {
      // dilepas: jatuh masuk ke Trash
      const u = prog(t, P.release, P.inT, EZ.acc);
      x = overTrash.x - GRAB.dx;
      y = overTrash.y - GRAB.dy + u * 44;
      sc = 0.4 - 0.3 * u;
      op = 1 - u * 0.9;
    }
    const lift = prog(t, P.grab, P.grab + 0.1, EZ.out);
    dragged.push(
      <Card key={"d" + i} task={task} lift={lift}
        style={{ left: x, top: y, opacity: op, transform: `scale(${sc}) rotate(${(1 - sc) * -6}deg)`, transformOrigin: `${GRAB.dx}px ${GRAB.dy}px`, zIndex: 5 }} />,
    );
  });

  const ps = 1 - 0.1 * Math.min(1, clickPulse);
  return (
    <Scene code="02c">
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.sky300} 0%, ${C.sky100} 38%, ${C.sky50} 70%, #fff 100%)` }}>
        <AbsoluteFill style={{ transform: `translate(${960 - tx}px, ${540 - ty}px) scale(${Z})`, transformOrigin: `${tx}px ${ty}px` }}>
          {stack}
          {/* dock */}
          <div style={{ position: "absolute", left: DOCK.x, top: DOCK.y, width: DOCK.w, height: DOCK.h, borderRadius: 40, background: "rgba(255,255,255,0.6)", border: "2px solid #fff", boxShadow: "0 20px 50px rgba(29,54,235,0.10)", backdropFilter: "blur(20px)" }}>
            <div style={{ position: "absolute", left: 28, top: 20, width: 104, height: 104, borderRadius: 24, background: "#fff", boxShadow: "0 8px 20px rgba(29,29,31,0.10)", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Img src={staticFile("icons/notion.svg")} style={{ width: 60, height: 60 }} />
            </div>
            <div style={{ position: "absolute", left: 152, top: 20, width: 104, height: 104, borderRadius: 24, background: "#25D366", boxShadow: "0 8px 20px rgba(29,29,31,0.10)", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Img src={staticFile("icons/whatsapp.svg")} style={{ width: 60, height: 60, filter: "invert(1)" }} />
            </div>
            <div style={{ position: "absolute", left: 284, top: 30, width: 3, height: 84, borderRadius: 2, background: C.line }} />
          </div>
          {/* Trash */}
          <div style={{ position: "absolute", left: TRASH.x, top: TRASH.y, width: TRASH.s, height: TRASH.s, borderRadius: 24, background: "#fff", boxShadow: "0 12px 32px rgba(29,29,31,0.14)", display: "flex", justifyContent: "center", alignItems: "center", transform: `scale(${1 + 0.05 * bump}) translateY(${bump * 4}px)` }}>
            <svg width={60} height={60} viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              {full > 0 && <path d={full > 1 ? "M7 7.2 L9 4.6 L11.5 6.4 L14 4.2 L16.6 6.6 L17 7.2" : "M9.5 7.2 L11.5 5 L14 7.2"} fill="#fff" />}
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>
          {dragged}
          {/* kursor AI */}
          <div style={{ position: "absolute", left: cur.x - 6, top: cur.y - 4, zIndex: 10, transform: `scale(${ps})`, transformOrigin: "6px 4px", display: "flex", alignItems: "flex-start", gap: 4 }}>
            <svg width={44} height={56} viewBox="0 0 22 28" style={{ filter: "drop-shadow(0 4px 6px rgba(29,29,31,0.25))" }}>
              <path d="M2 2 L2 22 L7.2 17.2 L10.6 25 L14 23.6 L10.7 16 L17.6 16 Z" fill={C.ink} stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
            </svg>
            <span style={{ marginTop: 40, background: C.ink, color: "#fff", fontFamily: "Inter", fontWeight: 700, fontSize: 24, letterSpacing: 1.4, borderRadius: 999, padding: "4px 16px" }}>AI</span>
          </div>
        </AbsoluteFill>
        <Grain opacity={0.04} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02c_TugasKeTrash, covers: ["02c"] };
