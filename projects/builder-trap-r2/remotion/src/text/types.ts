// Tipe blok teks (BRIEF §Sistem teks). Murni data: tidak mengimpor remotion/React supaya bisa dicek di node
// (scripts/cekkata.mjs). Koordinat x,y = dunia (px) di lapisan tempat blok dirender.
import { seq, WORDS } from '../engine/words';

/** Satu token tampil. i = indeks kata di words_final.json yang diwakilinya (boleh >1 untuk kepala K3 yang diulang). */
export type Tok = { i: number[]; t: string; accent?: boolean };
export type Code = 'N' | 'K3' | 'K4' | 'J' | 'H' | 'UI';
/** light = teks gelap di latar terang; dark = teks terang di latar gelap (babak 3) */
export type Tone = 'light' | 'dark';

type Base = {
  id: string;
  beat: string;
  x: number;
  y: number;
  /** frame absolut blok keluar */
  until: number;
  /** 'rise' = naik + blur 5 f (default); 'cut' = hilang bersama cut */
  exit?: 'rise' | 'cut';
  tone?: Tone;
  /** catatan untuk pengecek: alasan bila tahan < frasa + 0,25 dtk */
  note?: string;
};
export type NBlock = Base & { code: 'N'; size: number; lines: Tok[][]; weight?: number; align?: 'left' | 'center' };
export type K3Block = Base & {
  code: 'K3'; size: number; head: Tok[]; keys: Tok[][]; tail?: Tok[];
  /** kotak kertas di belakang teks (Lantai A9: hanya bila kontras gagal) */
  label?: boolean;
};
export type K4Block = Base & {
  code: 'K4'; big: Tok[]; small: Tok[]; bigSize: number; ratio?: number; order: 'small-big' | 'big-small';
  bigAccent?: boolean;
};
export type JBlock = Base & { code: 'J'; size: number; toks: Tok[]; font?: 'playfair' | 'sf' };
export type HBlock = Base & {
  code: 'H'; size: number; toks: Tok[]; ink?: string; rot?: number;
  /** panah SVG relatif ke pojok kiri atas label (px), digambar setelah tulisan */
  arrow?: { d: string; box: [number, number, number, number] };
};
/** Teks yang tampil di UI asli (diketik). Dirender oleh adegannya; di sini hanya untuk pengecek kata. */
export type UIBlock = Base & { code: 'UI'; toks: Tok[]; at?: number[] };
export type TextBlock = NBlock | K3Block | K4Block | JBlock | HBlock | UIBlock;

/**
 * Token dari ucapan. `phrase` dicari berurutan di words_final.json mulai `afterT` detik.
 * `display` (opsional) = teks tampil per kata (mis. huruf kecil sesuai PLAN); jumlahnya harus sama.
 */
export function T(phrase: string, afterT = 0, display?: string, accent = false): Tok[] {
  const idx = seq(phrase, afterT);
  const shown = display ? display.split(/\s+/) : idx.map((i) => WORDS[i].w);
  if (shown.length !== idx.length) throw new Error(`T: jumlah kata tampil (${display}) != ucapan (${phrase})`);
  return idx.map((i, k) => ({ i: [i], t: shown[k], accent }));
}

/** Gabungkan token dari beberapa ucapan yang sama menjadi satu token tampil (kepala K3 yang diulang). */
export function merge(...lists: Tok[][]): Tok[] {
  return lists[0].map((tok, k) => ({ ...tok, i: lists.flatMap((l) => l[k].i) }));
}

/** Satu token gabungan dari beberapa kata (mis. "20" + "-an." -> "20-an"). */
export function joinTok(toks: Tok[], t: string, accent = false): Tok {
  return { i: toks.flatMap((x) => x.i), t, accent };
}

export const allToks = (b: TextBlock): Tok[] => {
  switch (b.code) {
    case 'N': return b.lines.flat();
    case 'K3': return [...b.head, ...b.keys.flat(), ...(b.tail ?? [])];
    case 'K4': return [...b.small, ...b.big];
    default: return b.toks;
  }
};
