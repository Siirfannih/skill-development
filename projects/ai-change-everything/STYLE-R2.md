---
status: rule
scope: ai-change-everything
how_to_use: "Sistem warna, gradien, tekstur, dan karakter agent untuk storyboard v5 revisi R2 (Irfan 31 Okt 00:56). Dibaca sebelum mengubah panel. Menang atas B-03 untuk latar putih yang disebut di peta §5."
---

# Style R2 · gradien, tekstur, agent

Sumber: referensi Irfan di `references/r2-*.png` dan node canvas Basilisk "Wikipedia", "Maskot", "Refference", "Visual", "Collor", "Collor + text".
Semua hex diukur dari piksel referensi (ffmpeg rgb24, rata-rata 7×7 px), bukan ditebak. Referensi adalah contoh penerapan; yang diambil hanya resepnya, bukan merek, logo, atau karakternya.

## 1. Resep (kode)

### R-HZ · Horizon (dari `r2-gradient-horizon-ref.png`)
Malam → fajar biru. Dipakai untuk momen pembuka atau "teknologi naik".
```css
background: linear-gradient(180deg,
  #000000 0%, #020221 45%, #010C4C 55%, #022A87 62%,
  #165FC6 68%, #72B3F3 75%, #C5E3FB 84%, #7DBDFA 100%);
/* tekstur: bintang 1 px putih 20–35 % acak, kepadatan rendah, hanya di 0–55 % */
```
Teks: putih penuh hanya di zona 0–62 % (12,5–18 : 1). Tidak ada teks di pita 68–90 %.

### R-BP · Blueprint (dari node "Collor", "Collor + text")
Kertas rencana biru. Dipakai untuk grafik janji (janji = rencana).
```css
background:
  linear-gradient(color-mix(in srgb, white 16%, transparent) 1px, transparent 1px) 0 0 / 48px 48px,
  linear-gradient(90deg, color-mix(in srgb, white 16%, transparent) 1px, transparent 1px) 0 0 / 48px 48px,
  linear-gradient(color-mix(in srgb, white 7%, transparent) 1px, transparent 1px) 0 0 / 12px 12px,
  linear-gradient(90deg, color-mix(in srgb, white 7%, transparent) 1px, transparent 1px) 0 0 / 12px 12px,
  radial-gradient(ellipse at 30% 20%, #517AB9 0%, transparent 55%),
  linear-gradient(160deg, #06368A 0%, #042B79 100%);
/* elemen: penggaris tepi (tick 1 px tiap 12 px, angka mono kecil), garis putus-putus putih 50 %, bingkai teks 1.5 px putih */
```
Teks dan garis: putih saja (11,0–12,9 : 1). Tidak ada elemen biru di atas latar ini (rule 15).

### R-SKY · Sky glass (dari KOAH panel 1–2, node "Visual")
Langit terang + kaca. Dipakai untuk UI, agent, kartu.
```css
background: linear-gradient(180deg, #C4DAFD 0%, #E1F5FD 38%, #F4F9FD 70%, #FFFFFF 100%);
/* kaca: */
.glass { background: color-mix(in srgb, white 62%, transparent);
         border: 1px solid color-mix(in srgb, white 85%, transparent);
         box-shadow: 0 20px 50px color-mix(in srgb, #1D36EB 12%, transparent),
                     inset 0 1px 0 color-mix(in srgb, white 90%, transparent); }
/* huruf raksasa samar di belakang (seperti "dayo"): Inter 800, #8DD7F9 35 % */
```
Teks: tinta #1D1D1F (10,6–11,9 : 1). Teks putih dilarang di atas #4E9BEE–#8DD7F9 (1,6–2,9 : 1). Biru #2563EB di #F4F9FD = 4,88 : 1, cukup untuk titik/garis, bukan untuk teks kecil.

### R-RAY · Ray burst (dari KOAH panel 3–4)
Berkas cahaya memancar dari titik hilang. Dipakai sekali untuk momen "kesempatan yang sama".
```css
background:
  repeating-conic-gradient(from 0deg at 50% 50%,
    color-mix(in srgb, white 0%, transparent) 0deg 6deg,
    color-mix(in srgb, white 35%, transparent) 9deg 10deg),
  radial-gradient(ellipse at 50% 50%, #EBE0F2 0%, #CBAFF3 30%, #A48BF3 55%, #1D36EB 100%);
```
Teks di atas R-RAY: tinta pada kaca, tidak langsung di atas berkas.

### R-PX · Pixel squares (dari node "Wikipedia")
Kotak 22–28 px warna penuh, ditaruh di sudut potongan foto, 1 per foto, tidak menyentuh teks.
Warna diambil dari palet agent (§2), bukan acak, supaya warnanya punya makna.

### R-FLOAT · Foto melayang (dari `r2-floating-photos-ref.png`)
Latar kertas, 8–12 potongan foto berbagai ukuran (60–220 px lebar) tersebar ke tepi, teks di tengah. Foto kecil = jauh (parallax lambat), foto besar = dekat.

## 2. Palet agent (dari node "Maskot", "Refference", "Visual")

| Agent | Gradien tubuh | Label kursor | Teks di label |
|---|---|---|---|
| CEO Agent | #89FAFA → #783FF6 | #783FF6 | putih (5,47 : 1) |
| CS Agent | #FF5C8A → #A626C5 | #C2185B | putih (5,87 : 1) |
| Ops Agent | #7DFFD0 → #02C88A | #02C88A | tinta #1D1D1F (7,72 : 1) |
| Editor Agent | #FFD86B → #FF7A45 | #FF9F43 | tinta #1D1D1F (8,25 : 1) |

Bentuk: kubah/blob lembut (bukan bola hitam B-12). Mata: dua oval putih dengan pupil tinta. Kilau putih 40 % di kiri atas. Satu agent = satu warna, konsisten di seluruh video. Tekstur bulu (node "Visual") = catatan build 3D; di storyboard digambar sebagai gradien glossy.
Karakter referensi milik pihak lain dan tidak disalin bentuknya; yang diambil prinsipnya: warna = kepribadian, ekspresi lewat mata.

## 3. Prinsip warna yang dipakai

1. **Warna = makna, bukan hiasan.** Biru = teknologi/rencana (R-BP, R-HZ, R-SKY). Warna agent = identitas agent. Biru #2563EB tetap satu-satunya "sukses" (titik biru 05b).
2. **Satu keluarga gradien per babak.** Pergantian resep = pergantian bab, tidak dicampur dalam satu frame.
3. **60-30-10.** Latar gradien 60 %, objek 30 %, aksen 10 %. Aksen per frame maksimal 1 (warna agent dihitung objek, bukan aksen teks).
4. **Kontras dicek di titik teks**, bukan di rata-rata gradien. Kata kunci ≥ 7 : 1, teks lain ≥ 4,5 : 1.
5. **Rule 15 tetap:** tidak ada teks/elemen biru di latar gelap atau biru tua.

## 4. Uji (devil's advocate)

- **Inti:** latar putih terasa polos; tambah gradien, tekstur, dan warna agent agar rasa Apple keynote muncul.
- **Steelman:** keynote Apple memang memakai gradien lembut, kaca, dan cahaya; putih polos 13 panel berturut membuat ritme visual datar; warna agent memudahkan penonton membedakan siapa bekerja.
- **Penonton awam:** lebih menarik dan lebih "mahal".
- **Penonton skeptis:** "Empat gaya (blueprint, kaca KOAH, horizon, maskot berbulu) di satu video = katalog Dribbble, bukan identitas. Gradien ungu-biru adalah klise AI." Bantahan itu kuat.
- **Fakta:** keynote Apple memakai satu sistem gradien per segmen, bukan berganti tiap slide.
- **Pre-mortem:** video gagal karena tiap panel beda gaya, teks putih tenggelam di biru muda, dan warna maskot bersaing dengan kata kunci.
- **Putusan: dipakai dengan perbaikan.** Hanya 3 resep latar (R-HZ, R-BP, R-SKY) + R-RAY sekali. Resep dikunci per babak (§5). Ungu hanya milik agent dan R-RAY. Serif italic KOAH tidak dipakai (D-005). Kontras dicek per teks.

## 5. Peta penerapan (R2)

| Babak / panel | Resep | Alasan |
|---|---|---|
| 01a | R-HZ | Pembuka: dari gelap ke fajar perlombaan |
| 01b | R-SKY | Lintasan di langit terang, logo sebagai kaca |
| 02a | Kertas + R-FLOAT + R-PX | Kolase Wikipedia (node "Wikipedia") |
| 02b, 02e, 02f | R-BP | Janji = rencana di kertas blueprint |
| 02c | R-SKY | Desktop terang, kartu kaca |
| 03a-1, 03a-2, 03b | R-SKY + agent | UI composer terang (ref composer), kursor agent bernama |
| 04a | R-HZ | Teknologi terus naik, tidak peduli |
| 04b | R-SKY | Kartu rilis sebagai tumpukan kaca (KOAH panel 5) |
| 04c | R-BP | Payoff grafik janji di dunia yang sama dengan 02b |
| 05a | Kertas + R-FLOAT + R-PX | "Satu cerita sukses" di antara foto orang sukses |
| 05b | R-SKY sangat terang | Titik biru butuh latar terang |
| 05d | R-SKY | Composer yang sama dengan 03a (callback) |
| 05e | R-RAY | "Kesempatan yang sama" memancar ke semua orang |
| 05g | R-SKY | Tumpukan kaca aplikasi |

Panel charcoal (tokoh, dokumenter, B6) tidak berubah.
