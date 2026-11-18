# TASK-R7-sfx · SFX disinkron ke visual final r7 + dua mix (BGM baru / BGM lama)
Baca `handoff/R7-BERSAMA.md` (awal sesi, larangan), `handoff/REPORT-R6-audio.md` (cara R6: `audio/r6_audio.py`), `handoff/REPORT-R7-bgm.md`, `handoff/BEDAH-85.md` (kosakata SFX referensi: sapuan udara, swell, klik/tap, hit di engsel visual; hal baru tiap 3–5 dtk).

TUJUAN: setiap objek/peristiwa visual penting di `qc/r7/visual_r7_fin.mp4` punya satu bunyi yang tepat waktunya, SFX R6 yang objeknya sudah berubah disesuaikan, lalu dua mix final: `audio/r7/mix_final_bgmbaru.wav` dan `audio/r7/mix_final_bgmlama.wav`.

## KONTEKS · peristiwa baru/berubah (waktu persis ada di laporan masing-masing; cek di frame)
- Tokoh (`handoff/REPORT-R7-tokoh.md` §Waktu persis): 3 pop bubble WhatsApp (pop lembut bersih, satu file `pop-chat` untuk ketiganya), Gemini titik mengetik (senyap atau tik sangat halus), pendaratan tokoh di DECISION (satu bunyi kontak lembut, serentak = satu event), keluar bersama slab (ikut bunyi slab).
- KT wajah (`handoff/REPORT-R7-ktwajah.md`): kata per kata SENYAP; hanya pil "habis banget" (43,5) dan masuk cincin/tangga pertama tiap kelompok boleh satu bunyi halus (maks 1 per kelompok).
- UI (`handoff/REPORT-R7-ui.md`): SELESAI blok chartreuse (hit sukses), "template." di kolom prompt (ketik), "100% FULL AI" per kata (sudah ada kata-hero R6, cek waktu).
- IG (`qc/r7/ig/sfx-events.json` + ronde 2): ketik "Skill" (ketik per huruf = satu cue ketik pendek), kirim komentar (send), komentar baru muncul (pop), balasan siirfannih (notif), kamera zoom ke panel (swoosh halus), PROFESIONAL (kata-hero sudah ada), GRATIS punchline biru (hit + swell kecil), kembali ke wajah.
- Transisi Sutradara (`lego/r7_finishing.py`): 57,92 jentikan → gelombang grid (bunyi jentikan asli di suara; tambah `gelombang` mulai 57,92, puncak ±58,05); 71,67–72,07 dorong ke Clawd (riser/whoosh mempercepat, puncak di cut 72,07) lalu mendarat di Blender (thump lembut 72,07); 76,01–76,41 dorong ke monitor (whoosh, puncak 76,41).
- Klik kirim di dalam jendela Claude: frame dunia 24 → absolut ±58,73 (peran `klik`).
- Cue R6 yang objeknya HILANG/BERPINDAH: hapus atau geser (mis. `klik` lama 58,325, `gelombang` lama 58,32–59,19, cue IG lama, bubble lama 8,6–9,8).
- Hal baru tiap 3–5 dtk (D-471): setelah semua cue terpasang, ukur interval peristiwa (visual ATAU SFX) dengan cara `qc/r7/bedah85/measure_novelty.py`; rentang > 4 dtk tanpa apa pun → usulkan satu cue yang terikat ke objek yang benar-benar terlihat (bukan bunyi kosong) dan tulis di laporan; jangan menambah bunyi tanpa objek.

## FILE BOLEH
BARU: `audio/r7_sfx.py`, `audio/r7/sfx/**`, `audio/r7/cues_r7.json`, `audio/r7/objects_r7.json`, `audio/r7/stem_sfx_r7.wav`, `audio/r7/mix_final_*.wav`, `audio/r7/logs/**`, `audio/r7/cek_*`.
## FILE JANGAN
Stem/mix R4 dan r6, `audio/r7/stem_musik_r7.wav` (baca), visual, lego/, remotion/, edit/.
## LARANGAN
E23/E24 Lantai (suara ×1,0 tanpa limiter; 1 SFX 1 objek; satu peran satu file; ≥100 ms antar-bunyi, whoosh ≥1 dtk, ≤5 cue/2 dtk; gain −4…−10 dB; palet terlarang kayu/koin/kartun/8-bit/sinus). Bunyi bersih Apple-style (D-469): pop/tap/swoosh halus, bukan kartun.
## LULUS BILA
1. `sfx_density` PASS, `voice_level` PASS, `audio_phone` kejernihan median ≥ 12 dB; puncak ≤ −1 dBFS dan **true peak ≤ −1 dBTP** (turunkan stem musik/SFX, bukan suara).
2. `audio/r7/cek_cue_r7.jpg`: still frame puncak tiap cue baru/geser dengan label.
3. Mux uji `audio/r7/cek_final_bgmbaru.mp4` dan `cek_final_bgmlama.mp4` (copy video `qc/r7/visual_r7_fin.mp4`, AAC 320k).
## LAPORAN
`handoff/REPORT-R7-sfx.md`: tabel cue (waktu, peran, file, objek, frame), interval hal baru sebelum/sesudah, hasil gerbang.
