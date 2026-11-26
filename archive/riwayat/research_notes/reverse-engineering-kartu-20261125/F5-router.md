# F5 · Router Tema, Pemasangan Naskah (`S01–S12`), dan Protokol Bertanya

Dokumen ini mengatur cara model memilih satu dari 6 tema visual (`F2-tema.md`), memasangkannya dengan pola struktur naskah (`S01–S12`) dan transisi netral (`14`), bertanya secara visual kepada user (maksimal 3 pertanyaan), mencampur tema secara aman, serta mengunci *style frame* sebelum masuk produksi storyboard.

---

## 1. Pohon Keputusan Pemilihan Tema (4 Skenario Masuk)

Model tidak menebak tema secara acak maupun menyamakan semua brief menjadi satu gaya default. Tentukan jalur masuk user lebih dulu:

### Jalur A · User Membawa Referensi Video / Style Frame Sendiri
1. **Identifikasi dunia visual referensi (jangan menyalin layout mentah):**
   - Dominan layar aplikasi/desktop/kursor/UI produk → **`apple-saas-ui`**
   - Pembicara tatap kamera + teks di ruang kepala/dada/slab → **`talking-head-kinetic`**
   - Foto arsip, kliping koran, lukisan, spotlight wajah/benda → **`documentary-archive`**
   - Kertas bertekstur/grid, stiker guntingan, coretan krayon/pulpen → **`tactile-paper-collage`**
   - Kanvas polos gelap/krem + satu metafora konsep/diagram garis/UI mikro → **`editorial-metaphor-canvas`**
   - Angka raksasa, persentase, grafik batang/counter → **`minimalist-dataviz-kinetic`**
2. **Audit kesesuaian referensi vs kondisi bahan user (`F4-inti.md` I4):** Jika user membawa referensi `talking-head-kinetic` seperti kartu `83` (atasan krem di depan studio merah hangat) atau kartu dada gelap `87`/`61`, tetapi footage user mengenakan kemeja bermotif di dinding terang, **pertahankan tema jangkar** sambil mengalihkan teknik penempatannya ke kondisi footage aman (mis. samping kepala atau cutaway slab).
3. **Jika user baru mengirim 1 video referensi baru** yang belum ada di pustaka, bedah dulu mekaniknya mengikuti aturan referensi tanpa meniru warna/font/layout mentahnya bila user sudah punya profil merek.

### Jalur B · User Membawa Brief & Profil Merek Terkunci (`BRAND.md` + `EDITING.md`)
1. Baca profil merek dan cek apakah format video didominasi **wajah pembicara** (`≥ 35–60 %` durasi), **layar produk/UI nyata** (`≥ 60 %` kalimat merujuk aksi software), **arsip/cerita nyata**, atau **esai/konsep abstrak**.
2. Jalankan matriks penentu cepat:
   - *Ada pembicara di kamera + fokus penyampaian lisan/opini?* → **`talking-head-kinetic`**
   - *Tanpa pembicara (atau cameo ≤ 20%) + fokus demo software/workflow/AI?* → **`apple-saas-ui`**
   - *Banyak bukti foto masa lalu, berita, kutipan artikel, profil tokoh/founder?* → **`documentary-archive`**
   - *Menjelaskan ide abstrak, metafora cara kerja, atau manifesto tanpa screenshot SaaS?* → **`editorial-metaphor-canvas`**
   - *Fokus membandingkan data, metrik, biaya, atau statistik angka utama?* → **`minimalist-dataviz-kinetic`**
   - *Nuansa personal/kreatif buatan tangan dengan 80%+ item punya benda fisik/emosi?* → **`tactile-paper-collage`**
3. **Saring kata pemicu slop di brief (*Brief Sanitizer*):** Jika brief mengandung kata kabur yang memicu slop—misalnya *"buat terlihat premium/futuristik"*, *"tambah efek glass + neon glow"*, *"gabungkan serif elegan dengan bold besar"*, atau *"penuhi layar dengan kartu"*—**berhenti 1 turn**, tolak asumsi slop (`S-T3`, `S-V21`, `contoh-gagal/01, 03, 14`), dan konfirmasi dengan opsi tema + keyframe nyata.

### Jalur C · User Hanya Membawa Naskah / Rekaman VO (Tanpa Rekaman Wajah & Tanpa Referensi)
1. **Bedah peran setiap kalimat lebih dulu (*Script-First Breakdown*):** Jangan pilih tema sebelum melihat isi kalimat. Hitung rasio kalimat berdasarkan wujud bukti yang dituntut naskah:
   - Banyak kalimat aksi perangkat lunak (*"ketik prompt"*, *"klik approve"*, *"pindah tab"*) → **`apple-saas-ui`**
   - Banyak kalimat sejarah/studi kasus nyata (*"tahun 1992"*, *"di artikel ini"*, *"foto ini"*) → **`documentary-archive`**
   - Banyak kalimat perumpamaan/hubungan sebab-akibat (*"jarak antara X dan Y"*, *"pikiran penuh"*) → **`editorial-metaphor-canvas`**
   - Banyak daftar benda nyata/kebiasaan kreatif kasual (*"10 hal"*, *"kertas coretan"*) → **`tactile-paper-collage`**
   - Banyak perbandingan angka/persentase (`65% vs 35%`, `$400M`, `3× lebih cepat`) → **`minimalist-dataviz-kinetic`**
2. Karena user tidak membawa referensi visual, **wajib masuk ke Protokol Bertanya §2** sambil menunjukkan 2–3 gambar keyframe kandidat tema terkuat sebelum mengunci *style frame*.

### Jalur D · User Datang Dengan Ide Kasar Tanpa Naskah & Tanpa Referensi
1. Tentukan dulu **struktur cerita (`S01–S12`)** yang paling cocok dengan niat pesan (lihat §1.1), baru ajukan maksimal 3 pertanyaan visual (§2) dengan menampilkan 2–3 keyframe perwakilan tema sehingga user menunjuk gambar yang paling mendekati seleranya.

---

### 1.1 Tabel Pemasangan Lapisan Naskah (`S01–S12`) & Transisi (`14`) ke 6 Tema Visual

Kartu `S01–S12` bekerja pada **lapisan struktur argumen & tempo bicara**, sedangkan 6 tema bekerja pada **lapisan wujud visual**. Kartu `14` (*Tile-Grid Cut Wipe*) adalah mekanik transisi cepat `≤ 7 frame` yang boleh dipanggil lintas tema saat berpindah B-roll/demo (maks `≤ 3× per 10 dtk`, dilarang di dokumenter lambat/emosional).

| Kartu Naskah (`S01–S12`) | Fungsi Argumen Naskah | Tema Visual Pasangan Paling Alami | Kapan Pakai Transisi `14` (Tile-Grid) |
|---|---|---|---|
| **`S01`** *Misconception-Flip* | Bantah anggapan umum + alasan + 1 langkah | `editorial-metaphor-canvas` (utama), `documentary-archive` | Tidak disarankan (pakai konektor/hard cut) |
| **`S02`** *Insult-Concede-Reframe* | Bantah vonis luar + akui sisi benar + balikkan lewat karya/contoh | `documentary-archive` (utama), `talking-head-kinetic` | Tidak (pakai mozaik/cut ke contoh karya) |
| **`S03`** *Demonstrate-the-Claim* | 3 tips singkat yang dibuktikan langsung saat diucapkan | `talking-head-kinetic` (utama), `tactile-paper-collage` | Boleh saat lompat ke B-roll contoh tip |
| **`S04`** *Outsider-Verifies-Then-Joins* | Kisah orang luar yang membuktikan merek lalu bergabung | `talking-head-kinetic` (utama), `documentary-archive` | Tidak (pakai hard cut / wipe pintu/nyata) |
| **`S05`** *Peak-Then-Pivot Origin* | Profil pendiri: puncak sukses → retak batin → titik balik | `documentary-archive` (utama) | Tidak (pakai inset tumbuh / hard cut kutipan) |
| **`S06`** *Steelman-Story-Concede* | Puji lawan dulu (steelman) → cerita konsekuensi → konklusi | `talking-head-kinetic` atau `documentary-archive` | Opsional di montase konsekuensi cepat |
| **`S07`** *Refuse-Inoculate-Simplify* | Tolak tren ramai + tahan tekanan + 1 cara sederhana | `talking-head-kinetic` (utama), `tactile-paper-collage` | Tidak (pakai cutaway slab / kertas) |
| **`S08`** *Result-First Recipe* | Pamer hasil visual duluan → pangkas hambatan → resep angka pasti | `apple-saas-ui` (utama), `talking-head-kinetic` | Ya, di transisi *hasil → langkah UI* |
| **`S09`** *Show-First Category-Flip* | Demo hasil kerja AI/alat di layar → buka masalah lama → balikkan kategori | `apple-saas-ui` (utama), `minimalist-dataviz-kinetic` | Ya, saat montase *before-after* hasil |
| **`S10`** *Countable Command Cascade* | Daftar 7–10 perintah konkret cepat untuk audiens berpengalaman | `tactile-paper-collage` (`98`), `apple-saas-ui` | Ganti dengan wipe pita warna (`98`) atau tile (`14`) |
| **`S11`** *Two-Pressure Confession* | Pengakuan dilema batin personal sebelum temukan jawaban | `tactile-paper-collage` (`97`), `talking-head-kinetic` | Tidak (harus swap keras tenang tanpa grid) |
| **`S12`** *Mirror-Triplet Definition Flip* | Video reflektif 20–30 dtk mendefinisikan ulang 1 kata kunci | `editorial-metaphor-canvas`, `tactile-paper-collage` (`95`), `talking-head-kinetic` (`90`/`87`) | Tidak (pakai polaritas terang↔gelap atau kata diam) |

> **Celah *Problem-Hook → SaaS Workflow Demo* (`apple-saas-ui`):** Apabila promo produk/AI (mis. Jadisatu Canvas) meminta pembuka **Hook Masalah (`0–3 dtk`)** dulu baru **Demo Alur Kerja (`12–18 dtk`)** sebelum hasil jadi, jangan memaksa hasil tampil di detik 0 seperti `S08`/`S09` murni—jalankan **Varian Problem-First dari `S09`** (*Masalah desain template → Ruang kerja AI+manusia → Demo kerja → Hasil disetujui*) atau awali dengan jembatan singkat `S01` menuju `S08`/`S09`.

> **Aturan Keras Sumber Pembanding:** Seluruh contoh positif, keyframe acuan, dan uji perbandingan kualitas **HANYA** boleh berasal dari kartu referensi eksternal (`cookbook/_vault/**` & `guide/referensi/sheets/keyframes/`). Video produksi internal kita (seperti potongan Jensen Huang `"asrama yang keras"` di `contoh-gagal/18-teks-tipis-di-batu-arsip.jpg`, *Behindwork*, *Jadisatu 60s*, *The Gap v17*, *Builder Trap*) **dilarang keras** dipakai sebagai tolok ukur positif maupun uji banding—hanya boleh tampil sebagai **`contoh salah`**.

### 1.2 Matriks Routing Rasa Suara & Gaya Teks per Tema (Hasil F3b `ADDENDUM-2`)

Pemilihan tema tidak hanya diputuskan dari wujud gambar, tetapi juga dari **rasa suara** (apakah VO memimpin di depan vs musik memimpin) dan **gaya teks** (narasi penuh vs penekanan/label/kutipan):

| Tema Visual | Kepemimpinan Suara & Kepadatan SFX | Mode Bunyi KT Default vs Opsional | Peran & Gaya Teks Khas (`R1–R6` & `T*`) |
|---|---|---|---|
| **`apple-saas-ui`** (`24` kartu, `4 ya`) | **2 jalur:** Ber-VO memimpin `±0,5 momen/dtk` (`93`) vs Spot non-VO dipimpin musik `102–129 bpm`/sting (`94`). Famili `mekanik`, `ui`, `air`, `impact`. | **Senyap** pada kata KT & huruf ketik di referensi `ya` (`93`, `94`); bila mode `tick` (`E24`) dipakai: klik `mekanik` `−14…−20 dB`. | **Ketikan UI nyata (`R5`: `T11/T12`) + narasi di luar UI (`R1/R2`: `T01, T05, T23`)**, dilarang memasukkan monolog VO ke box chat (`contoh-gagal/13`). |
| **`talking-head-kinetic`** (`25` kartu, `6 ya`) | **VO pembicara mutlak di depan** (`TEMPO=1.0`, `−14…−16 LUFS`, drop musik `0,2–1,3 dtk` pra-vonis). Tolak hujan pop mentah (`03/22`). | Pilih sadar **`accent-only`** (`91, 85, 83 T4`) ATAU **`per-word` `mekanik` `−14…−20 dB`** (`Lantai E24`); aksen puncak `-2..-6 dB` di slab/engsel. | **Panggung ucapan tunggal (`Lantai A1`)**: wajib `≥ 56 px @1080` (`A7`), 3 jangkar (dada/headroom polos, belakang kepala RVM `G6`, cutaway slab `T04`), `per-letter` hanya `≤ 8–10` huruf. |
| **`documentary-archive`** (`15` kartu, **`2 ya` [`89, 92`], `1` sebagian [`86`]**) | **VO memimpin (`konten`):** sangat hemat (`89` `0,12/dtk`, acuan `55` `±0,65/dtk` *(belum didengar)*); musik `fokus/tegang/slowdown` naik per babak (`≥ 250 ms`); famili `taktil` (`documenter`), `Pergantianfoto`. | **`accent-only` (kata biasa & hard cut senyap)**; stop-down pra-pivot ke drone/bed `≤ 0,5 dtk`. *(Klip non-89/92 `(belum dilihat bergerak)`)* | **Penuntun argumen + verifikator kutipan tajam (`HighlighterSweep`)**: adaptif ruang kosong (`≥ 1,2 dtk`) vs terkunci pusat `y 48–51%` (`< 1 dtk`), jeda kanvas `0,5–1,5 dtk`. |
| **`tactile-paper-collage`** (`7` kartu, `3 ya` [`95, 97, 98`]) | **VO di depan:** sub-profil `faceless` (`97` 0-musik/0-SFX + jeda `> 0,3 dtk`, `98` bed tipis `−21,7 dB`) vs `scrapbook` berbabak (`02/31`). *(Batas bukti `SD-2`: foley kertas konsensus resep, nihil akustik di `97/98`)* | **Kata & item daftar dibungkam (`97`, `98`)**; 1 cue per benda item, stiker hero, atau reset halaman besar. Tolak palet kayu/thock/felt (`S-A5`). | **2 mode:** Narasi penuh swap 0-frame / tumpuk stiker `T09` (`97, 98`) vs penekanan stempel `2,7–6×` (`31, 02, 95`). Tanpa *fade*. |
| **`editorial-metaphor-canvas`** (`9` kartu, `2 ya` [`88, 96`]) | **2 jalur:** Mode `konten` VO di depan + bed tenang tanpa pompaan (`88`) vs mode `musik` non-VO cut ikut ketukan `117,5 bpm` (`96`). SFX hanya di lahir benda/diagram/klik UI. | **Senyap secara default** pada kata narasi & geser nilai terang (`88`, `96`); 1–2 puncak + vakum/penurunan `−45…−55 dBFS`. | **1-lapisan poros tengah (`y 47–55%`)** atau blok 2-tingkat lawan objek (`T01, T07, T05, T23`); tanda aktif lewat nilai terang/tukar token/1× kata hero. |
| **`minimalist-dataviz-kinetic`** (`4` + `3` konteks, **`0/4 ya`**) | **Status `0/4 ya` (seluruh gerak/audio masih hipotesis diam/data):** Jalur musik memimpin tanpa VO (`56, 67`, `108–112 bpm`) atau VO+bed tenang (`58`). Puncak tunggal `riser → hit/stab`. | **Counter bergulir & baris berulang senyap per digit/langkah (`56, 58, 67`)** *(belum didengar & belum dilihat bergerak)*; bunyi hanya di nilai akhir/engsel panel. | **Penekanan & data kuantitatif (`1` angka hero + `1–3` kata label, `≤ 6` kata non-VO)**: skala ekstrem `3,2–7×` + `tabular-nums`, label menempel kontur (`T16, T23`). |

---

## 2. Protokol Bertanya (Maksimal 3 Pertanyaan: Visual, Rasa Suara, & Gaya Teks)

Jika arah tema, rasa suara, gaya teks, atau kondisi bahan belum terkunci dari brief, **hentikan pembuatan storyboard/kode** dan ajukan **maksimal 3 pertanyaan sekaligus** dengan aturan keras:
1. **Jangan pernah bertanya kata sifat abstrak** (*"Mau nuansa modern, elegan, atau dinamis?"*). Seluruh model menafsirkan "elegan" sebagai serif pucat atau Apple Glass (`S-V21`, `contoh-gagal/01, 14`).
2. **Setiap pertanyaan wajib berisi pilihan konkret + 1 `(Rekomendasi)`** yang diturunkan dari konteks brief/naskah.
3. **Jika user datang tanpa referensi visual, wajib lampirkan/tunjukkan 2–3 path keyframe contoh eksternal nyata** agar user memilih dengan mata, serta **selipkan pilihan Rasa Suara (`VO di depan vs musik memimpin, kepadatan SFX`) dan Gaya Teks (`teks sebagai narasi vs penekanan`)** ke dalam paket 3 pertanyaan tersebut (jangan menambah jumlah pertanyaan menjadi `> 3`!).

### Template Paket 3 Pertanyaan Saat User Tanpa Referensi Visual (Visual + Suara + Teks)

> **Pertanyaan 1 · Arah Dunia Visual & Peran Teks (Pilih 1 dari 3 Contoh Nyata):**
> Berdasarkan naskahmu, ada 3 arah visual beserta peran teks yang paling cocok. Kamu paling sreg ke arah mana?
> - **Opsi A — Clean Software & UI Demo (`apple-saas-ui`) *(Rekomendasi untuk demo produk/AI)*:** Layar aplikasi nyata di atas wallpaper/gradien bersih, kamera mendekat ke prompt/tombol; teks memisahkan **ketikan perintah UI nyata** dari narasi di luar UI (`63`, `36`). Lihat contoh:
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/63-k1-dock-wallpaper.jpg`
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/30-k3-hero-ui-gradien.jpg`
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/33-k3-titik-dan-ui-garis.jpg`
> - **Opsi B — Kanvas Metafora Minimal (`editorial-metaphor-canvas`):** Satu gagasan per layar lewat diagram garis atau kanvas polos tanpa penuh jendela UI; **teks menjadi jangkar konseptual / blok 2-tingkat** (`88`, `80`). Lihat contoh:
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/88-k1-kepala-titik-biru-teks-serif.jpg`
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/80-k1-kinetik-gelap.jpg`
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/37-k4-meja-voxel-skillfile.jpg`
> - **Opsi C — Kolase Kertas & Stiker Taktil (`tactile-paper-collage`):** Kertas grid/pindai dengan benda fisik berbayang nyata; **teks berupa tumpukan stiker miring atau swap kertas** yang mengiringi daftar/narasi (`97`, `98`). Lihat contoh:
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/98-k2-satu-objek-per-item.jpg`
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/97-k2-ukuran-ikut-bobot.jpg`
>   - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/02-k7-scrapbook.jpg`
> *(Catatan router: jika brief mengandung pembicara di kamera, ganti salah satu opsi dengan `talking-head-kinetic` [`83-k1.jpg`, `87-k1-tumpukan-kata-di-ruang.jpg`, `85-k1-wajah-belah-kata.jpg`]; jika berbasis bukti sejarah/artikel, tawarkan `documentary-archive` [`48-k3-arsip-caption-kuning.jpg`, `19-k2-sorot-wajah-kapital.jpg`, `92-k1-judul-tahun-wipe-blueprint.jpg`]; jika fokus data/angka, tawarkan `minimalist-dataviz-kinetic` [`56-k3-batang-teoria.jpg`, `57-k4-bar-persen.jpg`, `67-k1-angka-raksasa.jpg`]).*
>
> **Pertanyaan 2 · Kehadiran Pembicara & Peran Teks di Layar (`Narasi Penuh vs Penekanan`):**
> - **A *(Rekomendasi jika VO padat / explainer UI)*:** Full motion/UI (*faceless*), seluruh kalimat VO tampil ringkas per `1–3` kata sebagai **teks narasi/panduan** di luar UI (atau hanya ketikan perintah UI bila UI penuh).
> - **B:** Ada pembicara (`20–40%` pembuka/penutup) + arsip/grafik di tengah, teks berperan sebagai **penuntun argumen & kutipan ber-stabilo / angka penekanan** (bukan paragraf panjang).
> - **C:** Pembicara mendominasi `≥ 60%` video; teks langsung menempel pada zona aman wajah/dada (`≥ 56 px @1080`) atau memotong ke *cutaway slab* di punchline.
>
> **Pertanyaan 3 · Rasa Suara (`VO vs Musik & Kepadatan SFX`) + Tempo Platform:**
> - **A *(Rekomendasi untuk VO narasi di Reels/TikTok `9:16`)*:** **VO memimpin jelas di depan** + bed musik stabil di bawah VO, kata narasi biasa **senyap (`accent-only`)** atau *tick* ultra-pelan `−14…−20 dB`, SFX nyata hanya pada kemunculan objek/klik tombol/engsel babak (`1,0–2,2 dtk/beat`).
> - **B *(Rekomendasi jika spot produk/metafora tanpa VO atau `16:9` tenang)*:** **Musik/ketukan memimpin tempo** (tanpa VO, `0` atau minim suara bicara) dengan potongan mengunci beat dan aksen `riser → impact` hanya di titik balik utama; **atau** (jika esai `16:9` ber-VO) bed pelan stabil dengan tempo cut tenang `2,5–5 dtk/shot` agar kutipan & data terbaca penuh.

*(Aturan hemat tanya: Jika peran pembicara, rasio, atau kepemimpinan VO sudah jelas dari bahan yang dikirim user—misalnya user mengirim rekaman suara narasinya—**jangan ditanyakan lagi**; gunakan slot pertanyaan yang tersisa untuk mengunci perbedaan sub-gaya teks [`narasi penuh vs kata kunci`], kepadatan SFX [`accent-only vs tick pelan`], atau kondisi aset yang masih kabur.)*

---

## 3. Aturan Pencampuran Tema (Kapan Boleh vs Kapan Dilarang)

Satu video tetap membutuhkan **1 tema jangkar dominan (`≥ 65–70 %` durasi)** yang mengunci tipografi pengikat dan warna aksen utama (`Lantai C18a`). Namun pencampuran **1 tema sekunder** diizinkan pada kondisi fungsional berikut:

### Kapan Pencampuran Boleh (Dengan Syarat Ketat)
| Tema Jangkar (≥ 65–70% Durasi) | Tema Sisipan (≤ 30–35% Durasi) | Alasan Fungsional yang Sah | Syarat Pengikat Agar Tidak Terasa AI Slop |
|---|---|---|---|
| **`talking-head-kinetic`** | **`apple-saas-ui`** | Pembicara menjelaskan sebuah tool AI lalu memotong masuk ke demo alur kerja aplikasi di layar (`14` atau `90`/`63`). | Pakai **1 keluarga sans dan 1 warna aksen yang sama** antara caption talking head dan label/kursor UI; jendela UI tetap bersih penuh (`≥ 55%`), jangan mengurung punchline talking head di kotak IG (`contoh-gagal/16`). |
| **`talking-head-kinetic`** | **`documentary-archive`** | Pembicara bercerita lalu memotong ke bukti foto sejarah/kliping artikel (`32`, `18`, `55`, `89`). | Kembalikan poros wajah tiap `2–15 dtk`; dokumen bukti wajib tetap tajam ber-stabilo (`F4-inti.md` I8 & `92-k7-kutipan-sorot-halaman-kosong.jpg`), jangan diburamkan (`contoh-gagal/21-kutipan-di-dokumen-blur.jpg`). |
| **`documentary-archive`** atau **`apple-saas-ui`** | **`minimalist-dataviz-kinetic`** | Di tengah cerita/demo ada **1–2 beat statistik krusial** (mis. `57-k4-bar-persen.jpg`, `67-k1-angka-raksasa.jpg`, atau eskalasi biaya `33-k4`, `56`). | Warisi palet dasar dan font pengikat tema jangkar (`#0A0A0A` atau `#F5F5F7` + 1 aksen); batasi wadah data ke 1 panel bersih `64–75%` tanpa drop shadow slide. |
| **`editorial-metaphor-canvas`** | **`apple-saas-ui`** (mikro) | Video konsep abstrak memakai 1–2 beat UI *frameless* untuk memperjelas kebiasaan digital (`96`, `80-k5-ui-melayang.jpg`, `80-k8-kalimat-ui.jpg`). | Jangan munculkan bezel HP atau dashboard SaaS palsu penuh; ambil hanya elemen aksi tunggal (kolom cari, ketikan, tombol, handle seleksi). |
| **`talking-head-kinetic`** | **`tactile-paper-collage`** | Talking head gaya studio kreatif yang menempelkan anotasi catatan kertas / scrapbook khusus di babak listicle/referensi (`31`, `02`). | Tetapkan satu sisi ruang negatif konsisten (mis. wajah kanan `x 65–70%`, kertas hanya kiri `x ≤ 48%`) dan **pakai di seluruh video**, bukan muncul mendadak cuma di 1 detik lalu hilang ke style UI glossy. |

> **Aturan Bukti Perbandingan Video/Visual Non-UI pada `talking-head-kinetic`:** Saat pembicara menampilkan perbandingan visual non-software (mis. video AI slop vs editing bersih pada `@siirfannih`), adegan itu tetap bagian dari **`talking-head-kinetic`** sebagai cutaway berwadah konsisten (hanya meminjam `apple-saas-ui` mikro bila buktinya berupa layar UI software). Di kanvas **`9:16`**, tampilkan kedua klip **berurutan *full-width* (`88–95% W`) berbatas kontras polaritas** agar detail terbaca jelas di HP; gunakan *split* atas–bawah `50:50` hanya jika bukti aslinya video horisontal `16:9` (dilarang menyandingkan dua frame `9:16` kiri–kanan yang sempit atau mengecilkan inset di kanvas kosong `contoh-gagal/20-inset-kecil-di-kanvas-kosong.jpg`).

### Kapan Pencampuran DILARANG Keras
1. **Tabrakan Material di Shot Bersebelahan Tanpa Pergantian Babak:** Mencampur tempelan kertas robek/krayon (`tactile-paper-collage`) pada Beat 1 lalu melompat ke panel kaca buram + kursor neon 3D (`apple-saas-ui`) pada Beat 2 tanpa alasan pergantian dunia cerita—ini merusak keutuhan dunia (`Lantai D22a`).
2. **Kartu Vektor Mentah di Atas Real Footage Tanpa Redaman (`flat-mirip-mirip` D-20):** Menggambar diagram/kartu vektor 2D terang yang menempel polos di atas footage dokumenter/talking head tanpa `blur`/desaturasi latar atau pemisahan ke kanvas penuh.
3. **Menumpuk 2 Sistem Teks Berbeda Saat Pindah Tema:** Misalnya memakai caption bawah di beat talking head lalu memindahkannya ke pita atas dengan font serif campur bold saat masuk beat UI/arsip (`S-T1`, `S-T3`).
4. **Mencampur ≥ 3 Tema Sekaligus dalam Video ≤ 60 Detik:** Terbaca seperti montase template acak tanpa sutradara.

---

## 4. Prompt Engineering Pertanyaan (Pola Baik vs Buruk untuk Konten Jadisatu & `@siirfannih`)

Kualitas jawaban model sangat ditentukan oleh bagaimana model mengajukan pertanyaan penjajakan ke user (dan bagaimana user/agent merumuskan prompt brief). Pertanyaan buruk mengundang jawaban kabur (*"bikin keren/premium"*); pertanyaan baik memaksa penguncian **subjek, bahan, kondisi, dan contoh gambar**.

| Skenario Konten | Pola Pertanyaan BURUK (Memicu AI Slop) | Kenapa Buruk (Mekanisme Gagalnya) | Pola Pertanyaan BAIK (Memilih Tema + Mengunci Layout) |
|---|---|---|---|
| **1. Launch Fitur Jadisatu Canvas (Produk AI / UMKM, Tanpa Wajah)** | *"Kamu mau videonya bergaya modern, clean, atau futuristik? Warna aksennya apa, dan mau animasi teks yang dinamis pakai transisi keren?"* | Kata *"modern/futuristik/keren"* diterjemahkan LLM menjadi *Apple Glass* + radial glow biru-ungu + grid 6 kartu simetris (`S-V8`, `S-V21`). Tidak menanyakan apakah UI asli tersedia. | *"Untuk promo Jadisatu Canvas (30 dtk tanpa wajah), kita pakai **`apple-saas-ui`** (`63-k1-dock-wallpaper.jpg` + `33-k3-titik-dan-ui-garis.jpg`) **(Rekomendasi)** supaya alur kanvas & kursornya tampil asli, atau **`editorial-metaphor-canvas`** (`88-k1-kepala-titik-biru-teks-serif.jpg` + `80-k1-kinetik-gelap.jpg`) kalau fokusnya cuma metafora ide? Lalu di Beat 2 demo alur kerja, apakah tampilan Canvas aslinya sudah bisa direkam/direkonstruksi komponen UI-nya, atau cukup *editorial UI metaphor* frameless?"* |
| **2. Reel `@siirfannih` Opini Founder (*"Kenapa video AI terasa slop"*, Talking Head)** | *"Oke aku buatkan storyboard reel-nya ya. Kamu mau style teksnya kayak kreator IG yang aesthetic, pakai serif atau bold, dan B-roll-nya mau banyak efek?"* | Memicu pencampuran serif+bold dalam satu baris (`S-T3`), penempatan teks di pita bawah (`S-T1`), serta mengabaikan kondisi baju/dinding footage Irfan (`contoh-gagal/14-kaca-di-dinding-terang.jpg`). | *"Untuk reel opini `@siirfannih` (9:16), **`talking-head-kinetic`** paling pas karena wajahmu memimpin argumen: **(1)** Di rekaman aslimu nanti, baju & latar belakang kepala polos gelap (bisa pakai kata belakang kepala/dada seperti `83-k1.jpg` & `87-k1-tumpukan-kata-di-ruang.jpg` **[Rekomendasi]**), atau ruangannya ramai/berpola (aman pakai cutaway kartu warna penuh seperti `85-k1-wajah-belah-kata.jpg` / `85-k5-slab-warna-kata-hero.jpg` & samping kepala)? **(2)** Saat masuk bagian bukti video AI gagal, mau disisipkan screenshot tajam + label, atau langsung cutaway kanvas kontras?"* |
| **3. Studi Kasus Klien / Profil Tokoh Dokumenter (Brief Baru: Cerita Proses & Hasil)** | *"Kita mau bikin konsep storytelling yang emosional untuk klien. Mau nuansa dokumenter serius atau yang playful?"* | *"Emosional/dokumenter"* tanpa pilihan aset membuat agen menaruh teks pucat di atas stok foto acak dan memburamkan dokumen bukti (`contoh-gagal/18-teks-tipis-di-batu-arsip.jpg` kasus Jensen Huang `"asrama yang keras"`, `contoh-gagal/21-kutipan-di-dokumen-blur.jpg`). | *"Untuk studi kasus klien ini, bahan nyata apa yang sudah ada: **Opsi A *(Rekomendasi)*** Foto proses asli, chat/brief klien, dan tangkapan hasil kerja (pakai **`documentary-archive`** seperti `92-k1-judul-tahun-wipe-blueprint.jpg` / `92-k5-tumpukan-kata-ruang-kosong.jpg` + kutipan tajam `92-k7-kutipan-sorot-halaman-kosong.jpg`), atau **Opsi B** lebih banyak angka perbandingan sebelum-sesudah (gabungkan **`minimalist-dataviz-kinetic`** `57-k4-bar-persen.jpg` / `67-k1-angka-raksasa.jpg`)?"* |
| **4. Konten Edukasi Cepat `@siirfannih` (Tips 45 dtk tanpa Referensi)** | *"Mau dibikinkan desain yang standout dan tidak membosankan? Boleh kasih tahu vibe warnanya?"* | Kata *"standout/tidak membosankan"* memicu efek RGB split/flash berlebihan (`S-V7`), teks warna-warni pelangi (`S-V3`), dan `box-shadow` slide (`contoh-gagal/20-inset-kecil-di-kanvas-kosong.jpg`). | *"Untuk 5 tips cepat tanpa wajah ini, pilih 1 dari 2 rasa visual agar tiap poin terbaca dalam < 1 detik: **Opsi A *(Rekomendasi untuk tips kreatif kasual)*** **`tactile-paper-collage`** (kertas milimeter krem + 1 benda nyata per poin + stiker miring seperti `98-k2-satu-objek-per-item.jpg`), atau **Opsi B** **`editorial-metaphor-canvas`** (kanvas gelap/krem polos + 1 diagram garis/ikon per poin seperti `80-k1-kinetik-gelap.jpg`)?"* |

---

## 5. Pengikat *Style Frame* (Dari User atau Dari AI)

Sebelum membangun seluruh beat atau menulis kode Remotion, model wajib mengunci **1–2 *style frame* pembuka** dengan prosedur berikut:

1. **Jika user membawa *style frame* sendiri (gambar/desain dari Figma/AE/referensi):**
   - Bedah dulu *style frame* user terhadap 6 parameter terukur: (a) polaritas & warna dasar, (b) 1 warna aksen aktif, (c) keluarga & rasio ukuran huruf, (d) zona teks terhadap subjek/objek, (e) perlakuan bayangan/kedalaman (`I3`), dan (f) batas ruang negatif (`I1`).
   - Masukkan ke `RESEP.md` proyek sebagai **pengikat tetap**, lalu gunakan keputusan di tema terkait *hanya* untuk mengisi mekanik gerak, transisi, dan tata letak beat lanjutan yang tidak digambar oleh *style frame* tersebut.
   - Uji still *style frame* di ukuran `25%` dan `100%` terhadap `Lantai` (`A2, A6, A7, C14–C17`); bila melanggar batas keterbacaan HP (`< 56 px @1080` atau kontras `< 4,5:1`), laporkan penyesuaian terkecil sebelum menyebar ke seluruh adegan.

2. **Jika user tidak membawa *style frame* (AI membuat *style frame* pertama):**
   - Setelah tema dikunci lewat §1–§2, pilih **2–3 keyframe eksternal perwakilan tema tersebut** dari `F2-tema.md` + `1` gambar `contoh-gagal/` paling relevan untuk dibuka berdampingan sebelum menggambar. *(Video produksi internal kita tidak pernah dipakai sebagai pembanding positif.)*
   - Bangun **hanya 1–2 still kunci** (1 still pembuka *hook* + 1 still bukti utama/data/UI) dengan materi asli brief/footage user—**bukan** teks dummy.
   - Jalankan lingkaran evaluasi mandiri (`render still → sandingkan pada zoom 25% & 100% dengan keyframe eksternal tema dan contoh-gagal/ → cek daftar Lantai + I1–I8 → perbaiki`), lalu tunjukkan *style frame* yang sudah lulus tersebut kepada user sebagai gerbang pengunci sebelum memproduksi sisa beat lainnya.

### 5.3 Handoff ke Preset Mekanikal (`PRESET-INDEX.md`)
Setelah *style frame*, tema, rasa suara, dan gaya teks terkunci serta disetujui, model masuk ke tahap pembangunan animasi dengan aturan alur:
1. Buka [`PRESET-INDEX.md`](/Users/igedeirfankusumaputra/KhususagentAG/reverse-engineering-kartu/draf-skill/PRESET-INDEX.md) (**buka hanya di tahap build**, bukan saat penjajakan brief).
2. Cocokkan kebutuhan gerak teks (`T01–T32`), kamera 2D/2.5D, transisi, dan aksen terhadap preset mekanikal yang sudah ada (`ae-primitives/`, `curves.ts`, `timing.ts`, `TeksBlok.tsx`, `Kursor.tsx`, `Penghitung.tsx`).
3. **Jika preset ada:** panggil preset lalu **ikat parameternya ke kondisi video** (onset/offset VO, jarak `dur()`, rasio `16:9`/`9:16`, zona aman subjek, palet tema `≥ 4,5:1`, seed acak deterministik).
4. **Jika tidak ada preset yang pas** (atau butuh konsep metafora unik): tulis komponen kustom murni dari fungsi waktu `(frame, fps)` di atas Lapis 1 (`curves.ts` + `timing.ts` + `aeKeyframe.ts`), bukan memaksa preset yang salah bentuk atau jatuh ke `fade`/linear.
