"""Check all decoded frames and deliver a 12-frame contact sheet."""
from pathlib import Path
from fractions import Fraction
import hashlib
import json
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = Path('/mnt/storage-projects/skill-dev-journey/b10a')
timing = json.loads((OUT / 'timing.json').read_text())
movie = OUT / 'out/b10a.mov'
probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', str(movie)]))
stream = probe['streams'][0]
assert stream['codec_name'] == 'prores' and stream['profile'] == 'HQ'
assert (stream['width'], stream['height']) == (1920, 1080)
assert Fraction(stream['r_frame_rate']) == Fraction(30000, 1001)
assert int(stream['nb_read_frames']) == timing['frames'] == 77
duration = float(Fraction(stream['duration_ts']) * Fraction(stream['time_base']))
assert abs(duration - 77 * 1001 / 30000) < 1e-6
assert abs(duration - timing['duration']) < 1001 / 30000
source_hashes = {}
for name, key in [('words.json', 'words_sha256'), ('suara.wav', 'audio_sha256')]:
    current_hash = hashlib.sha256((ROOT / 'edit' / name).read_bytes()).hexdigest()
    source_hashes[name] = dict(render_input=timing[key], current=current_hash, matches=current_hash == timing[key])
words = json.loads((ROOT / 'edit/words.json').read_text())['words']
index = next(i for i, word in enumerate(words) if word['w'].lower() == 'menurut')
current_timing = dict(start=words[index-1]['s']-.3, end=words[index+4]['e']+.5, onset=words[index+3]['s'])
current_timing['duration'] = current_timing['end']-current_timing['start']
current_timing['onset_local'] = current_timing['onset']-current_timing['start']
local_timing_matches = abs(current_timing['duration']-timing['duration']) < 1e-8 and abs(current_timing['onset_local']-timing['onset_local']) < 1e-8
checks = []
for folder in ['raw', 'finished']:
    paths = sorted((OUT / folder).glob('*.png'))
    assert [p.name for p in paths] == [f'{i:04d}.png' for i in range(1, 78)], folder
    for path in paths:
        with Image.open(path) as im:
            im.load()
            assert im.size == (1920, 1080), path
            a = np.asarray(im.convert('RGB'))
            mean, high, std = float(a.mean()), float(np.percentile(a, 99)), float(a.std())
            assert mean > 5 and high > 40 and std > 10, path
            checks.append(dict(folder=folder, frame=int(path.stem), mean=mean, p99=high, std=std))
decoded = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', str(movie), '-vf', 'scale=320:180', '-pix_fmt', 'rgb24', '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
frame_bytes = 320 * 180 * 3
decoded_checks = []
for frame in range(1, 78):
    data = decoded.stdout.read(frame_bytes)
    assert len(data) == frame_bytes, frame
    a = np.frombuffer(data, dtype=np.uint8)
    assert a.mean() > 5 and np.percentile(a, 99) > 40 and a.std() > 10, frame
    decoded_checks.append(dict(frame=frame, mean=float(a.mean()), sha256=hashlib.sha256(data).hexdigest()))
assert decoded.stdout.read(1) == b''
assert decoded.wait() == 0
assert len({x['sha256'] for x in decoded_checks}) == 77
indices = np.rint(np.linspace(1, 77, 12)).astype(int).tolist()
sheet = Image.new('RGB', (960, 4 * 204), '#111111')
draw = ImageDraw.Draw(sheet)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 15)
for index, frame in enumerate(indices):
    x, y = index % 3 * 320, index // 3 * 204
    draw.text((x + 6, y + 3), f'f{frame:02d} / {(frame-1)*1001/30000:.3f}s', font=font, fill='white')
    with Image.open(OUT / 'finished' / f'{frame:04d}.png') as im:
        sheet.paste(im.resize((320, 180), Image.Resampling.LANCZOS), (x, y + 24))
sheet_path = ROOT / 'qc/still/revisi1/b10a-render-sheet.jpg'
sheet.save(sheet_path, quality=95, subsampling=0)
render = json.loads((OUT / 'full-render-times.json').read_text())
seconds = [x['seconds'] for x in render['frames']]
source_hashes_match = all(value['matches'] for value in source_hashes.values())
proof = dict(passed=source_hashes_match and local_timing_matches, artifact_checks_passed=True,
             current_local_timing_matches=local_timing_matches, current_timing=current_timing,
             source_hashes_match=source_hashes_match, source_hashes=source_hashes,
             monitor_source='G2-approved render input; concurrent upstream media revision differs',
             movie=str(movie), sha256=hashlib.sha256(movie.read_bytes()).hexdigest(),
             stream=stream, duration=duration, word_window_seconds=timing['duration'],
             frame_quantization_seconds=duration-timing['duration'], render_seconds=sum(seconds),
             mean_seconds_per_frame=float(np.mean(seconds)), max_seconds_per_frame=max(seconds),
             sequence_checks=checks, decoded_checks=decoded_checks, unique_decoded_frames=77,
             sheet=str(sheet_path), sheet_frames=indices, finish='scene Fog Glow once, grain 0.0016, vignette 0.105')
(OUT / 'full-check.json').write_text(json.dumps(proof, indent=2))
print('B10A_ARTIFACT_CHECK_PASS', json.dumps({k: proof[k] for k in ['duration', 'render_seconds', 'mean_seconds_per_frame', 'max_seconds_per_frame', 'sheet']}))
assert local_timing_matches, 'Current shot length or local onset changed'
for name, value in source_hashes.items():
    assert value['matches'], f'{name}: concurrent source drift; artifact checks passed, source freshness FAIL (see full-check.json)'
