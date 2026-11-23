// Pustaka juri: buka proyek lewat engine, kumpulkan teks dari DOM, sampel latar, hitung kontras WCAG.
// Semua ukuran dalam px CSS pada kanvas 1080 (deviceScaleFactor 1).
const fs = require("fs");
const path = require("path");
const E = require("../engine/scripts/lib");

async function openProject(proyek) {
  const nums = E.slideNums(proyek);
  const tag = path.basename(proyek);
  const file = E.build(proyek, nums, `/tmp/vd-juri-${tag}.html`);
  const b = await E.browser();
  const { page, errors } = await E.openPage(b, file, 1);
  return { b, page, nums, errors };
}

// Teks per elemen (node teks langsung), dengan kotak tinta per baris relatif terhadap slide.
// flat = true: hitung ulang dengan semua transform dimatikan, untuk membedakan tabrakan nyata
// dari kotak membengkak akibat rotasi (getClientRects memberi kotak sejajar sumbu).
async function texts(page, n, opt = {}) {
  let h = null;
  if (opt.flat) h = await page.addStyleTag({ content: `#slide-${n} *{transform:none!important;rotate:none!important}` });
  const res = await collect(page, n);
  if (h) await h.evaluate((e) => e.remove());
  res.items = mergeLayers(res.items);
  return res;
}

// Satu kata yang digambar berlapis (mis. isian + outline di dua elemen) dihitung sebagai satu teks:
// teks sama dan kotaknya ≥ 90 % bertumpuk. Lapisan yang warnanya terukur (tidak transparan) dipertahankan.
function mergeLayers(items) {
  const box = (t) => t.rects.reduce((b, r) => ({ x0: Math.min(b.x0, r.x0), y0: Math.min(b.y0, r.y0), x1: Math.max(b.x1, r.x1), y1: Math.max(b.y1, r.y1) }),
    { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity });
  const solid = (t) => { const c = parseColor(t.color); return c && c.a * t.opacity >= 0.02; };
  const out = [];
  for (const t of items) {
    const b = box(t);
    const twin = out.find((o) => {
      if (o.text !== t.text) return false;
      const a = box(o);
      const x = Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) * Math.max(0, Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0));
      return x >= 0.9 * Math.min((a.x1 - a.x0) * (a.y1 - a.y0), (b.x1 - b.x0) * (b.y1 - b.y0));
    });
    if (!twin) { out.push({ ...t, lapis: 1 }); continue; }
    twin.lapis++;
    if (!solid(twin) && solid(t)) Object.assign(twin, { ...t, id: twin.id, lapis: twin.lapis });
  }
  return out;
}

async function collect(page, n) {
  return page.evaluate((n) => {
    const sl = document.getElementById("slide-" + n);
    const sr = sl.getBoundingClientRect();
    const cv = document.createElement("canvas").getContext("2d");
    const byEl = new Map();
    const w = document.createTreeWalker(sl, NodeFilter.SHOW_TEXT);
    const label = (el) => {
      const parts = [];
      for (let e = el; e && e !== sl && parts.length < 3; e = e.parentElement) {
        let s = e.tagName.toLowerCase();
        if (e.id) s += "#" + e.id;
        const c = (e.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean).slice(0, 2);
        if (c.length) s += "." + c.join(".");
        parts.unshift(s);
      }
      return parts.join(" > ");
    };
    while (w.nextNode()) {
      const t = w.currentNode;
      const str = t.nodeValue.replace(/\s+/g, " ").trim();
      if (!str) continue;
      let el = t.parentElement;
      if (!el || el.closest("script,style,title,defs")) continue;
      const svgText = el.closest("text");
      if (svgText) el = svgText;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      let op = 1, blur = false, clip = null;
      for (let a = el; a && a !== sl; a = a.parentElement) {
        const s = getComputedStyle(a);
        op *= parseFloat(s.opacity);
        if (/blur\(/.test(s.filter)) blur = true;
        if (!clip && a !== el && (s.overflow !== "visible" || s.overflowX !== "visible")) {
          const r = a.getBoundingClientRect();
          clip = { x0: r.left - sr.left, y0: r.top - sr.top, x1: r.right - sr.left, y1: r.bottom - sr.top, el: label(a) };
        }
      }
      if (op < 0.02) continue;
      const fsz = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      cv.font = `${cs.fontStyle} ${weight} ${fsz}px ${cs.fontFamily}`;
      const m = cv.measureText(str);
      const rects = [];
      if (svgText) {
        const r = el.getBoundingClientRect();
        rects.push({ x0: r.left - sr.left, y0: r.top - sr.top, x1: r.right - sr.left, y1: r.bottom - sr.top });
      } else {
        const rg = document.createRange();
        rg.selectNodeContents(t);
        for (const r of rg.getClientRects()) {
          if (r.width < 1 || r.height < 1) continue;
          // pita tinta: dari kotak konten (ascent+descent font) ke tinggi huruf sebenarnya
          const asc = m.fontBoundingBoxAscent || fsz * 0.9, desc = m.fontBoundingBoxDescent || fsz * 0.25;
          const k = r.height / (asc + desc || r.height);
          const base = r.top + asc * k;
          const top = base - Math.min(m.actualBoundingBoxAscent || fsz * 0.72, asc) * k;
          const bot = base + Math.min(m.actualBoundingBoxDescent || 0, desc) * k;
          rects.push({ x0: r.left - sr.left, y0: top - sr.top, x1: r.right - sr.left, y1: Math.max(bot, top + 2) - sr.top });
        }
      }
      if (!rects.length) continue;
      const key = el;
      const color = svgText ? cs.fill : cs.color;
      const clipText = (cs.webkitBackgroundClip || cs.backgroundClip) === "text";
      const prev = byEl.get(key);
      if (prev) { prev.text += " " + str; prev.rects.push(...rects); continue; }
      byEl.set(key, {
        el: label(el), text: str, fontSize: fsz, weight, color, opacity: op, blur, clip, clipText,
        dekor: !!el.closest("[data-dekor]"),
        bleed: !!el.closest("[data-bleed]"),
        baca: (el.closest("[data-baca]") || {}).dataset ? +el.closest("[data-baca]").dataset.baca : null,
        rects,
      });
    }
    return { w: sr.width, h: sr.height, items: [...byEl.values()].map((o, i) => ({ id: i, ...o, text: o.text.slice(0, 60) })) };
  }, n);
}

// Potret slide dengan semua teks dibuat transparan, lalu ambil median warna latar di bawah tiap kotak teks.
async function backgrounds(page, n, items) {
  const css = `#slide-${n} *{color:transparent!important;-webkit-text-stroke-color:transparent!important;text-shadow:none!important;caret-color:transparent!important}
#slide-${n} text,#slide-${n} tspan,#slide-${n} textPath{fill:transparent!important;stroke:transparent!important}`;
  const h = await page.addStyleTag({ content: css });
  const png = (await page.locator(`#slide-${n}`).screenshot()).toString("base64");
  await h.evaluate((e) => e.remove());
  return page.evaluate(async ({ png, items }) => {
    const img = new Image();
    img.src = "data:image/png;base64," + png;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    const lum = (r, gg, b) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b);
    };
    return items.map((it) => {
      const px = [];
      for (const r of it.rects) {
        const x0 = Math.max(0, Math.floor(r.x0)), x1 = Math.min(c.width - 1, Math.ceil(r.x1));
        const y0 = Math.max(0, Math.floor(r.y0)), y1 = Math.min(c.height - 1, Math.ceil(r.y1));
        const step = Math.max(1, Math.floor(Math.sqrt(((x1 - x0) * (y1 - y0)) / 4000)));
        for (let y = y0; y <= y1; y += step) for (let x = x0; x <= x1; x += step) {
          const i = (y * c.width + x) * 4;
          px.push([d[i], d[i + 1], d[i + 2]]);
        }
      }
      if (!px.length) return null;
      px.sort((a, b) => lum(...a) - lum(...b));
      const q = (p) => px[Math.min(px.length - 1, Math.floor(p * px.length))];
      return { median: q(0.5), p10: q(0.1), p90: q(0.9) };
    });
  }, { png, items });
}

function parseColor(s) {
  const m = /rgba?\(([^)]+)\)/.exec(s || "");
  if (!m) return null;
  const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
  return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 };
}
function lum([r, g, b]) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
// Kontras teks vs latar median; alpha teks × opasitas leluhur dikomposit ke latar.
function contrast(it, bg) {
  const c = parseColor(it.color);
  if (!c || !bg) return null;
  const a = c.a * it.opacity;
  if (a < 0.02) return null; // teks transparan (mis. background-clip:text) — tidak bisa diukur dari warna
  const mix = (base) => [0, 1, 2].map((k) => Math.round([c.r, c.g, c.b][k] * a + base[k] * (1 - a)));
  const med = ratio(mix(bg.median), bg.median);
  const worst = Math.min(ratio(mix(bg.p10), bg.p10), ratio(mix(bg.p90), bg.p90));
  return { median: +med.toFixed(2), terburuk: +worst.toFixed(2) };
}
const isLarge = (it) => it.fontSize >= 24 || (it.fontSize >= 18.5 && it.weight >= 700);
const threshold = (it) => (isLarge(it) ? 3 : 4.5);

function report(proyek, name, data, ok) {
  const dir = path.join(proyek, "qc");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify({ juri: name, lulus: ok, ...data }, null, 2));
  console.log(`${ok ? "LULUS" : "GAGAL"} · ${name} · laporan: ${path.relative(process.cwd(), path.join(dir, name + ".json"))}`);
  process.exitCode = ok ? 0 : 1;
}

module.exports = { E, openProject, texts, backgrounds, contrast, threshold, isLarge, report };
