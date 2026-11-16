"""Remap existing r8 cues via their source timestamps; no new sound choices."""
import json
from pathlib import Path
import numpy as np
P=Path(__file__).resolve().parents[1]
new=np.array(json.loads((P/'remotion/src/data/knots_v5.json').read_text())['knots'])
d=json.loads((P/'edit/v3/cues_v3.json').read_text())
for q in d['cues']:
    if 't_v2' not in q: raise ValueError('Source timestamp t_v2 required; refusing to remap an already edited cue')
    q['t']=round(float(np.interp(q['t_v2'],new[:,1],new[:,0])),6)
(P/'edit/v5/cues.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
print('remapped',len(d['cues']),'source cues')
