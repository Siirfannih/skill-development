"""v6: posisi kata kunci tunggal + sisi player tag + label bab -> remotion/src/kt6.json (frasa ada di phrases6.json).
Kata kunci: tampil sendirian (frasa sudah dipotong sebelum kata kunci mulai), warna padat, di bawah dagu/depan dada;
bila tidak muat, di sisi yang lebih lega setinggi kepala; ukuran mengecil sampai tidak menabrak wajah (min 110 px)."""
import json, numpy as np
from PIL import ImageFont
FPS = 30; W, H = 1920, 1080; M = 96
F = lambda z: ImageFont.truetype('remotion/public/fonts/SFPRODISPLAYBOLD.OTF', z)
heads = json.load(open('remotion/src/heads.json')); big = json.load(open('big6.json')); ct = json.load(open('chaptags6.json'))
ph = json.load(open('phrases6.json')); edl = json.load(open('edl6.json')); SH = edl['shots']
def heads_in(a, b):
    out = []
    for fr in range(round(a * FPS), round(b * FPS) + 1):
        for tr in heads.values():
            x0, x1 = round(tr['v0'] * FPS), round(tr['v1'] * FPS)
            if x0 <= fr < x1: out.append(tr['t'][min(len(tr['t']) - 1, fr - x0)])
    return out
def face_hit(cx, cy, bw, bh, hs):
    return sum(1 for hx, hy, r in hs if abs(cx - hx) < bw / 2 + 1.15 * r and abs(cy - hy) < bh / 2 + 1.25 * r)
# v8c: kata besar = rata tengah, lebar <= 55 % frame, setinggi dada (pusat frasa terdekat / bawah dagu), wajah = larangan mutlak
BM = json.load(open('broll_map6.json'))
def scr(s, f):
    if not s.get('talk'): return tuple(f)
    p = s.get('punch', 1.0) * 1.01; ox, oy = s.get('porigin', 1.0) * W, 0.45 * H
    return (ox + (f[0] - ox) * p, oy + (f[1] - oy) * p, f[2] * p)
def faces_in(a, b):
    return [tuple(h) for h in heads_in(a, b)] + [scr(s, f) for s in SH if s['v0'] < b and s['v1'] > a for f in BM.get(str(s['id']), {}).get('faces', [])]
def busy(cx, cy, bw, bh, a, b):
    v = 0.0
    for s in SH:
        if s['v0'] < b and s['v1'] > a and str(s['id']) in BM and 'busy' in BM[str(s['id'])]:
            g = np.array(BM[str(s['id'])]['busy']); gx0, gx1 = int(max(0, (cx - bw / 2) / 60)), int(min(31, (cx + bw / 2) / 60))
            gy0, gy1 = int(max(0, (cy - bh / 2) / 60)), int(min(17, (cy + bh / 2) / 60)); v = max(v, float(g[gy0:gy1 + 1, gx0:gx1 + 1].mean()))
    return v
def hitc(cx, cy, bw, bh, fs): return sum(1 for fx, fy, fr in fs if abs(fx - cx) < bw / 2 + fr and abs(fy - cy) < bh / 2 + fr)
for d in big:
    d['color'] = '#F7922E' if d['hero'] else '#FFFFFF'
    z = d.get('size') or (200 if d['hero'] else 160)
    while z > 110 and F(z).getlength(d['text']) > 0.55 * W: z -= 4
    fs = faces_in(d['start'], d['end']); hs = heads_in(d['start'], d['end'])
    near = min(ph, key=lambda c: min(abs(c['start'] - d['start']), abs(c['end'] - d['start'])))
    tgt = near['y'] + near.get('size', 64) * 1.1 * len(near['lines']) / 2
    if hs:
        r = sorted(h[2] for h in hs)[len(hs) // 2]; hy = sorted(h[1] for h in hs)[len(hs) // 2]; tgt = max(tgt, hy + 1.55 * r)
    tgt = min(max(tgt, 0.40 * H), 0.80 * H)
    best = None
    # v9: pita fokus 40-80 % di semua geseran x; kalau penuh, perkecil dulu (s.d. 110); baru di luar pita sebagai jalan terakhir
    for allow_out in (False, True):
        zz = z
        while best is None:
            bw = F(zz).getlength(d['text']); bh = zz * 1.05
            for dx in [0, 120, -120, 240, -240, 360, -360, 480, -480]:
                cx = W / 2 + dx
                if cx - bw / 2 < 70 or cx + bw / 2 > W - 70: continue
                ys = [y for y in range(int(110 + bh / 2), int(H - 60 - bh / 2) + 1, 8) if hitc(cx, y, bw, bh, fs) == 0]
                pool = ys if allow_out else [y for y in ys if 0.40 * H <= y <= 0.80 * H]
                if pool: best = (cx, min(pool, key=lambda y: 3.0 * abs(y - tgt) / H + 1.5 * busy(cx, y, bw, bh, d['start'], d['end']))); break
            if best is None:
                if zz <= 110: break
                zz -= 10
        if best: z = zz; break
    if best is None: best = (W / 2, tgt)
    d['size'] = z; d['cx'], d['cy'] = round(best[0]), round(best[1])
    print(f"[BESAR] {d['text']:14s} {d['start']:6.2f}-{d['end']:6.2f} size={z} pos=({d['cx']},{d['cy']}) target_y={tgt:.0f} tabrak_wajah={hitc(best[0], best[1], F(z).getlength(d['text']), z * 1.05, fs)}/{len(fs)}")
# v10f (Sonnet: 'juga' sebelum 'lebih pinter.' tidak pernah terbaca): kata frasa yang terucap < 0,22 dtk sebelum kata kunci
# tetap tampil 0,22 dtk; kata kunci digeser maju sedikit
for d in big:
    for c in ph:
        if c['start'] < d['start'] < c['end'] + 0.05:
            lw = max([w['t'] for l in c['lines'] for w in l if w['t'] < d['start']], default=None)
            if lw is not None and d['start'] - lw < 0.22:
                sh = round(lw + 0.22 - d['start'], 3); d['start'] = round(d['start'] + sh, 3); d['end'] = round(d['end'] + sh, 3)
                c['end'] = max(c['end'], round(d['start'] - 0.03, 3))
                print('kata kunci digeser', d['text'], sh)
# kata kunci tampil minimal 0,6 dtk: frasa berikutnya muncul sesudahnya (kata yang sudah terucap langsung tampil)
for d in big:
    if d['end'] - d['start'] < 0.6:
        d['end'] = round(d['start'] + 0.6, 3)
        for c in ph:
            if d['start'] < c['start'] < d['end'] + 0.03: c['start'] = round(d['end'] + 0.03, 3)
# frasa berhenti sebelum kata kunci mulai (satu fokus per momen)
for c in ph:
    for d in big:
        if c['start'] < d['start'] < c['end']: c['end'] = round(d['start'] - 0.03, 3)
json.dump(ph, open('remotion/src/phrases6.json', 'w'), ensure_ascii=False, indent=1)
# player tag: sisi berseberangan dengan frasa adegan itu
side_of = {c['shot']: c['side'] for c in ph}
for g in ct['tags']: g['side'] = side_of.get(g['scene'], 'R')
# v8g (Irfan 15 Nov: tag guru naik-turun / keluar frame / menabrak label bab -> statis atau hapus):
# satu posisi per adegan; kotak tag tidak boleh menyentuh wajah mana pun selama adegan, label bab, atau tepi frame (96 px).
FT = ImageFont.truetype('remotion/public/fonts/SFPRODISPLAYBOLD.OTF', 28)
chap_at = lambda t: next((c for c in ct['chapters'] if c['start'] <= t < c['end']), None)
for sc in sorted({g['scene'] for g in ct['tags']}):
    gs = [g for g in ct['tags'] if g['scene'] == sc]; a, b = min(g['start'] for g in gs), max(g['end'] for g in gs)
    hs = heads_in(a, b); fs = hs + [tuple(f) for s in SH if s['v0'] < b and s['v1'] > a for f in BM.get(str(s['id']), {}).get('faces', [])]
    TW, TH = FT.getlength(gs[0]['label']) + 50, 92
    ch = chap_at((a + b) / 2); bars = []
    if ch: bw_ = F(36).getlength(ch['title']) * 1.03 + 40; bars.append((W - 64 - bw_, 40, W - 40, 58 + 60))
    hx = float(np.median([h[0] for h in hs])); hy = float(np.median([h[1] for h in hs])); r = float(np.median([h[2] for h in hs]))
    def ok(x, y):   # (x, y) = tengah-bawah kotak tag
        x0, x1, y0, y1 = x - TW / 2, x + TW / 2, y - TH, y
        if x0 < 96 or x1 > W - 96 or y0 < 60 or y1 > H - 96: return False
        if any(x0 < fx + 1.1 * fr and fx - 1.1 * fr < x1 and y0 < fy + 1.25 * fr and fy - 1.25 * fr < y1 for fx, fy, fr in fs): return False
        return not any(x0 < bx1 and bx0 < x1 and y0 < by1 and by0 < y1 for bx0, by0, bx1, by1 in bars)
    cands = [(abs(x - hx) / W + abs(y - (hy - 1.3 * r)) / H, x, y) for x in range(96, W - 96, 16) for y in range(160, H - 96, 12)]
    good = sorted(c for c in cands if ok(c[1], c[2]))
    for g in gs:
        if good: g['pos'] = [round(good[0][1]), round(good[0][2])]
        else: g['drop'] = True
    print('tag adegan', sc, gs[0]['label'], '->', ('statis %s' % (good[0][1:],)) if good else 'DIHAPUS (tak ada posisi stabil)')
ct['tags'] = [g for g in ct['tags'] if not g.get('drop')]
json.dump(dict(big=big, tags=ct['tags'], chapters=ct['chapters']), open('remotion/src/kt6.json', 'w'), ensure_ascii=False, indent=1)
print('tag:', sorted({(g['label'], g['scene'], g['side']) for g in ct['tags']}))
