// Export final: rakit <proyek>/index.html, lalu potret tiap <section id="slide-N"> ke <proyek>/output/slide-0N.png
// dengan deviceScaleFactor 2 (1080×1350 -> 2160×2700).
// Pakai: node engine/scripts/export_slides.js --proyek projects/<p> [--scale 2]
const fs = require("fs");
const path = require("path");
const { args, slideNums, build, browser, openPage } = require("./lib");

(async () => {
  const a = args();
  const nums = slideNums(a.proyek);
  const outDir = path.join(a.proyek, "output");
  fs.mkdirSync(outDir, { recursive: true });
  const file = build(a.proyek, nums, path.join(a.proyek, "index.html"));
  const b = await browser();
  const { page, errors } = await openPage(b, file, +(a.scale || 2));
  const fonts = await page.evaluate(() => ({
    jakarta: document.fonts.check('800 40px "Plus Jakarta Sans"'),
    serif: document.fonts.check('italic 40px "Instrument Serif"'),
    fredoka: document.fonts.check('700 40px "Fredoka"'),
    mono: document.fonts.check('500 40px "JetBrains Mono"'),
    gambarRusak: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src")),
  }));
  console.log("font/gambar:", JSON.stringify(fonts));
  for (const n of nums) {
    const out = path.join(outDir, `slide-${String(n).padStart(2, "0")}.png`);
    await page.locator(`#slide-${n}`).screenshot({ path: out });
    console.log("tersimpan", path.relative(process.cwd(), out));
  }
  if (errors.length) console.log("PERINGATAN\n" + errors.join("\n"));
  await b.close();
})();
