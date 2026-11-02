// CaptionTrack · running text VO dari awal sampai akhir (Irfan 2 Nov 14.18, WORKER-BRIEF-V11 · Worker T).
// «subtitle text itu tetep perlu ketika tidak ada penekanan … berganti dengan penekanan jika ada penekanan».
//
// Aturan:
//   · sumber timeline.json → words {w,s,e,src}; satu baris di pita bawah (baseline y 820), rata tengah di safe zone x 288–1632
//   · kata masuk satu per satu tepat di ceil(s×30) dengan blur→tajam 3 f; baris di-tengahkan ulang tiap kata masuk (seperti SpeakerLine)
//   · v22: blok per klausa/kalimat ucapan (lihat PH di bawah), blok diam sampai VO selesai + ≥ 0,4 dtk atau sampai blok berikutnya
//   · Geist Sans 500, 56 px seragam, #FAF8EC; di latar terang (luminansi pita > 0,19) tinta #14161A. Shadow halus, tanpa scrim/pita
//   · tanda baca tidak ditampilkan
//   · PENEKANAN MENGGANTIKAN CAPTION lewat interval penekanan yang di-debounce (HIDE_IV, v22 — CSS `:has` per frame dihapus karena
//     membuat teks berkedip); captionMask.json (dari log OBJ probe seluruh film) memberi interval teks penekanan dan menandai kata yang
//     DIUCAPKAN selama penekanan tampil: kata itu tidak diulang di caption, dan blok dipecah di batas penekanan.
//   · pita caption terisi objek UI (composer 03a/06d, bidang 06c, kolase 05e) → caption disembunyikan (mask `busy`)
//   Regenerasi mask: node seg2_probe.mjs <dir> 0 133 2 0.25 && python3 ../tools/caption_mask.py <dir> > src/lib/captionMask.json
import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, getInputProps, interpolate, useCurrentFrame } from "remotion";
import { FPS, PANELS, WORDS } from "./time";
import { SAFE } from "./safe";
import { SOFT_SHADOW } from "./AnchorWord";
import { textWidth } from "./SpeakerWords";
import mask from "./captionMask.json";

export const CAPTION = { size: 62, baseline: 820, light: "#FAF8EC", ink: "#14161A", maxChars: 32, gapS: 0.35, holdF: 36, inF: 3 } as const;
const INK_SHADOW = "0 1px 2px rgba(255,255,255,.35)";
/** luminansi relatif latar pita caption di atas ini → tinta gelap (kontras #FAF8EC < 4,5:1 bila L > 0,17; #14161A ≥ 4,5:1 bila L ≥ 0,21) */
const DARK_ABOVE = 0.19;

type Mask = { step: number; emph: [number, number, string][]; busy?: [number, number][]; lum: number[] };
const M = mask as unknown as Mask;

const clean = (w: string) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
const endsPunct = (w: string) => /[.,!?;:—–-]["'”]?$/.test(w.trim());
const fOf = (s: number) => Math.ceil(s * FPS - 1e-6);

/** frame absolut f berada di dalam interval teks penekanan MENTAH (mask probe, sampel 2 f)? */
export const inEmph = (f: number) => M.emph.some(([a, b]) => f >= a && f <= b);
/** pita caption terisi objek UI/bidang yang membuat caption menimpa objek atau tak terbaca (dari still probe, tools/caption_mask.py) */
// QC Claude utama v11 (contact sheet render 1080p): caption masih menimpa kartu/ikon di pita bawah → disembunyikan manual
const MANUAL_BUSY: [number, number][] = [[585, 690], [840, 870], [2875, 2945], [3400, 3515]];
const BUSY = [...(M.busy ?? []), ...MANUAL_BUSY];
// kata yang sengaja tidak ditampilkan sebagai teks VO (blok dipecah di sini):
//   1150–1176 «kita juga tidak» (02f): kamera mundur cepat ke grid 3×3, setiap posisi menimpa kartu (QC v21) — «Tapi di satu sisi» diam sampai kartu
const MANUAL_SKIP: [number, number][] = [[1150, 1176]];
export const inBusy = (f: number) => BUSY.some(([a, b]) => f >= a && f <= b);

// v22 (Irfan 3 Nov 05.31 «teks muncul, hilang, muncul lagi … harusnya diam nunggu VO selesai»):
// penyembunyian CSS `:has([data-emph])` per frame DIHAPUS — ia memadamkan teks VO di setiap frame masuk/keluar penekanan (1–3 f)
// sehingga teks yang sama berkedip. Visibilitas teks VO sekarang dari interval penekanan yang DI-DEBOUNCE (deterministik):
//   1) gabungkan penekanan/busy yang celahnya < 15 f   2) abaikan penekanan < 6 f
//   3) pad 0: captionMask.emph kini TEPAT per frame (probe setiap frame, caption_mask.py --emph-only) → teks VO berakhir tepat
//      sebelum penekanan muncul, tanpa frame kosong dan tanpa frame bersama   4) jendela teks VO < 18 f di antara dua penekanan ikut disembunyikan
export const HIDE = { mergeGap: 15, minLen: 6, pad: 0, minWindow: 18 } as const;
const debounce = (raw: [number, number][]) => {
  const iv = raw.map(([a, b]) => [a, b] as [number, number]).sort((x, y) => x[0] - y[0]);
  const merge = (xs: [number, number][], gap: number) => {
    const out: [number, number][] = [];
    for (const [a, b] of xs) {
      const L = out[out.length - 1];
      if (L && a - L[1] - 1 < gap) L[1] = Math.max(L[1], b);
      else out.push([a, b]);
    }
    return out;
  };
  const core = merge(iv, HIDE.mergeGap).filter(([a, b]) => b - a + 1 >= HIDE.minLen);
  const vis = merge(core.map(([a, b]) => [a - HIDE.pad, b + HIDE.pad] as [number, number]), HIDE.minWindow);
  return { core, vis };
};
const HID = debounce([...M.emph.map(([a, b]) => [a, b] as [number, number]), ...BUSY]);
/** penekanan saja (tanpa busy), di-debounce sama → batas keras ekor blok */
const EMPH_IV = debounce(M.emph.map(([a, b]) => [a, b] as [number, number])).core;
const nextEmph = (f: number) => EMPH_IV.find(([a]) => a > f)?.[0] ?? Infinity;
/** interval sembunyi teks VO (debounce + pad + jendela < 18 f diisi) */
export const HIDE_IV = HID.vis;
/** teks VO disembunyikan di frame f (penekanan tampil / pita sibuk), sudah di-debounce */
export const inHide = (f: number) => HIDE_IV.some(([a, b]) => f >= a && f <= b);
/** frame awal penyembunyian berikutnya sesudah frame f (Infinity bila tidak ada) */
export const nextHide = (f: number) => HIDE_IV.find(([a]) => a > f)?.[0] ?? Infinity;
/** kata diucapkan saat penekanan tampil (interval inti, tanpa pad) → tidak diulang di teks VO */
const spokenInEmph = (f: number) => HID.core.some(([a, b]) => f >= a && f <= b);
const emphBetween = (f0: number, f1: number) => HIDE_IV.some(([a, b]) => b > f0 && a <= f1);
const lumAt = (f: number) => {
  const i = Math.floor(f / Math.max(1, M.step));
  return M.lum.length ? M.lum[Math.max(0, Math.min(M.lum.length - 1, i))] / 1000 : 0;
};

const normW = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
/** teks penekanan (nama objek probe, mis. "anchor:SADAR text:BERLOMBA-LOMBA(dikunci)") yang tampil di [f−45, f+15] memuat kata ini? */
const shownAsEmph = (text: string, f: number) => {
  const k = normW(text);
  if (k.length < 3) return false;
  return M.emph.some(([a, b, names]) => b >= f - 45 && a <= f + 15 && names.split(/[\s:_()]+/).some((n) => normW(n) === k));
};

export type CapWord = { text: string; f: number; endF: number; i: number };
/** run = nomor rangkaian ucapan tanpa penekanan/ganti sumber di antaranya (blok berurutan dalam run boleh digabung/ditukar) */
export type Phrase = { words: CapWord[]; start: number; end: number; dark: boolean; lastEnd: number; run: number };

// v22 · pengelompokan per klausa/kalimat ucapan (bukan per 32 karakter):
//   putus KERAS: ganti sumber suara, penekanan/busy di antara kata (run baru); putus LUNAK: akhir kalimat, koma, jeda > 0,35 dtk,
//   atau > maxChars. Blok yang waktu tampilnya < max(1,0 dtk; 0,4 + 0,2 × kata) digabung dengan tetangga di run yang sama (1–3 baris).
//   Blok diam sampai kata terakhir selesai diucapkan + ≥ 0,4 dtk (holdMin) — lebih lama bila VO diam (holdQuiet) — atau sampai blok
//   berikutnya mulai (jembatan ≤ bridge f supaya tidak ada kedip kosong di antara dua blok).
export const PH = { gapS: 0.35, maxChars: 56, maxWords: 9, holdMin: 12, holdQuiet: 36, bridge: 45, tail: 9 } as const;
export const needF = (n: number) => Math.round(FPS * Math.max(1.0, 0.4 + 0.2 * n));
const sentenceEnd = (w: string) => /[.?!]["'”]?$/.test(w.trim());
// potongan adegan: blok tidak pernah menyeberang cut (teks terikat ke adegannya)
const CUTS = PANELS.map((q) => Math.round(q.t * FPS));
const cutBetween = (f0: number, f1: number) => CUTS.some((c) => c > f0 && c <= f1);
const nextCut = (f: number) => CUTS.find((c) => c > f) ?? Infinity;
const hideEnd = (f: number) => HIDE_IV.find(([a, b]) => f >= a && f <= b)?.[1];

/** Susun blok teks VO sekali (murni dari timeline.json + captionMask.json → sama di setiap frame/tab render). */
export const buildPhrases = (): { phrases: Phrase[]; skipped: number[] } => {
  type W = CapWord & { gap: number; soft: boolean };
  type Seg = { words: W[]; run: number; endsSentence: boolean };
  const clauses: Seg[] = [];
  const skipped: number[] = [];
  let cur: W[] = [];
  let run = 0;
  let prevSrc = "";
  let prevRaw = "";
  let prevE = -1;
  const flush = (hard: boolean) => {
    if (cur.length) clauses.push({ words: cur, run, endsSentence: sentenceEnd(prevRaw) });
    cur = [];
    if (hard) run++;
  };
  WORDS.forEach((w, i) => {
    const text = clean(w.w);
    if (!text) return;
    const f = fOf(w.s);
    const he = hideEnd(f);
    // diucapkan saat teks penekanan tampil (atau baru saja tampil sebagai penekanan, mis. cat BERLOMBA-LOMBA) → tidak diulang.
    // Kata di tepi pad (≤ 3 f sebelum teks VO boleh tampil lagi) tetap ikut — tampil begitu penekanan selesai.
    if (spokenInEmph(f) || (he !== undefined && he - f > 3) || shownAsEmph(text, f) || MANUAL_SKIP.some(([a, b]) => f >= a && f <= b)) {
      skipped.push(i);
      flush(true);
      prevSrc = w.src; prevRaw = w.w; prevE = w.e;
      return;
    }
    const gap = w.s - prevE;
    if (cur.length) {
      if (w.src !== prevSrc || emphBetween(cur[cur.length - 1].f, f) || cutBetween(cur[cur.length - 1].f, f)) flush(true);
      else if (endsPunct(prevRaw) || gap > PH.gapS) flush(false);
    } else if (w.src !== prevSrc) run++;
    cur.push({ text, f, endF: Math.round(w.e * FPS), i, gap, soft: endsPunct(prevRaw) });
    prevSrc = w.src; prevRaw = w.w; prevE = w.e;
  });
  flush(true);

  const chars = (ws: CapWord[]) => ws.map((c) => c.text).join(" ").length;
  const tooLong = (ws: CapWord[]) => chars(ws) > PH.maxChars || ws.length > PH.maxWords;
  // klausa terlalu panjang → dipecah seimbang di jeda/koma terbesar dekat tengah (bukan rakus per karakter)
  const segs: Seg[] = [];
  const split = (s: Seg) => {
    if (!tooLong(s.words) || s.words.length < 2) { segs.push(s); return; }
    const total = chars(s.words);
    let best = 1, bestScore = -Infinity;
    for (let k = 1; k < s.words.length; k++) {
      const left = chars(s.words.slice(0, k));
      const bal = 1 - Math.abs(left - total / 2) / (total / 2);
      const score = bal + 2.5 * Math.min(0.4, Math.max(0, s.words[k].gap)) + (s.words[k].soft ? 0.6 : 0);
      if (score > bestScore) { bestScore = score; best = k; }
    }
    split({ words: s.words.slice(0, best), run: s.run, endsSentence: false });
    split({ words: s.words.slice(best), run: s.run, endsSentence: s.endsSentence });
  };
  clauses.forEach(split);

  const startOf = (ws: CapWord[]) => Math.max(ws[0].f, (hideEnd(ws[0].f) ?? -1) + 1);
  const endOf = (k: number, list: { words: CapWord[]; run: number }[]) => {
    const s = list[k];
    const last = s.words[s.words.length - 1];
    const lastEnd = last.endF;
    const nx = list[k + 1];
    let end = lastEnd + PH.holdQuiet;
    if (nx && nx.run === s.run) end = startOf(nx.words) - lastEnd <= PH.bridge ? startOf(nx.words) : Math.min(end, startOf(nx.words));
    // ekor: pita sibuk (busy, bukan penekanan) yang mulai sebelum VO kata terakhir selesai + 0,3 dtk tidak memotong blok —
    // blok diam sampai ucapan selesai (dibatasi penekanan berikut & cut). Busy berasal dari pita subtitle bawah v11; blok kinetik
    // berada di zona SPEC masing-masing (dicek per still).
    const tail = Math.min(lastEnd + PH.tail, nextEmph(last.f) - HIDE.pad);
    return Math.min(end, Math.max(nextHide(last.f), tail), nextCut(last.f));
  };
  // gabung blok pendek dengan tetangga di run yang sama (utamakan menyelesaikan kalimat)
  for (let guard = 0; guard < 400; guard++) {
    let changed = false;
    for (let k = 0; k < segs.length; k++) {
      const s = segs[k];
      if (endOf(k, segs) - startOf(s.words) >= needF(s.words.length)) continue;
      const nx = segs[k + 1], pv = segs[k - 1];
      const okN = !!nx && nx.run === s.run && !tooLong([...s.words, ...nx.words]);
      const okP = !!pv && pv.run === s.run && !tooLong([...pv.words, ...s.words]);
      const preferPrev = okP && (s.endsSentence || !okN || (pv && !pv.endsSentence && nx?.words[0] && (nx.words[0] as W).soft));
      if (preferPrev) { pv.words.push(...s.words); pv.endsSentence = s.endsSentence; segs.splice(k, 1); changed = true; break; }
      if (okN) { s.words.push(...nx.words); s.endsSentence = nx.endsSentence; segs.splice(k + 1, 1); changed = true; break; }
      // tidak muat digabung utuh → gabung dengan tetangga lalu pecah ulang di titik lain yang membuat KEDUA blok cukup lama
      for (const j of [k, k - 1]) {
        const A = segs[j], B = segs[j + 1];
        if (!A || !B || A.run !== B.run) continue;
        const all = [...A.words, ...B.words];
        const orig = A.words.length;
        let best = -1, bestScore = -Infinity;
        for (let c = 1; c < all.length; c++) {
          if (c === orig) continue;
          const L = all.slice(0, c), R = all.slice(c);
          if (tooLong(L) || tooLong(R)) continue;
          const trial = [...segs.slice(0, j), { words: L, run: A.run, endsSentence: false }, { words: R, run: A.run, endsSentence: B.endsSentence }, ...segs.slice(j + 2)];
          if (endOf(j, trial) - startOf(L) < needF(L.length) || endOf(j + 1, trial) - startOf(R) < needF(R.length)) continue;
          const sc = -Math.abs(chars(L) - chars(R)) / 10 + 2.5 * Math.min(0.4, Math.max(0, all[c].gap)) + (all[c].soft ? 0.6 : 0);
          if (sc > bestScore) { bestScore = sc; best = c; }
        }
        if (best > 0) {
          segs.splice(j, 2, { words: all.slice(0, best), run: A.run, endsSentence: false }, { words: all.slice(best), run: A.run, endsSentence: B.endsSentence });
          changed = true; break;
        }
      }
      if (changed) break;
    }
    if (!changed) break;
  }

  const phrases: Phrase[] = segs.map((s, k) => ({
    words: s.words.map(({ text, f, endF, i }) => ({ text, f, endF, i })), start: startOf(s.words), end: endOf(k, segs), dark: false,
    lastEnd: s.words[s.words.length - 1].endF, run: s.run,
  }));
  phrases.forEach((p) => { p.dark = lumAt(p.start) > DARK_ABOVE; }); // tinta awal frasa (tinta tampil dihitung per frame, lihat inkAt)
  return { phrases, skipped };
};

const BUILT = buildPhrases();
export const CAPTION_PHRASES = BUILT.phrases;

/** tinta per frame dari luminansi pita (sudah dihaluskan median ±3 sampel di caption_mask.py → ganti hanya saat latar berganti) */
const inkAt = (f: number) => lumAt(f) > DARK_ABOVE;

export const CaptionTrack: React.FC = () => {
  const F = useCurrentFrame();
  const ref = useRef<HTMLDivElement>(null);
  const p = CAPTION_PHRASES.find((q) => F >= q.start && F < q.end);
  const vis = p ? p.words.filter((w) => w.f <= F) : [];
  const hidden = inHide(F);
  const name = vis.map((w) => w.text).join("_");
  const dark = inkAt(F);
  const color = dark ? CAPTION.ink : CAPTION.light;
  // probe Segmen 2: hanya catat bila caption benar-benar terlihat
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
