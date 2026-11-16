#!/usr/bin/env python3
"""Draft lego skala 0,5 (960x540, tanpa audio, crf 28) dari lego/lego.json: rakitan ffmpeg yang SAMA dengan compose.py, hanya diperkecil di akhir.
Untuk menilai gerak/kamera dan untuk `audio_order.py lock visual` (render tanpa audio). Bukan render final.
  python3 lego/draft.py [--rentang a b]   -> qc/draft_lego.mp4  (atau qc/draft_lego_a-b.mp4)"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.expanduser("~/work/skill-development/claude/motion-graphic/scripts/lego"))
import compose  # noqa: E402

P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEGO = os.path.join(P, "lego/lego.json")
L = json.load(open(LEGO)); L.pop("audio", None)
rng = None
if "--rentang" in sys.argv:
    i = sys.argv.index("--rentang"); rng = (float(sys.argv[i + 1]), float(sys.argv[i + 2]))
base = os.path.dirname(LEGO)
errs, total = compose.validate(L, base)
if errs: sys.exit("FAIL: " + "; ".join(errs[:5]))
cmd, out = compose.build_cmd(L, base, rng)
out = os.path.join(P, "qc", "draft_lego" + (f"_{rng[0]:g}-{rng[1]:g}" if rng else "") + ".mp4")
j = cmd.index("-filter_complex"); cmd[j + 1] = cmd[j + 1].replace("format=yuv420p,setparams", "scale=960:540:flags=bicubic,format=yuv420p,setparams")
cmd[cmd.index("-preset") + 1] = "veryfast"; cmd[cmd.index("-crf") + 1] = "28"; cmd[-1] = out
cmd = [c for c in cmd if c != "-stats"]
print("draft ->", out); r = subprocess.run(cmd)
if r.returncode: sys.exit(r.returncode)
d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], capture_output=True, text=True).stdout.strip())
print(f"{d:.2f} dtk (target {(rng[1]-rng[0]) if rng else total:.2f})")
