#!/usr/bin/env python3
"""Lompatan 1 frame (ronde 9 X3): master 96x54, selisih rata-rata antar frame berurutan; tandai frame yang selisihnya > 2,2x median 7 tetangga dan > 8 (gerak besar mendadak, bukan gerak halus).
Memaafkan jendela potongan (join CUT-MAP, batas dunia). Pakai: python3 lego/cek_lompat.py [master] [dari_dtk sampai_dtk]"""
import subprocess, sys, os
import numpy as np
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(P, "qc/master_gambar.mp4")
t0 = float(sys.argv[2]) if len(sys.argv) > 3 else 0.0; t1 = float(sys.argv[3]) if len(sys.argv) > 3 else 1e9
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-vf", "scale=96:54", "-f", "rawvideo", "-pix_fmt", "gray", "-"], capture_output=True).stdout
A = np.frombuffer(raw, np.uint8).reshape(-1, 54, 96).astype(np.int16)
d = np.abs(np.diff(A, axis=0)).mean(axis=(1, 2))
bad = []
for i in range(3, len(d) - 3):
    t = (i + 1) * 1001 / 30000
    if not (t0 <= t <= t1): continue
    nb = np.median(np.r_[d[i - 3:i], d[i + 1:i + 4]])
    if d[i] > 8 and d[i] > 2.2 * max(nb, 1.0): bad.append((i + 1, round(float(d[i]), 1), round(float(nb), 1)))
print(f"frame {len(A)} · lompatan: {len(bad)}", *[f"f{a} d={b} tetangga={c}" for a, b, c in bad])
