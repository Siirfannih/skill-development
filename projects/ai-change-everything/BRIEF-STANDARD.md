---
status: rule
scope: ai-change-everything
how_to_use: "Kriteria sukses Video 3. Arah visual dan suara mengikuti ledger 29 Oktober. Naskah, storyboard v4, dan mix suara pertama sudah diganti."
---

# Standar · Pengganti Kita Sendiri

Video 3, akun @siirfannih, folder `projects/ai-change-everything`.

Irfan, 30 Oktober 2026: video ini mengikuti arah ledger 29 Oktober (`DECISIONS.md`, D-005, D-006, D-009). Arah itu lebih dekat ke video referensi. Berkas standar 30 Oktober yang memakai Geist, oranye `#FF5A1F`, dan Jadisatu Narrator V3 adalah versi yang gagal. Pilihan itu ditolak untuk video ini.

Video disusun ulang dari nol, termasuk naskah. Sound design juga mulai lagi.

## Kriteria sukses

- Format: 16:9, 1920×1080, 30 fps.
- Palet D-005: charcoal `#101216`, off-white `#F5F5F7`, biru diredam. Font Inter saja, tanpa serif.
- Teks: sekitar 70/30 visual berbanding teks, satu baris per state. Kata kunci di kanvas baru, huruf kapital, bergerak truck kiri ke kanan. Glow ultramarine, KWord + Bloom, tiga layer, kamera bergerak (rujukan di D-005).
- Teks muncul kata per kata, jatuh bersama VO.
- Gaya sunting: cerita dokumenter, potongan cepat, foto dan footage nyata yang padat (meetup founder, berita AI, komunitas) sekitar 3 detik per foto, plus animasi 2,5D.
- VO: klon suara Irfan, ElevenLabs Instant Voice Clone `1MOP6dYxPUocHNWyDqR8` (D-009).
- Suara: arah D-006 tetap, yaitu musik per babak dan SFX pada tiap objek atau transisi. Mix pertama tidak dipakai. Pustaka dan angka mix belum dikunci ulang.

## Ditolak untuk video ini

Pilihan berkas 30 Oktober yang gagal:

- Font Geist, Instrument Serif Italic, Geist Mono.
- Oranye `#FF5A1F` sebagai warna kata kunci.
- Suara Jadisatu Narrator V3, model `eleven_v4`.

Juga tidak dipakai sebagai acuan build:

- Naskah v4 di `SCRIPT.md`. Ada bagian yang kaku, contoh kata "mengkloning".
- Storyboard v4 di `STORYBOARD.md`.
- Mix suara pertama: rencana musik `music/c1`–`c5` dan cue di `remotion/src/comp/sound.tsx`.

## Prinsip

| Kartu | Sikap | Catatan |
|---|---|---|
| `jangan-bawa-template` | dipakai | Irfan memilih sistem jadisatu-video2 untuk video ini (D-005). Sistem lain tidak ikut. |
| `teks-sedikit` | disesuaikan | Satu baris per state, kata per kata bersama VO. Bukan kuota 1–3 kata. |
| `satu-font-aksen` | ditolak | Inter saja, tanpa serif. |
| `tekan-dengan-huruf` | disesuaikan | Kata kunci kapital di kanvas baru, bukan oranye dan bukan kotak. |
| `gambar-diam-tetap-bergerak` | dipakai | Foto nyata yang padat, plus gerak 2,5D. |
| `ritme-naik-lalu-reda` | disesuaikan | Potongan cepat. Foto ditahan sekitar 3 detik. |
| `musik-mengikuti-babak` | dipakai | Arah D-006. Cue lama tidak dipakai. |
| `gerak-bermakna-bersuara` | dipakai | SFX menempel pada objek. Kepadatan belum dikunci. |
| `usulan-kotak-aksen` | tidak dipilih | Masih usulan. |
| `usulan-montase-banyak-fokus` | tidak dipilih | Masih usulan. |
| `usulan-pita-2-6-khz` | tidak dipilih | Bukan syarat mix baru. |
| `usulan-sinkron-dan-loudness` | tidak dipilih | Bukan target mix baru. |
| `kandidat-rekaman-asli` | tidak dipilih | Bukan syarat. |
| `kandidat-kenyset` | tidak dipilih | Bukan pustaka yang dikunci untuk mix baru. |
| `kandidat-kepadatan-sfx-launch` | tidak dipilih | Bukan target. |
| `telinga-nyaman` | tidak dipilih | Belum dipilih untuk mix baru. |

## Alat

- Build yang ada di folder ini: Remotion. Adegan lamanya ikut storyboard yang sudah diganti.
- VO baru memakai klon di atas, bukan narator Jadisatu.

## Terbuka

Mix baru belum punya angka kelulusan. Empat kandidat ini tetap bukan syarat: hanya rekaman berlisensi, Kenyset sebagai pustaka utama, sekitar lima efek per 10 detik, serta langit-langit 2–6 kHz dan angka sinkron dari bedah referensi.
