"""Papan gerak adegan app Claude (D-479): 8 keadaan berurutan, tiap keadaan terikat ke kata VO (edit/words.json)."""
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont
F = 'remotion/public/fonts'
def f(w, s): return ImageFont.truetype(f'{F}/sfpro-display-{w}.otf', s)
BG = Image.open('remotion/public/img/latar-padang.png').convert('RGB').resize((1920, 1080), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3))
TINTA, REDUP, ORANYE, PUTIH = (31, 30, 29), (110, 104, 98), (217, 119, 87), (250, 248, 240)

def frame(st):
    can = BG.convert('RGBA'); d = ImageDraw.Draw(can); CEK = []
    def kaca(box, r, isi=(255, 255, 255, 160), gelap=False):
        box = tuple(int(v) for v in box)
        blur = BG.crop(box).filter(ImageFilter.GaussianBlur(22)).convert('RGBA')
        blur = Image.alpha_composite(blur, Image.new('RGBA', blur.size, (40, 30, 40, 175) if gelap else isi))
        m = Image.new('L', blur.size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, blur.size[0] - 1, blur.size[1] - 1], r, fill=255)
        sh = Image.new('RGBA', can.size, (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle([box[0], box[1] + 14, box[2], box[3] + 14], r, fill=(30, 20, 30, 70))
        can.alpha_composite(sh.filter(ImageFilter.GaussianBlur(18))); can.paste(blur, box[:2], m)
        ImageDraw.Draw(can).rounded_rectangle(box, r, outline=(255, 255, 255, 120), width=2)
    def teks(wadah, xy, tx, fnt, warna, pad=20):
        d.text(xy, tx, font=fnt, fill=warna + (255,)); CEK.append((tx, wadah, d.textbbox(xy, tx, font=fnt), pad))
    def L(tx, fnt): return int(d.textlength(tx, font=fnt))
    def bintang(x, y, r=20):
        for k in range(12):
            a = k * math.pi / 6; d.line([(x, y), (x + r * math.cos(a), y + r * math.sin(a))], fill=ORANYE + (255,), width=6)

    X0, X1 = 460, 1460
    # salam beranda claude.ai (hilang setelah pesan pertama terkirim)
    if not st.get('terkirim'):
        g = 'Selamat sore, Irfan'; fg = f('bold', 64); gx = 960 - (L(g, fg) + 70) // 2
        bintang(gx + 26, 230); d.text((gx + 70, 190), g, font=fg, fill=PUTIH + (255,), stroke_width=0)
    # percakapan setelah kirim
    if st.get('terkirim'):
        T = 'Ini footage-ku. Kamu tonton dulu, lalu kamu yang tentukan gayanya.'; ft = f('medium', 32)
        w = L(T, ft) + 80; B = (X1 - w, 170, X1, 258); kaca(B, 28, gelap=True); teks(B, (B[0] + 40, 196), T, ft, PUTIH)
        if st.get('balas'):
            R = st['balas']; B = (X0, 300, X0 + 100 + L(R, ft) + 40, 388); kaca(B, 28); bintang(X0 + 48, 344, 16); teks(B, (X0 + 90, 326), R, ft, TINTA)
    # kolom input claude.ai
    yi = 600
    B = (X0, yi, X1, yi + 150); kaca(B, 34, isi=(255, 255, 255, 190) if st.get('fokus') else (255, 255, 255, 150))
    isi = st.get('ketik', ''); fi = f('medium', 38)
    if st.get('chip'):
        c = st['chip']; fc = f('bold', 32); cw = L(c, fc) + 44; C = (X0 + 40, yi + 24, X0 + 40 + cw, yi + 76)
        d.rounded_rectangle(C, 14, fill=(232, 228, 220, 255)); teks(C, (C[0] + 22, C[1] + 9), c, fc, TINTA, pad=10)
    elif isi:
        teks(B, (X0 + 44, yi + 30), isi, fi, TINTA)
    else:
        d.text((X0 + 44, yi + 30), 'Ada yang bisa dibantu?', font=fi, fill=REDUP + (255,))
    if st.get('fokus'):
        cx = X0 + 44 + (L(isi, fi) if isi and not st.get('chip') else 0) + (L(st['chip'], f('bold', 32)) + 54 if st.get('chip') else 0)
        d.line([(cx + 4, yi + 32), (cx + 4, yi + 76)], fill=TINTA + (255,), width=3)
    d.text((X0 + 44, yi + 98), '+', font=f('medium', 36), fill=REDUP + (255,))
    mt = 'Opus 5.5  ·  High'; d.text((X1 - 110 - L(mt, f('medium', 26)), yi + 104), mt, font=f('medium', 26), fill=REDUP + (255,))
    d.rounded_rectangle([X1 - 76, yi + 92, X1 - 26, yi + 142], 14, fill=ORANYE + (255,) if (isi or st.get('chip')) else (220, 200, 190, 255))
    d.text((X1 - 62, yi + 95), '↑', font=f('bold', 36), fill=(255, 255, 255, 255))
    # menu slash: muncul HANYA karena "/" diketik (menjawab logika "template")
    if st.get('menu') is not None:
        items = [('/apple-style', 'Gaya Apple, minimal'), ('/cinematic-storytelling', 'Gaya sinematik'), ('/viral-hook', 'Hook viral 3 detik')]
        fm, fs = f('bold', 30), f('medium', 24); w = max(L(a, fm) + L(b, fs) for a, b in items) + 110
        M = (X0, yi - 20 - 3 * 64 - 20, X0 + w, yi - 20); kaca(M, 22, isi=(255, 255, 255, 205))
        d.text((M[0] + 24, M[1] - 40), 'Template', font=f('bold', 26), fill=PUTIH + (255,))
        for i, (a, b) in enumerate(items):
            y = M[1] + 20 + i * 64
            if st['menu'] == i: d.rounded_rectangle([M[0] + 10, y - 8, M[2] - 10, y + 50], 14, fill=(255, 255, 255, 230))
            teks(M, (M[0] + 26, y), a, fm, TINTA, pad=14); d.text((M[0] + 46 + L(a, fm), y + 6), b, font=fs, fill=REDUP + (255,))
    if st.get('kursor'):
        x, y = st['kursor']; d.polygon([(x, y), (x, y + 40), (x + 11, y + 30), (x + 19, y + 46), (x + 26, y + 42), (x + 18, y + 27), (x + 31, y + 27)], fill=(255, 255, 255, 255), outline=(0, 0, 0, 255))
    salah = [t for t, w, b, p in CEK if b[0] < w[0] + p * 0.5 or b[2] > w[2] - p * 0.5]
    if salah: raise SystemExit(f'GAGAL teks keluar wadah: {salah}')
    return can.convert('RGB')

ALUR = [
    ('23,70 "Dan ini bukan sebuah template"', 'Beranda claude.ai kosong di atas padang; kamera dorong pelan.', {}),
    ('25,63 "Jadi kalau orang-orang"', 'Kursor masuk dan klik kolom input.', {'fokus': 1, 'kursor': (900, 540)}),
    ('27,96 "bilang edit kayak"', 'Ketik "/" → menu Template terbuka (template HANYA muncul karena "/").', {'fokus': 1, 'ketik': '/', 'menu': -1}),
    ('28,93 "Apple\'s Tale"', 'Sorot /apple-style → dipilih → jadi chip di kolom.', {'fokus': 1, 'chip': '/apple-style'}),
    ('30,55 "Cinematic Storytelling"', 'Chip diganti: menu terbuka lagi, /cinematic-storytelling dipilih.', {'fokus': 1, 'ketik': '/', 'menu': 1}),
    ('32,19 "Nah, aku ngebalik."', 'Chip dihapus (backspace), menu tutup; Irfan mengetik cerita, bukan template.', {'fokus': 1, 'ketik': 'Ini footage-ku. Kamu tonton dulu…'}),
    ('33,26 "Progress di baliknya"', 'Kirim: pesan naik jadi gelembung, salam hilang.', {'terkirim': 1}),
    ('33,9 "di baliknya" → 34,4 keluar', 'Claude membalas: ia yang memilih gaya dari cerita; lalu transisi ke wajah.', {'terkirim': 1, 'balas': 'Oke. Aku tonton dulu, lalu aku pilih gaya yang cocok.'}),
]
ims = []
for i, (w, k, st) in enumerate(ALUR):
    im = frame(st); dd = ImageDraw.Draw(im)
    dd.rectangle([0, 0, 1920, 110], fill=(0, 0, 0)); dd.text((24, 12), f'{i + 1} · {w}', font=f('bold', 40), fill=(255, 220, 0)); dd.text((24, 62), k, font=f('medium', 32), fill=(255, 255, 255))
    ims.append(im.resize((960, 540)))
sh = Image.new('RGB', (1920, 540 * 4), (20, 20, 20))
for i, im in enumerate(ims): sh.paste(im, ((i % 2) * 960, (i // 2) * 540))
sh.save('qc/r7/penilai/spine/papan_gerak_UI_claude.jpg', quality=88); print('ok')
