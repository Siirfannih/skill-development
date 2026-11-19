"""Lembar spine gaya (brief r2 §4.4): satu still per peran teks di atas footage asli, berdampingan dengan jangkar FINALLY.
Jalankan dari folder proyek: ~/work/mg-venv/bin/python qc/r7/penilai/spine/spine.py"""
import os, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops
D = 'qc/r7/penilai/spine'; F = f'{D}/font'
os.makedirs(f'{D}/still', exist_ok=True)
PUTIH, HITAM, CHART, BIRU = (250, 248, 236), (8, 6, 8), (200, 230, 74), (46, 91, 255)
tmp = tempfile.mkdtemp()

def frame(src, t, gray=False):
    p = os.path.join(tmp, f'{abs(hash((src, t)))}.png')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.3f}', '-i', src, '-frames:v', '1', p], check=True)
    im = Image.open(p); return im.convert('L') if gray else im.convert('RGB')

def font(n, s): return ImageFont.truetype(f'{F}/{n}.ttf', s)

def teks(base, xy, s, f, fill, bayang=True, anchor='la', spasi=0):
    lay = Image.new('RGBA', base.size, (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    d.text(xy, s, font=f, fill=fill + (255,), anchor=anchor)
    if bayang:   # bayangan lembut seperti FINALLY (bukan kotak)
        a = lay.split()[3]
        sh = Image.new('RGBA', base.size, (0, 0, 0, 0)); sh.putalpha(a.filter(ImageFilter.GaussianBlur(10)).point(lambda v: v * 0.55))
        sh = ImageChops.offset(sh, 0, 4); base.alpha_composite(sh)
    base.alpha_composite(lay)

def potong_orang(face, matte, bg, turun=0):
    """Irfan di depan latar `bg` memakai matte (oklusi); `turun` menggeser orang ke bawah (punchline di kanvas warna)."""
    m = matte.filter(ImageFilter.GaussianBlur(1.2))
    out = bg.copy(); out.paste(face, (0, turun), m); return out

def simpan(im, nama, label):
    im = im.convert('RGB'); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 1920, 56], fill=(0, 0, 0)); d.text((18, 10), label, font=font('Poppins600', 30), fill=(255, 220, 0))
    im.save(f'{D}/still/{nama}.jpg', quality=92)

W = 'edit/wajah.mp4'; M = 'qc/matte/wajah-matte.mkv'; R7 = 'qc/r7/penilai/bahan/varian-A_r7_lama.mp4'; R4 = 'out/varian-A_r4-final-1.mp4'

# 0 · jangkar
simpan(frame(R7, 1.0).convert('RGBA'), '0_jangkar_FINALLY', '0 · JANGKAR (benar): R6 slab FINALLY · Anton putih hangat di belakang kepala, bayangan lembut')

# 1 · R1 narasi di wajah: tanpa wadah, bertumpuk satu titik di dinding kosong samping kepala
b = frame(W, 5.6).convert('RGBA')
teks(b, (1230, 300), 'baru aja', font('Poppins700', 96), PUTIH)
teks(b, (1230, 400), 'ngebikin', font('Poppins700', 96), PUTIH)
simpan(b, '1_R1_narasi_wajah', '1 · R1 NARASI (wajah) · Poppins 700 putih hangat, tanpa wadah, satu titik di dinding kosong, bertumpuk per frasa')

# 2 · R1 narasi di adegan UI: di kanvas luar jendela, huruf sama, warna tinta karena kanvas terang (seperti R4)
b = frame(R4, 24.75)
# hapus narasi R4 lama di kanvas krem bawah: piksel gelap di bawah jendela diganti warna krem tetangganya
px = b.load(); W_, H_ = b.size
for y in range(885, H_):
    for x in range(0, 1440):
        px[x, y] = px[x, 880]
b = b.convert('RGBA')
teks(b, (1515, 330), 'sebuah', font('Poppins700', 70), HITAM, bayang=False)
teks(b, (1515, 410), 'template.', font('Poppins800', 76), HITAM, bayang=False)
simpan(b, '2_R1_narasi_UI', '2 · R1 NARASI (UI) · BARU: perlakuan narasi wajah, ditumpuk satu titik di ruang krem samping jendela, tinta gelap; kolom prompt hanya prompt asli')

# 3 · R1 narasi di meja 3D: datar di layar, perlakuan sama, di dinding gelap kosong (bukan miring melayang)
b = frame('/mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov', 3.1).convert('RGBA')
teks(b, (130, 300), 'menurut', font('Poppins700', 92), PUTIH)
teks(b, (130, 400), 'kalian', font('Poppins700', 92), PUTIH)
simpan(b, '3_R1_narasi_meja', '3 · R1 NARASI (meja 3D, opsi b) · datar, perlakuan sama, di dinding gelap kiri, tidak menimpa monitor')

# 4 · R6 slab + R4 label: satu slab utuh di belakang kepala seperti sebelumnya (D-477a), label rapat di atasnya
simpan(frame('qc/r7/visual_r7_fin_ekor.mp4', 37.75).convert('RGBA'), '4_R6_slab_R4_label', '4 · R6 SLAB + R4 LABEL · satu slab utuh di belakang kepala (seperti sebelumnya), label rapat di atas')

def kanvas(kata, warna, tinta, nama, label, ukuran=330):
    """Punchline fokus teks saja (D-477b, bentuk 'CONTENT'): kanvas satu warna, kata raksasa memenuhi lebar, garis titik tipis."""
    bg = Image.new('RGBA', (1920, 1080), warna + (255,)); d = ImageDraw.Draw(bg)
    f = font('Anton', ukuran)
    while d.textlength(kata, font=f) > 1800: ukuran -= 10; f = font('Anton', ukuran)
    for y in (300, 800):
        for x in range(30, 1900, 26): d.ellipse([x, y, x + 6, y + 6], fill=tinta + (255,))
    teks(bg, (960, 550), kata, f, tinta, bayang=False, anchor='mm')
    simpan(bg, nama, label)

# 5, 6 · R3 punchline: hanya teks
kanvas('PROFESIONAL', CHART, HITAM, '5_R3_punchline_PROFESIONAL', '5 · R3 PUNCHLINE · fokus teks saja: chartreuse penuh, kata raksasa memenuhi lebar, tanpa footage (satu beat)')
kanvas('SKILL GRATIS', BIRU, PUTIH, '6_R3_punchline_SKILL_GRATIS', '6 · R3 PUNCHLINE · fokus teks saja: biru penuh, "SKILL GRATIS" satu baris, tanpa footage')

# 7 · R1 cincin (ronde 4) apa adanya dari basis terbaru
simpan(frame('qc/r7/visual_r7_fin_ekor.mp4', 55.4).convert('RGBA'), '7_R1_cincin', '7 · R1 NARASI bentuk cincin (basis r4) · huruf & warna sama dengan R1, melingkar di belakang kepala')

ims = [Image.open(f'{D}/still/{n}').resize((960, 540)) for n in sorted(os.listdir(f'{D}/still'))]
sheet = Image.new('RGB', (1920, 540 * ((len(ims) + 1) // 2)), (20, 20, 20))
for i, im in enumerate(ims): sheet.paste(im, ((i % 2) * 960, (i // 2) * 540))
sheet.save(f'{D}/lembar_spine.jpg', quality=90); print('ok', len(ims))
