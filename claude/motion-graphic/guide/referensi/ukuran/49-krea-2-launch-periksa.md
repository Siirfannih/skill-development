PUTUSAN: PERBAIKI

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Seluruh heading wajib ada; Proporsi terukur merupakan tambahan yang diminta. |
| Delapan bagian spesifik | Ya | §1–8 berisi hex, ukuran teks, cut, jenis gambar, skala, gerak, spektrum, dan level musik. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Nama sumber tidak menunjuk teknik tertentu; pilihan teks/punch-in/galeri dijabarkan paling luas di §2, §5, §6. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Punch-in satu frame, pan mengikuti kursor, dan energi audio <250 Hz memerlukan video/audio. |
| Tanpa aturan lama durasi tampil teks | Ya | Waktu yang dicatat merupakan observasi ritme/transisi sumber, bukan aturan lama tampil teks. |

Ukur ulang: koordinat piksel (x0,y0,x1,y1), kanan/bawah eksklusif; frame 736×414. Tinggi huruf diukur dari puncak sampai baseline, tanpa turunan g.
Tinta hitam: RGB maksimum <100; tinta putih: RGB minimum >210; komponen ≥8 piksel. Latar: median RGB. Kartu: komponen terbesar dengan RGB minimum <235 pada ROI gambar utama.
Selisih ukuran terhadap angka kartu (batas terdekat untuk rentang); toleransi 15%, warna ≤20/kanal. Klaim k1 mengacu baris k1 pada tabel, bukan contoh “This is” 19 px di §2.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Kapital teks kecil k1 | 4,3–4,6% tinggi | 49-k1-teks-kecil.jpg; A: (225,190,250,218) | 28 px = 6,76% | +47,0% dari batas 4,6% | Tidak |
| Kapital hero Krea | 20,3% / 84 px | 49-k2-teks-hero-punchin.jpg; K: (219,164,289,248) | 84 px = 20,29% | −0,05% | Ya |
| Tinggi teks montase k3 | ±4,6% tinggi | 49-k3-teks-di-montase.jpg; d: (251,190,270,218) | 28 px = 6,76% | +47,0% | Tidak |
| Ukuran kartu kuda | 49% lebar × 49% tinggi | 49-k4-kartu-gambar-strip.jpg; (188,54,548,258) | 360×204 px = 48,91% × 49,28% | −0,18% / +0,56% | Ya |
| Latar adegan teks | #FFFFFF | 49-k1-teks-kecil.jpg; (0,0,736,150) | #FFFFFF, RGB (255,255,255) | RGB (0,0,0) | Ya |
| Cut per menit, scene >0,25 | 16 cut; 14,3/menit | MP4 sumber, seluruh frame; (0,0,736,414), t=0–67,157 dtk | 16 cut; 14,295/menit | −0,036% | Ya |

Terlihat tetapi tidak tertulis:
- 49-k3-teks-di-montase.jpg: close-up wajah dengan kacamata reflektif besar dan anting logam besar; permukaan mengilap mendominasi sisi/bawah komposisi.
- 49-k4-kartu-gambar-strip.jpg: thumbnail tengah paling pekat; thumbnail samping pudar dan sebagian bertumpuk.
- 49-k5-cincin-gambar.jpg: dua bulatan pusat berbeda ukuran; bulatan kanan berupa avatar kartun, bulatan kiri berupa gambar wajah.
- 49-k6-figur-cutout.jpg: ada panel persegi panjang putih kelabu bertepi lembut di belakang figur; bayangan memanjang ke kanan.

Usul koreksi angka:
- Baris k1, kapital “An image model”: 6,76% tinggi frame (28 px).
- Baris k3, tinggi huruf “made for aesthetics”: 6,76% tinggi frame (28 px).

Hasil: 4/6 klaim cocok; kelengkapan belum penuh. Skrip: periksa_scripts/ukur.py; rincian: periksa_scripts/hasil.json.
