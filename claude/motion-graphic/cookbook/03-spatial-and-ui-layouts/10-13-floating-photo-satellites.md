---
id: "10-13"
pola: Floating Photo Satellites
kategori: layout
kategori_lain: [typography]
trigger: memperagakan layanan atau isi feed tanpa karya nyata; adegan pembuka atau penutup yang lega; layar "pilih minat" atau pencarian dengan banyak hasil di sekeliling satu pusat
sumber: 4 still (situs studio desain, kampanye foto, aplikasi pencarian visual, onboarding komunitas) · landscape, bukan video
dilihat_bergerak: tidak
diukur: tidak
alias: []
---
# 10-13 · Floating Photo Satellites

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: empat gambar diam dari Irfan: 10 situs studio desain (thesoutline), 11 "Perspectives on Pride", 12 pencarian "Cosmos", 13 onboarding "gather" · still landscape, bukan video · Frame: `../../guide/referensi/sheets/10-thesoutline-floating-work.png`, `11-floating-photos-words.png`, `12-cosmos-search-orbit.png`, `13-gather-onboarding-tiles.png` · Frame kunci: tidak ada (keempat still ini sudah gambar tunggal) · Bedah lengkap: tidak ada (catatan di `../../guide/referensi/README.md`)
> Video sumber: tidak ada di mesin ini (hanya still)
> Dilihat bergerak: **tidak** (isi dari gambar diam; gerak di T1–T4 adalah usulan dari catatan Irfan "pop berurutan + drift pelan", bukan hasil pengamatan; dapatkan videonya sebelum meminjam teknik gerak)

**Inti mekanik (1 kalimat):** Satu pusat yang jelas (kartu, kolom pencarian, atau kalimat) dikelilingi foto-foto berbingkai yang tersebar dengan ukuran, kemiringan, dan blur berbeda sebagai kedalaman, di latar terang netral yang lega.
**Narrative trigger:**
- Memperagakan layanan atau isi feed ketika karya nyata belum ada (foto generik sebagai tekstur) → T1
- Judul atau tema pendek yang "dikelilingi" sudut pandang beragam → T2
- Fitur pencarian atau "temukan apa pun" dengan banyak hasil di balik kolom input → T3
- Layar pilih minat/personalisasi dengan pilihan berjejer dan tombol lanjut → T4
**Jangan dipakai untuk:** kiblat satu video utuh (tidak ada data ritme, kamera, suara), adegan padat informasi, kalimat panjang.
**Kata kunci gaya:** lega, editorial, terang, melayang, minimal
**Diambil untuk:** nama file tidak menyebut bagian; yang diambil: komposisi satu pusat + satelit foto sebagai kedalaman. Tidak diambil: isi foto, merek, dan UI aslinya.

## Kondisi footage asli
- Landscape, still. Latar terang netral (putih/abu sangat terang, 11 bertekstur kertas halus, 12 putih gading, 13 putih kehijauan pucat di panel membulat); sebagian besar frame kosong.
- Tiap still punya satu pusat; foto satelit lebar ±6–13 % frame. Warna hanya datang dari foto (kecuali 11: kotak warna datar kecil). Tidak ada pembicara.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Netral terang rata; warna dari foto saja. 11: kotak kecil warna datar (merah, oranye, kuning, hijau, biru, ungu, pink, cokelat, hitam) menempel di sudut foto. 12: kolom pencarian seperti kaca buram abu. Hex tidak terukur.
### Teks
Sangat sedikit: satu judul atau kalimat pendek. 10: dua baris, baris 1 hitam bold dan baris 2 abu, ±3 % tinggi per baris di ±35 % dari atas. 11: tiga kata sans regular hitam tersebar, tiap kata menempel di kiri sebuah foto, ±3–4 %. 12: placeholder abu ±4–5 %. 13: dua baris kecil ±1,5 % di kartu putih membulat. Cara masuk/keluar: belum dibedah.
### Ritme
Belum dibedah (still).

## Pola

### T1 · Depth-Scattered Photo Satellites · layout
- **Trigger:** memperagakan layanan atau isi feed tanpa karya nyata; pembuka atau penutup yang lega.
- **Yang terlihat (termasuk gerak):** satu kartu atau kalimat di tengah; di sudut, tangkapan layar dan foto dimiringkan, sebagian pucat dan buram (10, empat sudut), ±11 tile membulat beragam ukuran dengan yang di tepi memudar dan blur (13). Tidak bergerak di still. Catatan Irfan: pop berurutan lalu drift pelan, bukan semua muncul sekaligus.
- **Kenapa bekerja:** pusat paling tajam dan tengah; pudar dan blur di tepi memberi kedalaman tanpa menutup pusat.
- **Mekanik Remotion (titik awal, usulan):**
  - Lapisan (bawah → atas): latar → satelit tepi (blur 3–6 px, opacity 0,5) → satelit dekat (tajam, lebih besar) → pusat.
  - Gerak: tiap satelit `scale` 0,85→1 + `opacity` 0→1 selama 8 f `CURVE.land`, jeda tidak rata dengan `react(i, 30)`; lalu `drift(frame, 30, amp 6–14, seed i)` berbeda per satelit; kemiringan statis ±4–10°.
  - Ruang: ringan, `perspective: 1200px` bila satelit dimiringkan di sudut.
  - Blur & blend: `filter: blur()` bertingkat sesuai jarak dari pusat; bayangan lembut.
- **SFX:** `pop up.mp3` hanya untuk pusat; satelit muncul sebagai satu rentetan: satu `Pergantianfoto.mp3` dipotong panjang rentetan (bukan bunyi per foto).
- **Pakai bila:** pusat jelas dan ada ruang kosong luas. · **Jangan pakai bila:** pusat berisi teks panjang atau bersaing dengan foto yang lebih tajam.
- **Remix (anti-jiplak):**
  1. Jasa UMKM → pertahankan satu pusat + satelit buram · ganti foto dengan hasil produk klien, pusat berupa kartu paket.
  2. UI SaaS → satelit adalah tangkapan layar fitur yang dimiringkan di empat sudut, pusat berupa kalimat nilai.
  3. Latar gelap → ganti netral terang dengan arang `#1A1A1A`, satelit diberi tepi tipis terang.
- *Pengamatan di still, bukan target:* satelit lebar ±6–13 % frame; foto di tepi lebih pucat dari yang dekat pusat.

### T2 · Word Pinned To Photo · typography
- **Trigger:** judul atau tema pendek (2–4 kata) yang ingin terasa dikelilingi banyak sudut pandang.
- **Yang terlihat:** tiga kata ("Perspectives / on / Pride") tersebar, tiap kata menempel di kiri sebuah foto persegi panjang kecil bersudut tajam (delapan foto, ukuran seragam); kotak warna datar di sudut foto sebagai penanda. (11) Gerak: belum dibedah.
- **Kenapa bekerja:** kata menempel foto sehingga foto jadi bagian kalimat, bukan hiasan; pengulangan bingkai seragam membuat sebaran terbaca teratur.
- **Mekanik Remotion (titik awal, usulan):**
  - Lapisan: abu bertekstur → kotak warna → foto → kata (posisi relatif terhadap foto, bukan frame).
  - Gerak: foto muncul berurutan `opacity` 0→1 + `translateY` 10 px 6 f `CURVE.reveal`, kata menyusul 3 f sesuai ucapan; drift ±4 px.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** senyap per kata (KT); satu `Pergantianfoto:gambarpertama.mp3` bila foto pertama dibuka.
- **Pakai bila:** judul 2–4 kata dengan stok foto seragam. · **Jangan pakai bila:** kalimat panjang.
- **Remix (anti-jiplak):**
  1. Judul episode podcast → kata menempel di kiri foto tamu, bingkai bulat.
  2. Katalog produk → nama kategori menempel di foto produk.
  3. 9:16 → tersusun diagonal dari kiri atas ke kanan bawah.
- *Pengamatan di still, bukan target:* kata ±3–4 % tinggi; kotak warna ±2 % lebar.

### T3 · Glass Search Bar Over Photo Sphere · layout
- **Trigger:** fitur pencarian atau "temukan apa pun"; hasil beragam di balik satu input.
- **Yang terlihat:** bola berisi mozaik foto di tengah, kolom pencarian seperti kaca buram abu melintang di depannya ("Search Cosmos"), enam tile membulat berwarna (kiri 3, kanan 3) di sisi. (12) Gerak: belum dibedah.
- **Kenapa bekerja:** kaca buram menandai lapis depan tanpa menutup mozaik; tile samping memberi skala.
- **Mekanik Remotion (titik awal, usulan):**
  - Lapisan: putih gading → bola mozaik (mask `border-radius:50%`) → kolom kaca (`backdrop-filter: blur(16px)`) → teks.
  - Gerak: mozaik berputar pelan (`rotateY` 0→20° selama 120 f `CURVE.drift`); kolom `scaleX` 0,6→1 `CURVE.reveal` 10 f; tile samping `drift`.
  - Ruang: `perspective: 1000px`. Blur & blend: `backdrop-filter`.
- **SFX:** `Keyboardtyping.mp3` dipotong pendek bila placeholder diketik; `ES_User Interface, Click, Pops, Glass, UI, Pops` di hasil muncul.
- **Pakai bila:** hasil visual banyak dan seragam kualitasnya. · **Jangan pakai bila:** latar kolom ramai sehingga teks kaca tidak terbaca.
- **Remix (anti-jiplak):**
  1. Marketplace → bola diganti rak produk, kolom berisi "cari…".
  2. Latar gelap → kolom kaca gelap, teks putih.
  3. 16:9 → bola 55 % tinggi di tengah, tile di tiga kolom.
- *Pengamatan di still, bukan target:* placeholder ±4–5 % tinggi.

### T4 · Selection Tray Onboarding · layout
- **Trigger:** layar pilih minat dengan pilihan berjejer dan tombol lanjut.
- **Yang terlihat:** ±11 tile membulat beragam ukuran mengambang di panel membulat; baki bawah berisi 3 tile terisi + 2 slot kosong, label "Choose 2 more", tombol "Next" abu, kursor tangan di atas satu tile, titik halaman. (13) Gerak: belum dibedah.
- **Kenapa bekerja:** baki memberi bukti "terpilih" yang terlihat dan tombol mati tampak belum siap.
- **Mekanik Remotion (titik awal, usulan):**
  - Lapisan: panel pucat → tile mengambang → baki → kursor.
  - Gerak: kursor `arc()` ke tile 14 f, klik `scale` 0,94 3 f; tile terbang ke slot kosong 12 f `CURVE.land`; tombol "Next" berubah warna aktif 4 f setelah slot penuh.
  - Ruang: datar. Blur & blend: tile tepi memudar (`mask-image` gradient).
- **SFX:** `pop up.mp3` saat tile masuk slot; `Enter.mp3` pada tombol aktif.
- **Pakai bila:** pilihan visual yang bisa dihitung. · **Jangan pakai bila:** pilihan teks panjang.
- **Remix (anti-jiplak):**
  1. Aplikasi resep → tile makanan, baki "pilih 3".
  2. Latar gelap → panel gelap, tile bertepi cahaya.
  3. 9:16 → tile dua kolom, baki di bawah.
- *Pengamatan di still, bukan target:* teks kartu ±1,5 % tinggi per baris; tile ±6–13 % frame.

## Audio (bila dibedah)
Belum dibedah.

## Yang harus terasa sama saat disandingkan
- Satu pusat jelas di tengah, tidak ada foto yang lebih besar atau lebih tajam darinya (kecuali bola foto di belakang pusat)?
- Sebagian besar frame kosong dan latarnya terang netral?
- Foto tersebar tidak membentuk grid rapi; ukuran atau blur berbeda?
- Foto di tepi lebih pucat dari yang dekat pusat?
- Bingkai konsisten dalam satu adegan (semua membulat atau semua bersudut tajam), teks hanya satu kalimat pendek?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
