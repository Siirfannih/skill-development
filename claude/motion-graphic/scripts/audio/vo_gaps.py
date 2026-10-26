"""List every silent run in the assembled VO (from vo.json chunk starts + trim wavs). usage: vo_gaps.py vo.json vodir"""
import json, sys, numpy as np, soundfile as sf
v = json.load(open(sys.argv[1])); d = sys.argv[2]; SR = 48000
N = int((v['total'] + 1.0) * SR); b = np.zeros(N)
for c in v['chunks']:
    x, sr = sf.read(f'{d}/{c["id"]}_trim.wav'); x = x if x.ndim == 1 else x.mean(1)
    i0 = int(c['start'] * SR); b[i0:i0 + len(x)] += x[: N - i0]
hop = int(0.01 * SR); n = N // hop
r = np.sqrt(np.mean(b[: n * hop].reshape(n, hop) ** 2, 1)); thr = 10 ** (-42 / 20) * np.max(np.abs(b))
q = r < thr; runs = []; s = None
for j in range(n + 1):
    if j < n and q[j]:
        if s is None: s = j
    else:
        if s is not None and (j - s) >= 25: runs.append((s / 100, j / 100))
        s = None
W = v['words']
def near(t):
    a = max([w for w in W if w['s'] <= t], key=lambda w: w['s'], default={'w': '^'}); bb = min([w for w in W if w['s'] > t], key=lambda w: w['s'], default={'w': '$'})
    return a['w'], bb['w']
tot = 0
for a, b_ in runs:
    tot += b_ - a; p, nx = near(a)
    print(f'{a:6.2f}-{b_:6.2f}  {b_-a:4.2f}s  {p} | {nx}')
print('silence >=0.25s total', round(tot, 2), 'of', round(N / SR - 1, 1))
