import numpy as np, soundfile as sf, subprocess, pyloudnorm as pyln, json
SR=48000; DUR=47.6; P='/home/irfan/work/skill-development/projects/jensen-pain-suffering'
def rd(args):
    return np.frombuffer(subprocess.run(['ffmpeg','-v','error']+args+['-ac','2','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout,dtype=np.float32).reshape(-1,2).copy()
N=int(DUR*SR); meter=pyln.Meter(SR)
def fit(a): b=np.zeros((N,2),np.float32); b[:min(N,len(a))]=a[:N]; return b
voice=fit(rd(['-i',P+'/audio/suara.wav']))
voice*=10**((-15.0-meter.integrated_loudness(voice[:int(46.1*SR)]))/20)        # narasumber −15 LUFS, gain linear
EQ='equalizer=f=500:t=q:w=1:g=-3,equalizer=f=3000:t=q:w=1:g=-4'                # cekungan suara (music_fit)
t1=rd(['-ss','151','-t','15.6','-i',P+'/musik/kandidat/yt06.mp3','-af',EQ])
t2=rd(['-ss','202','-t','32.6','-i',P+'/musik/kandidat/yt04.mp3','-af',EQ])
def norm(a,l): return a*10**((l-meter.integrated_loudness(a))/20)
t1=norm(t1,-23.0); t2=norm(t2,-23.0)
m1=np.zeros((N,2),np.float32); s=0; m1[:len(t1)]=t1[:N]
m2=np.zeros((N,2),np.float32); o=int(15.267*SR); m2[o:o+len(t2)]=t2[:N-o]
# automation dB relatif (titik, dB) — ramp linear di antaranya
def auto(pts):
    t=np.arange(N)/SR; x=[p[0] for p in pts]; y=[p[1] for p in pts]; return (10**(np.interp(t,x,y)/20)).astype(np.float32)[:,None]
g1=auto([(0,-1),(8.9,-1),(9.4,-5),(14.9,-5),(15.27,-40),(DUR,-40)])          # hook −20, masa muda −28, keluar di twist
g2=auto([(0,-60),(15.2,-60),(15.3,-4),(27.0,-4),(39.0,2),(44.2,3),(44.33,2),(46.0,2),(46.35,-60),(DUR,-60)])
m1*=g1; m1[int(15.0*SR):int(15.27*SR)]*=np.linspace(1,0,int(0.27*SR))[:,None]
m2*=g2
sfx=fit(sf.read(P+'/audio/sfx.wav',dtype='float32')[0])
mix=voice+m1+m2+sfx
L=meter.integrated_loudness(mix); mix*=10**((-14.2-L)/20)
sf.write(P+'/audio/mix_pre.wav',mix,SR,subtype='FLOAT')
subprocess.run(['ffmpeg','-v','error','-y','-i',P+'/audio/mix_pre.wav','-af','alimiter=limit=0.76:attack=2:release=60:level=disabled','-c:a','pcm_f32le',P+'/audio/mix_lim.wav'],check=True)
mix=sf.read(P+'/audio/mix_lim.wav',dtype='float32')[0]
for n,a in (('mix',mix),('stem_musik',(m1+m2)),('stem_suara',voice),('stem_sfx',sfx)): sf.write(f'{P}/audio/{n}.wav',a,SR,subtype='FLOAT')
print('mix LUFS %.1f peak %.1f dBFS'%(meter.integrated_loudness(mix),20*np.log10(np.abs(mix).max())))
for a,b in ((0,9),(9.2,15),(16,27),(28,39),(40,44),(44.4,46)):
    seg=lambda x: meter.integrated_loudness(x[int(a*SR):int(b*SR)])
    print(f'{a:4.1f}-{b:4.1f}  suara {seg(voice):6.1f}  musik {seg(m1+m2):6.1f}')
