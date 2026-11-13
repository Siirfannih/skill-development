# SFX: bunyi untuk momen cerita, bukan untuk setiap kata

**Tujuan.** Penonton merasakan cerita naik, berbelok, dan mendarat. SFX menandai momen itu dan gerak yang terlihat; selebihnya suara pembicara dan musik yang bekerja. Video yang ramai klik terdengar murahan dan berisik (Irfan 13 Nov).

## Bagus itu seperti apa
- Kiblat 55 (Storytelling with footage): ±30 SFX berlabel dalam 46 dtk (±0,65/dtk). Hantaman di frame 0, pop saat foto muncul, whoosh di gerak kamera besar, snare + glitch di judul bab, riser menuju jawaban, sub drop di punchline.
- 02: shutter saat cut ke close-up, paper rip saat scrapbook muncul.
- 05: klik/tap hanya di UI asli yang benar-benar diklik.
- Gagal: builder-trap-r2 v1 (12 Nov): 324 cue/95 dtk, 220 klik per kata, bunyi UI (mouse click, notif, pin, glass pop) untuk cerita sinematik → "sangat berisik", "kesalahan pemilihan sfx" (Irfan 13 Nov).

## Cara
1. **Kosakata dan kepadatan dari kiblat.** Baca §7 kartu kiblat: jenis bunyi apa, di momen apa, berapa SFX berlabel per detik (bukan onset total; onset musik ikut terhitung di situ). Target ±1× kepadatan itu, maks 1,5×.
2. **Daftar momen, bukan daftar event.** Dari naskah dan PLAN: pembuka, judul/jawaban hook, twist, puncak, penutup, gerak kamera besar, benda yang muncul/mendarat/diklik karena ucapan. Event lain (cut di suku kata, sisipan wajah, kata yang muncul) boleh senyap.
3. **Pilih file berurutan:**
   1. `~/sfx/SFXIrfan`: nama file adalah fungsi yang Irfan tetapkan (`Pergantianfoto`, `Katapertama`, `Kinetictypography(gunakansecaraacak)`, `Wooshcameramovementtransisi`, `basmenyebar`, `documenter`, …). Katalog + label dengar: `SFXIRFAN.md`.
   2. Kosakata kiblat yang tidak ada di SFXIrfan (stab, snare, hit): Epidemic di SFXIrfan, Kenyset, lalu ElevenLabs SFX (biaya disebut dulu, aturan 10).
   3. Set SFX milik proyek lain (mis. `jadisatu-60s` v17) hanya untuk peran yang tidak ada di atas, dengan alasan tertulis.
4. **Dengar sebelum pakai.** `earshot describe <file>`; tulis labelnya di kolom `dengar` cue. File yang terdengar seperti UI tidak dipakai untuk momen cerita sinematik.
5. **Satu peran = satu bunyi yang sama** sepanjang video; tiap cue `peran` + `alasan` + `dengar`.
6. **Tidak ada bunyi per kata.** Kata kinetik berbunyi hanya di pergantian kata kunci (triad k3), dan hanya bila kiblat memang memberi bunyi pada teks. Rentetan sejenis (cetakan jatuh, 19 repo menumpuk, tanda X) = satu cue panjang/rattle.
7. **Waktu**: puncak bunyi jatuh di frame visual; whoosh memuncak di kecepatan tertinggi gerak; jarak antarwhoosh ≥ 1 dtk; tidak pernah mendahului objek.
8. **Level**: normalisasi puncak dulu, gain −4…−10 dB untuk momen, −12…−16 dB untuk detail (ketik, klik UI); −33 dB tidak terdengar (Irfan 9 Nov).

## Cek cepat
- `scripts/gate/sfx_density.py render.mp4 cues.json --ref-density <kiblat>`: FAIL bila kepadatan > 1,5× kiblat (atau > 1,2/dtk), bunyi per kata, > 5 cue dalam 2 dtk, atau cue tanpa `dengar`.
- Dengar 10 detik paling padat dengan mata tertutup: ada lapisan klik yang terus-menerus? Hapus.
- Dengar di speaker HP 50 %: tiap bunyi momen terdengar, tidak ada yang tajam (`audio_phone.py`, `sfx_comfort.py`).
- Jeda bicara bersih: `scripts/gate/pause_clean.py` (Lantai E23).

## Bebas diputuskan
File mana dari kosakata itu, karakter (lebih lembut/keras), momen hening yang disengaja, bunyi tambahan di momen yang memang penting bagi cerita.

## Detail lanjut
`SFXIRFAN.md` · `../../references/audio.md` §14.3, §14.8, §14.9 · `scripts/audio/README.md`
