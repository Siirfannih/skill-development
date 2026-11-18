#!/usr/bin/env python3
"""Build R6 against the R4 stems; write exclusively to audio/r6/.

Run with ~/work/mg-venv/bin/python audio/r6_audio.py [--mux] [--sheet].
Frame numbers are zero based at 30000/1001 fps, inspected in visual_r6.mp4.
Original voice and music enter the sum unchanged. No master processing.
"""
import argparse
import ast
import copy
import hashlib
import json
import math
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 48000
FPS = 30000 / 1001
AUDIO = Path(__file__).resolve().parent
PROJECT = AUDIO.parent
OUT = AUDIO / "r6"
STOCK = Path("/home/irfan/sfx/SFXIrfan")
VIDEO = PROJECT / "qc/r6/visual_r6.mp4"
RANGES = [(8.3, 12.3), (57.6, 76.41), (76.41, 83.82)]


def save_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")


def sha(path):
    with open(path, "rb") as fh:
        return hashlib.file_digest(fh, "sha256").hexdigest()


def decode(path):
    r = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR),
         "-f", "f32le", "-"], check=True, capture_output=True,
    )
    return np.frombuffer(r.stdout, np.float32).copy()


def fade(x, attack, release):
    x = x.copy()
    for n, head in [(round(attack * SR), True), (round(release * SR), False)]:
        n = min(n, len(x))
        if n:
            if head:
                x[:n] *= np.linspace(0, 1, n) ** 2
            else:
                x[-n:] *= np.linspace(1, 0, n) ** 2
    return x


def r4_roles():
    # Read only the two data declarations; importing sfx_build would overwrite R4.
    tree = ast.parse((AUDIO / "sfx_build.py").read_text())
    nodes = [node for node in tree.body if isinstance(node, ast.Assign)
             and any(isinstance(t, ast.Name) and t.id in ("ES", "ROLES")
                     for t in node.targets)]
    ns = {}
    exec(compile(ast.Module(body=nodes, type_ignores=[]), "R4 role data", "exec"), ns)
    return ns["ROLES"]


class R4:
    def __init__(self, final):
        raw, sr = sf.read(AUDIO / "stem_sfx.wav", dtype="float32")
        assert sr == SR and raw.shape == (len(final),)
        assert np.array_equal(final[:, 0], final[:, 1])
        self.gain = np.divide(final[:, 0], raw, out=np.ones_like(raw),
                              where=np.abs(raw) > 1e-15)
        self.roles = r4_roles()
        self.files = {}

    def excerpt(self, cue):
        """Reproduce the R4 float32 excerpt and its onset/RMS alignment exactly."""
        role = self.roles[cue["peran"]]
        file = cue["file"]
        if file not in self.files:
            self.files[file] = decode(STOCK / file)
        y = self.files[file]
        hop = int(.002 * SR)
        env = np.array([np.sqrt(np.mean(y[i:i + hop] ** 2))
                        for i in range(0, len(y) - hop, hop)])
        if role["mode"] == "peak":
            center = int(np.argmax(env)) * hop
            start = max(0, center - int(role["pre"] * SR))
            peak = center - start
        else:
            a0 = int(role.get("start", 0) * SR)
            e = (env[a0 // hop:a0 // hop + int(1.5 * SR) // hop]
                 if a0 else env[:int(2 * SR) // hop])
            onset = a0 + int(np.argmax(e > .35 * e.max())) * hop
            start = max(0, onset - int(role["pre"] * SR))
            peak = onset - start
        length = 1.6 if cue["t"] == 72.181 else role["len"]
        seg = y[start:start + int(length * SR)].copy()
        n = min(len(seg), int(min(role["fade"], length * .3)
                              * SR)) if length != role["len"] else min(len(seg), int(role["fade"] * SR))
        seg[-n:] *= np.linspace(1, 0, n) ** 2
        seg[:int(.002 * SR)] *= np.linspace(0, 1, int(.002 * SR))
        seg = seg / (np.abs(seg).max() + 1e-9) * 10 ** (cue["dB"] / 20)
        index = round((cue["t"] - peak / SR) * SR)
        stop = min(len(self.gain), index + len(seg))
        seg = seg[:stop - index] * self.gain[index:stop]
        return index, seg


def stock_assets():
    """Each new role has one rendered stock excerpt; no synthetic oscillator/noise."""
    folder = OUT / "sfx"
    folder.mkdir(exist_ok=True)
    assets = {}

    path = STOCK / "Notif.mp3"
    source = decode(path)
    peak = int(np.argmax(np.abs(source)))
    tick = fade(source[peak - round(.003 * SR):peak + round(.013 * SR)], .002, .008)
    assets["claude-balas"] = dict(source=path, samples=tick,
        edit="satu tik 16 ms di puncak water-drop (pre 3 ms, ekor 13 ms); fade 2/8 ms",
        dengar="an error buzz (z +3.3), a chat message pop (z +2.5); tik UI 16 ms, dari stok water drop",
        why="Tik UI tipis untuk awal satu balasan Claude; bukan bunyi per kata.")

    path = STOCK.parent / "Kenyset/simple-whoosh-382724.mp3"
    source = decode(path)
    peak = int(np.argmax(np.abs(source)))
    send = fade(source[peak - round(.025 * SR):peak + round(.035 * SR)], .018, .030)
    assets["kirim"] = dict(source=path, samples=send,
        edit="swoosh 60 ms di puncak stok (pre 25 ms, ekor 35 ms); fade 18/30 ms",
        dengar="a fast whoosh (z +2.9), a snare hit (z +2.9); swoosh stok pendek 60 ms",
        why="Swoosh kirim singkat; scaningfast ditolak karena energi >6 kHz mendominasi.")

    path = STOCK.parent / "Kenyset/ui-interface-sound-26-299883.mp3"
    source = decode(path)
    peak = int(np.argmax(np.abs(source)))
    pre, tail = round(.398 * SR), round(.462 * SR)
    wave = np.concatenate((source[peak:peak + pre + 1][::-1][:-1], source[peak:peak + tail]))
    wave = fade(wave, .045, .045)
    assets["gelombang"] = dict(source=path, samples=wave,
        edit="lead 398 ms dibalik menuju puncak stok, lalu ekor asli 462 ms; fade 45 ms",
        dengar="a digital glitch (z +3.1), a record scratch (z +2.6); digital grain swell, source shimmer sweep match z +3.4",
        why="Satu swell digital berbutir untuk seluruh cincin grid. Pencarian SFXIrfan tidak memberi sweep digital lembut yang cocok; Kenyset dipilih dari rank 143 stok (z +3.4), tanpa whoosh udara.")
    for role, entry in assets.items():
        x = entry.pop("samples")
        x = x / np.max(np.abs(x))
        path = folder / f"{role}.wav"
        sf.write(path, x, SR, subtype="FLOAT")
        entry.update(file=str(path.relative_to(AUDIO)), source=str(entry["source"]),
                     source_sha256=sha(entry["source"]), duration_s=len(x) / SR,
                     peak_offset_samples=int(np.argmax(np.abs(x))))
    save_json(OUT / "sfx_sources.json", assets)
    return assets


def bind(cue, frame, obj, status, before=None):
    cue.update(frame=frame, frame_objek=frame, objek=obj,
               terikat_ke_visual=[f"R6_f{frame}_{obj}"], status_r6=status,
               visual_file="qc/r6/visual_r6.mp4", fps="30000/1001")
    if before is not None:
        cue["t_r4"] = before
    return cue


def add(stem, start, segment, sign=1):
    a, b = max(0, start), min(len(stem), start + len(segment))
    if b > a:
        stem[a:b] += sign * segment[a - start:b - start, None]


def level_new_d(result, events, voice, music, span=(57, 72.075)):
    """Attenuate supplied SFX within the span; preserve voice, music and fixed cues."""
    from scipy.signal import butter, sosfilt
    lo, hi = (round(t * SR) for t in span)
    base = result[lo:hi].copy()
    for start, seg, cue in events:
        add(base, start - lo, seg, -1)
    gains = np.ones(len(events))
    bp = butter(4, [300, 4000], "band", fs=SR, output="sos")
    vf = sosfilt(bp, voice)[lo:hi]
    mf = sosfilt(bp, music.mean(1))[lo:hi]
    fixed_bed = mf + sosfilt(bp, base.mean(1))
    db = lambda x: 10 * np.log10(np.mean(x ** 2) + 1e-14)
    ref = db(voice)
    limit = 10 ** (-1 / 20) - 1e-7
    for _ in range(60):
        cur = base.copy()
        for gain, (start, seg, cue) in zip(gains, events):
            add(cur, start - lo, seg * gain)
        bed = mf + sosfilt(bp, cur.mean(1))
        reduce = set()
        for i in range(0, len(cur) - SR // 2, SR // 2):
            j = i + SR // 2
            active = [k for k, (start, seg, _) in enumerate(events)
                      if start < lo + j and start + len(seg) > lo + i]
            target = min(8.0, db(vf[i:j]) - db(fixed_bed[i:j]) - .05)
            if active and db(voice[lo + i:lo + j]) > ref - 12 and db(vf[i:j]) - db(bed[i:j]) < target:
                reduce.update(active)
        if not reduce:
            break
        gains[list(reduce)] *= 10 ** (-.25 / 20)
    else:
        save_json(OUT / "level_failure.json", dict(gains=gains.tolist(),
                  remaining=[dict(t=events[k][2]["t"], role=events[k][2]["peran"])
                             for k in sorted(reduce)]))
        raise RuntimeError("New D SFX could not meet peak/clarity with fixed voice and music")
    # Only milliseconds around a coincident voice peak need extra SFX attenuation.
    # Lowering the entire PASS confirmation would make its opening tick inaudible.
    from scipy.ndimage import minimum_filter1d, uniform_filter1d
    fixed = voice[lo:hi, None].astype(np.float64) + music[lo:hi] + base
    moving = cur - base
    peak_gain = np.ones(len(cur))
    for _ in range(8):
        mix = fixed + moving * peak_gain[:, None]
        if np.max(np.abs(mix)) <= limit:
            break
        upper = np.ones(len(cur))
        for ch in range(2):
            s, b = moving[:, ch], fixed[:, ch]
            bound = np.divide(np.where(s >= 0, limit - b, -limit - b), s,
                              out=np.ones_like(s), where=np.abs(s) > 1e-15)
            upper = np.minimum(upper, np.clip(bound, 0, 1))
        upper = minimum_filter1d(upper, 193, mode="nearest")
        upper = uniform_filter1d(upper, 25, mode="nearest")
        peak_gain = np.minimum(peak_gain, upper * .999999)
    else:
        raise RuntimeError("New D peak catcher could not meet -1 dBFS")
    cur = base + moving * peak_gain[:, None]
    result[lo:hi] = cur
    rows = []
    for gain, (start, seg, cue) in zip(gains, events):
        attenuation = float(20 * np.log10(gain))
        envelope = peak_gain[start - lo:start - lo + len(seg)]
        rendered = seg * gain * envelope
        actual_peak = (start + int(np.argmax(np.abs(rendered)))) / SR
        assert abs(actual_peak - cue["frame"] / FPS) <= 1 / FPS
        cue.update(gain_otomasi_db=round(attenuation, 3),
                   gain_efektif_db=round(cue["dB"] + attenuation, 3),
                   otomasi_puncak_min_db=float(20 * np.log10(np.min(envelope))),
                   puncak_sfx_s=actual_peak,
                   puncak_dbfs=float(20 * np.log10(np.max(np.abs(rendered)))))
        assert -10.02 <= cue["puncak_dbfs"] <= -3.99, cue
        rows.append(dict(t=cue["t"], peran=cue["peran"],
                         gain_nominal_db=cue["dB"], gain_otomasi_db=round(attenuation, 3),
                         gain_efektif_db=cue["gain_efektif_db"],
                         peak_envelope_min_db=cue["otomasi_puncak_min_db"]))
    return rows


def build():
    OUT.mkdir(exist_ok=True)
    locked = [AUDIO / n for n in ("stem_suara.wav", "stem_musik_A.wav", "stem_sfx_A.wav",
              "stem_sfx.wav", "cues.json", "sfx_build.py", "music_build.py", "mix_report.json")]
    locked.append(VIDEO)
    before = {str(p.relative_to(PROJECT)): sha(p) for p in locked}
    v, sr = sf.read(AUDIO / "stem_suara.wav", dtype="float32")
    music, msr = sf.read(AUDIO / "stem_musik_A.wav", dtype="float32")
    base, ssr = sf.read(AUDIO / "stem_sfx_A.wav", dtype="float32")
    assert sr == msr == ssr == SR and music.shape == base.shape == (len(v), 2)
    original = json.loads((AUDIO / "cues.json").read_text())
    r4 = R4(base)
    assets = stock_assets()
    result = base.astype(np.float64)
    cues, removed, movements = [], [], []

    # The entire old D soundtrack is replaced; retain E's lead-in from R4.
    result[round(57.6 * SR):] = 0
    bubble = {8.306: (249, "tokoh ChatGPT masuk"),
              8.575: (257, "bubble Hi! Aku nemenin Claude."),
              9.495: (283, "bubble Aku yang ngedit loh."),
              9.81: (294, "bubble Gemini …")}
    moved = {72.608: (2177, "T081 100% masuk"),
             79.553: (2386, "komentar masih kerasa AI slop pop"),
             80.118: (2402, "komentar Keren editan profesional pop")}
    kept = {11.996: (361, "DECISION"), 72.075: (2160, "potong D ke meja Blender"),
            72.181: (2163, "Claude mengetik di keyboard"),
            76.41: (2290, "masuk rangkaian IG"),
            82.407: (2470, "kata skill masuk"), 83.55: (2504, "ekor penutup")}
    delete = {75.645: "Tidak ada objek baru: meja/tokoh/timeline sudah ada; narasi biasa.",
              78.659: "profesional tampil sebagai narasi biasa di dalam video IG, tanpa huruf kacau.",
              80.825: "Tulisan tangan dan panah IG telah dihapus (D-414)."}

    for old in original:
        c = copy.deepcopy(old)
        t = c["t"]
        if 57.6 <= t < 72.075 or t in delete:
            c["alasan_hapus_r6"] = delete.get(t, "Papan relay lama diganti workflow satu sesi Claude (D-441/D-442).")
            removed.append(c)
            continue
        if t in bubble or t in moved:
            frame, obj = (bubble | moved)[t]
            start, seg = r4.excerpt(old)
            if t in bubble:
                add(result, start, seg, -1)
            newstart = round(frame / FPS * SR) - int(np.argmax(np.abs(seg)))
            # The early pop must not alter even one sample before 8.300 s.
            if t in bubble and newstart < round(8.3 * SR):
                trim = round(8.3 * SR) - newstart
                seg = fade(seg[trim:], .002, 0)
                newstart += trim
            add(result, newstart, seg)
            c["t"] = frame / FPS
            bind(c, frame, obj, "geser", t)
            c.update(start_s=newstart / SR, offset_puncak_s=int(np.argmax(np.abs(seg))) / SR,
                     puncak_sfx_s=(newstart + int(np.argmax(np.abs(seg)))) / SR,
                     pemrosesan="Cuplikan R4 beserta gain lokal R4 dipindahkan; file/peran tetap.")
            movements.append(dict(t_r4=t, t=c["t"], frame=frame, objek=obj, peran=c["peran"], file=c["file"]))
        elif t >= 57.6:
            start, seg = r4.excerpt(old)
            add(result, start, seg)
            frame, obj = kept[t]
            bind(c, frame, obj, "tetap", t)
            c.update(start_s=start / SR, puncak_sfx_s=(start + int(np.argmax(np.abs(seg)))) / SR)
        elif t in kept:
            frame, obj = kept[t]
            bind(c, frame, obj, "tetap", t)
            start, seg = r4.excerpt(old)
            c.update(start_s=start / SR, puncak_sfx_s=(start + int(np.argmax(np.abs(seg)))) / SR)
        cues.append(c)

    d_events = [
        (1740, "gelombang", "grid biru menutup wajah dan membuka jendela Claude", -10),
        (1789, "pesan", "Update dari ChatGPT · session A", -9),
        (1848, "claude-balas", "Saya sudah memerintahkan…", -10),
        (1882, "kirim", "Messaged ChatGPT · session A", -10),
        (1902, "terverifikasi", "terkirim ✓ session A", -10),
        (1907, "claude-balas", "Saya minta ChatGPT session B…", -10),
        (1941, "kirim", "Messaged ChatGPT · session B", -10),
        (1976, "pesan", "Update dari ChatGPT · session B", -9),
        (2061, "claude-balas", "Edit guide/teks/GUIDE.md", -10),
        (2110, "terverifikasi", "Ran cut_check.py PASS ✓ + Clawd lega", -10),
    ]
    new_d = []
    for frame, role, obj, db in d_events:
        c = dict(t=frame / FPS, peran=role, dB=db, mode="peak",
                 alasan=f"Satu bunyi untuk kemunculan {obj}; visual R6 diperiksa per frame.")
        if role in assets:
            a = assets[role]
            c.update(file=a["file"], dengar=a["dengar"], sumber=a["source"])
            seg, _ = sf.read(AUDIO / a["file"], dtype="float32")
            seg = seg * 10 ** (db / 20)
        else:
            reference = next(x for x in original if x["peran"] == role)
            # Same R4 file, trim and fade; take the normalized excerpt before R4 automation.
            temp = R4.__new__(R4)
            temp.gain, temp.roles, temp.files = np.ones(len(v), np.float32), r4.roles, r4.files
            reference = dict(reference, t=frame / FPS, dB=db)
            _, seg = temp.excerpt(reference)
            c.update(file=reference["file"], dengar=reference["dengar"])
            length, release = {"pesan": (.065, .035), "terverifikasi": (.020, .011)}[role]
            seg = fade(seg[:round(length * SR)], .002, release)
            seg = seg / np.max(np.abs(seg)) * 10 ** (db / 20)
            c.update(trim_r6_duration_s=length,
                     pemrosesan="File peran R4 yang sama; ekor dipendekkan untuk UI D yang rapat.")
        start = round(c["t"] * SR) - int(np.argmax(np.abs(seg)))
        add(result, start, seg)
        bind(c, frame, obj, "tambah")
        c.update(start_s=start / SR, offset_puncak_s=int(np.argmax(np.abs(seg))) / SR,
                 puncak_sfx_s=(start + int(np.argmax(np.abs(seg)))) / SR)
        cues.append(c)
        new_d.append((start, seg, c))

    automation = level_new_d(result, new_d, v, music)
    for cue in cues:
        if "puncak_sfx_s" in cue:
            cue["frame_puncak_sfx"] = round(cue["puncak_sfx_s"] * FPS)
    cues.sort(key=lambda c: c["t"])
    mask = np.zeros(len(v), bool)
    for lo, hi in RANGES:
        mask[round(lo * SR):min(len(v), round(hi * SR))] = True
    final = base.copy()
    final[mask] = result[mask].astype(np.float32)
    assert np.array_equal(final[~mask], base[~mask])
    mix = v[:, None] + final + music
    sf.write(OUT / "stem_sfx_r6.wav", final, SR, subtype="FLOAT")
    sf.write(OUT / "mix_r6.wav", mix, SR, subtype="FLOAT")
    save_json(OUT / "cues_r6.json", cues)
    save_json(OUT / "cue_changes.json", dict(dihapus=removed, digeser=movements,
                                             ditambah=[c for c in cues if c.get("status_r6") == "tambah"]))
    objects = [dict(t=c["t"], objek=c.get("objek", c["alasan"]), peran=c["peran"],
                    frame=c.get("frame", round(c["t"] * FPS)),
                    sumber="inspeksi visual R6" if "frame" in c else "cue R4 di rentang tak berubah")
               for c in cues]
    objects.extend([
        dict(t=9.5428666667, frame=286, objek="tokoh Gemini", senyap=True,
             alasan="Bunyi perkenalan R4 dipertahankan di bubble Gemini, f294; tidak menambah cue tokoh."),
        dict(t=70.5338666667, frame=2114, objek="Pelajaran tersimpan…", senyap=True,
             alasan="Terlalu dekat PASS; senyap sesuai TASK."),
        dict(t=78.6786, frame=2358, objek="profesional", senyap=True,
             alasan="Narasi biasa, bukan kata hero atau huruf kacau."),
        dict(t=75.645, frame=2267, objek="narasi videonya kayak…", senyap=True,
             alasan="Tidak ada objek baru yang mendarat."),
        dict(t=80.825, frame=2422, objek="narasi Comment + kolom komentar", senyap=True,
             alasan="Tanpa tulisan tangan dan panah; ketikan narasi tidak diberi bunyi per kata."),
    ])
    save_json(OUT / "objects_r6.json", sorted(objects, key=lambda x: x["t"]))

    recovered = mix.astype(np.float64) - final - music
    vv = np.repeat(v[:, None], 2, axis=1)
    error = recovered - vv
    quiet = np.max(np.abs(final), axis=1) == 0
    import pyloudnorm as pyln
    loudness = pyln.Meter(SR).integrated_loudness(mix)
    reference_lufs = json.loads((AUDIO / "mix_report.json").read_text())["A"]["mix_lufs"]
    report = dict(sample_rate=SR, channels=2, samples=len(v), duration_s=len(v) / SR,
                  target_duration_s=2512 / FPS, peak_dbfs=float(20 * np.log10(np.max(np.abs(mix)))),
                  mix_lufs=float(loudness), r4_lufs=reference_lufs, delta_lu=float(loudness - reference_lufs),
                  voice_gain=1.0, master_limiter=False, master_compressor=False,
                  voice_max_abs_diff=float(np.max(np.abs(error))),
                  voice_no_sfx_max_abs_diff=float(np.max(np.abs(error[quiet]))),
                  voice_no_sfx_correlation=float(np.corrcoef(recovered[quiet, 0], v[quiet])[0, 1]),
                  voice_no_sfx_fit_gain=float(np.dot(recovered[quiet, 0], v[quiet].astype(np.float64))
                                              / np.dot(v[quiet].astype(np.float64), v[quiet].astype(np.float64))),
                  sfx_outside_ranges_changed_samples=int(np.count_nonzero(final[~mask] != base[~mask])),
                  sfx_outside_ranges_max_abs_diff=float(np.max(np.abs(final[~mask] - base[~mask]))),
                  allowed_ranges_s=RANGES, cues=len(cues), removed=len(removed), shifted=len(movements),
                  added=len(d_events), new_d_gain_automation=automation, input_sha256=before)
    report["inputs_unchanged"] = all(sha(PROJECT / f) == h for f, h in before.items())
    report["sample_checks_pass"] = bool(abs(report["duration_s"] - report["target_duration_s"]) <= .001
        and report["peak_dbfs"] <= -1 and abs(report["delta_lu"]) <= 1
        and report["voice_max_abs_diff"] < 2e-7
        and report["sfx_outside_ranges_changed_samples"] == 0 and report["inputs_unchanged"])
    save_json(OUT / "mix_report_r6.json", report)
    print(json.dumps({k: v for k, v in report.items() if k != "input_sha256"}, indent=2))
    return cues


def revise_r2(cues):
    """Apply D-449/D-451 after reproducing R1, preserving every other cue/sample."""
    original = json.loads((AUDIO / "cues.json").read_text())
    voice, _ = sf.read(AUDIO / "stem_suara.wav", dtype="float32")
    music, _ = sf.read(AUDIO / "stem_musik_A.wav", dtype="float32")
    r4_stem, _ = sf.read(AUDIO / "stem_sfx_A.wav", dtype="float32")
    before, _ = sf.read(OUT / "stem_sfx_r6.wav", dtype="float32")
    result = before.astype(np.float64)
    r4 = R4(r4_stem)
    clean = R4.__new__(R4)
    clean.gain, clean.roles, clean.files = np.ones(len(voice), np.float32), r4.roles, r4.files
    spans = [(57.6, 59.3), (78.5, 79.4)]
    old_wave = next(c for c in cues if c["peran"] == "gelombang")
    assert [c for c in cues if 57.6 <= c["t"] < 59.3] == [old_wave]
    assert not any(78.5 <= c["t"] < 79.4 for c in cues)
    cues = [c for c in cues if c is not old_wave]
    # R1 has only the obsolete wave in this interval; do not subtract rounded PCM.
    result[round(57.6 * SR):round(59.3 * SR)] = 0
    changed = []

    def place(cue, frame, obj, segment, status, start=None):
        cue = copy.deepcopy(cue)
        cue["t"] = frame / FPS if start is None else cue["t"]
        peak = int(np.argmax(np.abs(segment)))
        if start is None:
            start = round(cue["t"] * SR) - peak
        bind(cue, frame, obj, status + "-r2")
        cue.update(status_r2=status, ledger="D-451" if frame == 2358 else "D-449",
                   start_s=start / SR, offset_puncak_s=peak / SR,
                   puncak_sfx_s=(start + peak) / SR,
                   puncak_dbfs=float(20 * np.log10(np.max(np.abs(segment)))))
        add(result, start, segment)
        changed.append(cue)
        return start, segment, cue

    transition = next(c for c in original if c["t"] == 57.919)
    start, segment = r4.excerpt(transition)
    place(transition, 1736, "push wajah menuju jendela Claude", segment, "pulih", start)

    reference = next(c for c in original if c["peran"] == "klik")
    click = dict(reference, t=1748 / FPS, dB=-8,
                 alasan="Kursor menekan tombol kirim dan prompt berpindah ke percakapan (D-449).",
                 trim_r2_duration_s=.060,
                 pemrosesan="Enter.mp3 yang sama dengan seluruh peran klik R4; satu transien 60 ms.")
    _, segment = clean.excerpt(click)
    segment = fade(segment[:round(.060 * SR)], .002, .030)
    segment = segment / np.max(np.abs(segment)) * 10 ** (click["dB"] / 20)
    click_event = place(click, 1748, "klik tombol kirim; prompt masuk percakapan", segment, "tambah")

    sources = json.loads((OUT / "sfx_sources.json").read_text())
    entry = sources["gelombang"]
    source = decode(entry["source"])
    peak = int(np.argmax(np.abs(source)))
    wave_start, wave_peak, wave_end = (round(t * SR) for t in (1748 / FPS, 1753 / FPS, 59.19))
    lead, tail = wave_peak - wave_start, wave_end - wave_peak
    assert peak + max(lead + 1, tail) <= len(source)
    segment = np.concatenate((source[peak:peak + lead + 1][::-1][:-1], source[peak:peak + tail]))
    segment = fade(segment, .045, .045)
    segment = segment / np.max(np.abs(segment))
    sf.write(AUDIO / entry["file"], segment, SR, subtype="FLOAT")
    entry.update(duration_s=len(segment) / SR, peak_offset_samples=lead,
                 edit="Lead stok dibalik 166,833 ms; ekor asli sampai 59,190 s; fade 45 ms, tanpa time-stretch.",
                 why="Satu swell untuk seluruh grid bara gelap yang dipicu tombol kirim (D-449).")
    wave = dict(old_wave, t=1753 / FPS, t_r1=old_wave["t"],
                alasan="Satu bunyi untuk seluruh gelombang grid bara gelap dari tombol kirim (D-449).")
    wave_event = place(wave, 1753, "gelombang grid bara gelap dari tombol kirim", segment * 10 ** (wave["dB"] / 20), "geser")
    assert wave_event[0] == wave_start
    automation_d = level_new_d(result, [click_event, wave_event], voice, music, spans[0])

    hero = dict(next(c for c in original if c["peran"] == "kata-hero"), t=2358 / FPS,
                alasan="PROFESIONAL raksasa hitam potong masuk di belakang badan pada latar hijau (D-451).",
                waktu_brief_s=78.659)
    _, segment = clean.excerpt(hero)
    hero_event = place(hero, 2358, "PROFESIONAL raksasa di belakang badan; latar hijau", segment, "tambah")
    automation_hero = level_new_d(result, [hero_event], voice, music, spans[1])
    for cue in changed:
        cue["frame_puncak_sfx"] = round(cue["puncak_sfx_s"] * FPS)
    cues = sorted(cues + changed, key=lambda c: c["t"])
    mask = np.zeros(len(voice), bool)
    for lo, hi in spans:
        mask[round(lo * SR):round(hi * SR)] = True
    final = result.astype(np.float32)
    baseline, _ = sf.read(OUT / "before_r2/stem_sfx_r6.wav", dtype="float32")
    assert np.array_equal(final[~mask], before[~mask])
    assert np.array_equal(final[~mask], baseline[~mask])
    mix = voice[:, None] + final + music
    sf.write(OUT / "stem_sfx_r6.wav", final, SR, subtype="FLOAT")
    sf.write(OUT / "mix_r6.wav", mix, SR, subtype="FLOAT")
    save_json(OUT / "cues_r6.json", cues)
    save_json(OUT / "sfx_sources.json", sources)
    changes = json.loads((OUT / "cue_changes.json").read_text())
    changes["ronde1"] = copy.deepcopy(changes)
    changes["dihapus"] = [c for c in changes["dihapus"] if c["t"] != 57.919]
    changes["ditambah"] = [c for c in cues if c["peran"] in ("gelombang", "klik", "kata-hero")
                           and "status_r2" in c] + [c for c in changes["ditambah"] if c["peran"] != "gelombang"]
    changes["ronde2"] = dict(diganti=[old_wave], cue=changed, ledger=["D-449", "D-451"])
    save_json(OUT / "cue_changes.json", changes)
    objects = [o for o in json.loads((OUT / "objects_r6.json").read_text())
               if o.get("peran") != "gelombang" and o.get("objek") != "profesional"]
    objects.extend(dict(t=c["t"], frame=c["frame"], objek=c["objek"], peran=c["peran"],
                        sumber="visual R6 baru; " + c["ledger"]) for c in changed)
    save_json(OUT / "objects_r6.json", sorted(objects, key=lambda o: o["t"]))

    import pyloudnorm as pyln
    report = json.loads((OUT / "mix_report_r6.json").read_text())
    recovered = mix.astype(np.float64) - final - music
    error = recovered - voice[:, None]
    quiet = np.max(np.abs(final), axis=1) == 0
    loudness = float(pyln.Meter(SR).integrated_loudness(mix))
    report["round1_cue_counts"] = {k: report[k] for k in ("cues", "removed", "shifted", "added")}
    report.update(round=2, cues=len(cues), mix_lufs=loudness, delta_lu=loudness - report["r4_lufs"],
                  removed=len(changes["dihapus"]), added=len(changes["ditambah"]),
                  peak_dbfs=float(20 * np.log10(np.max(np.abs(mix)))),
                  voice_max_abs_diff=float(np.max(np.abs(error))),
                  voice_no_sfx_max_abs_diff=float(np.max(np.abs(error[quiet]))),
                  voice_no_sfx_correlation=float(np.corrcoef(recovered[quiet, 0], voice[quiet])[0, 1]),
                  voice_no_sfx_fit_gain=float(np.dot(recovered[quiet, 0], voice[quiet].astype(np.float64))
                      / np.dot(voice[quiet].astype(np.float64), voice[quiet].astype(np.float64))))
    report["new_d_gain_automation"] = sorted(
        [row for row in report["new_d_gain_automation"] if row["peran"] != "gelombang"] + automation_d,
        key=lambda row: row["t"])
    r2 = dict(allowed_ranges_s=spans, tails_outside_ranges=[],
              sfx_outside_ranges_changed_samples=int(np.count_nonzero(final[~mask] != baseline[~mask])),
              preserved_cues=len(cues) - len(changed), changed_cues=changed,
              new_d_gain_automation=automation_d, hero_gain_automation=automation_hero,
              reference_sfx_sha256=sha(OUT / "before_r2/stem_sfx_r6.wav"))
    report["ronde2"] = r2
    report["inputs_unchanged"] = all(sha(PROJECT / f) == h for f, h in report["input_sha256"].items())
    report["sample_checks_pass"] = bool(report["peak_dbfs"] <= -1 and abs(report["delta_lu"]) <= 1
        and report["voice_max_abs_diff"] < 2e-7 and report["inputs_unchanged"]
        and r2["sfx_outside_ranges_changed_samples"] == 0)
    save_json(OUT / "mix_report_r6.json", report)
    print(json.dumps({k: report[k] for k in ("round", "cues", "peak_dbfs", "mix_lufs", "delta_lu", "sample_checks_pass")}, indent=2))
    return cues


def sheet_r2(cues):
    from PIL import Image, ImageDraw, ImageFont
    rows = sorted((c for c in cues if "status_r2" in c), key=lambda c: c["t"])
    frames = [c["frame_puncak_sfx"] for c in rows]
    expression = "+".join(f"eq(n,{f})" for f in frames)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-threads", "2", "-i", str(VIDEO),
        "-vf", f"select='{expression}',scale=960:540", "-fps_mode", "vfr",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-threads", "2", "-"], check=True, capture_output=True).stdout
    size = 960 * 540 * 3
    assert len(raw) == len(rows) * size
    canvas = Image.new("RGB", (1920, 1240), (20, 20, 20))
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    for k, c in enumerate(rows):
        x, y = k % 2 * 960, k // 2 * 620
        canvas.paste(Image.frombytes("RGB", (960, 540), raw[k * size:(k + 1) * size]), (x, y))
        draw.text((x + 12, y + 549), f"{c['peran']} | peak {c['puncak_sfx_s']:.6f}s | f{c['frame_puncak_sfx']}", font=font, fill="white")
        detail = c["objek"]
        if c["frame"] == 1736:
            detail = "cue 57.919s; " + detail
        elif c["frame"] == 1753:
            detail = f"onset {c['start_s']:.6f}s; grid bara dari tombol kirim"
        elif c["frame"] == 2358:
            detail = "brief 78.659s; f2358 = 78.678600s"
        draw.text((x + 12, y + 583), detail, font=font, fill="#c8c8c8")
    canvas.save(OUT / "cek_cue_r2.jpg", quality=94)


def sheet(cues):
    from PIL import Image, ImageDraw, ImageFont
    rows = [c for c in cues if "status_r6" in c]
    frames = sorted(set(c.get("frame_puncak_sfx", c["frame"]) for c in rows))
    expression = "+".join(f"eq(n,{f})" for f in frames)
    r = subprocess.run(["ffmpeg", "-v", "error", "-threads", "2", "-i", str(VIDEO),
        "-vf", f"select='{expression}',scale=640:360", "-fps_mode", "vfr",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-threads", "2", "-"], check=True, capture_output=True)
    size = 640 * 360 * 3
    assert len(r.stdout) == len(frames) * size
    images = {f: Image.frombytes("RGB", (640, 360), r.stdout[k * size:(k + 1) * size])
              for k, f in enumerate(frames)}
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 19)
    canvas = Image.new("RGB", (1920, math.ceil(len(rows) / 3) * 416), (20, 20, 20))
    draw = ImageDraw.Draw(canvas)
    for k, c in enumerate(rows):
        x, y = k % 3 * 640, k // 3 * 416
        peak_frame = c.get("frame_puncak_sfx", c["frame"])
        peak_time = c.get("puncak_sfx_s", c["t"])
        canvas.paste(images[peak_frame], (x, y))
        draw.text((x + 10, y + 363), f"{peak_time:.6f}s   f{peak_frame}   {c['peran']}", font=font, fill="white")
        draw.text((x + 10, y + 388), f"obj f{c['frame']}: " + c["objek"][:43], font=font, fill="#8ecbff")
    canvas.save(OUT / "cek_cue.jpg", quality=92)
    for k in range(math.ceil(len(rows) / 6)):
        canvas.crop((0, k * 832, 1920, min(canvas.height, (k + 1) * 832))).save(
            OUT / f"cek_cue_{k + 1:02d}.jpg", quality=92)


def mux():
    command = ["ffmpeg", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(OUT / "mix_r6.wav"),
               "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "320k",
               "-ar", str(SR), "-movflags", "+faststart", str(OUT / "cek_r6.mp4")]
    subprocess.run(command, check=True)
    save_json(OUT / "mux_command.json", command)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--sheet", action="store_true")
    ap.add_argument("--mux", action="store_true")
    args = ap.parse_args()
    cues = revise_r2(build())
    if args.sheet:
        sheet(cues)
        sheet_r2(cues)
    if args.mux:
        mux()
