"""QA frame per frame v9 (Irfan 15 Nov: "review frame per frame seperti yang aku lakukan").
Untuk SETIAP tampilan teks (frasa, kata besar, tag sekolah): 3 frame dari VIDEO FINAL (awal+0,2 / tengah / akhir-0,2 dtk).
Per frame: (1) wajah dideteksi ulang di frame render (YOLOv8-pose, semua orang) -> tabrakan dengan kotak teks;
(2) keramaian latar di kotak teks (kepadatan tepi Canny di luar huruf teks itu sendiri tidak bisa dipisah -> pakai cincin 24 px di sekeliling kotak);
(3) pusat teks di luar pita fokus 0,42-0,74 H. Keluaran: qa_frames9_<n>.jpg (semua frame, bertanda merah bila gagal) + daftar gagal."""
import json, sys, cv2, numpy as np, subprocess, os
from PIL import Image, ImageDraw, ImageFont
from ultralytics import YOLO
vid = sys.argv[1]; pre = sys.argv[2] if len(sys.argv) > 2 else 'qa_frames9'
W, H = 1920, 1080
FT = lambda z: ImageFont.truetype('remotion/public/fonts/SFPRODISPLAYBOLD.OTF', z)
ph = json.load(open('remotion/src/phrases6.json')); kt = json.load(open('remotion/src/kt6.json'))
items = []
for c in ph:
    bw = c['bw']; bh = c.get('size', 64) * 1.1 * len(c['lines']); x0 = c['x'] - bw / 2 if c.get('align') == 'c' else c['x']
    items.append(dict(kind='frasa', a=c['start'], b=c['end'], box=(x0, c['y'], x0 + bw, c['y'] + bh), txt=' / '.join(' '.join(w['w'] for w in l) for l in c['lines'])))
for d in kt['big']:
    bw = FT(d['size']).getlength(d['text']); bh = d['size'] * 1.05
    items.append(dict(kind='besar', a=d['start'], b=d['end'], box=(d['cx'] - bw / 2, d['cy'] - bh / 2, d['cx'] + bw / 2, d['cy'] + bh / 2), txt=d['text']))
seen = set()
for g in kt['tags']:
    if 'pos' not in g or g['scene'] in seen: continue
    seen.add(g['scene']); gs = [t for t in kt['tags'] if t['scene'] == g['scene']]
    tw = FT(28).getlength(g['label']) + 50; x, y = g['pos']
    items.append(dict(kind='tag', a=min(t['start'] for t in gs), b=max(t['end'] for t in gs), box=(x - tw / 2, y - 92, x + tw / 2, y), txt='TAG ' + g['label']))
items.sort(key=lambda i: i['a'])
m = YOLO('/home/irfan/work/yolov8s-pose.pt'); cap = cv2.VideoCapture(vid); fps = cap.get(cv2.CAP_PROP_FPS)
def frame(t):
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps))); ok, f = cap.read(); return f if ok else None
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)
rows = []; fails = []
for it in items:
    ts = [it['a'] + 0.2, (it['a'] + it['b']) / 2, it['b'] - 0.2] if it['b'] - it['a'] > 0.6 else [(it['a'] + it['b']) / 2]
    x0, y0, x1, y1 = it['box']; probs = set(); thumbs = []
    for t in ts:
        f = frame(t)
        if f is None: continue
        r = m(f, verbose=False, imgsz=960)[0]
        if r.keypoints is not None:
            for kp, cf in zip(r.keypoints.xy.cpu().numpy(), r.keypoints.conf.cpu().numpy()):
                vis = [kp[q] for q in range(5) if cf[q] > 0.35]
                if len(vis) < 2: continue
                fx, fy = np.mean([v[0] for v in vis]), np.mean([v[1] for v in vis]); span = max(abs(v[0] - fx) for v in vis)
                fr = max(1.5 * span, 14)
                if x0 - 0.6 * fr < fx < x1 + 0.6 * fr and y0 - 0.8 * fr < fy < y1 + 0.6 * fr: probs.add('WAJAH')
        g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY); ed = cv2.Canny(g, 80, 160)
        X0, Y0, X1, Y1 = [int(v) for v in (max(0, x0 - 24), max(0, y0 - 24), min(W, x1 + 24), min(H, y1 + 24))]
        ring = ed[Y0:Y1, X0:X1].astype(float); ring[int(y0) - Y0 + 4:int(y1) - Y0 - 4, int(x0) - X0 + 4:int(x1) - X0 - 4] = np.nan
        dens = np.nanmean(ring) / 255 if ring.size else 0
        if dens > 0.14: probs.add('LATAR RAMAI %.2f' % dens)
        th = cv2.resize(f, (480, 270)); thumbs.append((t, th))
    cyc = (y0 + y1) / 2
    if it['kind'] != 'tag' and not (0.36 * H <= cyc <= 0.84 * H): probs.add('JAUH DARI FOKUS y=%.0f' % cyc)
    rows.append((it, thumbs, sorted(probs)))
    if probs: fails.append((it, sorted(probs)))
per = 16; n = 0
for p in range(0, len(rows), per):
    chunk = rows[p:p + per]; S = Image.new('RGB', (480 * 3 + 360, 270 * len(chunk)), (20, 20, 20)); d = ImageDraw.Draw(S)
    for r, (it, thumbs, probs) in enumerate(chunk):
        for k, (t, th) in enumerate(thumbs):
            S.paste(Image.fromarray(cv2.cvtColor(th, cv2.COLOR_BGR2RGB)), (k * 480, r * 270))
            d.text((k * 480 + 6, r * 270 + 6), f'{t:.2f}s', fill='yellow', font=F)
        col = (255, 80, 80) if probs else (140, 220, 140)
        d.text((1450, r * 270 + 10), f"{it['kind']} {it['a']:.2f}-{it['b']:.2f}", fill='white', font=F)
        d.text((1450, r * 270 + 34), it['txt'][:34], fill='white', font=F)
        for j, pr in enumerate(probs): d.text((1450, r * 270 + 70 + j * 22), pr, fill=col, font=F)
        if not probs: d.text((1450, r * 270 + 70), 'OK', fill=col, font=F)
    n += 1; S.save(f'{pre}_{n}.jpg', quality=80)
print(f'{len(rows)} tampilan teks, {n} lembar; GAGAL: {len(fails)}')
for it, probs in fails: print(f"  {it['a']:6.2f} {it['kind']:5s} {it['txt'][:40]:40s} {', '.join(probs)}")
