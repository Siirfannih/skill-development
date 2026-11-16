#!/usr/bin/env python3
"""Bind new post-render proof leaves to the delivered native export."""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P / 'qc/v6-finishing'
SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
FINAL = P / 'out/builder-trap-r2_v6.mp4'
PINS = {
    Q / 'source-snapshot.json': '4965f416e2deea839d85256419364b562b49721cd996b33fadfa15e16f8834ac',
    P / 'tools/finish_v6.py': 'aca84131ae9c4f534fb6a08678b37920a20cceb86f9675f779b7f7fa952d0018',
    Q / 'readiness.json': '0534167061e9c3a73c525987397b63f49e8ea768ba6aac431595d9cb8e6cd877',
    Q / 'SHIP.json': 'cbecc296607769e6ffb99796d3a7e459c5dae5b6ac66115855d875b69e74475e',
    SESSION / 'work/verify_final_correspondence.py': 'dd1c6f2f94e84204b2958f12f3cb1564dd7818517294d9836adb6915a7a7d6c6',
}


def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as handle:
        for block in iter(lambda: handle.read(1 << 20), b''):
            h.update(block)
    return h.hexdigest()


def read(path):
    return json.loads(path.read_text())


def need(condition, message):
    if not condition:
        raise RuntimeError(message)


def main():
    for path, digest in PINS.items():
        need(sha(path) == digest, 'Changed frozen identity: ' + str(path))
    paths = {name: Q / name for name in (
        'final-verification.json', 'final-all-frame-scan.json',
        'seam-verification.json', 'audio-correspondence.json', 'aac-truepeak.json',
        'final-all-frame-correspondence-additive.json', 'chunks.json',
    )}
    leaves = {str(path.relative_to(P)): sha(path) for path in paths.values()}
    data = {name: read(path) for name, path in paths.items()}
    digest = sha(FINAL)
    final, scan = data['final-verification.json'], data['final-all-frame-scan.json']
    correspondence = data['final-all-frame-correspondence-additive.json']
    seams, audio, peak = data['seam-verification.json'], data['audio-correspondence.json'], data['aac-truepeak.json']
    need(final['project_final_pass'] is True and final['media_hash'] == digest, 'Final verifier does not accept this file')
    for name in ('final-concat', 'final-decode', 'final-audio-decode'):
        record_path = Q / 'logs' / (name + '.json')
        record = read(record_path)
        log_path = P / record['log']
        need(record['exit_code'] == 0 and sha(log_path) == record['log_sha256']
             and str(FINAL) in record['command'], 'Final run receipt differs: ' + name)
        if name in ('final-decode', 'final-audio-decode'):
            need(not log_path.read_text().strip(), 'Final decode reported an error')
        leaves[str(record_path.relative_to(P))] = sha(record_path)
        leaves[str(log_path.relative_to(P))] = sha(log_path)
    need(final['decode'] == read(Q / 'logs/final-decode.json'), 'Final decode receipt changed')
    for name in ('final-truepeak-exact.log', 'final-all-frame-scan.log'):
        path = Q / 'logs' / name
        need(not path.read_text().strip(), 'Final measurement decode reported an error')
        leaves[str(path.relative_to(P))] = sha(path)
    need(scan['pass_'] is True and scan['checked_frames'] == 2493 and scan['media_sha256'] == digest
         and scan['ending_fade_verified'] is True and not scan['unexpected_blank_frames'], 'Full frame scan differs')
    need(correspondence['correspondence_pass'] is True and correspondence['mode'] == 'full2493'
         and correspondence['compared_frames'] == 2493 and correspondence['candidate_sha256'] == digest
         and not correspondence['failed_frames'] and len(correspondence['rows']) == 2493
         and correspondence['tool_sha256'] == PINS[SESSION / 'work/verify_final_correspondence.py'], 'Correspondence proof differs')
    need(correspondence['acceptance_receipt_path'] == str(paths['final-verification.json'])
         and correspondence['acceptance_receipt_sha256'] == leaves['qc/v6-finishing/final-verification.json']
         and correspondence['blank_fade_receipt_path'] == str(paths['final-all-frame-scan.json'])
         and correspondence['blank_fade_receipt_sha256'] == leaves['qc/v6-finishing/final-all-frame-scan.json'],
         'Correspondence refers to different final verification or blank/fade receipts')
    need(seams['pass_'] is True and seams['checked_frames'] == 48 and len(seams['boundaries']) == 8, 'Seam coverage differs')
    need(peak['exit_code'] == 0 and peak['truepeak_dbtp'] <= -1 and final['aac_truepeak_db'] == peak['truepeak_dbtp'], 'True peak failed')
    need(str(FINAL) in peak['command'], 'True peak measured a different path')
    need(audio['pass_'] is True and len(audio['windows']) == 5 and audio['snr_db'] >= 20, 'Audio coverage failed')
    need(all(abs(w['lag_samples']) <= 48 and w['normalized_correlation'] >= .98 for w in audio['windows']), 'Audio window failed')
    source = read(Q / 'source-snapshot.json')
    need(audio['mix_sha256'] == sha(P / source['mix']) and audio['source_vo_sha256'] == source['voice_sha256']
         and final['voice_sha256'] == source['voice_sha256'], 'Mix or VO identity changed')
    for name, expected in source['input_hashes'].items():
        need(sha(P / name) == expected, 'Source input changed: ' + name)
    chunks = data['chunks.json']
    need(chunks == final['chunks'] and len(chunks) == 9, 'Final chunk identity changed')
    next_start = 0
    for chunk in chunks:
        path = P / chunk['path']
        sidecar = read(path.with_suffix('.json'))
        need(chunk['start'] == next_start and 0 < chunk['end'] - chunk['start'] + 1 <= 300, 'Chunk gap')
        need(sha(path) == chunk['sha256'] and sidecar['chunk'] == chunk and sidecar['muted'] is True
             and sidecar['source_snapshot_sha256'] == PINS[Q / 'source-snapshot.json']
             and sidecar['readiness_sha256'] == PINS[Q / 'readiness.json'], 'Chunk binding changed')
        leaves[str(path.with_suffix('.json').relative_to(P))] = sha(path.with_suffix('.json'))
        render_record_path = P / sidecar['render_log']
        render_record = read(render_record_path)
        need(render_record['exit_code'] == 0 and sha(P / render_record['log']) == render_record['log_sha256'], 'Chunk render receipt changed')
        leaves[str(render_record_path.relative_to(P))] = sha(render_record_path)
        leaves[render_record['log']] = sha(P / render_record['log'])
        next_start = chunk['end'] + 1
    need(next_start == 2493, 'Chunk coverage incomplete')
    media = final['ffprobe']
    video = next(s for s in media['streams'] if s['codec_type'] == 'video')
    sound = next(s for s in media['streams'] if s['codec_type'] == 'audio')
    need((video['width'], video['height'], video['avg_frame_rate'], int(video['nb_read_frames']))
         == (1920, 1080, '30/1', 2493), 'Final video format differs')
    need(abs(float(video['duration']) - 83.1) < .0001 and abs(float(sound['duration']) - 83.1) <= .022, 'Final duration differs')
    valid_corr = [r['corr'] for r in correspondence['rows']
                  if r['reference_std'] >= 1 and not r['terminal_quantization_used']]
    report = {
        'schema_version': 1, 'created_utc': datetime.now(timezone.utc).isoformat(),
        'status': 'PASS_PROJECT_FINAL_EXPORT',
        'closure_helper_sha256': sha(Path(__file__)),
        'media': {'path': str(FINAL), 'sha256': digest, 'bytes': FINAL.stat().st_size,
                  'width': 1920, 'height': 1080, 'fps': '30/1', 'frames': 2493, 'duration_seconds': 83.1},
        'frozen_bindings': {str(path): digest for path, digest in PINS.items()},
        'proof_hashes': leaves, 'source_dependency_count': len(source['input_hashes']),
        'audio': {'truepeak_dbtp': peak['truepeak_dbtp'], 'correspondence_snr_db': audio['snr_db'],
                  'maximum_absolute_lag_samples': max(abs(w['lag_samples']) for w in audio['windows']),
                  'minimum_window_correlation': min(w['normalized_correlation'] for w in audio['windows']),
                  'voice_sha256': source['voice_sha256'], 'voice_dynamics': 'natural; no compressor/limiter'},
        'visual': {'blank_scan_frames': scan['checked_frames'], 'unexpected_blank_frames': [],
                   'same_index_correspondence_frames': correspondence['compared_frames'],
                   'minimum_textured_nonterminal_correlation': min(valid_corr),
                   'maximum_luminance_mae': correspondence['maximum_mae'],
                   'terminal_quantization_frame_count': sum(r['terminal_quantization_used'] for r in correspondence['rows']),
                   'seam_frames': seams['checked_frames'],
                   'minimum_seam_psnr_db': min(r['psnr_db'] for r in seams['comparisons'])},
        'canonical_pass': False, 'audio_order_pass': False,
        'limits': [
            'Scoped project acceptance; raw canonical failures and dispositions remain unchanged.',
            'Luminance correspondence at160x90 cannot establish exact pixels, chroma-only errors or small text readability.',
            'Phone listening is modeled, not a physical speaker test;17minor cues remain below the50percent predictor.',
            'Brief pose holds and opening punch holds retained as documented minor observations.',
            'This additive manifest binds stable path-based codec/seam/audio evidence to the final SHA; it is not an independent rerun.',
        ],
    }
    for name, expected in leaves.items():
        need(sha(P / name) == expected, 'Proof changed during closure: ' + name)
    need(sha(FINAL) == digest, 'Final file changed during closure')
    output = Q / 'final-export-closure.json'
    with output.open('x') as handle:
        json.dump(report, handle, indent=2, allow_nan=False)
        handle.write('\n')
    print(json.dumps({'path': str(output), 'sha256': sha(output), 'media': report['media'],
                      'audio': report['audio'], 'visual': report['visual']}))


if __name__ == '__main__':
    main()
