#!/usr/bin/env python3
"""QA visual: energi tepi & luminans per detik, deteksi cut, contact sheet 960px."""
import sys, subprocess, numpy as np
from PIL import Image, ImageFilter
v=sys.argv[1]; out=sys.argv[2] if len(sys.argv)>2 else v.replace('.mp4','_qc.jpg')
W,H=320,180
raw=subprocess.run(["ffmpeg","-v","error","-i",v,"-vf",f"fps=4,scale={W}:{H}","-f","rawvideo","-pix_fmt","rgb24","-"],capture_output=True).stdout
fr=np.frombuffer(raw,np.uint8).reshape(-1,H,W,3)
print("frames@4fps",len(fr))
rows=[]
for i in range(0,len(fr),4):
    im=Image.fromarray(fr[i]).resize((640,360))
    e=np.asarray(im.convert('L').filter(ImageFilter.FIND_EDGES),float).mean()
    l=np.asarray(im.convert('L'),float); rows.append((i/4,e,l.mean(),l.std()))
bad=[r for r in rows if r[1]>10]
print("detik dengan energi tepi >10:", [f"{r[0]:.0f}s({r[1]:.1f})" for r in bad] or "tidak ada")
print("luminans min/max:", min(r[2] for r in rows), max(r[2] for r in rows))
d=np.abs(np.diff(fr.astype(int),axis=0)).mean(axis=(1,2,3))
print("lompatan besar (cut) di detik:", [round((i+1)/4,2) for i in np.nonzero(d>40)[0]])
blk=[round(r[0]) for r in rows if r[2]<8]; print("frame hampir hitam:", blk or "tidak ada")
sel=fr[::8][:40]; n=len(sel); cols=8; rws=(n+cols-1)//cols
sheet=Image.new("RGB",(cols*120,rws*68))
for k,f in enumerate(sel): sheet.paste(Image.fromarray(f).resize((120,68)),((k%cols)*120,(k//cols)*68))
sheet.save(out); print("sheet",out)
