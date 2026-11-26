# Kartu C1: `cookbook.py cek` memeriksa rujukan kode dan struktur vault; CATALOG menjelaskan id duplikat
Masalah: `cek` hanya memeriksa 44 kartu aktif. Rujukan `Papan.tsx` di kartu 63 dan 80 menunjuk berkas yang hanya ada di dua folder proyek (produksi tidak boleh membuka proyek lain), dan penyimpangan struktur vault tidak terlihat. Sepuluh id alias tanpa berkas vault terlihat seperti alias putus padahal sengaja digabung (commit 271ddf41).
- `tools/cookbook.py cek`: tiap token berekstensi `.tsx/.ts/.py/.sh/.md` dalam backtick di baris `Primitives/Ref` harus ada (path ber-slash dicari dari akar repo lalu `claude/motion-graphic/`; nama polos dicari di seluruh repo kecuali `projects/` dan `archive/`). Hilang = `GAGAL ... Primitives-Ref tidak ada: <path>`. Nama tanpa ekstensi dan glob diabaikan.
- Struktur vault dan id yatim dicetak sebagai `VAULT (info)`, tidak pernah GAGAL dan tidak dihitung di `--ketat`. Kartu S hanya wajib Inti/Kerangka. Hari ini: satu set temuan untuk kartu 95; yatim 01, 06, 10-13, 37, 41.
- CATALOG: alias yang tidak punya berkas vault dicetak `NN = duplikat dari MM → kartu` (peta `DUPLIKAT` di cookbook.py, dari pesan commit 271ddf41), plus satu baris `44 kartu aktif · 97 kartu vault · 10 id duplikat`. Header tabel tidak berubah.
- Kartu 63 dan 80: `Papan.tsx` di baris Primitives/Ref diganti `scripts/remotion/ae-primitives/kamera/SpatialAnchorCamera.tsx` (entri `SpatialAnchorCamera.tsx` polos yang sudah ada dilebur ke path itu, supaya tidak dobel). Kalimat Invariant yang menyebut `Papan.tsx` tidak disentuh (bukan Primitives/Ref). Backlog #11 tetap terbuka.
Bukti: tes baru `test_cookbook_cek.py` (17 tes: rujukan hilang/ada/di proyek, vault hanya info, yatim, kartu S, alias duplikat, repo asli `0 GAGAL`, 97 berkas vault, 63/80). Vault tidak diedit (`git diff --stat -- .../_vault` kosong).
Level: Behavior (pemeriksa) dan Mechanical (teks CATALOG)
Persetujuan: perlu ya pemilik sebelum merge ke main
Cara membatalkan: `git revert` commit ini.
