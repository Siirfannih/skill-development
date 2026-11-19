# rambut_v7.py · puncak rambut asli per frame dari matte RVM (alpha fg.webm / fg_b.webm), di pita selebar kotak wajah.
# Dipakai v7_rencana.py supaya kaki kapital "belakang kepala" benar-benar masuk di belakang rambut (kotak kepala YuNet terlalu tinggi).
# Pakai: ~/work/mg-venv/bin/python alat/rambut_v7.py → kerja/v7/rambut.json {frame: y_puncak (px @1080×1920) | null}
import json, subprocess, numpy as np, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
kep = {int(k): v for k, v in json.load(open(f'{R}/kerja/v7/kepala.json')).items()}
SW, SH, K = 270, 480, 4
def baca(path, f0):
    cmd = ['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', path, '-vf', f'alphaextract,scale={SW}:{SH}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-']
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE); f = f0
    while True:
        buf = p.stdout.read(SW * SH)
        if len(buf) < SW * SH: break
        yield f, np.frombuffer(buf, np.uint8).reshape(SH, SW); f += 1
out = {}
for path, f0, f1 in ((f'{R}/remotion/public/fg.webm', 0, 1660), (f'{R}/remotion/public/fg_b.webm', 1640, 1800)):
    for f, a in baca(path, f0):
        if f < f0 or f >= f1 or f in out or f not in kep: continue
        wx0, wx1 = kep[f][4], kep[f][6]
        band = a[:, max(0, int(wx0 / K)):int(wx1 / K) + 1] > 128
        rows = np.where(band.mean(axis=1) > 0.25)[0]   # baris yang ≥ 25 % pitanya subjek = puncak kepala (bukan helai tunggal)
        out[f] = int(rows[0] * K) if len(rows) else None
json.dump(out, open(f'{R}/kerja/v7/rambut.json', 'w'))
print(len(out), 'frame; contoh', {f: out.get(f) for f in (26, 68, 211, 583, 912, 1114, 1480)})
