# Revision log & RETRO

Baca saat Irfan memberi revisi: catat dulu, baru kerjakan. Revisi bawaan terjadi sekali, atas render 1: semua masukan dikumpulkan menjadi satu ronde dan dikerjakan sekaligus menjadi render 2 (finishing). Ronde di luar itu hanya bila user memintanya. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 0. Urutan saat pesan revisi masuk (sebelum edit pertama)

Urutan kerja untuk §21 dan Lantai F27. Tanpa urutan ini, perbaikan satu keluhan mudah ikut mengubah adegan yang sudah disetujui.

1. **Ledger.** Tiap butir pesan Irfan = satu baris `DECISIONS.md` (§21.1): kata Irfan verbatim + cakupan. Keluhan satu blok berlaku ke blok itu. Bila keluhan itu pelanggaran aturan yang sudah tertulis (Lantai, kartu yang dipakai) dan blok lain melanggar hal yang sama, blok lain itu dicatat sebagai baris `usul` (aturannya path:baris + daftar bloknya) dan ditawarkan ke Irfan di chat; baru dikerjakan setelah ia memilih ("alasan, bukan contoh", di bawah). Cakupan di dalam video ditulis balik di delta, tidak ditanyakan; apakah koreksi berlaku di video lain tidak pernah ditanyakan (`../../skill-steward/references/placement.md` §1).
2. **Tulis balik delta** (§21.2): yang berubah, dan yang dijamin tidak berubah. Bila revisi memperpanjang, memotong, atau memindah adegan, bandingkan peta ucapan → visual basis dengan yang baru: kalimat yang kehilangan visual yang sudah disetujui tanpa baris ledger = GAGAL; padatkan adegan baru, jangan geser visual lama. Yang tidak disebut Irfan dianggap disetujui (references/alur-teknis.md §4).
3. **Kunci basis.** `scripts/juri/revisi_cek.py mulai projects/<proyek> --basis <commit yang disetujui> --alasan "…"`, isi `boleh_berubah` dengan ID ledger, `scripts/baseline_lock.py approve` untuk adegan yang tidak disentuh (§21.3). Arsipkan master versi yang disetujui.
4. **Baca ulang utuh** NEGATIF (`SKILL.md`), kartu kiblat proyek, dan docstring skrip juri yang mengukur hal yang dikeluhkan.
5. **Perbaiki di tingkat yang dikeluhkan**: data blok itu (posisi, tahan, ukuran), bukan komponen atau aturan bersama. Perubahan gerak teks (masuk, tahan, keluar) yang lahir dari masukan Irfan dibatasi ke gaya/adegan yang ia keluhkan dan dicek angka per KT sebelum render (durasi tampil penuh, keluar setelah kata terakhir selesai, tidak bertumpuk sejalur); still per 2 dtk tidak cukup untuk menilai gerak. Temuan audit sendiri atau Devil's Advocate atas blok yang tidak dikeluhkan juga baris `usul`: disodorkan sebagai opsi dengan rujukan kartunya, tidak dipasang ke video yang sudah dilihat Irfan sebelum ia memilih.
6. **Ronde revisi cepat (bawaan).** `revisi_cek.py cek` lulus (atribut tiap blok teks dan lapisan dibandingkan dengan basis: yang berubah tanpa baris ledger `Irfan`/`usul-dipilih` = GAGAL, pulihkan). Render hanya lapisan yang berubah, rakit rentangnya saja (`scripts/lego/compose.py lego/lego.json --rentang <awal> <akhir>`, ±1 dtk di kiri-kanan butir), lalu kirim ke Irfan klip rentang itu + lembar still sebelum/sesudah. Master penuh, kunci ulang audio (lock audio boleh basi selama revisi), audit semua frame, dan Devil's Advocate dijalankan sekali saat Irfan menyatakan revisi selesai, sebelum render final (`cookbook/README.md` §Juri 6–7). TASK revisi tidak menjadikan master penuh syarat lulus. Laporan: "siap ditinjau" + angka yang diukur (§21.4).

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
| ID | Tanggal jam | Sumber | Kata Irfan (verbatim) | Cakupan | Status | Menggantikan |
|---|---|---|---|---|---|---|
| D-014 | 2026-10-25 08:16 | Irfan | "real footage itu bagian dari Apple style" | S12 NPNP | terkunci | D-009 |
| D-015 | 2026-10-25 09:02 | usul | — (usul Sutradara: kata hero koral, kartu 07 k3) | S12 kata hero | ditawarkan | |
```
- **Cakupan** wajib spesifik: adegan, beat, atau elemen (`S08-B03 kartu tujuan`). "Semua" hanya bila Irfan sendiri menyebut semua.
- **Sumber** wajib: `Irfan` (ia memintanya), `usul` (ide model, termasuk temuan audit dan Devil's Advocate), atau `usul-dipilih` (Irfan memilih usul itu; kutip jawabannya). TASK dan `qc/cakupan-revisi.json` hanya boleh mengutip baris `Irfan` dan `usul-dipilih`. Usul tetap boleh dan dianjurkan, dengan rujukan kartu, tetapi ditawarkan di chat, tidak dipasang diam-diam.
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
