import numpy as np, subprocess, sys
def env(f, hop=0.5):
    a=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','8000','-f','f32le','-'],capture_output=True).stdout,dtype=np.float32)
    n=int(hop*8000); r=np.array([np.sqrt((a[i:i+n]**2).mean()+1e-12) for i in range(0,len(a)-n,n)]); return 20*np.log10(r)
# target track 2 (32,3 dtk, hop 0,5): 0–11,7 sedang-rendah, 11,7–29 naik, 29–31 puncak
T=np.concatenate([np.full(24,-8.0),np.linspace(-8,0,35),np.full(6,0.0)])
T1=np.full(31,0.0)  # track 1: stabil, tanpa breakdown
for f in sys.argv[1:]:
    e=env(f); best=(-9,0,0)
    for tgt,name in ((T,'t2'),(T1,'t1')):
        L=len(tgt); best=(-9,0)
        for s in range(0,len(e)-L,2):
            w=e[s:s+L]; w=w-w.max()
            if w.min()<-30: continue
            c=np.corrcoef(w,tgt)[0,1] if name=='t2' else -np.std(w)/10
            if c>best[0]: best=(c,s*0.5)
        print(f"{f.split('/')[-1][:28]:28s} {name} skor {best[0]:+.2f} mulai {best[1]:6.1f} dtk")
