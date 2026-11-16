TUJUAN       Lompatan pose sumber di f9→f10 (tangan Jensen hilang dari depan mulut) tidak terbaca sebagai patahan, tetapi sebagai reframe yang disengaja.

KONTEKS      Remotion 1920×1080 30 fps, komposisi `Main`. B1 talking head f0–104 (`remotion/src/shots.tsx`, beat B1, kamera push pelan). Sumber `wajah.mp4` melompat pose di f10 (lihat qc/frames/element-0009.jpeg dan element-0010.jpeg). Teks T01 "people with very" modus kata, mulai f0.

FILE BOLEH   remotion/src/shots.tsx (hanya beat B1)

TEMUAN       F-r8-01 f10: kedua pemeriksa (Gemini, ChatGPT) menandai patahan gerak. Perbaikan: jadikan f10 sebuah cut framing. f0–9 memakai framing lebih rapat (skala ±1,12, fokus wajah), lalu dari f10 framing B1 yang sekarang dengan push pelan tetap jalan. Pergantian skala keras tepat di f10, tanpa tween. Teks T01 tetap di posisi dunia yang aman di kedua framing (tidak menempel kepala, ≥ 4 % lebar dari tepi kepala) atau dijangkar ke layar selama f0–9.

LARANGAN     Teks hanya dari ucapan; jarak teks ke kepala ≥ 4 % lebar (Lantai A2); kamera yang bergerak, elemen diam di dunia (B12); jangan ubah beat lain; jangan pakai `will-change`.

LULUS BILA   `cd remotion && npx tsc --noEmit` lulus; f0–9 framing rapat, f10 framing lama; T01 utuh dan berjarak dari kepala di keduanya; beat lain tidak berubah (diff hanya di B1).

JANGAN       render, ubah audio/, TEKS.json, beat lain.

LAPORAN      handoff/REPORT-r9.md: diff singkat, nilai skala/fokus yang dipakai, hasil typecheck.
