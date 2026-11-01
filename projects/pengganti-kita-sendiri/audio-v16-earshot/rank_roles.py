import json, os, sys
from earshot import api
C='/home/claude/pks6/cand'
Q={'click':'a single crisp computer mouse click','swish':'a fast bright clean air swish whoosh','pop':'a soft short user interface pop',
   'shutter':'a camera shutter click','hit':'a deep cinematic impact boom hit','riser':'a short tension riser building up',
   'key':'laptop keyboard typing','toggle':'a light switch click','music':'dark suspenseful minimal electronic pulse documentary music'}
out={}
for role,q in Q.items():
    r=api.rank([f'{C}/{role}'],q)
    rows=[]
    for x in r['results']:
        p=x.get('path') or x.get('file'); rr=api.realness(p) if role!='music' else {}
        rows.append(dict(file=os.path.basename(p),z=round(x.get('z',0),2),verdict=x.get('verdict'),p_real=round(rr.get('p_real',-1),2) if rr else None))
    out[role]=dict(query=q,rows=rows)
    print('==',role,'|',q)
    for w in rows[:8]: print(f"  z {w['z']:5} {str(w['verdict']):9} real {w['p_real']}  {w['file']}")
json.dump(out,open('/home/claude/pks6/rank.json','w'),indent=1)
