"""Ekor akhir (D-473 #14b): frame terakhir ditahan 21 frame dengan zoom pelan 1,00 → 1,03 (kamera tidak diam).
  python3 r7_ekor.py <masuk.mp4> <keluar.mp4>"""
import os, subprocess, sys, tempfile
from PIL import Image
SRC, OUT = sys.argv[1], sys.argv[2]; N = 21; FPS = '30000/1001'
d = tempfile.mkdtemp(prefix='r7ekor_')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-sseof', '-0.2', '-i', SRC, '-update', '1', os.path.join(d, 'akhir.png')], check=True)
im = Image.open(os.path.join(d, 'akhir.png')).convert('RGB'); W, H = im.size
for k in range(N):
    z = 1 + 0.03 * (k + 1) / N; w, h = W / z, H / z
    im.resize((W, H), Image.LANCZOS, box=((W - w) / 2, (H - h) / 2, (W + w) / 2, (H + h) / 2)).save(os.path.join(d, f'e{k:03d}.png'))
norm = 'format=yuv420p,setsar=1,settb=1001/30000,setpts=N'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-framerate', FPS, '-i', os.path.join(d, 'e%03d.png'),
                '-filter_complex', f'[0:v]{norm}[a];[1:v]trim=end_frame={N},{norm}[b];[a][b]concat=n=2:v=1:a=0[v]',
                '-map', '[v]', '-c:v', 'libx264', '-crf', '14', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-r', FPS, OUT], check=True)
print(OUT)
