# REVIEW v22: teks VO berkedip dan terburu-buru (worker, 3 Nov)

Brief: `WORKER-BRIEF-V22.md` (Irfan 3 Nov 05.31). LOCKED.md tetap berlaku: tidak ada bagian terkunci yang disentuh (cat BERLOMBA-LOMBA, grid 02b, langit 02e, Geist 500/600, tanpa scrim).

## Akar masalah (terverifikasi dengan probe DOM setiap frame, bukan dugaan)

Probe `seg2_probe.mjs <dir> 0 133 1 0.1` pada kode v21 (3984 frame), lalu `tools/text_flicker_check.py`:

1. **DIP = penyembunyian per frame, ada dua sumber.**
   - CSS `body:has([data-emph]) [data-caption]{visibility:hidden}` memadamkan blok VO di setiap frame yang memuat teks penekanan. Contoh: «It is a legitimate» hilang f2162–2167 saat «single» muncul sebentar, lalu tampil lagi f2168. Pola yang sama terjadi pada «Tanpa» (f319–330, SADAR).
   - Mask `busy`/`emph` (sampel 2 f) di `KineticVO` (`if (inEmph||inBusy) return null`) berlubang di tengah blok. «Dan hari» hilang f2494–2503, «prompt» hilang f2624–2637.
2. **Terburu-buru.** Frasa dipotong per 32 karakter dan jeda > 0,35 dtk. Hasilnya 40 blok, median 1,63 dtk, dan 17 blok tampil < 1,5 dtk. Contohnya «apakah» 12 f, «adalah» 13 f, «membuat» 7 f. Animasi keluar 7 f sering mulai sebelum kata terakhir selesai diucapkan.
3. **Teks penekanan (AnchorWord/SpeakerWords) tidak berkedip**: temuan (d) = 0 sebelum dan sesudah. Kedip yang Irfan lihat berasal dari teks VO.

## Angka gerbang per frame (3984 frame)

| temuan | v21 | v22 |
|---|---|---|
| (a) DIP | 4 | **0** |
| (b) CEPAT | 7 | **0** (+4 dikecualikan, beralasan) |
| (c) DULUAN HILANG | 6 | **0** |
| (d) KEDIP PENEKANAN | 0 | **0** |
| blok VO tampil | 40 | 26 |
| median lama tampil | 1,63 dtk | 2,07 dtk |
| blok < 1,5 dtk | 17 | 5 |
| hilang < e + 0,25 dtk, termasuk serah terima (ketat) | 20 | 16 |
| `seg2_layout_check` CLASH | 18* | **0** |
| `seg2_layout_check` SAFE non-VO / CONTR non-VO | 5 / 38 | 5 / 38 (tidak berubah) |
| SAFE / CONTR teks VO | tak terukur* | 0 / 9 (3,6–4,5:1, still 0,1×) |

\* Kotak probe teks VO v21 = wadah 1920×1080. Akibatnya CLASH/SAFE teks VO v21 tidak bermakna. Di v22 kotak probe = gabungan glyph.

Laporan lengkap: `qc-v22/flicker_v21.md`, `qc-v22/flicker_v22.md`, `qc-v22/layout_v22.md`, tabel blok `qc-v22/blocks_v2{1,2}.json`. Contact sheet still 0,5×: `qc-v22/sheet_{12,28,63,103,117}.jpg`.

**Tafsir (c) yang dipakai alat.** Brief perbaikan menyebut blok diam «sampai VO selesai + ≥ 0,4 dtk, ATAU sampai blok berikutnya mulai». Karena itu, blok yang diganti langsung (≤ 2 f) oleh blok VO berikutnya, teks penekanan, atau cut adegan **setelah** kata terakhirnya selesai diucapkan dihitung sebagai serah terima. Yang tetap dihitung temuan (c):
- blok hilang sebelum kata terakhir selesai diucapkan;
- blok hilang ke layar kosong sebelum e + 0,25 dtk;
- animasi keluar dimulai sebelum e.

Hitungan ketat tanpa serah terima tercantum di baris statistik.

**Pengecualian (b)**: empat blok terjepit di antara dua penekanan atau di antara cut dan penekanan. Keempatnya tampil sepanjang seluruh ucapannya, jadi tidak bisa lebih lama tanpa menabrak penekanan.

| blok | lama tampil |
|---|---|
| «membangun» | 18 f |
| «untuk mengambil» | 24 f |
| «It is a legitimate» | 28 f |
| «AI yang» | 19 f |

Alasan per blok ada di `ALLOW_B`.

## Perubahan kode

- **`lib/CaptionTrack.tsx`**
  - CSS `:has` dihapus, baik di sini maupun di KineticVO.
  - `HIDE_IV`: interval penekanan + busy di-debounce. Celah < 15 f digabung, penekanan < 6 f diabaikan, dan jendela teks VO < 18 f ikut disembunyikan. Pad 0 karena `captionMask.emph` kini tepat per frame.
  - `buildPhrases` mengelompokkan per klausa/kalimat:
    - putus keras: ganti sumber, penekanan, atau cut adegan;
    - putus lunak: tanda baca atau jeda;
    - klausa > 56 karakter atau 9 kata dipecah seimbang di jeda/koma;
    - blok yang terlalu pendek digabung dengan tetangga, atau digabung lalu dipecah ulang.
  - Blok diam sampai blok berikutnya mulai (jembatan ≤ 45 f) atau sampai e + 1,2 dtk.
  - Ekor: pita busy tidak memotong blok sebelum e + 9 f.
  - `MANUAL_SKIP` f1150–1176 «kita juga tidak», sama seperti keputusan v21.
- **`lib/KineticVO.tsx`**
  - SPEC dicari lewat teks blok (bukan indeks). Posisi diwarisi dari v21, baris disesuaikan.
  - Rotasi lay/enter/exit ≤ 2× berturut-turut.
  - Keluar ≤ 6 f dan mulai ≥ akhir ucapan.
  - Blok berikut di tempat sama yang mulai ≤ 8 f setelah VO selesai: swap (cut, tanpa keluar + masuk).
  - Blok di tempat lain: tumpang ≤ 6 f.
  - Probe mencatat `blk=<id> ex=<0..1>` dan kotak glyph.
  - Empat blok digeser masuk safe zone (Tingkat 0): «membangun», «yang membosankan…», «kita bisa fokus…», «Sebagian…ditepati».
  - Blok tidak ditampilkan:
    - «kita lagi» dan «dia punya»: jendela < 18 f;
    - «Dan hari»: 11 f sebelum busy, dan di v21 malah DIP;
    - 03a–03b: sama seperti v21.
- **`lib/captionMask.json`**: hanya kunci `emph` yang diganti, kini per frame dari probe v21 (`caption_mask.py --emph-only --patch`). `lum`/`busy` tidak berubah.
- **Alat baru**:
  - `tools/text_flicker_check.py`: gerbang a/b/c/d;
  - `tools/kinetic_dump.mjs`: tabel blok dari kode → `blocks.json`.

## Sisa / untuk Claude utama

- Komposisi blok gabungan perlu dilihat mata di render 1080p (contact sheet `qc-v22/sheet_*.jpg` di 5 titik rawan):
  - «Dan perlahan yang kita bangun menjadi cukup besar» berada di tengah, di atas garis putus-putus figur 03c (v21 juga menimpa figur);
  - «kita justru menginginkan hal tersebut terjadi» melintasi pan kamera 01d (drift v21 dihapus karena blok kini statis).
- CONTR teks VO 3,6–4,5:1 di 9 tempat («Pertanyaannya» di grid biru, «dibutuhkan» di kartu putih 05h, «dengan tools» di layar terang). Diukur dari still skala 0,1, jadi kasar. Di v21 angka ini tak terukur karena kotaknya selebar layar. Perlu dicek di render 1080p.
- f960 (zoom-out 02e): «Sebagian» menyentuh tepi kartu sekitar 0,3 dtk, sama seperti v21.
- Kerja probe: v22 penuh per frame + probe ulang f360–1050 sesudah geser safe zone. Jendela keluar/masuk tidak berubah (dibandingkan lewat `kinetic_dump`). Log gabungan diperiksa ulang: LOLOS.
- Jalur subtitle `CaptionTrack` (komponen) tidak dirender di Video.tsx, tetapi tetap dikompilasi dengan logika baru.
- Render final belum dilakukan, sesuai brief.
