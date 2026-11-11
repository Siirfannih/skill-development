PUTUSAN: PERBAIKI

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Termasuk bagian 4: still lanskap render 3D dan avatar memoji. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Audio.mp4 → SFX + musik; bagian 7–8 memuat kosakata, frekuensi, level, pasangan bunyi dan perubahan spektrum. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Dua butir terakhir memerlukan audio: RMS/jarak bunyi/frekuensi hit serta puncak akhir/true peak. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Bagian teks tidak menetapkan durasi; waktu pada ritme merupakan pengamatan urutan sumber. |

Ukur ulang: 5/6 klaim cocok. Skrip: `periksa_scripts/ukur.py`, Python mg-venv, PIL/numpy/OpenCV; video sumber 1280×720, 24 fps.
Skrip mencari frame video terdekat dengan setiap JPG; kotak tabel berikut memakai piksel VIDEO SUMBER, bukan JPG 1080×608. Koordinat (x0,y0,x1,y1), ujung kanan/bawah eksklusif.
Tinggi ascender diukur dari puncak huruf sampai baseline pada “chaotic and” (tanpa descender); x-height dari huruf “u” utuh. Pusat memakai kotak seluruh kalimat; hub mencakup teks, konektor dan kotak aplikasi. Warna memakai median patch kosong.
Batas cocok: ukuran relatif ≤15%; posisi ≤5 poin persen; RGB setiap kanal ≤20. Selisih ukuran dihitung terhadap nilai kartu.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi ascender kalimat pembuka | 5,6% H | 23-k1-ketik-glitch.jpg ↔ 1,500 dtk; (350,335,611,375) | 40 px = 5,56% H | 0,8% relatif | Ya |
| X-height kata raksasa | 62% H | 23-k3-kata-raksasa.jpg ↔ 6,500 dtk; (166,227,543,670) | 443 px = 61,53% H | 0,8% relatif | Ya |
| Pusat blok kalimat gelap | cx 50–53%; cy 50% | 23-k4-kalimat-gelap.jpg ↔ 9,000 dtk; (284,337,996,383) | cx 50,00%; cy 50,00% | 0 pp dari rentang | Ya |
| Lebar pil fitur aktif | ±31% W | 23-k5-daftar-fitur.jpg ↔ 12,500 dtk; (356,315,924,405) | 568 px = 44,38% W | 43,1% relatif | Tidak |
| Skala seluruh diagram hub | 81% W × 65% H | 23-k6-diagram-hub.jpg ↔ 18,000 dtk; (90,126,1129,592) | 1039×466 px = 81,17% W × 64,72% H | 0,2% / 0,4% relatif | Ya |
| Warna latar oranye | #FC4D00 | 23-k6-diagram-hub.jpg ↔ 18,000 dtk; (24,24,356,178) | RGB (252,77,0) = #FC4D00 | ΔRGB (0,0,0) | Ya |

Kontrol resolusi: pil pada JPG juga 44,44% W, sehingga ketidakcocokan bukan akibat resize. Patch warna JPG #ED4004 berbeda dari sumber; penilaian warna memakai video sumber.

Terlihat tetapi tidak tertulis:
- 23-k6-diagram-hub.jpg: “9000+” memiliki sublabel “Supported apps” pada baris kedua, dengan ukuran lebih kecil dan rata kiri.
- 23-k6-diagram-hub.jpg: empat kotak aplikasi tersusun satu kolom di kanan garis vertikal bersama; tidak tampak kepala panah pada konektor.

Usul koreksi angka:
- Lebar pil fitur aktif pada k5: 31% → 44,4% lebar frame.

Dasar putusan: syarat angka terpenuhi (5/6), tetapi kelengkapan belum penuh karena pemeriksaan audio dalam Cek kemiripan tidak dapat dilakukan dari still.
