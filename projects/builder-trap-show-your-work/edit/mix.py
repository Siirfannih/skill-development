import json, subprocess, sys, numpy as np, soundfile as sf
SR = 48000; TOTAL = 97.5; N = int(TOTAL * SR)
MUSIC_OFF = 47.9
def load(path, ss=0, t=None, mono=False):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(ss)] + (['-t', str(t)] if t else []) + ['-i', path, '-ac', '1' if mono else '2', '-ar', str(SR), '-f', 'f32le', '-']
    a = np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32)
    return a.reshape(-1, 1 if mono else 2)
db = lambda x: 10 ** (x / 20)
# voice (mono -> centre)
v = load('edit/voice_edit.wav', mono=True)[:, 0]
voice = np.zeros((N, 2), np.float32); voice[:len(v)] = np.repeat(v[:N, None], 2, 1)
# sfx
sfx = np.zeros((N, 2), np.float32)
cues = json.load(open('audio/cues.json'))['cues']
cache = {}
for c in cues:
    if c['file'] not in cache:
        a = load(c['file']); m = np.abs(a).max(1); nz = np.argmax(m > 10 ** (-45 / 20)); cache[c['file']] = a[nz:]
    a = cache[c['file']]
    if c.get('dur'):
        n = int(c['dur'] * SR); a = a[:n].copy(); f = min(n, int(0.08 * SR)); a[-f:] *= np.linspace(1, 0, f)[:, None]
    i = int(c['t'] * SR); a = a[:N - i] * db(c['db'])
    sfx[i:i + len(a)] += a
# music with automation: base under voice, lift in gaps > 0.6 s and tail
mus = load('music/track.wav', ss=MUSIC_OFF, t=TOTAL)
mus = np.pad(mus, ((0, max(0, N - len(mus))), (0, 0)))[:N]
words = json.load(open('remotion/src/captions.json'))['words']
env = np.full(N, 0.0)  # dB offset
spans = [(w[0], w[1]) for w in words]
gaps = [(spans[k][1], spans[k + 1][0]) for k in range(len(spans) - 1) if spans[k + 1][0] - spans[k][1] > 0.6] + [(spans[-1][1] + 0.1, TOTAL)]
for a, b in gaps:
    ia, ib = int((a + 0.15) * SR), int((b - 0.1) * SR)
    if ib - ia < int(0.3 * SR): continue
    env[ia:ib] = 4.0
k = int(0.25 * SR); kern = np.ones(k) / k; env = np.convolve(env, kern, 'same')  # >=250 ms ramps
fade = np.ones(N); fi = int(1.2 * SR); fade[:fi] = np.linspace(0, 1, fi); fo = int(1.6 * SR); fade[-fo:] = np.linspace(1, 0, fo) ** 1.5
MUS_BASE = float(sys.argv[1]) if len(sys.argv) > 1 else -17.0
mus = mus * (db(MUS_BASE + env) * fade)[:, None]
# EQ dip ~3 kHz on music (-4 dB) via ffmpeg later; write stems
for name, a in [('voice', voice), ('sfx', sfx), ('music', mus)]: sf.write(f'audio/stem_{name}.wav', a, SR, subtype='FLOAT')
print('stems ok')
