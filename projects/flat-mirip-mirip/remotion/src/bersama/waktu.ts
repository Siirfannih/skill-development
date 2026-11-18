import {TEKS} from './tema';

export type Kata = {t: string; mulai: number; selesai: number};
export type KataBerindeks = Kata & {indeks: number};

export const frameDariDetik = (detik: number, fps: number) => Math.ceil(detik * fps - 1e-7);

export const periksaKata = (kata: readonly Kata[]) => {
  kata.forEach((item, indeks) => {
    if (!item.t.trim() || /\s/.test(item.t.trim())) {
      throw new Error(`Kata ${indeks}: t harus satu kata; tanda baca tetap melekat.`);
    }
    if (!Number.isFinite(item.mulai) || !Number.isFinite(item.selesai) || item.mulai < 0 || item.selesai < item.mulai) {
      throw new Error(`Kata ${indeks}: waktu detik tidak valid.`);
    }
    if (indeks > 0 && item.mulai < kata[indeks - 1].mulai) {
      throw new Error(`Kata ${indeks}: urutkan berdasarkan mulai.`);
    }
  });
};

export const kelompokPadaFrame = (kata: readonly Kata[], frame: number, fps: number): KataBerindeks[] => {
  periksaKata(kata);
  for (let awal = Math.floor((kata.length - 1) / TEKS.maksKata) * TEKS.maksKata; awal >= 0; awal -= TEKS.maksKata) {
    if (frame < frameDariDetik(kata[awal].mulai, fps)) continue;
    const kelompok = kata.slice(awal, awal + TEKS.maksKata);
    // Tahan kelompok saat jeda; kelompok berikutnya menggantikannya pada onset pertama.
    if (awal + TEKS.maksKata >= kata.length && frame >= frameDariDetik(Math.max(...kelompok.map((item) => item.selesai)), fps)) return [];
    return kelompok.map((item, indeks) => ({...item, t: item.t.trim(), indeks: awal + indeks}));
  }
  return [];
};
