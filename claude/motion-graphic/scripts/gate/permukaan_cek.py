#!/usr/bin/env python3
"""Inventaris permukaan: berapa SISTEM huruf, bayangan, gradien, kaca/blur, dan 3D yang dipakai di kode frame (KEBIJAKAN-v2).

  python3 permukaan_cek.py <path...> [--json] [--gerbang]

Dasar: KEBIJAKAN-v2 (26 Nov 2026): teknik bukan larangan; yang dinilai adalah SISTEM. Referensi (REF-SPEC) memberi teknik alasan; satu
sistem konsisten sah, "sup" beberapa sistem berlainan (sidik jari slop 2.3 dan 2.4) dicurigai. Maka bawaan alat ini adalah LAPORAN
inventaris per jalur (proyek): jumlah sistem berbeda per kategori, jumlah pemakaian, dan contoh file:baris. Selalu keluar 0
(kecuali jalur tidak ada = 1). Pertanyaan yang dijawab: "satu sistem atau banyak?" lalu cocokkan dengan REF-SPEC.

Kategori inventaris:
  HURUF     keluarga huruf (font-family / fontFamily) dan klasifikasinya (serif/sans), gaya miring (italic/oblique, <i>, <em>)
  BAYANGAN  definisi box-shadow / text-shadow / drop-shadow, dikelompokkan per nilai identik
  GRADIEN   definisi linear/radial/conic/repeating-gradient dikelompokkan per nilai identik, teks bergradien (background-clip:text)
  KACA/BLUR backdrop-filter, glass(), blur(...)
  3D        perspective, rotateX/Y, rotate3d, translateZ, preserve-3d, matrix3d, impor three/@react-three
Memindai rekursif .html .htm .css .tsx .ts .jsx .js .mjs .py .svg (lewati node_modules, dist, build, out, .git, .bundle, public/fonts,
dan berkas > 1,5 MB). Komentar tidak dipindai.

--gerbang  memulihkan perilaku lama (K1 sans saja, K2 permukaan datar; penegak LANTAI A7/C14a versi 26 Nov): temuan per baris dengan
tanda berikut, ERROR memblokir (exit 1), WARN hanya dicatat. Pakai bila proyek memang meminta larangan itu.
  K1-SERIF  K1-ITALIC  K2-GLASS  K2-BLUR (blur literal >= 4px; dinamis = WARN)  K2-GRADIENT (radial/conic/repeating, linear >= 3 titik,
  teks bergradien)  K2-INSET  K2-SHADOW (>= 2 lapis atau blur > 24px)  K2-GLOW (0 0 + blur)  K2-3D  K2-BLEND (WARN)
Pengecualian (hanya di --gerbang): baris (atau baris di atasnya) memuat `permukaan-ok: <alasan >= 3 kata>`; alasan lebih pendek = WARN K0-ALASAN.
Keluar: 0 (bawaan selalu; --gerbang: 0 bersih, 1 ada ERROR) · 1 jalur tidak ada.
"""
import argparse, bisect, json, os, re, sys
from collections import Counter

EXT = {".html", ".htm", ".css", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".py", ".svg"}
SKIP_DIRS = {"node_modules", "dist", "build", "out", ".git", ".bundle", ".next", ".cache", ".turbo", "__pycache__"}
MAX_BYTES = 1_500_000
ERRORS = ("K1-SERIF", "K1-ITALIC", "K2-GLASS", "K2-BLUR", "K2-GRADIENT", "K2-INSET", "K2-SHADOW", "K2-GLOW", "K2-3D")

STRICT = (r"Instrument\s?Serif|Playfair|Didot|Bodoni|Fraunces|Cormorant|Garamond|Baskerville|Merriweather|Newsreader|Libre\s?Caslon|"
          r"Editorial\s?New|Noto\s?Serif|PT\s?Serif|Source\s?Serif|DM\s?Serif|Crimson\s?(?:Text|Pro)")
STRICT_RE = re.compile(r"(?<![A-Za-z])(?:%s)" % STRICT, re.I)
LOOSE_RE = re.compile(r"(?<![\w-])(?:Georgia|Times(?:\s?New\s?Roman)?|Lora|Crimson)(?![\w-])")
SERIF_GEN = re.compile(r"(?<!sans)(?<!sans-)(?<!sans_)serif", re.I)
FONT_CTX = re.compile(r"font-?family|font\s*:|@font-face|google-fonts|loadFont|\.(?:ttf|otf|woff2?)\b|--[\w-]*(?:font|family|display|heading|title|body|serif)", re.I)
ITALIC = [re.compile(r"font-?style['\"]?\s*[:=]\s*['\"`]?\s*(?:italic|oblique)", re.I),
          re.compile(r"\bfont\s*:[^;{}]*\b(?:italic|oblique)\b", re.I),
          re.compile(r"['\"]italic['\"]"),
          re.compile(r"[\w-]*Italic[\w-]*\.(?:ttf|otf|woff2?)", re.I)]
TAG_IE = re.compile(r"<(?:i|em)(?=[\s>])[^>]*>\s*[^<\s]")  # hanya <i>/<em> yang berisi teks; <i style=..></i> kosong = dekorasi
BACKDROP = re.compile(r"backdrop-?filter['\"]?\s*[:=]\s*['\"`]?\s*(?!none)\S", re.I)
GLASSFN = re.compile(r"\bglass\s*\(")
BLUR = re.compile(r"(?<![\w-])blur\(")
STDDEV = re.compile(r"stdDeviation\s*=\s*['\"]\s*([\d.]+)")
RADIAL = re.compile(r"(?:radial|conic)-gradient\s*\(|repeating-(?:linear|radial|conic)-gradient\s*\(", re.I)
LINEAR = re.compile(r"(?<![\w-])linear-gradient\s*\(", re.I)
BGCLIP = re.compile(r"background-?clip['\"]?\s*[:=]\s*['\"`]?\s*text", re.I)
SHADOWPROP = re.compile(r"(?<![\w-])(box|text)-?shadow['\"]?\s*[:=]\s*", re.I)
DROP = re.compile(r"drop-shadow\s*\(", re.I)
PERSP = re.compile(r"\bperspective(?:-origin)?\s*(?:[:(=])", re.I)
ROT = re.compile(r"rotate[XY]\s*\(\s*(?!-?0*\.?0*(?:deg|rad|turn)?\s*\))|rotate3d\s*\(|translateZ\s*\(\s*(?!-?0*\.?0*(?:px)?\s*\))|"
                 r"preserve-3d|matrix3d\s*\(", re.I)
IMPORT3D = re.compile(r"(?:from|import|require\s*\()\s*['\"](?:three(?:/[^'\"]*)?|@react-three/[^'\"]+|@remotion/three)['\"]")
BLEND = re.compile(r"mix-?blend-?mode['\"]?\s*[:=]\s*['\"`]?\s*(?!normal)\w", re.I)
GRAIN = re.compile(r"feTurbulence|\bgrain\w*", re.I)
MARK = re.compile(r"permukaan-ok:\s*(.*)")
LEN = re.compile(r"^-?\d*\.?\d+(?:px|rem|em)?$")


def mask(raw, ext):
    """Ganti komentar dengan spasi (offset dan baris tetap)."""
    def blank(m): return re.sub(r"[^\n]", " ", m.group(0))
    t = re.sub(r"/\*.*?\*/", blank, raw, flags=re.S)
    if ext in (".html", ".htm", ".svg"): t = re.sub(r"<!--.*?-->", blank, t, flags=re.S)
    if ext in (".tsx", ".ts", ".jsx", ".js", ".mjs", ".html", ".htm"): t = re.sub(r"(?<![:\w\"'`/])//[^\n]*", blank, t)
    if ext == ".py": t = re.sub(r"(?m)^[ \t]*#[^\n]*", blank, t)
    return t


def balanced(t, i, limit=800):
    """Isi dalam kurung yang dibuka tepat sebelum indeks i."""
    d, j = 1, i
    while j < len(t) and j - i < limit:
        c = t[j]; d += (c == "(") - (c == ")")
        if d == 0: return t[i:j]
        j += 1
    return t[i:j]


def split_top(s, sep=","):
    out, d, cur, k = [], 0, "", 0
    while k < len(s):
        c = s[k]
        if s[k:k + 2] == "${": d += 1; cur += "${"; k += 2; continue
        if c in "(": d += 1
        elif c == ")" or (c == "}" and d > 0): d -= 1
        if c == sep and d <= 0: out.append(cur); cur = ""
        else: cur += c
        k += 1
    out.append(cur); return [x.strip() for x in out if x.strip()]


def split_ws(s):
    out, d, cur = [], 0, ""
    for c in s:
        if c == "(": d += 1
        elif c == ")": d -= 1
        if c.isspace() and d == 0:
            if cur: out.append(cur); cur = ""
        else: cur += c
    if cur: out.append(cur)
    return out


def px(tok):
    if not LEN.match(tok): return None
    v = float(re.match(r"-?\d*\.?\d+", tok).group(0))
    return v * 16 if tok.endswith(("rem", "em")) else v


def layer_nums(layer):
    """(x, y, blur) dari satu lapis bayangan; None bila tidak terbaca (dinamis)."""
    if "${" in layer or "var(" in layer: return None
    n = [px(t) for t in split_ws(layer) if LEN.match(t)]
    n = [v for v in n if v is not None]
    if len(n) < 2: return None
    return n[0], n[1], (n[2] if len(n) > 2 else 0.0)


def shadow_value(t, i, camel):
    """Nilai deklarasi shadow mulai indeks i. Kutip -> sampai kutip penutup; CSS -> sampai ; } atau kutip."""
    if t[i:i + 1] in "'\"`" and t[i:i + 1]:
        q = t[i]; j = t.find(q, i + 1)
        return t[i + 1:j if j > 0 else i + 400]
    d, j = 0, i
    while j < len(t) and j - i < 600:
        c = t[j]
        if c == "(": d += 1
        elif c == ")": d -= 1
        elif d <= 0 and (c in ";}" or (c in "'\"`") or (camel and c == ",")): break
        j += 1
    return t[i:j]


def scan_text(raw, ext):
    t = mask(raw, ext); raw_lines = raw.split("\n"); lines = t.split("\n")
    starts = [0]
    for m in re.finditer("\n", t): starts.append(m.end())
    ln = lambda off: bisect.bisect_right(starts, off)
    hits = {}
    def add(line, rule, level, col=0, text=None):
        hits.setdefault((line, rule), (level, col))

    # K1 per baris (dengan lanjutan font-family yang terbelah)
    for i, ln_txt in enumerate(lines):
        ctx = ln_txt
        if re.search(r"font-?family\s*:", ln_txt, re.I) and ";" not in ln_txt and "}" not in ln_txt:
            for k in range(i + 1, min(i + 5, len(lines))):
                ctx += " " + lines[k]
                if ";" in lines[k] or "}" in lines[k]: break
        n = i + 1
        m = STRICT_RE.search(ctx)
        if m: add(n, "K1-SERIF", "ERROR", m.start())
        elif FONT_CTX.search(ctx):
            m = LOOSE_RE.search(ctx) or SERIF_GEN.search(ctx)
            if m: add(n, "K1-SERIF", "ERROR", m.start())
        for r in ITALIC:
            m = r.search(ln_txt)
            if m: add(n, "K1-ITALIC", "ERROR", m.start()); break
        if ext in (".html", ".htm", ".tsx", ".jsx"):
            m = TAG_IE.search(ln_txt)
            if m: add(n, "K1-ITALIC", "ERROR", m.start())
        m = BACKDROP.search(ln_txt) or GLASSFN.search(ln_txt)
        if m: add(n, "K2-GLASS", "ERROR", m.start())
        m = STDDEV.search(ln_txt)
        if m and float(m.group(1)) >= 4: add(n, "K2-BLUR", "ERROR", m.start())
        m = RADIAL.search(ln_txt)
        if m: add(n, "K2-GRADIENT", "ERROR", m.start())
        m = BGCLIP.search(ln_txt)
        if m: add(n, "K2-GRADIENT", "ERROR", m.start())
        m = PERSP.search(ln_txt) or ROT.search(ln_txt) or IMPORT3D.search(ln_txt)
        if m: add(n, "K2-3D", "ERROR", m.start())
        m = BLEND.search(ln_txt) or GRAIN.search(ln_txt)
        if m: add(n, "K2-BLEND", "WARN", m.start())

    # blur(...)
    for m in BLUR.finditer(t):
        pre = t[max(0, m.start() - 20):m.start()].lower()
        if "backdrop" in pre: continue
        arg = balanced(t, m.end()).strip()
        lit = re.fullmatch(r"(-?\d*\.?\d+)\s*(px|rem|em|vh|vw|%)?", arg)
        if lit:
            if (float(lit.group(1)) * (16 if lit.group(2) in ("rem", "em") else 1)) >= 4 or (lit.group(2) not in (None, "px", "rem", "em") and float(lit.group(1)) > 0):
                add(ln(m.start()), "K2-BLUR", "ERROR", m.start() - starts[ln(m.start()) - 1])
        else: add(ln(m.start()), "K2-BLUR", "WARN", m.start() - starts[ln(m.start()) - 1])

    # linear-gradient >= 3 titik warna
    for m in LINEAR.finditer(t):
        parts = split_top(balanced(t, m.end()))
        if parts and re.match(r"(?:to\s|-?[\d.]+(?:deg|turn|rad|grad)\b|\$\{)", parts[0]) and not re.search(r"(#|rgb|hsl|var\()", parts[0]): parts = parts[1:]
        if len(parts) >= 3: add(ln(m.start()), "K2-GRADIENT", "ERROR", m.start() - starts[ln(m.start()) - 1])

    # box/text-shadow
    for m in SHADOWPROP.finditer(t):
        kind = m.group(1).lower(); camel = not re.match(r"(?:box|text)-", m.group(0), re.I)
        v = shadow_value(t, m.end(), camel).strip(); n = ln(m.start()); col = m.start() - starts[n - 1]
        if not v or v.lower().startswith("none") or v == "0": continue
        layers = split_top(v)
        if kind == "box" and re.search(r"\binset\b", v): add(n, "K2-INSET", "ERROR", col)
        if len(layers) >= 2: add(n, "K2-SHADOW", "ERROR", col)
        for L in layers:
            nums = layer_nums(L)
            if not nums: continue
            x, y, b = nums
            if b > 24: add(n, "K2-SHADOW", "ERROR", col)
            if x == 0 and y == 0 and b >= (6 if kind == "box" else 1): add(n, "K2-GLOW", "ERROR", col)

    # drop-shadow(...): glow, blur besar, atau berlapis (beberapa drop-shadow berurutan)
    prev_end = -1; run = 0
    for m in DROP.finditer(t):
        arg = balanced(t, m.end()); n = ln(m.start()); col = m.start() - starts[n - 1]
        run = run + 1 if (prev_end >= 0 and not t[prev_end:m.start()].strip()) else 1
        prev_end = m.end() + len(arg) + 1
        if run >= 2: add(n, "K2-SHADOW", "ERROR", col)
        nums = layer_nums(arg)
        if nums:
            x, y, b = nums
            if b > 24: add(n, "K2-SHADOW", "ERROR", col)
            if x == 0 and y == 0 and b > 0: add(n, "K2-GLOW", "ERROR", col)

    # pengecualian
    out, ex, lemah = [], [], []
    marks = {}
    for i, rl in enumerate(raw_lines):
        mm = MARK.search(rl)
        if mm:
            alasan = re.sub(r"(?:\*/|-->|\*\})\s*$", "", mm.group(1)).strip()
            marks[i + 1] = alasan
    def alasan_ok(a): return len(a.split()) >= 3
    for (n, rule), (level, col) in sorted(hits.items()):
        a = marks.get(n) or marks.get(n - 1)
        if a is not None and alasan_ok(a): ex.append({"line": n, "rule": rule, "alasan": a}); continue
        out.append({"line": n, "rule": rule, "level": level, "snippet": snip(raw_lines[n - 1], col)})
    for n, a in marks.items():
        if not alasan_ok(a): out.append({"line": n, "rule": "K0-ALASAN", "level": "WARN", "snippet": snip(raw_lines[n - 1], 0)})
    return out, ex


def snip(line, col):
    s = line.strip(); off = len(line) - len(line.lstrip())
    c = max(0, col - off)
    s = s[max(0, c - 30):] if c > 40 else s
    return s[:100] + ("..." if len(s) > 100 else "")


def walk(paths):
    for p in paths:
        if os.path.isfile(p): yield p; continue
        for root, dirs, files in os.walk(p):
            dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS and not (d == "fonts" and os.path.basename(root) == "public"))
            for f in sorted(files):
                if os.path.splitext(f)[1].lower() in EXT: yield os.path.join(root, f)


def run(paths):
    res, exs, nfiles, skipped = [], [], 0, []
    for f in walk(paths):
        ext = os.path.splitext(f)[1].lower()
        if ext not in EXT: continue
        try:
            if os.path.getsize(f) > MAX_BYTES: skipped.append(f); continue
            raw = open(f, encoding="utf-8", errors="replace").read()
        except OSError as e:
            skipped.append(f); continue
        nfiles += 1
        h, e = scan_text(raw, ext)
        res += [dict(file=f, **x) for x in h]; exs += [dict(file=f, **x) for x in e]
    return res, exs, nfiles, skipped


FAM_DECL = [re.compile(r"font-?family['\"]?\s*[:=]\s*([^;}\n]+)", re.I), re.compile(r"(?<![\w-])font\s*:\s*[^;}\n]*?\d(?:px|rem|em|pt|%)?(?:/[\d.]+\w*)?\s+([^;}\n]+)", re.I)]
GENERIC = {"sans-serif", "serif", "monospace", "system-ui", "ui-sans-serif", "ui-serif", "ui-monospace", "cursive", "fantasy", "inherit", "initial",
           "-apple-system", "blinkmacsystemfont", "ui-rounded", "emoji", "math", "fangsong"}
KATEGORI = ("HURUF", "BAYANGAN", "GRADIEN", "KACA/BLUR", "3D")


def kelas_huruf(nama):
    if STRICT_RE.search(nama) or LOOSE_RE.search(nama): return "serif"
    return "sans/lain"


def inventaris_teks(raw, ext):
    """-> daftar (line, kategori, subjenis, kunci, snippet) dari satu berkas."""
    t = mask(raw, ext); raw_lines = raw.split("\n"); lines = t.split("\n")
    starts = [0]
    for m in re.finditer("\n", t): starts.append(m.end())
    ln = lambda off: bisect.bisect_right(starts, off)
    out = []
    def add(n, kat, sub, kunci): out.append((n, kat, sub, re.sub(r"\s+", " ", kunci).strip()[:90], snip(raw_lines[n - 1], 0)))
    for i, l in enumerate(lines):
        n = i + 1
        for r in FAM_DECL:
            for m in r.finditer(l):
                fams = [f.strip().strip("'\"`") for f in split_top(re.sub(r"!important", "", m.group(1)))]
                fams = [f for f in fams if f and f.lower() not in GENERIC and not f.startswith(("var(", "${"))]
                if fams: add(n, "HURUF", "keluarga:" + kelas_huruf(fams[0]), fams[0])
                elif re.search(r"(?<!sans)(?<!sans-)serif", m.group(1)) and not re.search(r"sans-serif", m.group(1)): add(n, "HURUF", "keluarga:serif", "serif (generik)")
        for r in ITALIC:
            if r.search(l): add(n, "HURUF", "gaya", "italic/oblique"); break
        if ext in (".html", ".htm", ".tsx", ".jsx") and TAG_IE.search(l): add(n, "HURUF", "gaya", "tag <i>/<em> berisi teks")
        if BGCLIP.search(l): add(n, "GRADIEN", "teks-bergradien", "background-clip:text")
        m = BACKDROP.search(l) or GLASSFN.search(l)
        if m: add(n, "KACA/BLUR", "kaca", m.group(0))
        m = PERSP.search(l) or ROT.search(l) or IMPORT3D.search(l)
        if m: add(n, "3D", "3d", m.group(0))
    for m in BLUR.finditer(t):
        if "backdrop" in t[max(0, m.start() - 20):m.start()].lower(): continue
        add(ln(m.start()), "KACA/BLUR", "blur", "blur(" + balanced(t, m.end()).strip() + ")")
    for m in STDDEV.finditer(t): add(ln(m.start()), "KACA/BLUR", "blur", "feGaussianBlur " + m.group(1))
    for r in (RADIAL, LINEAR):
        for m in r.finditer(t):
            nm = m.group(0).rstrip("( ").strip()
            add(ln(m.start()), "GRADIEN", nm, nm + "(" + balanced(t, m.end()).strip() + ")")
    for m in SHADOWPROP.finditer(t):
        camel = not re.match(r"(?:box|text)-", m.group(0), re.I)
        v = shadow_value(t, m.end(), camel).strip()
        if v and not v.lower().startswith("none") and v != "0": add(ln(m.start()), "BAYANGAN", m.group(1).lower() + "-shadow", v)
    for m in DROP.finditer(t): add(ln(m.start()), "BAYANGAN", "drop-shadow", balanced(t, m.end()).strip())
    return out


def inventaris(path):
    """Inventaris satu jalur -> dict kategori -> {subjenis, distinct, total, kelompok:[{kunci, jumlah, contoh}]}."""
    hasil = {k: {} for k in KATEGORI}; nfiles = 0
    for f in walk([path]):
        ext = os.path.splitext(f)[1].lower()
        try:
            if os.path.getsize(f) > MAX_BYTES: continue
            raw = open(f, encoding="utf-8", errors="replace").read()
        except OSError: continue
        nfiles += 1
        for n, kat, sub, kunci, sn in inventaris_teks(raw, ext):
            g = hasil[kat].setdefault((sub, kunci), {"sub": sub, "kunci": kunci, "jumlah": 0, "contoh": []})
            g["jumlah"] += 1
            if len(g["contoh"]) < 2: g["contoh"].append(f"{f}:{n}")
    out = {}
    for kat, gs in hasil.items():
        kel = sorted(gs.values(), key=lambda g: (-g["jumlah"], g["kunci"]))
        subs = {}
        for g in kel: subs[g["sub"]] = subs.get(g["sub"], 0) + 1
        out[kat] = {"distinct": len(kel), "total": sum(g["jumlah"] for g in kel), "per_subjenis": subs, "kelompok": kel}
    return {"berkas": nfiles, "kategori": out}


def cetak_inventaris(path, inv, maks=6):
    print(f"== inventaris {path}  ({inv['berkas']} berkas) ==")
    for kat in KATEGORI:
        d = inv["kategori"][kat]
        sub = ", ".join(f"{k}={v}" for k, v in sorted(d["per_subjenis"].items()))
        print(f"{kat}: {d['distinct']} sistem berbeda, {d['total']} pemakaian" + (f"  [{sub}]" if sub else ""))
        for g in d["kelompok"][:maks]:
            print(f"    {g['jumlah']:>3}x  {g['kunci']}   <- {', '.join(g['contoh'])}")
        if len(d["kelompok"]) > maks: print(f"    ... +{len(d['kelompok']) - maks} lagi (pakai --json)")
    print()


def main(argv=None):
    ap = argparse.ArgumentParser(description="Inventaris permukaan (KEBIJAKAN-v2); --gerbang = gerbang K1/K2 lama")
    ap.add_argument("paths", nargs="+"); ap.add_argument("--json", action="store_true")
    ap.add_argument("--gerbang", action="store_true", help="pulihkan perilaku lama: ERROR K1/K2 memblokir (exit 1)")
    a = ap.parse_args(argv)
    miss = [p for p in a.paths if not os.path.exists(p)]
    if miss: print("jalur tidak ada: " + ", ".join(miss), file=sys.stderr); return 1
    invs = {p: inventaris(p) for p in a.paths}
    res, exs, nfiles, skipped = run(a.paths)
    nerr = sum(1 for r in res if r["level"] == "ERROR"); nwarn = len(res) - nerr
    ring = Counter(r["rule"] for r in res)
    if a.json:
        d = {"mode": "gerbang" if a.gerbang else "inventaris", "berkas": nfiles, "inventaris": invs, "dilewati": skipped}
        if a.gerbang: d.update({"error": nerr, "warn": nwarn, "ringkasan": dict(ring), "temuan": res, "pengecualian": exs})
        print(json.dumps(d, ensure_ascii=False, indent=1))
    elif not a.gerbang:
        for p, inv in invs.items(): cetak_inventaris(p, inv)
        for s in skipped: print(f"dilewati (besar/tak terbaca): {s}")
        print("inventaris saja (KEBIJAKAN-v2): jawab 'satu sistem?' lalu cocokkan dengan REF-SPEC; tidak memblokir. --gerbang = perilaku lama.")
    else:
        for r in res: print(f"{r['file']}:{r['line']}  {r['level'] if r['level']=='WARN' else 'ERR '}  {r['rule']:<12} {r['snippet']}")
        if exs:
            print("\npengecualian (permukaan-ok):")
            for e in exs: print(f"  {e['file']}:{e['line']}  {e['rule']}  {e['alasan']}")
        for s in skipped: print(f"dilewati (besar/tak terbaca): {s}")
        print(f"\nringkasan: {nfiles} berkas, {nerr} error, {nwarn} warn, {len(exs)} pengecualian")
        for k, v in sorted(ring.items()): print(f"  {k:<12} {v}")
        print("GAGAL permukaan (K1/K2): ubah ke sans datar atau beri `permukaan-ok: <alasan>` bila user meminta." if nerr else "LULUS permukaan")
    return 1 if (a.gerbang and nerr) else 0


if __name__ == "__main__":
    sys.exit(main())
