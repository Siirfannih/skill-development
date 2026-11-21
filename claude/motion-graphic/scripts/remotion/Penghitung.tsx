// Penghitung.tsx — blok lego: angka yang naik/turun dan bisa dibaca (cookbook/teknik/launch-motion.md §2).
// Angka tidak pernah lompat ke nilai akhir dalam satu frame: berjalan ±1 dtk dengan kurva `reveal` (cepat di awal,
// melambat ke nilai akhir), digit memakai tabular-nums supaya lebar tidak goyang. `cahaya` menambah glow yang menguat
// mengikuti nilai (emosi: tekanan yang menumpuk); pakai hanya bila cerita adegan itu memang tekanan.
// Font, ukuran, dan warna dari pengikat proyek.
//
// Pakai: <Penghitung dari={0} ke={200} mulai={30} fontFamily="Inter" fontSize={120} cahaya="#FF3B30" />
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { move } from "./curves";

export type PenghitungProps = {
  dari: number; ke: number; mulai: number; durasi?: number; fontFamily: string; fontSize: number;
  fontWeight?: number; warna?: string; cahaya?: string; awalan?: string; akhiran?: string; lokal?: string;
};

/** Nilai pada `frame`: dibulatkan, monoton, dan sampai tepat di `ke` pada akhir durasi. */
export const nilaiPenghitung = (frame: number, fps: number, dari: number, ke: number, mulai: number, durasi?: number) => {
  const k = move(frame, mulai, durasi ?? Math.round(fps * 1.0), "reveal");
  return Math.round(dari + (ke - dari) * k);
};

export const Penghitung: React.FC<PenghitungProps> = ({
  dari, ke, mulai, durasi, fontFamily, fontSize, fontWeight = 500, warna = "#FFFFFF", cahaya, awalan = "", akhiran = "", lokal = "id-ID",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = nilaiPenghitung(frame, fps, dari, ke, mulai, durasi);
  const kuat = cahaya && ke !== dari ? Math.abs(v - dari) / Math.abs(ke - dari) : 0;
  return (
    <span style={{
      fontFamily, fontSize, fontWeight, color: warna, fontVariantNumeric: "tabular-nums", lineHeight: 1,
      textShadow: cahaya ? `0 0 ${Math.round(fontSize * 0.35 * kuat)}px ${cahaya}` : undefined,
    }}>
      {awalan}{v.toLocaleString(lokal)}{akhiran}
    </span>
  );
};
