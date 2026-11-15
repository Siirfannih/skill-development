"""Render stem SFX dari cue sheet (format cues_v2: file, ss, dur, gain_db, align, fout) — dipakai untuk cues_v3 (peta waktu edit/v3/knots.json).
python3 audio/render_cues.py edit/v3/cues_v3.json audio/sfx_stem_v3.wav DURASI"""
import json, subprocess, sys, numpy as np, soundfile as sf
SR = 48000; src, out, dur = sys.argv[1], sys.argv[2], float(sys.argv[3]); N = int(round(dur * SR))
def dec(path, ss=0.0, d=None):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(ss)] + (['-t', str(d)] if d else []) + ['-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).copy()
stem = np.zeros(N, np.float32); cues = json.load(open(src))['cues']
for q in cues:
    x = dec(q['file'], q.get('ss', 0.0), q.get('dur')); x = x / (np.abs(x).max() + 1e-9) * 10 ** (q['gain_db'] / 20)
    if q.get('fout'): n = min(len(x), int(q['fout'] * SR)); x[-n:] *= np.linspace(1, 0, n)
    at = q['t'] - (np.argmax(np.abs(x)) / SR if q.get('align', 'peak') == 'peak' else 0.0)
    i = int(round(max(0.0, at) * SR)); n = min(len(x), N - i)
    if n > 0: stem[i:i + n] += x[:n]
    q['mulai'] = round(at, 3)
sf.write(out, stem, SR, subtype='FLOAT'); json.dump({'cues': cues}, open(src, 'w'), ensure_ascii=False, indent=1)
print('cue', len(cues), 'per dtk', round(len(cues) / dur, 2), '->', out)
