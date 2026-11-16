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
voice_level = load_module("voice_level", "scripts/gate/voice_level.py")
recut = load_module("recut", "scripts/audio/recut.py")
audio_bus = load_module("audio_bus", "scripts/juri/audio_bus_check.py")


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
            tt = np.arange(24_000) / 48_000
            samples = (0.25 * np.sin(2 * np.pi * 220 * tt)).astype(np.float32)[:, None]
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
                    "--voice-source", str(voice),
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


class Rules16NovTests(unittest.TestCase):
    """Aturan Irfan 16 Nov: 1 SFX per objek, satu peran satu bunyi, suara asli tidak diturunkan/ditekan."""

    def test_forbidden_regex_respects_word_boundaries_and_allows_laser(self):
        names = ["ES_Business Notification.wav", "Hollywood riser.wav", "Lasertransision.mp3",
                 "ES_Scifi, Computer, Short Beeps, Glitch 02.wav"]
        self.assertEqual(sfx_density.forbidden_palette_issues([dict(t=0, file=n, dengar="") for n in names]), [])
        self.assertTrue(sfx_density.forbidden_palette_issues([dict(t=0, file="wood_knock_1.wav", dengar="")]))

    def test_one_role_one_file(self):
        cues = [dict(t=1.0, peran="kartu_mendarat", file="a/pop.wav"), dict(t=3.0, peran="kartu_mendarat", file="b/pop2.wav"),
                dict(t=5.0, peran="transisi", file="a/pop.wav")]
        issues = sfx_density.role_issues(cues)
        self.assertEqual(len(issues), 2)
        self.assertEqual(sfx_density.role_issues(cues[:1]), [])

    def test_every_object_needs_its_sfx_unless_silent_with_reason(self):
        with tempfile.TemporaryDirectory() as folder:
            objs = Path(folder) / "objects.json"
            objs.write_text(json.dumps([{"t": 1.0, "objek": "kartu"}, {"t": 2.0, "objek": "ikon"},
                                        {"t": 3.0, "objek": "garis", "senyap": True, "alasan": "garis tergambar"}]))
            miss, n = sfx_density.object_issues([dict(t=1.03, peran="kartu", file="pop.wav")], str(objs))
        self.assertEqual(n, 3)
        self.assertEqual(miss, ["2.00s ikon"])

    def test_flam_under_100ms_fails(self):
        self.assertEqual(len(sfx_density.flam_issues([dict(t=1.0), dict(t=1.05), dict(t=1.5)])), 1)

    def _tone(self, folder, name, amp, squash=False):
        sr = 48000
        t = np.arange(int(3 * sr)) / sr
        env = 0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 3 * t)) ** 4
        x = amp * env * np.sin(2 * np.pi * 220 * t) * (1 + 0.6 * (np.random.default_rng(0).random(len(t)) > 0.995))
        if squash:
            x = np.clip(x, -amp * 0.35, amp * 0.35) * 2.5
        path = Path(folder) / name
        sf.write(path, x.astype(np.float32), sr)
        return str(path)

    def test_voice_level_rejects_lowering_and_accepts_clean_gain_up(self):
        with tempfile.TemporaryDirectory() as folder:
            src = self._tone(folder, "src.wav", 0.05)
            up = self._tone(folder, "up.wav", 0.25)
            down = self._tone(folder, "down.wav", 0.02)
            ok = voice_level.check(src, up, target=-16)
            bad = voice_level.check(src, down, target=-16)
        self.assertFalse(any("turun" in f for f in ok["fails"]), ok)
        self.assertTrue(any("turun" in f for f in bad["fails"]), bad)

    def test_voice_level_rejects_squashed_voice(self):
        with tempfile.TemporaryDirectory() as folder:
            src = self._tone(folder, "src.wav", 0.2)
            sq = self._tone(folder, "sq.wav", 0.2, squash=True)
            r = voice_level.check(src, sq, target=-30)
        self.assertTrue(any("tekan" in f for f in r["fails"]), r)

    def test_recut_endpoint_is_relative_to_the_recording(self):
        sr = 16000
        x = np.full(sr * 2, 0.0005, np.float32)
        x[: sr // 2] += 0.3 * np.sin(2 * np.pi * 200 * np.arange(sr // 2) / sr)
        tail = np.arange(int(0.1 * sr))
        x[sr // 2: sr // 2 + len(tail)] += 0.01 * np.sin(2 * np.pi * 200 * tail / sr)  # ekor -40 dBFS
        ok_mid, _ = recut.endpoint_quiet(x, sr, 0.555, "ujung")
        ok_after, _ = recut.endpoint_quiet(x, sr, 1.0, "ujung")
        self.assertFalse(ok_mid)
        self.assertTrue(ok_after)


    def test_audio_inside_scene_sequence_fails_bus_check(self):
        with tempfile.TemporaryDirectory() as folder:
            src = Path(folder)
            (src / "Root.tsx").write_text('// audio-bus\nexport const R = () => <Audio src="mix.wav" />;\n')
            _, ok = audio_bus.check(src)
            (src / "Scene.tsx").write_text('export const S = () => <Sequence durationInFrames={30}><Audio src="a.wav" /></Sequence>;\n')
            _, bad = audio_bus.check(src)
        self.assertEqual(ok, [])
        self.assertEqual(len(bad), 1)


if __name__ == "__main__":
    unittest.main()
