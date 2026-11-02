"""Ukur gambar sendiri: luminans, energi gerak (beda frame) dan kecepatan kamera (phase correlation + skala)
per frame dari video bisu. Keluaran: /home/claude/pks/v20/motion.npz"""
import subprocess, numpy as np
V = '/mnt/user-data/uploads/AI-Video/pks-studio/seg/v11final_v.mp4'
W, H = 192, 108
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', V, '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'],
                     capture_output=True, check=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32) / 255
lum = f.mean((1, 2))
diff = np.r_[0, np.abs(np.diff(f, axis=0)).mean((1, 2))]
win = np.outer(np.hanning(H), np.hanning(W))
def shift(a, b):
    A = np.fft.fft2((a - a.mean()) * win); B = np.fft.fft2((b - b.mean()) * win)
    R = A * np.conj(B); R /= np.abs(R) + 1e-9
    r = np.fft.ifft2(R).real; i, j = np.unravel_index(r.argmax(), r.shape)
    if i > H // 2: i -= H
    if j > W // 2: j -= W
    return np.hypot(i, j)
vel = np.r_[0, [shift(f[k], f[k - 1]) for k in range(1, len(f))]]
np.savez('/home/claude/pks/v20/motion.npz', lum=lum, diff=diff, vel=vel, fps=30.0)
print(len(f), 'frames')
