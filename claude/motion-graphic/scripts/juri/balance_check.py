#!/usr/bin/env python3
"""Juri keseimbangan visual per frame (Lantai C17). Dijalankan pada still SEBELUM render penuh.

Keseimbangan dinilai global per frame, bukan dari volume atau ukuran per objek: posisi objek, teks, dan visual dilihat
bersama di zoom 25 %, 50 %, dan normal. Contoh gagal: kartu kepala + kartu kunci + bingkai semua di kiri, kanan kosong.

Cara ukur (per still):
  - latar utama tidak ditimbang (kertas/wallpaper polos, atau footage penuh); yang ditimbang: teks (OCR, bobot ×3),
    objek di latar polos (bingkai, kartu, jendela), subjek footage penuh (kepadatan detail, setara total teks).
  - pusat berat (cx, cy) dan bagian bobot kiri/kanan, atas/bawah.
  - FAIL bila sisi horizontal yang lebih ringan < --min-side (default 0,30 = satu sisi membawa > 70 %),
    atau |cx − 0,5| > --max-offset (default 0,16). PERIKSA bila sisi vertikal lebih ringan < 0,22.
Keluaran lembar `balance_sheet.jpg` di folder still: tiap still pada 25 % dan 50 % dengan tanda pusat berat
(lihat dengan mata — angka hanya penapis; urutan baca dan hierarki dinilai manusia/juri di ukuran normal).

Pakai:  python3 balance_check.py <folder still | still.png ...> [--min-side 0.30] [--max-offset 0.16]
Exit 1 bila ada FAIL.
"""
import argparse, glob, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def weight_map(img, text_gain=8.0):
    """Bobot elemen di atas latar utama (latar = #primary, yang dibaca = teks/objek di atasnya).
    - latar polos (warna tepi dominan > 35 % frame): elemen = area yang berbeda dari latar, bobot = luas × kontras;
    - footage penuh: subjek = kepadatan detail di luar teks, total bobotnya = total bobot teks;
    - teks (OCR tesseract): bobot luas × text_gain di atas keduanya (mata membaca teks lebih dulu)."""
    import subprocess, tempfile
    W0, H0 = 192, 108
    small = img.convert("RGB").resize((W0, H0), Image.BILINEAR)
    a = np.asarray(small).astype(np.float32)
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    q = (border // 24).astype(int); code = q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2]
    keys, counts = np.unique(code, return_counts=True); bg = border[code == keys[np.argmax(counts)]].mean(0)
    dist = np.sqrt(((a - bg) ** 2).sum(-1)) / 441.0
    w = np.zeros((H0, W0), np.float32)
    flat = (dist < 0.08).mean() > 0.35
    obj = np.zeros((H0, W0), np.float32)
    if flat:
        obj += (dist > 0.12) * dist
    with tempfile.NamedTemporaryFile(suffix=".png") as tf:
        img.convert("RGB").save(tf.name)
        out = subprocess.run(["tesseract", tf.name, "-", "--psm", "11", "tsv"], capture_output=True, text=True).stdout
    sx, sy = W0 / img.width, H0 / img.height
    for line in out.splitlines()[1:]:
        c = line.split("\t")
        if len(c) < 12 or not c[11].strip() or float(c[10]) < 50 or len(c[11].strip()) < 2: continue
        x, y, bw, bh = (int(v) for v in c[6:10])
        if bh < img.height * 0.012: continue  # teks UI mikro = tekstur, bukan bacaan
        w[int(y * sy):int((y + bh) * sy) + 1, int(x * sx):int((x + bw) * sx) + 1] += text_gain
    if not flat:
        # footage penuh: subjek = kepadatan detail (tepi); wajah crop ekstrem tidak terdeteksi Haar
        g = np.asarray(small.convert("L").filter(ImageFilter.FIND_EDGES)).astype(np.float32)
        obj += np.asarray(Image.fromarray(np.clip(g, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6))).astype(np.float32)
    # massa visual (objek/subjek di luar teks) disetarakan dengan massa teks: yang menentukan adalah SEBARANNYA
    obj[w > 0] = 0
    area = float((obj > obj.max() * 0.15).mean()) if obj.sum() > 0 else 0.0  # benda kecil (kursor) tetap ringan
    if obj.sum() > 0: w += obj / obj.sum() * max(w.sum(), 1.0) * min(1.0, max(area / 0.10, 0.05))
    if w.sum() <= 0: w += 1.0
    return w / w.sum()


def measure(w):
    h, wd = w.shape
    ys, xs = np.mgrid[0:h, 0:wd]
    cx, cy = (w * xs).sum() / wd, (w * ys).sum() / h
    left = w[:, : wd // 2].sum(); top = w[: h // 2].sum()
    return float(cx), float(cy), float(left), float(1 - left), float(top), float(1 - top)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="+")
    ap.add_argument("--min-side", type=float, default=0.30)
    ap.add_argument("--max-offset", type=float, default=0.16)
    a = ap.parse_args()
    files = []
    for p in a.paths:
        files += sorted(glob.glob(os.path.join(p, "*.png")) + glob.glob(os.path.join(p, "*.jpg"))) if os.path.isdir(p) else [p]
    files = [f for f in files if not os.path.basename(f).startswith(("balance_sheet", "sheet"))]
    rows, fails = [], 0
    for f in files:
        img = Image.open(f)
        cx, cy, L, R, T, B = measure(weight_map(img))
        side, vside = min(L, R), min(T, B)
        st = "FAIL" if (side < a.min_side or abs(cx - 0.5) > a.max_offset) else ("PERIKSA" if vside < 0.22 else "ok")
        fails += st == "FAIL"
        heavy = "kiri" if L > R else "kanan"
        print(f"{st:7s} {os.path.basename(f):28s} kiri {L:.2f} kanan {R:.2f} · atas {T:.2f} bawah {B:.2f} · pusat ({cx:.2f}, {cy:.2f})"
              + (f"  ← berat {heavy}" if st == "FAIL" else ""))
        rows.append((f, img, cx, cy, st))
    if rows:
        th = []
        for f, img, cx, cy, st in rows:
            tiles = []
            for s in (0.25, 0.5):
                t = img.convert("RGB").resize((int(1920 * s * 0.5), int(1080 * s * 0.5)))
                d = ImageDraw.Draw(t); W, H = t.size; x, y = cx * W, cy * H
                col = (230, 40, 40) if st == "FAIL" else (40, 180, 90)
                d.line([(x - 8, y), (x + 8, y)], fill=col, width=2); d.line([(x, y - 8), (x, y + 8)], fill=col, width=2)
                d.line([(W // 2, 0), (W // 2, H)], fill=(160, 160, 160), width=1)
                tiles.append(t)
            row = Image.new("RGB", (tiles[0].width + tiles[1].width + 10, tiles[1].height + 22), (24, 24, 24))
            row.paste(tiles[0], (0, 22)); row.paste(tiles[1], (tiles[0].width + 10, 22))
            ImageDraw.Draw(row).text((4, 4), f"{st} {os.path.basename(f)}", fill=(255, 220, 0))
            th.append(row)
        sheet = Image.new("RGB", (max(r.width for r in th), sum(r.height for r in th)), (24, 24, 24))
        yy = 0
        for r in th: sheet.paste(r, (0, yy)); yy += r.height
        out = os.path.join(os.path.dirname(files[0]), "balance_sheet.jpg"); sheet.save(out, quality=82)
        print(f"lembar 25 %/50 %: {out}")
    print("PASS" if not fails else f"FAIL: {fails} frame berat sebelah")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
