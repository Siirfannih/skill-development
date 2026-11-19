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
    (2148, 12, 253, 817, 1.0, 9.0, 'masuk', True),
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

# D-484: kamera kontekstual adegan Claude kaca (f707–f1030) + jembatan masuk/keluar.
# kunci: (frame global, zoom, pusat x, pusat y); antar-kunci ease in-out (tidak pernah diam karena kunci selalu berbeda).
FPSF = 30000 / 1001
def F(t): return round(t * FPSF)
KAMERA = [
    (F(23.59), 1.30, 960, 470), (F(23.98), 1.03, 960, 470),        # mendarat dari dorong wajah (perlambatan)
    (F(25.55), 1.07, 960, 520),                                     # beranda kosong, dorong pelan ke salam+kolom
    (F(27.90), 1.16, 900, 600),                                     # unggah MP4: ke kolom input
    (F(28.90), 1.20, 860, 560),                                     # menu Template / pilih
    (F(29.30), 1.12, 960, 330),                                     # kirim: naik ke gelembung
    (F(30.15), 1.14, 1010, 300),                                    # tahan dekat percakapan sebelum Chat baru
    (F(30.60), 1.10, 1000, 560),                                     # beranda lagi, turun ke kolom
    (F(31.80), 1.16, 1000, 610),                                     # ketik cinematic
    (F(32.15), 1.12, 980, 320),                                     # kirim
    (F(33.25), 1.16, 1000, 610),                                     # ngebalik: ketik di kolom
    (F(33.85), 1.10, 980, 360),                                     # kirim → balasan
    (F(34.08), 1.12, 1000, 470),                                     # tahan pada balasan Claude
]
KELUAR = (F(34.08), F(34.40), 800, 420, 1.12, 3.4)                  # dorong menembus balasan (percepatan + blur)
MASUK_WAJAH = (F(23.30), F(23.59), 960, 400, 1.0, 2.0)              # dorong wajah "putus-putus" (percepatan + blur)
MENDARAT_WAJAH = (F(34.40), 12, 960, 430, 1.30, 1.0)                # wajah mendarat setelah adegan

def ease(p): return p * p * (3 - 2 * p)

tmp = tempfile.mkdtemp(prefix='r7fin_')
ganti = {}
for f0, n, cx, cy, za, zb, jenis, blur in SEG:
    d = os.path.join(tmp, str(f0)); os.makedirs(d)
    src = ambil(f0, n, d)
    for k in range(n):
        if blur:   # blur gerak: rata-rata 3 sub-zoom di sekitar posisi frame ini
            import numpy as np   # 9 sub-zoom merata (blur gerak halus, bukan salinan bertumpuk; D-473 #8)
            acc = None
            for s in np.linspace(-0.5, 0.5, 9):
                p = min(max((k + s) / (n - 1), 0), 1)
                a = np.asarray(zoom(src[k], cx, cy, za + (zb - za) * kurva(p, jenis)), dtype=np.float32)
                acc = a if acc is None else acc + a
            im = Image.fromarray((acc / 9).clip(0, 255).astype('uint8'))
        else:
            im = zoom(src[k], cx, cy, za + (zb - za) * kurva(k / (n - 1), jenis))
        p = os.path.join(tmp, f'g{f0 + k:05d}.png'); im.save(p); ganti[f0 + k] = p

def ganti_rentang(f0, n, fn_zoom_blur, d):
    src = ambil(f0, n - 1, d)
    for k in range(n):
        z, cx, cy, blur = fn_zoom_blur(f0 + k)
        if blur:
            import numpy as np
            acc = None
            for s_ in np.linspace(-0.5, 0.5, 9):
                z2, cx2, cy2, _ = fn_zoom_blur(f0 + k + s_)
                a = np.asarray(zoom(src[k], cx2, cy2, z2), dtype=np.float32); acc = a if acc is None else acc + a
            im = Image.fromarray((acc / 9).clip(0, 255).astype('uint8'))
        else:
            im = zoom(src[k], cx, cy, z)
        p = os.path.join(tmp, f'g{f0 + k:05d}.png'); im.save(p); ganti[f0 + k] = p

def kamera_claude(g):
    if g >= KELUAR[0]:
        a, b, cx, cy, za, zb = KELUAR; p = min(max((g - a) / (b - a), 0), 1)
        return za + (zb - za) * p ** 2.2, cx, cy, True
    for (f1, z1, x1, y1), (f2, z2, x2, y2) in zip(KAMERA, KAMERA[1:]):
        if f1 <= g <= f2:
            p = ease((g - f1) / (f2 - f1)) if f1 > KAMERA[0][0] else 1 - (1 - (g - f1) / (f2 - f1)) ** 2.6
            return z1 + (z2 - z1) * p, x1 + (x2 - x1) * p, y1 + (y2 - y1) * p, False
    return KAMERA[-1][1], KAMERA[-1][2], KAMERA[-1][3], False

def lurus(seg):
    a, b, cx, cy, za, zb = seg
    return lambda g: (za + (zb - za) * min(max((g - a) / (b - a), 0), 1) ** 2.2, cx, cy, True)

def mendarat(g):
    a, n, cx, cy, za, zb = MENDARAT_WAJAH; p = min(max((g - a) / (n - 1), 0), 1)
    return za + (zb - za) * (1 - (1 - p) ** 2.6), cx, cy, False

for nama, f0, n, fn in [('masuk', MASUK_WAJAH[0], MASUK_WAJAH[1] - MASUK_WAJAH[0], lurus(MASUK_WAJAH)),
                        ('claude', KAMERA[0][0], KELUAR[1] - KAMERA[0][0], kamera_claude),
                        ('mendarat', MENDARAT_WAJAH[0], MENDARAT_WAJAH[1], mendarat)]:
    d = os.path.join(tmp, nama); os.makedirs(d); ganti_rentang(f0, n, fn, d)

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
