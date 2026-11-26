---
id: "M04"
pola: Subject Bracketing & Contour Type
pack: 02-typography-talking-head
kategori: typography
kategori_lain: [camera, layout]
trigger: kata mengapit atau mengorbit pembicara; stiker anotasi potongan kertas di sekitar kepala
fungsi: [penekanan]
sumber: gabungan mekanik orbit subjek & stiker anotasi
dilihat_bergerak: ya
diukur: ya
alias: ["26", "02", "22", "31"]
vault: [../_vault/02-typography-and-captions/26-per-scene-type-treatment-set.md, ../_vault/02-typography-and-captions/02-subject-bracketing-sticker-words.md, ../_vault/02-typography-and-captions/22-subject-contour-text-wrap.md, ../_vault/02-typography-and-captions/31-paper-cutout-annotation.md]
---
### M04 · Subject Bracketing & Contour Type
- **Trigger:** kata mengapit atau mengorbit pembicara; stiker anotasi potongan kertas di sekitar kepala
- **Anti-Pattern:** Memasang kata orbit saat kepala bergerak liar, membiarkan teks menyeberangi bibir/mata, menggunakan `3D CTA` mentah di mode `2d-flat`, atau mengulang mode orbit > 2× berturut-turut.
- **Invariant:** Tempatkan kata di ruang negatif kiri-kanan kepala/bahu (jarak ≤ 8% tinggi frame ke subjek); ikat masuk kata dengan `CURVE.land` + `react(i)` dan variasi orientasi antar-beat tanpa crossfade antar stiker.
- **Primitives/Ref:** `TeksBlok.tsx`, `SpatialAnchorCamera.tsx`, `curves.ts` (`react`), keyframes `26-k9..k12`. · Vault: `../_vault/02-typography-and-captions/26-per-scene-type-treatment-set.md` · `../_vault/02-typography-and-captions/02-subject-bracketing-sticker-words.md` · `../_vault/02-typography-and-captions/22-subject-contour-text-wrap.md` · `../_vault/02-typography-and-captions/31-paper-cutout-annotation.md`
- **Gate:** `teks_cek.py` (`WAJAH` 0, `TEPI` 0) + `kt_ocr.py` + `sfx_density.py` (`tick`/`taktil`) PASS.
