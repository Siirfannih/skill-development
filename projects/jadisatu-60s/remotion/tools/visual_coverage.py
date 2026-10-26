"""v16 (Irfan: every object, visual and text gets its own sound, no exceptions).
Finds visual events in the rendered picture (frame-difference onsets: something appears, moves off, cuts, lands)
and checks that a cue in render/cues.json sits within ±5 frames. Prints the uncovered events.
Usage: python3 tools/visual_coverage.py render/v16_silent.mp4"""
import json, sys, subprocess, numpy as np

vid = sys.argv[1]; FPS = 30; W, H = 192, 108
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', vid, '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
d = np.abs(np.diff(fr, axis=0)).mean((1, 2))            # motion energy per frame
on = np.maximum(0, d - np.concatenate([[0], d[:-1]]))   # rises = something starts happening
thr = np.median(on) + 3 * np.median(np.abs(on - np.median(on))) + 0.6
ev = [i + 1 for i in range(1, len(on) - 1) if on[i] > thr and on[i] >= on[i - 1] and on[i] >= on[i + 1]]
# merge events closer than 4 frames
merged = []
for e in ev:
    if not merged or e - merged[-1] > 4: merged.append(e)
cues = sorted(c['t'] * FPS for c in json.load(open('render/cues.json')))
cues = np.array(cues)
unc = [e for e in merged if not len(cues) or np.min(np.abs(cues - e)) > 5]
print(f'visual events: {len(merged)}, with a sound within ±5 f: {len(merged) - len(unc)} ({100 * (1 - len(unc) / max(1, len(merged))):.0f} %)')
for e in unc: print(f'  uncovered  {e / FPS:6.2f}s  frame {e}  strength {on[e - 1]:.1f}')
