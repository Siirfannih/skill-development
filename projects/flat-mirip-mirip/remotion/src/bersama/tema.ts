// tema.ts · sistem desain video flat-mirip-mirip. Ditulis Sutradara; pekerja adegan hanya memakai nama di bawah.
// Dicek: python3 claude/motion-graphic/scripts/juri/tema_cek.py projects/flat-mirip-mirip/remotion/src
// Sumber: RESEP.md (kiblat kartu 86 + brief Irfan: kanvas putih, merah sebagai aksen). Brief menang atas profil
// Behindwork (hitam hangat + amber) untuk video ini; lihat DECISIONS.md.

// Warna yang dikontrol.
export const MEREK = {
  merek: '#D6202B',    // merah brief: kata penekanan (P03 "sudah mengubah", P12 "orangnya", P15 "Seleramu")
  primer: '#D6202B',   // satu-satunya aksen video
  sekunder: '#111111', // tinta: teks kata per kata di kanvas
  latar: '#FFFFFF',    // kanvas putih polos, tanpa vignette/radial
};

// Netral pembawa frame.
export const NETRAL = {
  tinta: '#111111',    // teks di kanvas putih (kontras 18,9:1)
  redup: '#6B6B6B',    // kata yang memudar (P10, P12 "videonya")
  garis: '#E4E4E4',
  kertas: '#F4F4F2',   // bidang terang di belakang UI bila perlu pemisah dari kanvas
  putih: '#FFFFFF',    // teks di atas footage gelap
};

// Turunan per induk.
export const TURUNAN = {
  primer: {gelap: '#A8141E', terang: '#E8505A'},
};

// Warna yang sengaja keluar dari keluarga: wajib adegan + alasan.
export const PENGECUALIAN = {
  invertSian: {warna: '#29DFD4', adegan: 'P03', alasan: 'hasil invert merah #D6202B saat "industri kreatif" (efek negatif dari brief)'},
  invertHitam: {warna: '#000000', adegan: 'P03', alasan: 'hasil invert kanvas putih'},
  slopKrem: {warna: '#EFE6DA', adegan: 'P01, P05, P06, P09, P10, P12', alasan: 'isi kartu "AI slop" yang dikritik (latar krem), bukan palet video'},
  slopPeach: {warna: '#E3A48C', adegan: 'P01, P05, P06, P09, P10, P12', alasan: 'matahari/lingkaran pastel kartu slop'},
  slopGunung: {warna: '#BFB2AA', adegan: 'P01, P05, P06, P09, P10, P12', alasan: 'gunung/bidang pastel kartu slop'},
  slopMawar: {warna: '#C9A0B0', adegan: 'P01, P05, P06, P09, P10, P12', alasan: 'variasi pastel kartu slop'},
  slopSiluet: {warna: '#3E3836', adegan: 'P01, P05, P06, P09, P10, P12', alasan: 'siluet orang kartu slop'},
};

// Huruf. Helvetica Neue lokal berlisensi (~/fonts-lokal/helvetica-neue, jangan di-commit) = grotesk kiblat 86.
export const HURUF = {
  keluarga: {judul: 'Helvetica Neue', isi: 'Helvetica Neue'},
  bobot: {narasi: 500, tekan: 700, raksasa: 700},
  // px pada 1080p; satu peran = satu ukuran. narasi: kapital ±5 % H seperti kiblat (k1/k2), kata sambung ≥ 56 px (Lantai A7).
  // tekan: penekanan ala kiblat k3 (±2,3× x-height narasi). raksasa: hanya P03/P12/P15; lebar dihitung fit (P03 = 75 % lebar frame).
  ukuran: {narasi: 76, tekan: 172, raksasa: 300, label: 32},
};

// Tata letak teks kata per kata (kiblat 86 k1/k2/k4).
export const TEKS = {
  garisY: 0.5,              // pusat garis teks (proporsi tinggi frame)
  celahKanvas: 0.044,       // jarak antarkata di kanvas terang (proporsi lebar)
  celahFootage: 0.07,       // jarak antarkata di atas footage
  goyangY: 0.012,           // offset vertikal acak per kata, ± proporsi tinggi
  maksKata: 3,              // kata per tampil (Lantai A4)
};

export const JARAK = {s: 16, m: 32, l: 64, aman: 96}; // aman = margin 5 % dari tepi 1920
export const RADIUS = {kartu: 18, ubin: 12, tombol: 10};
export const BAYANGAN = {kartu: '0 24px 48px rgba(0,0,0,.14)', ubin: '0 10px 24px rgba(0,0,0,.10)'};

// Warna UI asli (Claude, Instagram, Premiere Pro, Remotion Studio) tidak dicatat di sini:
// mengikuti UI aslinya dan hanya ditulis di bersama/ui-asli/<aplikasi>/ (Lantai D20, D-01).
