// acak.ts — angka acak berbiji (deterministik per frame). Math.random dilarang di komponen Remotion:
// render paralel memanggil frame acak di tab berbeda, jadi hasil harus sama untuk biji yang sama.

/** mulberry32: generator 32-bit kecil. Panggil sekali per biji, lalu ambil angka berurutan. */
export const acakBerbiji = (biji: number) => {
  let a = biji >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Satu angka 0..1 dari (biji, indeks) tanpa menyimpan state: aman dipanggil per sel grid per frame. */
export const acakIndeks = (biji: number, i: number) => acakBerbiji(biji * 7919 + i * 104729 + 1)();

/** Id elemen yang aman dipakai di url(#id) CSS/SVG (useId React berisi titik dua). */
export const idAman = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "");
