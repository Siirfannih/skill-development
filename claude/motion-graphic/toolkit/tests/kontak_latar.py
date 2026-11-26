#!/usr/bin/env python3
"""Lembar kontak latar: v2 | patokan Irfan apa adanya | v3, plus perbandingan v3 dengan still Researchly. Dijalankan di PC (playwright):
  ~/work/mg-venv/bin/python toolkit/tests/kontak_latar.py <folder-keluar> [folder-still-referensi] [--v2 <folder toolkit v2>]
Keluaran: kontak-v2-vs-v3.png (baris: gelap f0, gelap f30, terang f0, terang f30, posisi core lain; kolom: v2, patokan, v3; contoh teks di tengah
dengan warna sesuai mode) dan, bila folder still ada, banding-*.png dari scripts/banding.py (v3 | ref), banding.txt (angka)."""
import subprocess, sys, tempfile
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from render_latar import Perender

MG = HERE.parents[1]
V2_COMMIT = "0f464576"
PATOKAN = (MG / "toolkit/latar/patokan-irfan.glsl").read_text()
UNI = {"dark": dict(u_baseColor=[.012, .020, .047], u_ambientColor=[.055, .145, .420], u_coreColor=[.145, .388, .922], u_grainAmount=.02),
       "light": dict(u_baseColor=[.973, .980, .988], u_ambientColor=[.820, .875, .980], u_coreColor=[.580, .720, .990], u_grainAmount=.02)}
FONT = next((p for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf") if Path(p).exists()), None)
W, H = 480, 270
BARIS = [  # (label, mode, frame, override core v3, override glow v2)
    ("gelap f0", "dark", 0, None, None),
    ("gelap f30", "dark", 30, None, None),
    ("terang f0", "light", 0, None, None),
    ("terang f30", "light", 30, None, None),
    ("core lain: kiri-bawah (gelap f30)", "dark", 30, {"core": {"x": -0.15, "y": 0.85, "radius": 1.0}},
     {"glow": {"x": -0.15, "y": 0.85, "r": 1.0, "strength": 0.95, "ratio": 0.45}, "dir": 215}),
]


def teks(img, mode):
    im = Image.fromarray(img); d = ImageDraw.Draw(im)
    f = ImageFont.truetype(FONT, 38) if FONT else None
    d.text((im.width / 2, im.height / 2), "Judul adegan", fill=(255, 255, 255) if mode == "dark" else (15, 23, 42), font=f, anchor="mm")
    return np.asarray(im)


def label(img, s):
    im = Image.new("RGB", (img.shape[1], img.shape[0] + 22), (24, 24, 28)); im.paste(Image.fromarray(img), (0, 22))
    ImageDraw.Draw(im).text((6, 4), s, fill=(235, 235, 235)); return np.asarray(im)


def main(out, stills=None, v2dir=None):
    out = Path(out); out.mkdir(parents=True, exist_ok=True)
    P = Perender(); tmp = tempfile.TemporaryDirectory()
    if not v2dir:
        repo = MG.parents[1]; v2dir = Path(tmp.name)
        ar = subprocess.run(["git", "-C", str(repo), "archive", V2_COMMIT, "claude/motion-graphic/toolkit"], capture_output=True, check=True)
        subprocess.run(["tar", "-x", "-C", str(v2dir)], input=ar.stdout, check=True); v2dir = v2dir / "claude/motion-graphic/toolkit"
    P2 = P.versi(v2dir)
    rows = []
    for lab, mode, fr, c3, g2 in BARIS:
        o = {"preset": "researchly-glow", "mode": mode}
        a = P2.lightwave({**o, **(g2 or {})}, fr, W, H)
        b = P.glsl(PATOKAN, UNI[mode], fr, W, H)
        c = P.lightwave({**o, **(c3 or {})}, fr, W, H)
        extra = " (patokan: posisi tetap)" if c3 else ""
        rows.append(np.concatenate([label(teks(x, mode), f"{n} | {lab}{extra if n == 'patokan' else ''}") for n, x in (("v2", a), ("patokan Irfan", b), ("v3", c))], 1))
    Image.fromarray(np.concatenate(rows, 0)).save(out / "kontak-v2-vs-v3.png")
    print("kontak:", out / "kontak-v2-vs-v3.png")
    if stills and Path(stills).exists():
        lap = []
        for nama, mode, ref in (("gelap-029", "dark", "still_029.00s.png"), ("terang-044", "light", "still_044.00s.png"), ("terang-078", "light", "still_078.00s.png")):
            png = out / f"frame-{nama}.png"; Image.fromarray(P.lightwave({"preset": "researchly-glow", "mode": mode}, 30, 1276, 720)).save(png)
            r = subprocess.run([sys.executable, str(MG / "scripts/banding.py"), str(png), str(Path(stills) / ref), "--out", str(out / f"banding-{nama}.png")], capture_output=True, text=True)
            lap.append(f"== v3 {nama} vs {ref} (exit {r.returncode})\n{r.stdout}{r.stderr}")
        (out / "banding.txt").write_text("\n".join(lap)); print("\n".join(lap))
    P2.tutup(); P.tutup(); tmp.cleanup()


if __name__ == "__main__":
    a = sys.argv[1:]; v2 = None
    if "--v2" in a: i = a.index("--v2"); v2 = a[i + 1]; del a[i:i + 2]
    main(*a[:2], v2dir=v2)
