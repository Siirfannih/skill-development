# SHOTLIST v5 — produksi (animasi penuh)

Sumber: STORYBOARD v4 + analisa 12 (gaya, logika dua dunia, devil's advocate) + referensi komposisi/kamera Irfan (`analisa/img/comp_ref_1..4.jpg`, 28 Okt 02:13).
Master 1920×1080 · 24 fps · gerak tokoh 12 fps (on twos) · lagu 26,17→100,8 dtk · ketukan 0,39 dtk.

## Aturan komposisi dan kamera (dari referensi Irfan)
- **Ukuran shot bergerak dengan emosi**: establishing/long untuk sendiri dan kecil di ruang (kesepian), medium untuk rutinitas, close-up/ECU untuk titik balik (gelas, mata, tangan).
- **Satu aturan komposisi per shot**, tidak diulang lebih dari 2× berturut-turut: thirds, radiating (one-point, garis menuju tokoh = terjebak), horizontal (tokoh kecil di garis horizon = sendiri), golden spiral (mata menuju satu titik), pyramid/segitiga (hubungan tiga pihak), diagonal (ketidakseimbangan/jatuh).
- **Coverage meja dua orang**: aturan 180° (garis antara dua kursi tidak dilanggar), urutan B (two-shot lebar) → A/C over-the-shoulder → POV close-up. Profil untuk momen saling lirik.
- Kamera menggerakkan fokus: close-up mengikuti objek aktif, lalu putus ke wide di momen penekanan.

## Dunia
- **N (kenyataan)**: low-key gelap hangat, bidang bersudut, grain berat, bokeh lampu (ref 5, 7).
- **P (bayangan)**: pudar terang, bloom, kontras sangat rendah, debu cahaya, tepi memutih, chromatic aberration tipis (ref 8).
- **Siluet takut**: sosok gelap tanpa wajah (ref 6), hanya di P.
- **Masuk P** = tetes embun gelas → gelembung mimpi membesar. **Keluar P** = gelembung pecah saat disenggol.

## Shot

| # | Video (dtk) | Dunia | Ukuran | Komposisi | Isi & aksi (pose 12 fps) | Kamera | Aset |
|---|---|---|---|---|---|---|---|
| S01 | 0,00–0,80 | N | ECU (POV) | Thirds | Layar HP: story teman (wisuda, ID card kantor baru, tangan bercincin), tap per 2 ketukan | Diam, sedikit handheld | UI kode + `story_1..3` |
| S02 | 0,80–4,40 | N | Medium OTS | Thirds (gelas di titik kanan bawah) | Dari belakang bahunya di meja pojok: HP, gelas es kopi, planner tertutup. 3,4: jempol berhenti | Push-in pelan (depth parallax) | `N_corner_ots` |
| S03 | 4,40–5,85 | N→P | ECU | Golden spiral ke tetes embun | Tetes embun di dinding gelas membesar jadi **gelembung mimpi**, di dalamnya cahaya pagi; bloom putih | Push-through ke gelembung | `N_cup_ecu` + gelembung kode |
| S04 | 5,85–11,68 | P | Long | Horizontal (dia kecil di kanan, jendela kiri) | Kamar kos pagi: (1) membuka tirai, (2) merapikan selimut membungkuk, (3) berdiri, senyum tipis | Drift lateral pelan | `P_kos_clean` + `ch_kos_1..3` |
| S05 | 11,68–20,64 | P | Medium | Radiating (garis ruang menuju dia, framing identik) | Rutinitas: kantor → kelas → kursi bus → meja kamar malam, ganti tiap 2 ketukan (±11 cut). Pose sama: bertopang dagu. 17,0: siluet mulai muncul di tepi | Terkunci | `P_office`,`P_class`,`P_bus`,`P_desk` + `ch_slump` + `sil_*` |
| S06 | 20,64–23,80 | P | Long top-down | Diagonal (tubuh di kasur miring) | Telentang, mata terbuka | Diam → pelan berputar | `P_bed_topdown` |
| S07 | 23,80–26,89 | P | Establishing | Horizontal | Langit-langit larut: kasurnya melayang di ruang pudar tanpa batas; siluet-siluet berdiri jauh di horizon, menatap | Crane mundur pelan | `P_void` + `ch_bed_float` + `sil_*` |
| S08 | 26,89–32,60 | P | Close-up | Thirds | Planner "Resolusi 2026", 5 baris tulisan tangan, tak satu pun dicoret; tulisan memudar. Tahan di "Kenalan sama orang baru" | Dolly turun + rack focus | `P_planner` + font tulisan tangan |
| S09 | 32,60–37,80 | P | Medium | Radiating (lembar menuju kamera) | Lembar kalender Jan→Des terlepas dan terbang melewati kamera, 2 ketukan/lembar | Three.js: kamera diam, lembar 3D | tekstur `paper` + font |
| S10 | 37,80–44,00 | P | Long | Horizontal → pyramid | Lintasan pudar: siluet teman (toga, lanyard, pasangan bergandeng) berlari melewatinya; dia diam memeluk planner | Truck kiri→kanan, putus ke wide saat ia tertinggal | `P_track` + `ch_stand` + `sil_run_*` |
| S11 | 44,00–48,69 | P | ECU (POV) | Thirds | HP: grup WhatsApp "Kumpul Sabtu, pada bisa?" → mengetik "aku…" → dihapus → HP ditelungkupkan, layar padam | Diam | UI kode + `P_hand_phone` |
| S12 | 48,69–53,75 | P | Medium dari belakang | Radiating (gang menuju titik hilang) | Di ambang pintu kos: tangan di gagang (ragu 1 ketukan) → melangkah. Dua siluet berdiri di ujung gang | Push pelan ke gang | `P_alley_door` + `ch_back_1..2` + `sil_*` |
| S13 | 53,75–57,20 | P | Medium | Thirds | Counter coffee shop pudar: tangan barista menyerahkan gelas es kopi | Drift | `P_counter` |
| S14 | 57,20–60,79 | P | Medium OTS | Thirds = **sama dengan S02** | Meja pojok versi bayangan (loop ke S02) | Push-in | `P_corner_ots` |
| S15 | 60,79–62,74 | P | Medium frontal | Pyramid (dia di puncak, siluet di dua sisi) | Kepala di tangan, siluet merapat mengelilingi meja | Push-in cepat | `P_table_front` + `sil_*` |
| S16 | 62,74–64,20 | P→N | ECU | Diagonal (gelas miring) | Siku perempuan menyenggol meja; gelas miring; **gelembung pecah**: kedip bergantian gelas P/N 2–7 f; mendarat di N | Terkunci di gelas | `P_cup_tip`, `N_cup_tip`, `P_bump` |
| S17 | 64,20–65,60 | N | Close-up top | Diagonal | Kopi tumpah ke halaman planner | Diam + shake kecil | `N_spill` |
| S18 | 65,60–67,01 | N | Two-shot (B) | Thirds kiri-kanan | Dia dan perempuan itu, minta maaf → tertawa, tisu | Diam | `N_two_laugh` |
| S19 | 67,01–68,80 | N | OTS (A) | Thirds | Dari bahu perempuan: dia memperlihatkan halaman basah, tertawa | Push mikro | `N_ots_her` |
| S20 | 68,80–70,50 | N | Top-down close | Horizontal | Dua planner berdampingan; baris sama "Kenalan sama orang baru" dicoret bersama (garis pena kode) | Diam | `N_two_planners` + font |
| S21 | 70,50–72,80 | N | Long | Pyramid | Bangku ramai: 3 orang ikut duduk **di posisi siluet S15**; sekejap siluet tampak lalu luruh jadi orang hangat (yang ditakutkan tidak terjadi) | Crane mundur | `N_bench_crowd` + `sil_*` |
| S22 | 72,80–74,60 | N | Top-down close | Thirds | Tangan perempuan menulis "Setiap Fore Punya Cerita" di bawah baris yang dicoret. Tahan sampai lagu habis | Drift | `N_two_planners` + font |

Real footage: tidak ada. AI video: tidak ada.
