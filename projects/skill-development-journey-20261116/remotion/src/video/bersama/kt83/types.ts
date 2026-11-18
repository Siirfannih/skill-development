export type Kata = {teks: string; masuk: number; akhir: number};
export type Kepala = {cx: number; atas: number; lebar: number; tinggi: number; z: number;
  rig?: {x0: number; y0: number; x1: number; y1: number}};
export type Blok = {
  id: string;
  bentuk: 'K1' | 'K2' | 'K4' | 'pil';
  kata: Kata[];
  sisi?: 'kiri' | 'kanan';
  bawahDecision?: boolean;
  bawahBusur?: boolean;
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
