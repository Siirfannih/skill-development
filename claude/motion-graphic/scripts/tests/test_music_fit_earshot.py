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


class KumpulanKandidat(unittest.TestCase):
    def test_di_bawah_bawaan_hanya_peringatan(self):
        self.assertEqual(music_fit.pool_peringatan(["/a/1.mp3", "/b/2.mp3"], 5), ["kandidat 2 < 5 (bawaan)"])
        self.assertEqual(music_fit.pool_peringatan([f"/{c}/{i}.mp3" for i in range(3) for c in "ab"], 5), [])
        self.assertEqual(music_fit.pool_peringatan(["/a/1.mp3", "/a/2.mp3"], 2), ["kandidat dari < 2 folder sumber"])

    def test_bawaan_20_dari_dua_sumber(self):
        # standar kerja pemilik: >= 20 kandidat dari >= 2 sumber; di bawahnya peringatan, bukan FAIL
        self.assertEqual(music_fit.pool_peringatan([f"/a/{i}.mp3" for i in range(19)] + ["/b/x.mp3"]), [])
        self.assertEqual(music_fit.pool_peringatan([f"/{c}/{i}.mp3" for i in range(5) for c in "ab"]), ["kandidat 10 < 20 (bawaan)"])


if __name__ == "__main__":
    unittest.main()
