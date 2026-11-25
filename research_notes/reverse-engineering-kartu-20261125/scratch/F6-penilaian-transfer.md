# F6 · Penilaian Uji Transfer Buta (Pemeriksa Independen)

Yang dinilai: `scratch/F6-uji-transfer-output.md` (4 frame: A1, A2 `apple-saas-ui`; B1, B2 `talking-head-kinetic`).

## 0. Putusan singkat

| Frame | Putusan | Alasan utama |
|---|---|---|
| A1 · Hook masalah "template?" | **LULUS DENGAN CATATAN** | Konsep satu jangkar + satu kata vonis benar. Tapi ada 6 penanda alat desain sekaligus dan 3 sistem penekanan pada satu kata. |
| A2 · Demo alur kerja | **GAGAL** | Wallpaper diburamkan dan digelapkan (S-V2), jendela gelap di atas latar gelap (kontras 1,06:1), pita teks di zona merah, kata VO dibuang, glif `✓`. |
| B1 · Hook talking head "MURAHAN" | **LULUS DENGAN CATATAN** | Zona, oklusi, kata pengantar yang menempel, dan regrade latar dipahami. Tapi 3 gerak utama jatuh di frame yang sama, rasio ukuran tanggung 1,44×, dan durasi baca mustahil terpenuhi. |
| B2 · Bukti perbandingan | **LULUS DENGAN CATATAN** | Penyajian berurutan selebar layar, poros teks tetap, dan kontras gaya kamera/audio antarklip dipikirkan dengan baik. Tapi ada whoosh di potongan keras (S-A12), kuning dipakai untuk dua makna berlawanan, dan keputusan font/ukuran tidak dikunci. |

**Bahan yang benar-benar dibuka:**
- Draf: `F4-inti.md`, `F5-router.md`, `F3-apple-saas-ui.md`, `F3-talking-head-kinetic.md`, `F2-tema.md` (§Tema 1–2), `BRIEF-GEMINI.md` §F6.
- Repo: `LANTAI.md`, `references/slop-catalog.md`, `cookbook/contoh-gagal/README.md`.
- Gambar contoh gagal: `contoh-gagal/04`, `13`, `16`, `20`.
- Keyframe `apple-saas-ui`: `63-k1`, `63-k4`, `63-k10`, `33-k3`, `34-k2`, `36-k5`, `36-k6`, `72-k3`, `96-k1`, `23-k3`.
- Keyframe `talking-head-kinetic`: `83-k1`, `83-k8`, `83-k9`, `85-k5`, `85-k10`, `87-k1`, `90-k13`, `61-k2`.
- Angka kontras di dokumen ini dihitung ulang dengan rumus WCAG.

**Catatan konteks:** sebagian hambatan dari Bagian 3 sudah ditambal di draf **setelah** uji berjalan: `F4 §1.1`, `F3-talking-head` baris 19 dan §2 #3 (lampu), `F3-apple` baris 26–27, serta `F5 §1.1` (celah Problem-First) dan §3 (aturan perbandingan non-UI). Penilaian di bawah menilai rancangan apa adanya. Kecukupan tambalan dinilai di §5.

---

## 1. Frame A1: Hook masalah (0–3 dtk, `apple-saas-ui`)

### Keputusan utama dan penilaiannya
1. **Satu poster jangkar (34%×54%) dengan ±66% ruang kosong ber-grid. Dua kartu "gema" di belakang poster bergeser ±18 px.**
   - **IKUT ALASAN.** Prinsip I1 (ruang negatif) dan F3-apple §2 #2 (satu objek fokus) dipahami.
   - Gema 2 kartu adalah metafora "seragam/template" yang hemat, bukan grid spam C14. Agen menulis alasannya sendiri, bukan sekadar mengutip.
2. **Kanvas krem `#F4F4ED` dengan grid 1 px, aksen biru tua `#0739CF` menggantikan oranye karena oranye gagal kontras.**
   - **IKUT ALASAN.** Hitungannya benar: `#0739CF`/`#F4F4ED` = 7,62:1, dan `#FC4D00` = 3,07:1.
   - Ini bukti bahwa aturan kontras (A7) bisa ditransfer bila ada angka uji.
3. **Penanda alat desain ditumpuk:** grid registrasi, border ukur putus-putus, label piksel `1080 × 1350`, kotak seleksi solid dengan 4 handle bulat, ikon gembok, dan kursor yang mengunci di handle.
   - **TEMPELAN.** Agen mengutip F3-apple §2 #5 dan kartu `96-k1`, `34-k2`, `72-k3`. Tapi di keyframe aslinya, tiap frame hanya memakai **satu** penanda:
     - `34-k2`: sorotan biru muda tembus pandang + 2 titik handle pada satu kata di dalam kalimat.
     - `72-k3`: grid + 4 simpul lingkaran di sudut kata, tanpa isi.
     - `96-k1`: satu kotak seleksi krem + 2 handle.
   - Gembok, label dimensi, dan border ukur tidak punya fungsi bagi penonton. Ini melanggar Lantai C18b ("efek yang fungsinya tidak bisa dijelaskan dihapus").
4. **"template?" 220 px putih di dalam kotak solid `#0739CF`.**
   - **SLOP/TEMPELAN.** Satu kata menerima 3 sistem penekanan sekaligus: lompatan skala 3,3×, kotak isi solid dengan inversi, dan handle. Ini melanggar A6 ("satu sistem penekanan").
   - Kotaknya juga tidak diperlukan karena kontras sudah lulus tanpa kotak. Ini cocok dengan S-T4 dan A9.
   - Rasa referensi `34-k2`: sorotan tipis di kata yang tetap di dalam kalimatnya, bukan blok solid raksasa.
5. **Poster di belakang diburamkan (8 px) dan diredupkan (0,45) saat kata hero masuk.**
   - **IKUT ALASAN.** I3 (blur terarah, bukan drop-shadow) dipakai pada lapis yang tepat, dan tujuannya (satu fokus tajam) dinyatakan.
6. **Audio: 3 SFX dalam 3 dtk** (klik di frame 0, klik snap, swell 55–60 Hz). Kata KT biasa senyap.
   - **IKUT ALASAN** sebagian, karena bunyi terikat perubahan keadaan (pola `93`).
   - Kepadatannya 1 momen/dtk, dua kali lipat anggaran sendiri (≤ 0,5/dtk saat VO).
   - Untuk video explainer/UI, Lantai E24 justru menyebut `kt_tick: per-word`. Lihat §5 #3.

### Tes editor senior
Struktur dasarnya terasa buatan manusia: satu objek, satu kata, palet dua warna, kamera dorong pelan. Yang berlebihan dalam 3 detik ada 10 perlakuan:
- grid, border ukur, label dimensi, gema kartu, kotak solid, 4 handle, gembok, kursor, DOF blur, dan push + snap-scale.

Editor AE akan membuang gembok, label dimensi, border putus-putus, dan isi solid kotak (ganti dengan sorotan tipis ala `34-k2`). Frame 0 juga masih sepi; gebrakan baru datang di 1,95 dtk, sehingga Lantai D22c hanya terpenuhi lemah.

**Putusan: LULUS DENGAN CATATAN.** Wajib buang 4 penanda di atas dan pilih satu sistem penekanan untuk "template?".

---

## 2. Frame A2: Demo alur kerja (12–18 dtk, `apple-saas-ui`)

### Keputusan utama dan penilaiannya
1. **Wallpaper foto didesaturasi −55%, blur 10 px, plus overlay gelap 0,62. Jendela UI `#141518` di atasnya.**
   - **SLOP (S-V2) + TEMPELAN.** Agen mengutip "pola `63`", padahal `63-k1` dan `63-k10` menunjukkan wallpaper lanskap **tajam dan cerah**, dan F3-apple sendiri menulis "menyisakan wallpaper tajam di keempat sisi".
   - Redaman yang dipakai berasal dari F3-apple §2 #8(c), yang ditujukan untuk **B-roll stok**, bukan wallpaper desktop.
   - Akibatnya F3-apple §2 #1 ("nada UI selalu berlawanan dengan latar") ikut patah: jendela `#141518` di atas `#0B0D12` = **1,06:1**. Jendela akan larut ke latar.
   - Rasa frame bergeser ke `contoh-gagal/04` (dunia gelap kebiruan tanpa pemisahan bidang).
2. **Pita teks VO di y 6,5–12,5% (70–135 px). Jendela 72%×70% di bawahnya, dock di y 90–95%.**
   - **TEMPELAN.** Pilihan jalur (a) dari F4 §1.1 #2 sah, tapi geometrinya tidak mengikuti `36-k5` dan `36-k6`. Di sana headline duduk di ±y 12–20% dengan UI mulai ±y 25–30%.
   - Pita y 70–135 px masuk zona merah S-V23 (y < 140 @1080p).
   - Jendela 72% juga melebihi angka `63` (56–60%) sambil tetap mengutip `63`. Wallpaper tinggal tepi tipis, jadi frame terbaca sebagai screenshot layar penuh.
3. **KT menampilkan "Tulis brief singkat" → "susun papan referensi" → "pilih satu layout", lalu keluar di 16,5 dtk.**
   - **SLOP (S-T9 / A1).** Kata "Tinggal", "Canvas", dan "langsung jadi" tidak pernah tampil, dan "langsung jadi" jatuh tepat di klimaks klik.
   - Agen mengorbankan A1 demi "fokus 100% ke tombol" tanpa mencatatnya sebagai pengecualian. Ini persis kebuntuan yang ia laporkan sendiri (Bagian 3 #2).
4. **Kolom input berisi perintah pengguna asli ("Promo kopi susu gula aren · 4:5 · hangat & bersih"), bukan narasi VO.**
   - **IKUT ALASAN.** I8(b) dan `contoh-gagal/13` dipahami penuh. Isinya terdengar seperti brief sungguhan, dan agen menjelaskan alasannya.
5. **Kamera: satu push 1,04 → 1,48× tanpa mundur, menyisakan tepi jendela. Gelombang grid hanya dari Enter. Kursor melaju 6f → diam 12f → klik.**
   - **IKUT ALASAN.** Ketiganya dipahami sebagai alasan, bukan angka saja: R-029 (tanpa zoom reset), `63` (transisi dipicu aksi), dan `94` (jeda antisipasi). Ini bagian terkuat rancangan A.
   - Catatan: teks pita sengaja tidak ikut skala. Itu cocok dengan F3-talking-head #1, tapi **bertabrakan dengan S-V13** ("teks diam di layar sementara objek di-zoom"). Lihat §5 #2.
6. **Variasi B sudah dibingkai kotak seleksi ber-handle sebelum kursor tiba. Ada tombol `Setujui Layout`, lalu label berubah menjadi `Disetujui ✓`.**
   - **SLOP.** Glif `✓` dilarang oleh F4 §2.1 #2, aturan draf yang dibacanya sendiri.
   - Ada juga cacat logika (D22b): VO berkata "pilih satu layout", tapi pilihan sudah tampil terseleksi sebelum dipilih.
   - "Terpilih" ditandai 4 kali sekaligus: seleksi, redup A/C, blur A/C, dan tombol.

### Tes editor senior
Mekanik geraknya (push, kursor, gelombang) terasa seperti AE. Dunianya tidak: latar gelap diburamkan, jendela gelap, dan pita teks menempel tepi atas membuat frame terbaca sebagai mockup UI gelap generik.

Yang berlebihan:
- dot-grid di kanvas, title bar dengan status, dock, kotak seleksi + handle, tombol aksi, redup + blur variasi lain, dan pita teks.
- Semua itu muncul dalam satu jendela 72%.

**Putusan: GAGAL.** Yang perlu dirombak adalah dunianya (wallpaper tajam bernada sedang, jendela 56–60%, pita di y ≥ 13%), bukan detail kecilnya.

---

## 3. Frame B1: Hook talking head (0–3 dtk)

### Keputusan utama dan penilaiannya
1. **Audit 4 kondisi footage (kaos polos, headroom 25%, dinding gelap + lampu, rasio bukti) sebelum memilih teknik.**
   - **IKUT ALASAN.** I4 adalah prinsip yang paling berhasil ditransfer. Agen bahkan menurunkan larangan menaruh teks di titik bohlam lampu dari aturan "piksel lokal".
2. **"MURAHAN" 320 px Anton kuning di belakang matte kepala (oklusi ±18%). Kata pengantar "kelihatan" menempel 18 px di kiri-atasnya.**
   - **IKUT ALASAN.** Cocok dengan rasa `83-k8` ("At" menempel di sudut BARSOL) dan `61-k2`. Agen juga menyebut `contoh-gagal/17` sebagai kebalikannya.
   - Catatan rasa: di `61-k2` dan `83-k8`, kata belakang kepala menyatu dengan nada ruangan (abu tembus pandang, merah sewarna dinding). Kuning jenuh 13:1 lebih keras dari keduanya, tapi masih sah lewat `85-k10` (neon + regrade).
3. **Regrade khusus layer dinding −22% di 0,85 dtk, lalu kembali hangat di 1,85 dtk.**
   - **IKUT ALASAN.** Prinsip "wajah tetap hangat, hanya latar yang berubah" dipahami (`85-k10`: lampu pojok hilang, dinding jadi biru gelap).
   - Bedanya: di `85-k10` regrade **bertahan** selama kata neon dan caption dada berjalan. Kembali hangat setelah 1 detik menambah satu kedipan suasana yang tidak perlu.
4. **Pada detik 0,85 masuk bersamaan:** punch-in 1,14×, kedatangan per huruf ber-motion-blur (atau hard-cut, belum diputuskan), regrade, drop musik −6 dB, dan sub-hit.
   - **SLOP (pelanggaran F4 §2.1 #5, "maks 1 gerak utama per adegan").** Kamera, huruf, dan latar bergerak di frame yang sama.
   - Di `83-k8` dan `85-k10`, kamera tenang saat kata neon masuk.
   - Pilihan "per huruf **atau** hard-cut" dibiarkan terbuka. Itu menunda keputusan, bukan rancangan.
5. **Caption dada 72 px; "rame." 104 px kuning di barisnya sendiri.**
   - Zona dada: **IKUT ALASAN** (`83-k9`: satu kata putih kecil di dada polos).
   - "rame." 104/72 = **1,44×**: **TEMPELAN.** Ini ukuran tanggung yang dilarang I2 (1,0–1,3× atau ≥ 2,3×). Agen menerapkan I2 di B2, tetapi lolos di B1.
   - Kuning juga dipakai 3 kali dalam 3 dtk (nyala "Video AI sering", "MURAHAN", "rame."), sehingga aksen kehilangan bobot.
6. **Durasi blok:** "Video AI sering" 0,85 dtk, "padahal efeknya" 0,55 dtk, "udah paling / rame." 0,6 dtk.
   - **Pelanggaran A8 / S-T12 yang tidak disadari.** Rumus 0,30 + 0,06×huruf menuntut 1,2–1,3 dtk per blok. Agen menghitung rumus ini di A1, tapi tidak di sini.
   - Kata "itu" juga dibuang dari ucapan (A1).
   - Penyebabnya bukan semata kelalaian: tuturan 3,3 kata/dtk secara fisik tidak bisa memenuhi rumus. Lihat §5 #4.

### Tes editor senior
Hasilnya akan terlihat seperti edit gaya Zache/Sam John yang sah. Yang berlebihan:
- punch-in kamera di frame yang sama dengan kedatangan per huruf dan regrade;
- regrade yang bolak-balik;
- kuning tiga kali;
- whoosh di 0,00 tanpa gerak cepat yang terlihat (S-A12).

Buang punch-in di 0,85, biarkan regrade bertahan sampai keluar, dan jadikan "rame." putih seukuran caption.

**Putusan: LULUS DENGAN CATATAN.**

---

## 4. Frame B2: Bukti perbandingan (18–24 dtk)

### Keputusan utama dan penilaiannya
1. **Bukti ditampilkan berurutan selebar layar (slop 3 dtk → bersih 3 dtk) di wadah yang sama, tajam, tanpa blur, tanpa disandingkan kiri-kanan.**
   - **IKUT ALASAN.** I8(a)(c), `contoh-gagal/20`, dan `21` dipahami sebagai alasan keterbacaan di HP. Agen menolak 3 jebakan secara eksplisit dengan alasan.
2. **Teks dikunci di poros atas y 11,5–16,5% selama klip berganti.**
   - **IKUT ALASAN.** Cocok dengan I5 dan rasa `90-k13` (kata diam di poros yang sama saat gambar berganti).
3. **Wadah 88%×68% dengan radius 16 px dan border 1 px di kanvas `#0E0F13`.**
   - **IKUT ALASAN** sebagian: ukuran ≥ 30% sesuai contoh-gagal/20, tanpa drop-shadow.
   - Tapi untuk klip 9:16, *full-bleed* 100% lebih jujur. Wadah berbingkai mengembalikan kesan "kartu di kanvas". Ini pilihan, bukan slop.
4. **Siku kuning 2 px di pojok klip slop ("menandai kerumunan"), lalu border kuning 1,5 px di klip bersih ("lulus").**
   - **TEMPELAN.** Siku di pojok tetap tidak menunjuk objek apa pun. Itu penanda tanpa fungsi (C18b).
   - Kuning dipakai untuk "ini masalah" sekaligus "ini lulus", jadi satu warna membawa dua makna berlawanan. Kontras isi klip sudah cukup bercerita.
5. **Kamera: drift bergetar halus pada klip slop, push stabil pada klip bersih. Audio: musik rapat → turun → lapang. Senyap saat kembali ke wajah.**
   - **IKUT ALASAN.** Ini alasan desain asli, bukan kutipan: bahasa kamera dan musik ikut membuktikan argumen.
   - "0 SFX saat kembali ke wajah" sesuai pola `93`.
   - Catatan: guncangan buatan pada klip bukti mengubah barang bukti (sisi tipis dari I8).
6. **Whoosh −4 dB tepat di potongan keras 18,00. Font "Anton/Inter Bold atau Inter ExtraBold". Ukuran "108 px... atau lebih baik 72–80 px".**
   - Whoosh di potongan keras: **SLOP (S-A12)**, karena whoosh di cut tanpa gerak cepat yang terlihat. Menurut katalog, potongan keras = klik.
   - Font dan ukuran dibiarkan dua opsi. Rancangan berhenti di tengah pemeriksaan aturan ("merah-oranye? **TIDAK**").
   - "Masalahnya, AI" tidak tampil (A1).

### Tes editor senior
Struktur adegan ini paling "manusia" dari keempat frame: urutan jelas, satu poros, dan kontras ritme yang disengaja. Yang berlebihan adalah penanda kuning (siku dan border) dan whoosh. Selebihnya cukup diputuskan, bukan ditambah.

**Putusan: LULUS DENGAN CATATAN.**

---

## 5. Prinsip yang tidak bisa dipakai tanpa melihat kartu (dan usulan rumusan ulang)

Format usulan: **keputusan → niat → kapan dilanggar.**

1. **Ukuran caption % H vs Lantai A7** (Bagian 3 #1, sudah ditambal di F3-talking-head baris 19)
   - **Kenapa gagal:** angka pengamatan (2,0–4,4% H) dan angka eksekusi ada di satu kalimat. % H juga berubah arti antar-rasio.
   - **Usulan:** "Caption sambung 60–72 px di kanvas lebar 1080 (9:16) atau 1920 (16:9), tidak pernah < 56 px. Tujuannya terbaca di HP 360 px. Boleh lebih kecil hanya untuk label diegetik di dalam UI." Buang semua % H pengamatan dari file skill.
2. **A1 (semua ucapan tampil) vs R-021/C14 vs S-V13 saat demo UI ber-VO** (Bagian 3 #2, ditambal F4 §1.1 #2, **belum cukup**)
   - **Kenapa gagal:** tiga dokumen saling bertentangan.
     - A1 mewajibkan semua ucapan tampil.
     - R-021 meminta fokus hanya ke UI.
     - F3-talking-head #1 meminta caption tidak ikut zoom, padahal S-V13 menyebut teks diam saat objek di-zoom sebagai slop.
   - Tambalan memberi dua opsi tanpa geometri, sehingga agen memilih (a) lalu tetap membuang kata dan menaruh pita di zona merah.
   - **Usulan:** "Saat demo UI ber-VO, semua kata tampil di pita atas y 13–22% (16:9). Jendela UI ≤ 62% tinggi di bawahnya. Pita tidak ikut zoom selama push ≤ 1,5×. Tujuannya mata punya satu poros baca sementara kamera bekerja di UI. Dilanggar bila teks menunjuk elemen UI tertentu: teks itu menempel ke elemennya dan ikut kamera (S-V13)."
3. **I7 "kata KT senyap" vs S-A4 vs Lantai E24** (temuan pemeriksa)
   - **Kenapa gagal:**
     - F4 I7 mencantumkan S-A4 sebagai risiko yang dicegah oleh kata senyap, padahal S-A4 di katalog berbunyi "teks… **tanpa SFX**; video terasa sepi". Agen akhirnya mengutip S-A4 sebagai alasan untuk senyap, yaitu terbalik.
     - E24 menyebut `kt_tick: per-word` untuk **explainer/UI**, tetapi F3-apple mendorong senyap (`93`). Brief A adalah explainer UI.
   - **Usulan:** "Pilih satu mode tick per video dan tulis di RESEP: `accent-only` untuk talking head dan dokumenter, `per-word` −14…−20 dB untuk explainer UI. Tujuannya tidak sepi (S-A4) dan tidak berisik (S-A11). Dilanggar bila VO > 3 kata/dtk; turun ke `accent-only` agar klik tidak menumpuk."
4. **Rumus durasi baca A8 pada tuturan cepat** (temuan pemeriksa)
   - **Kenapa gagal:** pada 3,3 kata/dtk, rumus menuntut 1,2–1,3 dtk per blok, sementara blok yang tersedia hanya 0,55–0,85 dtk. Referensi pun melanggarnya (`85` slab 0,3–1 dtk).
   - Agen diam-diam tidak memenuhinya; dokumen tidak memberi jalan keluar.
   - **Usulan:** "Di tuturan > 2,5 kata/dtk, tampilkan 1–2 kata per blok. Kata pendek ≤ 6 huruf boleh 0,3–0,5 dtk asal tidak ada dua blok panjang berturut-turut. Kata hero bertahan sampai jeda berikutnya. Tujuannya teks tidak tertinggal dari suara. Dilanggar untuk kutipan atau angka: tahan penuh sesuai rumus."
5. **Penanda alat desain (F3-apple §2 #5)** (temuan pemeriksa)
   - **Kenapa gagal:** ditulis sebagai menu empat penanda (seleksi ber-handle, kapsul hover, garis registrasi, tag siku). Agen memakai hampir semuanya dalam satu frame.
   - Keyframe (`34-k2`, `72-k3`, `96-k1`) selalu memakai satu penanda yang tipis.
   - **Usulan:** "Maksimal satu penanda alat desain per adegan, dan hanya bila VO menyebut aksi yang ditandai (memilih, mengukur, mengoreksi). Bentuk default: sorotan tipis tembus pandang + 2 handle, tanpa isi solid. Dilanggar: tidak ada; tambahan seperti label dimensi atau ikon hanya bila diucapkan."
6. **Redaman footage vs wallpaper desktop (F3-apple §2 #8c, §1 Warna)** (Bagian 3 #9 + temuan pemeriksa)
   - **Kenapa gagal:** resep "blur 8 px + desaturasi" untuk stok B-roll ditempel ke wallpaper. Akibatnya terjadi S-V2 dan panel gelap larut di latar gelap.
   - **Usulan:** "Wallpaper desktop tetap tajam dan bernada sedang (langit/lanskap). Jendela UI kontras nada dengannya: gelap di atas foto cerah, atau terang di atas foto gelap. Uji di zoom 25%: tepi jendela terlihat tanpa border. Redaman hanya untuk B-roll stok yang bukan bagian dunia desktop."
7. **Uji kontras hanya untuk teks** (temuan pemeriksa)
   - **Kenapa gagal:** semua angka kontras di draf menyangkut teks. Agen menghitung 10 pasangan teks dengan teliti tetapi tidak pernah menguji panel vs latar (1,06:1).
   - **Usulan:** tambahkan ke loop still: "cek tiap bidang utama (jendela, kartu, wadah bukti) terpisah dari latarnya di zoom 25% (Lantai C17)."
8. **ID kartu dan kode tanpa gambaran visual** (Bagian 3 #7)
   - **Kenapa gagal:** "`63`", "`36`", dan "`33-k3`" hanya bermakna bagi yang pernah melihatnya. Agen mengutip `63` untuk wallpaper buram dan jendela 72%, dua hal yang bertentangan dengan `63-k1`.
   - **Usulan:** setiap kartu yang disebut di skill diberi satu kalimat wujud ("63: desktop macOS, wallpaper gunung tajam, jendela gelap ±58% di tengah, dock terlihat"), dan loop F5 §5 wajib membuka 2–3 keyframe sebelum menggambar.
9. **Polarisasi I2 diterapkan tidak konsisten** (temuan pemeriksa)
   - **Kenapa gagal:** aturannya baik, tapi terkubur di antara 15–20 kode per frame, sehingga diterapkan di B2 dan lolos di B1.
   - **Usulan:** jadikan cek still eksplisit: "hitung rasio ukuran tiap pasangan teks di frame; 1,3–2,3× = ubah."

Hambatan yang **sudah cukup** ditambal: hex gagal kontras (F3-apple baris 26), celah Problem-First (F5 §1.1), perbandingan non-UI di 9:16 (F5 §3), dan label bukti vs A5 (F4 §1.1 #3). Untuk oklusi kata panjang (Bagian 3 #8), F3-talking-head #2 kini memberi "puncak huruf ≥ 65–70% terbuka" dan "≤ 10–12 karakter". Itu cukup, asalkan kartu `16` dijadikan contoh visualnya: `contoh-gagal/16` menunjukkan "PROFESIONAL" kehilangan 3 huruf tengah.

---

## 6. Pola kegagalan dokumen draf (terlihat dari cara agen menulis)

1. **Kode ID menggantikan penalaran.** Tiap frame menutup dengan 15–20 rujukan ID. ID dipakai sebagai stempel lulus, sampai terbalik:
   - S-A4 dikutip untuk membenarkan senyap.
   - `63` dikutip untuk wallpaper buram.
   - `F4 I2` dikutip, lalu dilanggar di frame sebelahnya.

   Bagian yang berhasil justru yang ditulis dengan kalimat sebab-akibat agen sendiri (gema kartu, perintah asli di kolom input, bahasa kamera slop vs bersih).
2. **Ketaatan angka mengalahkan rasa.** Kontras dihitung 2 desimal, px dari % H, LUFS, ms SFX. Tidak ada satu kalimat pun tentang "apakah frame ini terlihat penuh?". Semua kegagalan besar (dekorasi bertumpuk, dunia gelap larut, kuning tiga kali) tidak punya angka di draf, jadi tidak tertangkap.
3. **Menu dibaca sebagai daftar belanja.** Draf sering menulis "(a)/(b)/(c)", "3 struktur panggung", "3 perilaku masuk", "4 penanda". Agen memakai semuanya sekaligus (A1: 6 penanda; B1: 3 gerak utama di satu frame).
4. **Rentang dan "atau" melahirkan keraguan.** Rentang lebar (46–82%, 2,3–8×, 12–56% H) dan alternatif membuat agen meninggalkan "atau" di rancangan final: per huruf atau hard-cut, Anton atau Inter, 108 atau 72–80 px. Skill harus memaksa satu nilai default.
5. **Kontradiksi antardokumen tidak punya hakim.**
   - S-V13 vs I5/F3-talking-head #1 (teks diam saat zoom).
   - S-A4 vs I7 (senyap).
   - E24 vs F3-apple (tick per-word untuk UI).
   - F3-apple 56–60% vs I1 46–82% (lebar UI).
   - A4 (1–3 kata) vs `36-k5`/`36-k6`, yang menunjukkan headline 4 kata satu baris.
6. **Anti-contoh paling efektif bila bergambar dan menyebut kondisi.** I4, I8, contoh-gagal/13, 17, 20, dan 21 ditransfer dengan benar karena README contoh-gagal memuat kolom "kondisi yang membuatnya gagal". Anti-contoh yang hanya berupa ID proyek (D-24, R-029, L98) tidak menambah pemahaman.

### Untuk F7 (file skill ±2.000 token per tema)

**BUANG:**
1. Semua ID inline (S-*, R-*, D-*, L*, `k`-nomor) di badan aturan. Pindahkan ke satu tabel bukti di luar skill (F3/F6 tetap jadi arsip).
2. Angka pengamatan per kartu (daftar hex, cut/menit per kartu, LUFS per kartu, % H per kartu). Ganti dengan satu nilai eksekusi default + satu syarat.
3. Bagian "Catatan 1 Kartu" dan semua klaim gerak `(belum dilihat bergerak)` dari badan skill.
4. Menu opsi tanpa aturan pemilih. Sisakan satu default + satu alternatif dengan pemicu tegas.
5. Paragraf koreksi proyek internal (behindwork, builder-trap, dst.) kecuali yang punya gambar contoh-gagal.

**PERTAHANKAN:**
1. Format keputusan → niat → kapan dilanggar, maksimal 5–6 keputusan per tema, ditulis dengan kalimat sebab-akibat.
2. Audit kondisi bahan (I4) sebagai daftar cek pembuka, dan larangan integritas bukti/UI (I8). Keduanya terbukti bisa ditransfer.
3. 2 contoh gagal bergambar per tema, masing-masing dengan kolom "kondisi yang membuatnya gagal".
4. **Anggaran keras yang bisa dihitung:**
   - maks 1 penanda;
   - maks 1 gerak utama per momen;
   - maks 1 kemunculan aksen per frase;
   - rasio ukuran 1,0–1,3× atau ≥ 2,3×;
   - maks 2 perlakuan visual aktif pada satu kata.
5. Loop wajib **render still → buka 2–3 keyframe tema (dengan deskripsi satu kalimat) → bandingkan di zoom 25% → kurangi**, ditambah satu pertanyaan: "elemen mana yang bila dihapus tidak mengurangi pemahaman? Hapus."

   Uji ini menunjukkan rasa tidak bisa ditransfer lewat teks saja. Semua TEMPELAN terjadi pada keputusan yang mengutip kartu tanpa melihatnya.

Tambahan untuk SKILL.md inti: satu tabel kecil **"bila bentrok, yang menang"** untuk 5 kontradiksi di butir 6.5 di atas, supaya model tidak menyelesaikannya dengan menebak.
