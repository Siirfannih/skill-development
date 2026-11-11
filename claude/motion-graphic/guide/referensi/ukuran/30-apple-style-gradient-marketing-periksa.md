PUTUSAN: LAYAK

Kelengkapan diperiksa terhadap KARTU-TEMPLATE.md; 5 dari 6 klaim cocok.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading tetap template ada; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Bagian 1–8 masing-masing memuat hex, proporsi, hitungan, gerak, atau ukuran audio. |
| Proporsi terukur, tabel per jenis adegan | Ya | Delapan baris jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, k1–k8. |
| Diambil untuk sesuai file dan paling rinci | Ya | Apple Styele.mp4 → visual/gerak UI; bagian 1, 2, 5, 6 paling rinci. |
| Cek kemiripan dapat diperiksa dari still | Ya | Warna, ukuran, posisi, lapisan, kartu bulat, dan keadaan aktif daftar. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Durasi yang dicatat adalah observasi ritme/gerak; bukan aturan lama membaca teks. |

Ukur ulang memakai JPG 1080×608. Video sumber terkonfirmasi 1276×718, 30 fps, 44,633 dtk.
Kotak (x0,y0,x1,y1) berpangkal kiri atas; x1/y1 eksklusif. Tinggi kapital/asender: puncak sampai baseline, tanpa descender; pusat blok mencakup descender.
Untuk klaim rentang, selisih dihitung ke batas terdekat. Ambang ukuran ≤15% relatif, posisi ≤5 poin persen, warna ≤20 tiap kanal.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital hero Now | 49–52% tinggi | 30-k1-hero-gradien.jpg; N (82,72,390,426) | 354 px = 58,22% | 11,97% relatif ke 52% | Ya |
| Tinggi kapital Worth knowing about | 7,9% tinggi | 30-k2-kalimat-kolase.jpg; W (256,271,320,318) | 47 px = 7,73% | 2,15% relatif | Ya |
| Pusat blok Worth knowing about | x 50%; y 50% | 30-k2-kalimat-kolase.jpg; (256,271,835,333) | x 50,51%; y 49,67% | x 0,51; y 0,33 poin persen | Ya |
| Tinggi HP+tangan | ±60% tinggi | 30-k3-hero-ui-gradien.jpg; (197,227,737,608) | 381 px = 62,66% | 4,44% relatif | Ya |
| Lebar kartu kolase | 6–12% lebar | 30-k2-kalimat-kolase.jpg; balon (38,412,205,578); perempuan (855,336,1022,503); minuman (783,0,949,125) | 167; 167; 166 px; median 15,46% | 28,86% relatif ke 12% | Tidak |
| Warna teks daftar nonaktif | #CECCCF | 30-k5-daftar-ui.jpg; Socials (126,216,391,288) | Median inti #C6C4C7, RGB (198,196,199) | RGB (8,8,8) | Ya |

Metode: segmentasi warna jenuh untuk N/kartu; piksel hitam untuk teks; siluet gelap untuk tinggi HP+tangan; median inti huruf setelah erosi 3×3 untuk abu. Bagian bawah tangan terpotong frame; yang diukur bagian terlihat.
Skrip: periksa_scripts/ukur_independen.py; hasil lengkap, kotak, ambang, dan SHA-256 bahan: periksa_scripts/hasil_ukur.json.

Terlihat tetapi tidak tertulis:
- 30-k3-hero-ui-gradien.jpg: kolom gradien dipisahkan sambungan vertikal lurus yang terlihat jelas, meskipun warna di dalamnya buram.
- 30-k3-hero-ui-gradien.jpg: perspektif layar HP membentuk trapesium yang melebar ke bawah.
- 30-k6-autopilot-kolase.jpg: kartu saling menimpa dan kolase terpotong oleh keempat tepi frame.
- 30-k5-daftar-ui.jpg: foto produk berupa close-up botol miring pada panel ungu; botol terpotong batas panel.

Usul koreksi angka:
- Lebar kartu kolase pada k2: 15,37–15,46% lebar frame (166–167 px; median 15,46%), menggantikan perkiraan 6–12% untuk adegan ini.
