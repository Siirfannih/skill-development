---
name: "jadisatu-narrator-vo"
description: "Pengaturan VO narator Inggris Jadisatu yang sudah disetujui Irfan (suara, model, cara baca, cara merakit). Pakai setiap kali membuat voiceover marketing/promo Jadisatu dalam bahasa Inggris."
---

# VO Narator Jadisatu (Inggris) — pengaturan yang disetujui

Disetujui Irfan pada 17 Okt 2026 untuk video launching Jadisatu. Berlaku untuk semua konten marketing/promo Jadisatu berbahasa Inggris. Konten engagement berbahasa Indonesia memakai suara lain (kandidat: Zeplyn `3mAVBNEqop5UbHtD8oxQ`).

## Suara
- **Nama:** Jadisatu Narrator (draft V3) — hasil Voice Design ElevenLabs, tersimpan di akun Irfan.
- **voice_id:** `EKW9kJAbsPJUsVgih66R`
- **Model:** `eleven_v4` (bukan v3 dan bukan multilingual v2).
- **Deskripsi asal (untuk merancang ulang bila perlu):** perempuan akhir 20-an, terang dan jernih, tidak berat atau mendem, artikulasi Inggris tajam dengan aksen internasional netral yang mudah diikuti pendengar Indonesia, hangat dan percaya diri dengan senyum tipis, rekaman kering tanpa gema.
- Pengaturan slider (stability/similarity/style) tidak bisa diatur lewat konektor ElevenLabs terbatas; hasil di atas memakai bawaan suara.

## Dua cara baca (keduanya dipilih Irfan)
- **RELAXED** — awali bagian dengan `[warmly] [relaxed]`. Untuk hook, daftar/loop, penjelasan bisnis, tim & workflow.
- **FOUNDER** — awali dengan `[warmly] [thoughtful]`, beri jeda dengan elipsis `…`, baris baru, `[short pause]`, `[pause]`. Untuk pertanyaan reflektif, istilah kunci ("AI builder trap"), cerita Irfan, kesepakatan "No perform, no pay", penutup/CTA.
- Tempo hasil: ±139 kata/menit. Naskah ±380 kata → VO ±2:35 setelah dirakit.

## Aturan kata
- Narator **tidak** mengucapkan "Jadisatu" — pakai klip Irfan sendiri ("That's what… [klip: 'Jadisatu.'] …is building"), atau "it".
- Narator **tidak** mengucapkan "COBA" — pakai rekaman Google Translate asli ("Comment this word… [Google: 'Coba'] …to get the waiting list link"). Teks layar tetap menampilkan "Jadisatu" dan "COBA".
- Jangan pakai respelling fonetik atau IPA di naskah. Pelafalan dinilai hanya oleh telinga Irfan, bukan Gemini/Whisper.
- Naskah adalah teks final dari Irfan; simpan sebagai file sebelum generate. Jangan mengadaptasi ulang dari ingatan.

## Cara membuat
1. Pecah naskah per bagian cerita (±10–11 potong), masing-masing dengan tag cara baca di depan. Generate per potong (`generations_count: 1`) supaya potongan yang kurang bisa diulang sendiri (±50–330 kredit/potong; total ±2.400 kredit untuk ±380 kata).
2. Untuk slot klip, tulis `…` lalu `[long pause]` di naskah, lalu potong di **jeda nyata** (deteksi senyap < −45 dB, > 0,3 dtk), bukan di batas kata Whisper — Whisper sering salah menaruh kata di dalam jeda.
3. Rakit dengan skrip `build_vo_en.py` di folder proyek: trim tiap potong, jeda antar bagian 0,55–1,2 dtk, slot klip Irfan 1,4 dtk, slot Google "Coba" (0,45 dtk klik → suara → 0,35 dtk), normalisasi −16 LUFS / TP −1,5 dB, 48 kHz.
4. Verifikasi: transkripsi ulang dengan faster-whisper (bahasa `en`) dan cocokkan kata demi kata dengan naskah; cek dua titik sambungan; cek amplop loudness di sekitar slot.
5. Simpan kata + timestamp global + penanda slot (`irfan_clip`, `gt_click`, `gt_coba`) ke `vo_full_en_v1_words.json` untuk menggerakkan animasi.

## Proyek acuan
`~/Documents/Jadisatu Launch Video/` — `script/naskah_inggris_FINAL.txt`, `vo/full_en/c01–c11.mp3`, `vo/vo_full_en_v1.wav`, `build_vo_en.py`, `PROJECT_STATE.md`.