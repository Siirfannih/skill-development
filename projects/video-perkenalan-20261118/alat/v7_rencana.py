# v7_rencana.py · rencana teks (teks.json format skill, Lantai A9a) + kamera (cam.json) untuk v7 (kiblat kartu 87 Zache).
# Blok disusun per makna (transkrip tanpa tanda baca → teks_plan.py memecah di tempat salah). Tiap blok ≤ 3 kata, ≤ 2 baris.
# Peran (satu peran satu gerak): R1 narasi T19 putih di depan badan · R2 kata kunci T30 kuning per huruf ayun + glow amber, depan
#   · R3 klaim T03 slam + getar, kapital di BELAKANG kepala (matte) · R6 hero T31 depth push, kapital belakang kepala (maks 2×).
# Posisi dihitung dari kotak kepala per frame (kerja/v7/kepala.json): 'atas' = di belakang kepala, kaki huruf tertutup rambut;
#   'dada' = di depan badan di bawah dagu; 'kiri'/'kanan' = samping kepala bila muat.
# Kamera: dorong (heavy 10 f) di tiap blok penekanan, tarik balik di sambungan take + flash; skala dibatasi supaya kotak kepala
#   tetap utuh di layar dengan margin 3 % (D-001: wajah tidak boleh ter-crop).
# Pakai: python3 alat/v7_rencana.py  → kerja/v7/teks.json, remotion/src/v7/rencana.json
import json, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS, W, H, N = 30, 1080, 1920, 1843
words = json.load(open(f'{R}/sumber/words_v6.json'))
kep = {int(k): v for k, v in json.load(open(f'{R}/kerja/v7/kepala.json')).items()}
rambut = {int(k): v for k, v in json.load(open(f'{R}/kerja/v7/rambut.json')).items()}  # puncak rambut asli dari matte (alat/rambut_v7.py)
on = [round(w['start'] * FPS) for w in words]; off = [round(w['end'] * FPS) for w in words]
UP = {'irfan': 'IRFAN', 'ulangi': 'ULANGI', 'palsu': 'PALSU', 'berbeda': 'BERBEDA', 'ai': 'AI', 'capcut': 'CapCut', 'adobe': 'Adobe',
      'premiere': 'Premiere', 'pro': 'Pro', 'after': 'After', 'effects': 'Effects'}
# (kata awal, kata akhir, peran, [baris: (a, b, gaya, lapis)], zona)   gaya: r1 r2 r3 r3n(negatif) r6
B = [
 (0, 1, 'R1', [(0, 1, 'r1', 'd')], 'kanan'),
 (2, 3, 'R3', [(2, 2, 'r3', 'b'), (3, 3, 'r1', 'd')], 'atas'),
 (4, 5, 'R2', [(4, 4, 'r1', 'd'), (5, 5, 'r2', 'd')], 'dada'),
 (6, 8, 'R6', [(6, 7, 'r1', 'd'), (8, 8, 'r6', 'b')], 'atas'),
 (9, 11, 'R1', [(9, 9, 'r1', 'd'), (10, 11, 'r1', 'd')], 'dada'),
 (12, 14, 'R1', [(12, 12, 'r1', 'd'), (13, 14, 'r1', 'd')], 'dada'),
 (15, 17, 'R1', [(15, 16, 'r1', 'd'), (17, 17, 'r1', 'd')], 'dada'),
 (18, 20, 'R1', [(18, 20, 'r1', 'd')], 'kiri'),
 (21, 22, 'R2', [(21, 21, 'r2', 'd'), (22, 22, 'r1', 'd')], 'dada'),
 (23, 23, 'R1', [(23, 23, 'r1', 'd')], 'kanan'),
 (24, 26, 'R3', [(24, 26, 'r3n', 'b')], 'atas'),
 (27, 29, 'R1', [(27, 29, 'r1', 'd')], 'dada'),
 (30, 32, 'R2', [(30, 31, 'r1', 'd'), (32, 32, 'r2', 'd')], 'dada'),
 (33, 35, 'R1', [(33, 34, 'r1', 'd'), (35, 35, 'r1', 'd')], 'dada'),
 (36, 38, 'R1', [(36, 38, 'r1', 'd')], 'dada'),
 (39, 40, 'R1', [(39, 39, 'r1', 'd'), (40, 40, 'r1', 'd')], 'dada'),
 (41, 42, 'R2', [(41, 41, 'r1', 'd'), (42, 42, 'r2', 'd')], 'dada'),
 (43, 45, 'R1', [(43, 45, 'r1', 'd')], 'dada'),
 (46, 48, 'R2', [(46, 46, 'r2', 'd'), (47, 48, 'r1', 'd')], 'dada'),
 (49, 50, 'R1', [(49, 50, 'r1', 'd')], 'kanan'),
 (51, 52, 'R2', [(51, 52, 'r2', 'd')], 'dada'),
 (53, 55, 'R1', [(53, 53, 'r1', 'd'), (54, 55, 'r1', 'd')], 'dada'),
 (56, 57, 'R1', [(56, 56, 'r1', 'd'), (57, 57, 'r1', 'd')], 'dada'),
 (58, 59, 'R2', [(58, 58, 'r1', 'd'), (59, 59, 'r2', 'd')], 'dada'),
 (60, 62, 'R1', [(60, 62, 'r1', 'd')], 'dada'),
 (63, 65, 'R2', [(63, 63, 'r2', 'd'), (64, 65, 'r1', 'd')], 'dada'),
 (66, 67, 'R1', [(66, 67, 'r1', 'd')], 'kanan'),
 (68, 70, 'R1', [(68, 69, 'r1', 'd'), (70, 70, 'r1', 'd')], 'dada'),
 (71, 72, 'R3', [(71, 72, 'r3n', 'b')], 'atas'),
 (73, 75, 'R1', [(73, 75, 'r1', 'd')], 'dada'),
 (76, 76, 'R2', [(76, 76, 'r2', 'd')], 'dada'),
 (77, 78, 'R1', [(77, 78, 'r1', 'd')], 'dada'),
 (79, 81, 'R1', [(79, 81, 'r1', 'd')], 'dada'),
 (82, 82, 'R2', [(82, 82, 'r2', 'd')], 'dada'),
 (83, 83, 'R2', [(83, 83, 'r2', 'd')], 'dada'),
 (84, 85, 'R1', [(84, 85, 'r1', 'd')], 'dada'),
 (86, 88, 'R1', [(86, 86, 'r1', 'd'), (87, 88, 'r1', 'd')], 'dada'),
 (89, 90, 'R3', [(89, 90, 'r3n', 'b')], 'atas'),
 (91, 91, 'R2', [(91, 91, 'r2', 'd')], 'dada'),
 (92, 93, 'R1', [(92, 93, 'r1', 'd')], 'dada'),
 (94, 94, 'R2', [(94, 94, 'r2', 'd')], 'dada'),
 (95, 96, 'R1', [(95, 96, 'r1', 'd')], 'dada'),
 (97, 98, 'R2', [(97, 98, 'r2', 'd')], 'dada'),
 (99, 101, 'R1', [(99, 99, 'r1', 'd'), (100, 101, 'r1', 'd')], 'dada'),
 (102, 103, 'R1', [(102, 103, 'r1', 'd')], 'dada'),
 (104, 104, 'R3', [(104, 104, 'r3n', 'b')], 'atas'),
 (105, 107, 'R1', [(105, 106, 'r1', 'd'), (107, 107, 'r1', 'd')], 'dada'),
 (108, 109, 'R1', [(108, 109, 'r1', 'd')], 'dada'),
 (110, 112, 'R1', [(110, 111, 'r1', 'd'), (112, 112, 'r1', 'd')], 'dada'),
 (113, 114, 'R2', [(113, 113, 'r2', 'd'), (114, 114, 'r2', 'd')], 'dada'),
 (115, 116, 'R1', [(115, 116, 'r1', 'd')], 'kanan'),
 (117, 119, 'R1', [(117, 118, 'r1', 'd'), (119, 119, 'r1', 'd')], 'dada'),
 (120, 122, 'R1', [(120, 121, 'r1', 'd'), (122, 122, 'r1', 'd')], 'dada'),
 (123, 124, 'R2', [(123, 124, 'r2', 'd')], 'dada'),
 (125, 126, 'R1', [(125, 126, 'r1', 'd')], 'dada'),
 (127, 128, 'R3', [(127, 128, 'r3', 'b')], 'atas'),
 (129, 130, 'R1', [(129, 130, 'r1', 'd')], 'dada'),
 (131, 132, 'R1', [(131, 132, 'r1', 'd')], 'dada'),
 (133, 134, 'R2', [(133, 133, 'r1', 'd'), (134, 134, 'r2', 'd')], 'dada'),
 (135, 136, 'R1', [(135, 136, 'r1', 'd')], 'dada'),
 (137, 139, 'R1', [(137, 139, 'r1', 'd')], 'dada'),
 (140, 140, 'R2', [(140, 140, 'r2', 'd')], 'dada'),
 (141, 143, 'R1', [(141, 143, 'r1', 'd')], 'dada'),
 (144, 146, 'R2', [(144, 144, 'r1', 'd'), (145, 146, 'r2', 'd')], 'dada'),
 (147, 149, 'R1', [(147, 149, 'r1', 'd')], 'dada'),
 (150, 151, 'R2', [(150, 151, 'r2', 'd')], 'dada'),
 (152, 154, 'R1', [(152, 153, 'r1', 'd'), (154, 154, 'r1', 'd')], 'dada'),
 (155, 156, 'R2', [(155, 155, 'r1', 'd'), (156, 156, 'r2', 'd')], 'dada'),
 (157, 158, 'R1', [(157, 158, 'r1', 'd')], 'dada'),
 (159, 161, 'R2', [(159, 159, 'r1', 'd'), (160, 161, 'r2', 'd')], 'dada'),
 (162, 163, 'R1', [(162, 163, 'r1', 'd')], 'dada'),
 (164, 166, 'R1', [(164, 165, 'r1', 'd'), (166, 166, 'r1', 'd')], 'dada'),
 (167, 167, 'R6', [(167, 167, 'r6', 'b')], 'atas'),
 (168, 170, 'R1', [(168, 170, 'r1', 'd')], 'dada'),
 (171, 172, 'R1', [(171, 172, 'r1', 'd')], 'dada'),
 (173, 174, 'R1', [(173, 174, 'r1', 'd')], 'dada'),
 (175, 176, 'R1', [(175, 176, 'r1', 'd')], 'dada'),
 (177, 178, 'R2', [(177, 177, 'r1', 'd'), (178, 178, 'r2', 'd')], 'dada'),
 (179, 181, 'R1', [(179, 181, 'r1', 'd')], 'dada'),
 (182, 184, 'R2', [(182, 182, 'r1', 'd'), (183, 184, 'r2', 'd')], 'dada'),
 (185, 187, 'R1', [(185, 187, 'r1', 'd')], 'dada'),
 (188, 189, 'R1', [(188, 189, 'r1', 'd')], 'dada'),
 (190, 192, 'R1', [(190, 190, 'r1', 'd'), (191, 192, 'r1', 'd')], 'dada'),
 (193, 195, 'R1', [(193, 195, 'r1', 'd')], 'dada'),
 (196, 197, 'R2', [(196, 196, 'r1', 'd'), (197, 197, 'r2', 'd')], 'dada'),
 (198, 200, 'R1', [(198, 198, 'r1', 'd'), (199, 200, 'r1', 'd')], 'dada'),
 (201, 203, 'R1', [(201, 203, 'r1', 'd')], 'dada'),
 (204, 205, 'R3', [(204, 205, 'r3n', 'b')], 'atas'),
 (206, 208, 'R2', [(206, 206, 'r1', 'd'), (207, 208, 'r2', 'd')], 'dada'),
 (209, 210, 'R1', [(209, 210, 'r1', 'd')], 'dada'),
]
KODE = {'R1': 'T19', 'R2': 'T30', 'R3': 'T03', 'R6': 'T31'}
ALASAN = {'R1': 'narasi berjalan, tempo cepat: per kata ikut VO di depan badan (kartu 87 T1)',
          'R2': 'kata kunci: kuning per huruf berayun ke 0° + glow amber (kartu 87 T2, KT-ZACHE arc swing)',
          'R3': 'klaim/kata negatif: kapital di belakang kepala, slam + getar (kartu 87 T3 lapis belakang, Lantai R3)',
          'R6': 'kata hero (nama, hasil): depth push dari jauh ke bidang fokus di belakang kepala, maks 2× (typography §8)'}
FG_END = 1800  # matte RVM hanya sampai f1799
seg = [round(s['out_in'] * FPS) for s in json.load(open(f'{R}/sumber/edl_v6.json'))['segments']]

def teks(a, b):
    t = ' '.join(UP.get(words[i]['word'], words[i]['word']) for i in range(a, b + 1))
    return t.replace('jadi jadi', 'jadi-jadi').replace('di launching', 'di-launching').replace('seratus persen', '100%')

plan = []
for n, (a, b, peran, baris, zona) in enumerate(B):
    t0 = on[a] + 2 if peran in ('R1', 'R2') else on[a] - 3   # hero mendarat di onset (KT-REF3/Zache: mulai sebelum suara)
    t1 = (on[B[n + 1][0]] + 2 if B[n + 1][2] in ('R1', 'R2') else on[B[n + 1][0]] - 3) if n + 1 < len(B) else N
    plan.append(dict(id=n + 1, a=t0, b=t1, peran=peran, zona=zona, kepala=kep[min(t0 + 4, N - 1)],
                     baris=[dict(teks=teks(x, y), gaya=gy, lapis='d' if (lp == 'b' and t0 >= FG_END) else lp,
                                 kata=[dict(t=UP.get(words[i]['word'], words[i]['word']), f=on[i]) for i in range(x, y + 1)])
                            for x, y, gy, lp in baris]))
# kamera: skala per frame. Pusat = pusat wajah; di blok berkapital belakang kepala pusat-y = garis margin atas, jadi kamera
# mendorong ke arah kapital: kapital tetap di tempat, wajah membesar turun (ruang di atas kepala tidak hilang karena zoom).
# Pusat hanya berganti di frame yang skalanya tepat 1,0 (awal blok berkapital, awal blok sesudahnya) → tidak ada loncatan gambar.
MY0 = 0.05 * H
def zmax(f, ox, oy):
    kx0, ky0, kx1, ky1 = kep[f][:4]
    lim = []
    for d, c in ((ox - kx0, ox - 0.03 * W), (kx1 - ox, W - 0.03 * W - ox), (oy - ky0, oy - 0.03 * H), (ky1 - oy, H - 0.03 * H - oy)):
        if d > 0: lim.append(c / d)
    return max(1.0, min(lim)) if lim else 9
belakang = set()
for p in plan:
    if any(r['lapis'] == 'b' for r in p['baris']): belakang.update(range(p['a'], min(p['b'], N)))
keys = [[0, 1.0]]
for i, p in enumerate(plan):
    sesudah_b = i > 0 and any(r['lapis'] == 'b' for r in plan[i - 1]['baris'])
    base = 1.0 + (0.05 if p['peran'] == 'R1' and not sesudah_b else 0.0)
    tgt = {'R1': 1.04, 'R2': 1.12, 'R3': 1.18, 'R6': 1.22}[p['peran']]
    keys.append([p['a'], base]); keys.append([p['a'] + 10, tgt])
cam = []
for f in range(N):
    s = 1.0
    for (fa, va), (fb, vb) in zip(keys, keys[1:]):
        if fa <= f <= fb:
            u = (f - fa) / max(1, fb - fa); u = u * u * (3 - 2 * u); s = va + (vb - va) * u; break
    else: s = keys[-1][1]
    kx0, ky0, kx1, ky1, wx0, wy0, wx1, wy1 = kep[f]
    ox, oy = (wx0 + wx1) / 2, ((wy0 + wy1) / 2 if f not in belakang else MY0)
    cam.append([round(min(s, zmax(f, ox, oy)), 4), round(ox), round(oy)])

# ── tata letak dari lebar glyph asli (fontTools) dan transform kamera tiap frame ──
from fontTools.ttLib import TTFont
FD = f'{R}/remotion/public/fonts/'
_ft = {k: TTFont(FD + v) for k, v in {'anton': 'anton-latin-400-normal.woff2', 'inter': 'inter-latin-800-normal.woff2',
                                      'poppins': 'poppins-latin-600-normal.woff2'}.items()}
_cm = {k: (f.getBestCmap(), f['hmtx'].metrics, f['head'].unitsPerEm) for k, f in _ft.items()}
GAYA = {  # font, ukuran dasar, letterSpacing em, jarak antar kata em, tinggi baris ×size, kapital, ukuran minimum
    'r1': ('poppins', 74, -0.02, 0.26, 1.0, False, 64), 'r2': ('inter', 150, -0.04, 0.22, 0.9, False, 96),
    'r3': ('anton', 300, 0.005, None, 0.9, True, 130), 'r3n': ('anton', 300, 0.005, None, 0.9, True, 130),
    'r6': ('anton', 360, 0.0, None, 0.9, True, 150)}
def lebar(t, gy, size):
    fn, _, ls, wg, _, up, _ = GAYA[gy]; cmap, hm, upm = _cm[fn]
    if up: t = t.upper()
    w = 0.0
    for wi, kata in enumerate(t.split(' ')):
        for ch in kata:
            g = cmap.get(ord(ch)); w += (hm[g][0] / upm if g else 0.55) + ls
        if wi < len(t.split(' ')) - 1: w += wg if wg is not None else hm[cmap[32]][0] / upm
    if gy == 'r1': w += 0.26
    return w * size
MX, MY = 0.05 * W, 0.05 * H
def layar(f, x, y):  # titik dunia → layar (kamera scale di pusat wajah)
    s, ox, oy = cam[f]; return ox + (x - ox) * s, oy + (y - oy) * s
def muat(fr, x0, y0, x1, y1, ybawah=0.90 * H):
    for f in fr:
        a0, b0 = layar(f, x0, y0); a1, b1 = layar(f, x1, y1)
        if a0 < MX or a1 > W - MX or b0 < MY or b1 > ybawah: return False
    return True
def rentang_x(fr, w_):   # pusat-x dunia yang membuat kotak selebar w_ tetap di dalam margin layar di semua frame
    lo = max(cam[f][1] + (MX - cam[f][1]) / cam[f][0] for f in fr) + w_ / 2
    hi = min(cam[f][1] + (W - MX - cam[f][1]) / cam[f][0] for f in fr) - w_ / 2
    return lo, hi
def jepit(x, lo, hi): return x if lo > hi else min(max(x, lo), hi)
cadangan = 0
for n, p in enumerate(plan):
    s0, e0 = max(0, p['a'] - 10), min(N, p['b'])
    for c in seg:   # rentang uji = shot tempat blok tampil (potongan di tengah blok ditutup flash; teks ikut dunia shot pertama)
        if s0 < c <= p['a']: s0 = c
        if p['a'] + 6 < c < e0: e0 = c
    fr = range(s0, e0)
    smax = max(cam[f][0] for f in fr)
    import statistics as _st
    kx0, ky0, kx1, ky1, wx0, wy0, wx1, wy1 = [_st.median(kep[f][i] for f in fr) for i in range(8)]
    p['kepala'] = [round(v) for v in (kx0, ky0, kx1, ky1, wx0, wy0, wx1, wy1)]
    cx = (wx0 + wx1) / 2
    # ukuran awal: dasar, dikecilkan supaya lebar di layar (zoom maks blok) ≤ 88 % frame
    for r in p['baris']:
        size = GAYA[r['gaya']][1]
        size = min(size, 0.88 * W / smax / max(1, lebar(r['teks'], r['gaya'], 1)))
        r['size'] = size
    lay = {}
    for lp in ('b', 'd'):
        rows = [r for r in p['baris'] if r['lapis'] == lp]
        if not rows: continue
        def kotak(skala):
            ws = [lebar(r['teks'], r['gaya'], r['size'] * skala) for r in rows]
            hs = [GAYA[r['gaya']][4] * r['size'] * skala for r in rows]
            return max(ws), sum(hs), hs
        if lp == 'b':
            _r = [rambut[f] for f in fr if rambut.get(f) is not None]
            puncak = sorted(_r)[len(_r) // 10] if _r else ky0   # posisi kepala tertinggi di blok (persentil 10): tutupan tak pernah lebih dari rencana
            tutup = 0.08 if p['peran'] == 'R6' else 0.16          # kata hero/nama harus utuh terbaca; klaim boleh lebih tertutup
            # di belakang kepala: tengah di sumbu wajah, kaki baris terakhir masuk 20 % di belakang rambut
            for k in [1 - 0.04 * i for i in range(20)]:
                w_, h_, hs = kotak(k)
                yb = puncak + tutup * hs[-1]
                x = jepit(cx, *rentang_x(fr, w_))
                if muat(fr, x - w_ / 2, yb - h_, x + w_ / 2, yb): break
            if not all(r['size'] * k >= GAYA[r['gaya']][6] for r in rows) or not muat(fr, x - w_ / 2, yb - h_, x + w_ / 2, yb):
                for r in rows: r['lapis'] = 'd'   # tak ada ruang di atas kepala (close-up): pindah ke depan
                cadangan += 1; continue
            for r in rows: r['size'] = round(r['size'] * k, 1)
            lay['b'] = dict(x=round(x), y=round(yb), align='center', ty='-100%')
    for lp in ('d',):
        rows = [r for r in p['baris'] if r['lapis'] == 'd']
        if not rows: continue
        zona = p['zona']
        if zona == 'atas': zona = 'dada'
        cands = []
        if zona in ('kiri', 'kanan'): cands.append(zona)
        cands += ['dada', 'dagu', 'bawah', 'atas-depan']
        done = False
        for z in cands:
            for k in [1 - 0.04 * i for i in range(12)]:
                ws = [lebar(r['teks'], r['gaya'], r['size'] * k) for r in rows]
                hs = [GAYA[r['gaya']][4] * r['size'] * k for r in rows]
                w_, h_ = max(ws), sum(hs)
                if z == 'kiri':
                    x1 = kx0 - 24; x0 = x1 - w_; y0 = (wy0 + wy1) / 2 - h_ / 2; al, ax = 'right', x1
                elif z == 'kanan':
                    x0 = kx1 + 24; x1 = x0 + w_; y0 = (wy0 + wy1) / 2 - h_ / 2; al, ax = 'left', x0
                elif z == 'dada':
                    xc = jepit(cx + (-80 if n % 2 else 80), *rentang_x(fr, w_))
                    y0 = ky1 + 60; x0, x1 = xc - w_ / 2, xc + w_ / 2; al, ax = 'center', xc
                elif z == 'dagu':  # kepala besar: ruang tepat di bawah dagu
                    xc = jepit(cx, *rentang_x(fr, w_))
                    y0 = ky1 + 8; x0, x1 = xc - w_ / 2, xc + w_ / 2; al, ax = 'center', xc
                elif z == 'bawah':  # close-up: wajah memenuhi frame; teks di bawah mulut (≥ 84 % tinggi kotak wajah), tak menutup mata/mulut
                    xc = jepit(cx, *rentang_x(fr, w_))
                    y0 = max(wy0 + 0.84 * (wy1 - wy0), 0.92 * H - h_ - 14); x0, x1 = xc - w_ / 2, xc + w_ / 2; al, ax = 'center', xc
                else:  # atas-depan: di ruang atas kepala, di depan (close-up tanpa ruang dada)
                    xc = min(max(cx, MX + w_ / 2 + 6), W - MX - w_ / 2 - 6)
                    y0 = ky0 - 30 - h_; x0, x1 = xc - w_ / 2, xc + w_ / 2; al, ax = 'center', xc
                if all(r['size'] * k >= GAYA[r['gaya']][6] for r in rows) and muat(fr, x0, y0, x1, y0 + h_, 0.92 * H if z in ('dagu', 'bawah') else 0.90 * H):
                    done = True; break
            if done: break
        if not done:
            print('TIDAK MUAT', p['id'], [r['teks'] for r in rows]); k = 1
        for r in rows: r['size'] = round(r['size'] * k, 1)
        lay['d'] = dict(x=round(ax), y=round(y0), align=al, ty='0%', zona=z)
    p['lay'] = lay
out = []
for n, p in enumerate(plan):
    a, b = B[n][0], B[n][1]
    t0, t1 = p['a'], p['b']
    L = p['lay'].get('b') or p['lay'].get('d')
    out.append(dict(id=f'T{n + 1:03d}', kata=[a, b], teks=teks(a, b), t=round(t0 / FPS, 3), dur=round((t1 - t0) / FPS, 3),
                    peran=p['peran'], kode=KODE[p['peran']], gaya='kiblat 87', pos=[L['x'], L['y']],
                    alasan=ALASAN[p['peran']] + f" · zona {L.get('zona', 'belakang kepala')}"))
print('blok belakang→depan (tak ada ruang di atas kepala):', cadangan)
json.dump(out, open(f'{R}/kerja/v7/teks.json', 'w'), ensure_ascii=False, indent=1)
os.makedirs(f'{R}/remotion/src/v7', exist_ok=True)
json.dump(dict(blok=plan, cam=cam, seg=seg), open(f'{R}/remotion/src/v7/rencana.json', 'w'), ensure_ascii=False)
print(len(out), 'blok;', 'peran', {r: sum(1 for o in out if o['peran'] == r) for r in KODE}, '; zoom maks', max(c[0] for c in cam))
