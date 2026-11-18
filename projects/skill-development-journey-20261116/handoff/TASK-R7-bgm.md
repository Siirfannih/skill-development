# TASK-R7-bgm · musik latar baru yang cocok dengan vibe video (D-460)
Baca dulu `handoff/R7-BERSAMA.md` (bagian awal sesi, merek). Laporan audio sebelumnya: `handoff/REPORT-R6-audio.md`.

TUJUAN: stem musik baru `audio/r7/stem_musik_r7.wav` (83,817 dtk, 48 kHz stereo) yang lebih bertenaga dan cocok dengan vibe video, menggantikan musik R4 yang "terlalu slow dan kurang cocok" (Irfan). Musik lama tetap disimpan untuk versi pembanding.

## KONTEKS
- Video: Irfan bercerita santai-bersemangat tentang workflow AI yang ia bangun (skill-development), potongan cepat, banyak motion graphic UI premium Apple-style, punchline lucu ("balik modal, Pak", "habis banget"), penutup ajakan komentar + "skill gratis". Akun personal kreator. Nada: percaya diri, playful, modern-tech, bukan sinematik lambat.
- Babak (detik): 0–4,3 pembuka "finally selesai" (lega-bangga, hit di FINALLY 0,85) · 4,3–13,8 perkenalan workflow + tokoh (ringan, playful) · 13,8–23,6 parodi AI slop/viral (kontras: boleh musik "murahan" sengaja, lalu stop-down di "putus-putus" 22,8) · 23,6–36,3 UI app Claude "bukan template… aku ngebalik" (fokus, groove) · 36,3–53,8 WORKFLOW-NYA, BALIK MODAL, kartu 20×/5× (energi naik, lucu) · 53,9–72,1 LINTAS AGENT → adegan workflow Claude (puncak kerja, driving) · 72,1–76,4 Blender 100% FULL AI (stop-down sebelum, lalu hit) · 76,4–83,8 IG + punchline "gratis" (ringan, berakhir dengan hit di punchline ±82,65 lalu ekor).
- Tempo video: ukur dengan `~/work/skill-development/claude/motion-graphic/scripts/audio/pace_read.py`; pilih dengan `scripts/audio/music_fit.py`. Kandidat ≥ 8 dari ≥ 2 sumber yang ada di PC (cari katalog: `musik/KREDIT.md` proyek ini, katalog Asset/musik di repo, `~/sfx`, folder musik Epidemic yang dipakai proyek lain — baca saja). ElevenLabs/berbayar: JANGAN tanpa izin (sebut biaya di laporan bila menurutmu perlu).
- Musik per babak boleh 1–2 track yang disambung di potongan visual besar (23,6 / 53,9 / 72,1) dengan sambungan di ketukan; stop-down 0,6–0,8 dtk sebelum momen besar (DECISION 12,0, LINTAS AGENT 57,0, 100% 72,6, gratis 82,65).

## FILE BOLEH
BARU: `audio/r7_bgm.py`, `audio/r7/**`, `musik/KREDIT.md` (tambah baris kandidat/terpilih).
## FILE JANGAN
Stem/mix R4 dan r6 (`audio/stem_*`, `audio/mix_*`, `audio/r6/**` baca saja), visual, lego/, remotion/, edit/, file pekerja lain.

## LARANGAN
- Suara asli ×1,0, tidak di-limit/kompres; musik menyesuaikan suara (ducking di bawah ucapan, kejernihan suara median ≥ 12 dB di uji HP).
- Musik tidak pernah bolong di bawah klip (bed sejak frame 0), tidak melawan emosi ucapan.

## LULUS BILA
1. `audio/r7/stem_musik_r7.wav` + `audio/r7/mix_r7_bgmbaru.wav` (suara ×1,0 + musik baru + `audio/r6/stem_sfx_r6.wav`) dan `audio/r7/mix_r7_bgmlama.wav` (= mix_r6, untuk pembanding); puncak ≤ −1 dBFS; loudness ±1 LU dari R4.
2. `music_fit.py` skor kandidat terpilih tertinggi atau alasan tertulis bila tidak; `audio_phone.py` kejernihan median ≥ 12 dB.
3. Pratinjau mux `audio/r7/pratinjau_bgmbaru.mp4` di atas `qc/r6/visual_r6.mp4`.
## LAPORAN
`handoff/REPORT-R7-bgm.md`: kandidat (judul, sumber, bpm, kunci, skor), pilihan + alasan per babak, titik sambung, hasil gerbang, lisensi/kredit.
