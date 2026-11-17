"""Opus finishing sheets: storyboard-opus.jpg (2 columns) and sanding-opus.jpg (kita | r1 | kiblat)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

project = Path(__file__).resolve().parents[3]
repo = project.parents[1]
henti = project / 'handoff/henti1'
out = henti / 'opus'
keys = repo / 'claude/motion-graphic/guide/referensi/sheets/keyframes'
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 13)
PANELS = ['B1b', 'B2', 'B3-A1', 'B3-A2', 'B3-C1', 'B3-C2', 'B3-C3', 'B4', 'B5', 'B6']

# r1 stills only survive inside handoff/henti1/sanding.jpg (left column); rebuild its row geometry.
R1_ROWS = [('B1b', '83-k1.jpg'), ('B2', '83-k3.jpg'), ('B3-A', '83-k2.jpg'), ('B3-C', '07-k5-ui-dashboard.jpg'),
           ('B4', '83-k4.jpg'), ('B5', '07-k6-chat-maskot.jpg'), ('B6', '83-k3.jpg')]
r1_sheet = Image.open(henti / 'sanding.jpg').convert('RGB')
r1, y = {}, 0
for name, ref in R1_ROWS:
    rw, rh = Image.open(keys / ref).size
    h = int(960 / (16 / 9 + rw / rh))
    r1[name] = r1_sheet.crop((0, y + 32, round(16 / 9 * h), y + 32 + h))
    y += h + 32
assert y == r1_sheet.height, (y, r1_sheet.height)

# Storyboard grid.
lh = 24
rows = (len(PANELS) + 1) // 2
sheet = Image.new('RGB', (960, rows * (270 + lh)), '#181B20')
d = ImageDraw.Draw(sheet)
for i, p in enumerate(PANELS):
    im = Image.open(out / f'papan-{p}.jpg').convert('RGB')
    assert im.size == (960, 540), (p, im.size)
    x, yy = (i % 2) * 480, (i // 2) * (270 + lh)
    d.text((x + 10, yy + 5), p, font=font, fill='#E1E5ED')
    sheet.paste(im.resize((480, 270), Image.Resampling.LANCZOS), (x, yy + lh))
sheet.save(out / 'storyboard-opus.jpg', quality=93, subsampling=0)

# Sanding: kita | r1 (approved base) | kiblat keyframe.
PAIRS = [('B1b', 'B1b', '83-k1.jpg'), ('B2', 'B2', '83-k3.jpg'), ('B3-A1', 'B3-A', '83-k2.jpg'), ('B3-A2', 'B3-A', '28-k7-prompt-kursor.jpg'),
         ('B3-C1', 'B3-C', '28-k4-kartu-tile.jpg'), ('B3-C2', 'B3-C', '28-k3-tag-neon-kursor.jpg'), ('B3-C3', 'B3-C', '28-k1-grid-teks.jpg'),
         ('B4', 'B4', '83-k4.jpg'), ('B5', 'B5', '07-k6-chat-maskot.jpg'), ('B6', 'B6', '83-k3.jpg')]
cw, ch, lh = 320, 180, 22
sand = Image.new('RGB', (960, len(PAIRS) * (ch + lh)), '#181B20')
d = ImageDraw.Draw(sand)
for i, (p, base, ref) in enumerate(PAIRS):
    yy = i * (ch + lh)
    cells = [(Image.open(out / f'papan-{p}.jpg'), f'{p} · opus'), (r1[base], f'{base} · r1'), (Image.open(keys / ref), ref)]
    for j, (im, label) in enumerate(cells):
        im = im.convert('RGB').copy()
        im.thumbnail((cw, ch), Image.Resampling.LANCZOS)
        sand.paste(im, (j * cw + (cw - im.width) // 2, yy + lh + (ch - im.height) // 2))
        d.text((j * cw + 8, yy + 4), label, font=font, fill='#E1E5ED')
sand.save(out / 'sanding-opus.jpg', quality=93, subsampling=0)
print(f'storyboard-opus {sheet.size}, sanding-opus {sand.size}')

# Lembar karakter 2D vs acuan ClaudeAnimationBase (MIT, (c) 2026 John Heibel).
clawd = repo / 'claude/motion-graphic/pustaka/teknik/animasi-karakter-clawd/docs'
raw = out / 'karakter2d-raw.jpg'
if raw.exists():
    parts = [(Image.open(raw), 'Karakter2D (kita): Clawd · Codex · Gemini — 5 sudut kunci + 4 emosi'),
             (Image.open(clawd / 'views.jpg'), 'acuan: ClaudeAnimationBase docs/views.jpg'),
             (Image.open(clawd / 'emotions.jpg'), 'acuan: ClaudeAnimationBase docs/emotions.jpg')]
    ims = [(im.convert('RGB').resize((960, round(im.height * 960 / im.width)), Image.Resampling.LANCZOS), t) for im, t in parts]
    k = Image.new('RGB', (960, sum(im.height + 24 for im, _ in ims)), '#181B20')
    d = ImageDraw.Draw(k); yy = 0
    for im, t in ims:
        d.text((10, yy + 5), t, font=font, fill='#E1E5ED'); k.paste(im, (0, yy + 24)); yy += im.height + 24
    k.save(out / 'karakter2d-sheet.jpg', quality=93, subsampling=0)
    raw.unlink()
    print('karakter2d-sheet', k.size)
