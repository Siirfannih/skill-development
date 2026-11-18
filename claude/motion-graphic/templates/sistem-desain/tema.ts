// tema.ts · sistem desain video proyek ini. Ditulis Sutradara; pekerja adegan hanya memakai nama di bawah.
// Dicek: python3 claude/motion-graphic/scripts/juri/tema_cek.py <folder src remotion>

// Warna yang dikontrol: dari BRAND.md merek.
export const MEREK = {
  merek: '#2E5BFF',    // warna merek / logo
  primer: '#2E5BFF',   // aksen utama video (satu keluarga dominan)
  sekunder: '#F97066', // aksen kedua
  latar: '#FFFFFF',    // latar utama
};

// Netral pembawa frame: teks, garis, latar redup.
export const NETRAL = {
  tinta: '#0A0A0A',
  redup: '#59636E',
  garis: '#D0D7DE',
  kertas: '#F6F5F0',
};

// Turunan dikelompokkan per induknya (kunci = nama warna di MEREK); hue harus dekat induknya.
export const TURUNAN = {
  primer: {terang: '#6F8DFF', glow: '#8FA6FF'},
  sekunder: {lembut: '#FFB5AE'},
};

// Warna yang sengaja keluar dari keluarga untuk satu adegan: wajib adegan + alasan.
export const PENGECUALIAN = {
  // neonParodi: {warna: '#35F2FF', adegan: 'b2', alasan: 'parodi AI slop'},
};

export const HURUF = {
  keluarga: {judul: 'Outfit', isi: 'Inter'},
  ukuran: {hero: 160, judul: 96, narasi: 64, label: 32},   // px pada 1080p, satu peran = satu ukuran
};

export const JARAK = {s: 16, m: 32, l: 64};
export const RADIUS = {kartu: 24, tombol: 12};
export const BAYANGAN = {kartu: '0 30px 60px rgba(15,25,65,.24)'};

// Warna UI asli aplikasi (ChatGPT, Claude, GitHub, Instagram) tidak dicatat di sini: ia mengikuti UI aslinya
// dan hanya boleh ditulis di dalam komponen bersama/ui-asli/<aplikasi>/.
