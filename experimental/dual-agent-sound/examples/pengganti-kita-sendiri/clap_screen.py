import json,glob,subprocess
from earshot import api
H='/home/claude/music_hunt/dl2/'
C={e['url'].split('/')[-1][:-4]:e for e in json.load(open('/home/claude/music_hunt/catalog2.json'))}
paths=sorted(glob.glob('mus/m*.wav'))
REQ=['dark ambient electronic music','a cinematic drone','a minimalist synth pulse','a melancholic piano underscore','documentary tension music']
BAN=['inspirational corporate background music','upbeat happy pop music','vocal chop music','a trap beat with hi-hats','bright commercial advertising music']
Z={}
for q in REQ+BAN:
    for r in api.rank(paths,q)['results']: Z.setdefault(r['name'],{})[q]=r['z']
rows=[]
for n,z in Z.items():
    i=n[1:-4]; dur=C.get(i,{}).get('dur','0:00'); sec=int(dur.split(':')[0])*60+int(dur.split(':')[1])
    req=sorted([z[q] for q in REQ],reverse=True); ban=max(z[q] for q in BAN)
    rows.append(dict(id=i,title=C.get(i,{}).get('title'),dur=sec,req_top2=round((req[0]+req[1])/2,2),ban_max=round(ban,2),score=round((req[0]+req[1])/2-max(0,ban),2),
                     banned_flag=ban>=2.5,top_req=max(REQ,key=lambda q:z[q])))
rows.sort(key=lambda r:-r['score']); json.dump(rows,open('clap_screen.json','w'),indent=0)
for r in rows[:25]: print(r)
