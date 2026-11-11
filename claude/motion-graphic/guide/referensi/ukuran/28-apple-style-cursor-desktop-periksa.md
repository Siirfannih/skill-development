PUTUSAN: PERBAIKI

Kelengkapan belum penuh; 5 dari 6 klaim terukur cocok.

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading mengikuti template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur ditambahkan sesuai permintaan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | 1: hex/grid; 2: cap/posisi; 3: cut; 4: lanskap/jendela; 5: ukuran/lapis; 6: skala/pan; 7: onset; 8: BPM/LUFS. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, semuanya 1080×608. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Applestyele.mp4 → visual Apple style; warna, grafik/skala/kedalaman, kamera/transisi paling diperinci. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Butir terakhir menyatakan kamera tidak diam kecuali penutup; kontinuitas gerak memerlukan video. Still berurutan hanya memperlihatkan perubahan skala pada saat yang dicuplik. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu pada ritme/transisi menjelaskan babak sumber, bukan ketentuan lama tampil teks. |

## Ukur ulang
Koordinat pada JPG 1080×608; kotak (x0,y0,x1,y1), kanan/bawah eksklusif. Persentase terhadap frame penuh.
Tinggi huruf: tinta dari puncak tertinggi sampai garis dasar, tanpa glow; pusat memakai kotak tinta yang sama.
Lebar panel: batas panel, tanpa halo. Warna: median RGB area datar, tanpa kursor/tepi.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi cap Hi | 21,2% H | 28-k1-grid-teks.jpg (466,244,610,366) | 122 px = 20,07% H | 5,35% relatif | Ya |
| Pusat Hi x/y | 50% / 50% | 28-k1-grid-teks.jpg (466,244,610,366) | 49,81% / 50,16% | 0,19 / 0,16 poin persen | Ya |
| Tinggi label Motion | ±4–5% H | 28-k3-tag-neon-kursor.jpg (583,96,793,147) | 51 px = 8,39% H | 67,76% relatif terhadap batas terdekat 5% | Tidak |
| Lebar kartu profil | ±56% W | 28-k4-kartu-tile.jpg (232,233,848,370) | 616 px = 57,04% W | 1,85% relatif | Ya |
| Lebar dock | ±52% W | 28-k5-dock-lanskap.jpg (266,241,850,367) | 584 px = 54,07% W | 3,99% relatif | Ya |
| Biru batang timeline | #2260E9 | 28-k2-timeline-gelap.jpg (170,385,680,410) | RGB 34,96,233 = #2260E9 | ΔRGB 0,0,0 | Ya |

Ambang: ukuran ≤15% relatif; posisi ≤5 poin persen; warna tiap kanal ≤20. Label Motion tetap 51–52 px pada ambang tinta 170/190/210, sehingga selisihnya bukan akibat glow tipis. Nilai perkiraan kartu dibandingkan dengan batas rentang terdekat.
Skrip mandiri: periksa_scripts/ukur.py; hasil mentah: periksa_scripts/hasil.json. ffprobe sumber: 1280×720, 30 fps, 577 frame, durasi kontainer 19,369375 dtk; cut/menit tidak termasuk enam klaim yang dipilih.

## Terlihat tetapi tidak tertulis
- 28-k2-timeline-gelap.jpg: track memuat penanda belah ketupat abu dan bentuk jam pasir pucat di antara batang berwarna.
- 28-k4-kartu-tile.jpg: kartu pusat memiliki avatar siluet hitam dalam kotak putih bertepi oranye di kiri, serta tombol lingkaran oranye dengan tanda tambah putih di kanan.
- 28-k6-monitor-jendela.jpg: monitor berbingkai hitam dengan bezel bawah lebih tebal dan satu tiang hitam tengah yang terpotong tepi bawah frame.

## Usul koreksi angka
- Tinggi label neon pada k3: ±4–5% → 8,39% tinggi frame untuk label Motion (51 px dari 608 px).
