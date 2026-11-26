"""Waktu nyata tiap panel storyboard (export 31 Okt) dari timestamp kata VO v6 → beats.json + BEATS.md"""
import json,re
T=json.load(open('timeline.json')); W=T['words']; B={b.get('name'):b for b in T['blocks'] if b['kind']!='pad'}
norm=lambda s:re.sub(r'[^a-z0-9-]','',s.lower())
def at(word,src,n=1,end=False):
    k=0
    for w in W:
        if w['src']==src and norm(w['w'])==word:
            k+=1
            if k==n: return w['e'] if end else w['s']
    raise SystemExit(f'tidak ketemu {word} {src} {n}')
P=[('00a',0.0),('00b',B['news_fast']['t']),
 ('01a',at('tanpa','s1')),('01b',at('kita','s1')),('01c',at('membangun','s1')),('01d',at('dan','s1')),
 ('02a',at('padahal','s2')),('02b',at('dia','s2')),('02c',at('ai','s2',2)),('02d',at('supaya','s2')),('02e',at('sebagian','s2')),('02f',at('tapi','s2')),
 ('03a-1',at('sekarang','s3')),('03a-2',at('dan','s3',1)),('03b',at('persis','s3')),('03c',at('dan','s3',2)),('03d',at('untuk','s3',2)),
 ('03e',B['jensen']['t']),
 ('04a',at('teknologi','s4')),('04b',at('ia','s4')),('04c',at('pertanyaannya','s4')),('04d',B['altman']['t']),
 ('05a',at('apa','s5')),('05b',at('di','s5')),('05c',at('dan','s5',1)),('05d',at('prompt','s5')),('05e',at('dan','s5',2)),('05f',at('makanya','s5')),('05g',at('membangun','s5',1)),('05h',at('tapi','s5')),
 ('06a',at('terkadang','s6')),('06b',at('membangun','s6',2)),('06c',at('dan','s6',1)),('06d',at('bahkan','s6')),('06e',at('tapi','s6')),('06f',at('karena','s6')),('06g',at('jadi','s6')),
 ('END',T['total'])]
# panel mulai = sedikit sebelum kata pertamanya (transisi mendarat −3..+3 f) → pakai onset kata langsung; kecuali hard cut di pad diambil di awal pad
out=[];md=['| Panel | Mulai (dtk) | Durasi | Frame @30 |','|---|---|---|---|']
for (p,t),(q,t2) in zip(P,P[1:]):
    out.append(dict(panel=p,t=round(t,3),dur=round(t2-t,3),f=round(t*30)))
    md.append(f'| {p} | {t:.2f} | {t2-t:.2f} | {round(t*30)} |')
json.dump(dict(total=T['total'],panels=out),open('beats.json','w'),indent=1)
open('BEATS.md','w').write('\n'.join(md)+'\n'); print('\n'.join(md))
