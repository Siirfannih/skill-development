PUTUSAN: PERBAIKI

Klaim cocok: 5/6; kelengkapan 6/7. Gagal pada tinggi koper dan pemeriksaan kemiripan dari still.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Seluruh heading inti identik; tambahan Proporsi terukur. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | 1–8 terisi; B-roll menyatakan seluruhnya ilustrasi 2,5D, tanpa footage. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | 2dmotion.mp4; motion graphic serta kamera/transisi dibedah urutan, gerak, skala, kedalaman. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir terakhir menyebut transisi benda/flash dan cut ≤12/menit; memerlukan video. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Tidak ada ketentuan durasi tampil teks; waktu yang dicatat terkait shot, transisi, dan audio. |

Ukur ulang: koordinat JPEG 1080×608, asal kiri atas, (x0,y0,x1,y1); batas kanan/bawah eksklusif.
Tinggi = bentang tinta vertikal; tahun memakai baris utuh “26” karena “20” tertutup halaman. Rasio membandingkan “26” tahun dengan “26” tanggal.
Tinta dipisahkan dengan Otsu; merah lingkar dikeluarkan. Pintu memakai gradien tepi kayu; koper memakai area merah badan yang terlihat, tanpa gagang.
Toleransi ukuran relatif ≤15%; posisi ≤5 poin persen per sumbu. Untuk rentang, selisih dihitung terhadap batas terdekat.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi angka tahun | 38% H | 50-k2-tipografi-kalender.jpg (38,269,425,502) | 233 px = 38,32% H | 0,85% relatif | Ya |
| Rasio tahun : tanggal | ±7,5× | 50-k2-tipografi-kalender.jpg (38,269,425,502); (826,362,867,390) | 233/28 = 8,32× | 10,95% relatif | Ya |
| Tinggi angka “20” | 10–12% H | 50-k3-kalender-lingkar.jpg (608,275,704,353) | 78 px = 12,83% H | 6,91% relatif terhadap 12 | Ya |
| Pusat judul akhir | (27%,39%) | 50-k8-judul-kredit.jpg (95,181,449,287) | (25,19%,38,49%) | x 1,81; y 0,51 poin persen | Ya |
| Lebar pintu | ±48% W | 50-k5-pintu-cahaya.jpg (279,0,800,608) | 521 px = 48,24% W | 0,50% relatif | Ya |
| Tinggi badan koper terlihat | 19% H | 50-k6-koper.jpg (15,457,995,608) | 151 px = 24,84% H | 30,71% relatif | Tidak |

Frame dicocokkan mandiri ke video: k2 3,50 s; k3 7,50 s; k5 13,50 s; k6 17,50 s; k8 40,04 s. Proporsi dinormalisasi terhadap JPEG, bukan piksel sumber 1280×720.

Terlihat tetapi tidak tertulis:
- 50-k2-tipografi-kalender.jpg: tahun disusun dua baris, “20” di atas “26”, bukan satu baris empat angka.
- 50-k4-objek-jam.jpg: indeks jam berupa batang hitam tanpa angka; jarum tipis merah berdampingan dengan jarum hitam.
- 50-k5-pintu-cahaya.jpg: daun pintu berpanel horizontal dan gagang hitam vertikal berada di sisi kiri.
- 50-k6-koper.jpg: gagang teleskopik abu-abu menonjol tinggi di atas badan merah; bagian bawah badan terpotong frame.

Usul koreksi angka:
- Tinggi badan merah koper pada k6: 19% → 24,84% tinggi frame yang terlihat (151/608); termasuk gagang akan lebih tinggi lagi.

Skrip dan bukti: periksa_scripts/ukur.py, laporan.py, hasil.json, serta *-kotak.png. Kartu tidak diubah.
