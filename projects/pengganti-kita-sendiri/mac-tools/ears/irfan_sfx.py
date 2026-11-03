# Dengar folder SFXIrfan: durasi, earshot describe, ukuran (centroid, >6k, 2-6k, ekor, harm), untuk peta peran v11.
import os, json, sys
sys.path.insert(0, os.path.dirname(__file__))
from earshot import api
import importlib.util
spec = importlib.util.spec_from_file_location('pal', os.path.join(os.path.dirname(__file__), 'palette.py'))
D = os.path.expanduser('~/Downloads/SFXIrfan')
src = open(os.path.join(os.path.dirname(__file__), 'palette.py')).read()
ns = {}
exec(src[:src.index('S = lambda')].split('ROLES = {')[0] + src[src.index('def load'):src.index('S = lambda')], ns)
out = {}
for f in sorted(os.listdir(D)):
    p = os.path.join(D, f)
    if not f.lower().endswith(('.mp3', '.wav')): continue
    d = api.describe(p); s = d.get('summary') if isinstance(d, dict) else str(d)
    m = ns['metrics'](p)
    out[f] = dict(describe=s, **m)
    print('SFX', f, json.dumps(m), '|', s[:300], flush=True)
json.dump(out, open(os.path.join(os.path.dirname(__file__), 'irfan_sfx.json'), 'w'), indent=1)
print('IRFAN_DONE')
