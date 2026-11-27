> **Invarian kerja** (berlaku di atas isi lain di file ini):
> 1. **Cookbook = perpustakaan mekanik, bukan template.** Konsep user + 2–4 kartu mekanik cookbook = output baru. Jangan membuat template gaya tetap atau menyalin gaya antar proyek; toolkit primitif mekanik (tanpa gaya) dipakai ulang; template gaya tidak.
> 2. **Promosi aturan hanya lewat `skill-steward`** (S = proyek, P = pertimbangan, H = hukum netral-gaya terukur). Selera satu proyek tidak naik ke aturan global.
> 3. **Gerbang pemilik tidak dilewati.** Konsep/topik, naskah final, serta storyboard + tabel racikan cookbook disetujui pemilik sebelum produksi atau pemakaian kredit.
> 4. **Aturan = praktik terbaik, bukan hukum tetap, kecuali NEGATIF.** Kartu = default; kondisi nyata menang. Gerbang (`render.sh final`, `gerbang_produksi.sh`, `scripts/gate/*`): lewati hanya dengan alasan + bukti di LOG, bukan tenggat; jangan edit/matikan saat produksi.
> 5. **Baca dulu, jangan menebak.** Bahan sumber dan outbox/proyek terkait dibaca sebelum menyimpulkan atau memberi perintah.

# Bekerja di Skill Development

Cara kerja video, desain, dan naskah Irfan; satu model sudah cukup. File ini hanya pintu: buka file yang dirutekan tabel, saat langkahnya tiba.

**Urutan otoritas** (yang awal menang): kata Irfan di sesi ini → NEGATIF butir [mutlak] (4, 5, 9) → REF-SPEC → brief dan `projects/<proyek>/` → profil merek → tema dan kartu cookbook → `references/`, `guide/`. Instruksi Irfan tidak ditolak dengan alasan aturan repo: risiko disebut satu kalimat, dikerjakan, dicatat di `DECISIONS.md`. Folder proyek lain bukan aturan dan tidak disalin.

| Pekerjaan | Buka |
|---|---|
| Cara bekerja dengan Irfan (setiap tugas) | `claude/working-with-irfan/SKILL.md` |
| Sebelum storyboard, desain, atau kode animasi apa pun | `claude/director-pass/SKILL.md` (wajib, sekali per proyek) |
| Video | `claude/motion-graphic/SKILL.md`, lalu `projects/<proyek>/`; kartu lewat `scripts/cookbook/pilih_kartu.py` (2–4 per video) |
| Keluhan atas video yang sudah dirender, sekecil apa pun | `claude/motion-graphic/references/revision-log.md` |
| Naskah, konten, hook | `claude/script-workshop/SKILL.md`; naskah final → `claude/motion-graphic/references/storyboard.md` |
| Desain statis | `claude/vibedesign/DESIGN-CORE.md` |
| Rencana tertulis (PRD) | `claude/autopilot-prd/SKILL.md` |
| Jadisatu Canvas | `claude/jadisatu-canvas/SKILL.md` |
| Mengubah skill, atau koreksi yang tampak umum | `claude/skill-steward/SKILL.md` |
| Lainnya | tabel Rute di `PETA.md` |

**Kerja.** Tarik `main` dulu. Skill dibaca dari repo, bukan ingatan; abaikan `archive/`. `./tools/doctor.sh` hanya memeriksa. Cari di repo sebelum bertanya; bila bertanya, beri pilihan dan rekomendasi. Sebelum menilai visual, buka frame kunci kiblat dan `cookbook/contoh-gagal/`. Koreksi Irfan dicatat saat diterima di `projects/<proyek>/DECISIONS.md`; hanya kesalahan yang salah di gaya apa pun naik ke skill, lewat skill-steward. "Lulus" selalu dengan keluaran alat terbaru; perubahan pada video terkirim menunjuk satu butir ledger `DECISIONS.md`. Aturan = instruksi + alasan + cara cek; asal-usul ke `SUMBER.md`, bukan ke file instruksi. Perubahan skill masuk `main` di sesi yang sama; cek remote sebelum push, jangan menimpa kerja lain.
