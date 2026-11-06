"""Padatkan jeda VO (tempo 1,0, VO tidak dipercepat — aturan 33). Tulis vo/vo.wav + remotion/src/vo.json."""
import json, numpy as np, soundfile as sf, subprocess, os, re
P=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR=48000; THR=-36; INNER=0.20; MIN_GAP=0.24
# jeda antarbeat (detik diam nyata), beat visual berat diberi napas lebih
GAP={'b01':0.40,'b02':0.30,'b03':0.35,'b04':0.30,'b05':0.35,'b06':0.35,'b07':0.35,'b08':0.40,'b09':0.50}
LEAD=0.30; TAIL=3.0
def load(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.float32).copy()
def words_of(al):
    ch=al['characters']; s=al['character_start_times_seconds']; e=al['character_end_times_seconds']
    out=[];cur='';cs=None;ce=None
    for c,a,b in zip(ch,s,e):
        if c.isspace():
            if cur: out.append([cur,cs,ce]); cur=''
            continue
        if not cur: cs=a
        cur+=c; ce=b
    if cur: out.append([cur,cs,ce])
    return out
def quiet_runs(x):
    hop=int(0.01*SR); n=len(x)//hop
    r=20*np.log10(np.sqrt(np.mean(x[:n*hop].reshape(n,hop)**2,1))+1e-9)
    q=r<THR; runs=[];i=0
    while i<n:
        if q[i]:
            j=i
            while j<n and q[j]: j+=1
            runs.append((i*hop/SR,j*hop/SR)); i=j
        else: i+=1
    return runs
L=json.load(open(f'{P}/vo/script.json'))
out=[np.zeros(int(LEAD*SR),np.float32)]; t=LEAD; words=[]; beats=[]
for bi,(name,text) in enumerate(L):
    x=load(f'{P}/vo/take1/{name}.mp3'); al=json.load(open(f'{P}/vo/take1/{name}.align.json'))['alignment']
    W=words_of(al); runs=quiet_runs(x)
    # trim head/tail silence
    st=runs[0][1] if runs and runs[0][0]==0 else 0.0
    en=runs[-1][0] if runs and runs[-1][1]>=len(x)/SR-0.02 else len(x)/SR
    st=max(0,st-0.03); en=min(len(x)/SR,en+0.08)
    cuts=[]  # (a,b) removed interval in source seconds
    for a,b in runs:
        if a<=st+0.01 or b>=en-0.01: continue
        if b-a>max(INNER,MIN_GAP):
            keep=INNER; mid=(a+b)/2
            cuts.append((mid-(b-a-keep)/2, mid+(b-a-keep)/2))
    def remap(tt):
        d=0
        for a,b in cuts:
            if tt>=b: d+=b-a
            elif tt>a: d+=tt-a
        return tt-st-d
    seg=[];prev=st
    xf=int(0.008*SR)
    for a,b in cuts:
        seg.append(x[int(prev*SR):int(a*SR)]); prev=b
    seg.append(x[int(prev*SR):int(en*SR)])
    y=seg[0]
    for s2 in seg[1:]:
        if len(y)>xf and len(s2)>xf:
            r=np.linspace(0,1,xf,dtype=np.float32)
            y=np.concatenate([y[:-xf],y[-xf:]*(1-r)+s2[:xf]*r,s2[xf:]])
        else: y=np.concatenate([y,s2])
    b0=t
    for w,a,b in W:
        words.append({'w':w,'s':round(t+max(0,remap(a)),3),'e':round(t+max(0,remap(b)),3),'b':name})
    out.append(y); t+=len(y)/SR
    beats.append({'b':name,'s':round(b0,3),'e':round(t,3),'text':text})
    g=GAP.get(name)
    if g: out.append(np.zeros(int(g*SR),np.float32)); t+=g
vo=np.concatenate(out); vo=np.concatenate([vo,np.zeros(int(TAIL*SR),np.float32)])
sf.write(f'{P}/vo/vo.wav',vo,SR,subtype='PCM_24')
os.makedirs(f'{P}/remotion/src',exist_ok=True)
json.dump({'fps':30,'total':round(len(vo)/SR,3),'beats':beats,'words':words},open(f'{P}/remotion/src/vo.json','w'),ensure_ascii=False,indent=0)
print('total',round(len(vo)/SR,2),'speech end',round(t,2))
for b in beats: print(b['b'],b['s'],b['e'])
