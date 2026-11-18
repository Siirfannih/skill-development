# TASK-R5b-visual · putaran 5 lanjutan · D, E, F + narasi B (pekerja baru)

TUJUAN
Menyelesaikan perbaikan putaran 5 yang belum dikerjakan pekerja sebelumnya: D (desktop agen 57,6–72,2), E (meja Blender 72,2–76,4), F (IG 76,5–83,8), dan satu perbaikan narasi di B. A, B, C, G sudah DITERIMA Sutradara: jangan diubah selain butir B-narasi di bawah. Semua keputusan desain di file ini sudah final; jangan menunggu jawaban, kerjakan.

Proyek `P = ~/work/skill-development/projects/skill-development-journey-20261116`.

## Orientasi (baca dulu, urut)
1. `DECISIONS.md` baris D-414…D-427 (arah, cakupan).
2. `handoff/REPORT-R4-visual.md` (cara kerja pipeline lego: teks.py → bangun.py → lapisan → compose → gerbang; perintah gerbang + catatan seperti `kt_check --w 1920 --h 1080`) dan `handoff/REPORT-R5-visual.md` (apa yang sudah dibuat di A/B/C/G, keluarga gelap-glow, mosaik glitch, SF Pro). Pakai ulang komponen yang dibuat di A/B (latar gelap-glow, jendela gelap, mosaik) untuk D supaya satu sistem.
3. Kode: `lego/bangun.py` (D_RELAY ±baris 746 = dunia B11; fungsi panah goresan ±baris 601; D_IG ±baris 703; slot b10a ±baris 692–701), `lego/waktu.py` (POTONG/WIPE/SLOT_T), `remotion/src/video/b5.tsx` (RelayDunia/B11), `b6.tsx` (DuniaIG), `remotion/src/video/bersama/*`, `lego/blender/scene.py`.
4. Bundle lego proyek ini memakai entry `src/video/index.ts` (`remotion/.entry`).

## Ringkasan kartu (Sutradara sudah membuka kartu + frame kunci; kamu buka GAMBARNYA)
Frame kunci: `~/work/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/<no>-k*.jpg`.

| Kartu | Dipakai untuk | Warna & latar | Huruf & skala | Posisi & susunan | Kedalaman & kamera | Frame kunci |
|---|---|---|---|---|---|---|
| 07 Baikov · kiblat | A, B, C | putih hangat #F6F5F0 ATAU bidang biru #2E5BFF; satu adegan = satu keluarga hue + 1–2 aksen (coral #F97066, kuning #FFD54A, biru muda #C9D6FF); shape flat tanpa gradien; gradien biru #2E5BFF→#C9D6FF + bloom putih HANYA di adegan UI | grotesk SF Pro Display (`~/fonts-lokal/sf-pro-display/` Medium/Bold; fallback Inter 500/700), tracking −1…−3 %; kata pembuka 18–20 % tinggi frame per kata, tiap kata boleh warna sendiri (tinta #2F2D2A / biru / coral); kata kunci 6–8 % di pusat; satu ukuran teks per adegan | kata di pusat, dikepung shape besar 5–13× lebih tinggi yang terpotong tepi; roda daftar (k4): item 6–8 % menempel lengkung, satu disorot | adegan shape 2 lapis datar; adegan UI 3 lapis (gradien/bloom, jendela miring 3D tipis, bayangan lembut); kamera dorong/tarik terus, bentuk raksasa menyapu frame sebagai transisi (12–16 f, `whip`) | 07-k1, k3, k4, k5, k7 |
| 49 Krea · pinjaman | B (prompt) | putih #FFFFFF, teks hitam, aksen highlight select #B3D2F6 | grotesk Medium satu bobot; ketik per huruf dengan kursor; hero lewat punch-in kamera ±1,8–4,5× | pusat (50,50) | punch-in 1 frame lalu pan mengikuti kursor, settle | 49-k1, k2 |
| 63 invideo · pinjaman | A, D | desktop: jendela UI asli di atas bidang/gradien; satu aksen oranye Claude #E4550F di tombol | teks UI asli; kalimat kunci punch ke prompt (10 % tinggi) | satu subjek UI besar 55–60 % lebar, panel masuk dari samping mendorong jendela | 3 lapis (latar → jendela bayangan lembut → panel/kursor); kamera tak pernah diam: push 3–7 %/0,5 dtk, pull saat babak baru, geser lateral saat panel masuk | 63-k4, k5, k6, k7 |
| 65 IG UI · pinjaman | F | latar UI abu terang #ECECEC ATAU putih hangat; kartu putih bayangan lembut; aksen gradien IG #D24E98→#E09669 hanya pada ikon/kata IG | kalimat 3,5–5 % | satu objek UI dominan 45–70 % lebar | 2–3 lapis, lapis belakang buram; kamera push/pull ≥ ×1,5 ke elemen UI | 65-k1, k4, k5 |

Pelajaran yang berlaku (guide §Cara memutuskan):
- Bila beberapa tokoh diperkenalkan bersamaan → watak dan kalimat berbeda per tokoh dari perannya; gaya bubble seragam.
- Bila tokoh sedang bekerja → menghadap pekerjaannya, kamera ke objek kerja, tokoh terlihat sebagian; tatap kamera hanya untuk menyapa.
- Bila adegan sudah punya penunjuk arah (garis alir/panah UI) → tanpa panah goresan kedua.
- Bila video ditampilkan sebagai isi tampilan (postingan IG) → teks ucapan masuk ke dalam bidang video, di ruang kosong dekat subjek; bukan di pita hitam di bawahnya.
- Goresan/tulisan tangan hanya bila sekeluarga dengan adegan; di UI netral tidak.

Jangan seperti ini (`claude/motion-graphic/pustaka/contoh-gagal/`): 10 (tulisan tangan biru di IG netral), 11 (teks di pita hitam di bawah video IG), 01 (teks besar yang tidak berhubungan dengan frame), dan frame 25 dtk versi sekarang (latar krem-pink nanggung, jendela kecil, teks hitam "template." di pita kosong di bawah UI, popover "/apple-style" terpotong).


## Yang dikerjakan

B-narasi (kecil). Di adegan UI Claude yang diperpanjang (33,3–36,3), narasi "Progres di baliknya. Gimana caranya biar AI ini" berpindah-pindah dan menimpa jendela: "Gimana caranya biar" duduk di tepi bawah jendela (setengah di dua bidang), "AI" menimpa placeholder "Reply to Claude…" (f1060). Perbaiki: narasi tetap di satu posisi di ruang gelap di bawah jendela (seperti "ngebalik." f985), dan push kamera ke tabel brief dibatasi supaya ruang gelap itu tetap ada (jendela tidak menutupi pita narasi). Placeholder disembunyikan setelah kirim. Satu permukaan: tidak ada huruf yang setengah di jendela, setengah di latar.

D. **B7 57,6–72,2 desktop agen** (D-418, D-419; keluarga gelap-glow D-426). Hapus papan node gelap + tokoh pixel kecil + panah goresan putih (D-419). Ganti dengan desktop hitam + glow, tiga jendela app ASLI dengan logo asli: ChatGPT/Codex "session A" kiri, Claude tengah, ChatGPT "session B" (masuk belakangan dari kanan, mendorong yang lain). Papan skill-development (tab LANTAI, kartu kiblat, RESEP, orkestrasi, DESAIN) jadi panel dok di bawah. Jendela aktif di depan dan tajam; yang lain di belakang, sedikit buram (3 lapis). Glow per jendela mengikuti merek (Claude oranye, ChatGPT putih-hijau lembut). Masuk adegan dengan mosaik glitch seperti B. Avatar tiap jendela = tokoh pixel kecil dengan emosi (`emotions()` KarakterPixel). Urutan mengikuti ucapan (onset dari words.json):
   - 57,6 "Kayak yang kalian lihat ini.": desktop muncul.
   - 59,2 "Bahkan ChatGPT bisa koordinasi ke Claude.": ChatGPT mengetik "Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK.", tombol kirim menekan, pesan meluncur busur (`land`) ke jendela Claude; avatar Claude **bete**.
   - 61,6 "Claude bisa dikoordinasi sebaliknya.": Claude membalas "Revisi kamera selesai, lima still tersedia.", meluncur ke ChatGPT; avatar Claude **lega**.
   - 63,3 "Bahkan ChatGPT dengan session yang berbeda pun bisa koordinasi untuk meminimalisir kesalahan yang sama.": jendela session B masuk; catatan "Dicatat: jangan menyalin, pakai tautan supaya tidak terulang" mendarat ke tab di panel dok.
   - 68,8 "Sehingga ada loop pembelajaran yang terjadi di sini.": kamera mundur memperlihatkan semuanya, jalur pesan menyambung jadi satu lingkaran (titik berjalan), centang pop, avatar ChatGPT **senang**.
   Kamera selalu bergerak mengikuti pesan (geser lateral, push 3–7 % per 0,5 dtk; kartu 63). Narasi putih menempel di dekat jendela aktif di ruang gelap, satu permukaan, bukan pita bawah tetap dan tidak menimpa UI. Batas masuk/keluar adegan (frame potong di waktu.py) TETAP.

E. **B8 72,3–76,4 meja 100%** (D-420). Blender `lego/blender/scene.py` (binari `/dev/shm/b10a-blender-5.2-runtime/blender`; keluaran slot `/mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov`). Claude bata **menghadap monitor**, terlihat dari belakang/samping (3/4 belakang), hanya ±setengah badan di tepi kiri/kanan frame sebagai lapis depan, tangan bergerak mengetik/menggeser; kamera **fokus ke monitor**: wajah Irfan di timeline, push-in pelan kontinu (±1,15–1,3× sepanjang adegan, `drift`), bokeh ringan pada Claude. Teks "100% FULL AI" tetap waktunya; posisinya menempel monitor (dunia), tidak menutup wajah di timeline. Emosi **fokus bekerja**.

F. **B9 76,5–83,8 IG** (D-414; contoh gagal 10–11). Kondisi sekarang: tulisan tangan sudah hilang, latar #ECECEC, "Udah" sudah di dalam video. Masih gagal: "profesional" (f2360) dan "skill" (f2470) di pita hitam; "Comment" (f2428) di latar abu di bawah kartu, menyentuh batas bawah.
   (a) SEMUA narasi B9 ("Udah kerasa", "video editing", "profesional", "nggak?", "gak? Atau", "masih kerasa AI?", "Comment di bawah.", "Nanti aku kasih", "skill gratis", "bagi yang beruntung.") di DALAM bidang video postingan, di ruang kosong dinding (kanan atas kepala, atau kiri bawah tepat di atas pita hitam). Tidak boleh di pita hitam, tidak di bawah kartu. Gaya dan warna KT tetap; "profesional" tetap koral 800.
   (b) "Comment di bawah." (80,8): kamera mundur memperlihatkan postingan utuh (video + panel komentar). Teks ada di dalam video, dan kolom komentar berdenyut biru 2× (ring biru IG) sehingga mata bergerak dari teks ke kolom. Kamera dunia IG ronde 6b disesuaikan. Saat kamera diam, tidak ada teks UI yang terpotong tepi (sekarang "Add a com…" terpotong di f2360).
   (c) Pop komentar: "masih kerasa AI slop" pop pelan + getar kecil; "Keren editan profesional" pop + hati merah memantul.

## FILE BOLEH
`lego/bangun.py`, `lego/teks.py`, `lego/waktu.py` (hanya bila adegan yang disebut butuh), `lego/blender/scene.py` + keluaran slot b10a, `remotion/src/video/**`, `remotion/src/komponen/**`, `remotion/public/**` (aset logo/font baru), turunan lego (`lego/*.json`, cache lapisan), `qc/master_gambar.mp4`, `qc/r5/**`, `objects.json`, `teks.json`, `handoff/REPORT-R5-visual.md`.
FILE JANGAN: `edit/*` (suara terkunci), `audio/*`, `DECISIONS.md`, `RESEP.md`, `evaluation.md`, `out/*`, skrip bersama `claude/motion-graphic/scripts/*`, proyek lain.

## LARANGAN (dari LANTAI/DECISIONS, untuk adegan ini)
- Nol crossfade/fade sebagai transisi; masuk dari arah atau berubah bentuk; kurva dari `curves.ts`, durasi dari jarak (B13, B13a; `motion_lint` PASS).
- Teks hanya dari ucapan; tiap kata ucapan tampil, satu lapisan, maks 2 baris, tidak terpotong tepi, kontras ≥ 4,5:1 (A1–A8).
- Satu fokus per momen; dua teks sama kuat bersamaan = gagal (C14); tepi frame bersih 5 % (C16).
- UI dan logo asli (D20); tanpa placeholder (D22).
- Teks blok berakhir paling lambat frame sebelum potongan adegan; satu blok narasi per waktu (kartu 83 catatan pakai).
- Jangan ubah KT wajah, slab, cincin, label, B2, B4, B6 selain yang disebut.

## LULUS BILA
1. Still resolusi penuh di `qc/r5b/`: B f1000/f1035/f1060/f1080; D 8 still (58, 60, 62, 64, 66, 68, 70, 71,8 dtk); E f2170/f2200/f2240/f2285; F f2300/f2330/f2360/f2400/f2425/f2440/f2470/f2500. Plus strip 1-frame tiap transisi masuk/keluar D, E, F (frame potong dari waktu.py ±4 f). Kamu sendiri sudah melihat semuanya dan menulis satu baris per still di REPORT: yang terlihat + emosi yang terbaca.
2. Gerbang: `cek_master --ulang` PASS, `cek_sinkron` PASS, `cek_tumpuk` irisan 0, `kt_check --w 1920 --h 1080` PASS, `motion_lint` PASS, `tsc` exit 0, `revisi_cek` LULUS, `base_pts.py lego/lego.json` PASS.
3. Master 2512 frame, 83,817 dtk.

## JANGAN
render final, mengubah audio/suara, commit/push git, mengubah A/C/G atau adegan lain di luar D/E/F/B-narasi, menilai "lulus" tanpa melihat still.

## LAPORAN
`handoff/REPORT-R5b-visual.md`: per butir (B-narasi, D, E, F): file yang diubah, alasan desain (kartu + frame kunci), emosi + gerak pembawa, path still; gerbang (20 baris log terakhir); penyimpangan + alasan. Bila waktu/jatah habis, selesaikan butir yang sedang dikerjakan sampai master lulus gerbang, lalu laporkan sisa. Laporan balik ≤ 25 baris.
