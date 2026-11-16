#!/usr/bin/env python3
"""Seperti scripts/lego/lapisan.py (kunci cache + bundle yang sama) tetapi untuk lapisan layar penuh OPAQUE (dunia repo, app Claude, dua jendela):
H.264 crf 14 (yuv420p, 1920x1080) alih-alih ProRes 4444 supaya disk (±5 GB bebas) cukup; lapisan opaque tidak butuh alpha.
  python3 lego/lapisan_opaque.py <proyek> lego/lapisan_opaque.json [--hanya D_REPO]
Hasil: lego/cache/<kunci>.mp4 dan entri di lego/lapisan.lock.json (dipakai bangun.py)."""
import argparse, json, os, subprocess, sys
sys.path.insert(0, os.path.expanduser("~/work/skill-development/claude/motion-graphic/scripts/lego"))
import lapisan as LP  # noqa: E402

ap = argparse.ArgumentParser(); ap.add_argument("proyek"); ap.add_argument("lapisan"); ap.add_argument("--hanya", default=""); ap.add_argument("--fps", type=int, default=30)
a = ap.parse_args()
P = os.path.abspath(a.proyek)
stamp = str(os.path.getmtime(os.path.join(P, "qc", ".bundle_stamp")))
items = json.load(open(a.lapisan))
lock_p = os.path.join(P, "lego", "lapisan.lock.json")
lock = json.load(open(lock_p)) if os.path.exists(lock_p) else {}
only = set(filter(None, a.hanya.split(",")))
for it in items:
    out = os.path.join(P, "lego/cache", LP.key(stamp, it, a.fps) + ".mp4")
    lock[it["id"]] = os.path.relpath(out, P)
    if os.path.exists(out) or (only and it["id"] not in only): continue
    n = max(1, round(it["durasi"] * a.fps))
    cmd = ["npx", "remotion", "render", os.path.join(P, "qc/.bundle"), it["comp"], out, "--props", json.dumps(it["props"]), "--codec=h264", "--crf=14", "--pixel-format=yuv420p",
           "--image-format=jpeg", "--jpeg-quality=95", f"--frames=0-{n - 1}", "--concurrency=3", "--log=error"] + LP.gl_arg()
    r = subprocess.run(cmd, cwd=os.path.join(P, "remotion"), capture_output=True, text=True)
    print(("ok   " if r.returncode == 0 else "GAGAL ") + it["id"], (r.stderr or "")[-300:] if r.returncode else "")
json.dump(lock, open(lock_p, "w"), indent=1)
