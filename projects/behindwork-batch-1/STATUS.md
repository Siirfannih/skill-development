# STATUS · behindwork-batch-1

Diperbarui 22 Nov 2026 (claude2).

## Posisi
- Storyboard v1 (zip Irfan) diaudit: `AUDIT.md`. Panel sumber v1 tidak ada, jadi dibangun ulang (D-01) dengan gaya baru Story Cinematic (D-02), 16:9 (D-04).
- **Ep01 Jensen Huang selesai sebagai acuan** (D-03): `storyboard/ep01/` (13 beat, 25 frame, `board.py` PASS). Review: https://claude.ai/artifact/8yXZrwpBF2d4RbfpzguHt9
- Ep01 revisi 1 (D-08) terbit; storytelling disetujui (D-07).
- VO: akun ElevenLabs Behindwork sisa 18.974 kredit (reset 7 Des 2026). Uji 4 suara (Arunika, Dhea, Ahmad, Dany Saputra; `eleven_v4`, stability 0,55, style 0,1) di Drive `Claude edit/behindwork-batch-1/vo-uji-suara`. Menunggu Irfan memilih suara; lalu setel `speed` (tempo uji ±1,8 kata/dtk, naskah dianggarkan 2,6) dan generate VO ep01.

## Cara kerja (dipakai ulang untuk ep02–10)
1. Footage dari `riset/episode/<ep>/footage.md` → `/mnt/storage-projects/behindwork-batch-1/<ep>/footage/` (yt-dlp `--js-runtimes node --remote-components ejs:github`; video Stanford perlu `-f 137+140`).
2. Still → `storyboard/<ep>/plates/` (crop, warna selektif lewat matte RVM `~/work/persepsi/.venv`).
3. `storyboard/<ep>/gen.py` menulis `panels/*.html` + `beats.json` memakai `storyboard/tools/panel.py` dan `storyboard/tokens.css`.
4. `board.py storyboard/<ep>` sampai PASS, lihat lembar kontak, perbaiki.
5. `storyboard/tools/review.py <out> ep01 …` → publish Artifact (URL di atas, path file yang sama).
6. Sumber tiap plate di `storyboard/<ep>/SUMBER-ASET.md`.

## VO (22 Nov)
- Paket dengar 12 variasi + potongan vokal referensi: Drive `Claude edit/behindwork-batch-1/vo-variasi-suara` (`00_SEMUA_berurutan.mp3`). Menunggu Irfan memilih.
- OmniVoice: `~/work/tts/omni-venv`, skrip `~/work/tts/omni_variasi.py` (per kalimat; kalimat 1 voice design, sisanya ref ke kalimat 1). Keluaran mentah `/mnt/storage-projects/tts/out/`.
- ElevenLabs voice design: `generated_voice_id` B1–B6 belum disimpan ke akun (simpan hanya yang dipilih, `POST /v1/text-to-voice`). Sisa kredit ±18.660.
- 22 Nov: B6 dipilih (D-11). Kandidat ringan C1–C6 di Drive `Claude edit/behindwork-batch-1/vo-b6-ringan`, menunggu pilihan final. Remix `generated_voice_id` di `vo/remix_*.json` (simpan ke akun hanya yang dipilih). Sisa kredit 18.185.
- 22 Nov: uji naskah D-12 (D1–D6) di Drive `Claude edit/behindwork-batch-1/vo-d12-naskah-natural`. C3 tersimpan di akun (`Y62OZ57dKfXyAcWpVXk0`). OmniVoice tertinggal (D5 datar, D6 menelan kata dan merusak kata berkapital) → ElevenLabs untuk VO final. Menunggu pilihan Irfan.

## Produksi final (23 Nov)
- **Ep01 EN selesai 01.30**: `/mnt/storage-projects/behindwork-batch-1/final/Behindwork_EP01_JensenHuang_EN.mp4` (89,2 dtk, −16,9 LUFS, puncak −2,7 dBFS), Drive `Claude edit/behindwork-batch-1/final`. Mesin: `remotion/` (data `src/data/ep01.json` dari `bangun/rancangan_ep01.py`), musik tegang/energi/hangat dipilih `music_fit.py`. Render langsung Remotion; gerbang `render.sh final` lengkap tidak dijalankan karena tenggat (cek yang dijalankan: still per beat + lembar per detik dengan mata, `sfx_span.py --cues` tanpa HABIS setelah ganti tape rewind, loudness).
