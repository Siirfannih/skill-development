import sys, subprocess, numpy as np
for p in sys.argv[1:]:
    b=subprocess.run(["ffmpeg","-v","error","-i",p,"-ac","1","-ar","16000","-af","highpass=f=60,lowpass=f=1000","-f","s16le","-"],capture_output=True).stdout
    x=np.frombuffer(b,np.int16).astype(np.float32)/32768
    sr=16000; n=int(0.04*sr); hop=int(0.02*sr); f0=[]
    rms_all=np.sqrt(np.mean(x**2))
    for i in range(0,len(x)-n,hop):
        f=x[i:i+n]; 
        if np.sqrt(np.mean(f**2))<rms_all*0.8: continue
        f=f-f.mean(); ac=np.correlate(f,f,'full')[n-1:]
        lo,hi=int(sr/400),int(sr/70)
        k=lo+np.argmax(ac[lo:hi])
        if ac[k]>0.45*ac[0]: f0.append(sr/k)
    f0=np.array(f0); print(p, "frame bersuara", len(f0), "median F0 %.0f Hz, p10 %.0f, p90 %.0f"%(np.median(f0),np.percentile(f0,10),np.percentile(f0,90)))
