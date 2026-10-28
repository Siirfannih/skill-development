import subprocess, numpy as np, json, sys
from scipy import ndimage as nd
f=sys.argv[1]; thr=int(sys.argv[2]) if len(sys.argv)>2 else 200
raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-vf','scale=960:540','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
a=np.frombuffer(raw,np.uint8).reshape(-1,540,960,3)
out=[]
for fr in a:
    m=fr.min(2)>thr; lab,n=nd.label(m)
    if n==0: out.append(out[-1] if out else [0,0,0,0]); continue
    s=nd.sum(m,lab,range(1,n+1)); k=np.argmax(s)+1
    ys,xs=np.nonzero(lab==k)
    out.append([int(xs.min()*2),int(ys.min()*2),int(xs.max()*2),int(ys.max()*2)])
# smooth
o=np.array(out,float); k=5
sm=np.array([o[max(0,i-k):i+k+1].mean(0) for i in range(len(o))]).round().astype(int).tolist()
print(json.dumps(sm))
