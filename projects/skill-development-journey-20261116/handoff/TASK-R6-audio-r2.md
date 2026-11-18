# TASK-R6-audio-r2 · penyesuaian SFX setelah visual masuk D dan "profesional" berubah

## AWAL SESI SUDAH DIKERJAKAN SUTRADARA
`git pull` + `tools/doctor.sh` sudah dijalankan; satu-satunya GAGAL "PETA.md basi" (file lokal). Bukan penghalang. JANGAN `doctor.sh --fix`, jangan sentuh PETA.md.

TUJUAN: `audio/r6/mix_r6.wav` diperbarui untuk visual baru `qc/r6/visual_r6.mp4` (sudah dirakit ulang Sutradara), dengan mengubah HANYA cue di dua rentang di bawah. Semua hal lain dari ronde 1 (`handoff/REPORT-R6-audio.md`, `audio/r6_audio.py`) tetap.

## KONTEKS (perubahan visual sejak ronde 1, D-449 / D-451)
1. **Masuk adegan D (57,658–59,2):** sekarang (a) 57,658–57,925 wajah di-push masuk (zoom 1,06→1,7) dengan blur gerak, lalu potong ke jendela Claude yang mendarat dari zoom 1,25→1 (57,925–58,325); (b) kursor turun ke tombol kirim dan **mengklik di 58,325** (frame absolut 1748): tombol tertekan, prompt "Revisi potongan ronde 3…" pindah dari kolom input ke percakapan; (c) klik itu memicu **gelombang grid bara gelap** dari tombol kirim (kanan bawah), menyapu jendela 58,325–59,19, paling padat ±58,5.
   - Kembalikan cue R4 `transisi-dunia` (`Woosh.mp3`, −4 dB) di **57,919** untuk push-in (objek: push wajah → jendela).
   - Tambah `klik` (BARU: klik UI pendek bersih, satu file) di **58,325**.
   - Pindahkan `gelombang` sehingga mulai di 58,325 dan puncaknya ±58,50 (masih satu bunyi untuk seluruh gelombang; jarak dengan klik boleh < 100 ms hanya bila klik dan gelombang dihitung satu event; bila gerbang menolak, geser puncak gelombang ke ≥ 58,43).
   - Cue D lainnya dari ronde 1 tetap.
2. **"profesional" (78,659–79,262):** latar video IG berganti hijau polos dan kata raksasa hitam "PROFESIONAL" muncul di belakang badan Irfan pada 78,659 (potong masuk), keluar potong di 79,28. Satu cue `kata-hero` (`Cut.mp3`, file R4 yang sama) dengan puncak di frame 2358 (78,659). Hapus cue lain yang terikat ke kata "profesional" kecil (T086) bila masih ada.

## FILE BOLEH
`audio/r6_audio.py`, `audio/r6/**`.
## FILE JANGAN
Semua file lain (stem R4, cues R4, edit/, lego/, remotion/, qc/ kecuali membaca `qc/r6/visual_r6.mp4`).

## LARANGAN
Sama dengan TASK-R6-audio (E23/E24, palet terlarang, satu peran satu file, suara ×1,0, musik R4 tetap).

## LULUS BILA
1. Di luar 57,6–59,3 dan 78,5–79,4: stem_sfx_r6 identik sampel dengan ronde 1 (kecuali ekor cue yang sah melewati batas, sebutkan).
2. `sfx_density` dan `voice_level` PASS; puncak ≤ −1 dBFS; loudness ±1 LU dari R4.
3. `audio/r6/cek_cue_r2.jpg`: still frame puncak 57,919 / 58,325 / puncak gelombang / 78,659 dengan label.
4. `cek_r6.mp4` dimux ulang dari visual baru.

## LAPORAN
Tambahkan bagian "Ronde 2" di `handoff/REPORT-R6-audio.md` (cue diubah, hasil gerbang ≤ 3 baris tiap gerbang).
