# REPORT-b10a-blender
Blender 5.2.4 LTS (10 Nov 2026), portable: `/mnt/storage-projects/skill-dev-journey/blender/blender-5.2.4-linux-x64/`; sumber: https://www.blender.org/releases/5-2/.
Still: Cycles CPU, 48 samples + denoise, 8 thread; awal **129,28 dtk**, onset **132,68 dtk**, akhir **120,45 dtk**.
HIP tidak tersedia (library HIP tidak ditemukan); .blend disetel EEVEE 5.2 untuk animasi, hasil EEVEE belum diverifikasi; still memakai izin Cycles CPU.
Timing sumber terbaru: **74,2115–76,7765 dtk**, **2,565 dtk / 77 frame**, 30000/1001 fps; onset 75,7115 = frame 46 (+1,5 ms); mengikuti pembaruan hulu +0,6006 dtk.
Skrip: `lego/blender/{prepare.py,scene.py,finish.py,check_scene.py,run_stills.sh}`; petunjuk: `lego/blender/README.md`.
Blend: `/mnt/storage-projects/skill-dev-journey/b10a/b10a.blend`; tekstur video: `/mnt/storage-projects/skill-dev-journey/b10a/editor-timeline.mp4`.
Native 1920×1080: `/mnt/storage-projects/skill-dev-journey/b10a/b10a-{awal,onset,akhir}-finished.png` (glare, grain, vignette).
Review 960×540: `qc/still/revisi1/b10a-awal.jpg`, `b10a-onset.jpg`, `b10a-akhir.jpg`; sanding: `qc/still/revisi1/b10a-sanding.jpg` (kita kiri, acuan kanan).
Cek lulus: dimensi, hash words/audio terbaru, 105 keyframe Bézier, DOF f/2,4; bukti di `b10a/{scene-check,final-check,render-times}.json` pada storage. Gerak penuh belum diuji; token sesi tidak tersedia.
Doctor lulus; mount storage noexec → runtime RAM + EGL lokal, compositor CPU; tidak render penuh, commit/push, atau mengubah file integrasi/proyek lain.
Branch claude/ belum merge (dicatat saja): builder-trap-r2-v5; codex/builder-trap-r2-v6-audit; cursor/skill-load-order-3827; siirfannih/storyboard-jadisatu-motion-trojan-v4; siirfannih/storyboard-video-marketing.

## Ronde 2 · SIAP G2 SUTRADARA (belum persetujuan visual)
T1: Claude utuh di 77 frame, tinggi 51,9–58,4%, margin ≥8,4%; push 3 cm, f/2; rack focus frame 31–67 (onset 46), kembali ke Claude sebelum anggukan; monitor utuh, bokeh awal/akhir, blok “kayak gimana?” terbaca di onset (OCR crop cocok).
T2: badan voxel 19×10 (rasio 1,90), dua lengan pendek, empat kaki, dua mata gelap; yaw awal/akhir 28°, menoleh ke monitor saat onset lalu kembali/mengangguk; semua kurva Bézier.
T3: terakota #B4532F–#C9653F, roughness 0,6, subsurface 0,055, rim hangat belakang-atas, exposure −0,15; suasana meja, timeline/wajah Irfan, grain dipertahankan.
Blender 5.2.4 LTS / Cycles CPU 48 samples: awal 209,75 dtk; onset 185,68 dtk; akhir 241,64 dtk. Tiga PNG 1920×1080 di storage b10a/ dan empat JPEG review/sanding qc/still/revisi1/b10a-*.jpg diperbarui; b10a.blend + skrip lego/blender/ diperbarui.
Bukti: storage b10a/{scene-check,final-check,round2-onset-ocr,render-times}.json; geometri 77 frame, dimensi, hash sumber lulus. Gerak penuh/Eevee belum diuji; tanpa render penuh, commit/push; ronde 1 disimpan di b10a/round1/.

## Render penuh
`/mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov`: ProRes 422 HQ + PNG `finished/`, 1920×1080, 30000/1001, 77 frame lengkap/unik; seluruh PNG dan decode film lulus, tanpa frame hitam/gagal.
Kamera 9% lebih dekat; margin Claude ≥5,075%, rack focus tetap. Cycles CPU 10 samples + OpenImageDenoise Accurate; 3 uji rata-rata 51,60 dtk, noise/detail dibandingkan ronde 2 + crop native: tidak kentara.
Render 77 frame: 4.623,384 dtk (77:03), rata-rata 60,04; maksimum 92,37; 18 frame >70 dtk saat CPU berbagi render lain. Job 74 frame tersisa + finishing/encode/verifikasi awal: 4.596 dtk.
Glare, grain, vignette diterapkan; durasi 2,569233 dtk (77 frame; +4,233 ms pembulatan jendela kata). Kontak sheet 12 frame/960 px: `qc/still/revisi1/b10a-render-sheet.jpg`; bukti `b10a/{full-check,full-render-times}.json`.
Upstream words/audio/footage berubah saat render: freshness guard FAIL, monitor tetap footage G2. Jendela terbaru 74,1448–76,7098 dtk, onset 75,6448/frame 46: durasi dan onset lokal tetap cocok; `b10a/placement-current.json`. Tanpa integrasi/commit/push.

## Finishing Opus
Grade ulang dari `raw/` (Cycles tidak dirender ulang) di `lego/blender/finish.py` (`--sequence`, `--sheet`, `GRADE`): WB lebih netral (.95/1/1.08) supaya meja tidak terlalu oranye, saturasi bayangan 0,80, Claude tetap merah-hangat (1,06).
Kontras S +0,24, hitam diangkat sedikit dan agak dingin (p1 0→0,007) supaya tidak pecah; shoulder lembut di 0,72 sehingga monitor tidak kena clip (piksel clip 0,6%→0%); split-tone teal/hangat tipis agar dekat dengan footage kamar yang dingin.
Bloom lebar halus (ambang 0,35, ¼ res), unsharp luma 0,45 untuk tepi Claude, vignette 0,16, grain luma 0,008 per frame.
`out/b10a.mov` ditulis ulang: ProRes 422 HQ, 1920×1080, 77 frame, 2,569233 dtk. Versi lama: `out/b10a-v1.mov` + `finished-v1/`.
Sebelum/sesudah (f01/36/49/77, 960 px): `qc/still/revisi1/b10a-render-sheet-opus.jpg`. Tanpa commit; lego.json, remotion, edit, dan audio tidak disentuh.
