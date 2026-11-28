import puppeteer from "/home/irfan/.npm/_npx/4b4c857f6efdfb61/node_modules/puppeteer/lib/puppeteer/puppeteer.js";
import crypto from "crypto";
const files = process.argv.slice(2);
const h = b => crypto.createHash('sha256').update(b).digest('hex').slice(0,10);
async function session(file, times) {
  const browser = await puppeteer.launch({ headless: "new", executablePath: "/home/irfan/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome", args: ['--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist','--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file:///tmp/bmtest/' + file + '?clean=1', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForFunction('window.OPENER && window.OPENER.ready', { timeout: 60000 });
  const { W, H, D } = await page.evaluate(() => ({ W: OPENER.W || 1920, H: OPENER.H || 1080, D: OPENER.DURATION }));
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  const out = [];
  for (const t of times) {
    await page.evaluate(async (time) => {
      if (OPENER.seekFrame) await OPENER.seekFrame(time); else OPENER.seek(time);
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    }, t);
    const buf = await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H } });
    out.push([t, h(buf)]);
  }
  await browser.close();
  return { out, errs, W, H, D };
}
(async () => {
  for (const f of files) {
    console.log('=== ' + f);
    try {
      const a = await session(f, [1.5, 3.2, 6.1, 3.2, 1.5]);   // urutan maju-mundur
      console.log('sesi A (maju lalu mundur):', JSON.stringify(a.out), 'dur', a.D, 'size', a.W + 'x' + a.H, a.errs.length ? 'ERR ' + a.errs[0] : '');
      const b = await session(f, [3.2, 1.5]);                  // muat ulang
      console.log('sesi B (muat ulang):      ', JSON.stringify(b.out));
      const sameOrder = a.out[1][1] === a.out[3][1] && a.out[0][1] === a.out[4][1];
      const sameLoad = a.out[1][1] === b.out[0][1] && a.out[0][1] === b.out[1][1];
      console.log('urutan-independen:', sameOrder, '| lintas-muat:', sameLoad);
    } catch (e) { console.log('GAGAL', e.message.slice(0, 200)); }
  }
})();
