import puppeteer from "/home/irfan/.npm/_npx/4b4c857f6efdfb61/node_modules/puppeteer/lib/puppeteer/puppeteer.js";
import crypto from "crypto"; import fs from "fs";
const h = b => crypto.createHash('sha256').update(b).digest('hex').slice(0,10);
async function session(file, times, tag, dump) {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: "/home/irfan/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file:///tmp/bmtest/' + file + '?clean=1', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForFunction('window.OPENER && window.OPENER.ready', { timeout: 60000 });
  const { W, H } = await page.evaluate(() => ({ W: OPENER.W || 1920, H: OPENER.H || 1080 }));
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  const out = {};
  for (const t of times) {
    await page.evaluate(async (time) => { if (OPENER.seekFrame) await OPENER.seekFrame(time); else OPENER.seek(time);
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }, t);
    const buf = await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H } });
    out[t] = h(buf);
    if (dump && dump.includes(t)) fs.writeFileSync(`/tmp/bmtest/${tag}_${t}.png`, buf);
  }
  await browser.close(); return out;
}
const f = process.argv[2];
const mono = []; for (let t = 0; t <= 8; t += 0.5) mono.push(t);
const A1 = await session(f, mono, 'm1', [3, 6]);
const A2 = await session(f, mono, 'm2', [3, 6]);
const diffMono = mono.filter(t => A1[t] !== A2[t]);
console.log(f, '| urutan SAMA di dua muat ulang: beda di t =', JSON.stringify(diffMono), `(${diffMono.length}/${mono.length})`);
const R = await session(f, [6, 3, 7.5, 1], 'r', [3, 6]);  // akses acak
const diffRand = [6, 3, 1].filter(t => R[t] !== A1[t]);
console.log(f, '| akses acak vs monoton: beda di t =', JSON.stringify(diffRand));
