// tema.ts · token gaya proyek ini. KOSONG: isi dari BRAND.md / REF-SPEC.md. Komponen toolkit tidak punya warna atau huruf bawaan;
// semua nilai visual datang dari sini (atau props). Warna dalam satu keluarga hue (NEGATIF 2).
// Dicek: python3 claude/motion-graphic/scripts/juri/tema_cek.py <folder src>

export const MEREK = {
  primer: "",     // aksen utama video
  sekunder: "",   // aksen kedua
  latar: "",      // latar utama
};

export const NETRAL = { tinta: "", redup: "", garis: "", kertas: "" };

export const HURUF = {
  keluarga: { judul: "", isi: "" },
  ukuran: { hero: 0, judul: 0, narasi: 0, label: 0 },   // px @1080p, satu peran = satu ukuran
};

// Latar generatif dan grain: OPT-IN. Nyalakan hanya bila REF-SPEC/brief memintanya (kutip alasannya di DECISIONS.md).
export const LATAR = {
  mode: "off" as "off" | "cahaya" | "zona" | "mesh" | "noise",
  preset: "",              // nama dari toolkit/latar/presets (mis. "researchly-glow"); kosong = pakai `warna` di bawah
  warna: [] as string[],   // 2-3 warna satu keluarga (gelap -> terang) dari token di atas; menimpa warna preset bila diisi
  gelapTerang: "" as "" | "dark" | "light",   // kosong = ikut preset
  glow: null as null | { x: number; y: number; r: number },   // posisi zona cahaya mengikuti komposisi; null = ikut preset
  seed: null as null | number,
};

export const GRAIN = { opacity: 0, seed: 1 };   // 0 = mati; rentang disarankan 0.04-0.12
