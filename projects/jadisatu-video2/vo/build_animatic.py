# Rakit VO narator + klip Irfan (file bersih) sesuai STORYBOARD v2 -> animatic audio
import subprocess, json, numpy as np, soundfile as sf
SR=48000; CL="../../../Personal-video/Bahan/clean/talkinghead_clean_audio.wav"
def load(path, a=None, b=None):
    cmd=["ffmpeg","-v","error"]+(["-ss",str(a),"-to",str(b)] if a is not None else [])+["-i",path,"-ac","1","-ar",str(SR),"-f","f32le","-"]
    return np.frombuffer(subprocess.run(cmd,capture_output=True,check=True).stdout,dtype=np.float32)
def trim(x,thr=-45):
    db=20*np.log10(np.abs(x)+1e-9); idx=np.where(db>thr)[0]
    if len(idx)==0: return x
    a=max(0,idx[0]-int(0.02*SR)); b=min(len(x),idx[-1]+int(0.06*SR)); return x[a:b]
def fade(x,ms=10):
    n=int(ms/1000*SR); 
    if len(x)>2*n: x=x.copy(); x[:n]*=np.linspace(0,1,n); x[-n:]*=np.linspace(1,0,n)
    return x
def clip(*parts): return np.concatenate([fade(load(CL,a,b)) for a,b in parts])*10**(-3/20)  # klip Irfan -3 dB agar setara VO
sil=lambda s: np.zeros(int(s*SR),dtype=np.float32)
seq=[("vo","c01"),("card","taruhan",0.8),("vo","c02"),("clip","C1",[(3.28,6.10)]),("vo","c03"),("clip","C2",[(7.62,11.45)]),
("card","MENJIJIKKAN",1.2),("vo","c04"),("vo","c05"),("clip","C3",[(14.84,16.84),(18.08,19.95)]),("vo","c06"),("clip","C4",[(26.78,35.40)]),
("vo","c07"),("vo","c08"),("card","taruhan",0.8),("clip","C5",[(39.56,43.90),(44.85,46.20)]),("clip","C6",[(49.30,50.72),(51.40,51.60),(52.15,54.70)]),
("vo","c09"),("vo","c10"),("vo","c11")]
GAP=0.25; out=[]; vo_only=[]; t=0; marks=[]
for it in seq:
    if it[0]=="vo": x=fade(trim(load(it[1]+".mp3")))
    elif it[0]=="clip": x=clip(*it[2])
    else: x=sil(it[2])
    marks.append({"item":it[1],"type":it[0],"start":round(t,3),"end":round(t+len(x)/SR,3)})
    out+= [x, sil(GAP)]; t+=len(x)/SR+GAP
    if it[0]=="vo": vo_only+=[x,sil(0.6)]
y=np.concatenate(out); sf.write("animatic_raw.wav",y,SR); sf.write("vo_full_raw.wav",np.concatenate(vo_only),SR)
json.dump({"total":round(t,3),"marks":marks},open("animatic_timing.json","w"),indent=1)
print("total",round(t,2))
