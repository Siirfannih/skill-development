import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { CURVE } from "../../../toolkit/gerak/curves";

export const UnitMasukMeluncurPropsSchema = z.object({
  /** Isi unit (kata, huruf, angka) beserta gayanya; datang dari pemanggil. */
  children: z.custom<React.ReactNode>(),
  /** Frame kemunculan unit (potong 1 frame, opasitas 0 -> penuh). */
  mulai: z.number().int().min(0).default(0),
  /** Lama luncuran dari frame pertama sampai diam, dalam frame. */
  durasiLuncur: z.number().min(5).max(9).default(7),
  /** Offset awal ke bawah, fraksi tinggi frame. */
  offsetY: z.number().min(0.1).max(0.2).default(0.153),
  /** Offset awal ke kanan, fraksi lebar frame. */
  offsetX: z.number().min(0).max(0.19).default(0.022),
  /** Blur di frame pertama, fraksi tinggi frame (px blur / tinggi frame). */
  blurAwal: z.number().min(0.005).max(0.02).default(0.01),
});

export type UnitMasukMeluncurProps = {
  children?: React.ReactNode;
  mulai?: number;
  durasiLuncur?: number;
  offsetY?: number;
  offsetX?: number;
  blurAwal?: number;
};

/**
 * Memunculkan satu unit teks utuh dalam satu frame di posisi tergeser ke bawah (dan sedikit ke kanan) dalam keadaan kabur,
 * lalu meluncurkannya ke posisi diam dengan perlambatan tanpa pantul sambil ketajamannya pulih.
 * Pakai bila: relay kata per beat di pusat frame dengan teks kabur ke tajam, atau kalimat dibangun kata demi kata mengikuti ucapan.
 * Jangan bila: unit harus memudar masuk perlahan, butuh pantul/overshoot, atau yang dibutuhkan penanda aksen kata, gerak kamera,
 * atau sisipan gambar (itu primitif terpisah).
 */
export const UnitMasukMeluncur: React.FC<UnitMasukMeluncurProps> = ({
  children,
  mulai = 0,
  durasiLuncur = 7,
  offsetY = 0.153,
  offsetX = 0.022,
  blurAwal = 0.01,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const terlihat = frame >= mulai;
  const progres = interpolate(frame, [mulai, mulai + durasiLuncur], [0, 1], {
    easing: CURVE.luncur,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sisa = 1 - progres;

  const dx = offsetX * width * sisa;
  const dy = offsetY * height * sisa;
  const blurPx = blurAwal * height * sisa;

  return (
    <div
      style={{
        display: "inline-block",
        opacity: terlihat ? 1 : 0,
        transform: `translate(${dx}px, ${dy}px)`,
        filter: terlihat && blurPx > 0.001 ? `blur(${blurPx}px)` : "none",
      }}
    >
      {children}
    </div>
  );
};
