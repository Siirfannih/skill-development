#!/usr/bin/env python3
"""Repair one proven browser-paint dropout without rerendering other frames."""
import fcntl
import hashlib
import json
from pathlib import Path
import subprocess
import time

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
BASE = SESSION / 'work/final-native-qa'
P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P / 'qc/v6-finishing'
FRAME_BYTES = 1920 * 1080 * 3 // 2
PNG_SHA = '8615c60df90efab60a34e993dfecbb101dc5ad1189d024c577f9f6496685f4bb'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def raw_sha(value):
    return hashlib.sha256(value).hexdigest()


def read(path):
    return json.loads(path.read_text())


def full_frame(pipe):
    data = bytearray()
    while len(data) < FRAME_BYTES:
        part = pipe.read(FRAME_BYTES - len(data))
        if not part:
            raise RuntimeError('Truncated native YUV frame')
        data.extend(part)
    return bytes(data)


def probe(path):
    command = ['/usr/bin/ffprobe', '-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', str(path)]
    run = subprocess.run(command, capture_output=True)
    assert run.returncode == 0 and not run.stderr
    return json.loads(run.stdout)


def native_decode(path):
    return ['/usr/bin/ffmpeg', '-nostdin', '-v', 'error', '-threads', '2', '-filter_threads', '1',
            '-i', str(path), '-map', '0:v:0', '-vsync', '0', '-pix_fmt', 'yuvj420p', '-f', 'rawvideo', '-']


def main():
    archive = Path(read(BASE / 'first-attempt-archive.json')['path'])
    source_path = archive / 'out/v6-chunks/f0900-1199.mp4'
    source_sidecar = source_path.with_suffix('.json')
    old = read(source_sidecar)
    source_hash = sha(source_path)
    assert source_hash == old['chunk']['sha256']
    png = BASE / 'repair1083/native-1083.png'
    assert sha(png) == PNG_SHA
    assert sha(Q / 'source-snapshot.json') == '4965f416e2deea839d85256419364b562b49721cd996b33fadfa15e16f8834ac'
    source_inputs = read(Q / 'source-snapshot.json')['input_hashes']
    for name, digest in source_inputs.items():
        assert sha(P / name) == digest, name
    target = P / 'out/v6-chunks/f0900-1199.mp4'
    assert not target.exists() and not target.with_suffix('.json').exists()
    initial = probe(source_path)
    video = initial['streams'][0]
    assert len(initial['streams']) == 1
    assert (video['width'], video['height'], video['pix_fmt'], video['color_range'], video['color_space'], video['avg_frame_rate'], int(video['nb_read_frames'])) == (1920, 1080, 'yuvj420p', 'pc', 'bt470bg', '30/1', 300)
    conversion = ['/usr/bin/ffmpeg', '-nostdin', '-v', 'error', '-threads', '2', '-filter_threads', '1', '-i', str(png),
                  '-vf', 'scale=in_range=full:out_range=full:out_color_matrix=bt601,format=yuvj420p',
                  '-frames:v', '1', '-pix_fmt', 'yuvj420p', '-f', 'rawvideo', '-']
    converted = subprocess.run(conversion, capture_output=True)
    assert converted.returncode == 0 and not converted.stderr and len(converted.stdout) == FRAME_BYTES
    replacement = converted.stdout
    command = ['/usr/bin/ffmpeg', '-nostdin', '-v', 'error', '-threads', '2', '-filter_threads', '1',
               '-f', 'rawvideo', '-pixel_format', 'yuvj420p', '-video_size', '1920x1080', '-framerate', '30',
               '-color_range', 'pc', '-colorspace', 'bt470bg', '-i', 'pipe:0', '-an', '-frames:v', '300',
               '-c:v', 'libx264', '-threads', '2', '-crf', '0', '-preset', 'medium',
               '-pix_fmt', 'yuvj420p', '-color_range', 'pc', '-colorspace', 'bt470bg',
               '-video_track_timescale', video['time_base'].split('/')[1], '-movflags', '+faststart', str(target)]
    decode_command = native_decode(source_path)
    log = Q / 'logs/final-chunk-0900-repair.log'
    decode_log = Q / 'logs/final-chunk-0900-repair-source-decode.log'
    started = time.time_ns()
    source_raw = []
    with Path('/tmp/remotion-heavy-render.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        with log.open('wb') as error, decode_log.open('wb') as decode_error:
            decoder = subprocess.Popen(decode_command, stdout=subprocess.PIPE, stderr=decode_error)
            encoder = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=error)
            try:
                for index in range(300):
                    frame = full_frame(decoder.stdout)
                    source_raw.append(raw_sha(frame))
                    encoder.stdin.write(replacement if index == 183 else frame)
                assert decoder.stdout.read(1) == b''
                encoder.stdin.close()
                decode_exit = decoder.wait(timeout=120)
                encode_exit = encoder.wait(timeout=300)
            except BaseException:
                decoder.kill(); encoder.kill()
                decoder.wait(); encoder.wait()
                raise
        assert decode_exit == encode_exit == 0
        assert not log.read_bytes() and not decode_log.read_bytes()
        record = {'command': command, 'cwd': str(P), 'exit_code': encode_exit,
                  'started_ns': started, 'ended_ns': time.time_ns(),
                  'log': str(log.relative_to(P)), 'log_sha256': sha(log),
                  'render_kind': 'single_frame_repair',
                  'input_pipe_producer': 'Native yuvj420p decode of archived first chunk; exact frame183 replaced with converted native PNG; all other raw frame bytes fed unchanged.'}
        record_path = Q / 'logs/final-chunk-0900-repair.json'
        with record_path.open('x') as handle:
            json.dump(record, handle, indent=2); handle.write('\n')
        verification_command = native_decode(target)
        verification_log = Q / 'logs/final-chunk-0900-repair-verify.log'
        output_raw = []
        with verification_log.open('wb') as error:
            decoder = subprocess.Popen(verification_command, stdout=subprocess.PIPE, stderr=error)
            for index in range(300):
                output_raw.append(raw_sha(full_frame(decoder.stdout)))
            assert decoder.stdout.read(1) == b''
            verification_exit = decoder.wait(timeout=120)
        assert verification_exit == 0 and not verification_log.read_bytes()
    changed = [i for i, (a, b) in enumerate(zip(source_raw, output_raw)) if a != b]
    assert changed == [183], changed
    assert output_raw[183] == raw_sha(replacement)
    output_probe = probe(target)
    v = output_probe['streams'][0]
    assert len(output_probe['streams']) == 1
    assert (v['width'], v['height'], v['pix_fmt'], v['color_range'], v['color_space'], v['avg_frame_rate'], int(v['nb_read_frames'])) == (1920, 1080, 'yuvj420p', 'pc', 'bt470bg', '30/1', 300)
    assert float(v['duration']) == 10 and v['start_time'] == video['start_time'] and v['time_base'] == video['time_base']
    assert sha(source_path) == source_hash and sha(png) == PNG_SHA
    for name, digest in source_inputs.items():
        assert sha(P / name) == digest, name
    chunk = {'path': str(target.relative_to(P)), 'start': 900, 'end': 1199, 'sha256': sha(target), 'frames': 300}
    provenance = BASE / 'repair1083/provenance.json'
    receipt = {'schema_version': 1, 'created_ns': time.time_ns(), 'render_kind': 'single_frame_repair',
               'creator_sha256': sha(Path(__file__)), 'source_snapshot_sha256': sha(Q / 'source-snapshot.json'),
               'readiness_sha256': sha(Q / 'readiness.json'),
               'source_chunk': {'path': str(source_path), 'sha256': source_hash,
                                'sidecar_path': str(source_sidecar), 'sidecar_sha256': sha(source_sidecar), 'start': 900, 'end': 1199},
               'replacement': {'path': str(png), 'sha256': PNG_SHA, 'global_frame': 1083, 'local_frame': 183,
                               'provenance_path': str(provenance), 'provenance_sha256': sha(provenance),
                               'conversion_command': conversion, 'conversion_exit_code': converted.returncode,
                               'conversion_stderr': converted.stderr.decode(), 'raw_yuv_sha256': raw_sha(replacement)},
               'output_chunk': chunk, 'encode': record,
               'source_decode': {'command': decode_command, 'exit_code': decode_exit, 'log': str(decode_log), 'log_sha256': sha(decode_log)},
               'exact_native_yuv_check': {'pix_fmt': 'yuvj420p', 'frames': 300, 'changed_indices': changed,
                                         'unchanged_frames': 299, 'expected_replacement_matches': True,
                                         'source_raw_frame_sha256': source_raw, 'output_raw_frame_sha256': output_raw,
                                         'command': verification_command, 'exit_code': verification_exit,
                                         'log': str(verification_log), 'log_sha256': sha(verification_log), 'pass_': True},
               'source_ffprobe': initial, 'output_ffprobe': output_probe, 'pass_': True,
               'limits': 'Only one native frame was repaired. This is an explicitly recorded raw-YUV replacement and lossless encode, not a whole-chunk Remotion render. Final concat/codec/audio/seam/blank and dual actual repair-neighbor review remain required.'}
    receipt_path = Q / 'single-frame-repair.json'
    with receipt_path.open('x') as handle:
        json.dump(receipt, handle, indent=2); handle.write('\n')
    sidecar = {'source_snapshot_sha256': sha(Q / 'source-snapshot.json'), 'readiness_sha256': sha(Q / 'readiness.json'),
               'chunk': chunk, 'crf': 0, 'muted': True, 'render_log': str(record_path.relative_to(P)),
               'render_kind': 'single_frame_repair', 'repair_receipt': str(receipt_path.relative_to(P)),
               'repair_receipt_sha256': sha(receipt_path)}
    with target.with_suffix('.json').open('x') as handle:
        json.dump(sidecar, handle, indent=2); handle.write('\n')
    print(json.dumps({'path': str(receipt_path), 'sha256': sha(receipt_path), 'pass_': True,
                      'exact_unchanged_frames': 299, 'changed_indices': changed, 'chunk': chunk}), flush=True)


if __name__ == '__main__':
    main()
