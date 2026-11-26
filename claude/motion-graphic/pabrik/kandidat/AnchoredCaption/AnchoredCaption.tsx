import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp01 } from "../../../toolkit/gerak/curves";
import { timeline } from "../../../toolkit/gerak/timing";

export const AnchoredCaptionPropsSchema = z.object({
  tokens: z.object({
    tinta: z.string(),
    huruf: z.string(),
    scrim: z.string(),
  }),
  /** Urutan kata/frasa 1-2 kata; `detik` = lama bertahan (mengikuti ucapan, tidak seragam). */
  kata: z.array(z.object({ teks: z.string(), detik: z.number().positive() })).min(1),
  bobot: z.number(),
  tinggiRel: z.number().default(0.07),
  trackingEm: z.number().default(-0.02),
  x: z.number().default(0.5),
  y: z.number().default(0.5),
  /** 0..1: kekuatan gradasi gelap tipis di y 0,35-0,65 untuk shot cerah; 0 = mati. */
  scrim: z.number().default(0),
});
export type AnchoredCaptionProps = z.infer<typeof AnchoredCaptionPropsSchema> & {
  /** Lapisan gambar di belakang (shot); berganti terpisah dari kata, caption tidak ikut bergerak. */
  children?: React.ReactNode;
};

/**
 * Caption 1-2 kata berukuran tetap, terkunci di satu titik, kata diganti di tempat dengan potongan keras mengikuti ucapan.
 * Pakai bila: ucapan perlu terbaca per kata di atas gambar yang berganti cepat (klip bicara, reel 9:16).
 * Jangan bila: caption butuh animasi masuk/keluar, hierarki ukuran bertingkat, atau kalimat panjang satu layar.
 */
export const AnchoredCaption: React.FC<AnchoredCaptionProps> = ({
  tokens,
  kata,
  bobot,
  tinggiRel = 0.07,
  trackingEm = -0.02,
  x = 0.5,
  y = 0.5,
  scrim = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const tl = timeline();
  kata.forEach((k, i) => tl.add(`w${i}`, k.detik * fps));

  let aktif = 0;
  for (let i = 0; i < kata.length; i++) {
    if (frame >= Math.round(tl.at(`w${i}`))) aktif = i;
  }

  const ukuran = height * tinggiRel;

  return (
    <div style={{ position: "absolute", inset: 0, width, height, overflow: "hidden" }}>
      {children}
      {scrim > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: height * (y - 0.15),
            height: height * 0.3,
            opacity: clamp01(scrim),
            background: `linear-gradient(to bottom, transparent 0%, ${tokens.scrim} 35%, ${tokens.scrim} 65%, transparent 100%)`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: width * x,
          top: height * y,
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          color: tokens.tinta,
          fontFamily: tokens.huruf,
          fontWeight: bobot,
          fontSize: ukuran,
          lineHeight: 1,
          letterSpacing: `${trackingEm}em`,
          textAlign: "center",
        }}
      >
        {kata[aktif].teks}
      </div>
    </div>
  );
};
