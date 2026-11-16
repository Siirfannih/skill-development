import importlib.util
import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path

import numpy as np
import soundfile as sf


ROOT = Path(__file__).resolve().parents[2]


def load_module(name, relative_path):
    spec = importlib.util.spec_from_file_location(name, ROOT / relative_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


cut_check = load_module("cut_check", "scripts/gate/cut_check.py")
pause_clean = load_module("pause_clean", "scripts/gate/pause_clean.py")
sfx_density = load_module("sfx_density", "scripts/gate/sfx_density.py")


class CutSafetyTests(unittest.TestCase):
    def test_loads_nested_whisper_segment_words(self):
        with tempfile.TemporaryDirectory() as folder:
            transcript = Path(folder) / "words.json"
            transcript.write_text(json.dumps([
                {
                    "start": 0.0,
                    "end": 0.8,
                    "text": " Aku aman.",
                    "words": [
                        {"w": " Aku", "s": 0.0, "e": 0.3},
                        {"w": " aman.", "s": 0.4, "e": 0.8},
                    ],
                }
            ]))

            loaded = cut_check.load_words(transcript)

            self.assertEqual([row["w"] for row in loaded], ["Aku", "aman."])

    def test_pause_gate_loads_nested_whisper_word_boundaries(self):
        with tempfile.TemporaryDirectory() as folder:
            transcript = Path(folder) / "words.json"
            transcript.write_text(json.dumps({
                "segments": [{
                    "start": 0.0,
                    "end": 1.2,
                    "words": [
                        {"word": " Aku", "start": 0.0, "end": 0.3},
                        {"word": " aman.", "start": 0.9, "end": 1.2},
                    ],
                }]
            }))

            loaded = pause_clean.words(transcript)

            self.assertEqual(loaded, [(0.0, 0.3), (0.9, 1.2)])

    def test_rejects_cut_that_reaches_a_content_word(self):
        source = [{"w": "Apa", "s": 1.0, "e": 1.42}]
        validate = getattr(
            cut_check,
            "validate_cuts",
            lambda *_args, **_kwargs: {"pass_": True, "failures": []},
        )

        result = validate(source, [[1.01, 1.41]], source)

        self.assertFalse(result["pass_"])

    def test_accepts_a_guarded_gap_and_preserves_content_sequence(self):
        source = [
            {"w": "Aku", "s": 0.0, "e": 0.30},
            {"w": "bisa.", "s": 0.80, "e": 1.10},
        ]

        result = cut_check.validate_cuts(source, [[0.40, 0.70]], source)

        self.assertTrue(result["pass_"], result["failures"])

    def test_allows_an_explicit_non_tuh_filler_to_be_removed(self):
        source = [
            {"w": "eee", "s": 0.0, "e": 0.20},
            {"w": "Aku", "s": 0.50, "e": 0.90},
        ]
        mapped = [{"w": "Aku", "s": 0.30, "e": 0.70}]

        result = cut_check.validate_cuts(source, [[0.0, 0.20]], mapped)

        self.assertTrue(result["pass_"], result["failures"])


class SfxPolicyTests(unittest.TestCase):
    def test_rejects_forbidden_palette_even_when_metadata_is_complete(self):
        cues = [
            {
                "t": 1.0,
                "peran": "transisi",
                "alasan": "panel berpindah",
                "file": "/sfx/wooden-block-hit.wav",
                "dengar": "dry wooden knock",
            }
        ]
        inspect = getattr(sfx_density, "forbidden_palette_issues", lambda _cues: [])

        issues = inspect(cues)

        self.assertTrue(issues)

    def test_allows_a_clean_ui_click(self):
        cues = [
            {
                "t": 1.0,
                "peran": "klik_ui",
                "alasan": "tombol asli ditekan",
                "file": "/sfx/mouse-click-290204.wav",
                "dengar": "dry clean mouse click",
            }
        ]

        self.assertEqual(sfx_density.forbidden_palette_issues(cues), [])


class AudioOrderTests(unittest.TestCase):
    def test_voice_lock_requires_and_runs_cut_evidence(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            order_dir = root / "audio"
            voice = root / "voice.wav"
            words = root / "words.json"
            cut_map = root / "map.json"
            samples = np.full((24_000, 1), 0.2, dtype=np.float32)
            sf.write(voice, samples, 48_000, subtype="FLOAT")
            words.write_text(json.dumps([{"w": "aman.", "s": 0.0, "e": 0.5}]))
            cut_map.write_text(json.dumps({"removed": []}))
            script = ROOT / "scripts/gate/audio_order.py"
            subprocess.run(
                [str(Path(os.sys.executable)), str(script), "init", "--mode", "konten", "--dir", str(order_dir)],
                check=True,
                capture_output=True,
                text=True,
            )

            locked = subprocess.run(
                [
                    str(Path(os.sys.executable)), str(script), "lock", "suara", str(voice),
                    "--dir", str(order_dir), "--words", str(words),
                    "--source-words", str(words), "--cut-map", str(cut_map),
                ],
                capture_output=True,
                text=True,
            )

            self.assertEqual(locked.returncode, 0, locked.stdout + locked.stderr)


class RecutTests(unittest.TestCase):
    def test_recut_requires_source_guard_and_keeps_audio_video_frame_exact(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            voice = root / "voice.wav"
            video = root / "face.mp4"
            words = root / "source_words.json"
            remove = root / "remove.json"
            output = root / "out"
            samples = np.zeros((48_000, 1), dtype=np.float32)
            samples[:14_400] = 0.2
            samples[33_600:] = 0.2
            sf.write(voice, samples, 48_000, subtype="FLOAT")
            words.write_text(json.dumps([
                {"w": "Aku", "s": 0.0, "e": 0.25},
                {"w": "aman.", "s": 0.75, "e": 1.0},
            ]))
            remove.write_text(json.dumps([[1 / 3, 2 / 3, "guarded silence"]]))
            subprocess.run(
                [
                    "ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i",
                    "color=c=black:s=64x64:r=30:d=1", "-c:v", "libx264",
                    "-pix_fmt", "yuv420p", str(video),
                ],
                check=True,
            )
            script = ROOT / "scripts/audio/recut.py"

            result = subprocess.run(
                [
                    os.sys.executable, str(script), "cut", "--audio", str(voice),
                    "--video", str(video), "--remove", str(remove),
                    "--source-words", str(words), "--out", str(output), "--fps", "30",
                ],
                capture_output=True,
                text=True,
            )

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertEqual(sf.info(output / "suara.wav").frames, 32_000)
            frame_count = subprocess.check_output(
                [
                    "ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
                    "-show_entries", "stream=nb_read_frames", "-of", "default=nw=1:nk=1",
                    str(output / "wajah.mp4"),
                ],
                text=True,
            ).strip()
            self.assertEqual(frame_count, "20")


class RenderGateTests(unittest.TestCase):
    def test_final_render_stops_before_visual_checks_when_audio_order_is_missing(self):
        with tempfile.TemporaryDirectory() as folder:
            project = Path(folder)
            (project / "remotion/src").mkdir(parents=True)
            (project / "remotion/public").mkdir(parents=True)
            (project / "remotion/src/index.ts").write_text("export {};\n")
            render = ROOT / "scripts/juri/render.sh"

            result = subprocess.run(
                ["bash", str(render), str(project), "final", "Main", str(project / "out.mp4")],
                env={**os.environ, "PYTHON": os.sys.executable},
                capture_output=True,
                text=True,
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("gerbang audio", result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
