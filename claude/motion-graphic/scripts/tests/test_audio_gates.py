import importlib.util
import io
import json
import os
import subprocess
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest.mock import patch

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
motion_lint = load_module("motion_lint", "scripts/juri/motion_lint.py")
board = load_module("board", "scripts/storyboard/board.py")
kt_check = load_module("kt_check", "scripts/lego/kt_check.py")
compose = load_module("compose", "scripts/lego/compose.py")


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


class EditorialCutTests(unittest.TestCase):
    def setUp(self):
        self.source = [
            {"w": "Aku", "s": 0.0, "e": 0.3},
            {"w": "ulang", "s": 0.5, "e": 0.8},
            {"w": "aman.", "s": 1.0, "e": 1.3},
        ]
        self.mapped = [self.source[0], {"w": "aman.", "s": 0.4, "e": 0.7}]
        self.cuts = [{"source_start": 0.35, "source_end": 0.95, "label": "editorial"}]

    def test_whole_editorial_word_is_optional(self):
        result = cut_check.validate_cuts(self.source, [[0.35, 0.95]], self.mapped, cuts=self.cuts)
        self.assertTrue(result["pass_"], result["failures"])

    def test_sliced_editorial_word_still_fails(self):
        cuts = [{"source_start": 0.6, "source_end": 0.95, "label": "editorial"}]
        result = cut_check.validate_cuts(self.source, [[0.6, 0.95]], self.mapped, cuts=cuts)
        self.assertFalse(result["pass_"])
        self.assertTrue(any("overlap ulang" in x for x in result["failures"]))

    def test_missing_non_editorial_word_fails(self):
        result = cut_check.validate_cuts(self.source, [[0.35, 0.95]], [], cuts=self.cuts)
        self.assertFalse(result["pass_"])
        self.assertTrue(any("sequence" in x for x in result["failures"]))

    def test_label_cannot_exempt_a_word_outside_removed_ranges(self):
        result = cut_check.validate_cuts(self.source, [], self.mapped, cuts=self.cuts)
        self.assertFalse(result["pass_"])

    def test_unlabelled_content_removal_still_fails(self):
        result = cut_check.validate_cuts(self.source, [[0.35, 0.95]], self.mapped)
        self.assertFalse(result["pass_"])

    def test_editorial_cut_still_protects_adjacent_word_guard(self):
        cuts = [{"source_start": 0.31, "source_end": 0.95, "label": "editorial"}]
        result = cut_check.validate_cuts(self.source, [[0.31, 0.95]], self.mapped, cuts=cuts)
        self.assertFalse(result["pass_"])
        self.assertTrue(any("guard Aku" in x for x in result["failures"]))

    def test_editorial_cli_and_audio_order_use_the_same_map(self):
        with tempfile.TemporaryDirectory() as folder:
            p = Path(folder)
            voice, source, words, cut_map = [p / name for name in
                ("voice.wav", "source.json", "words.json", "map.json")]
            tt = np.arange(48_000) / 48_000
            samples = 0.35 * np.sin(2 * np.pi * 220 * tt)
            samples[14_400:19_200] = 0.0
            samples[33_600:] = 0.0
            sf.write(voice, samples, 48_000, subtype="FLOAT")
            source.write_text(json.dumps(self.source))
            words.write_text(json.dumps(self.mapped))
            cut_map.write_text(json.dumps({"removed": [[0.35, 0.95]], "cuts": self.cuts}))
            cli = subprocess.run([os.sys.executable, str(ROOT / "scripts/gate/cut_check.py"),
                str(voice), str(words), "--source-words", str(source), "--map", str(cut_map)],
                capture_output=True, text=True)
            self.assertEqual(cli.returncode, 0, cli.stdout + cli.stderr)
            script = ROOT / "scripts/gate/audio_order.py"
            subprocess.run([os.sys.executable, str(script), "init", "--dir", str(p)],
                check=True, capture_output=True)
            lock = subprocess.run([os.sys.executable, str(script), "lock", "suara", str(voice),
                "--dir", str(p), "--words", str(words), "--source-words", str(source),
                "--cut-map", str(cut_map), "--voice-source", str(voice)],
                capture_output=True, text=True)
            self.assertEqual(lock.returncode, 0, lock.stdout + lock.stderr)
            self.assertIn("suara", json.loads((p / "ORDER.json").read_text())["stages"])


class SfxPolicyTests(unittest.TestCase):
    def _cues(self, times):
        return [dict(t=t, peran="kartu_mendarat", alasan="kartu masuk terpisah",
                     file="/sfx/ui-pop.wav", dengar="clean UI pop") for t in times]

    def _run_gate(self, cues):
        with tempfile.TemporaryDirectory() as folder:
            cue_path = Path(folder) / "cues.json"
            cue_path.write_text(json.dumps(cues))
            output = io.StringIO()
            with patch.object(sfx_density.sys, "argv", ["sfx_density.py", "unused.mp4", str(cue_path)]), \
                    patch.object(sfx_density, "visual_events", return_value=(np.array([]), 6.0)), \
                    redirect_stdout(output), self.assertRaises(SystemExit) as exited:
                sfx_density.main()
        return exited.exception.code, output.getvalue()

    def test_same_role_same_file_passes_b08_and_b20_object_waves(self):
        for beat, times in (("B08", [0, 0.23, 0.46]), ("B20", [i * 0.65 for i in range(7)])):
            with self.subTest(beat=beat):
                cues = self._cues(times)

                self.assertEqual(sfx_density.spam_check(cues), [])
                self.assertEqual(sfx_density.role_issues(cues), [])
                code, output = self._run_gate(cues)

                self.assertEqual(code, 0, output)

    def test_whoosh_spacing_applies_across_different_files(self):
        for gap, expected_issues in ((0.65, 1), (1.0, 0)):
            with self.subTest(gap=gap):
                cues = [dict(t=0, peran="transisi", file="whoosh-a.wav"),
                        dict(t=gap, peran="transisi", file="whoosh-b.wav")]

                self.assertEqual(len(sfx_density.spam_check(cues)), expected_issues)

    def test_cut_click_and_laser_ting_transitions_are_not_whooshes(self):
        sounds = [("Cutcontrastransision.mp3", "transisi_cut_kontras", "pen click / key release"),
                  ("Lasertransision.mp3", "transisi_halus", "triangle / glass ting"),
                  ("panel-transition.wav", "transition", "digital glitch")]
        for file, role, heard in sounds:
            with self.subTest(file=file):
                cues = self._cues([0, 0.3])
                for cue in cues:
                    cue.update(file=file, peran=role, dengar=heard)

                self.assertEqual(sfx_density.spam_check(cues), [])
                code, output = self._run_gate(cues)
                self.assertEqual(code, 0, output)

    def test_whoosh_spacing_uses_role_filename_or_heard_label(self):
        evidence = [("peran", dict(peran="kamera_whoosh", file="camera.wav", dengar="air movement")),
                    ("file", dict(peran="gerak_kamera", file="whoosh.wav", dengar="air movement")),
                    ("dengar", dict(peran="pan_cepat", file="scaningfast.wav", dengar="fast soft air whoosh")),
                    ("dengar_file_cut", dict(peran="cut_kontras", file="Cutcontrastransision.mp3", dengar="air whoosh"))]
        for field, sound in evidence:
            for gap, expected_code in ((0.65, 1), (1.0, 0)):
                with self.subTest(evidence=field, gap=gap):
                    cues = self._cues([0, gap])
                    for cue in cues:
                        cue.update(sound)

                    self.assertEqual(len(sfx_density.spam_check(cues)), expected_code)
                    code, output = self._run_gate(cues)
                    self.assertEqual(code, expected_code, output)
                    if expected_code:
                        self.assertIn("whoosh 0.00 & 0.65 dtk (< 1 dtk)", output)

    def test_whoosh_aliases_remain_detected_in_each_metadata_field(self):
        for field in ("peran", "file", "dengar"):
            for label in ("whoosh", "woosh", "swoosh", "swish", "whip"):
                with self.subTest(field=field, label=label):
                    cues = self._cues([0, 0.65])
                    for cue in cues:
                        cue[field] = label

                    self.assertEqual(len(sfx_density.spam_check(cues)), 1)

    def test_flam_boundary_applies_to_same_and_different_click_files(self):
        for second_file in ("click.wav", "click-2.wav"):
            for gap, expected_issues in ((0.099, 1), (0.1, 0)):
                with self.subTest(second_file=second_file, gap=gap):
                    cues = [dict(t=0, peran="klik_ui", file="click.wav"),
                            dict(t=gap, peran="klik_ui", file=second_file)]

                    self.assertEqual(len(sfx_density.flam_issues(cues)), expected_issues)

    def test_burst_allows_five_cues_and_rejects_six_within_two_seconds(self):
        five = self._cues([0, 0.4, 0.8, 1.2, 1.6])
        six = self._cues([0, 0.3, 0.6, 0.9, 1.2, 1.5])

        code, output = self._run_gate(five)
        self.assertEqual(code, 0, output)
        code, output = self._run_gate(six)
        self.assertEqual(code, 1, output)
        self.assertIn("rentetan 6 cue dalam 2 dtk (maks 5)", output)

    def test_burst_window_excludes_cue_exactly_two_seconds_after_start(self):
        code, output = self._run_gate(self._cues([0, 0.4, 0.8, 1.2, 1.6, 2.0]))

        self.assertEqual(code, 0, output)

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


    def test_motion_lint_flags_presets_even_stagger_and_blur_in(self):
        with tempfile.TemporaryDirectory() as folder:
            src = Path(folder)
            (src / "A.tsx").write_text(
                "const o = interpolate(frame, [0, 10], [0, 1], { easing: Easing.inOut(Easing.ease) });\n"
                "const start = i * 3;\n"
                "const style = { filter: `blur(${(1 - p) * 8}px)` };\n"
                "const ok = interpolate(frame, [0, 10], [0, 1], { easing: CURVE.land });\n"
                "const left = i * 120;\n"
                "const delay = i * 3; // motion-ok: grid ritmis disengaja\n")
            issues = motion_lint.lint(src)
        self.assertEqual(len(issues), 3, issues)

    def test_storyboard_beat_needs_metaphor(self):
        good = {"id": "a", "metafora": {"makna": "m", "emosi": "e", "aksi": "membuka", "metafora": "x",
                                        "objek": ["1", "2", "3"], "urutan": "u", "bentuk": "exploded view"}}
        self.assertEqual(board.metafora_issues(good), [])
        self.assertTrue(board.metafora_issues({"id": "b"}))


    def test_kt_check_rejects_fade_everywhere_and_accepts_role_based_variety(self):
        fade = [{"id": f"T{i}", "teks": "x", "t": i * 1.0, "dur": 0.9, "peran": "R1", "kode": "FADE",
                 "alasan": "a", "pos": [540, 960]} for i in range(8)]
        self.assertTrue(any("fade hanya" in f for f in kt_check.check(fade)))
        mix = []
        roles = [("R1", "T19"), ("R1", "T19"), ("R6", "T02"), ("R1", "T19"), ("R2", "T16"), ("R1", "T19"), ("R1", "T19")]
        for i, (r, k) in enumerate(roles):
            mix.append({"id": f"T{i}", "teks": "x", "t": i * 1.0, "dur": 0.9, "peran": r, "kode": k, "alasan": "a", "pos": [540, 960]})
        self.assertEqual(kt_check.check(mix), [])
        mix[3]["kode"] = "T01"
        self.assertTrue(any("peran R1" in f for f in kt_check.check(mix)))

    def test_compose_overlays_a_cached_layer_at_its_time(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "lego").mkdir(); (root / "edit").mkdir()
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "color=c=gray:s=320x180:r=30:d=2",
                            "-pix_fmt", "yuv420p", str(root / "edit/a.mp4")], check=True)
            box = np.zeros((40, 80, 4), np.uint8); box[...] = (255, 220, 0, 255)
            from PIL import Image
            Image.fromarray(box, "RGBA").save(root / "box.png")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-loop", "1", "-t", "0.5", "-r", "30", "-i", str(root / "box.png"),
                            "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le", str(root / "lego/b.mov")], check=True)
            L = {"fps": 30, "w": 320, "h": 180, "dasar": [{"src": "edit/a.mp4", "in": 0, "dur": 2}],
                 "lapisan": [{"id": "B", "src": "lego/b.mov", "t": 1.0, "x": 100, "y": 60}], "keluar": "out/f.mp4"}
            (root / "lego.json").write_text(json.dumps(L))
            r = subprocess.run([os.sys.executable, str(ROOT / "scripts/lego/compose.py"), str(root / "lego.json")],
                               capture_output=True, text=True)
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
            def px(n):
                raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(root / "out/f.mp4"), "-vf", f"select=eq(n\\,{n}),crop=40:20:120:70",
                                      "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
                return np.frombuffer(raw, np.uint8).reshape(-1, 3).mean(0)
            self.assertLess(px(10)[2] - px(40)[2], 5 + px(10)[2])
            self.assertGreater(px(40)[0] - px(40)[2], 150)  # kuning saat lapisan tampil
            self.assertLess(abs(px(10)[0] - px(10)[2]), 20)  # abu-abu sebelum lapisan


    def test_motion_lint_revision_mode_only_checks_changed_files(self):
        with tempfile.TemporaryDirectory() as folder:
            src = Path(folder)
            (src / "Old.tsx").write_text("const o = interpolate(f, [0, 9], [0, 1], { easing: Easing.inOut(Easing.ease) });\n")
            (src / "New.tsx").write_text("const ok = interpolate(f, [0, 9], [0, 1], { easing: CURVE.land });\n")
            self.assertEqual(len(motion_lint.lint(src)), 1)
            self.assertEqual(motion_lint.lint(src, {(src / "New.tsx").resolve()}), [])

    def test_audio_order_warisan_accepts_voice_locked_before_evidence_rule(self):
        with tempfile.TemporaryDirectory() as folder:
            d = Path(folder)
            voice = d / "suara.wav"
            sf.write(voice, np.zeros(4800, np.float32), 48000)
            import hashlib
            sha = hashlib.sha256(voice.read_bytes()).hexdigest()[:16]
            (d / "ORDER.json").write_text(json.dumps({"mode": "konten", "stages": {"suara": {"file": str(voice), "sha": sha, "waktu": "2026-11-15 16:24", "hulu": {}}}}))
            tool = ROOT / "scripts/gate/audio_order.py"
            run = lambda *extra: subprocess.run([os.sys.executable, str(tool), "check", "--dir", str(d), *extra], capture_output=True, text=True)
            self.assertIn("bukti words/source_words/cut_map", run().stdout)
            self.assertNotIn("bukti words/source_words/cut_map", run("--warisan").stdout)


if __name__ == "__main__":
    unittest.main()
