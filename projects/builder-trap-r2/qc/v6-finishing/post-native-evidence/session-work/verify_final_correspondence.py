#!/usr/bin/env python3
"""Additive, immutable-input correspondence check; never grants project SHIP."""
import os
os.environ.setdefault('OMP_NUM_THREADS', '2')
os.environ.setdefault('OPENBLAS_NUM_THREADS', '2')
import argparse
import copy
import hashlib
import json
from pathlib import Path
import subprocess
import time
import numpy as np

P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P / 'qc/v6-finishing'
SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
N, FPS, WIDTH, HEIGHT = 2493, 30, 160, 90
PINNED = {
    'qc/v6-finishing/source-snapshot.json': '4965f416e2deea839d85256419364b562b49721cd996b33fadfa15e16f8834ac',
    'qc/v6-finishing/draft-provenance.json': 'f7aa58eaa31de4b2e6c681077cabd4a015af1ca7a76769f16706f0020bd17f31',
    'qc/v6-finishing/frames-provenance.json': '4ee4a264a187eb1030e0d423e2afc24e4b3f6d2ce035738900ba4502f45fa71d',
    'qc/draft.mp4': '064ff31589a09106792f6dd334bc3cd7ce5e0d558df61d85813f13523db48522',
}
CRITERIA = {
    'version': 2, 'frozen_before_final': True, 'dimensions': [WIDTH, HEIGHT],
    'resampling': 'area; no crop, alignment, temporal interpolation or registration',
    'intensity': 'gray uint8, explicit full output range; input declared range or yuv420p limited fallback',
    'reference_std_split': 1.0, 'textured_corr_min': .98, 'textured_mae_max': 6.0,
    'low_variance_mae_max': 4.0, 'low_variance_mean_error_max': 4.0, 'low_variance_std_delta_max': 1.0,
    'terminal_quantization': {'last_frames': 10, 'reference_std_lt': 4.0, 'reference_mean_lt': 12.0,
                              'mae_max': 4.0, 'mean_error_max': 4.0, 'std_delta_max': 3.0,
                              'requires_same_media_frozen_full_blank_fade_scan': True},
    'neighbor_reference_mae_min': 2.0, 'neighbor_absolute_improvement_min': 1.0,
    'neighbor_relative_mae_max': .75,
    'equivalence': 'Neighbor differences below2gray MAE or insufficient improvement do not establish a shift.',
    'scope_limit': 'Downsampled luminance correspondence, not exact pixels, chroma-only errors, small text readability or audio.',
}


def need(condition, message):
    if not condition:
        raise RuntimeError(message)


def sha(path):
    h = hashlib.sha256()
    with Path(path).open('rb') as handle:
        for block in iter(lambda: handle.read(1 << 20), b''):
            h.update(block)
    return h.hexdigest()


def read(path):
    return json.loads(Path(path).read_text())


def verify_hashes(mapping):
    for name, digest in mapping.items():
        need(sha(P / name) == digest, 'changed bound input: ' + name)


def input_bindings():
    verify_hashes(PINNED)
    source = read(Q / 'source-snapshot.json')
    frames = read(Q / 'frames-provenance.json')
    draft = read(Q / 'draft-provenance.json')
    source_sha = PINNED['qc/v6-finishing/source-snapshot.json']
    need(source['frames'] == N and source['fps'] == FPS, 'source timing differs')
    need(frames['source_snapshot_sha256'] == draft['source_snapshot_sha256'] == source_sha, 'QA source identity differs')
    need(draft['derived_from_frames_provenance_sha256'] == PINNED['qc/v6-finishing/frames-provenance.json'], 'draft/raw derivation differs')
    expected = {f'qc/frames/element-{i:04d}.jpeg' for i in range(N)}
    need(set(frames['output_hashes']) == expected, 'canonical raw inventory differs')
    verify_hashes(frames['output_hashes'])
    verify_hashes(draft['output_hashes'])
    bindings = dict(PINNED)
    bindings.update(frames['output_hashes'])
    bindings.update(draft['output_hashes'])
    return bindings


def probe(path, expected_dimensions, expected_frames):
    command = ['/usr/bin/ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]
    run = subprocess.run(command, capture_output=True)
    need(run.returncode == 0 and not run.stderr.strip(), 'ffprobe failed: ' + str(path))
    data = json.loads(run.stdout)
    videos = [s for s in data['streams'] if s['codec_type'] == 'video']
    need(len(videos) == 1, 'exactly one video stream required')
    video = videos[0]
    need((video['width'], video['height']) == expected_dimensions, 'video geometry differs')
    need(video['avg_frame_rate'] == '30/1' and video['r_frame_rate'] == '30/1', 'video frame rate differs')
    need(video.get('sample_aspect_ratio') == '1:1', 'non-square pixels')
    need(abs(float(video.get('start_time', 0))) < .0001, 'video does not begin at zero')
    need(abs(float(video['duration']) - expected_frames / FPS) < .0001, 'video duration differs')
    if video.get('nb_frames') not in (None, 'N/A'):
        need(int(video['nb_frames']) == expected_frames, 'container frame count differs')
    need(video.get('field_order') in ('progressive', 'unknown', None), 'interlaced video unsupported')
    need(not any(float(s.get('rotation', 0)) != 0 for s in video.get('side_data_list', [])), 'rotated video unsupported')
    color_range = video.get('color_range')
    if color_range == 'pc' or video['pix_fmt'].startswith('yuvj'):
        input_range, reason = 'full', 'declared full range'
    elif color_range == 'tv':
        input_range, reason = 'limited', 'declared limited range'
    else:
        need(video['pix_fmt'] == 'yuv420p', 'undeclared range for unsupported pixel format')
        input_range, reason = 'limited', 'untagged yuv420p uses limited range in final encoder pipeline'
    need(video.get('color_space') in ('bt470bg', 'smpte170m', 'unknown', None), 'luma matrix differs from601 QA reference')
    return video, dict(command=command, exit_code=run.returncode, data=data, input_range=input_range, range_reason=reason)


def decode(path, probe_record, count, limit=False):
    vf = f'scale={WIDTH}:{HEIGHT}:flags=area:in_range={probe_record["input_range"]}:out_range=full,format=gray'
    command = ['/usr/bin/ffmpeg', '-nostdin', '-v', 'error', '-threads', '2', '-filter_threads', '1',
               '-noautorotate', '-i', str(path), '-map', '0:v:0', '-vf', vf, '-fps_mode', 'passthrough', '-an']
    if limit:
        command += ['-frames:v', str(count)]
    command += ['-pix_fmt', 'gray', '-f', 'rawvideo', '-']
    started = time.time_ns()
    run = subprocess.run(command, capture_output=True)
    need(run.returncode == 0 and not run.stderr.strip(), 'decode failed: ' + str(path))
    need(len(run.stdout) == count * WIDTH * HEIGHT, f'decode count differs: {path}; bytes={len(run.stdout)}')
    frames = np.frombuffer(run.stdout, dtype=np.uint8).reshape(count, HEIGHT, WIDTH)
    return frames, dict(command=command, exit_code=run.returncode, stderr=run.stderr.decode(),
                        started_ns=started, ended_ns=time.time_ns(), frames=count,
                        decoded_sha256=hashlib.sha256(run.stdout).hexdigest())


def terminal_fade_evidence(scan, receipt, media_sha):
    need(receipt.get('project_final_pass') is True and receipt.get('all_decoded_frames') is True and
         receipt.get('media_hash') == media_sha, 'full final verification does not bind blank/fade scan')
    need(scan.get('pass_') is True and scan.get('ending_fade_verified') is True and
         scan.get('checked_frames') == N and scan.get('media_sha256') == media_sha and
         scan.get('exit_code') == 0, 'missing, failed or stale final blank/fade proof')
    metrics = scan.get('metrics', [])
    need(len(metrics) == N and [r['frame'] for r in metrics] == list(range(N)), 'blank/fade proof coverage differs')
    need(all(r['std'] >= .15 for r in metrics[:-3]), 'early uniform frame in bound blank scan')
    need(all(r['maximum'] <= 6 and r['mean'] <= 4 for r in metrics[-3:]) and
         metrics[-8]['mean'] >= metrics[-1]['mean'] + 10 and
         all(b['mean'] <= a['mean'] + 3 for a, b in zip(metrics[-8:], metrics[-7:])),
         'bound terminal fade shape differs')
    return True


def compare(reference, actual, expected_count, start_frame=0, terminal_fade_verified=False):
    need(actual.shape == (expected_count, HEIGHT, WIDTH), 'candidate decoded frame count/shape differs')
    need(reference.shape[1:] == (HEIGHT, WIDTH) and len(reference) >= expected_count, 'reference decoded count/shape differs')
    rows = []
    for i in range(expected_count):
        x, y = reference[i].astype(np.float64), actual[i].astype(np.float64)
        xm, ym = float(x.mean()), float(y.mean())
        xs, ys = float(x.std()), float(y.std())
        mae = float(np.abs(x - y).mean())
        corr = float(np.mean((x - xm) * (y - ym)) / (xs * ys)) if xs > 0 and ys > 0 else None
        failures = []
        terminal = CRITERIA['terminal_quantization']
        nearblack_ending = (terminal_fade_verified and N - terminal['last_frames'] <= start_frame + i < N and
                            xs < terminal['reference_std_lt'] and xm < terminal['reference_mean_lt'])
        if nearblack_ending:
            if (mae > terminal['mae_max'] or abs(xm - ym) > terminal['mean_error_max'] or
                    abs(xs - ys) > terminal['std_delta_max']):
                failures.append('terminal_quantization_difference')
        elif xs >= CRITERIA['reference_std_split']:
            if corr is None or corr < CRITERIA['textured_corr_min']:
                failures.append('correlation')
            if mae > CRITERIA['textured_mae_max']:
                failures.append('mae')
        elif (mae > CRITERIA['low_variance_mae_max'] or
              abs(xm - ym) > CRITERIA['low_variance_mean_error_max'] or
              abs(xs - ys) > CRITERIA['low_variance_std_delta_max']):
            failures.append('low_variance_difference')
        neighbors = []
        for j in (i - 1, i + 1):
            if not 0 <= j < len(reference):
                continue
            neighbor = reference[j].astype(np.float64)
            reference_difference = float(np.abs(x - neighbor).mean())
            neighbor_mae = float(np.abs(y - neighbor).mean())
            shifted = (reference_difference >= CRITERIA['neighbor_reference_mae_min'] and
                       mae - neighbor_mae >= CRITERIA['neighbor_absolute_improvement_min'] and
                       neighbor_mae <= CRITERIA['neighbor_relative_mae_max'] * mae)
            neighbors.append(dict(frame=start_frame + j, reference_mae=reference_difference, candidate_mae=neighbor_mae, shift_flag=shifted))
            if shifted:
                failures.append(f'closer_to_neighbor_{start_frame + j}')
        rows.append(dict(frame=start_frame + i, terminal_quantization_used=nearblack_ending, corr=corr, mae=mae, reference_mean=xm, actual_mean=ym,
                         reference_std=xs, actual_std=ys, neighbors=neighbors, failures=failures))
    failing = [row['frame'] for row in rows if row['failures']]
    return dict(correspondence_pass=not failing, compared_frames=expected_count, failed_frames=failing,
                minimum_textured_correlation=min((r['corr'] for r in rows if r['reference_std'] >= 1 and r['corr'] is not None), default=None),
                maximum_mae=max(r['mae'] for r in rows), rows=rows)


def selfcheck():
    rng = np.random.default_rng(719)
    reference = rng.integers(20, 230, (12, HEIGHT, WIDTH), dtype=np.uint8)
    cases = []
    def case(name, ref, candidate, expected):
        result = compare(ref, candidate, len(candidate))
        need(result['correspondence_pass'] == expected, 'selfcheck failed: ' + name)
        cases.append(dict(name=name, expected=expected, observed=result['correspondence_pass'], failed_frames=result['failed_frames']))
    case('identical sequence', reference, reference.copy(), True)
    blank = reference.copy(); blank[5] = 0
    case('injected blank at5', reference, blank, False)
    wrong = reference.copy(); wrong[5] = reference[9]
    case('injected wrong source frame', reference, wrong, False)
    case('one frame sequence shift', reference, np.concatenate([reference[1:], reference[-1:]]), False)
    ramp = np.tile(np.linspace(20, 130, WIDTH).astype(np.uint8), (HEIGHT, 1))
    fading = np.stack([ramp + 3 * i for i in range(12)])
    shifted = np.concatenate([fading[1:], fading[-1:]])
    result = compare(fading, shifted, 12)
    need(any(any(f.startswith('closer_to_neighbor') for f in row['failures']) for row in result['rows']), 'nearest index guard not exercised')
    case('shift with corr1 and MAE3 caught by neighbor guard', fading, shifted, False)
    repeated = np.repeat(reference[:1], 12, axis=0)
    case('visually identical adjacent poses', repeated, repeated.copy(), True)
    low = np.zeros((12, HEIGHT, WIDTH), np.uint8)
    case('nearblack codec offset3', low, low + 3, True)
    case('nearblack offset8', low, low + 8, False)
    noisy = low.copy(); noisy[:, :, ::2] = 6
    case('low variance texture corruption', low, noisy, False)
    try:
        compare(reference, reference[:-1], 12)
    except RuntimeError:
        cases.append(dict(name='missing decoded frame', expected='reject', observed='reject'))
    else:
        raise RuntimeError('missing frame accepted')
    dark = rng.integers(0, 7, (1, HEIGHT, WIDTH), dtype=np.uint8)
    quantized = np.flip(dark, axis=2)
    for name, start, proof, candidate, expected in [
        ('ending low contrast quantization equivalent', 2490, True, quantized, True),
        ('same low contrast midfilm stays strict', 100, True, quantized, False),
        ('ending exception requires fade proof', 2490, False, quantized, False),
        ('ending white substitution', 2490, True, np.full_like(dark, 255), False),
        ('ending excessive texture', 2490, True, quantized * 4, False),
    ]:
        result = compare(dark, candidate, 1, start_frame=start, terminal_fade_verified=proof)
        need(result['correspondence_pass'] == expected, 'selfcheck failed: ' + name)
        cases.append(dict(name=name, expected=expected, observed=result['correspondence_pass']))
    metrics = [dict(frame=i, mean=30., std=2., maximum=40) for i in range(N)]
    for i, value in enumerate([14., 12., 10., 8., 6., 4., 3., 2.], N - 8):
        metrics[i].update(mean=value, maximum=value, std=.5)
    scan = dict(pass_=True, ending_fade_verified=True, checked_frames=N, media_sha256='synthetic',
                exit_code=0, metrics=metrics)
    receipt = dict(project_final_pass=True, all_decoded_frames=True, media_hash='synthetic')
    need(terminal_fade_evidence(scan, receipt, 'synthetic'), 'synthetic fade proof failed')
    cases.append(dict(name='complete bound synthetic fade proof', expected=True, observed=True))
    for name, change in [
        ('missing fade proof', lambda x: x.clear()),
        ('wrong media hash', lambda x: x.update(media_sha256='wrong')),
        ('incomplete scan', lambda x: x.update(checked_frames=N-1)),
        ('false scan pass', lambda x: x.update(pass_=False)),
        ('false ending fade', lambda x: x.update(ending_fade_verified=False)),
        ('early blank2489 despite asserted pass', lambda x: x['metrics'][2489].update(std=0)),
        ('terminal white despite asserted pass', lambda x: x['metrics'][-1].update(mean=255, maximum=255)),
        ('constant fake fade despite asserted pass', lambda x: [r.update(mean=2) for r in x['metrics'][-8:]]),
    ]:
        damaged = copy.deepcopy(scan); change(damaged)
        try:
            terminal_fade_evidence(damaged, receipt, 'synthetic')
        except RuntimeError:
            cases.append(dict(name=name, expected='reject', observed='reject'))
        else:
            raise RuntimeError('selfcheck accepted: ' + name)
    return dict(selfcheck_pass=True, cases=cases, no_project_media_used=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    modes = ap.add_mutually_exclusive_group(required=True)
    modes.add_argument('--pilot-first-chunk', action='store_true')
    modes.add_argument('--selfcheck', action='store_true')
    modes.add_argument('--final', type=Path)
    ap.add_argument('--out', type=Path, required=True)
    args = ap.parse_args()
    if os.getpriority(os.PRIO_PROCESS, 0) < 10:
        os.nice(10 - os.getpriority(os.PRIO_PROCESS, 0))
    output = args.out.resolve()
    allowed_final = Q / 'final-all-frame-correspondence-additive.json'
    need(output.is_relative_to(SESSION / 'work') or (args.final is not None and output == allowed_final), 'output must be a new session report or additive final JSON')
    need(not output.exists(), 'refusing to overwrite existing evidence')
    report = dict(schema_version=2, mode='selfcheck' if args.selfcheck else ('pilot_first300_only' if args.pilot_first_chunk else 'full2493'), tool_sha256=sha(__file__), criteria=CRITERIA,
                  started_ns=time.time_ns(), scope='additive correspondence only; not canonical acceptance or SHIP')
    try:
        if args.selfcheck:
            report.update(selfcheck())
        else:
            bindings = input_bindings()
            actual_path = (P / 'out/v6-chunks/f0000-0299.mp4') if args.pilot_first_chunk else args.final.resolve()
            count = 300 if args.pilot_first_chunk else N
            actual_sha = sha(actual_path)
            fade_verified = False
            scan_path = None
            if args.pilot_first_chunk:
                receipt_path = actual_path.with_suffix('.json')
                receipt = read(receipt_path)
                need(receipt['source_snapshot_sha256'] == PINNED['qc/v6-finishing/source-snapshot.json'] and
                     receipt['chunk']['sha256'] == actual_sha and receipt['chunk']['start'] == 0 and receipt['chunk']['end'] == 299,
                     'pilot chunk receipt differs')
            else:
                need(actual_path == P / 'out/builder-trap-r2_v6.mp4', 'not the designated final artifact')
                receipt_path = Q / 'final-verification.json'
                receipt = read(receipt_path)
                need(receipt['project_final_pass'] is True and receipt['media_hash'] == actual_sha, 'frozen final verification missing or does not bind media')
                scan_path = Q / 'final-all-frame-scan.json'
                scan_sha = sha(scan_path)
                fade_verified = terminal_fade_evidence(read(scan_path), receipt, actual_sha)
                report.update(blank_fade_receipt_path=str(scan_path), blank_fade_receipt_sha256=scan_sha)
            receipt_sha = sha(receipt_path)
            _, reference_probe = probe(P / 'qc/draft.mp4', (960, 540), N)
            _, actual_probe = probe(actual_path, (1920, 1080), count)
            reference, reference_decode = decode(P / 'qc/draft.mp4', reference_probe, count + 1 if args.pilot_first_chunk else N, limit=args.pilot_first_chunk)
            actual, actual_decode = decode(actual_path, actual_probe, count)
            report.update(compare(reference, actual, count, terminal_fade_verified=fade_verified))
            verify_hashes(bindings)
            if scan_path is not None:
                need(sha(scan_path) == scan_sha, 'blank/fade receipt changed during comparison')
            need(sha(actual_path) == actual_sha and sha(receipt_path) == receipt_sha, 'candidate or acceptance receipt changed during comparison')
            report.update(mode='pilot_first300_only' if args.pilot_first_chunk else 'full2493',
                          input_hashes=bindings, candidate_path=str(actual_path), candidate_sha256=actual_sha,
                          acceptance_receipt_path=str(receipt_path), acceptance_receipt_sha256=receipt_sha,
                          reference_probe=reference_probe, candidate_probe=actual_probe,
                          reference_decode=reference_decode, candidate_decode=actual_decode,
                          final_media_pass_claimed=False)
    except Exception as error:
        report.update(correspondence_pass=False, error=type(error).__name__ + ': ' + str(error))
    report['finished_ns'] = time.time_ns()
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open('x') as handle:
        json.dump(report, handle, indent=2, allow_nan=False)
        handle.write('\n')
    passed = report.get('selfcheck_pass', report.get('correspondence_pass', False))
    print(json.dumps(dict(report=str(output), passed=passed, mode=report.get('mode', 'selfcheck'),
                          failed_frames=report.get('failed_frames', []), error=report.get('error'))))
    return 0 if passed else 1


if __name__ == '__main__':
    raise SystemExit(main())
