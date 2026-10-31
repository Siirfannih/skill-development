"""VO v10 (Irfan 31 Okt 15:21): playback 1,0. Zero-gap J-cut: jeda klausa 0,12 dtk, item daftar 0,05 dtk, akhir kalimat (ide baru) 0,30 dtk.
Jeda panjang hanya: sebelum Jensen 0,9 · sebelum Altman 0,9 · sesudah Altman 0,6 · sebelum kalimat penutup 1,0.
Batas potong dicari dari energi audio (bukan timestamp STT) + pre-roll 100 ms dengan fade-in 100 ms → tidak ada awal kata terpotong."""
import json,subprocess,numpy as np,soundfile as sf,re
SR=48000
PICK={'1':2,'2':2,'3':2,'4':3,'5':1,'6':3}
CLAUSE,LIST,SENT=0.12,0.05,0.30
LISTW={('3','berpikir,'),('3','menulis,'),('5','sama,'),('5','founder,'),('6','membangun,'),('6','merencanakan,')}   # item daftar beruntun
norm=lambda s:s.lower()
def load(p):
    a=['ffmpeg','-v','error','-i',p,'-af','highpass=f=80,equalizer=f=160:t=q:w=1:g=1.5,treble=g=-2.5:f=7500','-ac','1','-ar',str(SR),'-f','f32le','-']
    return np.frombuffer(subprocess.run(a,capture_output=True).stdout,np.float32).copy()
def env_db(x):
    h=int(0.005*SR); n=len(x)//h; return 20*np.log10(np.sqrt((x[:n*h].reshape(n,h)**2).mean(1))+1e-9),h
def onset(x,t,ref):   # mundur dari t sampai energi < ref-40 dB (maks 0,3 dtk)
    e,h=env_db(x); i=int(t*SR/h); lo=max(0,i-int(0.3*SR/h))
    while i>lo and e[i]>ref-40: i-=1
    return i*h/SR
def offset(x,t,ref):
    e,h=env_db(x); i=int(t*SR/h); hi=min(len(e)-1,i+int(0.35*SR/h))
    while i<hi and e[i]>ref-40: i+=1
    return i*h/SR
def scene(k):
    n=f's{k}_t{PICK[k]}'; x=load(f'raw/{n}.mp3'); W=[w for w in json.load(open(f'stt/{n}.json'))['words'] if w['type']=='word']
    ref=20*np.log10(np.sqrt(np.mean(x[np.abs(x)>0.01]**2))+1e-9)
    # pecah per jeda antar-kata, tentukan target jeda
    cuts=[]   # (akhir_bunyi, awal_bunyi_berikut, target)
    for i in range(len(W)-1):
        a,b=W[i],W[i+1]; t_end=offset(x,a['end'],ref); t_on=onset(x,b['start'],ref)
        if t_on-t_end<0.03: continue   # kata bersambung, tidak dipotong
        tok=a['text']
        tgt=SENT if tok[-1] in '.?' else (LIST if (k,norm(tok)) in LISTW else CLAUSE)
        if k=='6' and norm(b['text'])=='jadi': tgt=1.0      # sebelum kalimat penutup
        cuts.append((t_end,t_on,tgt))
    s0=onset(x,W[0]['start'],ref)-0.10; y=[]; pos=max(0,s0); words=[]; tt=0.0
    for (te,to,tgt) in cuts+[(offset(x,W[-1]['end'],ref)+0.06,None,0)]:
        seg=x[int(pos*SR):int((te+0.03)*SR)].copy()
        fi=int(0.10*SR) if pos==max(0,s0) or True else 0
        fi=min(fi,len(seg)//3); seg[:fi]*=np.linspace(0,1,fi); fo=int(0.02*SR); seg[-fo:]*=np.linspace(1,0,fo)
        for w in W:
            if pos<=w['start']<te+0.03: words.append(dict(w=w['text'],s=round(tt+w['start']-pos,3),e=round(tt+w['end']-pos,3),src=f's{k}'))
        y.append(seg); tt+=len(seg)/SR
        if to is None: break
        # jeda = target dikurangi pre-roll 0,10 dtk yang sudah ikut di segmen berikut dan ekor 0,03
        g=max(0.0,tgt-0.13); y.append(np.zeros(int(g*SR))); tt+=g; pos=to-0.10
    return np.concatenate(y),words,n
CLIP={'jensen':('/home/claude/v6/mix/clips/jensen_full.wav','/home/claude/v6/mix/clips/jensen_full.json',4.43,9.30),
      'altman':('/home/claude/v6/mix/clips/altman_full.wav','/home/claude/v6/mix/clips/altman_full.json',0.90,4.35)}
SEQ=[('pad',4.0,'cold open tanpa VO (00a–00b)'),('vo','1'),('pad',SENT,'01d→02a'),('vo','2'),('pad',SENT,'BABAK 1 → BABAK 2'),
     ('vo','3'),('pad',0.9,'jeda panjang 1: sebelum Jensen (boom + hening)'),('clip','jensen'),('pad',0.40,'sesudah Jensen'),
     ('vo','4'),('pad',0.9,'jeda panjang 2: sebelum Altman'),('clip','altman'),('pad',0.6,'jeda panjang 3: sesudah Altman'),
     ('vo','5'),('pad',SENT,'05h→06a'),('vo','6'),('pad',3.0,'ekor 06g')]
out=[];words=[];blocks=[];t=0.0;vo_rms=None
for it in SEQ:
    if it[0]=='pad': out.append(np.zeros(int(it[1]*SR))); blocks.append(dict(kind='pad',t=round(t,3),dur=it[1],label=it[2])); t+=it[1]; continue
    if it[0]=='vo':
        y,ww,n=scene(it[1])
        if vo_rms is None: vo_rms=float(np.sqrt(np.mean(y[np.abs(y)>0.01]**2)))
        for w in ww: w['s']=round(w['s']+t,3); w['e']=round(w['e']+t,3)
        words+=ww; blocks.append(dict(kind='vo',name=f's{it[1]}',take=n,t=round(t,3),dur=round(len(y)/SR,3))); out.append(y); t+=len(y)/SR
    else:
        nm=it[1]; wav,js,a,b=CLIP[nm]; x,_=sf.read(wav); y=x[int(a*SR):int(b*SR)].astype(np.float32)
        y*=vo_rms*10**(-1/20)/float(np.sqrt(np.mean(y[np.abs(y)>0.01]**2))); f=int(0.03*SR); y[:f]*=np.linspace(0,1,f); y[-f:]*=np.linspace(1,0,f)
        for w in json.load(open(js))['words']:
            if w['type']=='word' and a<=w['start']<b: words.append(dict(w=w['text'],s=round(t+w['start']-a,3),e=round(t+w['end']-a,3),src=nm))
        blocks.append(dict(kind='clip',name=nm,t=round(t,3),dur=round(len(y)/SR,3))); out.append(y); t+=len(y)/SR
sf.write('mix10/stem_dialog.wav',np.concatenate(out),SR,subtype='FLOAT')
json.dump(dict(total=round(t,3),blocks=blocks,words=words),open('mix10/timeline.json','w'),indent=0,ensure_ascii=False)
print('total %.2f dtk'%t); [print(b) for b in blocks if b['kind']!='pad']
