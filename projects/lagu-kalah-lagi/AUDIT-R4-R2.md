# Audit REQ-20261031-2300-loris-storyboard-r4-r2 — Konsolidasi storyboard R4 "Kalah Lagi" (page Loris), ronde 2
VERDICT: PASS_WITH_NOTES

Ringkasan: Temuan MAJOR ronde 1 (pantulan panel 22) sudah beres. Di panel 22 sekarang rambut gelap, kacamata, dan wajah sawo matang terbaca penuh. Embun tinggal pita di tepi atas dan bawah, dan sisa senyum putih sudah dihapus. Lima temuan MINOR lainnya juga sudah diperbaiki: embun 16/17, caption SFX, cadangan layout, panel 05, dan tinggi panel 15. Yang tersisa satu MINOR, yaitu pose lari panel 21 yang masih lemah. Pembuat sudah menyebut ini secara jujur dan menundanya ke uji animatic. Kondisi canvas live tetap belum terverifikasi.

## Cek terhadap permintaan Irfan
| Butir permintaan | Status | Bukti |
|---|---|---|
| Semua 25 beat ada, satu versi aktif per nomor; lirik, visual, kamera/transisi, niat SFX tersedia | OK | `canvas-r4.json` berisi 27 akar: 25 label "Panel 01–25 R4" yang unik dan 2 panduan. Setiap caption memuat waktu, lirik, visual, kamera/keluar, dan SFX (hasil ekstraksi teks per panel). Contact sheet `work/.../sheet-25.jpg` menampilkan 25 panel lengkap. |
| Arah tokoh siluet/rim; kulit wajah terang, bukan oval navy | OK | Wajah 16/17/22 sawo matang dengan rambut gelap (`work/.../zoom-faces.jpg`). Di 22, embun lama `M590,120 … L1330,250 … 590,470` op 0,7 diganti pita atas `L1330,180 … 590,200`, jadi tidak lagi menutup wajah. |
| Skala ruang nyata masuk akal, metafora batin ditandai | OK | Caption 06/12/23/24 menyebut "dunia batin/metafora". Kalender 01/25 kecil di dinding. Pantulan 19 ≈ v3 (rasio 0,998). |
| Lingkungan ACC tidak berubah di luar koreksi tokoh/07 v3 | OK | SVG 01 dan 07 identik byte dengan v3. Pada 20, prefix 1749/2138 sama dan dua elemen yang dihapus hanya kepala/torso tokoh. Pada 22, 19/26 elemen lama tetap; yang dihapus hanya tokoh, embun atas lama, dan senyum putih (sesuai koreksi). Pada 02, 19/20 elemen tetap; yang dihapus hanya kepala tokoh. |
| Pasangan cerita terbaca (01/25, 03/04, 06/24, 08/15, 16/22) | OK | Di `sheet-25.jpg` tiap pasangan memakai framing dan lingkungan yang sama, dengan keadaan yang berubah. |
| Versi lama dihapus; backup cukup untuk pemulihan | OK di snapshot · live BELUM TERVERIFIKASI | Irisan ID before ∩ after = 0. `canvas-before-r4-layout.json` berisi 32 artboard dengan label/x/y/w/h, dan ID-nya cocok 32/32 dengan `canvas-before-r4.json` (kode). |
| Gambar dan caption tidak bertentangan; tidak mengklaim video/timing/ACC final | OK | Caption 06/14/17/20/23/24 sekarang berbunyi "Lagu tetap utuh / tanpa drone atau swell baru / tidak ada drop musik tambahan". Caption 05 berbunyi "dari area HP/pikirannya", sama dengan STORYBOARD.md:31, dan buku tidak lagi disebut. REVIEW-R4.md:3 menyatakan "bukan verdict final". Panduan tokoh menyatakan "bukan persetujuan final". |

## Temuan
| # | Tingkat | Di mana | Masalah | Bukti terukur | Perbaikan yang disarankan |
|---|---|---|---|---|---|
| 1 | MINOR | Panel 21 `war` · `qa-r4/panel-21.jpg` | Postur lari masih belum terbaca sebagai lari. Kepala dan torso tampak tegak dari belakang, dan kedua tangan muncul rendah di kiri-bawah dan kanan-bahu, jadi lebih mirip berdiri/berjalan. Caption menyebut "torso condong ke depan dan lengan bergantian", sedangkan spec STORYBOARD.md:47 menyebut "lengan kiri rendah ke belakang, kanan ke depan". | `work/.../zoom-21.jpg`. Pembuat menyatakan batas tiga percobaan sudah tercapai dan tidak mengklaim siklus lari berhasil. | Selesaikan di uji animatic/rig: tunjukkan condong lewat offset kepala terhadap bahu, plus siku kanan yang terlihat di depan dan bergerak. Atau tambahkan satu frame kunci lain dengan pose ekstrem. |
| 2 | MINOR | Panel 17 `way` · `panel-17.jpg` | Senyum embun sekarang terpisah dari mulut, tetapi posisinya di dagu/leher sehingga bisa terbaca sebagai kalung/kerah, bukan senyum yang digambar di kaca. | `work/.../zoom-faces.jpg` (tengah): lengkung putih berada di bawah dagu, di luar bidang wajah | Naikkan senyum embun sedikit agar menumpuk sebagian bidang wajah dengan offset ke samping, atau beri lapisan embun di sekitarnya yang lebih jelas |

## Angka QC
- Inventaris after: 27 akar. 25 panel berukuran 1000×828 (panel 15 sudah 828), di grid 5×5 x∈{0,1060,2120,3180,4240}, y∈{0..4000}. Panduan ada di y −1450. Irisan ID dengan before = 0.
- Backup: kode 32 akar dan layout 32 akar, ID cocok 32/32.
- `var(` di SVG: 0 di semua 27 akar.
- Identitas SVG: 01 dan 07 sama dengan v3 (identik). 19 vs v3 = 0,998. Elemen lingkungan yang dipertahankan: 20 = 16/18, 22 = 19/26, 02 = 19/20. Semua elemen yang dihapus adalah elemen tokoh/embun/senyum.
- Elemen embun panel 22 sekarang: pita atas y120–200 dan pita bawah y≥420–760, op 0,7. Area wajah pantulan bebas embun.
- Still audit di `~/AI-OPS/audit-bridge/work/REQ-20261031-2300-loris-storyboard-r4-r2/`: `sheet-25.jpg`, `fix-16-17-22-21.jpg`, `zoom-faces.jpg`, `zoom-21.jpg`, `p05.jpg`.
- Audit SFX semantik: N/A, karena keluaran berupa storyboard diam tanpa stem/EDL dan pembuat menyatakannya di luar cakupan. Kelas cue sesuai dengan event-nya (thump kasur 08/15, decit jari di kaca 16, squeak telapak 22, pop kartu 12, klik weker 11). Caption tidak lagi mengatur mix musik.

## Yang tidak bisa diverifikasi
- Canvas Wonder live (apakah memang 27 akar dan akar lama benar-benar terhapus dari page Loris): MCP Wonder belum terautentikasi. Penilaian hanya memakai snapshot dan JPEG buatan agen pembuat.
- Apakah JPEG `qa-r4` adalah screenshot native Wonder dan sinkron dengan source terbaru. Isinya konsisten dengan SVG (posisi embun 22, tinggi 828), tetapi saya tidak merender ulang.
- Rasa gerak, transisi, timing ke lagu, keterbacaan montase waktu (1 Nov → akhir tahun → 2 Nov), siklus lari 21, dan Scene07 R4: belum ada lagu, animatic, atau render.
- Perbandingan side-by-side per panel dengan referensi 2dmotion/Merantau belum dilakukan.
