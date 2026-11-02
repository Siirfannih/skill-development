// 05c · «Dan hari ini, semua orang punya akses ke tools AI yang sama.»
// Montase cepat pertama B5: foto orang biasa dengan laptop berganti tiap 1/8 grid ostinato (terkunci ke tick «tools»).
// Di tick «tools» tiga ikon AI asli mendarat di tengah; di «sama» ketiganya menyatu ke titik tengah dan SAMA mendarat (T24 anchor).
// Keluar X07 cut on motion: kamera mendorong masuk 4 f terakhir, 05d mendarat dari dorongan yang sama.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, sfxMark, useT } from "../lib/anim";
import { DOC_GRADE } from "../lib/media";
import { FPS, panel, word } from "../lib/time";
import { AnchorWord, useFrameAt } from "../lib/AnchorWord";
import { firstFrame, GRID, gridIdx, progAt, z3tick } from "./_b5_shared";

const P = panel("05c");
const T_TOOLS = z3tick("05c SAMA"); // 85.37 (kata «tools»)
const W_SAMA = word("sama", "s5", 1).s;
const W_SEMUA = word("semua", "s5", 1).s; // 83.75

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
// ikon AI: jeda antar-ikon dan durasi masuk (dipakai animasi + penanda SFX)
const ICON_GAP = 2 / FPS;
const ICON_IN = 5 / FPS;
const MERGE_A = W_SAMA - 3 / FPS;
const MERGE_B = W_SAMA + 2 / FPS;
const ICONS = [
  { src: "icons/openai.svg", invert: false },
  { src: "icons/claude-color.svg", invert: false },
  { src: "icons/gemini-color.svg", invert: false },
];

export const S05c_SameTools: React.FC = () => {
  const t = useT();
  const atSemua = useFrameAt(2514), atTools = useFrameAt(Math.round(T_TOOLS * FPS)), atSama = useFrameAt(2591); // v9: f terukur ANCHORS-V9 #22
  // indeks foto terkunci ke grid yang beranchor di tick «tools» (foto berganti tepat di tick)
  // R3-E: ganti foto montase yang jatuh di FRAME TERAKHIR adegan (1 frame sebelum UI ChatGPT 05d) ditiadakan → foto sebelumnya bertahan sampai cut
  const tI = Math.min(t, (Math.round(P.end * FPS) - 2) / FPS);
  const k = gridIdx(tI, T_TOOLS);
  const kFirst = gridIdx(P.start, T_TOOLS);
  const idx = (((k - kFirst) % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
  const local = t - Math.max(P.start, T_TOOLS + k * (60 / 117.5 / 2));
  const zoomCycle = [1.06, 1.14, 1.0][idx % 3]; // C01: zoom mikro per foto, skala bergantian
  // Kamera 2.5D (v2). Lapis foto (belakang): C02 push-in 1→1,12 sampai «sama» + C01 zoom mikro di «semua» (18 f)
  // + pan pelan −50 px (parallax). Lapis depan (ikon + SAMA): diam saat ikon dibaca, C01 1→1,08 (20 f) mulai di onset «sama».
  // Keluar: dorongan cut-on-motion 4 f terakhir di kedua lapis (X07).
  const pushA = P.end - 4 / FPS;
  const exitPush = 1 + 0.14 * prog(t, pushA, P.end, EZ.acc);
  const camBack = keys(t, [[P.start, 1], [W_SAMA, 1.12], [P.end, 1.14]], EZ.inOut) * (1 + 0.06 * prog(t, W_SEMUA, W_SEMUA + 18 / FPS, EZ.inOut)) * exitPush;
  const panBack = -50 * prog(t, P.start, P.end, EZ.inOut);
  const camFront = (1 + 0.08 * prog(t, W_SAMA, W_SAMA + 20 / FPS, EZ.inOut)) * exitPush;
  const camBlur = 6 * prog(t, pushA, P.end, EZ.acc);
  // ikon AI: mendarat di tick, menyatu ke tengah tepat sebelum SAMA
  const merge = prog(t, MERGE_A, MERGE_B, EZ.acc);
  // ── SFXEV penanda metronom
  sfxMark(t, "cut", P.start, "05c:in:cut"); // titik biru 05b → montase foto
  // foto berganti di tiap langkah grid (rumus idx di atas)
  for (let kk = kFirst + 1; firstFrame(T_TOOLS + kk * GRID) < (Math.round(P.end * FPS) - 1) / FPS; kk++) sfxMark(t, "snap", firstFrame(T_TOOLS + kk * GRID), `05c:photo:${kk - kFirst}`);
  ICONS.forEach((_, i) => { const a = T_TOOLS + i * ICON_GAP; sfxMark(t, "pop", progAt(a, a + ICON_IN, EZ.out), `05c:icon:${i}`); });
  sfxMark(t, "whoosh", MERGE_B - 1 / FPS, "05c:icons:merge"); // tiga ikon menyatu ke tengah (EZ.acc, puncak di akhir)
  sfxMark(t, "whoosh", P.end - 1 / FPS, "05c:cam:exitpush"); // dorongan cut-on-motion 4 f terakhir (EZ.acc) ke 05d
  const dimPhoto = t >= W_SAMA ? 0.5 : t >= T_TOOLS ? 0.58 : 0.68; // v9 (B12): grade gelap konsisten (v8: 0,85 → foto terang beda tone dengan sistem visual)
  return (
    <Scene code="05c">
      <AbsoluteFill style={{ background: "#2a2d33" }}>
        {/* v9 (B12): 2.5D. Lapis belakang = foto yang sama, diperbesar, blur 18 px, gelap (parallax 50 % dari gerak kamera); lapis tengah = foto sebagai kartu
            bertepi bulat dengan bayangan; vignette charcoal menyatukan tone dengan sistem visual. */}
        <Camera scale={1 + (camBack - 1) * 0.5} x={panBack * 0.4} blur={camBlur}>
          <Img src={staticFile(PHOTOS[idx])}
            style={{ position: "absolute", inset: -60, width: "calc(100% + 120px)", height: "calc(100% + 120px)", objectFit: "cover", filter: `saturate(0.4) blur(18px) brightness(${dimPhoto * 0.55})`, transform: "scale(1.15)" }} />
        </Camera>
        <Camera scale={camBack} x={panBack} blur={camBlur}>
          {/* v10 (#33): foto full-bleed (tanpa bingkai inset / sudut bulat / vinyet kotak); grade gelap rata */}
          <div style={{ position: "absolute", left: -90, top: -60, width: 2100, height: 1200, overflow: "hidden" }}>
            <Img src={staticFile(PHOTOS[idx])}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: `${DOC_GRADE} brightness(${dimPhoto})`, transform: `scale(${zoomCycle + local * 0.12})` }} />
          </div>
        </Camera>
        <Camera scale={camFront} blur={camBlur}>
          {/* tiga tool AI asli (sama untuk semua orang) */}
          {t >= T_TOOLS && merge < 1 && (
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 56 }}>
                {ICONS.map((ic, i) => {
                  const a = T_TOOLS + i * ICON_GAP;
                  const p = prog(t, a, a + ICON_IN, EZ.out);
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
          {/* v9 (#22): SEMUA (tengah, sampai ikon AI mendarat) → SAMA (raksasa, T24 dipertahankan). Seharusnya di belakang foto orang yang lewat;
              lapis tengah sekarang kartu foto utuh → SEMUA di depan (fallback). */}
          <AnchorWord text="SEMUA" at={atSemua} until={atTools} x={960} y={540} size={130} color="#ffffff" enter="blur" shadow="0 6px 50px rgba(0,0,0,0.65)" />
          <AnchorWord text="SAMA" at={atSama} x={960} y={540} size={130} color="#ffffff" enter="mask" shadow="0 6px 50px rgba(0,0,0,0.5)"
            sfx={{ kind: "sub_impact", id: "05c:anchor:sama" }} />
        </Camera>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05c_SameTools, covers: ["05c"] };
