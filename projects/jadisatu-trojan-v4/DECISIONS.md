# Keputusan yang diambil sendiri · Trojan v4 (mandat jalan otomatis, Irfan 7 Nov)

Format: A (motion ber-VO narator) · 1920×1080 30 fps · kategori audio `energi` (beat 10 `hangat`).

| # | Keputusan | Alasan satu baris |
|---|---|---|
| D1 | VO digenerate di akun EL kunci pertama (voice `1I8tElkHzrblGqkJtwn3` hanya ada di akun itu); setelan = setelan tersimpan voice (stability 0,5 · similarity 0,75 · style 0 · speaker boost · speed 1,0) | voice sama dengan The Gap; speed 1,0 = tidak dipercepat (aturan 33) |
| D2 | Satu take per beat, tanpa retake | sisa kredit akun pertama 1.226, naskah 1.187 karakter; transkrip Whisper cocok dengan naskah |
| D3 | Durasi video ±83 dtk, bukan 60–67 dtk | bicara narator alami ±80 dtk; jeda dalam VO sudah ≤ 0,3 dtk; VO tidak boleh dipercepat dan naskah final |
| D4 | Format output TTS mp3 44,1 kHz 128 kbps | 192 kbps hanya untuk tier Creator |
| D5 | Musik ElevenLabs satu komposisi 7 seksi dikunci ke beat VO; 4 kandidat, dipilih `m4` + EQ (cekungan pita suara, high-shelf) → `music_fit.py` energi **PAKAI + EQ** skor 100 | m1–m3 ditolak: terlalu gelap (centroid < 1700) / build terlalu besar |
| D6 | SFX: SFXIrfan → Kenyset → sfx-el The Gap; ElevenLabs hanya untuk kertas & laci (tidak ada di stok) | urutan sumber mandat |
| D7 | Foto beat 8 = tile gradien + Fluent Emoji (tanpa foto stok) | API Unsplash/Pexels butuh kunci; fallback tertulis di storyboard |
| D8 | Angka di UI demo (Rp850.000 vs Rp720.000, laporan Rp1.240.000, dll.) dianggap isi diegetik UI/benda, bukan teks layar | aturan 2 berlaku untuk caption/kinetik; storyboard beat 2 meminta angka beda warna |
| D9 | Beat 7 slider "Rp …" → Rp0 (bukan harga nyata) | tidak mengarang harga Workspace |
| D10 | Label kartu beat 3: "kecil-kecilan · jualan · toko" (bukan "titip jualan") | teks layar hanya kata VO |
| D11 | Cabang ditampilkan sebagai chip "Cabang 1·2·3" + "Tambah cabang" di kartu satu akun (portal asli memakai "Buat workspace") | storyboard final menulis "+ Tambah cabang"; dicatat sebagai penyimpangan dari label portal |
| D12 | Versi iklan (tombol jadisatu.cloud) tidak dibuat; render = versi organik | storyboard menyebut versi iklan opsional |
| D13 | Ambang pita sub 25–55 % / low-mid < 42 % di `audio_qa.gate()` tidak dipakai | dicabut 1 Nov (audio.md §14.10); dibandingkan ke referensi: mix sub 13,5 % / low-mid 54,7 % vs The Gap 14/63, Baikov 18/57 |
| D14 | Uji HP `audio_phone.py`: gain per cue dibatasi agar median kelas tetap di rentang Modul 5 | dua gerbang bertabrakan; Modul 5 = Hard Gate |
| D15 | Push ke GitHub ditolak classifier auto-mode sesi ini; commit tetap lokal di `main` | tidak diakali; perlu izin Irfan |
