# B10a Blender · still gate

Scope: `handoff/TASK-b10a-blender.md` + `REVISI-1.md` §B10a-3D. No final animation render, no lego integration.

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
