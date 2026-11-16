# SFX: satu bunyi untuk setiap objek/visual penting, bukan untuk setiap kata

**Tujuan.** Setiap objek atau visual yang muncul/bergerak dan penting bagi cerita (kartu, ikon, transisi, gerak kamera, kata slam) punya satu bunyi sesuai peruntukannya, dan bunyi yang sama selalu berarti hal yang sama. Kata KT/subtitle yang muncul kata per kata senyap; bunyi diberi jarak supaya tidak berbunyi tanpa henti (Lantai E24, Irfan 16 Nov).

## Bagus itu seperti apa
- Kiblat 55 (Storytelling with footage): ±30 SFX berlabel dalam 46 dtk (±0,65/dtk). Hantaman di frame 0, pop saat foto muncul, whoosh di gerak kamera besar, snare + glitch di judul bab, riser menuju jawaban, sub drop di punchline.
- 02: shutter saat cut ke close-up, paper rip saat scrapbook muncul.
- 05: klik/tap hanya di UI asli yang benar-benar diklik.
- Gagal: builder-trap-r2 v1 (12 Nov): 324 cue/95 dtk, 220 klik per kata, bunyi UI (mouse click, notif, pin, glass pop) untuk cerita sinematik → "sangat berisik", "kesalahan pemilihan sfx" (Irfan 13 Nov).

## Cara
1. **Kosakata dari kiblat, jumlah dari objek.** §7 kartu kiblat memberi jenis bunyi dan rasanya; jumlah SFX mengikuti jumlah objek/visual penting di render, bukan angka per detik kiblat (gagal: 14 Nov, target kepadatan kiblat membuat objek tidak berbunyi; Irfan 16 Nov).
2. **Daftar objek (`objects.json`).** Dari render terkunci tulis setiap objek/visual yang muncul atau bergerak: `{t, objek, peran}`; yang sengaja senyap diberi `senyap: true` + `alasan` (garis tergambar, subtitle, hover). Item barisan yang masuk terpisah (> 2 frame) = satu objek masing-masing; yang serentak (≤ 2 frame) = satu event.
3. **Pilih file berurutan. Folder adalah kumpulan kandidat, bukan allowlist; palet terlarang tetap ditolak:**
   1. `~/sfx/SFXIrfan`: nama file adalah fungsi yang Irfan tetapkan (`Pergantianfoto`, `Katapertama`, `Kinetictypography(gunakansecaraacak)`, `Wooshcameramovementtransisi`, `basmenyebar`, `documenter`, …). Katalog + label dengar: `SFXIRFAN.md`.
   2. Kosakata kiblat yang tidak ada di SFXIrfan (stab, snare, hit): Epidemic di SFXIrfan, Kenyset, lalu ElevenLabs SFX (biaya disebut dulu, aturan 10).
   3. Set SFX milik proyek lain (mis. `jadisatu-60s` v17) hanya untuk peran yang tidak ada di atas, dengan alasan tertulis.
4. **Dengar sebelum pakai.** `earshot describe <file>`; tulis labelnya di kolom `dengar` cue. File yang terdengar seperti UI tidak dipakai untuk momen cerita sinematik.
5. **Satu peran = satu bunyi yang sama** sepanjang video; tiap cue `peran` + `alasan` + `dengar`.
6. **Tidak ada bunyi per kata KT/subtitle.** Kata yang muncul kata per kata senyap; hanya kata slam/penekanan yang bergerak sebagai objek mendapat satu bunyi. Jarak: dua bunyi ≥ 100 ms, whoosh ≥ 1 dtk, maksimal 5 cue dalam 2 dtk (gagal: builder-trap-r2 v1, 220 klik per kata).
7. **Waktu**: puncak bunyi jatuh di frame visual; whoosh memuncak di kecepatan tertinggi gerak; jarak antarwhoosh ≥ 1 dtk; tidak pernah mendahului objek.
8. **Level**: normalisasi puncak dulu, gain −4…−10 dB untuk momen, −12…−16 dB untuk detail (ketik, klik UI); −33 dB tidak terdengar (Irfan 9 Nov).

## Cek cepat
- `scripts/gate/sfx_density.py render.mp4 cues.json --objects objects.json`: FAIL bila objek/visual penting tanpa SFX (kecuali `senyap` + `alasan`), satu peran > 1 file atau satu file > 1 peran, dua bunyi < 100 ms, bunyi per kata KT, > 5 cue dalam 2 dtk, cue tanpa `dengar`, atau palet terlarang (kayu/thock/felt, koin/logam, kartun/langkah kaki, 8-bit, noise/sinus sintetis, rope-creak). Kepadatan kiblat hanya dilaporkan (Lantai E24, Irfan 16 Nov).
- Dengar 10 detik paling padat dengan mata tertutup: ada lapisan klik yang terus-menerus? Hapus.
- Dengar di speaker HP 50 %: tiap bunyi momen terdengar, tidak ada yang tajam (`audio_phone.py`, `sfx_comfort.py`).
- Jeda bicara bersih: `scripts/gate/pause_clean.py` (Lantai E23).

## Bebas diputuskan
File mana dari kosakata itu, karakter (lebih lembut/keras), momen hening yang disengaja, bunyi tambahan di momen yang memang penting bagi cerita.

## Detail lanjut
`SFXIRFAN.md` · `../../references/audio.md` §14.3, §14.8, §14.9 · `scripts/audio/README.md`
