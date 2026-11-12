# Brief Builder trap r2 · v1 · 12 Nov 2026

## Brief Irfan (apa adanya, dipotong)
> edit video ini semenarik mungkin, seprofesional mungkin, sepremium mungkin ... tentang kegagalanku dalam manage waktuku dan terjebak dalam builder trap ... setahun tanpa mendokumentasikan pengalaman apa pun ... Video ini sepenuhnya berisi tentang kesadaran bahwa kita harusnya emang show your work ... cinematic storytelling ... real footage, real icon ... ChatGPT tampilkan logo yang asli ... Misalnya kamu perlu footage buka Threads dan aku mau posting tapi ga jadi, kamu bisa langsung buat animation menggunakan tampilan asli websitenya.
> "Setiap 3-5 detik pakai B-roll wajahku muncul sebagai penekanan, pembuka, momen klimaks dan juga saat visual motion kurang kuat untuk ditampilkan."
> Hindari: (1) radial putih dikelilingi hitam + hanya 1 lapis layer; (2) semua teks bernilai sama + radial coklat; (3) terlalu banyak biru + radial; (4) animasi kurang proper.

## Terkunci
- 16:9 1920×1080, 30 fps, **2849 frame (94,97 dtk)**. Suara terkunci: `edit/face_edit.mp4` (video wajah lip-sync + suara, sumber tunggal) dan `audio/voice_raw.wav`. Waktu kata: `edit/words_final.json` (detik di timeline video). Jangan memotong ulang suara.
- Resep: `RESEP.md` (kiblat 55 "Charles, age 20"; teknik UI dari kartu 63). Lantai: `claude/motion-graphic/LANTAI.md`.
- Palet `jadisatu-terang`: latar `#F6F5F1` / `#FFFFFF`, teks `#282723`, abu kata baru `#A8A69F`, aksen `#1A3AD0` (≤ 15 % area), aksen lembut `#DCE4FF`. Belokan (B15–B22) `jadisatu-gelap`: `#0B0D0F` → navy `#13245E` **gradient linear**, teks `#F4F5F7`, aksen teks `#6F8DFF`. Tanpa `radial-gradient`, tanpa blob blur, tanpa vignette gelap di latar terang, tanpa coklat.
- Huruf (semua dari file, Lantai A7): SF Pro Display Bold/Semibold (`~/fonts-lokal/sf-pro-display/`) untuk semua narasi dan teks kinetik, tracking −0,02em; Playfair Display 800 (`claude/motion-graphic/fonts/playfair-display/`) hanya kartu judul B05; Caveat 600 (`assets/fonts/Caveat.ttf`) hanya label tulisan tangan; Inter (repo fonts) untuk teks UI tiruan (Threads/GitHub/ChatGPT memakai font sistem mirip Inter/SF).
- Safe frame: x 165–1755, y 140–935 (benda keluar hanya karena gerak kamera).

## Sistem teks (satu lapisan, Lantai A1–A9)
Setiap kata di `words_final.json` tampil tepat sekali, masuk saat diucapkan (±2 frame), tahan sampai frasanya selesai + ≥ 0,25 dtk, maks 2 baris. Kode di PLAN:
- **N** narasi: kata masuk satu per satu (blur 6 px→0 + naik 8 px, 6 frame), kata terbaru `#A8A69F` lalu menghitam dalam 8 frame; SF Pro Semibold 44–52 px; posisi menempel benda (rata kiri bingkai/foto/jendela, jarak ≤ 36 px) atau di ruang kosong samping wajah.
- **K3** triad: kepala kalimat tetap di tempat, hanya kata kunci diganti (keluar blur ke atas, masuk blur dari bawah); kata kunci warna aksen **ukuran sama**; teks bertahan melewati cut.
- **K4** tumpuk: kata kunci besar (≈ 9–10 % tinggi frame, SF Pro Bold) di atas/bawah kata kecil (rasio ≈ 2,3), rata kiri di ruang kosong samping subjek. Kata besar tidak tampil lagi di N (A3).
- **J** kartu judul (hanya B05). **H** tulisan tangan Caveat + panah (hanya kata yang diucapkan). **UI** teks diketik di UI asli = penampil kata itu (tidak diulang di N).
Teks ikut transform kamera dunia (Lantai B12): teks diletakkan di lapisan L3 stage, bukan overlay layar.

## Wajah (R-007)
Sisipan dari `edit/face_edit.mp4` pada waktu yang sama (sudah lip-sync; frame video = frame timeline). Tidak pernah frame utuh: preset crop (pusat dalam px sumber 1920×1080, kepala kira-kira x 900, y 560):
- **F1** close-up mata+mulut: skala 2,1, pusat (905, 560)
- **F2** mulut + tangan: skala 1,7, pusat (960, 760)
- **F3** sisi: skala 1,45, wajah di sepertiga kiri (pusat (1150, 600)), dinding kosong kanan untuk K4
- **F4** medium bersih: skala 1,22, pusat (960, 600)
Cek still: wajah tidak terpotong aneh (dagu/mata), sesuaikan pusat bila kepala bergerak. Grade: kontras +8 %, kulit sedikit hangat, biru dinding −15 % saturasi; di belokan grade dingin lebih gelap; di B23–B26 paling bersih/hangat. Push pelan 3–5 %/dtk selama sisipan.

## Kamera dan dunia (2,5D, Lantai B10–B13)
Empat lapis per adegan: L1 latar (kertas/linen/gelap), L2 dunia (bingkai footage, foto cetak, jendela UI), L3 teks, L4 objek depan (pin, kursor, benang, kartu yang lewat dekat lensa dengan blur). Kamera perspektif sungguhan bergerak melewati lapisan; tidak ada shot > 2 dtk tanpa gerak disengaja; satu objek fokus per beat; easing tidak linear; motion blur di gerak cepat.

## Hard Gate yang relevan
Aturan 2 / Lantai A5 teks hanya dari ucapan · A1 satu lapis teks, tanpa subtitle pita bawah · A3 kata tidak dobel · A4 ≤ 2 baris · B10 tiap shot > 2 dtk bergerak · D20 UI dan logo asli (dibangun ulang sebagai kode, bukan screenshot ditempel) · D22 tanpa placeholder · C16 safe frame.

## Aset + lisensi
| file | sumber | catatan |
|---|---|---|
| `edit/face_edit.mp4` | take DJI Irfan | milik Irfan |
| `assets/footage/*.mp4` | YouTube (Jensen Huang WGS 2024 `1EXtvwTNAeE`, TED Thomas Dohmke `nv9WwHpOKEg`, Karpathy YC `LCEmiRjPEtQ`, Replit `LrahKbwVZwg` `IYiVPrxY8-Y`, Fox teen dev `5u08zrnLvMI`, TED Thomas Suarez `Fkd9TWUtFm0`) | hak cipta diurus Irfan (brief) |
| `assets/yt/*.jpg` + `search_uang_ai.txt` | hasil pencarian YouTube nyata "cara dapat uang dari AI 2026" (judul, kanal, views, thumbnail) | data publik |
| logo | `simple-icons` (npm, CC0 path): openai, threads, github, youtube | merek milik pemiliknya |
| repo | 31 repo Siirfannih (`assets/repos.json`: nama, visibilitas, pushed_at) | data asli |
| agent OpenBot | `../builder-trap-show-your-work/remotion/public/agents/` (aset asli app OpenBot) | produk Irfan |
| acuan UI asli | `assets/ref_ui/` (Threads composer + dialog "Save to drafts?" + feed, ChatGPT, GitHub profil/repo) | untuk dibangun ulang dalam kode; boleh mengambil screenshot halaman publik lain dengan Playwright sebagai acuan (mis. github.com/Siirfannih/<repo>) |
| font | SF Pro Display (lokal, tidak di-commit), Playfair Display & Inter (OFL repo), Caveat (OFL) | |

## Tidak boleh
- Desain/kode proyek lama `projects/builder-trap-show-your-work/remotion/src` tidak dibuka atau disalin (proyek ini pembanding repo baru). Aset mentahnya (agents, data) boleh.
- Frame seperti `claude/motion-graphic/pustaka/contoh-gagal/02–07` (subjek kecil, kerumunan figur abu, kotak biru/garis sirkuit di navy, subtitle pita bawah, satu bidang datar) dan 4 gambar larangan Irfan.
- Biru sebagai latar adegan (selain navy gradient linear di belokan); kotak di belakang teks yang sudah terbaca.
