# Delivery Gate (wajib sebelum video ditunjukkan ke Irfan)

Laporan PASS/FAIL ini dikirim **bersama** video. Setiap PASS membawa bukti konkret (angka keluaran skrip, timestamp, nama still). PASS tanpa bukti = FAIL. Ada satu FAIL = jangan kirim; perbaiki, jalankan ulang. Ringkasan loop kritik atau laporan workflow lain tidak menggantikan laporan ini.

Pola ini diadopsi dari `external/anti-slop` (Delivery Gate + tiga tingkat aturan), disesuaikan untuk video (Irfan 6 Nov).

## 0. Preview dulu, render penuh terakhir

Render penuh adalah langkah paling mahal, jadi ia datang paling akhir (Irfan 6 Nov). Urutan:
1. **Still per beat**: satu still di frame terpenting tiap beat (Remotion `npx remotion still <Comp> out/beat_NN.png --frame=N`; HyperFrames/AE: snapshot setara). Blok 2 dan 3 dinilai dari still ini.
2. **Audio saja**: `npx remotion render <Comp> out/mix.wav --codec=wav` (atau mix dari skrip audio). Blok 1 bagian audio dinilai dari file ini.
3. **Rentang bermasalah saja**: `--frames=120-240` untuk mengecek gerak di beat yang diragukan.
4. **Render penuh** hanya setelah 1–3 lulus, lalu jalankan skrip blok 1 sekali lagi pada MP4 final.

## Blok 1: Hard Gate (semua harus "tidak")

| Cek | Bukti | Aturan |
|---|---|---|
| Format (A/B) tidak tertulis di brief? | baris `Format:` di brief | `formats.md` |
| [B] Suara pembicara diproses (udara > 9 kHz < 70 % sumber, LRA turun > 2 LU)? | `python3 scripts/gate/voice_fidelity.py sumber.mp4 render.mp4` | 43 |
| Ada caption 2 baris, kata yatim, atau teks terpotong tepi? | `python3 scripts/gate/caption_lines.py render.mp4 --stills qc/` + keputusan per still yang ditandai | 44 |
| Ada teks/angka layar yang tidak diucapkan? | transkrip vs daftar teks | 2 |
| Ada UI karangan atau placeholder storyboard di render? | still | 4, 16, 19, 22 |
| Ada adegan terkunci yang berubah? | `scripts/baseline_lock.py check` | 14 |
| Integrated di luar −14,0…−14,5 LUFS atau true peak > −1 dBTP? | ebur128 | §14.10 |
| [A] `audio_qa.py --module5`, `audio_phone.py`, `visual_coverage.py` ada yang gagal? | keluaran skrip | 30, 35, 37, 38 |
| Generate berbayar sebelum gerbangnya terbuka, atau biaya tidak disebut? | log sesi | 10 |

## Blok 2: Purpose-Gate (teknik boleh, alasan wajib ditulis di tabel beat)

FAIL bila teknik ini ada tanpa alasan satu baris di tabel beat:
- kotak/scrim di belakang teks (alasan = kontras terukur < 4,5 : 1) — aturan 6
- glow, gradien, negative, RGB split, flash — aturan 7, 24, 40
- musik dengan build/drop/tension (format B: harus ada alasan dari brief) — `formats.md`
- SFX pada momen tanpa grafik (format B) — `formats.md`
- grafik di atas footage: pilih menyatu atau dunia sendiri — `decision-guide.md` §5

## Blok 3: Quality Lock (semua harus "ya")

- Satu fokus per momen (squint test 10 px pada still) — 1
- Palet lulus `scripts/palette_check.py` — 41
- Transisi tanpa crossfade, mekaniknya dari logika ruang — 5, 42
- Satu baris satu ukuran; serif tidak sejajar bold — 39
- Pindai `slop-catalog.md`: tiap tanda yang muncul punya alasan tertulis atau sudah dibuang

## Format laporan

```
DELIVERY GATE · <proyek> v<N> · Format B
B1 voice_fidelity PASS: udara 0,96, LRA −0,4 LU
B1 caption_lines PASS: 0 frame > 1 baris, 0 tepi (304 frame @4 fps)
B2 kotak beat 7 PASS: kontras 3,1 : 1 tanpa kotak (latar meja putih)
...
Penyimpangan dari storyboard: <daftar + alasan>
```
