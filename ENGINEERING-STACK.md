# Engineering Stack

Tumpukan skill engineering terkurasi untuk sesi coding, membedah kode, membangun sistem, dan review. Dipasang di level user, jadi aktif di semua proyek. Pasang atau perbarui dengan `./tools/engineering-stack.sh` (Mac) atau `CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/engineering-stack.sh` (PC server, ulangi untuk `~/.claude`). Script idempoten; daftar di script dan di file ini diubah bersamaan.

## Prinsip kurasi

Setiap plugin menambah deskripsi skill/agent ke **setiap** sesi (biaya always-on, lihat `claude plugin details <nama>`). Yang dipasang hanya yang sesuai stack kerja (TypeScript/React/Next.js, Expo, Python, Bash, Remotion, server Linux) dan tidak tumpang-tindih. Plugin lain tetap bisa dipasang kapan saja dari marketplace yang sudah terdaftar: `claude plugin install <nama>@<marketplace>`.

## Isi (biaya always-on diukur dengan `claude plugin details`, dicek 25 Nov 2026)

| Sumber | Dipasang | ≈ tok/sesi |
|---|---|---|
| obra/superpowers | `superpowers` (brainstorming, TDD, debugging, plans, review) | sudah ada |
| anthropics/claude-plugins-official | feature-dev, code-review, code-simplifier, commit-commands, security-guidance, frontend-design, claude-md-management, skill-creator, typescript-lsp, pyright-lsp, mattpocock-skills | ≈2.440 |
| trailofbits/skills | modern-python, property-based-testing, sharp-edges, insecure-defaults, differential-review, supply-chain-risk-auditor, code-improver, second-opinion, patching-bugs, spec-to-code-compliance | ≈2.360 |
| wshobson/agents | shell-scripting, javascript-typescript, plugin-eval, before-you-build | ≈1.560 |
| vercel-labs/agent-skills | react-best-practices, composition-patterns, react-native-skills, react-view-transitions (symlink, juga ke Codex) | ≈400 (perkiraan) |
| t3dotgg/tstack | babysit-pr, council, file-pr, full-send, full-stop, leaving-pr-comments, modernize, sol-loop, takeover (symlink, juga ke Codex) | ≈400 (perkiraan) |
| remotion-dev/skills | sudah lewat `external/remotion-skills` + `tools/sync.sh` | — |
| agentskills/agentskills | spesifikasi Agent Skills: rujukan audit skill, bukan skill | 0 |
| agent-ecosystem/skill-validator | CLI `skill-validator` v1.8.0 di `~/.local/bin` (Mac dan PC) untuk audit skill di repo ini | 0 |

Total tambahan ≈7.150 tok per sesi.

## Tidak dipasang (dan alasannya)

- `pr-review-toolkit` (≈2.035 tok/sesi): tumpang-tindih dengan `code-review` dan `superpowers:requesting-code-review`.
- Sisa 300+ plugin resmi, 37 plugin Trail of Bits, 89 plugin wshobson: di luar stack (cloud vendor, smart contract, bahasa lain) atau duplikat. Pasang per kebutuhan.

## Dependensi

- LSP: `typescript-language-server`, `pyright` (npm global). PC: dipasang di `~/.local/opt/node22/bin`, di-symlink ke `~/.local/bin`.
- tstack butuh `gh` terautentikasi (`babysit-pr`, `file-pr`); PC belum punya `gh`.
