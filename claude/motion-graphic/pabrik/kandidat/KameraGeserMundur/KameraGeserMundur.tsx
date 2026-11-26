import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { CURVE } from "../../../toolkit/gerak/curves";

export const KameraGeserMundurPropsSchema = z.object({
  children: z.custom<React.ReactNode>().optional(),
  /** Geser menyamping panggung, fraksi lebar frame. Positif = isi bergeser ke kanan (bidang baru terbuka di kiri). */
  geser_x: z.number().min(-0.221).max(0.221).default(0.192),
  /** Skala isi di akhir gerak (akhir/awal), berpusat di tengah frame. */
  skala_akhir: z.number().min(0.862).max(0.898).default(0.88),
  /** Geser vertikal, fraksi tinggi frame. Mekanik ini datar: biarkan 0. */
  geser_y: z.number().default(0),
  /** Lama gerak dari progres 1 % sampai 99 %, dalam frame @ fps komposisi. */
  durasi_1_99: z.number().min(29).max(33).default(31),
  /** Lama progres skala 1 % sampai 99 %. Kurva dan titik tengahnya sama dengan geser; ujung skala yang sangat kecil (0,12 total)
   * baru terbaca setelah ±1 % sehingga jendelanya dibuat sedikit lebih panjang agar tampak selaras dengan geser. */
  durasi_1_99_skala: z.number().min(29).max(35).default(33.5),
  /** Frame akhir tahan sebelum gerak (onset). */
  mulai: z.number().default(11),
  /** Kurva berangkat `ancang` frame sebelum `mulai`; kaki kurva heavy datar, jadi panggung tetap tampak diam sampai `mulai`. */
  ancang: z.number().min(0).max(4).default(2),
});

export type KameraGeserMundurProps = z.input<typeof KameraGeserMundurPropsSchema>;

// Posisi waktu (0..1) saat CURVE.heavy mencapai progres p; dipakai untuk menerjemahkan durasi_1_99 ke panjang kurva penuh.
const waktuPada = (p: number) => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if (CURVE.heavy(m) < p) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
};
const RENTANG_1_99 = waktuPada(0.99) - waktuPada(0.01);
const TENGAH = waktuPada(0.5);

const jalan = (frame: number, awal: number, panjang: number) =>
  interpolate(frame, [awal, awal + panjang], [0, 1], {
    easing: CURVE.heavy,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/**
 * Menggeser seluruh panggung menyamping sambil mengecilkannya pada satu kurva, sehingga bidang baru terbuka di satu sisi frame lalu panggung ditahan.
 * Pakai bila: demo fitur produk atau AI tool tanpa pembicara (urutan klik lalu hasil muncul, prompt terbaca), atau esai bernarasi tanpa wajah yang butuh kontras dua sisi / transisi teks ke bukti UI tanpa cut.
 * Jangan bila: butuh cut tegas, gerak berpantul, zoom ke satu titik, atau panggung tidak punya isi di luar frame untuk sisi yang dibuka.
 */
export const KameraGeserMundur: React.FC<KameraGeserMundurProps> = ({
  children,
  geser_x = 0.192,
  skala_akhir = 0.88,
  geser_y = 0,
  durasi_1_99 = 31,
  durasi_1_99_skala = 33.5,
  mulai = 11,
  ancang = 2,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const panjang = durasi_1_99 / RENTANG_1_99;
  const awal = mulai - ancang;
  const progres = jalan(frame, awal, panjang);

  // Skala: kurva sama, titik tengah sama dengan geser, jendela sedikit lebih panjang.
  const panjangSkala = durasi_1_99_skala / RENTANG_1_99;
  const awalSkala = awal + TENGAH * (panjang - panjangSkala);
  const progresSkala = jalan(frame, awalSkala, panjangSkala);

  const tx = geser_x * width * progres;
  const ty = geser_y * height * progres;
  const s = 1 + (skala_akhir - 1) * progresSkala;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transformOrigin: "50% 50%",
        transform: `translate(${tx}px, ${ty}px) scale(${s})`,
      }}
    >
      {children}
    </div>
  );
};
