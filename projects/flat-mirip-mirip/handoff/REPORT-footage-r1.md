# Footage r1 · flat-mirip-mirip

Siap dipilih Sutradara: **13 kandidat** dari Mixkit, Coverr, dan Wikimedia Commons. Semua F1–F6 punya 2–3 kandidat. Belum ada pilihan final.

Buka [lembar pratinjau](../media/footage/kandidat.jpg) (2400×2565 px, 39 pratinjau berlabel) dan [LOG sumber lengkap](../media/footage/LOG.md) untuk URL halaman, URL file, resolusi, durasi, ukuran, SHA-1, serta status lisensi sumber.

| ID / adegan | Kandidat | Isi |
|---|---|---|
| F1 · P11 “Founder itu jualan kepercayaan” | [F1-a](../media/footage/F1/F1-a-mixkit-teh-pelanggan.mp4), [F1-b](../media/footage/F1/F1-b-mixkit-serah-tas-toko.mp4) | Pelayan menyerahkan teh di meja kafe hangat; penjaga toko menyerahkan tas putih polos melewati meja kasir. |
| F2 · P12 “lebih mudah ingat orangnya” | [F2-a](../media/footage/F2/F2-a-mixkit-potret-perempuan-bata.mp4), [F2-b](../media/footage/F2/F2-b-mixkit-potret-pria-rumah.mp4), [F2-c](../media/footage/F2/F2-c-mixkit-potret-pekebun.mp4) | Perempuan berlatar bata, pria di interior rumah, dan pekebun di cahaya sore memandang kamera dalam framing dada/pinggang ke atas. |
| F3 · P14 “ceritamu” | [F3-a](../media/footage/F3/F3-a-wikimedia-keluarga-brown-1910.jpg), [F3-b](../media/footage/F3/F3-b-wikimedia-keluarga-sanford-1910.jpg) | Dua foto keluarga Brown dan Sanford dari Oxford, Ohio, 1910, bertekstur arsip hitam-putih dan berstatus domain publik pada metadata Commons. |
| F4 · P14 “sudut pandangmu” | [F4-a](../media/footage/F4/F4-a-mixkit-jendela-bidik-danau.mp4), [F4-b](../media/footage/F4/F4-b-wikimedia-pov-jendela-bidik.jpg) | Klip tangan memegang kamera tua dengan danau di jendela bidik, serta foto POV melalui jendela bidik ke bangunan dan pepohonan. |
| F5 · P14 “hal yang cuma kamu alami” | [F5-a](../media/footage/F5/F5-a-mixkit-buku-catatan-cokelat.mp4), [F5-b](../media/footage/F5/F5-b-mixkit-detail-buku-harian.mp4) | Tangan menulis di buku catatan cokelat pada meja gelap, serta detail pena dan halaman buku harian bertulisan tangan. |
| F6 · P07–P08 | [F6-a](../media/footage/F6/F6-a-mixkit-kota-senja.mp4), [F6-b](../media/footage/F6/F6-b-coverr-pejalan-puncak.mp4) | Aerial kota saat senja dan aerial pejalan kecil di punggung gunung menjadi dua contoh footage sinematik netral untuk preview timeline editor. |

Total folder footage: **177.709 MB** (177,708,795 byte; `du -sh`: **170M**), di bawah 300 MB. Media saja 176,373 MB: 10 klip (4×1080p, 6×720p) + 3 foto bersisi panjang 1280 px. Durasi klip 6,000–19,583 detik; seluruh klip 16:9 dan ≤20 detik. Berkas sumber tidak diubah.

Pemeriksaan: 13/13 SHA-1, ukuran, resolusi, dan durasi cocok dengan file lokal; seluruh klip didekode saat ekstraksi QC. Isi dilihat pada 130 frame (1 fps) dan foto utuh; tidak tampak merek/logo jelas, selebritas yang dikenali, atau watermark situs pada pratinjau yang diperiksa. Lembar akhir dilihat langsung dan label terbaca. Foto memakai satu tampilan utuh + dua detail di lembar; file fotonya tetap utuh.

F1 memakai alternatif layanan pelanggan, F4 memakai alternatif POV/jendela bidik. Tidak ada adegan jabat tangan di toko atau kamera membidik melalui jendela rumah. Sebagian versi gratis Mixkit berstatus Restricted/personal; statusnya dicatat per kandidat di LOG untuk pengurusan lisensi oleh Irfan.

Sumber gagal/akses:

- Wikimedia API awal: HTTP 403 meminta identitas aplikasi; berhasil dengan User-Agent aplikasi yang konsisten sesuai kebijakan API.
- File asli Wikimedia untuk F3-a, F3-b, F4-b: HTTP 429; versi ringan 1280 px resmi dari API berhasil HTTP 200 dan itulah file yang diserahkan.
- Coverr: satu URL halaman tebakan memberi HTTP 404; URL resmi diambil dari slug data halaman dan berhasil. HEAD CDN mengarah ke beranda, sedangkan GET MP4 berhasil.
- Pixabay dan Pexels tidak dicoba ulang sesuai brief (HTTP 403 yang sudah dilaporkan); tidak memakai browser otomatis, proxy, atau percobaan User-Agent. Internet Archive tidak diperlukan.

Tidak ada commit, pemilihan kandidat final, perubahan video, atau perubahan pada file di luar daftar yang diizinkan.
