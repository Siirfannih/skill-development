PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Seluruh heading wajib hadir; Proporsi terukur merupakan tambahan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Bagian 1–8 terisi; SFX menyatakan batas pengukuran dan memberi proksi numerik. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan berkas JPG di keyframes/. |
| Diambil untuk sesuai nama dan bagian paling rinci | Ya | ID IG DeUmXBotjIH sesuai judul/sumber; bagian Teks paling rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir “berganti tiap ±0,8 dtk” memerlukan urutan video, tidak terbukti dari still. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Angka detik menjelaskan shot, kamera, audio, dan transisi; bukan aturan lama tampil teks. |

Ukur ulang — 6 dari 6 klaim cocok.
Semua koordinat pada JPG 1080×450, bukan resolusi video 1280×534; proporsi dinormalisasi terhadap JPG.
Kotak (x0,y0,x1,y1) memakai batas akhir eksklusif. Nama k1–k6 di tabel adalah nama berkas lengkap tanpa awalan “46-” dan akhiran “.jpg”.
X-height memakai huruf tanpa ascender/descender (e, a, u, c), bukan tinggi keseluruhan kata; tepi terang ≥220/255, bloom dikecualikan.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| X-height “life” | 56% H | k3-kata-raksasa; e (562,143,795,408) | 265 px = 58,89% H | 5,16% relatif | Ya |
| X-height kata kecil | 4,9% H | k4-kata-kecil-tersebar; a pada and (425,212,445,234) | 22 px = 4,89% H | 0,23% relatif | Ya |
| Rasio understand : kata kecil | 5,6× | k6-pasangan-skala; u (131,203,213,297), c pada can (518,170,532,187) | 94/17 = 5,53× | 1,26% relatif | Ya |
| Pusat vertikal kotak teks | y 50% H | k2-kolase-kotak-kata; (358,196,617,251) | y 223,5 px = 49,67% H | 0,33 poin persen | Ya |
| Skala layar monitor | 19,5% W × 36% H | k1-pembuka-monitor; (433,148,643,301) | 210×153 px = 19,44% W × 34,00% H | W 0,28%; H 5,56% relatif | Ya |
| Warna latar Change | #070408 = RGB(7,4,8) | k5-kata-latar-ubin; (20,325,300,430) | Median #080609 = RGB(8,6,9) | Kanal RGB (1,2,1) | Ya |

Metode: segmentasi putih dan komponen terhubung untuk huruf/kotak; gradien luma untuk batas layar; median RGB untuk latar tanpa teks/inset.
Uji ambang 200/220/240 menggeser batas huruf paling banyak 1 px per sisi; keenam putusan tetap cocok. Batas layar tidak memasukkan badan monitor.
Toleransi: ukuran/rasio ≤15% relatif, posisi ≤5 poin persen, warna ≤20 per kanal. Ritme cut tidak termasuk enam klaim ini.
Skrip yang mencetak hasil dan uji ambang: periksa_scripts/ukur.py. Metadata video diperiksa dengan ffprobe.

Terlihat tetapi tidak tertulis
- 46-k3-kata-raksasa.jpg: padang tertutup kabut tebal kuning-hijau; latar jauh nyaris hilang. Kabut dan dominasi warna adegan ini belum disebut dalam kartu.

Usul koreksi angka
- Tidak ada; seluruh enam klaim memenuhi toleransi.

Dasar putusan: kelengkapan belum penuh karena satu butir Cek kemiripan memerlukan video, meskipun 6/6 klaim terukur cocok.
