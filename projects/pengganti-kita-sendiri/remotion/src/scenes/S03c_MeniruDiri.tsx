// 03c → 03d → 03e · Babak 3 «Meniru Diri»: wireframe dari 01c terisi dari kaki ke kepala (scan) jadi piktogram matte,
// salinan melangkah ke cahaya, kita mundur ke gelap (rack focus) → beat drop → X13 frame-in-frame → klip Jensen Huang.
// Tanpa teks di 03c/03d. Ruang dunia 1920×1080 (panel ×2).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, sfxMark, shake, useT } from "../lib/anim";
import { Clip, DOC_GRADE } from "../lib/media";
import { AnchorStage, AnchorWord } from "../lib/AnchorWord";
import { MatteClip } from "../lib/SubjectMatte";
import { flowLine, SpeakerWords, wordAt } from "../lib/SpeakerWords";
import { block, FPS, panel, word, wordsOf } from "../lib/time";
import { cue, ezAt, LightCone, MattePicto, PICTO, pictoHalfWidth, WirePicto } from "./_b3_shared";

const PC = panel("03c");
const PE = panel("03e");
const W = (w: string, n = 1) => word(w, "s3", n).s;
const BOOM = cue("boom2");
const JENSEN = block("jensen").t;
const CLIP_IN = 6.4;
const CLIP_OUT = 11.27;
const CLIP_END = JENSEN + (CLIP_OUT - CLIP_IN);

const CONE = 560; // titik cahaya = «tempat kita»
const WIDE_LIFT = -260; // v10 (#23/#24): dunia wide naik 140 px → pita bersih y 940–1020 di bawah lantai untuk TEMPAT KITA
const COPY0 = 1360; // posisi awal salinan (wireframe 01c)
const US_END = -84; // kita mundur ke gelap (layar ≈ x 316 setelah kamera pindah ke cahaya)
const HEAD_TOP = PICTO.headTop;
const FLOOR = PICTO.floor;

// isi: pelan di «perlahan», makin cepat, penuh di «besar»
const FILL_A = W("perlahan") + 0.15; // garis scan menyala
const FILL_B = W("besar") + 0.1; // terisi penuh, garis scan padam
const fillAt = (t: number) =>
  keys(t, [[FILL_A, 0], [W("bangun"), 0.32], [W("cukup"), 0.72], [FILL_B, 1]], EZ.inOut);

// salinan melangkah (3 langkah) dari «mengambil» sampai sebelum beat drop
const STEP_A = W("mengambil");
const STEP_B = BOOM - 0.12;
const RETREAT_A = W("mengambil") + 0.1;
const RETREAT_B = BOOM;
const T_SNAP = W("besar") + 0.16; // sesudah latch «terisi penuh» (besar + 0,1)
const SNAP_DUR = 0.17;
const SHRINK_A = BOOM + 0.42; // X13 frame 03d menyusut jadi kartu klip

// v9: subtitle terjemahan Jensen (LINE1/LINE2, dua baris Indonesia) DIHAPUS; diganti anchor Inggris JOB / SOMEBODY / AI di bawah.
const JW = wordsOf("jensen");
const FRAME_S = 1.18;
const JS = 54;

/** Panggung 03c/03d (dipakai utuh lalu menyusut jadi kartu klip). */
const Stage: React.FC<{ t: number }> = ({ t }) => {
  const fill = fillAt(t);
  const yF = FLOOR - (FLOOR - HEAD_TOP) * fill;
  const half = pictoHalfWidth(yF);
  const wireOp = 1 - prog(t, W("besar") + 0.1, W("besar") + 0.5, EZ.inOut);

  // langkah salinan
  const sp = prog(t, STEP_A, STEP_B, EZ.inOut);
  const copyX = COPY0 + (CONE - COPY0) * sp;
  const stepBob = sp > 0 && sp < 1 ? -Math.abs(Math.sin(sp * Math.PI * 3)) * 16 : 0;
  const inLight = Math.max(0, 1 - Math.abs(copyX - CONE) / 420);

  // kita mundur ke gelap
  const rp = prog(t, RETREAT_A, RETREAT_B, EZ.inOut);
  const usX = CONE + (US_END - CONE) * rp;
  const usS = 1 - 0.23 * rp;
  const usInLight = Math.max(0, 1 - Math.abs(usX - CONE) / 420);
  const rack = prog(t, W("tempat"), BOOM, EZ.inOut);

  // beat drop: cahaya menguat sesaat
  const flare = t >= BOOM ? Math.exp(-(t - BOOM) * 4) * 0.55 : 0;

  return (
    <AbsoluteFill style={{ background: "var(--sb-charcoal)" }}>
      <LightCone cx={CONE} i={1 + flare} />
      {/* kita: di cahaya (03c) → mundur, mengecil, gelap, buram (rack focus) */}
      <MattePicto cx={usX} scale={usS} rimR={usInLight} flat={rp > 0.6} opacity={1 - 0.55 * rp} blur={rack * 9} />
      {/* v9 (#14): anchor DI BELAKANG piktogram (urutan DOM sebelum salinan/kita). PERLAHAN di kiri salinan setinggi kaki, tepi kanannya terselip di bawah badan
          yang terisi selagi scan naik. TEMPAT | KITA satu baris, celah 60 px di belakang badan salinan di kerucut cahaya (x = CONE). */}
      {/* salinan: wireframe → isi dari kaki ke kepala → melangkah ke cahaya */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${copyX - COPY0}px, ${stepBob}px)` }}>
        <MattePicto cx={COPY0} clipTop={yF} litLeft={inLight < 0.5} rimR={inLight} rimL={inLight * 0.85} />
        <WirePicto cx={COPY0} opacity={wireOp} />
        {fill > 0 && fill < 1 && (
          <div style={{ position: "absolute", left: COPY0 - half - 6, top: yF - 2, width: half * 2 + 12, height: 4, background: "var(--sb-white)",
            boxShadow: "0 0 28px 8px color-mix(in srgb, var(--sb-white) 45%, transparent)", borderRadius: 2 }} />
        )}
      </div>
    </AbsoluteFill>
  );
};

export const S03c_MeniruDiri: React.FC = () => {
  const t = useT();
  const matteJensen = null as string | null; // QC 2 Nov: matte Jensen menutup SOMEBODY → teks di depan (useSubjectMatte("jensen") dinonaktifkan) // null selama stub → teks di depan
  const fSomebody = 1781, fEnd = Math.round(PE.end * FPS); // frame ABSOLUT (f terukur ANCHORS-V9 #15; SpeakerLine memakai frame absolut)

  // ── SFXEV (metronom SFX)
  sfxMark(t, "hit", PC.start, "03c:land"); // zoom-through 03b mendarat di ruang gelap (close 2,1 → 1,8, EZ.out)
  sfxMark(t, "toggle", FILL_A, "03c:scan:on"); // garis cahaya scan muncul di kaki wireframe
  sfxMark(t, "toggle", FILL_B, "03c:scan:off"); // salinan terisi penuh, garis scan padam
  sfxMark(t, "whoosh", T_SNAP + SNAP_DUR / 2, "03c:cam:snapwide"); // C15 patah close → wide (EZ.inOut → tengah)
  [1, 2, 3].forEach((n) => sfxMark(t, "step", ezAt(STEP_A, STEP_B, EZ.inOut, n / 3), `03d:step:${n}`)); // stepBob = 0 di sp = n/3
  sfxMark(t, "hit", BOOM, "03d:boom"); // beat drop: flare cahaya + shake + C01 punch
  sfxMark(t, "whoosh", (SHRINK_A + JENSEN) / 2, "03d:x13:shrink"); // X13 frame menyusut jadi kartu (EZ.inOut → tengah)
  sfxMark(t, "cut", JENSEN, "03e:clip:in"); // isi kartu berganti ke klip Jensen

  // kamera 03c: zoom-through mendarat close (2,1 → 1,8) di kaki salinan, C18 ikut garis scan naik ke kepala,
  // lalu C15 patah ke wide ≤ 6 f setelah salinan penuh: kita dan salinan sama tinggi.
  // 03d: ikut ke cahaya + C02 push-in mulai «tempat», C01 hentak kecil di beat drop.
  const fill = fillAt(t);
  const yF = FLOOR - (FLOOR - HEAD_TOP) * fill;
  const land = prog(t, PC.start, PC.start + 0.5, EZ.out);
  const closeS = 2.1 - 0.3 * land;
  const py = Math.max(500, Math.min(840, yF - 40));
  const snap = prog(t, T_SNAP, T_SNAP + SNAP_DUR, EZ.inOut);
  const pan = prog(t, STEP_A, BOOM, EZ.inOut);
  const push = prog(t, W("tempat"), BOOM, EZ.inOut);
  const punch = prog(t, BOOM, BOOM + 15 / FPS, EZ.out);
  const camX = 960 + (CONE - 960) * pan;
  const wideS = (1 + 0.08 * push) * (1 + 0.03 * punch);
  const ck = 1 - snap;
  const cam = {
    s: ck * closeS + (1 - ck) * wideS,
    ox: ck * COPY0 + (1 - ck) * camX,
    oy: ck * py + (1 - ck) * 1000,
    x: ck * (960 - COPY0) + (1 - ck) * (960 - camX),
    y: ck * (540 - py) + (1 - ck) * WIDE_LIFT,
  };
  const snapBlur = Math.sin(snap * Math.PI) * 3;
  const sh = shake(t, BOOM, 6, 0.3);

  // X13: frame 03d menyusut jadi kartu klip (berakhir tepat saat klip mulai)
  // v10 (#25, Irfan 8): tanpa kartu menyusut. Panggung 03d ditarik masuk (zoom-through ke cahaya + blur) lalu hard cut ke klip full frame.
  const zt = prog(t, SHRINK_A, JENSEN, EZ.acc);
  const k = 0;
  const sc = 1;
  const ztS = 1 + 0.9 * zt;
  const inP = prog(t, JENSEN, JENSEN + 8 / FPS, EZ.out); // klip mendarat: settle 1,10 → 1,0 + blur reda
  const showClip = t >= JENSEN - 0.5 / FPS;

  // 03e: drift 1,03
  const eDrift = prog(t, JENSEN, PE.end, (x) => x);
  const labelP = prog(t, JENSEN + 0.1, JENSEN + 0.5, EZ.out);
  // C20 cut zoom ke wajah Jensen di «somebody» (garis pandang sama, momentum 6 f); kartu & terjemahan tidak bergerak
  const T_CZ = JW[18].s;
  sfxMark(t, "cut", T_CZ, "03e:cutzoom"); // SFXEV: C20 cut zoom, audit
  const cz = t >= T_CZ ? 1.6 + 0.05 * prog(t, T_CZ, T_CZ + 6 / FPS, EZ.out) : 1;

  return (
    <Scene start={PC.start} end={PE.end} name="03c–03e Meniru diri + Jensen">
      <AbsoluteFill style={{ background: "var(--sb-charcoal)" }}>
        <Camera scale={1 + 0.03 * eDrift}>
          {/* kartu: panggung 03d (sebelum klip) atau klip Jensen */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, overflow: "hidden",
            }}>
            {!showClip && (
              <>
                <Camera scale={ztS} ox={960} oy={560} blur={zt * 7}>
                  <Camera scale={cam.s} ox={cam.ox} oy={cam.oy} x={cam.x + sh.x} y={cam.y + sh.y} blur={snapBlur}>
                    <Stage t={t} />
                  </Camera>
                </Camera>
                {/* QC 2 Nov: anchor di lapisan LAYAR teratas (di luar kamera) — sebelumnya ikut kamera & di belakang piktogram → terpotong/tertutup.
                    Teks di bawah tengah, di bawah figur (tidak di atas visual). */}
                {/* v10 (#23): PERLAHAN di ruang kosong KANAN salinan (close-up), hilang tepat sebelum patah ke wide (frame 1587); tidak lagi menimpa badan/garis putus-putus.
                    v10 (#24): TEMPAT KITA di pita bersih di bawah lantai (dunia wide diangkat 140 px), caps y 930–1020, di dalam area aman. */}
                <AnchorWord text="PERLAHAN" at={1508} until={1586} x={1632} y={300} size={72} color="#FAF8EC" align="right" enter="right" />
                <AnchorWord text="TEMPAT" at={1626} until={1662} x={930} y={815} size={104} color="#FAF8EC" align="right" enter="scale" />
                <AnchorWord text="KITA" at={1634} until={1662} x={990} y={815} size={104} color="#FAF8EC" align="left" enter="right" />
              </>
            )}
            {showClip && (
              <>
                <AbsoluteFill style={{ background: "var(--sb-placeholder)" }} />
                {/* v10 (Irfan 8): klip FULL FRAME (cover 1920×1080, sumber 16:9). Pembingkaian: skala 1,18 berjangkar kiri-atas → Jensen bergeser ke kanan,
                    pita kosong kiri-atas (x 60–850, y 60–290) jadi tempat teks. */}
                <AbsoluteFill style={{ transform: `scale(${cz})`, transformOrigin: "55% 18%" }}>
                <AbsoluteFill style={{ transform: `scale(${FRAME_S * (1 + 0.1 * (1 - inP))})`, transformOrigin: "0% 8%", filter: inP < 1 ? `blur(${(1 - inP) * 6}px)` : undefined }}>
                <Clip src="clips/jensen_src_412.mp4" at={block("jensen").t} inS={CLIP_IN} outS={CLIP_OUT} grade={DOC_GRADE} />
                {/* lanjutkan shot yang sama tanpa suara sampai hard cut (bukan freeze; sumber 16 dtk masih berlanjut) */}
                <Clip src="clips/jensen_src_412.mp4" at={CLIP_END} inS={CLIP_OUT} outS={CLIP_OUT + (PE.end - CLIP_END) + 0.1} grade={DOC_GRADE} />
                </AbsoluteFill>
                </AbsoluteFill>
                {/* scrim bawah lembut untuk atribusi (kursi putih di kiri-bawah) */}
                <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 80%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
              </>
            )}
          </div>

          {/* atribusi + terjemahan (di atas zona 8 % bawah) */}
          {showClip && (
            <>
              <div style={{ position: "absolute", top: 826, left: 288, textAlign: "left", background: "rgba(0,0,0,0.5)", padding: "10px 18px", borderRadius: 10, fontFamily: "Inter", fontWeight: 600, fontSize: 24, letterSpacing: 4.2,
                color: "color-mix(in srgb, var(--sb-white) 82%, transparent)", opacity: labelP, transform: `translateY(${(1 - labelP) * 10}px)` }}>
                JENSEN HUANG · CEO NVIDIA · MILKEN INSTITUTE 2025
              </div>
              {/* v9 (B7): anchor Inggris di BELAKANG kepala Jensen: urutan z = kartu klip → teks → matte subjek (fg). Matte null → teks di depan.
                  Koordinat sementara (kepala ≈ (1016, 209) di layar, teks di zona dada y 560, di dalam kartu x 400–1520) — verifikasi saat render. */}
              <AnchorStage bg={null} fg={matteJensen ? (
                <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, overflow: "hidden", transform: `translateY(${(411 - 540) * k}px) scale(${sc})`, transformOrigin: "960px 540px", borderRadius: (28 * k) / sc }}>
                  <AbsoluteFill style={{ transform: `scale(${cz})`, transformOrigin: "55% 18%" }}>
                    <MatteClip src={matteJensen} at={block("jensen").t} inS={CLIP_IN} outS={CLIP_OUT} style={{ transform: "scale(1.05)" }} />
                    <MatteClip src={matteJensen} at={CLIP_END} inS={CLIP_OUT} outS={CLIP_OUT + (PE.end - CLIP_END) + 0.1} style={{ transform: "scale(1.05)" }} />
                  </AbsoluteFill>
                </div>
              ) : undefined}>
                {/* F2: kalimat Jensen dua bagian kontras di SATU slot baris (y 600): «not gonna lose a JOB» lalu diganti «SOMEBODY who uses AI».
                    Bagian 1 kecil-ke-besar (JOB tekanan), bagian 2 SOMEBODY besar → who uses kecil → AI raksasa. Kata lain kalimat
                    ("your job to an AI but you're gonna...") sengaja dilewati: kontras dua bagian, bukan subtitle. */}
                {/* v10 aturan Irfan: ukuran SERAGAM satu kalimat (62), penekanan lewat warna aksen; semua di safe zone x 288–1632, y 216–864 */}
                <SpeakerWords until={fSomebody} shadow="0 3px 24px rgba(0,0,0,0.55)" words={flowLine([
                  { text: "not", at: wordAt("jensen", "not"), size: JS },
                  { text: "gonna", at: wordAt("jensen", "gonna"), size: JS },
                  { text: "lose", at: wordAt("jensen", "lose"), size: JS },
                  { text: "a", at: wordAt("jensen", "a"), size: JS },
                  { text: "JOB", at: 1701, size: JS, kind: "emph", enter: "left", color: "#FFD84A" },
                ], { x: 324, baseline: 306, align: "left", size: 62 })} />
                <SpeakerWords until={fEnd} shadow="0 3px 24px rgba(0,0,0,0.55)" words={flowLine([
                  { text: "SOMEBODY", at: 1781, size: JS, kind: "emph", enter: "right", color: "#FFD84A", sfx: { kind: "sub_impact", id: "03e:anchor:somebody" } },
                  { text: "who", at: wordAt("jensen", "who"), size: JS },
                  { text: "uses", at: wordAt("jensen", "uses"), size: JS },
                  { text: "AI", at: 1804, size: JS, kind: "emph", color: "#FFD84A" },
                ], { x: 330, baseline: 306, align: "left", size: 62 })} />
              </AnchorStage>
            </>
          )}
        </Camera>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S03c_MeniruDiri, covers: ["03c", "03d", "03e"] };
