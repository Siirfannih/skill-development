"""Cutout subjek beralfa per klip (untuk AnchorWord di belakang kepala).
Output: <out>/<key>.webm (VP9 yuva420p, resolusi/fps/durasi = sumber) — dipakai sebagai lapisan fg di atas teks.
Model: rembg u2net_human_seg; mask di-EMA 3 frame + feather 2 px supaya tidak berkedip.
usage: python3 make_mattes.py <src.mp4> <key> <out_dir>
"""
import sys, subprocess, numpy as np, cv2
from rembg import new_session, remove
from PIL import Image

src, key, out = sys.argv[1:4]
pr = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout.strip().split(',')
w, h = int(pr[0]), int(pr[1]); num, den = pr[2].split('/'); fps = float(num) / float(den)
dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
sess = new_session('u2net_human_seg')
enc = subprocess.Popen(['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{w}x{h}', '-r', f'{fps}', '-i', '-',
                        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '28', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4',
                        f'{out}/{key}.webm'], stdin=subprocess.PIPE)
prev = None; n = 0
while True:
    buf = dec.stdout.read(w * h * 3)
    if len(buf) < w * h * 3: break
    rgb = np.frombuffer(buf, np.uint8).reshape(h, w, 3)
    small = cv2.resize(rgb, (w // 2, h // 2), interpolation=cv2.INTER_AREA)
    m = np.array(remove(Image.fromarray(small), session=sess, only_mask=True), np.float32) / 255
    m = cv2.resize(m, (w, h), interpolation=cv2.INTER_LINEAR)
    m = m if prev is None else 0.6 * m + 0.4 * prev; prev = m
    a = cv2.GaussianBlur(np.clip((m - 0.35) / 0.3, 0, 1), (5, 5), 0)
    rgba = np.dstack([rgb, (a * 255).astype(np.uint8)])
    enc.stdin.write(rgba.tobytes()); n += 1
enc.stdin.close(); enc.wait()
print(key, n, 'frames', fps, 'fps', w, 'x', h)
