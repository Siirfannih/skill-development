# TASK-R7-ig · adegan IG 76,41–83,82 (D-454, D-455, D-456, D-457, D-462)
Baca dulu `handoff/R7-BERSAMA.md`. Komposisi `DuniaIG` di `remotion/src/video/b6.tsx` (lapisan D_IG, props di `lego/lapisan_opaque.json`, cache sekarang `lego/cache/D_IG_r6.mp4` dengan adegan PROFESIONAL hijau, D-451 — pertahankan). Teks IG = lapisan T084–T095 (kecuali T086 sudah dibuang).

TUJUAN: adegan IG seimbang (tidak berat ke kanan), kolom komentar diperbesar dengan kamera, ada interaksi komentar, dan "gratis" jadi punchline.

## TEMUAN
- F-I1 (D-454) ±80,8–81,6: cincin biru berdenyut di sekeliling kolom "Add a comment…" jelek dan tidak ada di UI IG asli. Hapus. Gantinya: kamera dunia IG mendorong masuk ke panel komentar (kolom komentar + komentar terbesar ±55–65 % lebar frame), lalu kembali.
- F-I2 (D-457) saat "Comment di bawah." (80,86–81,6): di kolom komentar diketik "Skill" (huruf per huruf, kursor), dikirim, komentar baru muncul dari akun penonton (nama netral mis. `dimas.creates`) berisi "Skill"; lalu akun **siirfannih** langsung membalas "oke cek dm ya" (balasan berindentasi, avatar siirfannih yang sudah ada). Waktu: ketik mulai di onset "Comment", balasan muncul di onset "Nanti" (81,66) atau sesudahnya, selesai sebelum 83,3.
- F-I3 (D-455) setelah "profesional" (79,28–83,8): teks narasi + komentar semua di kanan → berat ke kanan dan kehilangan gaya. Atur ulang: teks narasi di dalam bidang video ditempatkan menurut komposisi (sisi kosong wajah, berganti kiri/kanan sesuai gerak kamera), kamera bergeser bergantian antara video dan panel komentar sehingga massa kiri-kanan seimbang; pakai bentuk 83 (K4 di dada / tangga) dengan merek R7-BERSAMA.
- F-I4 (D-456) "gratis" (T093, 82,65): jadikan PUNCHLINE gaya kartu 85/PROFESIONAL (kata raksasa satu baris di belakang badan Irfan di bidang video, latar satu warna merek — pakai biru startup `#2E5BFF` atau chartreuse `#C8E64A`, huruf hitam/putih sesuai kontras ≥ 4,5:1; bukan hijau yang sama dengan PROFESIONAL), potong masuk di onset "gratis", tahan sampai kata selesai. Matte: pakai cara yang sama seperti PROFESIONAL (`remotion/src/video/bersama/KataBelakang.tsx`, `remotion/public/video/matte-ig-r6.webm` → buat matte untuk rentang gratis dengan offset −16 frame yang sama, provenance `qc/r6/profesional/provenance.json`).
- F-I5 (D-465) 82,4–83,3: "skill" kecil putih + "gratis" tulisan tangan kuning berjauhan di kanan, bersaing dengan wajah dan kolom komentar → TIDAK ada tulisan tangan; "skill gratis" satu frasa (tidak dipisah jauh) dan menjadi satu fokus: punchline F-I4 memuat "SKILL GRATIS" atau "skill" sebagai pengantar kecil rapat di atas kata raksasa "GRATIS" (seperti label slab D-450); kolom komentar dan wajah tidak bersaing di frame itu (kamera fokus ke bidang video).
- Teks narasi lain di IG (T084 T085 T087–T092 T094 T095): bentuk 83 per peran (lihat F-I3), "skill" (T092) boleh tag kaca.

## FILE BOLEH
`remotion/src/video/b6.tsx`, `remotion/src/video/bersama/KataBelakang.tsx`, BARU `remotion/src/video/bersama/ig/**`, `remotion/public/video/matte-ig-*`, `remotion/src/video/bersama/tema.ts` (token baru bertanda D-45x saja), `lego/r7_ig.py`, `lego/r7_override_ig.json`, `lego/cache/r7_ig_*` (D_IG baru: `lego/cache/r7_ig_D_IG.mp4`), `qc/r7/ig/**`.
## FILE JANGAN
Adegan lain, `lego/lego_r6.json`, `lego/r6_gabung.py`, `lego/r7_gabung.py`, `teks.json`, audio/, edit/, override pekerja lain.
## LARANGAN
R7-BERSAMA. UI IG asli (warna, ikon, huruf IG) tetap; tidak ada elemen UI karangan (cincin biru, panah). Kata tidak tampil dua kali (teks punchline menggantikan T093).
## LULUS BILA
1. tsc lulus. 2. Rakitan rentang 76,3–83,82 + lembar 4 fps + still penuh (77,2 / 78,9 / 80,0 / 81,2 / 82,0 / 82,8 / 83,5) di `qc/r7/ig/`; massa kiri-kanan seimbang di tiap still (tulis penilaian per still). 3. PROFESIONAL tetap identik (f67–85 lokal).
## LAPORAN
`handoff/REPORT-R7-ig.md` (sebut waktu persis tiap peristiwa baru untuk SFX: ketik, kirim komentar, balasan muncul, punchline).
