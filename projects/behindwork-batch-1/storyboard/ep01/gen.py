"""Ep01 Jensen Huang · Rewind · Story Cinematic. Jalankan: python3 gen.py lalu board.py ."""
import json, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "tools"))
from panel import plate, inset, text, src_label, write  # noqa: E402

W = str(HERE)

# ---------- panel ----------
# 01 Hook: rumor kabur (blok piksel) -> tajam; lalu kartu hitam SALAH
write(W, "01-1", plate("p01a_keynote_piksel.jpg", scale=1.0),
      text("tukang cuci mobil?", 1110, 470, "r1 on-foto"),
      src_label("NVIDIA GTC 2026 keynote"))
write(W, "01-2", text("SALAH", 960, 540, "r6", "c", layar=True))

# 02 Jaket kulit; invert 2 frame jadi pintu rewind
write(W, "02-1", plate("p02_keynote_dekat.jpg", scale=1.04, tx=-30),
      text("jaket kulit ini", 1180, 560, "r1 on-foto"))
write(W, "02-2", plate("p02_keynote_dekat.jpg", grade="", scale=1.07, tx=-50, style="filter:invert(1) grayscale(.4)"),
      text("lebih keras", 1170, 500, "r2 ink", layar=True))

# 03 Rewind: pita diputar mundur (garis tracking + geser kanal), tahun berputar mundur; lalu berhenti di 1972 B&W
rew = ('<div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 140px,'
       'rgba(255,255,255,.10) 140px 146px,transparent 146px 300px);mix-blend-mode:screen"></div>'
       '<div class="plate g-nat" style="background-image:url(../plates/p03_keynote_panggung.jpg);'
       'clip-path:inset(46% 0 40% 0);transform:translateX(-70px);opacity:.9"></div>')
write(W, "03-1", plate("p03_keynote_panggung.jpg", grade="g-nat", style="filter:saturate(.7) contrast(1.1) blur(1px)", extra=rew),
      text("1993", 960, 540, "r6 on-foto", "c", style="text-shadow:-26px 0 0 rgba(255,255,255,.25),-52px 0 0 rgba(255,255,255,.12)"),
      text("◀◀", 470, 540, "r2 dim", "c"))
write(W, "03-2", plate("p03_keynote_panggung.jpg", grade="g-bw", style="filter:grayscale(1) brightness(.45) contrast(1.1)"),
      text("ke tahun", 742, 400, "lead"),
      text("1972", 960, 560, "r6", "c", layar=True))

# 04 Kentucky: Jensen bercerita (inset vertikal, B&W hangat) -> papan Oneida Baptist Institute
write(W, "04-1", inset("p04_oneida_cerita.jpg", 300, 190, 560, 700, "g-bwwarm"),
      text("umur", 990, 392, "lead"),
      text("9 tahun", 984, 470, "r6", layar=True),
      src_label("Jensen Huang bercerita · JRE Clips"))
write(W, "04-2", plate("p04_obi.jpg", grade="g-bwwarm", pos="50% 0%"),
      text("asrama yang keras", 960, 140, "r1 ink", "cx"),
      src_label("Oneida Baptist Institute, Kentucky · Wikimedia Commons, domain publik"))

# 05 Kartu jeda: 100 anak (putih) lalu 17 tahun (hitam)
write(W, "05-1", text("toilet untuk", 960, 380, "lead ink", "cx"),
      text('<span class="red">100</span> anak', 960, 470, "r6 ink", "cx", layar=True, rich=True),
      body="paper")
write(W, "05-2", text("teman sekamarnya", 960, 380, "lead", "cx"),
      text("17 tahun", 960, 470, "r6", "cx", layar=True))

# 06 Quote cut suara asli: teks terjemahan di ruang gelap kanan kepala
write(W, "06-1", plate("p06_stanford_toilet.jpg", scale=1.0),
      text("aku dulu", 1180, 360, "r1 on-foto"),
      text("membersihkan toilet", 1180, 440, "r1 on-foto"),
      src_label("Jensen Huang · Stanford GSB 2024 · suara asli"))
write(W, "06-2", plate("p06_stanford_toilet.jpg", scale=1.1, tx=60, ty=40),
      text("lebih banyak dari", 1150, 380, "lead on-foto"),
      text("kalian semua", 1144, 455, "r2 on-foto", layar=True, style="font-size:100px"))

# 07 Denny's Portland: papan Denny's -> tumpuk kata pekerjaan di samping Jensen makan pancake
write(W, "07-1", plate("p07_dennys_sign.jpg", pos="50% 40%", scale=1.03),
      text("umur 15", 1755, 800, "r2 on-foto", layar=True, style="transform:translateX(-100%)"),
      src_label("Denny's, Ontario Oregon · Rick Obst CC BY 4.0"))
write(W, "07-2", inset("p07_fortune_pancake.jpg", 300, 190, 560, 700, "g-nat"),
      text("pencuci piring", 990, 360, "r1 dim"),
      text("busboy", 990, 450, "r1 dim"),
      text("pelayan", 984, 530, "r2", layar=True),
      src_label("Fortune · Oktober 2023"))

# 08 Quote cut suara asli
write(W, "08", plate("p08_stanford_dish.jpg", scale=1.04, tx=20),
      text("pencuci piring", 1230, 380, "lead on-foto"),
      text("terbaik", 1222, 455, "r2 on-foto", layar=True),
      src_label("Jensen Huang · Stanford GSB 2024 · suara asli"))

# 09 Industri chip: kartu hitam 9 tahun -> wafer (diburamkan agar teks terbaca), AMD redup, LSI Logic aktif
write(W, "09-1", text("merancang chip", 960, 380, "lead", "cx"),
      text("9 tahun", 960, 470, "r6", "cx", layar=True))
write(W, "09-2", plate("p09_wafer.jpg", grade="g-blur", scale=1.08),
      text("AMD", 960, 318, "r2 dim", "cx"),
      text("LSI Logic", 960, 500, "r6", "cx", layar=True),
      src_label("wafer silikon · Sangitiana Fararano CC BY-SA 2.0"))

# 10 Artefak jangkar: booth Denny's San Jose. Hanya Jensen berwarna; tahun besar di belakang kepalanya (kartu 39 T1)
write(W, "10-1", plate("p10_booth_selektif.jpg", pos="50% 30%"),
      text("booth Denny's", 512, 150, "lead on-foto"),
      text("1993", 500, 210, "r6", style="font-size:330px;opacity:.95"),
      '<div class="plate" data-bleed style="background-image:url(../plates/p10_jensen_potong.png);background-position:50% 30%"></div>',
      src_label("booth Denny's San Jose · foto NVIDIA Blog 2023"))
write(W, "10-2", inset("p10_plaque.jpg", 1010, 150, 700, 780, "g-nat", rot=3),
      text("dan dua rekannya", 230, 500, "r1"),
      src_label("plakat booth NVIDIA · NVIDIA Blog 2023"))

# 11 Payoff: layar terbelah, kiri masa awal B&W, kanan panggung hari ini berwarna
split = ('<div class="plate g-bwwarm" style="background-image:url(../plates/p04_obi.jpg);background-position:50% 62%;right:50%"></div>'
         '<div class="plate g-nat" style="background-image:url(../plates/p11_keynote_kampus.jpg);left:50%"></div>')
write(W, "11-1", f'<div class="cam">{split}</div>',
      text("toilet asrama", 480, 820, "r2 on-foto", "cx", style="font-size:100px"))
write(W, "11-2", f'<div class="cam">{split}</div>',
      text("toilet asrama", 480, 820, "r2 dim", "cx", style="font-size:100px"),
      text("paling bernilai", 1440, 820, "r2 on-foto", "cx", layar=True, style="font-size:100px"))

# 12 Pelajaran: kartu putih, lalu panggung (puncak)
write(W, "12-1", text("tidak ada pekerjaan", 960, 370, "lead ink", "cx"),
      text('terlalu <span class="red">rendah</span>', 960, 460, "r6 ink", "cx", layar=True, rich=True),
      body="paper")
write(W, "12-2", plate("p03_keynote_panggung.jpg", scale=1.05, ty=20),
      text("ke puncak", 960, 820, "r2 on-foto", "cx", layar=True))

# 13 CTA: kembali ke booth (artefak jangkar, abu-abu) lalu kartu sumber
write(W, "13-1", plate("p13_booth_abu.jpg", pos="50% 30%", style="filter:brightness(.5)"),
      text("kerja pertamamu?", 960, 470, "r2", "cx"),
      text("tulis di komentar", 960, 610, "lead", "cx"))
sumber = ["NVIDIA Blog · The booth that launched a trillion-dollar company (2023)",
          "Stanford GSB · View From The Top, Jensen Huang (2024)",
          "Fortune · Oktober 2023 · JRE Clips · Bloomberg Originals",
          "Wikimedia Commons · Oneida Baptist Institute, Denny's, wafer"]
write(W, "13-2", text("Sumber", 165, 250, "lead ink"),
      *[text(s, 165, 360 + i * 64, "ink", style="font-weight:500;font-size:38px") for i, s in enumerate(sumber)],
      text("Jensen Huang · co-founder NVIDIA (CEO 1993–2026)", 165, 720, "ink", style="font-weight:700;font-size:44px"),
      body="paper")

# ---------- beats.json ----------
def S(t, peran, alasan): return {"t": t, "peran": peran, "alasan": alasan}
def M(makna, emosi, gerak, aksi, metafora, objek, urutan, bentuk):
    return dict(makna=makna, emosi=emosi, gerak_pembawa=gerak, aksi=aksi, metafora=metafora, objek=objek, urutan=urutan, bentuk=bentuk)

beats = [
 dict(id="01", babak="B1", t=[0.0, 3.5], vo="Katanya, sebelum bikin NVIDIA, Jensen Huang pernah jadi tukang cuci mobil. Salah.",
      layar="tukang cuci mobil? → SALAH",
      aksi="Frame 1: keynote GTC berwarna; sepertiga kiri masih blok piksel lalu tajam dalam 10 frame (rumor = gambar kabur). Caption putih tumbuh per kata di kanan Jensen. Frame 2 (2,4 dtk): potong keras ke kartu hitam, SALAH putih Bold",
      kamera="frame 1 push 1,00 → 1,04 pelan ke Jensen; kartu hitam diam",
      keluar="potong keras ke klip jaket kulit",
      sfx=[S(0.0, "bed: dengung pita kaset pelan sepanjang video", "pilar 1, tidak ada hening digital; pita = perangkat Rewind"),
           S(0.0, "aksen: glitch piksel tipis", "piksel yang menajam = rumor dibongkar, frame 0 butuh gebrakan bunyi"),
           S(2.4, "aksen: hit teredam di SALAH", "koreksi mitos = puncak hook")],
      metafora=M("cerita viral tentang Jensen salah", "penasaran lalu kaget", "blok piksel menajam lalu dipotong kartu hitam",
                 "membongkar", "rumor sebagai gambar kabur yang ditajamkan", ["keynote GTC", "blok piksel", "kartu hitam", "kata SALAH"],
                 "keynote kabur → tajam → kartu SALAH", "orang")),
 dict(id="02", babak="B1", t=[3.5, 7.0], vo="Yang sebenarnya terjadi di balik jaket kulit ini jauh lebih keras.",
      layar="jaket kulit ini → lebih keras",
      aksi="Frame 1: close Jensen berjaket kulit (keynote yang sama, crop dekat), caption di rumput kanan. Frame 2: 2 frame terakhir invert penuh, 'lebih keras' tinta gelap = pintu masuk ke rewind",
      kamera="push 1,04 → 1,07 ke dada/jaket",
      keluar="invert 2 frame lalu potong ke pita mundur",
      sfx=[S(3.5, "transisi: udara teredam di potongan", "pilar 2, potongan ke shot dekat"),
           S(6.9, "aksen: flash statik pendek", "invert = pintu ke masa lalu")],
      metafora=M("di balik citra sukses ada masa lalu keras", "serius", "push pelan menembus jaket kulit lalu gambar terbalik",
                 "menembus", "jaket kulit sebagai kulit luar yang dibalik", ["jaket kulit", "wajah Jensen", "kilat invert"],
                 "jaket → push → invert", "orang")),
 dict(id="03", babak="B2", t=[7.0, 11.0], vo="Untuk melihat awalnya, kita harus putar mundur. Jauh. Ke tahun 1972.",
      layar="1993 (berputar mundur) → ke tahun 1972",
      aksi="Frame 1: footage panggung diputar mundur cepat; garis tracking pita, satu pita gambar bergeser kiri; angka tahun putih berputar mundur 2026 → 1972 dengan jejak gerak, ikon ◀◀ redup. Frame 2: pita berhenti, gambar beku B&W gelap, 1972 putih Bold, 'ke tahun' menempel di kiri atasnya",
      kamera="diam; gambar di-skew oleh tracking pita",
      keluar="beku B&W lalu potong ke Jensen bercerita",
      sfx=[S(7.0, "transisi: tape rewind", "perangkat Rewind episode ini, puncak saat angka berputar paling cepat"),
           S(10.2, "foley: klik pita berhenti", "angka berhenti di 1972")],
      metafora=M("cerita dimulai dari masa kecil", "nostalgia", "angka tahun berputar mundur lalu berhenti keras",
                 "memutar mundur", "hidup sebagai pita kaset yang diputar balik", ["pita/garis tracking", "angka tahun", "panggung GTC", "ikon rewind"],
                 "panggung → pita mundur → beku 1972", "benda")),
 dict(id="04", babak="B2", t=[11.0, 18.0], vo="Umur sembilan tahun, ia dikirim ke sekolah asrama di Kentucky. Pamannya mengira itu sekolah bergengsi. Ternyata sekolah asrama yang keras.",
      layar="umur 9 tahun → asrama yang keras",
      aksi="Frame 1: Jensen bercerita (klip JRE vertikal, crop tanpa caption tertanam) sebagai foto tegak B&W hangat di kiri; '9 tahun' hero di kanan, 'umur' menempel di atasnya. Frame 2: papan Oneida Baptist Institute B&W hangat, caption tinta di langit di atas papan",
      kamera="frame 1 diam; frame 2 push 1,00 → 1,06 ke papan",
      keluar="potong keras ke kartu putih",
      sfx=[S(11.0, "transisi: udara pendek", "masuk ke cerita masa kecil"),
           S(15.5, "foley: foto diletakkan di meja", "papan sekolah = arsip fisik")],
      metafora=M("anak kecil dikirim jauh ke sekolah yang ternyata keras", "terasing", "push pelan ke papan sekolah yang dingin",
                 "mengirim", "papan batu sekolah sebagai pintu dunia yang keras", ["Jensen bercerita", "papan Oneida", "angka 9 tahun"],
                 "Jensen bercerita → papan sekolah", "orang")),
 dict(id="05", babak="B2", t=[18.0, 25.0], vo="Tugas hariannya di asrama: membersihkan toilet untuk sekitar seratus anak laki-laki. Teman sekamarnya remaja tujuh belas tahun.",
      layar="toilet untuk 100 anak → teman sekamarnya 17 tahun",
      aksi="Frame 1: kartu putih polos, '100 anak' tinta Bold, 'toilet untuk' menempel di atas. Frame 2 (23 dtk): balik ke kartu hitam, '17 tahun' putih, 'teman sekamarnya' di atas",
      kamera="diam (kartu jeda)",
      keluar="potong keras ke Stanford",
      sfx=[S(18.0, "tick KT: klik per kata kunci", "pilar 3, kata muncul mengikuti ucapan"),
           S(23.0, "tick KT: klik di 17 tahun", "kartu berganti warna")],
      metafora=M("tugas berat untuk anak sekecil itu", "berat", "kartu putih dipotong keras ke kartu hitam",
                 "menanggung", "angka besar di kartu kosong sebagai beban", ["kartu putih", "angka 100", "kartu hitam", "angka 17"],
                 "100 anak → 17 tahun", "grafik")),
 dict(id="06", babak="B2", t=[25.0, 30.0], vo="(Quote cut suara asli) I used to clean toilets. I've cleaned more toilets than all of you combined.",
      layar="aku dulu membersihkan toilet → lebih banyak dari kalian semua",
      aksi="Jensen di kursi Stanford, terjemahan Indonesia tumbuh per frasa di ruang gelap kanan kepala. Frame 2: push ke wajah, 'kalian semua' Bold",
      kamera="diam lalu push 1,00 → 1,10 ke wajah di kalimat kedua",
      keluar="tawa audiens, potong keras ke papan Denny's",
      sfx=[S(25.0, "musik duck −6 dB", "suara asli jadi pusat"),
           S(29.0, "tawa audiens dari klip", "reaksi asli, bukan SFX tambahan")],
      metafora=M("Jensen sendiri mengakui pekerjaan rendah itu", "jujur, lucu", "push pelan ke wajah saat punchline",
                 "mengaku", "bukti dari mulut tokohnya sendiri", ["Jensen", "kursi panggung", "audiens"],
                 "kalimat 1 → push → kalimat 2", "orang")),
 dict(id="07", babak="B3", t=[30.0, 37.0], vo="Umur lima belas, ia kerja pertamanya di Denny's, Portland. Bukan cuci mobil. Pencuci piring, lalu busboy, lalu pelayan.",
      layar="umur 15 → pencuci piring busboy pelayan",
      aksi="Frame 1: papan Denny's asli (foto Commons, berwarna), 'umur 15' di bidang atap gelap kanan bawah, di luar papan ('kerja pertama' sudah diucapkan di atas papan, tidak ditulis). Frame 2: Jensen makan pancake (Fortune) sebagai foto tegak kiri; kata pekerjaan bertumpuk di kanan, yang lama meredup, 'pelayan' putih Bold",
      kamera="frame 1 push 1,00 → 1,03 ke papan; frame 2 diam, kata bertumpuk",
      keluar="potong keras ke Stanford",
      sfx=[S(30.0, "transisi: tape fast-forward pendek", "naik dari 1972 ke masa remaja"),
           S(34.0, "tick KT: klik ×3 per jabatan", "tiap jabatan satu langkah naik")],
      metafora=M("kerja pertama di dapur restoran, naik pelan", "bangga kecil", "kata jabatan bertumpuk naik, yang lama meredup",
                 "menaiki", "tangga jabatan dapur", ["papan Denny's", "Jensen makan pancake", "tiga jabatan"],
                 "papan → Jensen → pencuci piring → busboy → pelayan", "orang")),
 dict(id="08", babak="B3", t=[37.0, 42.0], vo="(Quote cut suara asli) I was probably Denny's best dishwasher.",
      layar="pencuci piring terbaik",
      aksi="Jensen di Stanford bergestur, 'terbaik' Bold di ruang gelap kanan, 'pencuci piring' menempel di atasnya",
      kamera="push 1,00 → 1,04 pelan",
      keluar="potong keras ke kartu hitam",
      sfx=[S(37.0, "musik turun tipis", "suara asli jadi pusat"),
           S(41.5, "aksen: napas musik naik", "pindah ke babak berikutnya")],
      metafora=M("ia bangga pada pekerjaan rendah itu", "hangat", "push pelan ke wajah yang tersenyum",
                 "membanggakan", "bukti dari mulut tokohnya sendiri", ["Jensen", "gestur tangan", "kata terbaik"],
                 "Jensen → terbaik", "orang")),
 dict(id="09", babak="B4", t=[42.0, 49.0], vo="Tapi ia tidak berhenti di dapur. Ia kuliah teknik elektro, lalu merancang chip sembilan tahun di AMD dan LSI Logic.",
      layar="merancang chip 9 tahun → AMD LSI Logic",
      aksi="Frame 1: kartu hitam, '9 tahun' Bold, 'merancang chip' di atasnya. Frame 2: makro wafer silikon diburamkan 3 px dan digelapkan, 'AMD' redup di atas, 'LSI Logic' putih Bold",
      kamera="frame 2 push 1,04 → 1,08 ke wafer",
      keluar="potong keras ke booth Denny's",
      sfx=[S(42.0, "transisi: tape fast-forward", "naik ke 1993"),
           S(45.0, "bed tambahan: dengung elektrik halus", "dunia chip"),
           S(47.0, "tick KT: klik di LSI Logic", "kata kunci baru")],
      metafora=M("dari dapur ke industri chip", "tekun", "wafer berputar pelan di bawah nama perusahaan",
                 "merancang", "wafer silikon sebagai bahan kerjanya", ["kartu hitam", "wafer", "AMD", "LSI Logic"],
                 "9 tahun → AMD → LSI Logic", "benda")),
 dict(id="10", babak="B4", t=[49.0, 57.0], vo="Lalu tahun 1993, di sebuah booth Denny's di San Jose, ia dan dua rekannya merancang NVIDIA.",
      layar="booth Denny's 1993 → dan dua rekannya",
      aksi="Artefak jangkar. Frame 1: foto booth Denny's San Jose, abu-abu kecuali Jensen berwarna (matte); '1993' raksasa di belakang kepalanya, 'booth Denny's' menempel di atas. Frame 2: plakat 'The booth that launched a $1 trillion company' sebagai kartu foto miring di hitam (kartu 39 k5), 'dan dua rekannya' di kiri; kata NVIDIA tidak ditulis ulang karena sudah terbaca di plakat (Lantai A3)",
      kamera="frame 1 push 1,00 → 1,08 ke Jensen, geser kiri-atas; frame 2 kartu foto masuk dari kanan, lalu push pelan ke tulisan NVIDIA",
      keluar="potong keras ke layar terbelah",
      sfx=[S(49.0, "foley: rana kamera satu klik", "foto jangkar muncul pertama kali (kartu 39 T1)"),
           S(53.0, "foley: kertas plakat", "plakat = benda fisik")],
      metafora=M("perusahaan raksasa lahir di meja restoran biasa", "takjub", "push ke satu orang berwarna di foto abu-abu",
                 "melahirkan", "booth restoran sebagai tempat lahir", ["booth Denny's", "Jensen berwarna", "plakat", "angka 1993"],
                 "booth → Jensen → plakat", "benda")),
 dict(id="11", babak="B5", t=[57.0, 63.0], vo="Dari membersihkan toilet asrama dan mencuci piring, sampai membangun perusahaan chip paling bernilai di dunia.",
      layar="toilet asrama → paling bernilai",
      aksi="Layar terbelah: kiri papan Oneida B&W hangat (masa awal), kanan kampus NVIDIA di keynote berwarna (hari ini). Frame 1 'toilet asrama' putih Bold di bawah sisi kiri. Frame 2 'toilet asrama' meredup, 'paling bernilai' di posisi sejajar sisi kanan (kalimat paralel)",
      kamera="kedua sisi push pelan ke arah garis tengah",
      keluar="jeda musik 0,4 dtk, potong keras ke kartu putih",
      sfx=[S(57.0, "transisi: swish split", "pilar 2, layar terbelah masuk"),
           S(62.6, "aksen: musik hening 0,4 dtk", "napas sebelum pelajaran")],
      metafora=M("jarak dari pekerjaan terendah ke puncak", "puas", "dua sisi layar didorong saling mendekat",
                 "membandingkan", "dua dunia berdampingan dalam satu frame", ["papan sekolah", "kampus NVIDIA", "garis belah"],
                 "kiri → kanan", "sebab-akibat")),
 dict(id="12", babak="B5", t=[63.0, 71.0], vo="Pelajarannya: tidak ada pekerjaan yang terlalu rendah untuk dikerjakan, kalau kamu sedang membangun kebiasaan yang akan membawamu ke puncak.",
      layar="tidak ada pekerjaan terlalu rendah → ke puncak",
      aksi="Frame 1: kartu putih, 'terlalu rendah' tinta Bold, 'tidak ada pekerjaan' menempel di atas. Frame 2: panggung GTC lebar dengan penonton, 'ke puncak' putih Bold di atas penonton",
      kamera="frame 2 push 1,00 → 1,05 ke panggung",
      keluar="potong keras ke booth",
      sfx=[S(63.0, "aksen: sub drop", "kalimat pelajaran = puncak episode"),
           S(69.0, "aksen: riser pelan menuju panggung", "menuju puncak")],
      metafora=M("kerja rendah membangun jalan ke puncak", "yakin", "kartu kosong dipotong ke panggung raksasa",
                 "membangun", "panggung sebagai puncak", ["kartu putih", "panggung GTC", "penonton"],
                 "kalimat → panggung", "benda")),
 dict(id="13", babak="B5", t=[71.0, 76.0], vo="Pekerjaan pertamamu dulu apa? Tulis di komentar.",
      layar="kerja pertamamu? tulis di komentar",
      aksi="Frame 1: kembali ke foto booth (abu-abu, digelapkan), 'kerja pertamamu?' Bold putih di tengah, 'tulis di komentar' di bawahnya. Frame 2: kartu sumber putih 1,5 dtk",
      kamera="frame 1 push pelan; kartu sumber diam",
      keluar="selesai",
      sfx=[S(71.0, "foley: klik pita play", "pita kembali main, perangkat Rewind ditutup"),
           S(74.5, "aksen: akor penutup", "akhir")],
      metafora=M("penonton diajak mengingat kerja pertamanya", "akrab", "kembali ke booth yang sama",
                 "mengajak", "booth sebagai titik awal milik penonton juga", ["booth Denny's", "pertanyaan", "kartu sumber"],
                 "booth → kartu sumber", "benda")),
]

spec = {
 "project": "Behindwork Ep 01 · Jensen Huang · Rewind (Story Cinematic)",
 "format": {"w": 1920, "h": 1080, "fps": 30},
 "arah": {"register": "dokumenter sinematik, lugas",
          "kata_karakter": ["arsip", "pita mundur", "booth"],
          "detail_khas": "pita kaset diputar mundur ke 1972 lalu kembali; booth Denny's sebagai foto jangkar berwarna selektif",
          "sumber_gaya": "kiblat kartu 39 (startup.mp4) + BRAND Behindwork; DECISIONS D-02"},
 "babak": [
  {"id": "B1", "nama": "Hook mitos", "musik": {"peran": "denyut rendah tegang", "alasan": "koreksi mitos butuh rasa 'tunggu dulu'"}},
  {"id": "B2", "nama": "Rewind ke 1972", "musik": {"peran": "piano redup + pad pita", "alasan": "masa kecil yang sepi dan keras"}},
  {"id": "B3", "nama": "Dapur Denny's", "musik": {"peran": "ritme ringan naik", "alasan": "remaja mulai bekerja, ada harapan"}},
  {"id": "B4", "nama": "Naik ke 1993", "musik": {"peran": "build bertahap", "alasan": "menuju kelahiran NVIDIA"}},
  {"id": "B5", "nama": "Payoff dan CTA", "musik": {"peran": "swell lalu jeda 0,4 dtk", "alasan": "pelajaran butuh napas sebelum diucapkan"}},
 ],
 "beats": beats,
}
(HERE / "beats.json").write_text(json.dumps(spec, ensure_ascii=False, indent=1), encoding="utf-8")
print("panel + beats.json ditulis")
