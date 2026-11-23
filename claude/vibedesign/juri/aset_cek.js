// Juri aset: setiap karakter [data-cast], gambar (<img>, url() di CSS) dan keluarga font yang dipakai
// harus tercatat di <proyek>/assets/manifest.json beserta sumber dan izinnya.
// Tujuannya kebijakan IP: tidak ada maskot/logo/aset pihak lain yang masuk tanpa tercatat.
// Pakai: node juri/aset_cek.js --proyek projects/<p>
const fs = require("fs");
const path = require("path");
const { E, openProject, report } = require("./lib");

(async () => {
  const a = E.args();
  const mf = path.join(a.proyek, "assets", "manifest.json");
  if (!fs.existsSync(mf)) { console.log("GAGAL · assets/manifest.json tidak ada"); process.exit(1); }
  const M = JSON.parse(fs.readFileSync(mf, "utf8"));
  const known = {
    karakter: new Set((M.karakter || []).map((x) => x.id)),
    gambar: new Set((M.gambar || []).map((x) => x.path)),
    font: new Set((M.font || []).map((x) => x.keluarga)),
  };
  const kurangIzin = [...(M.karakter || []), ...(M.gambar || []), ...(M.font || [])].filter((x) => !x.sumber || !x.izin).map((x) => x.id || x.path || x.keluarga);
  const { b, page, nums, errors } = await openProject(a.proyek);
  const found = await page.evaluate(() => {
    const cast = [...document.querySelectorAll("[data-cast]")].map((e) => ({ id: e.dataset.cast, slide: e.closest(".slide").id }));
    const imgs = [...document.querySelectorAll(".slide img")].map((e) => ({ path: e.getAttribute("src"), slide: e.closest(".slide").id }));
    const bg = [];
    document.querySelectorAll(".slide, .slide *").forEach((e) => {
      for (const pseudo of [null, "::before", "::after"]) {
        const v = getComputedStyle(e, pseudo).backgroundImage;
        for (const m of v.matchAll(/url\("?([^")]+)"?\)/g)) if (!m[1].startsWith("data:")) bg.push({ path: m[1], slide: (e.closest(".slide") || e).id });
      }
    });
    const fonts = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, ""));
    return { cast, imgs: [...imgs, ...bg], fonts: [...new Set(fonts)] };
  });
  await b.close();
  const base = (p) => p.replace(/^file:\/\//, "").split("/").slice(-2).join("/");
  const tak = [];
  for (const c of found.cast) if (!known.karakter.has(c.id)) tak.push(`karakter "${c.id}" (${c.slide})`);
  for (const g of found.imgs) if (![...known.gambar].some((k) => base(g.path).endsWith(base(k)))) tak.push(`gambar ${g.path} (${g.slide})`);
  for (const f of found.fonts) if (!known.font.has(f)) tak.push(`font "${f}"`);
  const ok = !tak.length && !kurangIzin.length;
  console.log(`karakter ${found.cast.length} · gambar ${found.imgs.length} · font ${found.fonts.length}`);
  for (const x of tak) console.log("   tidak tercatat  " + x);
  for (const x of kurangIzin) console.log("   tanpa sumber/izin  " + x);
  report(a.proyek, "aset_cek", { ditemukan: { karakter: [...new Set(found.cast.map((c) => c.id))], gambar: found.imgs, font: found.fonts }, tidakTercatat: tak, tanpaIzin: kurangIzin, errorsHalaman: errors }, ok);
})();
