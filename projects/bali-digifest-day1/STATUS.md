# STATUS · Recap Day 1–3 · v11

Snapshot **2026-11-16T15:17:57.297155+00:00**. **MP4 v11 utuh tersedia sebagai kandidat review; juri akhir GAGAL.** Kartu 55 tetap kiblat. Dokumentasi sebelum kelanjutan edit telah dipush pada [4cde479](https://github.com/Siirfannih/skill-development/commit/4cde4794bb3e652392f24de2f9e68a6354134689); snapshot 11:16 tersebut kini menjadi riwayat.

## Selesai dan lulus dalam cakupan terbatas

- Master **123,600 detik / 3708 frame / 1920×1080 / 30 fps**, audio 48 kHz stereo dengan 5932800 sample frames. Ukuran 115550611 byte; SHA256 `2ee2680ee0634189d7e14295c6401b748d9e1d3734e5c3b0fbec4a9ee3734929`. Decode, CFR, DTS dan identitas video saat mux terverifikasi.
- **16 bite dari 11 rekaman**, 251 kata display dan 250 kata raw ASR sesudah J. Tujuh kata memakai bukti timing frasa. Frasa C3 mengikuti konfirmasi “atau di daerah-daerah”. **Pilihan J** diterapkan dengan 3026 sample frames dikosongkan, tanpa menggeser clock; prefix/suffix lain identik.
- P1 memakai R5b margin: crop [352,432,1504,1080], skala uniform 5/3, 25 kata dan hero langsung di belakang kepala. Source/matte memakai crop sama. Bbox termasuk kontur aman 5%; U tertutup penuh disengaja. Hold geometrik ≥6 frame. Beberapa cue canonical P1 berbeda 3–5 frame dari native; tidak diklaim semua canonical ±2 frame.
- Non-P1: 107 blok, 121 layout per cut, 120 alpha, 226 kata. R6 memperbaiki 30 layout dan memeriksa seluruh **728 frame encode terdampak**. Koordinat akhir ada di locked EDL/objects; placement-map awal adalah proposal. Pemeriksaan ini tidak meluluskan kontras universal 4,5:1.
- Keyboard diganti 0661 VR/controller+Makepung. Wide 0619 dan instruktur→sketsa→clay dipertahankan. Tiga pasang A/B dan 120 frame cut aktual ditinjau; **0 grade** diterapkan. Pose A/B tidak selalu identik.
- Sound selesai: **10 cue / 184 keputusan senyap**, tema resmi dan NAT hanya pada shot sumbernya. Master dikurangi support mengembalikan J tepat, residual 0. PCM −15,8 LUFS / LRA 2,7 LU / TP −1,2 dBTP; AAC −15,8 / 2,7 / −1,3. VO per bite −15,8…−15,5 LUFS; musik T2 tambahan −4 dB.
- Alur AV final R6 ditinjau native dalam **3 bagian terurut yang mencakup 3708 frame**; ketiganya usable bersyarat. Packet union menjaga video proxy/AAC. Percobaan satu file gagal dan disimpan. Empat sanding v10/revisi memakai R4 sesudah J dengan simulasi HP; perubahan R6 diperiksa kemudian, tanpa mengganti label bukti lama.

## Asal audit frame dan hitungan render penuh

**Audit berasal dari MP4 visual penuh yang sudah di-encode, sebelum mux audio; bukan frame sebelum render.** Semua 3708 frame didecode dari `visual11_silent_3708f_r6.mp4`, SHA256 `cae3614ee4350493fa18176e14dec385291a984662c48b1e1418bfdc79b464cf`. Video packet payload `8b4edfb0af01775490b10c0cc9e13632b7b119ebfeef8bccae640d119496851f` identik dengan MP4 audiovisual lokal.

**25 potongan / 124 sheet / 3708 frame tanpa sampling** dibuat. Setelah perubahan R6, **16 potongan diperiksa ulang oleh kedua model**, sedangkan 9 memakai ulang input/hasil R4 yang hash-nya identik. Lima paket perbaikan format pada 4 potongan tetap dicoba sekali; itu bukan revisi gambar tambahan. Dibanding R4, 1357 JPEG aktual berubah dan 2351 identik.

| Hasil akhir | Gemini | DeepSeek |
|---|---:|---:|
|Receipt input sheet|124/124|124/124|
|Respons valid menurut protokol|118 sheet / 3528 frame|113 sheet / 3378 frame|
|Potongan lengkap menurut protokol|23/25|15/25|
|Potongan dengan putusan model GAGAL|14/25|19/25|

Receipt akses bukan bukti respons valid. Irisan tidak valid kedua model adalah **s095, f2850–2879, 30 frame**. Semuanya ditinjau langsung agen visual; 3 frame juga dibuka root. Status model tetap. Gabungan director untuk scope gambar: **14 potongan LULUS / 11 GAGAL**, dengan kelengkapan kedua respons sebagai syarat. Semua 47 catatan isi mentah memiliki adjudikasi; timeout/format tidak diubah menjadi PASS.

**Render raster penuh v11: 1 kali, khusus proxy QC 960×540. Raster ulang master utuh: 0.** Ada **8 ekspor MP4 panjang penuh**: 4 concat silent streamcopy, 3 mux AV streamcopy, 1 proxy QC raster. Encode AAC satu kali. Hardlink output, preview P1, chunk, alpha dan bagian QA dihitung terpisah dari ekspor penuh. Inventaris file/hash ada di E10.

## Belum lulus / tersisa

1. Enam sheet Gemini dan sebelas sheet DeepSeek belum valid/timeout/EMPTY. Hasil mentah disimpan; adjudikasi director tidak menggantikan respons independen.
2. **Belum uji speaker HP fisik.** Simulasi raw masih 5/10 cue audibility, 0 harsh SFX. Bass whoosh/logo tidak dipaksa naik hingga clipping; fungsi friendly belum terbukti andal pada HP. Sanding empat jendela memakai R4, bukan exact R6 pada perangkat fisik.
3. Raw `voice_level` FAIL karena attenuasi statis lokal R-014. `cut_check` terbaru pada J: global FAIL, K2 PASS. Tidak ada canonical ORDER PASS buatan; phrasing/jeda pitching tidak otomatis dihapus mengikuti screening ASR.
4. **Drive belum terunggah:** konektor HTTP413 (batas 100 MiB; file 115550611 byte), rclone terautentikasi HTTP403 kuota Google pada dua upaya terpisah. Belum ada file ID/link v11. Upload exact bytes dan verifikasi metadata/checksum setelah jalur tersedia.

## Path file di PC

| Isi | Path absolut |
|---|---|
|Repo aktif terbaru|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development`|
|MP4 kandidat lokal|`/home/irfan/Documents/Codex/2026-11-16/files-mentioned-by-the-user-revisi/outputs/BDF26_Recap_Day1-3_v11.mp4`|
|Proyek / EDL / objects|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11`|
|Baseline read-only|`/home/irfan/work/bdf26/v6/out/BDF26_Recap_Day1-3_v10f.mp4`|
|Sumber read-only|`/home/irfan/work/bdf26/v6/` dan `/home/irfan/work/bdf26/raw/`|
|VO / master PCM|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/audio/stem_vo.wav` / `/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/audio/master11.wav`|
|Map fisik|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/audio/timecode-map.json` dan `/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/audio/timecode-map.tsv`|
|MP4 sumber audit|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/qc/visual/visual11_silent_3708f_r6.mp4`|
|Audit / juri|`/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/qc/frame_audit_r6/` dan `/home/irfan/.codex/worktrees/bdf26-v11-revision/skill-development/projects/bali-digifest-day1/revision-v11/qc/final/FINAL-QC.json`|
|Laporan delivery|`/home/irfan/Documents/Codex/2026-11-16/files-mentioned-by-the-user-revisi/outputs/BDF26_v11_Laporan_Revisi.md`|

Repo dipull ke `80917a01f2fa3dcfd4e82f8d02be2121fdb7637e` sebelum penutupan. Skill/skrip dibaca langsung melalui worktree terbaru. Doctor menandai alias akun Codex yang mengarah checkout lain; lingkungan tidak diklaim PASS, dan alias itu tidak menjadi sumber kerja. Media/transkrip tetap lokal. Rincian: [JURI](qc/JURI.md), [DELIVERY](DELIVERY.md), [EVIDENCE](qc/v11/EVIDENCE.json).
