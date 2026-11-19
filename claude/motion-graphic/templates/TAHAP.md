# TAHAP · <proyek>

Disalin ke `projects/<proyek>/TAHAP.md` di awal video. Kerjakan berurutan. Di tiap langkah, baca **hanya** file/bagian yang disebut langkah itu, saat itu juga. Langkah selesai = `- [x]` + bukti setelah `→` (perintah dan keluarannya, atau path file). Lihat langkah berikutnya: `python3 claude/motion-graphic/scripts/juri/tahap.py projects/<proyek>`.

## Tahap 1 · Profil merek
- [ ] Profil merek ada dan lulus · baca: `templates/merek/README.md` §Tahap 1 · bukti: keluaran `profil_cek.py` LULUS →

## Tahap 2 · Editing guideline + preview
- [ ] Brief user disalin verbatim ke `RESEP.md`; kiblat dipilih (2–3 kartu terdekat ditunjukkan bila tema masih kabur) · baca: `pustaka/PETA.md` baris kartu terkait, `pustaka/RESEP-TEMPLATE.md` · bukti: `resep_check.py` LULUS →
- [ ] Suara dipotong dan dikunci · baca: `references/audio.md` §14.0C–14.0D · bukti: `audio_order.py lock suara` PASS →
- [ ] Preview dikirim di percakapan: still per beat di atas footage asli + klip draft untuk gerak kamera/transisi · baca: `references/storyboard.md` §1, `templates/merek/README.md` §Tahap 2 · bukti: path still/klip yang dikirim →
- [ ] Masukan user atas preview dicatat dan disetujui · baca: `references/revision-log.md` §21.1 · bukti: ID baris `DECISIONS.md` →

## Tahap 3 · Produksi penuh (tanpa minta revisi)
- [ ] Lembar kondisi footage per jenis shot; tiap teknik kartu dicocokkan dengan syaratnya dan penyesuaiannya ditulis di `RESEP.md` · baca: `pustaka/README.md` §Alur butir 6, bagian "Kondisi footage asli" + blok teknik kartu yang dipakai · bukti: `qc/kondisi/KONDISI.md` →
- [ ] Spine gaya dikunci: satu still per peran teks di atas footage asli, dinilai berdampingan dengan frame kunci · baca: `pustaka/README.md` §Alur butir 7, `references/typography.md` §8a · bukti: `qc/spine/SPINE.md` →
- [ ] Sistem desain video: Sutradara menulis `tema.ts` (token berkategori), satu pekerja membangun komponen bersama, papan acuan disetujui · baca: `templates/sistem-desain/README.md`, `references/orkestrasi.md` §1 · bukti: `tema_cek.py` LULUS + path papan acuan →
- [ ] Visual dibangun per TASK adegan, satu Editor baru per TASK, hanya dari token + komponen bersama; lembar sanding semua adegan dicek sekeluarga · baca: `references/roles.md` §5–6, `references/orkestrasi.md` §3 · bukti: REPORT tiap TASK →
- [ ] Audit visual semua frame LULUS · baca: `templates/roles/pemeriksa-frame.md` · bukti: `VERDICT.md` tiap potongan →
- [ ] SFX lalu musik dikunci · baca: `guide/sfx/GUIDE.md`, `references/audio.md` §14.3–14.9 · bukti: `audio_order.py lock sfx` + `lock musik` PASS →
- [ ] Devil's Advocate dari luar, usulnya diputus · baca: `templates/roles/devils-advocate.md` · bukti: `qc/da/USUL.md` + putusan di `qc/JURI.md` →

## Tahap 4 · Render 1
- [ ] Render 1 utuh dikirim ke user · baca: `pustaka/README.md` §Juri 7, `references/delivery-gate.md` · bukti: path MP4 + `render.sh` final PASS →
- [ ] Semua masukan user dikumpulkan jadi satu ronde · baca: `references/revision-log.md` §0 · bukti: ID baris `DECISIONS.md` →

## Tahap 5 · Render 2 (finishing)
- [ ] Masukan dikerjakan, hanya atribut yang diminta · baca: `references/revision-log.md` §0 butir 5–6 · bukti: `revisi_cek.py cek` LULUS →
- [ ] Render 2 dikirim · bukti: path MP4 →
