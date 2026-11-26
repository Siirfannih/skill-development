"""Palet SFX terlarang adalah bawaan: keputusan proyek (REF-SPEC/kiblat) bisa membukanya lewat izinkan."""
import importlib.util, os, unittest

HERE = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("sfx_density", os.path.join(HERE, "..", "gate", "sfx_density.py"))
sfx_density = importlib.util.module_from_spec(spec); spec.loader.exec_module(sfx_density)

CUES = [{"t": 1.0, "file": "x/woodblock_hit.wav", "dengar": "wooden knock"}, {"t": 2.0, "file": "x/coin_drop.wav", "dengar": ""}]


class PaletBawaan(unittest.TestCase):
    def test_terlarang_secara_bawaan(self):
        self.assertEqual(len(sfx_density.forbidden_palette_issues(CUES)), 2)

    def test_proyek_membuka_satu_famili(self):
        r = sfx_density.forbidden_palette_issues(CUES, {"kayu/woodblock"})
        self.assertEqual(len(r), 1); self.assertIn("koin", r[0])

    def test_proyek_membuka_semuanya(self):
        self.assertEqual(sfx_density.forbidden_palette_issues(CUES, {"kayu/woodblock", "koin"}), [])


if __name__ == "__main__":
    unittest.main()
