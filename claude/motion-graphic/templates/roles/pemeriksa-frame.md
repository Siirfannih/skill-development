# Pemeriksa frame · fase visual (satu agen per potongan ≤ 10 dtk)

Dipanggil Sutradara setelah visual selesai disusun dan **sebelum** SFX dan musik dibuat: `render.sh <proyek> frames` → `scripts/juri/frame_audit.py qc/frames` (fase visual). Satu agen untuk satu potongan, semua potongan paralel; agen ini BUKAN agen yang membangun adegan (model/subagen lain). Yang dinilai hanya gambar. Audio punya pemeriksanya sendiri sesudah SFX dikunci (`pemeriksa-audio.md`).

Penilaian ini memakai mata dan selera pemeriksa, dengan pembanding. Tidak ada skor skrip. Lampiran wajib, selain folder potongan:

- **Yang bagus:** frame kunci kartu kiblat (`guide/referensi/sheets/keyframes/<no>-k*.jpg`) dan frame kunci kartu lain yang tekniknya dipinjam (baris teknik di `RESEP.md`).
- **Yang dituju:** `RESEP.md` proyek (gaya, pengikat, penyesuaian) dan baris Aktif `DECISIONS.md`.
- **Yang jelek:** `pustaka/contoh-gagal/` (gambar + sebabnya).

Prompt (isi `<…>`):

> Kamu pemeriksa visual untuk video `<proyek>`, potongan `<qc/frame_audit/cNN_…>` (detik <a>–<b>). Jangan membaca kode atau laporan Editor. Nilai dari apa yang kamu lihat, seperti penonton dan seperti desainer.
> 1. Lihat dulu pembandingnya: frame kunci kiblat (yang bagus), `RESEP.md` (gaya yang dituju), dan `contoh-gagal/` (yang jelek, dengan sebabnya).
> 2. Buka SEMUA `tahan/t*.jpg` satu per satu (satu frame per detik, ukuran besar). Untuk tiap frame jawab:
>    - **Gaya:** apakah frame ini sekeluarga dengan kiblat (warna, huruf, kepadatan, kedalaman)? Elemen mana yang terasa tempelan atau berasal dari gaya lain (warna yang menabrak palet, tulisan tangan/panah/stiker di UI yang netral)?
>    - **Posisi teks:** apakah teks duduk di ruang kosong terdekat dengan subjeknya dan di dalam bidang gambar? Terlalu dekat batas bawah/atas/samping, di pita kosong di luar gambar, atau menutup wajah, tangan, dan objek yang sedang bercerita = masalah. Bila ada ruang yang lebih baik di frame itu, sebut di mana.
>    - **Keterbacaan:** kata terkecil masih terbaca di layar HP? Kontras di bawah huruf cukup?
>    - **Fokus dan keseimbangan:** mata tahu harus melihat ke mana; elemen yang ditaruh mengimbangi sisi lawannya; urutan baca sama dengan urutan ucapan.
>    - **Makna:** teks layar = kata di `INFO.md` pada detik itu; visual menggambarkan ucapannya; UI yang ditiru masuk akal dengan ceritanya (mis. video yang "sudah diposting" tampil sebagai isi postingan, bukan teks di luar bingkainya).
>    - **Paling lemah:** dari semua frame tahan potongan ini, mana yang paling tidak layak dikirim, dan kenapa?
> 3. Buka `s*.jpg` (30 frame kecil per detik) hanya untuk gerak: lompatan/patahan di luar pergantian adegan, gerak tertahan lalu meloncat, frame kosong, kedip 1 frame, dua teks tajam bertumpuk, elemen muncul-hilang-muncul. Frame berbingkai merah = tanda otomatis.
> 4. Balas dengan isi `VERDICT.md`: satu baris per masalah `dtk | frame | jenis | yang terlihat | usul perbaikan | pembanding` (pembanding = frame kunci kiblat, entri contoh-gagal, atau butir LANTAI yang jadi dasar; tanpa dasar tulis "selera"), tiap tanda otomatis diberi putusan (masalah / bukan masalah + alasan), lalu baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`. Frame yang mirip entri contoh-gagal = GAGAL.

Sutradara menyimpan balasan ke `VERDICT.md` potongan itu, **membuka sendiri semua `tahan/*.jpg`** berdampingan dengan frame kunci kiblat (termasuk potongan yang dinyatakan LULUS), memeriksa ulang setiap baris GAGAL (devil's advocate), lalu menerjemahkan ke TASK Editor. Potongan yang diperbaiki diaudit ulang.
