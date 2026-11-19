"""Mockup still adegan app Claude (D-479): latar padang + UI chat claude.ai bergaya kaca mengambang, tanpa narasi."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
F = 'remotion/public/fonts'
def f(w, s): return ImageFont.truetype(f'{F}/sfpro-display-{w}.otf', s)
bg = Image.open('remotion/public/img/latar-padang.png').convert('RGB').resize((1920, 1076), Image.LANCZOS)
bg = bg.crop((0, 0, 1920, 1076)).resize((1920, 1080)).filter(ImageFilter.GaussianBlur(3))
can = bg.convert('RGBA')

def kaca(box, r, isi=(255, 255, 255, 150), gelap=False):
    x0, y0, x1, y1 = box
    blur = bg.crop(box).filter(ImageFilter.GaussianBlur(22)).convert('RGBA')
    tint = Image.new('RGBA', blur.size, (40, 30, 40, 175) if gelap else isi)
    blur = Image.alpha_composite(blur, tint)
    m = Image.new('L', blur.size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, blur.size[0] - 1, blur.size[1] - 1], r, fill=255)
    sh = Image.new('RGBA', can.size, (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle([x0, y0 + 14, x1, y1 + 14], r, fill=(30, 20, 30, 70))
    can.alpha_composite(sh.filter(ImageFilter.GaussianBlur(18)))
    can.paste(blur, (x0, y0), m)
    ImageDraw.Draw(can).rounded_rectangle(box, r, outline=(255, 255, 255, 120), width=2)

d = ImageDraw.Draw(can)
TINTA, REDUP, ORANYE = (31, 30, 29), (110, 104, 98), (217, 119, 87)
# gelembung Claude (kiri) dan pengguna (kanan, gelap) seperti claude.ai + ref kaca
kaca((520, 210, 1170, 330), 30)
import math
for k in range(12):   # bintang Claude (komponen asli LogoClaude dipakai di build)
    a = k * math.pi / 6; d.line([(586, 270), (586 + 20 * math.cos(a), 270 + 20 * math.sin(a))], fill=ORANYE + (255,), width=6)
d.text((620, 240), 'Halo, Irfan. Mau edit video apa hari ini?', font=f('medium', 34), fill=TINTA + (255,))
kaca((880, 370, 1400, 460), 30, gelap=True)
d.text((920, 396), 'Revisi video siirfan, ronde 3', font=f('medium', 34), fill=(250, 248, 240, 255))
# kolom input claude.ai asli, kaca, berisi slash command
kaca((520, 560, 1400, 720), 34, isi=(255, 255, 255, 185))
d.text((566, 590), '/apple-style', font=f('medium', 40), fill=TINTA + (255,))
d.line([(800, 592), (800, 636)], fill=TINTA + (255,), width=3)
d.text((566, 664), '+', font=f('medium', 38), fill=REDUP + (255,))
d.text((1090, 668), 'Opus 5.5  ·  High', font=f('medium', 26), fill=REDUP + (255,))
d.rounded_rectangle([1326, 652, 1376, 702], 14, fill=ORANYE + (255,)); d.text((1340, 655), '↑', font=f('bold', 36), fill=(255, 255, 255, 255))
# popover slash command di atas input
kaca((520, 488, 960, 548), 18, isi=(255, 255, 255, 200))
d.text((546, 500), '/apple-style', font=f('bold', 30), fill=TINTA + (255,)); d.text((740, 504), 'gaya Apple', font=f('medium', 24), fill=REDUP + (255,))
# chip saran di bawah input (seperti ref)
x = 520
for c in ['/cinematic-storytelling', '/viral-hook', '/apple-style']:
    w = int(d.textlength(c, font=f('medium', 26))) + 44
    kaca((x, 744, x + w, 796), 26, isi=(255, 255, 255, 160)); d.text((x + 22, 754), c, font=f('medium', 26), fill=TINTA + (255,)); x += w + 16
im = can.convert('RGB'); dd = ImageDraw.Draw(im)
dd.rectangle([0, 0, 1920, 56], fill=(0, 0, 0)); dd.text((18, 12), '2 · ADEGAN APP CLAUDE (D-479) · latar padang + UI claude.ai kaca mengambang, tanpa narasi · momen "/apple-style"', font=f('bold', 28), fill=(255, 220, 0))
im.save('qc/r7/penilai/spine/still/2_UI_claude_kaca.jpg', quality=92)
