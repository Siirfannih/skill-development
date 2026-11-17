"""Eight current panels, in narrative order, without reference columns."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageFont

out = Path(__file__).resolve().parents[3] / 'handoff/henti1'
panels = ['B1b', 'B2', 'B3-A', 'B3-C', 'B4', 'B4-effort', 'B5', 'B6']
label_height = 24
sheet = Image.new('RGB', (960, 4 * (270 + label_height)), '#181B20')
draw = ImageDraw.Draw(sheet)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 12)
records = []
for index, panel in enumerate(panels):
    source = out / f'papan-{panel}.jpg'
    with Image.open(source) as image:
        assert image.size == (960, 540), (panel, image.size)
        x, y = (index % 2) * 480, (index // 2) * (270 + label_height)
        draw.text((x + 10, y + 5), panel, font=font, fill='#E1E5ED')
        sheet.paste(image.resize((480, 270), Image.Resampling.LANCZOS), (x, y + label_height))
    records.append({'panel': panel, 'source': source.name,
                    'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'xy': [x, y]})
sheet.save(out / 'storyboard-final.jpg', quality=95, subsampling=0)
(out / 'storyboard-final.json').write_text(json.dumps({
    'size': list(sheet.size), 'columns': 2, 'panels': records,
    'reference_columns': 0, 'label_height': label_height,
}, indent=2))
print(f'PASS: storyboard-final.jpg {sheet.width}×{sheet.height}; 8 panels, 2 columns.')
