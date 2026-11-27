> **Invarian kerja** (berlaku di atas isi lain di file ini):
> 1. **Gaya = data, bukan aturan.** Kartu cookbook dan tema = katalog inspirasi dan mekanik: bukan menu wajib, bukan template; gaya tidak disalin antar proyek.
> 2. **Referensi dan arahan user = masukan nomor satu**, dengan catatan apa yang diambil darinya. Arah lemah: tanya.
> 3. **Storyboard disetujui pemilik sebelum build atau render**; begitu juga naskah final dan pemakaian kredit.
> 4. **Perbaikan per adegan.** Tiap adegan komposisi sendiri; yang ditolak diperbaiki dan dirender ulang sendiri, bukan seluruh video.
> 5. **Model = co-editor, pemilik = sutradara, skrip = mata.** Model mengusulkan dan menimbang; skrip hanya kerja pasti dan cek teknis (layout, kontras, frame beku, Chrome nyangkut, berkas hilang), tidak menilai selera. Aturan lain = praktik terbaik, kecuali NEGATIF [mutlak].

# Bekerja di Skill Development

Cara kerja video, desain, dan naskah; satu model sudah cukup. File ini hanya pintu: buka file yang dirutekan tabel, saat langkahnya tiba.

**Urutan otoritas** (yang awal menang): kata user di sesi ini → NEGATIF butir [mutlak] (4, 5, 9) → REF-SPEC → brief dan `projects/<proyek>/` → profil merek → tema dan kartu cookbook → `references/`, `guide/`. Instruksi user tidak ditolak dengan alasan aturan repo: risiko disebut satu kalimat, dikerjakan, dicatat di `DECISIONS.md`. Folder proyek lain bukan aturan dan tidak disalin.

| Pekerjaan | Buka |
|---|---|
| Cara bekerja dengan pemilik repo (bila skillnya tersedia) | `claude/working-with-irfan/SKILL.md` |
| Sebelum storyboard, desain, atau kode animasi apa pun | `claude/director-pass/SKILL.md` (wajib, sekali per proyek) |
| Video | `claude/motion-graphic/SKILL.md`, lalu `projects/<proyek>/`; kartu lewat `scripts/cookbook/pilih_kartu.py` (2–4 per video) |
| Keluhan atas video yang sudah dirender, sekecil apa pun | `claude/motion-graphic/references/revisi.md` |
| Naskah, konten, hook | `claude/script-workshop/SKILL.md`; naskah final → `claude/motion-graphic/references/storyboard.md` |
| Desain statis | `claude/vibedesign/DESIGN-CORE.md` |
| Rencana tertulis (PRD) | `claude/autopilot-prd/SKILL.md` |
| Jadisatu Canvas | `claude/jadisatu-canvas/SKILL.md` |
| Mengubah skill, atau koreksi yang tampak umum | `claude/skill-steward/SKILL.md` |
| Lainnya | tabel Rute di `PETA.md` |

**Kerja.** Tarik `main` dulu. Alat (render frame, pecah video, dengar, transkrip, Remotion): baca `~/.config/skill-development/alat.md`; belum ada berarti skill baru dipasang, jalankan `./tools/doctor.sh` sekali dan pasang yang KURANG. Skill dibaca dari repo, bukan ingatan; abaikan `archive/`. Cari di repo sebelum bertanya; bila bertanya, beri pilihan dan rekomendasi. Sebelum menilai visual, buka frame kunci kiblat dan `cookbook/contoh-gagal/`. Koreksi user dicatat saat diterima di `projects/<proyek>/DECISIONS.md`; hanya kesalahan yang salah di gaya apa pun naik ke skill, lewat skill-steward. "Lulus" selalu dengan keluaran alat terbaru; perubahan pada video terkirim menunjuk satu butir ledger `DECISIONS.md`. Aturan = instruksi + alasan + cara cek; asal-usul ke `SUMBER.md`, bukan ke file instruksi. Perubahan skill masuk `main` di sesi yang sama; cek remote sebelum push, jangan menimpa kerja lain.
