// 04a · «Teknologi ini nggak peduli sama apa yang kita pikirkan» — horizon R-HZ: fajar teknologi terus naik, tidak menunggu kita.
// Kamera: mulai menengadah ke langit gelap → C01 punch-in mikro di «peduli» → tilt turun ke cahaya → C08 truck ke garis waktu (04b).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, sfxMark, useT } from "../lib/anim";
import { panel, word } from "../lib/time";
import { AnchorWord, useFrameAt } from "../lib/AnchorWord";

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
  const atNggak = useFrameAt(1861), atPeduli = useFrameAt(1871); // v9: f terukur ANCHORS-V9 #16

  // tilt: menengadah → komposisi panel saat «peduli» → turun ke cahaya sesudah «pikirkan»
  const tiltA = 63.85;
  const tiltB = P.end - 0.12;
  const camY = keys(t, [[P.start, 150], [tPe, 0], [tiltA, -40], [tiltB, -640]], EZ.inOut);
  // C01 punch-in mikro di «peduli»
  // C02 push-in pelan selama «Teknologi ini» (tensi sebelum inti kalimat) + C01 punch-in di «peduli»
  const camS = 0.97 + 0.03 * prog(t, P.start, tNg, EZ.inOut) + 0.06 * prog(t, tPe, tPe + 0.6, EZ.out) + 0.012 * prog(t, tPe + 0.6, tiltA, EZ.inOut);
  // C08 truck ke kanan (isi bergeser ke kiri), menyambung ke 04b
  const truck = prog(t, P.end - 0.3, P.end, EZ.acc);
  const camX = -520 * truck;
  // fajar naik pelan sepanjang panel (teknologi tidak menunggu)
  const dawn = prog(t, P.start, P.end, (x) => x);
  const txtCol = camY < -250 ? "#0b1020" : "#fff";
  const twinkle = (i: number) => 0.75 + 0.25 * Math.sin(t * 2.1 + i * 1.7);

  // ── SFXEV (metronom SFX)
  sfxMark(t, "riser", P.start, "04a:cut:in"); // hard cut klip Jensen → horizon 04a (swell memuncak di cut)
  sfxMark(t, "whoosh", (tiltA + tiltB) / 2, "04a:cam:tiltdown"); // tilt turun −40 → −640 (segmen tercepat, EZ.inOut → tengah)
  // truck C08 (EZ.acc, puncak di batas 04a/04b) ditandai di 04b:cam:truck

  return (
    <Scene code="04a">
      <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
        <Camera scale={camS} x={camX} y={camY} oy={480} blur={truck * 6}>
          <div style={{ position: "absolute", left: -600, top: -300, width: 3120, height: 2100, background: SKY }} />
          {/* cahaya fajar: pita terang di horizon yang terus naik */}
          <div style={{
            position: "absolute", left: 960 - 1300, top: 900 - dawn * 120 - 300, width: 2600, height: 600, borderRadius: "50%",
            background: "radial-gradient(closest-side, color-mix(in srgb, var(--hz-100) 70%, transparent), transparent)", opacity: 0.55 + 0.35 * dawn,
          }} />
          {STARS.map(([x, y, s, o], i) => (
            <div key={i} style={{ position: "absolute", left: x * 2, top: y * 2, width: s * 2, height: s * 2, borderRadius: 9, background: "#fff", opacity: o * twinkle(i) }} />
          ))}
        </Camera>
        {/* v10 (#27): tidak ada frame kosong. «TEKNOLOGI INI» mengisi 1838–1860 (sebelum «nggak»); NGGAK PEDULI dipindah ke lapisan layar dan bertahan sampai
            cut ke 04b (1932) selagi tilt menurun; warna putih → tinta saat langit terang (kontras tinggi, bukan putih di atas biru muda). */}
        <AnchorWord text={"TEKNOLOGI\u2002INI"} at={1838} until={atNggak} x={960} y={480} size={150} color="#fff" align="center" enter="scale" />
        <AnchorWord text="NGGAK" at={atNggak} until={1934} x={930} y={480} size={200} color={txtCol} align="right" enter="left" />
        <AnchorWord text="PEDULI" at={atPeduli} until={1934} x={990} y={480} size={200} color={txtCol} align="left" enter="right"
          sfx={{ kind: "sub_impact", id: "04a:anchor:peduli" }} />
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S04a_GaPeduli, covers: ["04a"] };
