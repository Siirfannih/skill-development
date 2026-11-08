# Storyboard visual: dari script atau daftar potongan ke papan panel

Baca di gerbang 4–5. Storyboard adalah gerbang review termurah: satu panel diperbaiki dalam menit, satu render dalam jam. Metodenya diturunkan dari cara kerja Wonder (skill `new-design`, `new-design-arrange`, `design-review`) dan dari 4 sesi storyboard Irfan di Wonder 1–7 Nov (Marketing, Motion Lagu, Pengganti Kita Sendiri, Trojan v4) (Irfan 8 Nov).

## Isi

1. Jalur masuk
2. Urutan kerja
3. Panel: format dan isi
4. Cara Irfan menilai panel
5. Review papan
6. Melanjutkan panel contoh Irfan
7. TYPE-TEST dan TRANSITION-SHEET
8. Alat dan serah terima

## 1. Jalur masuk

| Kondisi | Yang dilakukan |
|---|---|
| Irfan memberi storyboard atau panel contoh | Lanjutkan seperti §6; panel contoh adalah arah gaya, bukan batas |
| Tidak ada storyboard (klip podcast, brief + video saja) | Agent membuat storyboard sendiri dengan metode ini dari daftar potongan + transkrip; tidak menunggu kata "final", papan dikirim bersama hasil (Irfan 8 Nov) |
| Tidak ada video referensi | Ambil paket ≤ 5 kartu dari repo `Siirfannih/canvas-skill-library` (`skills/canvas-reference-director/SKILL.md`, `references/cards.json`) + `guide/referensi/` sesuai goal; tulis di `beats.json → arah.sumber_gaya` mana yang dipakai dan kenapa (Irfan 8 Nov) |

Syarat masuk: script final (atau daftar potongan berstempel waktu), brief terkunci, referensi sudah dibedah per frame (`analysis-qa.md` §2).

## 2. Urutan kerja

1. **Bedah referensi per frame** menjadi kartu "yang terlihat → aturan yang diturunkan". Daftar nama file bukan pengganti melihat gambar.
2. **Arah visual sebelum menggambar.** Sumber gaya menurut prioritas: brief Irfan → token/UI produk asli → panel yang sudah ada di papan → tangan bebas. Tulis di `beats.json → arah`: register, 2–3 kata karakter yang lolos uji "hanya cocok untuk proyek ini" (clean, modern, premium gagal karena cocok untuk apa pun), peran palet dengan nilai di `tokens.css`, pasangan font, tulang layout, satu detail khas yang hanya dimiliki proyek ini (contoh: mouse karakter Jadisatu di Trojan v4).
3. **Beat dari VO kata per kata.** Satu beat = satu pesan; urutan panel dicocokkan dengan VO sebelum menggambar (gagal: Trojan v4 R1, panel acak dari urutan VO).
4. **Kerangka dulu.** `board.py --skeleton` membuat satu panel kosong berlabel per beat; isi satu per satu; kerangka tidak boleh tersisa.
5. **Gambar panel** (§3), render, lihat hasilnya, perbaiki. Jangan menilai dari kode.
6. **Gerak yang tidak terbaca dari satu frame dipecah jadi 2–4 frame** (`<id>-1.html`, `<id>-2.html`) supaya editor motion paham (Irfan 7 Nov: hook dipecah satu kata per frame, tombol "Gratis" jadi tiga tahap gelap → disentuh → menyala).
7. **Review papan sekali** (§5), perbaiki temuan, jalankan `board.py` sampai PASS.
8. **Serah terima** (§8).

## 3. Panel: format dan isi

Satu panel = frame + caption, seperti artboard Wonder.

- **Frame** berukuran format master (16:9 1920×1080, atau orientasi footage). Isinya **visual yang benar-benar terbaca**: UI asli produk/aplikasi, teks layar final, posisi objek dalam px, tiga lapisan 2.5D (`L-bg` latar, `L-vis` visual, `L-txt` teks). Bukan sketsa kotak.
- **Caption**: id beat, babak, waktu, kalimat VO, aksi (apa yang bergerak), kamera, transisi keluar, SFX per event (`peran` + `alasan`), dan musik per babak di judul baris.
- **Papan**: satu baris per babak, beat dari kiri ke kanan; versi lama pindah ke area arsip, bukan dihapus.
- Kode G, T, C, X diambil dari `typography.md` dan `camera-transition.md`; jangan menciptakan kode baru di storyboard.

`beats.json` (contoh lengkap: `templates/storyboard/`):
```
{project, format:{w,h,fps}, arah:{register, kata_karakter, detail_khas, sumber_gaya},
 babak:[{id, nama, musik:{peran, alasan}}],
 beats:[{id, babak, t:[mulai, selesai], vo, layar, aksi, kamera, keluar, sfx:[{t, peran, alasan}]}]}
```
`cues.json` hasil `board.py` adalah bahan awal cue sheet gerbang 9: setiap event visual di storyboard sudah punya bunyi (aturan 43).

## 4. Cara Irfan menilai panel

Bagian ini meniru **cara Irfan berpikir saat menilai**, bukan daftar gaya. Setiap pertanyaan diikuti kasus nyata dari sesi storyboard-nya. Kasus itu adalah jawaban untuk konteksnya sendiri (motion Apple-style, iklan Jadisatu, video lirik), bukan aturan tetap. Di konteks lain, ajukan pertanyaan yang sama, dan jawabannya boleh berbeda; tulis alasannya di caption panel. Yang tetap hanya standar yang Irfan nyatakan berlaku umum (aturan inti di `SKILL.md` dan `core-rules.md`, mis. teks layar satu baris tanpa tanda baca) (Irfan 8 Nov).

1. **Apakah ini masuk akal di dunia nyata?** Penonton langsung merasa ada yang janggal walau tidak bisa menyebutnya.
   - Kasus Trojan v4: chat sama ayang, kedua pihak sama-sama bertanya → tidak nyambung; pesan "jual risol" masuk ke chat ayang, padahal seharusnya ke chat Jadisatu.
   - Kasus Motion Lagu: tokoh lebih kecil dari kalender.
   - Kasus Pengganti 03a: pesan sudah terbaca utuh sebelum tombol kirim diklik.
   - Bisa berbeda: dunia metafora atau fantasi boleh melanggar fisika, asal logika di dalam dunianya konsisten.
2. **Apakah visualnya menceritakan pesan kalimat itu?** Panel yang Irfan puji (Marketing 06a, 07c) dipuji karena "visualnya kuat dan menceritakan isi pesan", bukan karena gayanya.
   - Kasus Pengganti 02a: halaman Wikipedia ditempel utuh, jadi penonton tidak tahu kalimat mana yang penting.
   - Turunannya: bila visual sudah bercerita, teks tambahan tidak perlu.
3. **Ke mana mata penonton pergi, dan apakah ia sudah bosan?**
   - Kasus Trojan v4 (pembuka Instagram): satu kata per baris, karena dua baris di detik awal membuat orang bosan.
   - Kasus Marketing: frame terlalu penuh dan banyak noise.
   - Bisa berbeda: pada bagian yang penontonnya sudah terikat, ritmenya boleh lebih lambat, tapi tetap uji apa yang dibaca lebih dulu.
4. **Apakah gaya ini dipakai dengan alasan, atau ditempel di semua panel?**
   - Kasus Marketing R4–R5 (motion "premium"): agent menerjemahkan premium jadi "semua biru", lalu "semua bergradien". Keduanya ditolak. Bagi Irfan, premium adalah rasa yang dibangun dari struktur, ruang kosong, dan visual yang kuat. Gradien hanyalah satu alat untuk beberapa frame.
   - Turunannya: satu panel yang dipuji adalah contoh cara mencapai rasa itu, bukan perintah untuk menyebarkannya ke semua panel.
5. **Apakah semua panel terasa dari satu keluarga?**
   - Kasus Trojan v4: mouse dijadikan karakter satu keluarga dengan tokoh usaha di panel 03.
   - Kasus Motion Lagu: tokoh orang Indonesia digambar dengan kulit sawo matang, karena tokohnya harus mewakili dunia ceritanya.
6. **Kalau panel ini dianimasikan, apakah editor paham geraknya?** Irfan selalu membayangkan saat frame diproduksi.
   - Kasus Trojan v4: hook dipecah satu kata per frame; tombol "Gratis" dipecah jadi tiga tahap.
7. **Apakah aset ini jujur?**
   - Kasus Pengganti: aset yang belum ada (foto Irfan) dibuat sebagai bayangan berlabel, bukan gambar karangan.
   - UI yang tampil adalah UI asli produknya.
8. **Apakah keputusan Irfan yang sudah ada dihormati?** Ini satu-satunya pertanyaan yang jawabannya tidak bergantung konteks:
   - elemen yang Irfan hapus tidak dipasang lagi;
   - bagian yang ia puji atau tidak ia komentari tidak diubah;
   - revisi mengubah panel yang ada, bukan membangun ulang;
   - versi lama tetap bisa dikembalikan.
   (gagal: Trojan v4, elemen yang Irfan hapus dipasang ulang agent.)

Saat ragu, tanyakan: **"Kalau Irfan melihat panel ini, pertanyaan mana yang akan ia ajukan dulu?"**, lalu jawab sebelum ia sempat bertanya.

## 5. Review papan

Sekali setelah semua panel terisi, dan setelah revisi yang menyentuh beberapa babak. Lihat `board.png` dan panel PNG, bukan kode. Urutkan temuan: **kritis** (tidak sesuai VO/niat, teks tak terbaca, kontras < 4,5:1, logika dunia salah, konten hilang, terpotong tanpa sengaja) → **dasar** (hierarki, kepadatan, ritme ruang, layout berulang > 2) → **poles** (sisanya, hanya bila murah). Tulis tiap temuan sebagai elemen, perubahan, dan prinsip yang dilayani.

Kriteria (pertanyaan §4 dipakai di sini, ditambah):
- **Niat**: panel menggambarkan kalimat VO-nya; urutan sama dengan VO.
- **Karakter**: ganti nama produk dengan produk lain, panelnya tidak cocok lagi.
- **Satu fokus** per frame, dari ukuran, bobot, dan warna sekaligus.
- **Kontinuitas**: objek dan tokoh yang sama terlihat sama antarpanel; transisi keluar panel A nyambung ke masuk panel B.
- **Gerak terbaca** dari urutan frame tanpa penjelasan lisan.
- **Bunyi**: setiap event visual di caption punya SFX dengan peran + alasan.

Tabel kritik sutradara per beat tetap diisi:

| Beat | Tokoh ada & beraksi | 1 fokus | Teks ≤ 6 kata | Metafora spasial | Efek punya alasan | Kamera ke subjek | Gerak masuk akal | UI asli | Highlight bermakna | Layout tidak berulang > 2 |
|---|---|---|---|---|---|---|---|---|---|---|

Satu "tidak" harus diperbaiki atau diberi alasan tertulis.

**Variasi** hanya bila diminta atau untuk satu panel kunci: maksimal 4, masing-masing jawaban desainer yang berbeda (keluarga warna, kategori huruf, komposisi), diletakkan berdampingan, tidak menggantikan yang asli.

## 6. Melanjutkan panel contoh Irfan

1. Deskripsikan setiap panel contoh apa adanya: yang terlihat, lalu aturan yang diturunkan.
2. Catat ciri gaya yang dibawa ke semua bagian: bentuk tokoh, palet, posisi teks, jumlah kata per beat, ruang kosong.
3. Untuk setiap pesan baru, tanyakan: **"Jika Irfan menggambar ini dengan tokoh yang sama, tokoh itu sedang melakukan apa?"**

Contoh (Tuntunly, 12 panel): pembuka = fakta dunia, visual sederhana di tengah; kontras dibangun dengan mengubah warna latar dunia yang sama; "jauh" digambar sebagai jarak ruang antara tokoh dan cahaya; rutinitas = komposisi sama, aksi dan ekspresi berubah; konsekuensi digambar dengan benda fisik.

## 7. TYPE-TEST dan TRANSITION-SHEET

Dibuat setelah storyboard lolos review:
- **TYPE-TEST**: satu still per gaya teks (G1–G7, `typography.md` §7.5) berdampingan dengan frame referensi setara, ditambah video 4 detik untuk gaya yang bergerak.
- **TRANSITION-SHEET**: untuk setiap potongan, frame terakhir A + frame pertama B + kode transisi + benda pembawa. Panel multi-frame dari §2 langkah 6 bisa langsung dipakai.

## 8. Alat dan serah terima

- **Default, semua mesin**: panel HTML + `scripts/storyboard/board.py` (render PNG, `board.html`/`board.png`, `cues.json`, cek otomatis: caption lengkap, peran/alasan SFX dan musik, waktu tanpa celah/tumpang tindih, teks layar satu baris tanpa tanda baca dan di dalam frame, kerangka tersisa, elemen terpotong). Mulai dari salinan `templates/storyboard/`.
- **Wonder** (Mac Irfan, MCP `mcp__wonder__*`): format panel sama, artboard = frame + caption, babak per baris. Alur: `get_skills(new-design)` → `create_page` → `create_artboard` → `take_screenshot` → `update_elements`. Panel final tetap diekspor ke folder repo.
- **Simpan di repo**: `projects/<proyek>/storyboard/` berisi `beats.json`, `tokens.css`, `panels/`, `png/`, `board.html`. Irfan berkali-kali harus bertanya "storyboard disimpan di mana?"; jawabannya selalu folder ini, ditulis di laporan (Irfan, Pengganti dan Trojan v4).
- Kirim `board.png` + daftar keputusan yang menyimpang dari referensi. Storyboard adalah gerbang persetujuan, kecuali jalur tanpa storyboard di §1.
