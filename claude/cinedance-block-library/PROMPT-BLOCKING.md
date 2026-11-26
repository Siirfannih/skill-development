# PROMPT BLOCKING · video-generation prompt structure (Gemini Omni, Veo, Seedance)

Source: "Prompt Blocking" PDF I sent on 18 Nov 2026 (original example: 10 s educational video, 16:9, 1970s–80s retro Korean style, Malay dialogue). This file records **its structure**, not its content. Use it whenever you write a prompt for a video model that generates a speaking person (Gemini Omni in Flow, Veo, Seedance), especially when the person is me (avatar) and the dialogue is not in English.

## 1. Why blocking works

- The prompt is split into **numbered sections with one concern per section** (identity, camera, design, voice, timeline, audio, prohibitions, priorities). The model does not have to guess which sentence governs what. Our earlier prompt failures ("aturan terlalu ketat dan dicampur": rules too strict and mixed together) came from putting text, camera, and voice rules in a single paragraph; blocking separates them.
- **Locks (LOCK)** are written once at the top (face, wardrobe, language) and apply to all scenes, so the timeline only holds what changes.
- **Per-second timeline** gives the model a schedule it can follow: each scene has environment, character action, camera, exact dialogue, delivery, and transition.
- **Dialogue is written twice**: in its scene and again in the audio section's dialogue sequence list, with timestamps. This helps lip sync.
- **Ranked priorities** at the end tell the model what to sacrifice last when not everything can be met.

## 2. Structure (preserve order)

| # | Section | Contents | Notes |
|---|---|---|---|
| 0 | Header | video type, DURATION (exact, "EXACTLY N SECONDS"), ASPECT RATIO, VISUAL STYLE, DIALOGUE (language + locale code, e.g., id-ID), GENRE | One line per key |
| 01 | MASTER CHARACTER IDENTITY LOCK | identity reference (photo/avatar = the only face reference), subject description, list of preserved features (face shape, eyes-brows-nose-lips, jawline, hair, skin, age, proportions), WARDROBE LOCK, character position/props, drift prohibition (no beautification, no morphing) | Written as a list |
| 02 | CAMERA & LIGHTING | camera body, lens, lights, light setup (key, accent, shadow), CAMERA LANGUAGE (list of allowed moves) | Naming real gear makes the output more photographic |
| 03 | VISUAL & MOTION GRAPHIC DESIGN | style, design elements, colour palette, text rules (text only on background/empty space, never covering face, mouth, hands) | For B-roll where we build the text ourselves: this section holds set and lighting only, plus one line "no on-screen text" |
| 04 | VOICE & LANGUAGE LOCK | language, accent (city/region), voice (gender, age), DELIVERY, speak to camera + lip sync, prohibition on translating, prohibition on adding dialogue | Also name languages that must NOT appear |
| 05 | EXACT TIMELINE | blocks per time range `[00:00–00:02] SCENE 01 — NAME`: ENVIRONMENT, TYPOGRAPHY (if any), CHARACTER ACTION, CAMERA, DIALOGUE (exact, in quotes), DELIVERY, TRANSITION | PDF example: 5 scenes × 2 s in one take |
| 06 | AUDIO DESIGN | VOICE, DIALOGUE SEQUENCE (timestamp + line), AUDIO RULES (lip sync, no music, no subtitles, no extra dialogue, consistent voice) | |
| 07 | STRICT NEGATIVE CONSTRAINTS | concrete, observable "DO NOT GENERATE" list (identity drift, extra fingers, text on face, subtitles, music, wrong language, wrong lip sync, random cuts, unmotivated transitions, flickering face) | Concrete, not general traits |
| 08 | FINAL PRODUCTION PRIORITIES | ranked PRIORITY 1…5 + FINAL OUTPUT (one-paragraph summary: duration, ratio, subject, style, dialogue) | Priority 1 is almost always facial identity |

## 3. How to use it for Gemini Omni (our lessons)

1. **One generation = one shot** for B-roll that will be cut to VO lines. A multi-scene timeline (like the PDF) is only used when the clip is genuinely used whole as a single cut.
2. **Dialogue = my exact original VO sentence, word for word**, written as-is (casual Indonesian), numbers written out as words ("seratus persen"). Omni's audio is replaced by my voice later, but this dialogue drives lip movement. Download the result **with** Omni audio: word onsets are used to align the clip to `words.json`.
3. **Section 01 uses the avatar**, not a photo: "Use my avatar as the ONLY facial identity reference." Real face photos are often rejected; the official avatar passes.
4. **Section 03 for text-free B-roll**: write set, lighting, palette, then one line "No on-screen text, captions or subtitles." Do not write typography rules if text will be built in code. Our 18 Nov test: asking Omni for 3D text produces flat 2D text; layered text is built in code.
5. **Section 04** for me: `LANGUAGE: Bahasa Indonesia (id-ID), casual spoken Indonesian · ACCENT: young urban Indonesian (Bali/Jakarta) · VOICE: male, early 20s, warm · DELIVERY: fast, natural, continuous, no long pauses`. Prohibition: "Do not translate the dialogue into English. No Malaysian accent."
6. **Dialogue timestamps in sections 05 and 06 must match** and fall inside the clip duration (Omni minimum 3 s, whole integers). Leave 0.2–0.3 s before the first word.
7. **Short, visual prohibition list** (8–15 items). Prohibitions that cannot be seen in the frame do not help.
8. Priorities I use: 1 avatar identity, 2 Indonesian dialogue + lip sync, 3 set/lighting matching reference, 4 duration and dialogue timing, 5 camera movement.

## 4. Template (fill parts marked < >)

```
CINEMATIC B-ROLL — <SHOT NAME>
DURATION: EXACTLY <N> SECONDS · ASPECT RATIO: 9:16 VERTICAL · ONE CONTINUOUS SHOT, NO CUTS
VISUAL STYLE: <style> · DIALOGUE: BAHASA INDONESIA (id-ID) · GENRE: <genre>

══ 01 — MASTER CHARACTER IDENTITY LOCK ══
Use my avatar as the ONLY facial identity reference.
MAIN SUBJECT: <short description of me: Indonesian male early 20s, black hair with bangs, …>
STRICT FACIAL CONSISTENCY: face shape, eyes, nose, lips, jawline, hairline and hairstyle, skin tone and texture, age and proportions must stay identical.
WARDROBE LOCK: <clothing>.
POSITION: <where the character is / initial pose>.
No beautification, face morphing or identity drift.

══ 02 — CAMERA & LIGHTING ══
CAMERA: <body> · LENS: <lens> · LIGHTING: <lights>
LIGHT SETUP: - <key> - <accent/rim> - <shadow/contrast>
CAMERA LANGUAGE: <allowed moves: locked-off, slow push-in, …>. All camera movement physically believable.

══ 03 — SET & VISUAL DESIGN ══
SET: <studio/set, props>
COLOR PALETTE: <palette>
No on-screen text, captions, subtitles or logos.

══ 04 — VOICE & LANGUAGE LOCK ══
LANGUAGE: Bahasa Indonesia (id-ID), casual spoken Indonesian.
ACCENT: young urban Indonesian. VOICE: natural male voice, early 20s.
DELIVERY: <tone>, fast and continuous, no long pauses.
The subject speaks <to the camera / in profile> with perfectly synchronized mouth movements.
Do not translate the dialogue. Do not add any dialogue beyond the exact line.

══ 05 — EXACT TIMELINE ══
[00:00–00:0X] <INITIAL ACTION>
CHARACTER ACTION: … · CAMERA: …
[00:0X–00:0Y] DIALOGUE (INDONESIAN): "<exact sentence>"
DELIVERY: … · CHARACTER ACTION: … · CAMERA: …
[00:0Y–00:0N] <POST-SPEECH ACTION, mouth closed>

══ 06 — AUDIO DESIGN ══
DIALOGUE SEQUENCE: 00:0X — "<exact sentence>"
AUDIO RULES: perfect Indonesian lip sync · clear natural speech · no music · no subtitles · no additional dialogue · only <room tone / footsteps / keyboard>.

══ 07 — STRICT NEGATIVE CONSTRAINTS ══
DO NOT GENERATE: identity drift · different person · warped hands or extra fingers · on-screen text or subtitles · background music · English or Malaysian speech · wrong lip sync · camera cuts · flickering face · <shot-specific items>

══ 08 — FINAL PRODUCTION PRIORITIES ══
PRIORITY 1: exact avatar identity. PRIORITY 2: accurate Indonesian dialogue and lip sync. PRIORITY 3: <set & lighting>. PRIORITY 4: dialogue inside the timestamps. PRIORITY 5: camera movement.
FINAL OUTPUT: one continuous <N>-second 9:16 shot of <summary>, photorealistic, speaking the exact Indonesian line.
```

## 5. Filled example

Per-shot prompts for my intro video (18 Nov 2026) use this template: see `EDITING-GUIDELINE` for that project on Drive `Claude edit/Siap edit/2026-11-18 — Video Perkenalan Irfan/` (§6 Omni prompts).
