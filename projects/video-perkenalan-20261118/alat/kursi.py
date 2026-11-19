# kursi.py · PERCOBAAN, TIDAK DIPAKAI di render (19 Nov): buang sayap kursi gaming dari matte RVM #15 (f1076–1189). Hasil pratinjau qc/kursi/ memotong bahu / melubangi kaos, jadi #15 tetap memakai fg.webm asli (DECISIONS D18).
# RVM dan human parsing sama-sama menganggap kursi bagian badan. Zona per frame: samping leher di atas garis bahu, di luar kolom
# wajah. Di zona itu hanya dibuang kain abu kursi (abu tak jenuh, blok ≥ 25 px) dan sisa matte setengah transparan; piksel hitam
# tidak disentuh (kaos hitam = sandaran hitam, memotongnya merusak bahu). Dilindungi: wajah, rambut, lengan/tangan (dilasi 41 px, mik). Label dari mattmdjaga/segformer_b2_clothes; bbox wajah dihaluskan ±2 f.
# Pakai: ~/work/mg-venv/bin/python alat/kursi.py [frame ...]   (dengan frame: hanya pratinjau ke qc/kursi/)
import os, subprocess, sys, numpy as np, torch, cv2
from PIL import Image
from transformers import SegformerImageProcessor, AutoModelForSemanticSegmentation

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A, B, W, H = 1076, 1190, 1080, 1920
SRC = f'{R}/kerja/matte/fg.webm'
torch.set_num_threads(int(os.environ.get('THREADS', 4)))
M = 'mattmdjaga/segformer_b2_clothes'
proc = SegformerImageProcessor.from_pretrained(M); model = AutoModelForSemanticSegmentation.from_pretrained(M).eval()
uji = [int(x) for x in sys.argv[1:]]


def baca(a, b):
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', SRC, '-vf', f'trim=start_frame={a}:end_frame={b},setpts=PTS-STARTPTS',
                          '-f', 'rawvideo', '-pix_fmt', 'rgba', '-'], stdout=subprocess.PIPE)
    while True:
        buf = p.stdout.read(W * H * 4)
        if len(buf) < W * H * 4: break
        yield np.frombuffer(buf, np.uint8).reshape(H, W, 4).copy()


def label(rgb):
    with torch.no_grad():
        lg = model(**proc(images=Image.fromarray(rgb), return_tensors='pt')).logits
    return torch.nn.functional.interpolate(lg, size=(H, W), mode='bilinear').argmax(1)[0].numpy()


def kotak_wajah(lab):
    ys, xs = np.where(lab == 11)
    return np.array([np.percentile(xs, 1), np.percentile(xs, 99), np.percentile(ys, 1), np.percentile(ys, 99)])


def bersihkan(rgba, lab, kw):
    fx0, fx1, fy0, fy1 = kw; h = fy1 - fy0
    yy, xx = np.mgrid[0:H, 0:W]
    jarak = np.where(xx < fx0, fx0 - xx, np.where(xx > fx1, xx - fx1, 0))
    zona = (jarak > 0) & (yy > fy0 + 0.3 * h) & (yy < fy1 + 0.05 * h + 0.25 * jarak)
    k = lambda n: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (n, n))
    lindung = cv2.dilate(np.isin(lab, [2, 11]).astype(np.uint8), k(9)) | cv2.dilate(np.isin(lab, [14, 15]).astype(np.uint8), k(41))
    rgb = rgba[..., :3].astype(np.float32); al = rgba[..., 3]
    mx, mn = rgb.max(2), rgb.min(2); lum = rgb.mean(2); sat = (mx - mn) / (mx + 1)
    # kain abu kursi: abu tidak jenuh, blok lebar (opening 25 px membuang garis-garis abu motif kaos)
    abu = ((lum > 55) & (lum < 175) & (sat < 0.18) & (al > 8)).astype(np.uint8)
    abu = cv2.morphologyEx(abu, cv2.MORPH_OPEN, k(25))
    # sisa matte setengah transparan (asap abu di tepi kursi)
    tipis = cv2.morphologyEx(((al > 8) & (al < 235)).astype(np.uint8), cv2.MORPH_OPEN, k(5))
    buang = (zona & (lindung == 0) & ((abu > 0) | (tipis > 0))).astype(np.float32)
    buang = cv2.GaussianBlur(cv2.dilate(buang, k(5)), (0, 0), 3)
    out = rgba.copy()
    out[..., 3] = (al * (1 - np.clip(buang * 1.5, 0, 1))).astype(np.uint8)
    return out, buang


frames = list(baca(A, B))
labs = [label(f[..., :3]) for f in frames] if not uji else None
if uji:
    os.makedirs(f'{R}/qc/kursi', exist_ok=True)
    tiles = []
    for f in uji:
        rgba = frames[f - A]; lab = label(rgba[..., :3]); out, buang = bersihkan(rgba, lab, kotak_wajah(lab))
        for x in (rgba, out):
            bg = np.full((H, W, 3), 232, np.float32); al = x[..., 3:4] / 255.
            tiles.append(cv2.resize((x[..., :3] * al + bg * (1 - al)).astype(np.uint8), (360, 640)))
    Image.fromarray(np.hstack(tiles)).save(f'{R}/qc/kursi/pratinjau.jpg', quality=85)
    sys.exit()
kw = np.array([kotak_wajah(l) for l in labs])
kw_halus = np.array([np.median(kw[max(0, i - 2):i + 3], 0) for i in range(len(kw))])
wr = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{W}x{H}', '-r', '30', '-i', '-',
                       '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '6M', '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1',
                       f'{R}/kerja/matte/fg_s15.webm'], stdin=subprocess.PIPE)
for f, l, k in zip(frames, labs, kw_halus):
    wr.stdin.write(bersihkan(f, l, k)[0].tobytes())
wr.stdin.close(); wr.wait()
print('fg_s15.webm', len(frames), 'frame')
