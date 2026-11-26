// Netral.tsx — DUA ISIAN SLOT NETRAL (A, B) yang sama untuk semua demo pabrik primitif gerak.
// Satu-satunya tempat warna/huruf/teks demo. Demo.tsx menerima `isian` ("A" | "B") dan hanya merakit bagian ini dengan primitif.
// Kenapa dua isian: primitif dianggap memindahkan MEKANIK bila geraknya tetap terukur sama saat token, teks, dan wadah diganti;
// satu isian saja tidak bisa membedakan mekanik dari kulit yang kebetulan menempel. Warna dipilih jauh (DeltaE) dari palet referensi
// yang sudah dibedah; uji kebocoran kulit tetap mengukurnya per primitif.
import React from "react";
import { AbsoluteFill } from "remotion";

export type IdIsian = "A" | "B";
export type Isian = {
  latar: string; wadah: string; tinta: string; label: string; huruf: string; berat: number;
  /** "tanpa" = unit teks langsung di atas latar; "kartu" = unit di dalam bidang persegi membulat. */
  bentukWadah: "tanpa" | "kartu";
  kata: string[];
};

export const ISIAN: Record<IdIsian, Isian> = {
  A: { latar: "#C9D6DF", wadah: "#AFC0CC", tinta: "#1E3A5F", label: "#3B5670", huruf: "'DejaVu Sans', Arial, sans-serif", berat: 700,
       bentukWadah: "tanpa", kata: ["Satu", "dua", "tiga", "empat"] },
  B: { latar: "#1E293B", wadah: "#334155", tinta: "#99F6E4", label: "#64748B", huruf: "'DejaVu Serif', Georgia, serif", berat: 400,
       bentukWadah: "kartu", kata: ["Pagi", "ini", "hujan", "reda"] },
};

/** Latar polos seukuran frame. */
export const PanggungNetral: React.FC<{ isian: IdIsian; children?: React.ReactNode }> = ({ isian, children }) => (
  <AbsoluteFill style={{ background: ISIAN[isian].latar }}>{children}</AbsoluteFill>
);

/** Wadah unit: A tanpa bidang, B kartu. Ukuran px. Isi diletakkan oleh pemanggil (children). */
export const WadahUji: React.FC<{ isian: IdIsian; lebar: number; tinggi: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({
  isian, lebar, tinggi, children, style,
}) => {
  const s = ISIAN[isian];
  const bidang = s.bentukWadah === "kartu" ? { background: s.wadah, borderRadius: Math.min(lebar, tinggi) * 0.08 } : {};
  return <div style={{ position: "relative", width: lebar, height: tinggi, ...bidang, ...style }}>{children}</div>;
};

/** Satu unit teks (kata/huruf) dengan gaya isian; ukuran = px tinggi huruf. */
export const KataUji: React.FC<{ isian: IdIsian; children: React.ReactNode; ukuran: number; style?: React.CSSProperties }> = ({ isian, children, ukuran, style }) => {
  const s = ISIAN[isian];
  return <span style={{ fontFamily: s.huruf, fontWeight: s.berat, fontSize: ukuran, lineHeight: 1, color: s.tinta, whiteSpace: "pre", display: "inline-block", ...style }}>{children}</span>;
};

/** Kursor panah standar. `tekan` 0..1 mengecilkan kursor saat klik. */
export const KursorUji: React.FC<{ isian: IdIsian; ukuran: number; tekan?: number }> = ({ isian, ukuran, tekan = 0 }) => (
  <svg width={ukuran} height={ukuran * 1.5} viewBox="0 0 16 24" style={{ transform: `scale(${1 - 0.15 * tekan})`, transformOrigin: "0 0", display: "block" }}>
    <path d="M1 1 L1 19 L5.5 14.5 L8.5 22 L11.5 20.8 L8.6 13.6 L14.5 13.6 Z" fill={ISIAN[isian].tinta} stroke={ISIAN[isian].latar} strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);
