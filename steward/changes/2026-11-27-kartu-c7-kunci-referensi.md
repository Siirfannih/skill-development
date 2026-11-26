# Kartu C7: kunci referensi dirumuskan ulang: bentuk baru boleh dirancang, isi dan angka referensi tidak boleh dikarang
Masalah: tiga kalimat melarang merancang apa pun yang tidak ditunjukkan referensi atau kartu, sehingga agen terdorong menyalin kartu utuh. Aturan yang layak dipertahankan (pemilik: "Lihat dan ukur sendiri, jangan mengarang") adalah larangan mengarang isi atau angka sebuah referensi.
- `00-core-invariants.md` butir 5: `jika pola tak ada di referensi, jangan dikarang.` → `bentuk baru boleh dirancang, angka referensi jangan dikarang.` (core 931 dari batas 1000 token).
- Q02 Invariant: `bila pola tak ada di kartu referensi, hapus atau ganti` → `elemen yang tidak lolos makna, sistem, takaran dihapus atau diganti` (tiga pertanyaan NEGATIF sendiri).
- README §5 butir 4: `tanya user sebelum membangun` → `rancang dari NEGATIF dan profil merek, lalu sebut pilihan itu di gerbang berikutnya` (bukan perhentian baru: gerbang pemilik berikutnya sudah memperlihatkannya).
- Q07 (Fase 2 meninggalkan teksnya): `Wajib mengisi eksplisit` → `Bila mendelegasikan, isi eksplisit`. `trigger:` Q07 tidak diubah: bunyinya "mendelegasikan adegan ... atau melakukan audit frame/still agar biaya token terkendali", bukan klaim berlaku untuk setiap audit.
- M03 (Fase 2 meninggalkan teksnya): `atau membiarkan KT tampil tanpa tick SFX.` → `... tanpa tick SFX padahal \`kt_tick\` proyek memintanya.`; Gate M03 sudah berbunyi "sesuai mode `kt_tick`".
- DILEWATI: 00-core butir 7 (`tabel ../motion-theme-director/SKILL.md §2` sudah tidak ada: Fase 3 sudah mengubahnya menjadi rujukan ke `../references/dunia-visual.md` bagian "Kata gaya di brief").
Bukti: `cek --ketat` 44 kartu · 0 GAGAL; grep `jangan dikarang|hapus atau ganti|tanya user sebelum membangun` di luar vault hanya mengembalikan baris 00-core baru (dan dua kalimat lain yang tidak terkait: BRAND.md "nilai yang belum diketahui", tema dataviz "angka dari naskah"). Kalimat "jangan mengarang" yang wajib selamat tetap ada.
Level: Behavior
Persetujuan: perlu ya pemilik sebelum merge ke main
Cara membatalkan: `git revert` commit ini.
