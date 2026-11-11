#!/usr/bin/env python3
"""Lembar sanding: still kita di kiri, frame kiblat di kanan, supaya selisihnya terlihat sebelum render penuh.

Pakai:  python3 sandingkan.py <folder still kita> <sheet kiblat atau folder frame kiblat> <keluaran.jpg>
Still diurutkan menurut nama file. Bila kiblat berupa satu contact sheet, sheet ditempel utuh di kanan.
"""
import os, sys
from PIL import Image, ImageDraw

def load_dir(d):
    fs = sorted(f for f in os.listdir(d) if f.lower().endswith((".png", ".jpg", ".jpeg")))
    return [(f, Image.open(os.path.join(d, f)).convert("RGB")) for f in fs]

def grid(items, cell_w, cols, label=True):
    if not items: return Image.new("RGB", (cell_w * cols, 60), (40, 0, 0))
    r = items[0][1].height / items[0][1].width; cell_h = int(cell_w * r)
    rows = (len(items) + cols - 1) // cols
    S = Image.new("RGB", (cols * cell_w, rows * cell_h), (18, 18, 18))
    for i, (name, im) in enumerate(items):
        t = im.resize((cell_w, cell_h)); d = ImageDraw.Draw(t)
        if label:
            d.rectangle([0, 0, min(cell_w, 8 + 7 * len(name)), 16], fill=(0, 0, 0)); d.text((4, 2), name, fill=(255, 255, 0))
        S.paste(t, ((i % cols) * cell_w, (i // cols) * cell_h))
    return S

def main():
    if len(sys.argv) != 4: print(__doc__); sys.exit(1)
    ours, ref, out = sys.argv[1:]
    a = load_dir(ours)
    if not a: print(f"GAGAL: tidak ada still di {ours}"); sys.exit(1)
    portrait = a[0][1].height > a[0][1].width
    L = grid(a, 270 if portrait else 420, 4 if portrait else 3)
    if os.path.isdir(ref): R = grid(load_dir(ref), 270 if portrait else 420, 4 if portrait else 3)
    else:
        R = Image.open(ref).convert("RGB"); R = R.resize((L.width, int(R.height * L.width / R.width)))
    H = max(L.height, R.height) + 34
    S = Image.new("RGB", (L.width + R.width + 12, H), (255, 255, 255)); d = ImageDraw.Draw(S)
    d.text((6, 10), f"KITA  ({len(a)} still: {ours})", fill=(0, 0, 0)); d.text((L.width + 18, 10), f"KIBLAT  ({ref})", fill=(0, 0, 0))
    S.paste(L, (0, 34)); S.paste(R, (L.width + 12, 34))
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True); S.save(out, quality=88)
    print(f"SANDING {out}  ({S.width}x{S.height}). Buka gambar ini, lalu isi qc/JURI.md per butir 'Cek kemiripan' di kartu kiblat.")

if __name__ == "__main__":
    main()
