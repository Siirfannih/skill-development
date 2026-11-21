# SFX: lima pilar sound design, satu cue untuk setiap objek/visual penting

**Tujuan.** Video terdengar seperti satu ruang yang hidup: bed ambien konstan di bawah semuanya, dan setiap objek atau visual yang muncul/bergerak punya satu bunyi dari pilarnya: transisi kamera & split, tick KT & UI (per kata KT yang muncul, bervariasi), foley taktil, aksen & riser (Lantai E24, `FAMILI.md` §0). Bunyi yang sama selalu berarti hal yang sama, dan jaraknya dijaga supaya tidak menjadi lapisan klik yang melelahkan.

## Bagus itu seperti apa
- Kiblat 55 (Storytelling with footage): ±30 SFX berlabel dalam 46 dtk (±0,65/dtk). Hantaman di frame 0, pop saat foto muncul, whoosh di gerak kamera besar, snare + glitch di judul bab, riser menuju jawaban, sub drop di punchline.
- 02: shutter saat cut ke close-up, paper rip saat scrapbook muncul.
- 05: klik/tap hanya di UI asli yang benar-benar diklik.
- Contoh gagal: 324 cue dalam 95 dtk, 220 di antaranya klik per kata dari satu file yang sama di level momen, dengan bunyi UI (mouse click, notif, pin, glass pop) untuk cerita sinematik: berisik dan salah palet. Tick per kata yang benar berbeda di tiga hal: klik impuls tunggal, varian/rate berputar, dan level detail −14…−20 dB.

## Cara
1. **Kosakata dari kiblat sebagai famili, jumlah dari objek.** Kolom SFX kartu kiblat dan `FAMILI.md` memberi **famili** bunyi (karakter, bukan nama file); jumlah SFX mengikuti jumlah objek/visual penting di render, bukan angka per detik kiblat.
2. **Daftar objek (`objects.json`) dan cue.** Dari render terkunci tulis setiap objek/visual yang muncul atau bergerak: `{t, objek, peran, famili}` (`famili` = id di `FAMILI.json`); tiap cue membawa `pilar` (`bed`, `transisi`, `tick`, `taktil`, `aksen`), dan bed membawa `dur` sepanjang video; yang sengaja senyap diberi `senyap: true` + `alasan` (garis tergambar, subtitle, hover). Item barisan yang masuk terpisah (> 2 frame) = satu objek masing-masing; yang serentak (≤ 2 frame) = satu event.
3. **Cari per famili, tiga tingkat, sampai ada yang lolos dengar.** Folder adalah kumpulan kandidat, bukan allowlist; palet terlarang tetap ditolak (`FAMILI.md` §Sumber):
   1. **Lokal**: `~/sfx/SFXIrfan` (nama file = fungsi yang Irfan tetapkan; katalog + famili: `SFXIRFAN.md`), lalu `~/sfx/Epidemic` (famili yang tipis di SFXIrfan, sudah diperiksa; katalog + putusan: `EPIDEMIC.md`), lalu `~/sfx/Kenyset`, lalu set SFX proyek lain dengan alasan tertulis. File lokal dipakai bila `earshot rank "<deskripsi famili>"` memberi strong/plausible **dan** `scripts/audio/sfx_vet.py --famili <id>` tidak GAGAL.
   2. **Gratis berlisensi**, bila tidak ada file lokal yang lolos atau peran butuh variasi: `python3 scripts/audio/sfx_cari.py --famili <id> --out projects/<proyek>/sfx/kandidat` (Freesound CC0 + Mixkit; unduh, lisensi ke `SOURCES.md`, periksa, dengar). Tidak berbayar, jadi dijalankan tanpa menunggu.
   3. **Berbayar atau berakun**: ElevenLabs SFX (biaya disebut dulu, Lantai F28c); Epidemic Sound hanya bila MCP `Epidemic_Sound` ada di daftar tool sesi atau `~/.config/epidemic/key` tidak kosong.
   Objek penting diberi `senyap` hanya karena ceritanya butuh diam, bukan karena stok lokal kosong.
4. **Dengar dan ukur sebelum pakai.** `earshot describe <file>` (atau `rank` terhadap deskripsi famili) + `sfx_vet.py --famili <id>`; tulis label dengar di kolom `dengar` cue dan sumber + lisensi di `sumber`. Lolos ukuran belum berarti karakternya cocok: keduanya wajib. File yang terdengar seperti UI tidak dipakai untuk momen cerita sinematik.
5. **Satu peran = satu bunyi yang sama** sepanjang video; tiap cue `peran` + `alasan` + `dengar`.
6. **Tick per kata KT, bervariasi dan pelan.** Tiap kata KT yang muncul mendapat satu klik impuls (cue `pilar: tick`): 2–4 varian file berputar dan/atau `rate` 0,95–1,05, gain −14…−20 dB, tidak pernah rentetan ketikan untuk satu kata. Kata slam/penekanan memakai bunyi aksen, bukan tick. Subtitle bawah yang hanya berganti tidak berbunyi. Jarak: dua bunyi ≥ 100 ms, whoosh ≥ 1 dtk, maksimal 5 event non-tick dan 8 tick dalam 2 dtk.
7. **Waktu**: puncak bunyi jatuh di frame visual; whoosh memuncak di kecepatan tertinggi gerak; jarak antarwhoosh ≥ 1 dtk; tidak pernah mendahului objek.
8. **Level**: normalisasi puncak dulu, gain −4…−10 dB untuk momen, −12…−16 dB untuk detail (ketik, klik UI); −33 dB tidak terdengar.
9. **Ekor**: bila memotong file SFX, pilih titik potong di peluruhan alaminya (cek selubung) dan beri fade-out kurva S/cosinus 150–400 ms; jangan fade linear puluhan ms di tengah bunyi, karena bunyi terdengar hilang mendadak. Whoosh gerak kamera dipilih yang serangannya ≥ 150 ms; serangan mendadak terdengar kasar (`sfx_vet.py --famili air` menolak lonjakan ≥ 20 dB/50 ms). Bunyi transien (klik, pop, hit, shutter) tidak diberi fade-in, karena fade-in yang lebih dari beberapa milidetik mematikan serangannya; fade-in hanya untuk bed, ambien, dan whoosh yang dipotong di tengah.

## Cek cepat
- `scripts/gate/sfx_density.py render.mp4 cues.json --objects objects.json`: FAIL bila tidak ada bed (`pilar: bed` + `dur`) yang menutupi ≥ 90 % durasi, objek/visual penting tanpa SFX (kecuali `senyap` + `alasan`), tick tanpa variasi atau `rate` di luar 0,95–1,05, bunyi per kata yang tidak berlabel `pilar: tick`, satu peran non-tick > 1 file atau satu file > 1 peran, dua bunyi < 100 ms, > 5 event non-tick atau > 8 tick dalam 2 dtk, cue tanpa `dengar`, atau palet terlarang (kayu/thock/felt, koin/logam, kartun/langkah kaki, 8-bit, noise/sinus sintetis, rope-creak). Kepadatan kiblat hanya dilaporkan (Lantai E24).
- Dengar 10 detik paling padat dengan mata tertutup: ada lapisan klik yang terus-menerus? Hapus.
- Dengar di speaker HP 50 %: tiap bunyi momen terdengar, tidak ada yang tajam (`audio_phone.py`, `sfx_comfort.py`).
- Jeda bicara bersih: `scripts/gate/pause_clean.py` (Lantai E23).

## Bebas diputuskan
File mana dari kosakata itu, karakter (lebih lembut/keras), momen hening yang disengaja, bunyi tambahan di momen yang memang penting bagi cerita.

## Detail lanjut
`FAMILI.md` · `SFXIRFAN.md` · `../../references/audio.md` §14.3, §14.8, §14.9 · `scripts/audio/README.md`
