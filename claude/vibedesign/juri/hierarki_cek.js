// Juri hierarki: urutan baca ditulis di slide sebagai data-baca="1|2|3…" pada elemen (atau wadahnya).
// Bobot tiap urutan = Σ (ukuran huruf² × jumlah karakter × rasio kontras) dari semua teks di dalamnya.
// GAGAL bila bobot urutan ke-n > bobot urutan ke-(n−1) × TOLERANSI (elemen yang dibaca belakangan lebih menonjol).
// PERINGATAN bila > 3 level ukuran teks konten, atau slide tanpa anotasi data-baca.
// Pola cerita: <section data-baca-pola="cerita"> = urutan dibangun posisi (setup di atas, punchline di bawah),
// bukan bobot. Di pola ini GAGAL bila urutan ke-n tidak berada di bawah urutan ke-(n−1), atau bila urutan
// terakhir (punchline) bukan yang paling menonjol.
// Pakai: node juri/hierarki_cek.js --proyek projects/<p>
const { E, openProject, texts, backgrounds, contrast, report } = require("./lib");
const TOLERANSI = 1.1;

// kelompokkan ukuran huruf: ukuran yang selisihnya ≤ 15 % dianggap satu level
function levels(sizes) {
  const s = [...new Set(sizes.map((x) => Math.round(x)))].sort((a, b) => b - a);
  const lv = [];
  for (const x of s) if (!lv.length || x < lv[lv.length - 1] * 0.85) lv.push(x);
  return lv;
}

(async () => {
  const a = E.args();
  const { b, page, nums, errors } = await openProject(a.proyek);
  const out = { slide: {}, errorsHalaman: errors };
  let ok = true;
  for (const n of nums) {
    const T = await texts(page, n);
    const items = T.items.filter((t) => !t.dekor);
    const bgs = await backgrounds(page, n, items);
    const pola = await page.evaluate((n) => document.getElementById("slide-" + n).dataset.bacaPola || "bobot", n);
    const bobot = {};
    items.forEach((t, i) => {
      if (!t.baca) return;
      const c = contrast(t, bgs[i]);
      const k = c ? c.median : 4.5; // teks gradien: anggap kontras sedang
      const chars = t.text.replace(/\s/g, "").length;
      (bobot[t.baca] = bobot[t.baca] || { teks: [], nilai: 0 });
      bobot[t.baca].nilai += t.fontSize ** 2 * chars * k;
      const cy = t.rects.reduce((s, r) => s + (r.y0 + r.y1) / 2, 0) / t.rects.length;
      bobot[t.baca].y = Math.max(bobot[t.baca].y || 0, cy);
      bobot[t.baca].teks.push(t.text);
    });
    const urut = Object.keys(bobot).map(Number).sort((x, y) => x - y);
    const gagal = [], peringatan = [];
    if (!urut.length) peringatan.push("slide belum punya anotasi data-baca");
    if (pola === "cerita") {
      for (let i = 1; i < urut.length; i++)
        if (bobot[urut[i]].y <= bobot[urut[i - 1]].y) gagal.push(`pola cerita: urutan ${urut[i]} tidak berada di bawah urutan ${urut[i - 1]}`);
      const last = bobot[urut[urut.length - 1]];
      if (urut.length > 1 && urut.some((k) => bobot[k].nilai > last.nilai * TOLERANSI))
        gagal.push(`pola cerita: punchline (urutan ${urut[urut.length - 1]}) bukan elemen paling menonjol`);
    }
    for (let i = 1; i < urut.length && pola !== "cerita"; i++) {
      const p = bobot[urut[i - 1]], q = bobot[urut[i]];
      if (q.nilai > p.nilai * TOLERANSI)
        gagal.push(`urutan ${urut[i]} ("${q.teks.join(" ").slice(0, 40)}") lebih menonjol ${(q.nilai / p.nilai).toFixed(2)}× dari urutan ${urut[i - 1]} ("${p.teks.join(" ").slice(0, 40)}")`);
    }
    const lv = levels(items.map((t) => t.fontSize));
    if (lv.length > 3) peringatan.push(`${lv.length} level ukuran teks (${lv.join(", ")} px); disarankan ≤ 3`);
    if (gagal.length) ok = false;
    out.slide[n] = { pola, bobot: Object.fromEntries(urut.map((k) => [k, { nilai: Math.round(bobot[k].nilai), teks: bobot[k].teks }])), level: lv, gagal, peringatan };
    console.log(`slide ${n}: ${gagal.length ? "GAGAL" : "lulus"} · pola ${pola} · urutan ${urut.join("→") || "-"} · level ukuran ${lv.length}`);
    for (const x of gagal) console.log("   gagal       " + x);
    for (const x of peringatan) console.log("   peringatan  " + x);
  }
  await b.close();
  report(a.proyek, "hierarki_cek", out, ok);
})();
