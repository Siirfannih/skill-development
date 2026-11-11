PUTUSAN: LAYAK

Kelengkapan penuh; 5 dari 6 klaim cocok menurut toleransi tugas.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai lengkap. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Hex, tinggi-x, cut, jenis footage, lapisan, zoom, bunyi, BPM/LUFS. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG k1–k8 tersedia. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Contohkonten1.mp4 cocok dengan sumber; nama generik diakui; teks menjadi uraian paling rinci, zoom diperinci di bagian 6. |
| Cek kemiripan dapat diperiksa dari still | Ya | Bentuk, ukuran, posisi, warna, lapisan; zoom meminta pasangan still awal/berikutnya. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Durasi fade/zoom serta pergantian latar merupakan pengamatan gerak/ritme; tidak ada batas lama baca teks. |

Ukur ulang memakai JPEG 1080×608, kotak `(x0,y0,x1,y1)` dengan batas akhir eksklusif. kN merujuk nama lengkap di bawah. Tinggi-x memakai badan huruf kecil sampai garis dasar, tanpa ascender/descender; kepala mencakup rambut sampai dagu, tanpa leher. Kotak kepala ditandai manual dengan ketidakpastian ±2 px; teks disegmentasi berdasarkan warna. Warna memakai median area polos. Selisih ukuran terhadap batas terdekat rentang kartu; posisi dalam poin persen (pp).

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi-x amplified | 13,9% H | k2, a: (231,236,315,321) | 85 px = 13,98% H | 0,58% relatif | Ya |
| Rasio kata besar : sambung | 4–8× | k3, o besar: (257,250,395,407); o pada go: (736,223,755,242) | 157/19 = 8,26× | 3,29% relatif terhadap 8× | Ya |
| Pusat blok teks apit | kiri x22%, kanan x77%; y44% | k1, kiri: (202,254,282,287); kanan: (754,250,914,284) | kiri (22,41%;44,49%); kanan (77,22%;43,91%) | maksimum 0,49 pp | Ya |
| Tinggi kepala A-roll | ±20% H | k1: (463,89,616,279) | 190 px = 31,25% H | 56,25% relatif | Tidak |
| Latar kartu kuning | #F6B849 | k4: (50,50,250,200) | RGB(246,184,73), #F6B849 | ΔRGB=(0,0,0) | Ya |
| Tinggi-x lego blocks | 10,0–10,3% H | k6, o pada lego: (422,185,484,248) | 63 px = 10,36% H | 0,60% relatif terhadap 10,3% | Ya |

Nama frame: k1=`60-k1-wajah-teks.jpg`; k2=`60-k2-siluet-kata-belakang.jpg`; k3=`60-k3-kata-besar-wajah.jpg`; k4=`60-k4-kartu-kuning.jpg`; k6=`60-k6-ilustrasi-lego.jpg`.
Sumber terkonfirmasi lewat ffprobe: 1276×718, 25 fps, durasi 35,430794 detik. Enam pengukuran di atas berasal dari frame kunci, bukan data penulis. Skrip: `periksa_scripts/ukur.py`; hasil: `periksa_scripts/hasil.json`; komponen: `periksa_scripts/komponen.json`.

Terlihat tetapi tidak tertulis

- `60-k1-wajah-teks.jpg`: presenter memegang mikrofon kecil hitam dekat mulut; tangan satunya bergerak di sisi kiri gambar.
- `60-k2-siluet-kata-belakang.jpg`: siluet berprofil menghadap kanan dengan topi berlidah yang membentuk kontur kepala.
- `60-k3-kata-besar-wajah.jpg`: wajah mengarah ke kiri, diapit tirai tipis terang di kiri dan tirai tebal gelap di kanan.
- `60-k6-ilustrasi-lego.jpg`: setiap balok mempunyai dua tonjolan atas; tumpukan kiri lebih tinggi daripada dua tumpukan lainnya.

Usul koreksi angka

- Tinggi kepala A-roll k1: ±20% H → sekitar 31,3% H (190/608 px; ±0,33 pp), dihitung dari puncak rambut sampai dagu.
