# F6 · Banding prinsip kita vs `anti-slop-design` (AS)

Pembanding: AS `SKILL.md` (§1 bans, §3 1-1-1, §4 storyboard/motion, §6, §7, §8) dan `REFERENSI.md` (REF). Rujukan kita: slop-catalog (S-*), contoh-gagal (CG), F3 per tema, F4-inti (I1-I8, §2.1), LANTAI. Rubrik §9 AS tidak dipakai.

Yang saya buka sendiri: CG 01, 03, 04, 09, 10, 12, 14, 20; keyframe 57-k3, 63-k5, 67-k2, 83-k7; `scripts/remotion/curves.ts`. Selain itu hanya dibaca lewat teks F3/F4/README.

F4 §2.1 sudah menarik 7 larangan AS. Bagian ini menilai ulang bukti-nya, bukan mengulang.

---

## (a) SEJALAN

| # | Prinsip kita | AS | Bukti yang saya buka |
|---|---|---|---|
| a1 | C17, C18a, I3, editorial K7: tolak glow/blob biru-ungu generik dan Apple Glass | §1 gradien, glow, glass dekoratif | CG-04 (kotak gradien biru + sirkuit di navy), CG-14 (pil kaca hilang di dinding terang), S-V21 |
| a2 | S-V14, S-V16, D19; editorial anti-contoh 2 | §1 ilustrasi generik (jaringan abstrak, bentuk melayang, figur tanpa wajah) | CG-04 |
| a3 | I1, S-V8, S-V4 | §1 kartu identik berulang | CG-03 (puluhan kartu identik) |
| a4 | I3, tactile 3 rezim bayangan | §1 satu bayangan sama di semua elemen | CG-20 (kartu kecil berbayangan di kanvas putih) |
| a5 | I8, S-V5, S-V20 | §1 UI/dashboard palsu | CG-20; CG-10 memakai UI Instagram dibangun ulang |
| a6 | A6, S-T3, S-T13 | §3 satu skala, ukuran acak | CG-12, CG-01 |
| a7 | A1, A3, A5, S-T1, S-T8 | §4 caption tanpa emoji/pelangi | CG-01, CG-03 (subtitle bawah + kata besar = dua lapis) |
| a8 | S-A5, F3b-apple SD-5 (kayu/woodblock/thock dilarang mutlak) | §4 "Never wood SFX" | Teks F3b-apple baris 19, 95-97. Sama persis |
| a9 | `curves.ts`: `exitDur` 0,65x masuk, `leave` hanya untuk keluar; documentary `scale 0,85→1`, tactile `95` `0,88→1` | §6 exit lebih pendek; §4 mulai >= 0,9, tanpa `scale(0)` | curves.ts. Bukti berupa pola positif, bukan kasus ditolak |
| a10 | `drift()` ("bukan diam mati > 1 dtk"), S-V11 | §4 tak ada shot statis > 5 dtk | Semangat sama; angka beda (lihat c2) |
| a11 | I1 (jangkar 30-75 %), C14 | §4/§7 satu fokus, objek >= 50 % | Tema apple/dataviz 46-82 % |
| a12 | C18b (still zoom 25-100 % + keyframe), F29 | §8 audit pada render, uji 160 px | Metode sama; kita bandingkan dengan keyframe, bukan skor |
| a13 | I3 oklusi/rack-focus tanpa glow | §4 kedalaman lewat skala/tumpang tindih | 83-k7: matte nyata di depan teks (bagian "bukan glow" lihat c3) |

---

## (b) CELAH: larangan AS yang belum kita punya

| # | Larangan AS | Status | Alasan / bukti |
|---|---|---|---|
| b1 | §1 gradien pada teks | TIDAK DIDUKUNG | Tidak ada kasus. CG-04 (dikutip F4 §2.1 #3) gradien-nya pada kotak, teks polos |
| b2 | §1 monospace sebagai kostum teknis | TIDAK DIDUKUNG | Satu-satunya anti-pola mono kita (pita caption mono, editorial baris 141) gagal karena A1/A7, bukan mono |
| b3 | §1 palet model (krem+terakota, near-black+aksen asam) | TIDAK DIDUKUNG | S-V19 hanya coklat+hitam; S-V22 palet dikarang. Lihat c5 |
| b4 | §1 font default (Inter/Roboto/Arial) tanpa alasan | TIDAK DIDUKUNG | Apple/documentary/dataviz memakai Inter/SF Pro sah (F3 apple baris 10). AS sendiri mengizinkan untuk UI produk |
| b5 | §1 Title Case, em dash, tanda seru, kata slop, CTA kabur | TIDAK DIDUKUNG | Teks layar kita dari transkrip VO (A5), jadi ini domain naskah. Tactile mengizinkan Title Case di ringkasan. 63-k5 (dikutip F4 §2.1 #6) memuat UI Claude asli tanpa copy slop |
| b6 | §1 emoji/glip sebagai ikon, set ikon dicampur | TIDAK DIDUKUNG | Tidak ada kasus tertolak. 63-k5 (dikutip F4 §2.1 #2) tidak berisi emoji. Terdekat: S-V16 |
| b7 | §1 eyebrow ALL-CAPS tracked | DIDUKUNG SEBAGIAN | Hanya bentuk S-T6 (label kecil + headline pojok kiri atas), sudah ada |
| b8 | §1 kaca dekoratif | DIDUKUNG | CG-14 + C17; sudah ada, bukan celah |
| b9 | §4 tanda aman 9:16 (atas ~250, bawah ~400, sisi 60 px) | TIDAK DIDUKUNG | Red zone kita hanya 16:9 (S-V23; storyboard.md baris 43); CG-09 juga 16:9 |
| b10 | §4 visual baru tiap 3-5 dtk, hook 0-1,5 dtk | TIDAK DIDUKUNG sebagai angka | S-V11 hanya menuntut frame berubah; 98 hook 18 kejadian/5 dtk tanpa angka 1,5. Lihat c2 |
| b11 | §6 stagger, `transition: all`, hover, fade-slide-up, loop dekoratif | TIDAK RELEVAN | Domain web interaktif; video kita frame-driven |
| b12 | §8 grep kode (`gradient`, `backdrop-filter`, `scale(0)`, `ease-in`) | DIDUKUNG SEBAGIAN | Preseden: S-V21 grep `radial-gradient`. `backdrop-filter` didukung CG-14 + C17. `scale(0)`/`ease-in` hanya pola positif |

**Usulan masuk inti (hanya DIDUKUNG):** satu perluasan gerbang kode, tambah `backdrop-filter` ke grep `radial-gradient`. Sumber: "anti-slop-design §8 butir 3 + CG-14 + S-V21". Tidak ada larangan baru lain yang lolos.

---

## (c) BERTENTANGAN

**c1. Satu keluarga font (AS §1, §3) vs sans + serif italic kita.**
AS: lebih dari satu keluarga gagal QC. Kita: apple pakai serif italic untuk sapaan (F3 apple baris 12); documentary/editorial memadukan sans + serif (documentary baris 11). README CG-01: Irfan suka serif, masalahnya kontras dan skala.
Lebih kuat: kita (penolakan Irfan menunjuk skala/kontras). Titik temu: A6 dan S-T3.

**c2. Visual baru tiap 3-5 dtk, tak ada shot > 5 dtk (AS §4) vs hold kita.**
AS: aturan tetap Shorts. Kita: I6 hold 0,15-1,3 dtk, sampai 3,5 dtk (kutipan), poros wajah 2-15 dtk, jeda kanvas 0,5-1,5 dtk tiap 6-15 dtk.
REF: R01-R09 berubah tiap 1,1-2,7 dtk, tetapi R11 (14,9 dtk/perubahan) dan R13 (15,4 dtk, 255 jt view) jauh lebih lambat, jadi referensi AS sendiri melanggar angkanya.
Lebih kuat: keduanya mendukung "frame harus hidup/berubah", tidak mendukung 3-5 dtk sebagai gerbang. Jadikan pedoman tempo per tema.

**c3. Tanpa neon glow/halo (AS §1) vs bukti kita.**
Kita: 83-k7 (bergerak, saya buka) menampilkan kata slab "ONLINE" bergaris neon di depan wajah; documentary mengizinkan pendar tipis 12-15 px (baris 17); apple memakai kapsul hover bercahaya (baris 74). Sisi larangan kita juga ada: C17, S-V21, CG-04.
Lebih kuat: larangan untuk glow generik tanpa peristiwa (Irfan); izin untuk glow terikat kata/peristiwa (83-k7). Tulis "glow hanya terikat kata/peristiwa", bukan larangan total.

**c4. Mono kostum teknis (AS) vs mono metadata kita.**
Kita: editorial memakai Regular/Monospace untuk sublabel teknis (baris 22; kartu 20, 37, 47, 80 tidak saya buka); dataviz memakai tabular untuk digit (57, 58). Lebih kuat: kita untuk digit; belum ada bukti untuk label non-angka. Netral.

**c5. Palet model krem/near-black + 1 aksen (AS §1) vs K4 editorial.**
Kita: K4 menetapkan kutub gelap pekat atau krem/off-white + maks 1 aksen per babak (editorial baris 92-98), aksen bermakna beda tiap babak (merah, biru, oranye, mint). AS: 1 aksen sepanjang karya.
Lebih kuat: kita (kutub netral diamati di kartu; satu-satunya penolakan Irfan: coklat+hitam S-V19, biru di navy S-T5). Titik temu: palet dari brief/`palettes.json` (S-V22).

**c6. Template angka besar + label kecil (AS §1) vs angka raksasa kita.**
AS: big number + label + tiga statistik + gradien dilarang. Kita: dataviz rasio angka:label >= 3,2-7x; 67-k2 ("$400M" besar dengan satu label) dan 57-k3 ($42.000 vs $4.200) adalah referensi positif.
Lebih kuat: kita untuk satu angka per beat yang diucapkan. Sisi AS valid untuk tiga statistik + gradien (sudah S-V8).

**c7. Kartu bertumpuk/kipas dan kotak bersarang (AS §1) vs bukti kita.**
67-k2 berisi tumpukan kartu foto; 57-k3 kotak bersarang sebagai proporsi data. Keduanya dikutip F4 §2.1 #4 sebagai dasar larangan, padahal contoh positif.
Lebih kuat: bukti kartu. Larangan hanya untuk dekorasi tanpa makna (CG-03, S-V8).

**c8. Hard-offset shadow (AS §1) vs tactile `8px 8px 0 #000`.**
Kita: tactile per kelas material (baris 35, 98 k1-k6, bergerak). AS sendiri tunduk pada brief. Lebih kuat: kita di tema tactile.

**c9. Satu keluarga transisi (AS §4) vs mekanik per hubungan ruang (B13a).**
Kita: S-T7, S-T13, S-V8 menolak gaya berulang; apple memakai tiga pemicu. Netral bila "satu keluarga" dibaca "semua terikat peristiwa".

**c10. Caption per kata 4-6 kata, pelat/stroke (AS §4, §7) vs kita.**
AS: wajib di setiap Short, 64-96 px, teks layar terpisah dari caption. Kita: A4 (1-3 kata), A1/A3 (satu jalur), S-T4 (kotak pada teks terbaca = slop), A9, documentary tanpa outline, talking-head kontur 2 px hanya setelah memindah teks (baris 160).
Lebih kuat: kita (CG-01 dan CG-03 ditolak Irfan). 64-96 px cocok dengan A7 (>= 56 px).

**c11. SFX di setiap perubahan visual (AS §4) vs kata senyap.**
Kita: I7 (kata senyap atau tick -14...-20 dB), S-A11, S-A12 (cut = klik). S-A4 kita sendiri menolak video sepi, jadi ada dua sisi, diselesaikan lewat <= 0,5 momen/dtk di VO padat.
Lebih kuat: kita (93, 94, 97, 98 bergerak; R-017 dari Irfan).

**c12. Satu kata beda warna/italic (AS §1) vs satu mode penekanan.**
Kita: A6, documentary K-04, 85-k5, 76-k1. AS sendiri menyorot kata aktif dengan aksen (§4), jadi tidak konsisten. Lebih kuat: kita.

### Bukti lemah di F4 §2.1 (catatan untuk F7)
- Butir 1: CG-12 menunjukkan huruf per-huruf berputar acak, bukan `scale(0)`. Dukungan nyata hanya curves.ts dan angka 0,85-0,92 di F3.
- Butir 2 dan 6: tidak ada kasus tertolak di bukti yang saya buka.
- Butir 3: 83-k7 menunjukkan matte nyata (positif); tidak ada kasus lingkaran atau gradien teks.
- Butir 4: lihat c7.

---

## Ringkasan perbandingan

1. Hampir semua larangan video AS sudah ada di LANTAI/F4/F3: glow-biru, kaca dekoratif, ilustrasi generik, kartu identik, bayangan slide, UI palsu, tipografi acak, SFX kayu, exit lebih pendek.
2. Sejalan terkuat (bukti saya buka): CG-03, 04, 14, 20, curves.ts; larangan kayu cocok persis (S-A5, F3b-apple SD-5).
3. Celah DIDUKUNG layak masuk inti: nyaris nol. Satu perluasan gerbang kode: `backdrop-filter` + `radial-gradient` (AS §8 + CG-14 + S-V21).
4. TIDAK DIDUKUNG, jangan masuk inti: gradien teks, mono kostum, palet model, font default, Title Case/em dash/slop words, emoji/set ikon, safe area 9:16, angka 3-5 dtk, hook 1,5 dtk.
5. Hover, stagger, `transition: all`, fade-slide-up: domain UI web, tidak relevan ke video frame-driven.
6. Bentrok font: AS satu keluarga vs sans+serif kita; kita lebih kuat (CG-01: Irfan suka serif, masalah kontras/skala).
7. Bentrok tempo: AS <= 5 dtk/shot vs hold 2-15 dtk kita; REF R11/R13 melanggar angka AS sendiri; jadikan pedoman, bukan larangan.
8. Bentrok glow: AS larang neon vs 83-k7 (bergerak) yang memakai neon; tulis "glow terikat kata/peristiwa".
9. Bentrok caption: AS 4-6 kata + pelat vs kita 1-3 kata satu jalur; kita lebih kuat (CG-01, CG-03).
10. Bentrok SFX: AS tiap perubahan vs kita senyap default + S-A12; kita lebih kuat, tapi S-A4 kita memuat sisi sebaliknya.
11. Bentrok palet: krem/near-black + 1 aksen dilarang AS tapi jadi K4 kita; netral, palet harus datang dari brief.
12. Bentrok kartu/angka: 57-k3 dan 67-k2 (saya buka) contoh positif; larangan hanya untuk dekorasi tanpa makna.
13. Bukti F4 §2.1 butir 1, 2, 3, 6 lemah (CG-12 bukan kasus scale(0); 63-k5 tanpa emoji/copy slop); koreksi sumber di F7.
14. Rubrik §9 AS tidak disalin; skor 0-10 REF ditulis model sendiri, tidak dipakai sebagai bukti.
15. Keterbatasan: CG lain dan sebagian besar keyframe hanya dibaca lewat teks; yang saya buka ditandai di atas.
