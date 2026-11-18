// tema.ts · resep §2 guideline v6 (pengikat satu film). Satu warna = satu peran.
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const TOTAL = 2006;

export const C = {
  putih: '#FAF8EC',      // teks di footage/latar gelap
  hitam: '#0F0F10',      // teks di latar terang
  merah: '#C40004',      // hanya kata negatif
  biru: '#2563EB',       // hanya "hai!" penutup (permukaan terang)
  biruMuda: '#7FA8FF',
  cyan: '#38BDF8',       // glow desktop MG, aksen Blue Void
  void: '#05060A',       // latar Blue Void / desktop gelap
  voidBiru: '#071526',
  oranye: '#E4550F',     // titik kecil di UI saja
  krem: '#ECE8E0',       // dunia kardus
  kanvas: '#FAFAF7',     // penutup
  grid: '#E6E6E1',
  studio: '#E9E8E4',     // White Studio
  igBiru: '#0095F6',
  igAbu: '#EFEFEF',
};

export const F = {
  anton: 'VAnton',
  poppins: 'VPoppins',
  inter: 'VInter',
  mono: 'VMono',
} as const;

export const UK = {
  r1: 64,          // narasi ≥ 56 px
  r2: 118,         // kata kunci 110–200
  hero: 300,       // hero 220–420
};

// glow putih tipis: σ 6 px, opacity .35 (latar gelap saja) + bayangan keterbacaan di footage
export const GLOW = '0 0 12px rgba(250,248,236,.35), 0 2px 10px rgba(0,0,0,.45)';
export const GLOW_SETENGAH = '0 0 12px rgba(250,248,236,.17), 0 2px 10px rgba(0,0,0,.35)';
export const BAYANG_TERANG = '0 4px 10px rgba(15,15,16,.20)';
