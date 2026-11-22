// Token Behindwork Batch 1 (D-02 Story Cinematic, kiblat kartu 39; nilai merek dari BRAND.md).
// Satu sumber untuk semua episode. Komponen tidak boleh memakai warna atau ukuran di luar file ini.
export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const warna = {
  kertas: '#FFFFFF',
  tinta: '#111111',
  aksen: '#D6202B', // hanya di latar terang atau sebagai kotak sorot (kartu 48 T1)
  malam: '#000000',
  putih: '#FFFFFF',
  redup: 'rgba(255,255,255,0.42)',
  redupTinta: 'rgba(17,17,17,0.38)',
  pitaSub: 'rgba(0,0,0,0.58)',
};

export const huruf = "'BW Helvetica', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// Peran teks (typography.md §8a). KT = kata kunci Inggris dari ucapan; subtitle Indonesia terpisah (D-21).
export const ukuran = {
  r1: 96, // narasi tebal, tumpuk per kata (kartu 92 T1); KT selalu arah pandang utama, tidak pernah sekecil subtitle (D-22)
  lead: 80, // kata pengantar yang menempel ke hero; tetap jauh di atas ukuran subtitle (D-22)
  r2: 124, // kata kunci
  r6: 210, // hero
  giant: 520, // tahun raksasa (kartu 92 T2)
  sub: 38, // subtitle Indonesia statis
};

// Zona aman 16:9: KT tidak boleh masuk 8 % bawah (y > 935), pita subtitle tinggal di sana.
export const aman = { x0: 165, x1: 1755, y0: 140, y1: 935 };

export const grade: Record<string, string> = {
  nat: 'saturate(0.86) contrast(1.04)',
  bw: 'grayscale(1) contrast(1.08) brightness(0.9)',
  bwwarm: 'grayscale(1) sepia(0.16) contrast(1.06) brightness(0.92)',
  blur: 'saturate(0.86) brightness(0.62) blur(3px)',
  gelap: 'saturate(0.8) brightness(0.5)',
  blurkuat: 'saturate(0.7) brightness(0.45) blur(12px)',
  none: 'none',
};
