# Fase 3.6: submodule hyperframes dan gsap-skills dicabut (Q6)
Masalah: dua submodule tidak dirujuk skill aktif (mesin = Remotion) dan `git clone --recurse-submodules` menarik seluruh repo hyperframes ke ruang cari agen.
Perubahan:
- `git submodule deinit -f` lalu `git rm` untuk `external/hyperframes` (`382a14d`) dan `external/gsap-skills` (`aed9cfd`); `.gitmodules` tinggal superpowers, anti-slop, awesome-design-md, remotion-skills, earshot. Tidak ada submodule yang di-init di sesi ini.
- `external/README.md`: dua baris tabel, dua baris peta pemakaian, dan kata "HyperFrames" di aturan pakai dihapus. `INDEX.md`: baris hyperframes dihapus.
Tidak diubah (dicek, tidak menyebut keduanya): `sync.sh` (hanya meng-init remotion-skills dan earshot), `doctor.sh`, `README.md` (baris clone rekursif tetap benar untuk lima submodule sisanya; usul Q6 "cukup `git clone` lalu `sync.sh`" tidak diterapkan karena submodule lain, mis. superpowers, ikut terbawa clone rekursif dan belum ada keputusan), `SUMBER.md`. Sisa kata "HyperFrames" hanya di contoh netral `delivery-gate.md` dan satu catatan inbox.
Dampak: skill `hyperframes`, `media-use` dst. yang terpasang di akunmu berasal dari `~/skill-sources`, bukan dari submodule ini, jadi tidak terpengaruh.
Hasil cek: 357 tes OK (64 skip), peta, cookbook 44 kartu, sumber_cek, sync_lantai, sync_negatif bersih; steward_check 0 error.
Level: Risky (menghapus sumber eksternal) dengan jawaban pemilik Q6 ya
Cara membatalkan: `git revert` commit ini; submodule kembali sebagai gitlink dengan SHA yang sama.
