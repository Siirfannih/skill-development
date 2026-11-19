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
simpan(frame(R4, 24.75).convert('RGBA'), '2_R1_narasi_UI', '2 · R1 NARASI (UI) · huruf & ukuran-logika sama, tinta gelap di kanvas krem LUAR jendela; kolom prompt hanya prompt asli')

# 3 · R1 narasi di meja 3D: datar di layar, perlakuan sama, di dinding gelap kosong (bukan miring melayang)
b = frame('/mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov', 3.1).convert('RGBA')
teks(b, (130, 300), 'menurut', font('Poppins700', 92), PUTIH)
teks(b, (130, 400), 'kalian', font('Poppins700', 92), PUTIH)
simpan(b, '3_R1_narasi_meja', '3 · R1 NARASI (meja 3D, opsi b) · datar, perlakuan sama, di dinding gelap kiri, tidak menimpa monitor')

# 4 · R6 slab + R4 label: slab terbelah mengapit kepala, label rapat di atas pada sumbu slab
t = 37.6; face = frame(W, t); mat = frame(M, t, gray=True)
bg = face.convert('RGBA'); f = font('Anton', 172)
teks(bg, (50, 262), 'WORKFLOW', f, PUTIH); teks(bg, (1185, 262), '-NYA', f, PUTIH)
teks(bg, (54, 218), 'cuma mempelajari', font('Poppins600', 46), PUTIH)
simpan(potong_orang(face, mat, bg.convert('RGB')).convert('RGBA'), '4_R6_slab_R4_label', '4 · R6 SLAB + R4 LABEL · kata mengapit kepala (yang tertutup bukan huruf penentu), label rapat di atas sumbu slab')

# 5 · R3 punchline PROFESIONAL: layar penuh chartreuse, kata raksasa hitam, Irfan di depan
t = 78.75; face = frame(W, t); mat = frame(M, t, gray=True)
bg = Image.new('RGBA', (1920, 1080), CHART + (255,))
teks(bg, (960, 70), 'PROFESIONAL', font('Anton', 290), HITAM, bayang=False, anchor='ma')
simpan(potong_orang(face, mat, bg.convert('RGB'), turun=300).convert('RGBA'), '5_R3_punchline_PROFESIONAL', '5 · R3 PUNCHLINE · layar penuh satu warna (tanpa UI IG), kata raksasa, Irfan di depan')

# 6 · R3 punchline SKILL GRATIS: satu kelompok, SKILL rapat di atas GRATIS pada sumbu sama
t = 82.75; face = frame(W, t); mat = frame(M, t, gray=True)
bg = Image.new('RGBA', (1920, 1080), BIRU + (255,))
teks(bg, (960, 70), 'SKILL GRATIS', font('Anton', 290), PUTIH, bayang=False, anchor='ma')
simpan(potong_orang(face, mat, bg.convert('RGB'), turun=300).convert('RGBA'), '6_R3_punchline_SKILL_GRATIS', '6 · R3 PUNCHLINE · "SKILL GRATIS" satu kelompok rapat, layar penuh biru, Irfan di depan')

# 7 · R1 cincin (ronde 4) apa adanya dari basis terbaru
simpan(frame('qc/r7/visual_r7_fin_ekor.mp4', 55.4).convert('RGBA'), '7_R1_cincin', '7 · R1 NARASI bentuk cincin (basis r4) · huruf & warna sama dengan R1, melingkar di belakang kepala')

ims = [Image.open(f'{D}/still/{n}').resize((960, 540)) for n in sorted(os.listdir(f'{D}/still'))]
sheet = Image.new('RGB', (1920, 540 * ((len(ims) + 1) // 2)), (20, 20, 20))
for i, im in enumerate(ims): sheet.paste(im, ((i % 2) * 960, (i // 2) * 540))
sheet.save(f'{D}/lembar_spine.jpg', quality=90); print('ok', len(ims))
