#!/usr/bin/env python3
"""Kontak sheet latar v2 + perbandingan dengan still Researchly. Dijalankan di PC (playwright):
  ~/work/mg-venv/bin/python toolkit/tests/kontak_latar.py <folder-keluar> [folder-still-referensi]
Keluaran: kontak-v2.png (gelap, terang, dasar navy, dua posisi glow, contoh teks di ruang negatif dengan kontras sesuai mode) dan,
bila folder still ada, banding-*.png dari scripts/banding.py (frame | ref) plus angka di banding.txt."""
import subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from render_latar import Perender

MG = HERE.parents[1]
FONT = next((p for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf") if Path(p).exists()), None)
W, H = 360, 640
PANEL = [  # (label, opsi, frame, posisi teks relatif)
    ("gelap f30", {"preset": "researchly-glow", "mode": "dark"}, 30, (0.5, 0.66)),
    ("gelap f60 (ekor bergeser)", {"preset": "researchly-glow", "mode": "dark"}, 60, (0.5, 0.66)),
    ("dasar navy (base)", {"preset": "researchly-glow", "mode": "dark", "base": "#0A1440"}, 30, (0.5, 0.66)),
    ("glow dari kiri", {"preset": "researchly-glow", "mode": "dark", "glow": {"x": -0.25, "y": 0.35, "r": 1.9, "strength": 0.95, "ratio": 0.45}, "glow2": {"x": 1.2, "y": 1.25, "r": 1.2, "strength": 0.4}, "dir": 160}, 30, (0.5, 0.82)),
    ("terang f30", {"preset": "researchly-glow", "mode": "light"}, 30, (0.5, 0.4)),
    ("terang hangat", {"preset": "hangat-netral", "mode": "light"}, 30, (0.5, 0.4)),
    ("terang editorial", {"preset": "editorial-polos", "mode": "light"}, 30, (0.5, 0.5)),
    ("terang glow bawah", {"preset": "researchly-glow", "mode": "light", "glow": {"x": 0.3, "y": 1.3, "r": 1.9, "strength": 0.95, "ratio": 0.45}, "glow2": None, "dir": 280}, 30, (0.5, 0.3)),
]


def teks(img, pos, gelap):
    im = Image.fromarray(img); d = ImageDraw.Draw(im)
    f = ImageFont.truetype(FONT, 34) if FONT else None
    d.text((pos[0] * im.width, pos[1] * im.height), "Adegan", fill=(255, 255, 255) if gelap else (15, 23, 42), font=f, anchor="mm")
    return np.asarray(im)


def main(out, stills=None):
    out = Path(out); out.mkdir(parents=True, exist_ok=True)
    P = Perender(); tiles = []
    for label, o, fr, pos in PANEL:
        img = P.lightwave({k: v for k, v in o.items() if v is not None}, fr, W, H)
        tiles.append(teks(img, pos, o.get("mode") == "dark"))
    Image.fromarray(np.concatenate([np.concatenate(tiles[:4], 1), np.concatenate(tiles[4:], 1)], 0)).save(out / "kontak-v2.png")
    print("kontak:", out / "kontak-v2.png", [p[0] for p in PANEL])
    if stills and Path(stills).exists():
        lap = []
        for nama, o, ref in (("gelap-029", {"preset": "researchly-glow", "mode": "dark"}, "still_029.00s.png"),
                             ("terang-044", {"preset": "researchly-glow", "mode": "light"}, "still_044.00s.png"),
                             ("terang-078", {"preset": "researchly-glow", "mode": "light"}, "still_078.00s.png")):
            png = out / f"frame-{nama}.png"; Image.fromarray(P.lightwave(o, 30, 1276, 720)).save(png)
            r = subprocess.run([sys.executable, str(MG / "scripts/banding.py"), str(png), str(Path(stills) / ref), "--out", str(out / f"banding-{nama}.png")], capture_output=True, text=True)
            lap.append(f"== {nama} vs {ref} (exit {r.returncode})\n{r.stdout}{r.stderr}")
        (out / "banding.txt").write_text("\n".join(lap)); print("\n".join(lap))
    P.tutup()


if __name__ == "__main__":
    main(*sys.argv[1:3])
