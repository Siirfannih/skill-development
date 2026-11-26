# Real-Chrome proof of the render guard (render.sh + tunggu.sh)

Date: 2026-11-27. Machine: node-c-pc, 8 cores, Node 22.23.5, Remotion 4.0.380, real chrome-headless-shell (downloaded by Remotion into the test project's node_modules).
Code under test: `/home/irfan/work/sd-wt-merge` detached at `origin/main` 7fceb9ea (git status clean before and after; nothing committed).
Scripts: `claude/motion-graphic/scripts/juri/render.sh`, `tools/tunggu.sh`.
Test project: `/home/irfan/work/sd-steward-run/render-proof/proj` (copy of `tools/bench-render` source plus one extra 900-frame composition `Lama`, so renders run long enough to interrupt). Modes used: `still` and `draft` (no gates involved; `final`, `frames` and `lego` were not run, see gaps).
Evidence files: `/home/irfan/work/sd-steward-run/render-proof/evidence/` (one file per case; `drive.py` is the signal driver, `h.sh` the helper functions).

Method notes: the ledger `qc/jobs.jsonl` and `ps -o pid,ppid,pgid,sid` listings are in the evidence files. Chrome counts below are scoped to this project's path; the global `chrome-headless-shell` count was 0 at the start and 0 at the end. Signals to `render.sh` were sent from a Python driver that starts it with default signal dispositions in its own session. A plain `cmd &` in a non-interactive bash starts it with SIGINT ignored, so the INT trap can never be installed in that case (see gaps).

## Verdicts

| Case | Verdict | Short evidence |
|---|---|---|
| a. normal still + draft | PASS | still s1/s2 rc 0 (46 s, includes first-run setup), draft 0-29 rc 0 (12 s); chrome count 0, no project process, no lock holder afterwards |
| b. timeout | PASS (with a caveat) | `RENDER_MAKS_DTK=5` -> rc 124 after 5 s, TIMEOUT message printed, ledger `rc":124,"catatan":"TIMEOUT draft Lama"`; 0 survivors at +10 s |
| c1. SIGINT | PASS | rc 130 in 2.1 s, no survivor at +0/3/10/30/60 s, locks free, ledger row written |
| c2. SIGTERM | PASS (with a caveat) | rc 143 in 2.0 s, one Chrome helper (state D) lived about 3 s more, gone by +10 s |
| d. SIGKILL of render.sh | FAIL (as expected, weak case) | whole render keeps running; nothing is cleaned; details below |
| e. tunggu `hentikan` | PASS (one small defect) | job group killed, 0 survivors, rc 143, status `dihentikan`; job timeout `MAKS_JOB_DTK=8` also gives rc 124 + TIMEOUT line |
| f. two simultaneous stills | PASS | serialised on the project lock, bundle built once, no EISDIR |
| g. orphan warning | PASS (with caveats) | warning printed, orphan not killed; counts only the main Chrome, and does not fire in the SIGKILL case d |

## Case details

### a. Normal runs (PASS)
- `render.sh proj still Berat s1:30 s2:60` -> "still s1 (frame 30)", "still s2 (frame 60)", rc 0. Two PNG files written.
- `RENDER_MAKS_DTK=600 render.sh proj draft Berat 0-29` -> `draft_0-29.mp4` (91 KB), rc 0.
- After each: chrome count 0, no process of the project, `fuser` shows no holder of `qc/.render.lock` or `/tmp/remotion-heavy-render.lock`. Ledger rows have rc 0.
- Files: `a1-still.txt`, `a2-draft.txt`.

### b. Timeout (PASS, caveat on process groups)
- `RENDER_MAKS_DTK=5 render.sh proj draft Lama`: output `TIMEOUT draft Lama setelah 5 dtk: proses dan anak-anaknya dihentikan (naikkan STILL_MAKS_DTK, RENDER_MAKS_DTK, atau FINAL_MAKS_DTK untuk final, ...)`, exit code 124. Remotion printed `ProtocolError ... Target closed` into the output (expected after a kill).
- Process groups at t=3.5 s: `timeout`, `npm exec`, `sh -c`, `node`, and the Remotion compositor share pgid 1546717 (the guard's setsid group). **Chrome is NOT in that group**: `chrome-headless-shell` and its helpers have their own pgid and sid (1546768). So the guard's group kill never reaches Chrome directly. Chrome died only because Remotion's node process handled SIGTERM and closed it.
- Immediately after rc 124 one Chrome helper (pid 1546786, state D, ppid 1) still existed; at +10 s none. No node/npx survivor, locks free.
- Files: `b-timeout.txt`.
- Extra trial `b2-wedged-node.txt`: render in frame-rendering phase, node frozen with SIGSTOP so it cannot handle TERM, `RENDER_MAKS_DTK=12 KILL_SETELAH_DTK=2`. render.sh rc 124 after 7 s, 0 Chrome left at +5 s. One trial only; it contradicts the d3 result below (node SIGKILLed leaves Chrome), so I cannot say why Chrome died there. I do not claim the guard covers a wedged node.

### c. Interrupt (PASS)
- SIGINT to render.sh with Chrome up (11 project processes, 5 Chrome): rc 130 after 2.1 s; project process count 0 at +0 s and stays 0 through +60 s; no lock holder; ledger row `rc":130`.
- SIGTERM: rc 143 after 2.0 s; one Chrome helper in state D remained at +0 s and +3 s, gone by +10 s; locks free; ledger row `rc":143`.
- Files: `c1-sigint.txt`, `c2-sigterm.txt`.

### d. Hard kill (FAIL for the guard; the intended weak case)
`d-sigkill.txt`: SIGKILL to render.sh with Chrome up.
- render.sh dies instantly (rc -9). **Everything else keeps running**: `timeout` (reparented to pid 1, still pgid of its own group), `npm exec`, `sh`, `node`, compositor, and 5 then 10 Chrome processes. The render carried on for about 110 s until it finished by itself (`draft.mp4` 1.2 MB written 07:32:02; the kill was at about 07:30:10). Its own 2700 s timeout is the only upper bound.
- No ledger row is written for the killed job (trap EXIT does not run on SIGKILL).
- Locks: the project lock (`qc/.render.lock`) is held by the surviving `timeout` and `npm` (they inherited fd 8) for the whole time, and released the moment they exit. Proof: a `still` started 70 s after the kill printed `kunci proyek: menunggu render lain di proyek ini...`, waited about 17 s (ledger `antre_dtk":17`), then proceeded once the survivor finished. `/tmp/remotion-heavy-render.lock` was not involved (draft does not take it). **Chrome itself does not hold the lock** (`fuser` lists only render.sh, timeout, npm).
- So the design intent (lock stays held while a render is alive) holds, but the "orphan" is not stopped: it is a live full render nobody is waiting for.
- Worse variant, `d2-kill-node-too.txt` and `d3-node-sigkill.txt`: if node dies too (SIGKILL on `node`, as the OOM killer or a crashed session would do), the whole Chrome tree (10 processes) is re-parented to pid 1, keeps running (checked up to 23 s here, no self-exit), and **the lock is free**. This was reproduced twice with render.sh alive: render.sh returns rc 137 (not 124, so no TIMEOUT note), the guard does nothing about Chrome, and the Chrome tree lingers until killed by hand. This is the exact class of the original incident.

### e. tunggu.sh (PASS, one small defect)
- `JOBS_DIR=<evidence>/jobs tunggu.sh jalan e1 -- render.sh proj draft Lama`, then `hentikan e1` with Chrome up (21 project processes). Output `job e1 dihentikan (grup 1559990)`, rc 0. Project process count 0 at +0/3/10 s, chrome 0, locks free, `rc` file 143, `status` says `e1 dihentikan`. `pgid` file matched the supervisor group.
- Job timeout: `MAKS_JOB_DTK=8 KILL_SETELAH_DTK=3` -> `tunggu` reports `job e2 selesai rc=124 - 8 dtk`, log ends with the TIMEOUT line, 0 survivors at +10 s, ledger row rc 143.
- Defect: after `hentikan`, render.sh wrote **no ledger row** (the guard sends KILL to the whole group 2 s after TERM, the same moment render.sh's own `mati` sleeps 2 s before it exits). With the 3 s kill-after in the timeout case the row was written. Small effect: a hentikan'd job leaves no jobs.jsonl line.
- Files: `e1-hentikan.txt`, `e2-job-timeout.txt`.

### f. Two stills at the same moment (PASS)
`src/Root.tsx` touched first so the bundle was stale; two `render.sh ... still` started in the same second.
- Job B printed `kunci proyek: menunggu render lain di proyek ini...`, then `bundle: pakai ulang`; job A printed `bundle: membuat ulang (src berubah)`. Exactly 1 rebuild and 1 reuse.
- Ledger: A `antre_dtk":0,"kerja_dtk":4`; B `antre_dtk":4,"kerja_dtk":9` (B waited the 4 s A needed). Both rc 0, both PNGs present.
- `EISDIR`: grepped both outputs, `bundle.log`, `still.log`: none.
- Not tested: a bundle started outside render.sh (for example `bench.sh` or a direct `npx remotion bundle`) racing with render.sh; those do not take the project lock.
- File: `f-two-stills.txt`.

### g. Orphan warning (PASS, with caveats)
- With a real orphan Chrome tree (ppid 1, 10 processes, from the node-SIGKILL trial) alive, `render.sh still` printed:
  `PERINGATAN: 1 proses chrome-headless-shell yatim (induk 1) masih jalan. Bila bukan render sah proyek lain: ps -eo pid,ppid,cmd | awk '$2==1 && /node_modules\/.remotion\/chrome-headless-shell/ {print $1}' | xargs -r kill`
  then ran normally (rc 0). The orphan was still alive afterwards: the script does not kill it.
- Caveats: it reports "1" for a tree of 10 processes (only the root has ppid 1). It fires only once node is dead too: in the plain SIGKILL-render.sh case (d) the Chrome parent is still the live node, so `ps` shows no ppid-1 Chrome and the warning stays silent (`g1-warning-while-survivors.txt`: 0 ppid-1 chromes, no warning, the run just queued on the lock). The suggested kill command matches every ppid-1 Remotion Chrome on the machine, any project.
- Files: `g2-orphan-warning.txt`, `g1-warning-while-survivors.txt`.

## What the guard does not cover in practice

Each with a suggested fix (small = a few lines in the script; medium = a new small component or test work).

1. **SIGKILL of render.sh leaves the whole render running, with no ledger row** (case d). Fix, small: start the child with `setsid` from a tiny watchdog that also watches the parent: in the `jalankan` subshell add a background loop `while kill -0 $PPID_RENDER; do sleep 2; done; kill -TERM -- -$$` (or `prctl(PR_SET_PDEATHSIG)` through `python3 -c`/`setpriv --pdeathsig TERM`, which exists in util-linux: `setsid setpriv --pdeathsig TERM timeout ...` sends TERM to `timeout` itself when render.sh dies, which then kills its group). The lock stays held during the grace period, which is what the design wants.
2. **Chrome is not in the guard's process group** (Remotion starts it detached), so every guard kill depends on Remotion's node process still being able to run its cleanup. If node dies by SIGKILL/OOM (d3, reproduced twice), a ppid-1 Chrome tree survives and nothing reaps it; render.sh returns 137 and the lock is free, so the next render starts next to it. Fix, small: after `jalankan` returns with rc != 0, kill Chrome processes whose command line contains this project's `$R/node_modules/.remotion/chrome-headless-shell` and whose ppid is 1 (path-scoped, so other projects are untouched). Fix, medium: use `systemd-run --user --scope` or a cgroup per render so everything is reaped regardless of setsid.
3. **Case rc 137 is not labelled.** A node SIGKILL gives rc 137, and `jalankan` only labels it TIMEOUT when the elapsed time is at least the limit, so an OOM kill looks like a plain failure with no hint about orphans. Fix, small: on rc 137/143 print one line naming the likely cause and run the Chrome sweep from item 2.
4. **Orphan warning is blind in the common leak case and undercounts.** It looks only at ppid 1, so Chrome whose parent node is still alive (case d) is not reported; it prints 1 for a 10-process tree; the suggested command would also kill other projects' Chrome. Fix, small: count roots by `ppid==1 or parent not chrome-headless` and filter the suggested kill by `$R` path; also list render-owned node/`timeout` processes with ppid 1 (`ps -eo pid,ppid,args | awk '$2==1 && /remotion (render|still|bundle)/'`).
5. **Temp directories leak on every kill.** After the timeout, SIGTERM, SIGKILL and node-kill trials, `/tmp/react-motion-render*` and `/tmp/remotion-v4.0.380-assets*` directories remained (12 created in about 12 minutes here; each small, but the renders write about 2 MB per frame in `/tmp` for `final`, which can leave GBs for long renders). Fix, small: pass `--tmp-dir`/TMPDIR per job under `$QC/.tmp` and `rm -rf` it in the ledger trap and at start when no render holds the lock.
6. **`hentikan` loses the ledger row** (case e): TERM then KILL to the whole group after 2 s races with render.sh's own 2 s grace. Fix, small: in `tunggu.sh hentikan` wait about 4 s between TERM and KILL, or send KILL only to the supervisor's group after render.sh's grace has passed (make `KILL` delay 2 s longer than `mati`'s sleep).
7. **INT trap not installed under `cmd &` / `nohup` launches.** Bash starts background jobs of a non-interactive shell with SIGINT ignored, and signals ignored on entry cannot be trapped; so SIGINT to a render.sh started that way is ignored (my driver avoided this). TERM and the group timeout still work. Fix, small: document in the header comment that the supported cancel signals are TERM and `tunggu hentikan`, and have callers that background render.sh use `setsid` plus an explicit TERM.
8. **Modes not exercised with real Chrome:** `frames`, `final`, `lego`, the global lock `/tmp/remotion-heavy-render.lock`, and the default limits against a long real render (2700 s, 10800 s). The final path was not run because its gates need audio, stills sheet and reviewer files (not bypassed, per the instructions). Fix, medium: add a gate-free test hook (for example an env var that skips only the gate block when a dedicated test project path is used) or a dedicated `final`-like mode for CI that takes `heavy_lock` plus `jalankan "$FINAL_MAKS"` without gates.
9. **Concurrent bundlers outside render.sh are not locked** (`bench.sh`, direct `npx remotion bundle`, other scripts). Not tested; the project lock only protects callers of render.sh. Fix, small: have `bench.sh` and any other bundle caller take the same `qc/.render.lock` (or document that they must not run in the same project).
10. **Concurrency across projects is unbounded for still/draft.** The project lock is per project; six projects can still run six Chromes at once, which was the load of the original incident. Fix, medium: a global counting semaphore (for example N slots through `flock` on `/tmp/remotion-slot.{1..N}.lock`) for still/draft, keeping the exclusive heavy lock for frames/final.

## Disk and cleanup
- `df -h /` before install: 127G total, 93G used, 28G available. After the whole run and cleanup: identical (93G used, 28G available, 78%). During the run `node_modules` (incl. Remotion's Chrome) was 739 MB. `~/.npm` cache is 511 MB and was left (shared cache; not measurably changed in `df`).
- Removed: `proj/remotion/node_modules`, `proj/qc` (bundle, stills, drafts, logs), 12 leaked `/tmp/react-motion-render*` and `/tmp/remotion-v4.0.380-assets*` entries created during the test window (older ones from 25-26 Nov, not mine, were left).
- Processes: only processes of `render-proof/proj` were killed (the two orphan Chrome trees, by pid taken from `ps | awk` on the project path, listed in `g2-cleanup.txt` and `d3-cleanup.txt`). Final `chrome-headless-shell` count: 0 (start: 0). No project process left.
- `/home/irfan/work/sd-wt-merge`: `git status` empty, HEAD 7fceb9ea detached. Other checkouts untouched. `~/work/jobs` was not used (`JOBS_DIR` pointed into the evidence folder).
