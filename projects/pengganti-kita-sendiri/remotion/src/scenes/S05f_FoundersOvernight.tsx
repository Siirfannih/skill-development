// 05f · «Makanya ada banyak founder, ada banyak CEO, yang lahir dalam semalam.»
// Callback cold open: SlotWord + SLAM_STYLE yang sama persis dengan 00a–00b, di posisi sama.
// Montase tercepat di video: foto founder/panggung ganti tiap 1/16 grid (≈4 f), terkunci ke tick FOUNDER; C01 zoom mikro per cut.
// Di SEMALAM montase berhenti di satu foto + hantaman (shake), tahan, lalu X17 hard cut ke 05g.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { EZ, Grain, prog, Scene, shake, useT } from "../lib/anim";
import { DOC_GRADE } from "../lib/media";
import { FPS, panel, word } from "../lib/time";
import { SlotWord } from "./S00_ColdOpen";
import { GRID, z3tick } from "./_b5_shared";

const P = panel("05f");
const T_FOUNDER = z3tick("05f FOUNDER"); // 92.53
const T_CEO = z3tick("05f CEO"); // 93.80
const T_SEMALAM = z3tick("05f SEMALAM"); // 95.59
const W_YANG = word("yang", "s5", 6).s; // 94.605 «yang lahir dalam»
const STEP = GRID / 2;

// founder di panggung, cek besar, demo day, meetup
const PHOTOS = [
  "wonder/30f18ba51b261b88d6986105a30b3219733874950edff61f4cf1762dbd412bf5.jpg",
  "wonder/cf62d8467f160bc4293f098cb9a24564fe12fca16dc033f1060380dc5e43b663.jpg",
  "wonder/462704e2846a40cc5002020250a755a4c9215a2979acbf738c85f3d65f91772e.jpg",
  "wonder/f46925a87f669ce6a3a61cb6efe4882c1957b7e131988a67a6fd1799bbe6bc9e.jpg",
  "wonder/b25cb125892c42111d25a0a007793920c017b5f30545399ee7c919839ad50224.jpg",
  "wonder/081067b5c127cff324887ff17cf5454ef60f4d9673b32f58c6d68d7a05080c6b.jpg",
  "img/cheque.jpg",
  "wonder/c1bfeb12a8cb6f67073995830aa33fa5f330c76190d2fc1008a9ade58e04ea3f.jpg",
  "wonder/54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg",
  "wonder/42d17c7be4e026d2db2717bc4b6d04cb477edd579aa515ad002e49ff7d46c7d9.jpg",
  "img/hackathon.jpg",
  "img/meetup.jpg",
];

export const S05f_FoundersOvernight: React.FC = () => {
  const t = useT();
  const tm = Math.min(t, T_SEMALAM); // montase membeku di SEMALAM
  const k = Math.floor((tm - T_FOUNDER) / STEP + 1e-6);
  const k0 = Math.floor((P.start - T_FOUNDER) / STEP + 1e-6);
  const idx = (((k - k0) % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
  const local = tm - (T_FOUNDER + k * STEP);
  const z = [1.0, 1.16, 1.3][((k % 3) + 3) % 3] * (1 + local * 0.25);
  const hold = t >= T_SEMALAM ? 1 + (t - T_SEMALAM) * 0.05 : 1; // dorong pelan saat tahan
  const sh = { x: shake(t, T_FOUNDER, 10).x + shake(t, T_CEO, 8).x + shake(t, T_SEMALAM, 12).x, y: shake(t, T_FOUNDER, 10).y + shake(t, T_SEMALAM, 12).y };
  // v2 kamera: C02 push-in 1→1,15 dari «yang lahir dalam» sampai SEMALAM (tensi), lalu patah ke wide 5 f di SEMALAM (C15):
  // montase menyusut jadi satu kartu foto 0,62× di ruang charcoal (close → wide; bunyi = slam SEMALAM yang sama).
  const push = 1 + 0.15 * prog(t, W_YANG, T_SEMALAM, EZ.inOut);
  const brk = prog(t, T_SEMALAM, T_SEMALAM + 5 / FPS, EZ.out);
  const camS = push * (1 - brk) + 0.62 * brk;
  const dim = t >= T_FOUNDER ? 0.58 : 0.9; // redup saat kata slam di layar (sama dengan cold open)
  return (
    <Scene code="05f">
      <AbsoluteFill style={{ background: "#101216", overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) scale(${camS})`, borderRadius: (28 * brk) / camS, overflow: "hidden" }}>
          <Img src={staticFile(PHOTOS[idx])}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: `${DOC_GRADE} brightness(${dim})`, transform: `scale(${z * hold})`, transformOrigin: "50% 42%" }} />
        </AbsoluteFill>
        <SlotWord text="FOUNDER" at={T_FOUNDER} out={T_CEO - 4 / FPS} />
        <SlotWord text="CEO" at={T_CEO} out={T_SEMALAM - 4 / FPS} />
        <SlotWord text="SEMALAM" at={T_SEMALAM} size={260} />
        <Grain opacity={0.06} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05f_FoundersOvernight, covers: ["05f"] };
