import json,sys,glob
# pakai: words.py <prefix-file L_xxxx_*.json> a b
pre,a,b=sys.argv[1],float(sys.argv[2]),float(sys.argv[3])
for p in sorted(glob.glob(f'/home/irfan/work/bdf26/v6/work/L_{pre}_*.json')):
    for s in json.load(open(p)):
        o=[f"{w[2].strip()}[{w[0]:.2f}-{w[1]:.2f}|{w[3]:.2f}]" for w in s['w'] if w[0]>=a-0.01 and w[1]<=b+0.2]
        if o: print(' '.join(o))
