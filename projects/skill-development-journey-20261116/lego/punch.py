#!/usr/bin/env python3
"""Punch-in di sambungan footage (audit ronde 2 V2; pola kartu 83): skala 1,00 -> 1,08 dalam 5 frame (heavy) yang puncaknya TEPAT di frame sambungan,
lalu mengendap 6 frame (land); motion blur zoom 2 frame di sekitar puncak. Dirender sebagai klip pendek lossless (FFV1) yang menggantikan 12 frame footage dasar,
karena compose.py tidak punya blur footage. Zoom dasar (z_base) ikut dibakar ke dalam klip supaya kamera tetap kontinu.
  punch.buat(j, zfn) -> path klip (cache lego/cache/punch_<j>_<hash>.mkv); zfn(t_detik) = zoom dasar (tanpa punch)."""
import hashlib, io, json, math, os, subprocess
import numpy as np
from PIL import Image

P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = 30000 / 1001
PRE, POST, AMP = 5, 6, 0.08


def bez(x1, y1, x2, y2):
    def f(p):
        lo, hi = 0.0, 1.0
        for _ in range(40):
            m = (lo + hi) / 2
            x = 3 * (1 - m) ** 2 * m * x1 + 3 * (1 - m) * m * m * x2 + m ** 3
            lo, hi = (m, hi) if x < p else (lo, m)
        m = (lo + hi) / 2
        return 3 * (1 - m) ** 2 * m * y1 + 3 * (1 - m) * m * m * y2 + m ** 3
    return f


HEAVY, LAND = bez(.75, 0, .18, 1), bez(.1, .75, .15, 1)


def faktor(n, j):
    """pengali zoom frame n untuk sambungan di frame j (1,0 di luar jendela [j-5, j+6])"""
    if j - PRE <= n <= j - 1: return 1 + AMP * HEAVY((n - (j - PRE - 1)) / PRE)
    if j <= n <= j + POST: return 1 + AMP * (1 - LAND((n - j) / POST))
    return 1.0


def jendela(j):
    return j - PRE, j + POST


def buat(j, zfn, src, edit_key=""):
    a, b = jendela(j)
    zs = [zfn((n) / F) * faktor(n, j) for n in range(a - 1, b + 1)]
    h = hashlib.sha1(json.dumps([j, [round(z, 5) for z in zs], edit_key, AMP]).encode()).hexdigest()[:8]
    out = os.path.join(P, "lego/cache", f"punch_{j}_{h}.mkv")
    if os.path.exists(out): return out
    r = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{a / F:.5f}", "-i", src, "-frames:v", str(b - a + 1), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True)
    W, H = 1920, 1080
    fr = np.frombuffer(r.stdout, np.uint8)
    assert fr.size >= (b - a + 1) * W * H * 3, f"frame wajah tidak cukup untuk punch {j}"
    enc = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", "30000/1001", "-i", "-", "-c:v", "ffv1", "-level", "3", out], stdin=subprocess.PIPE)
    for k, n in enumerate(range(a, b + 1)):
        im = Image.fromarray(fr[k * W * H * 3:(k + 1) * W * H * 3].reshape(H, W, 3))
        z = zs[k + 1]; zp = zs[k]
        dz = abs(z - zp) / 2
        if n in (j - 1, j): dz = max(dz, 0.035)          # motion blur 2 frame di puncak
        acc = np.zeros((H, W, 3), np.float32); K = 7
        for q in range(K):
            zq = z + dz * (2 * q / (K - 1) - 1)
            x0, y0 = (W - W / zq) * 0.5, (H - H / zq) * 0.45
            acc += np.asarray(im.resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + W / zq, y0 + H / zq)), np.float32)
        enc.stdin.write((acc / K).round().astype(np.uint8).tobytes())
    enc.stdin.close(); enc.wait()
    return out
