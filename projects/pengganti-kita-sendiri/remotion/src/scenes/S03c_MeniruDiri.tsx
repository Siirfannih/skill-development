// 03c → 03d → 03e · Babak 3 «Meniru Diri»: wireframe dari 01c terisi dari kaki ke kepala (scan) jadi piktogram matte,
// salinan melangkah ke cahaya, kita mundur ke gelap (rack focus) → beat drop → X13 frame-in-frame → klip Jensen Huang.
// Tanpa teks di 03c/03d. Ruang dunia 1920×1080 (panel ×2).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, keys, KWord, prog, Scene, shake, useT } from "../lib/anim";
import { Clip, DOC_GRADE } from "../lib/media";
import { block, FPS, panel, word, wordsOf } from "../lib/time";
import { cue, LightCone, MattePicto, PICTO, pictoHalfWidth, WirePicto } from "./_b3_shared";

const PC = panel("03c");
const PE = panel("03e");
const W = (w: string, n = 1) => word(w, "s3", n).s;
const BOOM = cue("boom2");
const JENSEN = block("jensen").t;
const CLIP_IN = 6.4;
const CLIP_OUT = 11.27;
const CLIP_END = JENSEN + (CLIP_OUT - CLIP_IN);

const CONE = 560; // titik cahaya = «tempat kita»
const COPY0 = 1360; // posisi awal salinan (wireframe 01c)
const US_END = -84; // kita mundur ke gelap (layar ≈ x 316 setelah kamera pindah ke cahaya)
const HEAD_TOP = PICTO.headTop;
const FLOOR = PICTO.floor;

// isi: pelan di «perlahan», makin cepat, penuh di «besar»
const fillAt = (t: number) =>
  keys(t, [[W("perlahan") + 0.15, 0], [W("bangun"), 0.32], [W("cukup"), 0.72], [W("besar") + 0.1, 1]], EZ.inOut);

// salinan melangkah (3 langkah) dari «mengambil» sampai sebelum beat drop
const STEP_A = W("mengambil");
const STEP_B = BOOM - 0.12;
const RETREAT_A = W("mengambil") + 0.1;
const RETREAT_B = BOOM;
const T_SNAP = W("besar") + 0.16; // sesudah latch «terisi penuh» (besar + 0,1)

// terjemahan Jensen, kata Indonesia mendarat di kata Inggris padanannya (indeks wordsOf('jensen'))
const JW = wordsOf("jensen");
const LINE1: [string, number][] = [["Kamu", 0], ["tidak", 1], ["akan", 2], ["kehilangan", 3], ["pekerjaan", 5], ["karena", 8], ["AI", 10]];
const LINE2: [string, number][] = [["tapi", 11], ["karena", 17], ["orang", 18], ["yang", 19], ["memakai", 20], ["AI", 21]];

const SUB: React.CSSProperties = { fontFamily: "Inter", fontWeight: 600, fontSize: 62, letterSpacing: -0.8, color: "var(--sb-white)", lineHeight: 1.2, whiteSpace: "nowrap" };

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

  // kamera 03c: zoom-through mendarat close (2,1 → 1,8) di kaki salinan, C18 ikut garis scan naik ke kepala,
  // lalu C15 patah ke wide ≤ 6 f setelah salinan penuh: kita dan salinan sama tinggi.
  // 03d: ikut ke cahaya + C02 push-in mulai «tempat», C01 hentak kecil di beat drop.
  const fill = fillAt(t);
  const yF = FLOOR - (FLOOR - HEAD_TOP) * fill;
  const land = prog(t, PC.start, PC.start + 0.5, EZ.out);
  const closeS = 2.1 - 0.3 * land;
  const py = Math.max(500, Math.min(840, yF - 40));
  const snap = prog(t, T_SNAP, T_SNAP + 0.17, EZ.inOut);
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
    y: ck * (540 - py),
  };
  const snapBlur = Math.sin(snap * Math.PI) * 3;
  const sh = shake(t, BOOM, 6, 0.3);

  // X13: frame 03d menyusut jadi kartu klip (berakhir tepat saat klip mulai)
  const k = prog(t, BOOM + 0.42, JENSEN, EZ.inOut);
  const sc = 1 - (1 - 1120 / 1920) * k;
  const showClip = t >= JENSEN - 0.5 / FPS;

  // 03e: drift 1,03
  const eDrift = prog(t, JENSEN, PE.end, (x) => x);
  const labelP = prog(t, JENSEN + 0.1, JENSEN + 0.5, EZ.out);
  // C20 cut zoom ke wajah Jensen di «somebody» (garis pandang sama, momentum 6 f); kartu & terjemahan tidak bergerak
  const T_CZ = JW[18].s;
  const cz = t >= T_CZ ? 1.6 + 0.05 * prog(t, T_CZ, T_CZ + 6 / FPS, EZ.out) : 1;

  return (
    <Scene start={PC.start} end={PE.end} name="03c–03e Meniru diri + Jensen">
      <AbsoluteFill style={{ background: "var(--sb-charcoal)" }}>
        <Camera scale={1 + 0.03 * eDrift}>
          {/* kartu: panggung 03d (sebelum klip) atau klip Jensen */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, overflow: "hidden",
            transform: `translateY(${(411 - 540) * k}px) scale(${sc})`, transformOrigin: "960px 540px", borderRadius: (28 * k) / sc,
            boxShadow: k > 0 ? `0 0 0 ${2 / sc}px rgba(255,255,255,${0.1 * k})` : undefined }}>
            {!showClip && (
              <Camera scale={cam.s} ox={cam.ox} oy={cam.oy} x={cam.x + sh.x} y={cam.y + sh.y} blur={snapBlur}>
                <Stage t={t} />
              </Camera>
            )}
            {showClip && (
              <>
                <AbsoluteFill style={{ background: "var(--sb-placeholder)" }} />
                <AbsoluteFill style={{ transform: `scale(${cz})`, transformOrigin: "55% 18%" }}>
                <Clip src="clips/jensen_src_412.mp4" at={block("jensen").t} inS={CLIP_IN} outS={CLIP_OUT} grade={DOC_GRADE} style={{ transform: "scale(1.05)" }} />
                {/* lanjutkan shot yang sama tanpa suara sampai hard cut (bukan freeze; sumber 16 dtk masih berlanjut) */}
                <Clip src="clips/jensen_src_412.mp4" at={CLIP_END} inS={CLIP_OUT} outS={CLIP_OUT + (PE.end - CLIP_END) + 0.1} grade={DOC_GRADE} style={{ transform: "scale(1.05)" }} />
                </AbsoluteFill>
              </>
            )}
          </div>

          {/* atribusi + terjemahan (di atas zona 8 % bawah) */}
          {showClip && (
            <>
              <div style={{ position: "absolute", left: 0, width: 1920, top: 754, textAlign: "center", fontFamily: "Inter", fontWeight: 600, fontSize: 26, letterSpacing: 4.2,
                color: "color-mix(in srgb, var(--sb-white) 62%, transparent)", opacity: labelP, transform: `translateY(${(1 - labelP) * 10}px)` }}>
                JENSEN HUANG · CEO NVIDIA · MILKEN INSTITUTE 2025
              </div>
              {[LINE1, LINE2].map((ln, li) => (
                <div key={li} style={{ position: "absolute", left: 0, width: 1920, top: li === 0 ? 826 : 896, textAlign: "center", ...SUB }}>
                  {ln.map(([w, ji], i) => (
                    <React.Fragment key={i}>
                      {i > 0 ? " " : ""}
                      <KWord at={JW[ji].s} kind="rise" dist={18}>{w}</KWord>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </>
          )}
        </Camera>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S03c_MeniruDiri, covers: ["03c", "03d", "03e"] };
