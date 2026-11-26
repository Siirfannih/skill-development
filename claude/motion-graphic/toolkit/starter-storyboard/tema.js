// tema.js — token gaya storyboard ini. KOSONG: isi dari BRAND.md / REF-SPEC.md (sama dengan tema.ts di jalur Remotion).
// Toolkit tidak punya warna/huruf bawaan; semua nilai visual datang dari sini.
window.TEMA = {
  warna: { primer: "", sekunder: "", latar: "", tinta: "" },
  huruf: { judul: "", ukuranJudul: 0 },
  // OPT-IN: nyalakan hanya bila REF-SPEC/brief memintanya.
  latar: { mode: "off", preset: "", warna: [], gelapTerang: "", glow: null, seed: null },   // kosong/null = ikut preset; off | cahaya | zona | mesh | noise
  grain: { opacity: 0, seed: 1 },                                                                     // 0 = mati; disarankan 0.04-0.12
};
