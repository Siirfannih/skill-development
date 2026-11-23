// Preview satu slide (1×, 1080×1350) tanpa menyentuh <proyek>/index.html — aman dijalankan paralel.
// Pakai: node engine/scripts/preview_slide.js --proyek projects/<p> --slide 3 [--out /tmp/qc/slide-3.png]
const fs = require("fs");
const path = require("path");
const { args, build, browser, openPage } = require("./lib");

(async () => {
  const a = args();
  const n = +(a.slide || a._[0]);
  if (!n) { console.error("pakai: --slide <nomor>"); process.exit(2); }
  const tag = path.basename(a.proyek);
  const out = path.resolve(a.out || `/tmp/qc/${tag}-slide-${n}.png`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const file = build(a.proyek, [n], `/tmp/vd-${tag}-slide-${n}.html`);
  const b = await browser();
  const { page, errors } = await openPage(b, file, 1);
  await page.locator(`#slide-${n}`).screenshot({ path: out });
  await b.close();
  console.log(out, errors.length ? "\n" + errors.join("\n") : "· tanpa error");
})();
