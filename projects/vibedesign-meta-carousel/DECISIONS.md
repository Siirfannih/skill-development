# DECISIONS · vibedesign-meta-carousel

Ledger koreksiku untuk carousel ini saja. Revisi yang mengubah slide menunjuk ID di sini.

| ID | Tanggal | Catatan pemilik | Slide | Status |
|---|---|---|---|---|
| D-001 | 24 Nov | Tujuan eksperimen: membuktikan desain carousel kualitas studio (bukan AI slop) bisa dibangun murni lewat kode; nanti dijalankan agent di OpenBot. | semua | Aktif |
| D-002 | 24 Nov | Render Blender 3D ditolak: terlalu glossy, bentuk melenceng jadi bulat-bulat. Semua visual 100% HTML/CSS/SVG dengan paper grain; render Blender dihapus. | semua | Aktif |
| D-003 | 24 Nov | Palet terkunci (lihat `DESIGN.md`): canvas #F7F6F2, dark #111215, ink #141518, biru #2563EB; bubble #3897F0 / #F45D79; tanpa kuning puding, toska, pink untuk karakter. | semua | Aktif |
| D-004 | 24 Nov | Serif tidak bisa dikolaborasikan dengan sans bold ("Carousel" serif di slide 1, "fenomena" serif di slide 3 jomplang, fungsinya apa?). Satu keluarga sans. | 1, 3 | Aktif |
| D-005 | 24 Nov | Hierarki slide 1: "Full AI" besar di tengah; "Carousel" tetap bold, dibungkus shape biru dan dimiringkan. | 1 | Diganti D-014 (penekanan lewat wadah tetap berlaku) |
| D-006 | 24 Nov | Thumbnail Frames 01–05 jangan di bawah; sebar acak di sisi kanvas sebagai pengisi whitespace, tidak menutupi teks. Teks biru blur foreground sudah tepat. | 1 | Aktif |
| D-007 | 24 Nov | Slide 2: "BISA NIH!!" besar capslock sudah tepat; urutan baca harus BISA NIH!! → Tapi.... → bubble chat. Bukan kotak chat WhatsApp. | 2 | Aktif |
| D-008 | 24 Nov | Slide 3: visual sudah top. Headline harus dibaca sebelum BISAAAA.: turunkan sedikit, satu font dan satu warna, perbesar, beri panel biru agar mata fokus ke sana dulu. | 3 | Aktif |
| D-009 | 24 Nov | Slide 4: ide kuat tapi terlalu noise, tidak ada fokus. Peras pesan sampai akar: AI gak bisa = AI bingung / hasilnya AI slop. Arah dipilih: UI chat AI generik (dummy, tanpa merek) → AI mengirim desain AI slop → pesan utama di bawahnya. | 4 | Aktif |
| D-010 | 24 Nov | Maskot kursor biru yang gepeng terbaca seperti "mouse tidur", aneh. Maskot ada untuk dimainkan agar desain ekspresif. | 4 | Aktif |
| D-011 | 24 Nov | Slide 5 dipertahankan: tampilannya sengaja "AI slop yang bagus", karena langsung membuktikan AI bisa bikin desain tapi tanpa direction hasilnya biasa saja. Serif biru "taste"/"arahnya" tetap. | 5 | Aktif |
| D-012 | 24 Nov | Anotasi tambahan "human only" (slide 5) dan baris log "hint: arah & selera…" (slide 4) dihapus: menambah copy dan membocorkan punchline. | 4, 5 | Aktif |
| D-013 | 24 Nov | Satu dunia visual kohesif untuk 5 slide: Digital Design Workspace / OS Collage (tab browser + toolbar editor, kertas ber-grid, micro speech-bubble, jendela OS, dock). Karakter harus berinteraksi fisik dengan layout, bukan pajangan. | semua | Aktif |
| D-014 | 24 Nov | Hook slide 1 diganti ke gaya startup-first yang clean: headline sans rata kiri bobot medium, frasa kunci aksen biru dengan seleksi tipis, kata raksasa frosted terpotong tepi di paruh bawah, chip + kursor kolaborator, meta & footer kecil. Kiblat: kartu cookbook 05. | 1 | Aktif (ronde 3) |
| D-015 | 24 Nov | "Tapi...." lurus; teks melengkung hanya bila lengkungnya mengikuti bentuk/objek. Jarak kelompok yang dibaca berurutan rapat dan konsisten (tidak ada celah besar antara teks dan bubble berikutnya). | 2 | Aktif (ronde 3) |
| D-016 | 24 Nov | Karakter/maskot tidak dipakai terus-menerus dan tidak dipaksa ada di tiap slide; muncul hanya bila punya fungsi (mis. menunjukkan sesuatu). | semua | Aktif (ronde 3) |
| D-017 | 24 Nov | Karakter yang dipakai: trio orisinal KLIK (kursor biru), NOTE (sticky note lime), NODI (anchor pen-tool hitam). Maskot/logo milik produk AI nyata tidak dibuat ulang dalam bentuk apa pun. | semua | Aktif |
| D-018 | 24 Nov | Kursor "VibeDesign" di pojok kanan atas seleksi "Full AI", tidak menutupi teks di bawahnya. | 1 | Aktif |
| D-019 | 24 Nov | Font emoji berwarna tidak ter-render di Chrome headless; emoji (🤔 👀, roket) digambar sebagai SVG buatan sendiri. | 2, 4 | Aktif |
| D-020 | 24 Nov | Jarak headline "Kemarin ngedit…" ke kalimat kedua "Sekarang kalau ngedit carousel…" terlalu jauh; dirapatkan agar dibaca sebagai satu kalimat bersambung. | 1 | Aktif (ronde 4) |
| D-021 | 24 Nov | Logika konteks label: yang kemarin (video Full AI) = vibe editing; yang sekarang (carousel) = vibedesign. Chip "VIBE EDITING" menempel di "Full AI.", chip "VIBEDESIGN" di kata Carousel. Label menggantikan D-018. | 1 | Aktif (ronde 4) |
| D-022 | 24 Nov | Gradien tidak boleh terlihat patah saat di-zoom: banyak stop yang di-ease + dither noise; tidak ada tepi kotak gradien di tengah kanvas. | 1 | Aktif (ronde 4) |
| D-023 | 24 Nov | Tanggal "2026 Nov" di footer tidak perlu; diganti informasi yang bermakna ("100% code / No Canva"). | 1 | Aktif (ronde 4) |
| D-024 | 24 Nov | "Tapi...." diturunkan agar tidak menabrak "NIH" dan warnanya digelapkan ke #C25C3A agar kontras ≥ 3:1 (teks besar). | 2 | Aktif (ronde 4) |
| D-025 | 24 Nov | Kata raksasa "Carousel" di slide 1 adalah gema visual (pesannya sudah dibawa kalimat kedua), jadi ditandai data-dekor untuk juri. | 1 | Aktif (ronde 4) |
| D-026 | 24 Nov | Whitespace lebar antara kalimat kedua dan kata raksasa memaksa mata turun terlalu jauh; kata raksasa dinaikkan menempel ke kalimat kedua dan ukuran huruf blok atas dinaikkan agar komposisi terisi. | 1 | Aktif (ronde 5) |
| D-027 | 24 Nov | Copy "Full AI." diganti "Full Pakai AI.". Chip VIBEDESIGN tidak boleh mengambang tanpa menunjuk apa pun: kursornya ada di samping tanda "?" pada "bisa gak sih?", mencerminkan chip VIBE EDITING di samping "Full Pakai AI." agar baris 1 dan 2 seimbang dan bermakna (kemarin = vibe editing, sekarang = vibedesign). | 1 | Aktif (ronde 5) |
| D-028 | 24 Nov | Kata raksasa "Carousel" terasa melayang saat dinaikkan, karena grid lantai (rotateX + mask) horizonnya tertinggal jauh di bawah dan celahnya hanya biru rata. Lantai diganti grid perspektif SVG yang horizonnya tepat di baseline (±1072 px), ditambah bayangan kontak dan garis horizon terang. Prinsipnya dicatat sebagai KMP-03. | 1 | Aktif (ronde 5) |
| D-029 | 24 Nov | Finishing slide 3: garis ukur "W 432" dan centang biru dihapus (tidak bermakna setelah NODI hilang), strip film ditempel ke label Vibe Editing sebagai bukti visualnya, subteks label ≥ 24px, KLIK berpijak dengan bayangan kontak. | 3 | Aktif (ronde 6) |
| D-030 | 24 Nov | Finishing slide 4: jendela chat dan pesan utama berbagi tepi kiri yang sama; teks chat ≥ 24px; pesan utama 136px; kartu slop diperbesar; KLIK berpijak di dasar kartu. | 4 | Aktif (ronde 6) |
| D-031 | 24 Nov | Finishing slide 5 tanpa mengubah tipografi yang disetujui: whitespace mati antara headline dan dock dipersempit (dock naik dan diperbesar, garis pandang lebih pendek), "mau ke mana?" digelapkan ke #888479 agar kontras ≥ 3:1. | 5 | Aktif (ronde 6) |
| D-032 | 24 Nov | Slide 5 diberi catatan tulisan tangan gaya Excalidraw (font Virgil, OFL) "Neh kan jelek / lagi hasilnya :(" dengan panah coretan ke tanda "?" — komentar jujur bahwa tampilan AI-slop ini memang hasil tanpa arah. Dibaca setelah headline. | 5 | Aktif (ronde 6) |
