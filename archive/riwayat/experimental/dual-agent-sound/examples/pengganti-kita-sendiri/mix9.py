"""Mix v9 — blueprint akustik + overrides Irfan (31 Okt 13:42).
VO playback 1,0; satu trek musik utuh (Echoes, Mixkit #188) -26 LUFS sampai klip Jensen, mati saat Jensen, fade-in pelan ke -20 LUFS;
ducking sidechain (musik turun saat narasi, naik di sela kalimat); SFX maks 15 dari 3 jenis (sub boom, air whoosh/LPF sweep, tape hiss);
master -14 LUFS, true peak <= -1,5 dBTP, gerbang lulus: LRA >= 7,0 LU dan jeda kalimat rata-rata >= 0,5 dtk."""
import json,subprocess,sys,numpy as np,soundfile as sf,pyloudnorm as pyln
from scipy.signal import butter,sosfilt
from scipy.ndimage import minimum_filter1d,maximum_filter1d
SR=48000; t2i=lambda s:int(round(s*SR)); db2=lambda g:10**(g/20)
P=json.load(open(sys.argv[1])) if len(sys.argv)>1 else {}
G=lambda k,d:P.get(k,d)
meter=pyln.Meter(SR)
def load(p,a=0.0,b=None,ch=2):
    args=['ffmpeg','-v','error','-ss',str(a)]+(['-t',str(b-a)] if b else [])+['-i',p,'-ac',str(ch),'-ar',str(SR),'-f','f32le','-']
    x=np.frombuffer(subprocess.run(args,capture_output=True).stdout,np.float32).copy(); return x.reshape(-1,ch) if ch>1 else x
T=json.load(open('timeline.json')); N=t2i(T['total']); BL={b.get('name'):b for b in T['blocks'] if b['kind']!='pad'}
dia,_=sf.read('stem_dialog.wav'); dia=np.pad(dia,(0,max(0,N-len(dia))))[:N]
JEN=BL['jensen']; J0=JEN['t']; J1=J0+JEN['dur']
# dinamika narator per babak (blueprint: B1 dekat & tegas, B2 terukur, B3 intim) → memberi ruang LRA tanpa kompresi rata
vg=np.ones(N); B2s=BL['s3']['t']; B3s=J0-1.5
for a_,b_,gdb in [(0,B2s,G('vo_b1_db',0.0)),(B2s,B3s,G('vo_b2_db',-1.5)),(B3s,T['total'],G('vo_b3_db',-4.0))]: vg[t2i(a_):t2i(b_)]=db2(gdb)
vg=np.convolve(vg,np.ones(t2i(0.3))/t2i(0.3),'same')
for b_ in T['blocks']:   # tiap blok VO/klip disamakan loudness-nya dulu, baru dinamika per babak
    if b_['kind'] in ('vo','clip'):
        i_,j_=t2i(b_['t']),t2i(b_['t']+b_['dur']); l_=meter.integrated_loudness(dia[i_:j_])
        if np.isfinite(l_): dia[i_:j_]*=db2((G('vo_lufs',-16.0)-(1.0 if b_['kind']=='clip' else 0.0))-l_)
dia=dia*vg
# ── musik: satu trek utuh dari detik 0 sumber
mus=load('/home/claude/music_hunt/dl2/188.mp3',G('music_offset',0.0),G('music_offset',0.0)+T['total']+0.5)[:N]
mus=np.pad(mus,((0,N-len(mus)),(0,0)))
mus=mus-np.stack([sosfilt(butter(2,[2500,6000],'bp',fs=SR,output='sos'),mus[:,c]) for c in (0,1)],1)*0.4   # ruang untuk vokal (<4 kHz dominan)
# ducking sidechain dari VO (attack 30 ms, release 400 ms)
fr=t2i(0.02); e=np.array([np.sqrt(np.mean(dia[i:i+fr]**2)) for i in range(0,N,fr)]); vo=np.sqrt(np.mean(dia[np.abs(dia)>0.01]**2))
on=(e>vo*db2(-24)).astype(float); g=np.zeros_like(on); v=0; rel=np.exp(-1/(0.4/0.02)); att=1-np.exp(-1/(0.03/0.02))
for i,o in enumerate(on): v=v+(o-v)*att if o>v else v*rel; g[i]=v
duck=np.repeat(g,fr)[:N]; dk=1-duck*(1-db2(G('duck_db',-7)))
# target per wilayah = level BED musik (sebelum ducking; terdengar di sela kalimat): [0,J0-SILENCE)=-26 ; mute saat Jensen ; setelah: fade-in pelan ke -20
def seg_gain(x,target):
    l=meter.integrated_loudness(x); return db2(target-l) if np.isfinite(l) else 1.0
pre_end=J0-1.5   # 1,5 dtk sebelum Jensen = beat drop (musik keluar pelan)
a=mus[:t2i(pre_end)]; k1=seg_gain(a,G('lufs_pre',-26.0)-G('master_comp',0.0))
b=mus[t2i(J1):]; k2=seg_gain(b,G('lufs_post',-20.0)-G('master_comp',0.0))
env=np.zeros(N)
env[:t2i(pre_end)]=k1
fo=t2i(1.2); env[t2i(pre_end)-fo:t2i(pre_end)]=k1*np.linspace(1,0,fo)**2      # musik keluar menjelang beat drop
fin=t2i(G('fade_in_s',6.0)); i1=t2i(J1+0.3)
env[i1:i1+fin]=k2*np.linspace(0,1,fin)**1.5; env[i1+fin:]=k2                   # masuk kembali pelan
sw=t2i(G('end_swell_s',24.0)); env[-sw:]*=db2(np.linspace(0,G('end_swell_db',5.0),sw))   # swell naik di akhir (resolusi)
tail=t2i(2.5); env[-tail:]*=np.linspace(1,0,tail)
mus=mus*(env*dk)[:,None]
# ── SFX (maks 15): file, trim, waktu, dB relatif VO, LPF, pan
C=json.load(open('cues9.json')); assert len(C)<=15, 'lebih dari 15 cue'
sfx=np.zeros((N,2)); placed=[]
for q in C:
    x=load(q['file'],q.get('a',0.0),q.get('b'),2)
    if q.get('loop_to'):   # bed tekstur: ulang dengan crossfade 2 dtk
        L=t2i(q['loop_to']); xf=t2i(2.0); y=x.copy()
        while len(y)<L:
            w=np.linspace(0,1,xf)[:,None]; y=np.concatenate([y[:-xf],y[-xf:]*(1-w)+x[:xf]*w,x[xf:]])
        x=y[:L]
    if q.get('lp'): x=np.stack([sosfilt(butter(4,q['lp'],'lp',fs=SR,output='sos'),x[:,c]) for c in (0,1)],1)
    x=np.stack([sosfilt(butter(2,35,'hp',fs=SR,output='sos'),x[:,c]) for c in (0,1)],1)
    f_in=t2i(q.get('fi',0.005)); f_out=t2i(q.get('fo',0.05)); x[:f_in]*=np.linspace(0,1,f_in)[:,None]; x[-f_out:]*=np.linspace(1,0,f_out)[:,None]
    wn=t2i(0.4 if not q.get('loop_to') else 3.0); m=x.mean(1)
    pk=max(np.sqrt(np.mean(m[i:i+wn]**2)) for i in range(0,max(1,len(m)-wn),max(1,wn//2)))
    x*=vo*db2(q['db'])/pk
    t0=q['t']-(q.get('peak',0.0) if q.get('align')=='peak' else 0.0)
    i0=max(0,t2i(t0)); n=min(len(x),N-i0)
    if q.get('mute_jensen'):   # tekstur ikut hening saat klip Jensen (overrides: hening total)
        a_,b_=t2i(J0-1.0)-i0,t2i(J1+0.5)-i0; r_=t2i(0.4); env_=np.ones(len(x)); env_[max(0,a_):max(0,b_)]=0
        env_=np.convolve(env_,np.ones(r_)/r_,'same'); x=x*env_[:,None]
    sfx[i0:i0+n]+=x[:n]; placed.append(dict(q,start=round(t0,3)))
# ── jumlah + master
mix=np.stack([dia,dia],1)+mus+sfx
for nm,x in [('dialog_g',dia),('music',mus),('sfx',sfx),('mix_raw',mix)]: sf.write(f'stem_{nm}.wav',x.astype(np.float32),SR,subtype='FLOAT')
g=-14.0-meter.integrated_loudness(mix)
if abs(g)>0.3 and not P.get('_pass2'):
    P2=dict(P,master_comp=round(G('master_comp',0.0)+g,2),_pass2=True); json.dump(P2,open('/tmp/_p2.json','w')); sys.exit(subprocess.run([sys.executable,sys.argv[0],'/tmp/_p2.json']).returncode)
m=mix*db2(g)
th=db2(-2.2); k=t2i(0.005); gr=np.minimum(1,th/np.maximum(np.abs(m).max(1),1e-9)); gr=minimum_filter1d(gr,2*k+1); gr=np.convolve(gr,np.ones(k)/k,'same'); gr=minimum_filter1d(gr,k)
m=np.clip(m*gr[:,None],-db2(-1.6),db2(-1.6)); sf.write('mix_master.wav',m.astype(np.float32),SR,subtype='PCM_24')
json.dump(placed,open('placed9.json','w'),indent=0,ensure_ascii=False)
# ── gerbang lulus
r=subprocess.run(['ffmpeg','-hide_banner','-i','mix_master.wav','-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
import re
I=float(re.findall(r'I:\s+(-?[\d.]+) LUFS',r)[-1]); LRA=float(re.findall(r'LRA:\s+([\d.]+) LU',r)[-1]); TP=float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS',r)[-1])
W=T['words']; gaps=[b_['s']-a_['e'] for a_,b_ in zip(W,W[1:]) if a_['src']==b_['src'] and a_['w'][-1] in '.?']
def lufs(x): l=meter.integrated_loudness(x); return round(l,1)
ud=np.maximum(dk,1e-3)[:,None]; mpre=round(lufs(mus[:t2i(pre_end)]/ud[:t2i(pre_end)])+g,1); mpost=round(lufs(mus[t2i(J1+6):-t2i(2.5)]/ud[t2i(J1+6):-t2i(2.5)]/db2(0))+g,1)   # level bed (tanpa ducking) di domain master
jen=float(np.sqrt(np.mean(mus[t2i(J0):t2i(J1)]**2)))
ok=LRA>=7.0 and np.mean(gaps)>=0.5 and TP<=-1.5
print(json.dumps(dict(I=I,LRA=LRA,TP=TP,mean_sentence_gap=round(float(np.mean(gaps)),2),music_lufs_pre=mpre,music_lufs_post=mpost,music_during_jensen_rms=jen,sfx_cues=len(C),PASS=bool(ok))))
