"""v6: peta penghalang teks di shot b-roll (tanpa pembicara): kotak orang (YOLOv8) + sel terang (layar proyektor/jendela).
-> broll_map6.json {shot_id: {persons: [[x0,y0,x1,y1],...] gabungan sampel, bright: grid 16x9 (1 = terang)}}"""
import json, cv2, numpy as np
from ultralytics import YOLO
import os
from sig6 import sig
BC = 'cache/broll_map_v9b.json'; CACHE = json.load(open(BC)) if os.path.exists(BC) else {}   # v8e: peta per isi shot
edl = json.load(open('edl6.json')); W, H = 1920, 1080
m = YOLO('/home/irfan/work/yolov8s-pose.pt'); out = {}
for s in edl['shots']:
    if s['clip'] == 'logo': continue   # v9: shot pembicara juga (wajah orang kedua, mis. 0718)
    if sig(s) in CACHE: out[str(s['id'])] = CACHE[sig(s)]; print(s['id'], s['clip'], 'cache'); continue
    cap = cv2.VideoCapture(f"remotion/public/media/shot_{s['id']:02d}.mp4"); n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    boxes = []; chest = []; faces = []; bright = np.zeros((9, 16)); busy = np.zeros((18, 32))
    for i in np.linspace(0, max(0, n - 2), 12).astype(int):   # v8c: 12 sampel (orang bergerak)
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(i)); ok, fr = cap.read()
        if not ok: continue
        fr = cv2.resize(fr, (W, H))
        r = m(fr, verbose=False, imgsz=960)[0]
        kp = r.keypoints.xy.cpu().numpy() if r.keypoints is not None else []
        kc = r.keypoints.conf.cpu().numpy() if r.keypoints is not None and r.keypoints.conf is not None else []
        for j, (b, c) in enumerate(zip(r.boxes.xyxy.cpu().numpy(), r.boxes.conf.cpu().numpy())):
            if c > 0.35 and (b[2] - b[0]) * (b[3] - b[1]) > 0.004 * W * H: boxes.append([round(float(v)) for v in b])
            # v8c: wajah (keypoint 0-4) SEMUA orang, termasuk yang kecil/di latar: [x, y, r] -> larangan mutlak untuk teks
            if c > 0.3 and len(kc) > j:
                vis = [kp[j][q] for q in range(5) if kc[j][q] > 0.3]
                if vis:
                    vx, vy = np.mean([p[0] for p in vis]), np.mean([p[1] for p in vis])
                    sw = abs(kp[j][5][0] - kp[j][6][0]) if kc[j][5] > 0.3 and kc[j][6] > 0.3 else 0
                    span = max([abs(p[0] - vx) for p in vis] + [0])
                    rr = max(0.30 * sw, 1.6 * span, 0.10 * (b[2] - b[0]), 14)   # v9b: 0,45*bahu terlalu besar (r 330 px di close-up)
                    if vy < 0.96 * H: faces.append([round(float(vx)), round(float(vy)), round(float(rr))])   # titik di tepi bawah = salah deteksi
            # v8: titik dada dari bahu (keypoint 5, 6): [x tengah, y bahu, lebar bahu]
            if c > 0.35 and len(kc) > j and kc[j][5] > 0.4 and kc[j][6] > 0.4:
                (x5, y5), (x6, y6) = kp[j][5], kp[j][6]
                chest.append([round(float((x5 + x6) / 2)), round(float((y5 + y6) / 2)), round(float(abs(x5 - x6)))])
        g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
        bright = np.maximum(bright, cv2.resize(g, (16, 9), interpolation=cv2.INTER_AREA) > 0.72)
        ed = cv2.Canny((g * 255).astype(np.uint8), 80, 160).astype(np.float32) / 255      # v9: keramaian latar (tulisan banner, pola)
        busy = np.maximum(busy, cv2.resize(ed, (32, 18), interpolation=cv2.INTER_AREA))
    out[str(s['id'])] = dict(persons=boxes, chest=chest, faces=faces, bright=bright.astype(int).tolist(), busy=np.round(busy, 3).tolist(), talk=bool(s.get('talk'))); CACHE[sig(s)] = out[str(s['id'])]
    print(s['id'], s['clip'], 'orang', len(boxes), 'sel terang', int(bright.sum()))
json.dump(out, open('broll_map6.json', 'w')); json.dump(CACHE, open(BC, 'w'))
