// 05c · «Dan hari ini, semua orang punya akses ke tools AI yang sama.»
// Montase cepat pertama B5: foto orang biasa dengan laptop berganti tiap 1/8 grid ostinato (terkunci ke tick «tools»).
// Di tick «tools» tiga ikon AI asli mendarat di tengah; di «sama» ketiganya menyatu ke titik tengah dan SAMA mendarat (T24 anchor).
// Keluar X07 cut on motion: kamera mendorong masuk 4 f terakhir, 05d mendarat dari dorongan yang sama.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, keys, KWord, prog, Scene, useT } from "../lib/anim";
import { DOC_GRADE } from "../lib/media";
import { FPS, panel, word } from "../lib/time";
import { gridIdx, z3tick } from "./_b5_shared";

const P = panel("05c");
const T_TOOLS = z3tick("05c SAMA"); // 85.37 (kata «tools»)
const W_SAMA = word("sama", "s5", 1).s;

// orang biasa + laptop/layar: «semua orang punya akses»
const PHOTOS = [
  "wonder/193550038d18ec319191a1a059481c7292b65882cc01fa813359e8c67fa286d4.jpg",
  "wonder/93987e2cbc28b5f73cf29d949b9c18e884c32421aa1d8446bef8f8b72d7b9a4a.jpg",
  "wonder/653933ac539310f41d2288501c1ffb8e67c47b10758b6785a5d2d9e60e441859.jpg",
  "wonder/a084d6713bd51936e5f2514555d8aad21d6e4470957796029947348a1493dee0.jpg",
  "wonder/c1bfeb12a8cb6f67073995830aa33fa5f330c76190d2fc1008a9ade58e04ea3f.jpg",
  "wonder/d465a6b0c5cadf6fe67276beec88ccd0d4f8c1175570f664dc0bdeacaebde531.jpg",
  "img/meetup.jpg",
  "wonder/6eda1bd3b11f988bdedbbb4a4caf766bcab8a36eb3b4cdfae840f0c8311076bb.jpg",
  "wonder/54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg",
  "img/night.jpg",
  "wonder/081067b5c127cff324887ff17cf5454ef60f4d9673b32f58c6d68d7a05080c6b.jpg",
];
const ICONS = [
  { src: "icons/openai.svg", invert: false },
  { src: "icons/claude-color.svg", invert: false },
  { src: "icons/gemini-color.svg", invert: false },
];

export const S05c_SameTools: React.FC = () => {
  const t = useT();
  // indeks foto terkunci ke grid yang beranchor di tick «tools» (foto berganti tepat di tick)
  const k = gridIdx(t, T_TOOLS);
  const kFirst = gridIdx(P.start, T_TOOLS);
  const idx = (((k - kFirst) % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
  const local = t - Math.max(P.start, T_TOOLS + k * (60 / 117.5 / 2));
  const zoomCycle = [1.06, 1.14, 1.0][idx % 3]; // C01: zoom mikro per foto, skala bergantian
  // C19 drift ≤1,03 lalu dorong cut-on-motion 4 f terakhir
  const pushA = P.end - 4 / FPS;
  const cam = keys(t, [[P.start, 1], [pushA, 1.03]], EZ.inOut) * (1 + 0.14 * prog(t, pushA, P.end, EZ.acc));
  const camBlur = 6 * prog(t, pushA, P.end, EZ.acc);
  // ikon AI: mendarat di tick, menyatu ke tengah tepat sebelum SAMA
  const merge = prog(t, W_SAMA - 3 / FPS, W_SAMA + 2 / FPS, EZ.acc);
  const dimPhoto = t >= W_SAMA ? 0.5 : t >= T_TOOLS ? 0.62 : 0.85;
  return (
    <Scene code="05c">
      <AbsoluteFill style={{ background: "#2a2d33" }}>
        <Camera scale={cam} blur={camBlur}>
          <Img src={staticFile(PHOTOS[idx])}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: `${DOC_GRADE} brightness(${dimPhoto})`, transform: `scale(${zoomCycle + local * 0.12})` }} />
          {/* tiga tool AI asli (sama untuk semua orang) */}
          {t >= T_TOOLS && merge < 1 && (
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 56 }}>
                {ICONS.map((ic, i) => {
                  const a = T_TOOLS + (i * 2) / FPS;
                  const p = prog(t, a, a + 5 / FPS, EZ.out);
                  const dx = (1 - i) * 236 * merge; // menyatu ke ikon tengah
                  return (
                    <div key={i} style={{ width: 180, height: 180, borderRadius: 48, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 70px rgba(0,0,0,0.35)", opacity: Math.min(1, p * 2) * (1 - merge), transform: `translate(${dx}px, ${(1 - p) * 30}px) scale(${(0.86 + 0.14 * p) * (1 - 0.5 * merge)})` }}>
                      <Img src={staticFile(ic.src)} style={{ width: 104, height: 104 }} />
                    </div>
                  );
                })}
              </div>
            </AbsoluteFill>
          )}
          {/* anchor word T24 */}
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <KWord at={W_SAMA} kind="pop" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: 360, letterSpacing: -18, lineHeight: 1, color: "#ffffff" }}>
              SAMA
            </KWord>
          </AbsoluteFill>
        </Camera>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05c_SameTools, covers: ["05c"] };
