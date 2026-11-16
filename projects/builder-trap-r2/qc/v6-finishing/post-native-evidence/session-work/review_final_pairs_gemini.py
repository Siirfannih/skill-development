#!/usr/bin/env python3
import concurrent.futures
import hashlib
import json
from pathlib import Path
import subprocess
import time

BASE = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa')
SOURCE = json.loads((BASE / 'pairs-manifest.json').read_text())
OUT = BASE / 'gemini'
OUT.mkdir(exist_ok=False)
MODEL = 'gemini-3.8-flash-low'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def review(batch):
    sheets = SOURCE['sheets'][batch*7:(batch+1)*7]
    frames = sorted({f for s in sheets for f in s['frames']})
    full = [p for p in SOURCE['full_pairs'] if p['frame'] in frames]
    paths = [BASE/'pairs/INFO.md', *[BASE/'pairs'/s['name'] for s in sheets], *[BASE/'pairs'/s['name'] for s in full]]
    manifest = {str(p): sha(p) for p in paths}
    stem = OUT / f'batch-{batch+1}'
    prompt = '''Independent actual-final VISUAL comparison review only. Read ONLY listed INFO.md and EVERY listed JPG using read_file. No commands, source files, other reviewers, network, editing or other tools.
Every cell is ONE exact frame: reviewed540 REF on LEFT, actual native1080 export downscaled to540 on RIGHT. Each contact sheet has15pairs(3columns x5rows), chronological across selected frames. Printed frame indices matter: omitted gaps are not evidence of a teleport. Full pairs retain960x540 perimage for detailed reading. Inspect EVERY pair/cell of every listed sheet and ALL full pairs.
The unchanged numeric comparator flagged real pixel differences. Do not override it, tune thresholds or label its FAIL a PASS. Your job: find visible lost context/caption words, malformed/missing UI/media, wrong scene/pose/time, new collisions/clipping, or unintended native animation discontinuity. A small position/border/raster difference may be acceptable visually, but must be described honestly. Do not assume its mechanism or that every difference is harmless. Check neighboring consecutive frame numbers for actual continuity, especially2333 and2343..2345. Authentic app shells, dummy vector creator references, factual opening archives and own real project media are intended. B20 repo stack freeze at1672 is intended. No audio judgement or SHIP authority.
Return ONLY concise JSON, include all filenames and exact reviewed frame indices: {"native_images_available":true,"all_pairs_inspected":true,"reviewed_sheets":[],"reviewed_full_pairs":[],"reviewed_frame_indices":[],"visible_context_intact":true,"observations":"...","issues":[{"frame":0,"visible_problem":"...","confidence":"...","needs_source_fix":true}],"uncertainty":"..."}.
FILES:
''' + '\n'.join(map(str, paths))
    stem.with_suffix('.manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
    stem.with_suffix('.prompt.txt').write_text(prompt)
    started = time.time_ns()
    with stem.with_suffix('.stream.jsonl').open('w') as output, stem.with_suffix('.err').open('w') as error:
        try:
            run = subprocess.run(['agy','-p',prompt,'--model',MODEL,'--add-dir',str(BASE/'pairs'),
                                  '--disable-slash-commands','--dangerously-skip-permissions',
                                  '--print-timeout','240s','--output-format','stream-json'],
                                 cwd=BASE/'pairs',stdout=output,stderr=error,timeout=270)
            code = run.returncode
        except subprocess.TimeoutExpired:
            code = 124
    parts, opened, forbidden = [], set(), []
    for line in stem.with_suffix('.stream.jsonl').read_text().splitlines():
        try:
            step = json.loads(line).get('step_update',{})
        except json.JSONDecodeError:
            continue
        if step.get('text_delta'):
            parts.append(step['text_delta'])
        tool = step.get('tool_info') or {}
        if tool.get('name') and tool['name'] != 'read_file':
            forbidden.append(tool)
        path = tool.get('parameters',{}).get('Path')
        if tool.get('name') == 'read_file' and path:
            opened.add(path)
    answer = ''.join(parts)
    stem.with_suffix('.txt').write_text(answer)
    parsed = None
    try:
        text = answer.strip()
        if text.startswith('```'):
            text = text.split('\n',1)[1].rsplit('```',1)[0].strip()
        parsed = json.loads(text)
    except ValueError:
        pass
    unchanged = all(sha(Path(p)) == h for p,h in manifest.items())
    strict = code == 0 and opened == set(manifest) and not forbidden and unchanged
    complete = bool(strict and parsed and parsed.get('native_images_available') is True
                    and parsed.get('all_pairs_inspected') is True
                    and set(parsed.get('reviewed_sheets',[])) == {s['name'] for s in sheets}
                    and set(parsed.get('reviewed_full_pairs',[])) == {s['name'] for s in full}
                    and parsed.get('reviewed_frame_indices') == frames)
    proof = {'exit_code':code,'model':MODEL,'started_ns':started,'ended_ns':time.time_ns(),
             'input_hashes':manifest,'read_paths':sorted(opened),'missing_paths':sorted(set(manifest)-opened),
             'unexpected_paths':sorted(opened-set(manifest)),'forbidden_tools':forbidden,
             'inputs_unchanged':unchanged,'strict_read_coverage':strict,'review_complete':complete,
             'expected_frame_indices':frames,'response':parsed,
             'raw_numeric_correspondence_pass':False,'project_acceptance_claimed':False}
    stem.with_suffix('.reads.json').write_text(json.dumps(proof,indent=2)+'\n')
    print(json.dumps({'batch':batch+1,'exit_code':code,'strict_read_coverage':strict,'review_complete':complete,
                      'frames':len(frames),'issue_count':len(parsed.get('issues',[])) if parsed else None}),flush=True)
    return complete


if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(review,range(4)))
    raise SystemExit(0 if all(results) else 1)
