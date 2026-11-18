# Evaluation · revisi Irfan 17 Nov malam (audit dulu, baru perbaiki)

Basis audit: final c273a676 (Drive 17 Nov ±19:30). Cara: QC sampling (1 frame / 2 dtk, 42 still), frame persis di titik yang Irfan tunjuk, ukur audio (transien jentikan) dan matte (garis kepala/bahu), baca kode penyebab. Bukan audit per frame.
Dikerjakan langsung oleh Sutradara, tanpa subagen (Irfan 17 Nov).

## Temuan (penyebab di kode → perbaikan)

| # | Detik | Temuan | Penyebab | Perbaikan |
|---|---|---|---|---|
| E1 | 74,4–76,4 | Shot meja 3D: wajah Irfan masih mengecil jadi lingkaran di pojok, padahal wajahnya sudah ada di monitor timeline | lapisan `D_EDIT_WAJAH` (Lingkar) di atas slot Blender | buang lingkaran; Irfan "bicara" dari timeline di monitor; slot Blender diletakkan di bawah `D_IG` supaya tetap berganti bersih ke postingan IG |
| E2 | 72,5–74 | "pakai" tampil di bawah slab, "AI" di atas | `sisip="pakai"` di teks.py | hapus kata sisip (KT slab membuang "pakai" lewat `buang`) |
| E3 | semua | Teks pita bawah terlalu dekat tepi bawah ("Jadi", "juga.", "Dan menurut", "sebuah", "loop pembelajaran") | pusat y 985–1010 → tepi huruf ±1050 (zona tepi Lantai 16: margin 5 % = 1026) | pusat pita bawah naik ke 935–950 (tepi huruf ≤ ±990, di dalam margin 8 %); SELESAI naik 50 px supaya tidak bertumpuk |
| E4 | 2–4 | Clawd di samping SELESAI tidak ikut masuk lingkaran; tokoh melayang tanpa pijakan | Clawd di dunia repo = tokoh terpisah (b1.tsx); Clawd kamar melayang di (460,790) samping bahu | Clawd berdiri di bahu (ukur matte: bahu kiri ±(650,770), kanan ±(1400,820)); saat lingkaran mengecil Clawd ikut masuk dan melompat ke rambut (dirender di dalam Lingkar pada koordinat footage); Clawd dunia repo dibuang |
| E5 | 7–12 | Tidak ada penekanan kamera di "ChatGPT", "Claude", "Gemini"; "decision" tanpa patahan | B1b hanya drift 1,00→1,02 lalu push ke decision | zoom mikro bertingkat di tiap nama (+4 % per nama, kurva heavy 15 f, ditahan), CUT keras kembali ke 1,00 tepat di "decision" |
| E6 | 38–42 | "Jadi gak usah ditanya" terlalu ke kanan; zoom hanya masuk-keluar (denyut) sehingga tidak terasa | narasi B4a digeser ke kanan demi balance_check (ronde 8); penekanan = pulsa em_env masuk lalu keluar lagi | narasi B4a rata tengah; SEMUA pulsa penekanan diganti punch-in di kata kunci (C01, heavy 13–15 f) yang DITAHAN sampai akhir kalimat lalu kembali lewat potongan (kartu 83 §6: punch pada kata kunci, potong di batas frase) |
| E7 | 57,92 | Jentikan jari, tapi dunia agen baru masuk ±1,0 dtk kemudian (akhir "ini.") | jangkar push = akhir kata "ini." | jangkar push = transien jentikan yang diukur dari audio (frame 1736); narasi "kalian lihat ini." pindah ke pita bawah dunia agen; papan ChatGPT lahir lebih cepat supaya dunia tidak kosong |
| E8 | semua KT | Muncul/hilang tidak halus: FINALLY dan slab "muncul dari tengah" lalu hilang tiba-tiba; narasi berganti blok di frame yang sama tanpa animasi | (a) hero masuk geser 55 % di dalam kotak setinggi teks → separuh bawah huruf terpotong tepi kotak; (b) kata R1 muncul dengan opacity langsung 1; (c) keluar R1/R2/R3 = wipe 5 f; sejak ronde 7 blok lama ditahan lalu hilang di frame blok baru masuk | hero (FINALLY/slab) naik dari tepi bawah frame (kotak lapisan diperpanjang sampai bawah frame) lalu keluar turun lagi; kata R1 masuk opacity+blur+naik 6 f; semua KT keluar fade+blur+naik 7 f; pergantian blok R1 = silang (blok lama keluar bersamaan blok baru masuk), bukan putus |
| E9 | 1,9–2,4 | "akhirnya" tinta gelap di atas footage (dunia repo belum menutup) | warna tinta dipilih untuk dunia terang, tapi teks lahir sebelum lingkaran selesai menyusut | warna teks berpindah putih → tinta mengikuti lingkaran menyusut (`gelapAt`) |
| E10 | 58–59 (sampling) | Dunia agen kosong ±1 dtk sebelum papan ChatGPT lahir | papan lahir di ketik1 − 0,5 | papan ChatGPT lahir 0,3 dtk setelah dunia mendarat |

Dibiarkan: kartu "Claude Max" (nama paket asli, menunggu Irfan); Codex/Gemini tetap di posisi B1 (hanya Clawd yang diminta berpijak).

## Urutan perbaikan
1. teks.py / bangun.py / waktu.py: E2, E3, E5, E6, E7, E9 (posisi, kamera, jangkar).
2. KT.tsx: E8 (satu sistem masuk/keluar untuk semua gaya).
3. Lingkar.tsx + karakter: E1, E4.
4. b5.tsx: E10.
5. Render lapisan yang berubah → compose master → QC sampling (lembar 2 dtk + titik E1–E10) → kunci → audio sinkron → final → Drive.

## Tambahan Irfan selama perbaikan
- E11 Semua KT muncul/hilang halus (FINALLY "dari tengah", hilang tanpa animasi) → masuk ke E8.
- E12 Aturan pijakan Clawd juga untuk Codex & Gemini, atau hapus di versi awal → hook (FINALLY + dunia repo) hanya Clawd; Codex mendarat di bahu kanan pada "ChatGPT", Gemini di atas kepala Codex pada "Gemini"; ketiganya pergi di "decision". Kaki tokoh mengikuti zoom kamera (koordinat footage → layar).

## Temuan QC sampling selama perbaikan (diperbaiki)
- Silang blok R1 7 f = dua teks bertumpuk di still ("workflow"+"bahkan") → keluar mulai 5 f sebelum blok baru.
- LINTAS AGENT: animasi keluar 8 f tapi lapisan hanya sisa 6 f → hilang tiba-tiba; keluarAt = durasi − 8 f.
- Clawd di lingkaran terlalu kecil (±50 px) → membesar 1,6× saat masuk lingkaran.
- Kunci gerak ikut-zoom tiap 2 f membuat ekspresi ffmpeg terlalu dalam (compose gagal) → kunci disederhanakan (galat < 1,5 px).
- Codex melayang di tepi bahu yang sudah menurun ke kursi; Gemini mengambang di atas Codex → bahu diukur ulang dari matte (kanan 1260, 731), Gemini 118 px di atas kaki Codex (tinggi sprite diukur dari still).
- Tokoh tertimpa narasi setelah "decision" → tokoh pergi tepat di "decision".

## Hasil (17 Nov ±21:30)
- Master 2512 f @30000/1001 (lock visual 4ef9b973), SFX 63 cue (lock 7050a9ed, maks 4 cue/2 dtk), musik A/B dikunci ulang (strings Aware di jentikan 57,92 dtk), `audio_order.py check` PASS A/B.
- Mix tanpa limiter, suara ×1,0: A/B/tanpa-musik −15,75 / −15,78 / −16,0 LUFS, puncak −1,0 dBFS.
- QC sampling: lembar 1 frame/2 dtk + titik E1–E12; tidak ada teks bertumpuk/terpotong di sampel, teks pita bawah di dalam margin, dunia agen mendarat 1–2 f setelah jentikan (f1737–1738 vs transien f1736).
- Dibiarkan: kartu "Claude Max" (nama paket asli, menunggu Irfan).

---
# Putaran 2 · catatan Irfan 17 Nov ±22:00 (audit dulu, baru perbaiki)

| # | Detik | Temuan | Penyebab (diukur) | Perbaikan |
|---|---|---|---|---|
| F1 | 52–55 | Zoom masuk-keluar seperti bug | punch langkah "uji" 52,19→53,52 lalu cut, disusul pulsa punch sambungan footage j53 (masuk-keluar 12 f) di 53,6 | pulsa sambungan dihapus; tiap sambungan footage = CUT framing (tahan sampai akhir kalimat) yang digabung dengan punch di dekatnya: bila sedang punch → cut kembali di sambungan; tidak ada lagi gerak masuk-keluar |
| F2 | 43–45 | "buat biayanya." masih di kanan | r1_pos awal B4b = (1500, 915) | rata tengah dada (960, 930) |
| F3 | semua | Teks masih "kecepetan hilang" | 97/103 blok mulai keluar SEBELUM kata terakhirnya selesai diucapkan (hingga −0,24 dtk): silang 5 f sebelum blok berikut | blok bertahan sampai kata terakhir selesai: kalimat mengalir → blok lama bergulir naik + pudar 5 f tepat saat blok baru masuk dari bawah; ada jeda → bertahan ≥ 0,45 dtk setelah kata terakhir |
| F4 | 6–14 | Cincin "workflow / AI model" terlalu jauh dari kepala | busur selebar frame (x 40–1800, puncak y 195) | busur mengikuti garis merah Irfan: kaki kiri (370, 860) → puncak (1000, 300) → kaki kanan (1620, 780); "workflow" di sisi kiri, "AI model" di sisi kanan, kepala di tengah (lewat di belakang kepala) |
| F5 | 20, 12, 48–51, 43 | Kemunculan penekanan tanpa bunyi terdengar: AI SLOP, DECISION, hitungan 20×/5×, "habis banget" | kata hero = thud sub Move.mp3 −10 dB (tak terdengar di HP, audio_phone); hitungan angka tanpa cue; "habis banget" = klik glitch | kata hero = klik penekanan (tiktok drop click, 692 Hz, terdengar di HP); hitungan = tick per kenaikan angka; "habis banget" = bunyi kertas (flipcard) |
| F6 | 24–28 | Kamera dunia aplikasi Claude diam | kunci kamera "/" → "apple" sama (1,04 → 1,04) selama ±3 dtk | push pelan 1,04 → 1,12 ke kolom ketik (drift) |
| F7 | 72–77 | Shot Claude mengedit terlalu pendek (2,6 dtk) | jendela Blender = "Dan menurut … kayak gimana?" | shot mulai di "Ini 100% full pakai AI" (72,21 dtk) → 4,5 dtk / 135 f; sebelum onset Claude mengetik + mengangguk; "100% FULL AI" jadi hero di DEPAN di atas dinding gelap scene |

## Temuan QC sampling putaran 2 (diperbaiki sebelum final)
- "workflow" di busur baru bertumpuk dengan Clawd di bahu kiri → awal busur digeser ke 13 % (mulai di atas bahu).
- Gulir 5 f dengan kurva `leave` (lambat di awal) masih memperlihatkan dua blok bertumpuk ("Hanya untuk uji" + "coba sistem ini") → gulir 4 f kurva `reveal` (cepat di awal), naik 1 tinggi baris.
- Klik penekanan pilihan pertama (tiktok drop) terbaca "bubble pop" oleh `ears` = terlalu mirip pop objek → `Cut.mp3` ("crisp interface click").
- Klik AI SLOP 83 ms setelah runtuh (gerbang: ≥ 100 ms) → +130 ms; ketik Claude di meja bertumpuk dengan klik 100% FULL AI → digeser ke awal shot.
- Pemeriksa geometri Blender: margin Claude 4,85 % (batas 5 %) karena tangan mengetik → diterima (tidak kentara).

## Hasil putaran 2 (17 Nov ±23:30)
- Shot meja 3D 135 f (Cycles CPU 75 % → 1080p, 22 dtk/f), mulai di "Ini" 72,21 dtk; Claude mengetik + mengangguk, menoleh di "kayak gimana?".
- Master 2512 f (lock visual a44e19fe), SFX lock 4cd7548f (kata hero = klik Cut.mp3 di FINALLY, SELESAI, DECISION, AI SLOP, WORKFLOW-NYA, BALIK MODAL, LINTAS AGENT, 100% FULL AI; kertas di "habis banget"; tick 10× dan 4× di hitungan kartu), musik A/B dikunci ulang, `check` PASS.
- Mix A/B/tanpa-musik −15,75 / −15,78 / −16,0 LUFS, suara ×1,0, tanpa limiter.
- Kamera: tidak ada lagi pulsa masuk-keluar; sambungan footage = cut framing; dunia aplikasi push 1,04 → 1,12.

---
# Putaran 3 · catatan Irfan 17 Nov ±23:50 — REGRESI dari putaran 2 (kesalahan Sutradara)

Akar masalah: perubahan putaran 2 diterapkan GLOBAL (aturan tahan/gulir ke semua gaya KT, animasi naik-dari-bawah ke FINALLY, busur dirapatkan tanpa cek tokoh/nama) dan QC sampling still 2 dtk tidak bisa melihat durasi tampil/gerak. Diukur dari lapisan:

| # | Temuan Irfan | Ukuran | Penyebab | Perbaikan |
|---|---|---|---|---|
| G1 | FINALLY muncul-hilang terlalu cepat, turun ke bahu | tampil 0,50 dtk, keluar mulai 0,09 dtk; tidak pernah mendarat | naik-dari-bawah 16 f + keluar 12 f di kata 0,5 dtk | FINALLY kembali di kepala, masuk di tempat 5 f (pudar+blur+skala), keluar pudar 6 f; dunia repo mulai 0,25 dtk lebih lambat → FINALLY tampil ±0,8 dtk |
| G2 | VIRAL hilang kecepetan | 0,37 dtk (sebelumnya ±5 dtk) | aturan narasi ikut menimpa gaya viral | aturan tahan/gulir HANYA untuk narasi R1; R2/R3/viral/putus kembali ke waktu asal |
| G3 | "habis banget" kecepetan | 0,80 dtk, tahan 0,7 hilang | sama | sama |
| G4 | "workflow" mengecil; bertabrakan dengan "Claude," dan Gemini | ukuran 150→124; busur aktif sampai "decision" | busur dirapatkan tanpa cek nama/tokoh | ukuran kembali 150/146; busur keluar sebelum "ChatGPT" (nama + tokoh datang setelahnya); nama "Claude," di atas Clawd, "Gemini," di samping Gemini |
| G5 | KT hilang dengan naik ke atas / menumpuk | gulir naik 1,05 baris | gaya gulir | keluar DI TEMPAT (pudar + blur + mengecil sedikit), tanpa naik |
| G6 | DECISION, "uji coba / sistem ini", "kesalahan" masih di kanan | x 1110 / 1180 / 1400 | posisi tidak diubah putaran 2 | semua narasi + DECISION + kesalahan rata tengah x 960 (kecuali di dalam jendela UI) |

QC tambahan: skrip cek per KT (durasi tampil penuh ≥ 0,35 dtk, tidak keluar sebelum kata terakhir selesai untuk narasi, pusat x narasi 960 ± 40) + strip frame di FINALLY, VIRAL, habis banget, B1b — bukan hanya still 2 dtk.

## Temuan QC putaran 3 (strip frame berurutan + cek angka per KT, bukan hanya still 2 dtk)
- Nama "Claude,"/"Gemini," tampil penuh 0,03–0,20 dtk (diucapkan beruntun) → tiga nama bertahan bersama sampai cut "decision" (posisi berbeda, tidak bertabrakan); "ChatGPT," dipindah ke kanan Codex supaya tidak menimpa narasi tengah.
- Narasi "sebuah" bertahan melewati cut "decision" dan menimpa DECISION (juga dilaporkan Irfan dari versi Drive putaran 2) → narasi yang melewati cut keluar di cut. Cek frame 356–367: "sebuah" terakhir f359, cut kamera f358, DECISION masuk f361.
- "untuk meminimalisir" menimpa "kesalahan" setelah kesalahan dipindah ke tengah → aturan tahan narasi melihat blok apa pun di jalur yang sama (bukan hanya narasi).
- "kesalahan" hanya 0,37 dtk di jalur tengah; gaya kacau butuh ±0,6 dtk untuk mendarat → slam kata kunci 3 f.
- Cek angka akhir: 0 narasi keluar sebelum kata terakhir selesai, 0 tumpuk di jalur yang sama.

## Hasil putaran 3 (18 Nov ±00:45)
- FINALLY di kepala ±0,8 dtk (dunia repo +0,25 dtk); VIRAL!! ±6,4 dtk dan "habis banget" ditahan seperti semula; busur 150/146 keluar sebelum nama; DECISION, "uji coba / sistem ini", "kesalahan", narasi meja rata tengah; keluar teks di tempat (tanpa naik).
- Master 2512 f (lock visual 94c91ef3), SFX lock e279adfb, musik A/B dikunci ulang, check PASS; mix −15,75 / −15,79 / −16,0 LUFS, suara ×1,0 tanpa limiter.

---
# Putaran 4 · catatan Irfan 18 Nov (versi A saja) — audit dulu, baru perbaiki

Basis: d12fd9b (`out/varian-A.mp4`, 2512 f). Cara audit: lembar kontak 4 frame/dtk seluruh video (`qc/r4-audit/sheet_*.jpg`), strip 6 frame/dtk di titik yang Irfan tunjuk, ASR ulang segmen yang teksnya diragukan, posisi lapisan dari `lego/lego.json`.
Akar masalah bersama (#2 dan #4 Irfan + sebagian besar temuan audit): KT keluar dengan **pudar 5–7 f** sementara blok berikut sudah masuk → dua teks bertumpuk sebagai "hantu"; aturan jalur hanya melihat blok berdekatan (dy < 110 px), dan tidak ada batas potongan adegan, sehingga blok terbawa ke adegan berikutnya. Kartu 83 (Catatan pakai 18 Nov, jawaban Irfan) sudah menetapkan: masuk 2–4 f, tahan per kata, **keluar tanpa fade (potongan/mask)**.

| # | Detik | Temuan | Penyebab | Perbaikan (ledger) |
|---|---|---|---|---|
| H1 | 34,46–34,9 | "Progress di dibaliknya" terbawa ke shot wajah, menimpa "Gimana" | blok tidak dibatasi potongan adegan (app Claude → wajah) | semua KT berakhir paling lambat di potongan adegan berikutnya (D-402) |
| H2 | 33,3 | teks "Progress di dibaliknya" ≠ ucapan "progres di baliknya" (ASR ulang) | kata ASR ganda | teks "Progres di baliknya" (D-402) |
| H3 | 72,05–72,3 | "di sini." terbawa ke shot meja 3D | sama dengan H1 | sama (D-402) |
| H4 | 43,2–43,8 | "Pak." + "Ini" + "habis" bertumpuk; slab BALIK MODAL turun melewati teks dada | "Ini" di y 930, "Pak." y 800 (beda jalur); slab keluar meluncur ke bawah | "Ini" menggantikan "Pak." di tempat yang sama, "habis banget" menggantikan "Ini"; slab keluar mask di tempat (D-404) |
| H5 | 13,5 · 18,25 · 19,25 · 28,0 · 41,75 · 44,5 · 54,0–54,25 · 64,75 · 69,5–70,0 · 78,25 | blok lama memudar sambil blok baru masuk → kata hantu bertumpuk | keluar pudar 5–7 f (`gayaKeluar`) | keluar = potongan tepat di frame blok berikut masuk; satu narasi per waktu (D-405, kartu 83) |
| H6 | 58,4–58,9 | "Kayak yang" + "kalian lihat" dua baris bertumpuk di atas deret kartu agen (B11) | dua blok di jalur pita bawah, aturan jalur dy < 110 tidak menangkap | satu narasi per waktu; teks tidak menimpa deret kartu (D-405) |
| H7 | 8,6–9,2 | "ChatGPT," masuk dengan slam 2,0× + blur → hantu besar menutupi lengan Codex | slam R2 untuk nama | nama diganti bubble sapaan tokoh (D-401) |
| H8 | 4,25–4,5 | kepala Clawd terpotong tepi atas saat lingkaran wajah membesar | Clawd melompat ke rambut di koordinat lingkaran | Clawd tetap di dalam margin aman 5 % selama lingkaran membesar (D-405, Lantai C16) |
| H9 | 4,3 | "juga." pudar-blur di atas wajah saat lingkaran membesar | keluar pudar | ikut H1/H5: potong di awal transisi (D-405) |
| H10 | 36,4 | "cuman" | teks ASR | "cuma" (D-403) |
| H11 | 81 | "Comment di bawah." tanpa penunjuk ke kolom komentar | — | tulisan tangan + panah ke "Add a comment…" (D-406) |

Dibiarkan (sudah disetujui, tidak dikeluhkan): VIRAL!! + panah merah slop, AI SLOP, kartu 20×/5×, B11 papan, shot Blender, IG + komentar. Masuk slab/FINALLY/DECISION tidak diubah (pelajaran putaran 2: jangan ubah gerak yang disetujui secara global); hanya cara KELUARnya yang memudar diganti mask (kartu 83).

## QC Sutradara atas REPORT-R4-visual (strip + lembar qc/r4/) — dikembalikan ke pekerja
- Q1 · 8,5–11,9 · bubble sapaan terlalu kecil: tinggi huruf ±40 px @1080 (di HP ±8 px) → perbesar ±1,45× (huruf 60–64 px), jarak antar-bubble ≥ 24 px, tetap di margin 5 %.
- Q2 · 81,0–81,6 · "Comment di bawah." + panah dipotong di 81,6 (hanya ±0,4 dtk utuh) karena jalur narasi; tulisan tangan mulai 0,2 dtk setelah kata → mulai di onset+2 f, tahan minimal mulai + 0,25 + 0,3×3 (±81,95).
- Q3 · 34,46–34,65 · "Gimana" muncul pucat di atas jendela putih selama lingkaran wajah membesar → blok yang onsetnya jatuh di dalam transisi wipe ditunda sampai wipe menutup (≤ 0,25 dtk), atau dimask ke lingkaran.
- Diterima: Pak./Ini/habis (satu per waktu), panah B11, "gratis", tidak ada hantu pudar di 9 lembar, B11 emote, Gemini astroid warna merek.
- QC ronde 2 (Sutradara): Q1 bubble huruf 60 px (1,25×; 1,45× tidak muat di margin), Q2 coretan IG 80,86–82,01, Q3 lima blok ditunda sampai wipe menutup (≤0,23 dtk) — DITERIMA. Visual dikunci untuk fase audio.

## Putusan Sutradara atas audit frame R4 (Codex + Sonnet buta, 81/84 dtk sepakat bersih, 0 disepakati, 4 perlu putus)
- P1 · 38,4 f1150 (Codex) · ASLI: keluar mask hero WORKFLOW-NYA tampil 6 f penuh lalu 1 f irisan garis horizontal lalu hilang = terbaca glitch, bukan sapuan. Perbaikan: mask keluar = sapuan bersih satu arah, terlihat ≥ 4 f berurutan; berlaku semua hero yang keluar dengan mask (FINALLY, SELESAI, DECISION, AI SLOP, WORKFLOW-NYA, BALIK MODAL, LINTAS AGENT, 100% FULL AI, busur).
- P2 · 59,7 f1788 (Sonnet) · DISMISS: "ChatGPT" tampil sebagai label kartu node B11; KT kedua = kata ganda (Lantai A3). Putusan sama dengan ronde 9 basis.
- P3 · 72,1 f2162–2165 (Codex) · ASLI (sudah ada di basis, terlewat ronde lama): wajah layar penuh menyelip 4 f antara B11 dan meja 3D; "di sini." ikut menyeberang. Perbaikan: meja 3D mulai tepat di frame B11 berakhir (tanpa frame wajah), "di sini." berakhir di potongan itu.
- P4 · 80,0 f2399 (Codex) · ASLI: "gak? Atau" bertahan sampai ±80,06 sementara "masih kerasa AI?" sudah diucapkan sejak 79,55 dan tampil sebagai komentar IG. Perbaikan: "gak? Atau" berakhir di onset "masih" + 2 f (komentar membawa kalimat berikutnya).

## Putusan Sutradara atas audit frame R4 ronde 2 (79/84 dtk sepakat; 1 disepakati, 5 perlu putus)
- A1 · 76,8 f2303 (DISEPAKATI) · ASLI: "Udah" tampil 76,88, diucapkan 76,46. Q3 menunda T098 seolah ada wipe, padahal meja 3D → wajah di 76,46 adalah potongan biasa. Perbaikan: T098 di onset + 2 f.
- A2 · 11,9 f357 (Sonnet) · ASLI: tepat 1 frame tiga tokoh + bubble + "sebuah" hilang lalu tokoh muncul lagi di f358 (cut decision). Perbaikan: tidak ada frame kosong; tokoh terus tampil sampai melompat pergi, bubble pop-out selesai sebelum/di cut tanpa celah.
- A3 · 72,0 f2157→2158 (Codex) · ASLI: papan B11 membesar mendadak 1 frame (sambungan segmen post D_RELAY). Perbaikan: gerak kontinu sampai f2161, atau tahan tanpa lompatan.
- D1 · 29,2 f874 (Sonnet) · DISMISS: "apple style … edit" tampil sebagai ketikan "/apple-style" di kolom app Claude; KT kedua = kata ganda (A3), sama dengan basis.
- D2 · 34,8 f1043 (Codex) · DISMISS: tunda ≤ 0,25 dtk dari awal blok saat lingkaran wajah menutup frame (Q3, disengaja, agar teks tidak pucat di atas jendela putih).
- D3 · 38,1 f1142 (Codex) · DISMISS: potongan footage dari edit suara terkunci (batas klip dasar 38,105 = akhir kalimat "workflow-nya."), sama dengan basis.
- 18 Nov · temuan pekerja 4b (diterima Sutradara, D-402): dua klip dasar 1-frame (f625, f1292) menggandakan pts → footage wajah tertinggal 1 f setelah f626 dan 2 f setelah f1293 (sudah ada sejak basis). Ronde 4c memperbaiki dasar() supaya pts = n/29,97 di seluruh video.

## Putusan Sutradara atas audit frame R4 ronde 3 (81/84 dtk sepakat bersih; 0 disepakati, 3 perlu putus)
- B1 · 63,7 f1910 (Sonnet) · ASLI (sudah ada di basis): "ChatGPT" (kata 169, 63,61–64,34) diucapkan tanpa tampil di mana pun; kartu aktif saat itu milik Claude, label ChatGPT hanya node kecil. Beda dengan 59,7 (kartu ChatGPT sedang fokus). Perbaikan: blok narasi "Bahkan ChatGPT" (Lantai A1).
- B2 · 73,9 f2214 (Sonnet) · DISMISS: "pakai" sengaja tidak ditampilkan di 100% FULL AI (Irfan 17 Nov, DECISIONS).
- B3 · 83,8 f2511 (Codex) · ASLI: frame terakhir kartu IG hilang dan wajah memenuhi layar 1 frame (D_IG berakhir 1 f sebelum akhir). Perbaikan: dunia IG menutup sampai frame 2511.

## Hasil putaran 4 (18 Nov ±06:35) — render final 1 dari 3
- `out/varian-A_r4-final-1.mp4` lewat `render.sh lego` (semua gerbang: revisi_cek, audio check order-A, resep, motion_lint mode revisi F27, still/sanding/JURI, draft, audit frame 9/9 LULUS). 2512 f 29,97, 83,817 dtk, AAC 48 kHz; audio lag 0 sampel vs mix_A (korelasi 0,9995); PSNR vs master teraudit rata-rata 50,3 dB, minimum 46,6 dB; decode bersih. Diunggah ke Drive "Claude edit/2026-11-16 — Siirfan — Di Balik Skill Development/varian-A_r4-final-1.mp4" (79 264 789 byte, cocok).
- Pemeriksaan pasca-render (Sutradara, lembar 4 fps seluruh final + audit dua model atas frame identik): tidak ada kesalahan terlewat → render final 2 dan 3 tidak dipakai (D-407: tidak mengarang kesalahan).
- Kesalahan yang tertangkap SEBELUM final (tidak masuk hitungan 3 render): audit frame 4 ronde menemukan 9 hal asli yang lolos QC still/strip Sutradara: mask keluar 1 f terbaca glitch, 4 f wajah menyelip B11→meja (sejak basis), "gak? Atau" telat, "Udah" telat 0,4 dtk, kedip 1 f di cut decision, papan B11 melompat 1 f, teks 1 f di frame cut, footage wajah tertinggal 1–2 f dari suara (sejak basis, klip dasar 1-frame), "ChatGPT" 63,6 tidak tampil (sejak basis). Kenapa lolos QC Sutradara: lembar 4–6 fps tidak memperlihatkan peristiwa 1–4 frame, dan sinkron footage-suara tidak diukur sebelumnya (kini `lego/base_pts.py` + `cek_master.py`).

## Kesalahan terlewat di render final 1 (Irfan 18 Nov, frame 81,7 dtk) → render final 2
- K1 · 81,6–81,95 · "Comment di bawah." (tulisan tangan + panah) masih tampil bersamaan dengan narasi "Nanti" di pita hitam: dua teks sama kuat berebut fokus, dan urutan baca terbalik (Nanti terbaca lebih dulu, padahal diucapkan sesudahnya).
- Kenapa lolos QC: (1) putusan Sutradara sendiri di QC ronde 2 (Q2) menahan coretan minimal mulai + 0,25 + 0,3×3 dan mengecualikannya dari jalur narasi karena beda zona — memenangkan aturan tahan per kata atas satu fokus/urutan baca; (2) pemeriksa frame diberi catatan "tulisan tangan disengaja", jadi tumpang waktu dua teks tidak dinilai; (3) cek_tumpuk hanya mengukur irisan bbox, bukan dua teks di zona berbeda pada saat yang sama.
- Perbaikan: tulisan ditulis mengikuti onset tiap kata, panah selesai ±8 f; coretan + panah berakhir tepat di frame "Nanti" muncul (satu teks per waktu lintas zona untuk teks yang diucapkan).
- Masukan tambahan Irfan atas dua frame IG (D-412, D-413): urutan baca di sekitar kata besar (narasi pengantar masih tampil di bawah hero), tulisan tangan menumpuk di luar panel, kamera IG diam padahal fokus berpindah, "profesional" tidak dibedakan.

## QC Sutradara ronde 6 / 6b (18 Nov) — sebelum render final 2
- Diterima (resolusi penuh): K1 f2446 tulisan terakhir, f2448 "Nanti" pertama, tanpa frame bersama; label pengantar di atas WORKFLOW-NYA / BALIK MODAL / LINTAS AGENT terbaca, urutan atas → bawah; DECISION di dada (f380–400), "dalam ngebuat video" di bawahnya, wajah bebas; "profesional" Poppins 800, 1,15×, koral.
- Ditolak lalu diperbaiki (6b): kamera di panel komentar (zoom 1,8, pusat y 700) memotong avatar + "salsa.kirana Keren editan" di tepi atas dan menyisakan ±200 px bayangan kosong di bawah (berat ke atas). Pusat y → 642: avatar y 85–175, kolom komentar y 880–965 (f2440), margin atas/bawah setara.

## Putaran 5 · bedah ulang terhadap arah baru (D-415…D-421), 18 Nov
Arah: pengikat kartu 07 Baikov (warna, huruf, ritme) + 49 Krea (punch-in kamera, ketik) + 02 Dimensi (teks/elemen menempel ke dunia kamera, elemen di belakang subjek; palet premium, bukan neon) + 63 invideo (UI sebagai tokoh, desktop sinematik); kartu 83 hanya BENTUK KT (cincin, slab belakang kepala, kata di dada, label pengantar). Palet proyek (biru #2E5BFF, putih hangat #F6F5F0, coral #F97066, kuning #FFD54A) sudah sekeluarga dengan 07 (#3A5BFE, #FBF7F4, #E84F47, #FCC64C) → dipertahankan. Yang berubah di pengikat: huruf (Poppins/Anton → grotesk medium keluarga 07, dicek dengan still dulu).
Kolom: beat · sekarang · sejalan? · emosi → gerak pembawa · bunyi pembawa · ubah.

| Beat (dtk) | Ucapan | Sekarang | Sejalan? | Emosi → gerak pembawa · bunyi | Ubah |
|---|---|---|---|---|---|
| B1 0–2,1 | "Oke, finally akhirnya" | wajah + FINALLY slab Anton, Clawd kecil di bahu | sebagian (bentuk 83 ok, huruf bukan 07; Clawd hanya hiasan) | lega-bangga → slab naik lalu "menghela" (napas skala 1→1,03→1); Clawd *proud* (menjulang, mata tutup) · hit lembut + napas | huruf; emosi Clawd |
| B1 2,1–4,3 | "proyek ini selesai juga" | repo GitHub layar penuh datar + slab SELESAI hijau, wajah lingkaran | tidak (UI datar di kertas, bukan desktop premium) | puas → commit/centang mendarat satu per satu (react) lalu kamera mundur saat centang terakhir (sebab-akibat, launch-motion c) · pop per centang, ding di SELESAI | UI repo gaya 63 (jendela miring di bidang gradien 07 k5, bayangan lembut) |
| B1b 4,3–10,5 | "baru aja ngebikin workflow … AI model … ChatGPT, Claude, Gemini" | cincin kata + 3 tokoh pixel + bubble seragam "Hi, aku X!" | tidak (D-417: template, emosi sama) | perkenalan dengan watak: Claude bete (tangan bersilang, desah, mata sipit) "Aku yang ngedit loh."; ChatGPT senang (lompat, take .6) "Hi! Aku nemenin Claude."; Gemini diam (kedip saja) "…" · bunyi per tokoh beda: gerutu pendek / bloop riang / kilau sangat tipis | bubble + emosi per tokoh, tokoh pixel dihaluskan |
| B1b 10,6–13,7 | "bisa ngebuat sebuah decision dalam ngebuat video" | DECISION slab di dada | sebagian (huruf) | yakin → tiga tokoh menoleh ke DECISION (reaksi berjeda react) · hit | huruf; tokoh bereaksi |
| B2 13,8–23,6 | "lagi viral … AI slop … putus-putus" | parodi slop neon + AI SLOP + "putus-putus" | ya sebagai parodi (sengaja jelek) | sindiran → kecewa: slop runtuh, lalu frame "bersih" premium datang sebagai lega (kontras) · runtuh + hening 0,4 dtk | transisi keluar slop → dunia putih 07 |
| B3 23,7–33,2 | "bukan sebuah template … Apple style … Cinematic Storytelling … aku ngebalik" | jendela app Claude di beige, ketik /apple-style | sebagian (UI ok, tapi kecil/datar, tanpa punch) | menolak klise → prompt diketik lalu dihapus (backspace) di "bukan template"; punch-in 49 ke prompt; "aku ngebalik" = jendela berbalik/whip · ketik, hapus, whoosh | UI gaya 63 + punch 49 + aksi hapus |
| B4 33,3–41,6 | "progres di baliknya … workflow-nya … gak usah ditanya" | KT + WORKFLOW-NYA slab + label | sebagian (huruf) | serius → tenang, kamera push pelan · tanpa bunyi baru | huruf |
| B5 41,7–53,8 | "balik modal, Pak … habis banget … 20 kali … 5 kali … uji coba" | BALIK MODAL slab; kartu putih ChatGPT Pro 1→20×, Claude Max 1→5× | sebagian (kartu polos, angka naik tanpa tekanan) | keluhan lucu → angka naik + warna kartu memanas ke coral mengikuti nilai, kartu bergetar kecil di 20× (launch-motion a) · tik naik nada, "ouch" lembut di puncak | kartu gaya 07 k7 + emosi angka |
| B6 53,9–57,5 | "memungkinkan sistem kerja lintas agent" | LINTAS AGENT slab + label | sebagian (huruf) | kagum → slab | huruf |
| B7 57,6–72,2 | "kayak yang kalian lihat ini … koordinasi … session berbeda … loop pembelajaran" | papan gelap node + tokoh pixel kecil + kartu pesan, panah goresan | tidak (D-418 voxel/pixel papan, D-419 panah ganda) | kerja sama → jendela app asli (ChatGPT, Claude, sesi B) di desktop premium, pesan meluncur antarjendela, kamera mengikuti pesan; avatar tokoh bereaksi (Claude bete saat diberi tugas, lega saat selesai); "loop" = jalur pesan menutup jadi lingkaran + centang · kirim/terima per pesan, chime saat loop tertutup | bangun ulang gaya 63; hapus goresan |
| B8 72,3–76,4 | "Ini 100% full pakai AI … menurut kalian videonya kayak gimana?" | meja 3D, Claude bata menatap kamera, 100% FULL | tidak (D-420) | fokus bekerja → Claude dari belakang/samping, setengah terlihat, menghadap monitor, tangan mengetik; kamera fokus ke wajah Irfan di timeline + zoom pelan · ketik pelan + hum ruangan | komposisi + akting Claude |
| B9 76,5–83,8 | "profesional nggak? … masih kerasa AI? … Comment di bawah … skill gratis" | IG polos, teks di pita hitam, tulisan tangan biru | tidak (D-414; contoh gagal 10–11) | ragu-penasaran → komentar pop sebagai reaksi (negatif dulu, lalu positif); "Comment di bawah" = kamera masuk ke kolom komentar, kursor berkedip (UI yang membawa ajakan); "gratis" = kilau kecil · pop komentar, klik kolom | hapus tulisan tangan; teks narasi masuk ke bidang video; UI IG lebih kaya (kartu 65/08/05) |

Pertanyaan yang tersisa setelah bedah: huruf (still pembanding), hitungan render final pada arah baru, musik (tetap atau ikut 07 house).

## QC Sutradara R5 ronde 1 (18 Nov, resolusi penuh dari master)
- A DITERIMA: UI gelap-glow, blok timeline, "selesai." besar putih + centang, Clawd proud (f65–128).
- C DITERIMA: Claude bete "Aku yang ngedit loh.", ChatGPT senang "Hi! Aku nemenin Claude.", Gemini "…" (f270–335).
- G DITERIMA: kartu ChatGPT Pro 20× SF Pro coral (f1500).
- B GAGAL sebagian: latar gelap + glow + mosaik masuk ✓; urutan sebab-akibat salah (pesan cerita muncul sebelum "/cinematic" terhapus, f980); pertanyaan/tabel brief belum sempat tampil sebelum potongan; popover "/apple-style" masih terpotong (f880). → perpanjang sampai sebelum WORKFLOW-NYA, urutan hapus→ketik→kirim→muat→tanya→brief→referensi.
- F GAGAL sebagian: tulisan tangan hilang ✓, "Udah" di dalam video ✓; "profesional" (f2360) dan "skill" (f2470) masih di pita hitam; "Comment" (f2425) di bawah kartu menyentuh batas bawah. → semua narasi B9 di dalam bidang video; "Comment di bawah." dengan postingan utuh + kolom berdenyut.
- D, E belum dikerjakan → diputus Sutradara (tata letak tiga jendela + panel dok; Blender diizinkan).
- R5 ronde 2 (pekerja lama): B DITERIMA (adegan UI 23,59–36,32; hapus → ketik cerita → kirim → muat → tanya → tabel brief → referensi; popover utuh). Sisa: narasi 33,3–36,3 menimpa tepi jendela/placeholder (f1035–1060). Pekerja lama habis jatah → D, E, F, B-narasi ke pekerja baru (`handoff/TASK-R5b-visual.md`).

## Audit mandiri sesi baru (18 Nov sore, main 3795b31)
Pertanyaan: apakah lanjutan STATUS §5 masih sesuai permintaan awal Irfan dan aturan terbaru?
- **Permintaan awal** (DECISIONS awal): take 3:29 → ±1:00–1:30 untuk akun personal, lalu edit penuh dengan motion graphic. Hasil sekarang 83,8 dtk, versi A, akun siirfan → masih sesuai. Arah putaran 5 (D-414…D-427) adalah revisi Irfan atas render final 1, dan §5 STATUS mengikutinya; tidak ada butir di §5 yang berada di luar ledger.
- **Bertentangan dengan aturan baru:** (1) §5.1 "satu subagen Sonnet" → diganti orkestrasi §1 (tema.ts + komponen bersama + pekerja baru per TASK; Codex utama). (2) `tema_cek.py` GAGAL 9 butir: tema.ts tanpa MEREK; b1–b7 + Root menulis warna/ukuran literal (b5 53 warna, b1 34 warna + 20 ukuran). (3) TAHAP.md belum ada → `render.sh final` tidak menjaga tahap. (4) Profil merek siirfan belum ada (Tahap 1). Diputus Irfan: D-428, D-429.
- **Bertentangan di dalam proyek:** RESEP putaran 5 masih menulis palet terang 07 + desktop gradien biru, padahal D-426 memindahkan UI ke gelap-glow. Hasil di master memang campur: UI B gelap-oranye, kartu angka G putih-coral. Diputus D-430 (satu tema; G tetap, coral = turunan primer).
- **Klaim STATUS dicek ulang:** still `qc/r5/f800` (B) dan `f1500` (G) sesuai klaim DITERIMA; `qc/r5/f2360` membenarkan F GAGAL ("profesional" terpecah di pita hitam); still komponen `qc/r5b/D_1790` masih kosong (jendela kedua hampir tak terlihat, jendela pertama berisi satu tokoh kecil) → belum layak, sesuai status "belum dirakit, belum diaudit". Perubahan R5b sudah ter-commit di f19fcf1 (bukan di working tree); diff vs 6444ad4: 13 file, b7 +242 baris.
- **Cara kerja sisa proyek:** (1) profil merek; (2) Sutradara menulis tema.ts; satu pekerja Codex memindahkan b1–b7 ke token + ui-asli/, dicek identik piksel di A/B/C/G (PSNR vs master 12:08) dan tema_cek LULUS; papan acuan; (3) TASK terpisah per adegan D, E, F, narasi B, masing-masing pekerja baru; (4) QC Sutradara + audit frame; (5) audio; (6) DA, JURI, render final 2.

## Kesalahan terlewat K2 · visual "profesional" (ditemukan Irfan, 18 Nov sore; D-433/D-434)
- **Apa:** "profesional" (78,66) tampil coral, ukuran 97, gaya r3 kacau, di pita hitam bawah video IG. Tidak ada satu pun atribut yang punya alasan dari makna kata atau adegan. Satu-satunya blok di video dengan ukuran dan warna khusus.
- **Asal:** REVISI-2 memindahkan perlakuan R3 milik "masih kerasa AI?" (keraguan, negatif) ke "profesional" saat kalimat itu menjadi komentar IG. Warna "negatif", gaya "frustrasi", dan ukurannya ikut pindah tanpa diputus ulang; posisinya mengikuti pita hitam lama.
- **Kenapa lolos QC:** (1) QC menilai "apakah teks ada, terbaca, tidak tumpuk, tidak terpotong", tidak menanyakan "kenapa warnanya ini, kenapa ukurannya ini, kenapa di sini" per atribut. (2) Tidak ada sistem peran: tema.ts hanya daftar warna, sehingga ukuran 97 dan coral tidak terlihat sebagai penyimpangan. (3) Frame f2360 sudah jadi contoh gagal 11, tapi yang dicatat hanya posisi, karena QC terpaku pada butir yang sudah tertulis di TASK. Final 1 juga lolos.
- **Temuan samping:** gaya r3 membuat huruf muncul bergiliran + bergetar sampai onset+18 f ("profesional", "habis banget"); r3 di "habis banget" ikut dirapikan agar kata utuh ≤ 4 f (D-405).
- **Perbaikan:** D-434 (TASK F). **Pencegahan:** tema.ts berperan (D-428) + `tema_cek`; learning "atribut teks dari peran + makna" di `guide/teks/GUIDE.md`; QC Sutradara menulis alasan warna/ukuran/posisi per blok yang diubah; alat OCR per blok (Irfan "ya").

## Putaran 5c · visual (18 Nov sore, D-431…D-437)
- **A/B:** latar `MEREK.latar` #080608 polos, gradien oranye dihapus (D-431). Still `qc/r5c/master/t3.0, t29.0, t34.0`.
- **D (57,6–72,2):** satu sesi chat Claude (pekerja Codex, `handoff/TASK-R5c-D.md` → `REPORT-R5c-D.md`): Claude komandan ("Saya sudah memerintahkan ChatGPT session A…", "ChatGPT session B memberi masukan…"), baris acara Update/Messaged, terminal `bus send`, diff GUIDE, `cut_check` PASS; Clawd satu-satunya tokoh di baris indikator kerja; KT narasi di rentang ini dihapus (D-435). QC Sutradara resolusi penuh `qc/r5c/master/t69.0.png`: teks UI terbaca (isi ±30 px), satu fokus, latar polos, tidak ada frame diam (preview pekerja: maks 4 f diam). `b7.tsx` lolos `tema_cek` (tanpa literal). Panah goresan B11 yang masih terpasang di master lama ikut hilang (pemanggilan `panah_lihat` dihapus, D-419).
- **E (72,2–76,4):** Blender ulang (D-420 + D-437): monitor diputar 16° ke Claude, Claude di atas sisi kiri keyboard menghadap monitor, kamera mundur/naik sehingga Claude + tangan di tuts + monitor satu frame, fokus wajah Irfan di timeline, push pelan. Render 135 frame paralel 4 proses di `/mnt/storage-projects/skill-dev-journey/b10a/paralel/`; versi 17 Nov diarsip `b10a/r5b-arsip/`. Still `qc/r5c/master/e72.6…e76.2`.
- **F:** "profesional" = peran kata kunci IG (r2 putih, ukuran 62 sama dengan "skill"), di dinding bidang video (D-434); "Comment", "skill" di dalam video; "yang beruntung." dibatasi ≤ 96 % lebar video (sebelumnya titiknya menyentuh tepi panel komentar, `cek_tumpuk` irisan 1 → 0).
- **habis banget:** r3 utuh ≤ 3 f, guncang reda ≤ 6 f (D-433).
- **Gerbang:** tsc 0, motion_lint `src/video` PASS, cek_tumpuk irisan 0, kt_ocr LULUS (9 blok diterima dengan frame dicek, `qc/kt_ocr_terima.json`), cek_master/cek_sinkron/base_pts → `qc/r5c/log/`.
- **Draft:** `qc/r5c/draft-r5c-suara.mp4` (suara saja) di Drive `draft-r5c/`. Belum: audio baru (setelah visual final), refactor token b1–b6 (D-428), audit frame semua detik, render final 2.

## Putaran 6 · pemulihan ke R4 final 1 (18–19 Nov, D-438…D-451)
- Basis: `lego/lego_final_A1.json` (resep R4 final 1) → `lego/r6_gabung.py` → `lego/lego_r6.json` → `qc/r6/visual_r6.mp4`. Kamera wajah = R4 (R5c berbeda di 23,7–40,2 karena adegan B diperpanjang; sambung per frame ditolak, PSNR 13–23 dB).
- Dari R5c (per ID lapisan): bubble berwatak + Clawd (D-417), urutan baca DECISION/WORKFLOW-NYA/BALIK MODAL/LINTAS AGENT (D-412), "habis banget" terbaca, Blender E, IG + teksnya. 8 lapisan teks wajah yang cache R4-nya hilang memakai versi R5c (posisi sama, keluar sedikit lebih awal).
- Baru: masuk D = push-in wajah + blur → jendela mendarat → klik kirim → gelombang grid bara dari tombol kirim (D-443/D-449); label slab dirapatkan 34/54/39 px (D-450); "profesional" hijau + kata hitam di belakang badan (D-451, Codex, matte RVM dikoreksi −16 frame).
- Bukti identik R4: PSNR per frame visual_r6 vs R4 final 1 → beda hanya di rentang yang dimaksud (lihat log sesi); A (repo), B (app Claude), G (kartu angka) identik.
- Catatan: "cuma mempelajari" mulai 0,15 dtk lebih lambat dari R4 (lapisan R5c); D→Blender tetap potong keras (ditinjau di fase transisi D-448).
- Temuan Codex: `qc/matte/wajah-matte-r6.mkv` = 2496 frame (bukan 2512) dan cocok dengan proxy pada offset −16 frame sumber. Lapisan slab ber-lubang (T051/T057/T077, GRADE) dibuat dari matte sebelum r6 (`wajah-matte.mkv`); periksa offsetnya sebelum fase KT memakai matte lagi.
- Audio (Codex, `handoff/REPORT-R6-audio.md`): suara ×1,0 identik, musik R4, SFX R4 identik per sampel di luar rentang berubah; sfx_density + voice_level PASS; audio_phone global belum lulus (15 jendela < 8 dB, R4 20).
