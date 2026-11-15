"""v7: teks hook (adegan 900 = montase 6 shot) -> posisi per frasa (frasa utuh, tidak dipecah per shot):
skor = sel terang (>0.55) maks + rata-rata di kotak teks + tumpang dengan orang (YOLO) pada shot yang dilewati frasa.
Batas: tidak terlalu tinggi (y >= 150), tidak mepet tepi (margin 96)."""
import json, cv2, numpy as np
W, H, M = 1920, 1080, 96
edl = json.load(open('edl6.json')); SH = [s for s in edl['shots'] if s.get('scene') == 900]
BM = json.load(open('broll_map6.json')); ph = json.load(open('phrases6.json'))
G = {}
for s in SH:
    cap = cv2.VideoCapture(f"remotion/public/media/shot_{s['id']:02d}.mp4"); n = int(cap.get(7)); G[s['id']] = []
    for i in np.linspace(0, n - 2, 4).astype(int):
        cap.set(1, int(i)); ok, f = cap.read()
        if ok: G[s['id']].append(cv2.resize(cv2.cvtColor(f, cv2.COLOR_BGR2GRAY), (W, H)).astype(float) / 255)
def cost(x, y, bw, bh, ids):
    lum = [(g[y:y + bh, x:x + bw] > 0.55).mean() for i in ids for g in G[i]]
    per = 0
    for i in ids:
        for p in BM[str(i)]['persons']:
            ix = max(0, min(x + bw, p[2]) - max(x, p[0])); iy = max(0, min(y + bh, p[3]) - max(y, p[1])); per += ix * iy / (bw * bh)
    return max(lum) + np.mean(lum) + per / len(ids)
prev = None
for c in ph:
    if c['shot'] != 900: continue
    ids = [s['id'] for s in SH if s['v0'] < c['end'] and s['v1'] > c['start']]
    bw = int(c['bw']) + 20; bh = int(c['size'] * 1.1 * len(c['lines'])) + 20
    best = min(((cost(x, y, bw, bh, ids) + (0.08 if prev and (x, y) != prev else 0), x, y)
                for x in range(M, W - M - bw + 1, 30) for y in range(150, H - M - bh + 1, 20)))
    c['x'], c['y'] = best[1], best[2]; c['side'] = 'L' if best[1] + bw / 2 < W / 2 else 'R'; prev = (best[1], best[2])
    print(f"hook {c['start']:.2f}-{c['end']:.2f} shot {ids} x={c['x']} y={c['y']} biaya={best[0]:.2f}", ' / '.join(' '.join(w['w'] for w in l) for l in c['lines']))
json.dump(ph, open('phrases6.json', 'w'), ensure_ascii=False, indent=1)
