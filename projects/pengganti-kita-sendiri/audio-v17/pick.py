"""Pilih SFX per peran: bukan hanya 'cocok judul' (earshot rank) tapi juga 'enak & tidak sumbang':
- nada: kalau bunyinya bernada (pyin voiced > 40 %), nadanya harus di tangga G minor (lagu); kalau tidak -> SUMBANG
- kasar: modulasi amplop 30-150 Hz (roughness) ; desis: porsi > 8 kHz ; gigit: porsi 2-6 kHz
- earshot match ke deskripsi peran DENGAN pengecoh, + earshot match 'harsh grating' vs 'pleasant smooth'
- realness
usage: pick.py role 'query' alt1|alt2|... files..."""
import sys, json, numpy as np, librosa, scipy.signal as ss
from earshot import api
role, q, alts = sys.argv[1], sys.argv[2], sys.argv[3].split('|'); files = sys.argv[4:]
GMIN = {7, 9, 10, 0, 2, 3, 5}  # G A Bb C D Eb F
rows = []
for f in files:
    y, sr = librosa.load(f, sr=44100, mono=True)
    if np.abs(y).max() < 1e-4: continue
    y = y / np.abs(y).max()
    S = np.abs(np.fft.rfft(y)) ** 2; fr = np.fft.rfftfreq(len(y), 1 / sr); t = S.sum() + 1e-12
    b = lambda a, c: float(S[(fr >= a) & (fr < c)].sum() / t)
    env = np.abs(ss.hilbert(y)); env = ss.sosfilt(ss.butter(2, 300, 'low', fs=sr, output='sos'), env)
    act = env > env.max() * 0.03; e = env[act] if act.sum() > 100 else env
    m = ss.sosfilt(ss.butter(2, [30, 150], 'band', fs=sr, output='sos'), e); rough = float(np.sqrt(np.mean(m ** 2)) / (np.mean(e) + 1e-9))
    f0, vf, vp = librosa.pyin(y[:sr * 2], fmin=80, fmax=2000, sr=sr, frame_length=2048)
    voiced = float(np.mean(vf)) if len(vf) else 0.0
    pc = None; inkey = True
    if voiced > 0.4 and np.any(vf):
        midi = librosa.hz_to_midi(np.nanmedian(f0[vf])); pc = int(round(midi)) % 12; inkey = pc in GMIN
    mt = api.match(f, q, alts=alts); hs = api.match(f, 'a harsh scratchy grating unpleasant sound', alts=['a soft smooth pleasant sound'])
    rl = api.realness(f)
    rows.append(dict(file=f.split('/')[-1], z=round(mt['z'], 2), verdict=mt['verdict'], harsh_z=round(hs['z'], 2), real=round(rl['p_real'], 2),
                     tonal=round(voiced, 2), pitch_class=pc, in_key=inkey, rough=round(rough, 2), hiss8k=round(b(8000, 22050), 2), bite2_6k=round(b(2000, 6000), 2),
                     low300=round(b(0, 300), 2), dur=round(len(y)/sr, 3), cen=int((S * fr).sum() / t)))
def ok(r):
    bad = []
    if not r['in_key']: bad.append('sumbang (nada di luar G minor)')
    if r['rough'] > 0.35 and r.get('dur',1) > 0.25: bad.append('kasar')
    if r['hiss8k'] > 0.35: bad.append('desis')
    if r['harsh_z'] > 2.0: bad.append('terdengar kasar (earshot)')
    if r['z'] < 2.5: bad.append('tidak cocok peran')
    if r['real'] < 0.5: bad.append('terdengar sintetis')
    return bad
for r in rows: r['reject'] = ok(r)
rows.sort(key=lambda r: (len(r['reject']), -r['z'] + 0.5 * r['harsh_z']))
print(f'== {role}: {q}')
for r in rows: print(f"  z {r['z']:5.2f} harsh {r['harsh_z']:5.2f} real {r['real']:.2f} tonal {r['tonal']:.2f} pc {r['pitch_class']} rough {r['rough']:.2f} hiss {r['hiss8k']:.2f} bite {r['bite2_6k']:.2f} cen {r['cen']:5d}  {r['file'][:40]:40} {'; '.join(r['reject']) or 'LOLOS'}")
json.dump(rows, open(f'/home/claude/pks7/pick_{role}.json', 'w'), indent=1)
