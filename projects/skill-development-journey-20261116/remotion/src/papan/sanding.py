"""Pair the seven Remotion stills with unaltered reference keyframes."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageFont

project = Path(__file__).resolve().parents[3]
repo = project.parents[1]
out = project / 'handoff/henti1'
refs = repo / 'claude/motion-graphic/guide/referensi/sheets/keyframes'
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
pairs = [
    ('B1b', '83-k1.jpg', 'cincin + matte'),
    ('B2', '83-k3.jpg', 'slab di belakang kepala'),
    ('B3-A', '83-k2.jpg', 'tangga tag + bevel'),
    ('B3-C', '07-k5-ui-dashboard.jpg', 'jendela + lima ubin'),
    ('B4', '83-k4.jpg', 'slab putih + kartu paket'),
    ('B5', '07-k6-chat-maskot.jpg', 'jendela + tokoh + loop'),
    ('B6', '83-k3.jpg', 'slab penutup + tag'),
]

def pair(still, reference, label):
    left = Image.open(out / f'papan-{still}.jpg').convert('RGB')
    right = Image.open(refs / reference).convert('RGB')
    assert left.size == (960,540), (still,left.size)
    h = int(960 / (left.width/left.height + right.width/right.height))
    left = left.resize((round(left.width/left.height*h),h),Image.Resampling.LANCZOS)
    right = right.resize((round(right.width/right.height*h),h),Image.Resampling.LANCZOS)
    right_x = left.width
    row = Image.new('RGB',(960,h+32),'#181B20')
    row.paste(left,(0,32))
    row.paste(right,(right_x,32))
    d = ImageDraw.Draw(row)
    d.text((10,7),f'{still} · {label}',font=font,fill='#F6F5F0')
    d.text((right_x+11,7),reference,font=font,fill='#F6F5F0')
    return row

rows = [pair(*p) for p in pairs]
sheet = Image.new('RGB',(960,sum(r.height for r in rows)),'#181B20')
y = 0
for row in rows:
    sheet.paste(row,(0,y));y += row.height
sheet.save(out / 'sanding.jpg',quality=95,subsampling=0)
pair('B5','37-k7-panggung-ikon-alur.jpg','pembanding tambahan tokoh').save(out / 'sanding-B5-tokoh.jpg',quality=95)

# Lower-case suffixes were intermediate renders made by this task.
for filename in ['papan-B3-a.jpg','papan-B3-c.jpg']:
    old = out / filename
    if old.exists(): old.unlink()

records = []
for still, reference, _ in pairs:
    file = out / f'papan-{still}.jpg'
    records.append({'still':still,'file':file.name,'size':list(Image.open(file).size),'reference':str((refs/reference).relative_to(repo)),
                    'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
assert len(list(out.glob('papan-B*.jpg'))) == 7
assert Image.open(out/'sanding.jpg').width == 960
(out/'checks.json').write_text(json.dumps({'kind':'mechanical checks only; visual verdict reserved for Sutradara','stills':records,
    'sanding_size':list(Image.open(out/'sanding.jpg').size),'reference_aspect_ratio':'preserved; equal image height per pair; no stretching or cropping'},indent=2))
print('7 JPEGs 960x540; sanding width 960; aspect ratios preserved.')
