"""Read-only validation of recorded native one-frame repair and fixed caption ROI."""
import importlib.util
import re
from pathlib import Path


def validate_raw_repair(receipt, old_chunk, current_chunk, source_pin, readiness_pin, need):
    need(receipt['pass_'] is True and receipt['render_kind'] == 'single_frame_repair' and
         receipt['source_snapshot_sha256'] == source_pin and receipt['readiness_sha256'] == readiness_pin,
         'Single-frame repair authority differs')
    source = receipt['source_chunk']; replacement = receipt['replacement']
    need(source['sha256'] == old_chunk['sha256'] and source['start'] == 900 and source['end'] == 1199 and
         receipt['output_chunk'] == current_chunk and current_chunk['start'] == 900 and current_chunk['end'] == 1199 and current_chunk['frames'] == 300,
         'Repair input/output chunk differs')
    need(replacement['global_frame'] == 1083 and replacement['local_frame'] == 183 and
         replacement['sha256'] == '8615c60df90efab60a34e993dfecbb101dc5ad1189d024c577f9f6496685f4bb' and
         replacement['conversion_exit_code'] == 0 and replacement['conversion_stderr'] == '', 'Wrong repair PNG or conversion')
    exact = receipt['exact_native_yuv_check']
    old, new = exact['source_raw_frame_sha256'], exact['output_raw_frame_sha256']
    need(len(old) == len(new) == 300 and all(isinstance(h,str) and re.fullmatch('[0-9a-f]{64}',h) for h in old + new), 'Raw frame hash inventory invalid')
    changed = [i for i,(a,b) in enumerate(zip(old,new)) if a != b]
    need(changed == exact['changed_indices'] == [183] and exact['unchanged_frames'] == 299 and
         exact['pix_fmt'] == 'yuvj420p' and exact['frames'] == 300 and exact['pass_'] is True and
         exact['expected_replacement_matches'] is True and new[183] == replacement['raw_yuv_sha256'], 'Exact299/one-frame replacement failed')
    source_probe, output_probe = receipt['source_ffprobe'], receipt['output_ffprobe']
    need(len(source_probe['streams']) == len(output_probe['streams']) == 1, 'Repair chunk must be video-only')
    before, after = source_probe['streams'][0], output_probe['streams'][0]
    for row in (before, after):
        need(row['codec_type'] == 'video' and row['codec_name'] == 'h264' and row['width'] == 1920 and row['height'] == 1080 and
             row['pix_fmt'] == 'yuvj420p' and row['color_range'] == 'pc' and row['color_space'] == 'bt470bg' and
             row['avg_frame_rate'] == row['r_frame_rate'] == '30/1' and int(row['nb_read_frames']) == int(row['nb_frames']) == 300 and
             float(row['duration']) == 10 and float(row['start_time']) == 0, 'Repair native geometry/timing/color metadata differs')
    need(before['time_base'] == after['time_base'] == '1/90000' and before['start_pts'] == after['start_pts'] == 0,
         'Repair timebase differs')
    return {'preconcat_unchanged_raw_frames': 299, 'changed_local_indices': changed,
            'source_chroma_location': before.get('chroma_location'), 'output_chroma_location': after.get('chroma_location'),
            'raw_plane_equality_is_not_rgb_equivalence': True}


def validate_repair(c, chunks, leaves):
    p, q, base = c.P, c.Q, c.BASE
    receipt_path = q / 'single-frame-repair.json'
    receipt = c.bound_json(receipt_path, leaves, '12772314ccc15c58fca2ff7556bc1a7961e1eec5b69380bc858db42625c52508')
    helper = c.SESSION / 'work/repair_native_chunk.py'
    c.need(receipt['creator_sha256'] == c.bind(helper, leaves, 'c8ac4deeaba44f98175849fa4d8cf090d6c89b348575a2296d6f5d27d2933457'), 'Repair creator differs')
    old_chunks = c.bound_json(c.ARCHIVE / 'qc/v6-finishing/chunks.json', leaves)
    old = next(x for x in old_chunks if x['start'] == 900)
    current = next(x for x in chunks if x['start'] == 900)
    c.need([x for x in chunks if x['start'] != 900] == [x for x in old_chunks if x['start'] != 900], 'Eight original chunks changed')
    result = validate_raw_repair(receipt, old, current, c.PINS[q/'source-snapshot.json'], c.PINS[q/'readiness.json'], c.need)
    source, replacement = receipt['source_chunk'], receipt['replacement']
    c.need(source['path'] == str(c.ARCHIVE / old['path']) and source['sidecar_path'] == str((c.ARCHIVE / old['path']).with_suffix('.json')), 'Wrong archived repair source path')
    c.bind(source['path'], leaves, source['sha256']); c.bind(source['sidecar_path'], leaves, source['sidecar_sha256'])
    c.need(replacement['path'] == str(base/'repair1083/native-1083.png') and replacement['provenance_path'] == str(base/'repair1083/provenance.json'), 'Repair capture provenance path differs')
    c.bind(replacement['path'], leaves, replacement['sha256']); c.bind(replacement['provenance_path'], leaves, replacement['provenance_sha256'])
    c.bind(p/current['path'], leaves, current['sha256'])
    sidecar = c.bound_json((p/current['path']).with_suffix('.json'), leaves)
    c.need(sidecar['render_kind'] == 'single_frame_repair' and sidecar['crf'] == 0 and sidecar['muted'] is True and
           sidecar['chunk'] == current and sidecar['repair_receipt'] == str(receipt_path.relative_to(p)) and
           sidecar['repair_receipt_sha256'] == c.sha(receipt_path), 'Repair sidecar misrepresents method/receipt')
    record = c.bound_json(p/sidecar['render_log'], leaves)
    c.need(record == receipt['encode'], 'Actual encode record differs from repair receipt')
    prefix = ['/usr/bin/ffmpeg','-nostdin','-v','error','-threads','2','-filter_threads','1']
    expected_encode = prefix + ['-f','rawvideo','-pixel_format','yuvj420p','-video_size','1920x1080','-framerate','30',
        '-color_range','pc','-colorspace','bt470bg','-i','pipe:0','-an','-frames:v','300','-c:v','libx264','-threads','2',
        '-crf','0','-preset','medium','-pix_fmt','yuvj420p','-color_range','pc','-colorspace','bt470bg',
        '-video_track_timescale','90000','-movflags','+faststart',str(p/current['path'])]
    c.need(record['command'] == expected_encode and record['cwd'] == str(p) and record['render_kind'] == 'single_frame_repair' and
           record['started_ns'] < record['ended_ns'] <= receipt['created_ns'], 'Repair encoder command/timing differs')
    expected_convert = prefix + ['-i',replacement['path'],'-vf','scale=in_range=full:out_range=full:out_color_matrix=bt601,format=yuvj420p',
                                 '-frames:v','1','-pix_fmt','yuvj420p','-f','rawvideo','-']
    c.need(replacement['conversion_command'] == expected_convert, 'Repair PNG conversion differs')
    for key, input_path in [('source_decode', source['path']), ('exact_native_yuv_check', str(p/current['path']))]:
        d = receipt[key]
        c.need(d['command'] == prefix + ['-i',input_path,'-map','0:v:0','-vsync','0','-pix_fmt','yuvj420p','-f','rawvideo','-'], 'Repair decoder command differs')
    for record in (receipt['encode'], receipt['source_decode'], receipt['exact_native_yuv_check']):
        log = p / record['log']
        c.bind(log, leaves, record['log_sha256'])
        c.need(record['exit_code'] == 0 and not log.read_text().strip(), 'Repair encode/decode reported errors')
    result.update(eight_original_chunk_count=8, preconcat_preserved_frames=2492, repair_receipt_sha256=c.sha(receipt_path))
    return result


def validate_roi(c, manifest, digest, leaves):
    base = c.BASE; roi_path = c.SESSION / 'work/verify_third_native_roi.py'
    c.bind(roi_path, leaves, 'c5b2bbc19baa1d15541d1f4a822fb89591f0685cf3aa272bb9df6313d749c372')
    spec = importlib.util.spec_from_file_location('fixed_caption_roi', roi_path)
    roi = importlib.util.module_from_spec(spec); spec.loader.exec_module(roi)
    criteria_path = base / 'roi-criteria-v1.json'
    criteria = c.bound_json(criteria_path, leaves, '174c8ec692a151ad278c7f4d71e3bd1b96f7428fc63d1201e11345bdf2865557')
    c.need(criteria['criteria'] == roi.CRITERIA and criteria['creator_sha256'] == c.sha(roi_path) and criteria['before_third_export_exists'] is True, 'Fixed ROI criteria changed')
    for name, h in criteria['reference_hashes'].items(): c.bind(name, leaves, h)
    pre_path = base/'roi-controls-pre-third.json'; good_path = base/'roi-good-encoded-controls.json'
    pre = c.bound_json(pre_path, leaves, '9fcc343eafa1b076cf1bb170ddf4ebe70449e45edd9487e4b1a7b43f21003dde')
    good = c.bound_json(good_path, leaves, '5fd158fff6adb45ba50369b197abb8bbf07a6d8012be35a64939acddfc66af88')
    c.need(pre['controls_pass'] is True and pre['before_third_export_exists'] is True and good['pass_'] is True and
           good['before_third_export_exists'] is True and pre['criteria_sha256'] == good['criteria_sha256'] == c.sha(criteria_path), 'Pre-export ROI controls absent/changed')
    report = c.bound_json(base/'third-native/roi-check.json', leaves)
    c.need(report['mode'] == 'actual_third_native_roi' and report['candidate_sha256'] == digest and
           report['manifest_sha256'] == c.sha(base/'third-native/manifest.json') and report['creator_sha256'] == c.sha(roi_path) and
           report['criteria'] == roi.CRITERIA and report['criteria_sha256'] == c.sha(criteria_path) and report['pass_'] is True and
           report['controls_pass'] is True and report['whole_frame_criteria_unchanged'] is True and report['final_acceptance_claimed'] is False,
           'Actual third ROI identity/result differs')
    for evidence in (pre, good, report):
        for name, h in evidence['input_hashes'].items(): c.bind(name, leaves, h)
    expected_controls = []
    for frame, path in roi.REFERENCES.items():
        expected_controls.append({'frame':frame,'kind':'positive_native_reference','reference_path':str(path),'candidate_path':str(path), **roi.metrics(path,path)})
    for frame, path, label in roi.NEGATIVES:
        row = roi.metrics(roi.REFERENCES[frame],path)
        c.need(row['pass_'] is False and 'blue_caption_absent_or_incomplete' in row['failures'], 'Known missing-caption control not rejected')
        expected_controls.append({'frame':frame,'kind':'negative_'+label,'reference_path':str(roi.REFERENCES[frame]),'candidate_path':str(path),**row})
    c.need(pre['controls'] == report['controls'] == expected_controls, 'ROI controls do not reproduce actual images')
    c.exact_frames(good['frames'], [1082,1083], 'Good encoded ROI controls')
    for row in good['frames']:
        actual = roi.metrics(roi.REFERENCES[row['frame']],base/f"second-native/native-{row['frame']}.png")
        c.need(row == {'frame':row['frame'],**actual} and actual['pass_'] is True, 'Good encoded control does not reproduce')
    c.exact_frames(report['frames'], [1082,1083,1084], 'Actual caption ROI')
    for row, image in zip(report['frames'], manifest['frames']):
        actual = roi.metrics(roi.REFERENCES[row['frame']], Path(image['path']))
        c.need(row == {'frame':row['frame'],'path':image['path'],'sha256':image['sha256'],**actual} and actual['pass_'] is True, 'Actual caption ROI does not reproduce/PASS')
    return {'caption_roi_negative_controls_rejected': True, 'actual_caption_roi_frames':[1082,1083,1084]}
