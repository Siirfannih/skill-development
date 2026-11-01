// 04d · Klip Sam Altman: «It is a legitimate single-person billion-dollar company…»
// Klip asli di kartu (frame-in-frame dari 04c), di-crop ke Altman (duduk di kanan frame sumber).
// v10 (Irfan 9): Altman FULL FRAME; cincin orbit + kata orbit + tumpukan SINGLE/BILLION/COMPANY DIBUANG; matte tidak dipakai.
// Kutipan = SATU baris besar «SINGLE PERSON BILLION DOLLAR COMPANY», tiap kata muncul pada onsetnya (BILLION = penekanan), di depan klip, di area aman.
// Keluar X01: kartu menyusut jadi kartu bergaris biru (posisi 05a) bersama whoosh 75,195.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, sfxMark, useT } from "../lib/anim";
import { Clip, DOC_GRADE } from "../lib/media";
import { block, FPS, panel, word } from "../lib/time";
import { AnchorWord } from "../lib/AnchorWord";
import { textWidth } from "../lib/SpeakerWords";
import { altCard, ALTMAN_STILL, CLIP_CARD, T_SHRINK, T_STILL } from "./_b4_shared";

// crop sumber 1920×1080 → kartu: Altman di tengah kartu
const SRC_S = 1.6; // jendela sumber 1200×675: x 720–1920, y 60–735 → Altman di kanan (x ≈ 0,67–0,87 lebar layar), mikrofon + kursi di kiri
const SRC_X0 = 720;
const SRC_Y0 = 60;
const IN_S = 5.27;
const OUT_S = 8.72;
const TAIL = 0.73; // gambar (tanpa suara) diperpanjang sampai batas 05a, saat kartu sudah menyusut (cut on motion)

// v10: satu baris kutipan, dipusatkan; lebar total ≤ 1290 px × drift 1,04 ≤ 1344 = safe zone x 288–1632 (teks di luar kamera C01)
const QUOTE = [
  { text: "SINGLE", at: 2162, size: 100 },
  { text: "PERSON", at: 2169, size: 100 },
  { text: "BILLION", at: 2182, size: 100 }, // aturan Irfan: ukuran seragam; penekanan = warna aksen
  { text: "DOLLAR", at: 2189, size: 100 },
  { text: "COMPANY", at: 2209, size: 100 },
];
const QUOTE_Y = 540;
const layoutQuote = () => {
  const gap = (a: number, b: number) => 0.3 * Math.min(a, b);
  const raw = QUOTE.reduce((acc, w, i) => acc + textWidth(w.text, w.size) + (i ? gap(QUOTE[i - 1].size, w.size) : 0), 0);
  const k = Math.min(1, 1290 / raw);
  let x = 960 - (raw * k) / 2;
  return QUOTE.map((w, i) => {
    if (i) x += gap(QUOTE[i - 1].size, w.size) * k;
    const out = { ...w, size: w.size * k, x };
    x += textWidth(w.text, w.size) * k;
    return out;
  });
};

export const S04d_AltmanOrbit: React.FC = () => {
  const t = useT();
  const P = panel("04d");
  const B = block("altman");
  const tBillion = word("billion-dollar", "altman").s;
  const tEnd = word("tell", "altman").e;

  const outW = Math.round(T_SHRINK * FPS); // teks hilang tepat saat kartu mulai menyusut
  const wordsOut = prog(t, tEnd + 0.12, T_SHRINK + 0.05, EZ.acc);
  const drift = 1 + 0.03 * prog(t, P.start, T_SHRINK, (x) => x);
  const QW = layoutQuote();
  const card = altCard(t);
  const stop = 1 - 0.18 * prog(t, tEnd + 0.1, T_SHRINK, EZ.inOut);

  // ── SFXEV (metronom SFX). Kartu menyusut (T_SHRINK…T_SHRINK_END) & ganti ke foto diam (T_STILL) dirender 05a.
  sfxMark(t, "cut", P.start, "04d:clip:in"); // isi kartu: grafik 04c → klip Altman

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
        <Camera scale={keys(t, [[tBillion, 1], [tBillion + 0.65, 1.06], [T_SHRINK - 0.35, 1.0]], EZ.inOut) } oy={540}>
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
        </Camera>
        {/* v10 (Irfan 9): satu baris, kata muncul pada onset (frame absolut). Di depan klip; boleh menutup torso/wajah (ruang logis, bukan ruang kosong lain). */}
        {QW.map((w) => (
          <AnchorWord key={w.text} text={w.text} at={w.at} until={outW} x={w.x} y={QUOTE_Y} size={w.size} color={w.text === "BILLION" ? "#FFD84A" : "#fff"} align="left" enter="scale" grain={0.25}
            shadow="0 4px 36px rgba(0,0,0,0.6)" sfx={w.text === "BILLION" ? { kind: "sub_impact", id: "04d:anchor:billion" } : undefined} />
        ))}
        {/* atribusi */}
        <div style={{ position: "absolute", top: 826, left: 288, textAlign: "left", background: "rgba(0,0,0,0.5)", padding: "10px 18px", borderRadius: 10, fontFamily: "Inter", fontWeight: 600, fontSize: 26, letterSpacing: 4.2, color: "rgba(255,255,255,0.88)", opacity: prog(t, P.start + 0.3, P.start + 0.8, EZ.out) * (1 - wordsOut) }}>
          SAM ALTMAN · CEO OPENAI · MOSTLY HUMAN
        </div>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S04d_AltmanOrbit, covers: ["04d"] };
