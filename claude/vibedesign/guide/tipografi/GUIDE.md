# Tipografi: setiap huruf punya peran

## Cara
- Satu keluarga sering cukup; hierarki dibentuk lewat ukuran, berat, warna, dan posisi. Dua keluarga masih bisa bila perannya berbeda jelas; tiga jarang berhasil.
- Tulis peran tiap keluarga di RESEP ("A = semua teks; B = label UI kecil").
- Penekanan satu kata kunci tidak harus dengan ganti font: bungkus kata itu dengan shape warna yang sedikit dimiringkan, ganti warna, atau perbesar.
- Huruf rounded/fun untuk satu kata ekspresif boleh bila slide itu memang bernada lucu, dan ditulis perannya.

## Cara memutuskan
- **[TIP-01] Satu sistem huruf; huruf kedua hanya dengan peran dan frekuensi** · kelas H (NEGATIF 1) · cek: RESEP
  - Pemicu: kamu ingin "mempercantik" satu kata dengan huruf lain (serif/italic/script), atau kiblat/merek memakainya.
  - Anti-pola: satu kata "emosional" berganti huruf di banyak frasa tanpa peran yang sama; serif tipis jomplang dengan sans tebal tanpa sistem. Itu tanda slop yang berulang lintas model.
  - Invarian: satu keluarga utama; penekanan default lewat bobot, ukuran, warna, kapital, atau posisi. Huruf kedua (serif, italic, script, tulisan tangan) sah bila ia sistem: satu peran tetap di seluruh set slide, ≤ 1 kemunculan per slide, sumbernya merek atau REF-SPEC (`huruf_kedua: {keluarga, peran, frekuensi}`).
  - Karena: campuran tanpa peran membaca sebagai template, dan mata berhenti di kata yang salah.
  - Boleh: kapan saja huruf kedua punya peran dan frekuensi yang tertulis (alasan dari referensi pilihan user atau merek).
  - Gerbang: tunjukkan slide + baris "Peran huruf" (peran + frekuensi) di RESEP.
- **[TIP-02] Kata kunci ditekan dengan wadah, bukan ganti gaya huruf** · kelas P · cek: sketsa
  - Pemicu: satu kata dalam kalimat harus menonjol.
  - Anti-pola: kata kunci diganti font lain sehingga kalimat pecah jadi dua suara.
  - Invarian: pertahankan keluarga dan berat yang sama; beri penekanan lewat salah satu: shape warna aksen di belakang kata (rotasi −2° s.d. −6°), warna aksen, atau ukuran di baris sendiri.
  - Karena: kalimat tetap terbaca satu suara, dan wadah memberi titik fokus yang kuat tanpa menambah keluarga huruf.
  - Boleh: kotak seleksi gaya editor desain sebagai wadah bila dunia visualnya workspace.
  - Gerbang: still.
- **[TIP-03] Teks melengkung butuh bentuk yang memberi alasan** · kelas P · cek: sketsa
  - Pemicu: kamu memakai textPath/lengkungan untuk satu kata atau frasa.
  - Anti-pola: teks dilengkungkan sebagai hiasan tanpa mengikuti objek, sehingga terasa template dan lebih sulit dibaca.
  - Invarian: lengkungkan teks hanya bila lengkungnya mengikuti kontur objek nyata di slide (lingkaran, badge, jalur gerak) yang ditulis di RESEP; selain itu teks lurus (rotasi kecil ≤ 6° boleh).
  - Karena: lengkungan tanpa alasan menurunkan keterbacaan dan menarik mata dari urutan baca.
  - Boleh: logo/stiker berbentuk lingkaran yang memang memuat teks melingkar.
  - Gerbang: still + baris alasan di RESEP.
