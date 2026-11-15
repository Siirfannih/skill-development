"""Light regression checks: frozen edit, actual words, resource refusal, sample counts."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

P = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('build_v5', P / 'edit/make_v5.py')
build = importlib.util.module_from_spec(spec)
spec.loader.exec_module(build)

def load(path):
    return json.loads((P / path).read_text())

class TimelineV5(unittest.TestCase):
    def test_frozen_nine_cuts_and_duration(self):
        mp = load('edit/v5/map.json')
        self.assertEqual(mp['removed'], [q[:2] for q in load('edit/potong_v5.json')])
        self.assertEqual(len(mp['removed']), 9)
        self.assertAlmostEqual(mp['dur_old'] - sum(b-a for a,b in mp['removed']), 91.3)
        self.assertEqual(load('remotion/src/data/knots_v5.json')['dur_frames'], 2739)

    def test_actual_words_retain_all_fillers_and_timing(self):
        source = load('edit/words_final.json')
        actual = load('edit/v5/words_actual.json')
        cuts = load('edit/v5/map.json')['removed']
        self.assertEqual(len(actual), 228)
        self.assertEqual(sum(q['w'].lower() == 'tuh' for q in actual), 3)
        for old, new in zip(source, actual):
            self.assertEqual(old['w'], new['w'])
            self.assertEqual(new['s'], build.mapper(cuts, old['s']))
            self.assertEqual(new['e'], build.mapper(cuts, old['e']))
            self.assertAlmostEqual(old['e']-old['s'], new['e']-new['s'], places=5)
        captions = load('remotion/src/data/words_v5.json')
        self.assertEqual(captions, [q for q in actual if q['w'].lower() != 'tuh'])
        self.assertEqual(len(captions), 225)

    def test_existing_candidate_audio_duration(self):
        for name in ('suara.wav', 'voice_clean.wav'):
            info = build.sf.info(P / 'edit/v5' / name)
            self.assertEqual(info.frames, 4382400)
            self.assertEqual(info.samplerate, 48000)

    def test_transcript_must_include_fillers_and_content(self):
        expected = load('edit/v5/words_actual.json')
        self.assertTrue(build.compare_transcript(expected, expected)['pass_'])
        no_filler = [q for q in expected if q['w'].lower() != 'tuh']
        self.assertFalse(build.compare_transcript(expected, no_filler)['pass_'])
        self.assertFalse(build.compare_transcript(expected, expected[1:])['pass_'])

    def test_whisper_audio_is_predecoded_float32_mono_16khz(self):
        # faster-whisper's path decoder is incompatible with PyAV 19 on the
        # PC worker.  A numpy input must bypass av.open completely.
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'stereo.wav'
            signal = build.np.zeros((48_000, 2), dtype=build.np.float32)
            signal[:, 0] = 0.25
            signal[:, 1] = -0.25
            build.sf.write(path, signal, 48_000, subtype='FLOAT')
            decoded = build.whisper_audio(path)
        self.assertEqual(decoded.dtype, build.np.float32)
        self.assertEqual(decoded.ndim, 1)
        self.assertEqual(len(decoded), 16_000)

    def test_transcript_review_preserves_raw_failure_and_covers_missing_content(self):
        review = load('edit/v5/transcript-review.json')
        self.assertTrue(review['pass'])
        self.assertFalse(review['raw_full_asr']['pass'])
        evidence = {item['expected']: item for item in review['content_review']}
        self.assertEqual(set(evidence), {'Build something', 'Apa pengalaman'})
        self.assertTrue(all(item['verdict'] == 'UTUH' for item in evidence.values()))
        self.assertTrue(all(item['confidence'] >= 0.85 for item in evidence.values()))

    def test_finished_historical_pid_does_not_block(self):
        with patch.object(build.subprocess, 'check_output', return_value='4108755 0.0 python edge10f.py\n'):
            build.resource_gate()

    def test_any_high_cpu_job_blocks(self):
        with patch.object(build.subprocess, 'check_output', return_value='123 250.1 other job\n'):
            with self.assertRaises(SystemExit): build.resource_gate()

    def test_ps_snapshot_does_not_block_itself(self):
        with patch.object(build.subprocess, 'check_output', return_value='123 900.0 ps ps -eo pid,pcpu,comm,args\n'):
            build.resource_gate()

    def test_idle_machine_passes(self):
        with patch.object(build.subprocess, 'check_output', return_value='123 10.0 other job\n'):
            build.resource_gate()

if __name__ == '__main__': unittest.main()
