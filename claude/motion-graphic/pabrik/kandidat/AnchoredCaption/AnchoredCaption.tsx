import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp01, lerp } from "../../../toolkit/gerak/curves";

export const AnchoredCaptionPropsSchema = z.object({
  tokens: z.object({
    teks: z.string(),
    bayang: z.string(),
    huruf: z.string(),
  }),
  /** Kata/frasa 1-2 kata; `mulai` = frame awal, berlaku sampai kata berikutnya. Urut menaik. */
  kata: z.array(z.object({ teks: z.string(), mulai: z.number() })),
  /** Pergantian shot (potongan keras), terpisah dari kata. `scrim` 0..1 = kekuatan gradasi gelap di belakang caption. */
  shot: z.array(z.object({ mulai: z.number(), scrim: z.number() })),
  /** Angka mekanik; bila kosong dipakai nilai dari spec (0,07 / -0,02 / 800 / 0,5 / 0,5 / 0,3). */
  ukuran: z.number().optional(),
  trackingEm: z.number().optional(),
  bobot: z.number().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  scrimTinggi: z.number().optional(),
});
export type AnchoredCaptionProps = z.infer<typeof AnchoredCaptionPropsSchema> & {
  /** Satu simpul React per shot, urut sesuai `shot`. */
  children?: React.ReactNode;
};

const aktif = (mulai: number[], frame: number) => {
  let idx = -1;
  for (let i = 0; i < mulai.length; i++) if (frame >= mulai[i]) idx = i;
  return idx;
};

/**
 * Caption 1-2 kata terkunci di satu titik; kata diganti di tempat dengan potongan keras dan shot di belakangnya berganti terpisah.
 * Pakai bila: ucapan/narasi tampil kata per kata di atas gambar yang berganti, dan titik pandang harus tetap.
 * Jangan bila: butuh teks panjang, animasi masuk/keluar teks, atau caption yang bergerak mengikuti objek.
 */
export const AnchoredCaption: React.FC<AnchoredCaptionProps> = (raw) => {
  const p = AnchoredCaptionPropsSchema.parse(raw);
  const ukuran = p.ukuran ?? 0.07, trackingEm = p.trackingEm ?? -0.02, bobot = p.bobot ?? 800;
  const px = p.x ?? 0.5, py = p.y ?? 0.5, scrimTinggi = p.scrimTinggi ?? 0.3;
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const kids = React.Children.toArray(raw.children);

  const iKata = aktif(p.kata.map((k) => k.mulai), frame);
  const iShot = aktif(p.shot.map((s) => s.mulai), frame);
  const kata = iKata >= 0 ? p.kata[iKata].teks : "";
  const scrim = iShot >= 0 ? clamp01(p.shot[iShot].scrim) : 0;

  const fs = ukuran * height;
  const band = scrimTinggi * height;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>{iShot >= 0 ? kids[iShot] : null}</div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: py * height - band / 2,
          height: band,
          opacity: lerp(0, 1, scrim),
          background: `linear-gradient(to bottom, transparent 0%, ${p.tokens.bayang} 35%, ${p.tokens.bayang} 65%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${px * 100}%`,
          top: `${py * 100}%`,
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          textAlign: "center",
          fontFamily: p.tokens.huruf,
          fontWeight: bobot,
          fontSize: fs,
          lineHeight: 1,
          letterSpacing: `${trackingEm}em`,
          color: p.tokens.teks,
        }}
      >
        {kata}
      </div>
    </div>
  );
};
