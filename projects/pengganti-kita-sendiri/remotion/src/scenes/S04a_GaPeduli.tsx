// 04a · «Teknologi ini nggak peduli sama apa yang kita pikirkan» — horizon R-HZ: fajar teknologi terus naik, tidak menunggu kita.
// Kamera: mulai menengadah ke langit gelap → C01 punch-in mikro di «peduli» → tilt turun ke cahaya → C08 truck ke garis waktu (04b).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, keys, KWord, prog, Scene, useT } from "../lib/anim";
import { panel, word } from "../lib/time";

// bintang dari panel Wonder (×2), satu lapis langit
const STARS: [number, number, number, number][] = [
  [42, 18, 2, 0.6], [118, 64, 1, 0.45], [171, 22, 2, 0.35], [236, 97, 1, 0.5], [290, 40, 2, 0.3], [352, 130, 1, 0.4], [401, 12, 1, 0.55],
  [455, 76, 2, 0.35], [520, 150, 1, 0.3], [588, 30, 2, 0.5], [640, 104, 1, 0.4], [702, 58, 2, 0.3], [760, 140, 1, 0.45], [812, 20, 2, 0.55],
  [870, 88, 1, 0.35], [918, 160, 2, 0.3], [66, 180, 1, 0.25], [190, 205, 1, 0.2], [318, 232, 1, 0.2], [478, 214, 1, 0.25], [612, 246, 1, 0.2],
  [744, 222, 1, 0.2], [884, 252, 1, 0.2], [30, 120, 1, 0.4], [938, 40, 1, 0.45],
  // langit di atas frame panel (terlihat saat kamera menengadah)
  [80, -60, 1, 0.5], [260, -88, 2, 0.4], [430, -40, 1, 0.35], [610, -76, 1, 0.5], [780, -52, 2, 0.4], [900, -94, 1, 0.3], [150, -30, 1, 0.3],
];

// dunia vertikal (px layar): -300 .. 1800. y=0..1080 = komposisi panel 04a; di bawahnya cahaya terus menerang ke langit 04b.
const SKY = `linear-gradient(180deg,
  #000 0px, #000 300px,
  var(--hz-900) ${300 + 486}px, var(--hz-800) ${300 + 594}px, var(--hz-700) ${300 + 670}px, var(--hz-600) ${300 + 734}px,
  var(--hz-300) ${300 + 810}px, var(--hz-100) ${300 + 907}px,
  var(--sky-300) ${300 + 1180}px, var(--sky-100) ${300 + 1500}px, var(--sky-50) ${300 + 1800}px)`;

export const S04a_GaPeduli: React.FC = () => {
  const t = useT();
  const P = panel("04a");
  const tNg = word("nggak", "s4").s;
  const tPe = word("peduli", "s4").s;
  const tPik = word("pikirkan", "s4").s;

  // tilt: menengadah → komposisi panel saat «peduli» → turun ke cahaya sesudah «pikirkan»
  const tiltA = 63.85;
  const camY = keys(t, [[P.start, 150], [tPe, 0], [tiltA, -40], [P.end - 0.12, -640]], EZ.inOut);
  // C01 punch-in mikro di «peduli»
  const camS = 1 + 0.045 * prog(t, tPe + 2 / 30, tPe + 0.45, EZ.out) + 0.012 * prog(t, tPe, tiltA, EZ.inOut);
  // C08 truck ke kanan (isi bergeser ke kiri), menyambung ke 04b
  const truck = prog(t, P.end - 0.3, P.end, EZ.acc);
  const camX = -520 * truck;
  // fajar naik pelan sepanjang panel (teknologi tidak menunggu)
  const dawn = prog(t, P.start, P.end, (x) => x);
  const twinkle = (i: number) => 0.75 + 0.25 * Math.sin(t * 2.1 + i * 1.7);

  return (
    <Scene code="04a">
      <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
        <Camera scale={camS} x={camX} y={camY} oy={480} blur={truck * 6}>
          <div style={{ position: "absolute", left: -200, top: -300, width: 2320, height: 2100, background: SKY }} />
          {/* cahaya fajar: pita terang di horizon yang terus naik */}
          <div style={{
            position: "absolute", left: 960 - 1300, top: 900 - dawn * 120 - 300, width: 2600, height: 600, borderRadius: "50%",
            background: "radial-gradient(closest-side, color-mix(in srgb, var(--hz-100) 70%, transparent), transparent)", opacity: 0.55 + 0.35 * dawn,
          }} />
          {STARS.map(([x, y, s, o], i) => (
            <div key={i} style={{ position: "absolute", left: x * 2, top: y * 2, width: s * 2, height: s * 2, borderRadius: 9, background: "#fff", opacity: o * twinkle(i) }} />
          ))}
          {/* teks di zona gelap (kontras ≥ 12:1) */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontFamily: "Inter", fontWeight: 800, fontSize: 200, letterSpacing: -8, lineHeight: 1, color: "#fff", whiteSpace: "nowrap" }}>
            <KWord at={tNg} kind="blurIn" out={tPik + 0.55}>nggak</KWord>{" "}
            <KWord at={tPe} kind="blurIn" out={tPik + 0.55}>peduli</KWord>
          </div>
        </Camera>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S04a_GaPeduli, covers: ["04a"] };
