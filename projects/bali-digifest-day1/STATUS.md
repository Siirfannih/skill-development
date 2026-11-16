# STATUS · Recap Day 1–3 · v11

Snapshot **2026-11-16T11:16:07+00:00**. Dokumentasi utama diperbarui sebelum edit berikutnya, sesuai R-024. Video belum boleh disebut final/lulus. Dokumen lama Day1 tidak lagi menjadi otoritas aktif.

Komponen native A+P1+B sudah mencakup 3708 frame, tetapi belum digabung menjadi satu MP4 recap penuh; pengulangan preview P1 dihitung terpisah pada inventaris.

## Yang tersedia dan lulus terbatas

- Timeline 3708 frame/123,600 detik, 30fps; 16 bite/251 kata display, raw ASR 248 kata terpisah. 7 kata punya timing review/cue frasa; konfirmasi C3 disimpan.
- VO 48 kHz stereo PCM 24-bit, 5932800 sampel, −15,8 LUFS/LRA 2,9 LU/TP −1,3 dBTP. Fidelity ≤1 LSB dan rebuild identik; hanya gain statis. Gate default tetap FAIL; bukan sound lock/master final.
- Mapping 171 still; schema geometri 0 error. Ini tidak meluluskan taste/kontras.
- Non-P1: 107 blok/120 layout/226 kata, onset±2 frame dan ≥6 frame tinta referensi; 0 tabrakan dengan objek terlindungi yang dipetakan. 88 frame encode pada 11 cut komposisi: 0 failure. 20 still native dan 158 event non-P1 tersimpan.
- Aset native A[0,2965) dan B[3247,3708) selesai; P1 R5[2965,3247), 282 frame, juga selesai sebagai aset parsial. R5 mengikuti framing R-023, hero oranye dengan kontur 2px di belakang kepala. Bridge gelap dekat pilar **belum lulus**; oklusi sebagian kepala dan sedikit crop rambut dicatat.
- Infrastruktur review: 29 tes offline harness dan 5 tes hash audit lulus. Ini bukan hasil audit film. Claude QC tidak dipakai.

## Asal audit frame dan hitungan render v11

**Audit frame final v11 belum dibuat.** Saat snapshot: **0 potongan final dibuat, 0 dijuri, 0 diperiksa ulang**. Karena audit final belum ada, jangan menyebutnya berasal dari MP4 final maupun frame prarender.
Bukti yang tersedia memiliki cakupan berbeda: 120 alpha adalah frame sebelum komposit; 88 carry frame dan 20 still berasal dari **MP4 parsial yang sudah di-encode**. Pilot independen PhaseA 4,5 detik/135 frame juga berasal dari MP4 parsial dan sempat GAGAL; itu bukan audit seluruh 3708 frame.
Rencana audit produksi: decode **semua 3708 frame dari MP4 visual penuh yang terkunci** (sesudah integrasi gambar, sebelum mux master audio), lalu verifikasi video tak berubah pada MP4 delivery. Bukan frame Remotion prarender. Rencana ukuran potongan 5 detik menghasilkan 25 potongan; itu **rencana**, bukan 25 potongan yang sudah diperiksa. Verdict harus cocok dengan hash input aktual.

**Render penuh recap panjang v11: 0 kali; concat penuh: 0 kali.** Belum ada satu MP4 v11 penuh 123,6 detik, silent maupun beraudio. Jangan menghitung preview P1 sebagai render recap. Inventaris parsial: 17 chunk non-P1+2 aset non-P1 panjang; 5 versi preview P1 lengkap+2 aset P1 native (7 MP4 P1), serta uji hero 3 detik terpisah. Ini hitungan artefak selesai, bukan seluruh percobaan proses. Render Claude v10 tidak masuk hitungan v11.

## Sisa kerja setelah publikasi dokumen ini

1. Tinjau gerak P1 R5 dan perbaiki kontras bridge yang melewati pilar; finalkan source map/crop dan objek P1.
2. Integrasikan 123,6 detik; periksa semua frame/cut/sync, keseimbangan seluruh frame, dan kontras. Selesaikan penilaian kontinuitas WB/exposure/skin tone; saat ini 3 pasang A-B sudah ditinjau, 0 grade diterapkan.
3. Bekukan seluruh visual+objects, tempatkan SFX selektif; audit visual+SFX, kemudian musik tema/NAT/master. Sound sekarang hanya 3 trim preflight; 0 cue, belum ada stem/master.
4. Audisi seluruh master dan 4 jendela HP; klarifikasi nasal K2 yang laporan native-nya masih konflik. Raw gate FAIL tidak diberi PASS buatan.
5. Audit Gemini/DeepSeek seluruh 3708 frame, perbaiki temuan, dan periksa ulang input yang berubah. Ekspor, ukur LUFS/TP master, verifikasi frame/sampel, sertakan time map/known issues, unggah Drive, dan perbarui DELIVERY/JURI.

## Path PC yang digunakan

| Isi | Path absolut |
|---|---|
|Repo skill/worktree aktif|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development`|
|Proyek kerja v11 lokal|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11`|
|Sumber read-only|`/home/irfan/work/bdf26/v6/` dan `/home/irfan/work/bdf26/raw/`|
|Baseline|`/home/irfan/work/bdf26/v6/out/BDF26_Recap_Day1-3_v10f.mp4`|
|VO aktif|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/audio/stem_vo.wav`|
|Source/timecode map fisik|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/audio/timecode-map.json` dan `.tsv`|
|Non-P1 A|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/qc/visual/visual11_nonP1-A_silent.mp4`|
|Non-P1 B|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/qc/visual/visual11_nonP1-B_silent.mp4`|
|P1 R5 native|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/qc/typography-proof/r5_full_P1/P1_R5_NATIVE1080_VIDEO_ONLY_282f.mp4`|
|Bukti audit lokal|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/qc/` dan `/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/handoff/`|
|Delivery yang dituju|`/home/irfan/Documents/Codex/2026-11-16/files-mentioned-by-the-user-revisi/outputs/`|

Hash/count/scope tersedia di [EVIDENCE.json](qc/v11/EVIDENCE.json); file bukti media/transkrip di PC tidak ikut Git. Gerbang saat ini: [JURI GAGAL](qc/JURI.md). [DELIVERY](DELIVERY.md) membedakan artefak internal, preview yang pernah dikirim, dan ekspor final yang belum ada. Pembaruan Git mengikuti pull→peta→commit Agent:Codex→push main; hasil publikasi dibuktikan oleh ref Git, bukan klaim kelulusan video.
