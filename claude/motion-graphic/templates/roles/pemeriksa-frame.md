# Menilai frame · fase visual (satu penilai: Sutradara)

Dijalankan setelah visual selesai disusun dan **sebelum** SFX dan musik dibuat: `render.sh <proyek> frames` → `scripts/juri/frame_audit.py qc/frames` (fase visual). Penilainya satu: Sutradara, yang tidak menulis kode adegan. Tidak ada pemeriksa lain di depannya dan tidak ada skor skrip; dua penilai menghasilkan beda pendapat yang harus ditengahi dan menghabiskan token tanpa menambah mata. Audio dinilai sesudah SFX dikunci (`pemeriksa-audio.md`). Setelah penilaian ini lulus, sekali sebelum render final, satu Creative Devil's Advocate dari luar memberi usul (`devils-advocate.md`); itu bukan penilai kedua dan tidak memberi LULUS/GAGAL.

Caranya sederhana: **lihat framenya, katakan apa yang salah, usulkan desain yang lebih baik dari kartu.**

1. **Buka pembandingnya dulu.** Frame kunci kartu kiblat dan kartu yang tekniknya dipinjam (`guide/referensi/sheets/keyframes/<no>-k*.jpg`) = yang bagus. `pustaka/contoh-gagal/` = yang jelek. `RESEP.md` dan baris Aktif `DECISIONS.md` = yang dituju video ini.
2. **Buka semua `tahan/t*.jpg`** tiap potongan (satu frame per detik, ukuran besar), satu per satu. Untuk tiap frame, lihat sebagai penonton lalu sebagai desainer:
   - Mata jatuh ke mana lebih dulu? Itu memang yang sedang diucapkan?
   - Di mana frame ini penuh, di mana kosong? Tengah menumpuk sementara kiri dan kanan kosong, atau satu sisi berat = masalah.
   - Teks: di dalam bidang gambar, di ruang kosong dekat subjeknya, cukup jauh dari batas bawah/atas/samping, tidak menutup wajah, tangan, atau objek yang sedang bercerita; kata terkecil terbaca di HP.
   - Gaya: sekeluarga dengan frame kunci kiblat (warna, huruf, skala kata hero, kedalaman)? Ada elemen yang terasa tempelan?
   - Makna: teks = kata yang diucapkan di detik itu (`INFO.md`); tampilan yang ditiru masuk akal dengan ceritanya.
   - Ada elemen yang terasa dipaksakan, atau bisa dihapus tanpa kehilangan makna? Hapus lebih dulu daripada menambah.
   - Mirip entri `contoh-gagal/`? Itu GAGAL.
3. **Frame yang lemah diberi solusi desain, bukan geseran kecil.** Tulis 1–2 pilihan, masing-masing menyebut kartu/frame kunci tempat prinsipnya terlihat, dan pilih satu. Contoh untuk kata hero yang duduk terlalu bawah, menumpuk di tengah dengan wajah dan tangan sementara kiri-kanan kosong:
   - (a) kata hero pindah ke **belakang kepala** dan dibesarkan sampai jadi fokus, kata kecil pengantarnya tetap di tengah (kartu 83, frame kunci k3/k4);
   - (b) potong ke **b-roll tipografi**: latar satu warna aksen layar penuh, kata hero putih dibesarkan sampai memenuhi frame (kartu 23/53, frame kunci k3 kata raksasa).
   Bila tidak ada kartu yang memuat prinsipnya, cari dulu di `pustaka/PETA.md`; tetap tidak ada → tanya Irfan.
4. **Buka `s*.jpg` (30 frame kecil per detik) hanya di detik yang bertanda otomatis** (LOMPAT/KEDIP/BEKU di `INFO.md`) atau yang geraknya kamu ragukan: patahan, frame kosong, kedip, dua teks tajam bertumpuk.
5. **Tulis `VERDICT.md` potongan itu** dari yang terlihat: satu baris per masalah `dtk | frame | yang terlihat | solusi terpilih | kartu/frame kunci atau contoh-gagal pembanding`, tiap tanda otomatis diberi putusan, lalu baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`. Baris GAGAL menjadi TASK Editor; potongan yang diperbaiki dinilai ulang.

Bila kuota Sutradara sempit, penilaian ini boleh diserahkan utuh ke **satu** subagen (model apa pun yang bisa melihat gambar) dengan file ini, pembanding di butir 1, dan folder potongan sebagai brief. Tetap satu penilai: hasilnya dipakai langsung, tidak dinilai ulang oleh model kedua.
