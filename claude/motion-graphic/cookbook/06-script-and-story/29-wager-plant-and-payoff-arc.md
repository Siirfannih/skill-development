---
id: "29"
pola: Wager Plant and Payoff Arc
kategori: script
kategori_lain: [layout, typography]
trigger: studi kasus klien atau proyek yang punya taruhan atau janji untuk dibayar di akhir; cerita proses dengan hasil angka; kata benda di naskah yang bisa difilmkan harfiah
sumber: studio kreatif, cerita taruhan kepala dicukur (file kiriman Irfan `siirfannih_Dc_0o-nIKYF.mp4`, penutup "Camp Studios") · 4:3 · 73,2 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 29 · Wager Plant and Payoff Arc

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target. Untuk kartu kategori script ini, blok T berupa pola struktur atau beat, dengan mekanik Remotion pendamping.
> Sumber: `siirfannih_Dc_0o-nIKYF.mp4` (folder asal: Storytelling:Talkinghead/Story-context) · 4:3 (960×720), 23,976 fps, 73,2 dtk · analisis asal: canvas-skill-library LOC-de41eff6e777; data ukur `ukuran.md` · Frame: `../../guide/referensi/sheets/29-team-story-analogy.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/29-k1-wajah-teks.jpg` … `29-k8-kartu-akhir.jpg` (k2 benda analogi, k3 b-roll + kata, k4 UI + label, k5 kartu judul, k6 grafik overlay, k7 checklist atas)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/local-videoanalys-20261102/Storytelling:Talkinghead/Story-context/siirfannih_Dc_0o-nIKYF.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran; bedah geraknya sebelum meminjam teknik)

**Inti mekanik (1 kalimat):** Taruhan dipasang di detik 5, ditagih di detik 51, dibayar di detik 67; di antaranya tiap kata benda kalimat difilmkan harfiah (mangkuk air untuk "pool", bola diambil untuk "memilih") dengan caption rata kiri-kanan yang bertambah kata demi kata.
**Narrative trigger:**
- Taruhan atau janji dipasang di 10 % pertama video dan harus dibayar di akhir → T1
- Kata benda atau kata kerja yang bisa digambarkan harfiah dengan benda nyata → T2
- Titik tanya "tapi kenapa?" sebelum inti masalah → T3
- Deretan syarat atau metode lalu perjuangan trial and error → T4
- Penagihan taruhan, tegangan sebelum hasil → T5
- Hasil angka lalu pembayaran dan CTA → T6
**Jangan dipakai untuk:** penjelasan teknis panjang, talking head murni, konten tanpa hasil atau taruhan yang bisa dibayar.
**Kata kunci gaya:** dokumenter studio, harfiah, cepat, hangat-teal, caption rata penuh, taruhan
**Diambil untuk:** **struktur cerita** (dibedah paling dalam: bagian 3 Ritme dan peta babak), lalu teks dan analogi benda.

## Kondisi footage asli
- 4:3, hampir 100 % b-roll (wajah bicara ≤ 6 shot), suara VO. Benda harfiah top-down di meja kayu (mangkuk, bola, kertas), set markas studio (meja, papan gabus, iMac, checklist; muncul ±8 kali), rekaman layar (Meet, IG, grid reels).
- 34 dari 49 shot terukur terkunci (tripod, top-down, layar); push-in pelan di 9 shot. Grade teal-oranye, vignette kuat, kayu `#492F1A`.
- Benda di tengah, tangan masuk dari tepi frame.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Grade teal-oranye, vignette (luma sudut 36–48 % luma tengah), tanpa grain; kartu judul `#152122` → `#03090C`; kartu akhir putih `#FEFEFE`. Aksen satu fungsi masing-masing: merah `#AC0004` ("But why?"), magenta `#CD1CD1` (garis retensi), navy `#030176` (kotak label UI). Teks putih.
### Teks
Sans bold rapat + serif italic untuk nama dan kata kunci; penekanan = ganti huruf, bukan ukuran (serif 4,7 % vs sans 3,9 %, rasio ±1,2). Satu kalimat 6–12 kata dalam 1–2 baris, **rata kiri-kanan penuh 5–95 % lebar**, celah antarkata lebar, pusat y 45–65 %. Masuk per kata di slot akhirnya dalam 1 frame; hilang bersama cut. Perkenalan orang: pita atas + label serif + panah tulisan tangan. Adegan UI: satu kata putih di kotak navy.
### Ritme
63 cut = 51,6/menit, shot median 0,9 dtk. Cepat: 20,9–22,6 dan 56–63. Lambat (2,7–3,2 dtk): mangkuk 9,8–12,5; checklist 35–38; grafik 45–48; telepon taruhan 51,6–54,8; CTA 69,3–72. Shot lambat membawa analogi atau titik balik, shot cepat membawa daftar atau bukti.

## Pola

### T1 · Early Wager Plant · script
- **Trigger:** taruhan, janji, atau pertanyaan terbuka di 10 % pertama.
- **Yang terlihat (termasuk gerak):** 0–7 dtk: "This is my boss *Simon*" → Meet "Simon X Dave X Max" → "a b.et." (kartu judul serif italic 22–26 %) → akun IG 0 post "could make this Instagram go *viral*" → "he'd shave his *head*" dengan panah tulisan tangan ke kepala. Taruhan dibuka, belum dijelaskan. (k1, k5; 0–7 dtk)
- **Kenapa bekerja:** taruhan visual dan lucu memberi pertanyaan terbuka yang membuat penonton bertahan sampai tagihan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage (rack focus) → pita atas → label serif → panah SVG.
  - Gerak: rack focus `blur(10px → 0)` ±14 f `CURVE.reveal`; panah digambar `strokeDashoffset` ±10 f; kartu judul vignette radial `radial-gradient`.
  - Ruang: push-in awal +50 % bertahap ±3 dtk (`CURVE.heavy`).
  - Blur & blend: DOF buram pembuka.
- **SFX:** pop di kemunculan kata/kartu awal (6,45 dtk, +37 dB di atas bed); padanan `pop up.mp3`. Kata senyap.
- **Pakai bila:** ada taruhan, tantangan, atau janji hasil. · **Jangan pakai bila:** tidak ada pembayaran di akhir (janji menggantung).
- **Remix (anti-jiplak):**
  1. Cerita toko UMKM → "kalau penjualan naik 2×, aku traktir semua"; label serif dan panah ke wajah pemilik.
  2. Latar terang → kartu judul krem, teks gelap.
  3. 9:16 → kartu judul 2 baris besar, panah ke bawah.
- *Pengamatan di video asli, bukan target:* periksa: judul serif k5 **35,7 % tinggi frame** (puncak b sampai baseline; kartu lama 22–26 %: dikoreksi); durasi total 0–7 dtk.

### T2 · Literal Object Analogy Caption · layout
- **Trigger:** kata benda atau kerja yang abstrak ("pool of creators", "pick", "throw to see what sticks").
- **Yang terlihat (termasuk gerak):** air dituang ke mangkuk kaca saat "pool of hundreds of creators"; lengan masuk diagonal dari kiri atas menutup sebagian mangkuk, bola hijau diambil saat "pick"; bola dilempar ke dinding saat "throw stuff to see what stuck". Caption 2 baris rata penuh x 5–95 %, y 44–55 %, menimpa tangan dan mangkuk. Mangkuk 22 × 30 % di tengah. (k2, k3; 9,8–13 dan 37–48 dtk)
- **Kenapa bekerja:** tiap kata benda diterjemahkan jadi benda nyata sehingga naskah abstrak jadi bisa dilihat; caption penuh lebar tidak bersaing dengan objek di tengah.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage top-down → caption (satu `<div>` `text-align: justify`, `text-align-last: justify`, 2 baris).
  - Gerak: kata muncul di slotnya dalam 1 f (`opacity` 0 → 1) sesuai timing kata; kalimat bertambah sampai penuh lalu hilang bersama cut.
  - Ruang: datar. Blur & blend: bayangan teks `0 2px 6px rgba(0,0,0,0.4)`.
- **SFX:** pop di aksi benda penting; kata senyap. Padanan `pop up.mp3`.
- **Pakai bila:** benda bisa difilmkan atau dibuat sendiri. · **Jangan pakai bila:** kata abstrak murni tanpa benda (jangan memaksa).
- **Remix (anti-jiplak):**
  1. Cerita kopi UMKM → "pilih biji" = tangan memilih biji dari mangkuk.
  2. UI SaaS → "banyak opsi" = grid kartu; tangan kursor memilih satu.
  3. Latar terang → meja putih, caption gelap.
- *Pengamatan di video asli, bukan target:* kata kunci serif 4,7 %, kata sambung 3,9 %; kata kunci : sambung ±1,2.

### T3 · Why-Question Pivot · script
- **Trigger:** setelah memperkenalkan tokoh, sebelum inti masalah; pertanyaan penonton.
- **Yang terlihat (termasuk gerak):** 13–19 dtk tokoh (wajah remaja, ladang, peta; bola hijau diambil dari mangkuk), lalu 19–30 dtk "But *why?*" (kata merah 12,4 % tinggi frame, kiri atas, papan 但是为什么) → "the *hardest* part of building any brand is getting people to actually *care*" → "selling *Christmas trees* in July" (pohon mini + kartu JULY). (k1; 13–30 dtk)
- **Kenapa bekerja:** satu pertanyaan merah memutus alur cepat; lalu inti masalah diterangkan dengan analogi absurd yang mudah diingat.
- **Mekanik Remotion (titik awal):**
  - Lapisan: wajah/footage → kata merah → caption.
  - Gerak: "But" masuk `scale` 1,3 → 1 `CURVE.land` ±6 f; tahan 12 f; lalu cut.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** hit rendah pada kata tanya bila itu puncak; padanan `Move.mp3`. Selainnya senyap.
- **Pakai bila:** ada alasan "kenapa" yang tidak jelas dari sisi klien. · **Jangan pakai bila:** pertanyaan sudah terjawab di kalimat yang sama.
- **Remix (anti-jiplak):**
  1. Cerita jasa → "Tapi kenapa?" merah, jawaban dengan analogi dapur.
  2. Latar gelap → kata tanya putih berpendar.
  3. 9:16 → kata tanya memenuhi atas, kalimat di tengah.
- *Pengamatan di video asli, bukan target:* periksa: tinggi "But" **12,36 % tinggi frame** (kartu lama 10,0 %: dikoreksi).

### T4 · Checklist to Pattern Reveal · layout
- **Trigger:** daftar syarat atau metode, lalu perjuangan trial and error yang akhirnya menemukan pola.
- **Yang terlihat (termasuk gerak):** 30–37 dtk: checklist ditulis tangan di meja top-down ("understand *social* media / can *write*, *film*…"; 1 kata 11,1 % serif di kiri, kertas 24 × 44 % di antara benda kecil); 37–48 dtk: bola dilempar, "A lot didn't" di dinding kosong → "slowly started seeing *patterns*" grafik retensi magenta 55 × 21 % di atas wajah, garis melintas sekitar mulut (periksa: bagian datar di mulut, bukan di mata seperti keterangan kartu). (k6, k7; 30–48 dtk)
- **Kenapa bekerja:** metode ditulis di depan mata; garis grafik menggambarkan "pola" dan menggantikan ucapan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → grafik garis SVG (`strokeDashoffset`) → caption.
  - Gerak: garis tergambar `CURVE.reveal` ±30 f; kotak label navy 8,9 % tinggi frame (periksa) muncul 1 f.
  - Ruang: datar; push-in +10 % `CURVE.heavy` selama 3 dtk.
  - Blur & blend: tanpa.
- **SFX:** senyap atau satu `pop up.mp3` di item checklist tebal.
- **Pakai bila:** ada data retensi atau tren nyata. · **Jangan pakai bila:** grafik karangan.
- **Remix (anti-jiplak):**
  1. Toko → grafik penjualan di atas foto produk.
  2. UI SaaS → kursor mencentang daftar.
  3. Latar terang → garis warna aksen gelap.
- *Pengamatan di video asli, bukan target:* periksa: kotak navy **8,89 % tinggi frame** (kartu lama 6,2 %: dikoreksi); kertas 24 × 44 %.

### T5 · Wager Call-In Silence · script
- **Trigger:** penagihan taruhan; tegangan sebelum hasil.
- **Yang terlihat (termasuk gerak):** 48–55 dtk "*1 month left*" → Meet lagi, "a bet." lagi (musik berhenti 51,25–54,4) → "If you guys go *viral* I'm gonna shave my *head*"; telepon taruhan 51,6–54,8 dengan push-in +10 %. (48–55 dtk)
- **Kenapa bekerja:** musik berhenti membuat taruhan terdengar serius; pengulangan kartu "a bet." mengingatkan penonton.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → kartu → caption.
  - Gerak: push-in 1,00 → 1,10 `CURVE.heavy` ±75 f; volume musik 1 → 0 dalam 6 f lalu naik lagi 6 f di 54,4 dtk.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** hit sub di taruhan (53,56 dtk, +37 dB); padanan `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` atau `Move.mp3`.
- **Pakai bila:** ada tagihan janji. · **Jangan pakai bila:** tanpa janji sebelumnya.
- **Remix (anti-jiplak):**
  1. Jasa → "tersisa 7 hari", musik berhenti, kartu "janji" diulang.
  2. Latar terang → kartu putih.
  3. 9:16 → kartu penuh.
- *Pengamatan di video asli, bukan target:* musik berhenti 3 kali di 51,25–54,4 dtk.

### T6 · Payoff Then Dry CTA · script
- **Trigger:** hasil angka lalu pembayaran dan ajakan.
- **Yang terlihat (termasuk gerak):** 55–66 dtk hasil (seri, peta, 618K/722K/208K dengan ikon mata, "more people *followed along* because they *felt* part of it"); 66–72 dtk "And *Simon's* head?" → shot hitam-putih kepala dicukur (push-in +51 %) → "leave a *comment* if you want to see our *case* study" (musik mati 69,3) → kartu putih logo. (k8; 55–72 dtk)
- **Kenapa bekerja:** taruhan dibayar dengan gambar; CTA tanpa musik terdengar jujur.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage hitam-putih → caption → kartu putih.
  - Gerak: push-in 1,00 → 1,5 `CURVE.heavy`; angka tayangan counter 0 → akhir ±24 f; musik mati 24 f.
  - Ruang: datar. Blur & blend: grayscale 100 %.
- **SFX:** pop pada angka; musik mati di CTA.
- **Pakai bila:** ada pembayaran visual yang lucu. · **Jangan pakai bila:** hasil belum ada.
- **Remix (anti-jiplak):**
  1. Brand → pembayaran = pemilik benar-benar mencukur kumis; hitam-putih.
  2. Latar gelap → kartu akhir hitam.
  3. 9:16 → CTA satu kalimat.
- *Pengamatan di video asli, bukan target:* 63,5–66,5 dtk push +27 %.

## Audio (bila dibedah)
earshot: 454 event (6,2/dtk), 96 bertag (51 UI/pop, 12 hit sub-bass, 3 foley, 2 whoosh, 2 riser). Aksen terkuat: pop 6,45 dtk dan 53,56 dtk (+37 dB). Musik funk ±123 bpm, berhenti 3 kali di 51,25–54,4 dan mati di 69,3 dtk. Mix −14,2 LUFS, TP +1,9 (clip), LRA 3,2.

## Yang harus terasa sama saat disandingkan
- Taruhan terpasang cepat, ditagih di sekitar 70 %, dibayar di sekitar 90 %?
- Tiap kata benda terasa punya bendanya sendiri di meja, tidak ikon atau stok?
- Caption rata penuh dan kata kunci setinggi kata sambung (hanya ganti huruf)?
- Musik berhenti di momen tagihan dan mati di CTA?
- Aksen warna hanya sekali per fungsi?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
