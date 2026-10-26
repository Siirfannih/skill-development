import json, glob, os
from earshot import api
out=[]
for f in sorted(glob.glob('/home/claude/thegap/sfx/*')):
    if f.endswith('.json'): continue
    try:
        d=api.describe(f, top=5)
        m=d['measurements']
        out.append({'file':os.path.basename(f),'dur':m['duration'],'lufs':m['lufs'],'peak':m['true_peak_dbtp'],'attack_ms':m['attack_ms'],'decay_ms':m['decay_ms'],'bright':m['brightness_hz'],'shape':d.get('shape'),'tags':[t['term'] for t in d['top_tags'][:5]]})
    except Exception as e:
        out.append({'file':os.path.basename(f),'error':str(e)[:200]})
json.dump(out,open('/home/claude/thegap/sfx/_catalog.json','w'),indent=1)
print('done',len(out))
