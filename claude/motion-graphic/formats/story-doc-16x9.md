# Format Bible: story-doc-16x9

Esai dokumenter ber-VO di atas footage dan foto arsip. 1920×1080, 60–100 dtk, narator tidak tampil. Dibaca bersama `../MOTION-CORE.md`; Lantai di sana tetap berlaku.

Mesin acuan: `projects/behindwork-batch-1/remotion/` (komponen di `src/`, perancang episode di `bangun/`, skema data di `src/tipe.ts`). Episode ditulis sebagai data (`src/data/<ep>.json`: `adegan`, `kt`, `sfx`, `musik`), bukan komponen baru per adegan.

## 1. Urutan kerja

1. Beat Sheet (§7) terisi penuh dan disetujui user.
2. Aset diunduh ke `remotion/public/<ep>/`, lalu pre-processor aset menulis `aset.json` (ukuran, kotak wajah, titik fokus, zona teks aman). Logo, papan nama, dan tulisan besar di foto ditandai sebagai `"ramai": [[x, y, w, h], …]` (ternormal 0–1).
3. Rancang data episode dari beat sheet + `aset.json`; posisi teks dan kamera diputuskan dari angka itu.
4. `python3 scripts/gate/cek_komposisi.py <ep>.json --public remotion/public --ketat` sampai **nol tanda**. Belum ada build sebelum ini lulus.
5. Still per beat → draft → audit frame → SFX → musik → `scripts/juri/render.sh <proyek> final …`.

## 2. Jenis adegan (hanya ini)

| Jenis | Isi | Pakai untuk |
|---|---|---|
| `jangkar` | Satu aset utama (foto tokoh, tangkapan layar asli, dokumen, klip) full-bleed; kamera virtual berpindah antar titik fokus di dalamnya | tulang punggung tiap babak |
| `arsip` | Foto atau klip full-bleed dengan scrim tipis di sisi teks | bukti harfiah tiap frasa, 0,6–1,5 dtk per shot |
| `napas` | Kanvas solid terang atau gelap + 1–3 kata besar, atau angka raksasa | premis, angka yang harus mendarat, tikungan |
| `ui-editorial` | Artikel, wiki, chat, atau iklan baris yang dibangun ulang sebagai UI; kutipannya disorot stabilo | kutipan dan dokumen, pengganti teks di atas dokumen buram |
| `belah` | Dua footage berdampingan | perbandingan dulu vs kini |

Tidak dipakai: card container, drop shadow tebal, progress bar, timeline "detik ke-N", daftar bernomor yang ditumpuk, inset kecil di kanvas kosong, label sumber di pojok frame.

## 3. Jangkar spasial dan kamera

- Tiap babak punya satu aset jangkar. Kamera (skala + geser) mendarat di bagian yang sedang diucapkan, lalu memotong ke klip pendukung dan kembali ke jangkar.
- Gerak kamera: datang cepat, lalu drift pelan (pegas ketat); bukan linear atau ease standar. Kamera tiba di awal kata yang dirujuk.
- Wajah di aset jangkar tetap utuh di framing akhir tiap titik.

## 4. Kanvas napas

- Satu kanvas napas tiap **6–10 dtk** (jarak > 10,5 dtk = tanda `NAPAS`). Kira-kira 70 % arsip, 30 % kanvas.
- **Maksimal 2 kanvas napas identik berurutan.** Kanvas ketiga wajib berbeda di paling sedikit satu dari: warna kanvas (terang ↔ gelap), skala teks (mis. 170 → 260 px), aksen (satu kata berwarna aksen merek), atau bentuk (kata → angka raksasa). Tanda `KARTU` nol.
- Teks napas masuk **≤ 0,3 dtk** setelah potong; kanvas tidak pernah tampil kosong. Hening yang memang dirancang ditulis di data adegan sebagai `"jeda_sengaja": "<alasan>"`, paling banyak satu kali per video dan disebut di beat sheet. Tanda `JEDA` nol.
- Kanvas gelap berteks putih penuh; aksen berwarna hanya di kanvas terang bila kontrasnya ≥ 4,5 : 1.

## 5. Tata potong

- Jenis: potong keras (bawaan), `whip` (deretan bukti atau angka), `grid` (masuk ke jangkar, lompatan waktu), `putih` (premis), `invert` (pintu ke masa lalu, 2–3 frame).
- **Minimal 3 jenis dalam 15 dtk pertama** (tanda `POTONG` nol). Sesudahnya potong keras tetap bawaan; jenis lain dipakai saat fungsinya muncul, tidak dirata.
- Nol crossfade. Tidak ada frame hitam atau kosong di antara dua adegan: adegan berikut mulai di frame setelah adegan sebelumnya selesai.

## 6. Teks

- **Satu lapisan teks: KT.** Bila KT tampil, tidak ada pita subtitle di bawah (tanda `PITA` nol). Versi bahasa lain dibuat sebagai video terpisah dengan VO dan KT bahasa itu, bukan subtitle di atas KT. Pita subtitle hanya atas instruksi user yang dicatat sebagai pengecualian di `RESEP.md`.
- Peran dan ukuran @1080: narasi `r1` ≥ 96 px, pengantar `lead` ≥ 80 px, kata kunci `r2` 124 px, hero `r6` 210 px, napas 170–260 px, angka raksasa 520 px. KT tidak pernah seukuran subtitle.
- **Dekat subjek.** Tepi kotak teks 4–8 % lebar frame dari batas terluar subjek (bahu, kepala, kursi), di ruang negatif terdekat; rata teks menghadap subjek (subjek di kanan → teks rata kanan di tengah-kiri, dan sebaliknya). Teks tidak didorong ke margin luar. Tanda `JAUH` dan `RATA` nol.
- **Di atas tekstur, pola, atau B-roll abstrak:** display 88–130 px tebal di tengah, latar diredam (blur ±6 px + kecerahan ±0,45) atau kilat invert untuk 1–2 kata. Teks < 60 px dilarang di sana. Teks kecil hanya sebagai label di atas kata kunci besar atau callout dekat bahu, tidak sendirian di kanvas luas. Tanda `KECIL` dan `TEKSTUR` nol.
- **Teks tidak menumpuk logo, papan nama, atau tulisan di dalam foto.** Scrim tipis tidak cukup di atas logo berwarna. Pilih salah satu: pindahkan teks ke ruang kosong aset, potong ke kanvas napas untuk kata itu, atau redam seluruh latar (`grade` dalam/blurkuat). Tanda `LOGO` nol; kontras teks terhadap piksel di bawahnya ≥ 4,5 : 1 dicek di still.
- Teks tidak menutup wajah di awal, tengah, maupun akhir tampilnya (tanda `WAJAH` nol), dan tetap di zona aman (tanda `TEPI` nol).
- UI editorial: kutipan disorot stabilo saat kalimatnya diucapkan; teks UI lain tidak dianimasikan.

## 7. Skema Input Beat Sheet

Diisi penulis naskah, satu baris per beat, sebelum ada kode. Kolom kosong = beat sheet dikembalikan.

| Beat | Waktu | Kalimat VO | Jenis adegan | Aset/Subjek | Teks Kunci | Catatan SFX |
|---|---|---|---|---|---|---|
| 01 | 0,0–6,7 | kalimat VO apa adanya, satu kalimat atau frasa utuh | satu dari §2 + tata potong masuknya (§5) | nama file aset + bagian yang disorot (wajah, papan nama, baris artikel) | 1–3 kata dari ucapan + perannya (`r1`, `r2`, `napas`, …) | perubahan keadaan visual yang berbunyi + pilarnya; "—" bila tidak ada |

Aturan pengisian:

- **Waktu** dari tabel kata VO yang sudah dikunci, bukan perkiraan. Beat > 10 dtk dipecah atau diberi baris `napas`.
- **Jenis adegan**: tiap babak menyebut jangkarnya; baris `napas` muncul tiap 6–10 dtk; lebih dari dua `napas` berurutan menyebut pembedanya (warna, skala, aksen, bentuk).
- **Aset/Subjek**: file yang sudah ada di daftar footage proyek. "Menyusul" tidak diterima.
- **Teks Kunci**: hanya kata yang diucapkan di kalimat itu; tanpa angka atau kalimat tambahan.
- **Catatan SFX**: satu cue per objek; tulis apa yang berubah di gambar, bukan nama file.

## 8. Bunyi

- Urutan: suara dikunci → visual lulus → SFX → musik.
- Lima pilar Lantai (bed, transisi kamera, tick KT/UI, foley taktil, aksen). Bed ada sejak frame 0; musik per babak, tidak pernah kosong di bawah arsip kecuali rentang `sunyi` yang disebut di beat sheet.
- Cue yang lebih panjang dari objeknya diberi `sampai` dan dipotong dengan `scripts/audio/sfx_potong.py`; laporannya ditulis ke `audio/sfx_potong.json`.
- Stem `stem_vo.wav`, `stem_music.wav`, `stem_sfx.wav`, `mix.wav`, dan `cues.json` ditulis saat mix supaya `audio_phone.py --gate` berjalan.

## 9. Gerbang format ini

| Kapan | Perintah | Lulus bila |
|---|---|---|
| Sebelum build, tiap kali data episode berubah | `python3 scripts/gate/cek_komposisi.py <ep>.json --public remotion/public --ketat` | keluar 0, nol tanda |
| Sebelum kunci visual | frame tahan tiap detik dilihat: tidak ada frame gelap/kosong > 0,3 dtk, tidak ada teks di atas logo, tidak ada pita kedua | `VERDICT.md` tiap potongan LULUS |
| Final | `bash scripts/juri/render.sh <proyek> final <Comp> <keluaran.mp4>` dengan `projects/<proyek>/FORMAT` berisi `story-doc-16x9` | keluar 0 (menjalankan `cek_komposisi.py --ketat`, `sfx_potong.py --laporan`, `audio_phone.py --gate`) |
