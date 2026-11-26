# Sampel validasi luar (untuk validator; jangan dikirim oleh pabrik)

Dua komponen berstatus `teruji` di `registry.json` (nol dosa + metrik keras lolos; spec diukur dari klip). Tiap lembar = baris `[referensi kiri | kandidat kanan]`, sel sama besar. Kandidat memakai token demo A; set B ada di `stills-r<N>/B-*.jpg`.

| Komponen | Lembar side-by-side | Frame demo | Putaran lulus |
|---|---|---|---|
| UIActionScript (kartu 63.T5) | `claude/motion-graphic/pabrik/kandidat/UIActionScript/lembar-r1.jpg` | `.../stills-r1/A-f*.jpg`, `B-f*.jpg` | 1 |
| AnchoredCaption (kartu 90.T1, 9:16) | `claude/motion-graphic/pabrik/kandidat/AnchoredCaption/lembar-r2.jpg` | `.../stills-r2/A-f*.jpg`, `B-f*.jpg` | 2 |

Pertanyaan untuk validator, tiap lembar:
1. Dari 5 dosa visual (noda radial pojok, benda 3D generik, halo di belakang teks, blur pada teks, placeholder) dan 3 jangkar ditolak (`~/work/pabrik-run/jangkar/`), apakah ada yang terlewat pabrik? (kritikus pabrik menjawab Tidak untuk semuanya)
2. Apakah kandidat memindahkan MEKANIK referensi (bukan kulit)? Catatan pabrik: demo UIActionScript meniru latar senja referensi (kulit ikut terbawa; lint tidak mengukur ini) dan referensi terdekat di lembar AnchoredCaption dipilih lewat kemiripan struktur, jadi bisa tidak sebanding.
3. Apakah ada satu hal yang masih membuat kanan tampak lebih murahan dari kiri? Daftar 5 hal dari kritikus adversarial ada di `LAPORAN.md` tiap komponen (putaran terakhir).
