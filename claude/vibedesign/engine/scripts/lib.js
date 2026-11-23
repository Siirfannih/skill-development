// Pustaka bersama engine + juri: argumen, rakit index.html, buka browser, tunggu halaman siap.
const fs = require("fs");
const path = require("path");

const ENGINE = path.resolve(__dirname, "..");

function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      out[k] = v;
    } else out._.push(a);
  }
  if (!out.proyek) {
    console.error("pakai: --proyek <path ke folder proyek>  (folder berisi slides/slide-0N.html)");
    process.exit(2);
  }
  out.proyek = path.resolve(out.proyek);
  if (!fs.existsSync(path.join(out.proyek, "slides"))) {
    console.error(`folder slides/ tidak ditemukan di ${out.proyek}`);
    process.exit(2);
  }
  return out;
}

// Nomor slide yang ada di <proyek>/slides (slide-01.html, slide-02.html, ...)
function slideNums(proyek) {
  return fs.readdirSync(path.join(proyek, "slides"))
    .map((f) => /^slide-(\d+)\.html$/.exec(f))
    .filter(Boolean)
    .map((m) => +m[1])
    .sort((a, b) => a - b);
}

// Rakit satu halaman HTML. Path aset relatif bila outFile ada di folder proyek (portabel),
// absolut file:// bila outFile di tempat lain (preview paralel di /tmp).
function build(proyek, nums, outFile) {
  const outDir = path.dirname(path.resolve(outFile));
  const ref = (abs) => (outDir === proyek ? path.relative(outDir, abs).split(path.sep).join("/") : "file://" + abs);
  const parts = nums.map((n) => fs.readFileSync(path.join(proyek, "slides", `slide-${String(n).padStart(2, "0")}.html`), "utf8"));
  const theme = path.join(proyek, "assets", "theme.css");
  const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>${path.basename(proyek)}</title>
<link rel="stylesheet" href="${ref(path.join(ENGINE, "core", "frame.css"))}">
<link rel="stylesheet" href="${ref(path.join(ENGINE, "core", "components.css"))}">
${fs.existsSync(theme) ? `<link rel="stylesheet" href="${ref(theme)}">` : ""}
</head>
<body>
${parts.join("\n\n")}
<script src="${ref(path.join(ENGINE, "cast", "cast.js"))}"></script>
<script src="${ref(path.join(ENGINE, "core", "ui.js"))}"></script>
</body>
</html>
`;
  fs.writeFileSync(outFile, html);
  return outFile;
}

async function browser() {
  const { chromium } = require("playwright");
  const opt = { headless: true };
  const local = process.env.CHROME_PATH;
  if (local && fs.existsSync(local)) opt.executablePath = local;
  try {
    return await chromium.launch(opt);
  } catch (e) {
    // Chromium Playwright belum terpasang: pakai Chrome sistem
    for (const p of ["/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]) {
      if (fs.existsSync(p)) return chromium.launch({ headless: true, executablePath: p });
    }
    throw e;
  }
}

// Buka file, tunggu font + gambar + penempelan kursor (body[data-ready]) selesai.
async function openPage(b, file, scale = 1) {
  const page = await b.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: scale });
  const errors = [];
  page.on("requestfailed", (r) => errors.push("FAILED " + r.url()));
  page.on("pageerror", (e) => errors.push("JS " + e.message));
  await page.goto("file://" + path.resolve(file), { waitUntil: "load" });
  await page.waitForSelector('body[data-ready="1"]', { timeout: 20000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
  });
  return { page, errors };
}

module.exports = { ENGINE, args, slideNums, build, browser, openPage };
