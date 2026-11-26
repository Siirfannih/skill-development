import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { z } from "zod";
import { CURVE, move } from "../../../toolkit/gerak/curves";
import { stagger } from "../../../toolkit/gerak/timing";

const TokensSchema = z.object({
  latar: z.string(),
  permukaan: z.string(),
  tinta: z.string(),
  redup: z.string(),
  aksen: z.string(),
  aksen2: z.string(),
  huruf: z.string(),
});

const KataKecilSchema = z.object({
  teks: z.string(),
  x: z.number(), // pusat, fraksi lebar frame
  y: z.number(), // garis dasar, fraksi tinggi frame
});

export const ScaleLadderPropsSchema = z.object({
  tokens: TokensSchema,
  kata: z.string(), // kata raksasa
  kecil: z.array(KataKecilSchema), // kata pendamping tersebar
  beratBesar: z.number(),
  beratKecil: z.number(),
  seed: z.number(),
  lebarRel: z.number().default(0.8), // lebar kata raksasa, fraksi lebar frame (0,47-0,98)
  pusatY: z.number().default(0.58), // pusat x-height, fraksi tinggi frame (0,5-0,62)
  lebarHurufEm: z.number().default(0.56), // perkiraan lebar rata-rata huruf (em) untuk memuat kata ke lebarRel
  tracking: z.number().default(-0.04), // em
  kecilRel: z.number().default(0.1), // ukuran font kata kecil, fraksi tinggi frame
  jedaHuruf: z.number().default(2), // frame antar huruf
  geser: z.number().default(0.08), // geser masuk, fraksi lebar elemen
  mulai: z.number().default(6), // frame awal huruf pertama
  mulaiKecil: z.number().default(26), // frame awal kata kecil pertama
  durMasuk: z.number().default(12), // frame per gerak masuk
});
export type ScaleLadderProps = z.infer<typeof ScaleLadderPropsSchema>;

/**
 * Satu kata kunci melompat ke skala raksasa (hanya dua tingkat ukuran: raksasa dan kecil) di atas footage, dikelilingi kata kecil tersebar.
 * Pakai bila: satu kata inti perlu dominasi layar di atas footage, dengan kata pendamping kecil dan kata raksasa bertahan melewati cut.
 * Jangan bila: butuh kalimat berurutan, ukuran bertingkat tiga atau lebih, atau tidak ada footage/latar di bawah kata.
 */
export const ScaleLadder: React.FC<ScaleLadderProps & { children?: React.ReactNode }> = (p) => {
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const t = p.tokens;

  const letters = Array.from(p.kata);
  const n = letters.length;
  const fs = (p.lebarRel * W) / (n * (p.lebarHurufEm + p.tracking));

  const fsSmall = p.kecilRel * H;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: t.latar, fontFamily: t.huruf }}>
      {/* lapisan 1: footage */}
      <div style={{ position: "absolute", inset: 0 }}>{p.children}</div>

      {/* lapisan 2: kata raksasa, opak, tepi bersih */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: p.pusatY * H,
          transform: "translate(-50%, -64%)",
          display: "flex",
          flexDirection: "row",
          whiteSpace: "nowrap",
          fontSize: fs,
          lineHeight: 1,
          fontWeight: p.beratBesar,
          color: t.tinta,
        }}
      >
        {letters.map((ch, i) => {
          const s = stagger(i, n, { gap: p.jedaHuruf, start: p.mulai });
          const pr = move(frame, s, p.durMasuk, "land");
          const op = move(frame, s, 4, "reveal");
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: `${p.tracking}em`,
                transform: `translateX(${-p.geser * fs * p.lebarHurufEm * (1 - pr)}px)`,
                opacity: op,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>

      {/* lapisan 3: kata kecil, ringan dan tipis */}
      {p.kecil.map((k, i) => {
        const s = p.mulaiKecil + Math.round(interpolate(i, [0, Math.max(1, p.kecil.length - 1)], [0, p.durMasuk * 2]));
        const pr = move(frame, s, p.durMasuk, "land");
        const op = move(frame, s, 5, "reveal");
        const w = k.teks.length * fsSmall * 0.45;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: k.x * W,
              top: k.y * H,
              transform: `translate(-50%, -80%) translateX(${-p.geser * w * (1 - pr)}px)`,
              whiteSpace: "nowrap",
              fontSize: fsSmall,
              lineHeight: 1,
              fontWeight: p.beratKecil,
              color: t.tinta,
              opacity: op,
            }}
          >
            {k.teks}
          </div>
        );
      })}
    </div>
  );
};

// CURVE diimpor untuk kontrak toolkit; gerak memakai move() bernama.
void CURVE;
