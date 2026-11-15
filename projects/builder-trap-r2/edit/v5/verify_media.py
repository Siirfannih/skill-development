"""Verify the rendered v5 media contract and measure all nine audio joins."""
from pathlib import Path
import json
import math
import subprocess

import numpy as np
import soundfile as sf


P = Path(__file__).resolve().parents[2]
EXPECTED_FRAMES = 2739
EXPECTED_SAMPLES = 4_382_400
EXPECTED_RATE = 48_000


def load(name: str):
    return json.loads((P / name).read_text())


def media_info(name: str):
    info = sf.info(P / name)
    return {
        "samples": info.frames,
        "sample_rate": info.samplerate,
        "channels": info.channels,
        "duration": info.duration,
    }


def video_frames(name: str) -> int:
    return int(subprocess.check_output([
        "ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
        "-show_entries", "stream=nb_read_frames", "-of", "default=nw=1:nk=1",
        str(P / name),
    ], text=True).strip())


def dbfs(value: float) -> float:
    return round(20 * math.log10(max(value, 1e-12)), 2)


def join_metrics(name: str, join_frames: list[int]):
    audio, rate = sf.read(P / name, dtype="float32", always_2d=True)
    assert rate == EXPECTED_RATE
    mono = audio.mean(axis=1)
    result = []
    for frame in join_frames:
        sample = frame * rate // 30
        step = float(abs(mono[sample] - mono[sample - 1]))
        window = mono[sample - rate // 200:sample + rate // 200]  # +/- 5 ms
        result.append({
            "frame": frame,
            "seconds": round(frame / 30, 6),
            "sample": sample,
            "sample_step_dbfs": dbfs(step),
            "window_peak_dbfs": dbfs(float(np.max(np.abs(window)))),
            "window_rms_dbfs": dbfs(float(np.sqrt(np.mean(window * window)))),
        })
    return result


def main():
    joins = [282, 714, 1145, 1353, 1729, 1870, 2190, 2247, 2560]
    audio = {
        name: media_info(name)
        for name in ("edit/v5/suara.wav", "edit/v5/voice_clean.wav", "edit/v5/mix.wav")
    }
    words_actual = load("edit/v5/words_actual.json")
    captions = load("edit/v5/words_final.json")
    transcript = load("edit/v5/transcript-check.json")
    validation = load("edit/v5/validation.json")
    frames = video_frames("edit/v5/face_edit_v5.mp4")
    checks = {
        "audio_exact_length": all(
            item["samples"] == EXPECTED_SAMPLES and item["sample_rate"] == EXPECTED_RATE
            for item in audio.values()
        ),
        "face_exact_frames": frames == EXPECTED_FRAMES,
        "root_exact_frames": load("remotion/src/data/knots_v5.json")["dur_frames"] == EXPECTED_FRAMES,
        "nine_guarded_cuts": len(load("edit/v5/map.json")["removed"]) == 9,
        "all_source_words_retained": len(words_actual) == 228,
        "caption_fillers_only_omitted": len(captions) == 225,
        "cut_validator_pass": validation.get("pass_") is True,
        "transcript_exact": transcript.get("pass_") is True,
    }
    report = {
        "pass": all(checks.values()),
        "checks": checks,
        "expected": {
            "duration_seconds": EXPECTED_FRAMES / 30,
            "frames": EXPECTED_FRAMES,
            "samples": EXPECTED_SAMPLES,
        },
        "audio": audio,
        "face_frames": frames,
        "joins_voice_clean": join_metrics("edit/v5/voice_clean.wav", joins),
        "joins_mix": join_metrics("edit/v5/mix.wav", joins),
    }
    out = P / "edit/v5/media-verification.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"pass": report["pass"], "checks": checks}, ensure_ascii=False))
    if not report["pass"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
