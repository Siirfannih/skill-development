PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Dua kelompok, bagian 1–8, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Termasuk bagian 4: seluruhnya vektor/UI, ikon aplikasi dan emoji Apple. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG k1–k8 tersedia dan dicocokkan ke video sumber. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Motionkonsep.mp4 → motion graphic; bagian 5–6 merinci komponen, skala, lapisan, kamera. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir terakhir memerlukan audio: pop/ding, level SFX terhadap suara, bpm. |
| Tidak ada aturan lama durasi tampil teks | Ya | Penanda waktu menunjukkan kejadian; 0,4 dtk dicatat sebagai ritme potongan, bukan aturan tahan teks. |

Ukur ulang — 5 dari 6 klaim cocok.
Semua frame 720×720; kotak (x0,y0,x1,y1) berujung eksklusif. Ukuran relatif terhadap nilai kartu; posisi dalam poin persen (pp).
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Pusat vertikal blok teks k1, tabel Proporsi | y 43% | 71-k1-teks-emoji.jpg (86,331,650,376) | y 49,10%; x 51,11% | +6,10 pp pada y | Tidak |
| Latar biru k2 | #579FF4–#6EACF5 | 71-k2-pil-gradien.jpg (300,450,420,520) | median #4C9AF3; RGB (76,154,243) | terhadap #579FF4: ΔRGB (11,5,1) | Ya |
| Skala kartu k3, lebar×tinggi | 56×52% | 71-k3-kartu-ui.jpg (174,166,576,544) | 402×378 px = 55,83×52,50% | 0,30% / 0,96% | Ya |
| Tinggi huruf chat k4, puncak–baseline | 2,8% | 71-k4-chat-gelap.jpg (116,346,119,366), huruf I | 20 px = 2,78% | 0,79% | Ya |
| Blok dua gelembung k5, lebar×tinggi | 55×28% | 71-k5-gelembung.jpg (170,251,538,436) | 368×185 px = 51,11×25,69% | 7,07% / 8,23% | Ya |
| Ubin carousel k6, lebar×tinggi | ±30×27% | 71-k6-carousel.jpg (254,306,463,500) | 209×194 px = 29,03×26,94% | 3,24% / 0,21% | Ya |

Metode: komponen piksel tinta gelap untuk kotak teks lengkap (termasuk descender); huruf I kapital tanpa descender untuk tinggi chat; median RGB bidang kosong untuk warna.
Batas kartu memakai bidang abu netral (rentang kanal <7, rerata 210–245), gelembung memakai dominasi biru, ubin memakai bidang putih; halo/bayangan dikecualikan. Blok gelembung mencakup ekor dan celah, tanpa label Read.
Skrip: periksa_scripts/ukur.py; hasil rinci: periksa_scripts/hasil.json dan komponen.json. Pencocokan sumber: periksa_scripts/cocok_sumber.py dan cocok_sumber.json.

Terlihat tetapi tidak tertulis
- 71-k2-pil-gradien.jpg: dua tanda tambah di kiri dan dua bintang empat ujung di kanan, dengan ukuran berbeda.
- 71-k3-kartu-ui.jpg: label ujung "$0" dan "$1000" berada di bawah pil biru, masing-masing di kiri dan kanan kartu.
- 71-k4-chat-gelap.jpg: baris kontrol bawah berisi tombol tambah, chip biru bergambar tumpukan kartu dan ×, pil Flash, serta mikrofon.
- 71-k5-gelembung.jpg: kedua gelembung memiliki ekor di kanan bawah; tepi kanan keduanya hampir sejajar, sedangkan tepi kiri berbeda jauh.
- 71-k6-carousel.jpg: logo Instagram berada pada bidang persegi membulat tambahan di dalam ubin putih, sehingga terlihat bingkai bertingkat.

Usul koreksi angka
- Pusat vertikal teks k1 pada tabel Proporsi terukur: 43% → 49,10% tinggi frame.

Dasar putusan: satu butir kelengkapan tidak terpenuhi; ambang minimal lima klaim cocok sudah terpenuhi.
