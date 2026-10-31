// 05a · «Apa yang dikatakan Sam Altman adalah satu cerita sukses» — foto tokoh/founder sukses melayang dengan parallax 3 lapis.
// Kartu klip Altman dari 04d mendarat sebagai satu foto bergaris biru (= satu cerita). Kamera C19 drift + parallax.
// Keluar C06 reveal-out: kamera mundur memusatkan kartu biru, foto lain memudar abu → ribuan kartu abu (05b).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, keys, KWord, prog, Scene, useT } from "../lib/anim";
import { panel, word } from "../lib/time";
import { altCard, ALTMAN_STILL, CARD05A_END, T_SHRINK_END, DRIFT05A, DRIFTX05A, lerp, reveal05a, S05A_END } from "./_b4_shared";

// posisi dari panel Wonder 05a (×2); z = lapis parallax (0,5 belakang · 1 tengah · 1,6 depan)
const PHOTOS = [
  { img: "c1bfeb12a8cb6f67073995830aa33fa5f330c76190d2fc1008a9ade58e04ea3f.jpg", x: 500, y: 40, w: 300, h: 224, z: 1 },
  { img: "b25cb125892c42111d25a0a007793920c017b5f30545399ee7c919839ad50224.jpg", x: 1080, y: 70, w: 240, h: 160, z: 0.5 },
  { img: "462704e2846a40cc5002020250a755a4c9215a2979acbf738c85f3d65f91772e.jpg", x: 1660, y: 40, w: 168, h: 248, z: 1 },
  { img: "30f18ba51b261b88d6986105a30b3219733874950edff61f4cf1762dbd412bf5.jpg", x: -40, y: 220, w: 380, h: 212, z: 1.6 },
  { img: "d493dc823b69761eb91bb2f309f9f0713c2b524e824f333f6ea0065d9452965d.jpg", x: 120, y: 620, w: 192, h: 220, z: 1 },
  { img: "a084d6713bd51936e5f2514555d8aad21d6e4470957796029947348a1493dee0.jpg", x: 400, y: 800, w: 320, h: 212, z: 1.6 },
  { img: "f46925a87f669ce6a3a61cb6efe4882c1957b7e131988a67a6fd1799bbe6bc9e.jpg", x: 940, y: 860, w: 240, h: 160, z: 0.5 },
  { img: "42d17c7be4e026d2db2717bc4b6d04cb477edd579aa515ad002e49ff7d46c7d9.jpg", x: 1400, y: 740, w: 164, h: 220, z: 1 },
  { img: "7d2fa108bd3a5b82ac588670c0db79b07bbf0a01a0d8f58eabd555268c596539.jpg", x: 1680, y: 500, w: 260, h: 146, z: 0.5 },
  { img: "54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg", x: 60, y: 930, w: 220, h: 124, z: 0.5 },
];

const O = { x: 960, y: 540 };


export const S05a_SatuCerita: React.FC = () => {
  const t = useT();
  const P = panel("05a");
  const tSatu = word("satu", "s5").s;
  const tCerita = word("cerita", "s5").s;
  const tSukses = word("sukses", "s5").s;
  const tAltman = word("altman", "s5").s;

  // kamera C19: drift pelan (isi geser kiri + dorong 1,03); parallax per lapis
  const dr = prog(t, P.start, P.end, EZ.inOut);
  const driftX = DRIFTX05A * dr;
  const driftS = DRIFT05A * dr;
  // reveal-out ke kartu biru
  const rv = reveal05a(t);
  const card = altCard(t);
  const cardC = { x: card.x + card.w / 2, y: card.y + card.h / 2 };
  const S = lerp(1, S05A_END, rv);
  // pusat kartu sesudah drift lapis tengah (z=1)
  const cardD = { x: O.x + (cardC.x - O.x) * (1 + driftS) + driftX, y: O.y + (cardC.y - O.y) * (1 + driftS) };
  // kamera reveal: zoom-out berpusat di kartu biru (kartu diam; pan ke tengah dilanjutkan 05b)
  const camT = { x: (cardD.x - O.x) * (1 - S), y: (cardD.y - O.y) * (1 - S) };
  const place = (x: number, y: number, z: number) => {
    // parallax drift per lapis, lalu kamera reveal
    const sz = 1 + driftS * z;
    const px = O.x + (x - O.x) * sz + driftX * z;
    const py = O.y + (y - O.y) * sz;
    return { x: O.x + (px - O.x) * S + camT.x, y: O.y + (py - O.y) * S + camT.y, k: sz * S };
  };
  // penekanan halus di «Sam Altman»: kartu biru sedikit terangkat
  const lift = prog(t, tAltman, tAltman + 0.4, EZ.out) * (1 - prog(t, tSatu, tSatu + 0.5, EZ.inOut));
  // C02 push-in ke kartu biru selama «…dikatakan Sam Altman adalah» → patah ke wide (5 f) di «satu»
  const tSnap = tSatu - 1 / 30;
  const push = keys(t, [[T_SHRINK_END, 1], [tSnap, 1.42]], EZ.inOut);
  const snap = prog(t, tSnap, tSnap + 5 / 30, EZ.out);
  const camPush = t < tSnap ? push : 1.42 - 0.42 * snap;
  // close-up: kartu biru ditarik ke arah tengah selama push
  const pk = (camPush - 1) / 0.42;
  const pushX = (960 - CARD05A_END.x) * 0.5 * pk;
  const pushY = (540 - CARD05A_END.y) * 0.5 * pk;
  const tSatuGlow = prog(t, tSatu + 2 / 30, tSatu + 0.4, EZ.out);

  return (
    <Scene code="05a">
      <AbsoluteFill style={{ background: "var(--sb-paper)", overflow: "hidden" }}>
        <Camera scale={camPush} x={pushX} y={pushY} ox={CARD05A_END.x} oy={CARD05A_END.y} blur={snap > 0 && snap < 1 ? 2 : 0}>
        {[...PHOTOS].sort((a, b) => a.z - b.z).map((ph, i) => {
          const idx = PHOTOS.indexOf(ph);
          const a = P.start + 0.04 + idx * 0.045 + (ph.z < 1 ? 0.1 : 0);
          const inP = prog(t, a, a + 0.45, EZ.out);
          const bob = Math.sin(t * 0.9 + idx * 1.3) * 5 * ph.z;
          const c = place(ph.x + ph.w / 2, ph.y + ph.h / 2 + bob, ph.z);
          const sc = c.k * (1.06 - 0.06 * inP);
          const w = ph.w * sc;
          const h = ph.h * sc;
          return (
            <Img key={idx} src={staticFile("wonder/" + ph.img)} style={{
              position: "absolute", left: c.x - w / 2, top: c.y - h / 2, width: w, height: h, objectFit: "cover", borderRadius: 6 * sc,
              opacity: Math.min(1, inP * 1.6) * (1 - 0.55 * rv), filter: `grayscale(${rv}) ${ph.z < 1 ? "blur(1.2px)" : ""}`,
              boxShadow: `0 ${10 * ph.z}px ${26 * ph.z}px rgba(29,29,31,${0.16 * (1 - rv)})`,
            }} />
          );
        })}
        {/* kartu biru Altman (lapis tengah) */}
        {(() => {
          const c = place(cardC.x, cardC.y - lift * 8, card.p);
          const k = c.k;
          const w = card.w * k * (1 + 0.04 * lift);
          const h = card.h * k * (1 + 0.04 * lift);
          return (
            <div style={{
              position: "absolute", left: c.x - w / 2, top: c.y - h / 2, width: w, height: h, padding: card.border * k, boxSizing: "border-box",
              background: "var(--sb-blue)", borderRadius: card.r * k,
              boxShadow: `0 ${14 + 10 * lift}px ${30 + 20 * (lift + tSatuGlow)}px color-mix(in srgb, var(--sb-blue) ${30 + 15 * tSatuGlow}%, transparent)`,
            }}>
              <Img src={staticFile(ALTMAN_STILL)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: Math.max(0, card.r - card.border) * k }} />
            </div>
          );
        })()}
        </Camera>
        {/* teks */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center", fontFamily: "Inter", fontWeight: 800, fontSize: 112, letterSpacing: -3.4, lineHeight: 1, color: "var(--sb-ink)", whiteSpace: "nowrap" }}>
          <KWord at={tSatu} out={P.end - 0.32}>satu</KWord>{" "}
          <KWord at={tCerita} out={P.end - 0.32}>cerita</KWord>{" "}
          <KWord at={tSukses} out={P.end - 0.32}>sukses</KWord>
        </div>
        <Grain opacity={0.04} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05a_SatuCerita, covers: ["05a"] };
