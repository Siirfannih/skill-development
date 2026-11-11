PUTUSAN: LAYAK

Kelengkapan penuh; 5 dari 6 klaim cocok. Kartu tidak diubah.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai; Proporsi terukur ditambahkan sesuai tugas. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | §1 hex/material; §2 cap/font; §3 cut; §4 seluruhnya CG; §5 objek/skala; §6 truck/push; §7 bunyi/waktu; §8 BPM/LUFS. |
| Proporsi terukur berupa tabel per jenis adegan | Ya | Grafik, kartu kata, ikon merah, profit, watermark. |
| Ada 6–8 frame kunci | Ya | Enam JPG di keyframes/. |
| Diambil untuk sesuai nama file dan bagiannya paling rinci | Ya | GatesFX tidak menyebut teknik; pilihan cahaya/warna dan maskot dirinci di §1/§5 serta tabel proporsi. |
| Cek kemiripan dapat dicek dari still | Ya | Warna, skala, posisi, jumlah objek, rim light dan watermark terlihat. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu yang dicatat merujuk shot, cut, kamera dan audio; bukan kewajiban durasi teks. |

Ukur ulang: koordinat piksel asli 720×1280, (x0,y0,x1,y1), batas akhir eksklusif. Selisih relatif terhadap angka kartu; posisi memakai poin persentase (pp).

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi cap DISCIPLINE | 2,2% tinggi | 58-k2-kartu-kata-kunci.jpg; (360,619,614,648) | 29 px = 2,266% | 2,98% relatif | Ya |
| Rasio tinggi angka : label Profit | 3,4× | 58-k5-penghitung-profit.jpg; angka (279,321,584,382), label (163,296,232,315) | 61/19 = 3,211× | 5,57% relatif | Ya |
| Pusat teks angka profit | (60%,27%) | 58-k5-penghitung-profit.jpg; (279,321,584,382) | (59,931%,27,461%) | x 0,069 pp; y 0,461 pp | Ya |
| Diameter kepala shot 3 | 19% lebar | 58-k3-karakter-ikon-masuk.jpg; (290,484,430,624) | 140 px = 19,444% lebar | 2,34% relatif | Ya |
| Warna garis merah | #812B39 = RGB(129,43,57) | 58-k4-karakter-ikon-lengkap.jpg; (50,265,200,390) | Median inti RGB(78,44,50) ≈ #4E2C32 | ΔRGB=(51,1,7); merah >20 | Tidak |
| Cut per menit | 14 | GatesFX_ssspin.io_1794219240.mp4; f53/f98/f278, (0,0,720,940) | 3 cut/12,8 dtk ×60 = 14,063/menit | 0,45% relatif | Ya |

Metode: PIL/numpy/cv2; skrip periksa_scripts/ukur.py, hasil mentah periksa_scripts/hasil.json.
Cap diukur dari puncak huruf sampai batas bawah tinta pada garis dasar, tanpa tepi kartu; sampel huruf tengah menghindari sisi kartu dan ujung gradien yang memutih.
Kepala memakai komponen siluet luma >30; ambang 20–35 menghasilkan lebar yang sama. Warna memakai piksel berkroma merah tertinggi per kolom pada segmen garis terisolasi (150 kolom), lalu median kanal; bukan glow latar.
Cut dideteksi dari beda luma antarframe pada area di atas watermark, lalu diperiksa lewat contact sheet video-overview.jpg; waktunya 1,767/3,267/9,267 dtk.

Terlihat tetapi tidak tertulis:
- 58-k1-grafik-naik-karakter.jpg: wajah memiliki dua mata oval putih dan satu mulut kecil terbuka; k3/k4 hanya memperlihatkan dua mata.
- 58-k2-kartu-kata-kunci.jpg: sudut kiri bawah kartu tertutup bahu/badan maskot, sehingga kartu memiliki hubungan tumpang tindih yang jelas dengan tubuh.
- 58-k4-karakter-ikon-lengkap.jpg: busur tipis memiliki titik putih kecil di kedua ujung dan di puncaknya.
- 58-k5-penghitung-profit.jpg: beam berbentuk segitiga berpuncak tajam dengan bidang kanan lebih terang dan batas bidang lurus yang terlihat.

Usul koreksi angka:
- Garis merah, sampel k4 (50,265,200,390): #812B39 → sekitar #4E2C32 (median inti garis pada still).
