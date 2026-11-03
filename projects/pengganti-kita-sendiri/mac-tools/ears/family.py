# SFX family (Irfan 14.20): satu file berisi beberapa varian dipisah jeda. Potong per varian (energi > -40 dB rel. puncak,
# jeda >= 60 ms), simpan tiap varian, lalu earshot describe + ukuran per varian -> pilih yang paling cocok per peran.
import os, json, subprocess, numpy as np, soundfile as sf
from earshot import api
D = os.path.expanduser('~/Downloads/SFXIrfan'); H = os.path.dirname(os.path.abspath(__file__)); O = f'{H}/fam'
os.makedirs(O, exist_ok=True)
SKIP = ('Particle Emission', 'Reggae', 'Ambience', 'documenter')   # backsound / ambience, bukan SFX
SR = 48000
def load(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2)
def meas(x):
    m = x.mean(1); S = np.abs(np.fft.rfft(m)) ** 2; f = np.fft.rfftfreq(len(m), 1 / SR); S[f < 40] = 0; tot = S.sum() + 1e-12
    hop = 480; e = np.array([np.sqrt((m[i:i + hop] ** 2).mean()) for i in range(0, max(1, len(m) - hop), hop)]) + 1e-9
    edb = 20 * np.log10(e / e.max()); pk = int(e.argmax())
    tail = next((i for i in range(pk, len(edb)) if edb[i] < -30), len(edb)) - pk
    return dict(dur=round(len(m) / SR, 3), centroid=int((f * S).sum() / tot), hi6k=round(float(100 * S[f > 6000].sum() / tot), 1),
                b26=round(float(100 * S[(f > 2000) & (f < 6000)].sum() / tot), 1), peak_ms=pk * 10, tail_ms=int(tail * 10))
out = {}
for fn in sorted(os.listdir(D)):
    if not fn.lower().endswith(('.mp3', '.wav')) or any(s in fn for s in SKIP): continue
    x = load(os.path.join(D, fn)); m = np.abs(x).max(1)
    h = int(0.01 * SR); env = np.array([m[i:i + h].max() for i in range(0, len(m), h)]) + 1e-9
    on = 20 * np.log10(env / env.max()) > -40
    segs, i = [], 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and (on[j] or (j + 6 < len(on) and on[j:j + 6].any())): j += 1   # jeda < 60 ms = satu varian
            if j - i >= 3: segs.append((max(0, i - 1) * h, min(len(x), (j + 2) * h)))
            i = j
        else: i += 1
    base = os.path.splitext(fn)[0].replace(' ', '_').replace(',', '').replace(':', '-')[:40]
    out[fn] = []
    for k, (a, b) in enumerate(segs[:8]):
        seg = x[a:b].copy(); fo = min(len(seg), int(0.01 * SR)); seg[-fo:] *= np.linspace(1, 0, fo)[:, None]
        p = f'{O}/{base}__v{k}.wav'; sf.write(p, seg, SR)
        d = api.describe(p); s = d.get('summary') if isinstance(d, dict) else str(d)
        row = dict(var=k, start=round(a / SR, 3), file=os.path.basename(p), **meas(seg), describe=s)
        out[fn].append(row)
        print('VAR', fn[:45], k, json.dumps({kk: row[kk] for kk in ('start', 'dur', 'centroid', 'hi6k', 'b26', 'peak_ms', 'tail_ms')}), '|', s[:170], flush=True)
    print('FILE', fn, len(segs), 'varian', flush=True)
json.dump(out, open(f'{H}/family.json', 'w'), indent=1)
print('FAMILY_DONE')
