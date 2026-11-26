# Saringan pelajaran: dari kesalahan proyek ke aturan skill

Dibaca saat sebuah koreksi atau kesalahan akan ditulis ke repo (AGENTS.md butir 6, §Akhir sesi butir 1). Tujuannya dua: sesi berikutnya tidak mengulang kesalahan yang sama, dan skill tidak terisi kasus satu proyek yang ikut dibawa ke proyek lain.

## 1. Kesalahan selalu dicatat dulu di proyeknya
Setiap koreksi dan kesalahan masuk `projects/<proyek>/DECISIONS.md` saat diterima, bebas bentuk: kata pemilik, frame/detik, yang diubah, bukti. Ini catatan kejadian, bukan aturan. Satu kejadian tidak langsung menulis ke `guide/`, `LANTAI.md`, atau kartu.

## 2. Tiga kelas, tiga tempat

| Kelas | Isi | Tempat | Dimuat |
|---|---|---|---|
| **S** selera/proyek | posisi, warna, gaya, objek, koordinat satu video | `projects/<proyek>/` ; cara memakai satu gaya → "Catatan pakai" kartu kiblat | hanya saat proyek/kartu itu dipakai |
| **P** pertimbangan | kesalahan kerja yang butuh menimbang konteks | `guide/<urusan>/GUIDE.md` §Cara memutuskan, satu butir ber-ID | per tahap (`tahap.py`), bukan semua sekaligus |
| **H** hukum | salah di gaya apa pun **dan** bisa diukur biner | `LANTAI.md`, satu baris per ID; cara ukur di docstring skrip juri | selalu (intinya saja) |

Ragu antara dua kelas → kelas yang lebih rendah. Parameter yang bergantung gaya (durasi ease, ukuran huruf, nilai zoom) tidak pernah naik ke P/H.

## 3. Uji sebelum naik ke repo
Kandidat P atau H harus lolos, berurutan:
1. **Kelas, bukan kejadian.** Kelompokkan kejadian per mekanisme kegagalan. Dua keluhan yang beda objek bisa satu kelas; sepuluh keluhan mirip bisa tetap selera satu video.
2. **Tanpa kata benda proyek.** Bunyi aturan tidak memuat nama proyek, merek, file, objek, kalimat naskah, atau koordinat. Objek diganti peran (`{area-bukti}`, `{gerak pemicu}`).
3. **Netral gaya.** Tetap salah di kiblat mana pun. Bila tidak → S.
4. **Mekanis.** Invarian menyebut angka, ambang, atau cara hitung. "Lebih mulus", "lebih rapi" ditolak.
5. **Gerbang ada.** Skrip/perintah dengan kondisi GAGAL (H), atau "tunjukkan frame X + alasan" (P).
6. **Tidak duplikat.** Cari butir yang ada; bila mirip, edit butir itu (delta per ID), jangan tambah butir baru.
7. **H saja:** muncul di ≥ 2 proyek berbeda, tidak salah-tembak pada frame yang sudah disetujui, dan bunyinya disetujui pemilik (`PENDING.md`).

## 4. Format butir

```
- **[URS-NN] Judul pendek** · kelas P|H · cek: <tahap/titik jeda>
  - Pemicu: kondisi yang terlihat dari brief, storyboard, atau frame SEBELUM salah terjadi
  - Anti-pola: kelas kesalahan yang diamati, satu kalimat tanpa cerita
  - Invarian: yang harus benar, diawali tindakan, dengan angka/cara hitung
  - Karena: akibatnya bagi penonton atau mutu (wajib; tanpa ini butir ditolak)
  - Boleh: pengecualian sah atau butir yang mengalahkannya
  - Gerbang: skrip + kondisi GAGAL, atau frame yang harus ditunjukkan
```
Kode urusan: `TKS` teks, `GRK` gerak, `SFX` sfx, `AUD` audio, `VIS` visual, `QC` cek akhir. ID tidak pernah dipakai ulang. Tanpa huruf kapital semua dan tanpa "WAJIB/JANGAN PERNAH": alasan di kolom Karena yang membuat aturan menggeneralisasi; penekanan membuat agen menerapkannya berlebihan. Aturan tanpa pengecualian sama sekali dijadikan gerbang kode/hook, bukan teks yang lebih keras.

## 5. Asal-usul dan penghitung di SUMBER.md
File instruksi tidak memuat proyek, tanggal, atau cerita. Di `SUMBER.md` skillnya, di bawah ID: proyek sumber (rujuk DECISIONS), uji silang, dan penghitung `nilai` (mulai 2; +1 tiap gerbangnya menangkap kegagalan nyata; −1 tiap salah-tembak; −2 bila dilanggar dan pemilik menyetujui hasilnya).

## 6. Rawat
- Ubah per ID sebagai diff kecil. Jangan meminta model menulis ulang seluruh `GUIDE.md`/`LANTAI.md`: tulis-ulang massal memadatkan dan menghilangkan butir.
- Akhir tiap proyek: butir yang dipakai dinilai (§5). Nilai 0 → pindah ke bagian "Pola lama" (ID tetap, kasus uji disimpan). H yang sering salah-tembak turun ke P; P yang terus terlewat walau jelas naik ke H dengan gerbang kode.
- Butir lama tanpa ID dibiarkan sampai disentuh; saat disunting, ubah ke format §4.

Dasar riset: `archive/riwayat/reports/Pelajaran agen tanpa overfitting.md`.
