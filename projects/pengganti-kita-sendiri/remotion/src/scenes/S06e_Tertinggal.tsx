// 06e · «Tapi kalau tidak memakai AI, kita merasa tertinggal»: bidang kita sudah padam (klik relay di akhir 06d),
// rim light hilang. Yang lain tetap menyala dan bergerak menjauh ke kanan (tertinggal = jarak ruang).
// Kamera mundur pelan (C06 lambat); di akhir mulai truck ke kanan → cut on motion ke kerumunan 06f.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, KWord, prog, Scene, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { Ball, C6, lerp, Plane, SideUnit, Torso } from "./_b6_shared";
import { OFF_HOLD, T_OFF } from "./S06d_Prompt";

const P = panel("06e");
const START = T_OFF + OFF_HOLD;
const W_TERTINGGAL = word("tertinggal", "s6", 1).s;
export const TRUCK_V = 118; // px/dtk, sama dengan kecepatan awal truck 06f
export const TRUCK_A = W_TERTINGGAL + 0.28;
export const SNAP_WIDE = W_TERTINGGAL - 0.22; // patah ke wide sebelum kata, supaya teks mendarat di frame diam

export const S06e_Tertinggal: React.FC = () => {
  const t = useT();
  const back = prog(t, START, P.end, EZ.inOut);
  const sc = 1.06 - 0.06 * back;
  // close 2× pada kita yang padam (C18 drift pelan), lalu patah ke wide dalam 6 f: jarak ke yang lain terlihat
  const zc = 2 + 0.08 * prog(t, START, SNAP_WIDE, EZ.inOut);
  const Z = lerp(zc, 1, prog(t, SNAP_WIDE, SNAP_WIDE + 6 / FPS, EZ.out));
  const truck = t > TRUCK_A ? -(t - TRUCK_A) * TRUCK_V : 0;
  const recede = prog(t, START + 0.2, P.end + 0.2, EZ.inOut);
  return (
    <Scene start={START} end={P.end} name="06e Tertinggal">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `scale(${Z})`, transformOrigin: "400px 700px" }}>
        <AbsoluteFill style={{ transform: `translateX(${truck}px) scale(${sc})`, transformOrigin: "960px 600px" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 540, transform: "scale(2)", transformOrigin: "0 0" }}>
            {/* kita: bidang padam, tanpa rim light */}
            <Plane b={{ x: 270, y: 290, w: 150, h: 50 }} on={0} />
            <Ball b={{ x: 150, y: 250, w: 80, h: 80 }} rim={0.25} r={2} flat />
            <Torso b={{ x: 114, y: 338, w: 152, h: 180 }} rim={0.2} r={2} flat />
            {/* yang lain: tetap menyala, menjauh ke kanan (mengecil = makin jauh) */}
            <div style={{ position: "absolute", left: 600, top: 320, transform: `translateX(${recede * 110}px) translateY(${-recede * 18}px) scale(${1 - 0.32 * recede})`, transformOrigin: "0 60px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ position: "absolute", left: i * 118 - 6.3, top: -16, width: 164, height: 200, transform: "scale(0.65)", transformOrigin: "0 0" }}>
                  <SideUnit on={1} />
                </div>
              ))}
            </div>
          </div>
        </AbsoluteFill>
        </AbsoluteFill>
        {/* kata di bawah visual, tengah */}
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", top: 830 }}>
          <KWord at={W_TERTINGGAL} out={P.end - 5 / FPS} kind="rise" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 128, letterSpacing: -3.84, lineHeight: 1, color: C6.white, whiteSpace: "nowrap" }}>
            tertinggal
          </KWord>
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06e_Tertinggal, covers: ["06e"] };
