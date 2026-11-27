# Profil merek dan folder data user

Repo ini hanya menyimpan cara kerja dan cetakan kosong. Data milik user (profil merek, footage, proyek) disimpan di **folder data** yang dipilih user sendiri. Instruksi tidak pernah menyebut lokasi tetap: di awal sesi, cari folder data yang sudah dipakai (folder kerja sesi, atau folder yang disebut user); bila belum ada, tanyakan satu kali ke user di mana folder data mau dibuat, lalu buat strukturnya persis seperti di bawah.

## Struktur folder data

```
<folder data pilihan user>/
├── merek/
│   └── <slug-merek>/
│       ├── BRAND.md          siapa mereknya + nilai pasti (warna, huruf, logo): dari templates/merek/BRAND.md
│       ├── EDITING.md        cara video merek ini diedit: dari templates/merek/EDITING.md
│       ├── aset/
│       │   ├── logo/         logo-terang.svg, logo-gelap.svg (atau png ≥ 1024 px)
│       │   ├── font/         file font yang dipakai (woff2/ttf/otf)
│       │   └── sfx/          bunyi milik merek (opsional)
│       └── contoh/
│           ├── bagus/        frame/klip yang user setujui untuk merek ini + satu baris sebab
│           └── ditolak/      frame yang user tolak untuk merek ini + satu baris sebab
└── proyek/
    └── <slug-video>/         RESEP.md, DECISIONS.md, STATUS.md, handoff/, sumber/, out/ (satu video)
```

- Satu merek bisa punya banyak video; `BRAND.md` dan `EDITING.md` dipakai ulang di semua videonya. Selera satu video tetap di `proyek/<slug-video>/DECISIONS.md`.
- `contoh/` milik merek itu saja. `cookbook/contoh-gagal/` di repo hanya untuk kesalahan kerja yang salah di gaya apa pun.
- Cek bentuknya: `python3 claude/motion-graphic/scripts/juri/profil_cek.py <folder data>/merek/<slug-merek>`.

## Memastikan profil ada

1. Cari `merek/<slug>/BRAND.md` untuk merek di brief. Ada dan `profil_cek.py` LULUS → lanjut ke editing guideline.
2. Belum ada atau GAGAL → susun drafnya sendiri dan ajukan di percakapan bersama keyframe pertama; pekerjaan lain jalan terus:
   - Kumpulkan dulu yang bisa dicari sendiri: logo, font, dan warna dari aset yang user kirim, situs, atau repo produknya. Tulis apa adanya; nilai yang tidak ditemukan ditulis `?` dan ditanyakan, tidak dikarang.
   - Tanyakan sisanya dalam satu pesan pendek dengan pilihan (mis. tiga pasangan huruf dari kartu terdekat), bukan formulir panjang.
3. Jalankan `profil_cek.py` pada draf; GAGAL diperbaiki bersama jawaban user, bukan alasan menunda langkah berikutnya.

## Editing guideline + preview

Gaya yang disebut user ("Apple style", "cinematic") adalah tema konsep, bukan template. Model menerjemahkannya menjadi visual untuk video ini:
1. Cari 2–3 kartu terdekat lewat `cookbook/INDEX.md`, lalu tunjukkan frame kuncinya di percakapan: "yang kamu maksud lebih ke yang mana?". Jawaban user ditulis ke `EDITING.md` bila berlaku untuk merek, atau ke `RESEP.md` proyek bila hanya untuk video ini.
2. Buat preview dari kode yang sama dengan video final: still per beat di atas frame footage asli (`render.sh still`), plus klip draft skala 0,5 hanya untuk beat yang punya gerak kamera atau transisi. Kirim langsung di percakapan yang sedang dipakai (gambar/klip dilampirkan), bukan halaman atau link terpisah.
3. Masukan user di sini masuk `DECISIONS.md` sebagai baris `Irfan`/user. Setelah user setuju, produksi berjalan penuh tanpa meminta revisi.
