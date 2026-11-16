#!/usr/bin/env python3
"""Run a limited native-image Gemini review with actual tool-read evidence."""
import hashlib
import json
from pathlib import Path
import subprocess
import time

BASE = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/third-native')


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    manifest_path = BASE / 'manifest.json'
    manifest = json.loads(manifest_path.read_text())
    paths = [Path(manifest['info_path']), *[Path(f['path']) for f in manifest['frames']]]
    hashes = {str(p): sha(p) for p in paths}
    assert hashes[str(paths[0])] == manifest['info_sha256']
    assert all(hashes[f['path']] == f['sha256'] for f in manifest['frames'])
    prompt = '''Independent VISUAL review of actual encoded final export repair neighbors. Read ONLY the listed INFO.md and EVERY listed PNG using read_file. No commands, source files, other reviewers, editing, network or other tools.
Inspect ALL three full images in exact chronological frame order1082,1083,1084. Describe the actual blue handwriting beside black Selama and its continuity, scene/camera/context, and any new missing/clipped content. Progressive partial word reveal is intended. Do not presume the repair succeeded. No audio judgement, no broader2493-frame claim, numeric comparator or SHIP judgement.
Return ONLY JSON {"native_images_available":true,"all_frames_inspected":true,"reviewed_frame_indices":[1082,1083,1084],"blue_handwriting_continuous":true,"observations":"...","issues":[],"uncertainty":"..."}.
FILES:
''' + '\n'.join(map(str, paths))
    (BASE / 'gemini-prompt.txt').write_text(prompt)
    stream = BASE / 'gemini-stream.jsonl'
    error = BASE / 'gemini.err'
    assert not stream.exists() and not (BASE / 'gemini-review.json').exists()
    start = time.time_ns()
    with stream.open('w') as output, error.open('w') as err:
        run = subprocess.run(['agy', '-p', prompt, '--model', 'gemini-3.8-flash-low',
                              '--add-dir', str(BASE), '--disable-slash-commands', '--dangerously-skip-permissions',
                              '--print-timeout', '240s', '--output-format', 'stream-json'],
                             cwd=BASE, stdout=output, stderr=err, timeout=270)
    parts, opened, forbidden = [], set(), []
    for line in stream.read_text().splitlines():
        try:
            step = json.loads(line).get('step_update', {})
        except ValueError:
            continue
        if step.get('text_delta'):
            parts.append(step['text_delta'])
        tool = step.get('tool_info') or {}
        if tool.get('name') and tool['name'] != 'read_file':
            forbidden.append(tool)
        if tool.get('name') == 'read_file' and tool.get('parameters', {}).get('Path'):
            opened.add(tool['parameters']['Path'])
    answer = ''.join(parts)
    (BASE / 'gemini-response.txt').write_text(answer)
    parsed = None
    try:
        value = answer.strip()
        if value.startswith('```'):
            value = value.split('\n', 1)[1].rsplit('```', 1)[0].strip()
        parsed = json.loads(value)
    except ValueError:
        pass
    unchanged = all(sha(Path(p)) == h for p, h in hashes.items())
    strict = run.returncode == 0 and opened == set(hashes) and not forbidden and unchanged
    passed = bool(strict and parsed and parsed.get('native_images_available') is True
                  and parsed.get('all_frames_inspected') is True
                  and parsed.get('reviewed_frame_indices') == [1082, 1083, 1084]
                  and parsed.get('blue_handwriting_continuous') is True and parsed.get('issues') == [])
    report = {'schema_version': 1, 'created_ns': time.time_ns(), 'started_ns': start,
              'candidate_sha256': manifest['candidate_sha256'], 'manifest_sha256': sha(manifest_path),
              'reviewer': 'Gemini gemini-3.8-flash-low', 'creator_sha256': sha(Path(__file__)),
              'opened_frames': [{k: f[k] for k in ('frame', 'path', 'sha256')} for f in manifest['frames']] if strict else [],
              'all_frames_inspected': bool(parsed and parsed.get('all_frames_inspected') is True and strict),
              'pass_': passed, 'issues': parsed.get('issues', []) if parsed else ['unparsed_review'],
              'scope': 'Actual encoded final frames1082–1084 only; no audio, all-frame or projectSHIP claim.',
              'exit_code': run.returncode, 'strict_read_coverage': strict, 'input_hashes': hashes,
              'read_paths': sorted(opened), 'forbidden_tools': forbidden, 'inputs_unchanged': unchanged,
              'response': parsed, 'stream_path': str(stream), 'stream_sha256': sha(stream),
              'stderr_path': str(error), 'stderr_sha256': sha(error)}
    with (BASE / 'gemini-review.json').open('x') as handle:
        json.dump(report, handle, indent=2); handle.write('\n')
    print(json.dumps({'pass_': passed, 'strict_read_coverage': strict, 'response': parsed}))
    return 0 if passed else 1


if __name__ == '__main__':
    raise SystemExit(main())
