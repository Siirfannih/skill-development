"""Mux the exact v5 WAV master while preserving AAC priming metadata.

Remotion 4.0.380 writes two priming AAC frames as timeline content on this
project. Encoding the exact WAV as a second input lets FFmpeg emit the negative
priming packet and Skip Samples metadata, while the H.264 stream is copied
bit-for-bit. The resulting audio and video streams are both exactly 91.3 s.
"""
from pathlib import Path
import argparse
import json
import subprocess


P = Path(__file__).resolve().parents[2]
FPS = 30
RATE = 48_000


def run(command: list[str], **kwargs):
    return subprocess.run(command, check=True, **kwargs)


def probe(path: Path, *entries: str):
    command = ["ffprobe", "-v", "error", "-of", "json"]
    for entry in entries:
        command.extend(["-show_entries", entry])
    command.append(str(path))
    return json.loads(subprocess.check_output(command, text=True))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("raw", type=Path, help="MP4 hasil Remotion")
    parser.add_argument("output", type=Path, help="MP4 delivery")
    parser.add_argument("--mix", type=Path, default=P / "edit/v5/mix.wav")
    args = parser.parse_args()

    duration = json.loads((P / "edit/v5/map.json").read_text())["dur_new"]
    expected_frames = round(duration * FPS)
    expected_samples = round(duration * RATE)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    run([
        "ffmpeg", "-hide_banner", "-v", "error", "-y",
        "-i", str(args.raw), "-i", str(args.mix),
        "-map", "0:v:0", "-map", "1:a:0",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "256k",
        "-ar", str(RATE), "-ac", "2", "-map_metadata", "0",
        "-movflags", "+faststart", "-shortest", str(args.output),
    ])

    media = probe(
        args.output,
        "stream=index,codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels,duration,duration_ts,nb_frames",
        "format=duration",
    )
    packet = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-select_streams", "a:0",
        "-show_packets", "-read_intervals", "%+#1",
        "-show_entries", "packet=pts,pts_time,duration,side_data_list",
        "-of", "json", str(args.output),
    ], text=True))["packets"][0]
    video = next(s for s in media["streams"] if s["codec_type"] == "video")
    audio = next(s for s in media["streams"] if s["codec_type"] == "audio")
    checks = {
        "video_frames": int(video["nb_frames"]) == expected_frames,
        "video_duration": abs(float(video["duration"]) - duration) < 1e-6,
        "audio_duration": abs(float(audio["duration"]) - duration) < 1e-6,
        "audio_duration_samples": int(audio["duration_ts"]) == expected_samples,
        "audio_rate": int(audio["sample_rate"]) == RATE,
        "aac_negative_priming_packet": int(packet["pts"]) < 0,
        "aac_skip_samples_present": any(
            int(side.get("skip_samples", 0)) > 0
            for side in packet.get("side_data_list", [])
        ),
    }
    report = {
        "pass": all(checks.values()),
        "checks": checks,
        "expected": {"frames": expected_frames, "duration": duration, "samples": expected_samples},
        "video": video,
        "audio": audio,
        "first_audio_packet": packet,
    }
    report_path = args.output.with_suffix(args.output.suffix + ".verify.json")
    report_path.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({"pass": report["pass"], "checks": checks}))
    if not report["pass"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
