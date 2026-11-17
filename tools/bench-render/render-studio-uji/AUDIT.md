# Audit render · cara Threads "Render Studio" vs cara kita (17 Nov 2026)

Pemicu: tutorial Threads (fizzy.zz, "Claude Motion") — satu folder `Render Studio` dipakai untuk semua video, `npm i three @remotion/three gsap`, `Config.setChromiumOpenGlRenderer('angle')` di `remotion.config.ts`, render lewat `RENDER.bat`. Studi kasus: shot 3D B10a (maskot voxel Claude) di `projects/skill-development-journey-20261116`, yang dirender dengan cara kita yang biasa (Blender). Mesin: node-c-pc, 8 thread, RAM 29 GB, AMD RX 6600 (Navi 23) + iGPU Vega, Ubuntu 24.04.

## 1. Temuan utama: GPU tidak terjangkau sama sekali

- `/dev/dri/renderD128` (RX 6600) milik `root:render` 660, `card*` milik `root:video` 660, dan akun `irfan` tidak termasuk grup `render` maupun `video` (`id`: adm, cdrom, sudo, dip, plugdev, lxd, docker).
- Bukti dari Chrome sendiri: komposisi `InfoGL` mencetak `UNMASKED_RENDERER_WEBGL`. Kelima opsi `--gl` (default, angle, angle-egl, vulkan, swangle) menghasilkan **"ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)"**, yang berarti WebGL dirender oleh CPU (`hasil/renderer-tanpa-gpu.png`).
- Akibat yang sama di Blender: README B10a mencatat "HIP hanya mengekspos CPU" dan Eevee keluar 143. Akhirnya B10a dirender Cycles **CPU**.
- Perbaikan (perlu sudo, dijalankan Irfan): `sudo usermod -aG render,video irfan`. Untuk Cycles HIP masih dibutuhkan runtime ROCm (`libamdhip64`), yang belum terpasang. Sebaliknya, Eevee dan WebGL cukup memakai Mesa radeonsi yang sudah ada.

## 2. Angka (tanpa GPU, semua SwiftShader)

| Jalur | Isi | Frame | Waktu | per frame |
|---|---|---|---|---|
| **Cara kita: Blender Cycles CPU** (B10a, 10 sampel + OIDN, 8 thread) | fotoreal: DOF rack focus, clay SSS, monitor berisi footage asli | 77 | **4.623 dtk (77,1 mnt)** | **60,0 dtk** |
| Cara baru: Remotion + three.js (`Kepiting3D`), konkurensi 4 | voxel 19×10 + lengan/kaki/mata, bayangan 2048, PBR, fog, animasi GSAP | 77 | 73–146 dtk | 0,95–1,89 dtk |
| Adegan CSS kita (`Berat`, beban Hybrid Motion biasa) | blur, glow, grain feTurbulence | 90 | 36–52 dtk (swangle 416 dtk) | 0,41–0,58 dtk |

Rincian per opsi `--gl`: `hasil/tanpa-gpu.tsv`. Selisih antaropsi (selain swangle) mengikuti load CPU saat itu (10–17, karena PC dipakai bersama), bukan GPU, sebab renderer-nya sama. Gambar antaropsi identik (PSNR ∞). Satu-satunya pengecualian adalah `swangle` pada CSS: 43 dB dan 8× lebih lambat, jadi jangan dipakai.

Batas perbandingan: three.js di sini adalah rasterisasi real-time, sedangkan Cycles adalah path tracing. Adegan uji jauh lebih sederhana daripada B10a final (tanpa DOF, tanpa tekstur footage, tanpa bevel), sehingga angka 30–60× lebih cepat hanya mengukur **jenis renderer**, bukan mutu yang setara. Belum diuji: three.js dengan GPU, Eevee dengan GPU, dan adegan three.js yang menyamai B10a.

## 3. Klaim Threads, satu per satu

| Klaim | Di PC ini | Sistem kita | Putusan |
|---|---|---|---|
| `setChromiumOpenGlRenderer('angle')` = render pakai GPU | Tidak berpengaruh: tetap SwiftShader (§1). Di Windows `angle` = Direct3D sehingga GPU terpakai; tutorialnya memang dari Windows (`D:\`, `.bat`). | `render.sh` membaca opsi `--gl` dari profil mesin hasil `tools/bench-render/bench.sh` (memilih otomatis + cek PSNR). Profil `~/work/render-profile.json` **belum pernah dibuat** di PC ini, jadi semua render memakai default. | Jangan dikunci di config. Perbaiki grup, lalu jalankan `bench.sh` sekali. |
| Satu folder "Render Studio" untuk semua video | — | Satu folder `remotion/` per proyek: node_modules 463 MB (journey) dan 898 MB (trojan-v4). Disk root tinggal ±2 GB dan sempat 95 MB hari ini. | Hemat disk itu nyata, tapi satu folder bersama merusak pin versi per proyek, lego, dan QC. Usul: tetap per proyek dengan node_modules berbagi (npm workspaces/pnpm store). Belum diuji. |
| `three` + `@remotion/three` | Jalan; render deterministik (still 46 sama persis antaropsi). | Belum ada tier 3D real-time. Saat ini pilihannya CSS 2,5D atau Blender. | Layak jadi tier tengah: previs atau 3D sederhana (logo, maskot low-poly, kamera orbit) dalam hitungan detik. Shot fotoreal seperti B10a tetap Blender. |
| `gsap` | Jalan bila timeline `paused: true` + `tl.seek(frame/fps)`. | Skill resmi GSAP sekarang terpasang (`external/gsap-skills`). Skill `gsap-react` mengajarkan `useGSAP` real-time, yang akan berkedip saat render Remotion. | Pakai dengan pola seek (sudah dicatat di `external/README.md`). |
| `RENDER.bat` | — | `render.sh` sudah lebih lengkap: kunci render global, ledger `qc/jobs.jsonl`, mode skala 0,5, dan profil gl. | Tidak ada yang perlu diambil. |
| Skill Instagram (ide, tren, hook, caption) | — | 13 skill `ig-*` sudah terpasang di kedua akun (ig-plan, ig-viral, ig-reel, ig-caption, …). | Sudah ada. |

## 4. Langkah berikut (urut)

1. Irfan: `sudo usermod -aG render,video irfan` (sekali).
2. Ulang matriks dengan GPU tanpa relogin: `sg render -c "TMPDIR=/dev/shm/tmp-uji ./bench3d.sh dengan-gpu"`. Lalu cek `InfoGL`: renderer harus menyebut AMD/radeonsi, bukan SwiftShader.
3. `tools/bench-render/bench.sh` sekali untuk membuat profil mesin, sehingga semua `render.sh` otomatis memakai `--gl` tercepat.
4. Uji Eevee GPU untuk B10a: still frame 46 dibandingkan Cycles CPU (waktu + sanding visual). Ini kemungkinan penghematan terbesar untuk shot 3D (60 dtk/frame sekarang).

## Cara mengulang

Proyek uji ada di RAM (`/dev/shm/render-studio-uji`, karena `/mnt/storage-projects` bersifat noexec dan disk root penuh). Sumbernya disimpan di folder ini: salin ke `/dev/shm/…`, lalu jalankan `npm install` (cache di `/dev/shm`), `npx remotion bundle src/index.ts --out-dir bundle`, `./bench3d.sh <label>`. Render memakai `flock /tmp/remotion-heavy-render.lock`, jadi tidak bentrok dengan render sesi lain.
