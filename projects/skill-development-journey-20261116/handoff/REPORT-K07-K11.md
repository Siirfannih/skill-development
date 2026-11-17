# REPORT K07 + K11 (Builder Remotion, 16 Nov)
- `npx tsc --noEmit` lulus (0 error). Tanpa raster, tanpa paket baru, tanpa video. Still lebar 960: `stills-K07/` f040 f130 f150 f230 f300, `stills-K11/` f010 f060 f160 f210 f270 f330.
- File: `src/komponen/K07-TemplateKeWorkflow.tsx` (+`K07/kit.tsx`), `src/komponen/K11-KapsulVoting.tsx` (+`K11/kit.tsx`, `K11/KilatTeks.tsx`), `src/uji/K07-entry.tsx` (UjiK07), `src/uji/K11-entry.tsx` (UjiK11). Ekspor `objekK07()` dan `objekK11()`.
- Tambahan di `public/fonts/` (salinan woff2 dari skill): poppins 600/700/800, anton 400 (nama sama dengan pekerja lain, tidak menimpa).
- Konvensi props: semua frame ABSOLUT di linimasa tuan rumah; `mulai` = frame pertama komponen tampil (sebelumnya return null).
- K07 nama fase asli di rel (5 node): Pra-produksi, Spine suara, Visual, Audio, Finishing. Sumber: `claude/motion-graphic/SKILL.md` §4 tabel "Lima fase", baris 126–132 (kolom Fase, tanpa nomor/deskripsi).
- K07 mode: A (kartu overlay sisi kanan) → coret "template" coral #D93A3F (whip) → kanvas #F6F5F0 wipe dari kanan (whip, kWorkflow) → rel dirakit kiri→kanan, konektor `heavy` → "workflow" Poppins 800 biru #2E5BFF di kWorkflow+74.
- K11: hero Anton atas (y < 15 %), keluar `leave` di kProfesional−12; kapsul kiri x 56–596, kanan x 1324–1864 (tumbuh ke arah wajah dibatasi ≤ +7 %, tetap di luar x 35–65 %); pil ajakan + teks kecil di bawah y 70 %.
- K11 state kapsul: masuk (land) → hover (ring biru, lift) → tekan (scale 0,965, radio terisi); memilih kapsul AI melepas radio kapsul profesional (perilaku radio-group).
- Gerak: semua keyframe dari `src/lib/curves.ts` (land/leave/whip/heavy/wind/drift); motion blur = blur SVG searah dari kecepatan per frame; kamera: push 2–3 %/dtk + hentak 12–14 % di kata kunci. Tanpa `linear`.
- Catatan: kata "profesional?" mengikuti penulisan SPEK tugas (bukan "profesional" ejaan Irfan). Teks kecil "skill gratis…" 32 px (label UI). Hero K11 memakai garis tepi gelap agar kontras di atas footage; kontras diuji hanya pada latar abu #6C787C.

## Ronde 2 (G2)
- K07: pil 100 px tinggi, teks 44 px, rel y 58 % selebar ±86 % (x 4–95 %); "workflow" kiri-tengah (y ±32 %, rata kiri rel). Kamera rel: truck mengikuti node baru (heavy, 1,0→1,12) lalu reveal-out saat "workflow" masuk. Coretan coral 9 px, kiri→kanan 8 f (kBalik+22…+30); still selesai: `stills-K07/f155.jpg` (f150 juga).
- K11: hero 2 baris Anton 150 px, isian #FAF8EC, tepi tinta 9 px terlihat, satu kilat (k100+8), di x 2–35 %, y 28–58 %, keluar ke kiri di kProfesional−12; kapsul 590×150 (teks 44 px, tepi dalam x 630 / 1290), pil ajakan 820×132 (teks 60 px), teks kecil 46 px. Tumbuh kapsul dibatasi ≤ +5 %.
