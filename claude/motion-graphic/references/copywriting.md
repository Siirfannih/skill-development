# Copywriting — VO script and on-screen text

Read at the Naskah step and whenever writing text that appears on screen. The script is the foundation: a weak script cannot be saved by any animation, no matter how good.

## Contents

1. My copy values
2. Polishing my draft
3. Per-sentence test
4. Per-script test
5. On-screen text
6. Handing over the script

## 1. My copy values

Optimistic about the product, realistic in execution. Copy speaks about user benefits and impact (like Apple or Clicky style), not about product limitations. Limitations are handled in the product experience, not in copy.

Writer standard: picture a storyteller with 10+ years of experience (Apple scriptwriter, McKinsey storyteller). Every sentence must pass **"Would that person write this sentence?"**

## 2. Polishing my draft

I often bring a rough draft whose structure is already right. Your job is to **sharpen the wording**, not rewrite it.
- Keep its order, ideas, and strongest phrases. Never drop a single idea without noting it.
- After polishing, match idea for idea against the original draft. Failure this prevents: "kami tidak membangun AI agent/model/sesuatu yang inspiratif" and "aman dan terencana" disappeared during polishing.
- Include a brief note: what changed, why, and what is still open.

Every input of mine (hook, sentence, structure) goes through devil's advocate in `working-with-irfan` §2a before being developed.

## 3. Per-sentence test

- **Picture, not label.** Sentences telling viewers what to believe ("rasanya produktif", "ada yang jadi", "sangat membantu") are replaced with something visualizable ("kamu kasih arahan, dan dalam hitungan detik sesuatu berdiri di depanmu").
- **Rhythm that carries meaning.** Repeating cycles sound repetitive ("Membangun. Membongkarnya. Membangun lagi."). Emphasis comes from a short standalone sentence.
- **Read-aloud test.** Comfortable to say in one breath, sounds like a person talking. Consistent register (do not mix "tidak" and "nggak" without a reason).
- **Feel first, name second.** Viewers feel the problem before being handed the term ("AI builder trap" appears after the loop is felt).
- **Banned AI patterns:** repeated "Bukan A, tapi B", "Tidak hanya X, tapi juga Y", "Di sisi lain", "Pada akhirnya", wrap-up summary endings, empty words (krusial, optimal, fenomena, mengidentifikasi). If a contrast pattern is genuinely the message's core, use it at most once and flag it.
- **Honest.** Every claim about the product or my story must be true today. If uncertain, ask or use a safe version.
- **Consistent mock data.** Numbers in mock UI and charts add up across scenes and sit beside a comparator (last month, before, competitor), because an isolated or impossible number reads as fake.

## 4. Per-script test

- One through-line from hook to ending.
- If the market is saturated with a pattern (selling AI courses, comment "PROMPT", selling AI workers), find a clearer angle on the familiar topic instead of repeating that sales pattern.
- The CTA is a continuation of the story, not a transactional exit door.
- Estimate duration from word count: casual Indonesian VO ±2.5–3 words/sec, Jadisatu English narrator VO ±139 words/min. Never generate "temporary" VO just to measure timing.

## 5. On-screen text

On-screen text is derived from the script, not newly written copy. Reason: unspoken text splits the viewer's attention between listening and reading.
- Sourced only from `voiceover.full_text` (VO phrases or their translation). Zero extra sentences or numbers. Failure this prevents: "Rp47.000.000" and "belum cukup bagus" appeared on screen even though they were absent from VO.
- 2–6 words per phrase, lasting 1–3 seconds. Verbs, short, punctuated ("Baca." "Catat. Hafal."). Long sentences only for the closing tagline.
- Sentence case for narration. ALL CAPS only for one-to-two-word verdict words (slam) and mono labels.
- One accent word per phrase, only on the word carrying meaning or benefit. Never automatically on the first word.
- One punctuation habit per project.
- No static subtitles: the kinetic text is the caption. Text size, colour, and motion live in `teks.md`.

## 5b. Extra filter

After the §3–§4 tests, filter once more with `external/anti-slop/skills/antislop-copywriting` for generic writing patterns not yet caught. If anti-slop rules conflict with my direction or this file, my direction and this file win.

## 6. Handing over the script

- Show drafts in chat, not as a file, and iterate until I say final. Once final, save as a file before anything is generated.
- Never declare a script "ready" just because you wrote it. I am the one who decides when it is final.
- Final check: every sentence passes §3, all ideas from my draft are still there, every claim has a basis.
