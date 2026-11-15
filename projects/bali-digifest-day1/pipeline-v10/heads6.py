"""v6: hanya shot wajah (talk); 0531 = siswa tengah (penanda grup). v5: skala layar ikut punch-in shot wajah (punch * push kecil). Lacak kepala tokoh utama tiap shot v4 (YOLOv8-pose) -> remotion/src/heads.json (posisi layar per frame).
Tanpa push-focus khusus: Main.tsx men-zoom dari tengah, jadi transform di sini juga dari tengah."""
import json, math, numpy as np, cv2
from ultralytics import YOLO
import os
from sig6 import sig
HC = 'cache/heads.json'; CACHE = json.load(open(HC)) if os.path.exists(HC) else {}   # v8e: jejak mentah per isi shot
edl = json.load(open('edl6.json')); FPS = 30; W, H = 1920, 1080
HINT = {'0531': (.50, .30)}   # selain ini: orang terbesar
STATIC = {'0462': (.32, .30, 110), '0470': (.32, .30, 110), '0466': (.55, .25, 110)}       # close-up tangan/HP: tidak ada wajah
m = YOLO('/home/irfan/work/yolov8s-pose.pt')
def head(kp, box):
    pts = [(x, y) for (x, y, c) in kp[:5] if c > 0.35]; x0, y0, x1, y1 = box; bw = x1 - x0
    if len(pts) >= 2:
        xs, ys = zip(*pts)
        eye = math.hypot(kp[1][0] - kp[2][0], kp[1][1] - kp[2][1]) if kp[1][2] > 0.35 and kp[2][2] > 0.35 else 0
        return float(np.mean(xs)), float(np.mean(ys)), max((max(xs) - min(xs)) * 0.7, eye * 1.8, bw * 0.08, 30)
    sh = [(x, y) for (x, y, c) in kp[5:7] if c > 0.35]
    if sh: xs, ys = zip(*sh); r = max(bw * 0.16, 30); return float(np.mean(xs)), float(np.mean(ys)) - 1.6 * r, r
    return (x0 + x1) / 2, y0 + 0.12 * (y1 - y0), max(bw * 0.16, 30)
out = {}
for s in edl['shots']:
    if not s.get('talk'): continue
    c = s['clip'][-4:]; n = round((s['v1'] - s['v0']) * FPS); tr = []
    key = f"{sig(s)}|{n}"
    if c in STATIC:
        tr = [(STATIC[c][0] * W, STATIC[c][1] * H, STATIC[c][2])] * n
    elif key in CACHE:
        tr = [tuple(p) for p in CACHE[key]]
    else:
        cap = cv2.VideoCapture(f"remotion/public/media/shot_{s['id']:02d}.mp4")
        hint = HINT.get(c); prev = (hint[0] * W, hint[1] * H) if hint else (W / 2, H / 2)
        for i in range(n):
            ok, fr = cap.read()
            if not ok: tr.append(tr[-1] if tr else (prev[0], prev[1], 60)); continue
            r = m(fr, verbose=False, imgsz=960)[0]; best = None
            if r.keypoints is not None and len(r.boxes):
                for kp, bx in zip(r.keypoints.data.cpu().numpy(), r.boxes.xyxy.cpu().numpy()):
                    hx, hy, hr = head(kp, bx); d = math.hypot(hx - prev[0], hy - prev[1])
                    if not hint: d = -((bx[2] - bx[0]) * (bx[3] - bx[1])) if (d < 0.3 * W or not tr) else 1e9
                    if best is None or d < best[0]: best = (d, hx, hy, hr)
            if best and (not hint or best[0] < (0.12 * W if tr else 0.2 * W)):
                prev = (best[1], best[2]); tr.append((best[1], best[2], best[3]))
            else: tr.append(tr[-1] if tr else (prev[0], prev[1], 60))
    if c not in STATIC: CACHE[key] = [list(map(float, p)) for p in tr]
    a = np.array(tr, float); k = 5
    pad = np.pad(a, ((k // 2, k // 2), (0, 0)), mode='edge'); a = np.array([pad[i:i + k].mean(0) for i in range(len(a))])
    res = []
    for i, (x, y, r) in enumerate(a):
        t = i / max(n, 1); e = (1 - math.cos(math.pi * t)) / 2
        if s.get('talk'): sc = s.get('punch', 1.0) * (1.0 + 0.02 * e)        # wajah: punch-in + dorong kecil
        else: sc = 1.0 + 0.05 * e if s['id'] % 2 == 1 else 1.05 - 0.05 * e
        ox, oy = (s.get('porigin', 1.0) * W, 0.45 * H) if s.get('talk') else (W / 2, H / 2)      # titik asal skala = Main.tsx
        res.append([round(ox + (x - ox) * sc, 1), round(oy + (y - oy) * sc, 1), round(r * sc, 1)])
    out[str(s['id'])] = dict(v0=s['v0'], v1=s['v1'], t=res)
    print(s['id'], c, s['note'][:28], 'mulai', res[0], 'akhir', res[-1], flush=True)
json.dump(out, open('remotion/src/heads.json', 'w')); json.dump(CACHE, open(HC, 'w'))
