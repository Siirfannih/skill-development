#!/usr/bin/env python3
"""Bounded validation of helper functions; never invokes closure main or writes project evidence."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import time

BASE = Path(__file__).resolve().parent
script = BASE / 'build_final_closure_v2.py'
spec = importlib.util.spec_from_file_location('closure_v2', script)
v = importlib.util.module_from_spec(spec); spec.loader.exec_module(v)
fixed_spec = importlib.util.spec_from_file_location('fixed_tool', BASE / 'verify_final_correspondence.py')
fixed = importlib.util.module_from_spec(fixed_spec); fixed_spec.loader.exec_module(fixed)
old_path = v.ARCHIVE / 'qc/v6-finishing/final-all-frame-correspondence-additive.json'
old = v.read(old_path)
criteria = v.read(BASE / 'reports/final-correspondence-criteria-v2.json')['criteria']
assert criteria == fixed.CRITERIA == old['criteria']
assert v.sha(BASE / 'verify_final_correspondence.py') == 'dd1c6f2f94e84204b2958f12f3cb1564dd7818517294d9836adb6915a7a7d6c6'
checks = []
actual = v.comparison_rows(old, criteria, range(2493))
assert actual == old['failed_frames'] and len(actual) == 302
checks.append(dict(name='archived fixed-tool2493rows exact302failure rederivation', result='PASS'))

def rejection(name, callback):
    try:
        callback()
    except RuntimeError as e:
        checks.append(dict(name=name, result='REJECTED_EXPECTED', reason=str(e)))
    else:
        raise RuntimeError('Negative fixture accepted: ' + name)

bad = copy.deepcopy(old); bad['rows'][0]['corr'] = 0.0
rejection('changed row correlation without changing failure list', lambda: v.comparison_rows(bad, criteria, range(2493)))
bad = copy.deepcopy(old); bad['rows'][545]['failures'] = []
rejection('removed real row failure', lambda: v.comparison_rows(bad, criteria, range(2493)))
bad = copy.deepcopy(old); bad['rows'][-1]['frame'] = 2491
rejection('duplicate frame index', lambda: v.comparison_rows(bad, criteria, range(2493)))
bad = copy.deepcopy(old); bad['rows'][-1]['frame'] = 9999
rejection('unknown frame index', lambda: v.comparison_rows(bad, criteria, range(2493)))
bad_criteria = copy.deepcopy(criteria); bad_criteria['textured_corr_min'] = .1
rejection('changed correlation criterion contradicts archived rows', lambda: v.comparison_rows(old, bad_criteria, range(2493)))
bad = copy.deepcopy(old); bad['rows'][100]['neighbors'] = []
rejection('missing neighbor comparison', lambda: v.comparison_rows(bad, criteria, range(2493)))
bad = copy.deepcopy(old); bad['failed_frames'] = bad['failed_frames'][1:]
rejection('summary omits one failing frame', lambda: v.comparison_rows(bad, criteria, range(2493)))
reads_path = v.BASE / 'gemini/batch-1.reads.json'
reads = v.read(reads_path); expected = reads['input_hashes']
v.strict_reads(reads, expected, {})
checks.append(dict(name='actual historical Gemini batch1 strict read coverage and leaf hashes', result='PASS'))
bad_reads = copy.deepcopy(reads); bad_reads['read_paths'] = bad_reads['read_paths'][1:]
rejection('missing actual image read', lambda: v.strict_reads(bad_reads, expected, {}))
info = v.BASE / 'pairs/INFO.md'
rejection('changed leaf hash', lambda: v.bind(info, {}, '0' * 64))
# Exercise the independently reused math on output actually produced by the frozen comparator function.
import numpy as np
x = np.zeros((1,90,160), np.uint8); y = np.full_like(x, 3)
control = fixed.compare(x, y, 1, start_frame=2492, terminal_fade_verified=True)
assert v.comparison_rows(control, criteria, [2492]) == []
checks.append(dict(name='unchanged fixed comparator terminal quantization output agrees', result='PASS'))
report = dict(created_ns=time.time_ns(), helper_sha256=v.sha(script), fixed_tool_sha256=v.sha(BASE/'verify_final_correspondence.py'),
              archived_report_sha256=v.sha(old_path), checks=checks, checks_passed=len(checks),
              closure_main_executed=False, project_evidence_written=False, final_acceptance_claimed=False)
out = BASE / 'reports/final-closure-v2-helper-checks.json'
with out.open('x') as f: json.dump(report,f,indent=2)
print(json.dumps(report,indent=2))
