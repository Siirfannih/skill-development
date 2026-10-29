import subprocess,re,sys,numpy as np,soundfile as sf
# tempo via rubberband, then shorten internal silences (>=0.30s at -42dB) to target, trimming the middle
def run(i,o,tempo=1.06,target=0.28):
    subprocess.run(['ffmpeg','-v','error','-y','-i',i,'-af',f'rubberband=tempo={tempo}:pitchq=quality,aresample=48000','-ac','1',o+'.tmp.wav'],check=True)
    y,sr=sf.read(o+'.tmp.wav')
    log=subprocess.run(['ffmpeg','-i',o+'.tmp.wav','-af','silencedetect=n=-42dB:d=0.30','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
    keep=np.ones(len(y),bool); dur=len(y)/sr
    for s,e in zip(st,en):
        if s<0.05 or e>dur-0.05: continue
        cut=(e-s)-target
        if cut>0:
            a=int((s+(e-s-cut)/2)*sr); keep[a:a+int(cut*sr)]=False
    y=y[keep]
    # trim lead/tail silence to 0.05s
    nz=np.where(np.abs(y)>10**(-42/20))[0]; y=y[max(0,nz[0]-int(.05*sr)):nz[-1]+int(.12*sr)]
    sf.write(o,y,sr); print(o, round(dur,2),'->',round(len(y)/sr,2))
for f in sys.argv[2:]: run(f, sys.argv[1]+'/'+f.split('/')[-1].replace('.mp3','.wav'))
