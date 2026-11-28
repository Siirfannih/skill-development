#!/usr/bin/env python3
"""lembar.py · contact sheet cek visual: awal/tengah/akhir tiap beat dari qc/draft.mp4 (Addendum 4 butir 1) + strip 6 fps rentang transisi."""
import json, os, subprocess, sys
from PIL import Image, ImageDraw
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(EP)
D = json.load(open('remotion/src/data/ep03.json')); os.makedirs('qc/cek/f', exist_ok=True)
def fr(n, out):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'qc/draft.mp4', '-vf', f"select=eq(n\\,{n})", '-vframes', '1', out], check=True)
tiles = {}
for b in D['beats']:
    s, e = b['dari'], b['sampai']
    for nm, n in (('a', s + 4), ('m', (s + e) // 2), ('z', e - 4)):
        out = f"qc/cek/f/{b['id']}{nm}.png"; fr(n, out); tiles[(b['id'], nm)] = out
ids = [b['id'] for b in D['beats']]
for si in range(3):
    grp = ids[si * 5:(si + 1) * 5]; W, H = 216, 384
    im = Image.new('RGB', (W * 5, H * 3), (20, 20, 20))
    for c, i in enumerate(grp):
        for r, nm in enumerate('amz'):
            t = Image.open(tiles[(i, nm)]).resize((W, H)); d = ImageDraw.Draw(t); d.rectangle([0, 0, 40, 12], fill=(0, 0, 0)); d.text((2, 1), i + nm, fill=(255, 255, 0)); im.paste(t, (c * W, r * H))
    im.save(f'qc/cek/sheet{si + 1}.png')
# strip transisi: 6 fps di +-0,5 dtk sekitar tiap batas beat yang kamera/overlay-nya bergerak
bat = [b for b in D['beats'][1:]]
rows = []
for b in bat:
    t0 = b['dari'] - 8
    row = []
    for k in range(6):
        n = t0 + k * 5
        out = f"qc/cek/f/t_{b['id']}_{k}.png"; fr(max(0, n), out); row.append(out)
    rows.append((b['id'], row))
W, H = 108, 192
for si in range(2):
    grp = rows[si * 7:(si + 1) * 7]
    im = Image.new('RGB', (W * 6, H * len(grp)), (20, 20, 20))
    for r, (i, row) in enumerate(grp):
        for c, p in enumerate(row):
            t = Image.open(p).resize((W, H)); d = ImageDraw.Draw(t); d.text((2, 1), i, fill=(255, 255, 0)); im.paste(t, (c * W, r * H))
    im.save(f'qc/cek/transisi{si + 1}.png')
print('lembar selesai')
