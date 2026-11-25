# F3 · Jejak Belajar Tema `minimalist-dataviz-kinetic`

Dokumen ini mencatat hasil pengamatan langsung atas 4 kartu utama (`56`, `57`, `58`, `67`) beserta seluruh keyframe `.jpg` masing-masing di `claude/motion-graphic/guide/referensi/sheets/keyframes/`, ditambah konteks pembanding beat angka dari kartu `33`, `81`, dan `19`. Seluruh kartu pada tema ini berstatus `dilihat_bergerak: tidak`, sehingga setiap penjelasan mengenai gerak, animasi, morphing, transisi, maupun tempo ditandai eksplisit `(belum dilihat bergerak)`.

---

## Kartu 56 · Bouncing-Ball Bar Build

- **Kasus:** `56` (`claude/motion-graphic/cookbook/_vault/03-spatial-and-ui-layouts/56-bouncing-ball-bar-build.md`) · Keyframe yang dibuka (6/6):
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/56-k1-grid-kosong.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/56-k2-judul-ketik.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/56-k3-batang-teoria.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/56-k4-batang-pratica.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/56-k5-erro-push.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/56-k6-runtuh-keluar.jpg`
  · `dilihat_bergerak: tidak`

- **Yang terlihat:**
  - Format vertikal 9:16 (720×1280) di atas latar hitam murni `#000000` pada seluruh tepi dan sudut, tanpa grain. Pendaran cahaya radial (*soft bloom*) hanya muncul tepat di belakang zona grafik (luma tengah meningkat dari 8 ke 16/255 saat batang hijau penuh di `56-k5`).
  - Ruang kosong atas sebesar ±22% dan ruang kosong bawah sebesar ±27% menyisakan tepat satu blok grafik kuadran terpusat di area x 15–80%, y 22–73% (±65% lebar × 51% tinggi). Garis sumbu L (vertikal kiri dan horizontal bawah) berwarna putih terang, sedangkan garis kisi kuadran (grid persegi 8×8 baris-kolom) dibuat redup pada opasitas ±10–20% dan memudar menuju tepi kanan serta tepi atas (`56-k1`).
  - Satu judul pertanyaan sans-serif Semibold (`Segoe UI / Selawik`, 1 baris rata tengah di y ±26%, lebar ±53,3% frame di `56-k3`) berbunyi `"O quanto eu aprendo com..."`. Pada `56-k2`, judul baru tertulis sebagian (`"O quanto eu ap"`), lalu menyala putih `#DAE8D6` dengan glow lembut pada `56-k3` dan `56-k4`. Pada `56-k5`, frasa penjawab `"aprendo com..."` berganti warna menjadi hijau `#87C573`, senada dengan batang ke-3.
  - Tiga batang vertikal berlebar ±4,6% frame dengan jarak antarbatang ±19% frame berdiri di atas sumbu horizontal dari kiri ke kanan, masing-masing berlabel tepat 1 kata sans Regular (`#C3C1BF`, tinggi kapital 1,25% frame) di y 67–68% (rasio tinggi huruf judul terhadap label ≈ 1,3× karena judul 1,64% tinggi):
    1. `"teoria"` (`56-k3`): batang merah `#E52C1C` setinggi ±9% frame.
    2. `"prática"` (`56-k4`): batang kuning `#ECD217` setinggi ±15% frame.
    3. `"erro"` (`56-k5`): batang hijau `#4BD61D` setinggi ±34–35% frame (rasio tinggi batang ≈ 1 : 1,6 : 3,8), puncaknya mencapai zona atas grid yang memudar dan memicu munculnya garis pola sirkuit hijau tipis di sisi kanan-atas grid.
  - Satu bola putih polos (±4% lebar frame) tampak berpindah di setiap keyframe: bertumpu di dasar sumbu di atas huruf `"t"` (`56-k1`), menekan pangkal batang merah yang baru tumbuh (`56-k2`), memantul lonjong tepat di atas puncak batang merah (`56-k3`), melayang miring antara kolom kedua dan ketiga (`56-k4`), bertengger bulat di puncak batang hijau (`56-k5`), dan memipih di atas batang hijau sementara batang `"teoria"` sudah menghilang dan batang `"prática"` tinggal sepertiga tinggi (`56-k6`).
  - Pengukuran gerak dan tempo di vault *(belum dilihat bergerak)*: 0 cut dalam 6,8 dtk berulang mulus; grid tergambar 0–0,9 dtk, bola memantul parabola dengan squash `scaleY 0,75` dan menumbuhkan tiap batang dengan ease-out cepat 0,4–0,6 dtk lalu diam ±1,1–1,3 dtk per kolom; saat batang `"erro"` naik di 4,2 dtk terjadi satu-satunya push-in kamera +8% (lebar judul 53,3% → 57,5%, jangkar kanan-atas x 83%, y 20%); keluar pada 5,0–6,5 dtk lewat batang runtuh kiri→kanan selang ±0,3 dtk dan penghapusan ketik terbalik.

- **Kenapa ini bekerja:**
  - Bola putih menciptakan hubungan sebab-akibat visual yang menuntun arah baca kiri→kanan tanpa memerlukan angka nominal di sumbu Y atau panah penunjuk tambahan.
  - Kontras tinggi batang 1 : 1,6 : 3,8 yang dipadukan gradasi warna trafik (merah pendek → kuning sedang → hijau hampir 4× lipat) langsung mengkomunikasikan kesimpulan perbandingan dalam sekali lihat, sementara perubahan warna pada frasa `"aprendo com..."` menautkan kata di judul langsung ke batang pemenang tanpa kotak sorot atau penambahan ukuran huruf.
  - Ruang kosong 49% vertikal (22% atas + 27% bawah) memagari area *bloom* agar pendaran neon tidak meluber ke tepi frame.
  - Menahan kamera diam total selama dua batang pertama membuat satu-satunya dorongan kamera +8% di batang terakhir terasa sebagai penekanan klimaks *(belum dilihat bergerak)*.

- **Prinsip yang bisa dipindah ke konten lain:**
  - Untuk perbandingan 3 item dengan satu punchline unggul, terapkan rasio tinggi minimal 3 : 1 antara pemenang dan pembanding pertama, gunakan label maksimal 1 kata tepat di bawah sumbu tiap kolom, dan sisakan ≥ 45% kanvas sebagai ruang kosong bersih.
  - Tautkan judul dengan jawaban grafik melalui penyamaan warna aksen pada kata kunci di judul agar informasi tidak perlu diulang di dua tempat.
  - Apabila tidak memakai narator/VO, gunakan satu elemen penggerak tunggal (titik/bola/ikon kecil) sebagai penuntun urutan kiri→kanan dan sediakan jeda diam ±1 dtk setelah tiap kolom terbentuk *(belum dilihat bergerak)*.
  - Simpan gerak kamera (*push-in* ±8%) hanya untuk kemunculan item pemenang, bukan pada setiap kolom *(belum dilihat bergerak)*.

- **Cara menerapkannya di konteks baru:**
  - *Skenario Jadisatu / konten edukasi UMKM 9:16 (sisipan 5–7 detik):* membandingkan dampak tiga pendekatan konten (`"Asal post"` vs `"Ikut tren"` vs `"Sistem"`). Kanvas `#0A0A0A` (atau kanvas terang `#F5F5F7` tanpa glow, diganti bayangan kontak tipis), judul 1 baris rata tengah ≤ 6 kata pada y 25% (`"Sumber hasil terbesar datang dari..."`, tinggi huruf 1,8–2,2% frame agar lebih nyaman terbaca di HP), 3 batang berlebar 5% frame berjarak 19% di area y 35–70% dengan tinggi bertingkat 10% → 16% → 36% frame, label 1 kata di y 72%. Gunakan bola/titik oranye atau biru `#2563EB` untuk memicu tiap batang, ubah warna frasa `"datang dari..."` menjadi aksen brand yang sama saat batang ke-3 menembus garis grid atas, lalu dorong kamera +8% *(belum dilihat bergerak)*.

---

## Kartu 57 · Nested Shape-Morph Dataviz

- **Kasus:** `57` (`claude/motion-graphic/cookbook/_vault/03-spatial-and-ui-layouts/57-nested-shape-morph-dataviz.md`) · Keyframe yang dibuka (7/7):
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/57-k1-cincin.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/57-k2-morph.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/57-k3-kotak-bersarang.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/57-k4-bar-persen.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/57-k5-transisi-geser.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/57-k6-dial.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/57-k7-zoom-akhir.jpg`
  · `dilihat_bergerak: tidak`

- **Yang terlihat:**
  - Format 3:4 (720×960) dengan latar hitam hangat pekat `#110E09` yang 100% datar tanpa vignette, tanpa glow, tanpa gradien, dan tanpa tekstur grain.
  - Tepat satu subjek geometris besar mendominasi pusat `(50%, 50%)` selebar 64–75% frame sehingga menyisakan margin kiri-kanan ±12,5%–18% yang simetris bersih:
    - `57-k1`: Dua cincin putih tipis (`2–3 px`, `#D0CCC8`) bersarang sepusat; label 2 baris (`"2023"` putih `#D6D2D0` di atas `"$42,000"` abu `#888481`, dan `"Match"` di atas `"$4,200"`) menempel tepat di luar busur kanan-atas masing-masing cincin tanpa garis penunjuk tambahan.
    - `57-k2`: Kedua cincin berubah menjadi persegi bersudut bulat (*rounded square*), sementara kedua pasangan label tetap bertahan tepat di sudut kanan-atas kontur masing-masing.
    - `57-k3`: Kontur luar mengisi penuh menjadi panel persegi solid `#1E1B16` (tanpa border, `540×541 px` = `75% × 56,35%` frame) dengan label `"2023 / $42,000"` di pojok kanan-atas dalam panel; kotak dalam `"Match / $4,200"` bergeser bersarang ke pojok kiri-bawah panel dengan garis tepi putih tajam `2 px`.
    - `57-k4` & `57-k5`: Di dalam wadah persegi yang sama, dua proporsi persentase ditampilkan sebagai pembagian blok horizontal atas-bawah. Bagian atas berwarna panel gelap `#1E1B16` memuat label `"APY"` di pojok kiri-atas dan angka besar putih `"65%"` di kiri-bawah area gelap; bagian bawah berwarna aksen lime `#CEFF0A` dengan teks hitam (`"Match"` di kiri-atas blok lime dan `"35%"` di kiri-bawahnya). Di `57-k4`, blok lime sedikit lebih sempit dari lebar panel kanan (menyisakan strip gelap tipis di tepi kanan); di `57-k5`, garis batas naik membelah panel tepat 50% atas / 50% bawah dengan angka menjadi `"50%"` dan `"50%"` serta lebar lime penuh 100% panel.
    - `57-k6` & `57-k7`: Satu dial melingkar berpusat di `(50%, 50%)` (diameter ±64% lebar × 48% tinggi frame, track abu-gelap `#28251C`), dengan empat penanda skala (`0`, `25`, `50`, `75`) di sisi dalam titik atas-kanan-bawah-kiri, angka pusat dua tingkat (`"Ira Match"` abu kecil di atas `"$50.00"` atau `"$67.00"` putih `#FEFCF9`), dan tiga tahun (`2022`, `2023`, `2024`) sejajar di y 82%. Satu aksen lime `#CEFF0A` mengisi busur lingkaran searah jarum jam dan membungkus pil tahun aktif (`2023` di `57-k6` saat busur melewati titik 50; `2024` di `57-k7` saat busur meluas menuju titik 67).
  - Tipografi memakai tepat satu keluarga neo-grotesk netral Regular di seluruh frame (0 bold, 0 italic) dalam hanya 2 skala ukuran: angka besar `4,1–4,7%` tinggi frame dan label `1,25–1,6%` tinggi frame (rasio terukur `3,46–3,75×`).
  - Pengukuran gerak dan tempo di vault *(belum dilihat bergerak)*: 4,73 dtk, tanpa trek audio, 2 shot (3,03 + 1,70 dtk), 11 event gerak cepat 0,1–0,4 dtk diselingi jeda diam 0,15–0,5 dtk; cincin membesar +4% (0–0,3 dtk), morph `borderRadius` 50% → 24% → 0 (0,55–1,1 dtk) dengan label ikut berpindah posisi tanpa fade, isi lime muncul dalam 1 frame (1,23 dtk) lalu melebar 0,1 dtk + ekor pelan (1,65–1,95 dtk) dan naik ke 50/50 serempak counter roll (2,35–2,6 dtk); perpindahan ke dial lewat geser berlawanan arah (panel keluar ke kiri, dial masuk dari kanan pada 2,7–3,55 dtk) diikuti pengisian busur bersama counter `$0→$50→$67`, dan diakhiri push-in +9% (4,45–4,73 dtk).

- **Kenapa ini bekerja:**
  - Mempertahankan posisi pusat `(50%, 50%)` dan lebar jangkar 64–75% untuk setiap bentuk yang bermetamorfosis membuat mata tidak pernah kehilangan titik fokus saat konsep berganti dari himpunan (total vs bagian) ke rasio persentase lalu ke akumulasi waktu.
  - Mengunci tipografi ke hanya dua ukuran Regular tanpa bayangan atau outline dan memberi tepat satu warna aksen lime `#CEFF0A` menjadikan warna aksen satu-satunya sinyal "apa yang berubah atau aktif sekarang".
  - Menempelkan label langsung di kontur bentuk (`57-k1`, `57-k2`) atau di pojok internal blok (`57-k3`, `57-k4`) meniadakan garis pemimpin (*leader lines*) sehingga komposisi tetap sangat lapang.

- **Prinsip yang bisa dipindah ke konten lain:**
  - Saat menyajikan rangkaian 2–3 metrik terkait dalam satu klip tanpa pembicara, jaga wadah visual tetap berada di jangkar tengah yang sama (64–75% lebar frame dengan margin samping ≥ 12%) dan ubah wujud geometrinya alih-alih mengganti ke layout yang terpisah-pisah.
  - Batasi warna ke 1 warna latar gelap/terang rata, 1 warna panel kontras lembut, dan tepat 1 warna aksen pekat yang menandai porsi aktif, busur berjalan, dan pil periode aktif.
  - Gunakan hanya 2 ukuran huruf (tanpa perlu bobot bold atau kotak di belakang teks) dengan rasio tinggi angka terhadap label `3–4×`.
  - Pastikan perubahan luas blok warna atau panjang busur berjalan serempak dengan penghitung angka (*counter*) dan dipisahkan jeda diam 0,15–0,5 dtk antar-tahap agar angka terbaca *(belum dilihat bergerak)*.

- **Cara menerapkannya di konteks baru:**
  - *Skenario Jadisatu / ringkasan metrik produk SaaS atau hasil kampanye klien (3:4 atau 9:16):* menampilkan rasio penyelesaian kerja atau efisiensi biaya (`"Dari 100 jam kerja, 35 jam habis untuk admin"` → `"Porsi admin vs eksekusi: 35% / 65% → 50% / 50%"` → `"Penghematan Q1–Q3: Rp0 → Rp15jt → Rp24jt"`). Gunakan kanvas flat `#111215` (atau terang `#F7F6F2` dengan panel `#EAE8E3`), wadah pusat 70% lebar frame (margin kiri-kanan 15%), satu aksen biru `#2563EB` atau lime/oranye brand untuk blok bawah dan busur dial, dua ukuran Inter Regular (`60 px` angka vs `18 px` label pada 1080×1350, rasio `3,33×`), 0 shadow, 0 glow, serta jeda diam `0,3–0,5 dtk` di setiap perubahan nilai *(belum dilihat bergerak)*.

---

## Kartu 58 · Single-Hue Act Lighting

- **Kasus:** `58` (`claude/motion-graphic/cookbook/_vault/04-tactile-textures-and-grading/58-single-hue-act-lighting.md`) · Keyframe yang dibuka (6/6):
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/58-k1-grafik-naik-karakter.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/58-k2-kartu-kata-kunci.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/58-k3-karakter-ikon-masuk.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/58-k4-karakter-ikon-lengkap.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/58-k5-penghitung-profit.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/58-k6-cut-dari-gelap.jpg`
  · `dilihat_bergerak: tidak`

- **Yang terlihat:**
  - Format 9:16 (720×1280) berlatar hitam pekat (`#000000`–`#0A0A0A`) yang menyisakan ≥70% ruang negatif gelap dan 20% area bawah sengaja dibiarkan bersih hitam untuk logo watermark (`"GATESFX / www.gatesfx.com"` di y 78–82%).
  - Pencahayaan tunggal menjadi pembeda mutlak antarbabak — tidak ada dua warna cahaya sekaligus dalam satu frame:
    - *Babak 1 — Putih Netral (`58-k1`, `58-k2`, `58-k6`):* di `58-k1`, maskot 3D minimalis (kepala bola dengan 2 mata titik + 1 mulut titik dan bahu kubah) berdiri di sisi kanan-bawah di atas balok bersudut tajam putih terang, bersebelahan dengan satu bingkai kaca kuadran bergaris grid tipis redup yang menampilkan kurva garis naik putih di kiri-atas. Di `58-k2` dan `58-k6` (terlihat posisi geser menyamping ke kiri yang sedikit berbeda antara kedua still), maskot menjadi siluet gelap dengan *rim light* putih tajam di sisi kanan kepala sementara bahunya menumpang-tindih tepi kiri-bawah sebuah kartu jajar genjang putih terang miring (`54 × 12,5%` frame) bertuliskan satu kata kapital miring bergradien abu→putih `"DISCIPLINE"` (cap ±2,27% tinggi).
    - *Babak 2 — Merah Bahaya (`58-k3`, `58-k4`):* pendaran cahaya tunggal berubah menjadi merah gelap di tepi atas frame dan *rim light* merah-putih di puncak kepala serta bahu maskot (pusat x 50%, y ±45%). Tepat di atas kepala maskot melengkung sebuah garis busur putih tipis bertitik puncak dan tepi, diikuti kemunculan 1 (`58-k3`) hingga 3 (`58-k4`) ikon kaca bulat (diameter ±13% lebar: panah bolak-balik, folder ekspor, tanda seru segitiga) serta satu garis zigzag merah tipis yang turun diagonal dari kiri-atas ke kanan-bawah memotong di depan busur dan maskot.
    - *Babak 3 — Hijau Hasil (`58-k5`):* maskot ditiadakan; di sepertiga atas (y ±27%) berdiri tepat satu panel tipis sudut bulat selebar 64% frame bergradien hijau gelap di tepi bawah (`#1A4507`), memuat label kecil `"Profit"` (cap 1,3% tinggi) rata kiri di tepi atas angka putih tebal `"578799"` (cap 4,5% tinggi, lebar 42% frame, rasio angka : label terukur `3,21–3,4×`). Tepat di bawah pusat panel (y 36%) memancar segitiga sorot cahaya (*beam*) hijau vertikal yang berpuncak pada satu titik bintang putih menyilaukan, mengarah lurus ke angka.
  - Pengukuran gerak dan tempo di vault *(belum dilihat bergerak)*: 12,8 dtk total, 4 shot dengan 3 hard cut (1,77 · 3,27 · 9,27 dtk; durasi shot 1,8 / 1,5 / 6,0 / 3,5 dtk); dua shot awal melakukan *truck* menyamping ke kanan searah melintasi cut (bergeser 24% lalu 21% lebar frame) lewat frame hampir hitam; shot 3 kamera hampir diam (<0,2% geser) sementara pendaran merah di zona atas meluas (piksel terang 695 → 5.936), 3 ikon masuk bertahap dengan jeda tidak rata, dan garis merah digambar diagonal; shot 4 menjalankan odometer counter naik ±95.000/dtk selama ±3,5 dtk bersamaan dorongan skala sangat halus `1→1,009` dan puncak beam naik dari y 491 ke 454 px.

- **Kenapa ini bekerja:**
  - Memisahkan tiga babak emosional (netral/prinsip → risiko/gesekan → keuntungan/hasil) murni melalui satu warna sumber cahaya di ruang hitam pekat membuat makna suasana terbaca sebelum penonton selesai membaca kata.
  - Di frame angka penutup (`58-k5`), menyisakan hanya satu panel berisi dua teks (`Profit` dan `578799` berasio >3:1) di sepertiga atas sambil menunjuknya dengan puncak sorot cahaya bintang dari bawah memaksa fokus mata berhenti tepat pada nominal hasil.
  - Menempelkan plakat `"DISCIPLINE"` bertumpang-tindih dengan bahu (`58-k2`) dan menaruh orbit 3 ikon tepat di atas kepala (`58-k4`) mengikat data dan maskot menjadi satu kesatuan objek.

- **Prinsip yang bisa dipindah ke konten lain:**
  - Pada cerita masalah→solusi pendek (10–20 dtk), kendalikan suasana per babak lewat perubahan tepat satu warna cahaya/aksen di atas latar hitam pekat (≥70% ruang kosong) melalui hard cut antarbabak, tanpa mencampur dua warna aksen dalam satu frame.
  - Untuk beat angka hasil akhir (*payoff*), tempatkan tepat satu angka besar + satu label 1-kata berasio ≥3:1 di sepertiga atas atau tengah dan gunakan satu elemen penunjuk geometris (beam, garis, atau titik cahaya) yang mengarah ke angka tersebut.
  - Bila ada objek/karakter pembawa cerita, tempelkan kartu kata kunci atau susunan ≤3 ikon langsung ke kontur tubuh/produk tersebut, bukan di pojok terpisah.
  - Hubungkan dua shot pembuka dengan arah gerak kamera searah melintasi cut sebelum berhenti diam pada shot penjelasan utama *(belum dilihat bergerak)*.

- **Cara menerapkannya di konteks baru:**
  - *Skenario Jadisatu / video pendek penawaran jasa atau fitur produk 9:16 (12–15 dtk):* alur `"Cara kerja lama (netral) → Masalah waktu/biaya bocor (merah) → Dampak terukur (hijau)"`. Latar `#0A0A0A` dengan objek tunggal (mis. kartu UI gelap atau produk 3D di pusat x 50%, y 45%): Babak 1 cahaya putih + plakat miring 1 kata (`"KONSISTEN"`); Babak 2 hard cut ke cahaya merah `#E5484D` + busur tipis berisi maks 3 ikon gesekan di atas objek dan 1 garis turun diagonal; Babak 3 hard cut ke aksen hijau `#22C55E` dengan satu panel di y 27% selebar 64% frame bertuliskan label `"Hemat"` (`22 px`) dan angka besar `"18.400.000"` (`74 px` pada 1080×1920, rasio `3,36×`) yang ditunjuk sinar vertikal tipis dari bawah sambil menghitung naik *(belum dilihat bergerak)*.

---

## Kartu 67 · Morphing Card Number Counter

- **Kasus:** `67` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/67-morphing-card-number-counter.md`) · Keyframe yang dibuka (8/8):
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k1-angka-raksasa.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k2-tumpukan-foto.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k3-teks-ulang-strip.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k4-grafik-angka.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k5-kartu-gelap.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k6-serif-langit.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k7-footage-statistik.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/67-k8-tagline.jpg`
  · `dilihat_bergerak: tidak`

- **Yang terlihat:**
  - Format 16:9 (1276×720) yang dibangun dengan sistem bingkai kartu seragam di seluruh video: setiap tampilan berada di dalam kartu bersudut bulat (`radius ±17 px` / `±2,4%` tinggi) dengan inset konsisten `±2,6%` lebar dan `±4,6%` tinggi, tanpa drop shadow, tanpa grain, dan tanpa gradien pada kartu warna solid. Dua warna dasar bertukar peran antarbabak: hijau-hitam pekat `#041313`/`#061613` dan putih hangat `#F9F3F3` (babak awal kartu putih di bingkai gelap pada `67-k1` s/d `67-k4`; babak lanjut bingkai putih membungkus kartu gelap atau kartu lanskap pada `67-k5` s/d `67-k8`).
  - Tipografi memakai grotesk geometris Regular (mirip Suisse Int'l / Inter Display) **tanpa bold sama sekali**, dipasangkan secara selektif dengan serif italic sempit berkontras tinggi (mirip Instrument Serif Italic) pada tinggi cap yang sama (`67-k6`, `67-k8`), ditambah simbol+wordmark kecil `"◐ Island"` (tinggi 2,9–6% frame) yang menempel di atas atau kanan kata kunci. Hanya tepat satu aksen hijau mint `#60DDB2`–`#67E6AE` dipakai untuk menandai maksimal 1 elemen per frame.
  - Perbandingan skala angka, grid, blok, dan tata letak tiap keyframe:
    - `67-k1`: Angka raksasa `"$398M"` (>42% tinggi frame) mengisi separuh bawah kartu putih dengan kaki digit terpotong tepi bawah kartu dan huruf `"M"` kanan memudar oleh motion blur horizontal/vertikal; di atasnya berdiri logo kecil `"◐ Island"` di y ±43%.
    - `67-k2`: Angka mengecil ke tengah menjadi `"$400M"` yang terbaca utuh (digit `16,9%` tinggi, lebar `45%` frame) di bawah label `"◐ Island Announcing"` (`3,89%` tinggi, rasio angka : label `4,39×`), diapit simetris oleh tumpukan dek kartu foto lanskap yang mengintip di tepi atas dan tepi bawah kartu dengan blur halus.
    - `67-k3`: Teks `"Series F"` (`18,5–19,7%` tinggi) diulang 5 baris berundak secara diagonal dan dipisahkan oleh garis rambut horizontal abu-abu `1 px`; empat baris luar gelap buram di atas putih, sementara tepat satu baris tengah (y 37–63%) tampil putih tajam di atas strip foto padang rumput hijau dengan logo `"◐ Island"` di kanan.
    - `67-k4`: Kartu putih menyusut ke kiri menjadi kotak selebar 55% frame berisi kisi grid garis putus-putus vertikal-horizontal dan label tahun `2022–2026` di sumbu bawah; angka raksasa `"$6.4B"` (tinggi digit `30–37,6%` frame) memotong batas tepi kanan kartu putih, sementara satu garis rambut horizontal abu tipis menghubungkan tepi kanan kartu putih ke label `"◐ Island valuation"` di zona gelap sebelah kanan.
    - `67-k5`: Kartu penuh gelap `#041313` menenangkan ritme dengan teks utuh `"$6.4B valuation"` (tinggi `±9%` frame) di tengah vertikal (y ±51,4%) di bawah `"◐ Island"`.
    - `67-k6`: Kartu penuh lanskap langit bergradasi pudar sejuk (`#7C97A2`–`#ACB0B3`) menampilkan kalimat tumbuh dengan serif italic khusus pada kata kunci (`"The *future*"`, serif asc+desc `28,75%`, teks putih tanpa bold).
    - `67-k7`: Layout terbelah asimetris 30% kiri / 62% kanan. Kolom kiri menumpuk 4 kartu statistik vertikal (lebar `30%`, tinggi tiap kartu `±25%`): kartu teratas aktif berlatar foto gelap + angka hijau mint `#60DDB2` `"16"` (`15,0%` tinggi, rasio angka : label `±7×`) + teks `"of the largest / Manufacturing / Companies"` (frasa pertama hijau mint, sisanya putih); tiga kartu di bawahnya (`"12"`, `"12"`, `"10"`) berlatar putih dengan teks abu-abu pucat agar tidak bersaing fokus. Panel kanan (62×91%) memuat lanskap padang rumput + meja kerja kosong sejuk di bawah kalimat 2 baris `"◐ Island / The *future* of / work is on Island"` (`cap 6,7%` di y 42–60%).
    - `67-k8`: Kartu gelap `#041313` memuat tagline 2 baris rata tengah `"The *agentic* control plane / for enterprises"` (`cap 6,8%`) dengan tepat satu kata kunci `"*agentic*"` memakai kombinasi **serif italic + aksen mint `#60DDB2`** sekaligus di bawah logo `"◐ Island"`.
  - Pengukuran gerak dan tempo di vault *(belum dilihat bergerak)*: 21,1 dtk tanpa narator, dipotong ke beat musik 108 bpm (7 cut = 19,9/menit, shot median 1,5 dtk, 46 event visual/menit, 100% dalam 100 ms dari onset musik); counter digit berputar per kolom dengan `<CameraMotionBlur 200°/16>` disertai pull-back ×0,45 (0,5→1,0 dtk) dan push-in ×1,72 (2,0→2,5 dtk), geser panel footage +16,6% ke kanan dan gulir kolom statistik bertahap per langkah (7,6–15,8 dtk), serta zoom-through ×2,6 ke logo yang berdiri diam 2,7 dtk dalam hening (`−61 LUFS`).

- **Kenapa ini bekerja:**
  - Bingkai inset seragam di keempat sisi dan pertukaran polaritas dua warna dasar (putih-di-gelap ↔ gelap-di-putih) menyatukan berbagai tipe visual (angka raksasa, grid, tumpukan foto, strip berulang, daftar statistik) menjadi satu identitas Swiss yang kohesif.
  - Menampilkan angka dalam dua tahap — pertama raksasa hingga terpotong tepi kartu (`$398M` di `67-k1`, `$6.4B` di `67-k4`), kemudian ditarik mundur menjadi angka utuh berlabel (`$400M` di `67-k2`, `$6.4B valuation` di `67-k5`) — mengubah angka statis menjadi peristiwa visual yang dramatis sebelum dibaca presisi.
  - Pada kolom statistik 4 baris (`67-k7`), menahan hanya 1 kartu aktif berlatar gelap + angka mint `#60DDB2` sementara 3 kartu tetangga tetap pucat menghindari tabrakan perhatian yang sering muncul pada daftar kartu berulang.
  - Menjaga seluruh sans tetap berbobot Regular dan memindahkan seluruh beban penekanan ke ukuran ekstrem, serif italic setara tinggi cap, dan 1 warna aksen menghasilkan kontras editorial yang bersih tanpa agresivitas bold yang seragam.

- **Prinsip yang bisa dipindah ke konten lain:**
  - Ketika merangkai beberapa format metrik dalam satu video pengumuman atau rekap (tanpa talking head), pakai satu wadah kartu ber-inset seragam (±2,5% lebar, sudut bulat konsisten, 0 drop shadow) dan tukar warna dasar kartu vs bingkai untuk menandai perpindahan babak.
  - Gunakan kombinasi angka hero yang terpotong batas tepi wadah/grid (tinggi ≥ 30% frame) sebagai pembuka dampak (*impact*), lalu ikuti dengan versi utuh berlabel (rasio angka : label ≥ 4×) atau sambungkan dengan garis rambut 1 px ke label di luar kotak.
  - Dalam kolom daftar ≥ 4 kartu angka, hanya tepat 1 kartu aktif yang boleh diberi isi kontras + warna aksen; kartu lainnya wajib diredupkan ke abu pucat atau opasitas ≤ 0,35.
  - Di gaya tipografi editorial ringan, jangan memakai bold di semua tempat; gunakan sans Regular dan pindahkan penekanan ke perubahan warna aksen tunggal (maksimal 1 kata/1 angka per layar) atau satu kata serif italic setinggi cap yang sama.

- **Cara menerapkannya di konteks baru:**
  - *Skenario Jadisatu / video pengumuman milestone klien atau recap peluncuran produk 16:9 (15–25 dtk, atau diadaptasi 9:16):* gunakan bingkai inset 4 sisi `40 px` pada kanvas `1920×1080` (`radius 20 px`), polaritas bertukar antara `#F5F5F7` dan `#101216`, dan tepat 1 aksen brand (mis. `#2563EB` untuk Jadisatu atau oranye `#F7922E` untuk event). Buka dengan angka pencapaian besar (mis. `"482"` atau `"Rp1,2M"`) setinggi 38% frame (`±410 px`) yang terpotong tepi kartu di atas grid garis putus-putus `1 px`, lalu tarik ke tampilan utuh (`210 px`) dengan label pendamping `48 px` (rasio `4,37×`). Bila menayangkan 4 metrik turunan di kolom kiri (lebar `30%`), nyalakan hanya kartu teratas dengan latar gelap + angka aksen `160 px` dan redam 3 kartu di bawah ke `#D1D5DB`/`#9CA3AF`. (Catatan batas proyek: bila proyek mengunci aturan Inter-only tanpa serif seperti `ai-change-everything` D-005 atau `vibedesign-meta-carousel` D-004, ganti penekanan serif italic pada kata kunci dengan warna aksen tunggal atau kotak seleksi tipis tanpa serif).
