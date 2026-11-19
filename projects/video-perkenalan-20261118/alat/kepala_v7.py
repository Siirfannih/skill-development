# kepala_v7.py · kotak wajah + kepala per frame footage TH (v7, 19 Nov). Dipakai gerbang "wajah tidak ter-crop" (D-001) dan peta ruang teks.
# YuNet (opencv_zoo face_detection_yunet_2023mar.onnx, kerja/v7/model/) di skala 0,5, kotak skor tertinggi; celah diisi interpolasi di dalam segmen EDL yang sama (tidak menyeberang sambungan), lalu median 5 f.
# kepala = wajah diperluas: atas +0,55 h (rambut), samping +0,18 w, bawah +0,08 h (dagu).
# Pakai: ~/work/mg-venv/bin/python alat/kepala_v7.py → kerja/v7/kepala.json {f: [kx0,ky0,kx1,ky1, wx0,wy0,wx1,wy1]} @1080x1920
import json, os, subprocess, numpy as np, cv2

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, N, W, H, S = f'{R}/sumber/gabungan_v6.mp4', 1843, 1080, 1920, 0.5
w2, h2 = int(W * S), int(H * S)
det = cv2.FaceDetectorYN.create(f'{R}/kerja/v7/model/yunet.onnx', '', (w2, h2), 0.6)
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', SRC, '-frames:v', str(N), '-vf', f'scale={w2}:{h2}', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'],
                     stdout=subprocess.PIPE)
box = np.full((N, 4), np.nan); hit = 0
for f in range(N):
    buf = p.stdout.read(w2 * h2 * 3)
    if len(buf) < w2 * h2 * 3: break
    _, d = det.detect(np.frombuffer(buf, np.uint8).reshape(h2, w2, 3))
    if d is not None and len(d):
        x, y, w, h = max(d, key=lambda r: r[14])[:4] / S; box[f] = [x, y, x + w, y + h]; hit += 1
seg = [round(s['out_in'] * 30) for s in json.load(open(f'{R}/sumber/edl_v6.json'))['segments']] + [N]
for a, b in zip(seg[:-1], seg[1:]):
    idx = np.arange(a, min(b, N)); ok = ~np.isnan(box[idx, 0])
    if ok.sum() == 0: continue
    for k in range(4): box[idx, k] = np.interp(idx, idx[ok], box[idx[ok], k])
    sm = box[idx].copy()
    for j in range(len(idx)): sm[j] = np.median(box[idx[max(0, j - 2):j + 3]], 0)
    box[idx] = sm
out = {}
for i, (x0, y0, x1, y1) in enumerate(box):
    if np.isnan(x0): continue
    w, h = x1 - x0, y1 - y0
    out[i] = [round(v) for v in (x0 - 0.18 * w, y0 - 0.55 * h, x1 + 0.18 * w, y1 + 0.08 * h, x0, y0, x1, y1)]
os.makedirs(f'{R}/kerja/v7', exist_ok=True)
json.dump(out, open(f'{R}/kerja/v7/kepala.json', 'w'))
print('frame', N, 'terdeteksi', hit, 'terisi', len(out))
