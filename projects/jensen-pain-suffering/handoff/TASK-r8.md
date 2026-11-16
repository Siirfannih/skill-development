TUJUAN       Menutup temuan audit frame r7 (Gemini + ChatGPT): sisa jump cut sumber sebelum cut adegan, frame tanpa teks di f1010–1012, tiga tampil yang mendahului ucapan > 0,5 dtk, dan jarak "suffering" ke kepala saat punch-in.

KONTEKS      Video Remotion 1920×1080 30 fps, komposisi `Main` 1428 frame, kode di `remotion/src/` (beat di `shots.tsx`, teks di `engine/Teks.tsx`, data tampil `handoff/TEKS.json`, kata `audio/words.json`).
             Batas beat sekarang (frame): B3 182–275 (punch-in 232–240), B4 mulai 275, B6c/B7 Jensen sampai 716 lalu keyboard 716–777, B7b Jensen 777–816, B8 tempa mulai 816, B9 PCB 967–1010 lalu Jensen 1010.
             Sumber wajah (`wajah.mp4`) punya lompatan pose karena jeda bicara dipotong: di f271, f709, f813 (lihat qc/frames/element-0270/0271, 0708/0709, 0812/0813.jpeg).

FILE BOLEH   remotion/src/shots.tsx · remotion/src/engine/Teks.tsx · remotion/src/data/*.json · handoff/TEKS.json (hanya kolom `muncul`/`hilang`/modus T01, T14, T48, T49)

TEMUAN
  F-r7-01  f271–274  lompatan pose sumber 4 frame sebelum cetakan B4 → mulai transisi masuk B4 (buram→fokus + kilatan krem) di f271, bukan f275.
  F-r7-02  f709–715  lompatan pose sumber sebelum keyboard → cut ke keyboard (B7a) di f709, bukan f716. Teks "Boy," tetap di onset katanya (23,88).
  F-r7-03  f813–815  lompatan pose sumber 3 frame sebelum tempa → cut ke tempa (B8a) di f813, bukan f816.
  F-r7-04  f1010–1012 tidak ada teks di tengah kalimat → T48 "is not intelligence," bertahan sampai T49 masuk (silang 3 frame seperti tampil lain). "it's" (33,67) adalah salah dengar ASR, tidak ditampilkan.
  F-r7-05  T49 "Greatness comes" → modus `kata` ("comes" baru muncul di 34,05).
  F-r7-06  T01 "people with very" (tampil 0,0; "very" 0,86) dan T14 "happens to you." ("you" 8,96) → modus `kata`.
  F-r7-07  f240–260 T13 "suffering": celah ke tepi kepala yang ber-motion-blur ±44 px (2,3 % lebar). Jadikan ≥ 80 px (≥ 4 %) dari tepi blur kepala; geser teks ke kanan (boleh perkecil sedikit asal cap ≥ 9 % tinggi).

LARANGAN     Teks hanya dari ucapan; satu tampil tajam per waktu, silang 3 frame, tidak ada frame tanpa teks di tengah kalimat (Lantai A1, A8). Jarak teks ke kepala ≥ 4 % lebar frame (Lantai A2). Elemen diam di dunianya, kamera yang bergerak (B12). Jangan menambah kotak di belakang teks (A9). Jangan pakai `will-change` di lapisan film (penyebab kotak artefak r7).

LULUS BILA   `cd remotion && npx tsc --noEmit` lulus; batas baru: B4 f271, keyboard f709, tempa f813; T48 terlihat sampai T49 mulai masuk; T01/T14/T49 kata muncul di onset masing-masing (±2 f); beat lain tidak berubah.

JANGAN       render apa pun, ubah audio/, ubah PLAN/BRIEF, sentuh beat yang tidak disebut, merancang komponen baru.

LAPORAN      Tulis handoff/REPORT-r8.md: file yang diubah, perubahan per temuan (ID), hasil typecheck, daftar frame batas baru.
