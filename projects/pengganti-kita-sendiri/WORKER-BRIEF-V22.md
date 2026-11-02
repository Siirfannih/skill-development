# Brief v22: teks terlalu terburu-buru dan berkedip (Irfan 3 Nov 05.31)

Irfan (inti):
> "teksnya nggak diam … langsung berubah secepat mungkin, dan ada beberapa kali efek dip yang mungkin nggak kelihatan kalau kamu membedah frame secara frame besar karena efeknya cuma sebentar … teks yang muncul itu muncul, terus hilang, terus muncul lagi, padahal masih teks yang sama dan harusnya masih diam dulu, nunggu VO-nya selesai ngomong."

Video yang dikeluhkan: Mac `pks-studio/out/PKS_v21_video1.mp4` (cloud: `/mnt/user-data/uploads/AI-Video/pks-studio/out/PKS_v21_video1.mp4`). Kode: repo `projects/pengganti-kita-sendiri/remotion/src/lib/KineticVO.tsx` + `CaptionTrack.tsx`.

## Dugaan akar masalah (verifikasi dulu)

1. **Dip:** CSS `body:has([data-emph]) [data-caption]{visibility:hidden}` di KineticVO/CaptionTrack menyembunyikan teks VO di SETIAP frame yang memuat elemen penekanan, termasuk frame masuk/keluar 1–3 f. Hasilnya teks hilang sebentar lalu muncul lagi. Mask `emph`/`busy` (step 2 f) juga bisa berlubang.
2. **Terburu-buru:** frasa dipotong sangat pendek (`maxChars 32`, putus di jeda > 0,35 dtk). Akhir frasa = `min(awal frasa berikut, …)`, dan tiap frasa punya animasi masuk + keluar sendiri. Akibatnya teks berganti sangat cepat dan tidak "diam menunggu VO selesai".

## Tugas

1. **Gerbang QC per frame (alat baru, wajib):** buat `tools/text_flicker_check.py`.
   - Sumber: log OBJ setiap frame. Jalankan `node seg2_probe.mjs <dir> 0 133 1 0.1` (setiap frame, skala kecil); bila perlu tambahkan `useProbe` di KineticVO per blok/kata dengan id frasa yang stabil.
   - Laporkan:
     - (a) **DIP:** teks dengan id sama terlihat → hilang ≤ 15 f → terlihat lagi;
     - (b) **CEPAT:** blok teks tampil < max(1,0 dtk; 0,4 dtk + 0,2 dtk × jumlah kata), di luar kata yang sengaja diketik/dianimasikan;
     - (c) **DULUAN HILANG:** blok hilang sebelum kata terakhirnya selesai diucapkan VO (`timeline.json` e) + 0,25 dtk;
     - (d) **KEDIP PENEKANAN:** AnchorWord/SpeakerWords yang sama hilang lalu muncul ≤ 15 f.
   - Gerbang LOLOS = 0 temuan a/c/d dan 0 temuan b kecuali yang dikecualikan dengan alasan.
   - Jalankan alat ini dulu pada kode v21 dan catat jumlah temuan sebagai bukti masalah.
2. **Perbaikan bedah** (jangan desain ulang komposisi SPEC yang sudah ada; LOCKED.md tetap berlaku):
   - Hapus penyembunyian berbasis CSS `:has`. Visibilitas teks VO ditentukan dari interval penekanan yang sudah di-debounce: gabungkan celah < 15 f, abaikan penekanan < 6 f, dan jangan memunculkan teks VO untuk jendela < 18 f di antara dua penekanan.
   - Frasa dikelompokkan per klausa/kalimat ucapan, bukan per 32 karakter.
     - Blok tetap diam di layar sampai VO selesai mengucapkan kata terakhirnya + ≥ 0,4 dtk, atau sampai blok berikutnya mulai.
     - Blok < 1,0 dtk digabung dengan tetangganya (1–3 baris) supaya tidak berganti terlalu cepat.
     - Kata tetap muncul satu per satu mengikuti VO.
   - Bila blok berikutnya mulai ≤ 8 f setelah blok sebelumnya dan di posisi yang sama: ganti di tempat (swap), jangan putar animasi keluar + masuk penuh.
   - Animasi masuk/keluar tidak boleh memakan waktu baca. Keluar ≤ 6 f, dimulai paling cepat setelah VO kata terakhir selesai.
   - Komposisi SPEC per frasa disesuaikan dengan pengelompokan baru, dan tetap memakai variasi layout dan enter/exit (rotasi ≤ 2× berturut-turut).
3. **Verifikasi:**
   - `npx tsc --noEmit`;
   - `text_flicker_check.py` LOLOS;
   - `seg2_layout_check.py` tanpa CLASH baru;
   - contact sheet still di 6 titik yang dulu rawan: 0:12–0:20, 0:28–0:36, 1:03–1:10, 1:43–1:50, 1:57–2:05.
   - Tulis `REVIEW-V22.md`: akar masalah terverifikasi, jumlah temuan sebelum → sesudah, dan perubahan.
4. Commit + push file milikmu (`git pull --rebase --autostash origin main && git push origin HEAD:main`). Pesan commit diakhiri dengan:
   ```
   Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
   Claude-Session: https://claude.ai/code/session_01QPNycWQtoYsG5NpceQZXbF
   ```

   Jangan render final; Claude utama yang merender di Mac.

Proses panjang (probe seluruh film) dijalankan di latar belakang.
