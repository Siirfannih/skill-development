// 06g · MOMEN 7 «Jadi di tengah semua ini, peran apa yang sedang kamu mainkan?»: wide setelah crane 06f.
// Bidang-bidang kerumunan padam satu per satu (pictogram di belakangnya ikut hilang tanpa cahaya); bidang terakhir
// bertahan (layar di atas kepala, tidak padam). Tersisa satu piktogram di tengah. Pertanyaan muncul per kata di tengah, «kamu» putih penuh.
// Kamera (R4-F): diam di wide sampai onset «kamu», lalu push-in 1,00→1,18 (cubic-out ±1,3 dtk) + piktogram menyala. Ekor gelap sampai akhir video. Tanpa tanda tanya di layar.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, prog, Scene, sfxMark, useT } from "../lib/anim";
import { panel, wordsOf } from "../lib/time";
import { AnchorWord } from "../lib/AnchorWord";
import { AIGlyph, Ball, C6, Plane, relay, Torso, wa } from "./_b6_shared";
import cues from "../../public/data/cues11.json";
import { LightShaft } from "./parts/NaturalLight";

const P = panel("06g");
const T_BOOM = (cues as any[]).find((c) => c.id === "boom3").t as number; // 130.025 penutup setelah «mainkan»
const QW = wordsOf("s6").filter((w) => w.s >= P.start - 0.01);
const at = (txt: string) => QW.find((w) => w.w.toLowerCase().replace(/[^a-z]/g, "") === txt)!.s;
const W_TENGAH = at("tengah");
const atPeran = 3841, atKamu = 3869; // v9: f terukur ANCHORS-V9 #32

// 8 bidang kerumunan (panel 06g ×2, dinaikkan supaya kalimat duduk di tengah antara barisan dan piktogram)
const PX = Array.from({ length: 8 }, (_, i) => 80 + i * ((1760 - 140) / 7));
const ORDER = [0, 7, 1, 6, 2, 5, 4]; // padam dari tepi ke dalam; indeks 3 bertahan sampai boom
const offAt = (i: number) => {
  const j = ORDER.indexOf(i);
  return j < 0 ? Infinity : W_TENGAH + j * 0.19; // indeks 3 (layar di atas kepala) tidak padam
};

export const S06g_Peran: React.FC = () => {
  const t = useT();
  // R4-F (penutup, pendekatan baru): di onset «Kamu» piktogram «kita» MENYALA: rim light + aura naik penuh dalam 7 f (EZ.out), layar kecil di atas kepalanya menyala terang,
  // dan kamera push-in NYATA 1,00→1,18 (ease-out kuat ±1,3 dtk). Tidak ada drift/punch/patah-balik lagi (dorongan 1,00→1,12 R3-E tidak terlihat di render).
  // Hold ±1,1 dtk setelah gerak selesai, lalu fade akhir. Layar tetap menyala sampai fade (boom 130,025 = kilat kecil di layar, bukan padam).
  const KAMU_T = atKamu / 30;
  const cubicOut = (x: number) => 1 - Math.pow(1 - x, 3);
  const sc = 1 + 0.18 * prog(t, KAMU_T, KAMU_T + 1.3, cubicOut);
  const lit = prog(t, KAMU_T, KAMU_T + 7 / 30, EZ.out); // nyala penuh 7 f
  const boomFlare = t >= T_BOOM ? Math.exp(-(t - T_BOOM) * 9) * 0.5 : 0;
  const slide = prog(t, offAt(4) + 0.1, KAMU_T, EZ.inOut); // layar yang bertahan bergeser ke atas kepala piktogram (x pusat 960)
  const land = prog(t, P.start, P.start + 0.4, EZ.out);
  const ons = PX.map((_, i) => relay(t, offAt(i)));
  // ── SFXEV
  sfxMark(t, "whoosh", P.start, "06g:cut:peran"); // QC R6 #P2: transisi ke penutup tanpa hit
  sfxMark(t, "cut", P.start, "06g:cut:in"); // ujung crane 06f
  ORDER.forEach((i) => sfxMark(t, "toggle", offAt(i), `06g:plane:${i + 1}`)); // padam tepi → dalam
  sfxMark(t, "whoosh", at("kamu"), "06g:punch:in"); // push-in 1,00→1,18 mulai di onset «kamu» (+ nyala piktogram)
  sfxMark(t, "hit", T_BOOM, "06g:boom:1"); // kilat kecil di layar atas kepala (layar tidak padam)
  const litFrac = ons.reduce((a, b) => a + b, 0) / ons.length;
  const fade = prog(t, P.end - 1.95, P.end - 0.75, EZ.inOut); // R4: hold setelah push-in ≤ 1,5 s
  return (
    <Scene code="06g" name="06g Peran apa">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ opacity: 1 - fade }}>
          <AbsoluteFill style={{ transform: `translateY(${(1 - land) * -40}px) scale(${sc})`, transformOrigin: "960px 600px" }}>
            {/* kerumunan jauh: bidang pipih (dilihat dari atas) + piktogram kecil tampak belakang */}
            {[0, 1, 2, 4, 5, 6, 7, 3].map((i) => {
              const x = PX[i];
              const on = ons[i];
              const hero = i === 3; // layar yang bertahan: bergeser ke atas kepala, menyala terang di «kamu»
              const gl = hero ? 0.18 + 0.5 * lit + boomFlare : 0.18 * on;
              return (
                <div key={i} style={{ position: "absolute", inset: 0, transform: hero ? `translateX(${(890 - PX[3]) * slide}px)` : undefined }}>
                  <Plane b={{ x, y: 290, w: 140, h: 44 }} on={0.18 + 0.82 * on} grad={C6.white} boost={hero ? 0.6 * lit : 0}
                    glow={{ b: { x: x + 8, y: 294, w: 124, h: 36 }, blur: hero ? 70 : 40, spread: hero ? 22 : 10, a: gl, radius: 10 }}>
                    {on > 0.01 && <AIGlyph size={22} style={{ opacity: on, transform: "scaleY(0.6)" }} />}
                  </Plane>
                  <div style={{ opacity: on }}>
                    <Ball b={{ x: x + 55, y: 352, w: 30, h: 30 }} rim={0.8} r={3} dir="down" />
                    <Torso b={{ x: x + 42, y: 388, w: 56, h: 52 }} rim={0.6} r={3} dir="down" />
                  </div>
                </div>
              );
            })}
            {/* v10 (#44): PERAN | KAMU turun ke tinggi badan (kiri/kanan torso, bukan di antara kepala → tak ada «O» nyasar). v9 (#32): kalimat penuh DI ATAS piktogram dibuang → PERAN | KAMU satu baris setinggi kepala piktogram tunggal, DI BELAKANG kepalanya
                (DOM sebelum Ball: tepi dalam kedua kata terselip 40 px di bawah kepala). KAMU putih penuh. */}
            {/* yang tersisa: satu piktogram di tengah */}
            {/* v11 (Irfan gambar 3): aura radial bulat di belakang piktogram («balon putih») → cahaya natural dari SUMBER yang terlihat:
                layar di atas kepala menyinari piktogram ke bawah (berkas melebar, memudar ke bawah, penumbra + grain), naik di onset «kamu». */}
            <LightShaft id="ls06g" from={{ x: 960, y: 318 }} to={{ x: 960, y: 1240 }} w0={120} w1={820} a={0.3 * lit + 0.25 * boomFlare} soft={30} />
            <Ball b={{ x: 892, y: 636, w: 136, h: 136 }} rim={Math.min(1, (0.4 + 0.35 * litFrac) + (1 - (0.4 + 0.35 * litFrac)) * lit)} r={8 + 6 * lit} />
            <Torso b={{ x: 840, y: 784, w: 240, h: 360 }} rim={Math.min(1, (0.3 + 0.25 * litFrac) + (1 - (0.3 + 0.25 * litFrac)) * lit)} r={7 + 6 * lit} />{/* h 300→360: saat land (translateY −40) alas badan tak terlihat */}
          </AbsoluteFill>
          {/* v11 (SAFE/CONTR): PERAN | KAMU pindah ke ruang layar di celah antara barisan bidang dan piktogram (y 540, utuh di safe zone);
              di v10 duduk di y 826 dalam lapisan kamera → turun ke y 940 saat push-in dan menimpa badan piktogram (kontras 2,1:1). Ukuran seragam. */}
          <AnchorWord text="PERAN" at={atPeran} x={934} y={548} size={130} color={wa(0.92)} align="right" enter="mask" />
          <AnchorWord text="KAMU" at={atKamu} x={986} y={548} size={130} color={C6.white} align="left" enter="type" />
        </AbsoluteFill>
        <Grain opacity={0.05 * (1 - fade * 0.6)} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06g_Peran, covers: ["06g"] };
