# Writing instruction text

Open when writing or rewriting a rule, lesson, card, description or reference.

## 1. Shape of a rule

A rule is an **instruction** (what to do, when), its **reason** in one sentence (what goes wrong without it; this is what lets a model handle unforeseen cases) and a **check** (a command and fail condition, or the frame or file to show).

Lesson items in a guide's "How to decide" section use this form; an Indonesian guide keeps its Indonesian labels (pairs in `references/glossary.md`):

```
- **[CODE-NN] Short title** · class P|H · check: <stage or checkpoint>
  - Trigger: what is visible in the brief, storyboard or frame before the error happens
  - Anti-Pattern: the observed class of error, one sentence, no story
  - Invariant: what must be true, starting with an action, with a number or a way to count
  - Because: the effect on the viewer or on quality
  - Allowed: legitimate exceptions, or the item that overrides this one
  - Gate: script and fail condition, or the frame to show
```

Convert an older item when you next edit it, not in a mass rewrite: rewriting a whole guide compresses it and silently drops items.

## 2. Fit the form to the failure

| Failure seen | Form that works |
|---|---|
| known rule skipped under pressure | short rule, reason, and the excuses agents actually gave with an answer to each |
| output has the wrong shape | a recipe: the output's parts in order |
| a required element goes missing | a required slot in the template |
| right behavior depends on the situation | a condition on something observable ("if the project has a REF-SPEC, …") |

A vague exception ("unless it matters") reopens every case; give a real one its own observable condition. A rule with no exception at all becomes a check, not louder prose.

## 3. Wording

- Say what to do; naming the forbidden thing makes it more available. A prohibition is only a guardrail beside the target.
- Match rigidity to fragility: goal and reason when many outputs are right; exact steps when one order or command is right (render, sync, credentials, paid calls).
- No all-caps or MUST/NEVER: emphasis makes agents over-apply; the reason does the work.
- One known word per concept, defined once, reused exactly; new terms go into the glossary first.
- Keep only what an agent would get wrong without it; every loaded sentence costs tokens.
- Link instead of restating, except what is expensive to look up (a convention, a gotcha). Keep a concept's definition, rules and exceptions together.

## 4. Descriptions

The description is all an agent reads before opening a skill. `name`: lowercase letters, digits and single hyphens, ≤ 64 characters, equal to the folder name. `description` ≤ 1024 characters: what the skill is for, then "Use when …" with the situations and phrases I actually type (Indonesian included), and the closest near-miss it is not for. Leave the workflow out: an agent follows a step summary and skips the body. Quote a value containing ": ", because some clients silently drop a skill with invalid YAML. Test with `references/testing.md` §5.

## 5. Size and structure

Budgets, measured by `scripts/steward_check.py` (tokens ≈ bytes / 3.5): SKILL.md body ≤ 500 lines and ~5000 tokens, with lean as the aim (the only stricter limit is the existing byte test on `motion-graphic/SKILL.md`, which stays); one reference ≤ ~10000 tokens (a contents list above ~300 lines); AGENTS.md and CLAUDE.md ≤ ~2000 tokens.
What every path through a skill needs stays in SKILL.md; the rest goes one level down. Every pointer says when to open its target; a bare "see X" is ignored or read every time. Test scenarios live in `steward/changes/`, never in a skill folder, where they could pass for instructions.

## 6. Before you finish

The home matches `references/placement.md`; every changed line traces to the stated problem, and unrelated finds go to `steward/inbox/`; older instructions on the subject are edited or gone; each rule has a reason and a check; no names, dates, stories or project nouns in a general rule; `steward_check.py --only frontmatter,budget` is clean.
