PUTUSAN: LAYAK

Kelengkapan penuh; 6 dari 6 klaim cocok. Pemeriksaan hanya pada enam klaim terpilih.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Seluruh heading wajib ada dan urut; Proporsi terukur merupakan tambahan. |
| §1 Warna & tekstur spesifik | Ya | Hex latar, aksen, grid 1 px, grain/scanline. |
| §2 Teks spesifik | Ya | Tinggi huruf, rasio, posisi, jumlah kata, arah masuk. |
| §3 Ritme spesifik | Ya | Cut/menit, median shot, perubahan per panel. |
| §4 B-roll spesifik | Ya | Roket, wallpaper macOS, kartu foto 22×44%, montase 3×3. |
| §5 Motion graphic spesifik | Ya | Bangunan isometrik, koin, peta, skala dan kedalaman. |
| §6 Kamera & transisi spesifik | Ya | Truck diagonal 25°, zoom 2×, pan horizontal. |
| §7 SFX spesifik | Ya | 82 event, jenis bunyi dan level terhadap bed/VO. |
| §8 Musik spesifik | Ya | Instrumen, 120 bpm lemah, −14 LUFS, perubahan spektral. |
| Proporsi terukur per jenis adegan | Ya | Tabel delapan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, k1–k8. |
| Diambil untuk sesuai nama file; fokus paling rinci | Ya | Nama showreel bersifat umum; fokus §2 dan §5 memang dua bagian terpanjang (241/135 kata). |
| Cek kemiripan bisa diperiksa dari still | Ya | Palet, ukuran, posisi, tag, skala, kedalaman dan tekstur. |
| Tidak ada aturan lama durasi tampil teks | Ya | Tidak ada durasi wajib tampil teks dalam detik; angka animasi/kamera membahas gerak. |

Ukur ulang memakai panel 640×360. Kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif; ukuran dibagi dimensi panel, bukan mosaik 1280×720.
Tinggi cap memakai G pada Graphic dan seluruh tinta Source tanpa descender. Warna memakai median isi tag, tanpa huruf; dock memakai gradien tepi kaca, koin memakai siluet terang. Ketidakpastian tepi sekitar 1 px.
Selisih ukuran relatif terhadap angka kartu; rentang dinilai dari batas terdekat (0 bila di dalam). Posisi memakai poin persen (pp); warna dibanding ujung rentang RGB terdekat. Toleransi: ukuran 15%, posisi 5 pp, setiap kanal RGB 20.

| Klaim | Nilai di kartu | Frame + kotak piksel | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi cap Graphic | 18–21% tinggi | 17-k1-tipografi-gelap.jpg; G (102,82,176,157) | 75 px = 20,83% | 0%; dalam rentang | Ya |
| Pusat kata Life | (50%,50%), tabel arsip | 17-k2-arsip-kata.jpg; (291,167,348,193) | (49,92%,50,00%) | (0,08;0,00) pp | Ya |
| Skala dock, lebar×tinggi | 69×26% | 17-k3-ui-asli-dock.jpg; (181,131,622,225) | 441×94 px = 68,91×26,11% | 0,14% / 0,43% | Ya |
| Tinggi cap Source | 24,7% tinggi | 17-k4-editorial-highlight.jpg; (155,134,504,223) | 89 px = 24,72% | 0,09% | Ya |
| Warna isi tag teal | #12A4A5–#23A9AD | 17-k5-isometrik-tag.jpg; sampel (55,252,196,296) | #0199A8; RGB (1,153,168) | ΔRGB (17,11,3), terhadap #12A4A5 | Ya |
| Skala koin, lebar×tinggi | 35×43% | 17-k6-objek3d-tag.jpg; (340,94,564,247) | 224×153 px = 35,00×42,50% | 0,00% / 1,16% | Ya |

Terlihat tetapi tidak tertulis:
- 17-k3-ui-asli-dock.jpg: pointer panah hitam bertepi putih berada tepat di bawah ikon WhatsApp, menumpang di depan dock.
- 17-k4-editorial-highlight.jpg: sisa kata “AI” berukuran besar terpotong di tepi kiri, sementara Source berada di dalam sorotan kuning.
- 17-k6-objek3d-tag.jpg: lingkaran besar konsentris bergaris putus-putus berada di belakang koin, selain grid lurus.

Usul koreksi angka: tidak ada; seluruh enam klaim masuk toleransi.

Reproduksi: `~/work/mg-venv/bin/python periksa_scripts/ukur_independen.py`; hasil rinci di `periksa_scripts/hasil.json`.
Pencocokan mandiri terhadap video: k1/k2/k3 pada 1,502 dtk; k4/k5 pada 6,507 dtk; k6 pada 10,511 dtk. Asal panel dan indeks frame disimpan dalam JSON.
