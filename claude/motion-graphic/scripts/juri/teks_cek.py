#!/usr/bin/env python3
"""Cek teks di still per beat (LANTAI A1-A4, A7): bukan subtitle film, tidak ganda, tidak menyentuh tepi.

Pakai:  python3 teks_cek.py <folder still> [--bawah 0.78] [--beruntun 3] [--tepi 0.03]
Butuh tesseract (`apt install tesseract-ocr`) untuk membaca kata. Yang ditandai:
  BAWAH   teks kecil sendirian di pita bawah (y > --bawah) pada >= --beruntun still berturut-turut  -> pola subtitle film
  GANDA   kata yang sama (>= 4 huruf) tampil di dua tempat dalam satu still                         -> dua lapisan teks
  TEPI    kata menyentuh tepi kiri/kanan/atas frame                                                  -> terpotong / tidak menyatu
  BARIS   satu blok teks lebih dari 2 baris
OCR pada frame video tidak sempurna: setiap tanda disertai nama still untuk dicek mata.
Keluar 0 = tidak ada tanda, 1 = ada tanda (perbaiki atau tulis alasannya di qc/JURI.md), 2 = tesseract tidak ada.
"""
import argparse, csv, io, os, shutil, subprocess, sys
from collections import defaultdict
from PIL import Image

def words(path):
    im = Image.open(path); W, H = im.size
    tsv = subprocess.run(["tesseract", path, "-", "--psm", "11", "-l", "eng", "tsv"], capture_output=True, text=True).stdout
    out = []
    for r in csv.DictReader(io.StringIO(tsv), delimiter="\t", quoting=csv.QUOTE_NONE):
        try: conf = float(r["conf"])
        except (ValueError, KeyError, TypeError): continue
        t = (r.get("text") or "").strip()
        if conf < 70 or len(t) < 3 or not any(ch.isalpha() for ch in t): continue
        x, y, w, h = (int(r[k]) for k in ("left", "top", "width", "height"))
        if h < 0.012 * H: continue  # huruf UI sangat kecil di dalam screenshot: bukan teks layar
        out.append(dict(t=t, x=x / W, y=y / H, w=w / W, h=h / H, blk=(r["block_num"], r["par_num"]), line=r["line_num"]))
    return out

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder"); ap.add_argument("--bawah", type=float, default=0.78)
    ap.add_argument("--beruntun", type=int, default=3); ap.add_argument("--tepi", type=float, default=0.03)
    a = ap.parse_args()
    if not shutil.which("tesseract"):
        print("tesseract tidak terpasang: sudo apt install tesseract-ocr. Cek ini dilewati, nilai dengan mata."); sys.exit(2)
    files = sorted(f for f in os.listdir(a.folder) if f.lower().endswith((".png", ".jpg", ".jpeg")))
    if not files: print(f"GAGAL: tidak ada still di {a.folder}"); sys.exit(1)
    tanda, run = [], []
    for f in files:
        ws = words(os.path.join(a.folder, f))
        if not ws: run = []; continue
        hmax = max(w["h"] for w in ws)
        low = [w for w in ws if w["y"] > a.bawah]
        # pola subtitle: di pita bawah ada baris berhuruf kecil (bukan komposisi utama), atau semua teks ada di pita bawah
        sub = low and (any(w["h"] < 0.5 * hmax for w in low) or len(low) == len(ws))
        run = run + [f] if sub else []
        if len(run) == a.beruntun: tanda.append(("BAWAH", f"{run[0]} … {run[-1]}", "teks pita bawah " + " ".join(w["t"] for w in low)[:50]))
        elif len(run) > a.beruntun: tanda[-1] = ("BAWAH", f"{tanda[-1][1].split(' … ')[0]} … {f}", tanda[-1][2])
        pos = defaultdict(list)
        for w in ws:
            k = "".join(ch for ch in w["t"].lower() if ch.isalpha())
            if len(k) >= 4: pos[k].append(w)
        for k, lst in pos.items():
            if len(lst) > 1 and max(abs(p["y"] - q["y"]) for p in lst for q in lst) > 0.08:
                tanda.append(("GANDA", f, f"kata '{k}' tampil di y " + ", ".join(f"{p['y']:.0%}" for p in lst)))
        for w in ws:
            if w["h"] >= 0.6 * hmax and (w["x"] < a.tepi or w["x"] + w["w"] > 1 - a.tepi or w["y"] < a.tepi):
                tanda.append(("TEPI", f, f"'{w['t']}' menyentuh tepi (x {w['x']:.0%}–{w['x'] + w['w']:.0%}, y {w['y']:.0%})")); break
        nl = defaultdict(set)
        for w in ws: nl[w["blk"]].add(w["line"])
        if any(len(v) > 2 for v in nl.values()): tanda.append(("BARIS", f, "satu blok teks > 2 baris"))
    print(f"still dicek: {len(files)}")
    for t in tanda: print(f"  {t[0]:6} {t[1]:38} {t[2]}")
    print("TIDAK ADA TANDA" if not tanda else f"ADA {len(tanda)} TANDA: cek still-nya, perbaiki, atau tulis alasannya di qc/JURI.md")
    sys.exit(1 if tanda else 0)

if __name__ == "__main__":
    main()
