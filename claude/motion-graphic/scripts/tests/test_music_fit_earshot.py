"""music_fit.py tidak lagi berhenti bila earshot tidak ada: earshot_rank mengembalikan None (peringkat dari ukuran saja)."""
import os, sys, unittest
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "audio"))
with mock.patch.dict(sys.modules, {"librosa": mock.MagicMock(), "pyloudnorm": mock.MagicMock()}):
    import music_fit  # noqa: E402


class EarshotOpsional(unittest.TestCase):
    def test_tanpa_earshot_mengembalikan_none_bukan_keluar(self):
        with mock.patch.object(music_fit.shutil, "which", return_value=None):
            self.assertIsNone(music_fit.earshot_rank("q", ["a.mp3"]))

    def test_earshot_gagal_mengembalikan_none(self):
        with mock.patch.object(music_fit.shutil, "which", return_value="/x/earshot"), \
             mock.patch.object(music_fit.subprocess, "run", side_effect=OSError("boom")):
            self.assertIsNone(music_fit.earshot_rank("q", ["a.mp3"]))

    def test_earshot_ada_mengembalikan_z(self):
        out = mock.Mock(stdout='{"results": [{"path": "a.mp3", "z": 1.5}]}')
        with mock.patch.object(music_fit.shutil, "which", return_value="/x/earshot"), \
             mock.patch.object(music_fit.subprocess, "run", return_value=out):
            self.assertEqual(music_fit.earshot_rank("q", ["a.mp3"]), {os.path.abspath("a.mp3"): 1.5})


if __name__ == "__main__":
    unittest.main()
