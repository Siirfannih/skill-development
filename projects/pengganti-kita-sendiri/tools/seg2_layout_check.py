"""SEGMEN 2 · cek pra-render dari log OBJ (seg2_probe.mjs) + still kecil.
python3 seg2_layout_check.py <probeDir> [--scale 0.25] > report.md
Cek per kotak teks per frame:
  SAFE   kotak keluar safe zone x 288–1632, y 216–864 (teks harus utuh di dalamnya)
  CLASH  dua kotak teks bertumpuk di frame yang sama
  CONTR  kontras warna teks vs latar (median piksel kotak yang bukan warna teks) < 3:1 (WCAG teks besar)
Teks yang seluruhnya di luar layar (animasi masuk/keluar) diabaikan.
"""
import sys, os, re, collections
import numpy as np
from PIL import Image

SAFE = (288, 216, 1632, 864)
d = sys.argv[1]
scale = float(sys.argv[sys.argv.index('--scale') + 1]) if '--scale' in sys.argv else 0.25

def lum(rgb):
    c = np.asarray(rgb, float) / 255
    c = np.where(c <= 0.03928, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * c[..., 0] + 0.7152 * c[..., 1] + 0.0722 * c[..., 2]

def hex2rgb(h):
    m = re.match(r'#?([0-9a-fA-F]{6})', h)
    if m: return tuple(int(m.group(1)[i:i + 2], 16) for i in (0, 2, 4))
    m = re.match(r'rgba?\((\d+),(\d+),(\d+)', h)
    return tuple(map(int, m.groups())) if m else None

rows = collections.defaultdict(list)
for ln in open(os.path.join(d, 'obj.log')):
    p = ln.split()
    if len(p) < 9: continue
    f, kind = int(p[1]), p[2]
    x, y, w, h = map(float, p[3:7])
    if x + w < 0 or y + h < 0 or x > 1920 or y > 1080: continue  # di luar layar (transisi)
    rows[f].append(dict(kind=kind, x=x, y=y, w=w, h=h, color=p[7], name=p[8]))

issues = collections.defaultdict(list)  # (rule, name) -> frames
for f, objs in sorted(rows.items()):
    texts = [o for o in objs if o['kind'] in ('text', 'speaker')]
    img_p = os.path.join(d, f'f{f:05d}.jpg')
    img = np.asarray(Image.open(img_p).convert('RGB')) if os.path.exists(img_p) else None
    for o in texts:
        # glyph box dari line-height 1 → tinggi huruf nyata ~0.72 em; toleransi 4 px
        if o['x'] < SAFE[0] - 4 or o['x'] + o['w'] > SAFE[2] + 4 or o['y'] + 0.12 * o['h'] < SAFE[1] - 4 or o['y'] + 0.9 * o['h'] > SAFE[3] + 4:
            issues[('SAFE', o['name'])].append((f, f"x {o['x']:.0f}–{o['x'] + o['w']:.0f} y {o['y']:.0f}–{o['y'] + o['h']:.0f}"))
        tc = hex2rgb(o['color'])
        if img is not None and tc:
            x0, y0 = int(max(0, o['x']) * scale), int(max(0, o['y'] + 0.15 * o['h']) * scale)
            x1, y1 = int(min(1920, o['x'] + o['w']) * scale), int(min(1080, o['y'] + 0.85 * o['h']) * scale)
            if x1 - x0 > 2 and y1 - y0 > 2:
                crop = img[y0:y1, x0:x1].reshape(-1, 3).astype(float)
                dist = np.abs(crop - np.array(tc)).sum(1)
                bg = crop[dist > 120]
                if len(bg) > 0.15 * len(crop):
                    lb = float(np.median(lum(bg))); lt = float(lum(np.array(tc)))
                    cr = (max(lb, lt) + 0.05) / (min(lb, lt) + 0.05)
                    if cr < 3.0: issues[('CONTR', o['name'])].append((f, f"{cr:.1f}:1"))
    for i in range(len(texts)):
        for j in range(i + 1, len(texts)):
            a, b = texts[i], texts[j]
            ox = min(a['x'] + a['w'], b['x'] + b['w']) - max(a['x'], b['x'])
            oy = min(a['y'] + 0.85 * a['h'], b['y'] + 0.85 * b['h']) - max(a['y'] + 0.15 * a['h'], b['y'] + 0.15 * b['h'])
            if ox > 6 and oy > 6: issues[('CLASH', f"{a['name']}×{b['name']}")].append((f, f"{ox:.0f}×{oy:.0f}px"))

print(f"# Segmen 2 · laporan tata letak ({d})\n\nFrame diperiksa: {len(rows)} · temuan: {len(issues)}\n")
print("| aturan | objek | frame (s) | contoh |\n|---|---|---|---|")
for (rule, name), fr in sorted(issues.items(), key=lambda kv: (kv[0][0], kv[1][0][0])):
    fs = [x[0] for x in fr]
    print(f"| {rule} | {name} | {fs[0] / 30:.1f}–{fs[-1] / 30:.1f} ({len(fs)}) | {fr[0][1]} |")
print("\nLOLOS" if not issues else "\nGAGAL — perbaiki kode lalu ulangi Segmen 2")
