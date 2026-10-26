#!/bin/bash
# usage: stills.sh name f1 f2 ...  -> renders frames, builds a 960px-wide sheet
cd /home/claude/thegap/video
name=$1; shift; mkdir -p ../qa/$name; rm -f ../qa/$name/*.jpg
for f in "$@"; do npx remotion still TheGap ../qa/$name/f$(printf %05d $f).jpg --frame=$f --scale=0.25 --image-format=jpeg --log=error >/dev/null 2>&1 & 
  while [ $(jobs -r | wc -l) -ge 2 ]; do sleep 0.3; done; done; wait
python3 - "$name" <<'PY'
import sys,glob
from PIL import Image,ImageDraw
fs=sorted(glob.glob(f'/home/claude/thegap/qa/{sys.argv[1]}/f*.jpg'))
ims=[Image.open(f) for f in fs]; w,h=ims[0].size; cols=4; rows=(len(ims)+cols-1)//cols
sh=Image.new('RGB',(w*cols,h*rows),'gray')
for i,(im,f) in enumerate(zip(ims,fs)):
    d=ImageDraw.Draw(im); d.rectangle([0,0,60,14],fill='black'); d.text((3,2),f.split('/f')[-1][:-4],fill='yellow'); sh.paste(im,((i%cols)*w,(i//cols)*h))
sh.save(f'/home/claude/thegap/qa/{sys.argv[1]}_sheet.jpg',quality=85); print('sheet',len(ims))
PY
