# DELIVERY · Recap Day 1–3 · v11

Snapshot **2026-11-16T15:17:57.297155+00:00**. **File lokal dikirim untuk review; juri akhir GAGAL dan unggahan Drive tertahan.**

| Butir | Hasil terverifikasi |
|---|---|
|MP4 lokal|`/home/irfan/Documents/Codex/2026-11-16/files-mentioned-by-the-user-revisi/outputs/BDF26_Recap_Day1-3_v11.mp4`|
|SHA256 / ukuran|`2ee2680ee0634189d7e14295c6401b748d9e1d3734e5c3b0fbec4a9ee3734929` / 115550611 byte|
|Durasi / format|123,600 detik; 3708 frame; 1920×1080; 30 fps; H.264; AAC 48 kHz stereo, target 320 kbit/s|
|Master PCM|−15,8 LUFS / LRA 2,7 LU / TP −1,2 dBTP; 5932800 sample frames|
|AAC dalam MP4|−15,8 LUFS / LRA 2,7 LU / TP −1,3 dBTP; bitstream identik dengan AAC yang diukur|
|Laporan / timecode|`/home/irfan/Documents/Codex/2026-11-16/files-mentioned-by-the-user-revisi/outputs/BDF26_v11_Laporan_Revisi.md`; 16 bite, 11 rentang gambar; map fisik 39 segmen tetap lokal|
|Link file Drive v11|**Belum ada.** Konektor HTTP413 di atas 100 MiB; rclone HTTP403 shared API quota. Belum ada upload berhasil atau remote file ID.|
|Folder tujuan, bukan link video|[Claude edit](https://drive.google.com/drive/folders/1Ij1AcDNrshgf469Tq-XDVoQuawW8IZXo); metadata diverifikasi, sharing tidak diubah|
|Asal audit frame|Semua 3708 frame dari encoded silent R6; video payload identik dengan AV delivery. **Bukan prarender.**|
|Potongan dibuat / ulang|25 potongan / 124 sheet; 16 potongan berubah diperiksa ulang, 9 reuse exact R4; 5 target format pada 4 potongan tetap|
|Respons valid|Gemini 3528 frame; DeepSeek 3378 frame. Receipt input masing-masing 3708 frame. Irisan s095, 30 frame, ditinjau langsung agen visual.|
|Juri gambar / global|14 LULUS / 11 GAGAL pada kelengkapan protokol; semua 47 catatan isi diadjudikasi. Global [GAGAL](qc/JURI.md).|
|Ekspor / render penuh|8 ekspor = 4 concat silent + 3 mux AV + 1 proxy QC raster. **1 render raster penuh (proxy), 0 raster ulang master utuh.** Preview/chunk/QA terpisah.|

Sengaja dipertahankan: wide 0619, jeda pitching 5,1 detik, batik 0744 di “kalau jujur”, instruktur→sketsa→clay, seluruh kalimat P1, kedua rating/deh, warna sumber (0 grade), tema/gerak logo resmi, serta mosaic sebagai callback yang boleh mengulang momen. Crop P1 dekat dan oklusi kepala termasuk U tertutup penuh mengikuti Irfan. Perubahan terang/WB satu frame 3255 berasal dari raw 0712; penyebab tidak ditebak dan tidak ditutup freeze. Fragmen masuk singkat mask reveal nyata, termasuk f1842, tidak dihitung sebagai hold kata utuh.

Batas bukti: belum speaker HP fisik; simulasi raw 5/10 cue; default VO/cut FAIL serta pengecualian R-014 tetap dicatat. Empat sanding v10/revisi memakai R4 sesudah J dengan simulasi HP. R6 ditindaklanjuti lewat 728 frame aktual terdampak dan 3 bagian AV native. Ini tidak menjadi sanding exact R6 pada HP fisik atau PASS native satu file.

Preview P1/audio audisi lama tetap historis; R2/R4H/R5 digantikan R5b margin dalam master R6. Konfirmasi C3 dan pilihan J berlaku. Baseline video 3585 frame/119,500 detik; container v10f 119,552 detik memiliki ekor AAC. Pertambahan menurut clock gambar 4,100 detik; setiap bite mengikuti map fisiknya.

Upload berikutnya memakai SHA/byte di atas, lalu verifikasi metadata/size/checksum remote. Folder atau link v10 tidak boleh dilaporkan sebagai file v11. [EVIDENCE](qc/v11/EVIDENCE.json) mengikat file, log upload, audit dan inventaris; media/sumber/transkrip tidak ikut Git.
