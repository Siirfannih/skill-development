"""Does the sound last as long as the motion? (complements visual_coverage.py, which only checks onsets)

Two checks:
  1. --cues: every cue with an end point ("sampai") must have a sample at least as long as its span
     (length = (potong[1] - potong[0]) / rate). A cue whose sample ends > 0.08 s before the motion ends prints HABIS.
  2. video + SFX stem: segments of sustained motion (frame difference > --gerak for >= 8 frames) where the SFX stem
     is quiet (< -45 dBFS) for more than 40 % of the segment print SENYAP. Talking-head drift also shows up,
     so look at a contact sheet of the listed segments before adding sound; silence on cuts back to a face is intended.

Usage:
  python3 scripts/audio/sfx_span.py --video visual.mp4 --sfx stems/sfx.wav [--cues cues.json] [--gerak 4]
cues.json: list (or {"cues": [...]}) of {t_new|t, potong:[a,b], rate, sampai}
"""
import argparse, json, subprocess, numpy as np, librosa

ap = argparse.ArgumentParser()
ap.add_argument("--video"); ap.add_argument("--sfx"); ap.add_argument("--cues")
ap.add_argument("--fps", type=float, default=30000 / 1001); ap.add_argument("--gerak", type=float, default=4.0)
a = ap.parse_args()

if a.cues:
    d = json.load(open(a.cues)); L = d["cues"] if isinstance(d, dict) else d
    print("== 1. sampel vs span cue")
    for x in L:
        t = x.get("t_new", x.get("t")); p = x.get("potong"); s = x.get("sampai")
        if not p or s is None: continue
        dur = (p[1] - p[0]) / x.get("rate", 1.0); kurang = (s - t) - dur
        if kurang > 0.08:
            print(f"  HABIS {t:6.2f}–{s:6.2f}  sampel {dur:.2f} dtk, kurang {kurang:.2f}  {x.get('peristiwa', x.get('peran', ''))}  {str(x.get('file', '')).split('/')[-1]}")

if a.video and a.sfx:
    W, H = 160, 90
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", a.video, "-vf", f"scale={W}:{H},format=gray", "-f", "rawvideo", "-"], capture_output=True).stdout
    f = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
    m = np.r_[0, np.abs(np.diff(f, axis=0)).mean((1, 2))]
    y, sr = librosa.load(a.sfx, sr=16000, mono=True); hop = sr / a.fps
    sd = np.array([20 * np.log10(np.sqrt(np.mean(y[int(i * hop):int((i + 1) * hop)] ** 2) + 1e-12)) for i in range(len(m))])
    print(f"== 2. gerak > {a.gerak} tanpa SFX (stem < −45 dBFS > 40 % segmen)")
    mov = m > a.gerak; i = 0
    while i < len(m):
        if not mov[i]: i += 1; continue
        j = i
        while j < len(m) and mov[j]: j += 1
        if j - i >= 8:
            q = float(np.mean(sd[i:j] < -45))
            if q > 0.4:
                print(f"  SENYAP {i / a.fps:6.2f}–{(j - 1) / a.fps:6.2f}  gerak {m[i:j].mean():5.1f}  senyap {q:.0%}")
        i = j
