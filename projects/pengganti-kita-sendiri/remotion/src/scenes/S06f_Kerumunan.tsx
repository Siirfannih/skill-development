// 06f · «Karena semua orang di sekitar kita memakainya, dengan tools yang sama persis»: sudut belakang kerumunan.
// Dua barisan (depan + jauh, parallax) memanjang keluar frame; kamera truck kiri→kanan (C08) melanjutkan
// kecepatan truck akhir 06e. Di «tools» glyph AI yang sama muncul serentak di semua bidang; di «sama» semua
// berdenyut bersamaan. Keluar: crane naik ke wide (barisan mengecil ke atas, bidang makin pipih) → posisi barisan 06g.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, prog, Scene, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { BackUnit, C6 } from "./_b6_shared";
import { TRUCK_V } from "./S06e_Tertinggal";

const P = panel("06f");
const F2 = 2 / FPS;
const W_TOOLS = word("tools", "s6", 1).s;
const W_SAMA = word("sama", "s6", 2).s;
const D = P.end - P.start;
const X = (TRUCK_V * D) / 0.6; // kecepatan awal = TRUCK_V
export const CRANE_A = P.end - 0.65;

const FRONT = Array.from({ length: 14 }, (_, i) => ({ x: -120 + i * 368, y: 350, s: 2 }));
const FAR = Array.from({ length: 16 }, (_, i) => ({ x: -60 + i * 230, y: 250, s: 1.25 }));

export const S06f_Kerumunan: React.FC = () => {
  const t = useT();
  const p = Math.min(1, Math.max(0, (t - P.start) / D));
  const truck = -X * (0.6 * p + 0.4 * EZ.inOut(p));
  const glyph = prog(t, W_TOOLS + F2, W_TOOLS + F2 + 4 / FPS, EZ.out);
  const gScale = 0.85 + 0.15 * glyph;
  const dt = t - (W_SAMA + F2);
  const pulse = dt >= 0 ? Math.exp(-dt * 4) * (1 - Math.exp(-dt * 40)) * 1.4 : 0;
  const crane = prog(t, CRANE_A, P.end, EZ.acc);
  const sc = 1 - 0.45 * crane; // bidang depan mendarat ±140×44 seperti barisan 06g
  const flat = 1 - 0.5 * crane;
  // C20 cut zoom ×1,4 ke barisan bidang tepat saat glyph muncul («tools»), C01 di «sama»; lepas selama crane
  const tc = W_TOOLS + F2;
  const cz = t >= tc ? 1.4 + 0.05 * (1 - prog(t, tc, tc + 6 / FPS, EZ.out)) : 1;
  const Z = 1 + (cz * (1 + 0.06 * prog(t, W_SAMA, W_SAMA + 18 / FPS, EZ.out)) - 1) * (1 - crane);
  const row = (list: typeof FRONT, par: number, op: number, key: string) =>
    list.map((u, i) => (
      <div key={key + i} style={{ position: "absolute", left: u.x + truck * par, top: u.y, width: 160, height: 260, transform: `scale(${u.s})`, transformOrigin: "0 0", opacity: op }}>
        <BackUnit on={1} glyph={glyph} glyphScale={gScale} boost={pulse} flatY={flat} />
      </div>
    ));
  return (
    <Scene code="06f" name="06f Kerumunan">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `scale(${Z})`, transformOrigin: "960px 430px" }}>
        <AbsoluteFill style={{ transform: `translateY(${crane * -130}px) scale(${sc})`, transformOrigin: "960px 400px" }}>
          {row(FAR, 0.62, 0.42, "far")}
          {row(FRONT, 1, 1, "front")}
        </AbsoluteFill>
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06f_Kerumunan, covers: ["06f"] };
