PUTUSAN: PERBAIKI

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai; tambahan Proporsi terukur tersedia. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Palet hex, tipografi, ritme, isi footage, objek UI, kamera, SFX, dan musik dijabarkan spesifik. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan baris adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Menyebut instagram.mp4 yang tidak menunjuk bagian khusus; fokus kamera/UI dijabarkan rinci pada bagian 5–6. |
| Cek kemiripan bisa dicek dari still | Tidak | Push/pull ≥×1,5, scroll, kamera tidak diam, serta piano ±12 dB lebih pelan memerlukan rangkaian frame/audio. |
| Tidak ada aturan lama durasi tampil teks | Ya | Penanda waktu contoh bukan ketentuan berapa detik teks harus tampil. |

Ukur ulang — enam klaim dipilih untuk hierarki huruf, penempatan teks, dan skala objek UI dominan.
Koordinat (x0,y0,x1,y1), kanan/bawah eksklusif; semua frame 960×720. Persentase memakai seluruh frame, termasuk tepi hitam.
Tinggi huruf mengikuti komponen terhubung kartu: badan j terpisah dari titik; koma tidak masuk tinggi But. Posisi blok mencakup koma, tanpa ikon IG.
Masker luminans >170 (k2), >190 (k3), >247 (permukaan putih k4/k5); bayangan dan gelembung terpisah tidak dihitung sebagai kartu.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi just, termasuk badan j | 4,7% tinggi | 65-k2-teks-gradien.jpg (399,348,406,381) | 33 px = 4,58% | 2,48% relatif | Ya |
| Tinggi But bold | 8,2% tinggi | 65-k3-teks-dotmatrix.jpg (272,336,384,390) | 54 px = 7,50% | 8,54% relatif | Ya |
| Rasio tinggi kata kunci : kata sambung | 1,1–1,7× | 65-k3-teks-dotmatrix.jpg But (272,336,384,390); what if (406,336,604,389) | 54/53 = 1,02× | 7,38% relatif dari batas 1,1× | Ya |
| Posisi blok teks | x 31–63%; y 46–56%; tengah | 65-k3-teks-dotmatrix.jpg (272,336,604,398) | x 28,33–62,92%; y 46,67–55,28%; pusat (45,63%;50,97%) | Tepi maks. 2,67 pp; pusat 1,38 pp dari pusat rentang klaim | Ya |
| Skala kartu Reminder | 47×57% frame | 65-k4-ui-kartu-reminder.jpg (435,293,878,694) | 443×401 px = 46,15×55,69% | Lebar 1,82%; tinggi 2,29% relatif | Ya |
| Lebar notifikasi inline depan | 37% lebar | 65-k5-kalimat-notifikasi.jpg (448,308,803,389) | 355 px = 36,98% | 0,06% relatif | Ya |

Hasil: 6/6 cocok menurut toleransi ukuran ≤15% relatif dan posisi ≤5 pp. Rentang rasio dibandingkan ke batas terdekat; seluruh tepi posisi dibandingkan satu per satu.
Skrip: periksa_scripts/ukur_final.py; angka mentah: periksa_scripts/hasil.json; bukti kotak: periksa_scripts/*-kotak.png.
Ragu, di luar enam klaim: headline SEE ±15% diberi catatan “dari mosaik”; skala berubah cepat pada awal video, sehingga k1 saja tidak cukup untuk menyatakannya salah.

Terlihat tetapi tidak tertulis:
- 65-k1-ui-postingan.jpg: motor dan pengendaranya terbalik; roda berada di atas tubuh pengendara di tengah komposisi.
- 65-k3-teks-dotmatrix.jpg: titik tersusun dalam kisi baris–kolom; sebagian berbentuk cincin berlubang dan sebagian tampak padat.
- 65-k4-ui-kartu-reminder.jpg: Month/Day/Time berupa tiga panel abu sangat muda, berdampingan dalam satu baris.

Usul koreksi angka:
- Tidak ada angka dari enam klaim yang keluar toleransi.

Putusan PERBAIKI karena satu butir kelengkapan gagal meskipun enam klaim cocok; temuan tidak meminta penghapusan isi atau perubahan gaya.
