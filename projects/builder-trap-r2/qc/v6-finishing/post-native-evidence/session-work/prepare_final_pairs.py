#!/usr/bin/env python3
import hashlib
import json
import time
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
BASE = SESSION / 'work/final-native-qa'
Q = P / 'qc/v6-finishing'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    final = P / 'out/builder-trap-r2_v6.mp4'
    proof_path = Q / 'final-all-frame-correspondence-additive.json'
    proof = json.loads(proof_path.read_text())
    assert proof['candidate_sha256'] == sha(final)
    assert proof['correspondence_pass'] is False
    raw_provenance = json.loads((Q / 'frames-provenance.json').read_text())
    native = sorted((BASE / 'frames').glob('native-*.jpeg'))
    assert [p.name for p in native] == [f'native-{i:04d}.jpeg' for i in range(2493)]
    native_hashes = {str(p.relative_to(BASE)): sha(p) for p in native}
    failed = sorted(proof['failed_frames'])
    assert failed == [r['frame'] for r in proof['rows'] if r['failures']]
    clusters = []
    for frame in failed:
        if not clusters or frame - clusters[-1][-1] > 10:
            clusters.append([frame])
        else:
            clusters[-1].append(frame)
    selected = sorted({f for cluster in clusters for f in range(max(0, cluster[0]-2), min(2493, cluster[-1]+3))})
    reference_hashes = {}
    for frame in selected:
        rel = f'qc/frames/element-{frame:04d}.jpeg'
        actual = sha(P / rel)
        assert actual == raw_provenance['output_hashes'][rel]
        reference_hashes[rel] = actual
    output = BASE / 'pairs'
    output.mkdir(exist_ok=False)
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
    sheets = []
    for offset in range(0, len(selected), 15):
        frames = selected[offset:offset+15]
        sheet = Image.new('RGB', (1920, 1040), '#343434')
        draw = ImageDraw.Draw(sheet)
        for slot, frame in enumerate(frames):
            x, y = (slot % 3) * 640, (slot // 3) * 208
            flag = 'FLAG' if frame in failed else 'context'
            draw.text((x+5, y+4), f'f{frame:04d} {frame/30:.3f}s {flag} | REF left / NATIVE right', font=font, fill='white')
            for col, path in enumerate((P/f'qc/frames/element-{frame:04d}.jpeg', BASE/f'frames/native-{frame:04d}.jpeg')):
                with Image.open(path) as source:
                    image = source.convert('RGB').resize((320, 180), Image.Resampling.LANCZOS)
                sheet.paste(image, (x+col*320, y+26))
        path = output/f'pairs-{offset//15+1:02d}.jpg'
        sheet.save(path, quality=94, subsampling=0)
        sheets.append({'name': path.name, 'sha256': sha(path), 'frames': frames})
    full_names = []
    for frame in (545,570,653,1083,1407,1415,1480,1538,1568,1660,1686,1857,1900,1926,2333,2342,2343,2344,2345,2346,2387):
        pair = Image.new('RGB', (1920, 570), '#343434')
        draw = ImageDraw.Draw(pair)
        draw.text((8, 5), f'f{frame:04d} {frame/30:.3f}s | REF left / NATIVE right (each960x540)', font=font, fill='white')
        for col, path in enumerate((P/f'qc/frames/element-{frame:04d}.jpeg', BASE/f'frames/native-{frame:04d}.jpeg')):
            with Image.open(path) as source:
                pair.paste(source.convert('RGB'), (col*960, 30))
        path = output/f'full-f{frame:04d}.jpg'
        pair.save(path, quality=95, subsampling=0)
        full_names.append({'name': path.name, 'sha256': sha(path), 'frame': frame})
    info = output/'INFO.md'
    lines = [
        '# Actual final native export comparison review', '',
        f'Final1920x1080/30fps/2493frames/83.1s SHA256 {sha(final)}.',
        f'Raw fixed-criteria comparator remains FAIL at{len(failed)}frames. Do not change its thresholds or call it PASS.',
        'Every cell has the same frame index: REF540 render LEFT; native1080 export downscaled to540 RIGHT.',
        'Contact sheets use320x180 perimage for sequence context. The separately listed full pairs retain960x540 perimage.',
        'Inspect every pair/cell. Determine visible context loss, missing/malformed UI, caption loss/clipping, wrongscene/time, or new animation discontinuity.',
        'A spatial difference is real even if perceptually acceptable. Do not assume a codec/DPR cause, a defect, or acceptance from a numeric flag alone.',
        'Frames are chronological but some gaps are omitted. Only adjacent printed indices are consecutive; jumps across omitted gaps are not animation evidence.',
        'All marked frames plus continuous scene clusters and two context frames per edge are included.',
        'Review visual content only. No audio judgement, no perfect pixel-equivalence claim, and no project SHIP authority.', '',
        f'Flagged frames: {failed}', f'Selected frames: {selected}', '',
    ]
    for item in sheets:
        lines.append(f'{item["name"]}: {item["frames"]}')
    info.write_text('\n'.join(lines)+'\n')
    report = {'schema_version': 1, 'created_ns': time.time_ns(), 'final_path': str(final), 'final_sha256': sha(final),
              'comparator_path': str(proof_path), 'comparator_sha256': sha(proof_path),
              'raw_comparator_pass': False, 'failed_frames': failed, 'selected_frames': selected,
              'clusters': [[x[0], x[-1]] for x in clusters], 'native_hashes': native_hashes,
              'reference_hashes': reference_hashes, 'sheets': sheets, 'full_pairs': full_names,
              'info_sha256': sha(info), 'creator_sha256': sha(Path(__file__)),
              'limits': 'Paired visual review is separate from unchanged strict numeric correspondence; no alignment or registration applied to these images.'}
    target = BASE/'pairs-manifest.json'
    with target.open('x') as handle:
        json.dump(report, handle, indent=2)
        handle.write('\n')
    print(json.dumps({'manifest': str(target), 'failed_frames': len(failed), 'selected_frames': len(selected), 'sheets': len(sheets), 'full_pairs': len(full_names)}))


if __name__ == '__main__':
    main()
