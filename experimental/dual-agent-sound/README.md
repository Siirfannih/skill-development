# Dual-agent sound design (eksperimental)

Status: **eksperimen**, diuji sekali di video «Pengganti Kita Sendiri» (31 Okt 2026). Belum menjadi aturan skill; `claude/motion-graphic` tetap sumber kebenaran sampai hasil ini lolos telinga Irfan dan gerbang EVALS-DESIGN.

## Peran
- **Claude = sound engineer.** Mengeksekusi: memilih kandidat, merakit VO, mixing, mastering, dan mengukur dengan alat sendiri (earshot/CLAP, pyloudnorm, ffmpeg ebur128).
- **Gemini = music & vocal director.** Mengkurasi dan mengkritik: mendengarkan audio sungguhan, lalu mengembalikan JSON.
  - Utama: `agy` (Antigravity CLI, Mac Irfan, model `gemini-3.8-flash-high`).
  - Cadangan: Gemini API `gemini-3-flash-preview`. Kunci gratis tidak punya kuota model Pro.

Setiap panggilan ke Gemini membawa `config/acoustic_style_blueprint.json` + `config/acoustic_style_overrides.json` (aturan Irfan di chat; menang bila bertentangan) + dua referensi 8 dtk di `assets/reference_bank/`.

## Alur (dipakai di proyek contoh)
1. **Kurasi library.**
   - CLAP (earshot) menyaring dulu: skor tag wajib dikurangi tag terlarang (`examples/.../clap_screen.py`).
   - 10 kandidat teratas dikirim ke Gemini (`curate`).
   - Hanya yang disetujui **kedua telinga** yang dipakai.
2. **VO.**
   - 3 take per adegan dengan setelan blueprint per babak, `playback_rate 1.0`.
   - Gemini memilih (`vo-pick`). Bila agy dan API berbeda, metrik prosodi sendiri (`voice_prosody.py`: % akhir kalimat naik, turunnya nada di akhir) menjadi penentu, jadi pilihan diambil dengan suara mayoritas 2 dari 3.
3. **Pacing.**
   - Hanya dari keheningan: 0,8 dtk di akhir kalimat, 1,5–1,8 dtk sebelum & sesudah klip Inggris.
   - `vo-direct` meminta Gemini menilai jeda dan memotong klip.
4. **Mix + gerbang.**
   - `mix9.py`: satu trek utuh, bed −26 LUFS → mati saat Jensen → −20 LUFS, ducking sidechain, maks 15 SFX dari 3 jenis.
   - Gagal bila LRA < 7,0 LU, jeda kalimat rata-rata < 0,5 dtk, atau true peak > −1,5 dBTP.
5. **QC loop.**
   - `qc` dikirim **tanpa** angka atau catatan engineer (blind). Bila catatan disertakan, Gemini cenderung menyetujui.
   - Tiap temuan dicek dengan ukuran sebelum dikerjakan (devil's advocate).

## Pelajaran yang terukur dari uji pertama
- **Gemini bisa salah dengar angka.** Ia beberapa kali menulis "jeda ±1,0 dtk" padahal terukur 1,5 dtk. Ia juga meminta memperpanjang klip Altman agar kata 'company' selesai, padahal di sumbernya Altman memotong sendiri kata itu ("comp— as far as I can tell"), terverifikasi lewat transkrip Gemini sendiri. Klaim waktu dan level selalu diverifikasi dengan alat ukur.
- **Gemini berguna untuk hal yang tidak bisa diukur angka:** apakah suara terdengar ceria, apakah musik terasa korporat, dan apakah SFX terasa literal. Contoh: agy menolak boom mk498 sebagai "ledakan literal", lalu boom diganti.
- **Dua model Gemini sering tidak sepakat soal pilihan take VO** (3 dari 6 adegan berbeda). Perlu penentu ketiga.
- **Model mengutip catatan konteks seolah temuan.** Contoh: catatan "VO v8 ceria" di overrides dibaca sebagai kritik atas VO baru. Konteks harus netral.
- **LRA ≥ 7 dan VO tetap jelas bisa dicapai bersamaan:**
  - target musik dibaca sebagai level *bed* (di sela kalimat), bukan rata-rata setelah ducking
  - dinamika narator per babak (B1 +1,5 dB, B2 −1,5, B3 −5)
  - hasil: LRA 8,2–8,3 LU, VO di atas musik median ≥ 14 dB di Babak 3

## Menjalankan
```
python3 scripts/gemini_audio_director.py curate --kind music --context "..." kandidat/*.mp3
python3 scripts/gemini_audio_director.py vo-pick --act 3 --text "naskah" take1.mp3 take2.mp3 take3.mp3
python3 scripts/gemini_audio_director.py qc mix_master.wav --cues cues.json        # tanpa --notes = blind
```
`--backend agy` (default bila `agy` ada di PATH) atau `--backend api`.

Kunci API tidak pernah disimpan di repo. Urutan pencarian: `$GEMINI_API_KEY` → `~/Documents/Skill-Development/.secrets/gemini.key`.

Lihat `LOG.md` untuk hasil tiap putaran.
