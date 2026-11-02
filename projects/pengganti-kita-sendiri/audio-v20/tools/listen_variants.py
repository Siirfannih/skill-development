"""Dengarkan setiap varian dengan earshot describe (satu proses, model tetap hangat)."""
import json
from earshot import api
meta = json.load(open('/home/claude/pks/v20/var/variants.json'))
res = {}
for sl, m in meta.items():
    for i, v in enumerate(m['variants']):
        r = api.describe(v['path'])
        res[v['path']] = {'summary': r.get('summary')}
        print(f"== {sl} v{i:02d} dur {v['dur']:.2f}\n  {r.get('summary')}", flush=True)
json.dump(res, open('/home/claude/pks/v20/var/describe.json', 'w'), indent=1, default=str)
