---
status: evidence
scope: motion
how_to_use: "Catatan revisi. Buka untuk mengecek satu keputusan lama, bukan untuk menyalin angkanya."
---

# Revision log & RETRO

Baca saat Irfan memberi revisi: catat dulu, baru kerjakan. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 19. Log revisi Irfan (memori gaya) — tambah baris setiap revisi
| Tanggal | Revisi | Aturan |
|---|---|---|
| v11 Tuntunly | Blur hitam di belakang font; "makin jauh" pakai tracking; "nggak tahu mulai" pakai teks; praktik terlalu kosong; terlalu banyak fokus; UI bukan asli; highlight "File"; objek keluar tong; pilih karakter pakai fade | §7.3, §6.1–6.13 |
| 13–14 Okt | Neon stroke salah tafsir; transisi putus; tokoh hilang; PDF jadi kertas | Efek harus punya video acuan; peta transisi; karakter hadir sampai akhir |
| 17 Okt | Audio dibuat sebelum script/storyboard final | Gerbang §1 dikunci |
| 17 Okt | Animatic vertikal, gaya slide | Format default 16:9; validasi 1 adegan dulu |
| 17 Okt | Storyboard dipakai sebagai background + teks ditumpuk | Family A dari elemen terpisah §5 |
| 17 Okt | Rp47.000.000 & "belum cukup bagus" di luar VO | Teks layar hanya dari VO |
| 17 Okt | Kamera menyorot monitor latar, bukan laptop yang dikerjakan | Subjek = yang dikerjakan tokoh; C13 |
| 17 Okt | Skill terpecah → kehilangan konteks | Satu skill sebagai sumber kebenaran |
| 17 Okt | Teks world-locked membesar menabrak kepala | Anchor dari titik layar + batas skala ≤ 1,06 (T22) |
| 17 Okt | Rotasi zona teks dipakai demi variasi, perhatian terpecah | Teks pindah karena objek pembicaraan berubah (§6.4) |
| 18 Okt v2 | Koin dan kubus voxel murahan; latar merah-cokelat | Objek familiar (ikon app + badge); gelap = navy + biru (§13) |
| 18 Okt v3 | Audio sunyi, SFX "sekadar ada"; satu backsound | §14.2–14.3: peran bunyi per visual, beberapa cue musik |
| 18 Okt v3 | Teks dan transisi "masih sama" | Satu teknik per momen, tidak berulang dalam 15 dtk (§8) |
| 18 Okt v4 | "3D" disalahartikan sebagai bidang tidur lalu diangkat | §7.4 |
| 18 Okt v4 | Kamera bergerak di adegan informasional; SFX UI senapan mesin; pegas lebay | Info diam (§9); cluster (§14.3); overshoot ≤ 1,05 (§11) |
| 18 Okt v4b | Agent tidak menganalisis referensi sendiri, menunggu masukan berulang | §2 bedah per frame + §16.6 metrik sebelum kirim |
| 18 Okt v4b | Tipografi glitch/terpotong ("dilewati", "terjebak", "belum cukup"); teks dan UI kaku; blok merah di belakang kata; transisi mendadak | §7.3 larangan; §8 T28–T32; §11 easing; §10 transisi termotivasi |
| 18 Okt v4b | Kinetic typography 1 layer datar, tidak ada rotasi seperti Holy Freak; teks ekstrusi "Jadisatu"/"COBA" kurang matang | §7.4 default 2.5D; ekstrusi hanya lolos TYPE-TEST |
| 18 Okt v4b | Post Threads yang diperbesar terpotong kolom | §6.11 elemen diperbesar keluar frame dengan wajar |
| 18 Okt v4b | Whitespace terburu-buru: teks besar kiri + kartu kanan di satu frame | §6.3 dilarang |
| 18 Okt v4b | "Tapi sistem yang rapi" / "BELUM CUKUP." / chip saling tumpang | §16.2 cek tumpang tindih |
| 18 Okt v4b | Tidak ada SFX di kemunculan teks, count angka, transisi; Gemini dipercaya | §14.3 ≥ 85 % terukur; §2 alat sendiri (librosa + Demucs) |
| 18 Okt v4b | Skill tidak dimuat dari Mac; skill terpecah; AE tidak dipakai padahal ada pipeline Tuntunly | §0 muat dari Mac; satu skill ini; §3 AE default |

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

Audit Jadisatu (25 Okt) menunjukkan pola berputar: `KEPUTUSAN_TERKINI.md` identik di 8 versi V7→V14, sehingga feedback V8–V14 tidak pernah menjadi keputusan. Status storyboard juga berbalik minimal 7 kali, dan adegan yang sudah disetujui didesain ulang di putaran berikutnya. Yang selamat hanya adegan yang dikunci sebagai file jadi. Bagian ini mencegah pola itu.

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
`check` keluar dengan kode 1 bila adegan terkunci berubah lebih dari 0,5 % piksel. Render seperti itu tidak boleh dikirim. Diuji 25 Okt pada render Jadisatu: V13 vs V14 lolos (piksel identik), sedangkan V13 vs V10 di adegan pixel gagal 80 %; dengan `--shift +3,3` lolos.

### 21.4 Kata yang hanya boleh ditulis Irfan

Model hanya menulis "siap ditinjau". Kata "final", "terkunci", "approved", dan "PASS kreatif" hanya muncul di ledger sebagai kutipan Irfan. Gerbang teknis yang lolos ditulis sebagai "QA teknis lolos", bukan "selesai".

### 21.5 Satu skema versi

`<proyek>-r<n>` untuk render penuh dan `<adegan>-r<n>` untuk adegan, naik terus sepanjang proyek walau pipeline berganti. Jangan memulai ulang dari "v1", karena di Jadisatu label "v5" dan "v7" sempat berarti tiga render berbeda.
