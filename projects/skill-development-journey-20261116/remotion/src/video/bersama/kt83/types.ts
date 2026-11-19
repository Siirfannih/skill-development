export type Kata = {teks: string; masuk: number; akhir: number; bobot?: 700 | 800; ukuran?: number; tag?: boolean};
export type Kepala = {cx: number; atas: number; lebar: number; tinggi: number; z: number;
  rig?: {x0: number; y0: number; x1: number; y1: number}};
export type Blok = {
  id: string;
  bentuk: 'K1' | 'K2' | 'K4' | 'pil' | 'label' | 'slab';
  kata: Kata[];
  sisi?: 'kiri' | 'kanan';
  bawahDecision?: boolean;
  bawahBusur?: boolean;
  tampilMulai?: number;
  posisi?: {x: number; y: number}[];
  label?: {x: number; y: number; w: number; h: number; keluar: number};
  narasi?: {x: number; y: number; ukuran: number; baris: number[]};
  slab?: {teks: string; x: number; y: number; w: number; fokus: [number, number][]};
  tata?: {ukuran: number; sisi?: 'kiri' | 'kanan'; baris?: number; kepalaY?: number;
    dx?: number; dy?: number; jarak?: number; radius?: number; paddingX?: number};
};
export type KT83Props = {
  w: number;
  h: number;
  frames: number;
  kepala: Kepala[];
  blok: Blok[];
};
