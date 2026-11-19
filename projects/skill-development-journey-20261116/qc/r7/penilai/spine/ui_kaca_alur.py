"""Papan gerak adegan app Claude (D-479): 8 keadaan berurutan, tiap keadaan terikat ke kata VO (edit/words.json)."""
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont
F = 'remotion/public/fonts'
def f(w, s): return ImageFont.truetype(f'{F}/sfpro-display-{w}.otf', s)
BG = Image.open('remotion/public/img/latar-padang.png').convert('RGB').resize((1920, 1080), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3))
TINTA, REDUP, ORANYE, PUTIH = (31, 30, 29), (110, 104, 98), (217, 119, 87), (250, 248, 240)

def frame(st):
    can = BG.convert('RGBA'); d = ImageDraw.Draw(can); CEK = []; OBJ = Image.new('L', (1920, 1080), 0); od = ImageDraw.Draw(OBJ)
    def kaca(box, r, isi=(255, 255, 255, 160), gelap=False):
        box = tuple(int(v) for v in box); od.rounded_rectangle([box[0] - 22, box[1] - 10, box[2] + 22, box[3] + 40], r + 20, fill=255)   # objek + bayangannya
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
    def mp4(x, y, prog=1.0):
        B = (x, y, x + 330, y + 76); d.rounded_rectangle(B, 16, fill=(255, 255, 255, 235), outline=(220, 214, 206, 255), width=2)
        d.rounded_rectangle([x + 12, y + 12, x + 64, y + 64], 10, fill=(40, 38, 36, 255)); d.polygon([(x + 32, y + 26), (x + 32, y + 50), (x + 52, y + 38)], fill=(255, 255, 255, 255))
        teks(B, (x + 78, y + 10), 'footage-irfan.mp4', f('bold', 24), TINTA, pad=10)
        d.text((x + 78, y + 42), 'Video · 1,2 GB' if prog >= 1 else f'Mengunggah {int(prog*100)}%', font=f('medium', 20), fill=REDUP + (255,))
        if prog < 1: d.rounded_rectangle([x + 78, y + 66, x + 78 + int(230 * prog), y + 70], 2, fill=ORANYE + (255,))
    # salam beranda claude.ai (hilang setelah pesan pertama terkirim)
    if not st.get('terkirim'):
        g = 'Selamat sore, Irfan'; fg = f('bold', 64); gx = 960 - (L(g, fg) + 70) // 2
        bintang(gx + 26, 230); d.text((gx + 70, 190), g, font=fg, fill=PUTIH + (255,), stroke_width=0); od.text((gx + 70, 190), g, font=fg, fill=255); od.ellipse([gx + 4, 208, gx + 48, 252], fill=255)
    # percakapan setelah kirim
    if st.get('terkirim'):
        T = st['terkirim']; ft = f('medium', 32)
        w = max(L(T, ft) + 80, 380); B = (X1 - w, 150, X1, 330); kaca(B, 28, gelap=True)
        mp4(B[0] + 30, 166); teks(B, (B[0] + 40, 268), T, ft, PUTIH)
        if st.get('balas'):
            R = st['balas']; B = (X0, 370, X0 + 100 + L(R, ft) + 40, 458); kaca(B, 28); bintang(X0 + 48, 414, 16); teks(B, (X0 + 90, 396), R, ft, TINTA)
    # kolom input claude.ai
    yi = 600
    B = (X0, yi, X1, yi + 150); kaca(B, 34, isi=(255, 255, 255, 190) if st.get('fokus') else (255, 255, 255, 150))
    isi = st.get('ketik', ''); fi = f('medium', 38)
    if st.get('lampir') is not None: mp4(X0 + 40, yi - 96, st['lampir'])
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
    if st.get('terkirim'):   # tombol "Chat baru" claude.ai (pemicu grid)
        NB = (1560, 70, 1800, 128); kaca(NB, 22, isi=(255, 255, 255, 190)); teks(NB, (1600, 82), '+  Chat baru', f('bold', 28), TINTA, pad=12)
    if st.get('gridchat') is not None:
        # D-482: grid HANYA pada bentuk objek (OBJ), tidak pada latar kosong. Fase<0.5 hapus kanan→kiri, >=0.5 muncul kiri→kanan.
        import random; random.seed(5); fase = st['gridchat']; S = 24
        M = OBJ.filter(ImageFilter.MaxFilter(3))
        X0g, X1g = 300, 1620
        tepi = X1g - (X1g - X0g) * (fase / 0.5) if fase < 0.5 else X0g + (X1g - X0g) * ((fase - 0.5) / 0.5)
        hapus = Image.new('L', (1920, 1080), 0); hd = ImageDraw.Draw(hapus)
        sel = Image.new('RGBA', (1920, 1080), (0, 0, 0, 0)); sd = ImageDraw.Draw(sel)
        src = can.copy()
        for gy in range(0, 1080, S):
            for gx in range(X0g - 100, X1g + 100, S):
                j = gx + random.uniform(-40, 40)
                if j > tepi: hd.rectangle([gx, gy, gx + S - 1, gy + S - 1], fill=255)
                if abs(j - tepi) < 36 and random.random() < 0.55:
                    r_, g_, b_, _ = src.getpixel((min(gx + S // 2, 1919), min(gy + S // 2, 1079)))
                    sd.rectangle([gx + 1, gy + 1, gx + S - 2, gy + S - 2], fill=(min(255, r_ + 18), min(255, g_ + 18), min(255, b_ + 18), 150))
        from PIL import ImageChops
        mh = ImageChops.multiply(hapus, M)
        can.paste(BG.convert('RGBA'), (0, 0), mh)
        a_ = ImageChops.multiply(sel.split()[3], M); sel.putalpha(a_); can.alpha_composite(sel)
    salah = [t for t, w, b, p in CEK if b[0] < w[0] + p * 0.5 or b[2] > w[2] - p * 0.5]
    if salah: raise SystemExit(f'GAGAL teks keluar wadah: {salah}')
    return can.convert('RGB')

ALUR = [
    ('23,70 "Dan ini bukan sebuah template"', 'Beranda claude.ai kosong di atas padang; kamera dorong pelan.', {}),
    ('25,63 "Jadi kalau orang-orang"', 'Unggah footage: kartu MP4 masuk ke kolom, progres unggah berjalan.', {'fokus': 1, 'lampir': 0.6}),
    ('27,96 "bilang edit kayak"', 'Ketik "Gunakan /" → menu Template terbuka.', {'fokus': 1, 'lampir': 1, 'ketik': 'Gunakan /', 'menu': 0}),
    ('28,93 "Apple\'s Tale"', '/apple-style dipilih: "Gunakan /apple-style untuk edit videoku." → kirim.', {'terkirim': 'Gunakan /apple-style untuk edit videoku.', 'balas': 'Siap, aku edit dengan gaya Apple.'}),
    ('30,17 "edit kayak" (a)', 'Grid hanya di area chat: sel kotak menghapus chat dari KANAN ke KIRI; latar & kamera tetap.', {'terkirim': 'Gunakan /apple-style untuk edit videoku.', 'balas': 'Siap, aku edit dengan gaya Apple.', 'gridchat': 0.25}),
    ('30,40 (b)', 'Undo: sel kotak memunculkan area chat lagi dari KIRI ke KANAN, kini beranda kosong siap diketik.', {'gridchat': 0.75}),
    ('30,55 "Cinematic Storytelling"', 'Beranda bersih lagi: MP4 dilampirkan, ketik "Gunakan /cinematic-storytelling …".', {'fokus': 1, 'lampir': 1, 'ketik': 'Gunakan /cinematic-storytelling untuk edit videoku.'}),
    ('31,83 "gitu."', 'Kirim → gelembung kedua (MP4 + perintah).', {'terkirim': 'Gunakan /cinematic-storytelling untuk edit videoku.', 'balas': 'Siap, aku edit dengan gaya sinematik.'}),
    ('32,19 "Nah, aku ngebalik." → 34,4', '(usul, belum kamu tentukan) lihat catatan di bawah.', {'fokus': 1, 'lampir': 1, 'ketik': 'Tonton videoku, lalu kamu yang tentukan gayanya.'}),
]
ims = []
for i, (w, k, st) in enumerate(ALUR):
    im = frame(st); dd = ImageDraw.Draw(im)
    dd.rectangle([0, 0, 1920, 110], fill=(0, 0, 0)); dd.text((24, 12), f'{i + 1} · {w}', font=f('bold', 40), fill=(255, 220, 0)); dd.text((24, 62), k, font=f('medium', 32), fill=(255, 255, 255))
    ims.append(im.resize((960, 540)))
sh = Image.new('RGB', (1920, 540 * ((len(ims) + 1) // 2)), (20, 20, 20))
for i, im in enumerate(ims): sh.paste(im, ((i % 2) * 960, (i // 2) * 540))
sh.save('qc/r7/penilai/spine/papan_gerak_UI_claude.jpg', quality=88); print('ok')
