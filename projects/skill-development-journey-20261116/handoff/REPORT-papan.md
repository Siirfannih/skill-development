# TASK-papan · Codex · Henti 1
- Tujuh still 960×540: `handoff/henti1/papan-B*.jpg`; sanding lebar 960: `handoff/henti1/sanding.jpg` (kita kiri, kiblat kanan; tinggi gambar disamakan, rasio asli dipertahankan).
- B1b → 83-k1: cincin lewat matte; Claude crab, bunga Codex `>_`, Gemini dibangun sebagai mesh extrude 3D.
- B2 → 83-k3: slab coral di belakang kepala + timeline patah pada kartu perspektif.
- B3-A → 83-k2: tangga tag di kiri kepala, template bevel kuning dicoret coral.
- B3-C → 07-k5: biru penuh, bentuk raksasa, tabel §8a asli, lima ubin fase besar.
- B4 → 83-k4: BALIK MODAL di belakang kepala; kartu 20× dan 5× miring, berbevel, tanpa stroke.
- B5 → 07-k6 (+ `sanding-B5-tokoh.jpg` vs 37-k7): dua jendela besar, bentuk 07, Claude pixel + bunga Codex, amplop, loop dan centang.
- B6 → 83-k3: slab putih 100% FULL AI di belakang kepala + tag pertanyaan kiri/kanan.
- Matte: RVM MobileNetV3 FP32 TorchScript rilis resmi PeterL1n v1.0.0, CPU mg-venv, downsample .25, 5 iterasi/still; 6 PNG RGBA + alpha, tanpa fallback. Bukti/hash: `remotion/public/papan/*provenance.json`, `handoff/henti1/matte-edges.jpg`.
- Pemeriksaan mekanis: `npx tsc --noEmit` exit 0; 7 JPEG 960×540, sanding 960 px; ekstraksi keenam timestamp cocok piksel persis (MAE 0). Log/manifest di `handoff/henti1/`.
- Belum setara/teruji: pantulan/contact shadow tokoh B1b belum menyatu dengan kamar; slab belum memiliki material neon 83-k3; kedalaman set voxel 37 tidak direplikasi; gerak/sinkron belum diperiksa lewat video.
- B1 repo tidak dipilih agar tujuh panel mencakup B1b dan dua mode B3. Narasi dari ucapan; isi UI dari tabel skill/log K13 asli. Peta panel: `handoff/henti1/panel-map.json`.
- Entry: `remotion/src/uji/papan-entry.tsx`; bangun ulang still: `cd remotion && node src/papan/render-papan.mjs`, sanding: `python3 src/papan/sanding.py`. Tanpa video, commit/push, atau verdict mutu dari builder; menunggu Sutradara.

## Ronde 2
- T1 B5: chat putih fun, teks 44 px, empat bubble sesuai TASK, avatar dari file asli; f83 mengetik `•••`, f120 catatan sistem + loop + reaksi ✓; `handoff/henti1/papan-B5{,-typing}.jpg`.
- T2 B3-C: hanya judul `workflow` dipusatkan di atas; ukuran 169 px tetap; `handoff/henti1/papan-B3-C.jpg`.
- T3 B4-effort: footage sumber 109,0 dtk, kartu gelap di kiri wajah, Faster/Smarter + pegangan otak + jejak pixel ungu-pink + Max; `handoff/henti1/papan-B4-effort.jpg`.
- Bukti: `handoff/henti1/sanding-r2.jpg` tiga baris kita kiri/acuan kanan (Effort: detail Max baris 2 kolom 2); 4 still 960×540, sanding 960×966; tsc exit 0; cek di `checks-{images,source}-r2.json` dan `QA-r2.md`.
- B1b/B2/B3-A/B4/B6: hash JPEG sama; 14 definisi kode + kit tetap; tanpa video/commit/push. Render: `cd remotion && node src/papan/render-r2.mjs`; sanding/cek: `python3 src/papan/sanding-r2.py && node src/papan/verify-r2.mjs`. Putusan G2 menunggu Sutradara; token sesi tidak tersedia.

## Ronde 3
- T1 B5: avatar Codex SVG biru #3E6BFF→#8FB2FF, kilatan kiri atas dan `>_` putih tanpa badge; Claude tetap crab vektor; `papan-B5{,-typing}.jpg` diperbarui.
- T2 B1b: import MaskotAI final tanpa mengubah komponennya; posisi/ukuran/depth r5, f84 memakai fase umur 90 dan lihatKe kamera: yaw 22,55°, depan 92,2%; cincin/matte tetap. CATATAN untuk Sutradara: bunga pada posisi r5 menutup sebagian kata `decision`.
- Bukti: tsc exit 0; `checks-source-r3.json` (59 file terlindungi + 6 panel lain identik, raster runtime hanya footage/matte); `storyboard-final.jpg` 960×1176, 8 panel urut TASK, 2 kolom tanpa acuan. Ulang: `node src/papan/render-r3.mjs && node src/papan/verify-r3.mjs && python3 src/papan/storyboard-final.py` dari remotion; tanpa video/commit/push; G2 menunggu Sutradara; token sesi tidak tersedia.
