# Skill Development

Tempat menyimpan dan mengembangkan skill Claude milik Irfan. Repo ini adalah sumber kebenaran; salinan di Mac (`~/.claude/skills`) dan cloud disinkronkan dari sini.

- `claude/` — satu folder per skill, berisi `SKILL.md` (+ `references/` bila bercabang)
- `external/` — skill pihak ketiga sebagai submodule (superpowers, anti-slop, awesome-design-md); peta pemakaian di `external/README.md`
- `AUDIT-2026-10-25.md` — audit awal dan rencana perbaikan
- `EVALS-DESIGN.md` — desain eval agar skill membaik tiap sesi
- `DIAGNOSA-JADISATU-V7.md` — diagnosa video Jadisatu v7

Clone beserta submodule: `git clone --recurse-submodules https://github.com/Siirfannih/skill-development.git`

## Status skill video

| Skill | Status |
|---|---|
| `motion-graphic` | **Baru.** Skill global: inti + 10 cabang di `references/`. Menggantikan tiga skill di bawah |
| `motion-director` (v3) | Baseline; seluruh isinya dipindah ke `motion-graphic` |
| `motion-graphic-playbook` | Baseline; digantikan v3. Style preset A–G sengaja tidak dibawa (lihat `motion-graphic/references/decision.md` §5) |
| `irfan-motion-director` | Baseline; prinsip sudah ada di v3, contoh storyboard Tuntunly pindah ke `storyboard.md` §3 |

Tiga baseline belum dihapus dan belum dicabut dari Mac/cloud. Pencabutan menunggu eval (fase 6 audit).
