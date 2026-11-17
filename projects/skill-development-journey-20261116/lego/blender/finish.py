"""Finish rendered review stills or all frames of the approved shot."""
from pathlib import Path
import hashlib, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[2];OUT=Path('/mnt/storage-projects/skill-dev-journey/b10a');QC=ROOT/'qc/still/revisi1';QC.mkdir(parents=True,exist_ok=True)
import sys
from scipy.ndimage import gaussian_filter
def _s2l(a): return np.where(a<=.04045,a/12.92,((a+.055)/1.055)**2.4)
def _l2s(a): a=np.clip(a,0,None); return np.where(a<=.0031308,a*12.92,1.055*a**(1/2.4)-.055)
def _y(a): return a[...,0]*.2126+a[...,1]*.7152+a[...,2]*.0722
def _q(a,size): return np.asarray(Image.fromarray(np.uint8(np.clip(_l2s(a),0,1)*255)).resize(size,Image.Resampling.BILINEAR),dtype=np.float32)/255
# Finishing Opus 17 Nov: less orange room, warm-red Claude, cool lifted blacks, soft monitor shoulder.
GRADE=dict(bloom_thresh=.35,bloom_radius=6,bloom=.15,wb=(.95,1.0,1.08),sat_shadow=.80,sat_bright=1.06,knee=.72,contrast=.24,toe=(.010,.013,.018),split=.025,sharp=.45,vignette=.16,grain=.008)
def grade(a,frame,P=GRADE):
 h,w=a.shape[:2];L=_s2l(a)
 hi=np.clip(_y(L)-P['bloom_thresh'],0,None)[...,None]*L/np.maximum(_y(L)[...,None],1e-4)
 small=_q(hi,(w//4,h//4));r=P['bloom_radius']
 bl=_s2l(gaussian_filter(small,(r,r,0)))+.5*_s2l(gaussian_filter(small,(3*r,3*r,0)))
 L=L+P['bloom']*_s2l(_q(bl,(w,h)))
 L=L*np.array(P['wb'],np.float32)
 Y=_y(L)[...,None];L=Y+(L-Y)*(P['sat_shadow']+(P['sat_bright']-P['sat_shadow'])*np.clip(Y/.25,0,1))
 k=P['knee'];L=np.where(L>k,k+(1-k)*np.tanh((L-k)/(1-k)),L)
 s=np.clip(_l2s(L),0,1);s=s+P['contrast']*s*(1-s)*(s-.42)*2
 toe=np.array(P['toe'],np.float32);s=toe+(1-toe)*s
 ys=_y(s)[...,None];s=s+P['split']*(1-ys)**3*np.array([-.6,.15,.7],np.float32)+P['split']*.6*ys**3*np.array([.4,.1,-.5],np.float32)
 yl=_y(s);s=s+P['sharp']*(yl-gaussian_filter(yl,1.1))[...,None]
 y,x=np.ogrid[-1:1:h*1j,-1:1:w*1j];s=s*(1-P['vignette']*np.clip((x*x+y*y)/1.6,0,1))[...,None]
 g=np.random.default_rng(32+frame).normal(0,1,(h//2,w//2)).astype(np.float32);g=gaussian_filter(np.repeat(np.repeat(g,2,0),2,1),.6)
 s=s+P['grain']*g[...,None]*(.6+.4*np.sqrt(np.clip(1-_y(s),0,1)))[...,None]
 return np.clip(s,0,1)
if '--sequence' in sys.argv:
 # Fog Glow is already baked by the unchanged Blender compositor; the grade adds only a soft wide bloom.
 timing=json.loads((OUT/'timing.json').read_text());dest=OUT/'finished';dest.mkdir(exist_ok=True)
 for frame in range(1,timing['frames']+1):
  im=Image.open(OUT/'raw'/f'{frame:04d}.png').convert('RGB');assert im.size==(1920,1080)
  s=grade(np.asarray(im,dtype=np.float32)/255,frame)
  Image.fromarray(np.uint8(s*255+.5)).save(dest/f'{frame:04d}.png')
 print('Finished',timing['frames'],'frames: Opus grade + bloom + sharpen + grain + vignette')
 sys.exit(0)
if '--sheet' in sys.argv:
 sheet=Image.new('RGB',(1920,4*580),'#111111');d=ImageDraw.Draw(sheet);font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
 for i,frame in enumerate([1,36,49,77]):
  y=i*580
  for j,(lab,src) in enumerate([('sebelum (v1)','finished-v1'),('sesudah (Opus)','finished')]):
   d.text((20+960*j,y+8),f'f{frame:02d} / {lab}',font=font,fill='white')
   sheet.paste(Image.open(OUT/src/f'{frame:04d}.png').convert('RGB').resize((960,540),Image.Resampling.LANCZOS),(960*j,y+40))
 sheet.save(QC/'b10a-render-sheet-opus.jpg',quality=94);print('sheet',QC/'b10a-render-sheet-opus.jpg')
 sys.exit(0)
rng=np.random.default_rng(32)
for label in ['awal','onset','akhir']:
 im=Image.open(OUT/f'b10a-{label}.png').convert('RGB');a=np.asarray(im,dtype=np.float32)/255
 h,w=a.shape[:2];y,x=np.ogrid[-1:1:h*1j,-1:1:w*1j];v=1-.105*np.clip((x*x+y*y)/1.6,0,1);a*=v[:,:,None];a+=rng.normal(0,.0016,(h,w,1));im=Image.fromarray(np.uint8(np.clip(a,0,1)*255));im.save(OUT/f'b10a-{label}-finished.png');im.resize((960,540),Image.Resampling.LANCZOS).save(QC/f'b10a-{label}.jpg',quality=95,subsampling=0)
refs=['ref39.jpg','ref27.jpg','ref14.jpg'];sheet=Image.new('RGB',(1920,3*580),'#111111');d=ImageDraw.Draw(sheet);font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
for i,(label,ref) in enumerate(zip(['awal','onset','akhir'],refs)):
 y=i*580;d.text((20,y+8),f'B10a / {label}',font=font,fill='white');d.text((980,y+8),f'Acuan gaya / {ref[3:5]}s',font=font,fill='white')
 sheet.paste(Image.open(QC/f'b10a-{label}.jpg'),(0,y+40));sheet.paste(Image.open(OUT/'reference'/ref).resize((960,540),Image.Resampling.LANCZOS),(960,y+40))
sheet.save(QC/'b10a-sanding.jpg',quality=94)
print('Review JPGs + native 1920x1080 finished PNGs written')

timing=json.loads((OUT/'timing.json').read_text());scene=json.loads((OUT/'scene-check.json').read_text())
assert scene['checks_passed'] and scene['round']==2
for name,expected in [('words.json',timing['words_sha256']),('suara.wav',timing['audio_sha256'])]:
 assert hashlib.sha256((ROOT/'edit'/name).read_bytes()).hexdigest()==expected,name
proof={}
for label in ['awal','onset','akhir']:
 native=OUT/f'b10a-{label}-finished.png';review=QC/f'b10a-{label}.jpg'
 assert Image.open(native).size==(1920,1080)
 assert Image.open(review).size==(960,540)
 assert native.read_bytes()!=(OUT/'round1'/native.name).read_bytes(),label
 proof[label]=dict(native=str(native),review=str(review),sha256=hashlib.sha256(native.read_bytes()).hexdigest(),changed_from_round1=True)
assert Image.open(QC/'b10a-sanding.jpg').size==(1920,1740)
ocr_path=OUT/'round2-onset-ocr.json'
ocr=json.loads(ocr_path.read_text()) if ocr_path.exists() else None
if ocr and ocr.get('source_sha256')!=hashlib.sha256((OUT/'b10a-onset.png').read_bytes()).hexdigest():ocr=None
result=dict(onset_ocr=ocr,round=2,source_hashes_match=True,dimensions_verified=proof,render_times=json.loads((OUT/'render-times.json').read_text()),sanding=str(QC/'b10a-sanding.jpg'),scene_check=str(OUT/'scene-check.json'),full_shot_rendered=False)
(OUT/'final-check.json').write_text(json.dumps(result,indent=2))
print('Ronde 2 dimensions, source hashes, changed stills and geometry checks PASS')
