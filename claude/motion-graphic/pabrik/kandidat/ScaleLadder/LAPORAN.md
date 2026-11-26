# Laporan uji ScaleLadder

Spec: `46-T1` (tipografi). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: g, j, q

Temuan:
- DOSA g: vision: Poligon abu-abu datar di bagian bawah baris 1-4 (y≈200-270, 475-545, 750-820, 1015-1095) dan pita periwinkle di belakang 'Lom/Lompat'. Pada baris 4 ada kotak periwinkle polos di belakang huruf 'm' (x≈637-798, y≈908-1015). Semuanya berperan sebagai pengganti footage dan tidak berisi gambar apa pun. Ini cukup jelas, tetapi bisa juga dibaca sebagai bentuk dekoratif sengaja.
- DOSA j: f9: 'L' tertutup 14%; f12: 'o' tertutup 12%; f15: 'p' tertutup 12%; f18: 'a' tertutup 12%
- DOSA q: vision baris 4 (f90): Huruf 't' terpotong tepi kanan. Descender 'p' masuk ke blok abu-abu bawah (y≈1015-1035) dan berbenturan dengan zona 'tanpa perantara'. Teks tetap terbaca.

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 48 |
| probe (34 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 4 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | STATIS (keyframe, tanpa metrik struktur/gerak temporal) |
| gerak (tipografi) | frame berubah 0.337 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9973 / 0.2397 / 195.41 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Tidak ada footage sama sekali di kanan. Kiri punya padang rumput, ruang kantor, dan wajah yang tembus di sela huruf. Kanan hanya pita periwinkle dan poligon abu-abu di y≈200-270 pada baris 1 dan serupa di baris lain, yang terbaca sebagai placeholder. Perbaikan: taruh footage nyata di bawah kata raksasa dan buang poligon abu-abu.
2. 'Lompat' dipaksa menyentuh dan memotong tepi frame. Huruf 't' terpotong di x≈966 dan 'L' menempel di tepi kiri. Kiri ('Change') juga mepet tetapi semua huruf utuh. Perbaikan: hitung ukuran huruf dari lebar kata dengan margin sekitar 1-2% supaya kata tidak terpotong.
3. Kata raksasa bergaya bold default dengan bentuk huruf generik (DejaVu Sans Bold) dan tracking longgar. Kiri memakai grotesk rapat dengan tracking negatif sekitar -0,04 em. Perbaikan: ganti ke grotesk bertracking sempit dan rapatkan jarak antarhuruf.
4. Kata kecil ('hanya', 'dua', 'ukuran', 'tak ada') bukan kata pendamping yang hidup. Mereka ditaruh dalam satu baris rapi di kiri-atas dengan ukuran sama dan jarak yang tampak seragam, tanpa sebaran dan tanpa pengaruh posisi pada kata besar. Di kiri, 'you' dan 'call' mengapit kata besar. Perbaikan: sebar kata kecil di kedua sisi kata raksasa dengan jarak yang bervariasi.
5. Latar nyaris putih kebiruan dengan bentuk pucat tanpa arah cahaya atau fokus. Kotak periwinkle di baris 4 (x≈637-798) berada di belakang 'm' tanpa alasan dan terlihat seperti sisa. Kiri punya kontras gelap-terang yang kuat. Perbaikan: beri satu latar dengan kontras jelas (footage atau blok gelap) dan hapus bentuk dekoratif yang tidak membawa pesan.

Lembar side-by-side (referensi kiri | kandidat kanan; referensi statis): `pabrik/kandidat/ScaleLadder/lembar-r1.jpg`

## Putaran 2: LULUS

Dosa terpicu: tidak ada

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 48 |
| probe (34 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 0 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | STATIS (keyframe, tanpa metrik struktur/gerak temporal) |
| gerak (tipografi) | frame berubah 0.316 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9675 / 0.0073 / 146.87 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Footage nyata hilang di semua baris. Referensi menaruh kata raksasa di atas rumput berkabut, ruang kantor, dan wajah, sedangkan kandidat memakai siluet gedung vektor datar dengan jendela kotak-kotak. Pesan 'lompatan skala' tidak berhubungan dengan gambar, dan lapisan footage di sela huruf tidak ada. Ganti dengan klip nyata atau tekstur foto.
2. Kata kecil ('hanya', 'dua', 'ukuran', 'tak ada', 'tanpa', 'perantara') memakai font regular abu-gelap berukuran sekitar 22px. Rasio ke kata raksasa jauh dari 3,5x sampai 8x referensi, jadi terlihat kecil dan lemah. Referensi memakai putih tipis yang tajam di atas gambar. Jarak antarkatanya juga acak (hanya/dua rapat, ukuran/tak ada jauh) dan tidak sejajar satu baseline. Rapikan ke satu garis, naikkan kontras dan bobot tipis yang konsisten.
3. 'Lompat' memakai sans tebal default (kemungkinan DejaVu Bold) dengan tracking normal. Referensi memakai grotesk rapat bertracking negatif sekitar -0,04em, dan 'Change' menyentuh kedua tepi frame. 'Lompat' berhenti di sekitar 80% lebar frame dengan margin kiri-kanan besar. Pakai grotesk rapat dan skalakan tinggi huruf sampai kata menyentuh kedua tepi.
4. Baris 1 punya batang navy kecil di kanan bawah (sekitar x=930, y=215-240) yang tak jelas maknanya, apakah orang atau tiang. Di baris 4 batang itu menempel di bawah huruf 'm'. Elemen ini berdiri sendiri dan tidak punya fungsi skala. Beri tokoh manusia yang jelas sebagai pembanding skala, atau hapus.
5. Baris 4 berganti ke koridor perspektif abu pucat dengan persegi biru muda di tengah. Gayanya berbeda dari kota di baris 1-3, jadi terasa seperti template berbeda. Persegi itu tidak berisi apa-apa, padahal referensi memakai kotak footage kecil di bawah tengah. Warnanya pucat dan cenderung membosankan, dan kata raksasa tidak menutupinya sebagian dari atas seperti mekanik. Beri isi nyata atau jadikan kotak footage kecil.

Lembar side-by-side (referensi kiri | kandidat kanan; referensi statis): `pabrik/kandidat/ScaleLadder/lembar-r2.jpg`
