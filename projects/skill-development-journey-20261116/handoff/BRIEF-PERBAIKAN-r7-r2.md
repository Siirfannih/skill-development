# BRIEF r2 · Perbaikan video `varian-A_r7`

Proyek: `projects/skill-development-journey-20261116`.
Menggantikan `BRIEF-PERBAIKAN-r7.md` (r1). Yang berubah dari r1 ada di bagian 9.

Tugasmu: perbaiki video dengan mengubah kode yang ada, jangan bangun ulang. Perbaikan repo skill-development dikerjakan sesi lain (bagian 6).

**Basis:** rakitan terbaru di working tree, yaitu `out/varian-A_r7.mp4` ditambah hasil `TASK-R7-ktwajah-r4` (D-474, D-475: cincin besar di belakang kepala dan gerak gelombang). Rakit ulang dulu sebelum menilai apa pun; `REPORT-R7-ktwajah.md` §Ronde 4 mencatat `r7_ktwajah.py check` masih menandai data rig tangga K2 (f134–254), bereskan itu saat merakit. Cincin di 10–12, 38–42 dan 54–57 dtk sudah diperbaiki di ronde itu dan tidak dikerjakan lagi di sini, kecuali penilai mata menemukan masalah baru.

---

## 1. Cara kerja brief ini (baca dulu)

Tidak ada angka uji di brief ini. Tiap kasus ditulis sebagai: yang terlihat, kenapa terasa salah, arah perbaikan, dan pertanyaan yang dijawab dengan melihat frame hasilnya.

Alasannya: video tidak bisa dinilai dengan angka absolut. Ukuran, jarak, dan posisi yang benar tergantung kondisi frame saat itu (seberapa dekat kamera, terang atau gelap latarnya, di mana ruang kosongnya). Angka dari referensi hanya benar di video referensi itu.

Aturan untuk semua yang mengerjakan brief ini:
- Sebelum mengubah sebuah adegan, **buka frame footage-nya** dan tulis kondisinya dalam 2–3 kalimat: skala wajah, terang-gelap latar, ruang kosong, benda yang ramai.
- **Lihat referensinya bergerak, bukan hanya frame kuncinya.** Potong momen yang tekniknya dipakai menjadi strip semua frame berurutan (mis. `ffmpeg -ss <t> -t 1.2 -i <ref> -vf "scale=220:-1,tile=9x4" -frames:v 1 strip.jpg`), lalu buka gambarnya. Frame diam menyembunyikan kamera, fokus, dan urutan masuk.
- Lalu buka frame kunci kartu atau potongan video referensi yang tekniknya dipakai, dan jawab: **kenapa teknik itu bekerja di sana, dan apakah kondisi itu ada di frame ini?** Bila tidak ada, sesuaikan tekniknya atau pilih teknik lain.
- Angka di kartu dan di `R7-BERSAMA.md`, serta angka turunan Sutradara di ledger D- (px, jumlah frame, persen), adalah catatan pengamatan, bukan target. Jangan menyalinnya ke kode tanpa melihat hasilnya di frame. Ucapanku yang dikutip di ledger D- tetap berlaku.
- Lantai yang sudah berlaku tetap berlaku (mis. kontras A7, margin C16). Brief ini tidak menambah angka baru.

## 2. Akar masalah

| # | Akar | Bukti |
|---|---|---|
| A1 | **Tidak ada satu tulang punggung gaya untuk seluruh video.** Tiap adegan punya kartu sendiri dan dikerjakan pekerja paralel. Tiap adegan patuh ke kartunya, tapi videonya tidak sekeluarga. | `R7-BERSAMA.md` §Kartu; ±12 perlakuan teks berbeda dalam 84 dtk (kata kecil putih, pil kaca, pil gelap, narasi hitam di UI, teks miring di meja, slab di panel IG, dst.) |
| A2 | **Kartu mencatat bentuk dan angka, bukan kondisi yang membuat teknik itu bekerja.** `KARTU-TEMPLATE.md` meminta "% tinggi frame" dan "butir yang bisa dicek dari still atau angka". Kartu 83 mencatat ruang diredupkan saat slab muncul lalu menulis "tidak diambil"; yang tersisa "kata kecil di dada ±4 %" dan "tag semi-transparan". | `pustaka/KARTU-TEMPLATE.md`, `pustaka/kartu/83-*.md` |
| A3 | **Pekerja tidak pernah melihat referensinya.** Video → kartu → satu baris ringkasan → pekerja → kode. Konteks hilang di tiap langkah. | `references/orkestrasi.md` ("pekerja tidak membaca kartu"), `R7-BERSAMA.md` §Kartu |
| A4 | **Tidak ada langkah "lihat footage sendiri dulu".** Kondisi videoku (16:9, dinding abu terang, kemeja bermotif, ruang kosong kiri-kanan kepala) tidak pernah ditulis sebelum teknik dipilih. | tidak ada di TASK-R7-* |
| A5 | **Yang diperiksa adalah kepatuhan, bukan tampilan.** "LULUS BILA" berisi tsc, sha256, `framemd5`. Audit frame dipecah per 10 dtk, jadi tak ada yang melihat konsistensi antar-babak. Pemeriksa GPT/Sonnet 83/84 detik "sepakat bersih". Verdict ber-hash tidak pernah dinilai ulang. Penilaian pekerja atas karyanya sendiri ikut dihitung. | `qc/VERDICT.md`, `scripts/juri/frame_audit.py` baris 177, `REPORT-R7-ig.md` |
| A6 | **Proteksi frame-identik membekukan bagian yang sudah aku keluhkan.** PROFESIONAL "dilindungi" 19/19 `framemd5` padahal D-455 meminta gayanya diperbaiki. Masalah lintas adegan tidak punya pemilik. | `REPORT-R7-ig.md` |
| A7 | **Aturannya sudah ada, tapi tidak dijalankan.** Narasi tanpa kotak (Lantai A9), satu peran satu gerak (A9a), frasa tidak dipisah jauh (A2, C15, D-465), gaya teks dipilih sekali per video (GUIDE). r7 melanggar semuanya. Menulis aturan lagi tidak menyelesaikan ini. | `LANTAI.md`, `guide/teks/GUIDE.md`, D-465 |

## 3. Kasus yang diperbaiki

Waktu dalam detik, perkiraan. Cari frame persisnya dengan mata.

### 3.1 Narasi hitam di jendela Claude (±24–26): "Dan ini bukan", "sebuah", "template.", "Jadi kalau"
- **Yang terlihat:** kata narasi Bold hitam besar di area chat, dan "template." masuk ke kolom prompt menggantikan placeholder.
- **Kenapa salah:** narasi disamarkan jadi isi UI, padahal aku tidak mengetik itu ke Claude. Perlakuannya juga lain sendiri dari narasi di babak 1.
- **Arah:** pisahkan dua peran. Narasi memakai perlakuan narasi yang sama dengan bagian wajah dan duduk di ruang kosong layar, ikut kamera UI. Kolom prompt hanya berisi prompt yang memang akan aku ketik, dengan huruf UI asli.
- **Dilihat di hasil:** sandingkan still narasi di sini dengan still narasi di babak 1. Terasa satu keluarga? Ada kata narasi yang masih terbaca sebagai isi UI?

### 3.2 Pil dan tag di belakang kata narasi (±46 "langganan", ±22 "beberapa / bagian", dan sejenisnya)
- **Yang terlihat:** kotak abu tipis hampir tak kelihatan di dinding terang, menempel ke tangan; pil gelap menimpa slab AI SLOP.
- **Kenapa salah:** di kartu 83 tag itu bekerja karena ruangnya gelap. Di dindingku yang terang ia tidak terbaca sebagai benda. Lantai A9 juga sudah melarang kotak di belakang narasi kecuali kontras gagal.
- **Arah:** narasi di wajah tanpa kontainer; keterbacaan dicari lewat posisi dan ukuran, diputuskan dari frame (di dada bila bidangnya tenang, atau di dinding kosong di samping kepala bila kemeja terlalu ramai). Bawa pilihannya di lembar spine. Kontainer hanya untuk chip atau bubble yang memang benda UI, dan harus terbaca jelas sebagai benda di latar itu. Kalau tidak, hapus.
- **Dilihat di hasil:** di ukuran HP, kontainer yang tersisa terbaca sebagai benda? Ada yang menabrak tangan, wajah, atau teks lain?

### 3.3 Teks di adegan meja Blender (±73–76): slab "100% FULL AI" dan narasi kecil miring ("Dan", "menurut", "videonya")
- **Yang terlihat:** slab datar menimpa monitor; narasi kecil diberi perspektif tapi melayang di depan monitor, tidak menempel bidang apa pun.
- **Kenapa salah:** adegan ini 3D. Teks yang datar di layar atau miring tanpa bidang terasa tempelan.
- **Arah, pilih satu untuk seluruh adegan:** (a) teks jadi objek di Blender, rebah di meja atau berdiri di ruang itu, sehingga perspektif dan oklusinya benar sendiri; kamera boleh dinaikkan supaya bidang meja cukup terbuka untuk dibaca; atau (b) teks datar di layar memakai perlakuan narasi yang sama dengan bagian lain, di ruang kosong, tanpa menimpa monitor. Ingat D-453: slab ini pernah kuminta diturunkan, jangan dinaikkan lagi ke atas.
- **Yang tidak boleh:** miring tapi melayang.
- **Dilihat di hasil:** teks terasa ada di ruangan itu, atau jelas di depan layar? Saat kamera bergerak, teks ikut bidangnya?

### 3.4 PROFESIONAL (±78,5–79,1)
- **Yang terlihat:** latar hijau hanya di bidang video postingan IG, panel IG tetap di kanan, pita hitam di atas dan bawah. Terbaca "PROF ONAL".
- **Kenapa salah:** di referensi Sam John, slab warna mengambil seluruh frame. Di sini penekanan terkurung di kotak, jadi tidak terasa sebagai punchline.
- **Arah:** saat punchline, video keluar dari postingan menjadi layar penuh (kamera masuk ke video, atau video membesar), hijau penuh satu beat, lalu kembali ke IG. Letak kata terhadap kepala diputuskan dengan melihat frame: oklusi boleh, asal kata tetap terbaca sekilas.
- **Dilihat di hasil:** selama beat itu masih ada panel UI terlihat? Orang yang belum tahu naskahnya bisa membaca katanya dalam sekali lihat?
- **Catatan aturan:** `guide/teks/GUIDE.md` menulis teks ikut masuk ke bidang video bila video adalah isi tampilan. Itu tetap benar untuk narasi; untuk proyek ini punchline dikecualikan.

### 3.5 SKILL + GRATIS (±82,4–83,0)
- **Yang terlihat:** "SKILL" kecil di kiri atas, "GRATIS" raksasa di tengah, jauh terpisah. Terbaca "GR TIS".
- **Kenapa salah:** satu frasa terbaca sebagai dua hal. Ini kelas yang sama dengan D-465. Kata kecil di sudut blok disalin dari kartu 83 ("At" di kiri atas slab) tanpa melihat hasilnya di frame ini.
- **Arah:** satu frasa satu kelompok: SKILL rapat di atas GRATIS pada sumbu yang sama, atau satu baris. Letak terhadap kepala diputuskan dari frame.
- **Dilihat di hasil:** terbaca "skill gratis" sebagai satu frasa dalam sekali lihat? Ada teks yang tertinggal di kiri atas?

### 3.6 Kelas yang sama di tempat lain
| Waktu | Yang terlihat | Arah |
|---|---|---|
| ±20,5–22,5 | "AI SLOP" terbaca "AI S OP", lalu pil menimpa slab | sama dengan 3.4 dan 3.2 |
| ±57,3 | "LINTAS AGENT" terbaca "LINTA AGENT", "sistem kerja" kecil di atas kiri (cek dulu di rakitan terbaru, cincin di depannya berubah di ronde 4) | sama dengan 3.4 dan 3.5 |
| ±37, ±42 | "cuma mempelajari", "Karena" kecil di kiri atas, jauh dari wajah | perbaiki: sesuaikan ukuran dan letaknya dari frame, pakai perlakuan narasi di spine |

Blok VIRAL!! (±15–21) disengaja sebagai parodi; tidak diubah.

## 4. Urutan kerja (wajib)

1. **Rakit basis terbaru** dan buat lembar 1 fps seluruh video dalam satu gambar.
2. **Kalibrasi penilai mata.** Penilainya satu subagen segar yang bisa melihat gambar dan **tidak membaca brief ini, laporan pekerja, atau ledger D-** (Sutradara sudah tahu jawabannya, jadi tidak bisa dikalibrasi). Ia diberi lembar 1 fps `varian-A_r7` lama, still FINALLY (±1 dtk) sebagai contoh yang benar, frame kunci kartu, potongan dua referensi (`sumber/ref-r6/ref-samjohn.mp4`, `ref-zache.mp4`), dan `contoh-gagal/`. Ia diminta menyebut hal paling amatir di seluruh video, berperingkat. Ia harus menemukan kasus 3.1–3.5 tanpa diberi tahu. Kalau tidak, bahan atau pertanyaannya diperbaiki dulu. Penilai yang tidak menemukan kesalahan yang sudah diketahui tidak boleh meluluskan apa pun.
3. **Lembar kondisi footage.** Untuk tiap jenis shot (wajah dekat, wajah sedang, UI, meja, IG): satu frame + 2–3 kalimat kondisinya.
4. **Lembar spine gaya.** Satu still per peran teks (pakai peran R1–R6 yang sudah ada di Lantai A9a dan `typography.md` §8a), dibuat di atas footage asli tiap jenis shot, berdampingan. Pertanyaannya satu: sekeluarga atau tidak? Sertakan still FINALLY (±1 dtk) sebagai jangkar: itu contoh yang sudah benar. **Kirim lembar ini ke aku, lalu berhenti dan tunggu jawabanku. Pekerja belum boleh mulai.** Spine hanya mengubah lapisan teks; footage, UI, tokoh, dan kamera yang sudah kusetujui tidak ikut dirombak.
5. **Baru pekerja jalan.** Tiap TASK berisi: frame footage adegannya, frame kunci atau potongan klip referensi, still spine untuk peran yang dipakai, dan maksud adegannya. Bukan tabel persen.
6. **Penilaian akhir oleh penilai dengan cara yang sama** (subagen segar, bahan yang sama), atas seluruh video (bukan per 10 dtk), termasuk bagian yang tidak berubah. Wajib menyebut 3 hal paling amatir berperingkat; "tidak ada temuan" tidak diterima.
7. Laporan pekerja tentang karyanya sendiri bukan QC.

**Skrip:** hanya untuk yang tidak terlihat mata (sinkron frame, audio, frame kosong, kedip) atau sebagai penunjuk frame yang perlu dibuka. Tidak ada skrip yang memutus gaya, posisi, jarak, oklusi, atau material. Ini sudah bunyi `pustaka/README.md` §Juri dan Lantai C17; jalankan.

## 5. Yang terlihat saat referensi diputar frame demi frame
Ini pengamatan dari strip frame, bukan resep. Cek sendiri di `sumber/ref-r6/ref-zache.mp4` dan `ref-samjohn.mp4` sebelum memakainya.

- **Zache, kata di samping bahu (±2,7–3,6 dtk):** teks menempel di ruang, kamera yang bergerak. Saat kamera mundur, tumpukan "and / last / time" tetap di tempatnya dan sebagian keluar frame. Tiap baris baru masuk per huruf dengan blur gerak, lalu baris lama kehilangan fokus. Baris terakhir ("on here") mengikuti lengkung tangan. D-475 baru menyalin gerak hurufnya; kamera dan pergantian fokusnya belum.
- **Zache, kata di belakang kepala (±13–15,5 dtk):** "NOT / BECAUSE" di belakang kepala sengaja **buram**, sebagai latar. Yang tajam dan dibaca adalah "I ran out of IDEAS" di depan badan. Saat "BUT" masuk, BECAUSE berubah jadi garis luar. Jadi kedalaman datang dari fokus: satu lapis tajam, lapis lain lunak. Di r7, slab di belakang kepala dan kata di depan sama-sama tajam.
- **Sam John, slab warna (±16,5–17,3 dtk):** potong langsung satu frame ke layar penuh satu warna, kata memenuhi lebar, **pembicara tidak ada di frame**, tahan sebentar, kilas warna satu frame, lalu kata berikutnya di warna lain. Di r7, PROFESIONAL menggabungkan ini dengan kata di belakang kepala, di dalam panel IG.
- Putaran kamera menambah energi, bukan kedalaman. Kedalaman butuh lapisan yang bisa dipisah di frame-ku (latar, kata belakang, badan, kata depan); cek dulu apakah ada.

## 6. Perubahan ke skill-development: BUKAN tugasmu
Perbaikan repo (format kartu, penulisan ulang kartu, `pustaka/README.md`, `orkestrasi.md`, `pemeriksa-frame.md`, `frame_audit.py`, `contoh-gagal/`) dikerjakan sesi lain di branch `perbaikan/kartu-kondisi`, di worktree terpisah. Jangan ubah file di `claude/motion-graphic/` supaya tidak ada dua penulis di file yang sama.

Yang kamu lakukan:
- Kerjakan video dengan urutan di bagian 4 walau aturan lama di repo belum berubah. Bila aturan lama bertabrakan dengan brief ini (mis. "Cek kemiripan" berangka di kartu, ringkasan kartu satu baris untuk pekerja), brief ini yang berlaku untuk proyek ini.
- Tulis pelajaran yang kamu temukan selama mengerjakan ke `handoff/USUL-SKILL-r7.md` (kondisi → pilihan → alasan). Sesi repo yang memasukkannya.
- Commit hanya file proyek ini, stage per file. Working tree berisi perubahan proyek lain yang bukan milikmu.

## 7. Yang sudah kuputuskan (jangan ditanyakan lagi)
1. **Huruf:** slab "FINALLY" di pembuka (±1 dtk) adalah contoh yang benar. Selama jenis hurufnya sama dengan yang sudah dipakai di video, pakai saja. Tidak ada larangan huruf tebal.
2. **Ukuran huruf situasional.** Tidak ada ukuran tetap dariku. Kalau momennya satu kanvas warna dengan kata besar, besarkan. Ukurannya benar bila estetikanya dapat, rasanya dapat, dan mata penonton langsung fokus ke situ. Aturan ukuran yang kaku justru menghasilkan kata yang kekecilan atau kegedean (contoh kekecilan: "profesional" di versi 5).
3. **Slab situasional.** Momen yang pantas diberi slab, beri slab. FINALLY juga tertutup kepala di satu huruf dan tetap benar: oklusi dinilai dari frame, bukan dari hitungan huruf.
4. **Teks kecil di kiri atas (±37, ±42, dan sejenisnya):** diperbaiki dan disesuaikan lagi.
5. **Blok VIRAL!! (±15–21):** disengaja. Jangan dirapikan.

## 8. Batasan dan laporan
- Suara terkunci. Audio diulang hanya bila visual mengubah waktu peristiwa.
- Jangan sentuh proyek lain.
- Laporan akhir: (1) hasil kalibrasi penilai, kasus mana yang ditemukan dan tidak; (2) lembar kondisi footage dan lembar spine gaya; (3) per kasus 3.1–3.6: still sebelum/sesudah berdampingan dan jawaban penilai mata atas pertanyaan "dilihat di hasil"; (4) 3 hal paling amatir yang tersisa menurut penilai; (5) `handoff/USUL-SKILL-r7.md`; (6) pertanyaan terbuka, hanya untuk hal yang tidak dijawab brief ini, kartu, atau ledger.

## 9. Yang berubah dari r1
- Semua angka uji lulus dihapus (jarak ≤ 0,5× tinggi kapital, OCR persis, drift sudut, kontras kontainer). Diganti pertanyaan yang dijawab dengan melihat frame.
- Lima skrip `cek_*` tidak dibuat sebagai gerbang.
- Basis diganti ke rakitan sesudah ktwajah-r4; label lengkung di 38–42 dan 54–57 dicabut dari daftar.
- Akar masalah ditambah: format kartu, pekerja tidak melihat referensi, tidak ada pembacaan footage. "Aturan ditulis per kasus" diganti "aturan sudah ada tapi tidak dijalankan".
- Kasus ditambah: narasi lain di jendela Claude, slab "100% FULL AI", pil "beberapa / bagian".
- Bagian 6: perbaikan repo dipindah ke sesi lain; sesi video hanya menulis usul.
- Bagian 5: diisi pengamatan dari referensi yang diputar frame demi frame.
