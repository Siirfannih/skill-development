"""Measure WAV and AAC headroom with the same 4x soxr reconstruction."""
import os
for key in ('OMP_NUM_THREADS', 'OPENBLAS_NUM_THREADS', 'MKL_NUM_THREADS'):
    os.environ[key] = '2'
from pathlib import Path
import hashlib
import json
import re
import subprocess
import numpy as np

V = Path(__file__).resolve().parent
D = V / 'gain-headroom'
AAC = D / 'voice-clean-peak1p25-aac192.m4a'
base = ['ffmpeg', '-v', 'error', '-threads', '2', '-filter_threads', '1']
subprocess.run(base + ['-y', '-i', str(V / 'voice_clean.wav'), '-c:a', 'aac',
                      '-threads', '2', '-b:a', '192k', str(AAC)], check=True)

def true_peak(path):
    result = subprocess.run(base + ['-i', str(path), '-af',
        'aresample=192000:resampler=soxr:precision=28', '-f', 'f32le', '-ac', '1', 'pipe:1'],
        capture_output=True, check=True)
    samples = np.frombuffer(result.stdout, dtype=np.float32)
    return float(20 * np.log10(float(np.max(np.abs(samples)))))

def lufs(path):
    result = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-threads', '2',
        '-filter_threads', '1', '-i', str(path), '-af', 'ebur128', '-f', 'null', '-'],
        capture_output=True, text=True, check=True)
    return float(re.findall(r'I:\s+(-?[0-9.]+) LUFS', result.stderr)[-1])

proof = dict(method='ffmpeg aresample192000 resampler=soxr precision=28;4x from48k; max reconstructed float32 sample',
    voice_sha256=hashlib.sha256((V / 'voice_clean.wav').read_bytes()).hexdigest(),
    old_wav_true_peak_dbtp=true_peak(D / 'voice-clean-peak1p05.wav'),
    wav_true_peak_dbtp=true_peak(V / 'voice_clean.wav'),
    aac192_true_peak_dbtp=true_peak(AAC), final_lufs=lufs(V / 'voice_clean.wav'),
    codec_file=str(AAC.relative_to(V.parents[1])),
    codec_sha256=hashlib.sha256(AAC.read_bytes()).hexdigest())
assert proof['wav_true_peak_dbtp'] <= -1 and proof['aac192_true_peak_dbtp'] <= -1
(V / 'gain-headroom-levels.json').write_text(json.dumps(proof, indent=2) + '\n')
print(json.dumps(proof))
