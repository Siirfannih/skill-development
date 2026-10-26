# Skill eksternal

Repo pihak ketiga, dipasang sebagai **git submodule** dan dikunci di commit tertentu. Isinya tidak disalin ke `claude/`, supaya lisensi dan asal tetap utuh dan pembaruan bisa ditarik kapan saja.

| Folder | Sumber | Versi terkunci | Dipakai untuk |
|---|---|---|---|
| `superpowers/` | github.com/obra/superpowers | v7.0.1 (`2ce8aa1`) | Alur kerja: brainstorming → plan → develop/act → evaluasi → langkah berikutnya |
| `anti-slop/` | github.com/miqdadbadjuber/anti-slop | `6732aee` | Filter anti-generik untuk coding, desain UI, dan copywriting |
| `awesome-design-md/` | github.com/VoltAgent/awesome-design-md | `3b60532` | Prinsip desain: 84 contoh `DESIGN.md` dari sistem desain merek nyata |
| `remotion-skills/` | github.com/remotion-dev/skills | `6c67adc` | Agent Skills resmi Remotion (12): best-practices, create, render, studio, interactivity, multimedia, upgrade, dll. **Lisensi belum tercantum di repo**: dipakai sebagai acuan, jangan didistribusikan ulang |
| `hyperframes/` | github.com/heygen-com/hyperframes | `382a14d` (Apache-2.0) | HTML + GSAP → MP4 deterministik; skill `hyperframes`, `hyperframes-cli`, `media-use` (SFX), `remotion-to-hyperframes`, plus `motion-doctrine`, `seam-craft`, `cut-the-curve` di `.claude/skills/`. Checkout ± 330 MB |
| `earshot/` | github.com/Leonxlnx/earshot | v0.4.0 (`591fa3e`) | "Telinga" untuk agent: describe, rank, match, critique audio/film terhadap film referensi; dipakai kit `claude/motion-graphic/scripts/audio/` (sfx_comfort, QA). Pasang: `cd external/earshot && python3 -m venv .venv && .venv/bin/pip install -e .`, lalu `EARSHOT=external/earshot/.venv/bin/earshot` |

## Peta pemakaian

| Kebutuhan | Skill |
|---|---|
| Ide baru atau fitur baru, sebelum membangun | `superpowers/skills/brainstorming` |
| Menyusun rencana kerja | `superpowers/skills/writing-plans` |
| Menjalankan rencana | `superpowers/skills/executing-plans`, `subagent-driven-development` |
| Mengevaluasi sebelum menyatakan selesai | `superpowers/skills/verification-before-completion`, `requesting-code-review` |
| Debugging | `superpowers/skills/systematic-debugging` |
| Membuat atau memperbaiki skill | `superpowers/skills/writing-skills` |
| Kode bebas pola "AI-shaped" | `anti-slop/skills/antislop-code` |
| UI web dan mobile | `anti-slop/skills/antislop-ui`, `antislop-layoutmobile` |
| Copy, caption, naskah | `anti-slop/skills/antislop-copywriting`, `antislop-human` |
| Arah visual (palet, tipografi, spacing) | `awesome-design-md/design-md/<merek>/DESIGN.md` |
| Membangun atau me-render video di Remotion | `remotion-skills/skills/remotion-best-practices`, `remotion-render`, `remotion-studio`, `remotion-upgrade` |
| Video HTML + GSAP, atau pindah dari Remotion | `hyperframes/skills/hyperframes`, `remotion-to-hyperframes` |
| Prinsip gerak dan sambungan potongan | `hyperframes/.claude/skills/motion-doctrine`, `seam-craft`, `cut-the-curve` |
| Mendengar audio yang tidak bisa didengar agent (SFX, musik, mix) | `earshot` (`describe`, `rank`, `critique`) + `claude/motion-graphic/scripts/audio/` |

## Aturan pakai

- **Skill Irfan menang bila bertentangan.** Contoh: superpowers meminta persetujuan desain di setiap gerbang, sedangkan `autopilot-prd` menyatakan butir yang sudah tertulis di rencana sudah disetujui. Untuk butir seperti itu, `autopilot-prd` yang berlaku.
- **anti-slop adalah filter, bukan arah.** Ia membuang yang generik; arah visual tetap datang dari brief proyek dan `DESIGN.md`.
- **Untuk video Irfan, `claude/motion-graphic` menang.** Skill Remotion/HyperFrames dipakai untuk API dan cara teknis, bukan untuk arah kreatif.
- **awesome-design-md dipakai untuk mempelajari prinsip, bukan meniru identitas merek.** Ambil sistemnya (skala tipografi, ritme spacing, cara memakai satu aksen), bukan palet, logo, atau nama mereknya. Contoh: `apple/DESIGN.md` untuk memahami "Apple style" di video Jadisatu.
- Jangan menjalankan skrip instalasi dari repo ini (`npx`, `scripts/`, hooks) tanpa membaca isinya dulu.

## Memperbarui

```bash
git submodule update --remote external/<nama>   # tarik versi terbaru
git diff --submodule                            # lihat apa yang berubah
```
Baca catatan rilisnya sebelum commit versi baru, karena perubahan skill eksternal bisa mengubah perilaku agent.

Clone repo ini beserta isinya: `git clone --recurse-submodules https://github.com/Siirfannih/skill-development.git`
