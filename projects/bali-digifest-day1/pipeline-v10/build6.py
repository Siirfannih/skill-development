"""v6 (Irfan 13 Nov): alur Digifest itu apa -> isinya -> testimoni (trust). Turunan v3/build5.py.
- VO dari v6/speech6.json (7 pembicara). Wajah pembicara dipotong per potongan dengan punch-in 1,0/1,1 (0378 suara saja).
- Jembatan antar-bite = b-roll dengan suara asli; label bab statis per adegan; player tag sekolah di atas kepala.
- Semua kemunculan audio ease in/out (mix6), kecuali ending.
Keluaran: v6/edl6.json, v6/sfx6.json. Jalankan dari ~/work/bdf26/v6."""
import json, math
SP = json.load(open('speech6.json'))
ORDER = ['D1', 'K1', 'K2', 'T1b', 'K3', 'K4', 'I1', 'D2', 'T2', 'C1', 'C3', 'P1', 'P2', 'C2', 'R2']   # v9: kesan -> pesan -> penilaian (Irfan 15 Nov)   # v8g: 0361 'ada event namanya...' dihapus (Irfan: tidak menambah nilai)   # v8d: pengajar clay dulu, baru testimoni peserta; tanpa pertanyaan pewawancara   # v8: Q = pertanyaan pewawancara (konteks '8,5')   # T1a = hook (Irfan 14 Nov)
SPK = {'T1a': '0525', 'T1b': '0525', 'H': '0361', 'D1': '0378', 'D2': '0530', 'I1': '0426', 'T2': '0531', 'C1': '0399', 'Q': '0399', 'C2': '0399', 'C3': '0399',
       'K1': '0712', 'K2': '0723', 'K3': '0713', 'K4': '0718', 'P1': '0704', 'P2': '0712', 'R2': '0712'}
FACE = {'0712': 'd23/0712', '0723': 'd23/0723', '0713': 'd23/0713', '0718': 'd23/0718', '0704': 'd23/0704', '0361': 'r01/0361', '0525': 'v6r/0525', '0530': 'v6r/0530', '0426': 'v6r/0426', '0531': 'v6r/0531', '0399': 'v6r/0399'}  # 0378: suara saja
JOIN = {('C1', 'C3')}   # v9: guru kesan + harapan bersambung; '8,5' pindah ke penilaian
# v7: guru 0399 dikunci satu posisi teks di kiri -> punch-in dari tepi KIRI (wajah bergeser ke kanan), zoom kecil
PORIGIN = {'0399': 0.0}; PUNCHP = {'0399': (1.0, 1.06)}          # satu pembicara, kalimat bersambung: rapat + punch-in
GAP_SAME, GAP_SPK, GAP_JOIN = 0.20, 0.30, 0.06   # v10: padat seperti referensi (jeda antar-pembicara 0,7 -> 0,3)   # v8f: kalimat bersambung satu pembicara tanpa diam
PITCH = 'FINAL LOMBA PITCHING'
BDF, KONTEN, CLAY = 'BALI DIGIFEST 2026', 'WORKSHOP DIGITAL CONTENT CREATOR', 'WORKSHOP KRIYA CLAY 3D'
CHAP = {'T1a': None, 'T1b': KONTEN, 'H': BDF, 'D1': BDF, 'D2': CLAY, 'I1': CLAY, 'T2': CLAY, 'C1': BDF, 'Q': BDF, 'C2': BDF, 'C3': BDF, 'K1': BDF, 'K2': BDF, 'K3': BDF, 'K4': BDF, 'P1': BDF, 'P2': BDF, 'R2': BDF}
TAG = {'0530': ('SISWA', 'SMA Negeri 10 Denpasar'), '0531': ('SISWA', 'SMA Negeri 1 Blahbatuh'),
       '0399': ('GURU SENI', 'SMK Negeri 3 Sukawati'), '0713': ('SISWA', 'SMK PGRI 4 Denpasar')}          # hanya yang menyebut sekolahnya di rekaman
# hook: tepuk tangan asli dulu (musik masuk 0,75 dtk), lalu sorakan clay, lalu gerbang
# v7 (Irfan 14 Nov): hook = sorakan asli, lalu suara 0525 "Primakara dan Pemprov Bali, terima kasih banyak..." di atas montase meriah
HOOK = [('br/0518', 18.0, -17, 'HOOK: tepuk tangan penutupan kelas konten'), ('br/0521', 1.0, -24, 'HOOK: peserta kelas konten berbaris di depan'),   # v8f: 0556/0528 dipakai outro
        ('br/0560', 3.5, -26, 'HOOK: gitaris di booth musik'), ('d23/0662', 8.0, -26, 'HOOK: siswa VR Makepung tertawa bersama pendamping'),
        ('r02/0520', 0.0, -26, 'HOOK: foto bersama, kilatan lampu'), ('br/0381', 2.5, -26, 'HOOK: gerbang BALI DIGIFEST V 2026')]
MUSIC_IN = 0.0
LIFT = {'r02/0471', 'br/0498'}   # v10f: dua b-roll terlalu gelap (GPT + Sonnet)
DIM = {'d23/0653'}   # v10f: keyboard putih di bawah teks putih (Sonnet c08)
HOOK_VO = 0.04   # v8g: video langsung mulai dari ucapan (Irfan)
                                 # suara masuk setelah sorakan terdengar sendirian
import os
VARIANT = os.environ.get('VARIANT', 'A')     # v8 (Irfan 14 Nov): uji hook A = "terima kasih" vs B = skor "8,5" (posisi ditukar)
HOOKB = ['T1a'] if VARIANT == 'A' else ['C2']           # v8d: B langsung "kalau jujur, 8,5" (pewawancara dibuang)
if VARIANT == 'B':
    ORDER = ['D1', 'T1b', 'I1', 'D2', 'T2', 'C1', 'C3', 'T1a']   # terima kasih pindah ke penutup
    JOIN = {('C1', 'C3')}; CHAP['T1a'] = BDF
_blen = lambda bid: sum(b - a for a, b in SP[bid]['parts']) + 0.15 * len(SP[bid].get('cut_after', []))
T1A = sum(_blen(k) for k in HOOKB) + 0.30 * (len(HOOKB) - 1)
HOOK_END = round(HOOK_VO + T1A + 0.25, 2)   # v10f: potong hook -> D1 tepat di awal ucapan 'jelas' (teks dulu tertunda 0,31 dtk oleh aturan 1c)
VO_START = HOOK_END
# b-roll penutup sambungan antar-bite: (klip, detik event/awal, isi, offset event dari awal shot, LUFS nat)
BRIDGE = {('D1', 'K1'): [('d23/0661', 5.0, 'siswa mencoba VR Makepung, tersenyum', 0.6, -28)],
          ('K1', 'K2'): [('d23/0702', 0.5, 'dua siswi tertawa dan bertepuk tangan', 0.6, -24)],
          ('K2', 'T1b'): [('d23/0658', 5.0, 'seniman menggambar karikatur di iPad (v10f: 0689 pemateri bermik; 0659 close-up foto wajah di tablet)', 0.6, -26)],
          ('T1b', 'K3'): [('d23/0695', 6.0, 'pemateri workshop energik', 1.0, -26)],   # v9b: selesai sebelum frasa K3
          ('K3', 'K4'): [('d23/0640', 0.3, 'Main Hall penuh, panggung LED', 0.6, -26)],
          ('K4', 'I1'): [('br/0498', 14.6, 'close-up tangan membentuk clay', 0.6, -24)],
          ('C3', 'P1'): [('d23/0646', 24.0, 'anak mengetik di laptop dibantu mentor', 0.6, -28)],
          ('P1', 'P2'): [('d23/0700', 4.2, 'panitia membagikan hadiah, siswa tersenyum (0709 ternyata siswi bicara pakai mik)', 1.2, -24)],   # v9b: selesai sebelum 'rugi sih' (wajah P2 sepanjang kalimat)
('H', 'D1'): [('br/0383', 0.6, 'pengunjung di booth laptop', 0.5, -26), ('br/0359', 5.0, 'lorong pameran ramai dari atas', 0.5, -26)],
          ('D1', 'T1b'): [('r02/0483', 19.0, 'peserta maju di samping pemateri', 0.6, -24)],   # v8f: 0518 dipakai hook
          ('T1b', 'I1'): [('br/0498', 14.6, 'close-up tangan membentuk clay', 0.6, -24)],
          ('I1', 'D2'): [('v6r/0530', 43.0, 'close-up karya clay karang mata', 0.6, -30)],          # v8d: ganti 0498 kedua
          ('D2', 'T2'): [('br/0494', 98.0, 'pengajar dan peserta membentuk clay bersama', 0.6, -26)],   # v8d: 0528 sudah di hook
          ('T2', 'C1'): [('br/0482', 28.0, 'peserta maju presentasi (suara asli ±25 %)', 0.0, -70), ('d23/0742', 1.0, 'pitching siswa dengan produk', 0.0, -70),
                         ('d23/0745', 1.0, 'pitching siswi busana adat (tim yang sama, shot sedang)', 0.0, -70), ('d23/0743', 0.5, 'presentasi ke meja juri', 0.0, -70)],   # suara: lapis 0482 menerus   # v8g: rangkaian pitching
          ('C3', 'T1a'): [('br/0560', 0.9, 'gitaris di booth musik', 0.6, -20)]}   # v8d: 0359 sudah di jembatan H-D1
BRIDGE_LEN = {('T2', 'C1'): 4.5,   # v9b: mulai sesudah kalimat 0531 selesai (bukan di atas pria presentasi)
              ('T1b', 'K3'): 1.2, ('P1', 'P2'): 1.4}   # v9b: b-roll selesai sebelum frasa 'itu seru banget'   # v8g: momen pitching berdiri sendiri (sela 4,0 dtk + 0,4 di tiap sisi)
BRIDGE_W = {('T2', 'C1'): [1.5, 1.0, 1.0, 1.0]}   # 0482 paling lama: suara pria presentasi terdengar ±25 %
GAP_OVR = {('T2', 'C1'): 5.1, ('C2', 'R2'): 0.25}   # C2->R2: potong langsung antar-wajah (8,5 -> 10/10)
# di dalam satu bite yang panjang: sisipan b-roll di tengah supaya tidak terlalu lama di wajah (detik timeline relatif bite)
INSERT = {'C1': [('d23/0653', 1.0, 'keyboard aksara Bali: teknologi + budaya (v10f: 1,0 = laptop hitam di atas, teks terbaca)', 1.5)]}   # v9b: 0484 = orang lain bicara pakai mik   # v8d: 0359 sudah di jembatan
# jendela b-roll eksplisit (detik relatif awal bite): 0525 close-up genggam, wajah bergeser hampir selebar frame -> wajah hanya
# di pembuka ("Primakara...") dan "ini benar-benar berkesan"; sisanya b-roll workshop konten (literal: "generasi muda" -> peserta)
# v8: I1 "membuat desain biasanya membuat sketsa 2D dulu" -> pengajar yang sama memegang kertas desain (0486), waktu dari potongan 2-3
_r = lambda bid, k: sum(q - p for p, q in SP[bid]['parts'][:k]) + 0.15 * len([c for c in SP[bid].get('cut_after', []) if c <= k])
SPAN_B = {'T1a': [(_r('T1a', 1) + 0.05, None, [('r02/0520', 0.0, 'foto bersama, kilatan lampu'), ('r02/0418', 8.0, 'kelas DIGITAL CONTENT CREATOR'),
                                                 ('r02/0519', 30.0, 'MC tertawa bersama peserta')])]}   # v8d: klip yang tidak ada di hook B   # B: terima kasih penutup -> suasana acara
SPAN = {'C2': [(0.0, 1.0, [('d23/0744', 4.0, 'siswi pitching menunjukkan batik (Irfan)')])],   # v9: 'kalau jujur,' di atas juri, '8,5' di wajah guru
        'K4': [(('src', 297.02), 6.6, [('d23/0619', 0.3, 'penonton talkshow di bean bag (v10f: 0676 pembicara bermik)')])],   # v9b: b-roll narasumber mulai tepat di kata 'terus ketemu' (297,02); frasa tidak melintasi potongan
        'D1': [(0.0, None, [('d23/0642', 4.5, 'Main Hall, LED BALI DIGIFEST, penonton penuh (v10f: 0731 MC bermik)'), ('br/0383', 3.0, 'booth laptop ramai'),
                             ('d23/0655', 1.0, 'printer 3D mencetak (v10f: 0575 panelis)')])],   # v8g: 0378 suara saja, bite pertama sesudah hook
        'I1': [(_r('I1', 2) + 0.05, _r('I1', 4) - 0.05, [('br/0486', 3.2, 'pengajar menunjukkan kertas desain 2D (v10f: 2,87 dtk kilatan kamera)')])],
        'T1b': [(2.45, 6.84, [('r02/0471', 7.0, 'tangan peserta mencatat di meja (v10f: 15,0 close-up mulut terbuka = seolah bicara)'), ('r02/0523', 8.0, 'peserta di ruang workshop (v10f: 18,8 kepala terpotong)'),
                               ('r02/0469', 2.5, 'peserta mencatat')])]}     # "generasi muda... penerus" -> wajah peserta
if VARIANT == 'B': SPAN.update(SPAN_B)
OUTRO = [('br/0528', 24.4, 1.5, 'OUTRO: foto bersama peserta clay, bersorak'), ('br/0556', 5.2, 1.5, 'OUTRO: siswa bertepuk tangan'), ('gr/grid', 0.0, 3.4, 'OUTRO: grid 3x3 seluruh acara (Irfan: ganti 0714)')]
OUTRO_NAT = -17   # v8g: tepuk tangan penutup lebih keras (Irfan); sebelumnya -26   # v8f: kembali ke penutup asli (Irfan)
LOGO_DUR = 3.0
# label bab b-roll mengikuti isi gambarnya (bukan pembicara terdekat)
CHAP_CLIP = {'br/0518': KONTEN, 'r02/0437': KONTEN, 'r02/0469': KONTEN, 'r02/0418': KONTEN, 'r02/0471': KONTEN, 'r02/0523': KONTEN,
             'r02/0483': KONTEN, 'br/0498': CLAY, 'br/0528': CLAY, 'br/0486': CLAY, 'v6r/0530': CLAY, 'br/0494': CLAY,
             'br/0482': KONTEN, 'd23/0742': PITCH, 'd23/0745': PITCH, 'd23/0744': PITCH, 'gr/grid': None, 'd23/0741': PITCH, 'd23/0747': PITCH, 'd23/0743': PITCH, 'd23/0744': PITCH, 'br/0484': KONTEN, 'br/0521': KONTEN, 'r02/0520': KONTEN, 'r02/0519': KONTEN}
# ---- VO ----
vo = []; bites = []
def place_bite(bid, t, duck=None):
    b0 = t; ca = set(SP[bid].get('cut_after', []))
    for k, (a, b) in enumerate(SP[bid]['parts']):
        if k in ca: t += 0.15                                       # jeda koma setelah potongan isi (gagal v6: "saya|jangan" terpancung)
        p = dict(id=f'{bid}{k}', bite=bid, clip=SPK[bid], a=a, b=b, v=round(t, 3), cut_in=k in ca)
        if duck: p['duck'] = duck
        if k == 0: p['pre'] = SP[bid].get('pre', 0.06)
        if k == len(SP[bid]['parts']) - 1: p['post'] = SP[bid].get('post', 0.14)
        vo.append(p); t += b - a
    return b0, t
if VARIANT == 'A':
    hb0, hb1 = place_bite('T1a', HOOK_VO, duck=-31)                # v8d: -29 seperti bagian lain (Irfan: hook berisik, suara samar)
else:                                                              # B: hook = pertanyaan skor + "kalau jujur, 8,5"
    hb0, hb1 = place_bite('C2', HOOK_VO, duck=-31)
t = VO_START; prev = None
for bid in ORDER:
    if prev is not None:
        gap = GAP_JOIN if (prev, bid) in JOIN else (GAP_SPK if SPK[prev] != SPK[bid] else GAP_SAME)
        if 'Q' in (prev, bid): gap = 0.30                         # v8: giliran tanya-jawab, jeda percakapan
        gap = GAP_OVR.get((prev, bid), gap)
        t += gap
    b0, t = place_bite(bid, t)
    bites.append((bid, b0, t)); prev = bid
VO_END = t
OUT0 = round(VO_END + 0.25, 2)
# ---- jendela b-roll ----
win = []
for (p, pb0, pb1), (q, qb0, qb1) in zip(bites, bites[1:]):
    if (p, q) in JOIN or (p, q) not in BRIDGE: continue
    br = BRIDGE[(p, q)]; c = (pb1 + qb0) / 2; off = br[0][3]
    tot = BRIDGE_LEN.get((p, q)) or max(1.3 * len(br), 1.1 + 0.6 * len(br)); w0 = c - off if len(br) == 1 else c - tot / 2
    win.append([w0, w0 + tot, ('B', (p, q))])
for bid, b0, b1 in bites:
    if SPK[bid] not in FACE:                                  # suara saja: seluruh bite ditutup b-roll (tersambung ke jembatan)
        win.append([b0 - 0.05, b1 + 0.05, ('V', bid)])
    for k, (r0, r1, its) in enumerate(SPAN.get(bid, [])):
        if isinstance(r0, tuple):   # v10: awal dari detik SUMBER sebuah kata (tahan geser potongan): kata 'terus' K4 dst.
            pp = [q for q in vo if q['bite'] == bid and q['a'] - 0.05 <= r0[1] <= q['b'] + 0.05][0]
            r0 = pp['v'] + max(0.0, r0[1] - pp['a']) - 0.06 - b0
        win.append([b0 + r0, b0 + (r1 if r1 is not None else b1 - b0 + 0.3), ('S', (bid, k))])   # None = sampai outro
    for k, (clip, src, note, d) in enumerate(INSERT.get(bid, [])):
        mid = b0 + (b1 - b0) * (k + 1) / (len(INSERT[bid]) + 1)
        win.append([mid - d / 2, mid + d / 2, ('I', (bid, k))])
win.sort(key=lambda w: w[0])
merged = []                                                   # jendela yang bertumpuk/berdekatan (< 1,0 dtk wajah) digabung
for w in win:
    if merged and w[0] - merged[-1][1] < 1.0: merged[-1][1] = max(merged[-1][1], w[1]); merged[-1][2] = merged[-1][2] + [w[2]]
    else: merged.append([w[0], w[1], [w[2]]])
shots = []
def add(clip, src, v0, v1, grade, nat=None, note='', talk=False, punch=1.0, scene=None, chap=BDF, spk=None):
    s = dict(id=len(shots) + 1, v0=round(v0, 3), v1=round(v1, 3), clip=clip, src=round(src, 3), grade='lift' if clip in LIFT else 'redup' if clip in DIM else grade, note=note, chap=chap)
    if talk: s['talk'] = True; s['punch'] = punch; s['spk'] = spk
    else: s['nat'] = nat
    s['scene'] = scene if scene is not None else s['id']
    shots.append(s)
nH = max(2, min(len(HOOK), math.floor(HOOK_END / 1.15)))          # v8d: hook pendek (B) -> lebih sedikit shot, tetap ditutup gerbang
HOOKS = HOOK if nH == len(HOOK) else HOOK[:nH - 1] + [HOOK[-1]]
x = 0.0; hd = HOOK_END / len(HOOKS)
for c, src, nat, note in HOOKS: add(c, src, x, x + hd, 'tutup', nat, note, chap=None, scene=900); x += hd   # v7: satu adegan -> teks hook satu posisi
def bite_at(tt):
    for bid, b0, b1 in bites:
        if b0 - 0.4 <= tt <= b1 + 0.4: return bid
    return ORDER[-1]
def faces(t0, t1):
    segs = []
    for p in vo:
        pa, pb = p['v'], p['v'] + p['b'] - p['a']
        s0, s1 = max(t0, pa), min(t1, pb)
        if s1 - s0 > 1e-3 and p['clip'] in FACE: segs.append([s0, s1, p])
    if not segs:   # celah tanpa ucapan di antara jendela: lanjutkan wajah potongan terdekat
        near = min((p for p in vo if p['clip'] in FACE), key=lambda p: min(abs(p['v'] - t0), abs(p['v'] + p['b'] - p['a'] - t0)))
        segs = [[t0, t1, near]]
    segs[0][0] = t0; segs[-1][1] = t1
    for u, w in zip(segs, segs[1:]): u[1] = w[0]
    out = []
    for s in segs:
        if out and (s[1] - s[0] < 0.45 or s[2]['clip'] == out[-1][2]['clip'] and s[2]['bite'] == out[-1][2]['bite'] and s[0] - out[-1][1] < 0.01 and (s[1] - s[0] < 0.8 or out[-1][1] - out[-1][0] < 0.8)):   # v9: potongan rapat -> gabung shot wajah < 0,8 dtk
            out[-1][1] = s[1]
        else: out.append(s)
    if len(out) > 1 and out[0][1] - out[0][0] < 0.45: out[1][0] = out[0][0]; out.pop(0)
    return out
used = {}
def broll(clip, src, x0, x1, note, nat, chap):
    k = (clip, round(src, 1)); src2 = src + used.get(k, 0); used[k] = used.get(k, 0) + (x1 - x0)
    add(clip, src2, x0, x1, 'ws', nat, note, chap=chap)
scene = 1000
for w0, w1, keys in merged + [[OUT0, None, None]]:
    if w0 > x + 0.01:
        scene += 1; segs = faces(x, w0)
        for k, (s0, s1, p) in enumerate(segs):
            add(FACE[p['clip']], p['a'] + (s0 - p['v']), s0, s1, 'ws', note=f"pembicara {p['clip']} {p['id']}", talk=True,
                punch=PUNCHP.get(p['clip'], (1.0, 1.1))[k % 2], scene=scene, chap=CHAP[p['bite']], spk=p['clip'])
            shots[-1]['porigin'] = PORIGIN.get(p['clip'], 1.0)
        x = w0
    if w1 is None: break
    items = []                                               # daftar b-roll untuk jendela ini
    for kind, key in keys:
        if kind == 'B': items += [(c, s, n, o, nl) for c, s, n, o, nl in BRIDGE[key]]
        if kind == 'I': c, s, n, d = INSERT[key[0]][key[1]]; items.append((c, s, n, 0.5, -30))
        if kind == 'S': items += [(c, s, n, 0.0, -30) for c, s, n in SPAN[key[0]][key[1]][2]]
        if kind == 'V' and len(keys) < 2: items.append(('br/0359', 3.0, 'lorong pameran (suara 0378)', 0.5, -30))
    seen = []; items = [i for i in items if not (i[:2] in seen or seen.append(i[:2]))]
    L = w1 - x; n = max(1, min(len(items), math.floor(L / 1.2 + 1e-6)))
    wts = next((BRIDGE_W[key] for kind, key in keys if kind == 'B' and key in BRIDGE_W and len(keys) == 1), None)
    if wts and len(wts) == len(items) and L / len(wts) >= 0.9: n = len(wts); wts = [L * w / sum(wts) for w in wts]
    else: wts = [L / n] * n
    for k in range(n):
        c, s, note, off, nl = items[k]; e = x + wts[k]
        chap = CHAP_CLIP.get(c, BDF)
        broll(c, s - off if s > off else s, x, e, note, nl, chap); x = e
for c, src, d, note in OUTRO: add(c, src, x, x + d, 'tutup', OUTRO_NAT, note, chap=None); x += d
LOGO0 = round(x, 3); DUR = round(LOGO0 + LOGO_DUR, 2)
shots.append(dict(id=len(shots) + 1, v0=LOGO0, v1=DUR, clip='logo', note='kartu logo resmi', scene=9999, chap=None))
for a, b in zip(shots, shots[1:]): assert abs(a['v1'] - b['v0']) < 1e-3, (a, b)
for s in shots[:-1]: assert s['v1'] - s['v0'] >= (0.45 if s.get('talk') else 0.9), s
# v9: lagu resmi 86,47 dtk; bed instrumental 10,25-74,25 (64 dtk, batas ketukan) diulang dengan crossfade 1 dtk bila video lebih panjang
NEED = OUT0 - HOOK_END + 0.6; SEG = 64.0; BED = '../music/sep/htdemucs/bdf_theme/no_vocals.wav'
if NEED <= SEG: M2SEG = [dict(id='M2', file=BED, a=10.25, b=10.25 + NEED, v=HOOK_END - 0.3)]
else: M2SEG = [dict(id='M2', file=BED, a=10.25, b=74.75, v=HOOK_END - 0.3, xfade_out=1.0),
               dict(id='M2b', file=BED, a=10.25, b=10.25 + NEED - SEG + 0.5, v=HOOK_END - 0.3 + SEG - 0.5, xfade_in=1.0)]
_pit = [s for s in shots if s['clip'] in ('br/0482', 'd23/0742', 'd23/0745', 'd23/0743')]
MUSIC_AUTO = [(_pit[0]['v0'] - 0.35, _pit[-1]['v1'] + 0.15, 6.0)]   # v10f: mulai di ujung T2 (lubang -48 dBFS 72,3-72,45 saat lagu bergeser) if _pit else []
edl = dict(fps=30, dur=DUR, chorus=OUT0, shots=shots, vo=vo, music_in=MUSIC_IN, tags=TAG, chapters={},
           music=[dict(id='M0', file='../music/bdf_theme.wav', a=74.25, b=74.25 + HOOK_END - MUSIC_IN + 0.35, v=MUSIC_IN, fade_in=0.6),
                  *M2SEG,
                  dict(id='M3', file='../music/bdf_theme.wav', a=86.47 - (DUR - OUT0), b=86.47, v=OUT0)],
           music_auto=MUSIC_AUTO,   # v10: momen pitching tanpa VO -> lagu +6 dB (lubang -45 dBFS 72,6-77,2)
           natfx=[dict(clip='br/0359', src=0.5, dur=OUT0 - HOOK_END, v=HOOK_END - 0.3, lv=-36, note='suasana pameran menerus (v9: -36 tanpa redaman = seperti v8 yang hanya 2 tanda turun-mendadak)', duck=False),
                  dict(clip='br/0556', src=2.6, dur=3.6, fo=1.2, v=OUT0 + 0.05, lv=-15, note='tepuk tangan asli di chorus (v8g: -22 -> -15)', duck=False)])
# v8g: suara pria presentasi (0482) menerus di bawah seluruh rangkaian pitching, ±25 % (-27 LUFS vs VO -14,5), ease 0,5 dtk
pit = [s for s in shots if s['clip'] in ('br/0482', 'd23/0742', 'd23/0745', 'd23/0743')]
if pit:
    a0, a1 = pit[0]['v0'], pit[-1]['v1']
    edl['natfx'].append(dict(clip='br/0482', src=27.65, dur=round(a1 - a0 + 0.9, 3), v=round(a0 - 0.35, 3), lv=-27, fi=0.2, fo=0.35,   # v10f: masuk/keluar lebih cepat, menyambung ke VO (lubang -48 dBFS 72,6 & 77,1)
         note='suara presentasi pitching menerus', duck=True))
json.dump(edl, open('edl6.json', 'w'), indent=1, ensure_ascii=False)
sfx = [dict(t=HOOK_END, file='~/sfx/Kenyset/universfield-swoosh-023-454830.mp3', peak=0.44, gain=-12, role='hook -> cerita'),
       dict(t=OUT0 - 0.1, file='~/sfx/SFXIrfan/ES_Designed, Riser, Transition, Fast, Short, Clean 01 - Epidemic Sound.mp3', peak=4.1, gain=-8, role='riser'),
       dict(t=OUT0, file='~/sfx/SFXIrfan/ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz - Epidemic Sound.mp3', peak=0.56, gain=-7, role='hit chorus'),
       dict(t=LOGO0, file='~/sfx/SFXIrfan/ES_Swooshes, Whoosh, Big, Cinematic - Epidemic Sound.mp3', peak=0.62, gain=-9, role='reveal logo')]
json.dump(sfx, open('sfx6.json', 'w'), indent=1, ensure_ascii=False)
print('dur', DUR, 'VO', round(VO_START, 2), '-', round(VO_END, 2), 'outro', OUT0, 'logo', LOGO0)
for s in shots: print(f"{s['id']:2d} {s['v0']:6.2f}-{s['v1']:6.2f} ({s['v1']-s['v0']:.2f}) {s['clip']:9s} {s.get('src','')} p{s.get('punch','')} [{s.get('chap')}] {s['note']}")
for bid, b0, b1 in bites: print(bid, round(b0, 2), round(b1, 2))
