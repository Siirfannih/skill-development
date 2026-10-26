import json,sys,collections
rows=[json.loads(l) for l in open('/home/claude/thegap/qa/probe.jsonl')]
rows.sort(key=lambda r:r['f'])
issues=collections.defaultdict(list)
def area(r): return max(0,r[2]-r[0])*max(0,r[3]-r[1])
def inter(a,b): return area([max(a[0],b[0]),max(a[1],b[1]),min(a[2],b[2]),min(a[3],b[3])])
for r in rows:
    f=r['f']; T=[o for o in r['out'] if o['k']=='t' and o['o']>0.15 and o['vf']>0.5]
    for t in T:
        fs=t['fs'] or 0; x0,y0,x1,y1=t['r']; t['r']=[x0,y0+0.14*fs,x1,max(y0+0.14*fs+1,y1-0.12*fs)]
    S=[o for o in r['out'] if o['k']=='s' and o['o']>0.15]; S=[o for o in r['out'] if o['k']=='s' and o['o']>0.15]
    for t in T:
        x0,y0,x1,y1=t['r']
        if not t['b'] and (x0<96 or x1>1824 or y0<54 or y1>994): issues['safe'].append((f,t['s'],t['r']))
        if t['fs'] and t['fs']<56: issues['small'].append((f,t['s'],t['fs']))
    for i in range(len(T)):
        for j in range(i+1,len(T)):
            a,b=T[i]['r'],T[j]['r']; I=inter(a,b)
            if I>0.02*min(area(a),area(b)): issues['text_text'].append((f,T[i]['s'],T[j]['s']))
    for t in T:
        for s in S:
            I=inter(t['r'],s['r'])
            if I>0.10*area(t['r']): issues['text_subject'].append((f,t['s'],s['r']))
    if not T and not S: issues['no_text_or_subject'].append(f)
for k,v in issues.items():
    print(f'== {k}: {len(v)}')
    # compress consecutive frames
    seen={}
    for it in v:
        key=it[1] if isinstance(it,tuple) and len(it)>1 else 'x'
        key=str(key) if not isinstance(it,int) else 'frame'
        seen.setdefault(key,[]).append(it[0] if isinstance(it,tuple) else it)
    for key,fs in list(seen.items())[:40]: print('  ',key,'frames',fs[0],'..',fs[-1],'n=',len(fs))
