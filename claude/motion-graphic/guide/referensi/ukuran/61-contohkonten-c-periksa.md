PUTUSAN: PERBAIKI

Kelengkapan belum penuh; 4 dari 6 klaim cocok. Pemeriksaan hanya mengukur dan melaporkan.

### Kelengkapan

| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai; tambahan Proporsi terukur tersedia. |
| Delapan bagian spesifik | Ya | Warna berhex; teks berproporsi; ritme bercut; footage, grafik, kamera, SFX, musik memiliki contoh/angka. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan baris, dari wajah + caption sampai CTA. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, 61-k1 sampai 61-k8. |
| Diambil untuk sesuai nama dan bagian terpilih paling rinci | Ya | Nama Contohkonten2.mp4 disebut; nama generik dijelaskan; teks dipilih pertama dan bagian 2 paling rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Dua butir terakhir memerlukan waktu/audio: cut, shot median, push-in/jump cut, drop musik, sub-boom. |
| Tidak ada aturan lama durasi tampil teks | Ya | Angka 1 frame/0,4 dtk menjelaskan animasi masuk, bukan lama teks ditahan. |

### Ukur ulang

Semua koordinat pada frame 720×1280, format (x0,y0,x1,y1), batas akhir eksklusif; nama lengkap frame ada di hasil.json.
Huruf diukur dari isi terang, tanpa glow/bayangan, puncak sampai baseline. WASTE memakai E/T yang tidak tertutup rambut; pengantar memakai “which is” tanpa descender. Otak = jaringan otak termasuk serebelum, tanpa siluet kepala.
Selisih ukuran relatif terhadap angka kartu; rentang dibandingkan ke batas terdekat, posisi dalam poin persen (pp); warna median patch RGB.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi FORGET | 11,6% H | 61-k3-kartu-judul.jpg (209,211,512,393) | 182 px = 14,22% H | +22,6% relatif | Tidak |
| Tinggi WASTE | 15,2% H | 61-k2-kata-besar-belakang-kepala.jpg (439,246,595,441), E/T | 195 px = 15,23% H | +0,23% relatif | Ya |
| Rasio WASTE : pengantar | 6–9× | 61-k2-kata-besar-belakang-kepala.jpg (439,246,595,441) / (81,174,236,198) | 195/24 = 8,13× | 0; dalam rentang | Ya |
| Pusat blok WASTE | x 50%; y 14–25% | 61-k2-kata-besar-belakang-kepala.jpg (126,246,595,441) | x 50,07%; y 26,84% | x +0,07 pp; y +1,84 pp dari batas 25% | Ya |
| Skala otak, lebar × tinggi | 20 × 23% frame | 61-k5-split-ilustrasi.jpg (228,304,460,499) | 232×195 px = 32,22 × 15,23% | lebar +61,1%; tinggi −33,8% relatif | Tidak |
| Latar pojok kartu judul | #31080C | 61-k3-kartu-judul.jpg (0,0,40,40) | median RGB (49,8,12) = #31080C | ΔRGB (0,0,0) | Ya |

Ambang: ukuran ≤15% relatif; posisi ≤5 pp; warna tiap kanal ≤20. Posisi WASTE lulus toleransi meski di luar rentang nominal.
Skrip: periksa_scripts/ukur.py; hasil mentah: periksa_scripts/hasil.json; gambar kotak ukur: periksa_scripts/*_kotak.jpg. Jalankan dengan ~/work/mg-venv/bin/python periksa_scripts/ukur.py.

### Terlihat tetapi tidak tertulis

- 61-k3-kartu-judul.jpg: gagang beberapa kunci berbentuk hati, bukan lingkaran biasa.
- 61-k3-kartu-judul.jpg: garis busur sangat tipis dengan ornamen bintang empat titik membingkai kipas kunci.
- 61-k3-kartu-judul.jpg: isi huruf FORGET memiliki guratan/retakan gelap; tekstur huruf berbeda dari glow dan tekstur panel yang sudah dicatat.
- 61-k6-kunci-closeup.jpg: bidang gelap vertikal sangat buram di tepi kiri menjadi lapisan depan tambahan.

### Usul koreksi angka

- Tinggi FORGET pada k3: 11,6% → 14,22% tinggi frame (182 px; tanpa glow).
- Skala otak pada k5: 20 × 23% → 32,22 × 15,23% frame (232×195 px; jaringan otak).
