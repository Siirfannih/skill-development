// FlashCut.tsx — kilat di titik potong atau di ketukan: bidang warna penuh N frame tanpa naik/turun (GRK-01),
// opsional luruh beberapa frame (varian exposure, X12). Mode "overexpose" menaikkan kecerahan isi alih-alih menutupnya.
// Event dihitung dari indeks frame bulat, jadi 1 frame tetap 1 frame di render paralel.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, FLASH, NETRAL, fr } from "../presets";

export type FlashCutProps = {
  /** frame lokal frame pertama kilat */
  at?: number;
  /** frame intensitas penuh (bawaan 2 f @30 fps, diskalakan ke fps komposisi) */
  hold?: number;
  /** frame luruh sesudah tahan (0 = padam seketika) */
  decay?: number;
  /** warna bidang kilat; bawaan putih netral. Latar terang → pakai warna gelap (dip 2 f, kartu 19.T3 remix) */
  color?: string;
  mode?: "solid" | "overexpose";
  /** kecerahan puncak mode overexpose */
  brightness?: number;
  blend?: React.CSSProperties["mixBlendMode"];
  /** isi: wajib untuk "overexpose"; untuk "solid" boleh kosong (lapisan kilat saja di atas saudara) */
  children?: React.ReactNode;
};

/** Selubung 0..1 kilat pada frame lokal. */
export const flashEnvelope = (frame: number, at = 0, hold: number = FLASH.potong.hold, decay: number = FLASH.potong.decay) => {
  const i = Math.round(frame - at);
  if (i < 0) return 0;
  if (i < hold) return 1;
  const d = i - hold;
  if (d < decay) return 1 - CURVE.leave((d + 1) / (decay + 1));
  return 0;
};

export const FlashCut: React.FC<FlashCutProps> = ({
  at = 0, hold, decay = FLASH.potong.decay, color = NETRAL.terang, mode = "solid", brightness = 2.2, blend, children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = flashEnvelope(frame, at, hold ?? fr(FLASH.potong.hold, fps), decay);
  const full: React.CSSProperties = { position: "absolute", inset: 0 };
  if (mode === "overexpose") {
    return <div style={{ ...full, filter: e > 0 ? `brightness(${1 + (brightness - 1) * e})` : undefined }}>{children}</div>;
  }
  const lapis = e > 0 ? <div style={{ ...full, background: color, opacity: e, mixBlendMode: blend }} /> : null;
  if (children === undefined) return lapis;
  return <div style={full}>{children}{lapis}</div>;
};
