# REPORT · TASK-R7-ig

**Siap ditinjau; QA teknis lolos.** D-454, D-455, D-456, D-457, D-462, D-465. Tidak ada commit/push repo proyek, sesuai R7-BERSAMA.

- [Rakitan rentang 76,3–83,82](../qc/r7/ig/rakitan.mp4) · 1920×1080, 225 frame, 30000/1001 fps, tanpa audio.
- [Lembar 4 fps](../qc/r7/ig/lembar-4fps.jpg) · [sebelum/sesudah tujuh still](../qc/r7/ig/sebelum-sesudah.jpg).
- [D_IG baru](../lego/cache/r7_ig_D_IG.mp4) · [override IG](../lego/r7_override_ig.json) · [peristiwa SFX dalam JSON](../qc/r7/ig/sfx-events.json).

## Pesan → maksud → alasan → bentuk (D-466)

| Pesan | Maksud | Alasan | Bentuk visual |
|---|---|---|---|
| “Udah kerasa video editing profesional gak? Atau …” | Mengajak penonton menilai hasil video | Video yang dinilai harus tetap dikenali sebagai isi postingan | K4 Poppins di dada, ganti per kata; PROFESIONAL hijau tetap dari R6; “gak?” di kiri dan “Atau” di kanan wajah sebelum kamera menuju komentar |
| “Comment di bawah.” | Memperagakan tindakan yang diminta | Mengetik di kolom asli lebih jelas daripada cincin penunjuk | Kamera mendekati dan memusatkan panel; “Skill” diketik dengan kursor, kolom dibersihkan saat dikirim, komentar dimasukkan sebagai baris IG |
| “Nanti aku kasih skill gratis bagi yang beruntung.” | Menunjukkan respons akun dan menekankan hadiahnya gratis | Balasan membuktikan interaksi; kata GRATIS membutuhkan satu fokus tersendiri | Balasan siirfannih berindentasi; kamera kembali ke video; label SKILL rapat di atas slab GRATIS putih dengan latar biru; Irfan bermatte di depan; penutup kembali ke K4 di dada |

## Perubahan

- **D-454:** cincin berdenyut, outline fokus biru, dan isi kolom biru muda dihapus. Kamera memperbesar panel asli: lebarnya sekitar **60,6–62,5% frame** selama ketik/balas. Warna, ikon, dan font UI IG dipertahankan.
- **D-457:** ketikan `S → Sk → Ski → Skil → Skill`, kirim, komentar `dimas.creates Skill`, lalu `siirfannih oke cek dm ya`. Balasan memakai komponen avatar foto yang sama dengan header, berindentasi 64 px dalam koordinat panel; metadata komentar baru `now`.
- **D-455/D-462:** T084–T095, selain T086 yang sudah dibuang, kini dirender di dalam bidang video D_IG dan ikut transformasi kamera. K4 di dada/ruang kosong; narasi dekat close-up komentar berada pada bagian video yang masih terlihat. Kamera membawa fokus video → komentar terpusat → video. Zoom setelah kunci 3,003 detik lokal berjalan linear terus; pan memakai kurva dari `curves.ts` dan motion blur.
- **D-456/D-465:** GRATIS dipotong masuk sebagai slab satu baris di belakang Irfan, warna putih pada biru startup `#2E5BFF`; kontras **5,1767:1**. SKILL menjadi label pengantar di dekat slab dan tetap dalam frasa yang sama saat punchline. Kolom komentar sudah keluar frame. T093 lama dibuang, tanpa tulisan tangan maupun teks ganda.
- **D-451:** f67–85 lokal dipertahankan langsung dari cache `D_IG_r6.mp4`, kemudian seluruh cache disimpan H.264 lossless untuk menjaga pikselnya.

## Penilaian tiap still

Still penuh 1920×1080 diambil pada frame terdekat; waktu dan nomor frame tepatnya ada di [still-waktu.json](../qc/r7/ig/still-waktu.json).

| Still | Massa kiri–kanan dan fokus |
|---|---|
| [77,2](../qc/r7/ig/still-77.2.png) | Cukup seimbang: wajah dan “kerasa” menyatu di bidang video kiri; panel kanan terang tetapi isinya ringan. Teks berada di dada, bukan terpisah di kanan atas. |
| [78,9](../qc/r7/ig/still-78.9.png) | Komposisi R6 dipertahankan: slab dan Irfan mendominasi bidang video; panel kanan menjadi bidang ringan. Ini bagian PROFESIONAL yang dilindungi. |
| [80,0](../qc/r7/ig/still-80.0.png) | Panel berada di tengah, diapit potongan video di kiri dan latar IG di kanan; komentar menjadi fokus tunggal. Tidak ada narasi kedua yang menambah berat di kanan. |
| [81,2](../qc/r7/ig/still-81.2.png) | Panel tetap terpusat; “di bawah.” mengisi sisi video kiri. Skill dan kursor terlihat di kolom asli. Wajah berada di luar crop sehingga tidak bersaing dengan tindakan mengetik. |
| [82,0](../qc/r7/ig/still-82.0.png) | Thread penonton dan balasan berada pada bidang putih tengah; “aku” kecil mengisi kiri. Hierarki induk/balasan jelas melalui indentasi dan avatar; balasan menjadi pusat perhatian. |
| [82,8](../qc/r7/ig/still-82.8.png) | GRATIS membentang di kedua sisi kepala, label SKILL dekat di atas kiri; badan menyatukan komposisi tengah. UI komentar tidak terlihat. Biru membedakan punchline ini dari PROFESIONAL hijau. |
| [83,5](../qc/r7/ig/still-83.5.png) | Wajah kembali di tengah dengan tangan di kedua sisi; “beruntung.” menempel di dada. Tidak ada UI atau tulisan tangan yang menjadi fokus tandingan. |

Penilaian visual ini untuk tinjauan Sutradara, bukan persetujuan kreatif dari Irfan. [Strip interaksi setiap frame](../qc/r7/ig/interaksi-tiap-frame.jpg), [strip kamera kembali](../qc/r7/ig/kembali-tiap-frame.jpg), dan [semua 12 frame GRATIS](../qc/r7/ig/gratis-tiap-frame.jpg) juga diperiksa: kata tidak terpotong dalam hold, balasan muncul sebelum kamera pergi, dan foreground GRATIS tetap menutup huruf di rambut/badan tanpa frame kosong.

QC akhir menemukan “Atau” ikut tersapu tepi kiri saat pan. Kata dipindahkan ke ruang kanan video dan ditahan f90–96; hanya tujuh frame itu dirender ulang. [Strip koreksi setiap frame](../qc/r7/ig/atau-tiap-frame.jpg). Cache akhir mengambil f90–96 dari patch, f67–85 dari R6, dan frame lain dari render IG R7. Tidak ada perubahan pada peristiwa komentar atau punchline.

## Waktu persis untuk SFX

Gunakan waktu **master 30000/1001 fps** berikut, dengan nomor frame berbasis nol. Batas ketik/kirim/balasan dan masuk/keluar biru diperiksa dari piksel rakitan, bukan hanya waktu nominal komposisi 30 fps. Bukti: [event-pixel-metrics.json](../qc/r7/ig/event-pixel-metrics.json).

| Peristiwa | Frame lokal D_IG | Frame master | Detik master |
|---|---:|---:|---:|
| Ketik S | 133 | 2423 | **80,847433** |
| Ketik k | 135 | 2425 | **80,914167** |
| Ketik i | 138 | 2428 | **81,014267** |
| Ketik l pertama | 140 | 2430 | **81,081000** |
| Ketik l kedua, Skill lengkap | 143 | 2433 | **81,181100** |
| Kirim; kolom menjadi kosong | 149 | 2439 | **81,381300** |
| Komentar dimas.creates mulai muncul | 150 | 2440 | **81,414667** |
| Balasan siirfannih muncul | 158 | 2448 | **81,681600** |
| Kamera mulai kembali ke video | 169 | 2459 | **82,048633** |
| Label SKILL mulai masuk | 180 | 2470 | **82,415667** |
| Cut punchline GRATIS | 187 | 2477 | **82,649233** |
| Keluar punchline; kembali ke “bagi” | 199 | 2489 | **83,049633** |

GRATIS tampil sampai f2488 inklusif (83,016267); pergantian berikutnya pada 83,049633, sehingga tahan melewati akhir ucapan 83,022. SFX tidak diubah dalam tugas ini.

## Matte, verifikasi, dan rakitan

- Matte baru: `remotion/public/video/matte-ig-gratis-r7.webm`. Pipeline sama dengan PROFESIONAL: RVM sumber diambil pada offset −16 frame terhadap proxy, PTS matte digeser +16 frame native, konversi fps30, trim 2475:2493, erosion dua kali, Gaussian sigma1, remap luma 3:252. Sequence dimulai f183 lokal; rentang GRATIS f187–198. [Provenance dan perintah](../qc/r7/ig/matte-provenance.json).
- `npx tsc --noEmit`: **exit 0**; [log](../qc/r7/ig/tsc.log). Uji urutan ketik/kirim/komentar/balasan: [cek-waktu.json](../qc/r7/ig/cek-waktu.json).
- PROFESIONAL: **19/19 `framemd5` identik**, 1920×1080; cache keluaran **223 frame @30 fps, tanpa audio**. Resep R6, skrip gabung R7, teks.json, matte PROFESIONAL dan cache R6 memiliki SHA256 sama dengan awal tugas. [verification.json](../qc/r7/ig/verification.json).
- Rakitan: **225 frame @30000/1001**, durasi **7,507500 detik**, mulai pada kisi master **76,309566667** dan berakhir **83,817066667**. Ini frame yang tersedia untuk permintaan 76,3–83,82. [Probe](../qc/r7/ig/rakitan-probe.json), [resep rentang](../qc/r7/ig/rakitan.json), [log rakit](../qc/r7/ig/rakit.log).
- `r7_gabung.py` terakhir **exit 0, 57 lapisan**; [log](../qc/r7/ig/gabung.log). Percobaan awal menemukan bentrok T068 pada override UI/KT; percobaan terakhir sudah berhasil setelah override tersebut berubah. File pekerja lain tidak diedit. QC memakai kamera R7 dan semua override yang beririsan, termasuk ekor lapisan Blender UI; [integrasi.json](../qc/r7/ig/integrasi.json).
- Rakitan rentang memakai sumber yang dipotong ke kisi frame dahulu, agar selisih mikrodetik pada `in` footage tidak membuang frame terakhir. Tidak merakit master penuh atau mengubah audio/edit.

## File dan cara melanjutkan

Kode: `remotion/src/video/b6.tsx`, `bersama/KataBelakang.tsx`, `bersama/ig/{NarasiIG.tsx,waktu.ts}`, serta hanya token `IG_R7` bertanda D-45x di `bersama/tema.ts`. Aset, resep dan bukti: `remotion/public/video/matte-ig-gratis-r7.webm`, `lego/r7_ig.py`, `lego/r7_override_ig.json`, `lego/cache/r7_ig_D_IG.mp4`, `qc/r7/ig/**`.

Perintah dari root proyek untuk membuat ulang QC setelah integrasi:

```bash
python3 lego/r7_ig.py prepare
# Render DuniaIG memakai qc/r7/ig/props.json ke qc/r7/ig/ig-render.mp4;
# --codec=h264 --crf=12 --image-format=png --muted --concurrency=3
python3 lego/r7_ig.py preserve
python3 lego/r7_ig.py verify
python3 lego/r7_ig.py qc
python3 ../../claude/motion-graphic/scripts/lego/compose.py qc/r7/ig/rakitan.json
python3 qc/r7/ig/buat_bukti.py
```

Matte dapat dibuat ulang dengan `python3 lego/r7_ig.py matte`. Sutradara dapat mengambil override IG untuk master dan waktu master di atas untuk SFX. Token/kuota model tidak tersedia dalam sesi ini; tidak dibuat perkiraan pemakaian.

Untuk mereproduksi rakitan dari render perantara sesi ini, gunakan `python3 lego/r7_ig.py preserve --patch-atau`. Bila merender ulang seluruh DuniaIG dari kode terbaru, gunakan `preserve` biasa; koreksi “Atau” sudah ada di kode.

## Ronde 2

**Siap ditinjau; QA teknis lolos.** Cakupan TASK-R7-ig-r2: I2-1 (kamera) dan I2-2 (dua frasa narasi). [Ledger dan batas revisi](../qc/r7/ig/r2/lingkup.json) tersimpan lokal di QC karena TASK membatasi file pekerja. Tidak ada commit/push repo proyek, sesuai R7-BERSAMA.

- [Klip rentang 76,3–83,82](../qc/r7/ig/r2/rakitan.mp4), [sanding sebelum/sesudah](../qc/r7/ig/r2/sebelum-sesudah.jpg), [lembar 4 fps](../qc/r7/ig/r2/lembar-4fps.jpg).
- [Override IG diperbarui](../lego/r7_override_ig.json): D_IG menunjuk [cache ronde 2](../lego/cache/r7_ig_D_IG_r2.mp4). Cache R7 sebelumnya tetap ada.
- [Ringkasan ukuran](../qc/r7/ig/r2/hasil.json), [ukuran tiap frame](../qc/r7/ig/r2/ukur-per-frame.json), [identitas piksel](../qc/r7/ig/r2/identitas-frame.json).

| Pesan | Maksud | Alasan | Bentuk visual |
|---|---|---|---|
| “Comment di bawah.” | Mengarahkan perhatian ke tindakan mengetik | Narasi di strip video sempit tampak terpisah dari kolom yang ditunjuk | Comment/di bawah. menempel di ruang putih bawah thread, di atas baris ikon; SF Pro Bold gelap #080608 |
| “Nanti aku” | Menghubungkan narasi dengan balasan akun | Teks dan balasan perlu berada pada permukaan yang sama tanpa saling menutup | Nanti/aku mengganti kata di titik panel yang sama; kasih tetap di bidang video ketika kamera kembali |

**I2-1:** pan vertikal melewati baris dihapus. Framing diperlebar agar header, caption, komentar, metadata, dan kolom ketik tetap utuh. Selama fokus komentar, zoom 1,28→1,32, lebar panel sekitar 40–41,25% frame dan sisi video sekitar 42–49%; ini lebih lebar daripada close-up ronde 1. Batas atas kamera berada pada ruang kosong sebelum header. Zoom terus naik; delta terkecil **0,000420168 per frame**, tanpa fase diam pada rentang yang diubah. Saat kembali, panel bergerak keluar ke kanan sebelum kamera naik ke posisi bidang video. Kunci mulai kembali f169 dan posisi akhir f180 tetap.

Margin atas teks UI terdekat diukur dari piksel header hasil render, sepanjang f91–172 lokal ketika teks header masih terlihat: minimum **45 px** pada f169 (82,048633 master), melampaui syarat 40 px. Setelah itu panel meninggalkan frame ke kanan. Enam still penuh dan seluruh 89 frame revisi diperiksa: tidak ada baris komentar yang dibelah tepi atas. Lembar tiap frame: [91–114](../qc/r7/ig/r2/semua-frame-1.jpg), [115–138](../qc/r7/ig/r2/semua-frame-2.jpg), [139–162](../qc/r7/ig/r2/semua-frame-3.jpg), [163–179](../qc/r7/ig/r2/semua-frame-4.jpg).

**I2-2:** Comment/di bawah. dan Nanti/aku dipindah ke **(300, 631)** dalam panel putih, memakai SF Pro Bold 48 px dalam koordinat panel (sekitar **62,6–63,3 px** di layar), tanpa bayangan. Kontras #080608 di putih **20,19:1**. Teks tidak menyentuh thread, balasan, atau garis ikon. Waktu, isi kata, serta reveal tiga frame tetap. Bukti tambahan: [Comment f136](../qc/r7/ig/r2/narasi-f136.png), [di bawah. f147](../qc/r7/ig/r2/narasi-f147.png), [Nanti f162](../qc/r7/ig/r2/narasi-f162.png), [aku f167](../qc/r7/ig/r2/narasi-f167.png). Still 81,9 jatuh tepat di frame awal reveal aku sehingga kata belum terlihat; tidak ada pergeseran waktunya.

| Waktu diminta | Sebelum, 1920×1080 | Sesudah, 1920×1080 | Penilaian sesudah / margin atas |
|---|---|---|---|
| 79,8 | [sebelum](../qc/r7/ig/r2/sebelum-79.8.png) | [sesudah](../qc/r7/ig/r2/sesudah-79.8.png) | Header dan caption utuh, wajah kiri mengimbangi panel kanan; 46 px |
| 80,3 | [sebelum](../qc/r7/ig/r2/sebelum-80.3.png) | [sesudah](../qc/r7/ig/r2/sesudah-80.3.png) | Andi dan Salsa beserta metadata utuh; 47 px |
| 80,9 | [sebelum](../qc/r7/ig/r2/sebelum-80.9.png) | [sesudah](../qc/r7/ig/r2/sesudah-80.9.png) | Comment di ruang putih, Sk di kolom asli; 47 px |
| 81,3 | [sebelum](../qc/r7/ig/r2/sebelum-81.3.png) | [sesudah](../qc/r7/ig/r2/sesudah-81.3.png) | di bawah. di ruang kosong, Skill dan thread tetap jelas; 47 px |
| 81,9 | [sebelum](../qc/r7/ig/r2/sebelum-81.9.png) | [sesudah](../qc/r7/ig/r2/sesudah-81.9.png) | Indentasi balasan utuh dan tidak ditutup narasi; 48 px |
| 82,2 | [sebelum](../qc/r7/ig/r2/sebelum-82.2.png) | [sesudah](../qc/r7/ig/r2/sesudah-82.2.png) | Panel sudah keluar, wajah dan kasih kembali pada bidang video yang lebar; tanpa baris UI di tepi atas |

Waktu dan nomor frame terdekat: [still-waktu.json](../qc/r7/ig/r2/still-waktu.json). Sebelum diambil dari `qc/r7/visual_r7.mp4`, sesudah dari rakitan rentang ronde 2 pada frame master yang sama.

**Yang terjaga, dengan bukti:**

- **134/134 frame identik** terhadap D_IG R7 sebelumnya: f0–90 dan f180–222. Ini mencakup **PROFESIONAL 19/19** (f67–85), seluruh SKILL pengantar, **GRATIS 12/12** (f187–198), dan penutup. PROFESIONAL juga dibandingkan langsung dengan R6: 19/19 identik. [Identitas frame](../qc/r7/ig/r2/identitas-frame.json), [log verifikasi R6](../qc/r7/ig/r2/verify-r6.log).
- Isi/layout/warna/font UI identik di kode: satu-satunya tambahan di `b6.tsx` adalah pemanggilan narasi panel. `waktu.ts`, `KataBelakang.tsx`, kedua matte, cache IG R7 sebelumnya, master visual R7, resep R6, skrip gabung, dan `teks.json` memiliki SHA256 identik dengan awal tugas. Seluruh isi dan batas waktu kata NarasiIG juga sama. [Pemeriksaan cakupan](../qc/r7/ig/r2/cakupan-terjaga.json).
- Peristiwa diperiksa lagi dari piksel pada koordinat kamera baru: ketik f133 / master **2423 = 80,847433**, kirim f149 / **2439 = 81,381300**, komentar f150 / **2440 = 81,414667**, balasan f158 / **2448 = 81,681600**. Waktu huruf selanjutnya dan GRATIS sama seperti tabel ronde 1. [Pengukuran peristiwa](../qc/r7/ig/r2/peristiwa-piksel.json).
- `npx tsc --noEmit` exit 0; [log](../qc/r7/ig/r2/tsc.log). Cache 223 frame @30 fps, tanpa audio. Rakitan 225 frame @30000/1001, 1920×1080, **7,507500 detik**, mulai master 76,309566667. [Probe cache](../qc/r7/ig/r2/cache-probe.json), [probe rakitan](../qc/r7/ig/r2/rakitan-probe.json), [log rakit](../qc/r7/ig/r2/rakit.log).

Filter kualitas untuk bagian revisi (antislop `during`, preferensi global):

- **Hard Gate PASS:** tepi atas ≥45 px, teks tidak meluap, kontras 20,19:1; bukti pada still penuh dan hasil ukuran. Kontrol interaktif tidak berlaku pada video ini.
- **Purpose Gate PASS:** kamera diperlebar untuk menjaga baris utuh; SF Pro gelap dipilih agar narasi menyatu dengan panel putih. Tidak ada dekorasi tambahan.
- **Liveliness PASS:** arah Apple/startup dari R7-BERSAMA dipertahankan (energy 2 / rhythm 2 / motion 3 untuk beat ini); zoom terus naik dan pan mengalihkan perhatian dari thread ke video. Semua frame revisi dilihat.
- **Craftsmanship PASS:** konten dan waktunya berasal dari basis; UI, punchline dan adegan terlindungi diverifikasi lewat SHA256/framemd5, typecheck serta rakitan Chrome/ffmpeg, tanpa klaim persetujuan kreatif.

Reproduksi dari root proyek:

```bash
python3 lego/r7_ig.py prepare
cd remotion
npx remotion render src/video/index.ts DuniaIG ../qc/r7/ig/r2/patch-91-179.mp4 --props=../qc/r7/ig/props.json --frames=91-179 --codec=h264 --crf=12 --image-format=png --muted --concurrency=3
cd ..
python3 -c "import json,subprocess; subprocess.run(json.load(open('qc/r7/ig/r2/preserve-command.json')),check=True)"
python3 lego/r7_ig.py verify
python3 lego/r7_ig.py qc
python3 ../../claude/motion-graphic/scripts/lego/compose.py qc/r7/ig/r2/rakitan.json
python3 qc/r7/ig/r2/buat_bukti.py
```

`preserve-command.json` menyisipkan hanya patch f91–179 ke cache R7 lama dengan enkode lossless. Resep QC ronde 2 memuat sumber absolut; bila override pekerja lain berubah, buat ulang resep QC dari keluaran `r7_ig.py qc` dengan `keluar: rakitan.mp4` di folder r2 sebelum compose. Penilaian estetika dan integrasi master tetap oleh Sutradara. Tidak ada biaya generasi atau aset baru; pemakaian token model tidak tersedia dalam sesi ini.
