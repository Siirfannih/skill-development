// 02a · Babak 2 «Janji» dibuka: kolase kertas gaya Wikipedia. Kartu artikel ChatGPT (bentuk Wikipedia asli),
// kalimat rilis 30 Nov 2022 diseleksi seperti drag-select browser di «pertama kali». Kata VO satu baris di bawah.
// Kamera C08 truck lambat dengan parallax per lapis; keluar X09 wipe ke kertas blueprint 02b.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, prog, Scene, sfxMark, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { C, ezHalf } from "./_b1_shared";

const P = panel("02a");
const W = (w: string) => word(w, "s2").s;
const T = {
  padahal: W("Padahal"), waktu: W("waktu"), ai: W("AI"), pertama: W("pertama"), kali: W("kali"), ramai: W("ramai"), dibicarakan: W("dibicarakan"),
};
const fr = 1 / FPS;
const WIPE_A = P.end - 7 * fr;
const CUTZ = T.pertama + 2 * fr; // C20 cut zoom ke kalimat rilis, bersamaan «pertama» (bunyi kata yang sudah ada)
const SNAP = T.dibicarakan - 0.14; // patah ke wide sebelum kata penutup (whoosh_s 02a_snap_wide)
const P1D_END = panel("01d").end; // batas babak B1 → B2: hit riser isi wireframe 01d (frame pertama adegan ini)
const CARD_A = P.start - 4 * fr, CARD_B = P.start + 12 * fr; // kartu Wikipedia masuk (R4: sudah tampil di frame pertama — tidak ada 3 frame putih kosong)
const SEL_A = T.pertama + 2 * fr; // drag-select kalimat rilis mulai
const SEL_Q = { x: 960, y: 640 }; // titik dunia kalimat yang diseleksi (baris 2–3 paragraf kartu)

// lapis kolase (px layar). k = faktor parallax truck (jauh < 1 < dekat)
const PHOTOS = [
  { img: "wonder/54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg", x: 110, y: 110, w: 440, h: 248, k: 0.6, pos: "50% 40%" }, // meetup
  { img: "wonder/43cca1a394c8a5a50d96edbb22a2cddeef9b45d7e3a99ac323829deb292db7ca.jpg", x: 1500, y: 300, w: 300, h: 312, k: 0.8, pos: "50% 20%" }, // Altman
  { img: "wonder/193550038d18ec319191a1a059481c7292b65882cc01fa813359e8c67fa286d4.jpg", x: 150, y: 560, w: 360, h: 203, k: 0.75, pos: "50% 50%" }, // hackathon
];
const LINK = "#3366cc"; // biru tautan Wikipedia (di atas putih)
const SEL = "#b3d4fc"; // warna seleksi teks Chrome

export const S02a_Wikipedia: React.FC = () => {
  const t = useT();
  const u = (t - P.start) / P.dur;
  const camX = 40 - 110 * u; // C08 truck lambat (drift linear)
  const card = prog(t, CARD_A, CARD_B, EZ.out);
  const sel = prog(t, SEL_A, T.kali + 8 * fr, EZ.inOut);
  const wipe = prog(t, WIPE_A, P.end, EZ.inOut);
  // kamera: wide + truck C08 → C01 di «AI» → C20 cut zoom 1,85× ke seleksi (momentum 6 f) → patah wide 5 f → wipe
  const c01 = 1 + 0.06 * prog(t, T.ai + 2 * fr, T.ai + 20 * fr, EZ.out);
  const inClose = t >= CUTZ ? 1 - prog(t, SNAP, SNAP + 5 * fr, EZ.out) : 0;
  const sC = 1.6 + 0.07 * prog(t, CUTZ, CUTZ + 6 * fr, EZ.out);
  const sW = t < CUTZ ? c01 : 1.0;
  const sc = sW + (sC - sW) * inClose;
  const qx = 960 * (1 - inClose) + (SEL_Q.x + camX) * inClose;
  const qy = 540 * (1 - inClose) + SEL_Q.y * inClose;
  const gy = 540 * (1 - inClose) + 565 * inClose; // R2-D: seleksi diturunkan 450→565 supaya header «WIKIPEDIA» utuh di close-up (v10: terpotong tepi atas 21,3–21,9 s)
  const cam = { x: 960 - qx * sc, y: gy - qy * sc };
  // SFXEV · metronom (konstanta yang sama dengan animasi di bawah)
  sfxMark(t, "riser", P1D_END, "01d:fill:riser"); // isi wireframe (kurva ^2,2) → hard cut batas babak
  sfxMark(t, "cut", P.start, "02a:cut:babak");
  sfxMark(t, "whoosh", 23.0, "02a:cut:wipe"); // R2-D (P2 #19): transisi besar 23,0 s (wipe biru) diberi hit whoosh tepat di frame 690
  PHOTOS.forEach((_, i) => sfxMark(t, "pop", ezHalf(P.start + i * 2 * fr, P.start + (i * 2 + 10) * fr), `02a:photo:${i}`));
  sfxMark(t, "pop", ezHalf(CARD_A, CARD_B), "02a:card:wiki");
  sfxMark(t, "cut", CUTZ, "02a:cut:zoom"); // C20 cut zoom 1,85× ke kalimat rilis
  sfxMark(t, "click", SEL_A, "02a:select:start"); // drag-select browser mulai (tekan)
  sfxMark(t, "whoosh", SNAP, "02a:cam:snapwide"); // patah ke wide 5 f EZ.out
  sfxMark(t, "whoosh", ezHalf(WIPE_A, P.end, EZ.inOut), "02a:wipe:x09"); // X09 wipe 7 f EZ.inOut → puncak di tengah
  const snapBlur = t >= SNAP && inClose > 0.1 && inClose < 0.95 ? 2.5 * inClose : 0;
  return (
    <Scene code="02a" name="02a Wikipedia">
      <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
        <Camera scale={sc} x={cam.x} y={cam.y} ox={0} oy={0} blur={snapBlur}>
        {/* lapis jauh: potongan foto */}
        {PHOTOS.map((p, i) => {
          const q = Math.max(0.5, prog(t, P.start + i * 2 * fr, P.start + (i * 2 + 10) * fr, EZ.out));
          return (
            <Img key={i} src={staticFile(p.img)} style={{
              position: "absolute", left: p.x + camX * p.k, top: p.y + (1 - q) * 30, width: p.w, height: p.h, objectFit: "cover", objectPosition: p.pos,
              opacity: q, transform: `scale(${0.97 + 0.03 * q})`, filter: "saturate(0.85)",
            }} />
          );
        })}
        {/* v10 (Irfan 5): «AI» hitam raksasa di belakang kartu DIHAPUS — visual Wikipedia sudah kuat, tanpa teks */}
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
        {/* v10 (audit #12): 4 kotak warna dekoratif dihapus (warna tanpa alasan) */}
        </Camera>
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
