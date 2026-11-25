#!/usr/bin/env python3
"""Satu pintu cek NEGATIF (claude/_bersama/NEGATIF.md): permukaan + huruf (K1/K2) dan placeholder.

  python3 negatif_cek.py <frame.html | folder kode> [...] [--izin qc/izin.json] [--size 1920x1080] [--json] [--tanpa-dom]

Yang dijalankan, berurutan:
  1. permukaan_cek.py: K1 (serif/italic/script) dan K2 (kaca, blur, gradien, glow, bayangan berlapis, 3D) di kode.
  2. Placeholder (NEGATIF 4), statis: border putus-putus atau titik-titik (P-DASHED) di .html .htm .css .tsx .jsx .ts .js.
  3. Placeholder (NEGATIF 4), dari DOM yang dirender (hanya .html/.htm; butuh Playwright, mis. ~/work/mg-venv/bin/python di PC;
     tanpa Playwright dilewati dengan catatan, atau matikan dengan --tanpa-dom):
       P-KOSONG   kotak kosong: elemen tanpa teks, tanpa anak, tanpa img/svg/canvas/video, ber-border terlihat atau berisi abu netral,
                  ukuran >= 48x32 px dan bukan latar penuh layar. Isi warna jenuh tanpa border = bentuk datar yang sah, tidak ditandai.
       P-BAR-ABU  garis abu pengganti teks: >= 2 elemen kosong bersaudara, tinggi <= 24 px, lebar >= 3x tinggi, warna abu netral.
     Elemen (atau leluhurnya) ber-`data-sengaja="tumpuk"` tidak dihitung; `data-lapis="latar"` dilewati.

Izin (hukum keras terbuka hanya oleh kalimat eksplisit Irfan di sesi itu): `qc/izin.json`, dicari dari tiap jalur ke atas (maks 6 tingkat)
atau lewat --izin:
  {"izin": [{"aturan": "K1-SERIF", "kutipan": "pakai serif untuk kata terakhir", "catatan": "DECISIONS #12"}]}
`aturan` = ID temuan atau awalannya ("K1", "K2-GLOW", "P"); `kutipan` = kata-kata Irfan, minimal 3 kata. Izin tanpa kutipan sah ditolak (exit 1).
Temuan yang diizinkan dicatat sebagai IZIN dan tidak memblokir. Kata sifat, profil merek, tema, kartu, dan referensi tidak membuka apa pun.

Keluar: 0 bersih (WARN tidak memblokir) · 1 ada ERROR atau izin tidak sah · 2 jalur tidak ada.
"""
import argparse, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
TEKS_EXT = {".html", ".htm", ".css", ".tsx", ".jsx", ".ts", ".js", ".mjs"}
SKIP_DIRS = {"node_modules", "dist", "build", "out", ".git", ".bundle", ".next", ".cache", ".turbo", "__pycache__"}
DASHED = re.compile(r"border(?:-(?:top|right|bottom|left))?(?:-style)?['\"]?\s*[:=]\s*['\"`]?[^;}\n]*?\b(dashed|dotted)\b", re.I)
KOMENTAR = re.compile(r"/\*.*?\*/|<!--.*?-->", re.S)


def muat_permukaan():
    spec = importlib.util.spec_from_file_location("permukaan_cek", os.path.join(HERE, "permukaan_cek.py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m


def berkas(paths, ext):
    for p in paths:
        if os.path.isfile(p):
            if os.path.splitext(p)[1].lower() in ext: yield p
            continue
        for root, dirs, files in os.walk(p):
            dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS)
            for f in sorted(files):
                if os.path.splitext(f)[1].lower() in ext: yield os.path.join(root, f)


def cek_putus(paths):
    out = []
    for f in berkas(paths, TEKS_EXT):
        try:
            if os.path.getsize(f) > 1_500_000: continue
            raw = open(f, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        t = KOMENTAR.sub(lambda m: re.sub(r"[^\n]", " ", m.group(0)), raw)
        for m in DASHED.finditer(t):
            baris = t.count("\n", 0, m.start()) + 1
            out.append(dict(file=f, line=baris, rule="P-DASHED", level="ERROR", snippet=m.group(0).strip()[:90]))
    return out


JS = r"""
({W, H}) => {
  const MEDIA = new Set(['IMG','SVG','CANVAS','VIDEO','PICTURE','INPUT','TEXTAREA','SELECT','IFRAME','OBJECT','EMBED']);
  const SKIP = new Set(['SCRIPT','STYLE','TITLE','HEAD','NOSCRIPT','META','LINK','BR','HR']);
  const parse = s => { const m = (s || '').match(/rgba?\(([^)]*)\)/); if (!m) return null;
    const p = m[1].split(/[,\/ ]+/).filter(Boolean).map(Number); return {r:p[0], g:p[1], b:p[2], a: p.length > 3 ? p[3] : 1}; };
  const sat = c => { const mx = Math.max(c.r,c.g,c.b), mn = Math.min(c.r,c.g,c.b); return mx === 0 ? 0 : (mx-mn)/mx; };
  const light = c => (c.r + c.g + c.b) / 765;
  const label = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '');
  const exempt = el => !!(el.closest && el.closest('[data-sengaja="tumpuk"], [data-lapis="latar"]'));
  const hidden = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = getComputedStyle(e);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return true; } return false; };
  const kosong = el => {
    if (SKIP.has(el.tagName) || MEDIA.has(el.tagName.toUpperCase()) || el.closest('svg')) return false;
    if (el.children.length) return false;
    if ((el.textContent || '').trim()) return false;
    const s = getComputedStyle(el);
    if (s.backgroundImage && s.backgroundImage !== 'none' && /url\(/.test(s.backgroundImage)) return false;
    return true;
  };
  const out = [], bars = new Map();
  for (const el of document.body.querySelectorAll('*')) {
    if (!kosong(el) || hidden(el) || exempt(el)) continue;
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    if (r.width < 1 || r.height < 1) continue;
    const bg = parse(s.backgroundColor); const bgOn = bg && bg.a > 0.05;
    const bw = Math.max(parseFloat(s.borderTopWidth)||0, parseFloat(s.borderLeftWidth)||0);
    const bc = parse(s.borderTopColor); const borderOn = bw >= 1 && s.borderTopStyle !== 'none' && bc && bc.a > 0.05;
    const abu = bgOn && sat(bg) < 0.15 && light(bg) > 0.15 && light(bg) < 0.95;
    const luas = r.width * r.height;
    if (r.height <= 24 && r.width >= 3 * r.height && abu && !borderOn && luas < W * H * 0.2) {
      const p = el.parentElement; if (!bars.has(p)) bars.set(p, []); bars.get(p).push({el, r}); continue;
    }
    if (r.width >= 48 && r.height >= 32 && luas < W * H * 0.8 && (borderOn || abu)) {
      out.push({rule: 'P-KOSONG', el: label(el), box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
                snippet: borderOn ? 'kotak kosong ber-border' : 'kotak kosong berisi abu netral'});
    }
  }
  for (const [p, list] of bars) if (list.length >= 2)
    for (const {el, r} of list) out.push({rule: 'P-BAR-ABU', el: label(el), box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
                                         snippet: 'garis abu pengganti teks (' + list.length + ' bersaudara)'});
  return out;
}
"""


def punya_playwright():
    try:
        import playwright.sync_api  # noqa
        return True
    except Exception:
        return False


def cek_dom(paths, size):
    from playwright.sync_api import sync_playwright
    W, H = (int(x) for x in size.lower().split("x"))
    out = []
    files = list(berkas(paths, {".html", ".htm"}))
    if not files: return out
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": W, "height": H})
        for f in files:
            pg.goto("file://" + os.path.abspath(f)); pg.wait_for_timeout(150)
            for t in pg.evaluate(JS, {"W": W, "H": H}):
                out.append(dict(file=f, line=0, rule=t["rule"], level="ERROR", snippet=f"{t['snippet']} {t['el']} @{t['box']}"))
        b.close()
    return out


def cari_izin(paths, eksplisit):
    kandidat = [eksplisit] if eksplisit else []
    if not eksplisit:
        for p in paths:
            d = os.path.abspath(p if os.path.isdir(p) else os.path.dirname(p))
            for _ in range(7):
                c = os.path.join(d, "qc", "izin.json")
                if os.path.isfile(c) and c not in kandidat: kandidat.append(c)
                d = os.path.dirname(d)
    return kandidat


def baca_izin(kandidat):
    """-> (daftar izin sah, daftar masalah)."""
    sah, masalah = [], []
    for f in kandidat:
        try:
            data = json.load(open(f, encoding="utf-8"))
        except (OSError, ValueError) as e:
            masalah.append(f"{f}: tidak terbaca ({e})"); continue
        for i, z in enumerate(data.get("izin", []) if isinstance(data, dict) else [], 1):
            aturan = z.get("aturan"); kutipan = str(z.get("kutipan", "")).strip()
            if not aturan or len(kutipan.split()) < 3:
                masalah.append(f"{f}: izin #{i} tidak sah (butuh `aturan` dan `kutipan` kalimat Irfan, >= 3 kata)"); continue
            sah.append(dict(aturan=[aturan] if isinstance(aturan, str) else list(aturan), kutipan=kutipan, sumber=f))
    return sah, masalah


def diizinkan(rule, izin):
    for z in izin:
        if any(rule == a or rule.startswith(a) for a in z["aturan"]): return z
    return None


def kumpulkan(paths, size="1920x1080", dom=True):
    pc = muat_permukaan()
    res, exs, nfiles, skipped = pc.run(paths)
    temuan = [dict(file=r["file"], line=r["line"], rule=r["rule"], level=r["level"], snippet=r["snippet"]) for r in res]
    temuan += cek_putus(paths)
    catatan = []
    if dom:
        if punya_playwright(): temuan += cek_dom(paths, size)
        else: catatan.append("DOM dilewati: Playwright tidak ada (jalankan dengan ~/work/mg-venv/bin/python di PC)")
    return temuan, exs, nfiles, catatan


def main(argv=None):
    ap = argparse.ArgumentParser(description="Gerbang NEGATIF satu pintu")
    ap.add_argument("paths", nargs="+"); ap.add_argument("--izin"); ap.add_argument("--size", default="1920x1080")
    ap.add_argument("--json", action="store_true"); ap.add_argument("--tanpa-dom", action="store_true")
    a = ap.parse_args(argv)
    miss = [p for p in a.paths if not os.path.exists(p)]
    if miss: print("jalur tidak ada: " + ", ".join(miss), file=sys.stderr); return 2
    temuan, exs, nfiles, catatan = kumpulkan(a.paths, a.size, not a.tanpa_dom)
    izin, masalah = baca_izin(cari_izin(a.paths, a.izin))
    blok, dizinkan, tag = [], [], {}
    for i, t in enumerate(temuan):
        z = diizinkan(t["rule"], izin) if t["level"] == "ERROR" else None
        if z: dizinkan.append(dict(t, izin=z["kutipan"])); tag[i] = "IZIN"
        elif t["level"] == "ERROR": blok.append(t); tag[i] = "ERR "
        else: tag[i] = "WARN"
    nwarn = sum(1 for t in temuan if t["level"] == "WARN")
    if a.json:
        print(json.dumps({"berkas": nfiles, "error": len(blok), "warn": nwarn, "diizinkan": dizinkan, "temuan": temuan,
                          "masalah_izin": masalah, "catatan": catatan}, ensure_ascii=False, indent=1))
    else:
        for i, t in enumerate(temuan):
            print(f"{t['file']}:{t['line']}  {tag[i]}  {t['rule']:<12} {t['snippet']}")
        for m in masalah: print("IZIN TIDAK SAH: " + m)
        for c in catatan: print("catatan: " + c)
        print(f"\nringkasan: {nfiles} berkas permukaan, {len(blok)} error, {nwarn} warn, {len(dizinkan)} diizinkan Irfan")
        print("GAGAL NEGATIF: perbaiki di kode (sans datar, objek lengkap). Hanya kalimat eksplisit Irfan yang membuka, lewat qc/izin.json." if blok or masalah else "LULUS NEGATIF")
    return 1 if blok or masalah else 0


if __name__ == "__main__":
    sys.exit(main())
