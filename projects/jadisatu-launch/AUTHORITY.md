# Jadisatu Launch — dokumen otoritas

Satu-satunya pintu untuk menentukan aturan mana yang menang di film launching Jadisatu. Agent membaca file ini **sebelum** dokumen lain di repo produksi (`motion-production-pc`, `handoff/jadisatu-20261024/`).

## 1. Urutan menang

1. Koreksi spesifik terbaru dari Irfan, dengan tanggal.
2. File ini dan `ART-DIRECTION.md` di folder yang sama.
3. Skill `motion-graphic` (rules inti + cabang).
4. Isi, urutan, dan makna storyboard yang disetujui 23 Okt (lihat §2 untuk batasnya).
5. Skrip asli: VO sebagai VO, tulisan UI sebagai tulisan UI.
6. Referensi visual dan audio, sesuai peran di `ART-DIRECTION.md` §4.

Jika dua sumber di tingkat yang sama bertentangan, jangan memilih sendiri: tanyakan ke Irfan (rules inti 13 `motion-graphic`).

## 2. Peran storyboard

Mandat Irfan 24 Okt 11.44 (tercatat di `STATUS.md`): *"Storyboard = gambaran kasar, bangun ulang versi final: rapi, terstruktur, kamera 3D, kinetik tipografi, premium, minimalis."*

| Yang **dikunci** dari storyboard | Yang **dibangun ulang** di versi final |
|---|---|
| Urutan adegan dan pesan per adegan | Layout akhir, ukuran, dan posisi elemen |
| Isi: tulisan UI, label, nama akun, isi postingan, data | Gerak kamera, transisi, dan timing |
| Identitas objek (akun, avatar, poster, kartu, node) yang konsisten antar-shot | Animasi teks dan UI |
| Dunia per adegan (pixel atau Apple, lihat `ART-DIRECTION.md`) | Komposisi per frame agar 1 fokus dan terbaca di HP |
| Klip pixel lama S03 (pembuka), S04, S13 | — |

Garis merah dan angka pada gambar Irfan adalah arahan fokus kamera dan urutan shot, bukan artwork.

## 3. Kalimat lama yang tidak berlaku lagi

Kalimat berikut di `handoff/jadisatu-20261024/docs/FEEDBACK-LENGKAP.md` digantikan oleh §2:
- baris 25: "Jangan membangun ulang proyek dari nol" → kode dan aset boleh dipakai ulang, tetapi layout dan gerak dibangun ulang sesuai §2.
- baris 27: "Storyboard bukan moodboard kasar …" → storyboard mengunci isi dan urutan, bukan layout akhir.
- baris 270: "Tidak ada izin untuk merombak desain …" → mandat 24 Okt membuka izin itu untuk hal di kolom kanan §2.

`README.md` dan `AGENTS.md` handoff yang menyebut approved-frames sebagai "otoritas visual" dibaca dengan batasan yang sama: otoritas isi dan urutan, bukan layout akhir.

## 4. Gerbang wajib per adegan

Satu adegan dulu, bukan seluruh film:
1. Build satu adegan.
2. Checker layout integrity lolos: tidak ada teks terpotong, teks bertabrakan, dobel exposure, atau teks di bawah ukuran minimum (`DIAGNOSA-JADISATU-V7.md` §3).
3. Kritikus buta (subagent tanpa konteks) memberi tiga hal paling amatir; semuanya diperbaiki.
4. Irfan menilai adegan itu.
5. Baru adegan berikutnya.

Metrik "jumlah gerak" dan "% diam" hanya informasi, bukan syarat lolos. Diam saat penonton membaca itu benar.
