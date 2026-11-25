# Ringkasan akhir · reverse-engineering 80+ kartu → skill bertema

25 November 2026. F1–F5 dikerjakan sesi Gemini. F6–F7 dikerjakan Claude: audit ulang dari sumber primer, uji transfer, lalu draf skill.

## Tema dan jumlah kartu
| Tema | Kartu utama | Dilihat bergerak | File |
|---|---|---|---|
| apple-saas-ui | 24 | 17, 63, 93, 94, 96 | `draf-skill/tema/apple-saas-ui.md` |
| talking-head-kinetic | 25 | 26, 83, 85, 87, 90, 91 | `tema/talking-head-kinetic.md` |
| documentary-archive | 15 | 89, 92 (86 sebagian) | `tema/documentary-archive.md` |
| tactile-paper-collage | 7 | 95, 97, 98 | `tema/tactile-paper-collage.md` |
| editorial-metaphor-canvas | 9 | 88, 96 | `tema/editorial-metaphor-canvas.md` |
| minimalist-dataviz-kinetic | 4 (+3 konteks) | **0** | `tema/minimalist-dataviz-kinetic.md` |
| lintas tema (naskah S01–S12, transisi 14) | 13 | – | di router |

Router + inti: `draf-skill/SKILL.md`. Format dan alasannya: `draf-skill/SPEC-F7.md`. Rencana uji: `draf-skill/RENCANA-UJI.md`.

## 5 prinsip inti terpenting
1. **Periksa kondisi bahan sebelum memilih teknik.** Baju, dinding, piksel di bawah huruf, dan ruang kepala menentukan apakah teknik kartu bisa dipakai. Banyak kegagalan kita berasal dari teknik bagus yang dipakai di kondisi yang salah (contoh-gagal 14, 18, 19).
2. **Satu jangkar, sisanya napas.** Satu objek fokus ±50–60 % lebar frame; sisa frame tidak diisi elemen kecil.
3. **Ukuran teks dua kutub.** Seragam 1,0–1,3× atau lompat ≥ 1,8× (≥ 4× hanya di titik balik); ukuran tanggung dihindari.
4. **Bunyi menempel peristiwa, bukan kata.** Whoosh hanya untuk gerak yang terlihat. Sebelum puncak, stem musik dikosongkan, tetapi bed tetap ada.
5. **Bukti tetap utuh.** Dokumen tajam dengan stabilo baris, VO tidak diketik ke prompt UI, tidak ada screenshot kecil mengambang.

Di atas semua prinsip itu ada satu lingkaran kerja: **render still → bandingkan dengan keyframe tema di zoom 25 % → coret yang tidak menambah pemahaman**. Skor yang ditulis model sendiri tidak dihitung sebagai bukti.

## Yang dibuang di cek silang (F6)
Audit ulang 166 butir: 44 lulus, 106 lulus dengan revisi, 12 turun jadi catatan, 4 gagal.
- **Gagal (dibuang):**
  - larangan emoji (96-k4 justru memakai emoji);
  - "maks 1 hero motion" (kartu bergerak memadukan beberapa gerak);
  - larangan copy slop (tidak ada kartu yang menunjukkannya);
  - foley kertas terukur di tactile (tidak ada kartu dengan bunyi kertas).
- **Turun jadi catatan** (1 kartu atau 1 kreator): vakum 3 tingkat (94), teks diikat ke kamera (Zache), stabilo pas-badan (48), teks terkunci saat montase (still saja), angka menembus batas (67/33, brand sama), ritme napas lintas tema.
- **Kerusakan sistemik di draf Gemini:**
  - ID slop salah rujuk, termasuk S-A4 yang dikutip terbalik;
  - rumus durasi baca dilabeli A8 padahal ada di S-T12;
  - level tick ditulis −14…−20, padahal E24 menulis −12…−18;
  - saran SFX dari kolom kartu ditulis seolah pengamatan;
  - 13 bukti salah arah.

Semua sudah dibetulkan di draf.

## Yang belum bisa dibuktikan
- **Draf skill baru belum diuji sama sekali.** Uji transfer F6 memakai draf F3–F5, bukan file tema baru. Uji A/B buta di `RENCANA-UJI.md` belum dijalankan; Brief 1 dan 2 sudah diganti karena brief lama mencemari uji.
- **Gerak:** hanya 18 kartu dilihat bergerak (86 sebagian); dataviz 0/4. Klaim gerak lainnya diturunkan dari still.
- **Bunyi:** tidak ada yang didengar. Semua angka berasal dari deteksi otomatis atau data kartu.
- **Penonton:** semua dampak ke penonton masih hipotesis.
- **Angka px:** sebagian besar terjemahan penulis dari persentase kartu, bukan hasil ukur, dan sudah ditandai di tiap file.
- **Token:** estimasi kasar ≈ 11.200 token sampai storyboard, dibanding 21.600–24.500 token sebelumnya. Belum diukur dengan tokenizer.

## Keputusan untukmu
1. **Mode tick default untuk explainer faceless.** LANTAI E24 menyarankan `per-word`, sedangkan kartu bergerak (93, 97, 98) senyap di kata. Draf mengikuti E24 dan tema hanya merekomendasikan. Rekomendasiku: `accent-only` sebagai default, `per-word` hanya bila RESEP memilihnya.
2. **Uji A/B.** Dijalankan di sesi bersih di PC server dengan brief baru, dan kamu menilai buta. Draf baru dipasang ke repo hanya kalau menang.
