import os, sys, tempfile, unittest, wave
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "audio"))
import sfx_vet  # noqa: E402

SR = sfx_vet.SR
AIR = {"centroid_hz": [120, 3000], "serangan_min_ms": 150}


def tulis(y):
    f = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    with wave.open(f.name, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    return f.name


def hp_noise(n, seed=0):
    x = np.random.default_rng(seed).standard_normal(n)
    return np.diff(np.diff(np.diff(x, prepend=0), prepend=0), prepend=0)  # condong ke frekuensi tinggi


def lp_noise(n, seed=1, k=60):
    x = np.random.default_rng(seed).standard_normal(n)
    return np.convolve(x, np.ones(k) / k, mode="same")


def fade_out(y, ms=200):
    n = int(SR * ms / 1000)
    y = y.copy()
    y[-n:] *= np.linspace(1, 0, n) ** 2
    return y


class SfxVetTest(unittest.TestCase):
    def verdict(self, y, fam=None):
        p = tulis(y)
        try:
            m = sfx_vet.measure(p)
            return sfx_vet.verdict(m, fam), m
        finally:
            os.unlink(p)

    def test_sustained_hiss_fails_but_crisp_click_does_not(self):
        hiss = np.zeros(SR)
        h = hp_noise(int(0.3 * SR))
        hiss[int(0.1 * SR):int(0.4 * SR)] = 0.5 * h / np.abs(h).max()
        (v, g, _), m = self.verdict(fade_out(hiss))
        self.assertEqual(v, "GAGAL")
        self.assertGreaterEqual(m["desis_run_ms"], 100)

        click = np.zeros(SR // 2)
        c = hp_noise(int(0.008 * SR), seed=3)
        click[2000:2000 + len(c)] = 0.8 * c / np.abs(c).max() * np.exp(-np.linspace(0, 6, len(c)))
        (v, g, _), m = self.verdict(click)
        self.assertLess(m["desis_run_ms"], 50)
        self.assertFalse(any("desis" in x for x in g))

    def test_air_rejects_jolt_from_audible_preroll_but_not_smooth_swell(self):
        n = int(1.5 * SR)
        base = lp_noise(n)
        base /= np.abs(base).max()
        env = np.full(n, 0.07)  # pra-gulung yang sudah terdengar (±−23 dB dari puncak, seperti whoosh kasar yang diukur)
        env[int(0.8 * SR):] = 0.9  # lalu menyentak
        (v, g, _), m = self.verdict(fade_out(base * env), AIR)
        self.assertEqual(v, "GAGAL")
        self.assertTrue(any("menyentak" in x for x in g))

        env2 = np.concatenate([np.linspace(0, 1, int(0.6 * SR)) ** 2, np.linspace(1, 0, n - int(0.6 * SR)) ** 2])
        (v, g, _), m = self.verdict(base * 0.9 * env2, AIR)
        self.assertFalse(any("menyentak" in x for x in g))

    def test_truncated_tail_fails(self):
        y = lp_noise(SR // 2)
        y = 0.8 * y / np.abs(y).max()
        (v, g, _), _ = self.verdict(y)
        self.assertTrue(any("terpotong" in x for x in g))


class SfxVetBedTest(SfxVetTest):
    def test_bed_hiss_and_loop_end_are_checks_not_failures(self):
        n = 2 * SR
        h = hp_noise(n, seed=5)
        y = 0.3 * h / np.abs(h).max()  # desis berkelanjutan, berakhir tanpa peluruhan (loop)
        (v, g, p), _ = self.verdict(y, {"pilar": "bed", "centroid_hz": [0, 20000]})
        self.assertNotEqual(v, "GAGAL", g)
        self.assertTrue(any("bed berdesis" in x for x in p))
        (v2, g2, _), _ = self.verdict(y)
        self.assertEqual(v2, "GAGAL")


if __name__ == "__main__":
    unittest.main()
