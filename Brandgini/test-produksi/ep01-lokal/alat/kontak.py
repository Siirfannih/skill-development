#!/usr/bin/env python3
"""kontak.py (alat lokal ep01): contact sheet dari klip (draft atau render) pada fps tertentu di rentang detik. ADDENDUM-4 butir 1.
  kontak.py video.mp4 awal akhir fps kolom out.png [lebar_sel]"""
import sys, cv2, numpy as np
from PIL import Image, ImageDraw
v, a, b, fps, cols, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), int(sys.argv[5]), sys.argv[6]
w = int(sys.argv[7]) if len(sys.argv) > 7 else 180
c = cv2.VideoCapture(v); vf = c.get(cv2.CAP_PROP_FPS); H = c.get(cv2.CAP_PROP_FRAME_HEIGHT); W = c.get(cv2.CAP_PROP_FRAME_WIDTH)
h = int(w * H / W); ts = list(np.arange(a, b, 1 / fps)); rows = (len(ts) + cols - 1) // cols
S = Image.new("RGB", (cols * w, rows * h), (20, 20, 20))
for i, t in enumerate(ts):
    c.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * vf))); ok, f = c.read()
    if not ok: continue
    im = Image.fromarray(cv2.cvtColor(cv2.resize(f, (w, h)), cv2.COLOR_BGR2RGB)); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 40, 12], fill=(0, 0, 0)); d.text((2, 1), f"{t:.2f}", fill=(255, 255, 0)); S.paste(im, ((i % cols) * w, (i // cols) * h))
S.save(out); print(out, S.size)
