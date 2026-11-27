"""QC palet: hitung keluarga warna aksen di sebuah render.
Mencetak CATATAN bila keluarga > 2, atau keluarga terbesar < 70 % piksel vivid; keluar 0 (informasi, selera ada di mata).
Dengan --ketat (atau KETAT=1) catatan itu keluar 1. Masukan rusak tetap gagal.

Pakai: python3 palette_check.py video.mp4 [--max 2] [--ketat]
Juga menerima gambar (.png/.jpg). Butuh ffmpeg, numpy, opencv-python.
"""
import os, sys, subprocess, tempfile, glob, numpy as np, cv2

path = sys.argv[1]
limit = int(sys.argv[sys.argv.index("--max") + 1]) if "--max" in sys.argv else 2
with tempfile.TemporaryDirectory() as d:
    img = path.lower().endswith((".png", ".jpg", ".jpeg"))
    subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", "scale=270:-1" if img else "fps=2,scale=270:-1", f"{d}/%04d.png"], check=True)
    H = np.concatenate([cv2.cvtColor(cv2.imread(f), cv2.COLOR_BGR2HSV).reshape(-1, 3) for f in sorted(glob.glob(f"{d}/*.png"))]).astype(float)
h, s, v = H[:, 0] * 2, H[:, 1] / 255, H[:, 2] / 255
vivid = (s > 0.55) & (v > 0.55)
hist, _ = np.histogram(h[vivid], bins=36, range=(0, 360))
hist = hist / max(1, hist.sum())
fams, left = [], hist.copy()
while left.max() >= 0.05:  # ambil puncak hue, serap semua dalam +-30 derajat (melingkar)
    c = int(left.argmax()); idx = [(c + k) % 36 for k in range(-3, 4)]
    fams.append((c * 10, round(left[idx].sum() * 100))); left[idx] = 0
print(f"vivid {vivid.mean():.1%} | keluarga aksen {len(fams)}: " + ", ".join(f"~{a+5}° {p}%" for a, p in fams))
print("Catatan: warna kulit/lampu footage ikut terhitung di 0-60°; nilai ini sinyal, bukan vonis.")
dom = max([p for _, p in fams], default=100)
print(f"keluarga dominan {dom}% (acuan >= 70%)")
catatan = len(fams) > limit or dom < 70
if catatan: print(f"CATATAN: keluarga aksen {len(fams)} (acuan <= {limit}), dominan {dom}% (acuan >= 70%); putuskan dengan mata.")
sys.exit(1 if catatan and ("--ketat" in sys.argv or os.environ.get("KETAT") == "1") else 0)
