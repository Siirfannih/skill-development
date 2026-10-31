// 02a · Babak 2 «Janji» dibuka: kolase kertas gaya Wikipedia. Kartu artikel ChatGPT (bentuk Wikipedia asli),
// kalimat rilis 30 Nov 2022 diseleksi seperti drag-select browser di «pertama kali». Kata VO satu baris di bawah.
// Kamera C08 truck lambat dengan parallax per lapis; keluar X09 wipe ke kertas blueprint 02b.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { EZ, Grain, KWord, prog, Scene, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { C } from "./_b1_shared";

const P = panel("02a");
const W = (w: string) => word(w, "s2").s;
const T = {
  padahal: W("Padahal"), waktu: W("waktu"), ai: W("AI"), pertama: W("pertama"), kali: W("kali"), ramai: W("ramai"), dibicarakan: W("dibicarakan"),
};
const fr = 1 / FPS;
const WIPE_A = P.end - 7 * fr;

// lapis kolase (px layar). k = faktor parallax truck (jauh < 1 < dekat)
const PHOTOS = [
  { img: "wonder/54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg", x: 110, y: 110, w: 440, h: 248, k: 0.6, pos: "50% 40%" }, // meetup
  { img: "wonder/43cca1a394c8a5a50d96edbb22a2cddeef9b45d7e3a99ac323829deb292db7ca.jpg", x: 1500, y: 300, w: 300, h: 312, k: 0.8, pos: "50% 20%" }, // Altman
  { img: "wonder/193550038d18ec319191a1a059481c7292b65882cc01fa813359e8c67fa286d4.jpg", x: 150, y: 560, w: 360, h: 203, k: 0.75, pos: "50% 50%" }, // hackathon
];
// blok warna (palet agen) muncul satu per kata VO
const SQUARES = [
  { c: "#ff7a45", x: 528, y: 300, s: 44, at: T.waktu, k: 1.25 },
  { c: "#783ff6", x: 1432, y: 268, s: 48, at: T.ai, k: 1.3 },
  { c: "#02c88a", x: 486, y: 760, s: 40, at: T.pertama, k: 1.35 },
  { c: "#ff5c8a", x: 1770, y: 640, s: 40, at: T.ramai, k: 1.3 },
];

const LINK = "#3366cc"; // biru tautan Wikipedia (di atas putih)
const SEL = "#b3d4fc"; // warna seleksi teks Chrome

export const S02a_Wikipedia: React.FC = () => {
  const t = useT();
  const u = (t - P.start) / P.dur;
  const camX = 40 - 110 * u; // C08 truck lambat (drift linear)
  const card = prog(t, P.start + 2 * fr, P.start + 14 * fr, EZ.out);
  const sel = prog(t, T.pertama + 2 * fr, T.kali + 8 * fr, EZ.inOut);
  const wipe = prog(t, WIPE_A, P.end, EZ.inOut);
  return (
    <Scene code="02a" name="02a Wikipedia">
      <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
        {/* lapis jauh: potongan foto */}
        {PHOTOS.map((p, i) => {
          const q = prog(t, P.start + i * 2 * fr, P.start + (i * 2 + 10) * fr, EZ.out);
          return (
            <Img key={i} src={staticFile(p.img)} style={{
              position: "absolute", left: p.x + camX * p.k, top: p.y + (1 - q) * 30, width: p.w, height: p.h, objectFit: "cover", objectPosition: p.pos,
              opacity: q, transform: `scale(${0.97 + 0.03 * q})`, filter: "saturate(0.85)",
            }} />
          );
        })}
        {/* lapis tengah: kartu artikel Wikipedia */}
        <div style={{
          position: "absolute", left: 460 + camX, top: 300 + (1 - card) * 40, width: 1000, opacity: Math.min(1, card * 1.6),
          background: "#ffffff", border: "2px solid #d2d2d7", boxShadow: "0 40px 100px rgba(29,29,31,0.08)", padding: "40px 52px 44px",
          fontFamily: "Inter", color: C.ink,
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 40 }}>W</span>
            <span style={{ fontSize: 24, letterSpacing: 4, color: "#54595d" }}>WIKIPEDIA</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", color: "#54595d", marginLeft: 4 }}>The Free Encyclopedia</span>
          </div>
          <div style={{ fontFamily: "Georgia, 'Linux Libertine', serif", fontSize: 64, lineHeight: 1, padding: "18px 0 14px", borderBottom: "2px solid #a2a9b1" }}>ChatGPT</div>
          <div style={{ fontSize: 22, color: "#54595d", margin: "14px 0 10px" }}>From Wikipedia, the free encyclopedia</div>
          <div style={{ fontSize: 32, lineHeight: 1.6 }}>
            <b>ChatGPT</b> is a <span style={{ color: LINK }}>generative artificial intelligence</span> <span style={{ color: LINK }}>chatbot</span> developed by{" "}
            <span style={{ color: LINK }}>OpenAI</span> and{" "}
            <span style={{
              backgroundImage: `linear-gradient(${SEL}, ${SEL})`, backgroundRepeat: "no-repeat", backgroundSize: `${sel * 100}% 100%`,
              WebkitBoxDecorationBreak: "slice", boxDecorationBreak: "slice",
            }}>released on November 30, 2022.</span>{" "}
            It became one of the fastest-growing consumer apps in history.
          </div>
        </div>
        {/* lapis dekat: blok warna, satu per kata */}
        {SQUARES.map((s, i) => {
          const q = prog(t, s.at + 2 * fr, s.at + 6 * fr, EZ.out);
          return <div key={i} style={{ position: "absolute", left: s.x + camX * s.k, top: s.y, width: s.s, height: s.s, background: s.c, transform: `scale(${q})` }} />;
        })}
        {/* kata VO per kata, satu baris di bawah kolase */}
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 116 }}>
          <div style={{ display: "flex", gap: 22, fontFamily: "Inter", fontSize: 80, fontWeight: 600, letterSpacing: -2, color: C.ink, lineHeight: 1, whiteSpace: "nowrap" }}>
            <KWord at={T.padahal} kind="pop">Padahal</KWord>
            <KWord at={T.waktu} kind="pop">waktu</KWord>
            <KWord at={T.ai} kind="pop" style={{ fontWeight: 900 }}>AI</KWord>
            <KWord at={T.pertama} kind="pop">pertama</KWord>
            <KWord at={T.kali} kind="pop">kali</KWord>
            <KWord at={T.ramai} kind="pop">ramai</KWord>
            <KWord at={T.dibicarakan} kind="pop">dibicarakan</KWord>
          </div>
        </AbsoluteFill>
        <Grain opacity={0.04} />
        {/* X09 wipe kiri→kanan ke kertas blueprint 02b (latar & grid identik dengan panel 02b) */}
        {wipe > 0 && (
          <>
            <AbsoluteFill style={{
              clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`,
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.16) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.16) 2px, transparent 2px), linear-gradient(160deg, #06368a 0%, #042b79 100%)",
              backgroundSize: "96px 96px, 96px 96px, 100% 100%",
            }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 52, height: 1080, borderRight: "2px solid rgba(255,255,255,0.4)" }} />
            </AbsoluteFill>
            {wipe < 1 && <div style={{ position: "absolute", left: wipe * 1920 - 2, top: 0, width: 4, height: 1080, background: "#fff" }} />}
          </>
        )}
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02a_Wikipedia, covers: ["02a"] };
