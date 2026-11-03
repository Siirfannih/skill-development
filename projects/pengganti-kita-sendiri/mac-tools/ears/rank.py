# Dengar kandidat SFX dengan earshot: describe tiap file v10 yang terpakai + rank kandidat per peran.
import json, os, subprocess, sys
from earshot import api
here = os.path.dirname(os.path.abspath(__file__)); C = json.load(open(f'{here}/cands.json'))
out = {'v10_describe': {}, 'roles': {}}
for p in sorted(open(f'{here}/used.txt').read().split()):
    fp = os.path.join(here, p)
    if os.path.exists(fp):
        r = api.describe(fp); out['v10_describe'][p] = r.get('summary') if isinstance(r, dict) else str(r)
        print('DESC', p, '->', out['v10_describe'][p][:300], flush=True)
os.makedirs(f'{here}/cand', exist_ok=True)
for role, spec in C.items():
    paths = []
    for name, key in spec['ids'].items():
        fp = f'{here}/cand/{role}__{name}.mp3'
        if not os.path.exists(fp):
            subprocess.run(['curl', '-sfL', '-o', fp, f'https://audiocdn.epidemicsound.com/lqmp3/{key}.mp3'])
        if os.path.exists(fp): paths.append(fp)
    rk = api.rank(paths, spec['q'])
    res = []
    for fp in paths:
        m = api.match(fp, spec['q'], alts=spec['alts'])
        d = api.describe(fp)
        res.append({'file': os.path.basename(fp), 'match': m.get('summary') if isinstance(m, dict) else str(m), 'describe': d.get('summary') if isinstance(d, dict) else str(d)})
        print('ROLE', role, os.path.basename(fp), '|', res[-1]['match'][:200], flush=True)
    out['roles'][role] = {'rank': rk.get('summary') if isinstance(rk, dict) else str(rk), 'items': res}
json.dump(out, open(f'{here}/ears_report.json', 'w'), indent=1, default=str)
print('EARS_DONE')
