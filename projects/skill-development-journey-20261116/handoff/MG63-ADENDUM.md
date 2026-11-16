# MG63-ADENDUM · gaya kartu 63 untuk dunia (c) · claude1 untuk Sutradara · 16 Nov
Sumber: kartu `pustaka/kartu/63-*.md` + 64 keyframe fps 2 dari `sumber/ref/ref-motiongraphic-irfan.mp4` (dilihat sendiri). Yang diambil hanya gaya; isi (invideo, podcast, senja) tidak dipakai. DESAIN.md menang bila bentrok; bentrok ditandai **[B]**. Angka "≈" = perkiraan dari frame 414 px (±0,24 %/px).

## §1 Bahasa visual (dunia c)
- Latar: foto/permukaan TAJAM penuh frame (tidak diburamkan), UI selalu menyisakan latar di 4 sisi. **[B]** DESAIN memakai halaman repo terang (B1), app terang (B3a), latar terang r1 (B5b); jadi "latar" di sini = permukaan itu sendiri, prinsip tetap: latar tajam, UI satu objek mengambang.
- Jendela utama: 56–60 % lebar × 57–61 % tinggi (1075–1150 × 615–660 px), utuh, tidak terpotong tepi. Saat ada panel samping: jendela 42–47 % lebar, panel 39–40 %.
- Bingkai macOS: radius ≈ 1,5 % tinggi frame (≈16 px), title bar tipis ≈ 2,5 % tinggi, 3 titik lampu kiri; tanpa stroke tebal.
- Kedalaman 3 lapis: latar → jendela (bayangan lembut, blur ≈ 4–5 % tinggi = 40–60 px, offset-y ≈ 1 %, opasitas 0,25–0,35) → lapis depan (panel/kursor/karakter).
- Palet: satu aksen saja (ref: oranye `#E4550F`). Untuk kita: aksen = oranye Claude `#D97757` di B3a, hijau `#1A7F37` hanya untuk "selesai", coral hanya slop. Tidak ada warna ketiga di layar UI.
- Tipografi UI: Inter 1,5–2,7 % tinggi (16–29 px) = tekstur, tidak harus terbaca; teks yang HARUS terbaca dibuat terbaca lewat kamera (punch), bukan dengan memperbesar elemen.
- Kursor: panah macOS putih bertepi hitam ≈ 3 % tinggi (≈32 px), bergerak `heavy` menuju target, klik = skala 1→0,85→1 dalam 4 f.
- Kerapatan: 1 subjek besar + 0–1 panel + kursor = maksimal 3 objek berbobot per frame; elemen kecil UI tidak dihitung.
- Dock (ref 16 % × 33 %, bawah ≈ 94 % y) opsional; bila dipakai, ikon asli, tidak bertabrakan dengan lingkaran wajah.

## §2 Gerak
- Kamera tidak pernah diam: push lambat 3–7 % per 0,5 dtk (`drift` saat hold, `heavy` saat push bertujuan); diam total maks ±2 dtk dan hanya saat isi UI sedang berubah.
- Punch-in ke teks kunci: 1,4–1,8× dalam 8–12 f `heavy`, tepi jendela + latar tetap terlihat; keluar punch = pull 1,0× 10–15 f `heavy`.
- Pan lateral: jendela geser +17–20 % lebar saat panel masuk dari samping (`land` 10–14 f), kembali −30 % saat panel keluar (`leave`, `exitDur`).
- Pull 3–11 % saat babak baru dimulai (`heavy` 12–18 f).
- Masuk elemen: dari blur + transparan ke tajam ±6 f (`reveal`); kartu/daftar tumbuh dari titik asalnya (anchor = kolom ketik / tombol), bukan fade di tempat.
- Keluar elemen: `leave`, 0,65× durasi masuk, tidak mengendap.
- Ganti layar: transisi 0,3–0,5 dtk (9–15 f), `whip`. Ref memakai mosaik piksel/wash; **[B]** DESAIN: transisi khas = push-through + motion blur (kartu 83) — itu yang dipakai, mosaik TIDAK.
- Motion blur hanya di punch/push-through/whip (shutter ≈ 180°); gerak lambat tanpa blur.
- Ritme: ±0,7 event visual/dtk (41/menit); tiap 2–3 dtk ada perubahan bermakna (klik, item, pesan, punch). Mengetik ±12 huruf/dtk.

## §3 Per adegan
**B1 dunia repo**
- Lakukan: halaman repo + panel timeline = satu dunia; panel timeline ≈ 56–60 % lebar, rata tengah-kiri (pusat x ≈ 44 %) agar tidak menabrak lingkaran wajah (x 1460–1840, y 660–1040).
- Track timeline bergaya ref: 3 track warna lembut (merah/kuning/teal) + playhead tipis; klip berlapis tinggi ≈ 3 % frame.
- Kamera: pull 5 % saat dunia terbentuk, lalu push `heavy` ke Clawd → centang (sesuai DESAIN).
- Clawd = lapis depan (lapis 3) di atas panel, bayangan jatuh ke panel.
- Jangan: memburamkan halaman repo; memotong panel di tepi frame.
**B3a/B3b app Claude**
- Lakukan: jendela app terang utuh 56–60 % lebar dengan bingkai macOS + bayangan lembut di atas latar tajam; **[B]** ref UI gelap, DESAIN terang → terang menang.
- "/" diketik kursor/caret; daftar tumbuh dari kolom ketik ke atas (`reveal` 6 f), item baru muncul saat diucapkan.
- Punch 1,4–1,6× ke daftar + kolom ketik saat `/apple-style`; teks item terbaca ≥ 6 % tinggi via kamera, bingkai jendela masih terlihat.
- B3b: item `leave` bergiliran 4–5 f per item; tahan 0,6 dtk dengan drift, caret "/" berkedip 0,5 dtk.
- Jangan: kotak kaca/tema gelap; memisahkan daftar dari jendela lalu memperbesarnya sendiri (UI = satu objek); teks kinetik di atas UI.
**B4b kartu paket**
- Lakukan: kartu = mini-jendela UI (radius ≈ 16 px, bayangan lembut 3 lapis seperti §1), lebar ≈ 22–26 % frame, miring 3D ≤ 8°.
- Masuk `land` 12 f dari sisi bahu + blur→tajam; angka count-up setelah mendarat (`heavy`).
- Push kamera 3–5 % selama kartu tampil.
- Jangan: stroke tebal, glow, warna aksen kedua selain logo asli.
**B5b dua jendela**
- Lakukan: dua jendela berdampingan masing-masing ≈ 40–42 % lebar (total ≈ 84 %, celah ≈ 3 %), latar terlihat di 4 sisi; **[B]** ref = satu jendela besar 56–60 %; DESAIN (dua jendela r1) menang.
- Kamera ikut pesan terbaru: pan + push 1,15–1,3× ke jendela yang menerima pesan (`heavy` 12–15 f), lalu pull kembali ke dua jendela sebelum amplop terbang.
- Pesan: indikator mengetik 0,4–0,6 dtk → bubble `reveal`; satu pesan baru per 2–3 dtk.
- Clawd/Codex di lapis 3 (depan jendela, bayangan ke jendela), ukuran 15–20 % tinggi.
- Jangan: menggeser jendela keluar frame; memperbesar bubble terpisah dari jendela; panah/garis biru.

## §4 Menyatukan (a)(b)(c)
- Wajah → dunia c: push-through kamera ke wajah (`whip` 9–12 f, motion blur), di puncak blur dunia c sudah di bawah; wajah menyusut jadi lingkaran (`heavy` 18 f).
- Lingkaran wajah: diameter 380 px, pusat (1650, 850), tepi putih tipis 4 px + bayangan sama dengan jendela; tidak pernah ditutupi UI. Kembali ke wajah = lingkaran membesar (`heavy`) + push-through.
- Karakter di dunia c = lapis 3 (di depan UI, di belakang kursor), menerima bayangan dengan arah sama dengan bayangan jendela; tidak ditempel datar di dalam UI.
- Satu arah cahaya/bayangan (atas, sedikit kiri) di dunia b dan c supaya terasa satu ruang.

## §5 Cek lulus (dari still)
1. Jendela UI utuh, latar terlihat di keempat sisi; lebar 56–60 % (B5b: tiap jendela 40–42 %).
2. Latar tajam; bayangan jendela lembut terlihat; tidak ada stroke tebal.
3. Lingkaran wajah (1650, 850, d 380) tidak bertabrakan dengan jendela atau karakter.
4. Tiap still dunia c punya ≤ 3 objek berbobot dan satu aksen warna.
5. Still punch (B3a, B5b) menunjukkan teks kunci ≥ 6 % tinggi DAN tepi jendela masih terlihat.
6. Karakter berada di depan UI dengan bayangan jatuh ke UI.
7. Dua still berurutan berjarak 0,5 dtk di shot > 2 dtk selalu berbeda skala/posisi kamera (kamera tidak diam).
8. Tidak ada mosaik/tema gelap/panel kaca (bentrok DESAIN).
