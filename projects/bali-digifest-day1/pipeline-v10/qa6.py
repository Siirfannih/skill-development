"""QA teks v6: satu frame di tengah tiap frasa dan tiap kata kunci dari render final -> qa6.jpg (label: waktu + isi)."""
import json, subprocess, os
from PIL import Image, ImageDraw, ImageFont
vid = 'out/BDF26_Day1_ContentCreator_v8' + os.environ.get('VARIANT', 'A') + '.mp4'; os.makedirs('qa6', exist_ok=True)
ph = json.load(open('remotion/src/phrases6.json')); big = json.load(open('remotion/src/kt6.json'))['big']
items = [(c['start'] + min(0.5, (c['end'] - c['start']) * 0.6), ' / '.join(' '.join(w['w'] for w in l) for l in c['lines'])) for c in ph]
items += [(d['start'] + min(0.35, (d['end'] - d['start']) * 0.6), '[BESAR] ' + d['text']) for d in big]
items.sort()
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15); ims = []
for i, (t, txt) in enumerate(items):
    o = f'qa6/{i:02d}.jpg'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.2f}', '-i', vid, '-frames:v', '1', '-vf', 'scale=400:225', o], check=True)
    im = Image.open(o).convert('RGB'); d = ImageDraw.Draw(im); d.rectangle([0, 205, 400, 225], fill=(0, 0, 0))
    d.text((3, 207), f"{t:.1f}s {txt[:40]}", fill='yellow', font=font); ims.append(im)
cols = 6; rows = (len(ims) + cols - 1) // cols
S = Image.new('RGB', (400 * cols, 225 * rows))
for i, im in enumerate(ims): S.paste(im, ((i % cols) * 400, (i // cols) * 225))
S.save('qa6.jpg', quality=72); print(len(items), S.size)
