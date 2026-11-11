PUTUSAN: LAYAK

Kelengkapan penuh; **6 dari 6 klaim cocok**. Pemeriksaan mandiri atas kartu, template, keyframes, dan metadata video sumber; tidak membaca ukuran.md atau skrip penulis.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Semua heading wajib hadir; Proporsi terukur merupakan tambahan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | 1: hex/kabut; 2: tinggi/rasio; 3: shot/menit; 4: render/lanskap; 5: skala/lapis; 6: gerak/transisi; 7: event/pop; 8: bpm/LUFS. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG, k1–k8, masing-masing 720×1280. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama asli arpan.motions_DfCMjSySmJd.mp4 disebut; nama tanpa penanda bagian ditafsirkan sebagai Motion graphic + Teks, dua uraian paling rinci secara gabungan. |
| Cek kemiripan bisa dicek dari still | Ya | Palet, ukuran/posisi teks, wadah, skala objek, kabut, dan outline dapat disandingkan. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu yang ada menandai observasi shot/transisi, bukan kewajiban lama tampil teks. |

Ukur ulang: semua kotak memakai piksel JPEG penuh, format (x0,y0,x1,y1), ujung kanan/bawah eksklusif. Pembagi sesuai kartu: panel final (0,424,720,834), 720×410. Tinggi huruf = puncak sampai dasar huruf, tanpa line-height; kedua teks tidak memiliki descender. Siluet pesawat ditandai manual lalu dihitung skrip; huruf dan kartu memakai mask piksel. Warna = median area bebas teks.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi unsettled | 13,2% tinggi panel | 72-k3-kata-kunci-grid.jpg (218,596,502,653) | 57 px = 13,90% | Relatif 5,32% | Ya |
| Rasio kunci : sambung | ±2,4× | 72-k3-kata-kunci-grid.jpg (218,596,502,653); 72-k5-kalimat-simbol.jpg (256,615,479,641) | 57/26 = 2,19×; sambung 6,34% tinggi | Relatif 8,65% | Ya |
| Pusat blok kalimat | (50%,50%) | 72-k5-kalimat-simbol.jpg (256,615,479,641) | (51,04%,49,76%) | (1,04;0,24) poin persen | Ya |
| Skala pesawat | 59% lebar × 33% tinggi | 72-k1-judul-pesawat.jpg (128,556,546,693) | 418×137 px = 58,06% × 33,41% | Relatif (1,60%;1,26%) | Ya |
| Skala kartu coordinator | 37% lebar × 57% tinggi | 72-k6-kartu-coordinator.jpg (230,513,496,744) | 266×231 px = 36,94% × 56,34% | Relatif (0,15%;1,16%) | Ya |
| Palet gradien: atas / krem / bawah | #D4E2D6 / #F4F4ED / #6BAC86 | 72-k5-kalimat-simbol.jpg (340,430,380,450) / (40,604,80,644) / (340,790,380,810) | #D3E5D5 / #F5F6F0 / #71B689 | Absolut RGB (1,3,1) / (1,2,3) / (6,10,3); maks. 10 | Ya |

Toleransi: ukuran/rasio ≤15% relatif; posisi ≤5 poin persen; setiap kanal warna ≤20. Variasi batas mask huruf sekitar 1–2 px tidak mengubah hasil cocok. Enam klaim di atas tidak menguji angka lain dalam kartu.

**Terlihat tetapi tidak tertulis**

- 72-k2-ui-lanskap.jpg: bunga pada lapisan paling depan sangat buram, sementara kartu komentar tajam. Blur kedalaman ini belum dijelaskan; bagian 5 justru menyebutnya hanya ada pada penutup.
- 72-k2-ui-lanskap.jpg: grid putih tipis membentang di atas lanskap dan terlihat di sela kartu. Kartu hanya menjelaskan grid untuk adegan unsettled (k3).

**Usul koreksi angka**

Tidak ada: seluruh enam klaim terpilih berada dalam toleransi. Nilai sambung 6,34% di atas hanya menjadi penyebut rasio yang diuji; klaim tinggi sambung secara terpisah tidak termasuk enam pengujian ini.

Reproduksi: `~/work/mg-venv/bin/python periksa_scripts/ukur.py`; koordinat dan hasil rinci tersimpan di `periksa_scripts/hasil.json`.
