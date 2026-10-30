---
status: archive
scope: archive
how_to_use: "Jangan dimuat. Digantikan skill yang masih aktif."
---

# Sistem Gerak · Irfan Motion (v1 · 14 Okt 2026)

Berlaku untuk semua video motion Irfan (launch Tuntunly, video edukasi 30–60 detik, konten siirfan). Melengkapi TYPE-STYLES.md (tampilan teks) dan SKILL.md (library T/C/X). Kalau ada konflik, file ini menang untuk urusan gerak dan transisi.

Acuan gerak: folder `refs/` di proyek aktif (carousel color flood, Cynosure chips ke tong, AURA shape mask, Higgsfield UI, Notion maskot, penampil PDF, kartu modern).

## 1. Prinsip

1. Tidak ada potongan kosong. Setiap pergantian adegan dipicu oleh sesuatu yang terlihat di adegan sebelumnya (benda, warna, bentuk, klik, atau huruf).
2. Satu frame boleh ramai, tapi hanya satu yang bergerak dan difokuskan. Yang lain diam atau mengambang pelan.
3. Peran teks dibedakan lewat GERAK, bukan hanya font. Peran yang sama selalu bergerak dengan cara yang sama di seluruh video.
4. Karakter adalah benang merah. Tokoh utama dan pemandu hadir dari awal sampai penutup; tidak boleh hilang di tengah.
5. Warna adalah bab. Setiap bagian cerita punya warna; perpindahan warna selalu lewat wipe berlapis, tidak pernah cut warna polos.
6. Tidak ada fade sebagai pengganti gerak. Masuk/keluar memakai mask, gerak, skala, atau warna.

## 2. Keluarga gerak teks (peran)

| Kode | Peran | Masuk | Keluar | Gaya tampilan |
|---|---|---|---|---|
| R1 | Narasi (kalimat biasa) | Per kata naik 24 px dari balik mask garis dasar, 10 f, jeda antarkata 3 f, easing pegas tanpa overshoot | Naik keluar lewat mask 6 f | G2 |
| R2 | Kata kunci (satu per kalimat) | Masuk TERAKHIR, skala 115→100 pegas dengan overshoot kecil + color flash G4 | Color flash balik + smear T15 | G3 (atau G1 di latar hitam) |
| R3 | Klaim masalah | Slam 160→100 dalam 4 f + guncang kamera 8 px | Sesuai adegan (pecah, smear, atau flash) | G1 |
| R4 | Label / chip / pil | Pop 80→100 pegas 8 f; chip boleh jatuh dan bertumpuk seperti Cynosure | Jatuh/terlempar, bukan fade | G7 |
| R5 | Teks diketik | Hanya untuk teks yang memang sedang diketik di UI, dengan kursor ketik terlihat | Terhapus mundur atau ikut kartunya | Inter |
| R6 | Kata pahlawan | Zoom-through ke dalam huruf atau distorsi; maksimal 2 kali per video | Menjadi adegan berikutnya | G1 |

Larangan: tracking spread untuk makna "jauh"; efek ketik untuk headline naratif; dua kata kunci dalam satu kalimat.

## 3. Tata bahasa transisi

| Kode | Nama | Cara kerja | Contoh referensi |
|---|---|---|---|
| X-BAWA | Benda dibawa | Benda di adegan A berubah bentuk/posisi menjadi benda di adegan B (match shape) | Jam → mulut tong; logo → titik kalimat |
| X-BANJIR | Banjir warna berlapis | Elemen yang dipilih/diklik menumpahkan warnanya sampai menutup layar. Lapisan warna pendamping memimpin, warna utama menyusul 3–4 f di belakang | GIF carousel stiker |
| X-MASK | Bentuk jadi jendela | Bentuk di adegan A (lingkaran, lengkung, kartu) menjadi mask yang membuka adegan B | AURA |
| X-SELAM | Kamera menyelam | Kamera masuk ke satu elemen (huruf, titik, kartu, layar) yang menjadi latar adegan berikutnya | Notion: teks diketik → UI |
| X-KILAT | Kilat putih | Satu frame putih penuh lalu 3–4 f kosong. HANYA SEKALI per video | Ledakan "Lupakan" |
| CUT | Potong keras | Hanya di batas babak, tepat di ketukan musik + SFX hantaman | — |

Setiap transisi wajib punya SFX yang mewakili gerak utamanya (whoosh untuk selam, swoosh berlapis untuk banjir, hantaman untuk cut).

## 4. Hierarki lewat ukuran dan status

- Elemen aktif: skala 115–130% + cincin/garis tepi; elemen lain 85–100% dan sedikit pudar warnanya (bukan opacity rendah).
- Pergantian aktif selalu dengan gerak geser (contoh: carousel kanan → kiri), bukan muncul-hilang.

## 5. Kedalaman dan gaya kartu (modern)

- Tiga lapisan: latar (blob abu sangat lembut, bergerak sangat pelan), tengah (kartu utama), depan (kartu pendamping, kursor, karakter).
- Kartu: sudut 24–32 px, bayangan lembut besar (blur 40–60, opasitas 8–12%), boleh miring ±3–6°.
- Saat diam, kartu mengambang naik-turun 4–6 px dalam 2–3 detik (idle). Saat kamera bergerak, lapisan bergerak paralaks (depan lebih cepat).
- Angka penting berputar naik (rolling counter), tebal dan besar seperti angka di kartu referensi.
- Satu easing untuk semua kemunculan: pegas dengan overshoot kecil. Satu easing untuk kamera: ease-in-out kuat.

## 6. Aturan karakter

- Tokoh utama (tahu) muncul di setiap bagian cerita; di adegan UI ia boleh hadir sebagai reaksi kecil di sudut (mengintip, mengangguk, tersenyum) seperti maskot Notion.
- Pemandu (Buddy) setelah diperkenalkan selalu ada; ekspresinya mengikuti makna beat (menjelaskan, menunggu, senang, berpikir, diam). Ekspresi "menunggu" hanya dipakai di beat yang memang tentang menunggu.
- Penutup memperlihatkan tokoh dan pemandu bersama.

## 7. Gerbang sebelum build

Sebelum menyentuh After Effects, buat TRANSITION-SHEET: untuk setiap potongan, satu pasangan still (frame terakhir adegan A dan frame pertama adegan B) + kode transisi + benda pembawa. Disetujui Irfan dulu, baru dibangun.

## 8. Retro per gerbang (wajib)

Setiap kali Irfan memberi revisi di sebuah gerbang, sebelum mengerjakan revisinya, tulis entri di `RETRO.md` (di folder skill ini, bukan di folder proyek) dengan format:

```
### <tanggal> · <proyek> · <gerbang>
Revisi Irfan: <ringkas, satu baris per poin>
Akar masalah: <aturan/acuan apa yang belum ada atau tidak jelas sehingga kesalahan ini terjadi>
Usulan aturan: <kalimat aturan baru, siap ditempel ke file skill mana (TYPE-STYLES / MOTION-SYSTEM / SKILL.md) dan bagian mana>
Status: menunggu persetujuan
```

Aturan:
- Satu revisi bisa tidak menghasilkan aturan baru kalau penyebabnya selera sesaat, bukan pola. Tulis "Usulan aturan: tidak ada (kasus khusus)".
- Usulan aturan TIDAK langsung dimasukkan ke skill. Tunggu Irfan menjawab setuju/tolak/ubah, lalu baru tempel ke file yang dituju dan ubah status jadi "diterapkan" atau "ditolak".
- Sebelum memulai proyek baru, baca RETRO.md dan pastikan semua aturan berstatus "diterapkan" sudah ada di file skillnya.

## 9. Metrik workflow

Setiap proyek mencatat di BUILD-LOG proyek: jumlah gerbang, jumlah putaran revisi per gerbang, jam kerja per gerbang, dan persentase gerbang yang lolos di putaran pertama. Angka ini dibandingkan antarproyek untuk melihat apakah skill makin tajam.
