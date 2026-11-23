// Skema data episode. Semua waktu dalam detik global (posisi di timeline video).
export type KB = { s0?: number; s1?: number; x0?: number; y0?: number; x1?: number; y1?: number; kurva?: 'heavy' | 'drift' | 'land' };

// Titik kamera spatial anchor (D-24): titik fokus (fx, fy; 0-1 di aset asli) didaratkan di titik layar (ax, ay; 0-1)
// pada skala s (1 = pas menutup layar), pindah ke titik berikutnya dengan pegas ketat lalu drift pelan.
export type Titik = { t: number; fx: number; fy: number; s: number; ax?: number; ay?: number; drift?: number };

export type Lapisan =
  | { k: 'jangkar'; src: string; iw: number; ih: number; jalur: Titik[]; video?: boolean; mulaiSumber?: number; laju?: number; grade?: string; luntur?: number; padam?: number }
  | { k: 'kanvas'; warna: 'terang' | 'gelap' } // kanvas napas #F5F5F7 / #0A0A0A (D-25)
  | { k: 'scrim'; sisi: 'kiri' | 'kanan' | 'atas' | 'bawah' | 'rata'; kuat?: number } // redam tipis di sisi teks (D-26)
  | { k: 'artikel'; gaya?: 'artikel' | 'wiki'; situs: string; judul: string; meta?: string; paragraf: string[]; sorot?: { p: number; teks: string; t: number }[]; jalur?: Titik[] }
  | { k: 'chat'; judul: string; gaya?: 'irc' | 'app'; pesan: { siapa: string; teks: string; t: number }[]; jalur?: Titik[] }
  | { k: 'iklan'; judul: string; baris: string[]; harga?: string; t: number }
  | { k: 'video'; src: string; mulaiSumber?: number; kb?: KB; grade?: string; pos?: string; laju?: number }
  | { k: 'gambar'; src: string; kb?: KB; grade?: string; pos?: string }
  | { k: 'potong'; src: string; kb?: KB; pos?: string } // PNG ber-alpha (cutout) di atas teks belakang-kepala
  | { k: 'inset'; src: string; video?: boolean; mulaiSumber?: number; x: number; y: number; w: number; h: number; grade?: string; rot?: number; pos?: string; masuk?: 'kanan' | 'bawah' | 'tumbuh'; kb?: KB; zoom?: number; laju?: number }
  | { k: 'kartu'; warna: 'malam' | 'kertas' }
  | { k: 'irisan'; src: string; video?: boolean; mulaiSumber?: number; clip: string; grade?: string; geser?: number }
  | { k: 'belah'; kiri: Lapisan[]; kanan: Lapisan[] }
  | { k: 'tracking' }; // garis tracking pita untuk efek rewind

export type Adegan = {
  id: string;
  dari: number;
  sampai: number;
  lapisan: Lapisan[];
  invert?: [number, number]; // rentang detik global: kilat negatif (pintu ke masa lalu)
  masuk?: 'potong' | 'whip' | 'grid' | 'putih'; // tata potong (D-27): whip-pan, grid-reveal, kilat putih; bawaan potong keras
  arah?: 'kiri' | 'kanan';
  kt_belakang?: boolean; // KT dirender di antara lapisan dasar dan lapisan 'potong'
};

export type Kata = { w: string; t: number; baris?: number; redup?: boolean };

export type KT = {
  dari: number;
  sampai: number;
  peran: 'r1' | 'lead' | 'r2' | 'r6' | 'giant' | 'kotak' | 'napas';
  x: number;
  y: number;
  jangkar?: 'kiri' | 'tengah' | 'kanan';
  warna?: 'putih' | 'tinta' | 'aksen' | 'redup' | 'redupTinta';
  kata?: Kata[]; // r1/lead: muncul per kata di detiknya sendiri, ditumpuk per baris
  teks?: string; // r2/r6/kotak: muncul utuh
  aksen?: string; // potongan teks yang diberi warna aksen
  angka?: { dari: number; ke: number; durasi: number; format?: 'jam' | 'detik' | 'usd' }; // giant: digit berputar; format jam = HH:00 (mod 24)
  ukuran?: number;
  belakang?: boolean; // di belakang lapisan 'potong'
  bayang?: boolean; // bayangan lembut untuk di atas foto terang
  layar?: boolean; // cahaya layar monitor: teks seolah terpantul dari layar (glow, blend screen)
  tipis?: boolean; // napas berbobot tipis (kalimat hening)
};

export type Sub = { dari: number; sampai: number; teks: string };

export type Cue = { t: number; file: string; gain?: number; sampai?: number; laju?: number; pilar?: string; peran?: string; mulaiFile?: number };

export type Musik = { file: string; dari: number; sampai: number; mulaiFile?: number; gain: number; fadeIn?: number; fadeOut?: number };

export type Episode = {
  id: string;
  durasi: number;
  vo: string;
  adegan: Adegan[];
  kt: KT[];
  sub: Sub[];
  sfx: Cue[];
  musik: Musik[];
  ucapan: [number, number][]; // rentang bicara, untuk ducking musik
  sunyi?: [number, number][]; // rentang tanpa musik (ruang hening, D-30 ep02)
};
