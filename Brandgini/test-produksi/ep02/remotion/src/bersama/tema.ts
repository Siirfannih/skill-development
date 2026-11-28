// tema.ts · sistem desain video Soalnya Gini (pengganti v1 kit/design-tokens.ts).
// Format = skill-development templates/sistem-desain/tema.ts; disalin ke remotion/src/bersama/tema.ts tiap episode.
// Dicek: python3 $MG/juri/tema_cek.py <remotion/src>   ·  palet render: $MG/palette_check.py  ·  golden: tools/golden_cek.py
// Sumber nilai: plan/soalnya-gini-10-plan.md §2.2–2.3 (aturan 1-1-1: satu keluarga huruf, satu skala, satu aksen).
// Yang SENGAJA tidak dibawa dari v1: gradien periwinkle/indigo, Instrument Serif, Oswald/Anton,
// JetBrains Mono, kuning stabilo sebagai aksen. Alasan dan bukti: CHANGELOG-v2.md C-04..C-07.

export const MEREK = {
  merek: '#2D6BFF',    // Biru Gini: satu-satunya aksen. Hanya untuk "yang sedang dijelaskan" (aliran, sinyal, kata kunci aktif)
  primer: '#2D6BFF',
  sekunder: '#C99A5B', // kardus maskot Gini. Hanya di tubuh maskot dan benda kardus; bukan aksen teks
  latar: '#E9EDF2',    // Kabut: kanvas dasar gaya A dan adegan terang
};

export const NETRAL = {
  tinta: '#1B2330',    // teks, garis, bayangan duotone cutout
  redup: '#6B7684',    // garis bantu dan ikon sekunder SAJA: kontras di Kabut 3,93:1 < 4,5 (Lantai A7), jadi bukan warna teks
  putih: '#FFFFFF',
  kertas: '#EEEAE0',   // gaya B: kertas arsip / kertas grafik
  arang: '#16181B',    // gaya B: papan gelap untuk stempel tanggal; maksimal satu babak per video (S-V19)
};

// Turunan dikelompokkan per induk; hue <= 25° dari induk (tema_cek.py).
export const TURUNAN = {
  primer: {cetakBiru: '#1D3C6B', stabilo: '#9DB8FF', tekan: '#1F4FCC'},  // tekan = Biru Gini untuk TEKS di latar terang
  sekunder: {kardusGelap: '#A87C43'},
};

// Warna di luar keluarga: wajib adegan + alasan (Lantai C18a). Keputusan Irfan K-04 (default: dipakai, hemat).
export const PENGECUALIAN = {
  spidolMerah: {warna: '#D6202B', adegan: 'gaya B: lingkaran/coret spidol pada angka atau klaim salah, maks 2 kali per video', alasan: 'mekanik inti referensi vox2.mp4 19-20 dtk; tanda salah/peringatan, bukan aksen kedua'},
};

export const HURUF = {
  keluarga: {judul: 'Plus Jakarta Sans', isi: 'Plus Jakarta Sans'},  // file: merek/soalnya-gini/aset/font/ (OFL)
  bobot: {kunci: 800, sambung: 500, label: 600},
  // px @1080x1920. Satu peran = satu ukuran. sambung >= 56 (Lantai A7); rasio kunci:sambung ±2,1x seperti editing.mp4.
  ukuran: {hero: 120, kunci: 96, narasi: 80, sambung: 56, label: 40},
};

// Pasangan teks yang lolos Lantai A7 (kontras WCAG, dihitung 25 Nov 2026):
//   tinta di latar 13,4 · tinta di kertas 13,2 · tekan (#1F4FCC) di latar 5,9 · putih di cetakBiru 11,0 · putih di arang 17,8
//   TIDAK lolos untuk teks: Biru Gini #2D6BFF di latar 3,8 (hanya bentuk/aliran) · redup di latar 3,9 · Biru Gini di cetakBiru 2,4
export const TEKS = {kunci: 'tinta', sambung: 'tinta', aksenTerang: 'tekan', diGelap: 'putih'};

export const ZONA = {  // zona aman 1080x1920 (plan §2.3; cek_komposisi TEPI memakai 6,25–93,75 % x, 9,3–86,6 % y)
  atas: 250, bawah: 400, samping: 68,
};

export const JARAK = {s: 16, m: 32, l: 64};
export const RADIUS = {pelat: 20, polaroid: 6};
export const BAYANGAN = {cutout: '0 24px 40px rgba(27,35,48,.28)', kertas: '0 10px 22px rgba(27,35,48,.30)'};

// Parameter gerak per gaya. Kurva SELALU dari $MG/remotion/curves.ts (CURVE.*), durasi dari dur(); tidak ada Easing.* di sini.
export const GAYA = {
  'A-kolase': {
    kanvas: 'latar',              // Kabut datar + tekstur jaring halus (opacity .06, tinta). Tanpa radial gradient / vignette (S-V21, S-V18)
    cutout: {duotone: ['tinta', 'putih'], skalaMasuk: 0.88, drift: 4, lebar: [0.35, 0.55]},   // kartu 95 T1
    orbit: {garis: 'tinta', dash: '10 8', tebal: 3, gambarFrame: 16},
    piksel: {warna: 'primer', kedip: [4, 6]},                                                   // kartu 95 T2 (Kursor.tsx)
    ketik: {perHurufFrame: 1},                                                                  // teks diketik per huruf: editing.mp4 4,6–5,7 dtk
  },
  'B-arsip': {
    permukaan: ['kertas', 'cetakBiru', 'arang'],   // 2–3 per video, ganti antar-babak
    stabilo: {warna: 'stabilo', blend: 'multiply', frame: 10},   // $MG/remotion/ae-primitives/teks/HighlighterSweep.tsx
    spidol: {warna: 'spidolMerah', frame: 14},
    polaroid: {pegas: {damping: 14, stiffness: 180}, rotasi: [-4, 3]},
    dorongKamera: {skalaAkhir: 1.07},
  },
} as const;
