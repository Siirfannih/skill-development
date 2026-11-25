---
id: "15"
pola: Light-Fill Caption Card
kategori: typography
kategori_lain: [layout]
trigger: potongan podcast atau talk berisi nasihat komunikasi; kalimat bijak tenang yang harus dipercaya; konten authority tanpa musik
sumber: kreator IG (nasihat komunikasi) · 9:16 (720×1280) · 41,2 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 15 · Light-Fill Caption Card

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `jefferson_fisher_DfA5xGzxFRy.mp4` · 9:16 (720×1280), 30 fps, 41,2 dtk · Frame: `../../guide/referensi/sheets/15-jefferson-fisher-card-caption.jpg` (1 frame per dtk) · Frame kunci: belum diekstrak (hanya contact sheet) · Bedah lengkap: `../../guide/referensi/jefferson-fisher.md` (kode J-T/J-X, komponen Remotion)
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/jefferson_fisher_DfA5xGzxFRy.mp4`
> Dilihat bergerak: **tidak** (hanya contact sheet 1 fps; angka dari bedah lama). Sapuan cahaya per suku kata belum dilihat frame demi frame; bedah sebelum dipakai.

**Inti mekanik (1 kalimat):** Footage tampil sebagai kartu rounded tetap di tengah layar hitam, dan caption kapital satu-dua kata di dada pembicara "terisi cahaya" dari redup ke putih mengikuti suara; kartu tidak pernah bergerak, hanya isinya yang berganti lewat hard cut.
**Narrative trigger:**
- Nasihat komunikasi atau kalimat bijak yang harus terasa tenang dan kredibel → T1
- Pembicara cepat: satu kata per kali → T2
- Penutup dengan ajakan mengikuti → T3
**Jangan dipakai untuk:** konten energi tinggi, tutorial UI, explainer grafis, adegan yang butuh ritme musik.
**Kata kunci gaya:** tenang, premium, monokrom, low-key, minimal
**Diambil untuk:** nama file tidak menyebut bagian; terkuat: kartu footage tetap + caption light-fill. Tidak diambil: isi kalimat dan CTA kreator.

## Kondisi footage asli
- 9:16, layar hitam murni `#000000`; kartu footage ≈ 7:6 (x 13–705, y 380–973 dari 720×1280), pusat di 53 % tinggi, radius ±3 % lebar kartu; area hitam atas ±30 % dan bawah ±24 % kosong.
- A-roll medium close-up: mata di sepertiga atas kartu, headroom kecil, dada terpotong, sweater gelap polos di tempat caption. Multicam (2 sudut pembicara + 1 lawan bicara), reverse shot profil, insert tangan/ponsel, stok B-roll ilustratif 2–5 dtk (subjek di tengah supaya caption jatuh di objeknya). Footage di-crop (cover), bukan di-fit.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Hitam murni; caption terisi `#FFFFFF`, sebelum terisi putih 55 % + tint dingin (≈ `#BFD3D6` @ 70 %). Grade low-key, kontras sedang, saturasi turun ±15 %, hampir monokrom. Tanpa grain.
### Teks
SF Pro Display Bold / Inter Bold, KAPITAL, tracking −1 %, rata tengah, cap-height ≈ 2,8 % tinggi frame, posisi tetap di ±50–55 % tinggi kartu (dada/dagu), tidak reset saat shot berganti; maksimal 2 baris, lebar ≤ 70 % kartu; tanda baca tampil. Tanpa stroke/box, soft shadow sangat halus. Tanpa scale/bounce/rotasi: satu-satunya gerak adalah cahaya.
### Ritme
Shot median 2,95 dtk, p90 4,6, ±20 cut/menit, 28 event visual/menit. Cold open langsung kalimat pertama; jeda senyap antar frasa; end card ±3 dtk (sheet: mulai ±38 dtk).

## Pola

### T1 · Left-To-Right Light-Fill Reveal · typography
- **Trigger:** kalimat tenang berisi nasihat; setiap kata harus terdengar jelas.
- **Yang terlihat (termasuk gerak):** kata muncul redup (putih 55 % + tint dingin) lalu sapuan cahaya kiri→kanan menjadikannya putih solid dalam 3–6 f mengikuti suku kata, tepi sapuan lembut ±15 % lebar kata; onset +0…+2 f dari VO. Frasa dibangun kata demi kata di baris yang sama lalu diganti sekaligus di cut atau frasa berikutnya ("DO YOU FEEL / A DIFFERENCE?"). Di sheet terlihat kata dengan sebagian huruf masih redup (mis. "TALKING", "PHONE").
- **Kenapa bekerja:** pembicara dengan sweater gelap memberi bidang polos untuk teks putih; satu-satunya gerak adalah cahaya sehingga perhatian tetap pada suara.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): kartu footage (cover, `overflow:hidden`, radius) → caption redup → caption terang di-mask.
  - Gerak: dua salinan teks; salinan terang memakai `mask-image: linear-gradient(90deg, #000 var(--p), transparent calc(var(--p) + 15%))`, `--p` 0→115 % selama 4–5 f `CURVE.reveal`; onset VO +1 f.
  - Ruang: datar. Blur & blend: bayangan lembut `text-shadow: 0 2px 24px rgba(0,0,0,.4)`.
- **SFX:** senyap (sumber tanpa SFX dan tanpa musik).
- **Pakai bila:** bidang polos gelap di dada dan caption ≤ 2 baris. · **Jangan pakai bila:** latar caption terang atau bermotif; tempo cepat sekali (T2).
- **Remix (anti-jiplak):**
  1. Kreator berbaju terang → caption gelap, isian dari abu ke hitam.
  2. Kartu persegi 1:1 di 16:9 → pertahankan kartu tetap dan caption di tengah kartu; latar abu `#111`.
  3. Quote tanpa wajah (foto produk) → caption terisi di atas foto tetap.
- *Pengamatan di video asli, bukan target:* cap-height ≈ 2,8 % tinggi frame; sapuan 3–6 f.

### T2 · Single-Word Fast Swap · typography
- **Trigger:** pembicara berbicara cepat; kata isi pendek berturut-turut.
- **Yang terlihat:** satu kata per kali, ganti tiap ±4–8 f, di posisi yang sama di dada; "YEAH", "MORE", "LESS", "DISTRACTED" di atas insert tangan/ponsel. (sheet 7–26 dtk)
- **Kenapa bekerja:** posisi tetap membuat mata tidak mencari; kata tunggal terbaca di kecepatan bicara.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → caption.
  - Gerak: tiap kata cut-in pada onset VO, light-fill dipersingkat 3 f; `key` per kata.
  - Ruang: datar.
  - Blur & blend: tanpa.
- **SFX:** senyap.
- **Pakai bila:** bicara > 4 suku kata/dtk. · **Jangan pakai bila:** kalimat harus terbaca utuh.
- **Remix (anti-jiplak):**
  1. Reel produk → kata manfaat tunggal di tengah foto.
  2. Latar terang → kata gelap.
  3. 16:9 → posisi di sepertiga bawah kartu.
- *Pengamatan di video asli, bukan target:* ±4–8 f per kata.

### T3 · Frozen Card Insert Cutaway · layout
- **Trigger:** cerita menyebut objek konkret ("phone", "friends") di tengah nasihat.
- **Yang terlihat:** kartu tidak bergerak, hanya isi berganti: reverse shot lawan bicara (profil, ruang kosong ke arah pandang), insert tangan dan ponsel, stok orang-orang yang memegang ponsel; subjek di tengah supaya caption jatuh di objek. Hard cut di akhir frasa atau di kata pertama frasa berikutnya; tanpa punch-in, zoom, whoosh. End card hitam, CTA kapital 2 baris ("FOLLOW FOR MORE / COMMUNICATION ADVICE") ≤ 3 dtk. (sheet 1–38 dtk)
- **Kenapa bekerja:** variasi datang dari multicam dan insert, bukan efek; kartu konstan menjaga ketenangan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: hitam → kartu tetap (`<Sequence>` per klip) → caption → end card (menggantikan kartu).
  - Gerak: hard cut pada frame onset frasa; kartu tidak punya transform.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** senyap; jeda senyap antar frasa tetap.
- **Pakai bila:** ada 2–3 angle atau stok ilustratif yang konsisten gradenya. · **Jangan pakai bila:** satu angle saja tanpa insert.
- **Remix (anti-jiplak):**
  1. Interview satu angle → insert foto produk dan layar sebagai ganti reverse shot.
  2. Latar terang → kartu di latar abu muda.
  3. 1:1 → kartu persegi dengan margin 6 %.
- *Pengamatan di video asli, bukan target:* ±20 cut/menit, shot median ±3 dtk.

## Audio (bila dibedah)
Tanpa SFX dan tanpa musik latar; hanya dialog bersih, room tone diredam. −17,8 LUFS integrated, LRA 5,3 LU, centroid ±1,7 kHz. Onset ±1,2/dtk berasal dari konsonan; ada jeda senyap antar frasa.

## Yang harus terasa sama saat disandingkan
- Kartu identik di setiap frame (posisi, radius, ruang hitam atas-bawah)?
- Caption terlihat sebagian redup sebagian putih, tanpa scale atau bounce?
- Posisi caption tidak berpindah saat shot berganti?
- Semua transisi hard cut dan tidak ada lower third, logo, atau ikon?
- Jeda senyap antar frasa terasa, tanpa musik?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
