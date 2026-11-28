# Brief test produksi Soalnya Gini (berlaku untuk ep01, ep02, ep03)

Kamu memproduksi **satu** episode Soalnya Gini dari naskah sampai render final dengan pipeline v2, sebagai test. Tiga episode dikerjakan paralel oleh agen berbeda dengan brief yang sama, lalu hasilnya dibandingkan. Kerja sendiri, jangan menunggu atau meniru agen lain.

## Episode kamu

Disebut di pesan pembuka (`ep01` = Hari 1 Indomaret–Alfamart, suara `sg-perempuan`; `ep02` = Hari 2 mabuk di mobil, suara `sg-laki`; `ep03` = Hari 3 es puter, suara `sg-perempuan`). Naskah VO, shot list, dan sumber fakta ada di `~/work/soalnya-gini-studio/plan/soalnya-gini-10-plan.md` §4 (Hari 1–3).

## Pintu baca (urut, baca hanya yang disebut)

1. `~/work/soalnya-gini-studio/v2/README.md` (utuh), lalu skill v2 `v2/skills/01..07/SKILL.md` saat tahapnya tiba.
2. `~/work/skill-development/claude/motion-graphic/MOTION-CORE.md` + `cookbook/00-core-invariants.md` + `cookbook/INDEX.md`; cari kartu per beat dengan `scripts/cookbook/pilih_kartu.py`. `LANTAI.md` dan `references/slop-catalog.md` dibaca **utuh sebelum storyboard** dan sebelum render.
3. `~/work/skill-development/claude/working-with-irfan/SKILL.md` untuk gaya kerja.
4. Maskot: `~/work/skill-development/claude/vibedesign/engine/cast/cast.js` (KLIK pemeran utama, NOTE/NODI pendukung bila perlu) + `claude/vibedesign/guide/karakter/GUIDE.md` (KRK-01: tiap kemunculan punya kata kerja dan fungsi). Port ke komponen Remotion tanpa mengubah desainnya.

## Keputusan Irfan untuk test ini (sudah final)

- **Naskah dianggap disetujui**: naskah di plan sudah utuh dan sudah diriset. Tulis ulang VO menjadi **bahasa lisan** (partikel natural, fakta tetap, tanpa menambah klaim), lalu lanjut. Tanda ⚠ di "Fakta yang wajib dicek" adalah cek **sebelum upload**, bukan sebelum produksi: tulis ke `MANDA-PERMINTAAN.md` di folder episode (apa yang perlu dicari, kenapa, sumber yang disarankan), jangan blokir produksi. Klaim ⚠ yang tidak lunak di naskah, lunakkan sesuai catatan plan.
- **Storyboard tidak berhenti untuk review**: buat storyboard (still Remotion per beat dari kode yang sama dengan render final + catatan transisi dan timing), jalankan gerbang mekanisnya, lalu lanjut sampai render. Catat di antrean `--oleh irfan` dengan alasan "test 25 Nov, Irfan minta tanpa jeda storyboard".
- **Berhenti di review_final**. Tidak ada upload.
- **Suara**: Gemini Voice Design sesuai `v2/kit/suara.json` (biaya sudah diizinkan Irfan; pakai `--izin-biaya`). Tanpa anotasi style. Key hanya dibaca dari `~/.config/soalnya-gini/gemini.env`; jangan pernah mencetak atau menyalinnya.
- **Model**: Sonnet untuk semua tahap. Eskalasi hanya mengikuti tabel README §5; bila eskalasi diperlukan, catat di LOG dan lanjutkan dengan alasan tertulis.

## Batasan kerja

- Folder kerja kamu hanya `~/work/soalnya-gini-studio/test-produksi/<ep>/`. Jangan menulis ke `v2/`, `kit/`, repo skill-development, atau folder episode lain. Komponen gaya dan maskot dibangun di folder episodemu.
- Render berat lewat kunci global antrean (`v2/tools/antrean.py`, kunci `/tmp/remotion-heavy-render.lock`); tunggu giliran, jangan memaksa paralel. Node 22: `export PATH="$HOME/.local/opt/node-v22.20.0-linux-x64/bin:$PATH"`. Python: `~/work/mg-venv/bin/python`.
- Gerbang Kelas H (`render.sh final`, `gerbang_produksi.sh`, `scripts/gate/*`) tidak diedit atau dilewati.
- Jangan memanggil layanan berbayar selain Gemini TTS; jangan membuat akun atau mengunggah apa pun.

## Log wajib: `<ep>/LOG.md`

Per tahap kanonik: waktu mulai–selesai, model, file yang dibaca utuh, keputusan + alasan, hasil gerbang (keluaran perintah, angka), dan **titik tersendat** (aturan yang membingungkan, alat yang gagal, langkah yang harus ditebak). Bagian akhir: "Usulan perbaikan skill-development/v2" (maks 10 butir, tiap butir menunjuk bukti di LOG). LOG adalah bahan utama perbaikan pipeline, jadi tulis jujur, termasuk yang gagal.

## Selesai bila

`render.mp4`, `qc-report.json`, lembar sanding per beat, `STORYBOARD.md`, `MANDA-PERMINTAAN.md`, dan `LOG.md` ada di folder episode; `sg_qc.sh` dijalankan (lulus atau gagal, hasilnya dicatat); item antrean berada di `review_final`.
