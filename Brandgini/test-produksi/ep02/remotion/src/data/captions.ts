import words from './words.json';
import type {Kata} from '../bersama/Kit';

// Koreksi salah dengar ASR ke ejaan naskah (waktu kata tetap dari Whisper; "megang setir" dibagi dua).
const FIX: Record<string, string[]> = {
  'supirnya': ['Sopirnya'], 'enggak.': ['nggak.'], 'supir': ['Sopir'], 'lho.': ['loh.'], 'menggangstir': ['megang', 'setir'],
  'nembak': ['nebak'], 'remen': ['rem'], 'dadak': ['mendadak'], 'kejadian.': ['kejadian.'],
};
const kata: Kata[] = [];
for (const w of words as {w: string; s: number; e: number}[]) {
  const key = w.w.toLowerCase();
  const rep = FIX[key] ?? [w.w];
  rep.forEach((r, i) => kata.push({w: r, s: w.s + ((w.e - w.s) * i) / rep.length, e: w.s + ((w.e - w.s) * (i + 1)) / rep.length}));
}
// Gabung "rem" + "mendadak" jadi urutan naskah; buang duplikat kosong.
export const KATA = kata;

// Potong jadi frasa <= 2 baris (±34 huruf), putus di tanda baca atau saat melebihi batas.
const MAKS = 30;
const chunks: {s: number; e: number; kata: Kata[]}[] = [];
let cur: Kata[] = [];
const flush = () => { if (cur.length) { chunks.push({s: cur[0].s, e: cur[cur.length - 1].e + 0.12, kata: cur}); cur = []; } };
for (const k of kata) {
  const len = cur.reduce((a, x) => a + x.w.length + 1, 0) + k.w.length;
  if (len > MAKS) flush();
  cur.push(k);
  if (/[.?!]$/.test(k.w) || (/,$/.test(k.w) && cur.reduce((a, x) => a + x.w.length + 1, 0) > 14)) flush();
}
flush();
for (let i = 0; i < chunks.length - 1; i++) if (chunks[i].e > chunks[i + 1].s) chunks[i].e = chunks[i + 1].s;
export const CHUNKS = chunks;
