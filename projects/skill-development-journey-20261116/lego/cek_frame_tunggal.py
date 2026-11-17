#!/usr/bin/env python3
"""Gerbang frame tunggal asing (audit ronde 6 V1/V4): satu atau dua frame master yang berbeda dari tetangga kiri DAN kanan, padahal
tetangga kiri dan kanan mirip satu sama lain (bocor lapisan, kedip, frame kosong di batas slot/transisi).
Menurunkan master ke 96x54 abu-abu; untuk blok 1 atau 2 frame: jarak(prev, next) kecil dibanding jarak(prev, blok) dan jarak(blok, next) -> tanda.
  python3 lego/cek_frame_tunggal.py [master.mp4]   -> exit 1 bila ada tanda (0 frame tunggal asing = lulus)"""
import subprocess, sys, os
import numpy as np
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(P, "qc/master_gambar.mp4")
W, H = 96, 54
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-vf", f"scale={W}:{H}:flags=area,format=gray", "-f", "rawvideo", "-"], capture_output=True).stdout
a = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
n = len(a)
d = lambda i, j: float(np.abs(a[i] - a[j]).mean())
bad = []
for i in range(1, n - 2):
    for k in (1, 2):                                   # blok k frame
        if i + k >= n: continue
        p, q = i - 1, i + k
        dpq = d(p, q); dpi = d(p, i); dqi = d(i + k - 1, q)
        if min(dpi, dqi) > 4.0 and dpq < 0.35 * min(dpi, dqi):
            bad.append((i, k, dpq, dpi, dqi))
# gabung tanda berurutan
out = []
for b in bad:
    if out and b[0] <= out[-1][0] + 2 and b[1] == out[-1][1]: continue
    out.append(b)
for i, k, dpq, dpi, dqi in out:
    print(f"  f{i}{'-' + str(i + k - 1) if k > 1 else ''} ({i * 1001 / 30000:.2f} dtk)  prev~next {dpq:.1f} · prev~blok {dpi:.1f} · blok~next {dqi:.1f}")
print(f"frame {n} · frame tunggal asing: {len(out)}")
sys.exit(1 if out else 0)
