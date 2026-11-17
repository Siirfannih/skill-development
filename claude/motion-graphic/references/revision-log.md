# Revision log & RETRO

Baca saat Irfan memberi revisi: catat dulu, baru kerjakan. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 0. Urutan saat pesan revisi masuk (sebelum edit pertama)

Urutan kerja untuk §21 dan Lantai F27. Tanpa urutan ini, perbaikan satu keluhan mudah ikut mengubah adegan yang sudah disetujui.

1. **Ledger.** Tiap butir pesan Irfan = satu baris `DECISIONS.md` (§21.1): kata Irfan verbatim + cakupan. Keluhan satu blok berlaku ke blok itu. Hanya bila keluhan itu pelanggaran aturan yang sudah tertulis (Lantai, kartu yang dipakai), ia disapu ke **semua** blok yang melanggar aturan yang sama, dan ledger menyebut aturannya (path:baris) serta daftar bloknya ("alasan, bukan contoh", di bawah). Cakupan di dalam video ditulis balik di delta, tidak ditanyakan; apakah koreksi berlaku di video lain tidak pernah ditanyakan (`pustaka/README.md` §Tumbuh).
2. **Tulis balik delta** (§21.2): yang berubah, dan yang dijamin tidak berubah. Yang tidak disebut Irfan dianggap disetujui (SKILL.md §4).
3. **Kunci basis.** `scripts/juri/revisi_cek.py mulai projects/<proyek> --basis <commit yang disetujui> --alasan "…"`, isi `boleh_berubah` dengan ID ledger, `scripts/baseline_lock.py approve` untuk adegan yang tidak disentuh (§21.3). Arsipkan master versi yang disetujui.
4. **Baca ulang utuh** `LANTAI.md`, kartu kiblat proyek, dan docstring skrip juri yang mengukur hal yang dikeluhkan.
5. **Perbaiki di tingkat yang dikeluhkan**: data blok itu (posisi, tahan, ukuran), bukan komponen atau aturan bersama.
6. **Sebelum melapor:** `revisi_cek.py cek` dan `baseline_lock.py check` lulus, rakit lewat `scripts/juri/render.sh`, gerak tiap butir dilihat di draft (`pustaka/README.md` §Juri 7). Laporan: "siap ditinjau" + angka yang diukur (§21.4).

Uji: setiap lapisan yang berubah bisa ditunjuk ke satu butir ledger. Yang tidak bisa, dipulihkan ke basis.

**Terapkan alasan, bukan contoh**: saat Irfan memberi alasan ("b-roll stok = pengisi, jadi teks di tengah"), contoh yang ia sebut hanya ilustrasi. Sebelum menulis TASK, buat tabel semua shot × kondisi alasan itu (mis. jenis footage: stok / bermakna / pembicara) dan terapkan ke setiap shot yang memenuhi kondisinya; pengecualian hanya dengan alasan komposisi tertulis. Contoh yang dicegah: shot stok lain dibiarkan rata kiri hanya karena tidak ada di daftar contoh.

## 19. Log revisi
Log revisi lama ada di `../SUMBER.md` §Log revisi: riwayat, bukan aturan. Revisi baru dicatat di ledger proyek (§21.1) dan `RETRO.md` (§20).

---

## 20. RETRO per gerbang (wajib)
Setiap kali Irfan memberi revisi di sebuah gerbang, sebelum mengerjakan revisinya, tulis entri di `RETRO.md` di folder skill ini (repo `skill-development`, `claude/motion-graphic/RETRO.md`):
```
### <tanggal> · <proyek> · <gerbang>
Revisi Irfan: <satu baris per poin>
Akar masalah: <aturan/acuan apa yang belum ada atau tidak jelas>
Usulan aturan: <kalimat aturan, siap ditempel ke bagian mana di skill ini>
Status: menunggu persetujuan
```
- Usulan tidak langsung dimasukkan; tunggu jawaban Irfan, lalu tempel dan ubah status. Kasus selera sesaat ditulis "tidak ada (kasus khusus)".
- Catat juga di BUILD-LOG proyek: jumlah gerbang, putaran revisi per gerbang, jam kerja per gerbang, dan % lolos putaran pertama. Angka ini dibandingkan antarproyek.

---

## 21. Ledger keputusan dan kunci adegan (wajib di setiap proyek)

Bagian ini mencegah pola berputar: feedback tidak pernah menjadi keputusan tertulis, status storyboard berbalik berkali-kali, dan adegan yang sudah disetujui didesain ulang di putaran berikutnya. Yang bertahan hanya adegan yang dikunci sebagai file jadi.

### 21.1 Ledger: `DECISIONS.md` di folder proyek, hanya ditambah

Satu baris per keputusan. Baris lama **tidak pernah diedit atau dihapus**; keputusan yang berubah ditandai lewat kolom "Menggantikan" di baris baru.

```
| ID | Tanggal jam | Kata Irfan (verbatim) | Cakupan | Status | Menggantikan |
|---|---|---|---|---|---|
| D-014 | 2026-10-25 08:16 | "real footage itu bagian dari Apple style" | S12 NPNP | terkunci | D-009 |
```
- **Cakupan** wajib spesifik: adegan, beat, atau elemen (`S08-B03 kartu tujuan`). "Semua" hanya bila Irfan sendiri menyebut semua.
- **Kata Irfan verbatim**, bukan parafrase model. Parafrase boleh ditambah di kolom terpisah, tetapi tidak menggantikan.
- Sebelum mengubah apa pun, kutip ID baris ledger yang mengizinkannya. Perubahan tanpa ID ledger = jangan dikerjakan; tanyakan dulu.
- Komentar pendek tidak boleh membesar menjadi larangan global. "UI kurang elegan" di S09 adalah keputusan untuk S09, bukan larangan glass di seluruh film. Jika ragu cakupannya, ulangi cakupannya dalam satu kalimat dan tanyakan (rules inti 13).

### 21.2 Feedback = delta per adegan

Format terima: `S08-B03: ubah X. Sisanya tetap.` Sebelum mengerjakan, tulis balik dalam satu kalimat: adegan mana yang berubah, dan adegan mana yang dijamin tidak berubah. Adegan di luar cakupan tidak disentuh.

### 21.3 Kunci adegan = frame baseline

Adegan yang Irfan setujui dikunci dengan `scripts/baseline_lock.py`:
```bash
python3 scripts/baseline_lock.py approve render.mp4 S08 12.0,13.5,15.2 --dir locks --note "D-014"
python3 scripts/baseline_lock.py check render_baru.mp4 --dir locks --shift S08=+2.3   # wajib sebelum kirim
python3 scripts/baseline_lock.py unlock S08 --dir locks --note "D-020"               # hanya dengan ID ledger
```
`check` keluar dengan kode 1 bila adegan terkunci berubah lebih dari 0,5 % piksel. Render seperti itu tidak boleh dikirim.

### 21.4 Kata yang hanya boleh ditulis Irfan

Model hanya menulis "siap ditinjau". Kata "final", "terkunci", "approved", dan "PASS kreatif" hanya muncul di ledger sebagai kutipan Irfan. Gerbang teknis yang lolos ditulis sebagai "QA teknis lolos", bukan "selesai".

### 21.5 Satu skema versi

`<proyek>-r<n>` untuk render penuh dan `<adegan>-r<n>` untuk adegan, naik terus sepanjang proyek walau pipeline berganti. Jangan memulai ulang dari "v1": label versi yang diulang bisa menunjuk render yang berbeda.
