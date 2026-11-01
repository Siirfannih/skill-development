from earshot import api
for d,q in [('swish2','a fast bright clean air whoosh transition'),('hit2','a deep cinematic impact boom hit with a punchy attack')]:
    r=api.rank(['/home/claude/pks6/cand/'+d],q); print('==',d,q)
    for x in r['results']:
        p=x.get('path'); rr=api.realness(p); print(f"  z {x['z']:5.2f} {x['verdict']:9} real {rr['p_real']:.2f}  {p.split('/')[-1]}")
