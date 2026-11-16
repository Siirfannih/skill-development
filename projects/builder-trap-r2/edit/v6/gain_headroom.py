"""Derive the codec-headroom variant without re-filtering or re-cutting audio."""
import os
for key in ('OMP_NUM_THREADS', 'OPENBLAS_NUM_THREADS', 'MKL_NUM_THREADS'):
    os.environ[key] = '2'
from pathlib import Path
import hashlib
import json
import shutil
import numpy as np
import soundfile as sf

V = Path(__file__).resolve().parent
OLD_SHA = 'd200737bed8d2ea23e3f300da2296c9f3b72861af15feb35ae73773c85929806'
D = V / 'gain-headroom'
D.mkdir(exist_ok=True)

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def save(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

old_path = D / 'voice-clean-peak1p05.wav'
if not old_path.exists():
    assert sha(V / 'voice_clean.wav') == OLD_SHA
    for name in ('voice_clean.wav', 'voice_clean.provenance.json', 'asr-provenance.json',
                 'adjudications.json', 'timing-contract.json', 'canonical-gates.json',
                 'canonical-findings.json', 'transcript-check.json'):
        target = old_path if name == 'voice_clean.wav' else D / ('before-' + name)
        shutil.copyfile(V / name, target)
    shutil.copyfile(V.parents[1] / 'handoff/REPORT-v6-voice.md', D / 'REPORT-before-headroom.md')
assert sha(old_path) == OLD_SHA
old_proof = json.loads((D / 'before-voice_clean.provenance.json').read_text())
# Every phrase is peak-bound, so the changed ceiling subtracts the same 0.2dB
# from each upward gain and its quiet transition envelope.
assert all(abs(q['expected_peak_db'] + 1.05) < 1e-9 for q in old_proof['phrase_gain'])
assert min(q['gain_db'] - .2 for q in old_proof['phrase_gain']) > 0
old, sr = sf.read(old_path, dtype='float32')
factor = np.float32(10 ** (-.2 / 20))
new = old * factor
current, current_sr = sf.read(V / 'voice_clean.wav', dtype='float32')
if current_sr != sr or not np.array_equal(current, new):
    sf.write(V / 'voice_clean.wav', new, sr, subtype='FLOAT')
reloaded, new_sr = sf.read(V / 'voice_clean.wav', dtype='float32')
assert sr == new_sr == 48000 and np.array_equal(new, reloaded)
normalized = reloaded.astype(np.float64) / float(factor)
error = old.astype(np.float64) - normalized
signal_energy = float(np.dot(old.astype(np.float64), old.astype(np.float64)))
error_energy = float(np.dot(error, error))
snr = float(10 * np.log10(signal_energy / max(error_energy, 1e-300)))
correlation = float(np.corrcoef(old.astype(np.float64), normalized)[0, 1])
def crest(x):
    x = x.astype(np.float64)
    return float(20 * np.log10(np.max(np.abs(x)) / np.sqrt(np.mean(x ** 2))))
phrase_crest_delta = []
for q in old_proof['phrase_gain']:
    a, b = q['samples']
    phrase_crest_delta.append(crest(reloaded[a:b]) - crest(old[a:b]))
proof = dict(transform='float32 y = round_float32(x * positive_float32_constant)',
             old_path=str(old_path.relative_to(V.parents[1])), old_sha256=OLD_SHA,
             new_path='edit/v6/voice_clean.wav', new_sha256=sha(V / 'voice_clean.wav'),
             source_unity_sha256=sha(V / 'voice_clean_unity.wav'),
             ceiling_before_dbfs=-1.05, ceiling_after_dbfs=-1.25,
             gain_delta_db=-.2, factor_float32=float(factor), factor_float32_hex=factor.tobytes().hex(),
             all_phrases_peak_bound=True, all_phrase_gains_still_positive=True,
             min_phrase_gain_db=min(q['gain_db'] - .2 for q in old_proof['phrase_gain']),
             max_phrase_gain_db=max(q['gain_db'] - .2 for q in old_proof['phrase_gain']),
             samples=len(reloaded), frames=len(reloaded) // 1600, sample_rate=sr,
             exact_expected_float32_waveform=np.array_equal(reloaded, old * factor),
             normalized_correlation=correlation, normalized_snr_db=snr,
             normalized_max_error=float(np.max(np.abs(error))),
             global_crest_delta_db=crest(reloaded) - crest(old),
             max_absolute_phrase_crest_delta_db=max(abs(q) for q in phrase_crest_delta),
             sample_peak_dbfs=float(20 * np.log10(np.max(np.abs(reloaded)).astype(float))),
             map_sha256=sha(V / 'map.json'), face_sha256=sha(V / 'face_edit_v6.mp4'),
             words_mapped_sha256=sha(V / 'words_mapped.json'),
             source_sha256=sha(V / 'source_raw.wav'),
             native_review='native whole/critical review heard old_sha256; new variant has not been separately listened to; phonetics/timing inherited through exact positive scalar transform',
             processing='no re-cut, re-denoise, limiter, compression, or changes to source/sample positions')
assert proof['exact_expected_float32_waveform'] and snr > 140 and correlation > 1 - 1e-12
assert proof['max_absolute_phrase_crest_delta_db'] < 1e-5
save(V / 'gain-headroom-proof.json', proof)
print(json.dumps(proof, ensure_ascii=False))
