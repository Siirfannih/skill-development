#!/usr/bin/env python3
"""Satu pintu cek NEGATIF (KEBIJAKAN-v2: negatif = simpangan dari REF-SPEC + sidik jari slop, bukan larangan teknik).

  python3 negatif_cek.py <frame.html | folder kode> [...] [--size 1920x1080] [--json] [--tanpa-dom] [--gerbang]

GERBANG MERAH (memblokir) hanya untuk yang mutlak:
  1. Placeholder (sidik jari 2.6), statis: border putus-putus atau titik-titik (P-DASHED) di .html .htm .css .tsx .jsx .ts .js.
  2. Placeholder, dari DOM yang dirender (hanya .html/.htm; butuh Playwright, mis. ~/work/mg-venv/bin/python di PC;
     tanpa Playwright dilewati dengan catatan, atau matikan dengan --tanpa-dom):
       P-KOSONG   kotak kosong: elemen tanpa teks, tanpa anak, tanpa img/svg/canvas/video, ber-border terlihat atau berisi abu netral,
                  ukuran >= 48x32 px dan bukan latar penuh layar. Isi warna jenuh tanpa border = bentuk datar yang sah, tidak ditandai.
       P-BAR-ABU  garis abu pengganti teks: >= 2 elemen kosong bersaudara, tinggi <= 24 px, lebar >= 3x tinggi, warna abu netral.
     Elemen (atau leluhurnya) ber-`data-sengaja="tumpuk"` tidak dihitung; `data-lapis="latar"` dilewati.
  (Tabrakan teks/objek dijaga gate/tabrakan_cek.py, alat terpisah yang tetap gerbang; alat ini tidak memanggilnya.)

LAPORAN (tidak memblokir): bagian inventaris dari permukaan_cek.py: sistem huruf, bayangan, gradien, kaca/blur, 3D per jalur
(sistem, bukan larangan; cocokkan dengan REF-SPEC). Temuan per baris K1/K2 hanya dicetak sebagai INFO. `--gerbang` memulihkan
perilaku lama (ERROR K1/K2 ikut memblokir).

Tidak ada izin berkas: butir [mutlak] tidak dibuka siapa pun; instruksi eksplisit Irfan di sesi dicatat di DECISIONS.md proyek.

Keluar: 0 bersih · 1 ada placeholder (atau ERROR bila --gerbang) · 2 jalur tidak ada.
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


def kumpulkan(paths, size="1920x1080", dom=True, gerbang=False):
    pc = muat_permukaan()
    res, exs, nfiles, skipped = pc.run(paths)
    # K1/K2 = laporan (INFO) kecuali --gerbang
    temuan = [dict(file=r["file"], line=r["line"], rule=r["rule"], level=r["level"] if gerbang else "INFO", snippet=r["snippet"]) for r in res]
    temuan += cek_putus(paths)
    catatan = []
    if dom:
        if punya_playwright(): temuan += cek_dom(paths, size)
        else: catatan.append("DOM dilewati: Playwright tidak ada (jalankan dengan ~/work/mg-venv/bin/python di PC)")
    return temuan, exs, nfiles, catatan


def main(argv=None):
    ap = argparse.ArgumentParser(description="Gerbang NEGATIF satu pintu")
    ap.add_argument("paths", nargs="+"); ap.add_argument("--size", default="1920x1080")
    ap.add_argument("--json", action="store_true"); ap.add_argument("--tanpa-dom", action="store_true")
    ap.add_argument("--gerbang", action="store_true", help="K1/K2 ikut memblokir (perilaku lama)")
    a = ap.parse_args(argv)
    miss = [p for p in a.paths if not os.path.exists(p)]
    if miss: print("jalur tidak ada: " + ", ".join(miss), file=sys.stderr); return 2
    temuan, exs, nfiles, catatan = kumpulkan(a.paths, a.size, not a.tanpa_dom, a.gerbang)
    pc = muat_permukaan(); invs = {p: pc.inventaris(p) for p in a.paths}
    blok, tag = [], {}
    for i, t in enumerate(temuan):
        if t["level"] == "ERROR": blok.append(t); tag[i] = "ERR "
        else: tag[i] = "INFO" if t["level"] == "INFO" else "WARN"
    nwarn = sum(1 for t in temuan if t["level"] == "WARN"); ninfo = sum(1 for t in temuan if t["level"] == "INFO")
    if a.json:
        print(json.dumps({"berkas": nfiles, "error": len(blok), "warn": nwarn, "info": ninfo, "inventaris": invs, "temuan": temuan, "catatan": catatan}, ensure_ascii=False, indent=1))
    else:
        for i, t in enumerate(temuan):
            if t["level"] != "INFO": print(f"{t['file']}:{t['line']}  {tag[i]}  {t['rule']:<12} {t['snippet']}")
        print("\n--- LAPORAN inventaris permukaan (tidak memblokir; KEBIJAKAN-v2) ---")
        for p, inv in invs.items(): pc.cetak_inventaris(p, inv, maks=4)
        if ninfo: print(f"{ninfo} temuan K1/K2 per baris dicatat sebagai INFO (lihat --json atau permukaan_cek.py --gerbang)")
        for c in catatan: print("catatan: " + c)
        print(f"\nringkasan: {nfiles} berkas permukaan, {len(blok)} error, {nwarn} warn, {ninfo} info")
        print("GAGAL NEGATIF: perbaiki placeholder di kode (isi nyata, bukan kotak/garis kosong). Butir [mutlak] tidak dibuka." if blok else "LULUS NEGATIF")
    return 1 if blok else 0


if __name__ == "__main__":
    sys.exit(main())
