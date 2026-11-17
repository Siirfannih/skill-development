"""Render the approved shot using the same Cycles lighting and optical finish."""
import bpy
import hashlib
import json
import sys
import time
from pathlib import Path

OUT = Path('/mnt/storage-projects/skill-dev-journey/b10a')
ROOT = Path(__file__).resolve().parents[2]
timing = json.loads((OUT / 'timing.json').read_text())
for name, key in [('words.json', 'words_sha256'), ('suara.wav', 'audio_sha256')]:
    assert hashlib.sha256((ROOT / 'edit' / name).read_bytes()).hexdigest() == timing[key], name
scene = bpy.context.scene
assert scene.frame_end == timing['frames']
scene.render.resolution_percentage = 75   # 1440x810 lalu dinaikkan ke 1080p di finish.py (DOF dangkal; hemat ±45 % waktu)
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 10
scene.cycles.use_adaptive_sampling = False
scene.cycles.use_denoising = True
scene.cycles.denoiser = 'OPENIMAGEDENOISE'
scene.cycles.denoising_prefilter = 'ACCURATE'
scene.render.use_persistent_data = True
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGB'
scene.render.image_settings.color_depth = '8'
scene.render.threads_mode = 'FIXED'
scene.render.threads = 8
scene['engine_decision'] = 'Cycles CPU, 10 samples, OpenImageDenoise accurate; approved round-2 lighting and glare'
(OUT / 'raw').mkdir(exist_ok=True)
proof_path = OUT / 'full-render-times.json'
signature = hashlib.sha256((OUT / 'b10a.blend').read_bytes() + Path(__file__).read_bytes()).hexdigest()
proof = json.loads(proof_path.read_text()) if proof_path.exists() else dict(signature=signature, frames=[])
assert proof['signature'] == signature, 'Render configuration changed; preserve the old run before restarting'
proof.update(engine='Cycles CPU', samples=10, denoiser='OpenImageDenoise', prefilter='ACCURATE',
             threads=8, resolution=[1440, 810], fps='30000/1001', camera_distance_factor=.91)
frames = [1, timing['onset_frame'], timing['frames']] if '--test' in sys.argv else range(1, timing['frames'] + 1)
for frame in frames:
    path = OUT / 'raw' / f'{frame:04d}.png'
    if path.exists() and any(x['frame'] == frame for x in proof['frames']):
        continue
    scene.frame_set(frame)
    scene.render.filepath = str(path)
    started = time.perf_counter()
    bpy.ops.render.render(write_still=True)
    elapsed = time.perf_counter() - started
    proof['frames'].append(dict(frame=frame, seconds=round(elapsed, 3), bytes=path.stat().st_size))
    proof['frames'].sort(key=lambda x: x['frame'])
    proof['render_seconds'] = round(sum(x['seconds'] for x in proof['frames']), 3)
    proof_path.write_text(json.dumps(proof, indent=2))
    print('B10A_FRAME', frame, round(elapsed, 3), flush=True)
print('B10A_RENDER_COMPLETE', len(proof['frames']), proof['render_seconds'], flush=True)
