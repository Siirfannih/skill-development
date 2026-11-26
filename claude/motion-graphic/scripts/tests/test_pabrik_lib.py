"""pabrik/lib.py tidak mengandaikan ~/.local/bin/claude2: perintah model bisa diatur, dan tanpa CLI pesannya jelas (jalur satu model)."""
import os, re, stat, sys, tempfile, unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "pabrik"))
import lib  # noqa: E402


def skrip(d, nama):
    p = Path(d) / nama
    p.write_text("#!/bin/sh\necho '{\"result\": \"ok\"}'\n"); p.chmod(p.stat().st_mode | stat.S_IEXEC)
    return str(p)


class PerintahModel(unittest.TestCase):
    def test_env_menang(self):
        with tempfile.TemporaryDirectory() as d, mock.patch.dict(os.environ, {"PABRIK_CLAUDE": skrip(d, "modelku")}):
            self.assertTrue(lib.perintah_model().endswith("modelku"))

    def test_tanpa_cli_none_dan_llm_menjelaskan(self):
        with tempfile.TemporaryDirectory() as d, mock.patch.dict(os.environ, {"PATH": d, "HOME": d}, clear=False):
            os.environ.pop("PABRIK_CLAUDE", None)
            self.assertIsNone(lib.perintah_model())
            with self.assertRaises(lib.ModelTidakAda) as c:
                lib.llm("tulis spec")
            self.assertIn("PABRIK_CLAUDE", str(c.exception)); self.assertIn("satu model", str(c.exception))
            self.assertIsInstance(c.exception, RuntimeError)

    def test_prompt_manual_dibuat_0600_dan_tidak_di_tmp_bersama(self):
        with tempfile.TemporaryDirectory() as d, mock.patch.object(lib, "PABRIK", Path(d)), \
                mock.patch.dict(os.environ, {"PATH": d, "HOME": d}):
            os.environ.pop("PABRIK_CLAUDE", None)
            with self.assertRaises(lib.ModelTidakAda) as c:
                lib.llm("rahasia prompt")
            f = Path(re.search(r"(\S*pabrik-prompt-\S+\.md)", str(c.exception)).group(1))
            self.assertEqual(stat.S_IMODE(f.stat().st_mode), 0o600)
            self.assertEqual(f.read_text(), "rahasia prompt"); self.assertEqual(f.parent, Path(d) / "out")

    def test_env_salah_dilaporkan(self):
        with tempfile.TemporaryDirectory() as d, mock.patch.dict(os.environ, {"PABRIK_CLAUDE": "/tidak/ada/cli", "PATH": d, "HOME": d}):
            self.assertIsNone(lib.perintah_model())
            with self.assertRaises(lib.ModelTidakAda) as c:
                lib.llm("x")
            self.assertIn("tidak ditemukan", str(c.exception))

    def test_llm_memakai_cli_dari_env(self):
        with tempfile.TemporaryDirectory() as d, mock.patch.dict(os.environ, {"PABRIK_CLAUDE": skrip(d, "modelku")}):
            self.assertEqual(lib.llm("halo"), "ok")


if __name__ == "__main__":
    unittest.main()
