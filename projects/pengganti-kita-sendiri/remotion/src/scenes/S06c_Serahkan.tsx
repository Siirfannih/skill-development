// 06c · «dan menyerahkan cara berpikir kita ke AI»: close-up. Kepala bola lepas dari badan, melayang
// di lintasan putus-putus menuju bidang cahaya, lalu terhisap masuk di «AI». Kamera C18 mengikuti bola.
// Masuk: lanjutan push-through 06b (zoom mendarat). Keluar: bidang membesar terang → bloom match ke composer 06d.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, keys, prog, Scene, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { Ball, C6, Plane, Torso, wa } from "./_b6_shared";

const P = panel("06c");
const F2 = 2 / FPS;
const W_MENYERAHKAN = word("menyerahkan", "s6", 1).s;
const W_AI = word("AI", "s6", 1).s; // «ke AI,» di 06c
const W_AI_C = W_AI >= P.start ? W_AI : word("AI", "s6", 2).s;

// lintasan kepala (koordinat panel 960×540): dari atas badan ke pusat bidang cahaya
const P0 = { x: 240, y: 258 };
const C1 = { x: 320, y: 130 };
const C2 = { x: 600, y: 190 };
const P3 = { x: 860, y: 262 };
const bez = (u: number) => {
  const a = (1 - u) ** 3, b = 3 * (1 - u) ** 2 * u, c = 3 * (1 - u) * u * u, d = u ** 3;
  return { x: a * P0.x + b * C1.x + c * C2.x + d * P3.x, y: a * P0.y + b * C1.y + c * C2.y + d * P3.y };
};

export const BLOOM_06C_END = (t: number) => keys(t, [[P.end - 0.3, 0], [P.end, 0.6]], EZ.acc);

export const S06c_Serahkan: React.FC = () => {
  const t = useT();
  const lift = prog(t, W_MENYERAHKAN + F2, W_MENYERAHKAN + F2 + 0.35, EZ.out);
  const u = prog(t, W_MENYERAHKAN + 0.3, W_AI_C + F2, EZ.inOut);
  const absorb = prog(t, W_AI_C + F2, W_AI_C + F2 + 0.28, EZ.acc);
  const pos = bez(u);
  const headY = pos.y - lift * 16 * (1 - u);
  const hs = 1 - absorb;
  // bidang menyala lebih terang saat bola terhisap («hisapan»), lalu bloom ke 06d
  const boost = Math.max(0, absorb) * (1 - prog(t, W_AI_C + 0.4, P.end, EZ.inOut) * 0.4);
  const bloom = BLOOM_06C_END(t);
  // kamera: mendarat dari push-through 06b, lalu ikut bola (C18)
  const land = prog(t, P.start, P.start + 0.35, EZ.out);
  const sc = (1 + 0.14 * (1 - land)) * (1 + 0.04 * u);
  const camX = -(pos.x - P0.x) * 0.18;
  const blur = (1 - land) * 6;
  // trail putus-putus: polyline dari awal ke posisi bola
  const N = 36;
  const pts: string[] = [`${P0.x},${P0.y + 36}`];
  for (let i = 0; i <= N; i++) {
    const p = bez((u * i) / N);
    pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }
  return (
    <Scene code="06c" name="06c Menyerahkan">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `translateX(${camX * 2}px) scale(${sc})`, transformOrigin: "960px 520px", filter: blur > 0.1 ? `blur(${blur}px)` : undefined }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 540, transform: "scale(2)", transformOrigin: "0 0" }}>
            {u > 0.002 && (
              <svg width={960} height={540} style={{ position: "absolute", left: 0, top: 0 }}>
                <polyline points={pts.join(" ")} fill="none" stroke="rgb(210,210,215)" strokeOpacity={0.45} strokeWidth={2} strokeDasharray="6 8" strokeLinecap="round" />
              </svg>
            )}
            <Plane b={{ x: 700, y: 90, w: 320, h: 360 }} on={1} slant={0.18} boost={boost * 1.2}
              grad={`linear-gradient(90deg, ${C6.paper} 0%, ${C6.white} 45%)`}
              glow={{ b: { x: 770, y: 140, w: 170, h: 260 }, blur: 140, spread: 50, a: 0.24, radius: 40 }} />
            <Torso b={{ x: 60, y: 330, w: 360, h: 300 }} rim={0.6} r={6} />
            {hs > 0.01 && (
              <Ball b={{ x: pos.x - 62 * hs, y: headY - 62 * hs, w: 124 * hs, h: 124 * hs }} rim={0.75 + 0.2 * u} r={6 + 3 * u}
                style={{ background: `linear-gradient(100deg, ${C6.charcoal} ${40 - 15 * u}%, ${C6.raised} 100%)` }} />
            )}
          </div>
        </AbsoluteFill>
        {bloom > 0.005 && (
          <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 80% at 1720px 540px, ${wa(bloom)} 0%, ${wa(bloom * 0.5)} 45%, ${wa(0)} 100%)` }} />
        )}
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06c_Serahkan, covers: ["06c"] };
