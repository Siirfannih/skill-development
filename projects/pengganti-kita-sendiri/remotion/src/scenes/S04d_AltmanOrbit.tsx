// 04d · Klip Sam Altman: «It is a legitimate single-person billion-dollar company…»
// Klip asli di kartu (frame-in-frame dari 04c), di-crop ke Altman (duduk di kanan frame sumber).
// Kata kutipan mengorbit dalam cincin 3D di sekitar Altman, muncul tepat saat diucapkan di klip:
// kata di depan terang/tajam, di belakang redup dan tertutup kartu. Kamera C19 drift + orbit pelan.
// Keluar X01: kartu menyusut jadi kartu bergaris biru (posisi 05a) bersama whoosh 75,195.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, useT } from "../lib/anim";
import { Clip, DOC_GRADE } from "../lib/media";
import { block, panel, word } from "../lib/time";
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
const OMEGA = -15; // derajat/detik (bagian depan bergerak ke kiri, ≤ 6 px/f agar kata terbaca)
type Item = { parts: { text: string; at: number }[]; phiAt: number; tRef: number };

const ringPos = (phiDeg: number) => {
  const r = (phiDeg * Math.PI) / 180;
  const z = Math.cos(r); // 1 = depan
  return { x: RC.x + RC.rx * Math.sin(r), y: RC.y + RC.ry * z, z, rot: -Math.sin(r) * 32 };
};

export const S04d_AltmanOrbit: React.FC = () => {
  const t = useT();
  const P = panel("04d");
  const B = block("altman");
  const tSingle = word("single", "altman").s;
  const tPerson = word("person", "altman").s;
  const tBillion = word("billion-dollar", "altman").s;
  const tComp = word("comp--", "altman").s;
  const tEnd = word("tell", "altman").e;

  // urutan baca kiri → tengah → kanan saat masing-masing diucapkan; jarak 120° di cincin
  const items: Item[] = [
    { parts: [{ text: "SINGLE", at: tSingle }, { text: "-PERSON", at: tPerson }], phiAt: -100, tRef: tSingle },
    { parts: [{ text: "BILLION-DOLLAR", at: tBillion }], phiAt: 0, tRef: tBillion },
    { parts: [{ text: "COMPANY", at: tComp }], phiAt: 92, tRef: tComp },
  ];
  const wordsOut = prog(t, tEnd + 0.12, T_SHRINK + 0.05, EZ.acc);
  const ringIn = prog(t, P.start + 0.05, P.start + 0.7, EZ.out);
  const drift = 1 + 0.03 * prog(t, P.start, T_SHRINK, (x) => x);
  const card = altCard(t);
  const stop = 1 - 0.18 * prog(t, tEnd + 0.1, T_SHRINK, EZ.inOut);

  const renderItem = (it: Item, i: number, front: boolean) => {
    const phi = it.phiAt + OMEGA * (t - it.tRef);
    const p = ringPos(phi);
    if ((p.z >= 0) !== front) return null;
    const d = (p.z + 1) / 2; // 0 belakang .. 1 depan
    const sc = 0.6 + 0.4 * d;
    const op = (0.32 + 0.68 * d * d) * (1 - wordsOut) * ringIn;
    const blur = (1 - d) * 2.4 + wordsOut * 8;
    return (
      <div key={i} style={{
        position: "absolute", left: p.x, top: p.y, transform: `translate(-50%, calc(-100% - 14px)) perspective(1600px) rotateY(${p.rot}deg) scale(${sc})`, transformOrigin: "50% 100%",
        fontFamily: "Inter", fontWeight: 800, fontSize: 92, letterSpacing: -1.5, lineHeight: 1, color: "#fff", whiteSpace: "nowrap",
        opacity: op, filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
      }}>
        {it.parts.map((w, j) => {
          const a = w.at + 2 / 30;
          const q = prog(t, a, a + 0.28, EZ.out);
          return (
            <span key={j} style={{ display: "inline-block", opacity: t < a ? 0 : Math.min(1, q * 2), filter: `blur(${(1 - q) * 10}px)`, transform: `translateY(${(1 - q) * 24}px)` }}>{w.text}</span>
          );
        })}
      </div>
    );
  };

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
        {items.map((it, i) => renderItem(it, i, false))}
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
        {items.map((it, i) => renderItem(it, i, true))}
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
