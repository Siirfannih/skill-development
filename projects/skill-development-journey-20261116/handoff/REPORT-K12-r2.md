TASK-K12-r3 · Codex · 16 Nov 2026 · nama REPORT r2 mengikuti TASK.
- Diubah: `remotion/src/komponen/MaskotAI.tsx`, `maskot/{geometry,material,motion}.ts`; uji memakai `UjiMaskot.tsx` dan entry mandiri `K12-entry.tsx` yang sudah ada.
- T0/T2: Claude 1 blok badan + lengan/kaki terpisah, bevel 5%, doff; coral #F15B45 dari median acuan. ChatGPT bunga biru inflated + >_ putih timbul; Gemini bintang empat sudut biru→ungu, seluruhnya geometri.
- T1: perspektif FOV 35°, yaw dasar Claude/ChatGPT/Gemini 24°/27°/29°, idle ±6°, pitch kecil; kamera dinaikkan 4 unit untuk memperlihatkan atas Claude.
- Posisi pusat (422,594)/(1320,302)/(1536,713), kedalaman .06/.78/.38; tinggi proyeksi f090 = 175,7/126,7/137,1 px (Claude/ChatGPT/Gemini).
- T3: key kiri-depan, rim kanan hangat; bayangan siluet kanan-bawah opacity .20–.25, blur 26–38 px; cavity tipis Claude + shading permukaan inflated, blur kedalaman .59/.54/.30 px.
- T4: bob, drift x ±6 px, yaw masuk 70°→idle memakai land, menoleh lewat menolehFrame absolut; squash/stretch bunga saat masuk, sapuan cahaya setiap 2,6 dtk, bintang roll pelan + kilau.
- PASS `tsc --noEmit -p remotion/tsconfig.json`; grep raster seluruh src/komponen = 0 baris; satu raster uji = footage public/uji. Log: `qc/maskot/r3-tsc.log`, `r3-raster-all.log`.
- Still: `qc/maskot/r2-f020.jpg`, `r2-f090.jpg` (3 maskot), `r2-f170.jpg`; seluruhnya 960×540. Sanding: `r2-sanding.jpg`.
- Idle 6 frame f060/072/084/096/108/120: `qc/maskot/r2-idle-6frame.jpg`; crop native tanpa resize: `r2-crop100-{claude,chatgpt,gemini}.jpg`; sumber `r2-native-f090.jpg`.
- PASS pemeriksaan siluet 210 frame: wajah x35–62%/y10–60% bebas, jarak horizontal minimum 68 px; scrub mundur dan fps 24/30/60 lulus (`r3-check.json`; amplop rotasi kaki berupa pendekatan).
- Render GL angle: 0 error browser; f090 diulang identik byte. Bukti/hash/sumber: `r3-render-results.json`, `r3-artifacts.json`, `r3-source-sha256.json`.
- Batas: latar uji still, belum tracking footage bergerak; bayangan dinding berupa drop-shadow, bukan mesh kamar. Keputusan rasa/G2 diserahkan ke Sutradara.
- Root.tsx/index.ts utuh (hash awal/akhir cocok); tanpa video, paket baru, commit/push, atau penulisan di luar FILE BOLEH.
- API diperiksa: [ThreeCanvas](https://www.remotion.dev/docs/three-canvas), [BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html).

## Ronde 4
- T1/T2: ChatGPT #3E6BFF→#8FB2FF + highlight putih lebar prosedural, emissive .22, >_ ditebalkan; Gemini #4285F4→#9B72CB + ujung pink, tebal membulat, emissive .18 dan sweep; bentuk/material Claude tetap.
- Ukuran f090 Claude/ChatGPT/Gemini = 193/250/229 px; pusat tetap (422,594), kanan kepala (1325,281), kanan bawah (1536,691). Default pembesaran visual: persen brief tidak cocok dengan ukuran r3 pada frame 1920×1080; pertanyaan klarifikasi belum dijawab.
- T3: bayangan siluet geometri ke dinding, offset ChatGPT/Gemini (44,42) px opacity .28, Claude (60,36) px opacity .30; Gaussian sigma 21–26 px + contact AO (5,7) px, sigma 4, opacity .10; `maskot/shadow.tsx` baru.
- QA teknis lolos: `r4-tsc.log`, 0 error browser (`r4-render-results.json`), cek 210 frame + scrub/fps dan hash Root/index lulus (`r4-check.json`); jarak minimum maskot ke zona wajah 18,8 px. G2 tetap penilaian Sutradara.
- Bukti: `qc/maskot/r4-f090.jpg`, `r4-sanding.jpg` (dua panel setinggi 540 px; sumber Gemini 2024 di `r4-artifacts.json`), `r4-crop100-chatgpt.jpg` dari native 1920×1080. Tanpa video, commit/push, atau edit di luar FILE BOLEH.

## Ronde 5
- Gemini: empat busur path SVG asli diextrude, tebal 11,96%, bevel kecil; gradien radial asli dihitung per fragmen. Tinggi f090 229,13 px; posisi/pose tetap.
- PASS tsc (`qc/maskot/r5-tsc.log`), 0 error browser, kontur SVG berselisih ≤1 px @1024; ROI Claude/ChatGPT identik piksel r4 (`r5-artifacts.json`).
- Bukti: `qc/maskot/r5-f090.jpg`, `r5-sanding.jpg` (Gemini kita vs ikon asli sama tinggi 229 px); G2 oleh Sutradara. Tanpa video, commit/push, atau edit di luar FILE BOLEH.
