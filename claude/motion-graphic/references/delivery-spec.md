# Spesifikasi pengiriman (profil V1)

Satu master MP4 untuk semua platform. Alat ukur: `scripts/gate/delivery_probe.py` (6 cek, exit 0/1). Referensi mandiri; belum disambung ke `render.sh` atau `gerbang_produksi.sh`.

## Profil V1

| Item | Nilai | Dicek probe |
|---|---|---|
| Kontainer | MP4, `+faststart` (moov sebelum mdat) | ya |
| Video | H.264 High, yuv420p (4:2:0), CABAC, B-frame 2, GOP `-g 15` (setengah fps pada 30 fps) | codec, pix_fmt |
| Warna | bt709 pada TIGA tag (space, primaries, transfer) + range tv | ya |
| Resolusi / fps | 1080x1920 atau 1920x1080; fps = fps komposisi | tidak |
| Bitrate video | CRF 18, `-maxrate 12M -bufsize 24M` (animasi flat biasanya jauh di bawah 12 Mbps) | tidak |
| Audio | AAC-LC, 48 kHz, stereo, 192 kbps | ya |
| Loudness mix | -14...-16 LUFS integrated (toleransi 0,5), true peak <= -1 dBTP, diukur di MP4 setelah AAC | ya |

Ambang loudness sejalan dengan `audio.md` (tabel level mix); loudness tidak dikejar dengan limiter pada suara.

## Perintah encode (diuji lulus probe)

```bash
ffmpeg -i master.mov -i mix.wav -map 0:v -map 1:a \
 -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,setparams=colorspace=bt709:color_primaries=bt709:color_trc=bt709:range=tv" \
 -c:v libx264 -profile:v high -preset slow -crf 18 -maxrate 12M -bufsize 24M -g 15 -bf 2 \
 -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart out.mp4
python3 claude/motion-graphic/scripts/gate/delivery_probe.py out.mp4
```

Tag warna: `-color_primaries/-color_trc/-colorspace` sebagai opsi output TIDAK menulis tag pada ffmpeg 9.0.2 (primaries/transfer tetap `unknown`, space saja yang terisi; diuji 25 Nov 2026). Tulis lewat `setparams=` di filter (di atas), atau ganti dengan `-x264-params colorprim=bt709:transfer=bt709:colormatrix=bt709:fullrange=off` setelah `scale`/`format` (juga lulus probe). Memeriksa `color_range` saja tidak cukup.

Mix akhir yang levelnya di luar target: `scripts/audio/loudness_2pass.sh mix.wav mix_n.wav --mix-akhir` (linear saja, bukan untuk stem suara), lalu encode.

## Catatan per platform

| Platform | Status sumber | Isi |
|---|---|---|
| YouTube | resmi (YouTube Help, "Recommended upload encoding settings", dibaca 25 Nov 2026) | MP4, moov di depan, H.264 High, closed GOP setengah fps, 2 B-frame, 4:2:0, bt709, AAC 48 kHz stereo 384 kbps (192 kbps cukup untuk V1), 1080p 8 Mbps (12 Mbps pada 60 fps) |
| TikTok | spesifikasi iklan (TikTok Ads) | bitrate >= 516 kbps, berkas <= 500 MB, minimum 540x960; V1 memenuhi |
| Instagram | BELUM TERVERIFIKASI | halaman bantuan resmi tidak terbaca; sumber sekunder saling bertentangan (3,5 sampai 12 Mbps). Jangan menulis angka IG sebagai fakta; pakai V1 |

Master HEVC hanya untuk arsip: platform transkode ulang, unggah H.264.

## Batas bukti

Diuji pada klip sintetis (`ffmpeg -f lavfi`), belum pada render Remotion nyata (opsi `--color-space`/`--pixel-format` Remotion belum dicek).
