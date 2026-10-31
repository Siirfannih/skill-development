// 00a–00b · Cold open: supercut berita (audio v11) + montase founder + slot swap FOUNDER → CEO → SEMALAM.
// Pola dari referensi siirfannih_DfDC0I9PHin: footage berganti per frasa, suara asli disambung rapat.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, keys, prog, Scene, shake, useT, Grain } from "../lib/anim";
import { Clip, DOC_GRADE } from "../lib/media";
import { block, FPS, panel } from "../lib/time";
import cues from "../../public/data/cues11.json";

const tick = (id: string) => (cues as any[]).find((c) => c.id.startsWith("tick_z0") && c.why.includes(id)).t as number;
const T_FOUNDER = tick("FOUNDER");
const T_CEO = tick("CEO");
const T_SEMALAM = tick("SEMALAM");

// spans = detik di file sumber (sama dengan assemble11.py NEWS) → posisi di timeline
type NewsDef = { name: string; file: string; spans: [number, number][]; label: string };
const NEWS: NewsDef[] = [
  { name: "news_gates", file: "news/P_6RhqaMUts_76.5.mp4", spans: [[0, 1.34], [2.42, 3.42], [4.34, 5.4]], label: "CNBC" },
  { name: "news_teen", file: "news/CXFtV0WAN7k_19.5.mp4", spans: [[0.87, 1.63], [2.09, 3.74]], label: "SKY NEWS" },
  { name: "news_billion", file: "news/VuyOy5WN980_0.mp4", spans: [[1.07, 2.74]], label: "BLOOMBERG" },
  { name: "news_fast", file: "news/DKA5AkrQfxo_56.5.mp4", spans: [[1.06, 1.7], [2.24, 3.5]], label: "SKY NEWS" },
];
// potongan di timeline: tiap span diperpanjang sampai span berikutnya mulai (tidak ada frame kosong)
const CUTS = (() => {
  const out: { file: string; at: number; inS: number; outS: number; label: string; idx: number }[] = [];
  NEWS.forEach((n) => {
    let t = block(n.name).t;
    n.spans.forEach(([a, b], i) => {
      out.push({ file: n.file, at: t, inS: a, outS: b, label: n.label, idx: i });
      t += b - a + 0.03;
    });
  });
  for (let i = 0; i < out.length - 1; i++) out[i].outS = out[i].inS + (out[i + 1].at - out[i].at);
  return out;
})();

// montase foto founder (6–8 f per foto) di span 2–3 kalimat Gates, terkunci ke grid 1/8 ostinato (0,255 dtk)
const PHOTOS = [
  "30f18ba51b261b88d6986105a30b3219733874950edff61f4cf1762dbd412bf5.jpg",
  "54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg",
  "a084d6713bd51936e5f2514555d8aad21d6e4470957796029947348a1493dee0.jpg",
  "193550038d18ec319191a1a059481c7292b65882cc01fa813359e8c67fa286d4.jpg",
  "f46925a87f669ce6a3a61cb6efe4882c1957b7e131988a67a6fd1799bbe6bc9e.jpg",
  "6eda1bd3b11f988bdedbbb4a4caf766bcab8a36eb3b4cdfae840f0c8311076bb.jpg",
  "cf62d8467f160bc4293f098cb9a24564fe12fca16dc033f1060380dc5e43b663.jpg",
  "653933ac539310f41d2288501c1ffb8e67c47b10758b6785a5d2d9e60e441859.jpg",
];
const MONTAGE_A = CUTS[1].at; // «technical thing»
const MONTAGE_B = CUTS[3].at; // berhenti saat Sky News masuk
const STEP = 0.2554;

// awan gambar 00b (posisi dari panel Wonder 00b ×2), z = kedalaman parallax
const CLOUD = [
  { img: "54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg", x: 80, y: 80, w: 340, h: 192, z: 0.9 },
  { img: "193550038d18ec319191a1a059481c7292b65882cc01fa813359e8c67fa286d4.jpg", x: 500, y: 40, w: 240, h: 140, z: 0.55 },
  { img: "30f18ba51b261b88d6986105a30b3219733874950edff61f4cf1762dbd412bf5.jpg", x: 1400, y: 60, w: 360, h: 208, z: 1.0 },
  { img: "f46925a87f669ce6a3a61cb6efe4882c1957b7e131988a67a6fd1799bbe6bc9e.jpg", x: 1720, y: 300, w: 240, h: 140, z: 0.5 },
  { img: "a084d6713bd51936e5f2514555d8aad21d6e4470957796029947348a1493dee0.jpg", x: 120, y: 760, w: 400, h: 232, z: 1.1 },
  { img: "6eda1bd3b11f988bdedbbb4a4caf766bcab8a36eb3b4cdfae840f0c8311076bb.jpg", x: 600, y: 840, w: 240, h: 140, z: 0.6 },
  { img: "0b2f2da534f00131095234ec5f6dc8de72ba4c9053c979795f3cf1043830f75f.png", x: 1280, y: 800, w: 420, h: 244, z: 1.15 },
  { img: "d465a6b0c5cadf6fe67276beec88ccd0d4f8c1175570f664dc0bdeacaebde531.jpg", x: 300, y: 460, w: 180, h: 108, z: 0.35 },
  { img: "cf62d8467f160bc4293f098cb9a24564fe12fca16dc033f1060380dc5e43b663.jpg", x: 1480, y: 480, w: 180, h: 108, z: 0.35 },
  { img: "653933ac539310f41d2288501c1ffb8e67c47b10758b6785a5d2d9e60e441859.jpg", x: 860, y: 80, w: 200, h: 120, z: 0.45 },
  { img: "081067b5c127cff324887ff17cf5454ef60f4d9673b32f58c6d68d7a05080c6b.jpg", x: 960, y: 900, w: 220, h: 128, z: 0.55 },
  { img: "93987e2cbc28b5f73cf29d949b9c18e884c32421aa1d8446bef8f8b72d7b9a4a.jpg", x: 1760, y: 880, w: 180, h: 108, z: 0.4 },
];

export const SLAM_STYLE: React.CSSProperties = {
  fontFamily: "Inter", fontWeight: 900, fontSize: 300, letterSpacing: -12, lineHeight: 1, color: "#FAF8EC", whiteSpace: "nowrap",
};

/** Slot swap T07 di posisi tetap: kata lama keluar ke atas 4 f, kata baru naik dari bawah + slam. */
export const SlotWord: React.FC<{ text: string; at: number; out?: number; size?: number }> = ({ text, at, out, size = 300 }) => {
  const t = useT();
  if (t < at - 1 / FPS) return null;
  const fr = Math.round((t - at) * FPS);
  const sc = fr <= 0 ? 1.9 : fr === 1 ? 1.25 : 1.0;
  const blur = fr <= 0 ? 8 : fr === 1 ? 2.5 : 0;
  const q = out !== undefined ? prog(t, out, out + 4 / FPS, EZ.acc) : 0;
  if (q >= 1) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <div style={{ ...SLAM_STYLE, fontSize: size, transform: `translateY(${-q * 340}px) perspective(1400px) rotateY(${fr <= 0 ? 14 : fr === 1 ? 4 : 0}deg) scale(${sc})`, filter: blur || q ? `blur(${Math.max(blur, q * 14)}px)` : undefined, opacity: 1 - q * 0.6 }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const S00_ColdOpen: React.FC = () => {
  const t = useT();

  const pB = panel("00b");
  const shrinkAt = CUTS[CUTS.length - 1].at; // «progress» → footage menyusut jadi satu foto di awan
  const sh = { x: shake(t, T_FOUNDER, 10).x + shake(t, T_CEO, 8).x + shake(t, T_SEMALAM, 12).x, y: shake(t, T_FOUNDER, 10).y + shake(t, T_SEMALAM, 12).y };
  // redup footage saat kata slam ada di layar (keterbacaan tanpa scrim)
  const dimF = t >= T_FOUNDER && t < shrinkAt ? 0.58 : 1;
  // reveal-out 00b (C06): kamera mundur ×3, akselerasi singkat lalu deselerasi panjang
  const rev = keys(t, [[shrinkAt, 0], [shrinkAt + 0.3, 0.35], [pB.end, 1]], EZ.out);
  const cardScale = 1 - rev * 0.84;
  return (
    <Scene start={0} end={pB.end} name="00a–00b Cold open">
      <AbsoluteFill style={{ background: "#101216" }}>
        {/* awan gambar 3D (muncul saat footage terakhir menyusut) */}
        {t >= shrinkAt &&
          CLOUD.map((c, i) => {
            const s = 1 + (1 - rev) * (2.2 * c.z);
            const cx = 960 + (c.x + c.w / 2 - 960) * s;
            const cy = 540 + (c.y + c.h / 2 - 540) * s;
            const op = prog(t, shrinkAt + 0.04 * i, shrinkAt + 0.25 + 0.04 * i) * (0.35 + 0.5 * c.z / 1.15);
            return (
              <Img key={i} src={staticFile("wonder/" + c.img)}
                style={{ position: "absolute", left: cx - (c.w * s) / 2, top: cy - (c.h * s) / 2, width: c.w * s, height: c.h * s, objectFit: "cover", borderRadius: 12, opacity: op, filter: `${DOC_GRADE} blur(${(1 - c.z) * 2.5}px)` }} />
            );
          })}
        <Camera x={sh.x} y={sh.y}>
          {/* footage berita per frasa, cut zoom bergantian (C20) + zoom mikro (C01) */}
          <AbsoluteFill style={{ transform: t >= shrinkAt ? `scale(${cardScale})` : undefined, borderRadius: t >= shrinkAt ? 24 / cardScale : 0, overflow: "hidden", opacity: dimF === 1 ? 1 : 1 }}>
            {CUTS.map((c, i) => {
              const z = [1.0, 1.22, 1.38][c.idx % 3] * (1 + 0.04 * prog(t, c.at, c.at + 0.6, EZ.inOut));
              return (
                <Clip key={i} src={c.file} at={c.at} inS={c.inS} outS={c.outS}
                  style={{ transform: `scale(${z})`, transformOrigin: "50% 42%" }} grade={`${DOC_GRADE} brightness(${dimF})`} />
              );
            })}
            {/* montase foto founder di atas Gates (6–8 f per foto) */}
            {t >= MONTAGE_A && t < MONTAGE_B &&
              (() => {
                const k = Math.floor((t - MONTAGE_A) / STEP) % PHOTOS.length;
                const local = (t - MONTAGE_A) % STEP;
                return (
                  <Img src={staticFile("wonder/" + PHOTOS[k])}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: DOC_GRADE, transform: `scale(${1.04 + local * 0.35})` }} />
                );
              })()}
          </AbsoluteFill>
        </Camera>
        {/* label sumber (atribusi), kecil, di atas zona UI 8 % bawah */}
        {t < shrinkAt + 0.2 && (() => {
          const c = [...CUTS].reverse().find((x) => t >= x.at) ?? CUTS[0];
          const inMontage = t >= MONTAGE_A && t < MONTAGE_B;
          return (
            <div style={{ position: "absolute", left: 96, bottom: 120, fontFamily: "JetBrains Mono", fontWeight: 500, fontSize: 26, letterSpacing: 4, color: "rgba(250,248,236,0.72)", opacity: inMontage ? 0 : 1 }}>
              {c.label}
            </div>
          );
        })()}
        {/* slot swap FOUNDER → CEO → SEMALAM. (tipe sama dengan 05f) */}
        <SlotWord text="FOUNDER" at={T_FOUNDER} out={T_CEO - 4 / FPS} />
        <SlotWord text="CEO" at={T_CEO} out={shrinkAt + 0.1} />
        <SlotWord text="SEMALAM" at={T_SEMALAM} size={260} />
        <Grain opacity={0.06} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S00_ColdOpen, covers: ["00a", "00b"] };
