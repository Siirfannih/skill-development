# TASK r7 · B12–B13 dibangun ulang ke DNA kartu 63

Editor (lanjutan r6). P = `projects/builder-trap-r2`, R = root repo. Jangan menimpa `out/*.mp4`. Jangan render final.

## Latar
Irfan 15 Nov (lihat render v3, B12): "Baca lagi aturan dan contoh penerapannya dalam bentuk render, dan coba lihat hasil implementasi sebelumnya apakah sudah sesuai dengan DNA kartu 63. Bagian ini visualnya masih salah bahkan melenceng jauh."

Audit Sutradara (sumber `Motiongrapich.mp4` 7–30 dtk dan kartu `R/claude/motion-graphic/pustaka/kartu/63-motiongrapich.md` §5, §6, Cek kemiripan, dibandingkan dengan render v3 f835–1241):

| Butir kartu 63 | Kartu 63 | v3 kita | Status |
|---|---|---|---|
| Wallpaper | foto tajam hiper-saturasi (senja oranye, gunung) | gradien pastel polos peach→lilac→biru | GAGAL |
| Jendela UI | utuh, **57–61 % tinggi × 56–60 % lebar**, bayangan lembut, wallpaper terlihat di keempat sisi | ±75 % lebar, terpotong di tepi kanan dan bawah (keputusan TASK-r6 butir 1, salah) | GAGAL |
| Lapisan | 3: foto → jendela gelap berbayang → panel/kotak prompt + kursor; dock macOS di bawah | 2: gradien → jendela | GAGAL |
| Warna UI | gelap `#09–0C`/ChatGPT gelap; aksen oranye | ChatGPT terang | GAGAL |
| Teks di ruang kosong | panel kiri 39–40 % lebar saat jendela digeser ke kanan (k7); salam putih langsung di langit senja (k5) | KT abu kecil `#A8A69F` di gradien terang, kata baru hampir tak terbaca | GAGAL |
| Punch ke prompt | 1,4–1,8×, teks prompt ±10 % tinggi di separuh kiri; tepi jendela dan wallpaper tetap terlihat (sumber 21 dtk) | zoom 3,2× sampai frame putih penuh, konteks desktop hilang | GAGAL |
| Kamera | tidak pernah diam: push, pull, geser lateral | push kecil | PERIKSA |
| Aksi UI | kursor besar klik ikon dock → jendela terbuka; ketik huruf demi huruf ±12/dtk | ketikan ada, kursor dan dock tidak ada | GAGAL |

Akar masalah: TASK-r5/r6 menulis tafsiran Sutradara ("gradien ala Sequoia", "jendela besar terpotong kanan") alih-alih angka kartu 63, dan juri tidak menyandingkan B12–B13 dengan frame kartu 63 (hanya kiblat 55).

## Aset baru
- `P/remotion/public/wall_senja.jpg`: foto CC0 "Sunset in the mountains" (Sergey Pesterev, Unsplash, lewat Wikimedia Commons), 3382×2263. Pegunungan berlapis dalam kabut oranye: langit gelap-oranye di atas kiri, kabut terang di tengah, siluet gelap di bawah.

## Kerjakan (B12 f835–1047 dan B13b; kode di `P/remotion/src/scenes/Act2.tsx`, `ui/ChatGPT.tsx`, `ui/Browser.tsx`, `engine/*`, `scenes/Act2.text.ts`)
1. **Wallpaper**: `wall_senja.jpg` sebagai L1, tajam (tanpa blur), menutupi frame dengan cover pada setiap zoom kamera yang dipakai (parallax pelan 0,3–0,5× gerak kamera boleh). Hapus `MAC_WALL` gradien.
2. **Jendela ChatGPT gelap** (mode gelap asli ChatGPT: konten `#212121`, sidebar `#171717`, teks `#ECECEC`, kotak prompt `#303030`; `Browser dark`): utuh, **56–60 % lebar × 57–61 % tinggi frame** di layar saat kamera normal, digeser ke kanan seperti k7 (tepi kanan ±4 % dari tepi frame), sudut membulat + bayangan lembut, wallpaper terlihat di keempat sisinya. Tidak boleh terpotong tepi frame kecuali saat punch.
3. **Dock macOS** (L4 depan, kaca buram terang, sudut membulat) di bawah tengah-kanan, ikon aplikasi yang muncul di cerita (ChatGPT, GitHub, Threads, YouTube, dan lain-lain yang ada di `engine/Logo.tsx`), tinggi dock ±8–10 % frame.
4. **Pembuka B12 (aksi UI, kartu 63 §5)**: kursor panah besar mengklik ikon ChatGPT di dock → jendela terbuka dari ikon (skala + gerak 0,3–0,4 dtk, ease-out) → riwayat bertambah seperti sekarang. Jendela sudah utuh sebelum kata kedua tampil.
5. **KT di ruang wallpaper kiri** (peran panel kiri k7, x 165 sampai ±36 % lebar): tanpa kotak/pelat. Warna dipilih dari kontras terukur di area itu (target ≥ 4,5:1): kemungkinan tinta gelap `#1A1712` di kabut oranye terang, atau putih bila blok jatuh di langit gelap. Kata baru TIDAK memakai abu `#A8A69F` (tak terbaca di oranye); pakai warna yang sama dengan opasitas 55–60 % lalu penuh. Ukuran dan mode KT yang ada dipertahankan (lantai 56/96 px).
6. **Punch ke prompt** (di "investasi" B12 dan "build something" B13b): 1,4–1,8×; teks prompt ±10 % tinggi frame di separuh kiri; sebagian tepi jendela dan wallpaper tetap terlihat di salah satu sudut (sumber 21 dtk). KT tidak menimpa teks prompt. Hapus zoom 3,2× B13b yang menghilangkan konteks.
7. **Cap logo ChatGPT di "AI."**: tetap, di atas jendela (warna logo putih di UI gelap).
8. **B13b**: set yang sama (wallpaper, jendela gelap di posisi yang sama, dock) supaya kontinu dengan B12; ketik "build something" huruf demi huruf ±12/dtk, kursor mengklik tombol kirim di `F_SEND`, mosaik piksel B13→B14 tetap.
9. **Kamera**: tidak ada > 1 dtk tanpa gerak: pull kecil saat jendela terbuka, push pelan ke jendela, punch, lalu mundur. Tetap di `Freeze`/peta waktu yang ada; teks tetap di frame nyata.

## Jangan berubah
Isi kata dan timing ucapan, mesin waktu (timewarp/realframe), adegan lain, audio, B13a (wajah).

## Cek (wajib, dilampirkan)
- Still frasa utuh tiap tampilan teks B12 dan B13b + 1 still pembuka (jendela terbuka) + 1 still punch tiap punch → `P/qc/stills_r7/`.
- Lembar sanding: `python3 R/claude/motion-graphic/scripts/juri/sandingkan.py P/qc/stills_r7 R/claude/motion-graphic/guide/referensi/sheets/63-motiongrapich.jpg P/qc/r7_sanding.jpg`, lalu isi tabel di atas dengan kolom "r7" (LULUS/GAGAL + still bukti + angka terukur: lebar/tinggi jendela %, tinggi teks prompt %, kontras KT).
- `balance_check.py P/qc/stills_r7` apa adanya.
- `node P/remotion/scripts/cekkata.mjs` (versi words_v3, exit 0) dan `npx tsc --noEmit`.

## Keluaran (sebagai balasan; Sutradara menyimpan REPORT)
Lembar `P/qc/r7_sheet.jpg`, `P/qc/r7_sanding.jpg`, tabel kartu 63 kolom r7, keluaran cek apa adanya, pertanyaan terbuka. Bersihkan still sementara selain `stills_r7` (disk sempit).
