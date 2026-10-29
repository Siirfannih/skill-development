import sys,glob
from PIL import Image,ImageDraw
d,out=sys.argv[1],sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 4
fs=sorted(glob.glob(d+'/*.jpg'));W,H=480,270;rows=(len(fs)+cols-1)//cols
M=Image.new('RGB',(W*cols,(H+16)*rows),'white');dr=ImageDraw.Draw(M)
for i,f in enumerate(fs):
  im=Image.open(f).resize((W,H));x=(i%cols)*W;y=(i//cols)*(H+16);M.paste(im,(x,y));dr.text((x+4,y+H+2),f.split('/')[-1],fill='black')
M.save(out,quality=85)
