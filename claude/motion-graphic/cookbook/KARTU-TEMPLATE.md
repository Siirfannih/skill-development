---
id: "NN"
pola: Abstract Mechanic Name
kategori: typography
kategori_lain: []
trigger: fungsi cerita 1; fungsi cerita 2; fungsi cerita 3
sumber: kreator/brand · rasio · durasi
dilihat_bergerak: tidak
diukur: tidak
alias: []
---
# NN · Abstract Mechanic Name

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: <kreator / file / tautan> · <rasio, durasi> · Frame: `../../guide/referensi/sheets/<file>` · Frame kunci: `../../guide/referensi/sheets/keyframes/<id>-k*.jpg`
> Video sumber: `<path di mesin ini>` | tidak ada di mesin ini
> Dilihat bergerak: **ya** (<detik yang dibedah>) | **sebagian** | **tidak** (isi dari frame diam; bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** <gerak/susunan apa yang membuat video ini bekerja, ditulis tanpa nama kreator>
**Narrative trigger:**
- <emosi atau struktur kalimat, mis. "kalimat koreksi: bukan X, tapi Y"> → T<n>
- <…> → T<n>
**Jangan dipakai untuk:** <emosi/struktur yang justru rusak oleh pola ini>
**Kata kunci gaya:** <3–6 kata>
**Diambil untuk:** <bagian yang dimaksud saat referensi ini dikirim; nama file aslinya; dan yang tidak diambil>

## Kondisi footage asli
<rasio; jenis shot dan skala subjek; terang-gelap latar; pakaian; letak ruang kosong; kamera diam/bergerak. Ini yang dibandingkan dengan footage sendiri sebelum meminjam pola.>

## Pengikat (dipakai utuh hanya bila video sumbernya referensi yang dibawa user)
### Warna & tekstur
### Teks
### Ritme

## Pola
Satu blok per pola yang layak dipinjam (maksimal 6). Bagian yang belum terlihat ditulis "belum dibedah", tidak dikarang.

### T1 · <Abstract Pattern Name> · <camera | typography | layout | texture | sfx>
- **Trigger:** <kapan dalam cerita: emosi, struktur kalimat, posisi di naskah>
- **Yang terlihat (termasuk gerak):** <apa bergerak, urutan masuk, cara keluar, apa tajam/lunak, apa menutupi apa> (frame kunci k…, detik …)
- **Kenapa bekerja:** <kondisi footage/cerita yang membuatnya terbaca>
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): <latar → … → matte subjek → teks depan>
  - Gerak: kurva `CURVE.<land|heavy|whip|reveal|leave|wind|drift>` dari `../../scripts/remotion/curves.ts` atau `Easing.bezier(a,b,c,d)`; durasi dalam frame @30 fps; arah dan titik pivot
  - Ruang: <`perspective`, `rotateX/Y/Z`, `translateZ`, parallax per lapisan, kamera virtual> atau "datar"
  - Blur & blend: <motion blur `<CameraMotionBlur shutterAngle={200} samples={16}>` (`../../references/smooth-motion.md`), `filter: blur()` untuk fokus, `mixBlendMode`, mask/`clipPath`>
- **SFX:** famili `<id>` (`../../guide/sfx/FAMILI.md`) · <karakter bunyi di video asli + perannya>; contoh lokal: `<file>` bila ada yang lolos dengar, selain itu `sfx_cari.py --famili <id>` | senyap + alasan (tick per kata mengikuti `kt_tick` proyek, `../../guide/sfx/GUIDE.md`)
- **Pakai bila:** <kondisi> · **Jangan pakai bila:** <kondisi>
- **Remix (anti-jiplak):**
  1. <konteks lain> → pertahankan <mekanik> · ganti <objek/warna/huruf/arah>
  2. <…>
  3. <…, boleh berupa kondisi footage berbeda: latar terang, 16:9, wajah besar>
- *Pengamatan di video asli, bukan target:* <angka visual bila perlu>

## Audio (bila dibedah)
<SFX dan musik: peran, kepadatan, loudness, sebagai pengamatan. "belum dibedah" bila belum.>

## Yang harus terasa sama saat disandingkan
<4–6 pertanyaan yang dijawab dengan melihat still/klip kita di samping frame kunci.>

## Catatan pakai
- <pelajaran dari video yang pernah memakai kartu ini, dengan tanggal dan proyek; disalin utuh dari kartu lama. Kosong bila belum pernah dipakai.>
