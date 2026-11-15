"""QA v8c: kotak teks (frasa + kata besar) vs SEMUA wajah (heads.json pembicara + faces b-roll) selama teks tampil -> daftar tabrakan."""
import json
from PIL import ImageFont
FPS = 30; W, H = 1920, 1080
F = lambda z: ImageFont.truetype('remotion/public/fonts/SFPRODISPLAYBOLD.OTF', z)
ph = json.load(open('remotion/src/phrases6.json')); kt = json.load(open('remotion/src/kt6.json')); heads = json.load(open('remotion/src/heads.json'))
BM = json.load(open('broll_map6.json')); SH = json.load(open('edl6.json'))['shots']
def faces(a, b):
    out = []
    for fr in range(round(a * FPS), round(b * FPS) + 1, 3):
        for tr in heads.values():
            x0, x1 = round(tr['v0'] * FPS), round(tr['v1'] * FPS)
            if x0 <= fr < x1: out.append(tuple(tr['t'][min(len(tr['t']) - 1, fr - x0)]))
    for s in SH:
        if s['v0'] < b and s['v1'] > a: out += [tuple(f) for f in BM.get(str(s['id']), {}).get('faces', [])]
    return out
bad = 0; tot = 0
items = [(c['start'], c['end'], (c['x'] - c['bw'] / 2) if c.get('align') == 'c' else c['x'], c['y'], c['bw'], c.get('size', 64) * 1.1 * len(c['lines']),
          ' / '.join(' '.join(w['w'] for w in l) for l in c['lines'])) for c in ph]
for d in kt['big']:
    bw = F(d['size']).getlength(d['text']); bh = d['size'] * 1.05
    items.append((d['start'], d['end'], d['cx'] - bw / 2, d['cy'] - bh / 2, bw, bh, '[BESAR] ' + d['text']))
for a, b, x, y, bw, bh, txt in sorted(items):
    fs = faces(a, b); tot += 1
    hit = [f for f in fs if x - 0.9 * f[2] < f[0] < x + bw + 0.9 * f[2] and y - 0.9 * f[2] < f[1] < y + bh + 0.9 * f[2]]
    if hit: bad += 1; print(f'{a:6.2f}-{b:6.2f} y={y:4.0f} tabrak {len(hit)}/{len(fs)} {txt}')
print(f'tabrakan wajah: {bad}/{tot} tampilan teks')
