// Juri kontras: rasio kontras WCAG tiap teks terhadap latar yang benar-benar dirender di bawahnya
// (slide dipotret ulang dengan teks transparan, lalu diambil median warna latar di pita tinta).
// Ambang: 4,5:1 teks normal; 3:1 teks besar (≥ 24 px, atau ≥ 18,5 px dengan berat ≥ 700). [data-dekor] dikecualikan.
// Pakai: node juri/kontras_cek.js --proyek projects/<p>
const { E, openProject, texts, backgrounds, contrast, threshold, report } = require("./lib");

(async () => {
  const a = E.args();
  const { b, page, nums, errors } = await openProject(a.proyek);
  const out = { slide: {}, errorsHalaman: errors };
  let ok = true;
  for (const n of nums) {
    const T = await texts(page, n);
    const items = T.items.filter((t) => !t.dekor);
    const bgs = await backgrounds(page, n, items);
    const gagal = [], tidakTerukur = [];
    items.forEach((t, i) => {
      const c = contrast(t, bgs[i]);
      if (!c) { tidakTerukur.push({ teks: t.text, sebab: t.clipText ? "teks gradien (background-clip:text)" : "warna tidak terbaca" }); return; }
      if (c.median < threshold(t)) gagal.push({ el: t.el, teks: t.text, rasio: c.median, ambang: threshold(t), px: t.fontSize, latar: bgs[i].median });
    });
    if (gagal.length) ok = false;
    out.slide[n] = { diperiksa: items.length, gagal, tidakTerukur };
    console.log(`slide ${n}: ${gagal.length ? "GAGAL" : "lulus"} · diperiksa ${items.length} · gagal ${gagal.length}${tidakTerukur.length ? ` · tidak terukur ${tidakTerukur.length}` : ""}`);
    for (const x of gagal) console.log(`   ${x.rasio}:1 < ${x.ambang}:1  "${x.teks}" (${x.px}px, latar rgb(${x.latar}))`);
  }
  await b.close();
  report(a.proyek, "kontras_cek", out, ok);
})();
