// 00a–00b · Cold open: supercut berita (audio v11) + montase founder + slot swap FOUNDER → CEO → SEMALAM.
// Pola dari referensi siirfannih_DfDC0I9PHin: footage berganti per frasa, suara asli disambung rapat.
import React from "react";
import { AbsoluteFill, Img, staticFile, getInputProps } from "remotion";
import { Camera, EZ, keys, prog, Scene, useT, Grain, sfxMark } from "../lib/anim";
import { AnchorStage } from "../lib/AnchorWord";
import { MatteClip, useSubjectMatte } from "../lib/SubjectMatte";
import { SpeakerLine, wordAt } from "../lib/SpeakerWords";
import { Clip, DOC_GRADE } from "../lib/media";
import { block, FPS, panel, word as timelineWord, WORDS } from "../lib/time";
import cues from "../../public/data/cues11.json";

// (tick FOUNDER/CEO/SEMALAM tidak dipakai lagi sejak v2)
export const tick = (id: string) => (cues as any[]).find((c) => c.id.startsWith("tick_z0") && c.why.includes(id)).t as number;

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
// v2 (Irfan 20:19): FOUNDER/CEO/SEMALAM dihapus → teks kinetik isi ucapan, per kata kiri→kanan, di ruang kosong (tidak menutupi pembicara).
// Framing per potongan: footage di-reframe (skala + geser, origin kiri-atas) supaya pembicara di satu sisi & chyron TV terdorong keluar bawah.
type Frame = { s: number; tx: number; ty: number; box: { x: number; y: number; w: number; align: "left" | "center" }; accent: string };
const FRAMES: Frame[] = [
  { s: 1.38, tx: -155, ty: 0, box: { x: 120, y: 470, w: 760, align: "left" }, accent: "biggest" }, // Gates kanan, teks kiri
  { s: 1, tx: 0, ty: 0, box: { x: 0, y: 470, w: 1920, align: "center" }, accent: "technical" }, // montase foto
  { s: 1, tx: 0, ty: 0, box: { x: 0, y: 470, w: 1920, align: "center" }, accent: "lifetime" }, // montase foto
  { s: 1.15, tx: -60, ty: -40, box: { x: 1000, y: 300, w: 820, align: "left" }, accent: "16-year-old" }, // remaja kiri, teks kanan atas
  { s: 1.2, tx: -192, ty: -108, box: { x: 0, y: 500, w: 1920, align: "center" }, accent: "ai" }, // close gelap
  { s: 1.45, tx: 0, ty: 0, box: { x: 110, y: 420, w: 540, align: "left" }, accent: "billion" }, // Bloomberg kanan, teks kiri
  { s: 1.25, tx: -350, ty: 0, box: { x: 1120, y: 760, w: 700, align: "left" }, accent: "time" }, // presenter kiri, teks kanan bawah
  { s: 1, tx: 0, ty: 0, box: { x: 0, y: 652, w: 1920, align: "center" }, accent: "fast" }, // kartu menyusut, teks di bawah kartu
];
const isAccent = (w: string, a: string) => w.toLowerCase().replace(/[.,]/g, "") === a;

const MONTAGE_A = CUTS[1].at; // «technical thing»
const MONTAGE_B = CUTS[3].at; // berhenti saat Sky News masuk
const STEP = 0.2554;

// awan gambar 00b (posisi dari panel Wonder 00b ×2), z = kedalaman parallax
const CLOUD = [
  { img: "54942a6aea1423cbc53a00a1d0ff833cd6cddce2fc6194ae3e119b171af70115.jpg", x: 80, y: 80, w: 340, h: 192, z: 0.9 },
  { img: "193550038d18ec319191a1a059481c7292b65882cc01fa813359e8c67fa286d4.jpg", x: 500, y: 40, w: 240, h: 140, z: 0.55 },
  { img: "30f18ba51b261b88d6986105a30b3219733874950edff61f4cf1762dbd412bf5.jpg", x: 1400, y: 60, w: 360, h: 208, z: 1.0 },
  { img: "f46925a87f669ce6a3a61cb6efe4882c1957b7e131988a67a6fd1799bbe6bc9e.jpg", x: 1720, y: 300, w: 240, h: 140, z: 0.5 },
  { img: "d465a6b0c5cadf6fe67276beec88ccd0d4f8c1175570f664dc0bdeacaebde531.jpg", x: 300, y: 460, w: 180, h: 108, z: 0.35 },
  { img: "cf62d8467f160bc4293f098cb9a24564fe12fca16dc033f1060380dc5e43b663.jpg", x: 1480, y: 480, w: 180, h: 108, z: 0.35 },
  { img: "653933ac539310f41d2288501c1ffb8e67c47b10758b6785a5d2d9e60e441859.jpg", x: 860, y: 80, w: 200, h: 120, z: 0.45 },
];

export const SLAM_STYLE: React.CSSProperties = {
  fontFamily: "Inter", fontWeight: 900, fontSize: 300, letterSpacing: -12, lineHeight: 1, color: "#FAF8EC", whiteSpace: "nowrap",
};

/** Slot swap T07 di posisi tetap: kata lama keluar ke atas 4 f, kata baru naik dari bawah + slam. */
export const SlotWord: React.FC<{ text: string; at: number; out?: number; size?: number }> = ({ text, at, out, size = 300 }) => {
  const t = useT();
  if (t < at - 1 / FPS) return null;
  const fr = Math.round((t - at) * FPS);
  if ((getInputProps() as { sfxlog?: boolean }).sfxlog && fr === 0) console.log(`SFXEV slam ${at.toFixed(3)} slam ${text}`);
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
  const shrinkAt = block("news_fast").t; // v10: menyusut dari awal klip fast (sebelum «this» masuk) supaya ada ruang kosong di bawah kartu // «progress» → footage menyusut jadi satu foto di awan
  const sh = { x: 0, y: 0 };
  // redup footage saat teks ada (keterbacaan tanpa scrim); montase sedikit lebih redup
  const dimF = t >= MONTAGE_A && t < MONTAGE_B ? 0.62 : 0.8;
  // reveal-out 00b (C06): kamera mundur ×3, akselerasi singkat lalu deselerasi panjang
  const rev = keys(t, [[shrinkAt, 0], [shrinkAt + 0.1, 0.62], [shrinkAt + 0.5, 0.9], [pB.end, 1]], EZ.out);
  const cardUp = -rev * 200; // kartu juga naik → ruang kosong di bawah
  const cardScale = 1 - rev * 0.84;
  // SFXEV · metronom: hard cut tiap potongan berita (termasuk cut zoom C20 antar-span), foto montase berganti
  // (frame pertama floor((t−MONTAGE_A)/STEP) naik), footage menyusut jadi kartu di awan (EZ.out → puncak di awal).
  CUTS.forEach((c, i) => sfxMark(t, "cut", c.at, `00a:cut:${i}`));
  for (let i = 0; MONTAGE_A + i * STEP < MONTAGE_B; i++) sfxMark(t, "snap", Math.ceil((MONTAGE_A + i * STEP) * FPS - 1e-6) / FPS, `00a:photo:${i}`);
  sfxMark(t, "whoosh", shrinkAt, "00b:shrink:0");
  // matte narasumber (null bila input props noMatte): fg di depan teks, transform/grade/trim identik dengan footage (FRAMES + zoom aksen).
  // Potongan montase foto (indeks 1–2: Gates tertutup foto penuh) TIDAK diberi matte; potongan terakhir ikut menyusut jadi kartu.
  const mattes: Record<string, string | null> = {
    news_gates: useSubjectMatte("news_gates"), news_teen: useSubjectMatte("news_teen"),
    news_billion: useSubjectMatte("news_billion"), news_fast: useSubjectMatte("news_fast"),
  };
  const matteFg = Object.values(mattes).some(Boolean) ? (
    <AbsoluteFill style={{ transform: t >= shrinkAt ? `translateY(${cardUp}px) scale(${cardScale})` : undefined, borderRadius: t >= shrinkAt ? 24 / cardScale : 0, overflow: "hidden" }}>
      {CUTS.map((c, i) => {
        if (i !== -1) return null; // v10: SEMUA matte dimatikan — Gates ghost dobel (Irfan 2); teen/billion/fast: matte menutupi teks satu-baris di badan narasumber, teks di depan // v10: i=0 Gates matte dimatikan (ghost dobel, Irfan 2) // QC 2 Nov: close-up remaja = badan menutup seluruh teks → teks di depan
        const key = NEWS.find((n) => n.file === c.file)!.name;
        const m = mattes[key];
        if (!m) return null;
        const F = FRAMES[i];
        const acc = WORDS.find((w) => w.s >= c.at && w.s < (CUTS[i + 1]?.at ?? 99) && isAccent(w.w, F.accent));
        const z = 1 + 0.02 * prog(t, c.at, c.at + 1.2, EZ.inOut) + (acc ? 0.05 * prog(t, acc.s, acc.s + 0.6, EZ.out) : 0);
        return <MatteClip key={i} src={m} at={c.at} inS={c.inS} outS={c.outS} style={{ transform: `translate(${F.tx}px, ${F.ty}px) scale(${F.s * z})`, transformOrigin: "0 0" }} grade={`${DOC_GRADE} brightness(${dimF})`} />;
      })}
    </AbsoluteFill>
  ) : undefined;
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
          <AbsoluteFill style={{ transform: t >= shrinkAt ? `translateY(${cardUp}px) scale(${cardScale})` : undefined, borderRadius: t >= shrinkAt ? 24 / cardScale : 0, overflow: "hidden", }}>
            {CUTS.map((c, i) => {
              const F = FRAMES[i];
              // C01: dorongan mikro 1→1,05 dari kata aksen; C19 drift kecil di sepanjang potongan
              const acc = WORDS.find((w) => w.s >= c.at && w.s < (CUTS[i + 1]?.at ?? 99) && isAccent(w.w, F.accent));
              const z = 1 + 0.02 * prog(t, c.at, c.at + 1.2, EZ.inOut) + (acc ? 0.05 * prog(t, acc.s, acc.s + 0.6, EZ.out) : 0);
              return (
                <Clip key={i} src={c.file} at={c.at} inS={c.inS} outS={c.outS}
                  style={{ transform: `translate(${F.tx}px, ${F.ty}px) scale(${F.s * z})`, transformOrigin: "0 0" }} grade={`${DOC_GRADE} brightness(${dimF})`} />
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
        {/* v9 (B1+F2): teks per kata NARASUMBER (Inggris, sesuai ucapan), masuk di onset kata (ceil, tidak pernah lebih awal),
            4 teknik per fungsi kata (SpeakerWords) + anchor (AnchorWord) sebagai kata tekanan. Komposisi berbeda per narsum:
            Gates = tumpukan kiri bertingkat → baris tengah-bawah di atas montase; remaja = tangga kiri→kanan di ruang kanan;
            Bloomberg = kolom kiri dengan BILLION sebagai angka pahlawan; Sky News grafik = baris kecil → FAST raksasa.
            Matte (fg) menaruh teks di belakang kepala; di montase foto tidak ada matte. */}
        {/* v10: bayangan radial lembut (tanpa tepi) di belakang baris «this time progress was so FAST» supaya foto awan tidak mengganggu keterbacaan */}
        {t >= shrinkAt - 0.5 && <AbsoluteFill style={{ background: "radial-gradient(ellipse 900px 150px at 960px 840px, rgba(16,18,22,0.85) 0%, rgba(16,18,22,0.55) 55%, rgba(16,18,22,0) 100%)" }} />}
        <AnchorStage bg={null} fg={matteFg}>
          {(() => {
            const gEnd = Math.round(block("news_teen").t * FPS);
            const tEnd = Math.round(block("news_billion").t * FPS);
            const bEnd = Math.round(block("news_fast").t * FPS);
            const mEnd = Math.round(MONTAGE_A * FPS); // tumpukan Gates berhenti saat montase foto mulai
            const W = (src: string, w: string, n = 1) => wordAt(src, w, n);
            // "16-year-old" satu kata di timeline (3,70–4,1 dtk): "year old" masuk di ±45 % durasinya
            const yo = Math.ceil((timelineWord("16-year-old", "news_teen").s + 0.45 * (timelineWord("16-year-old", "news_teen").e - timelineWord("16-year-old", "news_teen").s)) * FPS);
            return (
              <>
                {/* Gates (kanan frame): tumpukan kiri AI / is the / BIGGEST, hierarki 300 → 84 → 150 */}
                {/* v10 (audit #2, Irfan 2): satu baris di ruang kosong backdrop kiri (matte Gates dimatikan → teks di depan, tak ada ghost/pemotongan) */}
                <SpeakerLine x={90} baseline={600} until={mEnd} words={[
                  { text: "AI", at: 2, size: 150, kind: "emph" },
                  { text: "is", at: W("news_gates", "is"), size: 64 },
                  { text: "the", at: W("news_gates", "the"), size: 64 },
                  { text: "BIGGEST", at: 27, size: 150, kind: "emph", enter: "left", sfx: { kind: "sub_impact", id: "00a:anchor:biggest" } },
                ]} />
                {/* montase foto: satu baris tengah-bawah (di bawah dagu foto, di atas zona UI 8 %) */}
                <SpeakerLine x={960} baseline={590} align="center" until={gEnd} words={[
                  { text: "technical", at: W("news_gates", "technical"), size: 92 },
                  { text: "thing", at: W("news_gates", "thing"), size: 92 },
                  { text: "ever", at: W("news_gates", "ever"), size: 60 },
                  { text: "in", at: W("news_gates", "in"), size: 52 },
                  { text: "my", at: W("news_gates", "my"), size: 52 },
                  { text: "lifetime", at: W("news_gates", "lifetime"), size: 112, kind: "last" },
                ]} />
                {/* remaja Sky News (kiri): tangga kiri→kanan di ruang kanan, 16 = angka (scale-slam), LAUNCHED = tekanan */}
                {/* v10 (audit #5, #6): satu kalimat satu baris, di ruang bawah (badan/kemeja, bukan wajah) */}
                <SpeakerLine x={110} baseline={800} gap={36} until={tEnd} words={[
                  { text: "16", at: 112, size: 170, kind: "number" },
                  { text: "year old", at: yo, size: 52 },
                  { text: "LAUNCHED", at: 133, size: 96, kind: "emph", enter: "right", sfx: { kind: "scifi_whoosh", id: "00a:anchor:launched" } },
                  { text: "a new", at: W("news_teen", "a"), size: 46 },
                  { text: "AI", at: W("news_teen", "AI"), size: 80 },
                  { text: "company", at: W("news_teen", "company"), size: 58, kind: "last" },
                ]} />
                {/* Bloomberg (presenter kanan): satu baris di dada, BILLION = angka pahlawan */}
                <SpeakerLine x={110} baseline={800} gap={36} until={bEnd} words={[
                  { text: "raised", at: W("news_billion", "raised"), size: 52 },
                  { text: "over", at: W("news_billion", "over"), size: 52 },
                  { text: "a", at: W("news_billion", "a"), size: 52 },
                  { text: "BILLION", at: 208, size: 120, kind: "emph", sfx: { kind: "sub_impact", id: "00a:anchor:billion" } },
                  { text: "dollars", at: W("news_billion", "dollars"), size: 64, kind: "last" },
                ]} />
                {/* Sky News grafik: baris kecil di atas FAST raksasa (kartu menyusut di belakang, foto awan lewat) */}
                {/* v10 (Irfan 4): satu baris di ruang kosong BAWAH kartu yang menyusut, rata tengah; matte fast dimatikan (presenter tidak lagi memotong «o» progress) */}
                <SpeakerLine x={960} baseline={870} align="center" until={Math.round(pB.end * FPS)} words={[
                  { text: "this", at: W("news_fast", "this"), size: 56 },
                  { text: "time", at: W("news_fast", "time"), size: 56 },
                  { text: "progress", at: W("news_fast", "progress"), size: 96 },
                  { text: "was", at: W("news_fast", "was"), size: 56 },
                  { text: "so", at: W("news_fast", "so"), size: 56 },
                  { text: "FAST", at: 284, size: 150, kind: "emph", enter: "right", sfx: { kind: "scifi_whoosh", id: "00b:anchor:fast" } },
                ]} />
              </>
            );
          })()}
        </AnchorStage>
        <Grain opacity={0.06} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S00_ColdOpen, covers: ["00a", "00b"] };
