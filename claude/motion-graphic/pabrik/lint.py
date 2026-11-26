#!/usr/bin/env python3
"""lint.py: lint props komponen pabrik. Komponen (bukan Demo) tidak boleh membawa gaya atau keacakan tersembunyi.

  lint.py <Nama.tsx> [...]      keluar 1 bila ada pelanggaran

Aturan (dicek pada kode, komentar dibuang lebih dulu):
  L1 nol hex/rgb()/rgba()/hsl()/oklch() literal  -> warna hanya dari props/tema (tokens).
  L2 nol font-family / fontFamily literal        -> keluarga huruf dari props (mis. tokens.huruf).
  L3 nol nama warna CSS sebagai string ('white', "black", ...).
  L4 deterministik per frame: tanpa Math.random, Date.now, new Date, performance.now, requestAnimationFrame, setTimeout/Interval.
  L5 mandiri: impor hanya dari remotion, zod, react, sesama berkas, ../../../toolkit/* (gerak, kamera, latar, transisi) dan ../../../scripts/remotion/*.
  L6 wajib mengekspor skema props zod: `export const <Nama>PropsSchema`.
Kenapa: gaya yang menempel di komponen menjadi template tersembunyi; keacakan bebas-biji membuat render paralel tidak sama.
"""
import re, sys
from pathlib import Path

WARNA_CSS = "white black red green blue yellow orange purple pink gray grey silver gold navy teal cyan magenta brown beige ivory lime maroon olive aqua crimson coral salmon tomato violet indigo".split()
RULES = [
    ("L1", re.compile(r"#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\s*\("), "warna literal (hex/rgb/hsl): ambil dari props"),
    ("L2", re.compile(r"font-family|fontFamily\s*:\s*['\"`]"), "font-family literal: ambil dari props"),
    ("L3", re.compile(r"""(['"`])\s*(?:%s)\s*\1""" % "|".join(WARNA_CSS), re.I), "nama warna CSS literal"),
    ("L4", re.compile(r"Math\.random|Date\.now|new\s+Date\b|performance\.now|requestAnimationFrame|setTimeout|setInterval"), "tidak deterministik per frame"),
]
IMPOR_OK = re.compile(r"^(remotion|react|react/jsx-runtime|zod|@remotion/[\w-]+|\./[\w./-]+|(\.\./)+(scripts/remotion|toolkit)/[\w./-]+)$")


def buang_komentar(src):
    src = re.sub(r"/\*.*?\*/", lambda m: "\n" * m.group(0).count("\n"), src, flags=re.S)
    return re.sub(r"(?<!:)//[^\n]*", "", src)


def lint_teks(src, nama=None):
    """-> daftar 'Lx baris N: pesan'."""
    kode = buang_komentar(src); out = []
    for i, ln in enumerate(kode.splitlines(), 1):
        for rid, rx, msg in RULES:
            if rx.search(ln):
                out.append(f"{rid} baris {i}: {msg}: {ln.strip()[:90]}")
    for m in re.finditer(r"""(?:from\s+|import\s+|require\()\s*['"]([^'"]+)['"]""", kode):
        if not IMPOR_OK.match(m.group(1)):
            out.append(f"L5 impor di luar daftar mandiri: {m.group(1)}")
    if not re.search(r"export\s+const\s+\w+PropsSchema\b", kode):
        out.append("L6 tidak ada `export const <Nama>PropsSchema` (zod)")
    return out


def lint_file(path):
    return lint_teks(Path(path).read_text(), Path(path).stem)


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if not argv: print(__doc__); return 2
    gagal = 0
    for f in argv:
        v = lint_file(f)
        print(f"{f}: " + ("OK" if not v else f"{len(v)} pelanggaran"))
        for x in v: print("  " + x)
        gagal += bool(v)
    return 1 if gagal else 0


if __name__ == "__main__":
    sys.exit(main())
