"""Three R2 comparisons; original aspect ratios are preserved inside each cell."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageFont

project = Path(__file__).resolve().parents[3]
repo = project.parents[1]
out = project / 'handoff/henti1'
refs = project / 'sumber/ref'
keyframes = repo / 'claude/motion-graphic/guide/referensi/sheets/keyframes'
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 14)
small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 12)


def contain(image, width, height):
    result = image.copy().convert('RGB')
    result.thumbnail((width, height), Image.Resampling.LANCZOS)
    return result


def row(panel, reference_images, title, labels):
    canvas = Image.new('RGB', (960, 322), '#181B20')
    draw = ImageDraw.Draw(canvas)
    draw.text((12, 8), f'{panel} · kita', font=font, fill='white')
    draw.text((490, 8), title, font=font, fill='white')
    left = Image.open(out / f'papan-{panel}.jpg')
    assert left.size == (960, 540)
    canvas.paste(left.resize((480, 270), Image.Resampling.LANCZOS), (0, 32))
    cell_width = 480 // len(reference_images)
    for i, (reference, label) in enumerate(zip(reference_images, labels)):
        right = contain(reference, cell_width - 12, 270)
        x = 480 + i * cell_width + (cell_width - right.width) // 2
        y = 32 + (270 - right.height) // 2
        canvas.paste(right, (x, y))
        draw.text((486 + i * cell_width, 305), label, font=small, fill='#D5DCE9')
    return canvas


effort_sheet = Image.open(refs / 'ref-woinlesss-spin-sheet.jpg')
# Max with the pixel trail: second row, second column of the supplied sheet.
effort_crop = (404, 213, 558, 308)
effort_detail = effort_sheet.crop(effort_crop)
effort_detail = effort_detail.resize((616, 380), Image.Resampling.LANCZOS)
rows = [
    row('B5', [Image.open(refs / 'chat-ui-putih-fun.png'), Image.open(refs / 'chat-ui-langit.png')],
        'Acuan chat putih fun + langit', ['chat-ui-putih-fun.png', 'chat-ui-langit.png']),
    row('B3-C', [Image.open(keyframes / '07-k5-ui-dashboard.jpg')],
        'Acuan 07 · dashboard', ['07-k5-ui-dashboard.jpg']),
    row('B4-effort', [effort_detail], 'Acuan Effort · Max + jejak pixel',
        ['ref-woinlesss-spin-sheet.jpg · detail baris 2, kolom 2']),
]
sheet = Image.new('RGB', (960, sum(r.height for r in rows)), '#181B20')
for i, image in enumerate(rows):
    sheet.paste(image, (0, i * image.height))
sheet.save(out / 'sanding-r2.jpg', quality=95, subsampling=0)

files = ['papan-B5.jpg', 'papan-B3-C.jpg', 'papan-B4-effort.jpg', 'papan-B5-typing.jpg', 'sanding-r2.jpg']
records = [{'file': name, 'size': list(Image.open(out / name).size),
            'sha256': hashlib.sha256((out / name).read_bytes()).hexdigest()} for name in files]
assert all(r['size'] == [960, 540] for r in records[:-1])
assert records[-1]['size'] == [960, 966]
(out / 'checks-images-r2.json').write_text(json.dumps({
    'kind': 'mechanical checks; G2 visual verdict belongs to Sutradara',
    'files': records, 'comparison_rows': 3, 'layout': 'kita kiri, acuan kanan',
    'reference_aspect_ratios': 'preserved',
    'effort_reference': {'source': str(refs / 'ref-woinlesss-spin-sheet.jpg'), 'crop_xyxy': effort_crop},
}, indent=2))
print('PASS: 4 still JPEG 960×540; sanding-r2 960×966, 3 baris, kita kiri/acuan kanan.')
