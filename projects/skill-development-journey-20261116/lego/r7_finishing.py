"""Finishing Sutradara putaran 7 (D-468, D-470): transisi kamera bermomentum di titik yang sebelumnya potong keras.
Tiap transisi punya titik mulai (objek pemicu yang terlihat) dan titik akhir (adegan berikut mendarat).
  T72 · D → Blender: dorong ke Clawd di baris "Selesai" (f2148–2159, percepatan, blur gerak),
        lalu Blender mendarat dari 1,35× ke Clawd 3D (f2160–2171, perlambatan).
  T76 · Blender → IG: dorong ke pratinjau wajah di monitor (f2278–2289) sampai memenuhi frame; frame 2290 = wajah penuh.
  python3 r7_finishing.py <visual masuk.mp4> <visual keluar.mp4>
"""
import os, subprocess, sys, tempfile
from PIL import Image

W, H, FPS = 1920, 1080, '30000/1001'
SRC, OUT = sys.argv[1], sys.argv[2]
# (frame awal, jumlah, pusat x, pusat y, zoom awal, zoom akhir, kurva, blur)
SEG = [
    (2148, 12, 280, 806, 1.0, 9.0, 'masuk', True),
    (2160, 12, 740, 840, 1.35, 1.0, 'mendarat', False),
    (2278, 12, 1498, 280, 1.0, 4.4, 'masuk', True),
]

def kurva(p, jenis):
    return p ** 2.2 if jenis == 'masuk' else 1 - (1 - p) ** 2.6

def ambil(f0, n, d):
    t = f0 * 1001 / 30000
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.6f}', '-i', SRC, '-frames:v', str(n + 1),
                    os.path.join(d, 'i%03d.png')], check=True)
    return [Image.open(os.path.join(d, f'i{k:03d}.png')).convert('RGB') for k in range(1, n + 2)]

def zoom(img, cx, cy, z):
    w, h = W / z, H / z
    x0 = min(max(cx - w / 2, 0), W - w); y0 = min(max(cy - h / 2, 0), H - h)
    return img.resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + w, y0 + h))

tmp = tempfile.mkdtemp(prefix='r7fin_')
ganti = {}
for f0, n, cx, cy, za, zb, jenis, blur in SEG:
    d = os.path.join(tmp, str(f0)); os.makedirs(d)
    src = ambil(f0, n, d)
    for k in range(n):
        if blur:   # blur gerak: rata-rata 3 sub-zoom di sekitar posisi frame ini
            subs = []
            for s in (-0.33, 0, 0.33):
                p = min(max((k + s) / (n - 1), 0), 1)
                subs.append(zoom(src[k], cx, cy, za + (zb - za) * kurva(p, jenis)))
            im = Image.blend(Image.blend(subs[0], subs[2], 0.5), subs[1], 0.5)
        else:
            im = zoom(src[k], cx, cy, za + (zb - za) * kurva(k / (n - 1), jenis))
        p = os.path.join(tmp, f'g{f0 + k:05d}.png'); im.save(p); ganti[f0 + k] = p

# rakit: frame ganti di-overlay di atas video dasar pada posisinya (jumlah frame = dasar, tidak ada concat)
runs = sorted(ganti); bagian, blok = [], []
for fr in runs:
    if blok and fr == blok[-1] + 1: blok.append(fr)
    else:
        if blok: bagian.append(blok)
        blok = [fr]
bagian.append(blok)
inputs = ['-i', SRC]; filt = []; lab = []; pos = 0
norm = f'format=yuv420p,setsar=1,settb=1001/30000,setpts=N'
for i, b in enumerate(bagian):
    filt.append(f'[0:v]trim=start_frame={pos}:end_frame={b[0]},{norm}[a{i}]'); lab.append(f'[a{i}]')
    inputs += ['-framerate', FPS, '-start_number', str(b[0]), '-i', os.path.join(tmp, 'g%05d.png')]
    filt.append(f'[{i + 1}:v]trim=end_frame={len(b)},{norm}[g{i}]'); lab.append(f'[g{i}]')
    pos = b[-1] + 1
filt.append(f'[0:v]trim=start_frame={pos},{norm}[z]'); lab.append('[z]')
filt.append(''.join(lab) + f'concat=n={len(lab)}:v=1:a=0[v]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(filt), '-map', '[v]',
                '-c:v', 'libx264', '-crf', '14', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-r', FPS, OUT], check=True)
print(OUT, len(ganti), 'frame diganti')
