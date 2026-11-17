"""Fase 6 · musik pengisi dua varian + versi tanpa musik. Suara tidak disentuh; SFX tetap sama; musik: pocket EQ, ducking -7 dB, TP catcher.
A = Aware (0-13,747) -> With Some Malice (B2-B5a) -> Aware 0:30+ (push-through 58,572). B = pembuka Ticking Tension (0-13,747), selebihnya sama."""
import json,sys,numpy as np,soundfile as sf,librosa,pyloudnorm as pyln
from pathlib import Path
from pedalboard import Pedalboard,HighpassFilter,PeakFilter,Limiter
from scipy.signal import resample_poly,butter,sosfilt
SR=48000;P=Path(__file__).resolve().parent;S=P.parent/'musik/sumber'
import soundfile as _sf
NS=_sf.info(str(Path(__file__).resolve().parent.parent/'edit/suara.wav')).frames;DUR=NS/48000;T_B2=13.747;T_PUSH=next(o['t'] for o in __import__('json').load(open(Path(__file__).resolve().parent.parent/'objects.json')) if o['lapisan']=='D_RELAY');   # push-through dunia agen = jentikan jari (Irfan 17 Nov)
PRE=0.12;XF=0.15
def load(n):
    y,sr=sf.read(S/f'{n}.wav',dtype='float32');y=y if y.ndim==2 else np.stack([y,y],1)
    return resample_poly(y,SR,sr,axis=0).astype(np.float32) if sr!=SR else y
def seg(y,a,b):
    i,j=int(a*SR),int(b*SR);return y[i:j].copy()
def place(buf,part,t0,fade_in,fade_out):
    n=len(part);i=int(round(t0*SR))
    g=np.ones(n,np.float32)
    if fade_in>0:
        k=min(n,int(fade_in*SR));g[:k]=np.sin(np.linspace(0,np.pi/2,k))
    if fade_out>0:
        k=min(n,int(fade_out*SR));g[-k:]*=np.cos(np.linspace(0,np.pi/2,k))
    if i<0: part=part[-i:];g=g[-i:];i=0
    e=min(len(buf),i+len(part));buf[i:e]+=part[:e-i]*g[:e-i,None]
def build_music(opening):
    buf=np.zeros((NS,2),np.float32)
    aw,ma=load('aware'),load('malice')
    # pembuka 0..T_B2
    if opening=='aware':
        part=seg(aw,0.0,T_B2+PRE+0.05);place(buf,part,0.0,0.0,XF+0.05)
    else:
        tk=load('ticking');s0=6.04-0.833+0.057    # tik 1 dtk jatuh di kata hero FINALLY 0,833
        part=seg(tk,s0,s0+T_B2+PRE+0.05);place(buf,part,0.0,0.3,XF+0.05)
    # Malice: ketukan 1 (0,60 dtk) tepat di T_B2 .. sampai push-through
    b0=0.60;m_end=T_PUSH+PRE+0.05
    part=seg(ma,b0-PRE,b0-PRE+(m_end-(T_B2-PRE)));place(buf,part,T_B2-PRE,XF,XF+0.05)
    # Aware 0:30+ (onset kuat 30,16) tepat di push-through
    a0=30.16;part=seg(aw,a0-PRE,a0-PRE+(DUR-(T_PUSH-PRE))+0.1);place(buf,part,T_PUSH-PRE,XF,3.0)
    return buf
def gain_curve(buf,target_lufs=-19.6,win=3.0,hop=1.0,maxdb=6.0):
    """ratakan bed tiap 3 dtk ke target (maks +-6 dB, halus 2 dtk): bed per-3-dtk <= 4 dB"""
    mono=buf.mean(1);n=int(win*SR);h=int(hop*SR);pts=[];gs=[]
    for i in range(0,max(1,len(mono)-n),h):
        r=np.sqrt(np.mean(mono[i:i+n]**2))+1e-9;pts.append((i+n//2)/SR);gs.append(np.clip((target_lufs-2.3)-20*np.log10(r),-maxdb,maxdb))
    t=np.arange(len(mono))/SR;g=np.interp(t,pts,gs);k=int(2*SR);g=np.convolve(np.pad(g,(k,k),mode='edge'),np.ones(k)/k,'same')[k:-k]
    return (10**(g/20)).astype(np.float32)
def duck_curve(words,depth=-7.0,pad=0.12,gap_open=0.30,att=0.15,rel=0.45):
    m=np.zeros(NS,np.float32)
    spans=sorted((w['s']-pad,w['e']+pad) for w in words);merged=[]
    for a,b in spans:
        if merged and a-merged[-1][1]<gap_open:merged[-1][1]=max(merged[-1][1],b)
        else:merged.append([a,b])
    for a,b in merged:m[max(0,int(a*SR)):min(len(m),int(b*SR))]=1.0
    # sapuan halus: serang cepat, lepas lambat
    out=np.empty_like(m);c=0.0;ka=1-np.exp(-1/(att*SR));kr=1-np.exp(-1/(rel*SR))
    for i in range(0,len(m),1):
        pass
    # vektor: filter satu-kutub dua tahap via sosfilt tidak asimetris; pakai loop numpy per blok 1 ms
    blk=int(0.001*SR);cur=0.0
    mb=m[:len(m)//blk*blk].reshape(-1,blk).max(1);ob=np.empty_like(mb)
    for i,v in enumerate(mb):
        k=ka*blk if v>cur else kr*blk;cur+=(v-cur)*min(1.0,k);ob[i]=cur
    env=np.repeat(ob,blk);env=np.concatenate([env,np.full(len(m)-len(env),env[-1])])
    return (10**((depth*env)/20)).astype(np.float32),merged
def finish(buf,words):
    g=gain_curve(buf);buf=buf*g[:,None]
    board=Pedalboard([HighpassFilter(90),PeakFilter(1000,-3.0,0.8),PeakFilter(2800,-3.5,1.0)])   # EQ tengah dipotong supaya suara di depan
    buf=board(buf.T,SR).T
    d,_=duck_curve(words);buf=buf*d[:,None]
    return buf
def tp_catch(x):
    import subprocess,tempfile,os
    with tempfile.TemporaryDirectory() as d:
        sf.write(f'{d}/in.wav',x,SR,subtype='FLOAT')
        subprocess.run(['ffmpeg','-v','error','-y','-i',f'{d}/in.wav','-af','aresample=192000,alimiter=limit=0.89:attack=1:release=50:level=false,aresample=48000','-c:a','pcm_f32le',f'{d}/out.wav'],check=True)
        y,_=sf.read(f'{d}/out.wav',dtype='float32')
    return y[:len(x)] if len(y)>=len(x) else np.pad(y,((0,len(x)-len(y)),(0,0)))
def band(x,lo,hi):
    sos=butter(2,[lo,hi],'band',fs=SR,output='sos');return sosfilt(sos,x,axis=0).astype(np.float32)
def smooth_min(g,half=0.15):
    """kurva gain linear: ambil minimum di sekitar (+-half dtk) lalu haluskan, supaya lembah tak lebih dangkal dari yang diminta"""
    from scipy.ndimage import minimum_filter1d,uniform_filter1d
    k=int(half*SR)*2+1;g=minimum_filter1d(g,k,mode='nearest');return uniform_filter1d(g,k//2*2+1,mode='nearest').astype(np.float32)
def phone_snr(vo,bed):
    """sama dengan audio_phone.py: pita ucap 300-4 kHz, jendela 0,5 dtk saat suara bicara"""
    bp=butter(4,[300,4000],'band',fs=SR,output='sos');sv,sb=sosfilt(bp,vo),sosfilt(bp,bed);w=SR//2
    db=lambda x:10*np.log10(np.mean(x**2)+1e-14);ref=db(vo);out=[]
    for i in range(0,len(vo)-w,w):
        if db(vo[i:i+w])>ref-12: out.append((i,db(sv[i:i+w])-db(sb[i:i+w])))
    return out
def automate(v,s,m,cues,target=6.6,peak=0.891):
    """Otomasi gain LOKAL pada stem SFX/musik saja (suara tidak disentuh): (1) EQ bed 500-2k saat whoosh, (2) kejernihan suara >= target dB,
    (3) puncak mix <= -1 dBFS. Kembalikan s',m',laporan."""
    rep={}
    # (1) SFX tertutup bed di model HP (HPF 320 Hz): musik diturunkan lokal (Hann +-0,3 dtk) secukupnya sampai SFX >= -6 dB terhadap bed.
    # transisi-dunia (whoosh) maks 14 dB, kinetik-cincin/ketik maks 8 dB; thud sub kata-hero dibiarkan (keterbatasan speaker, diterima Sutradara)
    hp=butter(4,320,'high',fs=SR,output='sos');lp=butter(2,11000,'low',fs=SR,output='sos');ph=lambda x:sosfilt(lp,sosfilt(hp,x))
    pf=ph(s.mean(1));pm=ph(m.mean(1));dbm=lambda x:10*np.log10(np.mean(x**2)+1e-14)
    wdip=np.ones(len(m),np.float32);rep['whoosh_dips']=[]
    for c in cues:
        cap={'transisi-dunia':14.0,'kinetik-cincin':8.0,'ketik':8.0}.get(c['peran'])
        if not cap: continue
        i=int(max(0,c['t']-0.02)*SR);j=i+int(0.16*SR)
        d=dbm(pf[i:j])-dbm(pm[i:j])
        if d<-6.0:
            need=min(cap,-6.0-d+1.0);a_=max(0,int((c['t']-0.3)*SR));b_=min(len(m),int((c['t']+0.3)*SR))
            g=10**(-need*np.hanning(b_-a_)/20);wdip[a_:b_]=np.minimum(wdip[a_:b_],g)
            rep['whoosh_dips'].append((c['t'],c['peran'],round(float(need),1)))
    m=m*wdip[:,None]
    # (2) kejernihan suara >= target di pita ucap (300-4k), diukur seperti audio_phone.py; kurangi komponen yang mendominasi bed
    bp=butter(4,[300,4000],'band',fs=SR,output='sos');fv=sosfilt(bp,v);fs_=sosfilt(bp,s.mean(1));fm_=sosfilt(bp,m.mean(1));w=SR//2
    db=lambda x:10*np.log10(np.mean(x**2)+1e-14);ref=db(v)
    wins=[i for i in range(0,len(v)-w,w) if db(v[i:i+w])>ref-12]
    gm=np.ones(len(v),np.float32);gs=np.ones(len(v),np.float32)
    def snr_at(i,gm,gs):
        return db(fv[i:i+w])-db(fs_[i:i+w]*gs[i:i+w]+fm_[i:i+w]*gm[i:i+w])
    for it in range(20):
        bad=[(i,snr_at(i,gm,gs)) for i in wins if snr_at(i,gm,gs)<target]
        if not bad:break
        for i,x in bad:
            d=target-x+0.4;a=max(0,i-int(0.15*SR));b=min(len(v),i+w+int(0.15*SR))
            es=db(fs_[i:i+w]*gs[i:i+w]);em=db(fm_[i:i+w]*gm[i:i+w])
            if es>=em-3: gs[a:b]*=10**(-d/20)
            if em>=es-3: gm[a:b]*=10**(-d/20)
        gm=np.maximum(smooth_min(gm,0.08),10**(-14/20));gs=np.maximum(smooth_min(gs,0.08),10**(-14/20))
    rep['clarity_iterations']=it+1;rep['clarity_min_db']=round(min(snr_at(i,gm,gs) for i in wins),2)
    m=m*gm[:,None];s=s*gs[:,None]
    rep['music_dip_max_db']=round(float(-20*np.log10(gm.min())),2);rep['sfx_dip_max_db']=round(float(-20*np.log10(gs.min())),2)
    # (3) puncak: kurangi (s+m) lokal sehingga |v + k(s+m)| <= peak ; suara tidak berubah
    for it in range(6):
        sm=(s+m);mix=v[:,None]+sm;over=np.abs(mix).max(1)>peak
        if not over.any():break
        k=np.ones(len(v),np.float32)
        idx=np.flatnonzero(over)
        for ch in (0,1):
            vv=v[idx];ss=sm[idx,ch]
            need=np.where(np.sign(vv)==np.sign(ss),(peak-np.abs(vv))/np.maximum(np.abs(ss),1e-9),1.0)
            k[idx]=np.minimum(k[idx],np.clip(need,0.0,1.0))
        k=smooth_min(k,0.04);s=s*k[:,None];m=m*k[:,None]
    rep['peak_after_dbfs']=round(float(20*np.log10(np.abs(v[:,None]+s+m).max())),3);rep['peak_iterations']=it+1
    return s,m,rep
if __name__=='__main__':
    words=json.load(open(P.parent/'edit/words.json'))['words'];cues=json.load(open(P/'cues.json'))
    v,_=sf.read(P.parent/'edit/suara.wav',dtype='float32');s,_=sf.read(P/'stem_sfx.wav',dtype='float32')
    n=len(v);assert n==NS,n;s=np.pad(s,(0,max(0,n-len(s))))[:n];s2=np.stack([s,s],1)
    meter=pyln.Meter(SR);rep={};v2=np.stack([v,v],1)
    for name,opening in (('A','aware'),('B','ticking')):
        m=finish(build_music(opening),words)
        sf.write(P/f'stem_musik_{name}_pra.wav',m,SR,subtype='FLOAT')
        s_f,m_f,r=automate(v,s2,m,cues)
        sf.write(P/f'stem_musik_{name}.wav',m_f,SR,subtype='FLOAT');sf.write(P/f'stem_sfx_{name}.wav',s_f,SR,subtype='FLOAT')
        mix=v2+s_f+m_f
        sf.write(P/f'mix_{name}.wav',mix,SR,subtype='FLOAT')
        chk=sf.read(P/f'mix_{name}.wav',dtype='float32')[0]-s_f-m_f
        r.update(mix_lufs=round(meter.integrated_loudness(mix),2),peak_dbfs=round(float(20*np.log10(np.abs(mix).max())),2),music_lufs=round(meter.integrated_loudness(m_f),2),
                 voice_max_abs_diff=float(np.abs(chk-v2).max()),limiter=False)
        rep[name]=r;print(name,r,flush=True)
    s_n,_,rn=automate(v,s2,np.zeros_like(s2),cues);base=v2+s_n;sf.write(P/'mix_tanpa-musik.wav',base,SR,subtype='FLOAT');sf.write(P/'stem_sfx_tanpa-musik.wav',s_n,SR,subtype='FLOAT');print('tanpa-musik',rn)
    rep['tanpa-musik']=dict(mix_lufs=round(meter.integrated_loudness(base),2),peak_dbfs=round(float(20*np.log10(np.abs(base).max())),2),voice_max_abs_diff=float(np.abs(base-s_n-v2).max()),**rn)
    rep['voice_lufs']=round(meter.integrated_loudness(v2),2)
    json.dump(rep,open(P/'mix_report.json','w'),indent=1);print(rep['tanpa-musik'],rep['voice_lufs'])
