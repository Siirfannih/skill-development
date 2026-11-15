"""Peta waktu visual lama -> baru (edit/v3/knots.json) setelah potong ulang suara (Irfan 15 Nov).
Bekas jeda saat layar diam (gerak rata <= 3) / berisi cut keras (lonjakan >= 30 atau cut <= 0,35 dtk) = lompatan 1:1;
bekas jeda di tengah animasi = disebar ±0,4 dtk. Juga menulis cue v3 (waktu lama -> baru) dan titik babak T3/T4."""
import json, numpy as np
mp = json.load(open('edit/v3/map.json')); rem = mp['removed']; d = np.load('edit/v3/motion_v2.npy')
DUR = round(int(mp['dur_new'] * 30) / 30, 4)
plan = json.load(open('handoff/PLAN.json'))['beats']
cuts = {b['t'][0] for b, p in zip(plan[1:], plan[:-1]) if 'cut keras' in (p.get('keluar') or '')}
ev = []
for f in ['audio/events_A.json', 'audio/events_B.json', 'audio/events_C.json']: ev += json.load(open(f))
cuts |= {e['t'] for e in ev if e['jenis'] == 'cut'}
keep, cur = [], 0.0
for a, b in rem:
    if a > cur: keep.append([cur, a])
    cur = b
keep.append([cur, mp['dur_old']])
segs, n = [], 0.0
for k0, k1 in keep: segs.append((n, k0, k1)); n += k1 - k0
K, info = [(0.0, 0.0)], []
for i, (a, b) in enumerate(rem):
    if i + 1 >= len(segs): break
    seg = d[int(a * 30):int(b * 30) + 1]
    near_cut = any(a - 0.35 <= c <= b + 0.35 for c in cuts)
    n_cut = segs[i + 1][0]; pe = segs[i][2]; ns = segs[i + 1][1]
    if near_cut or seg.mean() <= 3.0 or seg.max() >= 30:
        K += [(n_cut - 1e-4, pe), (n_cut, ns)]; info.append([a, 'lompat'])
    else:
        g = b - a; w = min(max(0.4, 1.5 * g, 1.2 * g), 1.2, (segs[i][2] - segs[i][1]) * 0.9, (segs[i + 1][2] - segs[i + 1][1]) * 0.9)
        K += [(n_cut - w, pe - w), (n_cut + w, ns + w)]; info.append([a, f'halus {(2 * w + g) / (2 * w):.2f}x'])
K.append((mp['dur_new'], mp['dur_old']))
A = np.array(sorted(set((round(x, 4), round(y, 4)) for x, y in K)))
json.dump({'knots': A.tolist(), 'dur_frames': int(round(DUR * 30)), 'jeda': info,
           'note': '[t_baru, t_lama]; W(t_baru)=interp linear; pasangan jangkar berselisih 0,0001 dtk = lompatan'}, open('edit/v3/knots.json', 'w'), indent=0)
inv = lambda t: float(np.interp(t, A[:, 1], A[:, 0]))
c = json.load(open('audio/cues_v2.json'))
for q in c['cues']:
    q['t_v2'] = q['t']; q['t'] = round(inv(q['t']), 3)
    if q['peran'] == 'riser': q['gain_db'] = -12
    if q['peran'] == 'whoosh' and abs(q['t_v2'] - 21.2) < 0.05: q['gain_db'] = -14
json.dump(c, open('edit/v3/cues_v3.json', 'w'), ensure_ascii=False, indent=1)
print('durasi', DUR, 'frame', int(round(DUR * 30)), '| lompat', sum(1 for x in info if x[1] == 'lompat'), '| halus', [x for x in info if x[1] != 'lompat'])
W = lambda t: np.interp(t, A[:, 0], A[:, 1])
def m(t):
    c = 0
    for a, b in rem:
        if t >= b: c += b - a
        elif t > a: return a - c
        else: break
    return t - c
ws = [q for q in json.load(open('edit/words_final.json')) if q['w'].strip().lower().strip('.,') != 'tuh']
dev = []
for q in ws:
    s0 = q['s']; ins = [b for a, b in rem if a < s0 < b]
    if ins: s0 = ins[0]
    dev.append(abs(W(m(s0) + 1e-3) - s0) * 30)
dev = np.array(dev); print('simpangan teks: median', round(float(np.median(dev)), 1), 'maks', round(float(dev.max()), 1), 'frame; > 3 frame:', int((dev > 3).sum()))
print('T3', round(inv(46.30), 3), 'T4', round(inv(75.45), 3))
