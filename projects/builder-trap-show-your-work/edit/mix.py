import json, subprocess, sys, numpy as np, soundfile as sf
SR = 48000; TOTAL = 96.0; N = int(TOTAL * SR)
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
        a = load(c['file']); m = np.abs(a).max(1); nz = np.argmax(m > 10 ** (-45 / 20)); a = a[nz:]; cache[c['file']] = a / max(1e-6, np.abs(a).max())  # peak-normalised (guide/sfx)
    a = cache[c['file']]
    if c.get('dur'):
        n = int(c['dur'] * SR); a = a[:n].copy(); f = min(n, int(0.08 * SR)); a[-f:] *= np.linspace(1, 0, f)[:, None]
    i = int(c['t'] * SR)
    if c['peran'] in ('whoosh', 'riser', 'kamera', 'flip', 'garis'):  # guide/sfx: the PEAK lands on the visual frame
        i = max(0, i - int(np.argmax(np.abs(a).max(1))))
    a = a[:N - i] * db(c['db'])
    sfx[i:i + len(a)] += a
# SFX step down 5 dB while words are spoken (rule 36; review r3: SFX sat within 3 dB of the voice)
wv = np.zeros(N)
for w in json.load(open('remotion/src/captions.json'))['words']:
    wv[int(w[0] * SR):int(w[1] * SR)] = 1
kk = int(0.08 * SR); wv = np.convolve(wv, np.ones(kk) / kk, 'same')
sfx *= (1 - wv * (1 - 10 ** (-5 / 20)))[:, None]
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
env[:int(44.0 * SR)] -= 3.0  # review r4: bed sat 3.5–7 dB under the voice here
env[int(58.6 * SR):int(62.4 * SR)] += 2.5  # 'sadar': the bed rises with the realisation
env[int(82.6 * SR):] -= 3.0  # the track lifts here; keep the voice on top (audio_phone VO clarity)
k = int(0.25 * SR); kern = np.ones(k) / k; env = np.convolve(env, kern, 'same')  # >=250 ms ramps
fade = np.ones(N); fi = int(0.02 * SR); fade[:fi] = np.linspace(0, 1, fi);  # full level from frame 0 (rule 32)
fo = int(0.9 * SR); fade[-fo:] = np.linspace(1, 0, fo) ** 1.5
MUS_BASE = float(sys.argv[1]) if len(sys.argv) > 1 else -17.0
mus = mus * (db(MUS_BASE + env) * fade)[:, None]
# EQ dip ~3 kHz on music (-4 dB) via ffmpeg later; write stems
for name, a in [('voice', voice), ('sfx', sfx), ('music', mus)]: sf.write(f'audio/stem_{name}.wav', a, SR, subtype='FLOAT')
print('stems ok')
