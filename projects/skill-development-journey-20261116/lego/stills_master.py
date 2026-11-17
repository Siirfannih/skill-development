#!/usr/bin/env python3
"""Still REVISI-2 dari qc/master_gambar.mp4 (frame nyata, 960 px) -> qc/still/revisi2/<label>.jpg. Label+waktu dari stills.py (r*) dan stills2.py (a–h, B11).
  python3 lego/stills_master.py"""
import os, re, subprocess, sys
sys.argv = ["x"]
here = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, here)
P = os.path.dirname(here)
M = {}
for f in ("stills.py", "stills2.py"):
    src = open(os.path.join(here, f)).read().split("want =")[0]
    ns = {}; exec(src, ns); M.update(ns["M"])
out = os.path.join(P, "qc/still/revisi2"); os.makedirs(out, exist_ok=True)
for k, t in M.items():
    if not re.match(r"(r\d\d_|[a-h]_|b11_)", k) or k.startswith("r10_edit") or k == "r10_gimana": continue      # r10_edit*/gimana = jendela slot Blender (bukan karya builder)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", os.path.join(P, "qc/master_gambar.mp4"), "-frames:v", "1", "-vf", "scale=960:-2", "-q:v", "3", os.path.join(out, k + ".jpg")])
print(len(os.listdir(out)))
