#!/usr/bin/env python3
"""D-460: assemble two local music cues; preserve the R6 voice and SFX.

Rebuild R7 music with --stem-only, then audio/r7_sfx.py --mix-bgm-only --mux.
Source beats and candidate provenance live in audio/r7/. All outputs stay there.
"""
import argparse
import hashlib
import json
import shutil
import subprocess
from pathlib import Path

import numpy as np
import pyloudnorm as pyln
import soundfile as sf
from scipy import signal
from scipy.ndimage import maximum_filter1d, uniform_filter1d

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "audio/r7"
SR = 48000
EQ = ("highpass=f=60,lowpass=f=10500,"
      "equalizer=f=450:t=q:w=0.9:g=-2,"
      "equalizer=f=1600:t=q:w=1.4:g=-1.5,"
      "equalizer=f=3150:t=q:w=1.4:g=-4")
METER = pyln.Meter(SR)
STOPS = [(12.0, "DECISION"), (22.8, "putus-putus"),
         (57.0, "LINTAS AGENT"), (72.6, "100%"), (82.65, "gratis")]
ACT_LEVELS = [(0, 23.6, -24.2), (23.6, 53.9, -24.8),
              (53.9, 72.1, -23.6), (72.1, 83.8170625, -24.7)]


def save(name, value):
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def sha(path):
    with open(path, "rb") as handle:
        return hashlib.file_digest(handle, "sha256").hexdigest()


def db(value):
    return float(20 * np.log10(max(float(value), 1e-12)))


def decode(source, start, duration, rate=1):
    raw = subprocess.check_output([
        "ffmpeg", "-v", "error", "-nostdin", "-threads", "1",
        "-ss", f"{start:.9f}", "-i", str(source),
        "-t", f"{duration:.9f}", "-af", f"{EQ},atempo={rate:.9f}",
        "-ar", str(SR), "-ac", "2", "-f", "f32le", "-",
    ])
    return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)


def arrangement(beats, duration):
    def anchor(ident, after):
        data = beats[ident]
        return next(x for x in data["beats_s"] if x >= after), data["beat_period"]

    a, pa = anchor("relax", 56)
    b, pb = anchor("holiday", 112)
    c, _ = anchor("holiday", 32)
    # Each pair maps measured source beats to a word or a large visual cut.
    return [
        ("holiday", [(0, c), (12, c + 24 * pb), (23.6, c + 47 * pb)]),
        ("holiday", [(23.6, b), (53.9, b + 60 * pb)]),
        ("holiday", [(53.9, c), (57, c + 6 * pb), (72.1, c + 36 * pb)]),
        ("relax", [(72.1, a), (72.6, a + pa),
                   (82.65, a + 19 * pa),
                   (duration, a + 19 * pa + duration - 82.65)]),
    ]


def build_music(rows, beats, voice):
    n = len(voice)
    duration = n / SR
    music = np.zeros((n, 2), np.float64)
    parts = []
    for ident, knots in arrangement(beats, duration):
        row = next(r for r in rows if r["id"] == ident)
        source = Path(row["source"])
        if not source.exists():
            source = OUT / "r2/sources" / source.name
        if sha(source) != row["sha256"]:
            raise RuntimeError(f"music source hash changed: {ident}")
        for (t0, s0), (t1, s1) in zip(knots, knots[1:]):
            rate = (s1 - s0) / (t1 - t0)
            handle = .045
            left, right = max(0, t0 - handle), min(duration, t1 + handle)
            x = decode(source, s0 + (left - t0) * rate, right - left + .08, rate)
            count = round(right * SR) - round(left * SR)
            if len(x) < count:
                raise RuntimeError(f"source too short: {ident} {t0}-{t1}")
            x = x[:count]
            level = METER.integrated_loudness(x)
            x *= 10 ** ((-27.5 - level) / 20)
            ts = left + np.arange(count) / SR
            env = np.ones(count)
            if t0 > 0:
                env *= np.sin(np.clip((ts - (t0 - handle)) / (2 * handle), 0, 1) * np.pi / 2) ** 2
            if t1 < duration:
                env *= np.cos(np.clip((ts - (t1 - handle)) / (2 * handle), 0, 1) * np.pi / 2) ** 2
            i = round(left * SR)
            music[i:i + count] += x * env[:, None]
            parts.append(dict(track=ident, start=t0, end=t1, source_start=s0,
                              source_end=s1, atempo=rate, source_lufs=level,
                              normalized_stereo_lufs=-27.5))

    times = np.arange(n) / SR
    dynamics = np.interp(times, [0, 4.3, 13.8, 23.4, 23.6, 35.9, 36.3,
                              53.7, 53.9, 71.8, 72.6, 76.4, 82.65, duration],
                         [0, 0, 0, 0, -1, -1, .5, .5, .7, .7, 0, 0, 0, -27])
    music *= (10 ** (dynamics / 20))[:, None]

    # A shallow, slow music-only duck; speech samples never pass through a processor.
    mono = voice.mean(1)
    hop = round(.01 * SR)
    grid = np.arange(0, n, hop)
    rms = np.array([np.sqrt(np.mean(mono[i:i + hop] ** 2)) for i in grid])
    active = (rms > 10 ** (-42 / 20)).astype(float)
    smooth = np.convolve(active, np.ones(51) / 51, mode="same")
    duck_db = np.interp(times, grid / SR, -1.5 * smooth)

    # The parody keeps its pulse while its narrower bandwidth follows the neon UI.
    radio = signal.sosfilt(signal.butter(2, [220, 2700], btype="bandpass", fs=SR, output="sos"), music, axis=0)
    wet = np.interp(times, [0, 13.8, 14.0, 22.1, 22.35, duration], [0, 0, .7, .7, 0, 0])
    music = music * (1 - wet[:, None]) + radio * wet[:, None]

    # Fill short valleys with the recording's bass, below the speech band.
    # A slow shelf keeps the bed present without lifting midrange over a word.
    energy = np.r_[0, np.cumsum(np.mean(music ** 2, axis=1))]
    points = np.arange(0, n, round(.01 * SR))
    left = np.maximum(0, points - round(.05 * SR))
    right = np.minimum(n, points + round(.05 * SR))
    level = 10 * np.log10(np.maximum((energy[right] - energy[left]) / (right - left), 1e-20))
    needed = np.clip(-42.4 - level, 0, 6)
    needed[points / SR > 82.65] = 0
    gain_db = uniform_filter1d(maximum_filter1d(needed, size=61, mode="nearest"), size=31, mode="nearest")
    bass = signal.sosfiltfilt(signal.butter(4, 180, fs=SR, output="sos"), music, axis=0)
    shelf = 10 ** (np.interp(times, points / SR, 2 * gain_db) / 20)
    music += bass * (shelf[:, None] - 1)
    energy = np.r_[0, np.cumsum(np.mean(music ** 2, axis=1))]
    level = 10 * np.log10(np.maximum((energy[right] - energy[left]) / (right - left), 1e-20))
    residual = np.clip(-42.4 - level, 0, 6)
    residual[points / SR > 82.65] = 0
    residual = uniform_filter1d(maximum_filter1d(residual, size=61, mode="nearest"), size=31, mode="nearest")
    music *= (10 ** (np.interp(times, points / SR, residual) / 20))[:, None]
    music *= (10 ** (duck_db / 20))[:, None]

    low = signal.sosfilt(signal.butter(2, 480, fs=SR, output="sos"), music, axis=0)
    stop_records = []
    for t, name in STOPS:
        start = t - .7
        amount = np.interp(times, [0, start, start + .15, t - .045, t, duration],
                           [0, 0, 1, 1, 0, 0])
        music = music * (1 - .65 * amount[:, None]) + low * (.65 * amount[:, None])
        music *= (10 ** (-6 * amount / 20))[:, None]
        stop_records.append(dict(name=name, start=start, hit=t, duration=.7,
                                 gain_reduction_db=6, lowpass_hz=480, lowpass_wet=.65))
    # Calibrate the rendered bed, including ducking, filters and stop-downs.
    # Ramps straddle joins so per-act gain changes do not create clicks.
    level_gains = np.zeros(len(ACT_LEVELS))
    level_knots = []
    for _ in range(3):
        for i, (start, end, target) in enumerate(ACT_LEVELS):
            excerpt = music[round(start * SR):round(end * SR)]
            level_gains[i] += target - METER.integrated_loudness(excerpt)
        knot_t, knot_db = [0], [level_gains[0]]
        for i in range(1, len(ACT_LEVELS)):
            join = ACT_LEVELS[i][0]
            knot_t.extend([join - .25, join + .25])
            knot_db.extend([level_gains[i - 1], level_gains[i]])
        knot_t.append(duration)
        knot_db.append(level_gains[-1])
        if level_knots:
            music /= previous_gain[:, None]
        previous_gain = 10 ** (np.interp(times, knot_t, knot_db) / 20)
        music *= previous_gain[:, None]
        level_knots = list(zip(knot_t, knot_db))
    save("arrangement.json", dict(parts=parts, stops=stop_records, eq=EQ,
                                  task="TASK-R7-bgm-r2", ledger="D-473 / audit #13 / D-460",
                                  act_targets_lufs=ACT_LEVELS, act_gain_knots_s_db=level_knots,
                                  voice_duck_max_db=1.5, voice_duck_smoothing_s=.51,
                                  music_valley_bass_shelf_max_db=float(2 * gain_db.max()),
                                  music_valley_residual_gain_max_db=float(residual.max()),
                                  music_valley_smoothing_s=.31))
    return music.astype(np.float32)


def align_music_headroom(music, voice, sfx):
    """Choose a music offset within two frames; no voice, SFX or master gain.

    R6 voice+SFX alone exceeds -1 dBFS. A small source offset can leave the
    unprocessed sum below that ceiling, while its beats stay within two frames.
    """
    base = voice.astype(np.float64) + sfx
    ceiling = 10 ** (-1.003 / 20)
    regions = [0, 13.8, 19.7, 22.3, 23.6, 53.9, 72.1, len(music) / SR]
    half = round(.06 * SR)
    maximum = round(.06 * SR)
    result = np.zeros_like(music)
    records = []
    for start, end in zip(regions, regions[1:]):
        a, b = round(start * SR), round(end * SR)
        possible_music_peak = np.max(np.abs(music[max(0, a - maximum):min(len(music), b + maximum)]))
        indices = np.flatnonzero(np.max(np.abs(base[a:b]), axis=1) > ceiling - possible_music_peak) + a
        chosen = None
        for absolute in range(maximum + 1):
            for offset in ([0] if absolute == 0 else [-absolute, absolute]):
                candidate = music[np.clip(indices + offset, 0, len(music) - 1)]
                if not len(indices) or np.max(np.abs(base[indices] + candidate)) <= ceiling:
                    chosen = offset
                    break
            if chosen is not None:
                break
        if chosen is None:
            raise RuntimeError(f"No music-only headroom solution in {start}-{end}; keep locked stems intact")
        left, right = max(0, a - half), min(len(music), b + half)
        indices = np.arange(left, right)
        weight = np.ones(len(indices))
        if a:
            weight *= np.sin(np.clip((indices - (a - half)) / (2 * half), 0, 1) * np.pi / 2) ** 2
        if b < len(music):
            weight *= np.cos(np.clip((indices - (b - half)) / (2 * half), 0, 1) * np.pi / 2) ** 2
        result[left:right] += music[np.clip(indices + chosen, 0, len(music) - 1)] * weight[:, None]
        records.append(dict(start=start, end=end, music_advance_samples=chosen,
                            music_advance_ms=chosen / SR * 1000, voice_gain=1, sfx_gain=1))
    assert np.max(np.abs(base + result)) <= 10 ** (-1 / 20), "headroom transition failed"
    save("music_headroom_offsets.json", records)
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mux", action="store_true")
    parser.add_argument("--stem-only", action="store_true",
                        help="Rebuild music for the R7 SFX mixer without touching comparison mixes")
    args = parser.parse_args()
    OUT.mkdir(exist_ok=True)
    original_hashes = json.loads((OUT / "inputs_sha256.json").read_text())
    assert all(sha(ROOT / p) == h for p, h in original_hashes.items()), "read-only input changed"
    voice, sr = sf.read(ROOT / "audio/stem_suara.wav", dtype="float32", always_2d=True)
    assert sr == SR and voice.shape[1] == 1
    voice = np.repeat(voice, 2, axis=1)
    if args.stem_only:
        music = build_music(json.loads((OUT / "candidates.json").read_text()),
                            json.loads((OUT / "source_beats.json").read_text()), voice)
        sf.write(OUT / "stem_musik_r7.wav", music, SR, subtype="FLOAT")
        print(json.dumps(dict(stem=str(OUT / "stem_musik_r7.wav"),
                              act_lufs=[METER.integrated_loudness(music[round(a*SR):round(b*SR)].astype(np.float64))
                                        for a, b, _ in ACT_LEVELS], voice_gain=1.0), indent=2))
        return
    sfx, sr = sf.read(ROOT / "audio/r6/stem_sfx_r6.wav", dtype="float32", always_2d=True)
    assert sr == SR and voice.shape == sfx.shape
    music = build_music(json.loads((OUT / "candidates.json").read_text()),
                        json.loads((OUT / "source_beats.json").read_text()), voice)
    sf.write(OUT / "music_before_headroom.wav", music, SR, subtype="FLOAT")
    music = align_music_headroom(music, voice, sfx)
    mix = (voice.astype(np.float64) + sfx + music).astype(np.float32)
    sf.write(OUT / "stem_musik_r7.wav", music, SR, subtype="FLOAT")
    sf.write(OUT / "mix_r7_bgmbaru.wav", mix, SR, subtype="FLOAT")
    shutil.copyfile(ROOT / "audio/r6/mix_r6.wav", OUT / "mix_r7_bgmlama.wav")

    baseline, _ = sf.read(ROOT / "audio/mix_A.wav", always_2d=True)
    target = 10 ** (-1 / 20)
    pk = np.max(np.abs(mix), axis=1)
    windows = []
    for i in range(0, len(music) - 4800, 4800):
        windows.append(dict(t=i / SR, rms_dbfs=db(np.sqrt(np.mean(music[i:i + 4800] ** 2)))))
    recover = mix.astype(np.float64) - music - sfx
    report = dict(sample_rate=SR, channels=2, samples=len(mix), duration_s=len(mix) / SR,
                  peak_dbfs=db(pk.max()), peak_at_s=int(pk.argmax()) / SR,
                  samples_above_minus1=int(np.count_nonzero(np.abs(mix) > target)),
                  mix_lufs=METER.integrated_loudness(mix.astype(np.float64)),
                  r4_lufs=METER.integrated_loudness(baseline),
                  music_lufs=METER.integrated_loudness(music.astype(np.float64)),
                  voice_gain=1.0, sfx_gain=1.0, master_processing=False,
                  voice_recovery_max_abs_error=float(np.max(np.abs(recover - voice))),
                  old_mix_byte_identical=sha(OUT / "mix_r7_bgmlama.wav") == sha(ROOT / "audio/r6/mix_r6.wav"),
                  bed_windows_below_minus45=[w for w in windows if w["rms_dbfs"] < -45],
                  inputs_unchanged=all(sha(ROOT / p) == h for p, h in original_hashes.items()))
    report["delta_r4_lu"] = report["mix_lufs"] - report["r4_lufs"]
    save("mix_report.json", report)
    save("bed_windows.json", windows)
    save("peak_conflicts.json", [dict(t=i / SR, dbfs=db(pk[i])) for i in np.flatnonzero(pk > target)])
    for name, source in [("stem_vo.wav", ROOT / "audio/stem_suara.wav"),
                         ("stem_sfx.wav", ROOT / "audio/r6/stem_sfx_r6.wav"),
                         ("stem_music.wav", OUT / "stem_musik_r7.wav"),
                         ("mix.wav", OUT / "mix_r7_bgmbaru.wav"),
                         ("cues.json", ROOT / "audio/r6/cues_r6.json")]:
        dest = OUT / "phone" / name
        dest.parent.mkdir(exist_ok=True)
        if not dest.exists():
            dest.symlink_to(source)
    if args.mux:
        subprocess.run(["ffmpeg", "-v", "warning", "-nostdin", "-y", "-threads", "2",
                        "-i", str(ROOT / "qc/r6/visual_r6.mp4"),
                        "-i", str(OUT / "mix_r7_bgmbaru.wav"),
                        "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "320k", "-ar", str(SR),
                        "-t", str(len(mix) / SR), "-movflags", "+faststart",
                        str(OUT / "pratinjau_bgmbaru.mp4")], check=True)
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
