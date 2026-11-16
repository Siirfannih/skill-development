# Delivery · Builder Trap R2 v5 r3 · 16 Nov 2026

File final: `builder-trap-r2_v5-remotion-r3.mp4` · Remotion · 1920×1080 · 30 fps · 2739 frame / 91,300 detik · H.264 + AAC 48 kHz stereo · −15,0 LUFS · LRA 3,1 LU · true peak −1,2 dBFS · SHA-256 `143861a91b7902747730415bf2e804c3e82d94f3a0bf2abdce47b3fd8b288c06`.

## Audio prioritas

- Take asli disusun ulang dengan sembilan cut pada jeda antarkata. Peta sumber berisi 228 kata dan tiga filler `tuh`; tidak ada filler yang dibuang. Caption tetap 225 kata karena filler disembunyikan secara visual.
- Join final: f283, f715, f1144, f1352, f1731, f1872, f2192, f2249, f2560. Fade post-filter 20 ms dipakai pada join yang sudah bersih; sisi kiri f2560 memakai 5 ms agar fade dimulai sesudah ekor fonem `buat.` selesai.
- Klik mulut 23,875–23,882 detik diperbaiki dengan interpolasi room-tone lokal sebelum onset `Karena`. Peak klik di mix final turun dari −2,2 menjadi −24,4 dBFS.
- Sinkron final terhadap jumlah stem adalah +48 sampel / 1,0 ms pada 5, 30, 57, dan 85 detik, jauh di dalam batas ±1 frame. Stream video dan audio sama-sama 91,300 detik; audio `duration_ts=4382400`.

## Visual

- B17 dan B25 memakai perspective selektif, elevation shadow, serta pemisahan z-plane; B17 safe-right dan B26 safe-right terhadap wajah.
- Kursor dekoratif B05 dihapus. Kata `mempublikasikan` B17 dipindah agar tidak menimpa modal. Caption B19 diredupkan agar form menjadi fokus.
- Seluruh 2739 frame draft sumber yang sama dibagi menjadi 10 potongan dan 92 lembar satu-detik. Seluruh potongan aktif berakhir `PUTUSAN: LULUS`; stream video r2 dan r3 identik bit-for-bit.

## Audit independen

- Ronde 1 FAIL: ekor `kecanduan.`, transien f714, dan delay AAC 2096 sampel.
- Ronde 2 FAIL: tiga MAJOR ronde 1 beres, tetapi fade f2560 menyentuh ekor `buat.`.
- Ronde 3: `PASS_WITH_NOTES` — tidak ada BLOCKER/MAJOR. Laporan: `/Users/igedeirfankusumaputra/AI-OPS/audit-bridge/outbox/REQ-20261116-0905-builder-trap-r2-v5-r3.audit.md`.
- Catatan MINOR tersisa: lubang room-tone pendek di sisi kanan f2560 tertutup musik; precursor kecil sebelum de-click; sebagian cue SFX >1 frame/cut tanpa SFX; perspective tetap selektif. Auditor tidak dapat menjalankan ASR 228 kata di Mac, tetapi membuktikan jendela r3 hanya berubah pada de-click dan fade f2560 serta tidak memotong fonem.

## RAEA vs Remotion

- Canary RAEA `0.1.0-canary.2` gagal pada bug SDK `raea is not defined`.
- RAEA v0.1.4 portable lolos checksum dan memperbaiki bug canary, tetapi Bevy tidak menemukan adapter Vulkan/GL pada executor Linux headless sehingga tidak menghasilkan frame pertama.
- Karena tidak ada frame RAEA, parity SSIM/audio tidak diklaim. Remotion menjadi renderer delivery tervalidasi. Rinci: `handoff/RAEA-v5.md`.
