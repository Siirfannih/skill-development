# kepala.py <fg.webm> <out.json> [offset]: puncak kepala, pusat x, lebar kepala, dagu (perkiraan) per frame dari alpha RVM.
import subprocess, sys, json, numpy as np
src, out = sys.argv[1], sys.argv[2]; off = int(sys.argv[3]) if len(sys.argv) > 3 else 0
W, H = 270, 480
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', src, '-vf', f'alphaextract,scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], stdout=subprocess.PIPE)
res = {}; n = 0
while True:
    b = p.stdout.read(W * H)
    if len(b) < W * H: break
    a = np.frombuffer(b, np.uint8).reshape(H, W) > 128
    rows = np.where(a.sum(1) > 3)[0]
    if len(rows):
        top = rows[0]
        # lebar kepala: median lebar baris di pita top+8%..top+20% tinggi frame
        band = a[top + int(0.06 * H): top + int(0.16 * H)]
        ws = [r.nonzero()[0] for r in band if r.any()]
        if ws:
            l = np.median([w[0] for w in ws]); r = np.median([w[-1] for w in ws]); cx = (l + r) / 2; fw = r - l
            res[n + off] = [round(cx * 4), round(top * 4), round(fw * 4)]
    n += 1
json.dump(res, open(out, 'w')); print('frames', n)
