// TeksBlok.tsx — satu blok teks KT sebagai lapisan lego ber-alpha (Lantai A9a, F26).
// Dirender oleh scripts/lego/lapisan.py: latar transparan, ukuran = kotak blok, waktu & posisi diatur lego.json.
// Gerak dipilih dari teks.json (`kode`), BUKAN fade bawaan. Kode yang belum ada di sini melempar error supaya builder
// menambah implementasinya (dengan curves.ts), bukan diam-diam jatuh ke fade.
//
// Daftarkan di Root.tsx:
//   <Composition id="TeksBlok" component={TeksBlok} fps={30} width={1080} height={400} durationInFrames={45}
//     defaultProps={{ teks: "Excitement", kode: "T02", gaya: "G8", fontFamily: "Poppins", fontSize: 160 }}
//     calculateMetadata={({ props }) => ({ width: props.w ?? 1080, height: props.h ?? 400,
//       durationInFrames: Math.round((props.durasi ?? 1.5) * 30) })} />
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, dur, exitDur, move, react } from "./curves";
import { LightSweep } from "./LightSweep";

export type TeksBlokProps = {
  teks: string; kode: string; gaya?: string; fontFamily: string; fontSize: number; fontWeight?: number;
  warna?: string; aksen?: string; durasi?: number; w?: number; h?: number;
};

const Word: React.FC<{ s: React.CSSProperties; children: React.ReactNode }> = ({ s, children }) => (
  <span style={{ display: "inline-block", whiteSpace: "pre", ...s }}>{children}</span>
);

export const TeksBlok: React.FC<TeksBlokProps> = (p) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const words = p.teks.split(/\s+/).filter(Boolean);
  const kode = p.kode.toUpperCase();
  const inF = dur(width * 0.4, fps, kode === "T03" ? 0.7 : 1);          // masuk dari jarak, bukan 0,5 dtk kebiasaan
  const outStart = durationInFrames - exitDur(inF);
  const out = move(f, outStart, exitDur(inF), "leave");                   // keluar lebih cepat, makin cepat
  const base: React.CSSProperties = { fontFamily: p.fontFamily, fontSize: p.fontSize, fontWeight: p.fontWeight ?? 700,
    color: p.warna ?? "#F4F1EA", lineHeight: 1, letterSpacing: "-0.02em" };

  let body: React.ReactNode;
  switch (kode) {
    case "T19": // word-pop ikut VO: kata utama + reaksi berjeda tidak rata
      body = words.map((w, i) => {
        const q = move(f, react(i, fps), Math.round(inF * 0.6), "land");
        return <Word key={i} s={{ transform: `translateY(${(1 - q) * 0.5}em) scale(${0.85 + 0.15 * q})`, opacity: Math.min(1, q * 3) }}>{w + " "}</Word>;
      });
      break;
    case "T01": // word rise dari balik mask garis dasar
      body = words.map((w, i) => {
        const q = move(f, react(i, fps), inF, "reveal");
        return <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <Word s={{ transform: `translateY(${(1 - q) * 140}%)` }}>{w + " "}</Word></span>;
      });
      break;
    case "T02": { // blur-to-focus untuk kata hero (motion-ok: kiblat Golden rule/Excitement memakai blur-in pada hero)
      const q = move(f, 0, Math.round(inF * 0.7), "land");
      const inner = p.gaya === "G8"
        ? <LightSweep text={p.teks} fontFamily={p.fontFamily} fontSize={p.fontSize} sweepStart={Math.round(inF * 0.6)} sweepFrames={dur(width, fps, 1)} />
        : <span style={base}>{p.teks}</span>;
      body = <div style={{ filter: `blur(${(1 - q) * 12}px)`, transform: `translateX(${(1 - q) * -4}%) scale(${1.08 - 0.08 * q})`, opacity: Math.min(1, q * 2) }}>{inner}</div>; // motion-ok: T02 hero
      break;
    }
    case "T03": { // slam: 2.0 -> 1.3 -> 1.0 dalam 3 frame, mendarat berat
      const s = interpolate(f, [0, 1, 2, 3], [2.0, 1.3, 1.06, 1.0], { extrapolateRight: "clamp", easing: CURVE.heavy });
      body = <span style={{ ...base, display: "inline-block", transform: `scale(${s})` }}>{p.teks}</span>;
      break;
    }
    case "T04": { // kata raksasa 300 % -> 100 %
      const q = move(f, 0, Math.round(inF * 0.8), "heavy");
      body = <span style={{ ...base, display: "inline-block", transform: `scale(${3 - 2 * q})` }}>{p.teks}</span>;
      break;
    }
    case "T11": { // typewriter: huruf per huruf + caret, hanya untuk UI/prompt
      const n = Math.min(p.teks.length, Math.floor(f * 1.5));
      body = <span style={{ ...base, fontFamily: "JetBrains Mono, monospace" }}>{p.teks.slice(0, n)}<span style={{ opacity: f % 16 < 8 ? 1 : 0 }}>▍</span></span>;
      break;
    }
    case "FADE": { // hanya peran sub (kt_check menolak fade untuk peran lain)
      const q = move(f, 0, Math.round(inF * 0.5), "drift");
      body = <span style={{ ...base, opacity: q }}>{p.teks}</span>;
      break;
    }
    default:
      throw new Error(`TeksBlok: kode ${p.kode} belum diimplementasikan; tambahkan dengan curves.ts (typography.md §8)`);
  }
  return (
    <AbsoluteFill style={{ background: "transparent", display: "flex", alignItems: "center", justifyContent: "center",
      clipPath: `inset(0 0 ${out * 100}% 0)`, transform: `translateY(${-out * 0.4}em)` }}>  {/* keluar lewat mask, bukan fade (typography.md §8) */}
      <div style={base}>{body}</div>
    </AbsoluteFill>
  );
};
