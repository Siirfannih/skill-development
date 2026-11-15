"""Peta waktu v3b (Irfan 15 Nov: "video ini banyak patahannya dan bagian yang hilang").
v3 melompat 1:1 di bekas jeda yang geraknya kecil (rata <= 3) -> kamera/objek yang bergerak pelan tetap meloncat
(audit frame: f312, 1270, 1481, 1708, 2405). Aturan v3b: lompatan HANYA bila ada potong keras di dalam rentang yang
dibuang (lompatan tersembunyi di balik cut); selain itu waktu animasi dikejar halus: rampa lebar w = clamp(max(0,5; 1,25*g),
<= 1,2, <= 0,9 x panjang segmen tetangga), percepatan maks (2w+g)/2w."""
import json, numpy as np
mp = json.load(open('edit/v3/map.json')); rem = mp['removed']
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
    n_cut = segs[i + 1][0]; pe = segs[i][2]; ns = segs[i + 1][1]; g = b - a
    inside = [c for c in cuts if a - 0.04 <= c <= b + 0.04]
    if inside:
        K += [(n_cut - 1e-4, pe), (n_cut, ns)]; info.append([a, 'lompat di balik cut'])
    else:
        w = min(max(0.5, 1.25 * g), 1.2, (segs[i][2] - segs[i][1]) * 0.9, (segs[i + 1][2] - segs[i + 1][1]) * 0.9)
        K += [(n_cut - w, pe - w), (n_cut + w, ns + w)]; info.append([a, f'halus {(2 * w + g) / (2 * w):.2f}x'])
K.append((mp['dur_new'], mp['dur_old']))
A = np.array(sorted(set((round(x, 4), round(y, 4)) for x, y in K)))
assert np.all(np.diff(A[:, 0]) > 0) and np.all(np.diff(A[:, 1]) >= 0), 'peta tidak monoton'
DUR = round(int(mp['dur_new'] * 30) / 30, 4)
json.dump({'knots': A.tolist(), 'dur_frames': int(round(DUR * 30)), 'jeda': info,
           'note': 'v3b: [t_baru, t_lama]; lompatan hanya di balik cut keras; selain itu rampa halus'}, open('remotion/src/data/knots_v3.json', 'w'), indent=0)
sp = [float(x[1].split()[1][:-1]) for x in info if x[1].startswith('halus')]
print('lompat', sum(1 for x in info if x[1].startswith('lompat')), '| halus', len(sp), '| percepatan maks', max(sp), '| > 1,8x:', [x for x in info if x[1].startswith('halus') and float(x[1].split()[1][:-1]) > 1.8])
