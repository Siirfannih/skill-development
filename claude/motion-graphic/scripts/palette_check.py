"""QC palet: hitung keluarga warna aksen di sebuah render.
Gagal bila keluarga > 2, atau keluarga terbesar < 70 % piksel vivid (tidak ada warna dominan).

Pakai: python3 palette_check.py video.mp4 [--max 2]
Juga menerima gambar (.png/.jpg). Butuh ffmpeg, numpy, opencv-python.
"""
import sys, subprocess, tempfile, glob, numpy as np, cv2

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
print(f"keluarga dominan {dom}% (target >= 70%)")
sys.exit(1 if len(fams) > limit or dom < 70 else 0)
