import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const GantiUnitDiJangkarPropsSchema = z.object({
  /** Isi unit (kata/frasa) dari pemanggil; gaya teks sepenuhnya milik pemanggil. */
  children: z.custom<React.ReactNode>(),
  /** Frame pertama unit tampil (potong masuk, opasitas penuh sejak frame ini). */
  mulai: z.number().int().min(0).default(0),
  /** Frame terakhir unit tampil (inklusif). Kosong = tampil sampai akhir komposisi. Unit berikut sebaiknya mulai di sampai + 1. */
  sampai: z.number().int().min(0).optional(),
  /** Titik jangkar x, fraksi lebar frame. Pusat unit selalu di sini walau lebar unit berubah. */
  jangkarX: z.number().min(0).max(1).default(0.499),
  /** Titik jangkar y, fraksi tinggi frame. */
  jangkarY: z.number().min(0).max(1).default(0.504),
});

export type GantiUnitDiJangkarProps = z.input<typeof GantiUnitDiJangkarPropsSchema>;

/**
 * Menampilkan satu unit teks di titik jangkar tetap selama rentang frame [mulai, sampai], masuk dan keluar dengan potong 1 frame,
 * pusatnya terkunci di jangkar dan tanpa gerak posisi selama tampil; rangkai beberapa unit dengan sampai[i] = mulai[i+1] - 1.
 *
 * Pakai bila: caption jangkar di ruang tetap pembicara (dada, atas kepala, mulut) saat shot atau frasa berganti.
 * Jangan bila: unit perlu masuk/keluar dengan gerak, fade, atau luncuran; beberapa unit harus tampil bersamaan;
 * atau posisi teks harus mengikuti objek yang bergerak.
 */
export const GantiUnitDiJangkar: React.FC<GantiUnitDiJangkarProps> = ({
  children,
  mulai = 0,
  sampai,
  jangkarX = 0.499,
  jangkarY = 0.504,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const akhir = sampai ?? durationInFrames - 1;
  // Potong keras: opasitas 1 tepat dari frame `mulai` sampai frame `akhir`, 0 di luar. Tidak ada kurva karena tidak ada transisi.
  const tampil = frame >= mulai && frame <= akhir;
  // Unit di luar rentangnya tidak dirender sama sekali, supaya unit tak tampak tidak menumpuk di atas unit yang sedang tampil.
  if (!tampil) {
    return null;
  }

  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: jangkarX * width,
          top: jangkarY * height,
          width: "max-content",
          transform: "translate(-50%, -50%)",
          opacity: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
