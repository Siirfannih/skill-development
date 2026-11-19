# REPORT · TASK-R7B2-punchline

**Siap ditinjau; QA teknis lolos.** D-477b: PROFESIONAL dan SKILL GRATIS kini mengambil seluruh frame, hanya Anton dan dua garis titik tipis. Masuk/keluar dengan cut satu frame, tahan dengan skala bertambah pelan. Penilaian kreatif akhir tetap milik penilai mata terpisah/Sutradara sesuai handoff.

- [Rakitan rentang 76,31–83,82](../qc/r7b2/punchline/rakitan.mp4), 1920×1080, 225 frame @30000/1001, tanpa audio.
- [Sebelum / sesudah / spine](../qc/r7b2/punchline/sebelum-sesudah-spine.jpg).
- [Strip PROFESIONAL, 31 frame berurutan](../qc/r7b2/punchline/strip-profesional.jpg): enam sebelum + seluruh 19 frame punchline + enam sesudah, master f2349–2379.
- [Strip SKILL GRATIS, 29 frame berurutan](../qc/r7b2/punchline/strip-skill-gratis.jpg): enam sebelum + seluruh 17 frame punchline + enam sesudah, master f2462–2490.
- [Cache D_IG](../lego/cache/r7b2_punchline_D_IG.mp4) sudah didaftarkan di [override IG](../lego/r7_override_ig.json).

## Kondisi footage sebelum edit

Dibaca langsung dari [lembar kondisi sebelum](../qc/r7b2/punchline/kondisi-sebelum.jpg): wajah sedang berada dalam video kecil di kiri postingan IG, dengan panel komentar putih besar di kanan dan pita hitam atas/bawah video. PROFESIONAL chartreuse lama terkurung video dan kepala menutupi kata; pada hadiah, wajah sudah dekat tetapi label SKILL terpisah jauh dari GRATIS. Ruangan abu-biru dan baju bermotif menambah detail, sehingga dua punchline memerlukan kanvas yang menghilangkan seluruh footage dan UI selama penekanan.

## Referensi dan keputusan visual

[Strip Sam John 16,2–17,4](../qc/r7b2/punchline/ref-samjohn-16.2-17.4.jpg) dibuka: semua 36 frame berurutan. Satu cut mengganti pembicara dalam ruang gelap menjadi oranye penuh dengan INTERESTING besar; setelah hold, warna/kata berganti. Kata mengambil seluruh perhatian karena footage benar-benar hilang. Penyesuaian kita: keluar sepenuhnya dari kotak IG, memakai warna merek, lalu kembali ke IG/wajah.

[Spine 5–6](../qc/r7b2/punchline/spine.jpg) dan `qc/r7/brief2/GERAK.md` menjadi acuan bentuk dan gerak: Anton besar di tengah, dua garis titik tipis, potong masuk seperti FINALLY, pembesaran pelan selama tahan. Tinggi huruf disesuaikan setelah melihat render berdampingan dengan spine; ukuran kartu tidak dipakai sebagai target.

Arah: sisipan editorial untuk reel siirfan, ENERGY 3 / RHYTHM 3 / MOTION 2. Warna dan Anton berasal dari brief; garis titik mengapit kata sesuai spine, tanpa menjadi objek fokus kedua. Skala 1→1,035 memakai kurva `drift`; kamera IG tidak diubah.

## Waktu dari words.json dan hasil rakitan

Semua frame berbasis nol; rentang berikut setengah terbuka `[masuk, keluar)`. Kisi master 30000/1001 fps; D_IG mulai f2290.

| Punchline | Ucapan di edit/words.json | Lokal D_IG | Master hasil | Detik hasil |
|---|---|---|---|---|
| PROFESIONAL | 78,5927–79,2127 | [65,84) | [2355,2374) | 78,578500–79,212467 |
| SKILL GRATIS | skill 82,3406; gratis selesai 82,9056 | [178,195) | [2468,2485) | 82,348933–82,916167 |

Batas dibulatkan ke frame terdekat; selisih terbesar 14,2 ms, di bawah setengah frame. PROFESIONAL keluar tepat ke narasi “nggak?” yang sudah ada. Hadiah tampil sebagai satu elemen teks **SKILL GRATIS**, satu baris, sejak onset skill. Empat frame sisa GRATIS lama [195,199) diganti footage berjalan; narasi lain tidak digeser. [Perbandingan waktu](../qc/r7b2/punchline/cek-waktu.json) juga menjadi titik potong untuk pemilik SFX; audio tidak disentuh.

## Perubahan dan bukti

- `b6.tsx`: punchline dipilih pada tingkat frame utama, di luar transformasi kamera dan motion blur IG. Cabang matte di dalam panel dihapus.
- `bersama/KataBelakang.tsx`: komponen murni warna penuh + Anton 400, tanpa decoder footage, canvas matte, atau label terpisah. PROFESIONAL `#C8E64A`/`#080608`; SKILL GRATIS `#2E5BFF`/putih hangat `#FAF8EC`. Semua warna/font memakai token yang sudah ada.
- `bersama/ig/waktu.ts`: menambahkan batas punchline; peristiwa ketik/kirim/komentar/balasan tetap.
- `bersama/ig/NarasiIG.tsx`: hanya menghapus entri label SKILL lama, tanpa perubahan entri atau gaya narasi lain.
- `lego/r7_override_ig.json`: hanya `src` D_IG berubah. Posisi, waktu, daftar buang, dan override pekerja lain tidak ditulis TASK ini.

**183/183 frame IG di luar patch identik secara framemd5 dengan R3:** lokal 0–64, 84–177, 199–222. [Bukti per frame](../qc/r7b2/punchline/identitas-frame.json). Patch berjumlah 40 frame: 19 PROFESIONAL + 17 SKILL GRATIS + 4 pembersihan ekor GRATIS lama.

[Hashes dan pemeriksaan cakupan](../qc/r7b2/punchline/cakupan-terjaga.json): `edit/words.json`, `edit/suara.wav`, token `tema.ts`, props/kamera IG, dan cache R3 tetap. Hash override UI berubah selama sesi paralel; TASK ini hanya menulis override IG. Rakitan memakai lapisan beririsan dari resep gabungan: b10a_meja3d, D_IG, T080; [snapshot integrasi](../qc/r7b2/punchline/integrasi.json).

## QA teknis

- Typecheck `npx tsc --noEmit`: exit 0, [log](../qc/r7b2/punchline/tsc.log).
- Motion lint hanya empat file kode IG yang berubah: PASS, [log](../qc/r7b2/punchline/motion-lint.log). `git diff --check` pada lima file sumber/override: exit 0.
- [Cache](../qc/r7b2/punchline/cache-probe.json): 223 frame @30 fps, 1920×1080, satu stream video tanpa audio. [Rakitan](../qc/r7b2/punchline/rakitan-probe.json): 225 frame @30000/1001, 7,5075 detik, yuv420p BT.709.
- [Pemeriksaan 36 frame punchline di rakitan](../qc/r7b2/punchline/hasil-rakitan.json): seluruh bidang atas/bawah memenuhi warna target, toleransi RGB maksimum **2 tingkat per kanal**, tanpa pita hitam. Batas masuk dan keluar diperiksa pada tiap frame tetangganya.
- Lebar huruf membesar monoton: PROFESIONAL sekitar 1640→1696 px; SKILL GRATIS 1640→1700 px. Semua huruf tetap dalam margin aman. [Kontras token](../qc/r7b2/punchline/kontras.json): PROFESIONAL **14,30:1**, SKILL GRATIS **4,86:1**.
- Strip hasil rakitan dan sanding sebelum/sesudah/spine sudah dibuka langsung. Ini pemeriksaan pembuat atas bukti teknis; bukan pengganti QC kreatif terpisah.

Antislop: **Hard Gate PASS**, teks dari ucapan, tanpa clipping, kontras terukur; **Purpose Gate PASS**, warna/font/garis sesuai brief dan spine; **Liveliness PASS**, satu fokus dan hold membesar; **Craftsmanship PASS**, render rentang, strip seluruh frame, dan identitas narasi terbukti. Pemeriksaan interaksi web tidak berlaku untuk video.

## Catatan perakitan untuk Sutradara

Composer bersama mengonversi RGB ke YUV dengan matriks bawaan, lalu hanya menandai keluaran BT.709. Percobaan pertama menggeser chartreuse hingga 13 tingkat per kanal. Untuk rakitan QC ini, [rakit.py](../qc/r7b2/punchline/rakit.py) memakai perintah dari `compose.build_cmd` dan menambahkan **`scale=out_color_matrix=bt709:out_range=tv` sebelum format akhir**. Konversi tersebut perlu ikut dipakai pada perakitan akhir agar warna cache tetap benar; [perintah persis](../qc/r7b2/punchline/rakit-command.json). Alat bersama dan piksel cache narasi tidak diubah.

`r7_gabung.py` berhasil, 56 lapisan. Percobaan `compose.py lego_r7.json --rentang 76.3 83.82` masih mendekode seluruh master; proses milik TASK ini dihentikan, lalu input disaring ke rentang yang beririsan melalui [rentang.py](../qc/r7b2/punchline/rentang.py). Hasil memakai transformasi/urutan overlay yang sama. Masalah awal symlink video di bundle QC juga sudah diperbaiki; render ulang sukses.

Reproduksi setelah render dua patch `--frames=65-83` dan `--frames=178-198` memakai props `qc/r7/ig/props.json`, entry `src/video/index.ts`, `--codec=h264 --crf=12 --image-format=png --muted --concurrency=3`:

```bash
python3 qc/r7b2/punchline/bangun.py
(cd lego && python3 r7_gabung.py)
python3 qc/r7b2/punchline/rentang.py
python3 qc/r7b2/punchline/rakit.py
python3 qc/r7b2/punchline/bukti.py --rakitan qc/r7b2/punchline/rakitan.mp4
```

Tanpa commit/push repo proyek, perubahan skill/PETA, audio, atau kamera global, sesuai `R7B2-BERSAMA.md`. Doctor awal hanya menandai PETA basi yang sudah dicatat handoff; profil siirfan lulus. Tidak ada keputusan tambahan yang perlu diminta.

## Ronde 2

TASK-R7B2-ig-r2, D-485: koreksi framing tombol Post setelah PROFESIONAL dan posisi kata “aku”. Punchline, kata lain, waktu ucapan, audio, kamera global, dan override pekerja lain berada di luar cakupan.

### Kondisi sebelum edit

[Post sebelum](../qc/r7b2/ig-r2/kondisi-post.jpg) dan [aku sebelum](../qc/r7b2/ig-r2/kondisi-aku.jpg) dibuka sebelum kode diubah. Video wajah mengambil sisi kiri dengan latar dinding abu-biru, baju berpola dan tangan memegang mik; sisi kanan adalah panel putih berisi caption dan thread komentar. Setelah PROFESIONAL, sisi kanan kartu melewati tepi layar sehingga Post dan menu terpotong; ketika “aku” tampil, thread balasan sudah mengisi panel dan menyisakan celah tipis di atas bar aksi.

### Perubahan yang diuji

- Kamera lokal IG: setelah cut keluar PROFESIONAL, pusat kamera digeser secukupnya untuk memberi margin kanan 96 px pada kunci sebelum pan. Koreksi mengikuti kurva pan yang sudah ada dan habis di kunci 3,22 dtk lokal; skala dan sumbu y tetap.
- Hanya koordinat “aku” yang dipindah ke ruang putih di atas thread, di kanan label umur caption. Ukuran, warna, font, waktu tampil dan gerak masuknya tetap.

Referensi [IG 0,5–1,7](../qc/r7b2/ig-r2/ref-ig-0.5-1.7.jpg) dibuka sebagai strip 36 frame berurutan, bersama frame kartu 65 k1 dan contoh gagal 10. Pada referensi, pull-back membuka ruang untuk kartu dan ikon aksi; syaratnya satu objek UI dominan di kanvas terang. Kita mempertahankan tampilan IG yang ada, memberi ruang pada tepi kanan, dan memakai area putih bebas di atas thread untuk “aku”; tidak menambah panah, wadah, atau gerak baru.

### Hasil dan bukti terbaru

**Siap ditinjau; QA teknis lolos.** Margin kanan kartu paling kecil **96 px** sepanjang 13 frame koreksi, dan tepi tulisan Post paling dekat **126 px** dari kanan. Ukuran ini diperiksa dari piksel cache dan hasil rakitan, bukan hanya dihitung dari kamera: [margin per frame](../qc/r7b2/ig-r2/margin-post.json). Kata “aku” sekarang berada di ruang putih di atas thread; kotak huruf pada still tahan adalah `[1389, 230, 1487, 275]` di kanvas 1920×1080, jauh dari Reply dan bar aksi. [Posisi](../qc/r7b2/ig-r2/posisi-aku.json).

- [Still sebelum/sesudah](../qc/r7b2/ig-r2/sebelum-sesudah.jpg), f2380 / 79,413 dtk dan f2458 / 82,015 dtk; [detail tombol Post](../qc/r7b2/ig-r2/detail-post.jpg).
- Strip Post **25 frame berurutan**, master f2368–2392 / 79,012–79,813 dtk: [sebelum](../qc/r7b2/ig-r2/strip-post-sebelum.jpg) · [sesudah rakitan](../qc/r7b2/ig-r2/strip-post-sesudah.jpg).
- Strip “aku” **16 frame berurutan**, master f2449–2464 / 81,715–82,215 dtk: [sebelum](../qc/r7b2/ig-r2/strip-aku-sebelum.jpg) · [sesudah rakitan](../qc/r7b2/ig-r2/strip-aku-sesudah.jpg).
- [Rakitan rentang 76,310–83,817 dtk](../qc/r7b2/ig-r2/rakitan.mp4), 225 frame @30000/1001, 1920×1080, tanpa audio. Still dan keempat strip di atas sudah dibuka langsung. Ini pemeriksaan pembuat; penilaian kreatif tetap milik Sutradara/penilai terpisah.

| Koreksi | Lokal D_IG, setengah terbuka | Master, setengah terbuka | Detik |
|---|---|---|---|
| Framing kanan Post | [84,97) | [2374,2387) | 79,212–79,646 |
| Posisi “aku” | [165,169) | [2455,2459) | 81,915–82,049 |

Framing mulai tepat saat kembali dari PROFESIONAL agar tidak melompat di tengah shot, lalu bertemu lintasan kamera asli pada kunci pan 3,22 dtk lokal. “Aku” hanya pindah koordinat panel `(300,631) → (475,180)`; perlakuan font/warna/ukuran, durasi dan gerak masuk tidak berubah. “Nanti”, “kasih”, narasi lain, serta punchline tetap.

### Cakupan dan QA teknis

[Diff terhadap basis awal TASK](../qc/r7b2/ig-r2/perubahan.diff): empat baris koreksi x di `b6.tsx`, satu entri koordinat “aku” di `NarasiIG.tsx`, dan hanya `src` D_IG pada override. Cache baru [r7b2_ig_r2_D_IG.mp4](../lego/cache/r7b2_ig_r2_D_IG.mp4) sudah didaftarkan di [override IG](../lego/r7_override_ig.json); cache punchline ronde pertama tetap tersedia sebagai basis.

**206/206 frame di luar dua patch identik secara framemd5 dengan basis R7B2 punchline**: lokal 0–83, 97–164, 169–222, termasuk seluruh PROFESIONAL dan SKILL GRATIS. [Bukti identitas](../qc/r7b2/ig-r2/identitas-frame.json). Patch 13 + 4 frame disisipkan ke cache basis dengan enkode lossless; cache tetap 223 frame @30 fps dan satu stream video tanpa audio. [Probe cache](../qc/r7b2/ig-r2/cache-probe.json), [probe rakitan](../qc/r7b2/ig-r2/rakitan-probe.json).

Typecheck exit 0, motion lint kedua file kode PASS, dan diff whitespace exit 0: [ringkasan gerbang](../qc/r7b2/ig-r2/gates.json), [tsc](../qc/r7b2/ig-r2/tsc.log), [motion lint](../qc/r7b2/ig-r2/motion-lint.log). Pemeriksaan sumber memastikan `b6.tsx` hanya bertambah koreksi x lokal dan `NarasiIG.tsx` hanya mengubah dua koordinat “aku”.

[Pemeriksaan hash](../qc/r7b2/ig-r2/cakupan-terjaga.json): `waktu.ts`, `KataBelakang.tsx`, props/kunci kamera IG, token tema, `edit/words.json`, `edit/suara.wav`, `r7_gabung.py`, dan `r7_finishing.py` identik dengan awal TASK. Override UI berubah selama sesi paralel; file itu hanya dibaca untuk snapshot integrasi, tidak ditulis TASK ini.

Integrasi memakai snapshot seluruh override terbaru pada direktori QC sendiri dan menjalankan `r7_gabung.py` **tanpa mengubah skrip atau keluaran bersama**: 54 lapisan, lalu hanya b10a_meja3d, D_IG dan T080 yang beririsan dirakit. [Snapshot integrasi](../qc/r7b2/ig-r2/integrasi.json), [log gabung](../qc/r7b2/ig-r2/gabung.log). Konversi BT.709 eksplisit tetap mengikuti cara QC ronde pertama; audio dan master penuh tidak dirakit.

Reproduksi setelah render dua patch menggunakan bundle entry `src/video/index.ts`, props `qc/r7/ig/props.json`, `--frames=84-96` / `--frames=165-168`, `--codec=h264 --crf=12 --image-format=png --muted --concurrency=3`:

```bash
python3 qc/r7b2/ig-r2/bangun.py
python3 qc/r7b2/ig-r2/rentang.py
python3 qc/r7b2/ig-r2/rakit.py
python3 qc/r7b2/ig-r2/bukti.py
```

Tanpa commit proyek, perubahan skill/PETA, audio, kamera global, `lego/r7_gabung.py`, atau `lego/r7_finishing.py`. Tidak ada keputusan tambahan yang perlu diminta.
