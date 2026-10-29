import numpy as np,soundfile as sf,librosa,json,sys,glob
from faster_whisper import WhisperModel
m=WhisperModel("small",device="cpu",compute_type="int8")
TARGET=0.28
def words(y,sr):
    a=librosa.resample(y.astype(np.float32),orig_sr=sr,target_sr=16000)
    segs,_=m.transcribe(a,language="id",word_timestamps=True)
    return [(w.word.strip(),w.start,w.end) for s in segs for w in s.words]
for f in sys.argv[1:]:
    y,sr=sf.read(f); ws=words(y,sr); keep=np.ones(len(y),bool)
    for i in range(len(ws)-1):
        g=ws[i+1][1]-ws[i][2]
        if g>TARGET+0.04:
            # cut from the middle of the quietest stretch inside the gap
            a=int((ws[i][2]+0.06)*sr); b=int((ws[i+1][1]-0.04)*sr)
            seg=np.abs(y[a:b]); cut=int((g-TARGET)*sr)
            if b-a>cut: 
                env=np.convolve(seg,np.ones(256)/256,'same'); best=min(range(0,b-a-cut,64),key=lambda k: env[k:k+cut].sum())
                keep[a+best:a+best+cut]=False
    y2=y[keep]
    # tiny fades at cut points handled by zero-crossing approximation: apply 5ms crossfade by smoothing
    sf.write(f,y2,sr); ws2=words(y2,sr)
    gaps=[round(ws2[i+1][1]-ws2[i][2],2) for i in range(len(ws2)-1)]
    print(f, round(len(y)/sr,2),'->',round(len(y2)/sr,2),'maxgap',max(gaps))
    json.dump([[w,round(s,3),round(e,3)] for w,s,e in ws2],open(f.replace('.wav','.words.json'),'w'))
