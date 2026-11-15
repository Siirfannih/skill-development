"""v8c (Irfan 14 Nov): teks RATA TENGAH, satu titik fokus = setinggi DADA orang di frame, dan TIDAK PERNAH menutup wajah.
Urutan keputusan per frasa:
 1. kandidat posisi adegan (terkunci per adegan): pembicara -> tepat di bawah dagu; b-roll -> dada orang utama (bahu + 0,45 lebar bahu);
    pusat kotak dijepit 0,42-0,74 H;
 2. wajah = larangan mutlak: semua wajah selama frasa tampil (heads.json pembicara + wajah b-roll, 12 sampel/shot, termasuk orang kecil);
 3. bila posisi adegan kena wajah: y lain terdekat ke target di x tengah; lalu geser x (maks +-560 px); terakhir yang paling sedikit menyentuh.
Menulis ulang phrases6.json: x = pusat kotak, align='c'."""
import json, cv2, numpy as np
W, H, M = 1920, 1080, 96; FPS = 30; LO, HI = 0.40 * H, 0.80 * H   # v9: pita fokus 40-80 % (dada untuk shot 2 orang)
ph = json.load(open('phrases6.json')); edl = json.load(open('edl6.json')); SH = edl['shots']
heads = json.load(open('remotion/src/heads.json')); BM = json.load(open('broll_map6.json'))
def heads_in(a, b):
    out = []
    for fr in range(round(a * FPS), round(b * FPS) + 1, 2):
        for tr in heads.values():
            x0, x1 = round(tr['v0'] * FPS), round(tr['v1'] * FPS)
            if x0 <= fr < x1: out.append(tr['t'][min(len(tr['t']) - 1, fr - x0)])
    return out
def scr(s, f):
    # media -> layar: shot pembicara di-punch (Main.tsx: titik asal porigin*W, 0,45H; skala punch*(1..1,02))
    if not s.get('talk'): return tuple(f)
    p = s.get('punch', 1.0) * 1.01; ox, oy = s.get('porigin', 1.0) * W, 0.45 * H
    return (ox + (f[0] - ox) * p, oy + (f[1] - oy) * p, f[2] * p)
BACKS = {'d23/0642', 'd23/0640'}   # v10f: kamera di belakang penonton -> 'wajah' YOLO = belakang kepala (117 titik di 0642)
def faces_in(a, b):
    return [tuple(h) for h in heads_in(a, b)] + [scr(s, f) for s in SH if s['v0'] < b and s['v1'] > a for f in BM.get(str(s['id']), {}).get('faces', []) if s['clip'] not in BACKS]
def hits(x, y, bw, bh, fs, m=1.0):
    return sum(1 for fx, fy, fr in fs if x - bw / 2 - m * fr < fx < x + bw / 2 + m * fr and y - m * fr < fy < y + bh + m * fr)
G = {}
def grays(sid):
    if sid not in G:
        cap = cv2.VideoCapture(f"remotion/public/media/shot_{sid:02d}.mp4"); n = int(cap.get(7)); G[sid] = []
        for i in np.linspace(0, max(0, n - 2), 4).astype(int):
            cap.set(1, int(i)); ok, f = cap.read()
            if ok: G[sid].append(cv2.resize(cv2.cvtColor(f, cv2.COLOR_BGR2GRAY), (W, H)).astype(float) / 255)
    return G[sid]
def bright(x, y, bw, bh, ids):
    x0, y0 = int(max(0, x - bw / 2)), int(max(0, y)); v = [(g[y0:y0 + int(bh), x0:x0 + int(bw)] > 0.55).mean() for i in ids for g in grays(i)]
    return (max(v) + np.mean(v)) if v else 0
def busy(x, y, bw, bh, a, b):
    # rata-rata kepadatan tepi (grid 32x18) di kotak teks, maksimum atas shot yang tampil selama teks
    v = 0.0
    for s in SH:
        if s['v0'] < b and s['v1'] > a and str(s['id']) in BM and 'busy' in BM[str(s['id'])]:
            g = np.array(BM[str(s['id'])]['busy']); gx0, gx1 = int(max(0, (x - bw / 2) / 60)), int(min(31, (x + bw / 2) / 60))
            gy0, gy1 = int(max(0, y / 60)), int(min(17, (y + bh) / 60)); v = max(v, float(g[gy0:gy1 + 1, gx0:gx1 + 1].mean()))
    return v
TGT_OVR = {'d23/0640': 0.80, 'd23/0642': 0.80, 'd23/0653': 0.42}
scenes = {}
for c in ph: scenes.setdefault(c['shot'], []).append(c)
nbad = 0
for sc, cs in scenes.items():
    shots = [s for s in SH if s['scene'] == sc]; talk = any(s.get('talk') for s in shots)
    bh = max(int(c['size'] * 1.1 * len(c['lines'])) for c in cs); bw = max(c['bw'] for c in cs)
    a, b = min(c['start'] for c in cs), max(c['end'] for c in cs)
    if talk:
        hs = np.array(heads_in(a, b) or [[W / 2, H * 0.4, 100]])
        near = hs[np.abs(hs[:, 0] - W / 2) < bw / 2 + hs[:, 2]]; near = near if len(near) else hs
        tgt_top = float(np.percentile(near[:, 1] + 1.2 * near[:, 2], 95)); tgt = tgt_top + bh / 2; how = 'dada pembicara'
    else:
        pts = []
        for s in shots:
            ch = sorted(BM.get(str(s['id']), {}).get('chest', []), key=lambda q: -q[2])
            if ch: pts += [q[1] + 0.45 * q[2] for q in ch[:4] if q[2] >= 0.5 * ch[0][2]]
        tgt = float(np.median(pts)) if pts else H * 0.55; how = 'dada orang' if pts else 'tengah frame'
    # v10f (reviewer GPT 38,6 dtk): 0640 penonton bersiluet -> 'dada' jatuh di layar LED terang; teks putih ke kursi gelap
    for s in shots:
        if s['clip'] in TGT_OVR: tgt = TGT_OVR[s['clip']] * H; how = 'override ' + s['clip']
    tgt = min(max(tgt, LO), HI)
    for c in cs:
        bwc, bhc = c['bw'], int(c['size'] * 1.1 * len(c['lines']))
        fs = faces_in(c['start'], c['end']); ids = [s['id'] for s in SH if not s.get('talk') and s['v0'] < c['end'] and s['v1'] > c['start'] and s['clip'] != 'logo']
        ys = list(range(int(LO - bhc / 2), int(HI - bhc / 2) + 1, 8)) + list(range(110, int(H - 70 - bhc) + 1, 8))
        best = None
        band = [y for y in ys if LO <= y + bhc / 2 <= HI]
        # v9: (1) pita fokus dulu di semua geseran x, (2) baru di luar pita; latar ramai (tulisan banner) = biaya
        for pool in (band, ys):
            for dx in [0, 120, -120, 240, -240, 360, -360, 480, -480, 560, -560]:
                x = W / 2 + dx
                if x - bwc / 2 < 70 or x + bwc / 2 > W - 70: continue
                ok = [y for y in pool if hits(x, y, bwc, bhc, fs) == 0]
                if ok:
                    y = min(ok, key=lambda yy: 3.0 * abs(yy + bhc / 2 - tgt) / H + 0.6 * (yy + bhc / 2 < LO or yy + bhc / 2 > HI)
                            + 0.5 * bright(x, yy, bwc, bhc, ids) + 1.5 * busy(x, yy, bwc, bhc, c['start'], c['end']))
                    best = (x, y, 0); break
            if best: break
        if best is None:
            x = W / 2; y = min(ys, key=lambda yy: (hits(x, yy, bwc, bhc, fs), abs(yy + bhc / 2 - tgt))); best = (x, y, hits(x, y, bwc, bhc, fs)); nbad += 1
        c['x'], c['y'], c['align'] = round(best[0]), round(best[1]), 'c'
        print(f"{c['start']:6.2f} adegan {sc} ({how}, target {tgt:.0f}): x={c['x']} y={c['y']} pusat={c['y'] + bhc / 2:.0f} wajah={best[2]}/{len(fs)} | "
              + ' / '.join(' '.join(w['w'] for w in l) for l in c['lines']))
print('frasa tanpa posisi bebas wajah:', nbad)
json.dump(ph, open('phrases6.json', 'w'), ensure_ascii=False, indent=1)
