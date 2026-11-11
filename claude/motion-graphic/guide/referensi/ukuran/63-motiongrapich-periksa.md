PUTUSAN: PERBAIKI

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur merupakan tambahan wajib. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | §1 hex; §2 proporsi huruf; §3 cut/menit; §4 wallpaper dan klip podcast; §5 empat thumbnail; §6 faktor zoom; §7 centroid; §8 LUFS. |
| Proporsi terukur berupa tabel per jenis adegan | Ya | Delapan jenis adegan, dock sampai end card. |
| Ada 6–8 frame kunci | Ya | Delapan berkas k1–k8 tersedia. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Motiongrapich.mp4 → motion graphic; §5–6 merinci aksi UI, lapisan, skala, kamera, dan transisi. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Butir “kata baru … lalu menjadi hitam” memerlukan urutan gambar untuk memastikan perubahan warna. |
| Tidak ada ketentuan waktu tampil teks dalam detik | Tidak | §2 mencatat “Judul kinetik (2–3 dtk)”; template melarang mencatat kapan/lama teks tampil di bagian ini. Durasi gerak masuk ±0,2 dtk/kata tidak dipersoalkan. |

Ukur ulang memakai video asli 736×414, 30 fps. Kotak (x0,y0,x1,y1), kanan/bawah eksklusif. Tinggi tinta sampai baseline, tanpa blur samar; panel tanpa bayangan; warna median RGB bidang isi tanpa ikon/teks, setelah komposit.
Frame vNNN.png berada di periksa_scripts/: v067=2,233 dtk dan v083=2,767 dtk melengkapi fase judul k2; v255=8,500 dtk (k5); v615=20,500 dtk (k7). K2 terlampir sendiri sedang mengecil.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi “Your” fase besar | 15,9% tinggi | v067.png (276,172,470,238) | 66 px = 15,94% | Relatif 0,26% | Ya |
| Rasio tinggi judul besar : baris akhir | 2,5× | v067.png (276,172,470,238); v083.png (234,192,502,219) | 66/27 = 2,44× | Relatif 2,22% | Ya |
| Lebar kotak prompt kaca | ±60% lebar | v255.png/k5 (149,178,606,273) | 457 px = 62,09% | Relatif 3,49% | Ya |
| Skala jendela editor | Tinggi 57–61%; lebar 56–60% | v615.png/k7 (290,88,706,326) | 238×416 px = tinggi 57,49%; lebar 56,52% | Keduanya dalam rentang; jarak ke rentang 0 | Ya |
| Latar tengah kartu judul | #FDF8FC | v083.png (355,160,381,180) | #FDFAFE; RGB (253,250,254) | ΔRGB (0,2,2) | Ya |
| Aksen tombol kirim | #E4550F | v255.png/k5 (574,246,578,257) | #C16248; RGB (193,98,72) | ΔRGB (35,13,57) | Tidak |

Toleransi: ukuran/rasio ≤15% relatif; warna setiap kanal ≤20. Ambang tinta 120–180 menghasilkan tinggi 15,70–15,94% dan rasio 2,36–2,44×: putusan tetap. Warna tombol pada JPEG k5 juga gagal toleransi: RGB (185,92,75), ΔRGB (43,7,60).

Terlihat tetapi tidak tertulis:
- 63-k3-pil-tab-mosaik.jpg: sebagian kotak mosaik hanya berupa garis tipis terang; kotak terisi dan ruang hitam membentuk kisi yang berlubang.
- 63-k5-prompt-kaca.jpg: bunga paling depan sangat buram, sementara bunga lebih jauh dan langit lebih tajam; keburaman tidak hanya berada di balik kaca prompt.
- 63-k6-chat-klip.jpg: sisi kiri dan kanan deretan thumbnail menggelap bertahap hingga hampir hitam, membentuk vignette pada strip klip.

Usul koreksi angka:
- Warna tampak tombol kirim pada k5: #C16248 (RGB 193,98,72). Nilai ini khusus tombol pada frame tersebut, bukan pengganti semua aksen.

Hasil: 5 dari 6 klaim cocok. Kelengkapan belum penuh, sehingga PERBAIKI. Skrip: periksa_scripts/ukur_independen.py; hasil rinci: periksa_scripts/hasil_ukur.json; bukti kotak: periksa_scripts/kotak-terukur.png.
