"""ukur/palet.py — palet referensi untuk daftar jangan_dicuri: k-means Lab pada frame jendela (fps asli, tiap 3 frame).
Pakai: python ukur/palet.py video.mp4 --dari s --sampai s [--k 10]. Keluaran: hex + porsi piksel, urut porsi."""
import argparse, sys
from pathlib import Path
import numpy as np, cv2
sys.path.insert(0, str(Path(__file__).resolve().parent))
from kata_masuk import baca

def palet(frames, k=10):
    px = frames[::3].reshape(-1, 3)[::7]
    lab = cv2.cvtColor(px.reshape(-1, 1, 3), cv2.COLOR_BGR2LAB).reshape(-1, 3).astype(np.float32)
    _, lb, cen = cv2.kmeans(lab, k, None, (3, 30, 0.5), 3, cv2.KMEANS_PP_CENTERS)
    n = np.bincount(lb.ravel(), minlength=k) / len(lb); out = []
    for i in np.argsort(-n):
        b = cv2.cvtColor(cen[i].reshape(1, 1, 3).astype(np.uint8), cv2.COLOR_LAB2BGR)[0, 0]
        out.append((f"#{b[2]:02X}{b[1]:02X}{b[0]:02X}", float(n[i])))
    return out

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--dari", type=float, required=True); ap.add_argument("--sampai", type=float, required=True); ap.add_argument("--k", type=int, default=10)
    a = ap.parse_args()
    for h, n in palet(baca(a.video, a.dari, a.sampai), a.k): print(h, f"{n:.3f}")
