---
status: evidence
scope: ai-change-everything
how_to_use: "Catatan pelajaran proyek ini. Bukan aturan untuk video lain. Entri 30 Oktober mengunci arah yang berlaku."
---

# RETRO · ai-change-everything

### 2026-10-30 · arah video dan yang diganti

Keputusan Irfan: video mengikuti ledger 29 Oktober (D-005 Inter dan biru, D-006 sound design penuh, D-009 klon suara). Arah itu lebih dekat ke video referensi. Berkas standar yang memakai Geist, oranye `#FF5A1F`, dan Jadisatu Narrator V3 ditolak.

Video disusun ulang dari nol, termasuk naskah. Contoh yang terasa kaku: kata "mengkloning". Storyboard v4 dan mix suara pertama diganti. Gaya sunting yang baru: cerita dokumenter, potongan cepat, foto dan footage nyata yang padat (meetup founder, berita AI, komunitas) sekitar 3 detik per foto, teks kata per kata bersama VO, plus animasi 2,5D.

Status: diterapkan di `BRIEF-STANDARD.md` dan `DECISIONS.md` (D-010–D-013).

### 2026-10-29 · ai-change-everything · gerbang 6 (VO)
Revisi Irfan: VO v1 masih memakai nada lama (santai, fun, intonasi sedang); proyek ini butuh formal-serius dan lebih cepat. Acuan nada: kaye.creatives (Dd94xUgo7Nd) dan Baikov.
Akar masalah: nada VO tidak dikunci terhadap referensi sebelum VO penuh di-generate; setelan voice proyek lama (The Gap) dibawa apa adanya, padahal setelan suara termasuk "gaya proyek", bukan workflow.
Usulan aturan (copywriting/audio, gerbang 6): sebelum VO penuh, generate SATU kalimat hook dalam 2–3 varian nada dan ukur terhadap VO referensi proyek (suku kata/dtk, jeda median, rentang pitch); Irfan memilih dari file A/B/C. Hanya voice ID yang dibawa dari proyek lama, bukan voice_settings/tempo. Catatan teknis: parameter speed tidak berpengaruh di eleven_v4; tempo diatur pasca-produksi (rubberband ×1,04–1,08).
Status: menunggu persetujuan

### 2026-10-29 · ai-change-everything · gerbang 8 (draft v3 → v4)
Revisi Irfan: (1) aturan font/tipografi/kamera dari video talking head "20 konten" (jadisatu-video2) belum diterapkan; (2) sound design (SFX + backsound) belum ada sama sekali; (3) foto stok di babak akhir terasa mentah — pakai animasi stickman 2,5D gaya Apple untuk bagian yang tidak punya real footage; real footage (Altman, Jensen, foto industri awal) tetap.
Akar masalah: (1) gerbang 0 hanya membaca GitHub main; keputusan R4/D-023–D-039 dan rule 38–49 ada di repo lokal Mac `~/Documents/Skill-Development` (branch fix/motion-graphic-workflow-27okt) yang belum di-push. (2) Draft visual dikirim tanpa audio padahal skill mewajibkan SFX per gerak sebelum review.
Usulan aturan: gerbang 0 wajib membandingkan GitHub main dengan repo lokal Mac (`git -C ~/Documents/Skill-Development log --all`) dan membaca branch yang lebih baru; draft yang dikirim ke Irfan selalu sudah berisi musik per babak + SFX (VO boleh sementara).
Status: menunggu persetujuan
