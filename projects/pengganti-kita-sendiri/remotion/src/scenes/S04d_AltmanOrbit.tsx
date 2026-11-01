// 04d · Klip Sam Altman: «It is a legitimate single-person billion-dollar company…»
// Klip asli di kartu (frame-in-frame dari 04c), di-crop ke Altman (duduk di kanan frame sumber).
// Kata kutipan mengorbit dalam cincin 3D di sekitar Altman, muncul tepat saat diucapkan di klip:
// kata di depan terang/tajam, di belakang redup dan tertutup kartu. Kamera C19 drift + orbit pelan.
// Keluar X01: kartu menyusut jadi kartu bergaris biru (posisi 05a) bersama whoosh 75,195.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, sfxMark, useT } from "../lib/anim";
import { Clip, DOC_GRADE } from "../lib/media";
import { block, FPS, panel, word } from "../lib/time";
import { AnchorStage, AnchorWord, useFrameAt } from "../lib/AnchorWord";
import { MatteClip, useSubjectMatte } from "../lib/SubjectMatte";
import { orbitLine, SpeakerWords, wordAt } from "../lib/SpeakerWords";
import { altCard, ALTMAN_STILL, CLIP_CARD, T_SHRINK, T_STILL } from "./_b4_shared";

// crop sumber 1920×1080 → kartu: Altman di tengah kartu
const SRC_S = 1.45;
const SRC_X0 = 1620 - CLIP_CARD.w / SRC_S / 2;
const SRC_Y0 = 30;
const IN_S = 5.27;
const OUT_S = 8.72;
const TAIL = 0.73; // gambar (tanpa suara) diperpanjang sampai batas 05a, saat kartu sudah menyusut (cut on motion)

// cincin
const RC = { x: 960, y: 545, rx: 650, ry: 150 };
// v9 (B10): kata orbit dibuang → SINGLE / BILLION / COMPANY = AnchorWord satu baris sejajar kepala Altman (di belakang kepala bila matte ada). "-PERSON" dibuang.

export const S04d_AltmanOrbit: React.FC = () => {
  const t = useT();
  const P = panel("04d");
  const B = block("altman");
  const tBillion = word("billion-dollar", "altman").s;
  const tEnd = word("tell", "altman").e;

  const matteAltman = useSubjectMatte("altman"); // null selama stub → teks di depan klip
  const atSingle = useFrameAt(2162), atBillion = useFrameAt(2182), atCompany = useFrameAt(2209), outW = useFrameAt(Math.round((T_SHRINK + 0.05) * FPS)); // v9: f terukur #19
  const wordsOut = prog(t, tEnd + 0.12, T_SHRINK + 0.05, EZ.acc);
  const ringA = P.start + 0.05;
  const ringIn = prog(t, ringA, P.start + 0.7, EZ.out);
  const drift = 1 + 0.03 * prog(t, P.start, T_SHRINK, (x) => x);
  const card = altCard(t);
  const stop = 1 - 0.18 * prog(t, tEnd + 0.1, T_SHRINK, EZ.inOut);

  // ── SFXEV (metronom SFX). Kartu menyusut (T_SHRINK…T_SHRINK_END) & ganti ke foto diam (T_STILL) dirender 05a.
  sfxMark(t, "cut", P.start, "04d:clip:in"); // isi kartu: grafik 04c → klip Altman
  sfxMark(t, "draw", ringA, "04d:ring"); // cincin orbit mulai tergambar

  const ellipse = (half: "back" | "front") => {
    // setengah atas = belakang (redup, di belakang kartu), setengah bawah = depan
    const sweep = half === "back" ? 1 : 0;
    const d = `M ${RC.x - RC.rx} ${RC.y} A ${RC.rx} ${RC.ry} 0 0 ${sweep} ${RC.x + RC.rx} ${RC.y}`;
    return (
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, opacity: ringIn * (1 - wordsOut) }}>
        <path d={d} stroke="#fff" strokeOpacity={half === "back" ? 0.22 : 0.7} strokeWidth={half === "back" ? 3 : 4} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ringIn} />
      </svg>
    );
  };

  const showStill = t >= T_STILL;
  // crop: titik sumber → kartu (drift C19 di pusat kartu, lalu ikut ukuran kartu saat menyusut)
  const f2 = Math.max(card.w / CLIP_CARD.w, card.h / CLIP_CARD.h);
  const cx = CLIP_CARD.w / 2;
  const cy = CLIP_CARD.h / 2;
  const m = f2 * drift * SRC_S;
  const ax = (card.w - CLIP_CARD.w * f2) / 2 + f2 * (cx - drift * (SRC_X0 * SRC_S + cx));
  const ay = (card.h - CLIP_CARD.h * f2) / 2 + f2 * (cy - drift * (SRC_Y0 * SRC_S + cy));
  const crop = `translate(${ax}px, ${ay}px) scale(${m})`;
  return (
    <Scene code="04d">
      <AbsoluteFill style={{ background: "var(--sb-charcoal)" }}>
        {/* C01 zoom mikro di «billion-dollar» (inti kutipan), kembali pelan ke 1,0 sebelum kartu menyusut */}
        <Camera scale={keys(t, [[tBillion, 1], [tBillion + 0.65, 1.06], [T_SHRINK - 0.35, 1.0]], EZ.inOut) } oy={RC.y}>
        {ellipse("back")}
        {/* kartu klip */}
        <div style={{
          position: "absolute", left: card.x, top: card.y, width: card.w, height: card.h, borderRadius: card.r, overflow: "hidden",
          background: card.border > 0 ? "var(--sb-blue)" : "#000", padding: card.border, boxSizing: "border-box",
          boxShadow: `0 30px 80px rgba(0,0,0,${0.45 * (1 - card.p)}), 0 14px 30px color-mix(in srgb, var(--sb-blue) ${30 * card.p}%, transparent)`,
        }}>
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: Math.max(0, card.r - card.border) }}>
            {!showStill && (
              <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transformOrigin: "0 0", transform: crop }}>
                <Clip src="clips/altman_src_838.mp4" at={B.t} inS={IN_S} outS={OUT_S + TAIL} grade={`${DOC_GRADE} brightness(${stop})`} />
              </div>
            )}
            {showStill && <Img src={staticFile(ALTMAN_STILL)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
        </div>
        {ellipse("front")}
        {/* v9 (B10): anchor di BELAKANG kepala Altman: kartu → teks → matte (fg, crop identik). Matte null → teks di depan klip. Satu baris, tinggi kepala (y 330). */}
        <AnchorStage bg={null} fg={matteAltman && !showStill ? (
          <div style={{ position: "absolute", left: card.x, top: card.y, width: card.w, height: card.h, borderRadius: card.r, overflow: "hidden" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transformOrigin: "0 0", transform: crop }}>
                <MatteClip src={matteAltman} at={B.t} inS={IN_S} outS={OUT_S + TAIL} />
              </div>
            </div>
          </div>
        ) : undefined}>
          <AnchorWord text="SINGLE" at={atSingle} until={outW} x={340} y={330} size={108} color="#fff" align="right" enter="left" shadow="0 4px 30px rgba(0,0,0,0.6)" />
          <AnchorWord text="BILLION" at={atBillion} until={outW} x={790} y={330} size={108} color="#fff" align="right" enter="scale" shadow="0 4px 30px rgba(0,0,0,0.6)"
            sfx={{ kind: "sub_impact", id: "04d:anchor:billion" }} />
          <AnchorWord text="COMPANY" at={atCompany} until={outW} x={1130} y={330} size={108} color="#fff" align="left" enter="right" shadow="0 4px 30px rgba(0,0,0,0.6)" />
        </AnchorStage>
        {/* F2: kata Altman non-anchor berjalan di BUSUR DEPAN cincin orbit (kiri→kanan), miring mengikuti singgung busur (halus),
            di depan kartu dan di DEPAN matte (sengaja di luar AnchorStage). Dua ruang kosong (setelah «legitimate» dan setelah «person»)
            = tempat anchor SINGLE / BILLION COMPANY yang duduk di belakang kepala. */}
        <SpeakerWords until={Math.round((T_SHRINK + 0.05) * FPS)} words={orbitLine([
          { text: "it", at: wordAt("altman", "it"), size: 52 },
          { text: "is", at: wordAt("altman", "is"), size: 52 },
          { text: "a", at: wordAt("altman", "a"), size: 52 },
          { text: "legitimate", at: wordAt("altman", "legitimate"), size: 74 },
          { text: "person", at: wordAt("altman", "person"), size: 62 },
          { text: "as", at: wordAt("altman", "as"), size: 48 },
          { text: "far", at: wordAt("altman", "far"), size: 48 },
          { text: "as", at: wordAt("altman", "as", 2), size: 48 },
          { text: "i", at: wordAt("altman", "i"), size: 48 },
          { text: "can", at: wordAt("altman", "can"), size: 48 },
          { text: "tell", at: wordAt("altman", "tell"), size: 70, kind: "last" },
        ], RC, { gapsAfter: { 3: 150, 4: 230 }, fill: 0.94 })} />
        {/* atribusi */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 872, textAlign: "center", fontFamily: "Inter", fontWeight: 600, fontSize: 26, letterSpacing: 4.2, color: "rgba(255,255,255,0.6)", opacity: prog(t, P.start + 0.3, P.start + 0.8, EZ.out) * (1 - wordsOut) }}>
          SAM ALTMAN · CEO OPENAI · MOSTLY HUMAN
        </div>
        </Camera>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S04d_AltmanOrbit, covers: ["04d"] };
