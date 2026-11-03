# Kurva gerak per frame dari video bisu (untuk menyelaraskan SFX ke objek, port The Gap sync_cues.py).
# Keluar: JSON {fps, glob: [beda rata2 frame i→i+1], onset: [kenaikan sel terkuat di frame i], flow: [besar gerak kamera (phase-corr) per frame]}
import sys, json, subprocess, numpy as np
vid, out = sys.argv[1], sys.argv[2]
W, H, GX, GY = 256, 144, 8, 6
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', vid, '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
d = np.abs(np.diff(fr, axis=0))
cell = d.reshape(len(d), GY, H // GY, GX, W // GX).mean((2, 4)).reshape(len(d), -1)
rise = np.maximum(0, cell[1:] - cell[:-1])
onset = np.concatenate([[0, 0], rise.max(1)])
glob = np.concatenate([[0], d.mean((1, 2))])
# gerak kamera: pergeseran global (phase correlation) + perubahan skala kasar lewat beda frame yang diselaraskan
win = np.outer(np.hanning(H), np.hanning(W)).astype(np.float32)
flow = [0.0]
for i in range(1, len(fr)):
    A = np.fft.fft2(fr[i - 1] * win); B = np.fft.fft2(fr[i] * win)
    R = A * np.conj(B); R /= np.abs(R) + 1e-6
    r = np.fft.ifft2(R).real; y, x = np.unravel_index(r.argmax(), r.shape)
    y = y - H if y > H // 2 else y; x = x - W if x > W // 2 else x
    flow.append(float(np.hypot(x, y)))
json.dump({'fps': 30, 'n': len(fr), 'glob': [round(float(v), 3) for v in glob], 'onset': [round(float(v), 3) for v in onset], 'flow': [round(v, 2) for v in flow]}, open(out, 'w'))
print('MOTION_DONE', len(fr))
