PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib sama dan berurutan; tambahan Proporsi terukur. |
| 1. Warna & tekstur spesifik | Ya | Hex, Lab, luma, grain. |
| 2. Teks spesifik | Ya | Tinggi, rasio, posisi, lapisan. |
| 3. Ritme spesifik | Ya | Cut/menit, median shot, pembagian babak. |
| 4. B-roll / footage spesifik | Ya | Kaki, keyboard, tangan, galeri, AE. |
| 5. Motion graphic spesifik | Ya | Skala kepala/badan dan 2–3 lapis. |
| 6. Kamera & transisi spesifik | Ya | Skala zoom, pan, grid-tile wipe. |
| 7. SFX spesifik | Ya | Jenis bunyi, onset, angka level. |
| 8. Musik spesifik | Ya | Genre, BPM, LUFS, perubahan bass. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan berkas JPG, k1–k8. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Talkingheadkonsep.mp4 dimaknai konsep utuh; delapan bagian dibedah, terutama Teks/Kamera. |
| Cek kemiripan bisa dicek dari still | Tidak | Cut/menit dan median shot memerlukan video; punch-in memerlukan pasangan still. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Detik dipakai sebagai lokasi contoh, ritme, dan gerak kamera. |

Ukur ulang: 960×720; kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Tinggi ascender→baseline, bukan x-height; kepala = rambut teratas→dagu (landmark manual ±5 px).
Masker teks RGB ≥220, rentang kanal ≤25; ambang 200/240 mengubah tepi sekitar 1–2 px. Median RGB untuk langit. Selisih ukuran relatif terhadap angka kartu; posisi dalam poin persen (pp).
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kata raksasa CLICK | 33% | 69-k1-wajah-teks-belakang.jpg: (682,142,901,467), huruf k utuh yang tidak tertutup | 325 px = 45,14% | 36,78% relatif | Tidak |
| Tinggi huella | 17,5% | 69-k2-wajah-kutipan.jpg: (336,412,622,499), tanpa tanda kutip | 87 px = 12,08% | 30,95% relatif | Tidak |
| Rasio huella : comentá | 5,6× | 69-k2-wajah-kutipan.jpg: (336,412,622,499) / (367,406,506,432) | 87/26 = 3,35× | 40,25% relatif | Tidak |
| Pusat kata utama huella | x49%; y60,5% (titik tengah rentang x33–65%; y52–69%) | 69-k2-wajah-kutipan.jpg: (336,412,622,499) | x49,90%; y63,26% | x0,90 pp; y2,76 pp | Ya |
| Tinggi kepala k1 | ±20% | 69-k1-wajah-teks-belakang.jpg: (373,110,567,390) | 280 px = 38,89% | 94,44% relatif | Tidak |
| Warna langit lanskap | #95978D | 69-k4-lanskap-teks.jpg: (20,30,400,110) | Median #A0A193 | RGB: 11,10,6 | Ya |

Hasil: 2/6 cocok; kelengkapan belum penuh. Ambang: ukuran ≤15% relatif, posisi ≤5 pp per sumbu, warna ≤20 per kanal.
CLICK diukur dari ascender l/k, bukan tinggi c. Rasio memakai ascender t pada comentá; bila aksen disertakan tingginya 28 px dan rasio 3,11×, tetap tidak cocok.

Terlihat tetapi tidak tertulis
- 69-k1-wajah-teks-belakang.jpg: telapak tangan menjulur ke depan di kanan bawah dan tampak buram, membentuk lapisan depan.
- 69-k3-broll-teks-seleksi.jpg: cahaya jendela membentuk bidang terang dan bayangan diagonal bertepi keras di karpet.
- 69-k4-lanskap-teks.jpg: tokoh terlihat dari profil samping, dengan earbud putih yang jelas.
- 69-k5-ui-galeri.jpg: kartu foto tengah besar diapit kartu terpotong; deretan thumbnail kecil membentang di bawahnya.
- 69-k6-ui-aftereffects.jpg: preview berada di kiri, kontrol preset di kanan, timeline di bawah; susunan ini mendominasi jendela AE.

Usul koreksi angka
- Tinggi CLICK pada k1: 45,14% (325 px, ascender→baseline).
- Tinggi huella pada k2: 12,08% (87 px).
- Rasio huella : comentá pada k2: 3,35× (87/26 px, tanpa aksen).
- Tinggi kepala pada k1: 38,89% (280 px; ketidakpastian ±0,69 pp).

Reproduksi: periksa_scripts/ukur.py; hasil.json, source_matches.json, dan gambar kotak di folder yang sama. Pencocokan ke sumber: k1=15,60 dtk; k2=36,60 dtk; k4=1,00 dtk (galat MSE thumbnail <2).
