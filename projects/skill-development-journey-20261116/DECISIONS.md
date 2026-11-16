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

## Edit penuh (16 Nov 2026)
- Alur 6 babak ±1:25 dariku menggantikan struktur rough cut v1; v1 tidak dipakai sebagai dasar (hook dan urutan berbeda).
- Orkestrasi video ini: Opus kepala (sesi baru per fase, aturan hemat §1.4), subagen minimal Sonnet, tanpa Haiku, Fable opsional sekali, Codex builder + pemeriksa #1, Gemini pemeriksa #2 (`GUIDELINE.md` §1). Alasan: spec yang lemah dari kepala lebih mahal daripada selisih token Opus.
- Semua UI, logo, kartu paket, dan terminal dibangun di kode tanpa raster, meniru tampilan asli, supaya bisa dianimasikan.
- Kartu paket B4 menampilkan tier ChatGPT 20x (dipakai bulan lalu saat skill development dibangun) + Claude Max 5x.
- Output 1920×1080 29,97 fps (sumber 59,94 dibuang selang-seling).
- Kartu 83 Barsol Media hanya menyumbang teknik: teks kinetik, kamera, transisi. Ruang meredup tidak ditiru (itu pencahayaan syuting). Kiblat motion graphic dipilih dari pustaka di G1.
- Tiga mode bergantian: wajah penuh, wajah di pojok + visual, motion graphic penuh; mode per kalimat diputuskan model dari transkrip dan still.
- Guideline berisi hasil yang dimau + sedikit wajib + usulan; model memutuskan di lapangan dan mencatat alasannya.
- Musik dua varian dipasang paling akhir di atas satu render gambar (gabung `-c:v copy`): A sandwich Aware → With Some Malice → Aware strings; B pembuka Ecosystem (cadangan Ticking Tension). Lagu adalah usulan: model memilih bagian yang paling cocok dengan suasana video jadi (kandidat pembuka B: Ecosystem, Ticking Tension, depan Back To Black). Publikasi akun personal dengan kredit di caption; versi tanpa musik selalu diekspor sebagai cadangan.
