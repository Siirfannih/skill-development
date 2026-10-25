#!/usr/bin/env python3
"""Kunci adegan yang sudah disetujui Irfan sebagai frame baseline, lalu gagalkan render yang mengubahnya.

Pakai:
  approve: simpan frame acuan satu adegan
    python3 baseline_lock.py approve render.mp4 S08 12.0,13.5,15.2 --dir locks --note "Irfan 25 Okt: S08 final"
  check: bandingkan render baru dengan semua adegan terkunci
    python3 baseline_lock.py check render_baru.mp4 --dir locks [--shift S08=+2.3] [--tol 0.5]
  unlock: lepas kunci (hanya atas perintah Irfan)
    python3 baseline_lock.py unlock S08 --dir locks --note "Irfan 26 Okt: ubah S08"

Waktu disimpan absolut. Kalau adegan bergeser karena adegan lain diubah, pakai --shift ADEGAN=+detik.
Butuh ffmpeg, Pillow, numpy. Kode keluar 1 bila ada adegan terkunci yang berubah.
"""
import argparse, datetime, json, os, subprocess, sys, tempfile

import numpy as np
from PIL import Image

W, H = 960, 540   # cukup untuk menangkap perubahan layout, ringan untuk disimpan
PIX_DELTA = 24    # beda nilai piksel (0–255) yang dianggap berubah; di bawah ini = noise encode


def grab(video, t, out):
    subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", video, "-frames:v", "1",
                    "-vf", f"scale={W}:{H}", "-y", out], check=True)


def load(path):
    return np.asarray(Image.open(path).convert("L"), dtype=np.int16)


def manifest_path(d):
    return os.path.join(d, "locks.json")


def read_manifest(d):
    p = manifest_path(d)
    return json.load(open(p)) if os.path.exists(p) else {"scenes": {}, "history": []}


def write_manifest(d, m):
    json.dump(m, open(manifest_path(d), "w"), indent=2, ensure_ascii=False)


def now():
    return datetime.datetime.now().isoformat(timespec="seconds")


def approve(a):
    os.makedirs(a.dir, exist_ok=True)
    m = read_manifest(a.dir)
    times = [float(x) for x in a.times.split(",")]
    frames = []
    for t in times:
        name = f"{a.scene}_{t:08.3f}.png"
        grab(a.video, t, os.path.join(a.dir, name))
        frames.append({"t": t, "file": name})
    m["scenes"][a.scene] = {"frames": frames, "source": os.path.basename(a.video), "approved_at": now(), "note": a.note}
    m["history"].append({"at": now(), "action": "approve", "scene": a.scene, "note": a.note})
    write_manifest(a.dir, m)
    print(f"KUNCI {a.scene}: {len(frames)} frame dari {os.path.basename(a.video)}")


def check(a):
    m = read_manifest(a.dir)
    shift = {}
    for s in a.shift or []:
        k, v = s.split("=")
        shift[k] = float(v)
    failed = []
    with tempfile.TemporaryDirectory() as tmp:
        for scene, info in sorted(m["scenes"].items()):
            worst = 0.0
            for fr in info["frames"]:
                t = fr["t"] + shift.get(scene, 0.0)
                out = os.path.join(tmp, "now.png")
                grab(a.video, t, out)
                base, cur = load(os.path.join(a.dir, fr["file"])), load(out)
                changed = float((np.abs(base - cur) > PIX_DELTA).mean() * 100)
                worst = max(worst, changed)
                if changed > a.tol:
                    failed.append((scene, t, changed))
            status = "PASS" if worst <= a.tol else "FAIL"
            print(f"{status} {scene}: perubahan terbesar {worst:.2f}% piksel (batas {a.tol}%)")
    if failed:
        print("\nAdegan terkunci berubah. Kembalikan, atau minta Irfan membuka kuncinya:")
        for scene, t, c in failed:
            print(f"  {scene} @ {t:.2f} dtk: {c:.2f}%")
        sys.exit(1)


def unlock(a):
    m = read_manifest(a.dir)
    if a.scene not in m["scenes"]:
        sys.exit(f"{a.scene} tidak terkunci")
    info = m["scenes"].pop(a.scene)
    m["history"].append({"at": now(), "action": "unlock", "scene": a.scene, "note": a.note, "was": info["approved_at"]})
    write_manifest(a.dir, m)
    print(f"LEPAS {a.scene} (frame acuan tetap disimpan di {a.dir} untuk riwayat)")


p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
sub = p.add_subparsers(dest="cmd", required=True)
s = sub.add_parser("approve"); s.add_argument("video"); s.add_argument("scene"); s.add_argument("times")
s.add_argument("--dir", default="locks"); s.add_argument("--note", required=True)
s = sub.add_parser("check"); s.add_argument("video"); s.add_argument("--dir", default="locks")
s.add_argument("--shift", action="append"); s.add_argument("--tol", type=float, default=0.5)
s = sub.add_parser("unlock"); s.add_argument("scene"); s.add_argument("--dir", default="locks"); s.add_argument("--note", required=True)
a = p.parse_args()
{"approve": approve, "check": check, "unlock": unlock}[a.cmd](a)
