# Attribution

Open when adapting text from an upstream skill repository, or when asked where a mechanism here comes from.

Ideas from the seven repositories below were rewritten in new words and specialized for this repo; no upstream passage is reproduced beyond a short phrase. This skill is not affiliated with, sponsored by or endorsed by any upstream author, by Anthropic, or by the Agent Skills project.

| Source | License | Copyright line | Adapted |
|---|---|---|---|
| obra/superpowers | MIT | Copyright (c) 2025 Jesse Vincent | behavior tests, pressure scenarios, verification before done |
| anthropics/skills, `skills/skill-creator` | Apache-2.0 (`skills/skill-creator/LICENSE.txt`) | Copyright 2026 Anthropic, PBC. | progressive disclosure, reasons over all-caps, trigger checks |
| agentskills/agentskills | Apache-2.0 for code and specification (`LICENSE`); CC BY 4.0 for documentation (`docs/LICENSE`) | Copyright 2025 Anthropic, PBC (code and specification); documentation names no copyright holder | frontmatter limits, budgets, when-to-read pointers |
| agent-ecosystem/skill-validator | MIT | Copyright (c) 2026 Dachary Carey | token budgets, exit codes (`scripts/steward_check.py`) |
| mattpocock/skills | MIT | Copyright (c) 2026 Matt Pocock | single source of truth, no-op pruning, errors as checks, retro categories |
| heydamir/unslop (https://github.com/heydamir/unslop) | CC BY 4.0 (`LICENSE`) | credit Damir Sokolovsky | tabular digits (typography Data row), consistent mock data (copywriting), say so when there is no finding (revisi) |
| multica-ai/andrej-karpathy-skills | MIT declared in README, `plugin.json` and SKILL.md front matter; the repository has no LICENSE file (lisensi dinyatakan, file tidak ada) | none named in the repository | every changed line traces to the stated problem (writing.md §6) |

Not used: the copy of Anthropic's authoring guide inside superpowers (skills/writing-skills/references/anthropic-best-practices.md in that repo); its copyright is Anthropic's, not covered by that repo's MIT license.

## Obligations

- **MIT**: copies or substantial portions carry the copyright line and permission notice. Nothing substantial is copied; copying later requires the full notice beside it.
- **Apache-2.0**: a redistributed derivative includes the license, states that files were changed and keeps the original notices (neither upstream ships a NOTICE file). No right to the licensor's names or trademarks is granted, so nothing here is presented as an Anthropic or Agent Skills product.
- **CC BY 4.0** (agentskills `docs/`): credit the creator, link the license (https://creativecommons.org/licenses/by/4.0/) and the source (https://github.com/agentskills/agentskills), and say the material was changed. This line is that notice: ideas from the Agent Skills documentation were adapted, rewritten and specialized here. The same applies to heydamir/unslop (CC BY 4.0, https://github.com/heydamir/unslop): credit Damir Sokolovsky; its ideas were rewritten and changed here, no passage is reproduced.
- **MIT declared without a LICENSE file** (karpathy-skills): the repository names no copyright holder, so no notice can be cited; paraphrase only, no passage beyond a short phrase.

## Adapting more

Rewrite in your own words, quoting at most a short phrase; add the source to the table once; take license facts from upstream LICENSE files, not memory. Instruction text never names upstream sources.
