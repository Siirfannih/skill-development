"""Resep putaran 7 (D-452…D-464): lego_r6.json + kamera tanpa jeda (D-464) + override pekerja.
Override: tiap file lego/r7_override_*.json = {"ganti": [lapisan...], "tambah": [lapisan...], "buang": [id...]}
(ganti = cocok per id, posisi tumpuk tetap; tambah = disisipkan sebelum lapisan `sebelum` bila ada, else di akhir).
Keluaran lego_r7.json; lego_r7_kamera.json (dasar saja, dipakai pekerja untuk lubang/teks yang ikut wajah)."""
import glob, json, sys

L = json.load(open('lego_r6.json'))

# ---- D-464: kamera tidak pernah diam. Setiap klip zoom satu arah sampai potongan.
LAJU_MIN = 0.028          # perubahan skala per detik minimal (terlihat tapi pelan)
for i, c in enumerate(L['dasar']):
    cam = c.get('kamera')
    if not cam: continue
    z0, z1 = cam['zoom']; d = c['dur']
    arah = 1 if z1 >= z0 else -1
    if abs(z1 - z0) / d < LAJU_MIN:
        # klip "diam": lanjutkan arah klip sebelumnya (atau zoom in) dengan laju minimal
        if abs(z1 - z0) < 0.004:   # benar-benar diam: ikut arah klip sebelumnya
            prev = L['dasar'][i - 1]['kamera']['zoom'] if i else [1, 1.01]
            arah = 1 if prev[1] >= prev[0] else -1
        z1 = z0 + arah * min(LAJU_MIN * d, 0.12)
        if z1 < 1.0: arah, z1 = 1, z0 + LAJU_MIN * d
        cam['zoom'] = [round(z0, 5), round(z1, 5)]
        cam['kurva'] = 'linear'
    elif cam.get('kurva') in ('drift', 'heavy') and d > 0.6:
        cam['kurva'] = 'linear'   # ease in-out berhenti di tengah klip panjang; laju tetap sampai potongan
    # klip berikutnya mulai dari skala akhir klip ini bila skala awalnya hampir sama (sambungan kontinu)
    if i + 1 < len(L['dasar']):
        n = L['dasar'][i + 1].get('kamera')
        if n and abs(n['zoom'][0] - cam['zoom'][1]) < 0.03:
            n['zoom'][0] = cam['zoom'][1]
json.dump({'dasar': L['dasar'], 'fps': L['fps']}, open('lego_r7_kamera.json', 'w'), indent=1)

# ---- override pekerja
ids = [x['id'] for x in L['lapisan']]
for f in sorted(glob.glob('r7_override_*.json')):
    o = json.load(open(f))
    for y in o.get('ganti', []):
        if y['id'] not in ids: sys.exit(f'{f}: ganti {y["id"]} tidak ada')
        L['lapisan'][ids.index(y['id'])] = dict(y, _asal=f)
    buang = set(o.get('buang', []))
    L['lapisan'] = [x for x in L['lapisan'] if x['id'] not in buang]
    ids = [x['id'] for x in L['lapisan']]
    for y in o.get('tambah', []):
        if y['id'] in ids: sys.exit(f'{f}: tambah {y["id"]} sudah ada')
        pos = ids.index(y['sebelum']) if y.get('sebelum') in ids else len(ids)
        L['lapisan'].insert(pos, dict(y, _asal=f)); ids = [x['id'] for x in L['lapisan']]
L['keluar'] = '../qc/r7/visual_r7.mp4'
json.dump(L, open('lego_r7.json', 'w'), indent=1)
print(len(L['lapisan']), 'lapisan;', 'override:', sorted(glob.glob('r7_override_*.json')))
