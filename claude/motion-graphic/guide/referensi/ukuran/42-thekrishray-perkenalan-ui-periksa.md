PUTUSAN: LAYAK

Kelengkapan penuh; **5 dari 6 klaim cocok** menurut toleransi yang ditetapkan.

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib hadir dan berurutan; tambahan Proporsi terukur sesuai permintaan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Bagian 1–8 spesifik; bagian 4 secara eksplisit menyebut seluruh visual berupa grafik UI, emoji/ikon dan teks tanpa footage/wajah. |
| Proporsi terukur bertabel per jenis adegan | Ya | Sembilan jenis adegan, termasuk nama penutup. |
| Ada 6–8 frame kunci | Ya | Delapan berkas 42-k1 sampai 42-k8 di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama asli dicantumkan, tidak mengandung penunjuk bagian; pilihan UI, SFX dan kamera dijabarkan paling rinci di bagian 5–7. |
| Cek kemiripan dapat dicek dari still | Ya | Komponen, ukuran, posisi, warna, tipografi dan lapisan dapat dibandingkan; morph menggunakan rangkaian still. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka detik merujuk kejadian sumber, gerak kamera atau audio; tidak menetapkan lama tampil teks. |

## Ukur ulang
Semua frame 720×720. Kotak (x0,y0,x1,y1) memakai batas kanan/bawah eksklusif. Nama frame lengkap ditulis pada tabel.
Tinggi k1 mencakup ascender–descender, sesuai tinggi penuh kalimat di tabel kartu. Ukuran memakai batas tinta/permukaan; warna memakai median piksel tanpa teks.
Toleransi: ukuran relatif ≤15%; posisi ≤5 poin persen (pp); warna selisih absolut tiap kanal ≤20. Skala dua sumbu harus lolos keduanya.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kalimat pembuka | 6,4% H | 42-k1-teks-emoji.jpg (89,323,647,367) | 44 px = 6,11% H | 4,51% relatif | Ya |
| Lebar teks panel | 58% W | 42-k2-panel-gradien.jpg (118,319,597,380) | 479 px = 66,53% W | 14,70% relatif | Ya |
| Warna latar tengah panel | #B1D2EB | 42-k2-panel-gradien.jpg (320,300,400,420) | #4C99F3; RGB (76,153,243) | ΔRGB (101,57,8) | Tidak |
| Skala kartu harga | 58×54% frame | 42-k3-ui-harga.jpg (172,160,582,547) | 410×387 px = 56,94×53,75% | W 1,82%; H 0,46% relatif | Ya |
| Warna isi gelembung | #0B80F2 | 42-k5-gelembung.jpg (250,260,460,276) | #0981F1; RGB (9,129,241) | ΔRGB (2,1,1) | Ya |
| Pusat vertikal judul platform | y 30% | 42-k6-pemilih-platform.jpg (156,197,560,248) | y 222,5 px = 30,90% H | 0,90 pp | Ya |

Lebar panel dekat batas: variasi ambang tinta RGB 140–185 menghasilkan 479–480 px, selisih relatif 14,70–14,94%; tetap cocok. Warna pusat panel memakai 8.712 piksel biru dalam kotak, dengan teks terang dikeluarkan.
Skrip: periksa_scripts/ukur.py; hasil mentah: periksa_scripts/hasil.json; kotak visual: periksa_scripts/*-kotak.png. Pencocokan mandiri ke video sumber tersimpan di periksa_scripts/sumber.json (k1 1,6 s; k2 3,0 s; k3 6,6 s; k5 19,0 s; k6 21,6 s).

## Terlihat tetapi tidak tertulis
- 42-k1-teks-emoji.jpg: identitas dan susunan emoji spesifik: tangan melambai kiri atas, palet kanan atas, wajah berkacamata kiri bawah, monitor kanan bawah.
- 42-k2-panel-gradien.jpg: dua ornamen kiri berupa tanda tambah berujung bulat; dua ornamen kanan berbentuk bintang empat ujung cekung, dengan ukuran atas/bawah berbeda.
- 42-k4-chat-gelap.jpg: kontrol lampiran berupa pil biru yang memuat ikon gambar bertumpuk, garis pemisah vertikal, dan tanda X.
- 42-k5-gelembung.jpg: kedua gelembung rata kanan, masing-masing berekor ke kanan bawah; keterangan Read berada tepat di bawah gelembung kedua dekat tepi kanannya.
- 42-k6-pemilih-platform.jpg: logo X berada pada ikon hitam membulat dengan kilap dan bibir terang, di atas bidang putih bagian dalam yang terpisah dari ubin putih luar.

## Usul koreksi angka
- Latar tengah panel pada 42-k2-panel-gradien.jpg: #B1D2EB → **#4C99F3** (RGB 76,153,243), berdasarkan sampel pusat tanpa teks pada frame ini.
