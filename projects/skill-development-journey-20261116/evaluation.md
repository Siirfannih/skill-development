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
