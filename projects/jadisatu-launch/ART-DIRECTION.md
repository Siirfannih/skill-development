---
status: principle
scope: jadisatu-launch
how_to_use: "Arah visual launch Jadisatu. Tidak ikut ke proyek lain."
---

# Jadisatu Launch — art direction

Satu film, dua dunia, masing-masing dengan pekerjaan yang jelas. Masalah v7 bukan karena ada dua dunia, tetapi karena belum ada aturan kapan sebuah adegan masuk dunia mana dan bagaimana menyeberanginya.

## 1. Dua dunia

| | **Dunia Pixel** | **Dunia Apple** (cinematic + UI modern) |
|---|---|---|
| Pekerjaan | Tokoh, persona, vibes; transisi agar tidak membosankan | Penjelasan, bukti, dan kepuasan menonton |
| Isi | Karakter voxel Irfan, ruang kerja malam, meja, laptop, sticky note | UI 2D datar (Threads, ChatGPT, workflow, tabel), tipografi kinetik, real footage |
| Kepuasan datang dari | Ekspresi dan aksi tokoh | Kamera, transisi, dan SFX yang bergerak bersamaan |
| Palet | Sesuai klip pixel lama (hangat, kayu, lampu meja) | Putih / gradasi biru lembut yang disetujui; gelap `#01081B`; aksen `#2273FA` |
| Tipografi | Display tebal di ruang tokoh; aksen pixel (Silkscreen/Minecraft) hanya untuk data atau label dunia pixel | Inter Display + Instrument Serif italic untuk satu kata aksen |
| Kamera | Kamera 3D sungguhan, parallax, over-the-shoulder ke laptop tokoh | Hemat dan tegas: diam saat dibaca, lalu push/zoom-through ke objek yang dibicarakan |

## 2. Peta adegan

Peta ini disimpulkan dari `FEEDBACK-LENGKAP.md` §3 dan frame v7. Koreksi di sini bila ada yang salah.

| Adegan | Isi | Dunia |
|---|---|---|
| S01 | Semua orang ngomongin AI → Threads | Apple |
| S02 | "Tapi…", satu pertanyaan, tiga hasil | Apple |
| S03 | Kerja bareng (pembuka pixel terkunci) → ChatGPT dan hasilnya | Pixel → Apple |
| S04 | Iterasi, sticky note "ide baru / satu revisi lagi" | Pixel (klip terkunci) |
| S05 | Builder, "sebenarnya kamu mau", AI Builder Trap, Irfan terjebak | Pixel untuk tokoh; kartu "Tujuan proyek" dan istilah "AI Builder Trap" di dunia Apple (gelap `#01081B`), diseberangkan dengan aturan §3 |
| S07 | Tools, posting prompt, tiga pertanyaan | Apple |
| S08 | Relevansi bisnis, data, 100 konten (poster) | Apple |
| S09–S11 | Brief, workflow dan tim, keputusan manusia | Apple |
| S12 | Hasil, ukuran keberhasilan, NO PERFORM / NO PAY | Apple (real footage) |
| S13 | Penutup pixel | Pixel (klip terkunci) |
| S14 | TRY dan waiting list | Apple |

Keputusan untuk elemen yang di v7 berdiri di luar dua dunia (Irfan, 25 Okt):
- **Real footage NO PERFORM / NO PAY** adalah bagian dunia Apple. Tujuannya membuktikan klaim "no perform, no pay": bubble pop-up di kiri dan kanan adalah **notifikasi order/pembelian dari marketplace** yang muncul di sekitar footage. Aset footage dan notifikasi dibuat lewat ChatGPT Codex dan Gemini Veo. Notifikasi mengikuti aturan UI dunia Apple: 2D datar, satu per satu dengan ritme, satu bunyi notifikasi per kemunculan, dan tidak menutupi wajah atau teks klaim.
- **Kolase poster (S08)** dan **layar kode gelap** dibangun dengan aturan dunia Apple. Layar gelap memakai `#01081B` + aksen `#2273FA`, bukan gaya terminal generik.

## 3. Menyeberang antar dunia

Pergantian dunia adalah momen cerita, jadi selalu ditandai:
- **Pixel → Apple**: kamera masuk ke layar laptop tokoh (zoom-through ke UI). Satu riser naik, lalu mendarat dengan thud hangat di frame pertama UI.
- **Apple → Pixel**: mosaik blok piksel warna `#2273FA` (bangun 3 f, pecah 2–3 f), atau UI menyusut menjadi layar di laptop tokoh. Didahului engsel senyap singkat sebelum hit.
- Tidak ada hard cut polos antar dunia, dan tidak ada dua dunia yang dicampur dalam satu frame, kecuali UI yang tampil **di dalam** layar laptop tokoh.

## 4. Audio

- SFX **jelas dan enak didengar**: hangat, tidak menusuk (thock, sub, pop lembut 100–1.200 Hz; hindari energi tajam 2–6 kHz). Ini standar "Warm, Thock, No Ear-Fatigue" di `motion-graphic/references/audio.md` §14.5.
- Setiap gerak kamera, transisi, onset teks, dan notifikasi bersuara. Bunyinya mengikuti gerak, bukan sekadar ada.
- VO tetap pemilik panggung.

## 5. Peran referensi

| Referensi | Diambil untuk | Jangan diambil |
|---|---|---|
| Holy Freak | Cara menyutradarai tokoh pixel, hierarki teks | Palet merah/teal, condensed caps merah, transisi blok sebagai gaya default |
| Baikov / Shapes | Gerak teks, transisi lewat objek/skala, penempatan SFX | Tick digital tajam |
| Camera (OpenAI) | Gerak kamera bertujuan, state flip | Isi dan identitas |
| Klickpin / AURA | Sebab-akibat UI, alur workflow bercabang | Palet merah |
| Sol | Momen emosional | Pink-cyan |
| Zapier | Tipografi makro, sound design | Ritme 24 fps |

Analisis Gemini di `references/analysis/` adalah interpretasi. Angka yang dipakai untuk syarat lolos harus diukur ulang dengan alat sendiri.
