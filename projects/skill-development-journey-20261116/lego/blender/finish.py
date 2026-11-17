"""Review deliverables from three rendered frames; no sequence rendering."""
from pathlib import Path
import hashlib, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[2];OUT=Path('/mnt/storage-projects/skill-dev-journey/b10a');QC=ROOT/'qc/still/revisi1';QC.mkdir(parents=True,exist_ok=True)
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
