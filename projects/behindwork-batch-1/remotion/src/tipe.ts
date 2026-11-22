// Skema data episode. Semua waktu dalam detik global (posisi di timeline video).
export type KB = { s0?: number; s1?: number; x0?: number; y0?: number; x1?: number; y1?: number; kurva?: 'heavy' | 'drift' | 'land' };

export type Lapisan =
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
  kt_belakang?: boolean; // KT dirender di antara lapisan dasar dan lapisan 'potong'
};

export type Kata = { w: string; t: number; baris?: number; redup?: boolean };

export type KT = {
  dari: number;
  sampai: number;
  peran: 'r1' | 'lead' | 'r2' | 'r6' | 'giant' | 'kotak';
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
};
