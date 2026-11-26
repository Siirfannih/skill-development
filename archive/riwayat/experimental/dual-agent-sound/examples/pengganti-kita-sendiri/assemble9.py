"""Rakit VO v9 + klip: playback_rate 1.0 (tanpa time-stretch/pitch). Pacing hanya dari keheningan:
akhir kalimat = PAUSE[s] dtk (0,6–1,0), antar babak lebih panjang, 1,5 dtk sebelum & sesudah klip Inggris.
Chain vokal blueprint: HPF 80 Hz, +1,5 dB @160 Hz, high-shelf −2,5 dB @7,5 kHz. Keluaran: mix/stem_dialog.wav + mix/timeline.json"""
import json,subprocess,numpy as np,soundfile as sf,sys
SR=48000
PICK={'1':2,'2':2,'3':2,'4':3,'5':1,'6':3}   # 2 dari 3 suara: agy, API, metrik prosodi (lihat PICKS.md)
OV=json.load(open('pauses_override.json')) if len(sys.argv)>1 else {}
END_PAUSE=0.8; CLIP_PAD=1.5
def load(p,a=None,b=None):
    args=['ffmpeg','-v','error']+(['-ss',str(a)] if a is not None else [])+(['-t',str(b-a)] if b is not None else [])+['-i',p,'-af','highpass=f=80,equalizer=f=160:t=q:w=1:g=1.5,treble=g=-2.5:f=7500','-ac','1','-ar',str(SR),'-f','f32le','-']
    return np.frombuffer(subprocess.run(args,capture_output=True).stdout,np.float32).copy()
def take(k):
    n=f's{k}_t{PICK[k]}'; x=load(f'raw/{n}.mp3'); W=[w for w in json.load(open(f'stt/{n}.json'))['words'] if w['type']=='word']
    return x,W,n
SEQ=[('pad',4.0,'cold open tanpa VO'),('vo','1'),('pad',1.0,'batas B1→B2 storyboard'),('vo','2'),('pad',1.1,'BABAK 1 → BABAK 2'),
     ('vo','3'),('pad',1.8,'jeda sebelum klip Jensen (beat drop: boom 0,9 dtk lalu hening)'),('clip','jensen'),('pad',CLIP_PAD,'jeda sesudah klip Jensen'),
     ('vo','4'),('pad',CLIP_PAD,'jeda sebelum klip Altman'),('clip','altman'),('pad',CLIP_PAD,'jeda sesudah klip Altman'),
     ('vo','5'),('pad',1.2,'engsel 05h→06a'),('vo','6'),('pad',3.0,'ekor 06g')]
CLIP={'jensen':('/home/claude/v6/mix/clips/jensen_full.wav','/home/claude/v6/mix/clips/jensen_full.json',4.43,9.30),
      'altman':('/home/claude/v6/mix/clips/altman_full.wav','/home/claude/v6/mix/clips/altman_full.json',0.90,4.35)}
out=[];words=[];blocks=[];t=0.0;vo_rms=None
for item in SEQ:
    if item[0]=='pad':
        out.append(np.zeros(int(item[1]*SR))); blocks.append(dict(kind='pad',t=round(t,3),dur=item[1],label=item[2])); t+=item[1]; continue
    if item[0]=='vo':
        k=item[1]; x,W,n=take(k)
        a=max(0,W[0]['start']-0.05); segs=[]; prev=a
        for i,w in enumerate(W):
            if i<len(W)-1 and w['text'][-1] in '.?':
                gap_target=OV.get(f'{k}:{i}',END_PAUSE); nxt=W[i+1]['start']
                cut_a=w['end']+0.06; cut_b=nxt-0.04
                nat=max(0,cut_b-cut_a)
                segs.append((prev,cut_a,max(0,gap_target-0.10))); prev=cut_b   # 0.10 = ekor+napas alami yang dipertahankan
        segs.append((prev,W[-1]['end']+0.12,0))
        y=[];local=[];tt=0.0
        for (s0,s1,gap) in segs:
            seg=x[int(s0*SR):int(s1*SR)].copy(); f=int(0.006*SR); seg[:f]*=np.linspace(0,1,f); seg[-f:]*=np.linspace(1,0,f)
            for w in W:
                if s0<=w['start']<s1: local.append(dict(w=w['text'],s=round(t+tt+w['start']-s0,3),e=round(t+tt+w['end']-s0,3),src=f's{k}'))
            y+=[seg,np.zeros(int(gap*SR))]; tt+=len(seg)/SR+gap
        y=np.concatenate(y)
        if vo_rms is None: vo_rms=float(np.sqrt(np.mean(x[np.abs(x)>0.01]**2)))
        words+=local; blocks.append(dict(kind='vo',name=f's{k}',take=n,t=round(t,3),dur=round(len(y)/SR,3))); out.append(y); t+=len(y)/SR
    else:
        nm=item[1]; wav,js,a,b=CLIP[nm]; x,_=sf.read(wav); y=x[int(a*SR):int(b*SR)].astype(np.float32)
        r=float(np.sqrt(np.mean(y[np.abs(y)>0.01]**2))); y*=vo_rms*10**(-1/20)/r; f=int(0.03*SR); y[:f]*=np.linspace(0,1,f); y[-f:]*=np.linspace(1,0,f)
        for w in json.load(open(js))['words']:
            if w['type']=='word' and a<=w['start']<b: words.append(dict(w=w['text'],s=round(t+w['start']-a,3),e=round(t+w['end']-a,3),src=nm))
        blocks.append(dict(kind='clip',name=nm,t=round(t,3),dur=round(len(y)/SR,3))); out.append(y); t+=len(y)/SR
y=np.concatenate(out); sf.write('mix/stem_dialog.wav',y,SR,subtype='FLOAT')
json.dump(dict(total=round(t,3),blocks=blocks,words=words),open('mix/timeline.json','w'),indent=0,ensure_ascii=False)
# gap kalimat rata-rata (aturan lulus: ≥ 0,5 dtk)
g=[]
for a_,b_ in zip(words,words[1:]):
    if a_['src']==b_['src'] and a_['w'][-1] in '.?': g.append(b_['s']-a_['e'])
print('total %.2f dtk | jeda antar-kalimat rata-rata %.2f dtk (min %.2f, n=%d)'%(t,np.mean(g),min(g),len(g)))
for b in blocks: print(b)
