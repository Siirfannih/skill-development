# DELIVERY · Recap Day 1–3 · v11

Snapshot 2026-11-16T11:16:07+00:00 **Belum ada file final v11 yang dikirim atau diunggah ke Drive.** Nama output yang dituju `BDF26_Recap_Day1-3_v11.mp4`; file itu belum dibuat. Jangan memakai link/nilai LUFS v10 sebagai bukti v11.

| Butir | Keadaan nyata |
|---|---|
|Durasi timeline v11|123,600 detik/3708 frame/30fps/1920×1080; belum merupakan durasi container final.|
|MP4 final v11|Belum ada; 0 render recap penuh dan 0 concat penuh.|
|Link Drive v11|Belum ada; belum diunggah.|
|LUFS/LRA/TP master v11|Belum diukur karena master belum ada.|
|VO v11 saja|−15,8 LUFS/LRA 2,9 LU/−1,3 dBTP; 48 kHz stereo PCM 24-bit; 5932800 sampel; SHA256: 779cd53d2bf68683b450fdafd752df8ef0b2a51fb92c9eb0d1931cccff60f2b0.|
|Audit frame seluruh v11|0 potongan final dibuat, 0 diperiksa, 0 diperiksa ulang. Rencana 25 potongan 5 detik belum merupakan hasil.|
|Asal audit v11|Audit final belum dibuat. Rencana: decode MP4 visual penuh yang terkunci. Bukti parsial saat ini berasal dari alpha dan MP4 parsial, bukan MP4 final delivery.|
|Putusan video|[GAGAL](qc/JURI.md), karena integrasi/audit final/sound/master dan kontras sebagian P1 belum selesai.|

Komponen native A+P1+B sudah mencakup 3708 frame, tetapi belum digabung menjadi satu MP4 recap penuh; pengulangan preview P1 dihitung terpisah pada inventaris.

## Yang sudah pernah disampaikan di chat

- Preview P1 R2 dan R4H adalah **preview parsial yang ditolak/digantikan**, bukan delivery v11. `outputs/BDF26_P1_r4_Preview_Lengkap.mp4` berdurasi 9,4 detik; seluruh narasi kanan/putih kemudian ditolak Irfan R-022.
- `outputs/BDF26_QC_Ucapan_Harapan.mp3` adalah cuplikan verifikasi kata C3, sudah dikonfirmasi Irfan. Bukan master audio.
- P1 R5 native/preview baru tersedia **internal**, belum menjadi final P1/recap dan belum diunggah. Native SHA256: 187fab34afca3531600d40acd4dfe4f348a1774232ffa1561654b1ea2e32a1d1.

Path PC lengkap ada di [STATUS](STATUS.md). Berkas internal: non-P1 A 2965 frame, non-P1 B 461 frame, P1 R5 282 frame. Scope/hash ada di [EVIDENCE](qc/v11/EVIDENCE.json). Timecode map fisik 39 segmen dan ringkasan 16 bite tersedia lokal; paket final/tautan Drive menyusul setelah QC.

## Yang sengaja dipertahankan

Kiblat kartu 55; identitas SF Pro/aksen oranye; animasi logo dan lagu tema resmi dari v10; source/baseline asli read-only; wide audiens 0619; insert batik 0744 di bawah “kalau jujur” sesuai arahan lama;  urutan instruktur→sketsa→clay; jeda pitching 5,1 detik; harapan peserta sebagai pendapat pribadi; callback pembuka ke peserta berbaju biru; wajah masing-masing rating; grup/mosaik dan penutup logo. WB/exposure asli dipilih pada 3 uji pasangan dan belum diganti filter; review seluruh film masih wajib. Oklusi kepala pada P1 disengaja menurut R-023; bukan izin mengabaikan kontras teks lain.

## Wajib diisi sesudah final benar-benar ada

Path+SHA256 MP4 yang dikirim, URL file Drive aktual, durasi probe/frame/format audio, LUFS/LRA/TP master (terpisah dari VO), sumber MP4/frame audit+hash, jumlah potongan baru/dipakai ulang/diperiksa ulang, jumlah render penuh, ringkasan time map/replacement dan known issues. Bukti before/after/HP dan audit Gemini/DeepSeek harus cocok dengan file yang dikirim.

Legacy: v10f 119,552 detik dilaporkan dahulu di Drive sebagai `Claude edit/BDF26_Recap_Day1-3_v10.mp4`; URL file langsung tidak tersedia pada log proyek ini. Angka −14,2 LUFS v10 adalah pembanding historis, bukan master v11. [Folder bahan dari Irfan](https://drive.google.com/drive/folders/1nNYo9kmF_Mdd-7YQl3uXRK-H9ZXiEvR9) bukan link delivery v11.
