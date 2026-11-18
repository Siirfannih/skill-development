#!/usr/bin/env python3
"""Cek sistem desain video: gaya hanya dari tema.ts, warna merek terkendali, warna UI asli di tempatnya.

  python3 tema_cek.py <folder src remotion>        mis. projects/<p>/remotion/src/video

Yang dikontrol (bersama/tema.ts, format templates/sistem-desain/tema.ts):
  1. MEREK punya merek, primer, sekunder, latar, semuanya hex #RRGGBB.
  2. TURUNAN dikelompokkan per induk (kunci di MEREK); hue tiap turunan ≤ 25° dari induknya
     (turunan yang hampir tanpa warna dilewati karena hue-nya tidak bermakna).
  3. PENGECUALIAN: tiap entri punya warna, adegan, dan alasan.
  4. Warna dalam NETRAL/TURUNAN yang hampir sama (selisih RGB < 12) ditandai untuk digabung.
  5. File adegan (di luar bersama/) tidak menulis kode warna hex, nama font, atau ukuran huruf langsung:
     pakai nama token (MEREK.primer, HURUF.ukuran.narasi, …).
Tidak dikontrol: warna UI asli aplikasi (ChatGPT, Claude, GitHub, Instagram). Nilainya mengikuti aplikasinya dan
hanya boleh ditulis di bersama/ui-asli/<aplikasi>/. Komponen lain di bersama/ boleh memakai literal, tapi dilaporkan.
Kontras dan dominasi keluarga warna dicek di hasil render (Lantai A7, scripts/palette_check.py), bukan di sini.
Exit 1 bila ada GAGAL.
"""
import colorsys, os, re, sys

HEX = re.compile(r"#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b")
PAIR = re.compile(r"(\w+)\s*:\s*'(#[0-9A-Fa-f]{6})'")
FONT_LIT = re.compile(r"fontFamily\s*:\s*['\"]")
SIZE_LIT = re.compile(r"fontSize\s*:\s*\d")


def blok(s, nama):
    m = re.search(r"export const " + nama + r"\s*=\s*\{", s)
    if not m: return None
    i, d = m.end() - 1, 0
    for j in range(i, len(s)):
        d += {"{": 1, "}": -1}.get(s[j], 0)
        if d == 0: return s[i + 1:j]
    return None


def anak(isi):
    """Pecah isi objek level-1 menjadi {kunci: teks nilai}."""
    out, i = {}, 0
    for m in re.finditer(r"(\w+)\s*:\s*", isi):
        if m.start() < i: continue
        k, j = m.group(1), m.end()
        if j < len(isi) and isi[j] == "{":
            d = 0
            for e in range(j, len(isi)):
                d += {"{": 1, "}": -1}.get(isi[e], 0)
                if d == 0: break
            out[k] = isi[j:e + 1]; i = e + 1
        else:
            e = isi.find(",", j); e = len(isi) if e < 0 else e
            out[k] = isi[j:e]; i = e
    return out


def rgb(h): h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
def hls(h): return colorsys.rgb_to_hls(*[x / 255 for x in rgb(h)])
def jarak(a, b): return max(abs(x - y) for x, y in zip(rgb(a), rgb(b)))


def main():
    if len(sys.argv) != 2: sys.exit(__doc__)
    src = sys.argv[1].rstrip("/")
    tema_f = os.path.join(src, "bersama", "tema.ts")
    if not os.path.exists(tema_f): sys.exit(f"GAGAL: {tema_f} tidak ada (salin templates/sistem-desain/tema.ts).")
    s = re.sub(r"//[^\n]*", "", open(tema_f, encoding="utf-8").read())
    gagal, catat = [], []

    merek = blok(s, "MEREK")
    M = {}
    if merek is None: gagal.append("tema.ts tanpa MEREK")
    else:
        M = dict(PAIR.findall(merek))
        for k in ("merek", "primer", "sekunder", "latar"):
            if k not in M: gagal.append(f"MEREK.{k} belum diisi hex #RRGGBB (dari BRAND.md)")

    tur = blok(s, "TURUNAN") or ""
    for induk, isi in anak(tur).items():
        if induk not in M: gagal.append(f"TURUNAN.{induk}: induk tidak ada di MEREK"); continue
        h0, _, s0 = hls(M[induk])
        for k, v in PAIR.findall(isi):
            h, _, sat = hls(v)
            if sat < 0.15 or s0 < 0.15: continue
            dh = min(abs(h - h0), 1 - abs(h - h0)) * 360
            if dh > 25: gagal.append(f"TURUNAN.{induk}.{k} {v}: hue {dh:.0f}° dari induk {M[induk]} (maks 25°); pindah ke PENGECUALIAN dengan alasan, atau sesuaikan")

    pen = blok(s, "PENGECUALIAN") or ""
    for k, isi in anak(pen).items():
        for f in ("warna", "adegan", "alasan"):
            if f + ":" not in isi.replace(" ", "") and not re.search(f + r"\s*:", isi):
                gagal.append(f"PENGECUALIAN.{k} tanpa {f}")

    for nama in ("NETRAL", "TURUNAN"):
        vals = PAIR.findall(blok(s, nama) or "")
        for i in range(len(vals)):
            for j in range(i + 1, len(vals)):
                if jarak(vals[i][1], vals[j][1]) < 12:
                    catat.append(f"{nama}: {vals[i][0]} {vals[i][1]} ≈ {vals[j][0]} {vals[j][1]} → gabung")

    adegan, lain = [], []
    for root, _, files in os.walk(src):
        for fn in files:
            if not fn.endswith((".tsx", ".ts")) or fn == "tema.ts": continue
            p = os.path.join(root, fn); rel = os.path.relpath(p, src)
            if rel.startswith(os.path.join("bersama", "ui-asli")): continue
            teks = re.sub(r"//[^\n]*", "", open(p, encoding="utf-8", errors="ignore").read())
            n = (len(HEX.findall(teks)), len(FONT_LIT.findall(teks)), len(SIZE_LIT.findall(teks)))
            if sum(n) == 0: continue
            (lain if rel.startswith("bersama" + os.sep) else adegan).append((rel, n))
    for rel, (w, f, z) in sorted(adegan):
        gagal.append(f"{rel}: {w} kode warna, {f} nama font, {z} ukuran huruf ditulis langsung → pakai token tema.ts (warna UI asli → bersama/ui-asli/<aplikasi>/)")
    for rel, (w, f, z) in sorted(lain):
        catat.append(f"{rel}: {w} warna, {f} font, {z} ukuran literal di komponen bersama (boleh, sebaiknya token)")

    for c in catat: print("  · " + c)
    for g in gagal: print("  X " + g)
    if gagal:
        print(f"GAGAL: {len(gagal)} butir sistem desain."); sys.exit(1)
    print("LULUS: gaya adegan hanya dari tema.ts.")


if __name__ == "__main__":
    main()
