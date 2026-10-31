// 05h · «Tapi membangun sesuatu yang dibutuhkan orang, justru semakin susah.»
// Masuk X10 foreground wipe dari 05g: siluet piktogram raksasa lewat dekat kamera kiri→kanan, di belakangnya ruang charcoal 05h.
// Deretan produk (aplikasi yang sama dari 05g) menyala satu per satu tiap 1/16 grid. Piktogram pengguna berjalan dari kiri
// melewati semuanya tanpa berhenti (C18 kamera follow, berhenti di ujung deretan) dan keluar frame kanan sebelum «semakin».
// Tiap produk sedikit lebih terang saat pengguna mendekat (berharap), lalu kembali. «semakin susah» di bawah lantai.
// Engsel senyap: lampu produk padam kanan→kiri setelah «susah», tahan, X17 hard cut ke 06a.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, KWord, prog, Scene, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { AppIcon, APPS, C, GRID, Pictogram } from "./_b5_shared";

const P = panel("05h");
const W_SEMAKIN = word("semakin", "s5", 1).s;
const W_SUSAH = word("susah", "s5", 1).s;
const W_JUSTRU = word("justru", "s5", 1).s;
// wipe
const WIPE_A = P.start - 6 / FPS;
const WIPE_B = P.start + 6 / FPS;
const WIPE_W = 1500;
// dunia
const PW = 300, PH = 190, PG = 76, ROW_X = 170, ROW_Y = 300;
const N = 6;
const WORLD_W = ROW_X * 2 + N * PW + (N - 1) * PG; // 2520
const FLOOR = 770;
const WALK_A = P.start + 0.12;
const WALK_B = W_JUSTRU + 0.2; // keluar kanan sebelum «semakin»
const X0 = -200, X1 = WORLD_W + 220;
const OFF = W_SUSAH + 0.45; // lampu padam
const W_ORANG = word("orang", "s5", 2).s; // 100.86 «dibutuhkan orang»
const T_PIN_A = P.start + 0.47, T_PIN_B = P.start + 1.12;
const CX_END = WORLD_W - 960;
const OY = 560;

const Product: React.FC<{ i: number; lit: number }> = ({ i, lit }) => {
  const app = APPS[i];
  return (
    <div style={{ position: "absolute", left: ROW_X + i * (PW + PG), top: ROW_Y, width: PW, height: PH }}>
      {/* pendar ke lantai + halo (gradien radial, tanpa tepi keras) */}
      <div style={{ position: "absolute", left: -160, top: -120, width: PW + 320, height: FLOOR - ROW_Y + 160, background: `radial-gradient(ellipse 48% 42% at 50% 46%, rgba(255,255,255,${0.10 * lit}) 0%, rgba(255,255,255,0) 100%)` }} />
      <div style={{ position: "absolute", left: -60, top: FLOOR - ROW_Y - 60, width: PW + 120, height: 120, background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,${0.08 * lit}) 0%, rgba(255,255,255,0) 100%)` }} />
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)", background: `linear-gradient(90deg, ${C.white} 50%, ${C.paper} 100%)`, opacity: 0.08 + 0.82 * lit, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, fontFamily: "Inter" }}>
        <AppIcon app={app} size={64} />
        <span style={{ fontSize: 30, fontWeight: 700, color: C.ink, letterSpacing: -0.6 }}>{app.name}</span>
      </div>
    </div>
  );
};

export const S05h_UsersWalkPast: React.FC = () => {
  const t = useT();
  // pengguna: kecepatan konstan (berjalan), langkah tiap 1/8 grid
  const wp = Math.min(1, Math.max(0, (t - WALK_A) / (WALK_B - WALK_A)));
  const ux = X0 + (X1 - X0) * wp;
  const phase = (t - WALK_A) / (GRID * 2);
  // Kamera 2.5D (v2): wide saat lampu menyala → C02 push-in ke close-up 1,7× mengikuti pengguna (C18) →
  // patah ke wide 5 f di «orang» (C15) → tahan wide, C01 zoom mikro di «susah» (lapis dunia saja; teks di ruang layar).
  // Lapis produk = kedalaman lebih jauh: zoom dan translasi ×0,55 (parallax, ≤ 24 px/f saat follow).
  const pin = prog(t, T_PIN_A, T_PIN_B, EZ.inOut);
  const snap = prog(t, W_ORANG, W_ORANG + 5 / FPS, EZ.out);
  const cxF = 960 + (ux + 140 - 960) * pin;
  const cx = cxF + (CX_END - cxF) * snap;
  const Z = (1 + 0.7 * pin) * (1 - snap) + snap;
  const micro = 1 + 0.04 * prog(t, W_SUSAH, W_SUSAH + 20 / FPS, EZ.inOut);
  const Zu = Z * micro;
  const Zp = (1 + (Z - 1) * 0.55) * micro;
  const cp = 960 + (cx - 960) * 0.55;
  const snapBlur = 3 * Math.sin(Math.PI * snap);
  // wipe: tepi depan siluet bergerak kiri→kanan
  const wp2 = prog(t, WIPE_A, WIPE_B + 4 / FPS, EZ.inOut);
  const lead = -200 + (1920 + WIPE_W + 400) * wp2;
  const trail = lead - WIPE_W;
  const clipRight = t < WIPE_B + 4 / FPS ? Math.max(0, 1920 - trail) : 0;
  return (
    <Scene code="05h" pre={6 / FPS}>
      <AbsoluteFill style={{ clipPath: clipRight > 0 ? `inset(0 ${clipRight}px 0 0)` : undefined }}>
        <AbsoluteFill style={{ background: C.charcoal }}>
          <Camera scale={Zp} x={-Zp * (cp - 960)} oy={OY} blur={snapBlur}>
            {Array.from({ length: N }).map((_, i) => {
              const on = P.start - 0.05 + (i * GRID) / 2; // menyala tiap 1/16
              const near = Math.max(0, 1 - Math.abs(ux - (ROW_X + i * (PW + PG) + PW / 2)) / 260);
              const off = prog(t, OFF + ((N - 1 - i) * GRID) / 4, OFF + ((N - 1 - i) * GRID) / 4 + 3 / FPS, EZ.out);
              const lit = (prog(t, on, on + 3 / FPS, EZ.out) * (0.9 + 0.1 * near)) * (1 - 0.85 * off);
              return <Product key={i} i={i} lit={lit} />;
            })}
          </Camera>
          <Camera scale={Zu} x={-Zu * (cx - 960)} oy={OY} blur={snapBlur}>
            {/* lantai */}
            <div style={{ position: "absolute", left: -400, top: FLOOR, width: WORLD_W + 800, height: 2, background: "rgba(255,255,255,0.14)" }} />
            {t >= WALK_A && t <= WALK_B + 0.1 && <Pictogram x={ux} floor={FLOOR} h={400} phase={phase} />}
          </Camera>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 120 }}>
            <div style={{ fontFamily: "Inter", fontWeight: 800, fontSize: 132, letterSpacing: -4, lineHeight: 1, color: C.white, whiteSpace: "nowrap", display: "flex", gap: 34 }}>
              <KWord at={W_SEMAKIN} kind="rise">semakin</KWord>
              <KWord at={W_SUSAH} kind="rise">susah</KWord>
            </div>
          </AbsoluteFill>
          <Grain opacity={0.05} />
        </AbsoluteFill>
      </AbsoluteFill>
      {/* siluet foreground (X10) */}
      {t < WIPE_B + 4 / FPS && (
        <div style={{ position: "absolute", left: trail, top: -260, width: WIPE_W, height: 1700, borderRadius: "760px 760px 120px 120px", background: `linear-gradient(100deg, ${C.raised} 0%, ${C.charcoal} 65%)`, boxShadow: "inset 26px 10px 18px -8px rgba(255,255,255,0.55)", filter: "blur(6px)" }} />
      )}
    </Scene>
  );
};

export const SCENE = { Component: S05h_UsersWalkPast, covers: ["05h"] };
