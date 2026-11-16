"""Suara v2 (koreksi Irfan 13 Nov: jeda berisik — piring, klik, dengung kamar saat berhenti bicara).
voice_raw.wav (suara terkunci, timeline program) → high-pass 70 Hz + afftdn nr 3/nf −55 (nr 8 mengikis udara > 9 kHz: voice_fidelity 0,65 FAIL) → jeda antarkata diredam −36 dB (−24 dB masih menyisakan benturan keras, 88,4 dtk).
Jeda = di luar [awal kata − 0,06; akhir kata + 0,12] (ekor whisper sering terlalu cepat) dan ≥ 0,15 dtk; ramp 25 ms.
Tempo dan isi ucapan tidak diubah (Lantai E23). Keluaran float: audio/voice_clean.wav."""
import os
for _key in ("OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS"):
    os.environ[_key] = "2"
import hashlib, json, subprocess, numpy as np, soundfile as sf
import importlib.util
from pathlib import Path
_spec = importlib.util.spec_from_file_location('make_v5', Path(__file__).resolve().parents[1] / 'edit/make_v5.py')
_build = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(_build)
_run = subprocess.run
def guarded_run(*args, **kwargs):
    _build.resource_gate()
    return _run(*args, **kwargs)
SR = 48000
raw = guarded_run(['ffmpeg', '-filter_threads', '1', '-filter_complex_threads', '1', '-threads', '2', '-v', 'error', '-i', 'edit/v5/suara.wav', '-af',
                      'highpass=f=70,afftdn=nr=3:nf=-55', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
w = json.load(open('edit/v5/words_actual.json'))
w = w if isinstance(w, list) else w['words']
spans = sorted((max(0.0, q['s'] - 0.06), q['e'] + 0.12) for q in w)
keep = []  # gabung rentang ucapan
for a, b in spans:
    if keep and a <= keep[-1][1]: keep[-1][1] = max(keep[-1][1], b)
    else: keep.append([a, b])
g = np.full(len(x), 10 ** (-36 / 20), np.float32)
ramp = int(0.025 * SR)
dur = len(x) / SR
for a, b in keep:
    i, j = int(a * SR), min(len(x), int(b * SR))
    g[i:j] = 1.0
# jeda pendek (< 0,15 dtk) tidak diredam: napas antarkata alami
for (a0, b0), (a1, b1) in zip(keep, keep[1:]):
    if a1 - b0 < 0.15: g[int(b0 * SR):int(a1 * SR)] = 1.0
if keep and keep[0][0] < 0.15: g[:int(keep[0][0] * SR)] = 1.0
# haluskan perpindahan (ramp linear 25 ms)
k = np.ones(ramp, np.float32) / ramp
g = np.convolve(g, k, mode='same').astype(np.float32)
y = x * g[:, None]

# Klik mulut take sumber pada 23,875–23,882 dtk berada di jeda, 25 ms
# sebelum onset kata berikutnya. Ganti jendela sedikit lebih lebar dengan
# interpolasi smoothstep yang bertemu persis dengan sampel kiri/kanan. Ini
# mempertahankan room tone (bukan membuat lubang nol) dan tidak menyentuh kata.
declick_repairs = [(23.873, 23.887)]
for start, end in declick_repairs:
    a, b = round(start * SR), round(end * SR)
    t = np.linspace(0, 1, b - a + 2, dtype=np.float32)[1:-1]
    smooth = (t * t * (3 - 2 * t))[:, None]
    y[a:b] = y[a - 1] * (1 - smooth) + y[b] * smooth

# `afftdn` dapat membunyikan kembali transien tepat di sambungan walaupun
# sumber mentah sudah diberi boundary fade. Terapkan fade kosinus sekali lagi
# setelah seluruh filter/gate, pada sembilan join nyata dari map. Semua join
# berada di jeda terjaga, jadi ini tidak menyentuh fonem.
cut_map = json.load(open('edit/v5/map.json'))
join_fade_ms = int(cut_map.get('micro_fade_ms', 20))
join_fade = int(join_fade_ms * SR / 1000)
up = np.sin(np.linspace(0, np.pi / 2, join_fade, dtype=np.float32)) ** 2
fade_out_overrides = cut_map.get('join_fade_out_ms_overrides', {})
removed_before = 0.0
for start, end in cut_map['removed']:
    join = int(round((start - removed_before) * SR))
    join_frame = round((start - removed_before) * 30)
    fade_out = int(fade_out_overrides.get(str(join_frame), join_fade_ms) * SR / 1000)
    down = np.cos(np.linspace(0, np.pi / 2, fade_out, dtype=np.float32)) ** 2
    y[join - fade_out:join] *= down[:, None]
    y[join:join + join_fade] *= up[:, None]
    removed_before += end - start
sf.write('edit/v5/voice_clean.wav', y, SR, subtype='FLOAT')
def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''): h.update(chunk)
    return h.hexdigest()
with open('edit/v5/voice_clean.provenance.json', 'w') as f:
    json.dump({
        'suara_sha256': sha256('edit/v5/suara.wav'),
        'words_actual_sha256': sha256('edit/v5/words_actual.json'),
        'voice_clean_sha256': sha256('edit/v5/voice_clean.wav'),
        'post_filter_join_fade_ms': join_fade_ms,
        'post_filter_join_fade_out_ms_overrides': fade_out_overrides,
        'declick_repairs_seconds': declick_repairs,
    }, f, indent=2)
    f.write('\n')
gaps = [(round(b0, 2), round(a1, 2)) for (a0, b0), (a1, b1) in zip(keep, keep[1:]) if a1 - b0 >= 0.15]
print('rentang ucapan', len(keep), '· jeda diredam', len(gaps), 'total', round(sum(b - a for a, b in gaps), 2), 'dtk · durasi', round(dur, 2))
