// Juri teks: (1) teks terpotong tepi kanvas atau wadah overflow, (2) tabrakan pita tinta teks↔teks,
// (3) ukuran huruf < 24 px pada kanvas 1080. Elemen [data-dekor] (chrome UI, teks blur, thumbnail) dikecualikan;
// elemen [data-bleed] (kata raksasa yang sengaja terpotong tepi) boleh keluar tepi kanvas.
// Pakai: node juri/teks_cek.js --proyek projects/<p>     keluar 0 = lulus, 1 = gagal
const { E, openProject, texts, report } = require("./lib");
const MIN_PX = 24;

const inter = (a, b) => Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) * Math.max(0, Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0));
const area = (r) => (r.x1 - r.x0) * (r.y1 - r.y0);

(async () => {
  const a = E.args();
  const { b, page, nums, errors } = await openProject(a.proyek);
  const out = { slide: {}, errorsHalaman: errors };
  let ok = true;
  for (const n of nums) {
    const T = await texts(page, n);
    const F = await texts(page, n, { flat: true });
    const flat = new Map(F.items.map((t) => [t.id, t]));
    const f = { terpotong: [], tabrakan: [], kecil: [] };
    const items = T.items.filter((t) => !t.dekor);
    for (const t of items) {
      for (const r of t.rects) {
        if (!t.bleed && (r.x0 < -0.5 || r.y0 < -0.5 || r.x1 > T.w + 0.5 || r.y1 > T.h + 0.5)) {
          f.terpotong.push({ el: t.el, teks: t.text, sebab: "melewati tepi kanvas" }); break;
        }
        if (t.clip && (r.x0 < t.clip.x0 - 1 || r.x1 > t.clip.x1 + 1 || r.y0 < t.clip.y0 - 1 || r.y1 > t.clip.y1 + 1)) {
          f.terpotong.push({ el: t.el, teks: t.text, sebab: `terpotong wadah ${t.clip.el}` }); break;
        }
      }
      if (t.fontSize < MIN_PX) f.kecil.push({ el: t.el, teks: t.text, px: +t.fontSize.toFixed(1) });
    }
    const overlap = (A, B) => {
      let best = 0, small = 1;
      for (const r1 of A) for (const r2 of B) {
        const x = inter(r1, r2);
        if (x > best) { best = x; small = Math.min(area(r1), area(r2)); }
      }
      return { best, small, hit: best > 60 && best / small > 0.08 };
    };
    for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
      const { best, small, hit } = overlap(items[i].rects, items[j].rects);
      const fi = flat.get(items[i].id), fj = flat.get(items[j].id);
      // tabrakan dihitung hanya bila terjadi di render asli DAN di versi tanpa transform
      if (hit && fi && fj && overlap(fi.rects, fj.rects).hit)
        f.tabrakan.push({ a: items[i].text, b: items[j].text, luasPx: Math.round(best), persen: Math.round((100 * best) / small) });
    }
    const gagal = f.terpotong.length + f.tabrakan.length + f.kecil.length > 0;
    if (gagal) ok = false;
    out.slide[n] = f;
    console.log(`slide ${n}: ${gagal ? "GAGAL" : "lulus"} · terpotong ${f.terpotong.length} · tabrakan ${f.tabrakan.length} · < ${MIN_PX}px ${f.kecil.length}`);
    for (const x of f.terpotong) console.log(`   terpotong  "${x.teks}" (${x.sebab})`);
    for (const x of f.tabrakan) console.log(`   tabrakan   "${x.a}" ↔ "${x.b}" (${x.persen}% dari kotak terkecil)`);
    for (const x of f.kecil) console.log(`   kecil      "${x.teks}" ${x.px}px`);
  }
  await b.close();
  report(a.proyek, "teks_cek", out, ok);
})();
