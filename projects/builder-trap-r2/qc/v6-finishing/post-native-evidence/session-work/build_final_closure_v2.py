#!/usr/bin/env python3
"""Bind new post-render proof leaves to the delivered native export."""
import hashlib
import json
import math
import struct
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


BASE = SESSION / 'work/final-native-qa'
SECOND = BASE / 'second-native'
ARCHIVE = Q / 'preserved/final-native-attempt-9b10-1794837148283348405'
OLD_SHA = '9b10b624b344bba533bf960cd09bbba44248c017712276701de869be32d2596f'
OLD_COMPARATOR = '366759355f19165097805c575c5640bd5e93a6713840fcd4ce8ae79d8869c0fe'
HISTORY_PINS = {'/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/pairs-manifest.json': '0ee236daebeed7063c45050c06c58da21c7f4c8c0e3317494455a8a2e38218f7', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/chatgpt-review.json': '0194a5f0e88868ed5bd726bfaa550a290dfe6ee52497e16f9fe0317bc10b6b92', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/gemini-coverage-normalized.json': 'a1a86b27de44481adddedf632cf2c2fa63b39f8ff3ee362afef7f748e297ccb6', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/native-decode-provenance.json': '5b92849c620fc9e8ffe2031baf604041adc0e694a23cb7fbe7c9a2c9c1cab84e', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/repair1083/REVEAL-CORRECTION.md': 'afbf7fe9c4c5ef5c2bff89998427dd07946ade67b6c71795be6a94618fddbdca', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/repair1083/provenance.json': 'c582dc6c57e32322c4737da127595bac1893bebb41c6fb3aef8be311d838c8fa', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/verify_rerender_correspondence.py': 'eaad7d2dfa0dfaa0e6391c9ce9673519a5b6de93211ea2d163a88c6cabeb25e6', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/reports/final-correspondence-criteria-v2.json': '969d89918b005f41297416ac81607eb893b23aaf61ab3bd4c8a92dd0bf59f9fa', '/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2/qc/v6-finishing/preserved/final-native-attempt-9b10-1794837148283348405/ATTEMPT.json': '31a847e3293e8445b007c585d0d8b009d6f0089dac0d4f037b7c97f6b70bfb7a'}

HISTORY_PINS.update({'/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/prepare_second_native_review.py': '9f53d28fb6b31f49ba1be3b10e7d21826feaee0a06b555f95319204f85f26021', '/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/review_second_native_gemini.py': '9d1afa0f0177fa2872c3e49472caf2de3c626194b8b7d9d4523c3f1a4ddf80ba'})


def bind(path, leaves, expected=None):
    path = Path(path)
    digest = sha(path)
    need(expected is None or digest == expected, 'Evidence hash differs: ' + str(path))
    key = str(path)
    need(key not in leaves or leaves[key] == digest, 'Evidence changed between reads: ' + key)
    leaves[key] = digest
    return digest


def bound_json(path, leaves, expected=None):
    bind(path, leaves, expected)
    return read(Path(path))


def exact_frames(rows, frames, label):
    need([r['frame'] for r in rows] == list(frames), label + ' frame inventory differs')


def comparison_rows(report, criteria, frames):
    need(report['compared_frames'] == len(frames), 'Comparison frame count differs')
    exact_frames(report['rows'], frames, 'Comparison')
    frame_set = set(frames)
    failed = []
    for row in report['rows']:
        need(all(math.isfinite(row[k]) for k in ('mae', 'reference_mean', 'actual_mean', 'reference_std', 'actual_std')),
             'Nonfinite comparison metric')
        if row['corr'] is not None:
            need(math.isfinite(row['corr']), 'Nonfinite correlation')
        terminal = row['terminal_quantization_used']
        failures = []
        if terminal:
            t = criteria['terminal_quantization']
            need(2493 - t['last_frames'] <= row['frame'] < 2493 and row['reference_std'] < t['reference_std_lt']
                 and row['reference_mean'] < t['reference_mean_lt'], 'Unexpected terminal tolerance')
            if (row['mae'] > t['mae_max'] or abs(row['reference_mean'] - row['actual_mean']) > t['mean_error_max']
                    or abs(row['reference_std'] - row['actual_std']) > t['std_delta_max']):
                failures.append('terminal_quantization_difference')
        elif row['reference_std'] >= criteria['reference_std_split']:
            if row['corr'] is None or row['corr'] < criteria['textured_corr_min']:
                failures.append('correlation')
            if row['mae'] > criteria['textured_mae_max']:
                failures.append('mae')
        elif (row['mae'] > criteria['low_variance_mae_max'] or
              abs(row['reference_mean'] - row['actual_mean']) > criteria['low_variance_mean_error_max'] or
              abs(row['reference_std'] - row['actual_std']) > criteria['low_variance_std_delta_max']):
            failures.append('low_variance_difference')
        need([n['frame'] for n in row['neighbors']] == [f for f in (row['frame'] - 1, row['frame'] + 1) if f in frame_set],
             'Comparison neighbor coverage differs')
        for neighbor in row['neighbors']:
            need(math.isfinite(neighbor['reference_mae']) and math.isfinite(neighbor['candidate_mae']), 'Nonfinite neighbor metric')
            need(abs(neighbor['frame'] - row['frame']) == 1, 'Comparison neighbor is not adjacent')
            flagged = (neighbor['reference_mae'] >= criteria['neighbor_reference_mae_min'] and
                       row['mae'] - neighbor['candidate_mae'] >= criteria['neighbor_absolute_improvement_min'] and
                       neighbor['candidate_mae'] <= criteria['neighbor_relative_mae_max'] * row['mae'])
            need(neighbor['shift_flag'] is flagged, 'Neighbor flag does not follow fixed criteria')
            if flagged:
                failures.append('closer_to_neighbor_' + str(neighbor['frame']))
        need(row['failures'] == failures, 'Row failures do not follow fixed criteria at ' + str(row['frame']))
        if failures:
            failed.append(row['frame'])
    need(report['failed_frames'] == failed and report['correspondence_pass'] is (not failed),
         'Comparison summary contradicts rows')
    return failed


def strict_reads(report, expected_inputs, leaves):
    need(report['exit_code'] == 0 and report['strict_read_coverage'] is True and
         report['inputs_unchanged'] is True and report['forbidden_tools'] == [] and
         report['input_hashes'] == expected_inputs and set(report['read_paths']) == set(expected_inputs),
         'Native image read coverage incomplete or altered')
    for name, digest in expected_inputs.items():
        bind(name, leaves, digest)


def scoped_visual_acceptance(correspondence, digest, chunks, leaves):
    for name, expected in HISTORY_PINS.items():
        bind(name, leaves, expected)
    criteria_path = SESSION / 'work/reports/final-correspondence-criteria-v2.json'
    criteria = read(criteria_path)['criteria']
    need(correspondence['criteria'] == criteria, 'Current numeric criteria changed')
    failed = comparison_rows(correspondence, criteria, range(2493))
    for name, expected in correspondence['input_hashes'].items():
        bind(P / name, leaves, expected)
    attempt_path = ARCHIVE / 'ATTEMPT.json'
    attempt = read(attempt_path)
    need(attempt['final_sha256'] == OLD_SHA and attempt['defect_frame'] == 1083, 'Historical attempt differs')
    for entry in attempt['entries']:
        bind(P / entry['archived_path'], leaves, entry['sha256'])
    old = bound_json(ARCHIVE / 'qc/v6-finishing/final-all-frame-correspondence-additive.json', leaves, OLD_COMPARATOR)
    need(old['candidate_sha256'] == OLD_SHA and old['criteria'] == criteria and old['tool_sha256'] == PINS[SESSION / 'work/verify_final_correspondence.py'], 'Old comparator identity differs')
    old_failed = comparison_rows(old, criteria, range(2493))
    need(len(old_failed) == 302 and 1083 in old_failed, 'Historical defect set differs')
    need(set(failed) <= set(old_failed) - {1083}, 'New or unrepaired numeric failure requires new review')
    manifest_path = BASE / 'pairs-manifest.json'
    manifest = read(manifest_path)
    need(manifest['final_sha256'] == OLD_SHA and manifest['comparator_sha256'] == OLD_COMPARATOR and
         manifest['failed_frames'] == old_failed and manifest['raw_comparator_pass'] is False, 'Old paired review identity differs')
    selected = manifest['selected_frames']
    need(len(selected) == len(set(selected)) == 407 and selected == sorted(selected) and set(old_failed) <= set(selected), 'Old407coverage differs')
    need(len(manifest['sheets']) == 28 and len(manifest['full_pairs']) == 21 and
         [f for s in manifest['sheets'] for f in s['frames']] == selected, 'Sheet mapping differs')
    need(set(manifest['native_hashes']) == {f'frames/native-{i:04d}.jpeg' for i in range(2493)}, 'Native extraction inventory differs')
    for name, expected in manifest['native_hashes'].items():
        bind(BASE / name, leaves, expected)
    for name, expected in manifest['reference_hashes'].items():
        bind(P / name, leaves, expected)
    need(set(manifest['reference_hashes']) == {f'qc/frames/element-{i:04d}.jpeg' for i in selected}, 'Reference inventory differs')
    image_hashes = {str(BASE / 'pairs' / item['name']): item['sha256'] for item in manifest['sheets'] + manifest['full_pairs']}
    for name, expected in image_hashes.items():
        bind(name, leaves, expected)
    info = BASE / 'pairs/INFO.md'
    bind(info, leaves, manifest['info_sha256'])
    decode = read(BASE / 'native-decode-provenance.json')
    need(decode['pass_'] is True and decode['exit_code'] == 0 and decode['decoded_frames'] == 2493 and
         decode['start_number'] == 0 and decode['mismatches'] == [] and
         decode['final_sha256_before'] == decode['final_sha256_after'] == OLD_SHA and
         decode['pairs_manifest_sha256'] == sha(manifest_path) and decode['original_native_images_unchanged'] is True and
         decode['decoded_jpeg_sha256_by_name'] == {Path(n).name: h for n, h in manifest['native_hashes'].items()}, 'Historical native decode provenance differs')
    bind(decode['log_path'], leaves, decode['log_sha256'])
    need(not Path(decode['log_path']).read_text().strip(), 'Historical native decode logged errors')
    chat = read(BASE / 'chatgpt-review.json')
    need(chat['final_sha256'] == OLD_SHA and chat['manifest_sha256'] == sha(manifest_path) and
         chat['comparator_sha256'] == OLD_COMPARATOR and chat['coverage']['selected_frame_indices'] == selected and
         chat['coverage']['every_pair_in_every_sheet_inspected'] is True and chat['coverage']['unmatched_flags'] == [], 'Historical ChatGPT coverage differs')
    for key, expected, marker in [('opened_sheets', manifest['sheets'], 'all_pairs_inspected'), ('opened_full_pairs', manifest['full_pairs'], 'both_images_inspected')]:
        need(len(chat[key]) == len(expected), 'Historical ChatGPT image count differs')
        for actual, item in zip(chat[key], expected):
            need(all(actual[k] == v for k, v in item.items()) and actual['path'] == str(BASE / 'pairs' / item['name']) and actual[marker] is True,
                 'Historical ChatGPT actual image binding differs')
    exact_frames(chat['frame_bindings'], selected, 'Historical ChatGPT')
    for row in chat['frame_bindings']:
        f = row['frame']
        need(row['native_path'] == str(BASE / f'frames/native-{f:04d}.jpeg') and row['reference_path'] == str(P / f'qc/frames/element-{f:04d}.jpeg') and
             row['native_sha256'] == manifest['native_hashes'][f'frames/native-{f:04d}.jpeg'] and row['reference_sha256'] == manifest['reference_hashes'][f'qc/frames/element-{f:04d}.jpeg'], 'Historical frame binding differs')
    exact_frames(chat['flag_dispositions'], old_failed, 'Historical flag dispositions')
    need([r['frame'] for r in chat['flag_dispositions'] if r['visual_disposition'] != 'resolution_dependent_layout_observation'] == [1083], 'Historical review contains other unresolved flags')
    normalized = read(BASE / 'gemini-coverage-normalized.json')
    need(normalized['final_sha256'] == OLD_SHA and normalized['manifest_sha256'] == sha(manifest_path) and normalized['reviewed_frames'] == selected and
         normalized['reviewed_sheet_count'] == 28 and normalized['reviewed_full_pair_count'] == 21 and
         [x['frame'] for x in normalized['issues']] == [1083] and len(normalized['batches']) == 4, 'Historical Gemini normalized coverage differs')
    seen_names, seen_frames = set(), set()
    for batch in normalized['batches']:
        i = batch['batch']
        reads_path = BASE / f'gemini/batch-{i}.reads.json'
        reads = bound_json(reads_path, leaves, batch['reads_sha256'])
        bind(BASE / f'gemini/batch-{i}.txt', leaves, batch['text_sha256'])
        inputs = bound_json(BASE / f'gemini/batch-{i}.manifest.json', leaves)
        names = batch['reviewed_sheets'] + batch['reviewed_full_pairs']
        expected = {str(info): manifest['info_sha256'], **{str(BASE / 'pairs' / n): image_hashes[str(BASE / 'pairs' / n)] for n in names}}
        need(inputs == expected and batch['actual_complete_after_exact_path_normalization'] is True, 'Gemini batch mapping differs')
        strict_reads(reads, expected, leaves)
        response = reads['response']
        need(response['native_images_available'] is True and response['all_pairs_inspected'] is True and response['reviewed_frame_indices'] == batch['frames'], 'Gemini actual inspection incomplete')
        for key in ('reviewed_sheets', 'reviewed_full_pairs'):
            need(len(response[key]) == len(batch[key]), 'Gemini response image count differs')
            normalized_names = []
            for value in response[key]:
                name = Path(value).name
                need(name in batch[key] and value in (name, str(BASE / 'pairs' / name)), 'Gemini image normalization is not exact')
                normalized_names.append(name)
            need(sorted(normalized_names) == sorted(batch[key]), 'Gemini response image coverage differs')
        need(all(x.get('frame') == 1083 for x in response['issues']), 'Gemini has another unresolved issue')
        seen_names.update(names); seen_frames.update(batch['frames'])
    need(seen_names == {Path(p).name for p in image_hashes} and sorted(seen_frames) == selected, 'Gemini union coverage incomplete')

    bridge_path = BASE / 'rerender-same-resolution-correspondence.json'
    bridge = bound_json(bridge_path, leaves)
    need(bridge['pass_'] is True and bridge['old_final_sha256'] == OLD_SHA and bridge['new_final_sha256'] == digest and
         bridge['old_final_path'] == str(ARCHIVE / 'out/builder-trap-r2_v6.mp4') and bridge['new_final_path'] == str(FINAL) and
         bridge['new_verification_sha256'] == sha(Q / 'final-verification.json') and
         bridge['old_verification_sha256'] == sha(ARCHIVE / 'qc/v6-finishing/final-verification.json') and
         bridge['reference_tool_sha256'] == PINS[SESSION / 'work/verify_final_correspondence.py'] and bridge['fixed_criteria'] == criteria and
         bridge['expected_repair_frame'] == 1083 and bridge['raw540_numeric_result_not_overridden'] is True, 'Same-resolution bridge identity differs')
    need(bridge['creator_sha256'] == sha(SESSION / 'work/verify_rerender_correspondence.py'), 'Bridge creator changed')
    bridge_failures = comparison_rows(bridge['all_frame_comparison'], criteria, range(2493))
    need(bridge_failures == [1083] and bridge['unexpected_failed_frames'] == [] and bridge['same_index_2492_unaffected_pass'] is True, '2492unaffected bridge failed or defect not distinguished')
    need(comparison_rows(bridge['repair_capture_comparison'], criteria, [1083]) == [] and
         comparison_rows(bridge['known_missing_caption_negative_control'], criteria, [1083]) == [1083], 'Repair positive/old negative control failed')
    need(bridge['repair_native_capture_sha256'] == '8615c60df90efab60a34e993dfecbb101dc5ad1189d024c577f9f6496685f4bb', 'Repair capture is not the verified native control')
    bind(bridge['repair_native_capture_path'], leaves, bridge['repair_native_capture_sha256'])
    need(bridge['repair_native_capture_path'] == str(BASE / 'repair1083/native-1083.png'), 'Unexpected repair capture')
    for key in ('old_decode', 'new_decode'):
        need(bridge[key]['exit_code'] == 0 and bridge[key]['stderr'] == '' and bridge[key]['frames'] == 2493, 'Bridge decode incomplete')
    old_chunks = read(ARCHIVE / 'qc/v6-finishing/chunks.json')
    expected_kept = [x for x in old_chunks if x['start'] != 900]
    need(bridge['unchanged_eight_chunks'] == expected_kept and [x for x in chunks if x['start'] != 900] == expected_kept, 'Eight reused chunks differ')
    need(next(x for x in chunks if x['start'] == 900)['sha256'] != next(x for x in old_chunks if x['start'] == 900)['sha256'], 'Defective chunk was not replaced')

    second_path = SECOND / 'manifest.json'
    second = bound_json(second_path, leaves)
    need(second['candidate_path'] == str(FINAL) and second['candidate_sha256'] == digest and
         second['final_verification_sha256'] == sha(Q / 'final-verification.json') and
         second['source_snapshot_sha256'] == PINS[Q / 'source-snapshot.json'], 'Second native capture identity differs')
    need(second['creator_sha256'] == sha(SESSION / 'work/prepare_second_native_review.py'), 'Second native extraction creator differs')
    d = second['decode']
    need(d['exit_code'] == 0 and d['input_sha256_before'] == d['input_sha256_after'] == digest and str(FINAL) in d['command'], 'Second native decode failed or stale')
    command = d['command']
    need(command[command.index('-vf') + 1] == r'select=between(n\,1082\,1084)' and
         command[command.index('-frames:v') + 1] == '3' and command[command.index('-start_number') + 1] == '1082' and
         command[command.index('-vsync') + 1] == '0', 'Second native decode indices differ')
    bind(d['stderr_path'], leaves, d['stderr_sha256'])
    need(not Path(d['stderr_path']).read_text().strip(), 'Second native decode stderr not empty')
    exact_frames(second['frames'], [1082, 1083, 1084], 'Second native images')
    expected_opened = []
    for row in second['frames']:
        need(row['width'] == 1920 and row['height'] == 1080 and row['path'] == str(SECOND / f"native-{row['frame']}.png"), 'Second native image geometry/path differs')
        bind(row['path'], leaves, row['sha256'])
        with Path(row['path']).open('rb') as handle:
            header = handle.read(24)
        need(header[:8] == b'\x89PNG\r\n\x1a\n' and struct.unpack('>II', header[16:24]) == (1920, 1080), 'Actual second image geometry differs')
        expected_opened.append({k: row[k] for k in ('frame', 'path', 'sha256')})
    bind(second['info_path'], leaves, second['info_sha256'])
    for reviewer in ('chatgpt', 'gemini'):
        path = SECOND / f'{reviewer}-review.json'
        review = bound_json(path, leaves)
        need(review['candidate_sha256'] == digest and review['manifest_sha256'] == sha(second_path) and
             reviewer in review['reviewer'].lower() and
             [{k: row[k] for k in ('frame', 'path', 'sha256')} for row in review['opened_frames']] == expected_opened and
             review['all_frames_inspected'] is True and review['pass_'] is True and review['issues'] == [] and bool(review['scope']),
             'Second native dual review incomplete or unresolved: ' + reviewer)
        if reviewer == 'gemini':
            inputs = {r['path']: r['sha256'] for r in second['frames']}
            inputs[second['info_path']] = second['info_sha256']
            strict_reads(review, inputs, leaves)
            need(review['creator_sha256'] == sha(SESSION / 'work/review_second_native_gemini.py'), 'Second Gemini wrapper changed')
            response = review['response']
            need(response['native_images_available'] is True and response['all_frames_inspected'] is True and
                 response['reviewed_frame_indices'] == [1082,1083,1084] and response['blue_handwriting_continuous'] is True and
                 response['issues'] == [], 'Actual Gemini response does not confirm repair')
            bind(review['stream_path'], leaves, review['stream_sha256'])
            bind(review['stderr_path'], leaves, review['stderr_sha256'])

    disposition_path = Q / 'final-visual-disposition-additive.json'
    disposition = bound_json(disposition_path, leaves)
    need(disposition['authority'] == 'lead' and disposition['status'] == 'ACCEPTED_PROJECT_VISUAL_SCOPE' and
         disposition['candidate_sha256'] == digest and disposition['comparator_sha256'] == sha(Q / 'final-all-frame-correspondence-additive.json') and
         disposition['comparator_tool_sha256'] == PINS[SESSION / 'work/verify_final_correspondence.py'] and
         disposition['raw_numeric_correspondence_pass'] is correspondence['correspondence_pass'] and
         disposition['pixel_equivalence_claimed'] is False and disposition['global_render_cause'] == 'unproven' and
         disposition['failed_frames'] == failed and disposition['unresolved_frames'] == [] and disposition['limits'], 'Lead visual disposition absent, stale or overstated')
    exact_frames(disposition['frame_dispositions'], failed, 'Lead current failed-frame dispositions')
    need(all(r['disposition'] == 'accepted_visual_scope' and r['historical_frame'] == r['frame'] and bool(r['reason'].strip()) for r in disposition['frame_dispositions']), 'Unresolved or unreviewed current frame disposition')
    required = [attempt_path, manifest_path, BASE / 'chatgpt-review.json', BASE / 'gemini-coverage-normalized.json',
                BASE / 'native-decode-provenance.json', BASE / 'repair1083/REVEAL-CORRECTION.md', bridge_path,
                second_path, SECOND / 'chatgpt-review.json', SECOND / 'gemini-review.json', criteria_path,
                Q / 'final-all-frame-correspondence-additive.json', Q / 'final-verification.json', Q / 'final-all-frame-scan.json']
    need(set(map(str, required)) <= set(disposition['proof_bindings']), 'Lead disposition omits required evidence roots')
    for name, expected in disposition['proof_bindings'].items():
        need(Path(name).is_absolute(), 'Disposition proof binding must be absolute')
        bind(name, leaves, expected)
    return dict(acceptance_basis='frozen_project_verification_plus_explicit_lead_visual_scope',
                raw_correspondence_pass=correspondence['correspondence_pass'], raw_failure_count=len(failed),
                current_failed_frames=failed, historical_raw_failure_count=302, historical_reviewed_frames=407,
                unchanged_same_resolution_frames=2492, repaired_frame=1083, pixel_equivalence_claimed=False,
                visual_disposition_path=str(disposition_path), visual_disposition_sha256=sha(disposition_path))


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
    need(correspondence['mode'] == 'full2493'
         and correspondence['compared_frames'] == 2493 and correspondence['candidate_sha256'] == digest
         and len(correspondence['rows']) == 2493
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
        bind(P / name, leaves, expected)
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
        bind(path, leaves, chunk['sha256'])
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
    visual_acceptance = scoped_visual_acceptance(correspondence, digest, chunks, leaves)
    valid_corr = [r['corr'] for r in correspondence['rows']
                  if r['reference_std'] >= 1 and not r['terminal_quantization_used']]
    report = {
        'schema_version': 2, 'created_utc': datetime.now(timezone.utc).isoformat(),
        'status': 'ACCEPTED_PROJECT_FINAL_EXPORT_WITH_SCOPED_VISUAL_DISPOSITION',
        'visual_acceptance': visual_acceptance,
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
            'Raw fixed-criteria correspondence is retained unchanged; lead visual adjudication is separate from numerical or pixel equivalence.',
            'Historical301flags reused through2492same-resolution checks; frame1083 re-rendered natively and inspected by both reviewers. Global render-scale cause remains unproven.',
        ],
    }
    for name, expected in leaves.items():
        need(sha(P / name) == expected, 'Proof changed during closure: ' + name)
    for path, expected in PINS.items():
        need(sha(path) == expected, 'Frozen identity changed during closure: ' + str(path))
    need(sha(FINAL) == digest, 'Final file changed during closure')
    output = Q / 'final-export-closure-v2.json'
    with output.open('x') as handle:
        json.dump(report, handle, indent=2, allow_nan=False)
        handle.write('\n')
    print(json.dumps({'path': str(output), 'sha256': sha(output), 'media': report['media'],
                      'audio': report['audio'], 'visual': report['visual']}))


if __name__ == '__main__':
    main()
