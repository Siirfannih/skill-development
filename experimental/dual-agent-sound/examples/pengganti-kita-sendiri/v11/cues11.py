"""Cue v11 = v10 + cold open supercut berita: tick FOUNDER/CEO/SEMALAM (sama dengan motif 05f).
Cue v10: 9 cue atmosferik v9 (waktu ulang) + micro-tick ritmis di grid ostinato pada 3 zona enumerasi, dipetakan ke panel storyboard."""
import json,numpy as np,re
T=json.load(open('timeline.json')); B={b.get('name'):b for b in T['blocks'] if b['kind']!='pad'}; W=T['words']
P={p['panel']:p['t'] for p in json.load(open('beats.json'))['panels']}
nm=lambda s:re.sub(r'[^a-z0-9-]','',s.lower())
def w(word,src,n=1,end=False):
    k=0
    for x in W:
        if x['src']==src and nm(x['w'])==word:
            k+=1
            if k==n: return x['e'] if end else x['s']
    raise SystemExit(f'{word} {src} {n}')
MK='/home/claude/sfx_hunt/mk/'; J0=B['jensen']['t']; POST=B['s4']['t']; E06=w('tapi','s6')
def grid(name,off,t_end):
    b=np.array(json.load(open(f'/home/claude/v9/music10/{name}_beats.json'))); per=float(np.median(np.diff(b)))
    k0=int(np.floor(b[0]/per)); g=b[0]-k0*per+np.arange(0,int(t_end/per)+2)*per   # diperpanjang ke awal trek
    g8=np.sort(np.concatenate([g,g+per/2]))+off; return g8,per
G8A,per=grid('OST_A1x',0.0,60); G8B,_=grid('OST_B2',POST,80)
G8=np.concatenate([G8A[G8A<J0-0.9],G8B[G8B>=POST]])
q=lambda t:float(G8[np.searchsorted(G8,t-0.02)])     # titik grid pertama ≥ onset (tidak mendahului visual)
C=[]
def c(**k): C.append(k)
last=[x for x in W if x['src']=='s6'][-1]
c(id='boom1',role='low_sub_bass_boom',file=MK+'mk1686.mp3',a=0.011,b=1.8,t=0.0,db=-18,lp=900,fo=0.6,panel='00a',why='0:00 pembuka, foto montase pertama')
c(id='wh1',role='soft_air_whoosh',file=MK+'mk2411.mp3',t=P['01a'],align='peak',peak=1.0,db=-20,lp=3000,fi=0.2,fo=0.4,panel='00b→01a',why='hard cut awan gambar → horizon (B1 Perlombaan)')
c(id='wh2',role='soft_air_whoosh',file=MK+'mk2411.mp3',t=P['02a'],align='peak',peak=1.0,db=-19,lp=2800,fi=0.2,fo=0.4,panel='01d→02a',why='B1 → B2 Janji')
c(id='wh3',role='low_pass_sweep',file=MK+'mk1482.mp3',a=0.235,b=1.575,t=P['03a-1'],align='peak',peak=0.7,db=-18,lp=3000,fi=0.2,fo=0.3,panel='02f→03a-1',why='BABAK 1 → BABAK 2 (composer)')
c(id='boom2',role='low_sub_bass_boom',file=MK+'mk1486.mp3',b=1.1,t=w('kita','s3',4,end=True)+0.12,db=-17,lp=1200,fo=0.5,panel='03d→03e',why='beat drop: «mengambil tempat kita» → klip Jensen')
c(id='wh4',role='soft_air_whoosh',file=MK+'mk2411.mp3',t=P['05a'],align='peak',peak=1.0,db=-19,lp=2800,fi=0.2,fo=0.4,panel='04d→05a',why='klip Altman → B5 Kenyataan')
c(id='wh5',role='low_pass_sweep',file=MK+'mk1482.mp3',a=0.235,b=1.575,t=P['06a'],align='peak',peak=0.7,db=-19,lp=2600,fi=0.2,fo=0.3,panel='05h→06a',why='B5 → B6 Cermin')
c(id='boom3',role='low_sub_bass_boom',file=MK+'mk1686.mp3',a=0.011,b=3.5,t=last['e']+0.35,db=-12,lp=900,fo=1.5,panel='06g',why='penutup setelah «mainkan?»')
c(id='hiss',role='tape_hiss_bed',file='/home/claude/v9/sfx/el_hiss_0.mp3',t=0.0,loop_to=T['total'],db=-37,lp=5000,fi=1.0,fo=2.5,mute_jensen=True,panel='semua',why='tekstur pita analog tipis')
TICK='/home/claude/pool/bank/b_typing_key__deep.wav'
def zone(name,panel,t0,t1,accents,pitch_up=False):
    acc=[(q(t),lab) for t,lab in accents]; at={round(a,3) for a,_ in acc}
    # devil's advocate: ostinato sudah berdetak 1/16 → tick pengisi tiap 1/8 menumpuk & melanggar aturan SFX hemat; hanya poin beruntun yang diberi tick
    for g,lab in acc:
        c(id=f'tick_{name}_{g:.2f}',role='micro_tick',file=TICK,t=g,db=-12,lp=4000,fo=0.03,pitch=0,panel=panel,why='poin beruntun: '+lab)
# Zona 0 · 00a–00b: supercut berita, kata FOUNDER / CEO / SEMALAM mendarat (motif yang sama dipakai lagi di 05f)
zone('z0','00a→00b',0.0,P['01a'],[(w('16-year-old','news_teen'),'00a FOUNDER (Sky: 16-year-old)'),(w('billion','news_billion'),'00a CEO (Bloomberg: billion)'),(w('fast','news_fast'),'00b SEMALAM (Sky: so fast)')])
# Zona 1 · 02c: kursor AI menyeret kartu tugas ke Trash satu per satu
zone('z1','02c',w('mengambil','s2'),w('berulang','s2',end=True),[(w('mengambil','s2'),'kartu #1 diseret'),(w('membosankan','s2'),'kartu #2'),(w('berulang','s2'),'kartu #3 masuk Trash')])
# Zona 2 · 03a-1/03a-2: kata diketik di composer, kirim di «bekerja», agent keluar
zone('z2','03a-1→03a-2',w('mengajari','s3'),w('bekerja','s3',end=True)+0.6,[(w('mengajari','s3'),'«mengajari AI» diketik'),(w('berpikir','s3'),'«berpikir»'),(w('menulis','s3'),'«menulis»'),(w('bekerja','s3'),'klik kirim → agent keluar')])
# Zona 3 · 05c–05g: montase SAMA, prompt sama ×3, slot swap founder/CEO/semalam, kartu aplikasi menumpuk
zone('z3','05c→05g',w('semua','s5'),w('gampang','s5',end=True),[(w('tools','s5'),'05c SAMA (foto)'),(w('prompt','s5'),'05d prompt sama'),(w('kesempatan','s5'),'05e kesempatan sama'),
     (w('founder','s5'),'05f FOUNDER'),(w('ceo','s5'),'05f CEO'),(w('semalam','s5'),'05f SEMALAM'),(w('gampang','s5'),'05g kartu menumpuk')])
# 03a-2: agent #2–#4 melompat keluar di 1/8 berikutnya (nada naik)
gb=q(w('bekerja','s3')); i=int(np.searchsorted(G8,gb))
for j,st in enumerate([2,4,7]): c(id=f'tick_agent{j+2}',role='micro_tick',file=TICK,t=float(G8[i+1+j]),db=-18,lp=4000,fo=0.03,pitch=st,panel='03a-2',why=f'agent #{j+2} keluar dari tombol kirim')
json.dump(C,open('cues11.json','w'),indent=0,ensure_ascii=False)
k=[x for x in C if x['role']=='micro_tick']; print('total',len(C),'| atmosferik',len(C)-len(k),'| tick',len(k),'aksen',sum(1 for x in k if x['db']==-17))
