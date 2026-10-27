# Ronde 3: masukan Irfan + bedah referensi (ubah kode yang ada, JANGAN tulis ulang dari nol)

Masukan Irfan (verbatim, 27 Okt 22:15): "jangan ada background putih ya. Jadi langsung di zoom aja dari objeknya supaya apa yang dimaksud itu benar-benar kelihatan jelas ... pipa itu tuh dibedah tuh dari dalamnya. Kalau bisa dalamnya tuh kelihatan."
Devil's advocate (orchestrator): diterima. Penyesuaian: shot lebar tetap perlu untuk beat kedalaman (B4-B5), tapi memakai adegan full-bleed `well-full.png`, bukan balok di atas latar putih.

Bedah referensi `refs/ref-insinyur-dadakan.mp4` (3,5 jt views, lihat `refs/ref_sheet.jpg`): ±70% frame adalah close-up potongan pipa yang memenuhi layar; ganti shot tiap ±2 dtk; panah putih besar di dalam pipa untuk tekanan; tanda X merah di atas miskonsepsi "menyedot"; shot lebar hanya untuk ukuran kedalaman, dengan penggaris dua arah + badge peringatan "7 m".

Audio, VO, timing teks, dan isi kontrak TIDAK berubah. Teks: putih tebal dengan bayangan gelap kuat (atau pill gelap 55%) supaya terbaca di atas gambar; tetap di sepertiga atas, tengah. Dilarang teks biru di latar gelap.

Gambar baru di `public/img/` (lihat sendiri dan ukur koordinatnya): `macro-pump-pipe.png` (pompa dibelah, impeller terlihat, pipa dibelah: atas kosong, bawah kolom air), `macro-water-inlet.png` (ujung pipa di air sumur, pipa dibelah), `well-full.png` (adegan lebar full-bleed), `compare-shallow.png` dan `compare-deep.png` (9:8).

| Beat | Perubahan |
|---|---|
| Global | Hapus semua latar putih/krem. Setiap frame terisi gambar sampai tepi (cover). Tidak ada hold > 3 dtk tanpa gerak kamera atau elemen baru. |
| B1 | 0-2,0: close-up `macro-pump-pipe` di pompa + impeller (scale cukup supaya pompa memenuhi lebar). 2,08: transisi halus ke `well-full`, kamera tilt turun mengikuti pipa sampai permukaan air jauh di bawah. Teks tidak boleh menutupi pompa. |
| B2 | `macro-pump-pipe`: kamera turun dari impeller ke bagian pipa yang dibelah. Pada 7,19 ("nyedot") tanda X merah tebal muncul di atas kata "nyedot" pada teks. Pada 9,36 label "ruang hampa" menunjuk ke bagian atas pipa yang kosong, dengan kilau/denyut halus di area kosong itu. |
| B3 | `macro-water-inlet`: 11,88 overlay kolom air naik di dalam pipa yang dibelah (plus gelembung kecil). 13,44 tiga panah putih besar menekan permukaan air dari atas + label "tekanan udara". |
| B4 | `well-full` lebar: penggaris di samping sumur (0 m di tanah, 11 m di permukaan air), angka tick 36 px tebal; badge oranye dengan ikon peringatan "7-9 m" seperti referensi. Kolom air di pipa naik hanya sampai batas 9 m. |
| B5 | `well-full` (break ke wide), desaturasi, air naik-turun gagal 2x, pompa bergetar. Pertahankan logika yang ada. |
| B6 | 26,79-30,4: panah ukur di `well-full`. 30,45 flash putih singkat, lalu layar dibagi atas-bawah full-bleed: atas `compare-shallow` dengan pill "Sampai 9 m: pompa sumur dangkal", bawah `compare-deep` dengan pill "Lebih dari 9 m: pompa jet sumur dalam". Mulai 32,38 bagian bawah disorot (border oranye tebal), bagian atas meredup. Hapus kartu produk berlatar putih. |
| B7 | Latar `well-full` di-blur dan digelapkan (bukan putih). Panel CTA yang sudah lulus di r2 dipertahankan. |

Render tetap dikerjakan orchestrator. Kamu: ubah kode, jalankan typecheck, lalu lapor BRIEF dengan koordinat yang kamu pakai.

Catatan: kalau macro-water-inlet.png belum ada saat kamu mulai, kerjakan beat lain dulu; file itu sedang dibuat dan akan muncul dalam beberapa menit (cek ulang sebelum mengerjakan B3).
