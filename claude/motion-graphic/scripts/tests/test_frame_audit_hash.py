"""Verdict audit frame terikat HASH potongan: potongan yang tidak berubah dipakai ulang, yang berubah diperiksa ulang."""
import os
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


def run(frames, out):
    r = subprocess.run([sys.executable, str(FA), frames, "--fps", "10", "--chunk", "2", "--out", out],
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

    def test_legacy_verdict_adopted_only_if_newer_than_frames(self):
        with tempfile.TemporaryDirectory() as t:
            fr, out = os.path.join(t, "frames"), os.path.join(t, "fa")
            write_frames(fr, 20)
            run(fr, out)
            name = sorted(x for x in os.listdir(out) if x.startswith("c"))[0]
            vp = os.path.join(out, name, "VERDICT.md")
            open(vp, "w").write(f"# VERDICT {name}\n\nok\nPUTUSAN: LULUS\n")     # format lama, tanpa HASH
            time.sleep(0.05)
            run(fr, out)
            txt = open(vp).read()
            self.assertRegex(txt, r"(?m)^HASH: [0-9a-f]{16}$")
            self.assertIn("PUTUSAN: LULUS", txt)

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
