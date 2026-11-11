PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading template ada; tambahan Proporsi terukur tersedia. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | 1: hex; 2: tinggi huruf; 3: cut; 4: keluarga footage; 5: dimensi; 6: skala kamera; 7: event; 8: BPM/LUFS. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, semuanya 960×720. |
| Diambil untuk sesuai nama/konteks file dan paling rinci | Ya | File sumber disebut; Story-context → struktur cerita; Ritme paling rinci, sembilan babak. |
| Cek kemiripan bisa dicek dari still | Tidak | CTA tanpa musik, urutan taruhan, set berulang, cut/menit dan median shot membutuhkan video/audio. |
| Tidak ada aturan lama durasi tampil teks | Ya | Durasi teks diserahkan ke audio; angka durasi lainnya membahas shot/babak. |

Ukur ulang — **3 dari 6 cocok**.
Koordinat piksel berawal di kiri atas; kotak (x0,y0,x1,y1), batas akhir eksklusif. Semua frame 960×720.
Tinggi huruf dihitung dari puncak sampai dasar badan huruf, tanpa padding; rasio memakai “Simon” dan “had”, bukan x-height.
Ukuran: toleransi relatif ≤15%; posisi: ≤5 poin persen (pp). Untuk rentang, selisih dihitung ke batas terdekat; pusat rentang dipakai untuk pusat blok.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi “But” | 10,0% H | 29-k1-wajah-teks.jpg (110,127,294,216) | 89 px = 12,36% H | +23,61% relatif | Tidak |
| Rasio serif : sans | ±1,2 | 29-k2-benda-analogi.jpg; Simon (50,317,166,350); had (270,323,328,350) | 33/27 = 1,222 | +1,85% relatif | Ya |
| Pusat blok caption | k2: x 5–95%, y 44–55%; pusat (50%;49,5%) | 29-k2-benda-analogi.jpg (49,317,911,403) | Pusat (50,00%;50,00%) | x 0,00 pp; y +0,50 pp | Ya |
| Skala mangkuk, lebar × tinggi | 22 × 30% | 29-k2-benda-analogi.jpg (366,240,598,475) | 232×235 px = 24,17 × 32,64% | +9,85%; +8,80% relatif | Ya |
| Tinggi kotak navy | 6,2% H | 29-k4-ui-label.jpg (38,332,201,396) | 64 px = 8,89% H | +43,37% relatif | Tidak |
| Tinggi judul serif, huruf b | 22–26% H | 29-k5-kartu-judul.jpg (366,171,535,428) | 257 px = 35,69% H | +37,29% relatif dari batas 26% | Tidak |

Metode: segmentasi RGB/HSV pada ROI, gabungan kotak kata untuk caption, pemindaian margin polos untuk kotak navy; mangkuk memakai batas rim berwarna yang terlihat.
Ketidakpastian tepi JPEG sekitar ±1–2 px; rim mangkuk ±5 px. Tidak mengubah status kecocokan keenam klaim.
Skrip: periksa_scripts/ukur.py; hasil rinci: periksa_scripts/hasil.json; gambar bertanda kotak: periksa_scripts/ukur-*.jpg.

Terlihat tetapi tidak tertulis
- 29-k2-benda-analogi.jpg: lengan masuk diagonal dari kiri atas, menutup sebagian besar sisi kiri mangkuk; komposisi tidak simetris meskipun mangkuk di tengah.
- 29-k4-ui-label.jpg: kisi/garis layar dan moiré terlihat pada tile, memberi tekstur pada gambar UI.
- 29-k6-grafik-overlay.jpg: bagian datar garis magenta melintas sekitar mulut; keterangan kartu menyebut garis setinggi mata.

Usul koreksi angka
- Tinggi “But”: 12,36% H (89 px).
- Tinggi kotak navy: 8,89% H (64 px).
- Tinggi judul serif pada k5: 35,69% H (257 px, puncak b sampai baseline).
