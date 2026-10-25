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
