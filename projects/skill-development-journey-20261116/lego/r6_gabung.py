"""Resep putaran 6 (D-438…D-446): basis lego_final_A1.json (R4 final 1), lapisan tertentu dari lego.json (R5c).
Aturan per ID dicatat di bawah; keluaran lego_r6.json."""
import json, os
A = json.load(open('lego_final_A1.json')); B = json.load(open('lego.json'))
ib = {x['id']: x for x in B['lapisan']}
DARI_B = {  # alasan → ID
  'D-440/D-417 bubble berwatak + Clawd': ['K_Clawd', 'K_Codex', 'B_Codex', 'B_Clawd', 'K_Gemini', 'B_Gemini'],
  'D-412 urutan baca DECISION': ['T019', 'T020', 'T021', 'T022', 'T023'],
  'D-412 label WORKFLOW-NYA': ['T050'],
  'D-412 label BALIK MODAL + "habis banget" terbaca': ['T057', 'T058', 'T059', 'T060', 'T061'],
  'D-412 label LINTAS AGENT': ['T077'],
  'D-438 adegan E Blender + IG R5c (D-440)': ['b10a_meja3d', 'D_IG'] + [f'T{n:03d}' for n in range(80, 96)],
}
TAMBAH_B = ['T051_lbl', 'T057_lbl', 'T077_lbl']
BUANG = {'C_lihat', 'T078', 'T079', 'T086'} | {f'T{n:03d}' for n in range(96, 108)}  # papan B11/panah + KT D/E/IG lama; T086 "profesional" kecil diganti kata belakang di D_IG_r6 (D-451)
ambil = {i for v in DARI_B.values() for i in v}
out = []
for x in A['lapisan']:
    i = x['id']
    if i in BUANG: continue
    if i in ambil or not os.path.exists(x['src']):
        if i not in ib: raise SystemExit(f'{i} tidak ada di R5c')
        y = dict(ib[i]); y['_asal'] = 'R5c'; out.append(y)
    elif i == 'D_RELAY':
        y = dict(ib[i]); y['src'] = 'cache/D_RELAY_r6.mov'; y['_asal'] = 'R6 gelombang grid D-443'; out.append(y)
    else:
        y = dict(x); y['_asal'] = 'R4'; out.append(y)
for i in TAMBAH_B:
    y = dict(ib[i]); y['_asal'] = 'R5c'; out.append(y)
# D-450: label pengantar rapat ke slab (±18 px dari garis dasar label ke puncak huruf slab), sama di tiga slab.
GESER_Y = {'T051_lbl': 34, 'T057_lbl': 54, 'T077_lbl': 39}
for x in out:
    if x['id'] in GESER_Y: x['y'] = x['y'] + GESER_Y[x['id']]
for x in out:
    if x['id'] == 'D_IG': x['src'] = 'cache/D_IG_r6.mp4'; x['_asal'] = 'R6 profesional D-451'
# D_IG (latar IG opak) harus di bawah teks IG seperti di R5c: taruh tepat sebelum T080.
ig = next(x for x in out if x['id'] == 'D_IG'); out.remove(ig)
out.insert(next(n for n, x in enumerate(out) if x['id'] == 'T080'), ig)
L = {k: v for k, v in A.items() if k != 'lapisan'}
L['lapisan'] = out; L['audio'] = None; L['keluar'] = '../qc/r6/visual_r6.mp4'
json.dump(L, open('lego_r6.json', 'w'), indent=1)
from collections import Counter
print(len(out), Counter(x['_asal'] for x in out))
print('R5c:', [x['id'] for x in out if x['_asal'] == 'R5c'])
