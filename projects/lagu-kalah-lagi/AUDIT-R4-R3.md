# Audit REQ-20261031-2300-loris-storyboard-r4-r3 — Storyboard R4 "Kalah Lagi" (page Loris), ronde 3
VERDICT: PASS_WITH_NOTES
Ringkasan: Ronde 3 hanya mengubah satu hal: senyum embun di panel 17. Senyumnya sekarang ada di samping kanan mulut, di atas bidang wajah dan kaca, jadi tidak lagi terbaca sebagai kalung atau kerah. MINOR #2 dari ronde 2 beres. Inventaris tetap 27 akar dan tidak ada akar lama yang tersisa. Satu MINOR masih terbuka, yaitu pose lari panel 21, yang memang ditunda ke animatic. Kondisi canvas live belum terverifikasi.

## Cek terhadap permintaan Irfan
| Butir permintaan | Status | Bukti |
|---|---|---|
| Semua 25 beat ada, satu versi aktif per nomor; lirik, visual, kamera/transisi, niat SFX tersedia | OK | `canvas-r4.json` berisi 27 artboard: label "Panel 01" sampai "Panel 25" masing-masing satu, ditambah 2 "Panduan". Caption 17 memuat waktu (1:26–1:31, estimasi), lirik, visual, kamera, keluar, dan rencana SFX (`qa-r4/panel-17.jpg`). |
| Arah tokoh siluet/rim; kulit wajah terang, bukan oval navy | OK | Panel 17: wajah pantulan `#B87A4F` sawo matang dengan rambut gelap dan kacamata. Tokoh depan tampil sebagai siluet punggung dengan rim light. |
| Skala logis, metafora batin ditandai | OK (tidak berubah sejak R2) | Hanya panel 17 yang mtime-nya berubah (23:04:17). Panel lain tetap 23:00:19. |
| Lingkungan ACC tidak berubah di luar koreksi | OK | Perubahan R3 hanya path senyum `M1290,480 Q1350,538 1410,480`. Panel 02/07/20/22 tidak disentuh (mtime JPEG tetap). |
| Versi lama dihapus; backup cukup | OK di snapshot · live BELUM TERVERIFIKASI | ID after (27) ∩ ID before (32) = 0. Backup `canvas-before-r4.json` berisi 32 akar. |
| Gambar dan caption tidak bertentangan; tidak mengklaim video/timing/ACC final | OK | Caption 17 berbunyi "Senyum pada embun tetap pada permukaan kaca", sesuai gambar. Waktu ditandai "estimasi". SFX berbunyi "Lagu tetap utuh". |

## Temuan
| # | Tingkat | Di mana | Masalah | Bukti terukur | Perbaikan yang disarankan |
|---|---|---|---|---|---|
| 1 | MINOR (carry-over R2 #1) | Panel 21 · `qa-r4/panel-21.jpg` | Pose lari masih terbaca sebagai berdiri atau berjalan. | `work/REQ-…-r2/zoom-21.jpg`. Pembuat sudah menyatakan ini terbuka sampai uji animatic. | Selesaikan di animatic atau rig: tunjukkan condong lewat offset kepala terhadap bahu, plus siku depan yang terlihat. |
| 2 | MINOR | Panel 17 · `work/REQ-…-r3/p17-r3.jpg` | Ujung kiri senyum embun nyaris menyentuh sudut mulut asli, dan ujung kanannya melewati tepi wajah ke kaca. Di layar kecil, senyum dan mulut murung bisa terbaca sebagai satu garis bibir yang miring. | Wajah berpusat di (1260,410) dengan skala 1,3. Mulut asli berada di x 1237–1283. Ujung kiri senyum di x 1290, ditambah stroke 12 (setengah lebar 6), jadi tepinya di x 1284: jaraknya ≈0 unit SVG di y 480. Tepi kanan wajah pada y 480 ≈ x 1380, sedangkan senyum sampai x 1410. | Opsional. Geser senyum +20–30 unit ke kanan atau ke atas agar ada celah jelas dari mulut, atau biarkan saja dan uji di animatic, karena stroke draw di panel 16 akan memperjelas bahwa senyum itu lapisan kaca. |

## Angka QC
- Inventaris: 27 artboard (25 panel + 2 panduan). Overlap ID dengan before = 0. Backup berisi 32 akar.
- `var(` di dalam `<svg>`: 0 dari 26 blok SVG. Ada 458 `var(` di luar SVG, yaitu token caption, dan ini sesuai keputusan pembuat.
- Path senyum di source sama dengan JPEG. Proyeksi (1290→665 px, 1410→725 px, y 480→260 px pada lebar 1000) cocok dengan posisi lengkung putih di `panel-17.jpg`.
- JPEG `panel-17.jpg` dan `canvas-r4.json` mtime sama (23:04:17). Ke-26 JPEG lain tetap 23:00:19, jadi tidak ada perubahan lain.
- Audit SFX semantik: N/A (storyboard diam). Pembuat menyatakan tidak ada stem atau EDL, di luar cakupan. Cue panel 17 ("tarik napas; bunyi air hanya mengikuti tetes yang terlihat") sesuai kelas event.

## Yang tidak bisa diverifikasi
- Canvas Wonder live (apakah memang 27 akar dan akar lama sudah dihapus): MCP Wonder belum terautentikasi. Penilaian hanya memakai snapshot dan JPEG dari pembuat.
- Apakah JPEG `qa-r4` benar screenshot native Wonder. Isinya konsisten dengan source, tetapi tidak saya render ulang.
- Rasa gerak, transisi, timing terhadap lagu, montase waktu, siklus lari 21, dan Scene07: belum ada lagu, animatic, atau render.
- Perbandingan side-by-side dengan referensi 2dmotion/Merantau belum dilakukan.
