---
name: sg-scene-composer
description: Pakai saat item Soalnya Gini di tahap storyboard atau build; membangun komposisi Remotion dari shotlist + words.json dengan token merek dan primitif skill-development, membuat storyboard dari still komposisi yang sama, lalu render lewat render.sh.
---
# 06 · Storyboard, build, mix (tahap kanonik: Storyboard → Animate → Effects & grade → Mix)

Pintu utama: `claude/motion-graphic/MOTION-CORE.md` §1–§4 dan `templates/TAHAP.md` (salin ke `episodes/sgNNN/TAHAP.md`, cek dengan `$MG/juri/tahap.py`). Skill ini menambah yang khusus merek saja.

## 1. Struktur episode (sekali per episode)
```
episodes/sgNNN/   fakta.md script.md shotlist.json words.json vo.wav DECISIONS.md RESEP.md TAHAP.md
  remotion/src/bersama/tema.ts     <- salinan kit/tema.ts (tema_cek membaca di sini)
  remotion/src/lib/                <- salin $MG/remotion/curves.ts, timing.ts, ae-primitives/inti/acak.ts (cara resmi: komentar timing.ts L3)
  remotion/public/                 <- aset dari merek/soalnya-gini/aset (font OFL, maskot, cutout + aset.json untuk cek_komposisi)
  audio/  qc/
```
Font dimuat dari file (`merek/soalnya-gini/aset/font/PlusJakartaSans[wght].ttf`, `-Italic[wght].ttf`), build gagal bila tidak ada (Lantai A7).
Worker PC: `export PATH="$HOME/.local/opt/node-v22.20.0-linux-x64/bin:$PATH"` (npx tidak ada di PATH non-interaktif; README §1.2).

## 2. Komponen bersama (sekali untuk merek, dipakai ulang semua episode)
- `KanvasA` (Kabut + jaring), `PermukaanB` (kertas/cetakBiru/arang), `Cutout` (duotone, bayangan, drift), `Orbit`, `KTTumpuk` (baris sambung 56 px / kunci 96–120 px, ketik per huruf), `Stempel`, `Polaroid`, `Maskot` (membaca `aset/maskot/MASKOT.json`; KLIK untuk uji episode 1 = port `skill-development/claude/vibedesign/engine/cast/cast.js`, opsi `eyes/brow/arms/tilt` dipetakan ke props).
- Semua gerak memakai `CURVE.*`, `dur()`, `react()` dari `curves.ts`; tidak ada `Easing.*` preset (motion_lint), tidak ada warna/font/ukuran literal di file adegan (tema_cek).
- Dibangun satu kali (Opus boleh, README §5), lalu dikunci dengan golden frame.

## 3. Storyboard = still dari kode final
1. Bangun block out semua beat dari shotlist (KT, cutout placeholder TIDAK boleh tampil di still yang dikirim: Lantai D22).
2. `bash $MG/juri/render.sh episodes/sgNNN still SgMain $(python3 tools/beat_frames.py label episodes/sgNNN/shotlist.json)`
3. `python3 tools/beat_frames.py storyboard shotlist.json qc/stills STORYBOARD.md`: tabel per beat berisi still, waktu, transisi masuk + jumlah frame, kamera, KT, SFX, VO.
4. `python3 tools/golden_cek.py --beats qc/stills …` (gagal keras = perbaiki dulu), lalu `python3 $MG/juri/sandingkan.py qc/stills merek/soalnya-gini/contoh/bagus qc/sanding_storyboard.jpg`.
5. Klip draft skala 0,5 hanya untuk beat dengan transisi/gerak kamera (`render.sh draft`).
6. `antrean.py pindah <id> review_storyboard --oleh mesin`. Irfan melihat STORYBOARD.md + lembar sanding + draft. Setuju → ID di DECISIONS → `build`.

## 4. Build sampai render
- Urutan Lantai F26: still per beat → draft 0,5 → efek & grade → `render.sh frames` + `frame_audit.py` (VERDICT tiap potongan, penilai = Sonnet vision dengan golden + `cookbook/contoh-gagal/`) → `audio_order.py lock visual` → SFX → musik → `audio_phone.py --gate` → mix.
- Mix akhir: `bash $MG/audio/loudness_2pass.sh audio/mix.wav audio/mix_n.wav --mix-akhir -I -15` (linear, gagal bila menurunkan suara).
- Render: `bash $MG/juri/render.sh episodes/sgNNN final SgMain episodes/sgNNN/render.mp4` (R1–R5, kunci render global, ledger). Dilarang `npx remotion render` langsung (MOTION-CORE §4; `sg_qc.sh` G0 menolaknya).
- Encode pengiriman mengikuti `references/delivery-spec.md` (bt709 lewat `setparams`, faststart, AAC 48 k). Opsi warna Remotion belum dicek di delivery-spec; bila keluaran render.sh tidak lolos probe, re-encode dengan perintah di delivery-spec.

## 5. Larangan merek (tambahan Lantai)
- Tanpa logo merek asli (minimarket, bank, HP generik: plan §3).
- Tanpa SFX kayu/koin/kartun (Lantai E24; `slop-grep.sh` menangkap nama file).
- Tanpa radial gradient, glow nol-offset, backdrop blur, emoji, `Math.random` (`slop-grep.sh` kode).
