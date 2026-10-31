# Audit REQ-20261031-2300-loris-storyboard-r4 — Konsolidasi storyboard R4 "Kalah Lagi" (page Loris)
VERDICT: FAIL

Ringkasan: Inventaris di snapshot sudah sesuai. Ada 27 akar (25 panel 01–25 dan 2 panduan), tidak ada ID dari 32 akar lama, dan tidak ada artboard yang bertumpuk. 01/07 identik dengan v3, lingkungan ACC 20 identik, dan waktu di caption cocok dengan spec. Verdict tetap FAIL karena panel 22 (ACC, momen "wajah jujur" di reff 3) menampilkan pantulan berambut abu dengan wajah tertutup embun. Ini bertentangan dengan caption dan keputusan tokoh. Selain itu ada beberapa ketidaksesuaian kecil antara caption dan spec, dan cadangan tidak menyimpan posisi artboard lama.

## Cek terhadap permintaan Irfan
| Butir permintaan | Status | Bukti |
|---|---|---|
| Semua 25 beat ada, satu versi aktif per nomor; lirik, visual, kamera/transisi, niat SFX tersedia | OK | `canvas-r4.json`: 25 label "Panel NN R4" unik. STORYBOARD.md punya 25 baris beat dan 25 baris cue. Waktu kontinu 0:00–2:22 tanpa celah, dan waktu di caption canvas cocok 25/25 dengan tabel (skrip regex). |
| Arah tokoh siluet/rim; wajah terang sawo matang, bukan oval navy | GAGAL (sebagian) | 23 panel sesuai. Di panel 22, pantulan berambut `#B1AB9D` (abu) dan dahi `#E1D1C1` karena tertutup embun `#F1EAD8` op 0,7. Hanya pita dagu yang sawo (`#F5C8A7`). Still: `work/.../zoom-22-face.jpg` |
| Skala ruang nyata masuk akal, metafora batin ditandai | OK | Kalender 01/25 kecil di dinding; di 07 lembar dekat terpotong bingkai; pantulan 19 lebih kecil; 06/12/23/24 berlabel "dunia batin/kecambah" (sheet2/3/6) |
| Lingkungan ACC tidak berubah di luar koreksi tokoh | OK | SVG 07 R4 identik byte dengan v3 `jan` (3945 B). SVG 01 identik dengan v3 `has`. Untuk 20, prefix 1749/2138 karakter identik sampai grup tokoh. 02: rasio kemiripan 0,957; 22: 0,71 (tokoh, pantulan, dan tangan berubah). |
| Pasangan cerita terbaca (01/25, 03/04, 06/24, 08/15, 16/22) | OK | Contact sheet `sheet1–7.jpg`: posisi kamera dan lingkungan tiap pasangan sama, keadaan berubah |
| Hapus versi lama, tidak ada artboard lama di inventaris aktif | OK di snapshot · live BELUM TERVERIFIKASI | Irisan ID before ∩ after = ∅. Label lama (Character Sheet, 08 V2, 21 V2, Aturan Render, v3) tidak muncul lagi. Canvas live tidak bisa dibuka (MCP Wonder perlu autentikasi). |
| Backup cukup untuk pemulihan | GAGAL (sebagian) | `canvas-before-r4.json` hanya berisi `dataNodeId` + `code`, tanpa x/y/width/height. Isi bisa dipulihkan, susunan tidak. |
| Tidak mengklaim video, timing audio, atau ACC final | OK | STORYBOARD/REVIEW/panduan produksi menyatakan estimasi, belum render, belum final |

## Temuan
| # | Tingkat | Di mana | Masalah | Bukti terukur | Perbaikan yang disarankan |
|---|---|---|---|---|---|
| 1 | MAJOR | `bap` Panel 22 · `qa-r4/panel-22.jpg` | Pantulan "wajah jujur" terbaca sebagai orang tua/hantu. Rambut dan mata tertutup embun, hanya pita dagu yang bersih. Caption menyebut "Pantulan berwajah sawo matang, kacamata dan rambut yang sama", dan DECISIONS menetapkan rambut `#1E1712`. Ini klimaks reff 3. | Piksel rambut (497,150) = `#B1AB9D`, dahi (500,200) = `#E1D1C1`, dagu = `#F5C8A7`. Overlay embun `path … fill="#F1EAD8" opacity="0.7"` menutup y 120–470. `work/zoom-22-face.jpg`, `zoom-16-22.jpg` | Geser pita yang sudah diusap supaya membuka mata dan rambut, atau gambar wajah pantulan di atas lapisan embun pada area yang terusap, sehingga rambut gelap dan kulit sawo terbaca penuh |
| 2 | MINOR | Panel 16 & 17 · `panel-16.jpg`, `panel-17.jpg` | Metafora "senyum di embun" tidak terbaca. Tidak ada lapisan embun yang terlihat; senyum putih menempel tepat di posisi mulut, dan di 17 mata tertutup melengkung sehingga wajah terbaca bahagia sungguhan. Ini bertentangan dengan caption "wajah tetap lelah di balik senyum embun". | `work/zoom-17-05-21.jpg` (kiri atas) | Tambahkan bidang embun tipis dan beri ekspresi murung yang jelas (alis/mulut turun) di bawah senyum, sedikit bergeser dari mulut asli |
| 3 | MINOR | Caption SFX panel 06, 14, 17, 20, 23, 24 vs STORYBOARD.md §cue | Caption mengatur musik ("musik turun ke drone rendah + swell" 14, "Drop musik di 'mungkin'" 23, "riser musik" 20, "lalu sunyi" 06), padahal spec menyatakan "Tidak menambah musik baru" dan "Tidak memotong lagu menjadi hening". Cue 14 di spec: "napas tertahan; tanpa hantaman". | Teks caption di `canvas-r4.json` (`rho`, `mai`, `per`, `yoi`) vs STORYBOARD.md baris 70, 78, 82, 87 | Samakan caption dengan lembar cue, atau tandai sebagai "ikuti dinamika lagu", bukan tindakan mix |
| 4 | MINOR | `canvas-before-r4.json` · REVIEW-R4.md:78 | Klaim "Cadangan kode mencakup isi/susunan sebelum" tidak akurat karena koordinat dan ukuran 32 akar lama tidak tersimpan | Kunci item before: `['dataNodeId','code']` saja | Koreksi klaim, atau simpan metadata artboard lama (x, y, w, h, label) dari riwayat kalau masih ada |
| 5 | MINOR | Panel 05 · `panel-05.jpg` | Spec menyebut "balon resolusi meninggalkan buku menuju jendela", tetapi di gambar tidak ada buku. Balon muncul dari area kepala/HP. | `zoom-17-05-21.jpg` (kanan atas) | Tambahkan buku di frame, atau ubah spec menjadi "dari HP/pikiran" |
| 6 | MINOR | Panel 21 · `panel-21.jpg` | Postur lari tidak terbaca. Torso tegak, satu tangan terangkat di bahu (lebih mirip melambai), padahal caption menyebut "torso condong ke depan, lengan bergantian". | `zoom-17-05-21.jpg` (kiri bawah) | Miringkan torso 8–12°, beri siku bawah terlihat untuk ayunan lengan kiri ke belakang, tambah offset bahu |
| 7 | MINOR | Panel 15 artboard `leo` | Tinggi 850 sementara 24 panel lain 828, sehingga grid tidak seragam | `canvas-r4.json` height 850 | Ringkas caption 15 atau samakan tinggi semua panel |

## Angka QC
- Inventaris before: 32 akar (25 panel awal, Character Sheet, 08 V2, 21 V2, Aturan Render, 01/07/19 V3). After: 27 akar, grid 5×5 dengan 2 panduan di y = −1450. Overlap 0, irisan ID 0.
- Identitas SVG: 07 = v3 (True), 01 = v3 (True), 19 ≠ v3 (sesuai klaim ada koreksi hoodie). Prefix lingkungan 20 sama sampai grup tokoh.
- `var(` di SVG: 0. Teks "zzz": 0. Semua 25 panel punya viewBox 1920×1080.
- Waktu: 25 baris, kontinu 0:00–2:22, caption = tabel 25/25.
- `git diff --check -- projects/lagu-kalah-lagi`: lulus.
- Still audit: `~/AI-OPS/audit-bridge/work/REQ-20261031-2300-loris-storyboard-r4/` (sheet1–7.jpg, zoom-16-22.jpg, zoom-17-05-21.jpg, zoom-22-face.jpg).
- Audit SFX semantik: N/A. Keluaran berupa storyboard diam tanpa stem/EDL, dan ini sudah dinyatakan di luar cakupan. Kelas cue di lembar rencana sudah sesuai event-nya (thump kasur, coretan spidol, tetes air, klik weker, tanpa swipe HP di 12). Yang bertentangan hanya caption, lihat temuan #3.

## Yang tidak bisa diverifikasi
- Kondisi canvas Wonder live (jumlah akar aktual, apakah akar lama benar-benar terhapus dari page Loris): MCP Wonder belum terautentikasi. Penilaian hanya memakai snapshot buatan agen pembuat.
- Apakah JPEG `qa-r4` benar screenshot native Wonder, bukan render ulang. Label "R4" di gambar konsisten dengan source.
- Rasa gerak, transisi, timing ke lagu, keterbacaan montase waktu, dan kualitas Scene07 untuk R4: belum ada animatic, lagu, atau render.
- Perbandingan side-by-side dengan referensi (2dmotion/Merantau): referensi tidak dibandingkan per panel dalam audit ini.
