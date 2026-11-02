// CaptionTrack · running text VO dari awal sampai akhir (Irfan 2 Nov 14.18, WORKER-BRIEF-V11 · Worker T).
// «subtitle text itu tetep perlu ketika tidak ada penekanan … berganti dengan penekanan jika ada penekanan».
//
// Aturan:
//   · sumber timeline.json → words {w,s,e,src}; satu baris di pita bawah (baseline y 820), rata tengah di safe zone x 288–1632
//   · kata masuk satu per satu tepat di ceil(s×30) dengan blur→tajam 3 f; baris di-tengahkan ulang tiap kata masuk (seperti SpeakerLine)
//   · frasa dipecah di tanda baca, jeda > 0,35 dtk, ganti sumber suara, atau > 32 karakter; frasa lama hilang saat frasa baru mulai
//     (atau 1,2 dtk sesudah kata terakhir bila VO diam)
//   · Geist Sans 500, 56 px seragam, #FAF8EC; di latar terang (luminansi pita > 0,19) tinta #14161A. Shadow halus, tanpa scrim/pita
//   · tanda baca tidak ditampilkan
//   · PENEKANAN MENGGANTIKAN CAPTION: (1) CSS `:has([data-emph])` menyembunyikan caption di frame mana pun yang memuat teks
//     penekanan (AnchorWord, SpeakerWords) — tepat per frame, deterministik; (2) captionMask.json (dari log OBJ probe seluruh film)
//     memberi interval teks penekanan lain (mis. cat BERLOMBA-LOMBA yang dikunci) dan menandai kata yang DIUCAPKAN selama
//     penekanan tampil: kata itu tidak diulang di caption, dan frasa dipecah di batas penekanan.
//   · pita caption terisi objek UI (composer 03a/06d, bidang 06c, kolase 05e) → caption disembunyikan (mask `busy`)
//   Regenerasi mask: node seg2_probe.mjs <dir> 0 133 2 0.25 && python3 ../tools/caption_mask.py <dir> > src/lib/captionMask.json
import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, getInputProps, interpolate, useCurrentFrame } from "remotion";
import { FPS, WORDS } from "./time";
import { SAFE } from "./safe";
import { SOFT_SHADOW } from "./AnchorWord";
import { textWidth } from "./SpeakerWords";
import mask from "./captionMask.json";

export const CAPTION = { size: 56, baseline: 820, light: "#FAF8EC", ink: "#14161A", maxChars: 32, gapS: 0.35, holdF: 36, inF: 3 } as const;
const INK_SHADOW = "0 1px 2px rgba(255,255,255,.35)";
/** luminansi relatif latar pita caption di atas ini → tinta gelap (kontras #FAF8EC < 4,5:1 bila L > 0,17; #14161A ≥ 4,5:1 bila L ≥ 0,21) */
const DARK_ABOVE = 0.19;

type Mask = { step: number; emph: [number, number, string][]; busy?: [number, number][]; lum: number[] };
const M = mask as unknown as Mask;

const clean = (w: string) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
const endsPunct = (w: string) => /[.,!?;:—–-]["'”]?$/.test(w.trim());
const fOf = (s: number) => Math.ceil(s * FPS - 1e-6);

/** frame absolut f berada di dalam interval teks penekanan (mask probe)? */
export const inEmph = (f: number) => M.emph.some(([a, b]) => f >= a && f <= b);
/** pita caption terisi objek UI/bidang yang membuat caption menimpa objek atau tak terbaca (dari still probe, tools/caption_mask.py) */
export const inBusy = (f: number) => (M.busy ?? []).some(([a, b]) => f >= a && f <= b);
const inHide = (f: number) => inEmph(f) || inBusy(f);
const emphBetween = (f0: number, f1: number) =>
  M.emph.some(([a, b]) => b > f0 && a <= f1) || (M.busy ?? []).some(([a, b]) => b > f0 && a <= f1);
const lumAt = (f: number) => {
  const i = Math.floor(f / Math.max(1, M.step));
  return M.lum.length ? M.lum[Math.max(0, Math.min(M.lum.length - 1, i))] / 1000 : 0;
};

export type CapWord = { text: string; f: number; endF: number; i: number };
export type Phrase = { words: CapWord[]; start: number; end: number; dark: boolean };

/** Susun frasa caption sekali (murni dari timeline.json + captionMask.json → sama di setiap frame/tab render). */
export const buildPhrases = (): { phrases: Phrase[]; skipped: number[] } => {
  const phrases: Phrase[] = [];
  const skipped: number[] = [];
  let cur: CapWord[] = [];
  let prevSrc = "";
  let prevRaw = "";
  let prevE = -1;
  const flush = () => {
    if (cur.length) phrases.push({ words: cur, start: cur[0].f, end: 0, dark: false });
    cur = [];
  };
  WORDS.forEach((w, i) => {
    const text = clean(w.w);
    if (!text) return;
    const f = fOf(w.s);
    if (inHide(f)) {
      // diucapkan saat teks penekanan tampil → tidak diulang di caption; frasa berikutnya mulai baru
      skipped.push(i);
      flush();
      prevSrc = w.src; prevRaw = w.w; prevE = w.e;
      return;
    }
    const len = cur.map((c) => c.text).join(" ").length + (cur.length ? 1 : 0) + text.length;
    const brk = !cur.length || w.src !== prevSrc || endsPunct(prevRaw) || w.s - prevE > CAPTION.gapS || len > CAPTION.maxChars
      || emphBetween(cur[cur.length - 1].f, f);
    if (brk) flush();
    cur.push({ text, f, endF: Math.round(w.e * FPS), i });
    prevSrc = w.src; prevRaw = w.w; prevE = w.e;
  });
  flush();
  phrases.forEach((p, k) => {
    const last = p.words[p.words.length - 1];
    const next = phrases[k + 1]?.start ?? Infinity;
    p.end = Math.min(next, Math.max(last.f + CAPTION.inF + 6, last.endF + CAPTION.holdF));
    p.dark = lumAt(p.start) > DARK_ABOVE; // tinta awal frasa (tinta tampil dihitung per frame, lihat inkAt)
  });
  return { phrases, skipped };
};

const BUILT = buildPhrases();
export const CAPTION_PHRASES = BUILT.phrases;

/** tinta per frame dari luminansi pita (sudah dihaluskan median ±3 sampel di caption_mask.py → ganti hanya saat latar berganti) */
const inkAt = (f: number) => lumAt(f) > DARK_ABOVE;

const CSS = `body:has([data-emph]) [data-caption]{visibility:hidden}`;

export const CaptionTrack: React.FC = () => {
  const F = useCurrentFrame();
  const ref = useRef<HTMLDivElement>(null);
  const p = CAPTION_PHRASES.find((q) => F >= q.start && F < q.end);
  const vis = p ? p.words.filter((w) => w.f <= F) : [];
  const hidden = inHide(F);
  const name = vis.map((w) => w.text).join("_");
  const dark = inkAt(F);
  const color = dark ? CAPTION.ink : CAPTION.light;
  // probe Segmen 2: hanya catat bila caption benar-benar terlihat (tidak disembunyikan :has penekanan)
  useLayoutEffect(() => {
    if (!(getInputProps() as { layoutlog?: boolean }).layoutlog || !ref.current) return;
    if (getComputedStyle(ref.current).visibility === "hidden") return;
    const r = ref.current.getBoundingClientRect();
    if (r.width < 1) return;
    console.log(`OBJ ${F} text ${r.x.toFixed(0)} ${r.y.toFixed(0)} ${r.width.toFixed(0)} ${r.height.toFixed(0)} ${color} caption:${name}`);
  }, [F, name, color]);
  if (!p || !vis.length || hidden) return null;
  const full = p.words.map((w) => w.text).join(" ");
  const k = Math.min(1, (SAFE.x1 - SAFE.x0) / (textWidth(full, CAPTION.size, 500, -0.01) + 0.26 * CAPTION.size * (p.words.length - 1)));
  const size = Math.round(CAPTION.size * k);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <style>{CSS}</style>
      <div data-caption style={{ position: "absolute", left: SAFE.x0, width: SAFE.x1 - SAFE.x0, top: CAPTION.baseline - 0.85 * size, display: "flex", justifyContent: "center" }}>
        <div ref={ref} style={{
          display: "inline-flex", gap: `${0.26 * size}px`, fontFamily: "Geist Sans", fontWeight: 500, fontSize: size, lineHeight: 1,
          letterSpacing: "-0.01em", whiteSpace: "nowrap", color, textShadow: dark ? INK_SHADOW : SOFT_SHADOW,
        }}>
          {vis.map((w) => {
            const q = interpolate(F - w.f, [0, CAPTION.inF], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <span key={w.i} style={{ display: "inline-block", filter: q < 1 ? `blur(${(1 - q) * 9}px)` : undefined, opacity: 0.35 + 0.65 * q }}>
                {w.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
