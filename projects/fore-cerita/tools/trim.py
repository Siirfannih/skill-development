import sys
import numpy as np, cv2
from PIL import Image
for p in sys.argv[1:]:
    im=np.asarray(Image.open(p).convert("RGBA")).copy()
    a=im[...,3]; core=(a>200).astype(np.uint8); a=(a*cv2.dilate(core,np.ones((5,5),np.uint8))).astype(np.uint8); a=np.where(a>215,255,a).astype(np.uint8)
    a=cv2.erode(a, np.ones((3,3),np.uint8), iterations=1)        # buang pinggiran merah/magenta
    a=cv2.GaussianBlur(a,(3,3),0)
    rgb=im[...,:3].astype(int); r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
    fringe=(a<250)&(r>g+50)
    a=np.where(fringe, (a*0.3).astype(np.uint8), a)
    im[...,3]=a
    pil=Image.fromarray(im); bb=Image.fromarray(np.where(a>24,255,0).astype(np.uint8)).getbbox()
    if bb: pil=pil.crop(bb)
    pil.save(p); print(p.split('/')[-1], '->', pil.size)
