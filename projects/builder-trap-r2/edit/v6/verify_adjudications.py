"""Check the project acceptance snapshot; never replace canonical gate results."""
from pathlib import Path
import hashlib
import json
import sys

V = Path(__file__).resolve().parent
P = V.parents[1]
ROOT = P.parents[1]

def read(path):
    return json.loads(path.read_text())

def sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for block in iter(lambda: handle.read(1 << 20), b''):
            digest.update(block)
    return digest.hexdigest()

def verify(proof):
    failures = []
    for relative, expected in proof['sha256'].items():
        path = P / relative
        if not path.is_file() or sha(path) != expected:
            failures.append('changed artifact: ' + relative)
    for name, expected in proof['canonical_gate_sha256'].items():
        path = ROOT / 'claude/motion-graphic/scripts/gate' / name
        if not path.is_file() or sha(path) != expected:
            failures.append('changed canonical gate: ' + name)

    findings = read(V / 'canonical-findings.json')
    expected = findings['found'] + [['gumam', t, f'{duration:.2f} dtk']
                                   for t, duration in findings['hum']]
    cases = proof['canonical_findings_dispositions']
    if [row['canonical_finding'] for row in cases] != expected:
        failures.append('finding inventory changed or incomplete')
    if any(row['status'] != 'accepted_for_project' for row in cases):
        failures.append('unaccepted finding')
    source = read(V / 'canonical-source-validation.json')
    if source['pass_'] or source['failures'] != [proof['r032_exception']['canonical_failure']]:
        failures.append('source guard differs from the single R-032 exception')
    gates = read(V / 'canonical-gates.json')
    actual_exits = {row['gate']: row['exit_code'] for row in gates['results']}
    if actual_exits != proof['canonical_gate_exits']:
        failures.append('canonical gate result changed')
    if not gates['capture_matches_direct_cli'] or not gates['inputs_unchanged']:
        failures.append('canonical evidence capture inconsistent')
    if proof['canonical_pass'] or proof['audio_order_pass'] or proof['legacy_order_modified']:
        failures.append('project acceptance misrepresented as canonical lock')
    if proof['unresolved_phase2_findings']:
        failures.append('unresolved phase2 findings')
    asr = read(V / 'asr-provenance.json')
    if asr['audio_sha256'] != sha(V / 'voice_clean.wav') and not proof.get('gain_headroom_derivation'):
        failures.append('ASR input differs without a supported gain derivation')
    if proof.get('gain_headroom_derivation'):
        import numpy as np
        import soundfile as sf
        derived = read(P / proof['gain_headroom_derivation'])
        old_path, new_path = P / derived['old_path'], P / derived['new_path']
        old, sr = sf.read(old_path, dtype='float32')
        new, new_sr = sf.read(new_path, dtype='float32')
        factor = np.float32(derived['factor_float32'])
        if (sha(old_path) != derived['old_sha256'] or sha(new_path) != derived['new_sha256']
                or sr != new_sr or sr != 48000 or len(new) != 2493 * 1600
                or factor != np.float32(10 ** (-.2 / 20))
                or not np.array_equal(new, old * factor)):
            failures.append('gain derivative is not the exact declared float32 transform')
        else:
            error = old.astype(np.float64) - new.astype(np.float64) / float(factor)
            energy = float(np.dot(old.astype(np.float64), old.astype(np.float64)))
            snr = 10 * np.log10(energy / max(float(np.dot(error, error)), 1e-300))
            if snr < 140:
                failures.append('gain derivative exceeds float32 quantization error')
        voice = read(V / 'voice_clean.provenance.json')
        if min(row['gain_db'] for row in voice['phrase_gain']) <= 0:
            failures.append('a phrase no longer has positive gain from source')
        if (asr['audio_sha256'] != derived['old_sha256']
                or asr['applies_to_audio_sha256'] != derived['new_sha256']
                or asr['derived_transform_proof_sha256'] != sha(P / proof['gain_headroom_derivation'])
                or asr['words_actual_sha256'] != sha(V / 'words_actual.json')
                or asr['transcription_rerun'] is not False):
            failures.append('ASR derived applicability is not explicitly bound')
    return failures

if __name__ == '__main__':
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else V / 'adjudications.json'
    proof = read(path)
    failures = verify(proof)
    result = dict(evidence_snapshot_pass=not failures,
                  bound_artifacts=len(proof['sha256']),
                  gain_transform_verified=bool(proof.get('gain_headroom_derivation')) and not failures,
                  timing_ready_for_reversible_visual=not failures,
                  ready_for_final_voice_lock=not failures and not proof['pending_user_decisions']
                                             and not proof['canonical_tooling_conflict'],
                  canonical_pass=False, audio_order_pass=False,
                  pending_user_decisions=proof['pending_user_decisions'], failures=failures)
    print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(bool(failures))
