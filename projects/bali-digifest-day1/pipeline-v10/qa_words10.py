"""v10f (reviewer Sonnet: 'karena', 'juga', 'mengatur', 'itu' tidak pernah tampil; 'membuat' telat 0,5 dtk):
tiap kata teks harus tampil >= 0,15 dtk dan muncul <= 0,25 dtk sesudah waktunya (frasa + kata besar dari render/src)."""
import json
ph = json.load(open('remotion/src/phrases6.json')); big = json.load(open('remotion/src/kt6.json'))['big']
bad = 0; n = 0
for c in ph:
    ws = [w for l in c['lines'] for w in l]
    for i, w in enumerate(ws):
        n += 1; on = max(w['t'], c['start']); off = c['end']
        late = on - w['t']; vis = off - on
        if vis < 0.15 or late > 0.25:
            bad += 1; print(f"{w['t']:7.2f} '{w['w']}' frasa {c['start']:.2f}-{c['end']:.2f}: tampil {vis:.2f} dtk, telat {late:.2f}")
print(f'kata bermasalah {bad}/{n}')
