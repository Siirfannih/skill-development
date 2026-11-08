# Storyboard visual: dari script atau daftar potongan ke papan panel

Baca di gerbang 4–5. Storyboard adalah gerbang review termurah: satu panel diperbaiki dalam menit, satu render dalam jam. Metodenya diturunkan dari cara kerja Wonder (skill `new-design`, `new-design-arrange`, `design-review`) dan dari 4 sesi storyboard Irfan di Wonder 1–7 Nov (Marketing, Motion Lagu, Pengganti Kita Sendiri, Trojan v4) (Irfan 8 Nov).

## Isi

1. Jalur masuk
2. Urutan kerja
3. Panel: format dan isi
4. Aturan panel dari umpan balik Irfan
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
2. **Arah visual sebelum menggambar.** Sumber gaya menurut prioritas: brief Irfan → token/UI produk asli → panel yang sudah ada di papan → tangan bebas. Tulis di `beats.json → arah`: register, 2–3 kata karakter khusus produk ini (bukan clean, modern, sleek, minimal, premium: kata itu cocok untuk template apa pun), peran palet dengan nilai di `tokens.css`, pasangan font, tulang layout, satu detail khas yang hanya dimiliki proyek ini (contoh: mouse karakter Jadisatu di Trojan v4).
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
`cues.json` hasil `board.py` adalah bahan awal cue sheet gerbang 6: setiap event visual di storyboard sudah punya bunyi (aturan 43).

## 4. Aturan panel dari umpan balik Irfan

- Teks layar adalah bagian dari visual, bukan subtitle; jangan pasang baris subtitle di panel (Irfan 7 Nov, Trojan v4).
- Teks layar satu baris, tanpa tanda baca; pembuka satu kata per baris dan kinetik (Irfan 7 Nov).
- Logika dunia nyata per panel: percakapan harus nyambung (bukan dua pihak sama-sama bertanya), pesan masuk ke ruang yang benar (transaksi ke chat Jadisatu, bukan ke chat ayang) (Irfan 7 Nov, Trojan v4).
- Urutan aksi UI mengikuti urutan nyata dan perhatian penonton; satu frame per langkah bila langkahnya penting (Irfan, Pengganti 03a).
- Halaman sumber (Wikipedia, artikel) disusun ulang dengan fokus pada kalimat yang diucap, bukan ditempel utuh (Irfan, Pengganti 02a).
- Premium = struktur, ruang kosong, dan visual kuat yang menceritakan pesan; bukan satu warna di semua panel. Gradien hanya untuk beberapa frame; gradien di semua panel membuat monoton (Irfan, Marketing R4–R5).
- Frame rapi dan tidak penuh; noise dan elemen tanpa makna dibuang (Irfan, Marketing).
- Skala karakter logis: karakter lebih besar dari objek di sekitarnya (kalender, meja) (Irfan, Motion Lagu).
- Karakter orang Indonesia berkulit sawo matang, bukan wajah gelap tanpa detail (Irfan, Motion Lagu).
- Aset yang belum ada (foto Irfan, footage) = bentuk bayangan berlabel; jangan mengarang gambar penggantinya (Irfan, Pengganti).
- Satu keluarga karakter: elemen berkarakter (mouse, ikon) satu gaya dengan tokoh utama (Irfan 7 Nov).
- Elemen boleh keluar frame bila fokus memang di bagian lain; tandai `data-bleed` (Irfan 7 Nov, panel 09a).
- Revisi: ubah panel yang ada, jangan bangun ulang; elemen yang Irfan hapus tidak dipasang lagi; versi sebelumnya harus bisa dikembalikan (gagal: Trojan v4, elemen yang Irfan hapus dipasang ulang agent).

## 5. Review papan

Sekali setelah semua panel terisi, dan setelah revisi yang menyentuh beberapa babak. Lihat `board.png` dan panel PNG, bukan kode. Urutkan temuan: **kritis** (tidak sesuai VO/niat, teks tak terbaca, kontras < 4,5:1, logika dunia salah, konten hilang, terpotong tanpa sengaja) → **dasar** (hierarki, kepadatan, ritme ruang, layout berulang > 2) → **poles** (sisanya, hanya bila murah). Tulis tiap temuan sebagai elemen, perubahan, dan prinsip yang dilayani.

Kriteria:
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
