#!/usr/bin/env node
/**
 * cek-warna.mjs: dua GERBANG WARNA wajib dalam satu CLI ringan (Node). Satu sumber kebenaran; Python hanya pembungkus.
 *
 *   node cek-warna.mjs masuk  <video | folder | png...> [--out palet.json] [--k 5] [--maks 24]
 *                             [--ke-spec spec.json] [--ke-tema tema.ts] [--mode-tema terang|gelap] [--json]
 *   node cek-warna.mjs keluar <frame.png | folder> --palet palet.json [--html frame.html | --tanpa-teks noteks.png]
 *                             [--abaikan x,y,w,h]... [--mode terang|gelap] [--ambang-liar 0.5] [--de 12] [--json] [--ketat]
 *
 * Pustaka: sharp (piksel), node-vibrant (pembanding palet), culori (ΔE2000, OKLCH, WCAG), apca-w3 (APCA Lc),
 * axe-core lewat playwright-core (SUPLEMEN untuk bingkai HTML, bukan hakim tunggal).
 *
 * GERBANG MASUK (palet nyata, bukan tebakan): still diambil dari video (ffmpeg, merata) atau folder/png; tiap still dikecilkan,
 * k-means (k-means++, 8 pusat), pusat sedekat ΔE2000 < 6 digabung; still dikelompokkan terang/gelap (median luma < 110 = gelap);
 * klaster antar-still digabung lagi. Peran per jenis frame: latar = luas terbesar; tinta = klaster layak (>= 0,2 %, teks tipis) dengan kontras
 * tertinggi terhadap latar; aksen[] = OKLCH chroma >= 0,07 dan lightness >= 0,3 dan luas >= 1 % (maks 2, paling jenuh dulu); netral[] = sisanya,
 * netral[0] = permukaan. node-vibrant dijalankan sebagai pembanding (selisih ΔE tiap peran ke swatch terdekat) dan menambah aksen
 * bila k-means melewatkan swatch jenuh berpopulasi >= 1 %. palet.json: {versi, k, sumber, mode:{terang|gelap:{latar, tinta, aksen[],
 * netral[], permukaan, kontras_tinta_latar, apca_tinta_latar, n_frames, sumber_frames, vibrant}}, hex_semua}.
 *   --ke-spec  menyisipkan kunci "palet" ke REF-SPEC/spec JSON (dibuat bila belum ada).
 *   --ke-tema  menulis token ke tema.ts (MEREK primer/sekunder/latar, NETRAL tinta/redup/garis/kertas); file belum ada = disalin dari
 *              toolkit/starter/src/tema.ts; nilai turunan (campuran) diberi tanda "// turunan".
 *
 * GERBANG KELUAR: frame hasil vs palet.json. Keluar 0 = PASS atau CATATAN, 1 = FAIL, 2 = masukan atau dependensi bermasalah. JSON ke stdout:
 *   Warna nyasar dan warna nanggung adalah informasi selera: status "CATATAN", keluar 0 (dengan --ketat atau KETAT=1: FAIL, keluar 1).
 *   Kontras APCA tetap diukur dan dilaporkan; kontras di bawah batas (termasuk teks tak terlihat) tetap FAIL, keluar 1.
 *   {"status":"FAIL"|"CATATAN","alasan":[{"jenis":"kontras-apca"|"warna-nyasar"|"warna-nanggung", ...}], "aviso":[...], "blok":[...]}; ringkasan manusia di stderr.
 *  (a) warna-nyasar : klaster warna berluas >= 0,5 % (dari piksel yang dinilai) yang ΔE2000-nya > 12 ke semua warna palet, tint/shade
 *      sepanjang lightness (+-25 L), dan campuran antar-warna palet (gradien). Anti-aliasing gugur oleh ambang luas. Foto/footage:
 *      --abaikan x,y,w,h (boleh berulang; luas dihitung dari piksel di luar area itu).
 *  (b) kontras-apca : tiap blok teks dipisah lewat render dua kali (dengan dan tanpa teks; selisih = topeng piksel teks).
 *      Warna teks = median piksel inti topeng di render penuh; latar = median piksel yang sama di render tanpa teks. APCA Lc (utama):
 *      >= 60 teks biasa, >= 45 teks besar (>= 48 px @1080, atau tebal >= 38 px; skala = sisi pendek/1080). Rasio WCAG 2 dilaporkan
 *      (4,5 / 3,0) sebagai aviso bila di bawah; p10 terburuk (Lc persentil ke-10 terendah per piksel latar) aviso bila di bawah.
 *      Teks yang tak berubah antar-render (tak terlihat) = FAIL (Lc 0). HTML: Playwright (ukuran = ukuran PNG), teks disembunyikan
 *      dengan color/fill transparan (kotak dan latar tetap); axe-core color-contrast dijalankan sebagai suplemen (aviso saja).
 *      Remotion: --tanpa-teks = still kedua dengan prop sembunyikanTeks (toolkit/starter Video.tsx); blok = komponen terhubung topeng,
 *      ukuran huruf = taksiran.
 *  (c) warna-nanggung : daerah berluas >= 3 % (atau warna teks/latar blok teks) yang OKLCH chroma-nya di pita keruh (0,03-0,08) pada
 *      lightness menengah (0,45-0,75) dan BUKAN warna palet (ΔE2000 > 6 ke palet maupun tint/shade-nya). Ambang dikalibrasi pada
 *      frame nyata (README.md).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import sharp from "sharp";
import { converter, differenceCiede2000, formatHex, wcagContrast, wcagLuminance } from "culori";
import { APCAcontrast, sRGBtoY } from "apca-w3";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const lab65 = converter("lab65");
const oklch = converter("oklch");
const de2000 = differenceCiede2000();
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

// ---- ambang (dikalibrasi; lihat README.md) ----
const DE_GABUNG = 6, K_DALAM = 8, GELAP_LUMA = 110, UKURAN_LAYAK = 0.2, AKSEN_MIN = 1.0, KROMA_AKSEN = 0.07, NETRAL_MIN = 0.5;
const LC_BIASA = 60, LC_BESAR = 45, WCAG_BIASA = 4.5, WCAG_BESAR = 3.0;
const KERUH = { cMin: 0.03, cMax: 0.08, lMin: 0.45, lMax: 0.75, luasMin: 3.0, deSah: 6 };

// ---------- util warna ----------
const rgbObj = (r, g, b) => ({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 });
const hexDari = (r, g, b) => formatHex(rgbObj(Math.min(255, Math.max(0, r)), Math.min(255, Math.max(0, g)), Math.min(255, Math.max(0, b))));
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const labDari = (r, g, b) => lab65(rgbObj(r, g, b));
const lum = (rgb) => wcagLuminance(rgbObj(...rgb));
const ratio = (a, b) => wcagContrast(rgbObj(...a), rgbObj(...b));
const apca = (teks, latar) => Math.abs(APCAcontrast(sRGBtoY(teks), sRGBtoY(latar)));
const okDari = (r, g, b) => { const o = oklch(rgbObj(r, g, b)); return [o.l, o.c || 0, o.h || 0]; };
const de76 = (x, y) => Math.hypot(x.l - y.l, x.a - y.a, x.b - y.b);
const campurRgb = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const bulat = (v, n = 2) => Math.round(v * 10 ** n) / 10 ** n;

function median(arr) { if (!arr.length) return 0; const s = Float64Array.from(arr).sort(); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }
function persentil(arr, p) { if (!arr.length) return 0; const s = Float64Array.from(arr).sort(); return s[Math.min(s.length - 1, Math.floor((p / 100) * (s.length - 1)))]; }
function prng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

async function muat(file, lebar) {
  let s = sharp(file, { failOn: "none" }).removeAlpha();
  if (lebar) s = s.resize({ width: lebar, withoutEnlargement: true });
  const { data, info } = await s.toColourspace("srgb").raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

// ---------- k-means ----------
function kmeans(px, k, iters = 15, seed = 0) {
  const rnd = prng(seed), n = px.length / 3, m = Math.min(n, 6000), S = new Float32Array(m * 3);
  if (n > m) for (let i = 0; i < m; i++) { const j = Math.floor(rnd() * n); S.set(px.subarray(j * 3, j * 3 + 3), i * 3); } else S.set(px);
  const c = new Float32Array(k * 3), d = new Float64Array(m).fill(Infinity);
  let j0 = Math.floor(rnd() * m); c.set(S.subarray(j0 * 3, j0 * 3 + 3), 0);
  for (let q = 1; q < k; q++) {
    let tot = 0;
    for (let i = 0; i < m; i++) { const dx = S[i * 3] - c[(q - 1) * 3], dy = S[i * 3 + 1] - c[(q - 1) * 3 + 1], dz = S[i * 3 + 2] - c[(q - 1) * 3 + 2]; d[i] = Math.min(d[i], dx * dx + dy * dy + dz * dz); tot += d[i]; }
    let r = rnd() * tot, pick = m - 1; for (let i = 0; i < m; i++) { r -= d[i]; if (r <= 0) { pick = i; break; } }
    c.set(S.subarray(pick * 3, pick * 3 + 3), q * 3);
  }
  const lab = new Int32Array(m);
  for (let it = 0; it < iters; it++) {
    const sum = new Float64Array(k * 3), cnt = new Int32Array(k);
    for (let i = 0; i < m; i++) {
      let best = 0, bd = Infinity;
      for (let q = 0; q < k; q++) { const dx = S[i * 3] - c[q * 3], dy = S[i * 3 + 1] - c[q * 3 + 1], dz = S[i * 3 + 2] - c[q * 3 + 2]; const dd = dx * dx + dy * dy + dz * dz; if (dd < bd) { bd = dd; best = q; } }
      lab[i] = best; sum[best * 3] += S[i * 3]; sum[best * 3 + 1] += S[i * 3 + 1]; sum[best * 3 + 2] += S[i * 3 + 2]; cnt[best]++;
    }
    for (let q = 0; q < k; q++) if (cnt[q]) for (let z = 0; z < 3; z++) c[q * 3 + z] = sum[q * 3 + z] / cnt[q];
  }
  return c;
}

/** items [{rgb:[r,g,b], luas}] -> digabung bila ΔE2000 < de (berbobot luas), urut luas turun. */
function gabung(items, de = DE_GABUNG) {
  const grup = [];
  for (const it of [...items].sort((a, b) => b.luas - a.luas)) {
    const lab = labDari(...it.rgb);
    const g = grup.find((x) => de2000(lab, x.lab) < de);
    if (g) { for (let z = 0; z < 3; z++) g.sum[z] += it.rgb[z] * it.luas; g.luas += it.luas; g.lab = labDari(...g.sum.map((v) => v / g.luas)); }
    else grup.push({ sum: it.rgb.map((v) => v * it.luas), luas: it.luas, lab });
  }
  return grup.map((g) => ({ rgb: g.sum.map((v) => v / g.luas), luas: g.luas })).sort((a, b) => b.luas - a.luas);
}

async function klasterStill(file) {
  const { data, w, h } = await muat(file, 480), n = w * h, px = new Float32Array(n * 3);
  const hist = new Int32Array(256);
  for (let i = 0; i < n * 3; i++) px[i] = data[i];
  for (let i = 0; i < n; i++) hist[Math.round(0.2126 * data[i * 3] + 0.7152 * data[i * 3 + 1] + 0.0722 * data[i * 3 + 2])]++;
  let acc = 0, med = 0; for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc >= n / 2) { med = v; break; } }
  const tetapkan = (arr, m, c, kk) => { const lab = new Int32Array(m), cnt = new Int32Array(kk);
    for (let i = 0; i < m; i++) {
      let best = 0, bd = Infinity;
      for (let q = 0; q < kk; q++) { const dx = arr[i * 3] - c[q * 3], dy = arr[i * 3 + 1] - c[q * 3 + 1], dz = arr[i * 3 + 2] - c[q * 3 + 2]; const d = dx * dx + dy * dy + dz * dz; if (d < bd) { bd = d; best = q; } }
      lab[i] = best; cnt[best]++;
    } return { lab, cnt }; };
  const c = kmeans(px, K_DALAM), { lab, cnt } = tetapkan(px, n, c, K_DALAM);
  let lat = 0; for (let q = 1; q < K_DALAM; q++) if (cnt[q] > cnt[lat]) lat = q;
  const items = [{ rgb: [c[lat * 3], c[lat * 3 + 1], c[lat * 3 + 2]], luas: cnt[lat] / n }];
  // lapis depan: piksel di luar klaster latar dikelompokkan sendiri, supaya teks tipis dan aksen kecil dapat pusat sendiri
  const nf = n - cnt[lat];
  if (nf > 200) {
    const fg = new Float32Array(nf * 3); let j = 0;
    for (let i = 0; i < n; i++) if (lab[i] !== lat) { fg[j * 3] = px[i * 3]; fg[j * 3 + 1] = px[i * 3 + 1]; fg[j * 3 + 2] = px[i * 3 + 2]; j++; }
    const cf = kmeans(fg, K_DALAM, 15, 1), { cnt: cn } = tetapkan(fg, nf, cf, K_DALAM);
    for (let q = 0; q < K_DALAM; q++) if (cn[q]) items.push({ rgb: [cf[q * 3], cf[q * 3 + 1], cf[q * 3 + 2]], luas: cn[q] / n });
  }
  return { items: gabung(items), jenis: med < GELAP_LUMA ? "gelap" : "terang" };
}

const entri = (rgb, luas) => { const r = rgb.map(Math.round); return { hex: hexDari(...r), persen: bulat(luas * 100, 1), luminansi: bulat(lum(r), 3) }; };

function perankan(items, k) {
  items = items.filter((t, i) => i === 0 || t.luas >= Math.min(NETRAL_MIN, UKURAN_LAYAK) / 100); if (!items.length) throw new Error("tidak ada klaster");
  const latar = items[0], Ll = lum(latar.rgb); let sisa = items.slice(1);
  const layak = sisa.filter((t) => t.luas * 100 >= UKURAN_LAYAK);
  const tinta = layak.length ? layak.reduce((a, b) => (ratio(b.rgb.map(Math.round), latar.rgb.map(Math.round)) > ratio(a.rgb.map(Math.round), latar.rgb.map(Math.round)) ? b : a)) : null;
  if (tinta) sisa = sisa.filter((t) => t !== tinta);
  const aksen = sisa.filter((t) => t.luas * 100 >= AKSEN_MIN && okDari(...t.rgb)[1] >= KROMA_AKSEN && okDari(...t.rgb)[0] >= 0.3).sort((a, b) => okDari(...b.rgb)[1] - okDari(...a.rgb)[1]).slice(0, 2);
  sisa = sisa.filter((t) => !aksen.includes(t));
  const nNet = sisa.some((t) => t.luas * 100 >= NETRAL_MIN) ? Math.max(1, k - 2 - aksen.length) : 0;
  const netral = sisa.filter((t) => t.luas * 100 >= NETRAL_MIN).sort((a, b) => b.luas - a.luas).slice(0, nNet);
  const r = { latar: entri(latar.rgb, latar.luas), tinta: tinta ? entri(tinta.rgb, tinta.luas) : null, aksen: aksen.map((t) => entri(t.rgb, t.luas)), netral: netral.map((t) => entri(t.rgb, t.luas)) };
  r.permukaan = r.netral[0] ?? null;
  const rl = hex2rgb(r.latar.hex);
  r.kontras_tinta_latar = r.tinta ? bulat(ratio(hex2rgb(r.tinta.hex), rl)) : null;
  r.apca_tinta_latar = r.tinta ? bulat(apca(hex2rgb(r.tinta.hex), rl), 1) : null;
  return r;
}

function ffmpegStill(video, maks, tmp) {
  const dur = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video]).toString());
  const out = [];
  for (let i = 0; i < maks; i++) {
    const t = ((i + 0.5) / maks) * dur, p = path.join(tmp, `${path.basename(video, path.extname(video))}_${String(i).padStart(3, "0")}.png`);
    try { execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", t.toFixed(2), "-i", video, "-frames:v", "1", p]); } catch { continue; }
    if (fs.existsSync(p)) out.push([p, `${path.basename(video)}@${t.toFixed(1)}s`]);
  }
  return out;
}

function kumpulStill(masukan, maks, tmp) {
  const out = [];
  for (const m of masukan) {
    if (!fs.existsSync(m)) throw new Error(`jalur tidak ada: ${m}`);
    if (fs.statSync(m).isDirectory()) {
      let fs_ = fs.readdirSync(m).filter((f) => EXT.has(path.extname(f).toLowerCase())).sort();
      if (fs_.length > maks) fs_ = [...new Set(Array.from({ length: maks }, (_, i) => Math.round((i * (fs_.length - 1)) / (maks - 1))))].map((i) => fs_[i]);
      out.push(...fs_.map((f) => [path.join(m, f), f]));
    } else if (EXT.has(path.extname(m).toLowerCase())) out.push([m, path.basename(m)]);
    else out.push(...ffmpegStill(m, maks, tmp));
  }
  return out;
}

async function vibrantPalet(file) {
  try {
    const { Vibrant } = await import("node-vibrant/node");
    const p = await Vibrant.from(file).maxColorCount(32).quality(3).getPalette();
    return Object.values(p).filter(Boolean).map((s) => ({ rgb: s.rgb, pop: s.population }));
  } catch { return []; }
}

async function buatPalet(masukan, k, maks) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cek-warna-"));
  try {
    const daftar = kumpulStill(masukan, maks, tmp);
    if (!daftar.length) throw new Error("tidak ada still");
    const per = { terang: [], gelap: [] }, fr = { terang: [], gelap: [] }, vb = { terang: [], gelap: [] };
    for (const [p, label] of daftar) {
      const { items, jenis } = await klasterStill(p);
      per[jenis].push(...items); fr[jenis].push(label);
      const v = await vibrantPalet(p); const tot = v.reduce((s, x) => s + x.pop, 0) || 1;
      vb[jenis].push(...v.filter((x) => x.pop > 0).map((x) => ({ rgb: x.rgb, luas: x.pop / tot })));
    }
    const mode = {};
    for (const j of ["terang", "gelap"]) {
      if (!fr[j].length) continue;
      const n = fr[j].length, pool = gabung(per[j].map((t) => ({ rgb: t.rgb, luas: t.luas / n })));
      const r = perankan(pool, k);
      const vpool = gabung(vb[j].map((t) => ({ rgb: t.rgb, luas: t.luas / n })));
      r.vibrant = vpool.slice(0, 6).map((t) => entri(t.rgb, t.luas));
      // aksen yang terlewat k-means tetapi dilihat Vibrant (jenuh, >= 1 %)
      if (r.aksen.length < 2) {
        const sdh = [r.latar, r.tinta, ...r.aksen, ...r.netral].filter(Boolean).map((e) => labDari(...hex2rgb(e.hex)));
        const tambah = vpool.find((t) => t.luas * 100 >= AKSEN_MIN && okDari(...t.rgb)[1] >= KROMA_AKSEN && sdh.every((l) => de2000(labDari(...t.rgb), l) > DE_GABUNG));
        if (tambah) { r.aksen.push({ ...entri(tambah.rgb, tambah.luas), dari: "vibrant" }); }
      }
      const bandingVib = (e) => (e && vpool.length ? bulat(Math.min(...vpool.map((t) => de2000(labDari(...hex2rgb(e.hex)), labDari(...t.rgb)))), 1) : null);
      r.selisih_vibrant = { latar: bandingVib(r.latar), tinta: bandingVib(r.tinta), aksen: r.aksen.map(bandingVib) };
      mode[j] = { ...r, n_frames: n, sumber_frames: fr[j] };
    }
    const semua = [];
    for (const m of Object.values(mode)) for (const e of [m.latar, m.tinta, ...m.aksen, ...m.netral]) if (e && !semua.includes(e.hex)) semua.push(e.hex);
    return { versi: 2, k, sumber: masukan.map((m) => path.resolve(m)), mode, hex_semua: semua };
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

function tokenTema(m) {
  const lat = m.latar.hex, tin = (m.tinta ?? m.latar).hex, ak = m.aksen.map((a) => a.hex), net = m.netral.map((n) => n.hex);
  const mix = (t) => hexDari(...campurRgb(hex2rgb(tin), hex2rgb(lat), t));
  return {
    primer: [ak[0] ?? "", false], sekunder: [ak[1] ?? "", false], latar: [lat, false], tinta: [tin, false],
    redup: net[0] ? [net[0], false] : [mix(0.45), true], garis: net[1] ? [net[1], false] : [mix(0.85), true], kertas: [m.permukaan?.hex ?? lat, false],
  };
}

function tulisTema(file, m) {
  if (!fs.existsSync(file)) { fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true }); fs.copyFileSync(path.join(AQUI, "..", "..", "toolkit", "starter", "src", "tema.ts"), file); }
  let teks = fs.readFileSync(file, "utf8");
  for (const [kunci, [nilai, turunan]] of Object.entries(tokenTema(m))) {
    if (!nilai) continue;
    teks = teks.replace(new RegExp(`(\\b${kunci}:\\s*)"[^"]*"(,?)([^\\n]*)`), (_, a, b, c) => `${a}"${nilai}"${b}${turunan ? "  // turunan: campuran tinta dan latar" : c}`);
  }
  fs.writeFileSync(file, teks);
}

function ringkasMasuk(p) {
  for (const [nama, m] of Object.entries(p.mode)) {
    const f = (e) => `${e.hex} ${e.persen}%`;
    console.error(`[${nama}] ${m.n_frames} still  latar ${f(m.latar)}  tinta ${m.tinta ? f(m.tinta) : "-"} (WCAG ${m.kontras_tinta_latar}:1, APCA Lc ${m.apca_tinta_latar})  aksen ${m.aksen.map(f).join(", ") || "-"}  netral ${m.netral.map(f).join(", ") || "-"}`);
  }
}

async function masuk(a) {
  const k = parseInt(a.k ?? "5"), maks = parseInt(a.maks ?? "24");
  const p = await buatPalet(a._, k, maks);
  const out = a.out ?? "palet.json";
  fs.writeFileSync(out, JSON.stringify(p, null, 1));
  if (a["ke-tema"]) {
    const pilih = a["mode-tema"] ?? Object.keys(p.mode).sort((x, y) => p.mode[y].n_frames - p.mode[x].n_frames)[0];
    if (!p.mode[pilih]) throw new Error(`mode ${pilih} tidak ada di palet`);
    tulisTema(a["ke-tema"], p.mode[pilih]); console.error(`tema.ts <- mode ${pilih}: ${a["ke-tema"]}`);
  }
  if (a["ke-spec"]) {
    const spec = fs.existsSync(a["ke-spec"]) ? JSON.parse(fs.readFileSync(a["ke-spec"], "utf8")) : {};
    spec.palet = { mode: p.mode, hex_semua: p.hex_semua }; fs.writeFileSync(a["ke-spec"], JSON.stringify(spec, null, 1)); console.error(`palet disisipkan ke ${a["ke-spec"]}`);
  }
  ringkasMasuk(p); console.error(`-> ${out}`);
  if (a.json) console.log(JSON.stringify(p, null, 1));
  return 0;
}

// =====================================================================================================================
// GERBANG KELUAR
// =====================================================================================================================
function bacaPalet(file, mode) {
  let p = JSON.parse(fs.readFileSync(file, "utf8")); p = p.palet ?? p;
  const hexes = [];
  for (const [nama, m] of Object.entries(p.mode)) {
    if (mode && nama !== mode) continue;
    for (const e of [m.latar, m.tinta, ...m.aksen, ...m.netral]) if (e && !hexes.includes(e.hex)) hexes.push(e.hex);
  }
  if (!hexes.length) throw new Error(`palet kosong untuk mode ${mode}`);
  return hexes;
}

/** Himpunan Lab65 'sah': palet, tint/shade lightness (+-25 L), dan (opsional) campuran antar-warna palet. */
function himpunanSah(hexes, { campuran = true, rentang = 25 } = {}) {
  const rgb = hexes.map(hex2rgb), pts = [];
  for (const c of rgb) {
    const l0 = labDari(...c); pts.push(l0);
    for (let s = -rentang; s <= rentang; s += 5) pts.push({ mode: "lab65", l: Math.min(100, Math.max(0, l0.l + s)), a: l0.a, b: l0.b });
    for (const ujung of [[255, 255, 255], [0, 0, 0]]) for (let t = 0; t <= 1.0001; t += 0.1) { const m = labDari(...campurRgb(c, ujung, t)); if (Math.abs(m.l - l0.l) <= rentang) pts.push(m); }
  }
  const dasar = pts.length;
  if (campuran) for (let i = 0; i < rgb.length; i++) for (let j = i + 1; j < rgb.length; j++) for (let t = 0.1; t < 0.95; t += 0.1) pts.push(labDari(...campurRgb(rgb[i], rgb[j], t)));
  return { pts, dasar };
}

/** ΔE2000 minimum ke himpunan; saring cepat dengan ΔE76 lalu ΔE2000 ke 12 terdekat. */
function jarakMin(lab, acuan, n = acuan.length) {
  let dekat = acuan.slice(0, n).map((x) => [de76(lab, x), x]);
  dekat.sort((p, q) => p[0] - q[0]);
  if (dekat[0][0] < 1.5) return 0;
  let m = Infinity; for (const [, x] of dekat.slice(0, 12)) m = Math.min(m, de2000(lab, x));
  return m;
}

function labelKomponen(mask, w, h) {
  const lbl = new Int32Array(w * h), par = [0]; let n = 0;
  const cari = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (!mask[i]) continue;
    const l = x > 0 ? lbl[i - 1] : 0, u = y > 0 ? lbl[i - w] : 0;
    if (!l && !u) { n++; par.push(n); lbl[i] = n; }
    else if (l && u) { const a = cari(l), b = cari(u); lbl[i] = Math.min(a, b); if (a !== b) { par[Math.max(a, b)] = Math.min(a, b); } }
    else lbl[i] = l || u;
  }
  const peta = new Int32Array(par.length), idx = new Map(); let m = 0;
  for (let i = 1; i < par.length; i++) { const r = cari(i); if (!idx.has(r)) idx.set(r, ++m); peta[i] = idx.get(r); }
  for (let i = 0; i < lbl.length; i++) if (lbl[i]) lbl[i] = peta[lbl[i]];
  return { lbl, n: m };
}

function dilasi(mask, w, h, r) {
  const t = new Uint8Array(w * h), o = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) { let last = -1e9; for (let x = 0; x < w; x++) { if (mask[y * w + x]) last = x; if (x - last <= r) t[y * w + x] = 1; }
    last = 1e9; for (let x = w - 1; x >= 0; x--) { if (mask[y * w + x]) last = x; if (last - x <= r) t[y * w + x] = 1; } }
  for (let x = 0; x < w; x++) { let last = -1e9; for (let y = 0; y < h; y++) { if (t[y * w + x]) last = y; if (y - last <= r) o[y * w + x] = 1; }
    last = 1e9; for (let y = h - 1; y >= 0; y--) { if (t[y * w + x]) last = y; if (last - y <= r) o[y * w + x] = 1; } }
  return o;
}

/** (a) warna nyasar dan (c) warna nanggung (daerah). img {data,w,h}. -> {nyasar, nanggung, nValid} */
function analisaWarna(img, hexes, { de = 12, ambang = 0.5, abaikan = [] }) {
  const { data, w, h } = img, valid = new Uint8Array(w * h).fill(1);
  for (const [x, y, ww, hh] of abaikan) for (let j = Math.max(0, y); j < Math.min(h, y + hh); j++) for (let i = Math.max(0, x); i < Math.min(w, x + ww); i++) valid[j * w + i] = 0;
  const cnt = new Int32Array(32768), sum = new Float64Array(32768 * 3); let nValid = 0;
  const kode = new Int32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2], c = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    kode[i] = c; if (!valid[i]) continue;
    cnt[c]++; sum[c * 3] += r; sum[c * 3 + 1] += g; sum[c * 3 + 2] += b; nValid++;
  }
  if (!nValid) return { nyasar: [], nanggung: [], nValid: 0 };
  const dasarSah = himpunanSah(hexes, { campuran: false }), penuhSah = himpunanSah(hexes, { campuran: true });
  const bins = []; for (let c = 0; c < 32768; c++) if (cnt[c]) bins.push(c);
  const rgbBin = (c) => [sum[c * 3] / cnt[c], sum[c * 3 + 1] / cnt[c], sum[c * 3 + 2] / cnt[c]];
  const nyasarBin = new Int16Array(32768).fill(-1), kerucBin = new Uint8Array(32768);
  const liar = [];
  for (const c of bins) {
    const rgb = rgbBin(c), lab = labDari(...rgb);
    if (jarakMin(lab, penuhSah.pts) > de) liar.push([c, lab, rgb]);
    const [L, C] = okDari(...rgb);
    if (C >= KERUH.cMin && C <= KERUH.cMax && L >= KERUH.lMin && L <= KERUH.lMax && jarakMin(lab, dasarSah.pts) > KERUH.deSah) kerucBin[c] = 1;
  }
  // klaster nyasar
  liar.sort((p, q) => cnt[q[0]] - cnt[p[0]]); const kl = [];
  for (const [c, lab, rgb] of liar) {
    let k = kl.findIndex((x) => de2000(lab, x.lab) < 8);
    if (k < 0) { k = kl.length; kl.push({ lab, n: 0, sum: [0, 0, 0], x0: w, y0: h, x1: -1, y1: -1 }); }
    nyasarBin[c] = k;
  }
  const mask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (!valid[i]) continue; const c = kode[i], k = nyasarBin[c];
    if (k >= 0) { const q = kl[k], x = i % w, y = (i / w) | 0; q.n++; q.sum[0] += data[i * 3]; q.sum[1] += data[i * 3 + 1]; q.sum[2] += data[i * 3 + 2]; if (x < q.x0) q.x0 = x; if (x > q.x1) q.x1 = x; if (y < q.y0) q.y0 = y; if (y > q.y1) q.y1 = y; }
    if (kerucBin[c]) mask[i] = 1;
  }
  const nyasar = kl.filter((q) => (q.n / nValid) * 100 >= ambang).sort((p, q) => q.n - p.n)
    .map((q) => ({ jenis: "warna-nyasar", hex: hexDari(...q.sum.map((v) => v / q.n)), luas: bulat((q.n / nValid) * 100), bbox: [q.x0, q.y0, q.x1 - q.x0 + 1, q.y1 - q.y0 + 1] }));
  // daerah keruh >= luasMin %
  const { lbl, n } = labelKomponen(mask, w, h), akum = Array.from({ length: n + 1 }, () => ({ n: 0, sum: [0, 0, 0], x0: w, y0: h, x1: -1, y1: -1 }));
  for (let i = 0; i < w * h; i++) { const l = lbl[i]; if (!l) continue; const q = akum[l], x = i % w, y = (i / w) | 0; q.n++; q.sum[0] += data[i * 3]; q.sum[1] += data[i * 3 + 1]; q.sum[2] += data[i * 3 + 2]; if (x < q.x0) q.x0 = x; if (x > q.x1) q.x1 = x; if (y < q.y0) q.y0 = y; if (y > q.y1) q.y1 = y; }
  const nanggung = akum.slice(1).filter((q) => (q.n / nValid) * 100 >= KERUH.luasMin).sort((p, q) => q.n - p.n).map((q) => {
    const rgb = q.sum.map((v) => v / q.n), o = okDari(...rgb);
    return { jenis: "warna-nanggung", hex: hexDari(...rgb), luas: bulat((q.n / nValid) * 100), bbox: [q.x0, q.y0, q.x1 - q.x0 + 1, q.y1 - q.y0 + 1], oklch: [bulat(o[0], 2), bulat(o[1], 3), Math.round(o[2])] };
  });
  return { nyasar, nanggung, nValid, dasarSah };
}

function keruh(rgb, dasarSah) {
  const [L, C] = okDari(...rgb);
  return C >= KERUH.cMin && C <= KERUH.cMax && L >= KERUH.lMin && L <= KERUH.lMax && jarakMin(labDari(...rgb), dasarSah.pts) > KERUH.deSah;
}

// ---------- kontras blok ----------
function ambangBlok(ukuranPx, tebal, sisiPendek) {
  const n = (ukuranPx * 1080) / Math.max(1, sisiPendek), besar = n >= 48 || (tebal && n >= 38);
  return { besar, n, lcMin: besar ? LC_BESAR : LC_BIASA, wcagMin: besar ? WCAG_BESAR : WCAG_BIASA };
}

/** A,B = {data,w,h} render penuh / tanpa teks; region = Uint8Array w*h milik blok. */
function ukurBlok(A, B, region, id, teks, ukuranPx, tebal, dasarSah) {
  const { w, h } = A, { besar, n, lcMin, wcagMin } = ambangBlok(ukuranPx, tebal, Math.min(w, h));
  const idx = [], dif = [];
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let i = 0; i < w * h; i++) {
    if (!region[i]) continue;
    const d = Math.abs(A.data[i * 3] - B.data[i * 3]) + Math.abs(A.data[i * 3 + 1] - B.data[i * 3 + 1]) + Math.abs(A.data[i * 3 + 2] - B.data[i * 3 + 2]);
    if (d >= 3) { idx.push(i); dif.push(d); const x = i % w, y = (i / w) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  const base = { blok: id, teks, ukuran_px: bulat(ukuranPx, 1), ukuran_1080: bulat(n, 1), tebal: !!tebal, besar, lc_min: lcMin, wcag_min: wcagMin };
  if (idx.length < 6) {
    let rs = [], gs = [], bs = []; for (let i = 0; i < w * h; i++) if (region[i]) { rs.push(B.data[i * 3]); gs.push(B.data[i * 3 + 1]); bs.push(B.data[i * 3 + 2]); }
    const lat = [median(rs), median(gs), median(bs)].map(Math.round);
    return { ...base, xy: null, lc: 0, wcag: 1, lc_p10: 0, teks_hex: null, latar: hexDari(...lat), lulus: false, catatan: "teks tak terlihat (render penuh sama dengan tanpa teks)" };
  }
  const ambangInti = 0.75 * persentil(dif, 90), inti = idx.filter((_, j) => dif[j] >= ambangInti), pakai = inti.length >= 6 ? inti : idx;
  const med = (buf, ids, z) => median(ids.map((i) => buf.data[i * 3 + z]));
  const ct = [0, 1, 2].map((z) => Math.round(med(A, pakai, z))), cb = [0, 1, 2].map((z) => Math.round(med(B, pakai, z)));
  const lc = apca(ct, cb), wc = ratio(ct, cb);
  const langkah = Math.max(1, Math.floor(idx.length / 4000)), lcs = [];
  for (let j = 0; j < idx.length; j += langkah) { const i = idx[j]; lcs.push(apca(ct, [B.data[i * 3], B.data[i * 3 + 1], B.data[i * 3 + 2]])); }
  const p10 = persentil(lcs, 10);
  const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
  const r = { ...base, xy: [cx, cy], lc: bulat(lc, 1), wcag: bulat(wc), lc_p10: bulat(p10, 1), teks_hex: hexDari(...ct), latar: hexDari(...cb), lulus: lc >= lcMin };
  r.aviso = [];
  if (lc >= lcMin && p10 < lcMin) r.aviso.push("p10-di-bawah-ambang");
  if (wc < wcagMin) r.aviso.push(`wcag-${bulat(wc)}-di-bawah-${wcagMin}`);
  if (dasarSah) { if (keruh(ct, dasarSah)) { r.nanggung_teks = true; r.lulus = false; } if (keruh(cb, dasarSah)) { r.nanggung_latar = true; r.lulus = false; } }
  return r;
}

// ---------- render dua kali (HTML) ----------
const SEMBUNYI_CSS = "*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important;caret-color:transparent!important;text-decoration-color:transparent!important}svg text,svg tspan{fill:transparent!important;stroke:none!important}";
const JS_BLOK = `() => {
  const SKIP = new Set(['SCRIPT','STYLE','TITLE','HEAD','NOSCRIPT','META','LINK']);
  const cs = el => getComputedStyle(el);
  const hidden = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = cs(e); if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return true; } return false; };
  const invisibleText = el => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(cs(e).opacity);
    const f = cs(el).webkitTextFillColor || cs(el).color; const m = f.match(/rgba?\\(([^)]*)\\)/); const al = m && m[1].split(/[,\\/ ]+/).filter(Boolean)[3];
    return o < 0.15 || f === 'transparent' || (al !== undefined && parseFloat(al) < 0.15); };
  const isBlock = el => { const d = cs(el).display; return d !== 'inline' && d !== 'contents' && !d.startsWith('ruby'); };
  const blocks = new Map(), skipped = [];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) {
    if (!n.nodeValue.trim()) continue;
    const p = n.parentElement; if (!p || SKIP.has(p.tagName) || hidden(p) || invisibleText(p) || (p.closest && p.closest('[data-sengaja="pudar"]'))) continue;
    let b = p.closest('[data-lapis="teks"]'); if (!b) { b = p; while (b && !isBlock(b)) b = b.parentElement; }
    if (!b) continue;
    let kabur = false; for (let e = p; e && e.nodeType === 1; e = e.parentElement) { const f = cs(e).filter; const m = f && f.match(/blur\\(([\\d.]+)px/); if (m && parseFloat(m[1]) >= 1.5) kabur = true; }
    if (kabur) { skipped.push({teks: n.nodeValue.trim().slice(0, 30), alasan: 'kabur'}); continue; }
    const r = document.createRange(); r.selectNodeContents(n);
    const rects = [...r.getClientRects()].filter(q => q.width > 0.5 && q.height > 0.5 && q.right > 0 && q.bottom > 0 && q.left < innerWidth && q.top < innerHeight).map(q => ({x: q.left, y: q.top, w: q.width, h: q.height}));
    const tampak = rects.filter(q => { const t = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, q.x + q.w / 2)), Math.min(innerHeight - 1, Math.max(0, q.y + q.h / 2))); return t && (b.contains(t) || t.contains(b)); });
    if (!tampak.length) { if (rects.length) skipped.push({teks: n.nodeValue.trim().slice(0, 30), alasan: 'tertutup'}); continue; }
    rects.length = 0; rects.push(...tampak);
    const e = blocks.get(b) || {el: b, rects: [], text: '', size: parseFloat(cs(p).fontSize), weight: parseInt(cs(p).fontWeight) || 400};
    e.rects.push(...rects); e.text += n.nodeValue.trim() + ' '; blocks.set(b, e);
  }
  return {skipped, blok: [...blocks.values()].map((t, i) => { const el = t.el, tag = el.tagName.toLowerCase();
    return {id: el.dataset.id || el.id || (tag + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/)[0] : '') + '#' + (i + 1)),
      teks: t.text.trim().slice(0, 40), ukuran: t.size, tebal: t.weight >= 700, rects: t.rects}; })};
}`;

function cariChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const akar = [path.join(os.homedir(), ".cache", "ms-playwright"), path.join(os.homedir(), "Library", "Caches", "ms-playwright")];
  for (const a of akar) {
    if (!fs.existsSync(a)) continue;
    const dirs = fs.readdirSync(a).sort().reverse();
    for (const pre of ["chromium_headless_shell-", "chromium-"]) for (const d of dirs.filter((x) => x.startsWith(pre))) {
      const kand = [path.join(a, d, "chrome-headless-shell-linux64", "chrome-headless-shell"), path.join(a, d, "chrome-linux64", "chrome"), path.join(a, d, "chrome-linux", "chrome"),
        path.join(a, d, "chrome-mac", "Chromium.app", "Contents", "MacOS", "Chromium"), path.join(a, d, "chrome-headless-shell-mac-arm64", "chrome-headless-shell"), path.join(a, d, "chrome-mac-arm64", "Chromium.app", "Contents", "MacOS", "Chromium")];
      const ok = kand.find((x) => fs.existsSync(x)); if (ok) return ok;
    }
  }
  return undefined;
}

async function renderHtml(html, ukuran) {
  const { chromium } = await import("playwright-core");
  const br = await chromium.launch({ executablePath: cariChromium(), args: ["--no-sandbox"] });
  try {
    const pg = await br.newPage({ viewport: { width: ukuran[0], height: ukuran[1] } });
    await pg.goto("file://" + path.resolve(html)); await pg.waitForLoadState("load");
    try { await pg.evaluate("document.fonts.ready.then(() => 1)"); } catch {}
    await pg.waitForTimeout(150);
    const { blok, skipped } = await pg.evaluate(`(${JS_BLOK})()`);
    let axe = { status: "tidak-jalan" };
    try {
      await pg.addScriptTag({ path: createRequire(import.meta.url).resolve("axe-core/axe.min.js") });
      const r = await pg.evaluate(async () => { const x = await window.axe.run(document, { runOnly: ["color-contrast"] });
        return { pelanggaran: x.violations.flatMap((v) => v.nodes.map((n) => ({ sasaran: n.target.join(" "), ringkas: (n.any[0] && n.any[0].message) || "" }))), takpasti: x.incomplete.reduce((s, v) => s + v.nodes.length, 0) }; });
      axe = { status: "jalan", ...r };
    } catch (e) { axe = { status: "galat", pesan: String(e.message || e).slice(0, 120) }; }
    const clip = { x: 0, y: 0, width: ukuran[0], height: ukuran[1] };
    const A = await sharp(await pg.screenshot({ clip })).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    await pg.addStyleTag({ content: SEMBUNYI_CSS }); await pg.waitForTimeout(60);
    const B = await sharp(await pg.screenshot({ clip })).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    return { A: { data: A.data, w: A.info.width, h: A.info.height }, B: { data: B.data, w: B.info.width, h: B.info.height }, blok, skipped, axe };
  } finally { await br.close(); }
}

async function kontrasHtml(html, ukuran, dasarSah) {
  const { A, B, blok, skipped, axe } = await renderHtml(html, ukuran), { w, h } = A, out = [];
  for (const b of blok) {
    const region = new Uint8Array(w * h);
    for (const q of b.rects) for (let y = Math.max(0, Math.floor(q.y) - 1); y < Math.min(h, Math.ceil(q.y + q.h) + 1); y++) for (let x = Math.max(0, Math.floor(q.x) - 1); x < Math.min(w, Math.ceil(q.x + q.w) + 1); x++) region[y * w + x] = 1;
    out.push(ukurBlok(A, B, region, b.id, b.teks, b.ukuran, b.tebal, dasarSah));
  }
  return { blok: out, axe, dilewati: skipped };
}

async function kontrasTanpaTeks(pngA, pngB, dasarSah) {
  const A = await muat(pngA), B = await muat(pngB);
  if (A.w !== B.w || A.h !== B.h) throw new Error("ukuran still penuh dan tanpa-teks berbeda");
  const { w, h } = A, s = Math.min(w, h) / 1080, topeng = new Uint8Array(w * h); let ada = false;
  for (let i = 0; i < w * h; i++) { const d = Math.abs(A.data[i * 3] - B.data[i * 3]) + Math.abs(A.data[i * 3 + 1] - B.data[i * 3 + 1]) + Math.abs(A.data[i * 3 + 2] - B.data[i * 3 + 2]); if (d >= 3) { topeng[i] = 1; ada = true; } }
  if (!ada) return { blok: [], axe: null };
  const huruf = labelKomponen(topeng, w, h), lebar = dilasi(topeng, w, h, Math.max(4, Math.round(14 * s))), L = labelKomponen(lebar, w, h);
  const bb = Array.from({ length: L.n + 1 }, () => ({ x0: w, y0: h, region: null })), out = [];
  for (let i = 0; i < w * h; i++) { const l = L.lbl[i]; if (l && topeng[i]) { const q = bb[l], x = i % w, y = (i / w) | 0; if (x < q.x0) q.x0 = x; if (y < q.y0) q.y0 = y; } }
  const urut = []; for (let l = 1; l <= L.n; l++) if (bb[l].x0 < w) urut.push(l);
  urut.sort((p, q) => Math.floor(bb[p].y0 / Math.max(1, 40 * s)) - Math.floor(bb[q].y0 / Math.max(1, 40 * s)) || bb[p].x0 - bb[q].x0);
  let no = 0;
  for (const l of urut) {
    const region = new Uint8Array(w * h), tinggi = new Map(), minmax = new Map(); let n = 0;
    for (let i = 0; i < w * h; i++) if (L.lbl[i] === l && topeng[i]) { region[i] = 1; n++; const hl = huruf.lbl[i], y = (i / w) | 0, q = minmax.get(hl) ?? [y, y]; q[0] = Math.min(q[0], y); q[1] = Math.max(q[1], y); minmax.set(hl, q); }
    if (n < 6) continue;
    const hs = [...minmax.values()].map(([a, b]) => b - a + 1), ukuran = median(hs) / 0.72;
    no++; out.push(ukurBlok(A, B, region, `teks-${no}`, `(taksiran @${bb[l].x0},${bb[l].y0})`, ukuran, false, dasarSah));
  }
  return { blok: out, axe: null };
}

// ---------- satu frame ----------
function cariPendamping(png) {
  const d = path.dirname(png), stem = path.basename(png, path.extname(png)); let html = null;
  for (const dd of [d, path.join(d, "..", "panels"), path.join(d, "..", "src"), path.join(d, "panels"), path.join(d, "src")]) { const c = path.normalize(path.join(dd, stem + ".html")); if (fs.existsSync(c)) { html = c; break; } }
  const nt = path.join(d, stem + ".tanpa-teks.png");
  return { html, tanpaTeks: fs.existsSync(nt) ? nt : null };
}

async function periksaFrame(png, hexes, o) {
  const img = await muat(png), ukuran = [img.w, img.h];
  const warna = analisaWarna(img, hexes, o);
  let { html, tanpaTeks } = o; if (!html && !tanpaTeks && o.otomatis) ({ html, tanpaTeks } = cariPendamping(png));
  const r = { file: png, alasan: [], aviso: [], blok: [], kontras: "dilewati", axe: null };
  r.alasan.push(...warna.nyasar, ...warna.nanggung);
  try {
    let k = null;
    if (html) { k = await kontrasHtml(html, ukuran, warna.dasarSah); r.kontras = "html"; }
    else if (tanpaTeks) { k = await kontrasTanpaTeks(png, tanpaTeks, warna.dasarSah); r.kontras = "tanpa-teks"; }
    if (k) {
      r.blok = k.blok; r.axe = k.axe; r.dilewati = k.dilewati ?? [];
      for (const b of k.blok) {
        if (!b.lulus && !b.nanggung_teks && !b.nanggung_latar) r.alasan.push({ jenis: "kontras-apca", blok: b.blok, xy: b.xy, lc: b.lc, min: b.lc_min, teks: b.teks_hex, latar: b.latar, wcag: b.wcag, ukuran_1080: b.ukuran_1080, isi: b.teks, ...(b.catatan ? { catatan: b.catatan } : {}) });
        for (const [flag, peran, hex] of [[b.nanggung_teks, "teks", b.teks_hex], [b.nanggung_latar, "latar-teks", b.latar]]) {
          if (!flag) continue;
          const ada = r.alasan.find((x) => x.jenis === "warna-nanggung" && x.peran === peran && hex2rgb(x.hex).every((v, i) => Math.abs(v - hex2rgb(hex)[i]) <= 14));
          if (ada) { ada.jumlah++; ada.blok_lain.push(b.blok); }
          else r.alasan.push({ jenis: "warna-nanggung", blok: b.blok, xy: b.xy, hex, peran, jumlah: 1, blok_lain: [], oklch: okDari(...hex2rgb(hex)).map((v, i) => bulat(v, i === 2 ? 0 : 3)) });
        }
        for (const a of b.aviso ?? []) r.aviso.push({ jenis: "kontras-aviso", blok: b.blok, detail: a, lc: b.lc, lc_p10: b.lc_p10, wcag: b.wcag });
      }
      if (k.axe?.status === "jalan") for (const v of k.axe.pelanggaran) r.aviso.push({ jenis: "axe-color-contrast", sasaran: v.sasaran, detail: v.ringkas });
      if (k.axe?.status === "jalan" && k.axe.takpasti) r.aviso.push({ jenis: "axe-takpasti", jumlah: k.axe.takpasti, detail: "axe tidak dapat menghitung (gradien/gambar); keputusan tetap dari render dua kali" });
    }
  } catch (e) { r.galat = String(e.message || e); }
  r.status = r.galat ? "ERROR" : r.alasan.some((x) => x.jenis === "kontras-apca") || (o.ketat && r.alasan.length) ? "FAIL" : r.alasan.length ? "CATATAN" : "PASS";
  return r;
}

function kumpulFrame(p) {
  if (fs.statSync(p).isFile()) return [p];
  return fs.readdirSync(p).filter((f) => f.toLowerCase().endsWith(".png") && !f.endsWith(".tanpa-teks.png") && !f.endsWith(".tabrakan.png") && !["board.png", "contact-sheet.png"].includes(f)).sort().map((f) => path.join(p, f));
}

function cetakStderr(r, label) {
  console.error(`${r.status} ${label}`);
  for (const a of r.alasan) {
    if (a.jenis === "warna-nyasar") console.error(`  NYASAR   ${a.hex} ${a.luas}% bbox ${JSON.stringify(a.bbox)}`);
    else if (a.jenis === "warna-nanggung") console.error(`  NANGGUNG ${a.hex} ${a.luas ? a.luas + "% bbox " + JSON.stringify(a.bbox) : (a.peran + " " + a.blok + (a.jumlah > 1 ? " +" + (a.jumlah - 1) + " blok" : ""))} oklch ${JSON.stringify(a.oklch)}`);
    else console.error(`  KONTRAS  ${a.blok} "${a.isi ?? ""}" xy ${JSON.stringify(a.xy)} Lc ${a.lc} (min ${a.min}) WCAG ${a.wcag}:1 teks ${a.teks} latar ${a.latar}${a.catatan ? " [" + a.catatan + "]" : ""}`);
  }
  for (const a of r.aviso) console.error(`  aviso    ${a.jenis} ${a.blok ?? a.sasaran ?? ""} ${a.detail ?? ""}`);
  if (r.kontras === "dilewati") console.error("  kontras: dilewati (tanpa --html / --tanpa-teks)");
  if (r.galat) console.error(`  GALAT: ${r.galat}`);
}

async function keluar(a) {
  const target = a._[0];
  if (!target || !fs.existsSync(target)) { console.error(`jalur tidak ada: ${target}`); return 2; }
  if (!a.palet) { console.error("--palet palet.json wajib"); return 2; }
  const hexes = bacaPalet(a.palet, a.mode);
  const frames = kumpulFrame(target);
  if (!frames.length) { console.error("tidak ada png"); return 2; }
  if ((a.html || a["tanpa-teks"]) && frames.length > 1) { console.error("--html/--tanpa-teks hanya untuk satu frame"); return 2; }
  const abaikan = (a.abaikan ?? []).map((s) => { const v = s.split(",").map((x) => parseInt(x)); if (v.length !== 4 || v.some(Number.isNaN)) throw new Error("--abaikan harus x,y,w,h"); return v; });
  const o = { ketat: !!a.ketat || process.env.KETAT === "1", de: parseFloat(a.de ?? "12"), ambang: parseFloat(a["ambang-liar"] ?? "0.5"), abaikan, html: a.html, tanpaTeks: a["tanpa-teks"], otomatis: true };
  const hasil = []; for (const f of frames) hasil.push(await periksaFrame(f, hexes, o));
  const galat = hasil.some((r) => r.status === "ERROR"), fail = hasil.some((r) => r.status === "FAIL"), catatan = hasil.some((r) => r.status === "CATATAN");
  for (const r of hasil) cetakStderr(r, r.file);
  console.error(`\nringkasan: ${hasil.length} frame, ${hasil.filter((r) => r.status !== "PASS").length} tidak lulus -> ${galat ? "ERROR" : fail ? "FAIL (kontras di bawah batas atau mode --ketat)" : catatan ? "CATATAN (warna di luar palet: informasi, mata yang memutuskan)" : "PASS"}`);
  let keluaran;
  if (hasil.length === 1) { const { status, alasan, aviso, blok, kontras, axe, dilewati } = hasil[0]; keluaran = { status: galat ? "ERROR" : status, alasan, aviso, kontras, blok, dilewati, axe, ...(hasil[0].galat ? { galat: hasil[0].galat } : {}) }; }
  else keluaran = { status: galat ? "ERROR" : fail ? "FAIL" : catatan ? "CATATAN" : "PASS", alasan: hasil.flatMap((r) => r.alasan.map((x) => ({ file: r.file, ...x }))), aviso: hasil.flatMap((r) => r.aviso.map((x) => ({ file: r.file, ...x }))), frames: hasil.map((r) => ({ file: r.file, status: r.status, kontras: r.kontras, blok: r.blok })) };
  if (a.json || !process.stdout.isTTY) console.log(JSON.stringify(keluaran, null, 1)); else console.log(keluaran.status);
  return galat ? 2 : fail ? 1 : 0;
}

// ---------- CLI ----------
function parse(argv) {
  const a = { _: [] }, BANYAK = new Set(["abaikan"]), BOOL = new Set(["json", "ketat"]);
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t.startsWith("--")) { const k = t.slice(2); if (BOOL.has(k)) a[k] = true; else if (BANYAK.has(k)) (a[k] ??= []).push(argv[++i]); else a[k] = argv[++i]; }
    else a._.push(t);
  }
  return a;
}

const [, , cmd, ...rest] = process.argv;
try {
  const a = parse(rest);
  if (cmd === "masuk" && a._.length) process.exit(await masuk(a));
  if (cmd === "keluar") process.exit(await keluar(a));
  console.error(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0].replace(/^#!.*\n\/\*\*\n/, "").replace(/^ \* ?/gm, "").slice(0, 2600));
  process.exit(2);
} catch (e) { console.error(`masukan salah: ${e.message ?? e}`); process.exit(2); }
