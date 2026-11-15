# Teks: sedikit kata, maks 2 baris, tidak bertumpuk

**Tujuan.** Teks membantu menangkap kalimat, bukan dibaca seperti artikel.

## Bagus itu seperti apa
- 01: caption putih bold 1–3 kata, satu baris, posisi tetap di area dada. Kata kunci besar condensed muncul terpisah, bukan di baris caption.
- 03: tipografi raksasa memenuhi frame untuk kata inti; subtitle kecil tetap terpisah di bawah.
- 04: teks kecil di tengah, kata per kata, tenang. Kecil tetap terbaca karena latarnya polos.
- 05: kinetik bertumpuk boleh **sebagai tekstur**, asal satu baris menyala yang jadi fokus.

## Cara (pilih yang cocok)
- **Blok seimbang, bukan kalimat** (Irfan 15 Nov, builder-trap-r2 v2; bukti ref 17 ganimate, kartu 55/57/73/08): tampilan dua baris atau lebih adalah satu blok; baris terpendek ≥ 85 % lebar baris terpanjang. Kata besar diskalakan sampai lebarnya = lebar baris kecil di atasnya, ujungnya sejajar ("sesuatu yang / **unik.**"). Gagal: baris pengantar 5–6 kata di atas satu kata besar (atas panjang, bawah pendek).
- **1–3 kata per tampil**, frasa diganti utuh di tempat yang sama ("By" → "By People" → "no smarter" → "than you"); kalimat panjang tidak ditumpuk jadi 2 baris subtitle.
- **Tanpa kotak di belakang narasi.** Bentuk + teks dua baris = lower-third berita, nilai editorialnya hilang. Kotak hanya chip yang menempel dan ikut bergerak dengan objek, atau sorot satu kata hero.
- **Mode berganti**: kata hero sendirian sangat besar, blok seimbang, frasa pendek, label menempel objek, tumpuk kata (satu kata per baris, muncul per kata); tidak > 2 tampilan berturut dengan mode + posisi sama.
- **Satu lapisan teks.** Semua ucapan tampil sebagai tipografi kinetik yang posisinya lahir dari komposisi shot; tidak ada baris subtitle terpisah di pita bawah, dan kata penekanan tidak diulang di tempat lain (`LANTAI.md` A1–A3, Irfan 11 Nov).
- ≤ 2 baris sekali tampil (boleh 4+ kata); lebih panjang → pecah jadi tampilan berurutan. Setiap kata yang diucapkan tampil (aturan 44).
- Waktu baca ≥ max(0,8 dtk; 0,30 + 0,06 × huruf); kata tersebar terbaca satu arah; teks/ikon/kartu tidak bertabrakan (aturan 46).
- Satu baris satu ukuran; kata yang dibesarkan pindah baris sendiri.
- Gaya teks dipilih sekali per video (2 font maks: satu display, satu caption) lalu konsisten.
- Teks layar dari ucapan saja (aturan 2).
- **Kata yang sudah tampil tidak bergeser** saat kata berikutnya masuk: dalam satu frasa, wadah (kartu/chip) dikunci di tepi frasa lengkap dan tumbuh ke arah kata baru. Saat kata berganti di tempat yang sama, tidak ada frame dengan dua kata tajam bertumpuk (kata lama blur/pudar dulu) dan tidak ada frame wadah kosong (gagal: builder-trap-r2 r7 B03, kartu kosong 2 f lalu "bikin" melompat 250 px; Irfan 15 Nov "pastikan dulu semuanya").

## Cek cepat
- Lihat frame rapat (tiap 1–2 f) di setiap pergantian kata: ada kartu kosong, dua kata tajam bertumpuk, atau kata yang melompat? Perbaiki sebelum final.
- Ada dua blok teks berbobot sama di satu frame? Pilih satu.
- Teks menutup wajah/objek yang dibicarakan? Pindah.
- `scripts/gate/caption_lines.py render.mp4` lulus.

## Bebas diputuskan
Font, warna aksen kata, posisi, animasi masuk (pop, mask, blur, ketik), kapan pakai penekanan besar. Variasi masuk dianjurkan; teknik sama maks 2× berturut.

## Detail lanjut
`../../references/typography.md` · `decision-guide.md` §1–§3 · `smooth-motion.md`
