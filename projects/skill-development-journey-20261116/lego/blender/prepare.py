"""Build monitor footage only; never render the 3D shot."""
from pathlib import Path
import json, math, subprocess, hashlib
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[2]
OUT=Path('/mnt/storage-projects/skill-dev-journey/b10a'); (OUT/'textures').mkdir(parents=True,exist_ok=True)
worddata=(ROOT/'edit/words.json').read_bytes()
words=json.loads(worddata)['words']
i=next(i for i,w in enumerate(words) if w['w'].lower()=='menurut')
start=words[i-1]['s']-.3; end=words[i+4]['e']+.5; onset=words[i+3]['s']; fps=30000/1001
count=math.ceil((end-start)*fps)
meta=dict(start=start,end=end,duration=end-start,onset=onset,onset_local=onset-start,fps=fps,frames=count,onset_frame=math.ceil((onset-start)*fps)+1,words_sha256=hashlib.sha256(worddata).hexdigest(),audio_sha256=hashlib.sha256((ROOT/'edit/suara.wav').read_bytes()).hexdigest())
(OUT/'timing.json').write_text(json.dumps(meta,indent=2))
fontpath='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
# Font is loaded from a concrete file; no runtime fallback.
font=lambda s:ImageFont.truetype(fontpath,s)
sr=16000
raw=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(ROOT/'edit/suara.wav'),'-f','f32le','-ac','1','-ar',str(sr),'-']),dtype=np.float32)
thumb=[]
for k,t in enumerate(np.linspace(68,81,9)):
 p=OUT/'textures'/f'thumb-{k}.jpg'
 subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',str(ROOT/'edit/wajah.mp4'),'-frames:v','1','-vf','scale=144:81',str(p),'-y'],check=True)
 thumb.append(Image.open(p).convert('RGB'))
# Decode just this shot's original talking head to keep the preview live.
subprocess.run(['ffmpeg','-v','error','-ss',str(start),'-i',str(ROOT/'edit/wajah.mp4'),'-t',str(end-start+.05),'-vf',f'fps={fps},scale=640:360','-q:v','3',str(OUT/'textures/face-%03d.jpg'),'-y'],check=True)
for f in range(1,count+1):
 t=start+(f-1)/fps
 im=Image.new('RGB',(1280,720),'#17191c'); d=ImageDraw.Draw(im)
 # Preview, source bin, and transport retain the project's own footage and words.
 face=Image.open(OUT/'textures'/f'face-{f:03d}.jpg'); im.paste(face,(556,24))
 d.rectangle((24,24,520,384),fill='#202327')
 for j in range(6):
  x=40+j%3*153; y=45+j//3*132; im.paste(thumb[j],(x,y)); d.line((x,y+94,x+110,y+94),fill='#51575d',width=4)
 d.polygon([(850,400),(850,416),(864,408)],fill='#cbd4da')
 d.text((902,394),f'{int(t)//60:02}:{t%60:05.2f}',font=font(18),fill='#d0d2d5')
 d.line((24,435,1256,435),fill='#383c42',width=2)
 for j in range(14):
  x=65+j*84; d.line((x,440,x,453),fill='#667078'); d.text((x,456),str(68+j),font=font(12),fill='#8b959d')
 for y in [485,548,628]: d.rectangle((24,y,1256,y+58),fill='#22272c')
 for j in range(12):
  x=52+j*100; tile=thumb[j%9].resize((96,54)); im.paste(tile,(x,487)); d.rectangle((x,487,x+96,541),outline='#416d7f',width=2)
 d.rectangle((52,551,471,609),fill='#514363'); d.text((72,560),'menurut kalian',font=font(25),fill='#f0eaf6')
 d.rectangle((478,551,674,609),fill='#514363'); d.text((489,560),'videonya',font=font(25),fill='#f0eaf6')
 if f>=meta['onset_frame']:
  # A rapid eased placement begins exactly at the first frame at/after the word onset.
  u=min(1,(f-meta['onset_frame'])/7); ease=1-(1-u)**3; x=round(708+(1-ease)*80)
  d.rectangle((x,550,x+510,611),fill='#aa6d50',outline='#ecc2a0',width=2)
  d.text((x+24,557),'kayak gimana?',font=font(35),fill='#ffffff')
 for x in range(52,1237,2):
  a=int((68+(x-52)/1185*14)*sr); b=a+max(1,int(sr*14/1185*2)); v=min(1,float(np.max(np.abs(raw[a:b])))*2.1)
  h=3+int(v*23); d.line((x,658-h,x,658+h),fill='#70948b',width=1)
 px=int(52+(t-68)/14*1185); d.line((px,477,px,690),fill='#e8c5a0',width=3); d.polygon([(px-6,477),(px+6,477),(px,485)],fill='#e8c5a0')
 im.save(OUT/'textures'/f'editor-{f:03d}.png')
subprocess.run(['ffmpeg','-v','error','-framerate',str(fps),'-i',str(OUT/'textures/editor-%03d.png'),'-c:v','libx264','-crf','16','-pix_fmt','yuv420p',str(OUT/'editor-timeline.mp4'),'-y'],check=True)
print(json.dumps(meta))
