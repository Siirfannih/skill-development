import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { CURVE, dur, move, react, lerp, drift } from "../../../toolkit/gerak/curves";
import { stagger } from "../../../toolkit/gerak/timing";

export const ScaleLadderPropsSchema = z.object({
  /** Kata raksasa (satu kata). */
  kata: z.string(),
  /** Kata kecil pendamping: x = pusat (fraksi lebar frame), y = pusat (fraksi tinggi frame). */
  kecil: z.array(z.object({ teks: z.string(), x: z.number(), y: z.number() })),
  tokens: z.object({
    latar: z.string(),
    tinta: z.string(),
    tintaKecil: z.string(),
    bingkai: z.string(),
    huruf: z.string(),
  }),
  /** Kotak footage kecil di bawah tengah (fraksi frame); isi lewat prop `isiKotak`. */
  kotak: z.object({
    tampil: z.boolean(),
    cx: z.number(),
    top: z.number(),
    lebar: z.number(),
    tinggi: z.number(),
  }),
  /** Lebar target kata raksasa (fraksi lebar frame): 0,5-0,98 menurut panjang kata. */
  lebarRel: z.number().default(0.88),
  /** Batas atas tinggi kapital (fraksi tinggi frame). */
  tinggiMaksRel: z.number().default(0.6),
  pusatX: z.number().default(0.5),
  pusatY: z.number().default(0.56),
  /** Rata-rata lebar huruf (em) untuk menaksir ukuran; kata dipas ke lebar target. */
  lebarHurufEm: z.number().default(0.6),
  /** Tinggi kapital per em (rasio font). */
  kapitalEm: z.number().default(0.716),
  trackingEm: z.number().default(-0.04),
  bobotRaksasa: z.number().default(800),
  bobotKecil: z.number().default(300),
  /** x-height kata kecil (fraksi tinggi frame) dan rasio x-height per em. */
  kecilXHeightRel: z.number().default(0.055),
  xHeightEm: z.number().default(0.52),
  jedaHuruf: z.number().default(2),
  geserRel: z.number().default(0.08),
  mulaiKata: z.number().default(6),
  mulaiKecil: z.number().default(22),
  /** Dorongan masuk pelan sepanjang adegan (skala akhir - 1). */
  dorongRel: z.number().default(0.025),
  seed: z.number().default(1),
});
export type ScaleLadderProps = z.input<typeof ScaleLadderPropsSchema> & {
  /** Lapisan footage penuh-frame (di bawah kata raksasa). */
  footage?: React.ReactNode;
  /** Isi kotak footage kecil. */
  isiKotak?: React.ReactNode;
};

/**
 * Satu kata kunci melompat ke skala raksasa di atas footage, dikelilingi kata kecil tersebar; tanpa ukuran perantara.
 * Pakai bila: satu kata inti perlu ditekankan keras dan tetap tinggal melewati cut footage.
 * Jangan bila: pesan berupa kalimat panjang, atau butuh hierarki tiga ukuran atau lebih.
 */
export const ScaleLadder: React.FC<ScaleLadderProps> = (raw) => {
  const p = ScaleLadderPropsSchema.parse(raw);
  const { footage, isiKotak } = raw;
  const frame = useCurrentFrame();
  const { width: W, height: H, fps } = useVideoConfig();
  const letters = Array.from(p.kata);
  const n = letters.length;

  const estEm = n * p.lebarHurufEm + n * p.trackingEm;
  const fsLebar = (p.lebarRel * W) / estEm;
  const fsTinggi = (p.tinggiMaksRel * H) / p.kapitalEm;
  const fs = Math.min(fsLebar, fsTinggi);
  const wordW = estEm * fs;
  const shift = p.geserRel * wordW;
  const enterFrames = dur(shift, fps, 2.4);
  const dorong = 1 + p.dorongRel * Math.min(1, frame / (fps * 4));

  const fsKecil = (p.kecilXHeightRel * H) / p.xHeightEm;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: p.tokens.latar }}>
      {footage}

      {p.kotak.tampil && (
        <div
          style={{
            position: "absolute",
            left: (p.kotak.cx - p.kotak.lebar / 2) * W,
            top: p.kotak.top * H,
            width: p.kotak.lebar * W,
            height: p.kotak.tinggi * H,
            overflow: "hidden",
            border: `${0.004 * H}px solid ${p.tokens.bingkai}`,
            boxSizing: "border-box",
          }}
        >
          {isiKotak}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: p.pusatX * W,
          top: p.pusatY * H,
          transform: `translate(-50%, -50%) scale(${dorong})`,
          display: "flex",
          whiteSpace: "nowrap",
          fontFamily: p.tokens.huruf,
          fontWeight: p.bobotRaksasa,
          fontSize: fs,
          lineHeight: 1,
          letterSpacing: `${p.trackingEm}em`,
          color: p.tokens.tinta,
        }}
      >
        {letters.map((ch, i) => {
          const start = p.mulaiKata + stagger(i, n, { gap: p.jedaHuruf });
          const t = move(frame, start, enterFrames, "land");
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translateX(${lerp(-shift, 0, t)}px)`,
                visibility: frame < start ? "hidden" : "visible",
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>

      {p.kecil.map((k, i) => {
        const start = p.mulaiKecil + react(i, fps);
        const t = move(frame, start, dur(0.03 * W, fps, 1.4), "reveal");
        const dr = drift(frame, fps, 0.006 * W, p.seed + i * 1.7);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: k.x * W,
              top: k.y * H,
              transform: `translate(-50%, -50%) translate(${dr.x + lerp(-0.03 * W, 0, t)}px, 0px)`,
              opacity: CURVE.reveal(t),
              whiteSpace: "nowrap",
              fontFamily: p.tokens.huruf,
              fontWeight: p.bobotKecil,
              fontSize: fsKecil,
              lineHeight: 1,
              color: p.tokens.tintaKecil,
            }}
          >
            {k.teks}
          </div>
        );
      })}
    </div>
  );
};
