"""v18 (Irfan 19:33): SFX must land WITH the object — not before it appears, not after — and not pile up.
For every cue in render/cues.json, look at the picture around it (cells of an 8×6 grid, so a small label counts) and
find the visual onset within ±MAXF frames: the frame where something starts to change (rise of frame difference).
  · cue near an onset  → shift so the sound starts on it (align='end' cues: so they land on it)
  · no onset nearby    → the sound follows nothing on screen → dropped
Then thin collisions: at most 2 cues inside any 100 ms, keeping the most important (low > ui > motion > texture), and
never two cues of the same family inside 100 ms.
Writes tools/cue_sync.json {key: shift_s | "drop"}; audio_build.py applies it.   Usage: sync_cues.py <silent.mp4>"""
import json, sys, subprocess, numpy as np

import os as _os
ROOT = _os.environ.get('MG_ROOT', '/home/claude/thegap'); FPS = 30; W, H = 256, 144; GX, GY = 8, 6; MAXF = 7
vid = sys.argv[1]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', vid, '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
d = np.abs(np.diff(fr, axis=0))                                     # d[i] = change from frame i to i+1
cell = d.reshape(len(d), GY, H // GY, GX, W // GX).mean((2, 4)).reshape(len(d), -1)
rise = np.maximum(0, cell[1:] - cell[:-1])                          # rise[i] at frame i+1
onset = np.concatenate([[0], rise.max(1)])                          # onset strength per frame index (change starting there)
thr = np.percentile(onset, 60) + 0.8
# the same global events tools/visual_coverage.py checks — a cue that covers one of them is never dropped
dg = d.mean((1, 2)); og = np.maximum(0, dg - np.concatenate([[0], dg[:-1]]))
tg = np.median(og) + 3 * np.median(np.abs(og - np.median(og))) + 0.6
GEV = [i + 1 for i in range(1, len(og) - 1) if og[i] > tg and og[i] >= og[i - 1] and og[i] >= og[i + 1]]
cues = json.load(open(f'{ROOT}/render/cues.json'))
FAM = {**{k: 'ui' for k in ('pop', 'click', 'tick', 'typing', 'latch', 'send', 'ding', 'ping', 'bloop', 'lens', 'shutter', 'thock', 'glitch')},
       **{k: 'motion' for k in ('whoosh', 'glide', 'swell', 'riser', 'shine', 'subwhoosh')}, 'scribble': 'texture',
       **{k: 'low' for k in ('thud', 'impact', 'boom')}}
PRI = {'low': 0, 'ui': 1, 'motion': 2, 'texture': 3}
out = {}; kept = []; shifts = []
for c in cues:
    key = f"{c['t']:.4f}|{c['kind']}"
    if c['kind'] in ('typing',) or c['visual'].startswith('FX neg'):   # continuous / designed hinge: keep as is
        kept.append((c['t'], c, key)); continue
    f0 = int(round(c['t'] * FPS)); a, b = max(1, f0 - MAXF), min(len(onset) - 1, f0 + MAXF)
    w = onset[a:b + 1]
    cand = [a + i for i in range(len(w)) if len(w) and w[i] >= max(thr, 0.7 * w.max())] + [g for g in GEV if a <= g <= b]
    if not cand:
        out[key] = 'drop'; continue
    fe = min(cand, key=lambda x: abs(x - f0))
    sh = (fe - f0) / FPS
    out[key] = round(sh, 4); shifts.append(fe - f0)
    kept.append((c['t'] + sh, c, key))
# collisions
kept.sort(key=lambda x: x[0]); final = []
for t, c, key in kept:
    fam = FAM.get(c['kind'], 'ui')
    near = [(t2, c2, k2) for t2, c2, k2 in final if abs(t2 - t) < 0.1]
    same = [n for n in near if FAM.get(n[1]['kind'], 'ui') == fam]
    if same or len(near) >= 2:
        worst = max(near + [(t, c, key)], key=lambda n: (PRI[FAM.get(n[1]['kind'], 'ui')], -n[1]['db']))
        # the survivor sits within 0.1 s, so the event stays covered either way
        if worst[2] == key:
            out[key] = 'drop'; continue
        final.remove(worst); out[worst[2]] = 'drop'
    final.append((t, c, key))
json.dump(out, open(f'{ROOT}/tools/cue_sync.json', 'w'), indent=0)
sh = np.array(shifts)
print(f'cues {len(cues)} → kept {len(final)}, dropped {sum(1 for v in out.values() if v == "drop")}')
print(f'shift (frames): median {np.median(np.abs(sh)):.1f}, |shift|>2f: {(np.abs(sh) > 2).sum()}, early (sound before object) {(sh > 2).sum()}, late {(sh < -2).sum()}')
for c in cues:
    k = f"{c['t']:.4f}|{c['kind']}"
    if out.get(k) == 'drop' and '--list' in sys.argv: print(f'   drop {c["t"]:6.2f}s {c["kind"]:9} {c["visual"][:60]}')
