"""Prepare isolated, equal-timeline before/after stages; does not run any renderer."""
from pathlib import Path
import json
import math
import re
import shutil

P = Path(__file__).resolve().parents[2]
base = P / 'edit/v5/render-stage'
for variant in ('before', 'after'):
    stage = base / variant
    remotion = stage / 'remotion'
    remotion.mkdir(parents=True, exist_ok=True)
    shutil.copytree(P / 'remotion/src', remotion / 'src', dirs_exist_ok=True)
    for name in ('node_modules', 'public'):
        link = remotion / name
        if not link.is_symlink(): link.symlink_to(P / 'remotion' / name)
    if not (stage / 'edit').is_symlink(): (stage / 'edit').symlink_to(P / 'edit')
    for name in ('package.json', 'tsconfig.json'):
        shutil.copy2(P / 'remotion' / name, remotion / name)
    config = (P / 'remotion/remotion.config.ts').read_text().replace('setConcurrency(4)', 'setConcurrency(1)')
    config += "\nConfig.overrideFfmpegCommand(({args}) => ['-threads', '2', '-filter_threads', '1', ...args.slice(0, -1), '-threads', '2', args[args.length - 1]]);\n"
    (remotion / 'remotion.config.ts').write_text(config)
    if variant == 'before':
        for name, marker in [('Act3.tsx', 'b17Cam'), ('Act4.tsx', 'b25Cam')]:
            path = remotion / 'src/scenes' / name
            text = path.read_text()
            start = text.index('const ' + marker)
            end = text.index('\n);', start) + 3
            block = re.sub(r', ry: -?[\d.]+, rx: -?[\d.]+', '', text[start:end])
            text = text[:start] + block + text[end:]
            text = text.replace(", boxShadow: '0 28px 65px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)'", '')
            text = text.replace(", boxShadow: '0 32px 80px rgba(0,0,0,0.20)'", '')
            path.write_text(text)
# Inverse of the animation map, matching keBaruSec (not exact edit mapper).
knots = json.loads((P / 'remotion/src/data/knots_v5.json').read_text())['knots']
def frame(old):
    t = old / 30
    for (a, x), (b, y) in zip(knots, knots[1:]):
        if x <= t <= y: return math.floor((a + (t-x)/(y-x)*(b-a))*30 + .5)
    raise ValueError(t)
plan = dict(
    B17_post_hover=frame(1526),
    B17_dialog_stable=frame(1548),
    B17_draft_landing=frame(1570),
    B25_modal_open=frame(2586),
    B25_post1=frame(2606),
    B25_post2=frame(2650),
)
(P / 'edit/v5/still-plan-r10.json').write_text(json.dumps(plan, indent=2)+'\n')
print(plan)
