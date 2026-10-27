import sys, subprocess, numpy as np
SR=48000
for p in sys.argv[1:]:
    raw=subprocess.run(["ffmpeg","-v","error","-i",p,"-ac","1","-ar",str(SR),"-f","f32le","-"],capture_output=True).stdout
    x=np.frombuffer(raw,dtype=np.float32)
    if len(x)<1000: print("short",p); continue
    S=np.abs(np.fft.rfft(x*np.hanning(len(x))))**2; f=np.fft.rfftfreq(len(x),1/SR); tot=S.sum()+1e-12
    b=lambda lo,hi: S[(f>=lo)&(f<hi)].sum()/tot*100
    cent=(S*f).sum()/tot
    flag="TAJAM" if b(2000,6000)>35 or b(6000,24000)>10 else ""
    print(f"{p.split('/')[-1]:20s} cent {cent:6.0f}Hz  <250 {b(0,250):4.0f}%  250-2k {b(250,2000):4.0f}%  2-6k {b(2000,6000):4.0f}%  >6k {b(6000,24000):4.0f}% {flag}")
