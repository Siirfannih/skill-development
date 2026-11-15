"""v6: mesin layout frasa dari v3/layout5.py (margin 96, tidak mepet atas, tanpa FORCE)."""
"""v5: satu posisi per ADEGAN (field scene: sub-shot wajah punch-in satu bite = satu adegan). Posisi teks v4: SATU posisi tetap per shot (semua teks di shot yang sama muncul di titik yang sama, tidak berpindah),
bebas tabrakan dengan kepala/badan tokoh di semua frame shot itu; sisi dijaga sama dengan shot sebelumnya bila muat.
Baris maks 460 px, maks 2 baris; teks dipecah di pergantian shot hanya bila kedua bagian >= 0,7 dtk."""
import json
from PIL import ImageFont
FPS = 30; W, H = 1920, 1080; LINE = 64 * 1.1; M = 96; MAXW = 460   # v6: margin 96 (Irfan 13 Nov)
_FF = {z: ImageFont.truetype('remotion/public/fonts/SFPRODISPLAYBOLD.OTF', z) for z in (50, 56, 64)}
def wl(ws, z=64): return sum(_FF[z].getlength(w['w']) + 0.24 * z for w in ws)
heads = json.load(open('remotion/src/heads.json')); kt = json.load(open('remotion/src/kt.json'))
edl = json.load(open('edl6.json')); SH = [s for s in edl['shots']]
VO = sorted(edl['vo'], key=lambda v: v['v'])
def spk_at(t): return next((v['clip'] for v in reversed(VO) if v['v'] <= t + 0.15), None)
def shot_of(t): return next(s for s in SH if s['v0'] <= t < s['v1'])
SCB = sorted({s['v0'] for i, s in enumerate(SH) if i == 0 or SH[i - 1]['scene'] != s['scene']})   # awal tiap adegan
def hits(x, y, bw, bh, hs):
    n = 0
    for hx, hy, r in hs:
        kx0, kx1, ky0 = hx - 1.15 * r - 15, hx + 1.15 * r + 15, hy - 1.3 * r - 15   # v7: teks boleh menempel (Irfan 14 Nov), tidak menyentuh rambut
        if x < kx1 and x + bw > kx0 and y + bh > ky0: n += 1
    return n
# 0) v6: lebar + ukuran frasa adaptif per adegan dari ruang kosong di samping kepala (close-up 0525/0399)
def scene_of(t): return shot_of(min(t, SH[-1]['v1'] - 0.01))['scene']
FIT = {}
for sc in {s['scene'] for s in SH}:
    hs = [p for s in SH if s['scene'] == sc for k, tr in heads.items() if int(k) == s['id'] for p in tr['t']]
    if not hs: FIT[sc] = (64, MAXW); continue
    hx = sorted(h[0] for h in hs)[len(hs) // 2]; r = sorted(h[2] for h in hs)[len(hs) // 2]
    free = max(hx - 1.35 * r - 30 - M, W - M - (hx + 1.35 * r + 30))
    FIT[sc] = (64, MAXW) if free >= 470 else (56, min(400, free)) if free >= 390 else (50, max(300, min(360, free)))
# v7: guru 0399 dikunci satu posisi di kiri; ruang kiri tersempit (C31, tepi kepala ~487 px) -> 56 pt, lebar 360
for s_ in SH:
    if s_.get('spk') == '0399': FIT[s_['scene']] = (56, 360)
# 1) bungkus ulang + pecah di pergantian shot (hanya bila kedua sisi cukup lama)
new = []
for c in kt:
    words = [w for l in c['lines'] for w in l]; end = c['end']
    groups = [[]]
    for w in words:
        if groups[-1]:
            a = groups[-1][0]['t']; cut = [v0 for v0 in SCB if a < v0 <= w['t'] + 0.05]
            if cut and cut[-1] - a >= 0.7 and end - cut[-1] >= 0.7: groups.append([])
        groups[-1].append(w)
    for g in groups:
        z, mw = FIT[scene_of(g[0]['t'] + 0.05)]
        lines = [[]]
        for w in g:
            if lines[-1] and wl(lines[-1] + [w], z) > mw: lines.append([])
            lines[-1].append(w)
        for j in range(0, len(lines), 2): new.append(dict(lines=lines[j:j + 2], start=lines[j][0]['t'] - 0.05, end_orig=end, size=z))
for i, c in enumerate(new):
    nxt = new[i + 1]['start'] if i + 1 < len(new) else 1e9
    c['end'] = round(min(nxt - 0.03, c['end_orig']), 3); c['start'] = round(c['start'], 3); del c['end_orig']
    c['bw'] = round(max(wl(l, c['size']) for l in c['lines']) * 1.03, 1)
    mid = c['start'] + (c['end'] - c['start']) * 0.5; c['shot'] = shot_of(min(mid, c['end'] - 0.05))['scene']
# 1b) gabungkan tampilan < 0,6 dtk ke tetangganya (tidak ada kata yang berkedip)
i = 0
while i < len(new):
    c = new[i]
    if c['end'] - c['start'] < 0.6 and len(new) > 1:
        ws = [w for l in c['lines'] for w in l]
        p = new[i - 1] if i > 0 else None; q = new[i + 1] if i + 1 < len(new) else None
        if p and wl(p['lines'][-1] + ws, p['size']) <= FIT[p['shot']][1] * 1.15:
            p['lines'][-1] += ws; p['end'] = c['end']; new.pop(i); continue
        if q and wl(ws + q['lines'][0], q['size']) <= FIT[q['shot']][1] * 1.15:
            q['lines'][0] = ws + q['lines'][0]; q['start'] = c['start']; new.pop(i); continue
        if p and len(p['lines']) < 2:
            p['lines'].append(ws); p['end'] = c['end']; new.pop(i); continue
        if p and len(p['lines']) == 2 and p['end'] >= c['start'] - 0.1:
            # v9: jalan terakhir (Irfan: 'AI,' berkedip 0,13 dtk): baris terakhir p pindah ke c -> dua baris seimbang
            mv = p['lines'].pop(); c['lines'] = [mv, ws]; c['start'] = round(mv[0]['t'] - 0.05, 3); p['end'] = round(c['start'] - 0.03, 3)
            i += 1; continue
    i += 1
for c in new:
    c['bw'] = round(max(wl(l, c['size']) for l in c['lines']) * 1.03, 1)
    mid = c['start'] + (c['end'] - c['start']) * 0.5; c['shot'] = shot_of(min(mid, c['end'] - 0.05))['scene']
# 1c) v6: frasa yang hanya mampir < 0,6 dtk di adegan sebelumnya dimulai di batas adegan (tidak pernah mampir di wajah lain)
for c in new:
    cut = [v0 for v0 in SCB if c['start'] < v0 < c['end'] - 0.6]
    # v10f: dari b-roll tanpa pembicara ke wajah penuturnya sendiri boleh menyeberang (reviewer: 'dan' telat 0,30 dtk di 81,0)
    # v10f: aturan ini hanya untuk teks yang mampir di WAJAH ORANG LAIN; dari wajah penutur sendiri / b-roll tanpa pembicara boleh menyeberang
    # (Sonnet: 'membuat' telat 0,52 dtk + layar kosong 0,5 dtk saat 0426 -> 0486 pengajar yang sama)
    s0 = shot_of(c['start'])
    if cut and not (s0.get('talk') and s0.get('spk') != spk_at(c['lines'][0][0]['t'])): cut = []
    if cut and cut[0] - c['start'] < 0.6: c['start'] = round(cut[0] + 0.02, 3)
    mid = c['start'] + (c['end'] - c['start']) * 0.5; c['shot'] = shot_of(min(mid, c['end'] - 0.05))['scene']
# 1d) v10f (reviewer: teks 'generasi penerus.' / 'di lingkungan ini.' / '10 per 10 deh.' mampir 0,1-0,2 dtk di shot orang lain):
# frasa berakhir tepat di potongan bila shot berikutnya bukan wajah penuturnya sendiri dan kata terakhirnya sudah diucapkan
for c in new:
    sp = spk_at(c['lines'][0][0]['t']); lw = c['lines'][-1][-1]['t']
    for s_ in SH:
        v0 = s_['v0']
        if c['start'] + 0.6 <= v0 < c['end'] and c['end'] - v0 <= 0.45 and lw + 0.3 < v0 and s_.get('spk') != sp:
            print('1d potong', round(c['start'], 2), round(c['end'], 2), '->', round(v0 - 0.01, 2), s_['clip']); c['end'] = round(v0 - 0.01, 3)
# 1e) v10f (reviewer: '10' muncul 0,1 dtk di atas guru sebelum potongan ke dua siswi): frasa yang mulai <= 0,25 dtk sebelum
# potongan ke wajah penuturnya sendiri dimulai di potongan itu
for c in new:
    sp = spk_at(c['lines'][0][0]['t'])
    for s_ in SH:
        if c['start'] < s_['v0'] <= c['start'] + 0.25 and s_.get('spk') == sp and s_.get('talk'):
            print('1e geser', round(c['start'], 2), '->', round(s_['v0'] + 0.01, 2), s_['clip']); c['start'] = round(s_['v0'] + 0.01, 3)
# 1f) v10f (Sonnet: 'karena', 'juga', 'ngatur' tidak pernah terbaca): kata terakhir yang tampil < 0,2 dtk sebelum frasa berikutnya
# pindah ke awal frasa berikutnya (bite sama, muat lebar) -> muncul tepat di waktunya bersama frasa baru
for i in range(len(new) - 1):
    p, q = new[i], new[i + 1]
    while q['start'] - p['end'] < 0.1 and sum(len(l) for l in p['lines']) > 1 and p['lines'][-1][-1]['t'] > p['end'] - 0.2 \
            and spk_at(p['lines'][0][0]['t']) == spk_at(q['lines'][0][0]['t']) and (len(q['lines']) == 1 or wl([p['lines'][-1][-1]] + q['lines'][0], q['size']) <= FIT[q['shot']][1] * 1.15):
        w = p['lines'][-1].pop()
        if not p['lines'][-1]: p['lines'].pop()
        if wl([w] + q['lines'][0], q['size']) <= FIT[q['shot']][1] * 1.15: q['lines'][0].insert(0, w)
        else: q['lines'].insert(0, [w])   # tidak muat -> baris sendiri di atas
        q['start'] = round(w['t'] - 0.05, 3); p['end'] = round(q['start'] - 0.03, 3)
        print('1f pindah', w['w'], w['t'])
# 1g) sisa: frasa satu kata < 0,3 dtk digabung ke frasa berikutnya (penutur sama); kata terakhir yang masih < 0,2 dtk -> frasa
# berikutnya mundur maks 0,15 dtk (masih di bawah ambang telat 0,25 dtk)
i = 0
while i < len(new) - 1:
    p, q = new[i], new[i + 1]
    pw = [w for l in p['lines'] for w in l]
    if len(pw) == 1 and p['end'] - p['start'] < 0.3 and spk_at(pw[0]['t']) == spk_at(q['lines'][0][0]['t']) and q['start'] - p['end'] < 0.15:
        if wl(pw + q['lines'][0], q['size']) <= FIT[q['shot']][1] * 1.15: q['lines'][0] = pw + q['lines'][0]
        elif len(q['lines']) == 1: q['lines'].insert(0, pw)
        else: i += 1; continue
        q['start'] = p['start']; new.pop(i); print('1g gabung', pw[0]['w']); continue
    lw = p['lines'][-1][-1]['t']
    if p['end'] - lw < 0.2:
        want = lw + 0.2
        if q['start'] - 0.03 < want and q['lines'][0][0]['t'] + 0.15 >= want + 0.03: q['start'] = round(want + 0.03, 3)
        p['end'] = round(min(q['start'] - 0.03, max(p['end'], want)), 3); print('1g tahan', p['lines'][-1][-1]['w'], round(p['end'] - lw, 2))
    i += 1
for c in new:
    c['bw'] = round(max(wl(l, c['size']) for l in c['lines']) * 1.03, 1)
    mid = c['start'] + (c['end'] - c['start']) * 0.5; c['shot'] = shot_of(min(mid, c['end'] - 0.05))['scene']
# 2) satu posisi per shot: ukur semua frame semua teks di shot itu
BM = json.load(open('broll_map6.json'))
def broll_cost(sid, x, y, bw, bh):
    """adegan b-roll: luas tumpang dengan kotak orang + sel terang (layar) -> makin kecil makin baik (semua shot di adegan itu)"""
    return sum(_bcost(str(s['id']), x, y, bw, bh) for s in SH if s['scene'] == sid)
def _bcost(k, x, y, bw, bh):
    m = BM.get(k)
    if not m: return 0
    cost = 0.0
    for x0, y0, x1, y1 in m['persons']:
        ix = max(0, min(x + bw, x1) - max(x, x0)); iy = max(0, min(y + bh, y1) - max(y, y0)); cost += ix * iy / (bw * bh)
    for j, row in enumerate(m['bright']):
        for i, v in enumerate(row):
            if v and x < (i + 1) * 120 and x + bw > i * 120 and y < (j + 1) * 120 and y + bh > j * 120: cost += 3
    return cost
# adegan b-roll yang punya layar proyektor terang di kanan (pelacak kepala tidak melihat layar): kunci ke dinding gelap kiri atas
FORCE_CLIP = {}
prev_side = None; pos = {}
# v7 (Irfan 14 Nov): teks menempel di samping kepala setinggi mata-mulut (contoh benar: detik 31-35, pengajar clay);
# satu posisi per PEMBICARA (guru 0399 terkunci di semua adegannya); grup 0531: teks di area baju, yang dihindari hanya wajah.
SPK_OF = {s['scene']: s.get('spk') for s in SH if s.get('talk')}
GROUP = {'0531'}
LOCKTOL = {'0399': 0.12}   # guru: posisi dikunci (Irfan 14 Nov); ujung C31 ia mendekat ke kiri -> toleransi serempet rambut
def face_hits(x, y, bw, bh, hs):
    return sum(1 for hx, hy, r in hs if x < hx + 1.05 * r and x + bw > hx - 1.05 * r and y < hy + 1.25 * r and y + bh > hy - 1.3 * r)
keys = {}
for sid in sorted({c['shot'] for c in new}):
    keys.setdefault(SPK_OF.get(sid) or f'b{sid}', []).append(sid)
for key, sids in keys.items():
    cs = [c for c in new if c['shot'] in sids]
    bw = max(c['bw'] for c in cs); bh = max(len(c['lines']) * c['size'] * 1.1 for c in cs)
    hs = []
    for c in cs:
        for fr in range(round(c['start'] * FPS), round(c['end'] * FPS) + 1):
            for t in heads.values():
                a, b = round(t['v0'] * FPS), round(t['v1'] * FPS)
                if a <= fr < b: hs.append(t['t'][min(len(t['t']) - 1, fr - a)])
    if not hs:                                 # b-roll: hindari orang + layar terang
        for sid in sids:
            g = []
            for gx in range(M, int(W - M - bw) + 1, 30):
                for gy in range(int(H * 0.18), int(H * 0.74 - bh) + 1, 20):
                    g.append((round(broll_cost(sid, gx, gy, bw, bh), 2), abs(gy + bh / 2 - H * 0.45) * 0.02 + gx * 0.001, 'R' if gx + bw / 2 > W / 2 else 'L', gx, gy))
            best = min(g); pos[sid] = best
            print(f"adegan {sid:2d} b-roll x={best[3]:5d} y={best[4]:4d} biaya={best[0]}")
        continue
    hx = sorted(h[0] for h in hs)[len(hs) // 2]; hy = sorted(h[1] for h in hs)[len(hs) // 2]; r = sorted(h[2] for h in hs)[len(hs) // 2]
    grp = key in GROUP; g = []
    for gx in range(M, int(W - M - bw) + 1, 12):
        for gy in range(int(H * 0.18), int(H * 0.86 - bh) + 1, 12):
            n = face_hits(gx, gy, bw, bh, hs) if grp else hits(gx, gy, bw, bh, hs)
            frac = n / len(hs)
            if frac > LOCKTOL.get(key, 0.03): continue
            if grp:   # area baju: di bawah dagu, dekat tengah grup
                d = abs(gy - (hy + 1.45 * r)) + 0.3 * abs(gx + bw / 2 - hx)
            else:     # samping kepala: tepi teks ~0,35 r dari tepi kepala, pusat teks setinggi mata-mulut
                edge = (hx + 1.15 * r + 0.35 * r) if gx + bw / 2 > hx else (hx - 1.15 * r - 0.35 * r - bw)
                d = abs(gx - edge) + 1.2 * abs(gy + bh / 2 - (hy + 0.15 * r))
            g.append((round(frac * 1000) + d, gx, gy))
    if not g:
        g = [(1e9, M, int(H * 0.3))]
    best = min(g); side = 'R' if best[1] + bw / 2 > hx else 'L'
    for sid in sids: pos[sid] = (0, 0, side, best[1], best[2])
    nh = (face_hits if grp else hits)(best[1], best[2], bw, bh, hs)
    print(f"pembicara {key}: adegan {sids} {side} x={best[1]:5d} y={best[2]:4d} tabrak={nh}/{len(hs)}")
for c in new:
    _, _, side, x, y = pos[c['shot']]; c['x'], c['y'], c['side'] = x, y, side
json.dump(new, open('phrases6.json', 'w'), ensure_ascii=False, indent=1)
short = [(c['start'], ' '.join(w['w'] for l in c['lines'] for w in l)) for c in new if c['end'] - c['start'] < 0.6]
print('tampilan < 0,6 dtk:', short)
