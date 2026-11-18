"""Uji kt_ocr.py: pencocokan kata OCR, kata pertama dicek per onset (props.wt), daftar terima wajib menyebut frame."""
import importlib.util, json, os, tempfile, unittest

H = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("kt_ocr", os.path.join(H, "..", "juri", "kt_ocr.py"))
K = importlib.util.module_from_spec(spec); spec.loader.exec_module(K)


class KtOcr(unittest.TestCase):
    def test_kata_utuh_cocok(self):
        self.assertEqual(K.cocok("profesional", {"profesional"}), 1.0)
        self.assertEqual(K.cocok("ini", {"ini."}), 1.0)

    def test_huruf_hilang_tidak_cocok(self):
        self.assertLess(K.cocok("profesional", {"prof", "iona"}), 0.8)

    def test_blok_per_kata_dengan_onset(self):
        d = tempfile.mkdtemp()
        json.dump({"lapisan": [{"id": "T1", "comp": "KT", "props": {"teks": "habis banget", "wt": [0.0, 0.3]}},
                               {"id": "B1", "comp": "Bubble", "props": {"teks": "Hai"}}]}, open(os.path.join(d, "lapisan.json"), "w"))
        json.dump({"fps": 30, "lapisan": [{"id": "T1", "src": "cache/a.mov"}, {"id": "B1", "src": "cache/b.mov"}]}, open(os.path.join(d, "lego.json"), "w"))
        b = K.blok_dari(d)
        self.assertEqual([(x[0], x[2], x[3]) for x in b], [("T1#1", "habis", 0), ("T1#2", "banget", 9)])


if __name__ == "__main__":
    unittest.main()
