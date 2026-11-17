# REPORT-b10a-blender · SIAP DINILAI SUTRADARA (belum persetujuan visual)
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
