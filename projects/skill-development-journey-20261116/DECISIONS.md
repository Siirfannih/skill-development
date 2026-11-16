# Keputusan potongan dasar

- Permintaan Irfan: pangkas take 3:29 menjadi sekitar 1:00–1:30 untuk akun personal. Tahap ini hanya seleksi cerita dan pembersihan potongan; editing visual ditugaskan pada sesi berikutnya.
- Hook dipilih dari bagian biaya langganan untuk uji coba, lalu konteks masalah hasil AI yang generik, workflow untuk keputusan editing, kanvas baru, tujuan produktivitas, dan cerita riset/biaya sebagai penutup. Semua ucapan berasal dari take ini.
- Angka 20×/5× di hook adalah ucapan pembicara. Tidak ditafsirkan menjadi harga, jumlah pembayaran, atau data performa oleh agent.
- Kalimat “skill yang di dalamnya … skill” memiliki pengulangan dan tidak menyediakan sambungan yang aman. Diganti dengan kalimat lengkap tentang workflow dari awal take. Filler “Ya” yang membuka respons tetap dipertahankan karena memberi masuk yang alami.
- Rincian token, hitungan frame, perkiraan pemakaian paket, koordinasi agent bolak-balik, perbandingan template yang berulang, koreksi beberapa hari/dua–tiga minggu, dan ajakan giveaway dipangkas agar cerita terfokus.
- Kalimat yang menyebut hasil video “100% full pakai AI” dipangkas karena merujuk hasil video lain yang belum disisipkan pada tahap ini.
- Durasi baseline enam bagian: 61,11105 detik. QC independen menemukan jeda berpikir 0,780 detik dan 0,800 detik. Dua rentang sunyi dipangkas sebanyak 46 frame menjadi 60,343617 detik. Jeda 0,520 detik setelah “template” dipertahankan sebagai batas klausa yang wajar.
- Format mengikuti rekaman: 16:9, 1920×1080, 60000/1001 fps, suara mono 48 kHz. Pengaturan level, EQ, dan denoise tidak diubah karena sampel suara sumber sudah terukur jelas (−16,7 LUFS, true peak −1,8 dBTP).
- Batas potong dipilih dari waveform dan konteks. Timestamp ASR utama dan window pendek dapat bergeser 100–500 ms; timestamp sendiri bukan bukti fonem lengkap. Transkripsi ulang tanpa prompt dari PCM hasil dipakai sebagai pemeriksaan isi.
- Microfade 2 ms hanya di sambungan sunyi. Audio dan video memakai batas frame yang sama; pembulatan PCM maksimum satu sampel pada ujung sunyi.
- Aturan dibaca dari main GitHub terbaru saat mulai (b981940), dalam clone dan konfigurasi skill khusus sesi. Jalur skill global PC dan checkout sesi lain tidak diubah.

Bukti QC berada pada paket handoff Drive. Pemeriksaan ASR, waveform, jumlah frame, sinkronisasi durasi, dan preview visual dibedakan dari penilaian dengar subjektif; tidak ada klaim listening PASS.
