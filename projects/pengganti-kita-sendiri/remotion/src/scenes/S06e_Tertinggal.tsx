// 06e · «Tapi kalau tidak memakai AI, kita merasa tertinggal»: bidang kita sudah padam (klik relay di akhir 06d),
// rim light hilang. Yang lain tetap menyala dan bergerak menjauh ke kanan (tertinggal = jarak ruang).
// Kamera mundur pelan (C06 lambat); di akhir mulai truck ke kanan → cut on motion ke kerumunan 06f.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, prog, Scene, sfxMark, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { AnchorWord, useFrameAt } from "../lib/AnchorWord";
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
  const atTert = useFrameAt(3591); // v9: f terukur ANCHORS-V9 #31
  const untilTert = useFrameAt(Math.round(P.end * FPS) - 5);
  const back = prog(t, START, P.end, EZ.inOut);
  // ── SFXEV
  sfxMark(t, "cut", START, "06e:cut:in"); // potong dalam gelap dari 06d
  sfxMark(t, "whoosh", SNAP_WIDE + 1 / FPS, "06e:snapwide:1"); // patah close 2× → wide dalam 6 f (EZ.out)
  const sc = 1.06 - 0.06 * back;
  // close 2× pada kita yang padam (C18 drift pelan), lalu patah ke wide dalam 6 f: jarak ke yang lain terlihat
  // v9 (B5, 1:58 beat mati): close 2× yang gelap kosong → mulai 1,5× supaya kelompok «yang lain» sudah menyembul di tepi kanan, push ke 1,85× sampai patah
  const zc = 1.5 + 0.35 * prog(t, START, SNAP_WIDE, EZ.inOut);
  const Z = lerp(zc, 1, prog(t, SNAP_WIDE, SNAP_WIDE + 6 / FPS, EZ.out));
  const truck = t > TRUCK_A ? -(t - TRUCK_A) * TRUCK_V : 0;
  const recede = prog(t, START + 0.2, P.end + 0.2, EZ.inOut);
  return (
    <Scene start={START} end={P.end} name="06e Tertinggal">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `scale(${Z})`, transformOrigin: "400px 700px" }}>
        <AbsoluteFill style={{ transform: `translateX(${truck}px) scale(${sc})`, transformOrigin: "960px 600px" }}>
          {/* v9: TERTINGGAL = anchor di BELAKANG tubuh «kita» yang padam (urutan DOM sebelum Torso), putih penuh di charcoal */}
          <AnchorWord text="TERTINGGAL" at={atTert} until={untilTert} x={260} y={900} size={140} color={C6.white} align="left" enter="right" shadow="0 0 40px rgba(16,18,22,0.6)"
            sfx={{ kind: "sub_impact", id: "06e:anchor:tertinggal" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 540, transform: "scale(2)", transformOrigin: "0 0" }}>
            {/* kita: bidang padam, tanpa rim light */}
            <Plane b={{ x: 270, y: 290, w: 150, h: 50 }} on={0} />
            <Ball b={{ x: 150, y: 250, w: 80, h: 80 }} rim={0.25} r={2} flat />
            <Torso b={{ x: 114, y: 338, w: 152, h: 250 }} rim={0.2} r={2} flat />{/* h 180→250: alas datar badan tidak lagi terlihat di atas tepi bawah frame saat wide */}
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
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06e_Tertinggal, covers: ["06e"] };
