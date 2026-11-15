import importlib.util, json, unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[4]
sp = importlib.util.spec_from_file_location('gate', ROOT/'claude/motion-graphic/scripts/gate/cut_check.py')
gate = importlib.util.module_from_spec(sp); sp.loader.exec_module(gate)
class CutSafety(unittest.TestCase):
    word = [dict(w='Apa', s=1., e=1.42)]
    def test_cut_cannot_hide_behind_unchanged_json(self):
        self.assertFalse(gate.validate_cuts(self.word, [[1.01, 1.41]], self.word)['pass_'])
    def test_shortened_remap_fails_without_cut(self):
        self.assertFalse(gate.validate_cuts(self.word, [], [dict(w='Apa', s=1., e=1.1)])['pass_'])
    def test_guard_fails_even_without_word_overlap(self):
        self.assertFalse(gate.validate_cuts(self.word, [[.96, .99]])['pass_'])
    def test_guarded_gap_passes(self):
        self.assertTrue(gate.validate_cuts(self.word, [[.5, .9]], self.word)['pass_'])
    def test_explicit_filler_allowed(self):
        self.assertTrue(gate.validate_cuts([dict(w='tuh',s=0.,e=.2)]+self.word, [[0.,.2]], self.word)['pass_'])
if __name__ == '__main__': unittest.main()
