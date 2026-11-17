# B10a Blender · still gate and shot render

Scope: `handoff/TASK-b10a-blender.md` + `REVISI-1.md` §B10a-3D, followed by approved `handoff/TASK-b10a-render.md`. The full shot is a standalone asset; lego integration belongs to the builder.

Run from project root: `bash lego/blender/run_stills.sh`.

- Portable Blender 5.2.4 LTS downloaded from `https://download.blender.org/release/Blender5.2/`; archive and installation stay in `/mnt/storage-projects/skill-dev-journey/blender/`.
- Local EGL dependencies (`libegl1`, `libegl-mesa0`, 146 kB download total) are extracted under `blender/deps/unpacked/` and copied to the RAM runtime. No system installation. The launcher sets their library and vendor search paths.
- The storage mount is `noexec`; the launcher copies the runtime into `/dev/shm/b10a-blender-5.2-runtime/` (RAM) to execute it. This can be removed after Blender exits. No large runtime files are written to the root disk.
- `prepare.py` reads the original `edit/words.json`, `wajah.mp4`, and `suara.wav`, writes the live editor image sequence and movie to storage. Fonts load from a named DejaVu Sans TTF; no generated brand names or borrowed UI text.
- `scene.py` builds every mesh and material procedurally. The saved `.blend` is configured for HIP if available, otherwise Eevee Next. This machine exposed only CPU through HIP; the preliminary 4.5 Eevee invocation exited 143 before any image, so final 5.2.4 review stills use Cycles CPU, 48 samples, denoised, 8 CPU threads. The compositor uses the Blender 5 node-group API and socket-driven Glare.
- `check_scene.py` checks dimensions, frame rate, timing, voxel structure, DOF and BEZIER interpolation without rendering. `scene-check.json` and `render-times.json` preserve measured evidence.
- `finish.py` adds subtle grain and vignette, writes native 1920×1080 finished PNGs to storage, 960×540 review JPEGs and the comparison sheet to `qc/still/revisi1/`.
- Timing: 74.2115–76.7765 s, duration 2.565 s, rounded up to 77 frames at 30000/1001. “kayak” onset 75.7115 s → frame 46 (first sample at/after onset, +1.5 ms). The exact word-derived range takes priority over the approximate 3–4 s in the brief.
- The three static frames prove staging, not temporal smoothness or Eevee equivalence; these still need review before an animation render. The script defaults to exactly three stills and contains no `animation=True` call.

## Ronde 2 · macro and crab silhouette

The revision keeps the project footage, timeline texture, warm practical light and finish. Claude has a 19×10-voxel body (1.90 width/height), two 3×3×3-voxel arms, four 2×3×3-voxel feet and two 2×2 dark eyes. Clay uses #B4532F–#C9653F with roughness 0.6 and subsurface 0.055; a rear overhead amber area light separates the toy from the room. Exposure is −0.15.

The 46 mm camera holds the entire toy at 51.9–58.4% of image height through a slow 3 cm push, with f/2 depth of field. Focus moves from Claude over frames 31–45, holds the monitor over 45–52, and returns over 52–67; the onset is frame 46. The head returns to 28° yaw and nods after focus reaches Claude. All animated channels use clamped Bézier curves.

`bash lego/blender/run_stills.sh --build-only` builds and checks without rendering. `check_scene.py` projects every toy and monitor corner across all 77 frames and rejects cropping, an incorrect size, a changed silhouette, or a focus return outside the intended window. This verifies geometry and keys; three stills still need the director's visual judgment. Ronde 1 files are preserved under storage `b10a/round1/`.

## Render penuh · TASK-b10a-render

`bash lego/blender/run_full.sh --test` renders frames 1, 46 and 77; after their visual and timing check, `bash lego/blender/run_full.sh` reuses those three and renders the remaining frames. Run through `tools/tunggu.sh jalan …` and one `tunggu` call. Cycles CPU uses 10 samples, OpenImageDenoise Accurate, eight threads and persistent scene data; the round-2 lighting/materials and composited Fog Glow remain unchanged. HIP was unavailable in the approved setup; Eevee equivalence is unproven, so this render keeps Cycles.

The camera is 9% closer to Claude with a small aim adjustment to preserve framing. Geometry verification across all 77 frames requires at least 5% toy margin; rack focus remains at the approved frame keys. The old 60% height ceiling belonged to the previous framing; the closer-camera check permits up to 68% while retaining the stricter 5% margin.

`finish.py --sequence` applies the existing grain/vignette treatment to every rendered frame, with deterministic frame-specific grain; glare is already baked once by Blender. The runner encodes a ProRes 422 HQ movie from the finished PNG sequence, then `verify_full.py` decodes all 77 movie frames, checks every PNG for corruption/black frames, checks source hashes and timing, and creates the 960 px, 12-frame sheet. Output: storage `b10a/out/b10a.mov`; evidence: `full-render-times.json`, `full-check.json`, `finished/`, `raw/`. Exact output duration is 77×1001/30000 = 2.569233 s; the word window is 2.565 s (4.233 ms of frame quantization).

The upstream words, audio and footage changed during the full render. All 77 rendered/decoded frames pass artifact checks; the original source-freshness guard remains FAIL and the runner exited 1. `full-check.json` keeps these results separate instead of treating changed hashes as a pass. The latest window is 74.1448–76.7098 s with onset at 75.6448 s: the 77-frame length and local onset at frame 46 are unchanged. `placement-current.json` records this compatible placement; the rendered monitor retains the approved G2 footage, which differs from the latest face footage. `timing.json` retains the actual render-input version. Do not report the movie as refreshed against the latest media.
