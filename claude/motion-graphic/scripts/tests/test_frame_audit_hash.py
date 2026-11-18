"""Verdict audit frame terikat HASH potongan: potongan yang tidak berubah dipakai ulang, yang berubah diperiksa ulang."""
import os
import json
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
FA = ROOT / "scripts/juri/frame_audit.py"


def write_frames(d, n, changed=()):
    os.makedirs(d, exist_ok=True)
    for i in range(n):
        shade = (i * 7) % 200 + (40 if i in changed else 0)
        Image.new("RGB", (64, 36), (shade, 80, 120)).save(os.path.join(d, f"f{i:05d}.jpg"), quality=90)


def run(frames, out, *extra):
    r = subprocess.run([sys.executable, str(FA), frames, "--fps", "10", "--chunk", "2", "--out", out, *extra],
                       capture_output=True, text=True)
    assert r.returncode == 0, r.stderr
    return r.stdout


def judge(out, name, verdict="LULUS"):
    vp = os.path.join(out, name, "VERDICT.md")
    txt = open(vp).read().replace("(belum diperiksa)", "tidak ada masalah") + f"PUTUSAN: {verdict}\n"
    open(vp, "w").write(txt)


class FrameAuditHash(unittest.TestCase):
    def test_reuse_and_invalidate(self):
        with tempfile.TemporaryDirectory() as t:
            fr, out = os.path.join(t, "frames"), os.path.join(t, "fa")
            write_frames(fr, 60)                       # 6 dtk @10 fps -> 3 potongan
            run(fr, out)
            names = sorted(x for x in os.listdir(out) if x.startswith("c"))
            self.assertEqual(len(names), 3)
            for nm in names: judge(out, nm)
            time.sleep(0.05)
            write_frames(fr, 60, changed={25})         # hanya potongan ke-2 berubah
            stdout = run(fr, out)
            self.assertIn("dipakai ulang 2", stdout)
            self.assertIn("PUTUSAN: LULUS", open(os.path.join(out, names[0], "VERDICT.md")).read())
            v2 = open(os.path.join(out, names[1], "VERDICT.md")).read()
            self.assertIn("(belum diperiksa)", v2)
            self.assertTrue(os.path.exists(os.path.join(out, names[1], "VERDICT.prev.md")))

    def test_hashless_verdict_always_requires_new_audit_despite_old_frames(self):
        for changed in (None, "words", "cues"):
            with self.subTest(changed=changed), tempfile.TemporaryDirectory() as t:
                fr, out = Path(t) / "frames", Path(t) / "fa"
                write_frames(fr, 20)
                for frame in fr.glob("*.jpg"):
                    os.utime(frame, (time.time() - 60, time.time() - 60))
                words, cues = Path(t) / "words.json", Path(t) / "cues.json"
                words.write_text(json.dumps({"words": [{"w": "lama", "s": .5, "e": 1.0}]}))
                cues.write_text(json.dumps({"cues": [{"t": .5, "peran": "click", "file": "old.wav"}]}))
                args = ("--fase", "audio", "--words", str(words), "--cues", str(cues))
                run(str(fr), str(out), *args)
                chunk = next(out.glob("c*"))
                verdict = chunk / "VERDICT.md"
                legacy = f"# VERDICT {chunk.name}\n\nok\nPUTUSAN: LULUS\n"
                verdict.write_text(legacy)
                self.assertGreaterEqual(verdict.stat().st_mtime, max(f.stat().st_mtime for f in fr.glob("*.jpg")))
                if changed == "words":
                    words.write_text(json.dumps({"words": [{"w": "baru", "s": .7, "e": 1.0}]}))
                elif changed == "cues":
                    cues.write_text(json.dumps({"cues": [{"t": .8, "peran": "hit", "file": "new.wav"}]}))
                stdout = run(str(fr), str(out), *args)
                self.assertIn("dipakai ulang 0", stdout)
                self.assertIn("(belum diperiksa)", verdict.read_text())
                self.assertNotIn("PUTUSAN: LULUS", verdict.read_text())
                self.assertEqual((chunk / "VERDICT.prev.md").read_text(), legacy)

    def test_unchanged_lulus_and_gagal_are_both_reused(self):
        with tempfile.TemporaryDirectory() as t:
            fr, out = Path(t) / "frames", Path(t) / "fa"
            write_frames(fr, 40)
            run(str(fr), str(out))
            chunks = sorted(out.glob("c*"))
            for chunk, verdict in zip(chunks, ("LULUS", "GAGAL")):
                judge(str(out), chunk.name, verdict)
            before = [(chunk / "VERDICT.md").read_bytes() for chunk in chunks]
            self.assertIn("dipakai ulang 2", run(str(fr), str(out)))
            self.assertEqual([(chunk / "VERDICT.md").read_bytes() for chunk in chunks], before)

    def test_neighbor_changes_info_and_invalidates_unchanged_chunk_frames(self):
        with tempfile.TemporaryDirectory() as t:
            fr, out = Path(t) / "frames", Path(t) / "fa"
            write_frames(fr, 60)
            run(str(fr), str(out))
            chunk = sorted(out.glob("c*"))[1]  # frames20..39; predecessor19 is outside
            judge(str(out), chunk.name)
            old_hash = (chunk / ".hash").read_text()
            old_info = (chunk / "INFO.md").read_text()
            old_verdict = (chunk / "VERDICT.md").read_bytes()
            unchanged = [(fr / f"f{i:05d}.jpg").read_bytes() for i in range(20, 40)]
            Image.new("RGB", (64, 36), (255, 255, 255)).save(fr / "f00019.jpg", quality=90)
            run(str(fr), str(out))
            self.assertEqual([(fr / f"f{i:05d}.jpg").read_bytes() for i in range(20, 40)], unchanged)
            self.assertNotEqual((chunk / "INFO.md").read_text(), old_info)
            self.assertIn("- f20 ", (chunk / "INFO.md").read_text())
            self.assertNotEqual((chunk / ".hash").read_text(), old_hash)
            self.assertIn("(belum diperiksa)", (chunk / "VERDICT.md").read_text())
            self.assertEqual((chunk / "VERDICT.prev.md").read_bytes(), old_verdict)

    def test_visual_phase_ignores_cues_and_writes_hold_frames(self):
        with tempfile.TemporaryDirectory() as t:
            fr, out = Path(t) / "frames", Path(t) / "fa"
            write_frames(fr, 20)
            cues = Path(t) / "cues.json"
            cues.write_text(json.dumps({"cues": [{"t": .5, "peran": "click", "file": "a.wav"}]}))
            run(str(fr), str(out), "--cues", str(cues))
            chunk = next(out.glob("c*")); judge(str(out), chunk.name)
            self.assertEqual(len(list((chunk / "tahan").glob("t*.jpg"))), 2)   # satu frame tahan per detik
            self.assertNotIn("Cue SFX", (chunk / "INFO.md").read_text())
            self.assertNotIn("SFX?", (chunk / "INFO.md").read_text())
            cues.write_text(json.dumps({"cues": [{"t": .9, "peran": "hit", "file": "b.wav"}]}))
            self.assertIn("dipakai ulang 1", run(str(fr), str(out), "--cues", str(cues)))  # cue berubah, verdict visual tetap

    def test_shorter_video_removes_stale_chunks(self):
        with tempfile.TemporaryDirectory() as t:
            fr, out = os.path.join(t, "frames"), os.path.join(t, "fa")
            write_frames(fr, 60); run(fr, out)
            for f in sorted(os.listdir(fr))[45:]: os.remove(os.path.join(fr, f))
            run(fr, out)
            names = sorted(x for x in os.listdir(out) if x.startswith("c"))
            self.assertEqual(names[-1], "c03_004.0-004.5s")
            self.assertEqual(len(names), 3)


if __name__ == "__main__":
    unittest.main()
