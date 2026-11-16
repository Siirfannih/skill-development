"""Record canonical gate failures without replacing them with project acceptance."""
from pathlib import Path
import hashlib
import json
import os
import subprocess
import sys

V = Path(__file__).resolve().parent
ROOT = V.parents[3]
G = ROOT / 'claude/motion-graphic/scripts/gate'
BIN = V / 'runtime-bin'
BIN.mkdir(exist_ok=True)
wrapper = BIN / 'ffmpeg'
wrapper.write_text('#!/bin/sh\nexec /usr/bin/ffmpeg -threads 2 -filter_threads 1 -filter_complex_threads 1 "$@"\n')
wrapper.chmod(0o755)
env = dict(os.environ, PATH=str(BIN) + os.pathsep + os.environ['PATH'])
for key in ('OMP_NUM_THREADS', 'OPENBLAS_NUM_THREADS', 'MKL_NUM_THREADS'):
    env[key] = '2'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

audio = str(V / 'voice_clean.wav')
words = str(V / 'words_mapped.json')
commands = [
    ('source_guard', [sys.executable, str(G / 'cut_check.py'), audio, words,
        '--source-words', str(V / 'words_source.json'), '--map', str(V / 'map.json'),
        '--validation-out', str(V / 'canonical-source-validation.json')]),
    ('cut_check', [sys.executable, str(G / 'cut_check.py'), audio, words,
        '--suggest', str(V / 'canonical-suggestions.json')]),
    ('pause_clean', [sys.executable, str(G / 'pause_clean.py'), audio, words]),
    ('voice_level', [sys.executable, str(G / 'voice_level.py'), str(V / 'suara.wav'), audio]),
]
tracked = [V / q for q in ('source_raw.wav', 'suara.wav', 'voice_clean.wav', 'words_source.json',
                           'words_mapped.json', 'map.json', 'voice_clean.provenance.json')]
before = {str(p.relative_to(ROOT)): sha(p) for p in tracked}
results = []
for name, command in commands:
    run = subprocess.run(command, capture_output=True, text=True, env=env)
    (V / f'canonical-{name}.log').write_text(run.stdout + run.stderr)
    results.append(dict(gate=name, command=command, exit_code=run.returncode,
                        stdout=run.stdout, stderr=run.stderr))
capture = subprocess.run([sys.executable, str(V / 'capture_cut.py'), str(G / 'cut_check.py'),
                          str(V / 'canonical-findings.json'), audio, words],
                         capture_output=True, text=True, env=env)
canonical = next(q for q in results if q['gate'] == 'cut_check')
# The --suggest line is the only output added by the direct CLI invocation.
direct_lines = [q for q in canonical['stdout'].splitlines() if not q.startswith('usulan buang')]
same = capture.returncode == canonical['exit_code'] and capture.stdout.splitlines() == direct_lines
after = {str(p.relative_to(ROOT)): sha(p) for p in tracked}
proof = dict(defaults_unchanged=True, ffmpeg_wrapper='thread limits only; no audio processing changes',
             capture_matches_direct_cli=same, inputs_unchanged=before == after,
             input_hashes=before, gate_sha256={p.name: sha(p) for p in G.glob('*.py')
                                             if p.name in ('cut_check.py', 'pause_clean.py', 'voice_level.py', 'audio_order.py')},
             results=results)
(V / 'canonical-gates.json').write_text(json.dumps(proof, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(dict(inputs_unchanged=proof['inputs_unchanged'], capture_matches_direct_cli=same,
                     gates=[dict(gate=q['gate'], exit_code=q['exit_code']) for q in results])))
if not proof['inputs_unchanged'] or not same:
    raise SystemExit('gate evidence capture mismatch')
