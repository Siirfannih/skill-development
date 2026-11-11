PUTUSAN: PERBAIKI

Kelengkapan belum penuh; 5/6 klaim cocok, 1 ragu (tidak dihitung sebagai tidak cocok).

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib ada; Proporsi terukur menjadi tambahan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Bagian 1–6 terperinci; 4 menyatakan 100% vektor; 7–8 menyatakan tanpa audio, dikonfirmasi ffprobe. |
| Proporsi terukur, tabel per jenis adegan | Ya | Tujuh jenis adegan k1–k7. |
| Ada 6–8 frame kunci | Ya | Tujuh JPG di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Motionwithtext.mp4; motion graphic dan teks mendapat rincian terbanyak. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir terakhir memuat morph, easing, diam 0,15–0,5 dtk, dan counter; membutuhkan urutan video. |
| Tidak ada aturan lama durasi tampil teks | Ya | Detik yang dicatat menjelaskan ritme/gerak, bukan aturan lama tampil teks. |

Ukur ulang: sumber still 720×960; kotak (x0,y0,x1,y1) memakai batas akhir eksklusif. Skrip: periksa_scripts/ukur.py.
Tinggi tinta diukur dari puncak hingga baseline (65% dan APY tidak memiliki descender); ambang RGB >110, diuji ulang 80–160. Warna = median area datar. Selisih rentang dihitung ke batas terdekat; posisi memakai poin persen (pp).

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi angka 65% | 4,6–4,7% tinggi | 57-k4-bar-persen.jpg (111,484,224,529) | 45 px = 4,6875% | 0%; dalam rentang | Ya |
| Rasio angka besar : label | ±3 | 57-k4-bar-persen.jpg; 65% (111,484,224,529), APY (108,227,141,239) | 45/12 = 3,75; rentang ambang 3,46–3,75 | 15,4–25%; sensitif ±1 px | Ragu |
| Pusat vertikal cincin dial | y 55% | 57-k6-dial.jpg (128,248,592,712) | y 480 px = 50,00% | 5,00 pp; tepat batas | Ya |
| Skala panel | 75 × 56% frame | 57-k3-kotak-bersarang.jpg (89,211,629,752) | 540 × 541 px = 75,00 × 56,35% | 0% lebar; 0,63% tinggi | Ya |
| Warna latar | #110E09 | 57-k1-cincin.jpg (0,0,720,180) | RGB (17,14,9), #110E09 | ΔRGB (0,0,0) | Ya |
| Warna aksen | #CEFF0A | 57-k4-bar-persen.jpg (120,600,590,670) | RGB (206,255,10), #CEFF0A | ΔRGB (0,0,0) | Ya |

Rasio ditandai ragu karena tepi anti-alias mengubah tinggi label 12 menjadi 13 px, dan batas bawah selisih hanya 0,4 pp di luar toleransi; ketidakpastian 1 px dapat mengubah keputusan.

Terlihat tetapi tidak tertulis:
- 57-k1-cincin.jpg: pasangan label 2023/$42,000 dan Match/$4,200 berada di luar kontur masing-masing cincin; kartu menyatakan label total di dalam panel.
- 57-k2-morph.jpg: kontur luar sudah berupa kotak bersudut bulat, sementara kontur dalam masih berupa lingkaran pada tahap ini.
- 57-k3-kotak-bersarang.jpg: interior kotak kecil gelap seperti latar, menutupi bidang panel yang lebih terang.
- 57-k4-bar-persen.jpg: bidang lime menyisakan strip panel gelap yang terlihat di sisi kanan.

Usul koreksi angka:
- Tidak ada angka yang pasti tidak cocok menurut toleransi; rasio tetap ragu. Pusat dial berbeda 5 pp, tetapi masih memenuhi batas posisi yang ditetapkan.
