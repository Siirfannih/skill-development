> **Engine of `claude/motion-graphic`, not a standalone skill.** Uploaded by Irfan 11 Nov 2026 (`talking-head-reels.zip`); kept as received except the cross-platform font patch below. Used by the Editor role when the chosen style is `templates/gaya/editorial-bold` (or any EDL-driven talking-head edit). Rules in `../../SKILL.md` and the chosen style win over this file when they differ.

# Talking-head reels

You turn one recording of a person talking to camera into a finished vertical reel (MP4). The look
is editorial and fast: the speaker is the spine of the video, and every 2-4 seconds the frame
changes - a punch-in, a big word, a B-roll insert, a split screen - always driven by what is being
said at that moment.

The mechanics are scripted: cutting pauses, mastering the voice, mattes, and a renderer that draws
every frame straight from an edit decision list (EDL). Your job is the editorial part:
understanding the talk, deciding what each beat should look like, finding or generating footage
that fits, writing the EDL, checking stills, and running the revision rounds with the user.

## Requirements

macOS or Linux, Python 3.9+ with numpy and faster-whisper, ffmpeg with libass (Homebrew ffmpeg, distro ffmpeg, or imageio-ffmpeg).
Optional - Xcode command line tools (Apple Vision mattes, macOS only) and a Higgsfield connection (generated B-roll).

### Fonts on Linux (and any machine without macOS fonts)

Didot and Helvetica Neue ship with macOS under Apple's licence and cannot be copied. The engine bundles open (OFL) stand-ins in `assets/fonts/`, unmodified files from Google Fonts / the Greek Font Society: Playfair Display Bold / Italic / Bold Italic (Didot Bold role), GFS Didot (Didot role), Inter Medium (Helvetica Neue role). Put this in the EDL:

```json
"fonts": { "anton": "Anton-Regular", "serif": "PlayfairDisplay-Bold", "didot": "GFSDidot-Regular", "sub": "Inter-Medium" }
```

Patch notes (11 Nov): `textass.py` loads every font in `assets/fonts/`; `fontmetrics.py` reads the legacy family name (nameID 1) first because libass matches on it (Inter's typographic family "Inter" was not found); the stills contact sheet labels use the bundled Inter; `check_setup.py` accepts Linux. Tested on node-c-pc (Ubuntu): prepare -> transcribe -> cut_pauses -> master_audio -> validate -> stills -> full render. Mattes (`presenter_mattes.py`, `clip_matte.py`) still need Apple Vision; without them cut-out, silhouette and words-behind-head effects are skipped.

## What you deliver

- `PROJECT/render/<name>_vN.mp4` - 1080x1920, H.264, AAC 320 kbps, voice at about -14 LUFS.
- `PROJECT/edl.json` (and `edl_vN.json` copies per round) - the whole edit as data; re-rendering it
  always gives the same video.
- QA stills for review (`PROJECT/qa/.../sheet.jpg`).

## Step 0 - setup and intake

Run `python3 scripts/check_setup.py` (paths in this file are relative to the skill folder) and fix
what it reports. Use the same Python for every script; a venv with
`numpy faster-whisper imageio-ffmpeg` is the easy route. The ffmpeg must include libass (all text
is drawn with it) - the check says which binary it found.

Then make sure you know (ask only for what is missing - one short message):
1. The recording (path). Ideally 4K horizontal or 1080x1920 vertical, speaker roughly centred.
2. The language, and the script if they have it (helps catch filler words and mis-transcriptions).
3. The colour grade: already graded file, a `.cube` LUT, or "use the camera colour".
4. The call to action at the end (e.g. "comment WORD and I'll send the link").
5. Where B-roll may come from: their own footage, generated clips (Higgsfield / Seedance), free
   stock, brand logos. Ask what they have rights to.
6. Where to keep the project folder (default: next to the video, `<name>_reel/`).

## Step 1 - prepare and analyse (scripted)

```bash
python3 scripts/prepare_project.py VIDEO.mov [--graded GRADED.mov | --lut grade.cube] [--project DIR]
python3 scripts/transcribe.py DIR [--language en] [--model small|medium|large-v3]
python3 scripts/cut_pauses.py DIR [--remove 2.40-2.72 ...]
python3 scripts/master_audio.py DIR
python3 scripts/presenter_mattes.py DIR        # needs swiftc; skip only if unavailable
```

`cut_pauses.py` prints every kept segment with its words. Read it against the transcript: remove
false starts, repeated takes and filler words with `--remove start-end` (source seconds) and run it
again. Report to the user how much was removed (e.g. "81.5 s -> 73.4 s"). Later steps all use the
program timeline (`analysis/program_words.json`).

## Step 2 - plan the edit (your judgement)

Read `references/style-guide.md` (the look and the rules) and `references/edit-planning.md` (how to
turn a talk into beats), then write a beat sheet: one row per beat with program times, the spoken
words, what is on screen (presenter wide/tight, insert kind, layout), the text treatment and the
footage idea. Show it to the user before sourcing footage - it is cheap to change now and
expensive later.

## Step 3 - footage

Follow `references/broll-sourcing.md`: what to look for, where it may come from, licensing,
generating clips with Seedance through Higgsfield (prompt template, what gets rejected and why),
and making mattes for cut-outs (`scripts/clip_matte.py`). Put everything in `PROJECT/broll/` and
logos in `PROJECT/logos/`. Review candidates with `scripts/clip_sheet.py`. If the user already has
generated clips or inserts, use them - do not regenerate what exists.

## Step 4 - EDL and validation

Write `PROJECT/edl.json` following `references/edl-schema.md` (a full worked example - the reel this
style was built on - is in `assets/examples/example_edl.json`). Then:

```bash
python3 scripts/validate_edl.py DIR/edl.json
```

Fix every error; read every warning and either fix it or consciously accept it.

## Step 5 - stills, then the render

```bash
python3 scripts/render_reel.py DIR/edl.json --stills 0.6 2.4 4.8 ... --out-dir DIR/qa/stills_v1
python3 scripts/render_reel.py DIR/edl.json --out DIR/render/<name>_v1.mp4
```

Stills take seconds: pick one moment inside every beat, plus the middle of every transition, and
check the contact sheet against the checklist in `references/style-guide.md` (no empty edges, words
readable and inside the frame, nothing over the eyes, text in the centre stack, colour treatment
right). Fix the EDL and re-check until it is clean. Then render the full reel (a few minutes on a
recent Mac; see `references/renderer.md`) and give the user the path plus the numbers the renderer
prints (size, fps, duration, loudness).

## Step 6 - revision rounds (how the user wants to work)

- The user sends notes one by one, often screenshots with a few words. Number them (1, 2, 3...),
  confirm briefly, and change nothing until they say they are done ("start", "go", "that's all").
  Then apply all of them in one pass.
- Every round is a new version: copy `edl.json` to `edl_vN.json` before editing, render to
  `<name>_vN.mp4`. Never overwrite a render or an EDL version the user has already seen.
- Check the changed moments with `--stills` first, then render the full video once.
- Keep the same style across rounds; when a note implies a general rule ("no empty edges", "bigger
  subtitles"), apply it everywhere, not just in the screenshot.
- If the user wants different footage for a shot, change that clip in the EDL (see "Swapping clips"
  in `references/edl-schema.md`) - nothing else moves.

## Other tools

- `scripts/render_reel.py --stills ...` - any moments, as PNGs plus a contact sheet.
- `scripts/clip_sheet.py` - frames and hard-cut times of candidate clips.
- `references/renderer.md` - how the renderer works, speed, fonts, troubleshooting.

## Ground rules

- Footage: use only material the user has rights to - their own, licensed or free-licensed stock,
  or clips generated for them. Generated people must not look like real actors or celebrities, and
  no famous characters, costumes, logos or film scenes may be recreated.
- Every render is a new file. Never overwrite something the user has reviewed.
- Work in English in the project files; talk to the user in their language.
