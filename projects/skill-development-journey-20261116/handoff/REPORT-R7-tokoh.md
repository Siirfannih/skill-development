# REPORT · TASK-R7-tokoh · D-458 / D-459

Status: **siap ditinjau**. Tujuh override ber-alpha tersedia; `tsc` exit 0. Pengukuran raster menemukan tumpuan pada seluruh 603 frame tokoh yang terlihat; selisih batas piksel -1…2.854 px (ambang alpha, tepi antialias). Tidak ada kaki atau tumpuan hilang.

## Delta

- D-458: bubble putih, radius 22 px, ekor kurva, Poppins 600 hitam #080608, satu kata biru #2E5BFF; pop 0,6 → 1,035 → 1 selama 8 frame. Gemini memakai tiga titik bulat beranimasi.
- D-417 tetap: Claude “Aku yang ngedit loh.”, ChatGPT “Hi! Aku nemenin Claude.”, Gemini “…”.
- D-459: kaki Clawd/ChatGPT mengikuti kontur matte bahu per frame beserta kamera r7. Gemini bertumpu pada puncak kepala ChatGPT. Pada masuk DECISION, Clawd/ChatGPT/Gemini beralih ke mahkota D/O/N dengan squash; tanpa busur terbang. Keluar memakai sapuan slab yang sama.
- K_Clawd0 berada di bahu pada pembuka, dipotong pada masuk dunia repo. K_Clawd muncul langsung bertumpu di bahu pada frame 134.
- `KarakterPixel.tsx` tetap. `ancre` pada KarakterLayer hanya aktif pada props tugas ini; dy/rot reaksi dikompensasi di kaki, pose dan squash tetap berjalan.
- Ukuran Gemini 9u agar dua tokoh yang bertumpuk terbaca tanpa masuk area wajah. Posisi bubble mengikuti tumpuan tokoh, tetap di luar kepala pembicara.

## Rumus visual · D-466

| Pesan | Maksud | Alasan | Bentuk visual |
|---|---|---|---|
| Aku yang ngedit loh. | Claude pengedit utama, sedikit bete | Perannya berbeda dari pendamping | Pop chat kiri, “ngedit” biru, pose bored, kaki di bahu |
| Hi! Aku nemenin Claude. | ChatGPT pendamping yang senang | Perkenalan perlu punya watak sendiri | Pop chat kanan, “Claude.” biru, pose happy yang bertumpu |
| … | Gemini hadir tetapi diam | Diam tetap bisa terbaca sebagai interaksi | Bubble tiga titik berdenyut, duduk di kepala ChatGPT |
| sebuah DECISION | Ketiga tokoh terikat pada keputusan pengeditan | Teks menjadi benda tumpuan sehingga keluarnya masuk akal | Kontak ke mahkota D/O/N, squash di kaki, potongan keluar mengikuti huruf |

## Waktu persis untuk SFX

Frame global berbasis 30000/1001 fps; detik = frame × 1001/30000. Nomor frame dimulai dari 0.

| Event | Frame awal / kontak | Detik | Puncak |
|---|---:|---:|---|
| B_Codex · bubble pop | 258 | 8.608600 | f263 · 8.775433 s |
| B_Clawd · bubble pop | 284 | 9.476133 | f289 · 9.642967 s |
| B_Gemini · bubble pop | 295 | 9.843167 | f300 · 10.010000 s |
| K_Clawd · mendarat DECISION | 364 | 12.145467 | f365 · 12.178833 s (squash) |
| K_Codex · mendarat DECISION | 364 | 12.145467 | f365 · 12.178833 s (squash) |
| K_Gemini · mendarat DECISION | 364 | 12.145467 | f365 · 12.178833 s (squash) |

| Masuk tokoh dengan kaki sudah bertumpu | Frame | Detik |
|---|---:|---:|
| K_Clawd0 | 0 | 0.000000 |
| K_Clawd | 134 | 4.471133 |
| K_Codex | 249 | 8.308300 |
| K_Gemini | 286 | 9.542867 |

Sapuan keluar slab dimulai f406 = 13,546867 s. Clawd ikut potongan D pada f406. ChatGPT masih memiliki kaki kanan di O saat sapuan melewati kaki kirinya pada f409; ChatGPT dan Gemini habis pada f410 = 13,680333 s. Bubble keluar sebelum slab: frame terlihat terakhir f358 = 11,945267 s; ketiganya sudah hilang di f359. Onset f258/f284/f295 diperiksa langsung dari piksel putih di video rakitan ([bukti clock](../qc/r7/tokoh/bubble_clock.json)).

## Bukti

- Rakitan rentang: [rakitan_0-15.mp4](../qc/r7/tokoh/rakitan_0-15.mp4), 1920×1080, 450 frame / 15,015 s.
- Lembar 6 fps (90 gambar): [0–5](../qc/r7/tokoh/lembar_6fps_1.jpg), [5–10](../qc/r7/tokoh/lembar_6fps_2.jpg), [10–15](../qc/r7/tokoh/lembar_6fps_3.jpg).
- [Delapan still](../qc/r7/tokoh/still_sheet.jpg); seluruh frame [pendaratan](../qc/r7/tokoh/mendarat_per_frame.jpg) dan [keluar](../qc/r7/tokoh/keluar_per_frame.jpg) juga dilihat.
- [Kontak piksel seluruh frame](../qc/r7/tokoh/contact_pixels.json) + [skrip pemeriksa](../qc/r7/tokoh/verify_contact.py).
- [Bubble vs kepala](../qc/r7/tokoh/bubble_pixels.json): 243 frame bubble; 0 irisan dengan strip horizontal kepala, jarak minimum alpha opak 78.5 px. Strip meliputi seluruh lebar kepala, termasuk wajah/mulut.
- [Typecheck](../qc/r7/tokoh/typecheck.json), [metadata + hash tujuh movie](../qc/r7/tokoh/assets.json), [provenance kamera/slab](../qc/r7/tokoh/provenance.json).

Koordinat berikut adalah titik kaki pada still penuh hasil rakitan. Kontur ini juga diuji pada frame-frame di antaranya.

| Still | Frame | Clawd | ChatGPT | Gemini |
|---|---:|---|---|---|
| [0.5 s](../qc/r7/tokoh/still_00.5.png) | 15 | bahu kiri: (719.3, 732.0) | belum tampil | belum tampil |
| [4.8 s](../qc/r7/tokoh/still_04.8.png) | 144 | bahu kiri: (621.5, 777.0) | belum tampil | belum tampil |
| [8.9 s](../qc/r7/tokoh/still_08.9.png) | 267 | bahu kiri: (587.1, 788.0) | bahu kanan: (1212.0, 730.0) | belum tampil |
| [9.7 s](../qc/r7/tokoh/still_09.7.png) | 291 | bahu kiri: (625.9, 784.0) | bahu kanan: (1273.5, 747.0) | kepala ChatGPT: (1320.7, 599.0) |
| [10.5 s](../qc/r7/tokoh/still_10.5.png) | 315 | bahu kiri: (659.3, 775.0) | bahu kanan: (1316.0, 763.0) | kepala ChatGPT: (1365.6, 610.0) |
| [12.2 s](../qc/r7/tokoh/still_12.2.png) | 366 | DECISION:D: (651.0, 695.0) | DECISION:O: (1171.0, 648.0) | DECISION:N: (1325.0, 644.0) |
| [12.8 s](../qc/r7/tokoh/still_12.8.png) | 384 | DECISION:D: (651.0, 699.0) | DECISION:O: (1171.0, 639.0) | DECISION:N: (1325.0, 642.0) |
| [13.5 s](../qc/r7/tokoh/still_13.5.png) | 405 | DECISION:D: (651.0, 699.0) | DECISION:O: (1171.0, 656.0) | DECISION:N: (1325.0, 648.0) |

## Integrasi

- [Override](../lego/r7_override_tokoh.json): persis K_Clawd0, K_Clawd, K_Codex, K_Gemini, B_Codex, B_Clawd, B_Gemini; 7 ganti, 0 tambah, 0 buang.
- Cache: `lego/cache/r7_tokoh_<id>.mov`, ProRes 4444 / yuva444p12le (decode), fps 30000/1001; encoder memakai yuva444p10le dan PNG sesuai handoff.
- Reproduksi: `python3 lego/r7_tokoh.py prepare`, `render`, `compose`, `qc`; pemeriksaan: `python3 qc/r7/tokoh/verify_contact.py` dan `verify_bubble.py`.
- Compose memakai `build_cmd` dari helper resmi, dengan pembatas decoder 2 thread, filter 2 thread, encoder 3 thread untuk mesin bersama. Hanya lapisan mulai <15 s disertakan ke QC rentang ini.
- Rakitan bukti terbaru memakai seluruh override r7 yang tersedia saat perakitan, termasuk kamera r7 dan tujuh lapisan tokoh. Penggabungan bersama berhasil. [Log](../qc/r7/tokoh/gabung.log) dan [cakupan rakitan](../qc/r7/tokoh/assembly_scope.json).
- Pembacaan merek/awal sesi mengikuti handoff R7-BERSAMA yang sudah disiapkan Sutradara. Tidak ada commit/push proyek atau edit PETA dari pekerja ini.

Token: pemakaian sesi tidak disediakan alat CLI; tidak diestimasi. Tidak ada kebutuhan keputusan produk baru.
