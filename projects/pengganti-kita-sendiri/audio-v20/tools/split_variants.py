"""Potong tiap file SFX Irfan menjadi varian (wilayah bunyi dipisah hening).
Keluaran: /home/claude/pks/v20/var/<slug>__vNN.wav (48 kHz stereo) + variants.json"""
import json, re, subprocess, sys, pathlib
import numpy as np, soundfile as sf

SRC = pathlib.Path('/mnt/user-data/uploads/SFXIrfan')
OUT = pathlib.Path('/home/claude/pks/v20/var'); OUT.mkdir(parents=True, exist_ok=True)
SKIP = ('Particle Emission', 'Reggae', 'documenter', 'Ambience')

def load(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(p), '-f', 'f32le', '-ac', '2', '-ar', '48000', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()

def slug(name):
    return re.sub(r'[^A-Za-z0-9]+', '_', name.replace('ES_', 'ES ').split(' - Epidemic')[0]).strip('_')[:48]

def regions(x, sr=48000, rel_db=-40, gap=0.09, minlen=0.03):
    m = np.abs(x).max(1)
    win = int(0.005 * sr)
    env = np.sqrt(np.convolve(m ** 2, np.ones(win) / win, 'same'))
    thr = env.max() * 10 ** (rel_db / 20)
    on = env > thr
    idx = np.flatnonzero(on)
    if not len(idx): return []
    segs, s, prev = [], idx[0], idx[0]
    for i in idx[1:]:
        if i - prev > gap * sr:
            segs.append((s, prev)); s = i
        prev = i
    segs.append((s, prev))
    out = []
    for a, b in segs:
        if (b - a) / sr < minlen: continue
        a = max(0, a - int(0.004 * sr)); b = min(len(x), b + int(0.04 * sr))
        out.append((a, b))
    return out

meta = {}
for p in sorted(SRC.glob('*.mp3')):
    if any(k in p.name for k in SKIP): continue
    x = load(p); sl = slug(p.stem)
    segs = regions(x)
    meta[sl] = {'file': p.name, 'dur': len(x) / 48000, 'variants': []}
    for i, (a, b) in enumerate(segs):
        y = x[a:b].copy()
        f = int(0.003 * 48000); y[-f:] *= np.linspace(1, 0, f)[:, None]
        fn = OUT / f'{sl}__v{i:02d}.wav'
        sf.write(fn, y, 48000, subtype='FLOAT')
        pk = 20 * np.log10(np.abs(y).max() + 1e-9)
        meta[sl]['variants'].append({'path': str(fn), 'start': a / 48000, 'dur': (b - a) / 48000, 'peak_db': round(float(pk), 1)})
    print(f'{sl:50s} {len(segs):3d} variants  ' + ' '.join(f"{v['start']:.2f}+{v['dur']:.2f}" for v in meta[sl]['variants'][:12]))
json.dump(meta, open(OUT / 'variants.json', 'w'), indent=1)
