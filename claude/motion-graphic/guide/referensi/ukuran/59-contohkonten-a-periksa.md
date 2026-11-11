PUTUSAN: PERBAIKI

Kelengkapan belum penuh; 5 dari 6 klaim cocok. Kartu tidak diubah.

### Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur tambahan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Hex, ukuran huruf, cut, lima setup, lapisan, transisi, jumlah SFX, BPM/LUFS. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG tersedia di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Contohkonten.mp4 disebut; nama netral dijelaskan; teks dibahas rinci beserta transisi. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Shot median, transisi, LUFS, whoosh dan pop memerlukan video/audio. |
| Tidak ada aturan lama tampil teks dalam detik | Tidak | Bagian Ritme masih menuliskan pergantian kata setiap ±0,3–0,6 dtk. |

### Ukur ulang
Frame asli 720×1280; kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Nama k1–k5 merujuk nama JPEG lengkap di bawah.
Tinggi huruf = puncak sampai dasar huruf terlihat, tanpa glow/bayangan. WIN dan siluet dianotasi visual; teks lain dimask warna; warna = median RGB patch.
Selisih ukuran relatif terhadap batas rentang terdekat; posisi dalam poin persen (pp); warna per kanal RGB. Batas cocok: 15%, 5 pp, dan 20/kanal.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi WIN | 57,9% tinggi | k1 (66,80,653,800) | 720 px = 56,25% | 2,85% relatif | Ya |
| Rasio ROOM : the | 2,6–4,5× | k2 ROOM (193,692,536,801); the (339,661,389,684) | 109/23 = 4,74× | 5,31% relatif | Ya |
| Pusat y kata raksasa RECAP | 25–35% (Cek kemiripan) | k3 (177,212,541,393) | y=302,5 px = 23,63% | 1,37 pp | Ya |
| Tinggi huruf LED, baris SPON | 9,5–10% tinggi/baris | k4, huruf P (243,588,332,708) | 120 px = 9,38% | 1,32% relatif | Ya |
| Lebar subjek wide duduk | 35–45% lebar | k1 (102,299,682,1280) | 580 px = 80,56% lebar | 79,01% relatif | Tidak |
| Latar putih kemerahan | #E8D5D7 | k5 (600,700,700,1100) | #F1E7E8, RGB (241,231,232) | RGB (9,18,17) | Ya |

Nama frame: k1=`59-k1-judul-kotak-belakang.jpg`; k2=`59-k2-kolase-kartu.jpg`; k3=`59-k3-kartu-foto-hitam.jpg`; k4=`59-k4-layar-led.jpg`; k5=`59-k5-putih-profil-kurva.jpg`.
Lebar subjek meliputi tangan kiri sampai ujung sepatu kanan, tanpa kursi/laptop; ketidakpastian batas ±3 px tidak mengubah hasil. Latar k5 bergradasi; warna di atas berlaku pada patch tersebut.
Skrip: `periksa_scripts/ukur.py`; angka mentah: `periksa_scripts/hasil.json`; bukti kotak: `periksa_scripts/kotak-k*.jpg`.

### Terlihat tetapi tidak tertulis
- `59-k1-judul-kotak-belakang.jpg`: permukaan huruf WIN memiliki tekstur titik rapat, bukan merah polos; dot-matrix dalam kartu hanya disebut untuk LED.
- `59-k3-kartu-foto-hitam.jpg`: RECAP memiliki lapisan pucat/abu-abu bergeser di belakang tepi huruf, selain muka merah gelap; ekstrusi dalam kartu hanya dijelaskan untuk chip close-up.
- `59-k6-closeup-label.jpg`: kata kecil The/is/not/a masing-masing berada di keping merah tua tersendiri; kartu merinci chip putih untuk RECAP/BONUS, belum keping kata sambung ini.

### Usul koreksi angka
- Lebar subjek wide duduk pada k1: **80,6% lebar frame** (580/720 px), dibanding 35–45% di kartu.
