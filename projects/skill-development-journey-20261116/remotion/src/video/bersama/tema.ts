// tema.ts · sistem desain video ini (templates/sistem-desain, D-428/D-430/D-431). Ditulis Sutradara.
// Pekerja adegan hanya memakai nama di bawah; warna UI asli aplikasi hanya di bersama/ui-asli/<aplikasi>/.
// Dicek: python3 claude/motion-graphic/scripts/juri/tema_cek.py <folder src/video>

export const MEREK = {
  merek: '#E4550F',    // oranye glow (BRAND siirfan aksen)
  primer: '#E4550F',   // aksen utama: tombol kirim, indikator kerja, titik fokus
  sekunder: '#2E5BFF', // biru, aksen kedua
  latar: '#080608',    // satu warna latar adegan UI gelap (D-431/D-435: diukur dari g1/g4)
};

// Netral pembawa frame (hitam → putih). Panel/latar chat dari g2, kolom input g3.
export const NETRAL = {
  hitam: '#080608',
  panel: '#141114',
  input: '#1E1C1D',
  garis: '#2E2B2E',
  redup: '#8E8A8E',
  teks: '#ECEAEC',
  putih: '#FFFFFF',
  hangat: '#FAF8EC',   // putih hangat KT di footage
};

export const TURUNAN = {
  primer: {coral: '#F97066', coralLembut: '#FFB5AE', glow: '#FF8A4C'},
  sekunder: {terang: '#6F8DFF'},
};

export const PENGECUALIAN = {
  hijauSelesai: {warna: '#1A7F37', adegan: 'b1, D', alasan: 'centang/status selesai mengikuti warna sukses GitHub (UI asli)'},
  hijauProfesional: {warna: '#34C759', adegan: 'IG profesional', alasan: 'arahan Irfan D-451'},
};

export const HURUF = {
  keluarga: {ui: 'VSF', hero: 'VPoppins', anton: 'VAnton', mono: 'VMono'},
  ukuran: {hero: 150, judul: 96, narasi: 84, ui: 30, uiKecil: 22, label: 18},  // px pada 1080p, satu peran = satu ukuran
};

export const JARAK = {s: 12, m: 24, l: 48};
export const RADIUS = {bubble: 22, kartu: 18, input: 26};
export const BAYANGAN = {jendela: '0 40px 90px rgba(0,0,0,.55)'};

// ---- ekspor lama (dipakai adegan yang belum dipindah ke token; dihapus setelah refactor D-428) ----
export const HERO = '#FAF8EC';
export const INK = '#1F2328';
export const MUTED = '#59636E';
export const CORAL = '#F97066';
export const HIJAU = '#1A7F37';
export const BIRU = '#2E5BFF';
export const KUNING = '#FFD54A';
export const KERTAS = '#F6F5F0';
export const FONT = {anton: 'VAnton', poppins: 'VPoppins', inter: 'VInter', mono: 'VMono', tangan: 'VKalam', sf: 'VSF'} as const;
export const BAYANG_TEKS = '0 2px 22px rgba(0,0,0,.42), 0 1px 3px rgba(0,0,0,.38)';
export const BAYANG_KARTU = '0 30px 60px rgba(15,25,65,.24), 0 8px 14px rgba(15,25,65,.12)';
export const FPS = 30;
// Wajah tetap dalam lingkaran dunia (B1, B3): diameter DESAIN ±380 px, pusat x 1650 y 850.
export const LINGKAR = {cx: 1650, cy: 850, d: 380, fx: 950, fy: 430, s: 0.62};
