# TAHAP · <proyek>

Disalin ke `projects/<proyek>/TAHAP.md` di awal video. Nama tahap = judul `## Tahap N` di bawah. Kerjakan berurutan. Di tiap langkah, baca **hanya** file/bagian yang disebut langkah itu, saat itu juga. Langkah selesai = `- [x]` + bukti setelah `→` (perintah dan keluarannya, path file, atau ID baris `DECISIONS.md`); langkah yang tidak berlaku (tanpa VO, tanpa footage, tanpa subagen) dicentang dengan `→ n/a: <alasan>`. Lihat langkah berikutnya: `python3 claude/motion-graphic/scripts/juri/tahap.py projects/<proyek>`. `render.sh final` menolak render selama tahap sebelum Deliver belum selesai berbukti.

## Tahap 1 · Brief
- [ ] Profil merek ada (atau drafnya diajukan bersama keyframe pertama) dan lulus · baca: `templates/merek/README.md` §Tahap 1 · bukti: keluaran `profil_cek.py` LULUS →
- [ ] Brief user disalin verbatim ke `RESEP.md`; bahan user dibedah; kiblat dipilih (2–3 kartu terdekat ditunjukkan bila tema masih kabur) · baca: `../irfan-creative-workflow/SKILL.md` §2, `cookbook/INDEX.md` §2, `cookbook/RESEP-TEMPLATE.md` · bukti: `resep_check.py` LULUS →

## Tahap 2 · Naskah
- [ ] Naskah final disetujui pemilik (lolos uji storyteller) · baca: `../irfan-creative-workflow/SKILL.md` §3, `references/copywriting.md` · bukti: ID baris `DECISIONS.md` yang mencatat persetujuan pemilik →

## Tahap 3 · Storyboard/block out
- [ ] Storyboard + tabel racikan cookbook (beat → pola → remix → SFX) disetujui pemilik · baca: `cookbook/README.md` §2, `references/storyboard.md` §5 · bukti: ID baris `DECISIONS.md` yang mencatat persetujuan pemilik + path storyboard →
- [ ] Suara dipotong dan dikunci · baca: `references/audio.md` §14.0C–14.0D · bukti: `audio_order.py lock suara` PASS →
- [ ] Preview dikirim di percakapan: still per beat di atas footage asli + klip draft untuk gerak kamera/transisi · baca: `references/storyboard.md` §1, `templates/merek/README.md` §Tahap 2 · bukti: path still/klip yang dikirim →
- [ ] Masukan user atas preview dicatat dan disetujui · baca: `references/revision-log.md` §21.1 · bukti: ID baris `DECISIONS.md` →
- [ ] Lembar kondisi footage per jenis shot; tiap teknik kartu dicocokkan dengan syaratnya dan penyesuaiannya ditulis di `RESEP.md` · baca: `cookbook/README.md` §6 butir 1, bagian "Kondisi footage asli" + blok teknik kartu yang dipakai · bukti: `qc/kondisi/KONDISI.md` →
- [ ] Spine gaya dikunci: satu still per peran teks di atas footage asli, dinilai berdampingan dengan frame kunci · baca: `cookbook/README.md` §6 butir 2, `references/typography.md` §8a · bukti: `qc/spine/SPINE.md` →

## Tahap 4 · Animate
- [ ] Sistem desain video: `tema.ts` (token berkategori) ditulis lebih dulu, lalu komponen bersama dari token itu (satu model boleh mengerjakan keduanya; pekerja lain bila ada), papan acuan disetujui · baca: `templates/sistem-desain/README.md`, `references/orkestrasi.md` §2 · bukti: `tema_cek.py` LULUS + path papan acuan →
- [ ] Visual dibangun per adegan, hanya dari token + komponen bersama (satu Editor baru per TASK bila mendelegasikan); lembar sanding semua adegan dicek sekeluarga · baca: `references/roles.md` §5–6, `references/orkestrasi.md` §3 (bila mendelegasikan) · bukti: lembar still per adegan (REPORT tiap TASK bila mendelegasikan) →

## Tahap 5 · Effects & grade
- [ ] Tiap efek berfungsi (NEGATIF 10) dan grade terukur, sebelum visual dikunci · baca: NEGATIF 10 di `SKILL.md`, `references/grade.md` · bukti: daftar efek + fungsinya di `RESEP.md` + keluaran `grade_ukur.py` →
- [ ] Audit visual semua frame LULUS, lalu visual dikunci · baca: `templates/roles/pemeriksa-frame.md` · bukti: `VERDICT.md` tiap potongan + `audio_order.py lock visual` PASS →

## Tahap 6 · Mix
- [ ] SFX lalu musik dikunci · baca: `guide/sfx/GUIDE.md`, `references/audio.md` §14.3–14.9 · bukti: `audio_order.py lock sfx` + `lock musik` PASS →
- [ ] Mix dikunci: stem, `mix.wav`, dan `cues.json` final; lulus uji speaker HP · baca: `references/audio.md` §14.10 · bukti: `audio_phone.py --gate` keluar 0 + path `mix.wav` →
- [ ] Mata luar: Devil's Advocate dari subagen/model lain bila ada; bila tidak, satu putaran kritik sendiri dari brief steril (brief Irfan verbatim + frame tahan + kiblat + contoh gagal) **sebelum** membaca catatan desainmu; usulnya diputus · baca: `templates/roles/devils-advocate.md` · bukti: `qc/da/USUL.md` + putusan di `qc/JURI.md` →

## Tahap 7 · Deliver
- [ ] Render 1 utuh dikirim ke user · baca: `cookbook/README.md` §Juri 7, `references/delivery-gate.md` · bukti: path MP4 + `render.sh` final PASS →
- [ ] Semua masukan user dikumpulkan jadi satu ronde · baca: `references/revision-log.md` §0 · bukti: ID baris `DECISIONS.md` →
- [ ] Masukan dikerjakan, hanya atribut yang diminta · baca: `references/revision-log.md` §0 butir 5–6 · bukti: `revisi_cek.py cek` LULUS →
- [ ] Render 2 dikirim · bukti: path MP4 →
- [ ] Hasil dikirim lewat saluran yang tersedia (Google Drive bila remote `gdrive:` ada; selain itu path/link yang bisa dibuka user) + caption + daftar penyimpangan · baca: `../irfan-creative-workflow/SKILL.md` §2 (Deliver, Kirim lewat Drive) · bukti: link atau path + caption →
