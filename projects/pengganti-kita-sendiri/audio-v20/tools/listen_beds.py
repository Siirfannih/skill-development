"""Dengarkan kandidat backsound per segmen dengan earshot (describe + find piano)."""
import soundfile as sf, os
from earshot import api
B = '/home/claude/pks/v20/bg'; T = B + '/seg'; os.makedirs(T, exist_ok=True)
def seg(name, a, b):
    x, sr = sf.read(f'{B}/{name}.wav'); p = f'{T}/{name}_{a:g}_{b:g}.wav'
    sf.write(p, x[int(a*sr):int(b*sr)], sr); return p
jobs = [('reggae', 0, 6), ('reggae', 6, 11), ('reggae', 11, 16), ('reggae', 16, 26),
        ('particle', 0, 20), ('particle', 40, 60), ('particle', 80, 100),
        ('documenter', 0, 16.6), ('office', 0, 20), ('office', 60, 80)]
for j in jobs:
    p = seg(*j); r = api.describe(p)
    print(f'== {j}\n  {r.get("summary")}', flush=True)
r = api.find(f'{B}/reggae.wav', 'a solo piano playing notes', top=4)
print('== find piano in reggae\n ', r.get('summary'), flush=True)
r = api.timeline(f'{B}/reggae.wav', **{'from_': 0, 'to': 30}) if False else api.timeline(seg('reggae', 0, 30))
print('== timeline reggae 0-30\n', r.get('summary') or r.get('text'), flush=True)
